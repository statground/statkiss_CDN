(function () {
  'use strict';

  const APP_SECTIONS = new Set([
    'account', 'admin', 'about', 'announcement', 'pubs', 'awards', 'forums', 'membership'
  ]);

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function getSupportedLangs() {
    const I = getI18N();
    if (!I || !Array.isArray(I.languages)) return ['en'];
    return I.languages.map(v => v.code);
  }

  function normalizeLang(lang) {
    const I = getI18N();
    if (!I) return lang || 'en';
    return I.resolveLangCode(lang || 'en');
  }

  function getCurrentLang() {
    const I = getI18N();
    try {
      if (I) {
        const saved = localStorage.getItem(I.LANG_KEY);
        if (saved) return normalizeLang(saved);
      }
    } catch (_) {}

    const parts = window.location.pathname.split('/').filter(Boolean);
    const supported = getSupportedLangs();
    if (parts.length && supported.includes(parts[0])) return parts[0];

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang) return normalizeLang(htmlLang);
    return 'en';
  }

  function isExternalHref(href) {
    return /^(https?:|mailto:|tel:|javascript:|#)/i.test(href || '');
  }

  function splitHref(href) {
    const m = String(href || '').match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
    return {
      path: (m && m[1]) || '',
      query: (m && m[2]) || '',
      hash: (m && m[3]) || ''
    };
  }

  function prefixInternalPath(path, lang) {
    if (!path || path[0] !== '/') return path;
    if (path === '/') return path;

    const supported = getSupportedLangs();
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return path;

    if (supported.includes(parts[0])) {
      parts[0] = lang;
      return '/' + parts.join('/') + (path.endsWith('/') ? '/' : '');
    }

    if (APP_SECTIONS.has(parts[0])) {
      return '/' + lang + path;
    }

    return path;
  }

  function localizeHref(href, lang) {
    if (!href || isExternalHref(href)) return href;
    const { path, query, hash } = splitHref(href);
    return prefixInternalPath(path, lang) + query + hash;
  }

  function rewriteHeaderLinks(lang) {
    const roots = [
      document.getElementById('div_menu'),
      document.getElementById('div_menu_sub_header')
    ].filter(Boolean);

    if (!roots.length) return;

    roots.forEach((root) => {
      root.querySelectorAll('a[href]').forEach((a) => {
        const rawHref = a.getAttribute('href');
        const nextHref = localizeHref(rawHref, lang);
        if (nextHref && nextHref !== rawHref) {
          a.setAttribute('href', nextHref);
        }
      });
    });
  }

  function buildCurrentPageLangUrl(lang) {
    const { pathname, search, hash } = window.location;
    const nextPath = prefixInternalPath(pathname, lang);
    return nextPath + search + hash;
  }

  function isLangRoutablePage(pathname) {
    const parts = String(pathname || '').split('/').filter(Boolean);
    const supported = getSupportedLangs();

    if (!parts.length) return false;
    if (supported.includes(parts[0])) {
      return parts.length > 1 && APP_SECTIONS.has(parts[1]);
    }
    return APP_SECTIONS.has(parts[0]);
  }

  function maybeMoveCurrentPage(lang) {
    if (!isLangRoutablePage(window.location.pathname)) return;
    const nextUrl = buildCurrentPageLangUrl(lang);
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;
    if (nextUrl !== currentUrl) {
      window.location.href = nextUrl;
    }
  }

  function apply(lang, shouldNavigate) {
    const normalized = normalizeLang(lang || getCurrentLang());
    rewriteHeaderLinks(normalized);
    if (shouldNavigate) {
      maybeMoveCurrentPage(normalized);
    }
  }

  function bind() {
    apply(getCurrentLang(), false);

    window.addEventListener('statkiss:lang', function (e) {
      const nextLang = e && e.detail ? e.detail.lang : getCurrentLang();
      apply(nextLang, true);
    });

    const observerTargets = [
      document.getElementById('div_menu'),
      document.getElementById('div_menu_sub_header')
    ].filter(Boolean);

    observerTargets.forEach((target) => {
      const observer = new MutationObserver(function () {
        apply(getCurrentLang(), false);
      });
      observer.observe(target, { childList: true, subtree: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
