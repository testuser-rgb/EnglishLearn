/* ============================================================
   重建题库答案映射基线（仅在确认改动题目/选项/文案之后使用）
   用法：node data/rebuild-baseline.js
   作用：按当前 data/*.js 与页面主逻辑，重算 manifest.json 里的
        文件哈希、常量值哈希、答案映射指纹与各题量统计。
   注意：这是「承认改动」的操作，会让旧基线失效；改完务必再跑
        node data/verify.js 确认全绿。平时只改页面渲染不需要运行它。
   ============================================================ */
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const HERE = __dirname;
const PLAN_DIR = path.dirname(HERE);
const ROOT = path.dirname(PLAN_DIR);
const HTML = path.join(PLAN_DIR, '学位英语_55天冲刺台.html');
const MF = path.join(HERE, 'manifest.json');
const sha = s => crypto.createHash('sha256').update(s, 'utf8').digest('hex');
const m = JSON.parse(fs.readFileSync(MF, 'utf8'));

const ctx = vm.createContext({});
m.files.forEach(f => {
  const code = fs.readFileSync(path.join(HERE, f.file), 'utf8');
  f.sha256 = sha(code);
  const body = code.slice(code.indexOf('const '));
  f.constants.forEach(c => { c.sourceSha256 = sha(body); });
  vm.runInContext(code, ctx, { filename: f.file });
});
const env = {};
m.files.forEach(f => f.constants.forEach(c => {
  const v = vm.runInContext(c.name, ctx);
  env[c.name] = v;
  c.valueSha256 = sha(JSON.stringify(v === undefined ? null : v));
  c.length = Array.isArray(v) ? v.length : (v && typeof v === 'object' ? Object.keys(v).length : undefined);
  if (c.length === undefined) delete c.length;
}));

/* 指纹算法必须与 verify.js 完全一致 */
const rows = [], problems = [];
function collect(q, tag) {
  if (!q || !Array.isArray(q.o)) { problems.push(tag + ' 缺选项'); return; }
  if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) { problems.push(tag + ' 答案越界'); return; }
  rows.push([tag, String(q.s == null ? '' : q.s), q.o.map(String).join('\u0001'), String(q.o[q.a]), String(q.e == null ? '' : q.e)].join('\u0002'));
}
env.RDG.forEach((R, i) => (R.q || []).forEach((q, j) => collect(q, 'RDG[' + i + '].q[' + j + ']')));
env.CLOZE.forEach((C, i) => (C.g || []).forEach((q, j) => collect(q, 'CLOZE[' + i + '].g[' + j + ']')));
env.LESSONS.forEach((L, i) => (L.bank || []).forEach((q, j) => collect(q, 'LESSONS[' + i + '].bank[' + j + ']')));
Object.keys(env.BANK_X).forEach(k => env.BANK_X[k].forEach((q, j) => collect(q, 'BANK_X.' + k + '[' + j + ']')));
if (problems.length) { console.error('题目结构异常，已中止：', problems.slice(0, 5)); process.exit(1); }

const ab = m.answerBaseline;
ab.fingerprintSha256 = sha(rows.join('\n'));
ab.questionCount = rows.length;
ab.readingPassages = env.RDG.length;
ab.readingQuestions = env.RDG.reduce((s, R) => s + R.q.length, 0);
ab.clozeSets = env.CLOZE.length;
ab.clozeBlanks = env.CLOZE.reduce((s, C) => s + C.g.length, 0);
ab.lessonCount = env.LESSONS.length;
ab.lessonQuestions = env.LESSONS.reduce((s, L) => s + (L.bank || []).length, 0);
ab.bankXQuestions = Object.keys(env.BANK_X).reduce((s, k) => s + env.BANK_X[k].length, 0);
const scripts = [...fs.readFileSync(HTML, 'utf8').matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x => x[1]);
ab.generatorSourceSha256 = sha(scripts.sort((a, b) => b.length - a.length)[0]);
m.generatedAt = new Date().toISOString();
m.baselineHistory = m.baselineHistory || [];
m.baselineHistory.push({ date: new Date().toISOString().slice(0, 10), change: '按当前 data/*.js 重建基线' });
fs.writeFileSync(MF, JSON.stringify(m, null, 2) + '\n', 'utf8');
console.log('基线已重建 | 题目', rows.length, '| 指纹', ab.fingerprintSha256.slice(0, 16));
console.log('请接着运行：node data/verify.js');
