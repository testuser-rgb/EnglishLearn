# 手机 App 端 · 江苏联盟学位英语备考（HBuilder 5+ App）

用 HBuilderX 打包成 Android / iOS 安装包的 5+ App 工程。运行时就是全屏手机学习界面，存档走 plus.storage，与 Web 端进度完全隔离。

## 目录结构（HBuilder 标准 5+ App 工程）

```
hbuilder-app/
├─ manifest.json   DCloud 应用配置（id/版本/权限/方向）
├─ index.html      启动门户（进入学习台）
├─ app.html        学习台（全屏手机界面）
├─ app-plus.js     端适配：返回键 / 状态栏 / 双击退出
├─ css/common.css  共享样式（App 端覆盖为全屏无边框）
├─ data/           数据层（01–06，唯一真相源，与 Web 端逐字同源）
├─ core/           领域层（storage / mastery / srs / grade / exam）
├─ adapters/ app/ ui/   适配层 / 应用层 / 表现层
└─ verify.js       自检（node verify.js，114 项）
```

## 打包步骤（HBuilderX）

1. HBuilderX → 文件 → 导入 → 导入本地 App 项目，选择本目录 `hbuilder-app/`。
2. 打开 `manifest.json`，按需要补全：
   - 应用标识 `id`（Base64 编码，需唯一，示例仅占位）；
   - Android 包名 `plus.distribute.google.packagename`（示例占位，改成你自己的）；
   - iOS 若打包，补 `appid` / 证书 / provisioning profile；
   - 应用名称、version、图标。
3. 发行 → 原生 App-本地打包 / 云打包 → 生成 APK / IPA。
4. 自定义基座调试可勾选，真机运行验证返回键与存档。
5. 注意：`unpackage/` 含签名密钥时不要入库（.gitignore 已忽略）。

## 端差异（只有这几处，业务逻辑零改动）

- `app.html`：设 `XWYY_STORAGE_KEY='xwyy_plan_v2_app'`、`XWYY_MODE='phone'`，样式覆盖为全屏铺满、隐藏 Web 壳。
- `app-plus.js`：Android 返回键（应用内回退今日页 / 首页双击退出）、状态栏样式。
- `core/storage.js`：检测到 `plus.storage` 时自动用它存档，否则降级 localStorage（浏览器预览用）。

## 手机端界面

底部 5 个 Tab：今日 / 背词 / 小测 / 专项 / 模考。

- **专项**：5 张题型卡，点即进入答题屏；客观题点选即判并出解析。
- **模考**：3 套完整卷，54 题 / 100 分 / 90 分钟倒计时；交卷 → 客观题自动判分 → 主观题自评 → 成绩报告与趋势。未交卷退出自动保存进度，可续做。
- 答题屏顶栏常驻计时器与交卷按钮，题目块针对窄屏做过压缩（选项单列、字号下调），底部 Tab 保持可点。

## 双端约定

- App 存本机 plus.storage，Web 存浏览器 localStorage，KEY 也不同，**互不读写、换设备不继承**（用户已确认接受）。
- 题库与逻辑同 Web 端逐字同源（md5 校验一致）。

## 数据状态

2026-11-17 已灌入真实词库：`data/02_words.js` 含 30 天 1877 词 + 150 道自编小测；`data/03–06` 为五大题型题库（词汇 60 题 / 完形 3 篇 / 阅读 6 篇 / 翻译 15 句 / 作文 3 篇），全部自编。说明见 `../使用说明.md`。

## 验证记录

- `node verify.js`：114/114 全绿（含词库完整性、题型题库完整性、组卷与判分）。
- Edge headless 以 390px iframe 渲染：专项卡、答题屏（计时器 / 选项 / 题号）、成绩报告、底部 5 Tab 均正常，无横向溢出。
- 端到端实测：专项作答即判 → 模考 54 题作答 → 交卷自评 → 满分 100 分路径 → 趋势入档，全程无 JS 报错。
- `manifest.json` 经 JSON 解析校验合法。
