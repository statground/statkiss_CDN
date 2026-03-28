(function () {
  'use strict';

  const APP_SECTIONS = new Set([
    'account', 'admin', 'about', 'announcement', 'pubs', 'awards', 'forums', 'membership'
  ]);
  const ROOT_LOCALIZED_SLUGS = new Set(['terms-of-service', 'privacy-policy']);

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function getSupportedLangs() {
    const I = getI18N();
    if (!I || !Array.isArray(I.languages)) return ['en'];
    return I.languages.map((value) => value.code);
  }

  function normalizeLang(lang) {
    const I = getI18N();
    if (!I) return String(lang || 'en').trim() || 'en';
    return I.resolveLangCode(lang || 'en');
  }

  function getPathLang(pathname) {
    const supported = getSupportedLangs();
    const parts = String(pathname || window.location.pathname || '').split('/').filter(Boolean);
    if (parts.length && supported.includes(parts[0])) return normalizeLang(parts[0]);
    return '';
  }

  function getCurrentLang() {
    const pathLang = getPathLang(window.location.pathname);
    if (pathLang) return pathLang;

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang) return normalizeLang(htmlLang);

    const I = getI18N();
    try {
      if (I) {
        const saved = localStorage.getItem(I.LANG_KEY);
        if (saved) return normalizeLang(saved);
      }
    } catch (_) {}

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

    if (APP_SECTIONS.has(parts[0]) || ROOT_LOCALIZED_SLUGS.has(parts[0])) {
      return '/' + lang + path;
    }

    return path;
  }

  function localizeHref(href, lang) {
    if (!href || isExternalHref(href)) return href;
    const parsed = splitHref(href);
    return prefixInternalPath(parsed.path, lang) + parsed.query + parsed.hash;
  }

  function getPolicyRoot() {
    return document.getElementById('div_main');
  }

  function isPolicyDynamicPage() {
    const root = getPolicyRoot();
    return !!(
      window.__STATKISS_POLICY_PAGE__ === true ||
      window.__STATKISS_POLICY_PAGE__ === '1' ||
      (root && root.getAttribute('data-policy-dynamic') === '1')
    );
  }

  function getCurrentPolicySlug() {
    const root = getPolicyRoot();
    const explicit = (
      window.__STATKISS_POLICY_SLUG__ ||
      (root ? root.getAttribute('data-policy-slug') : '') ||
      ''
    );
    const trimmed = String(explicit || '').trim();
    if (ROOT_LOCALIZED_SLUGS.has(trimmed)) return trimmed;

    const parts = String(window.location.pathname || '').split('/').filter(Boolean);
    const supported = getSupportedLangs();
    const effectiveParts = parts.length && supported.includes(parts[0]) ? parts.slice(1) : parts;
    if (effectiveParts.length && ROOT_LOCALIZED_SLUGS.has(effectiveParts[0])) return effectiveParts[0];
    return '';
  }

  function rewriteLocalizedAnchors(root, lang) {
    if (!root) return;
    root.querySelectorAll('a[href]').forEach((anchor) => {
      const rawHref = anchor.getAttribute('href');
      const nextHref = localizeHref(rawHref, lang);
      if (nextHref && nextHref !== rawHref) {
        anchor.setAttribute('href', nextHref);
      }
    });
  }

  function rewriteFooterPolicyLinks(lang) {
    const normalized = normalizeLang(lang);
    document.querySelectorAll('[data-footer-policy-link]').forEach((anchor) => {
      const policyKey = String(anchor.getAttribute('data-policy-key') || '').trim();
      if (!policyKey || !ROOT_LOCALIZED_SLUGS.has(policyKey)) return;
      anchor.setAttribute('href', '/' + normalized + '/' + policyKey + '/');
      anchor.setAttribute('hreflang', normalized);
    });
  }

  function rewriteHeaderLinks(lang) {
    const roots = [
      document.getElementById('div_menu'),
      document.getElementById('div_menu_sub_header')
    ].filter(Boolean);

    roots.forEach((root) => rewriteLocalizedAnchors(root, lang));
    rewriteFooterPolicyLinks(lang);

    if (window.StatKISS_FooterPolicy && typeof window.StatKISS_FooterPolicy.apply === 'function') {
      try {
        window.StatKISS_FooterPolicy.apply(lang);
      } catch (_) {}
    }
  }

  function buildCurrentPageLangUrl(lang) {
    const pathname = String(window.location.pathname || '');
    const search = String(window.location.search || '');
    const hash = String(window.location.hash || '');
    const policySlug = getCurrentPolicySlug();

    let nextPath = prefixInternalPath(pathname, lang);
    if (policySlug) {
      nextPath = '/' + normalizeLang(lang) + '/' + policySlug + '/';
    }

    return nextPath + search + hash;
  }

  function isLangRoutablePage(pathname) {
    const parts = String(pathname || '').split('/').filter(Boolean);
    const supported = getSupportedLangs();

    if (!parts.length) return false;
    if (supported.includes(parts[0])) {
      return parts.length > 1 && (APP_SECTIONS.has(parts[1]) || ROOT_LOCALIZED_SLUGS.has(parts[1]));
    }
    return APP_SECTIONS.has(parts[0]) || ROOT_LOCALIZED_SLUGS.has(parts[0]);
  }

  function maybeMoveCurrentPage(lang) {
    if (!isLangRoutablePage(window.location.pathname)) return;

    const nextUrl = buildCurrentPageLangUrl(lang);
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;
    if (nextUrl === currentUrl) return;

    if (isPolicyDynamicPage() && getCurrentPolicySlug()) {
      try {
        window.history.replaceState(Object.assign({}, window.history.state || {}, {
          statkissLang: normalizeLang(lang),
          statkissPolicySlug: getCurrentPolicySlug()
        }), '', nextUrl);
      } catch (_) {
        window.location.href = nextUrl;
        return;
      }
      window.dispatchEvent(new CustomEvent('statkiss:policy-url-changed', {
        detail: { lang: normalizeLang(lang), url: nextUrl, slug: getCurrentPolicySlug() }
      }));
      return;
    }

    window.location.href = nextUrl;
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
      const nextLang = e && e.detail ? (e.detail.lang || e.detail.language || e.detail.code || e.detail.value) : getCurrentLang();
      apply(nextLang, true);
    });

    window.addEventListener('popstate', function () {
      apply(getCurrentLang(), false);
    });

    const observerTargets = [
      document.getElementById('div_menu'),
      document.getElementById('div_menu_sub_header'),
      document.getElementById('div_footer')
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
