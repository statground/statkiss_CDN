(function (global, document) {
  'use strict';

  var STORAGE_KEYS = ['statkiss_theme', 'statkiss_appearance', 'appearance', 'theme', 'color-theme', 'mode'];
  var ATTRS = ['data-theme', 'theme', 'data-color-mode', 'data-bs-theme', 'data-mode', 'data-statkiss-theme'];

  function normalizeTheme(value) {
    var lower = String(value == null ? '' : value).trim().toLowerCase();
    if (!lower) return '';
    if (lower.indexOf('dark') >= 0 || lower === 'night' || lower === 'black' || lower === 'dim') return 'dark';
    if (lower.indexOf('light') >= 0 || lower === 'day' || lower === 'white') return 'light';
    return '';
  }

  function readTheme() {
    for (var i = 0; i < STORAGE_KEYS.length; i += 1) {
      try {
        var value = normalizeTheme(global.localStorage && global.localStorage.getItem(STORAGE_KEYS[i]));
        if (value) return value;
      } catch (error) {
        /* ignore */
      }
    }
    return 'light';
  }

  function applyTheme(node, theme) {
    if (!node) return;
    for (var i = 0; i < ATTRS.length; i += 1) {
      try {
        node.setAttribute(ATTRS[i], theme);
      } catch (error) {
        /* ignore */
      }
    }

    try {
      node.classList.remove(theme === 'dark' ? 'light' : 'dark');
      node.classList.add(theme);
      node.classList.toggle('dark', theme === 'dark');
      node.classList.toggle('light', theme === 'light');
      node.style.setProperty('color-scheme', theme === 'dark' ? 'dark' : 'only light');
    } catch (error) {
      /* ignore */
    }
  }

  var theme = readTheme();
  global.__STATKISS_THEME_BOOT__ = { theme: theme };
  applyTheme(document.documentElement, theme);

  var colorSchemeMeta = document.getElementById('statkiss-color-scheme');
  if (colorSchemeMeta) {
    try {
      colorSchemeMeta.setAttribute('content', theme === 'dark' ? 'dark' : 'only light');
    } catch (error) {
      /* ignore */
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(document.body, theme);
  }, { once: true });
})(window, document);
