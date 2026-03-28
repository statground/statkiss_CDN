function set_main() {
  const { useEffect, useMemo, useRef, useState } = React;
  const POLICY_NAMESPACE = "StatKISS_I18N_TERMS_OF_SERVICE";
  const POLICY_SLUG = "terms-of-service";

  (function injectPolicyThemeFallback() {
    const styleId = 'statkiss-policy-fallback-' + POLICY_NAMESPACE;
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #div_main .policy-surface { background: #ffffff; }
      #div_main .policy-title { color: #0f172a; }
      #div_main .policy-summary { color: #64748b; }
      #div_main .policy-meta-card { background: #f8fafc; border-color: rgba(226,232,240,1); }
      #div_main .policy-meta-label { color: #64748b; }
      #div_main .policy-meta-value { color: #0f172a; }
      #div_main .policy-divider { border-color: rgba(226,232,240,1); }
      #div_main .policy-article-title { color: #0f172a; }
      #div_main .policy-prose, #div_main .policy-prose p, #div_main .policy-prose li { color: #475569; }
      #div_main .policy-prose a { color: #0369a1; }
      #div_main .policy-prose a:hover { color: #075985; }

      html.dark #div_main .policy-surface,
      body.dark #div_main .policy-surface,
      html[data-theme="dark"] #div_main .policy-surface,
      body[data-theme="dark"] #div_main .policy-surface { background: transparent; }
      html.dark #div_main .policy-title,
      body.dark #div_main .policy-title,
      html[data-theme="dark"] #div_main .policy-title,
      body[data-theme="dark"] #div_main .policy-title { color: #ffffff; }
      html.dark #div_main .policy-summary,
      body.dark #div_main .policy-summary,
      html[data-theme="dark"] #div_main .policy-summary,
      body[data-theme="dark"] #div_main .policy-summary { color: #cbd5e1; }
      html.dark #div_main .policy-meta-card,
      body.dark #div_main .policy-meta-card,
      html[data-theme="dark"] #div_main .policy-meta-card,
      body[data-theme="dark"] #div_main .policy-meta-card { background: rgba(15,23,42,0.72); border-color: rgba(51,65,85,0.9); }
      html.dark #div_main .policy-meta-label,
      body.dark #div_main .policy-meta-label,
      html[data-theme="dark"] #div_main .policy-meta-label,
      body[data-theme="dark"] #div_main .policy-meta-label { color: #94a3b8; }
      html.dark #div_main .policy-meta-value,
      body.dark #div_main .policy-meta-value,
      html[data-theme="dark"] #div_main .policy-meta-value,
      body[data-theme="dark"] #div_main .policy-meta-value { color: #f8fafc; }
      html.dark #div_main .policy-divider,
      body.dark #div_main .policy-divider,
      html[data-theme="dark"] #div_main .policy-divider,
      body[data-theme="dark"] #div_main .policy-divider { border-color: rgba(51,65,85,0.9); }
      html.dark #div_main .policy-article-title,
      body.dark #div_main .policy-article-title,
      html[data-theme="dark"] #div_main .policy-article-title,
      body[data-theme="dark"] #div_main .policy-article-title { color: #ffffff; }
      html.dark #div_main .policy-prose, html.dark #div_main .policy-prose p, html.dark #div_main .policy-prose li,
      body.dark #div_main .policy-prose, body.dark #div_main .policy-prose p, body.dark #div_main .policy-prose li,
      html[data-theme="dark"] #div_main .policy-prose, html[data-theme="dark"] #div_main .policy-prose p, html[data-theme="dark"] #div_main .policy-prose li,
      body[data-theme="dark"] #div_main .policy-prose, body[data-theme="dark"] #div_main .policy-prose p, body[data-theme="dark"] #div_main .policy-prose li { color: #e2e8f0; }
      html.dark #div_main .policy-prose a,
      body.dark #div_main .policy-prose a,
      html[data-theme="dark"] #div_main .policy-prose a,
      body[data-theme="dark"] #div_main .policy-prose a { color: #7dd3fc; }
      html.dark #div_main .policy-prose a:hover,
      body.dark #div_main .policy-prose a:hover,
      html[data-theme="dark"] #div_main .policy-prose a:hover,
      body[data-theme="dark"] #div_main .policy-prose a:hover { color: #bae6fd; }
    `;
    document.head.appendChild(style);
  })();

  function getSource() {
    return window[POLICY_NAMESPACE] || null;
  }

  function getHeaderI18n() {
    return window.StatKISS_I18N || null;
  }

  function getLangKey() {
    const H = getHeaderI18n();
    return (H && H.LANG_KEY) ? H.LANG_KEY : 'statkiss_lang';
  }

  function resolveLang(raw) {
    const H = getHeaderI18n();
    if (H && typeof H.resolveLangCode === 'function') return H.resolveLangCode(raw || 'en');
    const S = getSource();
    if (S && typeof S.resolveLang === 'function') return S.resolveLang(raw || 'en');
    return String(raw || 'en').trim() || 'en';
  }

  function isRTL(lang) {
    const H = getHeaderI18n();
    if (H && typeof H.isRTL === 'function') return H.isRTL(lang);
    return resolveLang(lang) === 'ar';
  }

  function getSupportedLangs() {
    const H = getHeaderI18n();
    if (H && Array.isArray(H.languages) && H.languages.length) return H.languages.map(item => item.code);
    const S = getSource();
    if (S && Array.isArray(S.languages) && S.languages.length) return S.languages.slice();
    return ['en'];
  }

  function getPathLang() {
    const parts = String(window.location.pathname || '').split('/').filter(Boolean);
    if (!parts.length) return '';
    const supported = getSupportedLangs();
    return supported.includes(parts[0]) ? parts[0] : '';
  }

  function getPreferredLang() {
    const key = getLangKey();
    let saved = '';
    try { saved = localStorage.getItem(key) || ''; } catch (_) {}
    const winLang = window.__STATKISS_LANG__ || '';
    const docLang = document.documentElement.getAttribute('lang') || '';
    const pathLang = getPathLang();
    const browser = navigator.language || 'en';
    return resolveLang(saved || winLang || docLang || pathLang || browser || 'en');
  }

  function buildLocalizedUrl(nextLang) {
    const lang = resolveLang(nextLang || getPreferredLang());
    return '/' + lang + '/terms-of-service/' + String(window.location.search || '') + String(window.location.hash || '');
  }

  function currentUrl() {
    return String(window.location.pathname || '/') + String(window.location.search || '') + String(window.location.hash || '');
  }

  function navigateIfNeeded(nextLang) {
    const nextUrl = buildLocalizedUrl(nextLang);
    if (nextUrl !== currentUrl()) {
      window.location.assign(nextUrl);
      return true;
    }
    return false;
  }

  function syncDocumentLangAttrs(lang) {
    const resolved = resolveLang(lang);
    document.documentElement.setAttribute('lang', resolved);
    document.documentElement.setAttribute('dir', isRTL(resolved) ? 'rtl' : 'ltr');
    window.__STATKISS_LANG__ = resolved;
    const root = document.getElementById('div_main');
    if (root) {
      root.setAttribute('data-policy-slug', POLICY_SLUG);
      root.setAttribute('data-policy-lang', resolved);
      root.setAttribute('data-policy-dynamic', '1');
    }
  }

  function updateHeadFromDocument(lang, documentData) {
    syncDocumentLangAttrs(lang);
    if (documentData && documentData.document_title) document.title = documentData.document_title + ' | StatKISS';
    const absolute = window.location.origin + '/' + resolveLang(lang) + '/terms-of-service/';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', absolute);
    document.querySelectorAll('meta[property="og:url"]').forEach((el) => el.setAttribute('content', absolute));
    document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach((el) => {
      if (documentData && documentData.document_summary) el.setAttribute('content', documentData.document_summary);
    });
    document.querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]').forEach((el) => {
      if (documentData && documentData.document_title) el.setAttribute('content', documentData.document_title + ' | StatKISS');
    });
  }

  function Div_main() {
    const [lang, setLang] = useState(getPreferredLang());
    const [i18nTick, setI18nTick] = useState(0);
    const navLockRef = useRef(false);
    const lastSeenLangRef = useRef(getPreferredLang());

    useEffect(() => {
      if (getSource()) return;
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (getSource() || tries >= 60) {
          clearInterval(timer);
          setI18nTick((x) => x + 1);
        }
      }, 50);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      const applyLang = (raw, shouldNavigate) => {
        const resolved = resolveLang(raw || getPreferredLang());
        lastSeenLangRef.current = resolved;
        setLang(resolved);
        syncDocumentLangAttrs(resolved);
        if (shouldNavigate && !navLockRef.current) {
          navLockRef.current = true;
          const moved = navigateIfNeeded(resolved);
          if (!moved) navLockRef.current = false;
        }
      };

      const pickLangFromEvent = (e) => {
        if (!e) return null;
        if (typeof e.detail === 'string') return e.detail;
        const d = e.detail || {};
        return d.lang || d.language || d.value || d.code || null;
      };

      const onLang = (e) => applyLang(pickLangFromEvent(e), true);
      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);

      const onStorage = (e) => {
        if (!e) return;
        if (e.key === getLangKey() || e.key === 'statkiss_lang') applyLang(e.newValue, true);
      };
      window.addEventListener('storage', onStorage);

      const mo = new MutationObserver(() => {
        const next = document.documentElement.getAttribute('lang') || window.__STATKISS_LANG__ || null;
        if (next && resolveLang(next) !== getPathLang()) applyLang(next, true);
      });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

      const onPopState = () => {
        navLockRef.current = false;
        applyLang(getPathLang() || getPreferredLang(), false);
      };
      window.addEventListener('popstate', onPopState);

      const onI18nReady = () => setI18nTick((x) => x + 1);
      window.addEventListener('statkiss:i18nReady', onI18nReady);

      const watchdog = setInterval(() => {
        const preferred = getPreferredLang();
        const pathLang = getPathLang();
        if (preferred !== lastSeenLangRef.current) {
          applyLang(preferred, true);
          return;
        }
        if (pathLang && preferred && pathLang !== preferred && !navLockRef.current) {
          applyLang(preferred, true);
        }
      }, 250);

      applyLang(getPreferredLang(), false);

      return () => {
        clearInterval(watchdog);
        window.removeEventListener('statkiss:lang', onLang);
        window.removeEventListener('statkiss:language', onLang);
        window.removeEventListener('statkiss:langChanged', onLang);
        window.removeEventListener('storage', onStorage);
        window.removeEventListener('popstate', onPopState);
        window.removeEventListener('statkiss:i18nReady', onI18nReady);
        mo.disconnect();
      };
    }, []);

    const documentData = useMemo(() => {
      const S = getSource();
      if (!S || typeof S.getDocument !== 'function') {
        return {
          document_title: '',
          document_summary: '',
          document_sections: [],
          effective_date_label: '',
          effective_date: '',
          last_updated_label: '',
          last_updated: '',
        };
      }
      const data = S.getDocument(lang) || {};
      updateHeadFromDocument(lang, data);
      return data;
    }, [lang, i18nTick]);

    const dir = isRTL(lang) ? 'rtl' : 'ltr';

    return (
      <section className="policy-surface">
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:py-14 lg:px-6">
          <div className="mx-auto max-w-screen-lg text-center" dir={dir}>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">StatKISS</div>
            <h1 className="policy-title mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{documentData.document_title}</h1>
            <p className="policy-summary mx-auto max-w-3xl text-base leading-8 sm:text-lg">{documentData.document_summary}</p>
          </div>
          <div className="policy-meta-card mx-auto mt-8 grid max-w-screen-lg gap-4 rounded-3xl border px-5 py-5 text-start shadow-sm sm:grid-cols-2 sm:px-6" dir={dir}>
            <div>
              <div className="policy-meta-label text-xs font-semibold uppercase tracking-[0.16em]">{documentData.effective_date_label}</div>
              <div className="policy-meta-value mt-1 text-sm font-semibold">{documentData.effective_date}</div>
            </div>
            <div>
              <div className="policy-meta-label text-xs font-semibold uppercase tracking-[0.16em]">{documentData.last_updated_label}</div>
              <div className="policy-meta-value mt-1 text-sm font-semibold">{documentData.last_updated}</div>
            </div>
          </div>
          <div className="policy-divider mx-auto mt-8 max-w-screen-lg border-t pt-8 text-start" dir={dir}>
            {(documentData.document_sections || []).map((section, index) => (
              <article key={index} className="mb-10 px-1 last:mb-0 sm:px-4">
                <h2 className="policy-article-title mb-4 text-lg font-medium sm:text-xl">{section.article_title}</h2>
                <div className="policy-prose prose prose-slate max-w-none leading-8 dark:prose-invert prose-p:my-0 prose-ul:my-2 prose-ol:my-2 prose-li:my-1" dangerouslySetInnerHTML={{ __html: section.body_html || '' }} />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  ReactDOM.render(<Div_main />, document.getElementById('div_main'));
}
