# 墨记 · 学位英语 30 天背单词（手机端 App）

基于 uni-app（Vue3）实现的手机端背单词应用，由原型 `背单词设计/mobile.html` 工程化重构而来，可用 HBuilderX 直接打包为 Android / iOS 原生 App。

## 技术栈选型

| 项 | 选择 | 理由 |
|:---|:---|:---|
| 框架 | uni-app (Vue3) | HBuilderX 官方支持，一套代码打包 Android/iOS/小程序/H5 |
| 语言 | JavaScript + Vue3 选项式 API | 与原型逻辑无缝迁移 |
| 数据 | `common/words.js` 内联词库模块 | 跨端同步加载，避免 App 端 fetch 本地 JSON 的路径坑 |
| 状态 | Vue3 `reactive` 全局单例 store | 轻量、零额外依赖，跨页面共享存档 |
| 存储 | `uni.getStorageSync`（内存降级） | 与原型 localStorage 语义一致 |
| 发音 | `plus.speech` 原生 TTS（App）/ `speechSynthesis`（H5 调试） | 真机可发音，支持美音/英音切换 |

## 项目结构

```
词阶app/
├── manifest.json            # 应用配置（HBuilderX 打包必需）
├── pages.json               # 页面路由
├── main.js                  # Vue3 入口
├── App.vue                  # 应用根组件
├── index.html               # H5 运行入口（浏览器预览用）
├── uni.scss                 # 主题变量
├── common/
│   ├── words.js             # 词库（1877 词 / 30 天，由《学位英语六步记忆卡》转换）
│   ├── data.js              # 词库查询（今日新词 / 到期复习 / 错词 / 干扰项）
│   ├── store.js             # 存档状态 + 回滚/判定/天数推进/持久化
│   └── utils.js             # 发音（原生TTS/WebSpeech）/ 转义 / 助记卡渲染 / toast
├── components/
│   ├── note-card/           # 摊开一页助记卡（学词 / 自测复用）
│   └── custom-tabbar/       # 底部导航
├── pages/
│   ├── today/               # 今日规划
│   ├── learn/               # 学新词 + 复习自测（同页三模式）
│   ├── quiz/                # 每日练习（四选一 + 中译英变式）
│   └── wrong/               # 错词本
└── static/data/words.json   # 词库 JSON（数据源备份）
```

## 核心业务规则（与 PRD 一致）

- **词库**：1877 词，30 天分配（D1–D29 各 62~63，D30 为 57），词分三档 `f`(完整卡 120) / `l`(轻卡 1728) / `s`(跳过 29)。
- **天数推进**：学完当天全部新词后，天数自动 +1 解锁下一天（正式产品逻辑，替代原型的「时间机器」演示组件）。
- **回滚**：艾宾浩斯间隔阶梯 `INTERVALS=[1,2,4,7,15,30]`；新词学后明天到期；自测/练习连对 2 次升一阶顺延；答错 stage 归 0、明天到期、进错词本、本轮末重考。
- **错词**：连对两次自动移出。
- **练习**：8 题/轮，第 3 题起中译英变式，答错补考。
- **发音**：学词/自测/练习进入新词自动朗读（可在顶栏关闭）；🔊 手动朗读；美音 en-US / 英音 en-GB 切换。
- **存储**：key=`cijie_m2`，`uni.getStorageSync` 不可用时自动降级内存。

## 如何在 HBuilderX 中运行与打包

1. 安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)（建议 3.6+ 版本）。
2. `文件 → 打开目录`，选择本 `词阶app` 目录。
3. **浏览器预览**：`运行 → 运行到浏览器 → Chrome`（发音走 Web Speech API）。
4. **真机调试**：`运行 → 运行到手机或模拟器`（需连接手机或装模拟器；发音走系统 TTS）。
5. **打包 App**：`发行 → 原生App-云打包`：
   - 首次需登录 DCloud 账号，HBuilderX 会自动为应用分配 `appid`（写入 manifest.json）。
   - 选择 Android（apk）/ iOS（ipa），提交云端打包，几分钟后下载安装包。

> 发音说明：App 端用 `plus.speech` 调用系统 TTS 引擎朗读；部分 Android 机型首次需联网下载对应语言的语音包（已声明 INTERNET 权限）。若个别机型无对应语音包，会自动 toast 提示。

## 数据来源说明

词库来自 `../学位英语六步记忆卡.json`（钉题库《学位英语高频单词打卡30天》1877 词），经脚本转换为 `common/words.js`。重新生成命令：

```bash
node -e "
const fs=require('fs');
const d=JSON.parse(fs.readFileSync('../学位英语六步记忆卡.json','utf8'));
// ... 见 static/data 生成脚本
"
```

> 注：`static/data/words.json` 与 `common/words.js` 内容一致，前者为可读备份，后者为运行时内联模块。改词库后需同步两份。
