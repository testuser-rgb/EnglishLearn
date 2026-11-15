/* HTML5 Plus 原生能力增强：仅在 5+ App 运行时生效，普通浏览器中不执行任何操作。
   用途：Android 返回键在页面内后退，回到首页后双击退出。不触碰任何题库、答案与业务逻辑。 */
(function () {
  function setup() {
    if (!window.plus || !window.plus.key) return;
    var lastBack = 0;
    window.plus.key.addEventListener('backbutton', function () {
      if (history.length > 1) {
        history.back();
        return;
      }
      var now = Date.now();
      if (now - lastBack < 2000) {
        window.plus.runtime.quit();
      } else {
        lastBack = now;
        if (window.plus.nativeUI && window.plus.nativeUI.toast) {
          window.plus.nativeUI.toast('再按一次退出应用');
        }
      }
    });
  }
  if (window.plus) setup();
  else document.addEventListener('plusready', setup, false);
})();
