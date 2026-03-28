function Div_footer() {
  const { useEffect, useMemo, useState } = React;

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

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function resolveLang(raw) {
    const I = getI18N();
    if (I && typeof I.resolveLangCode === 'function') return I.resolveLangCode(raw || 'en');
    return String(raw || 'en').trim() || 'en';
  }

  function getSupportedLangs() {
    const I = getI18N();
    if (!I || !Array.isArray(I.languages)) return ['en'];
    return I.languages.map((v) => v.code);
  }

  function getLangKey() {
    const I = getI18N();
    return (I && I.LANG_KEY) ? I.LANG_KEY : 'statkiss_lang';
  }

  function getCurrentLang() {
    const langKey = getLangKey();
    try {
      const saved = localStorage.getItem(langKey);
      if (saved) return resolveLang(saved);
    } catch (_) {}

    const parts = String(window.location.pathname || '').split('/').filter(Boolean);
    const supported = getSupportedLangs();
    if (parts.length && supported.includes(parts[0])) return resolveLang(parts[0]);

    const docLang = document.documentElement.getAttribute('lang') || '';
    if (docLang) return resolveLang(docLang);

    return resolveLang((navigator && navigator.language) || 'en');
  }

  function localizeInternalPath(path, lang) {
    const cleanPath = String(path || '');
    if (!cleanPath.startsWith('/')) return cleanPath;

    const supported = getSupportedLangs();
    const parts = cleanPath.split('/').filter(Boolean);
    if (!parts.length) return cleanPath;

    if (supported.includes(parts[0])) {
      parts[0] = lang;
      return '/' + parts.join('/') + (cleanPath.endsWith('/') ? '/' : '');
    }

    return '/' + lang + cleanPath;
  }

  function getFooterCopy(lang) {
    const copy = {
      en: {
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        copyright: 'Copyright © 2023 Korean International Statistical Society. All rights reserved.',
        description: 'statkiss.org is the official domain of the Korean International Statistical Society. Korean International Statistical Society (KISS) is a 501(c)(3) nonprofit organization. EIN: 45-1725264.',
      },
      ko: {
        terms: '이용약관',
        privacy: '개인정보처리방침',
        copyright: 'Copyright © 2023 Korean International Statistical Society. All rights reserved.',
        description: 'statkiss.org는 Korean International Statistical Society의 공식 도메인입니다. Korean International Statistical Society (KISS)는 501(c)(3) 비영리 단체입니다. EIN: 45-1725264.',
      },
    };

    return copy[lang] || copy.en;
  }

  const [lang, setLang] = useState(getCurrentLang());

  useEffect(() => {
    const applyLang = (raw) => setLang(resolveLang(raw || getCurrentLang()));

    const pickLangFromEvent = (e) => {
      if (!e || !e.detail) return null;
      if (typeof e.detail === 'string') return e.detail;
      return e.detail.lang || e.detail.language || e.detail.value || e.detail.code || null;
    };

    const onLang = (e) => applyLang(pickLangFromEvent(e));
    const onStorage = (e) => {
      const langKey = getLangKey();
      if (e && (e.key === langKey || e.key === 'statkiss_lang')) applyLang(e.newValue);
    };
    const onMutation = () => applyLang(document.documentElement.getAttribute('lang') || null);

    window.addEventListener('statkiss:lang', onLang);
    window.addEventListener('statkiss:language', onLang);
    window.addEventListener('statkiss:langChanged', onLang);
    window.addEventListener('storage', onStorage);

    const mo = new MutationObserver(onMutation);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    return () => {
      window.removeEventListener('statkiss:lang', onLang);
      window.removeEventListener('statkiss:language', onLang);
      window.removeEventListener('statkiss:langChanged', onLang);
      window.removeEventListener('storage', onStorage);
      mo.disconnect();
    };
  }, []);

  const copy = useMemo(() => getFooterCopy(lang), [lang]);
  const termsHref = useMemo(() => localizeInternalPath('/terms-of-service/', lang), [lang]);
  const privacyHref = useMemo(() => localizeInternalPath('/privacy-policy/', lang), [lang]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl flex flex-col w-full justify-center items-center text-center space-y-3 py-6 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href={termsHref} className="hover:underline">{copy.terms}</a>
          <span className="footer-muted text-slate-400 dark:text-slate-500">|</span>
          <a href={privacyHref} className="hover:underline">{copy.privacy}</a>
        </div>

        <span className="text-sm footer-muted text-slate-600 dark:text-slate-400">
          {copy.copyright}
        </span>

        <span className="text-xs footer-muted text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          {copy.description}
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

const footerMountNode = document.getElementById('div_footer_react') || document.getElementById('div_footer');
if (footerMountNode) {
  ReactDOM.render(<Div_footer />, footerMountNode);
}
