/* ============================================================
 * app-plus.js —— HBuilder 5+ App 端适配（唯一端差异）
 * 职责：Android 返回键、状态栏、运行环境提示。
 * 存档已由 core/storage.js 自动走 plus.storage，本文件不碰业务与题库。
 * 仅打包为 App 时 plus 对象存在；浏览器预览时全部降级为空操作。
 * ============================================================ */
(function (root) {
  'use strict';
  function ready(fn) {
    if (root.plus) return fn();
    document.addEventListener('plusready', fn, false);
  }

  ready(function () {
    var plus = root.plus;

    // 状态栏：沉浸式浅色主题（失败不影响功能）
    try {
      if (plus.navigator && plus.navigator.setStatusBarStyle) plus.navigator.setStatusBarStyle('dark');
      if (plus.navigator && plus.navigator.setStatusBarBackground) plus.navigator.setStatusBarBackground('#2563eb');
    } catch (e) {}

    // Android 返回键：应用内有上一视图则回退，否则双击退出
    var lastBack = 0;
    try {
      if (plus.key && plus.key.addEventListener) {
        plus.key.addEventListener('backbutton', function () {
          var app = root.APP && root.APP.app;
          if (app && app.S && app.S.view && app.S.view !== 'home') {
            app.go('home');
            return;
          }
          var now = Date.now();
          if (now - lastBack < 1000) {
            if (plus.runtime && plus.runtime.quit) plus.runtime.quit();
          } else {
            lastBack = now;
            if (plus.nativeUI && plus.nativeUI.toast) plus.nativeUI.toast('再按一次退出');
          }
        }, false);
      }
    } catch (e) {}
  });
})(window);
