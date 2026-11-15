/* 词形规则与阅读难度分级
   本文件由 学位英语_55天冲刺台.html 原样抽出，表达式体未作任何改动。
   修改题目或答案请只改这里；页面渲染逻辑在 HTML 内，不存题目。
   校验：node data/verify.js
   包含：IRR, LEVELS
*/

const IRR={take:['took','taken'],arise:['arose','arisen'],rise:['rose','risen'],teach:['taught'],
 give:['gave','given'],get:['got','gotten'],make:['made'],come:['came'],become:['became'],begin:['began'],
 find:['found'],hold:['held'],keep:['kept'],lead:['led'],lose:['lost'],meet:['met'],pay:['paid'],run:['ran'],
 see:['saw','seen'],sell:['sold'],send:['sent'],show:['shown'],speak:['spoke','spoken'],spend:['spent'],
 stand:['stood'],tell:['told'],think:['thought'],understand:['understood'],write:['wrote','written'],
 build:['built'],bring:['brought'],buy:['bought'],catch:['caught'],choose:['chose','chosen'],deal:['dealt'],
 do:['did','done'],draw:['drew','drawn'],drive:['drove','driven'],eat:['ate','eaten'],fall:['fell','fallen'],
 feel:['felt'],forget:['forgot','forgotten'],grow:['grew','grown'],hear:['heard'],hit:['hit'],know:['knew'],
 learn:['learnt'],leave:['left'],mean:['meant'],seek:['sought'],win:['won'],wear:['wore','worn'],
 break:['broke','broken'],blow:['blew','blown'],feed:['fed'],fight:['fought'],hide:['hid','hidden'],lay:['laid'],
 ride:['rode','ridden'],ring:['rang','rung'],shake:['shook','shaken'],strike:['struck'],throw:['threw','thrown'],
 wake:['woke','woken'],bear:['bore','born'],beat:['beaten'],steal:['stole','stolen'],sink:['sank'],shoot:['shot'],
 spread:['spread'],stick:['stuck'],sweep:['swept'],swing:['swung'],tear:['tore','torn'],flee:['fled'],prove:['proved','proven'],bleed:['bled'],breed:['bred'],flee:['fled'],weep:['wept'],cling:['clung'],dig:['dug']};

const LEVELS=[
  {n:1,name:'入门',max:42,  desc:'短句、常用词，先把"看到词能反应"练熟'},
  {n:2,name:'基础',max:56,  desc:'句子变长，开始出现从句和转折'},
  {n:3,name:'进阶',max:70,  desc:'说明文：有数据、有观点、有对比'},
  {n:4,name:'真题级',max:999,desc:'长度和信息密度对标江苏联盟阅读真题'}
];

