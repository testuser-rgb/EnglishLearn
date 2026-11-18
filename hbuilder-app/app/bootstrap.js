/* ============================================================
 * app/bootstrap.js —— 启动器：构建外壳、注册事件、首屏渲染
 * 所有脚本按 data → core → adapters → app/main → ui → bootstrap 顺序加载。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var app = APP.app, ui = APP.ui, data = APP.data;

  // 补 stats() 需要的最新模考分
  var _stats = app.stats;
  app.stats = function () {
    var s = _stats();
    s.mockLatest = app.S.mockScores.length ? app.S.mockScores[app.S.mockScores.length - 1].score : '—';
    return s;
  };

  // 构建 Web 侧栏（原型 init 逻辑，结构化）
  function buildShell() {
    var ws = document.getElementById('web-shell');
    if (!ws) return;
    if (ws.querySelector('.sidebar')) return; // 已构建
    var nav = [['home', '⌂', '今日驾驶舱'], ['vocab', '▦', '分组背词'], ['quiz', '✓', '每日小测'], ['exam', '译', '题型专项'], ['mock', '▣', '整卷模考']];
    var sb = document.createElement('div');
    sb.className = 'sidebar';
    sb.innerHTML = '<div class="navgroup">学习</div>' +
      nav.slice(0, 4).map(function (x) { return '<button class="nav ' + (x[0] === 'home' ? 'on' : '') + '" data-v="' + x[0] + '" onclick="go(\'' + x[0] + '\')"><span class="ico">' + x[1] + '</span>' + x[2] + '</button>'; }).join('') +
      '<div class="navgroup">检验</div>' +
      nav.slice(4).map(function (x) { return '<button class="nav" data-v="' + x[0] + '" onclick="go(\'' + x[0] + '\')"><span class="ico">' + x[1] + '</span>' + x[2] + '</button>'; }).join('') +
      '<div class="divider"></div><div class="small muted">规则：题库 / 逻辑两端同源<br>进度各存各的，互不干扰</div>' +
      '<div class="divider"></div><div class="small muted" style="font-size:11px">' + (data.META.bankLoaded ? '' : '⚠ ' + data.META.label + '<br>') + 'D' + app.S.day + ' · 存档存本机</div>';
    ws.insertBefore(sb, ws.firstChild);
    var rest = document.createElement('div');
    rest.className = 'web-main';
    while (ws.children.length > 1) rest.appendChild(ws.children[1]);
    ws.className = 'stage web-grid';
    ws.appendChild(rest);
  }

  // 渲染全部当前视图
  ui.renderAll = function () {
    // 侧栏高亮
    document.querySelectorAll('#web-shell .nav').forEach(function (e) { e.classList.toggle('on', e.dataset.v === app.S.view); });
    ui.renderHome();
    ui.renderExam();
    ui.renderMock();
    if (app.S.view === 'vocab') ui.renderVocab();
    if (app.S.view === 'quiz') ui.renderQuiz();
    if (app.S.view === 'runner' && ui.renderExamRunner) ui.renderExamRunner();
    if (app.S.dev === 'phone') ui.renderPhone();
  };

  // 模考倒计时：每秒刷新，归零自动交卷
  function fmtSec(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  setInterval(function () {
    var ex = app.S.exam;
    if (!ex.on || ex.mode !== 'mock' || ex.phase !== 'doing') return;
    var left = app.exTimerLeft();
    var el = document.getElementById('exTimer');
    if (el) { el.textContent = fmtSec(left); el.classList.toggle('warn', left < 300); }
    if (left <= 0) app.exSubmit();
  }, 1000);

  // 设备切换
  var seg = document.getElementById('deviceSeg');
  if (seg) seg.addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    document.querySelectorAll('#deviceSeg button').forEach(function (b) { b.classList.toggle('on', b === e.target); });
    app.S.dev = e.target.dataset.dev;
    document.getElementById('web-shell').classList.toggle('hide', app.S.dev !== 'web');
    document.getElementById('phone-shell').classList.toggle('hide', app.S.dev !== 'phone');
    if (app.S.dev === 'phone') ui.renderPhone();
  });

  root.devSwitch = function (dev) {
    var btn = document.querySelector('#deviceSeg button[data-dev="' + dev + '"]');
    if (btn) btn.click();
  };

  // 首次启动：App 端(window.XWYY_MODE==='phone')只渲染手机壳，不建 Web 侧栏
  var mode = root.XWYY_MODE || 'web';
  if (mode === 'phone') {
    app.S.dev = 'phone';
    var wsEl = document.getElementById('web-shell'); if (wsEl) wsEl.classList.add('hide');
    var psEl = document.getElementById('phone-shell'); if (psEl) psEl.classList.remove('hide');
    ui.renderPhone();
  } else {
    buildShell();
    ui.renderAll();
  }

  root.APP_READY = true;
})(window);
