/* ============================================================
 * app/main.js —— 应用状态与用例编排
 * 负责：加载存档、天数切换、任务列表、三档判定、答题、模考记录、双端视图渲染调度。
 * 依赖：APP.data / APP.core / APP.adapters（按序加载）；表现层由 ui/*.js 提供 APP.ui。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var app = APP.app = APP.app || {};

  // 运行时状态（S 为兼容原型 onclick 的全局引用）
  var state = APP.core.store.load();
  var S = root.S = {
    day: state.day,
    spell: state.spellEnabled,
    gi: 0, wi: 0,             // 当前词组 / 词序
    grade: [],
    dev: 'web',               // web | phone
    view: 'home',
    quizIdx: 0,
    quizAnswers: [],
    mockScores: state.mocks.slice(),
    exam: blankExam()
  };

  function persist() {
    state.day = S.day;
    state.spellEnabled = S.spell;
    APP.core.store.save(state);
  }

  // ---- 阶段判断 ----
  function phase(day) { return day <= APP.data.PRD.phase1Days ? 1 : 2; }

  // ---- 今日任务（真实数据驱动）----
  function taskList() {
    var a = [];
    var due = APP.core.srs.dueWords(S.day, state.wordState).length;
    if (phase(S.day) === 1) {
      a.push({ ico: '▦', bg: 'var(--brand-soft)', fg: 'var(--brand)', name: '分组背词 · 新词', desc: '词根 / 联想记忆，先求认识', go: 'vocab', btn: '开始背' });
      a.push({ ico: '↻', bg: 'var(--amber-soft)', fg: 'var(--amber)', name: '到期复习 · ' + due + ' 词', desc: 'D1 / D3 / D7 到期词，混眼熟', go: 'vocab', btn: '复习' });
      a.push({ ico: '✓', bg: 'var(--green-soft)', fg: 'var(--green)', name: '每日小测 · ' + quizForDay().length + ' 题', desc: '当天新词自编选择题，检验眼熟度', go: 'quiz', btn: '去小测' });
    } else {
      a.push({ ico: '↻', bg: 'var(--amber-soft)', fg: 'var(--amber)', name: '旧词回顾 · ' + APP.data.PRD.reviewDailyMinutes + ' 分钟', desc: '全程不中断，单词要一直看', go: 'vocab', btn: '回顾' });
      a.push({ ico: '译', bg: 'var(--purple-soft)', fg: 'var(--purple)', name: '题型专项 · 按薄弱点', desc: '五大题型 · 真实题库练习', go: 'exam', btn: '去练习' });
      a.push({ ico: '▣', bg: 'var(--brand-soft)', fg: 'var(--brand)', name: '整卷模考', desc: '54题 / 100分 / 90分钟', go: 'mock', btn: '开始模考' });
    }
    return a;
  }

  // ---- 真实统计 ----
  function stats() {
    var ms = APP.core.mastery.stats(state.wordState);
    var learned = APP.data.META.bankLoaded ? ms.learned : ms.learned;
    var total = APP.data.PRD.totalWordsPlanned;
    var due = APP.core.srs.dueWords(S.day, state.wordState).length;
    return {
      learned: learned, total: total,
      rate: APP.core.mastery.recognitionRate(state.wordState),
      due: due, known: ms.known, familiar: ms.familiar, weak: ms.weak,
      streak: Object.keys(state.reviewLog).filter(function (k) { return state.reviewLog[k] && state.reviewLog[k].done; }).length
    };
  }

  // ---- 动作 ----
  function setDay(d) {
    S.day = Math.max(1, Math.min(APP.data.PRD.totalDays, Number(d) || 1));
    persist();
    APP.ui.renderAll();
  }
  // 当天词库组：阶段一按 D1–D30 对应 DAY 1–30；阶段二循环回顾
  function groupForDay() {
    var n = APP.data.GROUPS.length;
    return n ? (S.day <= n ? S.day - 1 : (S.day - 1) % n) : 0;
  }
  // 当天小测（无当日题时回退到全部题库）
  function quizForDay() {
    var all = APP.data.QUIZ || [];
    var mine = all.filter(function (q) { return q.day === S.day; });
    return mine.length ? mine : all;
  }
  // Web 端视图切换：显示目标 .view，隐藏其余（id 形如 w-home / w-vocab）
  function showView(v) {
    var shell = document.getElementById('web-shell');
    if (!shell) return;
    var views = shell.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) {
      views[i].classList.toggle('hide', views[i].id !== 'w-' + v);
    }
  }
  function go(v) {
    S.view = v;
    showView(v);
    if (v === 'vocab') { S.gi = groupForDay(); S.wi = 0; }
    if (v === 'quiz') { S.quizIdx = 0; S.quizAnswers = []; }
    APP.ui.renderAll();
  }
  function grade(g) {
    var groups = APP.data.GROUPS;
    var w = groups[S.gi].words[S.wi];
    APP.core.mastery.update(state.wordState, w.w, g, S.day);
    state.attempts.push({ day: S.day, w: w.w, g: g, ts: Date.now() });
    persist();
    S.grade.push(g);
    var inDayGroup = S.gi === groupForDay();
    if (S.wi < groups[S.gi].words.length - 1) S.wi++;
    else if (inDayGroup) S.wi = 0;                              // 当天组内循环（组尾回看），不偷偷跨天
    else if (S.gi < groups.length - 1) { S.gi++; S.wi = 0; }
    else { S.gi = 0; S.wi = 0; }
    APP.ui.renderAll();
  }

  // 今日进度：当天词组的已判定词数 / 词组词数（按 lastDay === 今天 统计，重看不会重复计数）
  function dayProgress() {
    var g = APP.data.GROUPS[groupForDay()];
    if (!g) return { done: 0, total: 0, pct: 0 };
    var done = 0;
    g.words.forEach(function (x) {
      var st = state.wordState[x.w];
      if (st && st.lastDay === S.day && st.seen > 0) done++;
    });
    return {
      done: done, total: g.words.length,
      pct: g.words.length ? Math.round(done / g.words.length * 100) : 0
    };
  }
  function answer(i) {
    var q = quizForDay()[S.quizIdx];
    if (!q) return;
    var correct = i === q.a;
    S.quizAnswers[S.quizIdx] = i;
    APP.core.mastery.update(state.wordState, q.w, correct ? 3 : 1, S.day);
    state.attempts.push({ day: S.day, w: q.w, correct: correct, ts: Date.now() });
    persist();
    APP.ui.showQuizResult(S.quizIdx, i, correct, q);
  }
  function nextQuiz() { S.quizIdx++; APP.ui.renderAll(); }
  function toggleSpell() { S.spell = !S.spell; persist(); APP.ui.renderAll(); }
  function saveMock(score, byType) {
    state.mocks.push({ day: S.day, score: score, byType: byType });
    S.mockScores = state.mocks.slice();
    persist();
  }
  function resetAll() {
    if (!root.confirm('将清空本机全部学习记录（背词判定、小测、模考成绩），且无法恢复。确定重置吗？')) return;
    APP.core.store.clear();
    root.location.reload();
  }

  /* ==================== 题型专项 / 整卷模考（状态机） ==================== */
  var EX = APP.core.exam;

  function blankExam() {
    return {
      on: false, mode: '', type: '', p: 0, paper: null, items: [],
      answers: {}, trans: {}, writing: '', self: {},
      phase: 'doing', deadline: 0, startAt: 0, result: null
    };
  }

  // 模考进度存入 flags.activeExam（刷新/误关后可续做）；专项练习短，不持久化
  function saveActive() {
    if (S.exam.on && S.exam.mode === 'mock' && S.exam.phase !== 'done') {
      state.flags.activeExam = {
        p: S.exam.p, answers: S.exam.answers, trans: S.exam.trans,
        writing: S.exam.writing, self: S.exam.self, phase: S.exam.phase,
        deadline: S.exam.deadline, startAt: S.exam.startAt
      };
    } else if (S.exam.phase === 'done' || !S.exam.on) {
      delete state.flags.activeExam;
    }
    persist();
  }

  function hasActiveExam() {
    var a = state.flags && state.flags.activeExam;
    return !!(a && a.p);
  }

  function restoreActive() {
    var a = state.flags && state.flags.activeExam;
    if (!a || !a.p) return false;
    S.exam = blankExam();
    S.exam.on = true; S.exam.mode = 'mock'; S.exam.p = a.p;
    S.exam.paper = EX.build(a.p);
    S.exam.answers = a.answers || {};
    S.exam.trans = a.trans || {};
    S.exam.writing = a.writing || '';
    S.exam.self = a.self || {};
    S.exam.phase = a.phase || 'doing';
    S.exam.deadline = a.deadline || 0;
    S.exam.startAt = a.startAt || Date.now();
    return true;
  }

  function exStart(mode, arg) {
    S.exam = blankExam();
    S.exam.on = true; S.exam.mode = mode;
    if (mode === 'mock') {
      S.exam.p = Math.max(1, Math.min(EX.paperCount(), Number(arg) || 1));
      S.exam.paper = EX.build(S.exam.p);
      S.exam.startAt = Date.now();
      S.exam.deadline = S.exam.startAt + EX.TIME_LIMIT * 1000;
      saveActive();
    } else {
      S.exam.type = arg;
      S.exam.items = EX.pickSpecial(arg);
    }
    go('runner');
  }

  // 继续上次未交卷的模考
  function exResume() {
    if (restoreActive()) go('runner');
  }

  function exPick(no, idx) {
    var ex = S.exam;
    if (!ex.on || ex.phase !== 'doing') return;
    ex.answers[no] = Number(idx);
    saveActive();
    APP.ui.refreshExam();
  }

  function exInput(no, text) {
    var ex = S.exam;
    if (!ex.on) return;
    ex.trans[no] = String(text || '');
    saveActive();
  }

  function exWriteText(text) {
    var ex = S.exam;
    if (!ex.on) return;
    ex.writing = String(text || '');
    saveActive();
  }

  function exSelf(no, v) {
    var ex = S.exam;
    if (!ex.on) return;
    ex.self[no] = Number(v);
    saveActive();
    APP.ui.refreshExam();
  }

  function exSelfWriting(v) {
    var ex = S.exam;
    if (!ex.on) return;
    ex.self.w = Number(v);
    saveActive();
    APP.ui.refreshExam();
  }

  var OBJ_TYPES = ['vocab', 'cloze', 'reading'];

  function exSubmit() {
    var ex = S.exam;
    if (!ex.on || ex.phase !== 'doing') return;
    if (ex.mode === 'special' && OBJ_TYPES.indexOf(ex.type) >= 0) {
      var right = 0;
      ex.items.forEach(function (it) { if (ex.answers[it.no] === it.a) right++; });
      ex.result = {
        kind: 'obj', right: right, total: ex.items.length,
        pct: ex.items.length ? Math.round(right / ex.items.length * 100) : 0
      };
      ex.phase = 'done';
    } else {
      ex.phase = 'self';
    }
    saveActive();
    APP.ui.renderAll();
  }

  function exFinish() {
    var ex = S.exam;
    if (!ex.on) return;
    if (ex.mode === 'mock') {
      var obj = EX.scoreObjective(ex.paper, ex.answers);
      var sub = EX.scoreSubjective(ex.paper, ex.self, ex.self.w);
      var t = EX.total(obj, sub);
      var byType = {};
      Object.keys(obj.byType).forEach(function (k) {
        var b = obj.byType[k];
        byType[k] = { score: b.score, full: b.pt, right: b.right, n: b.n };
      });
      byType['句子汉译英'] = { score: sub.trans, full: 15 };
      byType['短文写作'] = { score: sub.writing, full: 15 };
      ex.result = { kind: 'mock', obj: obj, sub: sub, total: t, byType: byType };
      state.mocks.push({ day: S.day, score: t.score, pass: t.pass, p: ex.p, byType: byType, ts: Date.now() });
      S.mockScores = state.mocks.slice();
    } else {
      var sum = 0, full = 0;
      ex.items.forEach(function (it) {
        full += it.pt;
        if (it.sec === 'trans') sum += (ex.self[it.no] || 0);
      });
      if (ex.type === 'writing') { sum = ex.self.w || 0; full = 15; }
      ex.result = { kind: 'sub', score: Math.round(sum * 10) / 10, full: full };
    }
    ex.phase = 'done';
    delete state.flags.activeExam;
    persist();
    APP.ui.renderAll();
  }

  function exExit() {
    var ex = S.exam;
    var back = ex.mode === 'special' ? 'exam' : 'mock';
    if (ex.on && ex.phase === 'doing') {
      var msg = ex.mode === 'mock'
        ? '退出后本次作答会保留，下次可从模考页继续。确定退出吗？'
        : '退出后本次练习作答将不保存，确定退出吗？';
      if (!root.confirm(msg)) return;
    }
    if (ex.mode === 'special') S.exam.on = false;
    go(back);
  }

  function exTimerLeft() {
    var ex = S.exam;
    if (!ex.on || ex.mode !== 'mock' || !ex.deadline) return null;
    return Math.max(0, Math.floor((ex.deadline - Date.now()) / 1000));
  }

  // 已作答数（客观题按选项，主观题按是否填了内容）
  function exProgress() {
    var ex = S.exam;
    if (!ex.on) return { done: 0, total: 0 };
    if (ex.mode === 'mock') {
      var items = EX.allItems(ex.paper), done = 0;
      items.forEach(function (it) {
        if (it.sec === 'trans') { if ((ex.trans[it.no] || '').trim()) done++; }
        else if (it.sec === 'writing') { if ((ex.writing || '').trim()) done++; }
        else if (ex.answers[it.no] !== undefined) done++;
      });
      return { done: done, total: items.length };
    }
    var d = 0;
    ex.items.forEach(function (it) {
      if (it.sec === 'trans') { if ((ex.trans[it.no] || '').trim()) d++; }
      else if (it.sec === 'writing') { if ((ex.writing || '').trim()) d++; }
      else if (ex.answers[it.no] !== undefined) d++;
    });
    return { done: d, total: ex.items.length };
  }

  // 启动时恢复未完成模考
  restoreActive();

  // 暴露给表现层与 onclick
  app.S = S;
  app.state = state;
  app.phase = phase;
  app.groupForDay = groupForDay;
  app.quizForDay = quizForDay;
  app.taskList = taskList;
  app.stats = stats;
  app.dayProgress = dayProgress;
  app.setDay = setDay;
  app.go = go;
  app.grade = grade;
  app.answer = answer;
  app.nextQuiz = nextQuiz;
  app.toggleSpell = toggleSpell;
  app.saveMock = saveMock;
  app.resetAll = resetAll;
  app.persist = persist;
  app.exStart = exStart;
  app.exResume = exResume;
  app.exPick = exPick;
  app.exInput = exInput;
  app.exWriteText = exWriteText;
  app.exSelf = exSelf;
  app.exSelfWriting = exSelfWriting;
  app.exSubmit = exSubmit;
  app.exFinish = exFinish;
  app.exExit = exExit;
  app.exTimerLeft = exTimerLeft;
  app.exProgress = exProgress;
  app.hasActiveExam = hasActiveExam;

  // 把常用函数挂到全局，兼容原型内联 onclick
  root.setDay = setDay; root.go = go; root.grade = grade; root.answer = answer;
  root.nextQuiz = nextQuiz; root.toggleSpell = toggleSpell; root.resetAll = resetAll;
  root.say = APP.adapters.speech.say;
  root.exStart = exStart; root.exResume = exResume; root.exPick = exPick;
  root.exInput = exInput; root.exWriteText = exWriteText; root.exSelf = exSelf;
  root.exSelfWriting = exSelfWriting; root.exSubmit = exSubmit; root.exFinish = exFinish;
  root.exExit = exExit;

})(window);
