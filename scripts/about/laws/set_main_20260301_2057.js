function set_main() {
  const { useEffect, useMemo, useState } = React;

  /**
   * Dark-mode fallback styles for this page.
   * - Works with Tailwind's `dark` class as well as common `data-theme="dark"` patterns.
   * - Kept scoped under #div_main to avoid global side effects.
   */
  (function injectBylawsThemeFallback() {
    if (document.getElementById('statkiss-bylaws-fallback')) return;

    const style = document.createElement('style');
    style.id = 'statkiss-bylaws-fallback';
    style.textContent = `
      /* light */
      #div_main .bl-bg { background: #ffffff; }
      #div_main .bl-title { color: #0f172a; }
      #div_main .bl-sub { color: #64748b; }
      #div_main .bl-h { color: #0f172a; }
      #div_main .bl-p { color: #475569; }
      #div_main .bl-hr { border-color: rgba(226,232,240,1); }
      #div_main .bl-li { color: #475569; white-space: pre-line; }

      /* dark (support: html.dark, body.dark, data-theme) */
      html.dark #div_main .bl-bg,
      body.dark #div_main .bl-bg,
      html[data-theme="dark"] #div_main .bl-bg,
      body[data-theme="dark"] #div_main .bl-bg { background: transparent; }

      html.dark #div_main .bl-title,
      body.dark #div_main .bl-title,
      html[data-theme="dark"] #div_main .bl-title,
      body[data-theme="dark"] #div_main .bl-title { color: #ffffff; }

      html.dark #div_main .bl-sub,
      body.dark #div_main .bl-sub,
      html[data-theme="dark"] #div_main .bl-sub,
      body[data-theme="dark"] #div_main .bl-sub { color: #94a3b8; }

      html.dark #div_main .bl-h,
      body.dark #div_main .bl-h,
      html[data-theme="dark"] #div_main .bl-h,
      body[data-theme="dark"] #div_main .bl-h { color: #ffffff; }

      html.dark #div_main .bl-p,
      body.dark #div_main .bl-p,
      html[data-theme="dark"] #div_main .bl-p,
      body[data-theme="dark"] #div_main .bl-p { color: #e2e8f0; }

      html.dark #div_main .bl-hr,
      body.dark #div_main .bl-hr,
      html[data-theme="dark"] #div_main .bl-hr,
      body[data-theme="dark"] #div_main .bl-hr { border-color: rgba(51,65,85,0.75); }

      html.dark #div_main .bl-li,
      body.dark #div_main .bl-li,
      html[data-theme="dark"] #div_main .bl-li,
      body[data-theme="dark"] #div_main .bl-li { color: #e2e8f0; }
    `;
    document.head.appendChild(style);
  })();

  function getLangKey() {
    const H = window.StatKISS_I18N;
    return (H && H.LANG_KEY) ? H.LANG_KEY : 'statkiss_lang';
  }

  function resolveLang(raw) {
    const H = window.StatKISS_I18N;
    if (H && typeof H.resolveLangCode === 'function') return H.resolveLangCode(raw);

    const I = window.StatKISS_I18N_BYLAWS;
    if (I && typeof I.resolveLang === 'function') return I.resolveLang(raw);

    return raw || 'en';
  }

  function getLang() {
    const langKey = getLangKey();
    const saved = (() => {
      try { return localStorage.getItem(langKey); } catch (_) { return null; }
    })();
    const docLang = document.documentElement.getAttribute('lang') || '';
    const browser = (navigator.language || 'en');
    const raw = saved || docLang || browser;
    return resolveLang(raw);
  }

  function Div_main() {
    const [lang, setLang] = useState(getLang());
    const [i18nStamp, setI18nStamp] = useState(0);

    useEffect(() => {
      const applyLang = (raw) => setLang(resolveLang(raw || getLang()));

      const pickLangFromEvent = (e) => {
        if (!e) return null;
        const d = e.detail;
        if (!d) return null;
        if (typeof d === 'string') return d;
        return d.lang || d.language || d.value || d.code || d.newLang || null;
      };

      const onLang = (e) => applyLang(pickLangFromEvent(e));

      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);

      const onStorage = (e) => {
        if (!e) return;
        const k = getLangKey();
        if (e.key === k || e.key === 'statkiss_lang') applyLang(e.newValue);
      };
      window.addEventListener('storage', onStorage);

      const mo = new MutationObserver(() => applyLang(document.documentElement.getAttribute('lang') || null));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

      // If i18n script loads after this component, trigger a re-render once it becomes available.
      let tries = 0;
      const maxTries = 200; // ~10s @ 50ms
      const timer = setInterval(() => {
        tries += 1;
        const I = window.StatKISS_I18N_BYLAWS;
        if (I && typeof I.t === 'function') {
          clearInterval(timer);
          setI18nStamp((x) => x + 1);
        } else if (tries >= maxTries) {
          clearInterval(timer);
        }
      }, 50);

      const onI18n = () => setI18nStamp((x) => x + 1);
      window.addEventListener('statkiss:i18n', onI18n);
      window.addEventListener('statkiss:i18nReady', onI18n);

      return () => {
        window.removeEventListener('statkiss:lang', onLang);
        window.removeEventListener('statkiss:language', onLang);
        window.removeEventListener('statkiss:langChanged', onLang);
        window.removeEventListener('storage', onStorage);
        window.removeEventListener('statkiss:i18n', onI18n);
        window.removeEventListener('statkiss:i18nReady', onI18n);
        clearInterval(timer);
        mo.disconnect();
      };
    }, []);

    const t = useMemo(() => {
      return (key) => {
        const I = window.StatKISS_I18N_BYLAWS;
        if (!I || typeof I.t !== 'function') return key;
        return I.t(lang, key);
      };
    }, [lang, i18nStamp]);

    const articles = [
      { title: t('bylaws.a1.title'), blocks: [t('bylaws.a1.p1'), t('bylaws.a1.p2'), t('bylaws.a1.p3')] },
      { title: t('bylaws.a2.title'), blocks: [t('bylaws.a2.p1'), t('bylaws.a2.p2'), t('bylaws.a2.p3'), t('bylaws.a2.p4'), t('bylaws.a2.p5'), t('bylaws.a2.p6')] },
      { title: t('bylaws.a3.title'), blocks: [t('bylaws.a3.p1'), t('bylaws.a3.p2')] },
      { title: t('bylaws.a4.title'), blocks: [t('bylaws.a4.p1')] },
      { title: t('bylaws.a5.title'), blocks: [t('bylaws.a5.p1'), t('bylaws.a5.p2'), t('bylaws.a5.p3')] },
      { title: t('bylaws.a6.title'), blocks: [t('bylaws.a6.p1'), t('bylaws.a6.p2'), t('bylaws.a6.p3')] },
      { title: t('bylaws.a7.title'), blocks: [t('bylaws.a7.p1'), t('bylaws.a7.p2'), t('bylaws.a7.p3')] },
      { title: t('bylaws.a8.title'), blocks: [t('bylaws.a8.p1')] },
      { title: t('bylaws.a9.title'), blocks: [t('bylaws.a9.p1'), t('bylaws.a9.p2')] },
      { title: t('bylaws.a10.title'), blocks: [t('bylaws.a10.p1'), t('bylaws.a10.p2'), t('bylaws.a10.p3')] },
      { title: t('bylaws.a11.title'), blocks: [t('bylaws.a11.p1'), t('bylaws.a11.p2')] },
      { title: t('bylaws.a12.title'), blocks: [t('bylaws.a12.p1'), t('bylaws.a12.p2')] },
    ];

    return (
      <section className="bl-bg">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-lg text-center">
            <h2 className="bl-title mb-2 text-4xl tracking-tight font-extrabold">
              {t('bylaws.title')}
            </h2>
            <p className="bl-sub mb-8 lg:text-lg">
              {t('bylaws.subtitle')}
            </p>
          </div>

          <div className="flex flex-col pt-8 text-left border-t bl-hr">
            {articles.map((a, idx) => (
              <div key={idx} className="mb-2">
                <div className="mb-10 px-4">
                  <h3 className="bl-h mb-4 text-lg font-medium">{a.title}</h3>
                  <div className="space-y-4">
                    {a.blocks.map((b, i) => (
                      <div key={i} className="bl-li">{b}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  ReactDOM.render(<Div_main />, document.getElementById("div_main"));
}
