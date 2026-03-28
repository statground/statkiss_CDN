function set_main() {
  const { useEffect, useMemo, useRef, useState } = React;

  (function injectPolicyThemeFallback() {
    const styleId = 'statkiss-policy-fallback-' + "StatKISS_I18N_PRIVACY_POLICY";
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #div_main .policy-transition { transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease; }
      #div_main .policy-surface { background: #ffffff; }
      #div_main .policy-eyebrow { color: #0369a1; }
      #div_main .policy-title { color: #0f172a; }
      #div_main .policy-summary { color: #64748b; }
      #div_main .policy-meta-card { background: #f8fafc; border-color: rgba(226,232,240,1); }
      #div_main .policy-meta-label { color: #64748b; }
      #div_main .policy-meta-value { color: #0f172a; }
      #div_main .policy-divider { border-color: rgba(226,232,240,1); }
      #div_main .policy-article-title { color: #0f172a; }
      #div_main .policy-prose,
      #div_main .policy-prose p,
      #div_main .policy-prose li { color: #475569; }
      #div_main .policy-prose a { color: #0369a1; }
      #div_main .policy-prose a:hover { color: #075985; }

      html.dark #div_main .policy-surface,
      body.dark #div_main .policy-surface,
      html[data-theme="dark"] #div_main .policy-surface,
      body[data-theme="dark"] #div_main .policy-surface { background: transparent; }

      html.dark #div_main .policy-eyebrow,
      body.dark #div_main .policy-eyebrow,
      html[data-theme="dark"] #div_main .policy-eyebrow,
      body[data-theme="dark"] #div_main .policy-eyebrow { color: #7dd3fc; }

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
      body[data-theme="dark"] #div_main .policy-meta-card {
        background: rgba(15,23,42,0.72);
        border-color: rgba(51,65,85,0.9);
      }

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

      html.dark #div_main .policy-prose,
      html.dark #div_main .policy-prose p,
      html.dark #div_main .policy-prose li,
      body.dark #div_main .policy-prose,
      body.dark #div_main .policy-prose p,
      body.dark #div_main .policy-prose li,
      html[data-theme="dark"] #div_main .policy-prose,
      html[data-theme="dark"] #div_main .policy-prose p,
      html[data-theme="dark"] #div_main .policy-prose li,
      body[data-theme="dark"] #div_main .policy-prose,
      body[data-theme="dark"] #div_main .policy-prose p,
      body[data-theme="dark"] #div_main .policy-prose li { color: #e2e8f0; }

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

  const NAMESPACE = "StatKISS_I18N_PRIVACY_POLICY";
  const SLUG = "privacy-policy";
  const ROOT = document.getElementById('div_main');

  function getSource() {
    return window[NAMESPACE] || null;
  }

  function getLangKey() {
    const H = window.StatKISS_I18N;
    return (H && H.LANG_KEY) ? H.LANG_KEY : 'statkiss_lang';
  }

  function getSupportedLangs() {
    const H = window.StatKISS_I18N;
    if (H && Array.isArray(H.languages) && H.languages.length) {
      return H.languages.map((item) => String(item.code || '').trim()).filter(Boolean);
    }
    const S = getSource();
    if (S && Array.isArray(S.languages) && S.languages.length) {
      return S.languages.map((item) => String(item || '').trim()).filter(Boolean);
    }
    return ['en'];
  }

  function resolveLang(raw) {
    const H = window.StatKISS_I18N;
    if (H && typeof H.resolveLangCode === 'function') {
      return H.resolveLangCode(raw || 'en');
    }
    const S = getSource();
    if (S && typeof S.resolveLang === 'function') {
      return S.resolveLang(raw || 'en');
    }
    return String(raw || 'en').trim() || 'en';
  }

  function isRTL(lang) {
    const H = window.StatKISS_I18N;
    if (H && typeof H.isRTL === 'function') return H.isRTL(lang);
    return String(lang || '') === 'ar';
  }

  function getLangFromPath() {
    try {
      const pathname = String(window.location.pathname || '/');
      const parts = pathname.split('/').filter(Boolean);
      const supported = getSupportedLangs();
      if (parts.length && supported.includes(parts[0])) {
        return resolveLang(parts[0]);
      }
    } catch (_) {}
    return '';
  }

  function getCurrentLang() {
    const fromPath = getLangFromPath();
    if (fromPath) return fromPath;

    const key = getLangKey();
    const saved = (() => {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    })();
    const docLang = document.documentElement.getAttribute('lang') || '';
    const browser = navigator.language || 'en';
    return resolveLang(saved || docLang || browser || 'en');
  }

  function buildLocalizedUrl(nextLang) {
    const lang = resolveLang(nextLang || getCurrentLang());
    const search = String(window.location.search || '');
    const hash = String(window.location.hash || '');
    return `/${lang}/${SLUG}/` + search + hash;
  }

  function getCurrentFullUrl() {
    return String(window.location.pathname || '/') + String(window.location.search || '') + String(window.location.hash || '');
  }

  function navigateIfNeeded(nextLang) {
    const target = buildLocalizedUrl(nextLang);
    const current = getCurrentFullUrl();
    if (target !== current) {
      window.location.assign(target);
      return true;
    }
    return false;
  }

  function syncDocumentShell(lang, doc) {
    const resolved = resolveLang(lang || getCurrentLang());
    document.documentElement.setAttribute('lang', resolved);
    document.documentElement.setAttribute('dir', isRTL(resolved) ? 'rtl' : 'ltr');

    try { localStorage.setItem(getLangKey(), resolved); } catch (_) {}

    window.__STATKISS_LANG__ = resolved;
    window.__STATKISS_POLICY_PAGE__ = true;
    window.__STATKISS_POLICY_SLUG__ = SLUG;

    if (ROOT) {
      ROOT.setAttribute('data-policy-dynamic', '1');
      ROOT.setAttribute('data-policy-lang', resolved);
      ROOT.setAttribute('data-policy-slug', SLUG);
    }

    const title = doc && doc.document_title ? String(doc.document_title).trim() : '';
    if (title) {
      document.title = `${title} | StatKISS`;
      const metaTitle = document.querySelector('meta[property="og:title"]');
      if (metaTitle) metaTitle.setAttribute('content', `${title} | StatKISS`);
    }

    const summary = doc && doc.document_summary ? String(doc.document_summary).trim() : '';
    if (summary) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', summary);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', summary);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', summary);
    }
  }

  function Div_main() {
    const [lang, setLang] = useState(getCurrentLang());
    const [tick, setTick] = useState(0);
    const navigatingRef = useRef(false);

    useEffect(() => {
      if (getSource()) return;
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (getSource() || tries >= 60) {
          clearInterval(timer);
          setTick((v) => v + 1);
        }
      }, 50);
      return () => clearInterval(timer);
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
      return S.getDocument(lang) || {};
    }, [lang, tick]);

    useEffect(() => {
      syncDocumentShell(lang, documentData);
    }, [lang, documentData]);

    useEffect(() => {
      function extractLang(e) {
        if (!e || !e.detail) return null;
        if (typeof e.detail === 'string') return e.detail;
        return e.detail.lang || e.detail.language || e.detail.value || e.detail.code || null;
      }

      function handlePotentialLangChange(raw, shouldNavigate) {
        const nextLang = resolveLang(raw || getCurrentLang());
        setLang(nextLang);
        if (!shouldNavigate) return;
        if (navigatingRef.current) return;
        navigatingRef.current = true;
        setTimeout(() => {
          navigateIfNeeded(nextLang);
        }, 0);
      }

      const onLang = (e) => handlePotentialLangChange(extractLang(e), true);
      const onStorage = (e) => {
        if (!e) return;
        const key = getLangKey();
        if (e.key === key || e.key === 'statkiss_lang') {
          handlePotentialLangChange(e.newValue, true);
        }
      };
      const onMutation = () => handlePotentialLangChange(document.documentElement.getAttribute('lang') || null, true);
      const onPopState = () => {
        navigatingRef.current = false;
        handlePotentialLangChange(getCurrentLang(), false);
      };
      const onI18nReady = () => setTick((v) => v + 1);

      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);
      window.addEventListener('storage', onStorage);
      window.addEventListener('popstate', onPopState);
      window.addEventListener('statkiss:i18nReady', onI18nReady);

      const mo = new MutationObserver(onMutation);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

      return () => {
        window.removeEventListener('statkiss:lang', onLang);
        window.removeEventListener('statkiss:language', onLang);
        window.removeEventListener('statkiss:langChanged', onLang);
        window.removeEventListener('storage', onStorage);
        window.removeEventListener('popstate', onPopState);
        window.removeEventListener('statkiss:i18nReady', onI18nReady);
        mo.disconnect();
      };
    }, []);

    const dir = isRTL(lang) ? 'rtl' : 'ltr';
    const sections = Array.isArray(documentData.document_sections) ? documentData.document_sections : [];

    return (
      <section className="policy-surface policy-transition">
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:py-14 lg:px-6">
          <div className="mx-auto max-w-screen-lg text-center" dir={dir}>
            <div className="policy-eyebrow policy-transition mb-3 text-sm font-semibold uppercase tracking-[0.2em]">StatKISS</div>
            <h1 className="policy-title policy-transition mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {documentData.document_title}
            </h1>
            <p className="policy-summary policy-transition mx-auto max-w-3xl text-base leading-8 sm:text-lg">
              {documentData.document_summary}
            </p>
          </div>

          <div className="policy-meta-card policy-transition mx-auto mt-8 grid max-w-screen-lg gap-4 rounded-3xl border px-5 py-5 text-start shadow-sm sm:grid-cols-2 sm:px-6" dir={dir}>
            <div>
              <div className="policy-meta-label policy-transition text-xs font-semibold uppercase tracking-[0.16em]">
                {documentData.effective_date_label}
              </div>
              <div className="policy-meta-value policy-transition mt-2 text-base font-semibold">
                {documentData.effective_date}
              </div>
            </div>
            <div>
              <div className="policy-meta-label policy-transition text-xs font-semibold uppercase tracking-[0.16em]">
                {documentData.last_updated_label}
              </div>
              <div className="policy-meta-value policy-transition mt-2 text-base font-semibold">
                {documentData.last_updated}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-screen-lg border-t policy-divider policy-transition pt-8" dir={dir}>
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <article key={`${section.article_title || section.heading || 'section'}-${idx}`} className="px-1 sm:px-2">
                  <h2 className="policy-article-title policy-transition mb-4 text-xl font-bold sm:text-2xl">
                    {section.article_title || section.heading}
                  </h2>
                  {section.heading && section.heading !== section.article_title ? (
                    <div className="policy-meta-label policy-transition mb-4 text-sm font-semibold uppercase tracking-[0.12em]">
                      {section.heading}
                    </div>
                  ) : null}
                  <div
                    className="policy-prose policy-transition prose max-w-none prose-slate prose-p:leading-8 prose-li:leading-8 dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: section.body_html || '' }}
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  ReactDOM.render(<Div_main />, document.getElementById('div_main'));
}
