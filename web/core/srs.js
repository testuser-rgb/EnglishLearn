/* ============================================================
 * core/srs.js —— 间隔重复复习队列（D0 / D1 / D3 / D7）
 * 到期判断：wordState[w].nextDue <= 当前 day，且已学过（seen>0）。
 * 纯逻辑，不碰 DOM。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var core = APP.core = APP.core || {};

  // 返回当天到期复习的词数组
  function dueWords(day, wordState) {
    return Object.keys(wordState).filter(function (w) {
      var st = wordState[w];
      return st.seen > 0 && (st.nextDue || 0) <= day;
    });
  }

  // 返回错词本（不熟次数 > 正确次数的词），供"顽固词回炉"
  function wrongWords(wordState) {
    return Object.keys(wordState).filter(function (w) {
      var st = wordState[w];
      return st.wrong > st.correct;
    });
  }

  // 构造今日背词队列：到期复习优先，其后接新词组（按组连续排队）
  function buildQueue(day, wordState, groups) {
    var due = dueWords(day, wordState);
    var fresh = [];
    (groups || []).forEach(function (g) {
      g.words.forEach(function (x) {
        if (due.indexOf(x.w) < 0 && !(wordState[x.w] && wordState[x.w].seen > 0)) fresh.push(x);
      });
    });
    return { due: due, fresh: fresh };
  }

  core.srs = { dueWords: dueWords, wrongWords: wrongWords, buildQueue: buildQueue };
})(window);
