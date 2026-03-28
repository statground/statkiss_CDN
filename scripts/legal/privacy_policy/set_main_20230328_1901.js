function set_main() {
  const { useEffect, useMemo, useState } = React;

  (function injectPolicyThemeFallback() {
    if (document.getElementById('statkiss-policy-fallback-' + "StatKISS_I18N_PRIVACY_POLICY")) return;

    const style = document.createElement('style');
    style.id = 'statkiss-policy-fallback-' + "StatKISS_I18N_PRIVACY_POLICY";
    style.textContent = `
      #div_main .policy-surface { background: #ffffff; }
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

  function getSource() {
    return window["StatKISS_I18N_PRIVACY_POLICY"] || null;
  }

  function getLangKey() {
    const H = window.StatKISS_I18N;
    return (H && H.LANG_KEY) ? H.LANG_KEY : 'statkiss_lang';
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

  function getLang() {
    const langKey = getLangKey();
    const saved = (() => {
      try { return localStorage.getItem(langKey); } catch (_) { return null; }
    })();
    const docLang = document.documentElement.getAttribute('lang') || '';
    const browser = navigator.language || 'en';
    return resolveLang(saved || docLang || browser || 'en');
  }

  function isRTL(lang) {
    const H = window.StatKISS_I18N;
    if (H && typeof H.isRTL === 'function') {
      return H.isRTL(lang);
    }
    return lang === 'ar';
  }

  function Div_main() {
    const [lang, setLang] = useState(getLang());
    const [stamp, setStamp] = useState(0);

    useEffect(() => {
      const applyLang = (raw) => setLang(resolveLang(raw || getLang()));

      const pickLangFromEvent = (e) => {
        if (!e || !e.detail) return null;
        if (typeof e.detail === 'string') return e.detail;
        return e.detail.lang || e.detail.language || e.detail.value || e.detail.code || null;
      };

      const onLang = (e) => applyLang(pickLangFromEvent(e));
      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);

      const onStorage = (e) => {
        if (!e) return;
        const langKey = getLangKey();
        if (e.key === langKey || e.key === 'statkiss_lang') applyLang(e.newValue);
      };
      window.addEventListener('storage', onStorage);

      const mo = new MutationObserver(() => applyLang(document.documentElement.getAttribute('lang') || null));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

      const onI18nReady = () => setStamp((value) => value + 1);
      window.addEventListener('statkiss:i18nReady', onI18nReady);

      return () => {
        window.removeEventListener('statkiss:lang', onLang);
        window.removeEventListener('statkiss:language', onLang);
        window.removeEventListener('statkiss:langChanged', onLang);
        window.removeEventListener('storage', onStorage);
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
      return S.getDocument(lang) || {};
    }, [lang, stamp]);

    const dir = isRTL(lang) ? 'rtl' : 'ltr';

    return (
      <section className="policy-surface">
        <div className="mx-auto max-w-screen-xl px-4 py-10 sm:py-14 lg:px-6">
          <div className="mx-auto max-w-screen-lg text-center" dir={dir}>
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              StatKISS
            </div>
            <h1 className="policy-title mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {documentData.document_title}
            </h1>
            <p className="policy-summary mx-auto max-w-3xl text-base leading-8 sm:text-lg">
              {documentData.document_summary}
            </p>
          </div>

          <div className="policy-meta-card mx-auto mt-8 grid max-w-screen-lg gap-4 rounded-3xl border px-5 py-5 text-start shadow-sm sm:grid-cols-2 sm:px-6" dir={dir}>
            <div>
              <div className="policy-meta-label text-xs font-semibold uppercase tracking-[0.16em]">
                {documentData.effective_date_label}
              </div>
              <div className="policy-meta-value mt-1 text-sm font-semibold">
                {documentData.effective_date}
              </div>
            </div>
            <div>
              <div className="policy-meta-label text-xs font-semibold uppercase tracking-[0.16em]">
                {documentData.last_updated_label}
              </div>
              <div className="policy-meta-value mt-1 text-sm font-semibold">
                {documentData.last_updated}
              </div>
            </div>
          </div>

          <div className="policy-divider mx-auto mt-8 max-w-screen-lg border-t pt-8 text-start" dir={dir}>
            {(documentData.document_sections || []).map((section, index) => (
              <article key={index} className="mb-10 px-1 last:mb-0 sm:px-4">
                <h2 className="policy-article-title mb-4 text-lg font-medium sm:text-xl">
                  {section.article_title}
                </h2>
                <div
                  className="policy-prose prose prose-slate max-w-none leading-8 dark:prose-invert prose-p:my-0 prose-ul:my-2 prose-ol:my-2 prose-li:my-1"
                  dangerouslySetInnerHTML={{ __html: section.body_html || '' }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  ReactDOM.render(<Div_main />, document.getElementById('div_main'));
}
