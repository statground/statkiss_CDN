function set_main() {
  const { useEffect, useMemo, useState } = React;

  (function injectBylawsThemeFallback(){
    if (document.getElementById('statkiss-bylaws-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-bylaws-fallback';
    style.textContent = `
      #div_main .bl-bg { background: #ffffff; }
      #div_main .bl-title { color: #0f172a; }
      #div_main .bl-sub { color: #64748b; }
      #div_main .bl-h { color: #0f172a; }
      #div_main .bl-p { color: #475569; }
      #div_main .bl-hr { border-color: rgba(226,232,240,1); }
      #div_main .bl-li { color: #475569; white-space: pre-line; }

      html.dark #div_main .bl-bg { background: transparent; }
      html.dark #div_main .bl-title { color: #ffffff; }
      html.dark #div_main .bl-sub { color: #94a3b8; }
      html.dark #div_main .bl-h { color: #ffffff; }
      html.dark #div_main .bl-p { color: #e2e8f0; }
      html.dark #div_main .bl-hr { border-color: rgba(51,65,85,0.75); }
      html.dark #div_main .bl-li { color: #e2e8f0; }
    `;
    document.head.appendChild(style);
  })();

  function getLang() {
    const H = window.StatKISS_I18N;
    const saved = (() => { try { return localStorage.getItem(H ? H.LANG_KEY : 'statkiss_lang'); } catch (_) { return null; } })();
    const docLang = document.documentElement.getAttribute('lang') || '';
    const browser = (navigator.language || 'en');
    const raw = saved || docLang || browser;
    if (H && typeof H.resolveLangCode === 'function') return H.resolveLangCode(raw);
    return raw || 'en';
  }

  function Article({ titleKey, blocks }) {
    return (
      <div className="mb-10 px-4">
        <h3 className="bl-h mb-4 text-lg font-medium">
          {titleKey}
        </h3>
        <div className="space-y-4">
          {blocks.map((b, i) => (
            <div key={i} className="bl-li">
              {b}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Div_main() {
    const I = window.StatKISS_I18N_BYLAWS;
    const [lang, setLang] = useState(getLang());

    useEffect(() => {
      const applyLang = (raw) => {
        const I = window.StatKISS_I18N_BYLAWS;
        const r = raw || getLang();
        const resolved = (I && typeof I.resolveLang === 'function') ? I.resolveLang(r) : r;
        setLang(resolved);
      };

      const onLang = (e) => applyLang(e && e.detail && e.detail.lang ? e.detail.lang : null);

      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);

      const onStorage = (e) => {
        if (!e) return;
        if (e.key === 'statkiss_lang') applyLang(e.newValue);
      };
      window.addEventListener('storage', onStorage);

      const mo = new MutationObserver(() => applyLang(document.documentElement.getAttribute('lang') || null));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

      return () => {
        window.removeEventListener('statkiss:lang', onLang);
        window.removeEventListener('statkiss:language', onLang);
        window.removeEventListener('statkiss:langChanged', onLang);
        window.removeEventListener('storage', onStorage);
        mo.disconnect();
      };
    }, []);

    const t = useMemo(() => {
      if (!I || typeof I.t !== 'function') return (k) => k;
      return (key) => I.t(lang, key);
    }, [I, lang]);

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
