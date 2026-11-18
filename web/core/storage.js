/* ============================================================
 * core/storage.js —— 存档适配器（双端自适应后端，进度物理隔离）
 * · Web 端：localStorage，KEY = xwyy_plan_v2_web
 * · App 端：plus.storage（5+ Runtime），KEY = xwyy_plan_v2_app
 * 检测在读写时动态进行，兼容 plus 后注入；两端 KEY 不同 + 存储后端不同，互不读写（ADR-003/006）。
 * 单一 KEY + initState() 版本迁移；业务代码不直接碰存储，一律走 APP.store。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var core = APP.core = APP.core || {};
  var SCHEMA = 2;
  var KEY = root.XWYY_STORAGE_KEY || 'xwyy_plan_v2_web';

  // 动态选择存储后端：App(plus.storage) 优先，Web(localStorage) 兜底
  function backend() {
    try {
      if (root.plus && root.plus.storage && root.plus.storage.getItem) {
        return {
          kind: 'plus',
          get: function (k) { return root.plus.storage.getItem(k); },
          set: function (k, v) { root.plus.storage.setItem(k, String(v)); },
          del: function (k) { root.plus.storage.removeItem(k); }
        };
      }
    } catch (e) {}
    return {
      kind: 'local',
      get: function (k) { return root.localStorage ? root.localStorage.getItem(k) : null; },
      set: function (k, v) { if (root.localStorage) root.localStorage.setItem(k, String(v)); },
      del: function (k) { if (root.localStorage) root.localStorage.removeItem(k); }
    };
  }

  function blank() {
    return {
      version: SCHEMA, day: 1, spellEnabled: false, startDate: '',
      wordState: {}, attempts: [], mocks: [], reviewLog: {}, flags: {}
    };
  }

  // 缺字段补全 + 版本迁移；异常时保留旧档副本，不丢数据
  function initState(raw) {
    var base = blank();
    if (!raw || typeof raw !== 'object') return base;
    if (raw.version && raw.version > SCHEMA) base = JSON.parse(JSON.stringify(raw));
    ['wordState', 'attempts', 'mocks', 'reviewLog', 'flags'].forEach(function (k) {
      base[k] = (raw[k] && typeof raw[k] === 'object') ? raw[k] : base[k];
    });
    if (!Array.isArray(base.attempts)) base.attempts = [];
    if (!Array.isArray(base.mocks)) base.mocks = [];
    base.version = SCHEMA;
    ['day', 'spellEnabled', 'startDate'].forEach(function (k) { if (raw[k] !== undefined) base[k] = raw[k]; });
    base.day = Math.max(1, Math.min(60, Number(base.day) || 1));
    return base;
  }

  function load() {
    var b = backend();
    try {
      var s = b.get(KEY);
      return initState(s ? JSON.parse(s) : null);
    } catch (e) {
      try { b.set(KEY + '_broken', b.get(KEY) || ''); } catch (e2) {}
      return blank();
    }
  }
  function save(state) {
    try { backend().set(KEY, JSON.stringify(state)); return true; } catch (e) { return false; }
  }
  function clear() { try { backend().del(KEY); } catch (e) {} }

  core.store = {
    KEY: KEY, SCHEMA: SCHEMA, blank: blank, initState: initState,
    load: load, save: save, clear: clear,
    kind: function () { return backend().kind; }
  };
})(window);
