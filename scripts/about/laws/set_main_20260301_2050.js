function set_main() {
  const { useEffect, useMemo, useState } = React;

  // ---------------------------------------------------------------------------
  // Theme (Light/Dark) fallback styles for By-Laws page
  // - Uses selectors compatible with Tailwind/Flowbite dark mode (html.dark)
  // - Also supports body.dark and data-theme="dark" (extra safety)
  // ---------------------------------------------------------------------------
  (function injectBylawsThemeFallback(){
    if (document.getElementById('statkiss-bylaws-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-bylaws-fallback';
    style.textContent = `
      /* Light */
      #div_main .bl-bg { background: #ffffff; }
      #div_main .bl-title { color: #0f172a; }
      #div_main .bl-sub { color: #64748b; }
      #div_main .bl-h { color: #0f172a; }
      #div_main .bl-p { color: #475569; }
      #div_main .bl-hr { border-color: rgba(226,232,240,1); }
      #div_main .bl-li { color: #475569; white-space: pre-line; }

      /* Dark (html.dark / body.dark / data-theme="dark") */
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

  // ---------------------------------------------------------------------------
  // Language helpers
  // ---------------------------------------------------------------------------
  function getLangKey() {
    const H = window.StatKISS_I18N || null;
    return (H && H.LANG_KEY) ? H.LANG_KEY : 'statkiss_lang';
  }

  function getLang() {
    const H = window.StatKISS_I18N || null;
    const LANG_KEY = getLangKey();

    const saved = (() => { try { return localStorage.getItem(LANG_KEY); } catch (_) { return null; } })();
    const docLang = document.documentElement.getAttribute('lang') || '';
    const browser = (navigator.language || 'en');
    const raw = saved || docLang || browser;

    if (H && typeof H.resolveLangCode === 'function') return H.resolveLangCode(raw);
    return raw || 'en';
  }

  function Div_main() {
    const [lang, setLang] = useState(getLang());

    // When the i18n dictionary is loaded after this component mounts,
    // we need a small "tick" to trigger a rerender so translations appear.
    const [i18nTick, setI18nTick] = useState(0);

    useEffect(() => {
      const bump = () => setI18nTick((x) => x + 1);

      // 1) If i18n script dispatches a ready event (we do in i18n_laws.js), react to it.
      window.addEventListener('statkiss:i18n:bylaws', bump);
      window.addEventListener('statkiss:i18n-by-laws', bump);

      // 2) Also keep a lightweight RAF loop until the dict exists (covers "no event" case).
      let raf = 0;
      const wait = () => {
        const I = window.StatKISS_I18N_BYLAWS;
        if (I && typeof I.t === 'function') {
          bump();
          return;
        }
        raf = requestAnimationFrame(wait);
      };
      wait();

      return () => {
        window.removeEventListener('statkiss:i18n:bylaws', bump);
        window.removeEventListener('statkiss:i18n-by-laws', bump);
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);

    useEffect(() => {
      const applyLang = (raw) => {
        const I = window.StatKISS_I18N_BYLAWS;
        const r = raw || getLang();
        const resolved = (I && typeof I.resolveLang === 'function') ? I.resolveLang(r) : r;
        setLang(resolved);
      };

      // Common StatKISS events (header language selector / etc.)
      const onLang = (e) => applyLang(
        (e && e.detail && (e.detail.lang || e.detail.language)) ? (e.detail.lang || e.detail.language) : null
      );

      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);
      window.addEventListener('statkiss:locale', onLang);

      // Storage sync (multi-tab / or header writes localStorage)
      const LANG_KEY = getLangKey();
      const onStorage = (e) => {
        if (!e) return;
        if (e.key === LANG_KEY) applyLang(e.newValue);
      };
      window.addEventListener('storage', onStorage);

      // If the template updates <html lang="...">, follow it.
      const mo = new MutationObserver(() => applyLang(document.documentElement.getAttribute('lang') || null));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

      return () => {
        window.removeEventListener('statkiss:lang', onLang);
        window.removeEventListener('statkiss:language', onLang);
        window.removeEventListener('statkiss:langChanged', onLang);
        window.removeEventListener('statkiss:locale', onLang);
        window.removeEventListener('storage', onStorage);
        mo.disconnect();
      };
    }, []);

    const t = useMemo(() => {
      const I = window.StatKISS_I18N_BYLAWS;
      if (!I || typeof I.t !== 'function') return (k) => k;
      return (key) => I.t(lang, key);
    }, [lang, i18nTick]);

    const articleDefs = useMemo(() => ([
      { titleKey: 'bylaws.a1.title', blockKeys: ['bylaws.a1.p1', 'bylaws.a1.p2', 'bylaws.a1.p3'] },
      { titleKey: 'bylaws.a2.title', blockKeys: ['bylaws.a2.p1', 'bylaws.a2.p2', 'bylaws.a2.p3', 'bylaws.a2.p4', 'bylaws.a2.p5', 'bylaws.a2.p6'] },
      { titleKey: 'bylaws.a3.title', blockKeys: ['bylaws.a3.p1', 'bylaws.a3.p2'] },
      { titleKey: 'bylaws.a4.title', blockKeys: ['bylaws.a4.p1'] },
      { titleKey: 'bylaws.a5.title', blockKeys: ['bylaws.a5.p1', 'bylaws.a5.p2', 'bylaws.a5.p3'] },
      { titleKey: 'bylaws.a6.title', blockKeys: ['bylaws.a6.p1', 'bylaws.a6.p2', 'bylaws.a6.p3'] },
      { titleKey: 'bylaws.a7.title', blockKeys: ['bylaws.a7.p1', 'bylaws.a7.p2', 'bylaws.a7.p3'] },
      { titleKey: 'bylaws.a8.title', blockKeys: ['bylaws.a8.p1'] },
      { titleKey: 'bylaws.a9.title', blockKeys: ['bylaws.a9.p1', 'bylaws.a9.p2'] },
      { titleKey: 'bylaws.a10.title', blockKeys: ['bylaws.a10.p1', 'bylaws.a10.p2', 'bylaws.a10.p3'] },
      { titleKey: 'bylaws.a11.title', blockKeys: ['bylaws.a11.p1', 'bylaws.a11.p2'] },
      { titleKey: 'bylaws.a12.title', blockKeys: ['bylaws.a12.p1', 'bylaws.a12.p2'] },
    ]), []);

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
            {articleDefs.map((a, idx) => (
              <div key={idx} className="mb-10 px-4">
                <h3 className="bl-h mb-4 text-lg font-medium">
                  {t(a.titleKey)}
                </h3>
                <div className="space-y-4">
                  {a.blockKeys.map((k, i) => (
                    <div key={i} className="bl-li">
                      {t(k)}
                    </div>
                  ))}
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
