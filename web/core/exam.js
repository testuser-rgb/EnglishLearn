/* ============================================================
 * core/exam.js —— 组卷与判分（纯逻辑，不碰 DOM，可 Node 单测）
 * 官方口径：54 题 / 100 分 / 90 分钟 / 60 过线
 *   词汇与语法 20×1.5 = 30   完形 20×1 = 20   阅读 8×2.5 = 20
 *   汉译英 5×3 = 15          写作 1×15 = 15
 * 客观题（词汇/完形/阅读，共 70 分）自动判分；
 * 主观题（翻译 15 + 写作 15，共 30 分）由考生对照参考答案自评后计入。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var core = APP.core = APP.core || {};
  var data = APP.data;

  var SEC = [
    { key: 'vocab',   name: '词汇与语法', n: 20, pt: 30, per: 1.5, from: 1,  to: 20 },
    { key: 'cloze',   name: '完形填空',   n: 20, pt: 20, per: 1,   from: 21, to: 40 },
    { key: 'reading', name: '阅读理解',   n: 8,  pt: 20, per: 2.5, from: 41, to: 48 },
    { key: 'trans',   name: '句子汉译英', n: 5,  pt: 15, per: 3,   from: 49, to: 53 },
    { key: 'writing', name: '短文写作',   n: 1,  pt: 15, per: 15,  from: 54, to: 54 }
  ];
  var OBJECTIVE_PT = 70;       // 词汇30 + 完形20 + 阅读20
  var SUBJECTIVE_PT = 30;      // 翻译15 + 写作15
  var TIME_LIMIT = 90 * 60;    // 秒

  // 主观题自评档位（满分对齐：翻译 5×3=15，写作 15）
  var TRANS_LEVELS = [
    { v: 3, label: '完全正确' },
    { v: 2, label: '基本正确' },
    { v: 0, label: '错误或未答' }
  ];
  var WRITING_LEVELS = [
    { v: 15, label: '优秀（结构完整，语言准确，≥120 词）' },
    { v: 12, label: '良好（内容完整，少量语言错误）' },
    { v: 9,  label: '合格（基本切题，错误较多）' },
    { v: 5,  label: '待提高（偏题或不足 80 词）' }
  ];

  function shuffle(arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function paperCount() {
    var n = 0;
    (data.VOCAB || []).forEach(function (q) { if (q.p > n) n = q.p; });
    return n || 3;
  }

  function paperTitle(p) { return '模拟卷' + '一二三四五六七八九十'.charAt(p - 1); }

  /* 组卷：把六类数据拼成一张 54 题的卷子 */
  function build(p) {
    var paper = { p: p, title: paperTitle(p), vocab: [], cloze: null, reading: [], trans: [], writing: null, count: 0 };

    (data.VOCAB || []).filter(function (q) { return q.p === p; })
      .sort(function (a, b) { return a.no - b.no; })
      .forEach(function (q, i) {
        paper.vocab.push({ no: q.no, sec: 'vocab', secName: '词汇与语法', stem: q.stem, o: q.o, a: q.a, e: q.e, pt: SEC[0].per });
      });

    var cz = (data.CLOZE || []).filter(function (c) { return c.p === p; })[0];
    if (cz) {
      paper.cloze = {
        title: cz.title, passage: cz.passage, secName: '完形填空',
        blanks: cz.blanks.map(function (b) {
          return { no: 20 + b.n, blankNo: b.n, sec: 'cloze', secName: '完形填空', o: b.o, a: b.a, e: b.e, pt: SEC[1].per };
        })
      };
    }

    (data.READING || []).filter(function (r) { return r.p === p; })
      .sort(function (a, b) { return a.idx - b.idx; })
      .forEach(function (r, pi) {
        var qs = r.qs.map(function (q, qi) {
          return { no: 41 + pi * 4 + qi, sec: 'reading', secName: '阅读理解', q: q.q, o: q.o, a: q.a, e: q.e, pt: SEC[2].per, pi: pi };
        });
        paper.reading.push({ idx: r.idx, title: r.title, text: r.text, qs: qs });
      });

    (data.TRANS || []).filter(function (t) { return t.p === p; })
      .sort(function (a, b) { return a.no - b.no; })
      .forEach(function (t, i) {
        paper.trans.push({ no: 49 + i, sec: 'trans', secName: '句子汉译英', cn: t.cn, ref: t.ref, point: t.point, pt: SEC[3].per });
      });

    var wr = (data.WRITING || []).filter(function (w) { return w.p === p; })[0];
    if (wr) {
      paper.writing = { no: 54, sec: 'writing', secName: '短文写作', topic: wr.topic, cn: wr.cn, outline: wr.outline, words: wr.words, ref: wr.ref, pt: SEC[4].per };
    }

    paper.count = paper.vocab.length + (paper.cloze ? paper.cloze.blanks.length : 0) +
      paper.reading.reduce(function (n, r) { return n + r.qs.length; }, 0) + paper.trans.length + (paper.writing ? 1 : 0);
    return paper;
  }

  /* 取某卷全部可作答题目（按题号顺序，含题干/选项/答案） */
  function allItems(paper) {
    var list = paper.vocab.slice();
    if (paper.cloze) list = list.concat(paper.cloze.blanks);
    paper.reading.forEach(function (r) { list = list.concat(r.qs); });
    list = list.concat(paper.trans);
    if (paper.writing) list.push(paper.writing);
    return list;
  }

  /* 客观题判分：answers 为 {题号: 选项下标} */
  function scoreObjective(paper, answers) {
    var byType = {}, detail = [], total = 0;
    SEC.forEach(function (s) {
      if (s.key === 'trans' || s.key === 'writing') return;
      byType[s.name] = { right: 0, n: s.n, pt: s.pt };
    });

    allItems(paper).forEach(function (it) {
      if (it.sec === 'trans' || it.sec === 'writing') return;
      var got = answers[it.no];
      var ok = got !== undefined && got !== null && got === it.a;
      if (ok) byType[it.secName].right++;
      detail.push({ no: it.no, sec: it.secName, got: got, right: it.a, ok: ok });
    });

    Object.keys(byType).forEach(function (name) {
      var b = byType[name];
      b.score = b.n ? Math.round(b.right / b.n * b.pt * 10) / 10 : 0;
      total += b.score;
    });
    total = Math.round(total * 10) / 10;
    return { score: total, full: OBJECTIVE_PT, byType: byType, detail: detail };
  }

  /* 主观题得分：transScores 为 {题号: 分值}；writingScore 为分值 */
  function scoreSubjective(paper, transScores, writingScore) {
    var t = 0;
    paper.trans.forEach(function (it) {
      var v = transScores[it.no];
      t += (typeof v === 'number' ? v : 0);
    });
    var w = typeof writingScore === 'number' ? writingScore : 0;
    return { trans: Math.round(t * 10) / 10, writing: w, score: Math.round((t + w) * 10) / 10, full: SUBJECTIVE_PT };
  }

  /* 汇总 100 分制 */
  function total(objective, subjective) {
    var s = Math.round((objective.score + subjective.score) * 10) / 10;
    return {
      score: s, full: 100, pass: s >= APP.data.PRD.exam.pass,
      objective: objective, subjective: subjective
    };
  }

  /* 专项练习抽题：按题型返回题目集合 */
  function pickSpecial(type) {
    if (type === 'vocab') {
      return shuffle((data.VOCAB || []).slice()).slice(0, 10).map(function (q, i) {
        return { no: i + 1, sec: 'vocab', secName: '词汇与语法', stem: q.stem, o: q.o, a: q.a, e: q.e, pt: 3 };
      });
    }
    if (type === 'cloze') {
      var cz = shuffle((data.CLOZE || []).slice())[0];
      if (!cz) return [];
      return cz.blanks.map(function (b) {
        return { no: 20 + b.n, blankNo: b.n, sec: 'cloze', secName: '完形填空', o: b.o, a: b.a, e: b.e, pt: 1, _cz: cz };
      });
    }
    if (type === 'reading') {
      var rd = shuffle((data.READING || []).slice())[0];
      if (!rd) return [];
      return rd.qs.map(function (q, i) {
        return { no: i + 1, sec: 'reading', secName: '阅读理解', q: q.q, o: q.o, a: q.a, e: q.e, pt: 5, _rd: rd };
      });
    }
    if (type === 'trans') {
      return shuffle((data.TRANS || []).slice()).slice(0, 5).map(function (t, i) {
        return { no: i + 1, sec: 'trans', secName: '句子汉译英', cn: t.cn, ref: t.ref, point: t.point, pt: 3 };
      });
    }
    if (type === 'writing') {
      var wr = shuffle((data.WRITING || []).slice())[0];
      if (!wr) return [];
      return [{ no: 1, sec: 'writing', secName: '短文写作', topic: wr.topic, cn: wr.cn, outline: wr.outline, words: wr.words, ref: wr.ref, pt: 15 }];
    }
    return [];
  }

  core.exam = {
    SEC: SEC, OBJECTIVE_PT: OBJECTIVE_PT, SUBJECTIVE_PT: SUBJECTIVE_PT, TIME_LIMIT: TIME_LIMIT,
    TRANS_LEVELS: TRANS_LEVELS, WRITING_LEVELS: WRITING_LEVELS,
    paperCount: paperCount, paperTitle: paperTitle,
    build: build, allItems: allItems, scoreObjective: scoreObjective,
    scoreSubjective: scoreSubjective, total: total, pickSpecial: pickSpecial, shuffle: shuffle
  };
})(window);
