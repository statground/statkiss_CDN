(function () {
  var KEY = 'statkiss_theme';
  var META_ID = 'statkiss-color-scheme-meta';
  var ATTRS = ['data-theme', 'theme', 'data-bs-theme', 'data-color-mode', 'data-mode', 'data-statkiss-theme'];
  var currentTheme = 'light';
  var nativeMatchMedia = typeof window.matchMedia === 'function' ? window.matchMedia.bind(window) : null;
  var themeMqlMap = new Map();

  function normalizeTheme(value) {
    var raw = String(value == null ? '' : value).trim().toLowerCase();
    if (!raw) return '';
    if (raw === 'dark' || raw.indexOf('dark') !== -1 || raw === 'night' || raw === 'dim' || raw === 'black') return 'dark';
    if (raw === 'light' || raw.indexOf('light') !== -1 || raw === 'day' || raw === 'white' || raw === 'only light') return 'light';
    return '';
  }

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem(KEY);
      var normalized = normalizeTheme(stored);
      if (normalized) return normalized;
    } catch (_) {}
    return '';
  }

  function getThemeFromNode(node) {
    if (!node) return '';
    for (var i = 0; i < ATTRS.length; i += 1) {
      try {
        var value = normalizeTheme(node.getAttribute(ATTRS[i]));
        if (value) return value;
      } catch (_) {}
    }
    var cls = '';
    try { cls = String(node.className || '').toLowerCase(); } catch (_) {}
    if (/(^|\s)dark(\s|$)/.test(cls) || /theme-dark/.test(cls) || /dark-mode/.test(cls)) return 'dark';
    if (/(^|\s)light(\s|$)/.test(cls) || /theme-light/.test(cls) || /light-mode/.test(cls)) return 'light';
    return '';
  }

  function getThemeColorScheme(theme) {
    return theme === 'dark' ? 'dark' : 'only light';
  }

  function ensureMeta() {
    var meta = document.getElementById(META_ID) || document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.id = META_ID;
      meta.setAttribute('name', 'color-scheme');
      document.head.appendChild(meta);
    }
    return meta;
  }

  function syncNode(node, theme) {
    if (!node) return;
    ATTRS.forEach(function (attr) {
      try {
        if (node.getAttribute(attr) !== theme) node.setAttribute(attr, theme);
      } catch (_) {}
    });
    if (node.classList) {
      node.classList.toggle('dark', theme === 'dark');
      node.classList.toggle('light', theme !== 'dark');
    }
    try {
      var cs = getThemeColorScheme(theme);
      if (node.style.colorScheme !== cs) node.style.colorScheme = cs;
    } catch (_) {}
  }

  function dispatchThemeChange(theme, previousTheme) {
    try {
      window.dispatchEvent(new CustomEvent('statkiss:theme', {
        detail: {
          theme: theme,
          previousTheme: previousTheme,
          isDark: theme === 'dark'
        }
      }));
    } catch (_) {}
    themeMqlMap.forEach(function (record) {
      if (!record || !record.mql) return;
      var nextMatches = record.expected === 'dark' ? theme === 'dark' : theme !== 'dark';
      if (record.mql.matches === nextMatches) return;
      record.mql.matches = nextMatches;
      var event = { matches: nextMatches, media: record.mql.media };
      if (typeof record.mql.onchange === 'function') {
        try { record.mql.onchange(event); } catch (_) {}
      }
      record.listeners.forEach(function (listener) {
        try { listener(event); } catch (_) {}
      });
    });
  }

  function syncDom(theme) {
    var root = document.documentElement;
    syncNode(root, theme);
    if (document.body) syncNode(document.body, theme);
    var meta = ensureMeta();
    var content = getThemeColorScheme(theme);
    if (meta.getAttribute('content') !== content) meta.setAttribute('content', content);
    window.__STATKISS_THEME__ = theme;
    window.__STATKISS_THEME_DARK__ = theme === 'dark';
  }

  function setTheme(nextTheme, options) {
    var opts = options || {};
    var normalized = normalizeTheme(nextTheme) || 'light';
    var previousTheme = currentTheme;
    currentTheme = normalized;
    syncDom(normalized);
    if (opts.persist !== false) {
      try { localStorage.setItem(KEY, normalized); } catch (_) {}
    }
    if (opts.notify !== false && normalized !== previousTheme) {
      dispatchThemeChange(normalized, previousTheme);
    }
    return normalized;
  }

  function createThemeMql(query, expected) {
    if (themeMqlMap.has(query)) return themeMqlMap.get(query).mql;
    var listeners = new Set();
    var mql = {
      media: query,
      matches: expected === 'dark' ? currentTheme === 'dark' : currentTheme !== 'dark',
      onchange: null,
      addListener: function (listener) { if (typeof listener === 'function') listeners.add(listener); },
      removeListener: function (listener) { listeners.delete(listener); },
      addEventListener: function (type, listener) { if (type === 'change' && typeof listener === 'function') listeners.add(listener); },
      removeEventListener: function (type, listener) { if (type === 'change') listeners.delete(listener); },
      dispatchEvent: function (event) { listeners.forEach(function (listener) { try { listener(event); } catch (_) {} }); return true; }
    };
    themeMqlMap.set(query, { mql: mql, expected: expected, listeners: listeners });
    return mql;
  }

  currentTheme = getStoredTheme() || getThemeFromNode(document.documentElement) || getThemeFromNode(document.body) || 'light';
  currentTheme = normalizeTheme(currentTheme) || 'light';
  syncDom(currentTheme);

  window.StatKISSTheme = {
    key: KEY,
    attrs: ATTRS.slice(),
    normalize: normalizeTheme,
    get: function () { return currentTheme; },
    isDark: function () { return currentTheme === 'dark'; },
    set: function (theme, options) { return setTheme(theme, options || {}); },
    apply: function (theme, options) { return setTheme(theme, options || {}); },
    sync: function () { syncDom(currentTheme); return currentTheme; }
  };
  window.__STATKISS_THEME_PATCH__ = '20260416-themefix-safe-v1';

  if (nativeMatchMedia) {
    window.matchMedia = function (query) {
      var raw = String(query == null ? '' : query);
      if (/prefers-color-scheme\s*:\s*dark/i.test(raw)) return createThemeMql(raw, 'dark');
      if (/prefers-color-scheme\s*:\s*light/i.test(raw)) return createThemeMql(raw, 'light');
      return nativeMatchMedia(raw);
    };
  }

  window.addEventListener('storage', function (event) {
    if (!event || event.key !== KEY) return;
    var nextTheme = normalizeTheme(event.newValue) || 'light';
    setTheme(nextTheme, { persist: false, notify: true });
  });

  document.addEventListener('DOMContentLoaded', function () {
    syncDom(currentTheme);
  });
})();