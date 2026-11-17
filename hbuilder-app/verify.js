/* verify.js —— 系统自检：JS 语法 + 领域逻辑单测（Node 环境，无 DOM）
   用法：node verify.js  */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var ROOT = __dirname;
var pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; } else { fail++; console.log('  ✗ FAIL: ' + m); } }
function section(t) { console.log('\n== ' + t + ' =='); }

// 1) 语法检查
section('1. JS 语法检查');
var files = [
  'data/01_config.js', 'data/02_words.js', 'data/07_mnemonic.js',
  'data/03_exam_vocab.js', 'data/04_exam_cloze.js', 'data/05_exam_reading.js', 'data/06_exam_write.js',
  'core/storage.js', 'core/mastery.js', 'core/srs.js', 'core/grade.js', 'core/exam.js',
  'adapters/speech.js', 'app/main.js', 'ui/web_views.js', 'ui/exam_ui.js', 'ui/phone_views.js', 'app/bootstrap.js'
];
files.forEach(function (f) {
  var src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { new vm.Script(src, { filename: f }); ok(true, f); }
  catch (e) { ok(false, f + ' -> ' + e.message); }
});

// 2) 在纯净环境加载数据与领域层（提供最小 window/localStorage/document mock）
section('2. 环境与依赖加载');
var mem = {};
var sandbox = {
  console: console, setTimeout: setTimeout, clearTimeout: clearTimeout,
  localStorage: {
    getItem: function (k) { return mem[k] || null; },
    setItem: function (k, v) { mem[k] = String(v); },
    removeItem: function (k) { delete mem[k]; }
  },
  location: { reload: function () {} },
  document: {
    getElementById: function () { return null; },
    querySelector: function () { return null; },
    querySelectorAll: function () { return []; },
    createElement: function () { return { className: '', innerHTML: '', classList: { add: function(){}, toggle: function(){} }, appendChild: function(){} }; },
    addEventListener: function () {}
  }
};
sandbox.window = sandbox;
vm.createContext(sandbox);
['data/01_config.js', 'data/02_words.js', 'data/07_mnemonic.js',
 'data/03_exam_vocab.js', 'data/04_exam_cloze.js', 'data/05_exam_reading.js', 'data/06_exam_write.js',
 'core/storage.js', 'core/mastery.js', 'core/srs.js', 'core/grade.js', 'core/exam.js',
 'adapters/speech.js', 'app/main.js']
  .forEach(function (f) { vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sandbox, { filename: f }); });
var APP = sandbox.APP;
ok(!!APP && !!APP.data && !!APP.core && !!APP.app, '全局命名空间 APP 组装完整');
ok(APP.data.PRD.exam.score === 100 && APP.data.PRD.exam.pass === 60, '官方口径 100分/60过线');
ok(APP.data.PRD.exam.questions === 54, '整卷 54 题');
ok(APP.data.PRD.types.reduce(function (n, t) { return n + t.pt; }, 0) === 100, '五大题型分值合计 100');
ok(APP.data.PRD.types.reduce(function (n, t) { return n + t.n; }, 0) === 54, '五大题型题数合计 54');
ok(APP.data.PRD.srsIntervals.join(',') === '0,1,3,7', 'SRS 间隔 D0/D1/D3/D7');

// 2b) 词库完整性（PDF 逐词提取，30 天 1877 词）
section('2b. 词库完整性');
ok(APP.data.META.bankLoaded === true, '词库已加载标识');
ok(APP.data.GROUPS.length === 30, '30 天分组齐全');
ok(APP.data.wordsLoaded === 1877 && APP.data.wordsLoaded === APP.data.PRD.totalWordsPlanned, '词数 1877 与规划口径一致');
var allWords = 0, badWord = 0, emptyDay = 0;
APP.data.GROUPS.forEach(function (g) {
  if (!g.words.length) emptyDay++;
  g.words.forEach(function (w) { allWords++; if (!w.w || !w.mean) badWord++; });
});
ok(allWords === 1877 && emptyDay === 0 && badWord === 0, '每日有词且词条字段完整');
ok(APP.data.QUIZ.length === 150, '每日 5 题 × 30 天 = 150 题');
var d1q = APP.app.quizForDay();
ok(d1q.length === 5 && d1q[0].day === 1, '按天小测取到当日题');
ok(APP.app.groupForDay() === 0, 'D1 背词定位到 DAY 1 组');

// 3) 存档：迁移 + 持久化
section('3. 存档与迁移');
var st = APP.core.store.blank();
ok(st.version === 2 && st.day === 1, '空档默认值正确');
var migrated = APP.core.store.initState({ version: 1, day: 5 });
ok(migrated.day === 5 && Array.isArray(migrated.attempts) && !!migrated.wordState, '旧档缺字段补全');
APP.core.store.save(st);
ok(APP.core.store.load().version === 2, '存档写入读回');
APP.core.store.clear();
ok(APP.core.store.load().day === 1, '重置存档后回到 D1 空档');


// 2c) 背词联想文案（data/07_mnemonic.js）
section('2c. 背词联想文案');
var MN = APP.data.MN || {}, MNK = APP.data.MNK || {};
var MN_KINDS = ['curated', 'compound', 'deriv', 'family', 'root', 'affixword', 'near', 'spell'];
var mnTotal = 0, mnEmpty = 0, mnBadKind = 0, mnTooLong = 0;
APP.data.GROUPS.forEach(function (g) {
  g.words.forEach(function (w) {
    mnTotal++;
    var t = MN[w.w];
    if (!t || !String(t).trim()) { mnEmpty++; return; }
    if (String(t).length > 150) mnTooLong++;
    if (MN_KINDS.indexOf(MNK[w.w]) < 0) mnBadKind++;
  });
});
ok(mnTotal === 1877 && mnEmpty === 0, '每个词都有联想/拼读文案');
ok(mnBadKind === 0, '文案类型都在允许集合内');
ok(mnTooLong === 0, '单条文案不超过 150 字');

// 2d) 发音兜底：没有语音引擎时改走在线词典音频
section('2d. 发音兜底');
var spokenSrc = null;
sandbox.Audio = function (u) { spokenSrc = u; this.play = function () { return { catch: function () {} }; }; };
ok(APP.adapters.speech.say('evolve') === true, '无语音引擎时改用在线音频');
ok(!!spokenSrc && spokenSrc.indexOf('dictvoice') > 0 && spokenSrc.indexOf('evolve') > 0, '在线音频地址带目标单词');

// 2e) 连续切词不读错词（模拟上一句还在播时切到下一个词）
section('2e. 连续点击不读错词');
var spokeList = [], cancelCount = 0;
var fakeSynth = {
  speaking: false, pending: false,
  getVoices: function () { return [{ lang: 'en-US', localService: true }]; },
  speak: function (u) { spokeList.push(u.text); },
  cancel: function () { cancelCount++; },
  addEventListener: function () {}
};
var spSandbox = {
  console: console, setTimeout: setTimeout, clearTimeout: clearTimeout, document: sandbox.document,
  speechSynthesis: fakeSynth,
  SpeechSynthesisUtterance: function (t) { this.text = t; },
  Audio: function (u) { this.url = u; this.play = function () { return { catch: function () {} }; }; }
};
spSandbox.window = spSandbox;
vm.createContext(spSandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'adapters/speech.js'), 'utf8'), spSandbox, { filename: 'adapters/speech.js' });
var SP = spSandbox.APP.adapters.speech;
SP.say('alpha');
ok(spokeList.length === 1 && spokeList[0] === 'alpha', '没有在播时：立即朗读当前词');
fakeSynth.speaking = true;            // 上一句仍在播
SP.say('beta');
ok(cancelCount >= 1, '换词时先取消上一句');
ok(spokeList.length === 1, '上一句未退干净前不急着 speak（避免新词被吞）');

// 4b) 今日进度 / 天数推进
section('4b. 今日进度与天数推进');
APP.ui = { renderAll: function () {} };
APP.app.S.gi = 0; APP.app.S.wi = 0;
APP.app.setDay(1);
var dp0 = APP.app.dayProgress();
ok(dp0.done === 0 && dp0.total === APP.data.GROUPS[0].words.length, '今日进度初始 0 / N');
APP.app.grade(3);
ok(APP.app.dayProgress().done === 1 && APP.app.dayProgress().pct > 0, '判定一个词今日进度就上涨');
var dayLen = APP.data.GROUPS[0].words.length;
for (var gi = 0; gi < dayLen; gi++) APP.app.grade(3);
var lastWi = dayLen - 1;
APP.app.S.wi = lastWi;
APP.app.grade(3);
ok(APP.app.S.day === 1, '背完当天组仍停在 D1，不偷偷跨天');
ok(APP.app.S.wi === 0, '组尾回看：最后一个词判完回到组首');
ok(APP.app.dayProgress().pct === 100, '背完当天组今日进度 100%');
APP.app.setDay(2);
ok(APP.app.dayProgress().done === 0 && APP.app.S.day === 2, '进入 D2 后今日进度归零');

// 2f) speaking 标志卡死不误判（浏览器取消后常见）
var stuckSpoke = [], stuckCancel = 0;
var stuckSynth = {
  speaking: true, pending: false,               // 永远卡在"在播"
  getVoices: function () { return [{ lang: 'en-US', localService: true }]; },
  speak: function (u) {
    stuckSpoke.push(u.text);
    setTimeout(function () { u.onstart && u.onstart(); }, 0);
    setTimeout(function () { u.onend && u.onend(); }, 10);
  },
  cancel: function () { stuckCancel++; },
  resume: function () {},
  addEventListener: function () {}
};
var stuckBox = {
  console: console, setTimeout: setTimeout, clearTimeout: clearTimeout, document: sandbox.document,
  speechSynthesis: stuckSynth,
  SpeechSynthesisUtterance: function (t) { this.text = t; },
  Audio: function (u) { this.url = u; this.play = function () { return { catch: function () {} }; }; }
};
stuckBox.window = stuckBox;
vm.createContext(stuckBox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'adapters/speech.js'), 'utf8'), stuckBox, { filename: 'adapters/speech.js' });
var SP2 = stuckBox.APP.adapters.speech;
SP2.say('one');

// 4) 掌握度
section('4. 掌握度逻辑');
var ws = {};
APP.core.mastery.update(ws, 'inspect', 3, 1); // 记住
APP.core.mastery.update(ws, 'inspect', 3, 2);
ok(ws.inspect.correct === 2 && ws.inspect.stage === 2, '连续记住提升阶段');
APP.core.mastery.update(ws, 'advice', 1, 1);  // 不熟
ok(ws.advice.stage === 0 && ws.advice.wrong === 1, '不熟回炉到 D0');
var ms = APP.core.mastery.stats(ws);
ok(ms.learned === 2 && ms.weak >= 1, '掌握度统计正确');

// 5) SRS 到期队列
section('5. SRS 复习队列');
var ws2 = {};
APP.core.mastery.update(ws2, 'newA', 1, 5); // day5 学、不熟→stage0→nextDue=5+0=5
APP.core.mastery.update(ws2, 'newB', 3, 5); // day5 学、记住→stage1→nextDue=5+1=6
var due5 = APP.core.srs.dueWords(5, ws2);
ok(due5.indexOf('newA') >= 0 && due5.indexOf('newB') < 0, 'D0到期/记住词顺延到D1');
var due6 = APP.core.srs.dueWords(6, ws2);
ok(due6.indexOf('newB') >= 0, '记住词次日(D1)到期');
ok(APP.core.srs.wrongWords(ws2).indexOf('newA') >= 0, '错词本识别正确');

// 6) 判分
section('6. 判分逻辑');
var q5 = APP.data.QUIZ.slice(0, 5);
var qr = APP.core.grade.quiz(q5, q5.map(function (q) { return q.a; }));
ok(qr.right === 5 && qr.pct === 100, '小测全对判分正确');
var byType = {
  '词汇与语法': { right: 20, n: 20, pt: 30 },
  '完形填空': { right: 15, n: 20, pt: 20 },
  '阅读理解': { right: 6, n: 8, pt: 20 },
  '句子汉译英': { right: 3, n: 5, pt: 15 },
  '短文写作': { right: 1, n: 1, pt: 15 }
};
var mr = APP.core.grade.mock(byType);
ok(mr.score === 30 + 15 + 15 + 9 + 15 && mr.pass === true, '整卷判分与过线正确 (score=' + mr.score + ')');

// 7) 题型专项 / 整卷模考题库
section('7. 题库完整性（五大题型）');
var EX = APP.core.exam;
var V = APP.data.VOCAB || [], CZ = APP.data.CLOZE || [], RD = APP.data.READING || [];
var TR = APP.data.TRANS || [], WR = APP.data.WRITING || [];
ok(V.length === 60, '词汇语法题共 60 题（当前 ' + V.length + '）');
ok(CZ.length === 3, '完形短文共 3 篇（当前 ' + CZ.length + '）');
ok(RD.length === 6, '阅读短文共 6 篇（当前 ' + RD.length + '）');
ok(TR.length === 15, '汉译英共 15 句（当前 ' + TR.length + '）');
ok(WR.length === 3, '作文共 3 篇（当前 ' + WR.length + '）');

[1, 2, 3].forEach(function (p) {
  var v = V.filter(function (q) { return q.p === p; });
  ok(v.length === 20, '卷' + p + ' 词汇语法 20 题');
  var bad = v.filter(function (q) {
    return !q.stem || !q.o || q.o.length !== 4 || !(q.a >= 0 && q.a <= 3) || !q.e;
  });
  ok(bad.length === 0, '卷' + p + ' 词汇题字段完整（题干/4选项/答案/解析）');
  var dup = v.filter(function (q) { return new Set(q.o.map(function (x) { return x.toLowerCase(); })).size !== 4; });
  ok(dup.length === 0, '卷' + p + ' 词汇题选项无重复');

  var cz = CZ.filter(function (x) { return x.p === p; })[0];
  ok(!!cz && cz.blanks.length === 20, '卷' + p + ' 完形 20 空');
  if (cz) {
    var txt = cz.passage.join(' ');
    var miss = [];
    for (var i = 1; i <= 20; i++) { if (txt.indexOf('[' + i + ']') < 0) miss.push(i); }
    ok(miss.length === 0, '卷' + p + ' 完形短文空位标记齐全');
    ok(cz.blanks.every(function (b) { return b.o.length === 3 && b.a >= 0 && b.a <= 2 && b.e; }), '卷' + p + ' 完形三选一且答案合法');
  }

  var rd = RD.filter(function (x) { return x.p === p; });
  ok(rd.length === 2 && rd.every(function (r) { return r.qs.length === 4; }), '卷' + p + ' 阅读 2 篇各 4 题');
  ok(rd.every(function (r) {
    return r.qs.every(function (q) { return q.o.length === 4 && q.a >= 0 && q.a <= 3 && q.e; });
  }), '卷' + p + ' 阅读题字段完整');

  ok(TR.filter(function (x) { return x.p === p; }).length === 5, '卷' + p + ' 汉译英 5 句');
  var wr = WR.filter(function (x) { return x.p === p; })[0];
  ok(!!wr && wr.ref.join(' ').split(/\s+/).filter(Boolean).length >= 120, '卷' + p + ' 作文范文 ≥120 词');
});

section('8. 组卷与判分（54 题 / 100 分 / 60 过线）');
[1, 2, 3].forEach(function (p) {
  var paper = EX.build(p);
  ok(paper.count === 54, '卷' + p + ' 组卷题数 54（当前 ' + paper.count + '）');
  var items = EX.allItems(paper);
  var ans = {}, ansWrong = {};
  items.forEach(function (it) {
    if (it.sec === 'trans' || it.sec === 'writing') return;
    ans[it.no] = it.a;
    ansWrong[it.no] = (it.a + 1) % it.o.length;
  });
  var full = EX.scoreObjective(paper, ans);
  ok(full.score === 70 && full.full === 70, '卷' + p + ' 客观全对 70 分（当前 ' + full.score + '）');
  var zero = EX.scoreObjective(paper, ansWrong);
  ok(zero.score === 0, '卷' + p + ' 客观全错 0 分（当前 ' + zero.score + '）');
});

var p1 = EX.build(1);
var tFull = {}; p1.trans.forEach(function (t) { tFull[t.no] = 3; });
ok(EX.scoreSubjective(p1, tFull, 15).score === 30, '主观题满分 30');
ok(EX.scoreSubjective(p1, {}, 0).score === 0, '主观题零分 0');
var objFull = EX.scoreObjective(p1, (function () {
  var a = {};
  EX.allItems(p1).forEach(function (it) { if (it.sec !== 'trans' && it.sec !== 'writing') a[it.no] = it.a; });
  return a;
})());
var whole = EX.total(objFull, EX.scoreSubjective(p1, tFull, 15));
ok(whole.score === 100 && whole.pass === true, '整卷满分 100 且过线（当前 ' + whole.score + '）');
ok(EX.total(EX.scoreObjective(p1, {}), EX.scoreSubjective(p1, {}, 0)).score === 0, '整卷零分 0');

section('9. 专项练习抽题');
['vocab', 'cloze', 'reading', 'trans', 'writing'].forEach(function (t) {
  var got = true;
  for (var i = 0; i < 20; i++) { if (!EX.pickSpecial(t).length) got = false; }
  ok(got, '题型专项「' + t + '」20 次抽样均有题');
});
ok(EX.pickSpecial('vocab').length === 10, '词汇专项每轮 10 题');
ok(EX.pickSpecial('trans').length === 5, '翻译专项每轮 5 句');

// 汇总（先等异步的发音断言跑完）
setTimeout(function () {
  ok(spokeList.indexOf('beta') >= 0, '上一句未播完时切词，新词仍能读出来（不被吞）');
  ok(spokeList.length === 2, '每次点击只读一个词，旧词不重复念');
  // 2f：speaking 卡死时，第二句应立刻朗读、不因误判而 cancel
  var cancelBefore = stuckCancel;
  SP2.say('two');
  ok(stuckCancel === cancelBefore, 'speaking 卡死时不误判"在播"（不重复 cancel）');
  ok(stuckSpoke.indexOf('two') >= 0, 'speaking 卡死后仍能正常朗读下一句');
  console.log('\n========================================');
  console.log('PASS ' + pass + ' / FAIL ' + fail);
  console.log('========================================');
  process.exit(fail ? 1 : 0);
}, 500);
