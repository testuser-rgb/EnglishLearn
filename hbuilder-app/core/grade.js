/* ============================================================
 * core/grade.js —— 判分（官方口径：54 题 / 100 分 / 60 过线）
 * 五大题型分值：词汇语法30 / 完形20 / 阅读20 / 汉译英15 / 写作15
 * 小测按答对数给分；模考按 byType 汇总。纯逻辑。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var core = APP.core = APP.core || {};
  var PRD = APP.data.PRD;
  var PASS = PRD.exam.pass, FULL = PRD.exam.score;

  // 判小测：answers[i] === question.a 记正确
  function quiz(questions, answers) {
    var right = 0;
    questions.forEach(function (q, i) { if (answers[i] === q.a) right++; });
    return { right: right, total: questions.length, pct: questions.length ? Math.round(right / questions.length * 100) : 0 };
  }

  // 整卷判分：byType 形如 {词汇与语法:{right,n,pt},...}
  function mock(byType) {
    var total = 0;
    var detail = {};
    Object.keys(byType).forEach(function (name) {
      var b = byType[name];
      var s = b.n ? Math.round(b.right / b.n * b.pt) : 0;
      detail[name] = s;
      total += s;
    });
    return { score: total, full: FULL, pass: total >= PASS, byType: detail };
  }

  // 按分数给薄弱评级标签（供 UI 上色）
  function weakTag(ratio) {
    if (ratio >= 0.8) return 'g';
    if (ratio >= 0.6) return 'b';
    if (ratio >= 0.4) return 'a';
    return 'r';
  }

  core.grade = { quiz: quiz, mock: mock, weakTag: weakTag, PASS: PASS, FULL: FULL };
})(window);
