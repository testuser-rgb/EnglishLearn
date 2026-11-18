/* ============================================================
 * data/01_config.js —— PRD v1.3 口径常量 + 阶段计划
 * 学位英语备考系统 · 两个月规划（阶段一 30 天词 / 阶段二 30 天应试）
 * 真相源：PRD_学位英语备考系统_两个月规划_v1.0.md (v1.3)
 * 运行时只读，禁止改写这些常量。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var data = APP.data = APP.data || {};

  // 官方考试口径（用户截图确认，PRD 第二章）
  data.PRD = {
    phase1Days: 30,
    phase2Days: 30,
    totalDays: 60,
    totalWordsPlanned: 1877,   // 实际已灌入：PDF 逐词提取去重后 1877 条（PDF 自述 1873；原始 1878 条，polish 重复一次已去重）
    exam: { questions: 54, score: 100, pass: 60, minutes: 90 },
    reviewDailyMinutes: 10,    // 阶段二每天旧词回顾，全程不中断
    srsIntervals: [0, 1, 3, 7],// D0 / D1 / D3 / D7 见面
    types: [
      { name: '词汇与语法', n: 20, pt: 30, t: 20, ico: 'Aa', c: '#e8f0fe', fg: '#2563eb', detail: '四选一 · 词义辨析/短语/从句/虚拟' },
      { name: '完形填空',   n: 20, pt: 20, t: 15, ico: '▤', c: '#e7f7ec', fg: '#16a34a', detail: '20空 · 每空三选一 · 约250词短文' },
      { name: '阅读理解',   n: 8,  pt: 20, t: 20, ico: '▦', c: '#fdf3e2', fg: '#d97706', detail: '2篇各4题 · 主旨/细节/推理/词义' },
      { name: '句子汉译英', n: 5,  pt: 15, t: 15, ico: '译', c: '#f1eafe', fg: '#7c3aed', detail: '5个单句 · 情态/被动/从句' },
      { name: '短文写作',   n: 1,  pt: 15, t: 20, ico: '✎', c: '#fdecec', fg: '#dc2626', detail: '提纲作文 · ≥100词 · 三段式' }
    ]
  };

  // 阶段一 30 天分 5 周（PRD v1.3）：每周 6 天，累计目标词量
  data.WEEKS = [
    { w: 1, days: 'D1–6',   theme: '句子骨架 + 定语状语的位置',   words: 376,
      points: ['词性与术语入门', '主谓宾 / 主系表 / there be', '形容词定语前置、介词短语后置', '副词状语位置'],
      check: '能独立画出 10 个简单句的主语和谓语' },
    { w: 2, days: 'D7–12',  theme: '并列句 + 时态回顾',            words: 752,
      points: ['and/but/or/so 连接', '现在完成 vs 一般过去', '过去完成 had done', '时间状语从句主将从现'],
      check: '时态填空 20 题对 14 题以上' },
    { w: 3, days: 'D13–18', theme: '定语从句',                      words: 1128,
      points: ['that/which 指物', 'who/whom/whose 指人', 'where/when/why 作状语', '介词 + which'],
      check: '能把 10 个长句切分并译顺' },
    { w: 4, days: 'D19–24', theme: '状语从句 + 名词性从句',        words: 1504,
      points: ['时间/条件/让步/原因状语', 'that 不作成分', 'what 作成分', 'it 形式主语宾语'],
      check: '译出一整段含从句的原文（60 词）' },
    { w: 5, days: 'D25–30', theme: '非谓语动词 + 写作启动',        words: 1877,
      points: ['to do / doing / done', 'having done', '写作第 1–2 篇（范文→骨架→独立写）'],
      check: '做一篇阅读 8 题对 4–5 题；作文写出 100 词' }
  ];

  // 阶段二 30 天（D31–60）五大题型应试主线
  data.PHASE2_POINTS = [
    { range: 'D31–38', theme: '词汇语法专项', detail: '词义辨析 / 动词短语 / 定语从句 / 倒装 / 虚拟 / 被动' },
    { range: 'D39–46', theme: '完形填空专项', detail: '上下文逻辑词、三选一、约 250 词短文' },
    { range: 'D47–54', theme: '阅读理解专项', detail: '主旨/细节/推理/词义指代/NOT TRUE，2 篇 8 题' },
    { range: 'D55–58', theme: '汉译英 + 写作', detail: '情态/被动/让步/宾从；三段式 ≥100 词' },
    { range: 'D59–60', theme: '整卷模考冲刺', detail: '54 题 100 分 90 分钟，过 60 及格' }
  ];

  // 数据现状：2026-11-17 已灌入完整词库（PDF 逐词提取，30 天 1877 词 + 150 道自编小测）。
  // skill/coll/ext/origin 等字段 PDF 未提供，渲染层自动留空，不影响背词。
  data.META = {
    bankLoaded: true,
    label: '词库已加载 · 30天1877词',
    note: '词库来自《学位英语高频单词打卡30天.pdf》，中文释义逐词提取；小测为基于真实词条自编的选择题。'
  };

})(window);
