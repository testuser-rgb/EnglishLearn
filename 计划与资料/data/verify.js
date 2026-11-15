/* ============================================================
   题库数据与答案映射校验
   用法：node data/verify.js       （在任意目录都可以，路径按本文件位置解析）
   作用：确认 data/*.js 与 manifest.json 的基线一致，且每道题的
        正确答案下标都合法。以后 HTML 页面怎么改都不影响本校验；
        如果有人改动了题目、选项或答案，这里会立刻报错。
   注意：基线 manifest.json 由拆分工具从原 HTML 一次性生成，
        如需新增/修改题目，请先确认改动，再重新生成基线。
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const HERE = __dirname;
const ROOT = path.dirname(HERE);
const HTML = path.join(ROOT, '学位英语_55天冲刺台.html');
const MANIFEST = path.join(HERE, 'manifest.json');
const sha = s => crypto.createHash('sha256').update(s, 'utf8').digest('hex');

let fail = 0;
function check(label, ok, extra) {
  console.log((ok ? '  OK   ' : '  FAIL ') + label + (extra ? '  ' + extra : ''));
  if (!ok) fail++;
}

if (!fs.existsSync(MANIFEST)) { console.error('缺少 manifest.json'); process.exit(1); }
const m = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

console.log('题库数据校验 — 基线生成于 ' + m.generatedAt);

/* 1. 数据文件是否齐全、是否被改动 */
const ctx = vm.createContext({});
for (const f of m.files) {
  const p = path.join(HERE, f.file);
  const exists = fs.existsSync(p);
  check('文件 ' + f.file, exists);
  if (!exists) continue;
  const code = fs.readFileSync(p, 'utf8');
  check('  └ 源码未改动', sha(code) === f.sha256);
  try { vm.runInContext(code, ctx, { filename: f.file }); }
  catch (e) { check('  └ 可加载', false, e.message); }
}

/* 2. 页面是否仍按正确顺序引用全部数据文件 */
const html = fs.readFileSync(HTML, 'utf8');
const tags = [...html.matchAll(/<script src="data\/([^"]+)"><\/script>/g)].map(x => x[1]);
check('HTML 引用顺序与基线一致', tags.join('|') === m.loadOrder.join('|'), tags.length + ' 个数据文件');
const leftover = [...html.matchAll(/^const\s+(WORDS|RDG|CLOZE|LESSONS|BANK_X|GENS|SQ|WRITE|CLU)\s*=/gm)].map(x => x[1]);
check('页面里没有残留题库数据', leftover.length === 0, leftover.length ? '发现: ' + leftover.join(',') : '');

/* 3. 每个常量的值是否与基线一致 */
const env = {};
for (const f of m.files) for (const c of f.constants) {
  let v;
  try { v = vm.runInContext(c.name, ctx); }
  catch (e) { check('常量 ' + c.name, false, '读取失败 ' + e.message); continue; }
  env[c.name] = v;
  check('常量 ' + c.name + ' 值一致', sha(JSON.stringify(v === undefined ? null : v)) === c.valueSha256);
}

/* 4. 逐题复算答案映射 */
const rows = [], problems = [];
function collect(q, tag) {
  if (!q || !Array.isArray(q.o)) { problems.push(tag + ' 缺少选项数组'); return; }
  if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) {
    problems.push(tag + ' 答案下标越界 a=' + q.a + ' / 选项数 ' + q.o.length); return;
  }
  rows.push([tag, String(q.s == null ? '' : q.s), q.o.map(String).join(''), String(q.o[q.a]), String(q.e == null ? '' : q.e)].join(''));
}
if (env.RDG) env.RDG.forEach((R, i) => (R.q || []).forEach((q, j) => collect(q, 'RDG[' + i + '].q[' + j + ']')));
if (env.CLOZE) env.CLOZE.forEach((C, i) => (C.g || []).forEach((q, j) => collect(q, 'CLOZE[' + i + '].g[' + j + ']')));
if (env.LESSONS) env.LESSONS.forEach((L, i) => (L.bank || []).forEach((q, j) => collect(q, 'LESSONS[' + i + '].bank[' + j + ']')));
if (env.BANK_X) Object.keys(env.BANK_X).forEach(k => env.BANK_X[k].forEach((q, j) => collect(q, 'BANK_X.' + k + '[' + j + ']')));

check('题目数量', rows.length === m.answerBaseline.questionCount, rows.length + ' / ' + m.answerBaseline.questionCount);
check('答案下标全部合法', problems.length === 0, problems.length ? problems.slice(0, 5).join(' | ') : '0 处异常');
check('答案映射指纹', sha(rows.join('\n')) === m.answerBaseline.fingerprintSha256, m.answerBaseline.fingerprintSha256.slice(0, 16));

console.log('\n覆盖：阅读 ' + m.answerBaseline.readingPassages + ' 篇 / ' + m.answerBaseline.readingQuestions + ' 题 · '
  + '完形 ' + m.answerBaseline.clozeSets + ' 套 / ' + m.answerBaseline.clozeBlanks + ' 空 · '
  + '语法 ' + m.answerBaseline.lessonQuestions + ' + ' + m.answerBaseline.bankXQuestions + ' 题');
console.log(fail ? '\n=== 未通过：' + fail + ' 项，请勿改动页面前忽略 ===' : '\n=== 全部通过：题目与答案映射未被改动 ===');
process.exitCode = fail ? 1 : 0;
