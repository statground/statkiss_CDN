(function () {
  'use strict';

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function resolveLang(lang) {
    const I = getI18N();
    if (I && typeof I.resolveLangCode === 'function') {
      return I.resolveLangCode(lang || 'en');
    }
    return String(lang || 'en').trim() || 'en';
  }

  function isRTL(lang) {
    const I = getI18N();
    if (I && typeof I.isRTL === 'function') {
      return !!I.isRTL(lang);
    }
    return resolveLang(lang) === 'ar';
  }

  function getPathLang() {
    try {
      const pathname = String(window.location.pathname || '');
      const match = pathname.match(/^\/([A-Za-z]{2}(?:-[A-Za-z0-9]{2,8})?)(?:\/|$)/);
      if (match && match[1]) {
        return resolveLang(match[1]);
      }
    } catch (_) {}
    return '';
  }

  function getCookie(name) {
    const prefix = String(name || '') + '=';
    const rows = String(document.cookie || '').split(';');
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index].trim();
      if (row.indexOf(prefix) === 0) {
        return decodeURIComponent(row.substring(prefix.length));
      }
    }
    return '';
  }

  function setCookie(name, value) {
    const encoded = encodeURIComponent(String(value || ''));
    document.cookie = String(name || '') + '=' + encoded + '; path=/; max-age=31536000; SameSite=Lax';
  }

  function getStorageKeyCandidates() {
    const I = getI18N();
    return Array.from(new Set([(I && I.LANG_KEY) || 'statkiss_lang', 'statkiss_lang', 'statkiss.lang', 'lang']));
  }

  function getStoredLang() {
    const keys = getStorageKeyCandidates();
    try {
      for (let index = 0; index < keys.length; index += 1) {
        const saved = localStorage.getItem(keys[index]);
        if (saved) return resolveLang(saved);
      }
    } catch (_) {}
    return '';
  }

  const nativeLocalStorageSetItem = (function () {
    try {
      return window.localStorage && typeof window.localStorage.setItem === 'function'
        ? window.localStorage.setItem.bind(window.localStorage)
        : null;
    } catch (_) {
      return null;
    }
  })();

  let suppressStorageMirror = false;

  function writeStorageLang(lang) {
    if (!nativeLocalStorageSetItem) return;
    const normalized = resolveLang(lang);
    const keys = getStorageKeyCandidates();
    suppressStorageMirror = true;
    try {
      keys.forEach(function (key) {
        nativeLocalStorageSetItem(key, normalized);
      });
    } catch (_) {
      // ignore storage failures
    } finally {
      suppressStorageMirror = false;
    }
  }

  function persistLang(lang, options) {
    const normalized = resolveLang(lang);
    const settings = options || {};

    if (!settings.skipStorage) {
      writeStorageLang(normalized);
    }

    try { window.__STATKISS_LANG__ = normalized; } catch (_) {}
    try {
      if (document && document.documentElement) {
        document.documentElement.setAttribute('lang', normalized);
        document.documentElement.setAttribute('dir', isRTL(normalized) ? 'rtl' : 'ltr');
      }
    } catch (_) {}

    setCookie('lang', normalized);
    setCookie('django_language', normalized);

    return normalized;
  }

  function patchStorageMirror() {
    try {
      const storage = window.localStorage;
      if (!storage || storage.__statkissLangPatched || !nativeLocalStorageSetItem) return;
      storage.setItem = function (key, value) {
        nativeLocalStorageSetItem(key, value);
        if (suppressStorageMirror) return;
        const normalizedKey = String(key || '').trim();
        const keys = getStorageKeyCandidates();
        if (keys.indexOf(normalizedKey) >= 0) {
          persistLang(value, { skipStorage: true });
        }
      };
      storage.__statkissLangPatched = true;
    } catch (_) {}
  }

  function syncInitialLang() {
    const initial = getPathLang() || getCookie('lang') || getCookie('django_language') || getStoredLang() || document.documentElement.getAttribute('lang') || navigator.language || 'en';
    persistLang(initial);
  }

  function handleLangEvent(event) {
    const detail = event && event.detail ? event.detail : {};
    const nextLang = typeof detail === 'string' ? detail : (detail.lang || detail.language || detail.code || detail.value || '');
    if (!nextLang) return;
    persistLang(nextLang);
  }

  function handleStorageEvent(event) {
    const keys = getStorageKeyCandidates();
    if (!event || keys.indexOf(String(event.key || '').trim()) < 0 || !event.newValue) return;
    persistLang(event.newValue, { skipStorage: true });
  }

  patchStorageMirror();
  syncInitialLang();
  window.addEventListener('storage', handleStorageEvent);
  window.addEventListener('statkiss:lang', handleLangEvent);
  window.addEventListener('statkiss:language', handleLangEvent);
  window.addEventListener('statkiss:langChanged', handleLangEvent);

  window.StatKISSLangPersistence = {
    persist: persistLang,
    syncInitial: syncInitialLang,
  };
})();
