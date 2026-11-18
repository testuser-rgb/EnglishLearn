/* ============================================================
 * core/mastery.js —— 掌握度（认识 / 眼熟 / 待强化）纯逻辑
 * 三档判定：1=不熟(重置) / 2=模糊(眼熟) / 3=认识
 * 不碰 DOM，可在 Node 环境单测。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var core = APP.core = APP.core || {};
  var PRD = APP.data.PRD;

  // 更新某个词的掌握度；写回 wordState（不直接存档，由调用方 save）
  function update(wordState, w, g, day) {
    var st = wordState[w] || { seen: 0, correct: 0, wrong: 0, lastDay: 0, stage: 0, nextDue: 0 };
    st.seen += 1;
    st.lastDay = day;
    if (g === 3) { st.correct += 1; st.stage = Math.min(st.stage + 1, PRD.srsIntervals.length - 1); }
    else if (g === 2) { st.stage = Math.max(0, st.stage); } // 眼熟：停留当前阶段
    else { st.wrong += 1; st.stage = 0; }                    // 不熟：回炉，重新从 D0 起
    st.nextDue = day + PRD.srsIntervals[st.stage];
    wordState[w] = st;
    return st;
  }

  // 掌握度分布统计
  function stats(wordState) {
    var known = 0, familiar = 0, weak = 0, list = Object.keys(wordState);
    list.forEach(function (w) {
      var st = wordState[w];
      var ratio = st.seen ? st.correct / st.seen : 0;
      if (st.wrong > st.correct || ratio < 0.5) weak++;
      else if (ratio >= 0.8) known++;
      else familiar++;
    });
    return { known: known, familiar: familiar, weak: weak, learned: list.length,
      rate: list.length ? Math.round(known / list.length * 100) : 0 };
  }

  // 认识率（对已学词抽样口径）：正确次数 / 作答次数
  function recognitionRate(wordState) {
    var seen = 0, correct = 0;
    Object.keys(wordState).forEach(function (w) { seen += wordState[w].seen || 0; correct += wordState[w].correct || 0; });
    return seen ? Math.round(correct / seen * 100) : 0;
  }

  core.mastery = { update: update, stats: stats, recognitionRate: recognitionRate };
})(window);
