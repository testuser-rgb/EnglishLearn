# Web 站点端 · 江苏联盟学位英语备考系统

浏览器访问的学习台，纯静态、零构建，可双击 `app.html` 直接跑，也可部署到任意静态服务器。

## 运行

- **本地双击**：用 Chrome / Edge 打开 `index.html`（门户）→ 点「进入学习台」。
- **本地服务器**（推荐，行为更接近线上）：
  ```
  cd web
  python3 -m http.server 8080
  ```
  浏览器打开 `http://localhost:8080/`。
- **发布上线**：把整个 `web/` 目录作为静态站点根目录上传即可（无需构建、无后端）。

## 结构

```
web/
├─ index.html      门户首页
├─ app.html        学习台（Web 界面）
├─ css/common.css  共享样式
├─ data/           数据层（唯一真相源）
│  ├─ 01_config.js       官方口径 + 阶段计划
│  ├─ 02_words.js        30天1877词 + 150道每日小测
│  ├─ 03_exam_vocab.js   词汇与语法 60 题
│  ├─ 04_exam_cloze.js   完形 3 篇 × 20 空
│  ├─ 05_exam_reading.js 阅读 6 篇 × 4 题
│  ├─ 06_exam_write.js   汉译英 15 句 + 作文 3 篇
│  ├─ 07_mnemonic.js     1877 词联想文案（生成物）
│  └─ build_mnemonic.js  联想生成器（node data/build_mnemonic.js）
├─ core/           领域层（storage / mastery / srs / grade / exam）
├─ adapters/       适配层（发音）
├─ app/            应用层（状态/用例/启动器）
├─ ui/             表现层（web_views / exam_ui / phone_views）
└─ verify.js       自检（node verify.js，114 项）
```

## 题型专项与整卷模考

- **题型专项**：5 张题型卡，点即开始。词汇/完形/阅读点选即判并出解析；翻译/写作对照参考答案自评。
- **整卷模考**：3 套完整卷，54 题 / 100 分 / 90 分钟倒计时。交卷 → 客观题（70 分）自动判分 → 主观题（30 分）自评 → 成绩报告与趋势入档。未交卷退出自动保存进度，可从模考页续做。
- 题库全部自编，仅以 `../试卷练习/` 9 份真题校准篇幅与分值，未使用原题原句。

## 双端约定

- 存档 KEY = `xwyy_plan_v2_web`，存浏览器 localStorage。
- 手机 App 端（`../hbuilder-app/`）用 `xwyy_plan_v2_app` 存 plus.storage，**两端进度互不读写**。
- 题库与业务逻辑与 App 端逐字同源（md5 校验一致）；只有入口 HTML、样式外壳、存档 KEY 不同。

## 数据状态

2026-11-17 已灌入真实词库：`data/02_words.js` 含 30 天 1877 词（逐词提取自钉题库《学位英语高频单词打卡30天.pdf》）+ 150 道自编小测。进入「背词」自动定位当天词组；数据文件结构见 `../使用说明.md`。
