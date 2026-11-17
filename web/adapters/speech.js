/* ============================================================
 * adapters/speech.js —— 发音适配（三条路，逐级降级，端点无关）
 *   ① 系统语音合成（Web Speech API，离线可用）
 *   ② 在线词典音频（dict.youdao.com，WebView / 无语音包 / 合成失败时兜底）
 *   ③ 都不行 → 页面提示，不报错、不阻塞
 *
 * 两个真实踩过的坑：
 *   A. 空闲时 cancel() + speak() 放在同一个任务里 → Chrome 会把新排进去的句子
 *      一起清掉，结果一声不出。所以只在"确实还有声音在播"时才 cancel。
 *   B. synthesizer 的 speaking 标志可能卡在 true（取消后不归位），于是后续每次
 *      都误判"上一句还在播"、一直走延迟+cancel 分支，又变回不出声。
 *      所以播没播完由本模块自己记（selfSpeaking + 看门狗），不查浏览器标志。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var adapters = APP.adapters = APP.adapters || {};

  var synth = root.speechSynthesis || null;
  var voice = null;
  var tipShown = false;

  var seq = 0;            // 发音序号：旧回调凭 token 自动失效
  var curAudio = null;    // 正在播的在线音频
  var curU = null;        // 正在念的语音对象（要持引用，否则 Chrome 可能 GC 掉导致无声）
  var selfSpeaking = false; // 自己记的"是否在播"，不看 synth.speaking
  var selfTimer = 0;        // 看门狗：到点强制认为播完了
  var fallbackTimer = 0;
  var GAP = 70;           // cancel 之后隔多久才允许 speak（毫秒）

  // 选一个英文音色：本地引擎优先，en-US 优先
  function pickVoice() {
    if (!synth || !synth.getVoices) return null;
    var list = [];
    try { list = synth.getVoices() || []; } catch (e) { return null; }
    var best = null;
    for (var i = 0; i < list.length; i++) {
      var v = list[i];
      var lang = String(v.lang || '').replace('_', '-').toLowerCase();
      if (lang.indexOf('en') !== 0) continue;
      var score = (v.localService ? 2 : 0) + (lang.indexOf('en-us') === 0 ? 3 : (lang.indexOf('en-gb') === 0 ? 2 : 1));
      if (!best || score > best.score) best = { v: v, score: score };
    }
    return best ? best.v : null;
  }

  function refreshVoice() { voice = pickVoice(); }

  if (synth) {
    refreshVoice();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', refreshVoice);
    else synth.onvoiceschanged = refreshVoice;
  }

  function toast(msg) {
    if (tipShown) return;
    tipShown = true;
    setTimeout(function () { tipShown = false; }, 3000);
    var d = document.createElement('div');
    d.textContent = msg;
    d.style.cssText = 'position:fixed;left:50%;bottom:12%;transform:translateX(-50%);z-index:9999;' +
      'background:rgba(17,24,39,.9);color:#fff;font-size:13px;line-height:1.5;padding:10px 16px;' +
      'border-radius:10px;max-width:80%;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.2)';
    document.body.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 2600);
  }

  function mark(btn) {
    if (!btn) return;
    btn.classList.add('playing');
    setTimeout(function () { btn.classList.remove('playing'); }, 900);
  }

  function setSpeaking(on, budget) {
    selfSpeaking = !!on;
    if (selfTimer) { clearTimeout(selfTimer); selfTimer = 0; }
    if (on && budget) {
      selfTimer = setTimeout(function () { selfSpeaking = false; selfTimer = 0; curU = null; }, budget);
    }
  }

  // 清掉上一句：语音取消（仅在需要时）+ 在线音频暂停 + 兜底计时器
  function stopAll(doCancel) {
    if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = 0; }
    if (curAudio) {
      try { curAudio.pause(); curAudio.currentTime = 0; } catch (e) {}
      curAudio = null;
    }
    if (doCancel) {
      setSpeaking(false);
      if (synth) { try { synth.cancel(); } catch (e) {} }
    }
  }

  // ② 在线词典音频
  function online(word, btn, my) {
    if (my !== undefined && my !== seq) return false;
    setSpeaking(false);
    if (!root.Audio) { toast('当前环境不支持发音'); return false; }
    var url = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(word) + '&type=1';
    try {
      var a = new root.Audio(url);
      a.onerror = function () { if (my === undefined || my === seq) toast('发音加载失败，检查一下网络'); };
      curAudio = a;
      var p = a.play();
      if (p && p.catch) p.catch(function () { if (my === undefined || my === seq) toast('点一下页面再试，或检查网络'); });
      mark(btn);
      return true;
    } catch (e) { toast('当前环境不支持发音'); return false; }
  }

  // ① 系统语音合成
  function speakNow(text, btn, my) {
    if (my !== seq) return;
    var u;
    try { u = new root.SpeechSynthesisUtterance(text); } catch (e) { online(text, btn, my); return; }
    u.lang = 'en-US';
    u.rate = 0.88;
    u.volume = 1;
    if (!voice) refreshVoice();
    if (voice) u.voice = voice;

    var started = false;
    curU = u;
    setSpeaking(true, 1500 + text.length * 120);   // 看门狗：按词长估算上限，防止状态卡死

    u.onstart = function () { if (my !== seq) return; started = true; mark(btn); };
    u.onend = function () { if (curU === u) { curU = null; setSpeaking(false); } };
    u.onerror = function () {
      if (my !== seq) return;
      setSpeaking(false);
      if (!started) online(text, btn, my);
    };

    try { synth.resume(); } catch (e0) {}
    try { synth.speak(u); } catch (e) { online(text, btn, my); return; }
    mark(btn);

    // 静默失败兜底：650ms 一个字都没念出来（有 API 不发声）→ 换在线音频
    fallbackTimer = setTimeout(function () {
      fallbackTimer = 0;
      if (my !== seq || started) return;
      try { synth.cancel(); } catch (e1) {}
      curU = null;
      online(text, btn, my);
    }, 650);
  }

  function say(word, btn) {
    if (!word) return false;
    var my = ++seq;
    var text = String(word);
    var wasPlaying = selfSpeaking;      // 只信自己记的状态
    stopAll(wasPlaying);                // 空闲时绝不 cancel（会把新句子一起清掉）
    if (!synth || !root.SpeechSynthesisUtterance) return online(text, btn, my);
    if (!wasPlaying) { speakNow(text, btn, my); return true; }
    setTimeout(function () { if (my === seq) speakNow(text, btn, my); }, GAP);
    return true;
  }

  adapters.speech = { say: say, supported: function () { return !!(synth || root.Audio); } };
})(window);
