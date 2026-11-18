/* ============================================================
 * ui/exam_ui.js —— 题型专项 / 整卷模考的视图层（Web 与 App 共用）
 * 三个视图：
 *   renderExamHome()  题型专项首页（5 张题型卡）
 *   renderMockHome()  整卷模考首页（3 套卷 + 成绩趋势 + 续做）
 *   renderRunner()    答题运行器（doing / self 自评 / done 报告 三态）
 * 只负责渲染与事件绑定，判分与状态全在 APP.core.exam / APP.app。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var ui = APP.ui = APP.ui || {};
  var data = APP.data, app = APP.app, EX = APP.core.exam;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function fmtTime(sec) {
    if (sec == null) return '';
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function phNav(cur) {
    var items = [['home', '⌂', '今日'], ['vocab', '▦', '背词'], ['quiz', '✓', '小测'], ['exam', '译', '专项'], ['mock', '▣', '模考']];
    return '<div class="ph-nav">' + items.map(function (x) {
      return '<button class="' + (x[0] === cur ? 'on' : '') + '" onclick="phGo(\'' + x[0] + '\')"><span class="ico">' + x[1] + '</span>' + x[2] + '</button>';
    }).join('') + '</div>';
  }

  /* ---------------- 题型专项首页 ---------------- */
  var TYPE_CARDS = [
    { key: 'vocab',   name: '词汇与语法', ico: 'Aa', n: 60,  unit: '题',  desc: '四选一 · 时态/从句/非谓语/虚拟/短语', per: '每轮抽 10 题，答一题判一题' },
    { key: 'cloze',   name: '完形填空',   ico: '▤',  n: 3,   unit: '篇',  desc: '20 空 · 每空三选一 · 约 300 词短文', per: '每轮 1 篇 20 空' },
    { key: 'reading', name: '阅读理解',   ico: '▦',  n: 6,   unit: '篇',  desc: '2 篇 → 每轮 1 篇 4 题', per: '主旨/细节/推理/词义/NOT TRUE' },
    { key: 'trans',   name: '句子汉译英', ico: '译', n: 15,  unit: '句',  desc: '情态/被动/从句/比较/非谓语', per: '每轮抽 5 句，对照参考译文自评' },
    { key: 'writing', name: '短文写作',   ico: '✎',  n: 3,   unit: '篇',  desc: '提纲作文 · ≥120 词 · 三段式', per: '写完后对照范文自评' }
  ];

  ui.renderExamHome = function () {
    var el = document.getElementById('examRoot');
    if (!el) return;
    el.innerHTML =
      '<div class="notice">题库全部自编，按江苏联盟学位英语命题规格校准（篇幅 / 题量 / 分值 / 题材），未使用任何真题原句。选一个题型开始练习。</div>' +
      '<div class="exam-grid">' + TYPE_CARDS.map(function (t) {
        return '<div class="exam-card ex-start" onclick="exStart(\'special\',\'' + t.key + '\')">' +
          '<div class="qb">' + t.ico + '</div>' +
          '<div class="qt">' + esc(t.name) + '</div>' +
          '<div class="qm">' + esc(t.desc) + '</div>' +
          '<div class="qd">题库 ' + t.n + ' ' + t.unit + ' · ' + esc(t.per) + '</div>' +
          '<div class="ex-go">开始练习 →</div></div>';
      }).join('') + '</div>';
  };

  /* ---------------- 整卷模考首页 ---------------- */
  function paperStat(p) {
    var list = (app.S.mockScores || []).filter(function (m) { return m.p === p; });
    if (!list.length) return { n: 0, best: null };
    var best = list.reduce(function (a, b) { return b.score > a ? b.score : a; }, 0);
    return { n: list.length, best: best };
  }

  function trendHtml() {
    var scores = app.S.mockScores || [];
    if (!scores.length) {
      return '<div class="small muted" style="padding:20px 0">尚无模考记录。完成一套整卷模考后，这里会显示成绩趋势与及格线（60 分）参考。</div>';
    }
    return scores.map(function (s, i) {
      var v = s.score;
      return '<div class="row" style="margin-bottom:10px"><span class="small muted" style="width:64px">第' + (i + 1) + '套' +
        (s.p ? '(' + EX.paperTitle(s.p) + ')' : '') + '</span>' +
        '<div class="pbar ' + (v >= 60 ? 'g' : 'a') + '" style="flex:1"><i style="width:' + v + '%"></i></div>' +
        '<span class="small strong" style="width:34px;text-align:right">' + v + '</span></div>';
    }).join('') + '<div class="small muted" style="margin-top:12px">及格参考：60 分（官方口径）· 满分 100</div>';
  }

  ui.renderMockHome = function () {
    var el = document.getElementById('mockRoot');
    if (!el) return;
    var resume = app.hasActiveExam();
    var html = '';

    if (resume) {
      html += '<div class="card pad ex-resume"><div class="between wrap">' +
        '<div><b>有一场模考还没交卷</b><div class="small muted">进度已保存，退出浏览器也不会丢；倒计时从进入时继续。</div></div>' +
        '<button class="btn primary sm" onclick="exResume()">继续上次模考 →</button></div></div>';
    }

    html += '<div class="card pad"><div class="section-title">选择试卷 <span class="badge b">54 题 / 100 分 / 90 分钟</span></div>' +
      '<div class="paper-grid">' + Array.apply(null, { length: EX.paperCount() }).map(function (_, i) {
        var p = i + 1, st = paperStat(p);
        return '<div class="paper-card">' +
          '<div class="pc-t">' + EX.paperTitle(p) + '</div>' +
          '<div class="pc-m">词汇 20 · 完形 20 · 阅读 8 · 翻译 5 · 写作 1</div>' +
          '<div class="pc-s">' + (st.n ? '已考 ' + st.n + ' 次 · 最高 ' + st.best + ' 分' : '尚未作答') + '</div>' +
          '<button class="btn primary sm" onclick="exStart(\'mock\',' + p + ')">' + (st.n ? '再考一次' : '开始模考') + '</button>' +
          '</div>';
      }).join('') + '</div>' +
      '<div class="small muted" style="margin-top:12px">客观题（词汇 + 完形 + 阅读，共 70 分）自动判分；翻译 15 分与写作 15 分由你对照参考答案自评后计入总分。</div>' +
      '</div>';

    html += '<div class="card pad" style="margin-top:18px"><div class="section-title">模考成绩趋势</div>' + trendHtml() + '</div>';
    el.innerHTML = html;
  };

  /* ---------------- 手机端三个入口（复用同一套题目块） ---------------- */
  ui.phoneExamHome = function (el) {
    el.innerHTML = '<input type="hidden" id="ph-view" value="exam">' +
      '<div class="ph-head"><div><div class="t">题型专项</div><div class="sub">五大题型 · 全部自编题库</div></div></div>' +
      TYPE_CARDS.map(function (t) {
        return '<div class="ph-card ex-ph-start" onclick="exStart(\'special\',\'' + t.key + '\')">' +
          '<div class="between"><div class="row" style="gap:10px"><div class="ico" style="width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--brand-soft);color:var(--brand);font-weight:700">' + t.ico + '</div>' +
          '<div><b style="font-size:14px">' + esc(t.name) + '</b><div class="small muted">' + esc(t.desc) + '</div></div></div>' +
          '<span class="badge b">练习</span></div>' +
          '<div class="small muted" style="margin-top:8px">' + esc(t.per) + '</div></div>';
      }).join('') + phNav('exam');
  };

  ui.phoneMockHome = function (el) {
    var resume = app.hasActiveExam();
    var cards = Array.apply(null, { length: EX.paperCount() }).map(function (_, i) {
      var p = i + 1, st = paperStat(p);
      return '<div class="ph-card"><div class="between"><b>试卷' + '一二三四'[i] + '</b><span class="badge ' + (st.n ? 'g' : 'b') + '">' +
        (st.n ? '最高 ' + st.best : '未作答') + '</span></div>' +
        '<div class="small muted" style="margin:6px 0 10px">54 题 · 100 分 · 90 分钟</div>' +
        '<button class="btn primary sm" onclick="exStart(\'mock\',' + p + ')">' + (st.n ? '再考一次' : '开始模考') + '</button></div>';
    }).join('');
    el.innerHTML = '<input type="hidden" id="ph-view" value="mock">' +
      '<div class="ph-head"><div><div class="t">整卷模考</div><div class="sub">客观题 70 自动判 · 主观题 30 自评</div></div></div>' +
      (resume ? '<div class="ph-card"><b>有一场模考未交卷</b><div class="small muted" style="margin:6px 0 10px">进度已保存，可继续作答。</div><button class="btn primary sm" onclick="exResume()">继续上次模考 →</button></div>' : '') +
      cards +
      '<div class="ph-card"><b style="font-size:14px">成绩趋势</b>' + trendHtml() + '</div>' + phNav('mock');
  };

  ui.phoneRunner = function (el) {
    var ex = app.S.exam;
    var y = el.scrollTop || 0;
    if (!ex || !ex.on) {
      el.innerHTML = '<input type="hidden" id="ph-view" value="runner"><div class="ph-head"><div class="t">没有进行中的练习</div></div><div class="ph-card"><button class="btn primary sm" onclick="phGo(\'exam\')">去题型专项</button></div>';
      return;
    }
    renderInto(el, ex);
    el.innerHTML = '<input type="hidden" id="ph-view" value="runner">' + el.innerHTML + phNav(ex.mode === 'mock' ? 'mock' : 'exam');
    el.scrollTop = y;
  };

  /* ---------------- 运行器：题目块 ---------------- */
  function showFb(ex, it) {
    if (it.sec === 'trans' || it.sec === 'writing') return false;
    if (ex.phase === 'done') return true;
    if (ex.mode === 'special') return ex.answers[it.no] !== undefined;
    return false;
  }

  function optClass(ex, it, i) {
    var sel = ex.answers[it.no] === i;
    var cls = 'opt';
    if (showFb(ex, it)) {
      if (i === it.a) cls += ' right';
      else if (sel) cls += ' wrong';
    } else if (sel) cls += ' sel';
    return cls;
  }

  function fbBox(it) {
    var got = it.got;
    return '';
  }

  function objBlock(ex, it, label) {
    var fb = showFb(ex, it);
    var sel = ex.answers[it.no];
    var ok = fb && sel === it.a;
    var html = '<div class="eq" id="q-' + it.no + '">' +
      '<div class="eq-no">' + (label || it.no) + '</div><div class="eq-body">' +
      '<div class="eq-stem">' + esc(it.stem || it.q || '') + '</div>' +
      '<div class="eq-opts">';
    it.o.forEach(function (o, i) {
      html += '<div class="' + optClass(ex, it, i) + '" onclick="exPick(' + it.no + ',' + i + ')">' +
        '<span class="k">' + 'ABCD'[i] + '</span>' + esc(o) + '</div>';
    });
    html += '</div>';
    if (fb) {
      html += '<div class="eq-fb ' + (ok ? 'ok' : 'no') + '">' +
        '<b>' + (ok ? '✓ 正确' : '✗ 错误，正确答案 ' + 'ABC'[it.a]) + '</b>' +
        (it.e ? ' · ' + esc(it.e) : '') + '</div>';
    }
    return html + '</div></div>';
  }

  // 完形：短文中 [n] 处渲染为编号空位
  function clozePassage(cz, ex) {
    return cz.passage.map(function (para) {
      var t = esc(para).replace(/\[(\d+)\]/g, function (m, n) {
        var no = 20 + Number(n);
        var picked = ex.answers[no] !== undefined;
        return '<span class="cl-blank' + (picked ? ' filled' : '') + '">' + n + '</span>';
      });
      return '<p>' + t + '</p>';
    }).join('');
  }

  function clozeBlocks(ex, cz) {
    var html = '<div class="cl-passage">' + clozePassage(cz, ex) + '</div><div class="cl-list">';
    cz.blanks.forEach(function (it) {
      var fb = showFb(ex, it), sel = ex.answers[it.no], ok = fb && sel === it.a;
      html += '<div class="eq cl-eq" id="q-' + it.no + '">' +
        '<div class="eq-no">' + it.blankNo + '</div><div class="eq-body"><div class="eq-opts inline3">';
      it.o.forEach(function (o, i) {
        html += '<div class="' + optClass(ex, it, i) + '" onclick="exPick(' + it.no + ',' + i + ')">' +
          '<span class="k">' + 'ABC'[i] + '</span>' + esc(o) + '</div>';
      });
      html += '</div>';
      if (fb) html += '<div class="eq-fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? '✓' : '✗ 应为 ' + 'ABC'[it.a]) + '</b>' + (it.e ? ' · ' + esc(it.e) : '') + '</div>';
      html += '</div></div>';
    });
    return html + '</div>';
  }

  function transBlock(ex, it) {
    var val = ex.trans[it.no] || '';
    var showRef = ex.phase === 'self' || ex.phase === 'done';
    var html = '<div class="eq eq-trans" id="q-' + it.no + '">' +
      '<div class="eq-no">' + it.no + '</div><div class="eq-body">' +
      '<div class="eq-stem">' + esc(it.cn) + '</div>' +
      '<textarea class="eq-input" rows="2" placeholder="在此输入英文译文…" oninput="exInput(' + it.no + ',this.value)">' + esc(val) + '</textarea>';
    if (showRef) {
      html += '<div class="ref-box"><div class="ref-lb">参考译文</div><div class="ref-tx">' + esc(it.ref) + '</div>' +
        (it.point ? '<div class="ref-pt">考点：' + esc(it.point) + '</div>' : '') + '</div>';
      if (ex.phase === 'self') {
        html += '<div class="self-row"><span class="small muted">自评本题：</span>' +
          EX.TRANS_LEVELS.map(function (L, i) {
            return '<button class="btn ' + (ex.self[it.no] === L.v ? 'primary' : 'ghost') + ' sm" onclick="exSelf(' + it.no + ',' + L.v + ')">' + L.label + '（' + L.v + '分）</button>';
          }).join('') + '</div>';
      } else if (ex.phase === 'done' && ex.self[it.no] !== undefined) {
        html += '<div class="small muted" style="margin-top:8px">自评得分：' + ex.self[it.no] + ' / ' + it.pt + '</div>';
      }
    }
    return html + '</div></div>';
  }

  function writingBlock(ex, wr) {
    var val = ex.writing || '';
    var cnt = (val.trim().match(/\b[A-Za-z][A-Za-z'-]*\b/g) || []).length;
    var showRef = ex.phase === 'self' || ex.phase === 'done';
    var html = '<div class="eq eq-writing" id="q-' + wr.no + '">' +
      '<div class="eq-body">' +
      '<div class="eq-stem">' + esc(wr.topic) + ' <span class="small muted">（' + esc(wr.cn) + '）</span></div>' +
      '<ul class="outline">' + wr.outline.map(function (o, i) { return '<li>' + (i + 1) + '. ' + esc(o) + '</li>'; }).join('') + '</ul>' +
      '<div class="small muted">要求：不少于 ' + (wr.words || 120) + ' 词。</div>' +
      '<textarea class="eq-input" rows="12" placeholder="在此写作文…" oninput="exWriteText(this.value)">' + esc(val) + '</textarea>' +
      '<div class="small muted" id="wcCount">已写 ' + cnt + ' 词</div>';
    if (showRef) {
      html += '<div class="ref-box"><div class="ref-lb">参考范文</div>' +
        wr.ref.map(function (p) { return '<p class="ref-tx">' + esc(p) + '</p>'; }).join('') + '</div>';
      if (ex.phase === 'self') {
        html += '<div class="self-row col"><span class="small muted">给自己这篇作文打分：</span><div class="row wrap" style="margin-top:8px">' +
          EX.WRITING_LEVELS.map(function (L) {
            return '<button class="btn ' + (ex.self.w === L.v ? 'primary' : 'ghost') + ' sm" onclick="exSelfWriting(' + L.v + ')">' + L.label + '</button>';
          }).join('') + '</div></div>';
      } else if (ex.phase === 'done' && ex.self.w !== undefined) {
        html += '<div class="small muted" style="margin-top:8px">自评得分：' + ex.self.w + ' / 15</div>';
      }
    }
    return html + '</div></div>';
  }

  /* ---------------- 运行器：头部 ---------------- */
  function runnerBar(ex) {
    var prog = app.exProgress();
    var left = app.exTimerLeft();
    var title = ex.mode === 'mock'
      ? EX.paperTitle(ex.p) + ' · 整卷模考'
      : ('题型专项 · ' + (TYPE_CARDS.filter(function (t) { return t.key === ex.type; })[0] || {}).name);
    var sub = ex.mode === 'mock' ? '54 题 / 100 分 / 60 过线' : '练完点「查看结果」看逐题解析';

    var right = '';
    if (ex.phase === 'doing') {
      if (left !== null) right += '<span class="ex-timer' + (left < 300 ? ' warn' : '') + '" id="exTimer">' + fmtTime(left) + '</span>';
      right += '<span class="small muted" id="exProg">已答 ' + prog.done + ' / ' + prog.total + '</span>' +
        '<button class="btn ghost sm" onclick="exExit()">退出</button>' +
        '<button class="btn primary sm" onclick="exConfirmSubmit()">' + (ex.mode === 'mock' ? '交卷' : '查看结果') + '</button>';
    } else if (ex.phase === 'self') {
      right += '<span class="small muted">主观题自评中（15 + 15 分）</span>' +
        '<button class="btn primary sm" onclick="exFinish()">提交成绩 →</button>';
    } else {
      right += '<button class="btn ghost sm" onclick="exExit()">返回</button>';
    }

    return '<div class="ex-bar"><div class="ex-bar-l"><b>' + esc(title) + '</b><span class="small muted">' + sub + '</span></div>' +
      '<div class="ex-bar-r">' + right + '</div></div>';
  }

  /* ---------------- 运行器：成绩报告 ---------------- */
  function reportView(ex) {
    var r = ex.result;
    if (!r) return '<div class="card pad">暂无结果</div>';
    var html = '';

    if (r.kind === 'mock') {
      var t = r.total;
      html += '<div class="card pad ex-report">' +
        '<div class="rep-top"><div class="rep-score ' + (t.pass ? 'pass' : 'fail') + '">' + t.score + '<small>/100</small></div>' +
        '<div class="rep-meta"><div class="rep-verdict">' + (t.pass ? '✓ 达到及格线（60 分）' : '✗ 未达及格线（60 分）') + '</div>' +
        '<div class="small muted">客观题 ' + t.objective.score + ' / 70 · 主观题 ' + t.subjective.score + ' / 30</div></div></div>' +
        '<div class="rep-secs">';
      Object.keys(r.byType).forEach(function (name) {
        var b = r.byType[name];
        var pct = b.full ? Math.round(b.score / b.full * 100) : 0;
        html += '<div class="rep-row"><span class="rep-n">' + esc(name) + '</span>' +
          '<div class="pbar ' + (pct >= 60 ? 'g' : 'a') + '" style="flex:1"><i style="width:' + pct + '%"></i></div>' +
          '<span class="rep-v">' + b.score + ' / ' + b.full + '</span></div>';
      });
      html += '</div></div>';

      var wrong = r.obj.detail.filter(function (d) { return !d.ok; });
      html += '<div class="card pad" style="margin-top:16px"><div class="section-title">客观题错题（' + wrong.length + ' 题）</div>' +
        (wrong.length ? '<div class="wrong-list">' + wrong.map(function (d) {
          return '<span class="wrong-chip">第 ' + d.no + ' 题</span>';
        }).join('') + '</div><div class="small muted" style="margin-top:8px">下方作答区已标出每题正确答案与解析，可逐题回看。</div>'
          : '<div class="small muted">客观题全对，没有错题。</div>') + '</div>';

      html += '<div class="ex-actions"><button class="btn ghost sm" onclick="exExit()">返回模考</button>' +
        '<button class="btn primary sm" onclick="exStart(\'mock\',' + ex.p + ')">再考一次</button></div>';
    } else if (r.kind === 'obj') {
      var pct2 = r.pct;
      html += '<div class="card pad ex-report"><div class="rep-top">' +
        '<div class="rep-score ' + (pct2 >= 60 ? 'pass' : 'fail') + '">' + r.right + '<small>/' + r.total + '</small></div>' +
        '<div class="rep-meta"><div class="rep-verdict">正确率 ' + pct2 + '%</div>' +
        '<div class="small muted">下面每题都已标出正确答案与解析。</div></div></div></div>';
      html += '<div class="ex-actions"><button class="btn ghost sm" onclick="exExit()">返回题型专项</button>' +
        '<button class="btn primary sm" onclick="exStart(\'special\',\'' + ex.type + '\')">再练一轮</button></div>';
    } else {
      html += '<div class="card pad ex-report"><div class="rep-top">' +
        '<div class="rep-score ' + (r.score / r.full >= 0.6 ? 'pass' : 'fail') + '">' + r.score + '<small>/' + r.full + '</small></div>' +
        '<div class="rep-meta"><div class="rep-verdict">主观题自评得分</div><div class="small muted">分数由你对照参考答案给出，供阶段自测参考。</div></div></div></div>';
      html += '<div class="ex-actions"><button class="btn ghost sm" onclick="exExit()">返回题型专项</button>' +
        '<button class="btn primary sm" onclick="exStart(\'special\',\'' + ex.type + '\')">再练一轮</button></div>';
    }
    return html;
  }

  /* ---------------- 运行器：主渲染 ---------------- */
  function renderInto(el, ex) {
    var html = runnerBar(ex);

    if (ex.phase === 'self') {
      html += '<div class="card pad" style="margin-bottom:16px"><div class="section-title">主观题自评 <span class="badge a">30 分</span></div>' +
        '<div class="small muted">客观题已自动判分，下面把你写的译文与作文对照参考答案打分。选完点右上角「提交成绩」。</div></div>';
    }

    if (ex.phase === 'done') {
      html += reportView(ex);
    }

    if (ex.mode === 'mock') {
      html += '<div class="ex-sec"><div class="ex-sec-h">第一部分 · 词汇与语法 <span class="small muted">20 题 × 1.5 分 = 30 分</span></div>' +
        ex.paper.vocab.map(function (it) { return objBlock(ex, it); }).join('') + '</div>';

      if (ex.paper.cloze) {
        html += '<div class="ex-sec"><div class="ex-sec-h">第二部分 · 完形填空 <span class="small muted">20 空 × 1 分 = 20 分</span></div>' +
          '<div class="small muted" style="margin-bottom:10px">' + esc(ex.paper.cloze.title) + '</div>' +
          clozeBlocks(ex, ex.paper.cloze) + '</div>';
      }

      html += '<div class="ex-sec"><div class="ex-sec-h">第三部分 · 阅读理解 <span class="small muted">2 篇 × 4 题 × 2.5 分 = 20 分</span></div>' +
        ex.paper.reading.map(function (r) {
          return '<div class="rd-passage"><div class="rd-t">' + esc(r.title) + '</div>' +
            r.text.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
            r.qs.map(function (it) { return objBlock(ex, it); }).join('');
        }).join('') + '</div>';

      html += '<div class="ex-sec"><div class="ex-sec-h">第四部分 · 句子汉译英 <span class="small muted">5 句 × 3 分 = 15 分</span></div>' +
        ex.paper.trans.map(function (it) { return transBlock(ex, it); }).join('') + '</div>';

      if (ex.paper.writing) {
        html += '<div class="ex-sec"><div class="ex-sec-h">第五部分 · 短文写作 <span class="small muted">1 篇 = 15 分</span></div>' +
          writingBlock(ex, ex.paper.writing) + '</div>';
      }
    } else {
      var items = ex.items;
      var hasCloze = items.length && items[0].sec === 'cloze';
      var hasReading = items.length && items[0].sec === 'reading';

      if (hasCloze) {
        var cz = items[0]._cz;
        html += '<div class="ex-sec">' + (cz ? '<div class="small muted" style="margin-bottom:10px">' + esc(cz.title) + '</div>' : '') +
          '<div class="cl-passage">' + (cz ? clozePassage(cz, ex) : '') + '</div><div class="cl-list">' +
          items.map(function (it) {
            var fb = showFb(ex, it), sel = ex.answers[it.no], ok = fb && sel === it.a;
            var h = '<div class="eq cl-eq" id="q-' + it.no + '"><div class="eq-no">' + it.blankNo + '</div><div class="eq-body"><div class="eq-opts inline3">';
            it.o.forEach(function (o, i) {
              h += '<div class="' + optClass(ex, it, i) + '" onclick="exPick(' + it.no + ',' + i + ')"><span class="k">' + 'ABC'[i] + '</span>' + esc(o) + '</div>';
            });
            h += '</div>';
            if (fb) h += '<div class="eq-fb ' + (ok ? 'ok' : 'no') + '"><b>' + (ok ? '✓ 正确' : '✗ 应为 ' + 'ABC'[it.a]) + '</b>' + (it.e ? ' · ' + esc(it.e) : '') + '</div>';
            return h + '</div></div>';
          }).join('') + '</div></div>';
      } else if (hasReading) {
        var rd = items[0]._rd;
        html += '<div class="ex-sec">' + (rd ? '<div class="rd-passage"><div class="rd-t">' + esc(rd.title) + '</div>' +
          rd.text.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' : '') +
          items.map(function (it) { return objBlock(ex, it); }).join('') + '</div>';
      } else if (items.length && items[0].sec === 'trans') {
        html += '<div class="ex-sec">' + items.map(function (it) { return transBlock(ex, it); }).join('') + '</div>';
      } else if (items.length && items[0].sec === 'writing') {
        html += '<div class="ex-sec">' + items.map(function (it) { return writingBlock(ex, it); }).join('') + '</div>';
      } else {
        html += '<div class="ex-sec">' + items.map(function (it) { return objBlock(ex, it); }).join('') + '</div>';
      }
    }

    el.innerHTML = html;
  }

  ui.renderExamRunner = function () {
    var el = document.getElementById('runnerRoot');
    if (!el) return;
    var ex = app.S.exam;
    if (!ex || !ex.on) { el.innerHTML = '<div class="card pad">没有正在进行的练习。<button class="btn primary sm" onclick="go(\'exam\')">去题型专项</button></div>'; return; }

    // 保留滚动位置，避免点选项后跳回顶部
    var sc = document.scrollingElement || document.documentElement;
    var y = sc ? sc.scrollTop : 0;
    var ps = document.getElementById('phoneScreen');
    var py = ps ? ps.scrollTop : 0;

    renderInto(el, ex);

    if (sc) sc.scrollTop = y;
    if (ps) ps.scrollTop = py;
  };

  /* ---------------- 统一刷新入口：Web 渲到 runnerRoot，App 渲到手机屏 ---------------- */
  ui.refreshExam = function () {
    if (app.S.dev === 'phone') { if (ui.renderPhone) ui.renderPhone(); }
    else ui.renderExamRunner();
  };

  /* ---------------- 交卷确认 ---------------- */
  root.exConfirmSubmit = function () {
    var p = app.exProgress();
    var ex = app.S.exam;
    var msg;
    if (ex.mode === 'mock') {
      msg = p.done < p.total
        ? '还有 ' + (p.total - p.done) + ' 题未作答，确定交卷吗？'
        : '确定交卷吗？交卷后客观题立即判分。';
    } else {
      msg = p.done < p.total
        ? '还有 ' + (p.total - p.done) + ' 题未作答，确定查看结果吗？'
        : '确定查看结果吗？';
    }
    if (root.confirm(msg)) app.exSubmit();
  };

})(window);
