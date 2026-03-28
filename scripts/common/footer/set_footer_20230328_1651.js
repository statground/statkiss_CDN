function Div_footer() {
  (function injectFooterDarkFallback() {
    if (document.getElementById('statkiss-footer-dark-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-footer-dark-fallback';
    style.textContent = `
      html.dark footer#div_footer {
        background: #020617 !important;
        color: #cbd5e1 !important;
        border-top: 1px solid rgba(148,163,184,0.14) !important;
      }
      html.dark footer#div_footer .footer-muted { color: #94a3b8 !important; }
      html.dark footer#div_footer a { color: inherit !important; }
      html.dark footer#div_footer img { filter: invert(1); opacity: .9; }
    `;
    document.head.appendChild(style);
  })();

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl flex flex-col w-full justify-center items-center text-center space-y-2 py-6 px-4">
        <span className="text-sm footer-muted text-slate-600 dark:text-slate-400">
          Copyright © 2023 Korean International Statistical Society. All rights reserved.
        </span>

        <span className="text-xs footer-muted text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          statkiss.org is the official domain of the Korean International Statistical Society.
          Korean International Statistical Society (KISS) is a 501(c)(3) nonprofit organization.
          EIN: 45-1725264.
        </span>

        <div className="flex flex-row">
          <a href="https://www.facebook.com/groups/190717430950968" target="_blank" rel="noreferrer">
            <img
              src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/footer_facebook.svg"
              className="w-4 h-4 opacity-80 hover:opacity-100 transition"
              alt="Facebook"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function footerGetI18N() {
  return window.StatKISS_I18N || null;
}

function footerResolveLang(lang) {
  const I = footerGetI18N();
  if (I && typeof I.resolveLangCode === 'function') {
    return I.resolveLangCode(lang || 'en');
  }
  return String(lang || 'en').trim() || 'en';
}

function footerGetCurrentLang() {
  const I = footerGetI18N();
  const candidates = [
    window.__STATKISS_LANG__,
    document.documentElement.getAttribute('lang'),
    I && I.LANG_KEY ? (function () {
      try {
        return localStorage.getItem(I.LANG_KEY);
      } catch (_) {
        return '';
      }
    })() : '',
    typeof navigator !== 'undefined' ? navigator.language : '',
    'en',
  ];

  for (const candidate of candidates) {
    const resolved = footerResolveLang(candidate);
    if (resolved) return resolved;
  }
  return 'en';
}

function footerReadPolicyI18N() {
  const node = document.getElementById('statkiss-footer-policy-i18n');
  if (!node) return {};
  try {
    return JSON.parse(node.textContent || '{}');
  } catch (_) {
    return {};
  }
}

function footerGetPolicyLabel(policyMap, policyKey, lang) {
  const langCode = footerResolveLang(lang);
  const localized = policyMap[langCode] || policyMap.en || {};
  return localized[policyKey] || (policyMap.en || {})[policyKey] || '';
}

function footerGetPolicyPath(policyKey, lang) {
  return '/' + footerResolveLang(lang) + '/' + policyKey + '/';
}

function applyFooterPolicyLocalization(lang) {
  const root = document.getElementById('div_footer');
  if (!root) return;

  const langCode = footerResolveLang(lang);
  const I = footerGetI18N();
  const isRTL = !!(I && typeof I.isRTL === 'function' ? I.isRTL(langCode) : langCode === 'ar');
  const nav = root.querySelector('[data-footer-policy-nav]');
  if (nav) {
    nav.setAttribute('lang', langCode);
    nav.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }

  const policyMap = footerReadPolicyI18N();
  root.querySelectorAll('[data-footer-policy-link]').forEach(function (anchor) {
    const policyKey = String(anchor.getAttribute('data-policy-key') || '').trim();
    if (!policyKey) return;

    const nextLabel = footerGetPolicyLabel(policyMap, policyKey, langCode);
    if (nextLabel) anchor.textContent = nextLabel;
    anchor.setAttribute('href', footerGetPolicyPath(policyKey, langCode));
    anchor.setAttribute('hreflang', langCode);
    anchor.setAttribute('lang', langCode);
    if (isRTL) {
      anchor.setAttribute('dir', 'rtl');
    } else {
      anchor.removeAttribute('dir');
    }
  });
}

function bindFooterPolicyLocalization() {
  applyFooterPolicyLocalization(footerGetCurrentLang());
  window.addEventListener('statkiss:lang', function (event) {
    const nextLang = event && event.detail ? event.detail.lang : footerGetCurrentLang();
    applyFooterPolicyLocalization(nextLang);
  });
}

const footerMountNode = document.getElementById('div_footer_react') || document.getElementById('div_footer');
if (footerMountNode) {
  ReactDOM.render(<Div_footer />, footerMountNode);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindFooterPolicyLocalization, { once: true });
} else {
  bindFooterPolicyLocalization();
}
