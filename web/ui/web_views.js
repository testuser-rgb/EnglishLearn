/* ============================================================
 * ui/web_views.js —— Web 端表现层（只渲染 + 转发事件，不含业务规则）
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var ui = APP.ui = APP.ui || {};
  var app = APP.app, data = APP.data, core = APP.core;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function field(lb, val, cls) {
    if (!val) return '';   // PDF 未提供的字段直接不显示（词库无编造内容）
    return '<div class="field ' + (cls || '') + '"><div class="lb">' + lb + '</div><div class="val">' + esc(val) + '</div></div>';
  }

  // 联想：data.MN 由 data/build_mnemonic.js 生成，MNK 决定小标签（联想 / 形近 / 拼读）
  var MN_LB = { near: '形近区分', spell: '拼读' };
  function mnBlock(w) {
    var m = (data.MN && data.MN[w.w]) || w.skill || '';
    if (!m) return '';
    var k = (data.MNK && data.MNK[w.w]) || '';
    var lb = MN_LB[k] || '联想';
    return '<div class="field mn"><div class="lb">' + lb + '</div><div class="val">' + esc(m) + '</div></div>';
  }

  // 首页：统计 + 任务 + 掌握度 + 路径，全部真实数据驱动
  function renderHome() {
    var s = app.stats();
    var d = document.getElementById('dayNum'); if (d) d.textContent = app.S.day;
    var sw = document.getElementById('stWords');
    if (sw) sw.innerHTML = s.learned + ' <small>/ ' + s.total + '</small>';

    // 认识率
    var rateCard = document.querySelector('#w-home .stats .stat:nth-child(2)');
    if (rateCard) { rateCard.querySelector('.v').innerHTML = s.rate + '<small>%</small>'; var pb = rateCard.querySelector('.pbar i'); if (pb) pb.style.width = s.rate + '%'; }
    var dueCard = document.querySelector('#w-home .stats .stat:nth-child(3)');
    if (dueCard) dueCard.querySelector('.v').innerHTML = s.due + ' <small>词</small>';
    var streakCard = document.querySelector('#w-home .stats .stat:nth-child(4)');
    if (streakCard) streakCard.querySelector('.v').innerHTML = s.streak + ' <small>天</small>';

    // 阶段高亮
    var stages = document.querySelectorAll('#w-home .stagebar .s');
    if (stages.length >= 2) { stages[0].classList.toggle('on', app.phase(app.S.day) === 1); stages[1].classList.toggle('on', app.phase(app.S.day) === 2); }

    // 任务列表
    var html = '';
    app.taskList().forEach(function (t) {
      html += '<div class="task"><div class="t-ico" style="background:' + t.bg + ';color:' + t.fg + '">' + t.ico + '</div>' +
        '<div class="grow"><div class="t-name">' + esc(t.name) + '</div><div class="t-desc">' + esc(t.desc) + '</div></div>' +
        '<button class="t-go" onclick="go(\'' + t.go + '\')">' + t.btn + '</button></div>';
    });
    var tl = document.getElementById('w-tasklist'); if (tl) tl.innerHTML = html;
    var dt = document.querySelector('#w-home .card .section-title .badge'); if (dt) dt.textContent = 'D' + app.S.day;

    // 今日进度 + 完成今日（天数只能靠这里或顶栏推进，避免进度条“看着不动”）
    var dp = app.dayProgress();
    var dpg = document.getElementById('w-dayprog');
    if (dpg) dpg.innerHTML = '今日已判定 <b>' + dp.done + ' / ' + dp.total + '</b> 词（' + dp.pct + '%）';
    var nd = document.getElementById('w-nextday');
    if (nd) {
      if (app.S.day >= data.PRD.totalDays) { nd.textContent = '已是最后一天'; nd.disabled = true; }
      else {
        nd.disabled = false;
        nd.textContent = (dp.total > 0 && dp.done >= dp.total ? '✓ 今日已背完 · 进入 D' : '完成今日 · 进入 D') + (app.S.day + 1);
        nd.className = 'btn sm ' + (dp.total > 0 && dp.done >= dp.total ? 'primary' : 'ghost');
      }
    }

    // 掌握度档案
    var prof = document.querySelectorAll('#w-home .card.pad .pbar i');
    var counts = document.querySelectorAll('#w-home .card.pad .row.between.small.muted span:last-child');
    var totalLearn = Math.max(1, s.learned);
    var vals = [s.known, s.familiar, s.weak];
    if (prof.length >= 3) vals.forEach(function (v, i) { if (prof[i]) prof[i].style.width = Math.round(v / totalLearn * 100) + '%'; });
    if (counts.length >= 3) vals.forEach(function (v, i) { if (counts[i + (counts.length > 3 ? 1 : 0)]) counts[i + (counts.length > 3 ? 1 : 0)].textContent = v + ' 词'; });

    // 拼写档
    var st = document.getElementById('spellToggle'); if (st) st.textContent = app.S.spell ? '关闭拼写档' : '开启拼写档';
    var sh = document.getElementById('spellHint'); if (sh) sh.textContent = app.S.spell ? '拼写档已开：词卡新增拼写考核' : '当前只考"认识"，不要求拼写';

    // 路径条
    var pf = document.getElementById('pathFill1'); if (pf) pf.style.width = Math.min(100, Math.round(Math.min(app.S.day, 30) / 30 * 100)) + '%';
    var pathBadge = document.querySelector('#w-home .card.pad .section-title .badge');
    var allBadges = document.querySelectorAll('#w-home .badge');
    for (var i = 0; i < allBadges.length; i++) { if (allBadges[i].textContent.indexOf('当前 D') === 0) allBadges[i].textContent = '当前 D' + app.S.day; }
  }

  // 背词：单组连续 + 组尾回看（真实数据 + 掌握度）
  function renderVocab() {
    var groups = data.GROUPS;
    if (!groups.length) return;
    var g = groups[app.S.gi], w = g.words[app.S.wi];
    var dots = document.getElementById('dots');
    if (dots) dots.innerHTML = g.words.map(function (_, i) { return '<i class="' + (i < app.S.wi ? 'done' : '') + '"></i>'; }).join('');
    var vc = document.getElementById('vcard');
    if (vc) vc.innerHTML =
      '<div class="grp">' + esc(g.type) + ' · ' + esc(g.name) + '</div>' +
      '<div class="word">' + esc(w.w) + '</div>' +
      '<div class="ipa">' + esc(w.ipa) + ' <button class="say" onclick="say(\'' + esc(w.w) + '\',this)">🔊</button></div>' +
      '<div class="pos">' + esc(w.pos) + '</div><div class="mean">' + esc(w.mean) + '</div>' +
      mnBlock(w) + field('常见搭配', w.coll, 'coll') + field('拓展', w.ext, 'ext') + field('词源', w.origin, '') +
      (app.S.spell ? '<div class="field"><div class="lb">拼写测试</div><div class="val">请拼写：' + esc(w.mean) + '</div></div>' : '') +
      '<div class="grade"><button class="g1" onclick="grade(1)">跟它不熟</button><button class="g2" onclick="grade(2)">有点模糊</button><button class="g3" onclick="grade(3)">记住了</button></div>';
    var gh = '<h4>本组回看 · ' + esc(g.name) + '</h4><div class="small muted" style="margin-bottom:8px">' + esc(g.tip) + '</div>';
    g.words.forEach(function (x) { gh += '<div class="gmember"><span class="w">' + esc(x.w) + '</span><span class="m">' + esc(x.ipa) + ' ' + esc(x.mean) + '</span><button class="say" onclick="say(\'' + esc(x.w) + '\',this)">🔊</button></div>'; });
    var gc = document.getElementById('w-groupcard'); if (gc) gc.innerHTML = gh;
  }

  function renderQuiz() {
    var box = document.getElementById('quizBox');
    if (!box) return;
    var qs = app.quizForDay();
    if (app.S.quizIdx >= qs.length) {
      var r = core.grade.quiz(qs, app.S.quizAnswers);
      box.innerHTML = '<div style="text-align:center;padding:20px"><div style="font-size:44px">🎉</div><div class="section-title" style="justify-content:center;margin:10px 0">小测完成</div>' +
        '<div class="muted">答对 ' + r.right + '/' + r.total + '（' + r.pct + '%）· 结果已写入掌握度档案</div>' +
        '<button class="btn primary" style="margin-top:18px" onclick="go(\'home\')">返回今日</button></div>';
      return;
    }
    var q = qs[app.S.quizIdx];
    box.innerHTML = '<div class="qmeta">每日小测 · 第 ' + (app.S.quizIdx + 1) + ' / ' + qs.length + ' 题 <span class="badge b">当天新词+到期词</span></div>' +
      '<div class="qtext">' + esc(q.q) + '</div>' +
      q.o.map(function (o, i) { return '<div class="opt" onclick="answer(' + i + ')"><span class="k">' + 'ABCD'[i] + '</span>' + esc(o) + '</div>'; }).join('') +
      '<div class="explain" id="explain"></div>';
  }

  function showQuizResult(idx, picked, correct, q) {
    document.querySelectorAll('#w-quiz .opt').forEach(function (e, i) {
      e.onclick = null;
      if (i === q.a) e.classList.add('right');
      else if (i === picked) e.classList.add('wrong');
    });
    var ex = document.getElementById('explain');
    if (ex) { ex.classList.add('show'); ex.innerHTML = '<b>' + (correct ? '✓ 答对了' : '✗ 答错了') + '</b> · ' + esc(q.e) + ' <span class="badge a">错题已回流至次日复习</span>'; }
    setTimeout(nextQuiz, 1400);
  }

  // 题型专项 / 模考：交给 ui/exam_ui.js（真实题库 + 答题引擎）
  function renderExam() { if (ui.renderExamHome) ui.renderExamHome(); }
  function renderMock() { if (ui.renderMockHome) ui.renderMockHome(); }

  // 暴露
  ui.renderHome = renderHome; ui.renderVocab = renderVocab; ui.renderQuiz = renderQuiz;
  ui.showQuizResult = showQuizResult; ui.renderExam = renderExam; ui.renderMock = renderMock;

})(window);
