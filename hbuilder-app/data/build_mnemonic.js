/* ============================================================
 * data/build_mnemonic.js —— 生成背词卡「联想」数据（构建期工具，不参与运行时）
 * 用法：node data/build_mnemonic.js   → 写出 data/07_mnemonic.js
 * 策略（按优先级，宁缺毋滥，不编造假词源）：
 *   1. CURATED  人工联想（短词/抽象词，规则拆不动的）
 *   2. COMPOUND 两个真词拼合（rail + way）
 *   3. DERIV    已知词 + 常见词缀（educate + -tion）
 *   4. ROOT     前缀/词根/后缀拆解（re- + view）
 *   5. NEIGHBOR 形近词对比（garbage ≈ garage）
 *   6. SPELL    以上都不成立时的拼读记忆（明确写成"拼读"，不冒充词根）
 * ============================================================ */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var DATA_DIR = __dirname;

/* ---------- 1. 人工联想（覆盖规则处理不好的高频词） ---------- */
var CURATED = {
  key: '谐音「开」：钥匙一插门就开；引申为"关键、答案"。',
  wall: '谐音「窝」：围起来挡风的窝就是墙（wall）。',
  card: '和 car（汽车）只差一个 d：贴在车上的卡片。',
  main: '谐音「门」：大门是房子的主要入口 → 主要的。',
  half: '谐音「哈夫」：一块饼掰成两半（half）。',
  back: '联想 backpack（背包）：背在背上的包 → 背、后面、后退。',
  care: '谐音「开儿」：把心打开去照顾人 → 关心、照料。',
  wake: '和 wake up（醒来）一起记：w 像睁眼，一睁眼就醒。',
  eager: '谐音「一哥」：一哥最想赢 → 热切的、渴望的。',
  absent: 'ab（离开）+ sent（在场）：人离开了不在场 → 缺席的。',
  garden: '和 guard（看守）同源：围起来看守的地 → 花园、菜园。',
  garbage: '和 garage（车库）只差一个 b：车库里堆的多是垃圾。',
  camera: 'camera obscura（暗箱）来的：拍照的暗箱 → 照相机。',
  navy: '和 naval（海军的）同族：nav- 表示"船、海" → 海军。',
  magazine: '原义"仓库"：装文章的仓库 → 杂志、期刊。',
  occasion: 'oc（向）+ cas（落下）：事情落到你头上的时刻 → 场合、时机。',
  railway: 'rail（铁轨）+ way（路）→ 铁路。',
  language: 'langue（舌头）来的：用舌头说出来的东西 → 语言。',
  understand: 'under（在下）+ stand（站）：站在下面托住 → 理解、懂。',
  understanding: 'understand（理解）+ -ing（名词化）→ 理解、理解力。',
  education: 'e（出）+ duc（引导）+ -ation：把人的能力引出来 → 教育。',
  educated: 'educate（教育）+ -ed（被…的）→ 受过教育的。',
  economic: 'economy（经济）+ -ic（…的）→ 经济的。',
  nation: 'nat（出生）+ -ion：同一地方出生的人 → 国家、民族。',
  abroad: 'a（在）+ broad（宽）：走到宽阔的外面 → 在国外。',
  kill: '谐音「剋」：剋掉、消灭；也指消磨时间。',
  history: 'historia（探究）来的：探究过去的事 → 历史。',
  teacher: 'teach（教）+ -er（人）→ 老师。',
  student: 'stud（努力）+ -ent（人）→ 学生。',
  question: 'quest（寻求）+ -ion：要你去寻求答案 → 问题。',
  answer: 'a + swer（发誓）：对着问题起誓回应 → 回答。',
  problem: 'pro（向前）+ blem（抛出）：抛到面前要解决的 → 问题。',
  subject: 'sub（在下）+ ject（投）：投在下面的东西 → 主题、科目。',
  object: 'ob（对着）+ ject（投）：投到眼前的东西 → 物体；反对。',
  project: 'pro（向前）+ ject（投）：往前投出去 → 项目、投射。',
  progress: 'pro（向前）+ gress（走）→ 向前走 = 进步。',
  process: 'pro（向前）+ cess（走）→ 往前走的步骤 = 过程。',
  produce: 'pro（向前）+ duc（引导）→ 引出来 = 生产。',
  product: 'pro + duct（引导）→ 被引出来的东西 = 产品。',
  protect: 'pro（在前）+ tect（遮盖）→ 在前面遮住 = 保护。',
  provide: 'pro（向前）+ vid（看）→ 预先看到需要 = 提供。',
  receive: 're（回）+ ceive（拿）→ 拿回来 = 收到。',
  reduce: 're（回）+ duc（引导）→ 往回引 = 减少。',
  refuse: 're（回）+ fuse（倒）→ 倒回去 = 拒绝。',
  regard: 're（再）+ gard（看守）→ 一再看着 = 关注、看待。',
  regret: 're（再）+ gret（哭）→ 事后又哭 = 后悔。',
  relax: 're（加强）+ lax（松）→ 彻底松下来 = 放松。',
  remain: 're（回）+ main（留）→ 留下来 = 保持、剩下。',
  remove: 're（回）+ move（动）→ 移走 = 去除。',
  repair: 're（再）+ pair（准备）→ 重新弄好 = 修理。',
  repeat: 're（再）+ peat（寻求）→ 再来一遍 = 重复。',
  replace: 're（再）+ place（放）→ 重新放一个 = 取代。',
  report: 're（回）+ port（带）→ 把消息带回来 = 报告。',
  require: 're（再）+ quire（寻求）→ 一再要求 = 需要。',
  respect: 're（再）+ spect（看）→ 再看一眼 = 尊重。',
  respond: 're（回）+ spond（承诺）→ 回应承诺 = 回答、反应。',
  result: 're（回）+ sult（跳）→ 事情跳回来的样子 = 结果。',
  return: 're（回）+ turn（转）→ 转回来 = 返回。',
  review: 're（再）+ view（看）→ 再看一遍 = 复习、回顾。',
  survive: 'sur（超过）+ viv（活）→ 活得比灾难久 = 幸存。',
  support: 'sup（在下）+ port（搬）→ 从下面托住 = 支持。',
  suppose: 'sup（在下）+ pose（放）→ 先放在下面当假设 = 猜想。',
  suggest: 'sug（在下）+ gest（带）→ 从下面递上想法 = 建议。',
  success: 'suc（在下）+ cess（走）→ 一步步走到底 = 成功。',
  supply: 'sup（在下）+ ply（填）→ 从下面补上 = 供应。',
  society: 'soci（同伴）+ -ety → 一群人结伴 = 社会。',
  culture: 'cult（耕种）+ -ure → 耕种心智 = 文化。',
  nature: 'nat（出生）+ -ure → 天生如此 = 自然、本性。',
  future: 'fut（成为）+ -ure → 将要成为的 = 未来。',
  picture: 'pict（画）+ -ure → 画出来的东西 = 图画。',
  measure: 'mens（测量）+ -ure → 测量出来的量 = 措施、衡量。',
  pleasure: 'please（使高兴）+ -ure → 高兴的感受 = 快乐。',
  pressure: 'press（压）+ -ure → 压下来的力 = 压力。',
  failure: 'fail（失败）+ -ure → 失败这件事。',
  mixture: 'mix（混合）+ -ture → 混合物。',
  feature: 'fact（做）+ -ure → 做出来的样子 = 特征。',
  creature: 'creat（创造）+ -ure → 被造出来的东西 = 生物。',
  adventure: 'ad（向）+ vent（来）+ -ure → 迎面而来的事 = 冒险。',
  temperature: 'temper（调和）+ -ature → 调和冷热的量 = 温度。',
  literature: 'liter（文字）+ -ature → 文字作品 = 文学。',
  agriculture: 'agri（田地）+ culture（耕种）→ 耕田 = 农业。',
  salary: 'sal（盐）+ -ary：古罗马用盐抵工资 → 薪水。',
  always: 'all（全部）+ ways（各种路）：一路总是如此 → 总是、永远。',
  table: '原义"平板"（拉丁 tabula）：一块平板 → 桌子、表格。',
  bank: '原义"长凳、堤岸"：钱庄开在河岸边 → 银行；也指河岸。',
  account: 'ac（向）+ count（数）：把钱数清楚 → 账目、账户。',
  balance: 'bi（二）+ lance（秤盘）：两个秤盘 → 平衡。',
  calculate: '拉丁 calcul（小石子）：古人用石子计数 → 计算。',
  ocean: '希腊神话 Okeanos 环绕大地的巨流 → 海洋。',
  imagine: 'image（形象）+ -ine：在脑子里造形象 → 想象。',
  gather: '和 together（一起）同源：把人拢到一起 → 聚集。',
  damage: 'damn（损害）+ -age：造成损失 → 损害。',
  ignore: 'i（不）+ gnor（知道）：装作不知道 → 忽视。',
  laugh: '拟声词：哈哈（ha-ha）→ 笑。',
  family: '拉丁 familia（一家人，含仆人）→ 家庭。',
  teenage: 'teen（十三到十九）+ age（年龄）→ 十几岁的。',
  general: 'gener（种类）+ -al：覆盖一整类的 → 普通的、总的。',
  absence: 'ab（离开）+ sence（存在）：人不在 → 缺席。',
  danger: '古法语 dangier（掌控权）：落在别人手里 → 危险。',
  deliver: 'de（离开）+ liver（自由）：让东西自由出去 → 递送。',
  earth: '古英语 eorþe，本义"泥土"：脚下踩的土 → 地球、泥土。',
  image: 'imag（模仿）+ -e：照着样子做出来的 → 形象、图像。',
  about: 'a（在）+ bout（一圈）：在一圈周围 → 关于、大约。',
  profit: 'pro（向前）+ fit（做）：做出成绩 → 利润、益处。',
  remark: 're（再）+ mark（做记号）：再标一笔 → 评论、注意。',
  surface: 'sur（在上）+ face（面）→ 表面。',
  exchange: 'ex（出）+ change（换）→ 交换。',
  upset: 'up（向上）+ set（放）：把盘子往上翻 → 打翻、心烦。',
  upright: 'up（向上）+ right（直）→ 直立的、正直的。',
  enclose: 'en（使）+ close（关）→ 围起来。',
  exact: 'ex（出）+ act（做）：做得分毫不差 → 精确的。',
  address: 'ad（向）+ dress（整理）：把话指向某人 → 地址、致辞。'
};

/* ---------- 2. 词缀 / 词根表（只用于"拆开记"，不臆造词源） ---------- */
var PREFIX = [
  ['under', '在下、不足'], ['inter', '在…之间'], ['trans', '穿过、转移'], ['super', '在上、超过'],
  ['extra', '额外'], ['contra', '相反'], ['circum', '环绕'], ['multi', '多'], ['semi', '半'],
  ['micro', '微小'], ['macro', '宏大'], ['mono', '单一'], ['poly', '多'], ['tele', '远'],
  ['anti', '反对'], ['auto', '自己'], ['over', '过度、在上'], ['post', '在后'], ['fore', '在前'],
  ['with', '回、向后'], ['bene', '好'], ['dis', '否定、分开'], ['mis', '错误'], ['non', '非'],
  ['pre', '在前、预先'], ['pro', '向前'], ['sub', '在下、次'], ['sup', '在下'], ['suc', '在下'],
  ['sug', '在下'], ['sur', '超过'], ['con', '共同、加强'], ['com', '共同'], ['col', '共同'],
  ['cor', '共同'], ['co', '共同'], ['de', '向下、去除'], ['en', '使…'], ['em', '使…'],
  ['ex', '出、向外'], ['ef', '出'], ['e', '出'], ['re', '再、回'], ['in', '不、向内'],
  ['im', '不、向内'], ['il', '不'], ['ir', '不'], ['un', '不'], ['ab', '离开'], ['ad', '向、朝'],
  ['ac', '向'], ['af', '向'], ['ag', '向'], ['al', '向'], ['ap', '向'], ['ar', '向'], ['as', '向'],
  ['at', '向'], ['ob', '对着、反对'], ['oc', '向'], ['of', '向'], ['op', '向'], ['per', '贯穿'],
  ['para', '旁边、辅助'], ['syn', '共同'], ['sym', '共同'], ['dia', '穿过'], ['epi', '在上'],
  ['hypo', '在下'], ['hyper', '过度'], ['ultra', '极端'], ['out', '向外、超过'], ['up', '向上'],
  ['uni', '单一、一'], ['bi', '二'], ['tri', '三']
];

var ROOT = [
  ['spect', '看'], ['spic', '看'], ['vis', '看'], ['vid', '看'], ['dict', '说'], ['duc', '引导'],
  ['duct', '引导'], ['ject', '投掷'], ['mit', '送'], ['miss', '送'], ['scrib', '写'], ['script', '写'],
  ['port', '搬运'], ['form', '形状'], ['struct', '建造'], ['tract', '拉'], ['vert', '转'],
  ['vers', '转'], ['volv', '转、卷'], ['volut', '转'], ['grad', '步、级'], ['gress', '走'],
  ['ced', '走、让'], ['cess', '走'], ['fer', '带来'], ['log', '说、学科'], ['graph', '写、画'],
  ['phon', '声音'], ['bio', '生命'], ['geo', '土地'], ['photo', '光'], ['therm', '热'],
  ['chron', '时间'], ['ann', '年'], ['audi', '听'], ['cred', '相信'], ['fid', '信任'],
  ['mort', '死'], ['viv', '活'], ['vit', '生命'], ['cap', '拿、头'], ['cept', '拿'],
  ['cip', '拿'], ['tain', '握'], ['ten', '握'], ['hab', '拥有'], ['pos', '放'], ['pon', '放'],
  ['stat', '站'], ['sist', '站'], ['sid', '坐'], ['sed', '坐'], ['fac', '做'], ['fect', '做'],
  ['fact', '做'], ['manu', '手'], ['ped', '脚'], ['pod', '脚'], ['cord', '心'], ['anim', '生命、精神'],
  ['spir', '呼吸'], ['psych', '心理'], ['soci', '同伴'], ['polit', '政治'], ['econom', '经济'],
  ['nomin', '名字'], ['onym', '名字'], ['liter', '文字'], ['lingu', '语言'], ['voc', '叫、声音'],
  ['vok', '叫'], ['claim', '喊'], ['clam', '喊'], ['jud', '判断'], ['jur', '法'], ['leg', '法、读'],
  ['sent', '感觉'], ['sens', '感觉'], ['pass', '通过、感情'], ['firm', '坚定'], ['fort', '强'],
  ['val', '价值'], ['preci', '价格'], ['meter', '测量'], ['mens', '测量'], ['norm', '标准'],
  ['ordin', '顺序'], ['sequ', '跟随'], ['sect', '切'], ['cis', '切'], ['cid', '切、落'],
  ['frag', '破碎'], ['rupt', '断'], ['junct', '连接'], ['nect', '连接'], ['tact', '接触'],
  ['tang', '接触'], ['flu', '流'], ['cur', '跑'], ['curs', '跑'], ['vad', '走'], ['ven', '来'],
  ['vent', '来'], ['migr', '迁移'], ['mob', '动'], ['mot', '动'], ['mov', '动'], ['act', '做'],
  ['oper', '工作'], ['labor', '劳动'], ['serv', '服务'], ['cust', '照顾'], ['med', '治疗'],
  ['san', '健康'], ['tox', '毒'], ['vac', '空'], ['plen', '满'], ['term', '界限'], ['fin', '结束'],
  ['init', '开始'], ['prim', '第一'], ['nov', '新'], ['ver', '真实'], ['cert', '确定'],
  ['clar', '清楚'], ['lumin', '光'], ['simil', '相似'], ['equ', '相等'], ['par', '平等'],
  ['magn', '大'], ['brev', '短'], ['dur', '持久'], ['tempor', '时间'], ['alt', '高'],
  ['domin', '统治'], ['reg', '统治、规则'], ['rect', '直、正'], ['tort', '扭'], ['flex', '弯'],
  ['flect', '弯'], ['strict', '拉紧'], ['tend', '伸展'], ['tens', '伸展'], ['tent', '伸展'],
  ['solv', '松开'], ['liber', '自由'], ['opt', '选择'], ['habit', '习惯'], ['capit', '头'],
  ['anthrop', '人类'], ['arch', '统治、首'], ['bibl', '书'], ['cycl', '圆、环'], ['dem', '人民'],
  ['dyn', '力'], ['err', '错、游走'], ['fin', '界限'], ['gen', '产生'], ['grat', '感谢'],
  ['hydr', '水'], ['lith', '石'], ['mar', '海'], ['mater', '母亲'], ['mem', '记忆'],
  ['min', '小'], ['neur', '神经'], ['nov', '新'], ['orn', '装饰'], ['path', '感情、疾病'],
  ['pend', '悬挂'], ['pens', '称重'], ['ple', '填满'], ['plic', '折叠'], ['prim', '第一'],
  ['punct', '点'], ['radi', '光线'], ['rid', '笑'], ['scend', '爬'], ['sci', '知道'],
  ['secu', '跟随'], ['sol', '太阳、单独'], ['somn', '睡'], ['son', '声音'], ['sper', '希望'],
  ['spond', '承诺、回应'], ['sta', '站'], ['stroph', '转'], ['sum', '拿'], ['tact', '接触'],
  ['techn', '技艺'], ['tele', '远'], ['text', '编织'], ['the', '神'], ['tract', '拉'],
  ['trib', '给予'], ['turb', '扰乱'], ['uni', '一'], ['urb', '城市'], ['vac', '空'],
  ['vad', '走'], ['val', '强、价值'], ['veh', '运载'], ['vel', '遮盖'], ['vent', '来']
];

var SUFFIX = [
  ['ation', '名词后缀'], ['ition', '名词后缀'], ['ution', '名词后缀'], ['sion', '名词后缀'],
  ['tion', '名词后缀'], ['ment', '名词后缀'], ['ness', '名词后缀'], ['ity', '名词后缀'],
  ['ance', '名词后缀'], ['ence', '名词后缀'], ['ship', '名词后缀'], ['hood', '名词后缀'],
  ['ism', '名词后缀'], ['ist', '人'], ['er', '人/物'], ['or', '人/物'], ['ant', '人/物'],
  ['ent', '人/物'], ['ure', '名词后缀'], ['age', '名词后缀'], ['dom', '名词后缀'],
  ['able', '能…的'], ['ible', '能…的'], ['ful', '充满…的'], ['less', '没有…的'],
  ['ous', '…的'], ['ive', '…的'], ['ical', '…的'], ['ic', '…的'], ['al', '…的'],
  ['ary', '…的'], ['ory', '…的'], ['ly', '副词后缀'], ['ize', '使…化'], ['ise', '使…化'],
  ['ify', '使…化'], ['en', '使…'], ['ing', '…的/名词化'], ['ed', '…的'],
  ['ly', '副词后缀'], ['ward', '向…方向'], ['wise', '方式']
];

/* ---------- 3. 补一个常用基础词表（给拆词/派生用） ---------- */
var EXTRA_LEX = {
  fame: '名声', form: '形状、形成', norm: '标准', acid: '酸', value: '价值',
  rail: '铁轨', way: '路', under: '在下面', stand: '站', back: '背', ground: '地面',
  sun: '太阳', light: '光', day: '天', time: '时间', book: '书', room: '房间',
  house: '房子', home: '家', work: '工作', place: '地方', land: '土地', sea: '海',
  water: '水', fire: '火', hand: '手', foot: '脚', head: '头', eye: '眼睛',
  man: '人', woman: '女人', child: '孩子', friend: '朋友', school: '学校',
  class: '班级', room: '房间', board: '板', black: '黑', white: '白', green: '绿',
  red: '红', blue: '蓝', self: '自己', help: '帮助', care: '关心', take: '拿',
  give: '给', make: '做', do: '做', go: '去', come: '来', see: '看', look: '看',
  play: '玩', read: '读', write: '写', speak: '说', talk: '谈', walk: '走',
  run: '跑', sit: '坐', stand: '站', sleep: '睡', eat: '吃', drink: '喝',
  love: '爱', like: '喜欢', need: '需要', want: '想要', know: '知道',
  think: '想', feel: '感觉', hear: '听', find: '找到', lose: '丢失',
  keep: '保持', hold: '握住', turn: '转', move: '移动', stop: '停',
  start: '开始', end: '结束', open: '打开', close: '关闭', build: '建造',
  break: '打破', grow: '生长', change: '改变', carry: '携带', bring: '带来',
  send: '送', put: '放', set: '放置', cut: '切', draw: '画', sell: '卖',
  buy: '买', pay: '付钱', cost: '花费', use: '使用', try: '尝试', ask: '问',
  tell: '告诉', show: '展示', mean: '意思是', become: '变成', begin: '开始',
  agree: '同意', allow: '允许', appear: '出现', arrive: '到达', attend: '出席',
  believe: '相信', belong: '属于', compare: '比较', complete: '完成',
  consider: '考虑', continue: '继续', create: '创造', decide: '决定',
  develop: '发展', die: '死', discover: '发现', discuss: '讨论',
  divide: '分开', doubt: '怀疑', drop: '落下', enjoy: '享受', enter: '进入',
  examine: '检查', exist: '存在', expect: '期待', explain: '解释',
  fail: '失败', fall: '落下', fill: '填满', finish: '完成', fit: '合适',
  fly: '飞', follow: '跟随', forget: '忘记', form: '形成', happen: '发生',
  hate: '恨', hope: '希望', hurt: '伤害', improve: '改进', include: '包括',
  increase: '增加', introduce: '介绍', join: '加入', judge: '判断',
  learn: '学习', leave: '离开', lie: '躺、说谎', live: '生活', marry: '结婚',
  matter: '要紧', meet: '遇见', mention: '提到', mind: '介意', miss: '错过',
  notice: '注意到', offer: '提供', order: '命令、订购', own: '拥有',
  pass: '通过', plan: '计划', prefer: '更喜欢', prepare: '准备',
  prevent: '阻止', promise: '承诺', protect: '保护', prove: '证明',
  provide: '提供', raise: '举起', reach: '到达', realize: '意识到',
  receive: '收到', recognize: '认出', reduce: '减少', remain: '保持',
  remember: '记得', repeat: '重复', reply: '回复', report: '报告',
  require: '需要', rest: '休息', return: '返回', review: '复习', rise: '上升',
  save: '救、节省', seem: '似乎', serve: '服务', share: '分享', shine: '发光',
  shout: '喊', sing: '唱', spend: '花费', stay: '停留', study: '学习',
  succeed: '成功', suffer: '受苦', suggest: '建议', supply: '供应',
  survive: '幸存', teach: '教', thank: '感谢', travel: '旅行',
  treat: '对待、治疗', trust: '信任', understand: '理解', visit: '拜访',
  wait: '等待', warn: '警告', waste: '浪费', watch: '观看', wear: '穿',
  win: '赢', wonder: '想知道', worry: '担心', accept: '接受',
  achieve: '实现', add: '加', admit: '承认', advise: '建议', afford: '负担得起',
  aim: '瞄准', announce: '宣布', apply: '申请', argue: '争论',
  avoid: '避免', bear: '忍受', beat: '打', blame: '责备', borrow: '借入',
  breathe: '呼吸', burn: '燃烧', celebrate: '庆祝', choose: '选择',
  climb: '爬', collect: '收集', communicate: '交流', complain: '抱怨',
  connect: '连接', contain: '包含', control: '控制', cook: '烹饪',
  copy: '复制', count: '数', cover: '覆盖', cross: '穿过', cry: '哭',
  damage: '损害', deal: '处理', deliver: '递送', depend: '依靠',
  describe: '描述', design: '设计', destroy: '摧毁', determine: '决定',
  direct: '指导', explain: '解释', express: '表达', extend: '延伸',
  face: '面对', feed: '喂养', fight: '战斗', fix: '修理', flow: '流动',
  force: '强迫', gain: '获得', gather: '聚集', guess: '猜', guide: '引导',
  hang: '悬挂', hide: '隐藏', hit: '打', hunt: '打猎', hurry: '匆忙',
  imagine: '想象', invent: '发明', invite: '邀请', kill: '杀死', knock: '敲',
  lend: '借出', lift: '举起', limit: '限制', listen: '听', manage: '管理',
  mark: '标记', measure: '测量', mix: '混合', nod: '点头', note: '记录',
  observe: '观察', obtain: '获得', occur: '发生', operate: '操作',
  oppose: '反对', perform: '表演', permit: '允许', pick: '挑选',
  place: '放置', point: '指', pollute: '污染', pour: '倒', practise: '练习',
  praise: '表扬', press: '压', pretend: '假装', produce: '生产',
  promise: '承诺', pull: '拉', push: '推', quit: '放弃', recommend: '推荐',
  record: '记录', refuse: '拒绝', regard: '看待', regret: '后悔',
  relax: '放松', remove: '去除', repair: '修理', replace: '取代',
  respect: '尊重', respond: '回应', retire: '退休', ride: '骑', ring: '响',
  roll: '滚动', rush: '冲', satisfy: '满足', search: '搜索', select: '挑选',
  separate: '分开', shake: '摇', sign: '签名', sink: '下沉', smell: '闻',
  solve: '解决', sort: '分类', sound: '听起来', spread: '传播', steal: '偷',
  stretch: '伸展', struggle: '挣扎', suppose: '假设', surprise: '使惊讶',
  swim: '游泳', switch: '切换', taste: '品尝', test: '测试', throw: '扔',
  touch: '触摸', train: '训练', translate: '翻译', trouble: '麻烦',
  unite: '联合', vote: '投票', wash: '洗', weigh: '称重', wish: '希望',
  write: '写', yell: '叫喊'
};

/* ---------- 4. 工具函数 ---------- */
function loadWords() {
  var ctx = { window: {} };
  ctx.window.window = ctx.window;
  vm.createContext(ctx);
  ['01_config.js', '02_words.js'].forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'), ctx);
  });
  var out = [];
  ctx.window.APP.data.GROUPS.forEach(function (g) {
    g.words.forEach(function (w) { out.push({ w: w.w, mean: w.mean, ipa: w.ipa }); });
  });
  return out;
}

// 释义只取第一段，避免"教育，培养"后面拖一长串
function shortMean(m) {
  var s = String(m || '').split(/[；;]/)[0];
  s = s.replace(/\s*(vi\.|vt\.|a\.|ad\.|n\.|prep\.|conj\.|pron\.).*$/, '');
  s = s.replace(/^[a-z]+\.\s*/i, '');
  return s.trim();
}

// 编辑距离 ≤1：只做一次增/删/换，用于形近词
function nearOne(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  var i = 0, j = 0, diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++diff > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return true;
}

var PREFIXES = PREFIX.slice().sort(function (a, b) { return b[0].length - a[0].length; });

// 允许"前缀 + 真词"这一招的前缀（语义明确、不容易误拆）
var SAFE_PREFIX = ['un', 're', 'dis', 'mis', 'pre', 'pro', 'sub', 'inter', 'trans', 'super', 'anti',
  'auto', 'over', 'under', 'up', 'out', 'non', 'semi', 'multi', 'micro', 'macro', 'mono', 'poly',
  'tele', 'co', 'con', 'com', 'en', 'em', 'sur', 'fore', 'post', 'extra', 'circum', 'contra',
  'ultra', 'hypo', 'hyper', 'para', 'syn', 'sym'];
var ROOTS = ROOT.slice().sort(function (a, b) { return b[0].length - a[0].length; });
var SUFFIXES = SUFFIX.slice().sort(function (a, b) { return b[0].length - a[0].length; });

function isSuffix(t) {
  for (var i = 0; i < SUFFIXES.length; i++) if (SUFFIXES[i][0] === t) return true;
  return false;
}

function stripSuffix(word) {
  for (var i = 0; i < SUFFIXES.length; i++) {
    var s = SUFFIXES[i][0];
    if (word.length - s.length >= 3 && word.slice(-s.length) === s) {
      return { base: word.slice(0, -s.length), suf: s, gloss: SUFFIXES[i][1] };
    }
  }
  return null;
}

// 派生：去掉后缀后能对上库里的词（含"去 e / 加 e / y→i"三种还原）
function derivLookup(w, lex) {
  for (var i = 0; i < SUFFIXES.length; i++) {
    var s = SUFFIXES[i][0];
    if (w.length - s.length < 3 || w.slice(-s.length) !== s) continue;
    var b = w.slice(0, -s.length);
    var cands = [b, b + 'e', b.replace(/i$/, 'y'), b.replace(/y$/, 'i'), b + 'y'];
    for (var j = 0; j < cands.length; j++) {
      if (lex[cands[j]] && cands[j].length >= 3) {
        return { base: cands[j], suf: s, gloss: SUFFIXES[i][1], mean: lex[cands[j]] };
      }
    }
  }
  return null;
}

// 同族词：与库内另一词共享 ≥5 字母词干（如 satisfaction ↔ satisfy）
function familyOf(w, pool, lex) {
  var best = null;
  for (var i = 0; i < pool.length; i++) {
    var o = pool[i];
    if (o === w) continue;
    if (Math.abs(o.length - w.length) > 7) continue;
    var n = 0;
    while (n < o.length && n < w.length && o[n] === w[n]) n++;
    if (n >= 5 && n >= Math.min(o.length, w.length) - 3) {
      if (!best || n > best.n || (n === best.n && o.length < best.w.length)) best = { w: o, n: n };
    }
  }
  return best;
}

// 按元音-辅音结构粗切音节（只求"能读出来"，不追求音标正确）
function syllables(w) {
  if (/[^a-z]/.test(w) || w.length < 6) return '';
  var vowel = /[aeiouy]/;
  var out = '';
  for (var i = 0; i < w.length; i++) {
    var c = w[i];
    out += c;
    if (i < 1 || i >= w.length - 2) continue;
    var prev = w[i - 1], next = w[i + 1], next2 = w[i + 2];
    if (vowel.test(prev) && !vowel.test(c)) {
      if (vowel.test(next)) out = out.slice(0, -1) + '-' + c;      // V C V → V-CV
      else if (!vowel.test(next) && vowel.test(next2)) out += '-'; // V C C V → VC-CV
    }
  }
  var parts = out.replace(/-+/g, '-').replace(/^-|-$/g, '').split('-');
  if (parts.length < 2 || parts.some(function (p) { return p.length > 5; })) return '';
  return parts.join('-');
}

/* ---------- 5. 生成 ---------- */
function buildMnemonic(word, mean, lex, pool, ipa) {
  var w = String(word).toLowerCase().split('/')[0].replace(/[^a-z]/g, '');
  var cur = CURATED[w] || CURATED[word.toLowerCase()];
  if (cur) return { text: cur, kind: 'curated' };

  // 派生：已知词 + 后缀（先于复合词，避免 pack + age 被当成两个词）
  var dv = derivLookup(w, lex);
  if (dv && dv.base !== w && dv.base.length >= 4) {
    return {
      kind: 'deriv',
      text: dv.base + '（' + shortMean(dv.mean) + '）+ -' + dv.suf + '（' + dv.gloss + '）→ ' + shortMean(mean) + '。'
    };
  }

  // 复合词：两段都是认识的词（后半段不能只是后缀）
  for (var cut = 3; cut <= w.length - 3; cut++) {
    var a = w.slice(0, cut), b = w.slice(cut);
    if (lex[a] && lex[b] && !isSuffix(b)) {
      return {
        kind: 'compound',
        text: a + '（' + shortMean(lex[a]) + '）+ ' + b + '（' + shortMean(lex[b]) + '）→ ' + shortMean(mean) + '。'
      };
    }
  }

  // 同族词：同一词干换个词性/词尾
  var fam = familyOf(w, pool, lex);
  if (fam && lex[fam.w]) {
    var tail = w.slice(fam.n);
    var tailNote = tail ? '，词尾 -' + tail + ' 换了词性' : '';
    return {
      kind: 'family',
      text: '同族一起记：' + fam.w + '（' + shortMean(lex[fam.w]) + '）' + tailNote + ' → 本词：' + shortMean(mean) + '。'
    };
  }

  // 前缀 + 已知词：ac + count → account（只保留语义清楚的前缀，且剩余部分 ≥4 字母，避免 earth=e+art 这类硬拆）
  for (var q = 0; q < PREFIXES.length; q++) {
    var pf = PREFIXES[q][0];
    if (SAFE_PREFIX.indexOf(pf) < 0) continue;
    if (w.length - pf.length < 4 || w.indexOf(pf) !== 0) continue;
    var rem = w.slice(pf.length);
    var cands2 = [rem, rem.replace(/e$/, '')];
    for (var c2 = 0; c2 < cands2.length; c2++) {
      if (cands2[c2].length >= 4 && lex[cands2[c2]]) {
        return {
          kind: 'affixword',
          text: pf + '-（' + PREFIXES[q][1] + '）+ ' + cands2[c2] + '（' + shortMean(lex[cands2[c2]]) + '）→ ' + shortMean(mean) + '。'
        };
      }
    }
  }

  // 前缀 + 词根（覆盖率 ≥ 60% 才算拆得干净）
  var pre = null;
  for (var i = 0; i < PREFIXES.length; i++) {
    if (w.length - PREFIXES[i][0].length >= 4 && w.indexOf(PREFIXES[i][0]) === 0) { pre = PREFIXES[i]; break; }
  }
  var rest = pre ? w.slice(pre[0].length) : w;
  var rootHit = null;
  for (var j = 0; j < ROOTS.length; j++) {
    var r = ROOTS[j][0];
    if (rest.indexOf(r) !== 0 || rest.length - r.length > 3) continue;
    var rt = rest.slice(r.length).replace(/^e$/, '');
    // 3 字母词根只在"词根打头 + 尾巴是常见后缀"时才用，避免 deliver=de+ver 这类硬拆
    if (r.length >= 4 || (r.length === 3 && (!rt || isSuffix(rt)))) { rootHit = ROOTS[j]; break; }
  }
  if (!rootHit) {
    for (var k = 0; k < ROOTS.length; k++) {
      var r2 = ROOTS[k][0];
      var at = rest.indexOf(r2);
      if (r2.length >= 4 && at > 0 && at <= 2 && rest.length - at - r2.length <= 1) { rootHit = ROOTS[k]; break; }
    }
  }
  if (rootHit) {
    var cover = ((pre ? pre[0].length : 0) + rootHit[0].length) / w.length;
    if (cover >= 0.6) {
      var parts = [];
      if (pre) parts.push(pre[0] + '-（' + pre[1] + '）');
      parts.push(rootHit[0] + '（' + rootHit[1] + '）');
      var tail2 = rest.slice(rest.indexOf(rootHit[0], 0) + rootHit[0].length);
      if (tail2 && tail2 !== 'e') parts.push('-' + tail2);
      return { kind: 'root', text: '拆开记：' + parts.join(' + ') + ' → ' + shortMean(mean) + '。' };
    }
  }

  // 形近词：只差一个字母，用于提醒别拼混
  if (w.length >= 4) {
    var best = null;
    for (var p = 0; p < pool.length; p++) {
      var o = pool[p];
      if (o === w || o.length < 4) continue;
      if (o[0] !== w[0] && o.slice(0, 2) !== w.slice(0, 2)) continue;
      if (nearOne(o, w)) { if (!best || o.length < best.length) best = o; }
    }
    if (best && lex[best]) {
      return {
        kind: 'near',
        text: '别和 ' + best + '（' + shortMean(lex[best]) + '）拼混，两个词只差一个字母；本词意思是「' + shortMean(mean) + '」。'
      };
    }
  }

  // 兜底：拼读（不冒充词源）
  var chunks = w.length >= 6 ? (w.match(/.{1,3}/g) || []).join('-') : w.split('').join('-');
  var head = ipa ? '读音 ' + ipa + '，' : '';
  return {
    kind: 'spell',
    text: head + '按 ' + chunks + ' 分块默写三遍；它表示「' + shortMean(mean) + '」。'
  };
}

function main() {
  var words = loadWords();
  var lex = {};
  var pool = [];
  words.forEach(function (x) { var k = String(x.w).toLowerCase().split('/')[0]; pool.push(k); if (!lex[k]) lex[k] = x.mean; });
  Object.keys(EXTRA_LEX).forEach(function (k) { if (!lex[k]) lex[k] = EXTRA_LEX[k]; });

  var out = {}, kinds = {}, stat = {};
  words.forEach(function (x) {
    var r = buildMnemonic(x.w, x.mean, lex, pool, x.ipa);
    out[x.w] = r.text;
    kinds[x.w] = r.kind;
    stat[r.kind] = (stat[r.kind] || 0) + 1;
  });

  var lines = [];
  lines.push('/* ============================================================');
  lines.push(' * data/07_mnemonic.js —— 背词卡「联想」文案（构建生成，勿手改）');
  lines.push(' * 生成器：data/build_mnemonic.js（改文案请改生成器后重跑）');
  lines.push(' * 口径：真词源优先（复合词/派生/词根），拆不动的不冒充词根，退化为形近或拼读。');
  lines.push(' * 覆盖：' + words.length + ' 词 · ' + Object.keys(stat).map(function (k) { return k + ' ' + stat[k]; }).join(' / '));
  lines.push(' * ============================================================ */');
  lines.push('(function (root) {');
  lines.push("  'use strict';");
  lines.push('  var APP = root.APP = root.APP || {};');
  lines.push('  var data = APP.data = APP.data || {};');
  lines.push('  data.MN = {');
  var keys = Object.keys(out);
  keys.forEach(function (k, i) {
    lines.push('    ' + JSON.stringify(k) + ': ' + JSON.stringify(out[k]) + (i === keys.length - 1 ? '' : ','));
  });
  lines.push('  };');
  lines.push('  // 文案类型：决定卡片上的小标签（联想 / 形近 / 拼读）');
  lines.push('  data.MNK = {');
  keys.forEach(function (k, i) {
    lines.push('    ' + JSON.stringify(k) + ': ' + JSON.stringify(kinds[k]) + (i === keys.length - 1 ? '' : ','));
  });
  lines.push('  };');
  lines.push('})(window);');
  fs.writeFileSync(path.join(DATA_DIR, '07_mnemonic.js'), lines.join('\n') + '\n', 'utf8');

  console.log('words', words.length, 'kinds', JSON.stringify(stat));
  var samples = ['garbage', 'education', 'understand', 'respect', 'review', 'card', 'absurd'];
  samples.forEach(function (s) { if (out[s]) console.log('·', s, '→', out[s]); });
}

main();
