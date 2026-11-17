/* ============================================================
 * ui/phone_views.js —— 手机端表现层（390px 壳，今日/背词/小测/专项四屏）
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var ui = APP.ui = APP.ui || {};
  var app = APP.app, data = APP.data, core = APP.core;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function phNav(cur) {
    var items = [['home', '⌂', '今日'], ['vocab', '▦', '背词'], ['quiz', '✓', '小测'], ['exam', '译', '专项'], ['mock', '▣', '模考']];
    return '<div class="ph-nav">' + items.map(function (x) {
      return '<button class="' + (x[0] === cur ? 'on' : '') + '" onclick="phGo(\'' + x[0] + '\')"><span class="ico">' + x[1] + '</span>' + x[2] + '</button>';
    }).join('') + '</div>';
  }

  var MN_LB = { near: '形近区分', spell: '拼读' };
  function mnField(w) {
    var m = (data.MN && data.MN[w.w]) || w.skill || '';
    if (!m) return '';
    var k = (data.MNK && data.MNK[w.w]) || '';
    return '<div class="field mn" style="margin-top:14px"><div class="lb">' + (MN_LB[k] || '联想') + '</div><div class="val">' + esc(m) + '</div></div>';
  }

  function renderPhone() {
    var sc = document.getElementById('phoneScreen');
    if (!sc) return;
    var s = app.stats();
    var view = app.S.view || 'home';
    var stage = app.phase(app.S.day) === 1 ? '阶段一 · 背词' : '阶段二 · 应试';
    var tasks = app.taskList().map(function (t) {
      return '<div class="ph-task"><div class="ico" style="background:' + t.bg + ';color:' + t.fg + '">' + t.ico + '</div>' +
        '<div class="tx"><b>' + esc(t.name) + '</b><div>' + esc(t.desc) + '</div></div>' +
        '<button class="btn primary sm" onclick="phGo(\'' + t.go + '\')">' + t.btn + '</button></div>';
    }).join('');

    if (view === 'home') {
      var dp = app.dayProgress();
      var P1 = data.PRD.phase1Days;
      var dayPct = Math.round(Math.min(app.S.day, P1) / P1 * 100);
      var allDone = dp.total > 0 && dp.done >= dp.total;
      var nextDay = app.S.day + 1;
      var extra = '<div class="ph-card" style="margin-top:6px;text-align:left">' +
        '<div class="between"><b style="font-size:14px">今日进度</b><span class="badge ' + (app.phase(app.S.day) === 1 ? 'b' : 'a') + '">' + stage + '</span></div>' +
        '<div class="row" style="margin-top:14px;gap:18px">' +
        '<div style="position:relative;width:92px;height:92px;flex:none;border-radius:50%;background:conic-gradient(var(--brand) ' + (dp.pct * 3.6) + 'deg,#e8ecf3 0);display:grid;place-items:center"><div style="width:72px;height:72px;border-radius:50%;background:#fff;display:grid;place-items:center"><b style="font-size:20px">' + dp.pct + '%</b></div></div>' +
        '<div style="flex:1"><div class="small muted">当天词组已判定</div><div class="strong" style="font-size:15px;margin:2px 0 8px">' + dp.done + ' / ' + dp.total + ' 词</div><div class="small muted">累计已学 ' + s.learned + ' / ' + s.total + ' 词</div><div class="small muted">今日到期复习 ' + s.due + ' 词</div></div></div>' +
        '<div class="between small muted" style="margin-top:14px"><span>阶段进度</span><span>D' + app.S.day + ' / ' + P1 + '</span></div>' +
        '<div class="pbar" style="margin-top:6px"><i style="width:' + dayPct + '%"></i></div>' +
        (app.S.day < data.PRD.totalDays
          ? '<button class="btn ' + (allDone ? 'primary' : 'ghost') + ' sm" style="margin-top:14px;width:100%" onclick="setDay(S.day+1)">' + (allDone ? '✓ 今日已背完 · 进入 D' + nextDay : '完成今日 · 进入 D' + nextDay) + '</button>'
          : '<div class="small muted" style="margin-top:12px;text-align:center">已是最后一天</div>') +
        '</div>' +
        '<div class="ph-card" style="margin-top:10px;text-align:left"><div class="between"><b style="font-size:14px">距离考试</b><span class="badge g">目标 ' + core.grade.PASS + ' 分</span></div>' +
        '<div class="row" style="margin-top:10px;justify-content:space-between"><div><div class="small muted">剩余天数</div><div class="strong" style="font-size:22px">' + Math.max(0, data.PRD.totalDays - app.S.day) + ' <span class="small muted">天</span></div></div>' +
        '<div style="text-align:right"><div class="small muted">当前模考</div><div class="strong" style="font-size:22px;color:var(--green)">' + (s.mockLatest || '—') + ' <span class="small muted">分</span></div></div></div></div>';
      sc.innerHTML = '<div class="ph-head"><div><div class="t">今日学习</div><div class="sub">' + stage + ' · D' + app.S.day + '</div></div>' +
        '<div style="text-align:right"><span class="badge b">连续' + s.streak + '天</span><div style="margin-top:6px"><button class="btn ghost sm" style="padding:2px 9px;font-size:11px" onclick="resetAll()">重置</button></div></div></div>' +
        '<div class="ph-stats"><div class="ph-stat"><div class="v">' + s.learned + '</div><div class="k">已学词</div></div>' +
        '<div class="ph-stat"><div class="v">' + s.due + '</div><div class="k">待复习</div></div>' +
        '<div class="ph-stat"><div class="v">' + s.rate + '%</div><div class="k">认识率</div></div></div>' +
        '<input type="hidden" id="ph-view" value="home">' + tasks + extra + phNav('home');
    } else if (view === 'vocab') {
      var g = data.GROUPS[app.S.gi], w = g.words[app.S.wi];
      sc.innerHTML = '<div class="ph-head"><div><div class="t">背词卡</div><div class="sub">' + esc(g.type) + ' · ' + esc(g.name) + ' · ' + (app.S.wi + 1) + '/' + g.words.length + '</div></div><button class="btn ghost sm" onclick="phGo(\'home\')">返回</button></div>' +
        '<input type="hidden" id="ph-view" value="vocab">' +
        '<div class="ph-card"><div class="grp" style="display:inline-block;font-size:11px;padding:3px 10px;border-radius:20px;background:var(--purple-soft);color:var(--purple)">' + esc(g.tip) + '</div>' +
        '<div class="word" style="margin-top:16px">' + esc(w.w) + '</div><div class="ipa">' + esc(w.ipa) + ' <button class="say" onclick="say(\'' + esc(w.w) + '\',this)">🔊</button></div>' +
        '<div class="mean">' + esc(w.mean) + '</div>' +
        mnField(w) +
        (w.coll ? '<div class="field coll"><div class="lb">搭配</div><div class="val">' + esc(w.coll) + '</div></div>' : '') +
        '<div class="ph-grade"><button class="g1" onclick="phGrade(1)">不熟</button><button class="g2" onclick="phGrade(2)">模糊</button><button class="g3" onclick="phGrade(3)">记住</button></div></div>' + phNav('vocab');
    } else if (view === 'quiz') {
      var qs = app.quizForDay();
      if (app.S.quizIdx >= qs.length) {
        sc.innerHTML = '<div class="ph-head"><div class="t">每日小测</div></div><input type="hidden" id="ph-view" value="quiz">' +
          '<div class="ph-card" style="text-align:center;padding:30px 16px"><div style="font-size:44px">🎉</div><div class="strong" style="margin:10px 0">小测完成</div>' +
          '<div class="small muted">答对 ' + core.grade.quiz(qs, app.S.quizAnswers).right + '/' + qs.length + '</div>' +
          '<button class="btn primary sm" style="margin-top:16px" onclick="phGo(\'home\')">返回今日</button></div>' + phNav('quiz');
        return;
      }
      var q = qs[app.S.quizIdx];
      sc.innerHTML = '<div class="ph-head"><div><div class="t">每日小测</div><div class="sub">当天词 + 到期词</div></div><button class="btn ghost sm" onclick="phGo(\'home\')">返回</button></div>' +
        '<input type="hidden" id="ph-view" value="quiz">' +
        '<div class="ph-card" style="text-align:left"><div class="qmeta small muted">第 ' + (app.S.quizIdx + 1) + ' 题</div>' +
        '<div class="qtext" style="font-weight:600;margin:10px 0 16px">' + esc(q.q) + '</div>' +
        q.o.map(function (o, i) { return '<div class="opt" onclick="phAnswer(' + i + ')"><span class="k">' + 'ABCD'[i] + '</span>' + esc(o) + '</div>'; }).join('') +
        '<div class="explain" id="phexplain"></div></div>' + phNav('quiz');
    } else if (view === 'exam') {
      if (ui.phoneExamHome) ui.phoneExamHome(sc);
    } else if (view === 'mock') {
      if (ui.phoneMockHome) ui.phoneMockHome(sc);
    } else if (view === 'runner') {
      if (ui.phoneRunner) ui.phoneRunner(sc);
    }
  }

  ui.renderPhone = renderPhone;
  root.phGo = function (v) {
    app.S.view = v;
    // 换天后进背词：定位到当天词组（同一天内不动，保留当前位置）
    if (v === 'vocab' && (app.S.gi !== app.groupForDay() || app.S.vday !== app.S.day)) {
      app.S.gi = app.groupForDay(); app.S.wi = 0; app.S.vday = app.S.day;
    }
    var el = document.getElementById('ph-view'); if (el) el.value = v;
    renderPhone();
  };
  root.phGrade = function (g) { app.grade(g); renderPhone(); };
  root.phAnswer = function (i) {
    var q = app.quizForDay()[app.S.quizIdx];
    if (!q) return;
    var correct = i === q.a;
    app.answer(i);
    document.querySelectorAll('#phoneScreen .opt').forEach(function (e, idx) { e.onclick = null; if (idx === q.a) e.classList.add('right'); else if (idx === i) e.classList.add('wrong'); });
    var ex = document.getElementById('phexplain'); if (ex) { ex.classList.add('show'); ex.innerHTML = '<b>' + (correct ? '✓ 答对' : '✗ 答错') + '</b> · ' + esc(q.e); }
    setTimeout(function () { app.nextQuiz(); renderPhone(); }, 1400);
  };

})(window);
