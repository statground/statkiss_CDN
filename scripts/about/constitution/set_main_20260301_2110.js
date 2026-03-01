function set_main() {
  const { useEffect, useMemo, useState } = React;

  (function injectConstitutionThemeFallback(){
    if (document.getElementById('statkiss-constitution-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-constitution-fallback';
    style.textContent = `
      #div_main .cst-transition { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
      
      #div_main .cst-bg { background: #ffffff; }
      #div_main .cst-title { color: #0f172a; }
      #div_main .cst-sub { color: #64748b; }
      #div_main .cst-h { color: #0f172a; }
      #div_main .cst-p { color: #475569; white-space: pre-line; }
      #div_main .cst-hr { border-color: rgba(226,232,240,1); }
      #div_main .cst-li { color: #475569; white-space: pre-line; }

      html.dark #div_main .cst-bg, body.dark #div_main .cst-bg { background: transparent; }
      html.dark #div_main .cst-title, body.dark #div_main .cst-title { color: #ffffff; }
      html.dark #div_main .cst-sub, body.dark #div_main .cst-sub { color: #94a3b8; }
      html.dark #div_main .cst-h, body.dark #div_main .cst-h { color: #ffffff; }
      html.dark #div_main .cst-p, body.dark #div_main .cst-p { color: #e2e8f0; }
      html.dark #div_main .cst-hr, body.dark #div_main .cst-hr { border-color: rgba(51,65,85,0.75); }
      html.dark #div_main .cst-li, body.dark #div_main .cst-li { color: #e2e8f0; }
    `;
    document.head.appendChild(style);
  })();

  function getLangKey() {
    const H = window.StatKISS_I18N;
    return (H && H.LANG_KEY) ? H.LANG_KEY : 'statkiss_lang';
  }

  function resolveLangCode(raw) {
    const H = window.StatKISS_I18N;
    if (H && typeof H.resolveLangCode === 'function') return H.resolveLangCode(raw);
    return raw || 'en';
  }

  function getLang() {
    const key = getLangKey();
    const saved = (() => {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    })();
    const docLang = document.documentElement.getAttribute('lang') || '';
    const browser = (navigator.language || 'en');
    const raw = saved || docLang || browser;
    return resolveLangCode(raw);
  }

  function Div_main() {
    const [lang, setLang] = useState(getLang());
    const [i18nTick, setI18nTick] = useState(0);

    useEffect(() => {
      if (window.StatKISS_I18N_CONSTITUTION) return;
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (window.StatKISS_I18N_CONSTITUTION || tries >= 60) {
          clearInterval(timer);
          setI18nTick(x => x + 1);
        }
      }, 50);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      const applyLang = (raw) => {
        const I = window.StatKISS_I18N_CONSTITUTION;
        const r = raw || getLang();
        const resolved = (I && typeof I.resolveLang === 'function')
          ? I.resolveLang(r)
          : resolveLangCode(r);
        setLang(resolved);
      };

      const onLang = (e) => applyLang(e && e.detail && e.detail.lang ? e.detail.lang : null);

      window.addEventListener('statkiss:lang', onLang);
      window.addEventListener('statkiss:language', onLang);
      window.addEventListener('statkiss:langChanged', onLang);

      const onStorage = (e) => {
        if (!e) return;
        if (e.key === getLangKey()) applyLang(e.newValue);
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
      const I = window.StatKISS_I18N_CONSTITUTION;
      if (!I || typeof I.t !== 'function') return (k) => k;
      return (key) => I.t(lang, key);
    }, [lang, i18nTick]);

    const bullets = [
      t('constitution.article2.li1'),
      t('constitution.article2.li2'),
      t('constitution.article2.li3'),
      t('constitution.article2.li4'),
      t('constitution.article2.li5'),
      t('constitution.article2.li6'),
    ];

    function Article({ titleKey, paragraphs, children }) {
      return (
        <div className="mb-10 px-4">
          <h3 className="cst-h cst-transition mb-4 text-lg font-medium">
            {t(titleKey)}
          </h3>
          <div className="space-y-4">
            {paragraphs && paragraphs.map((k, idx) => (
              <p key={idx} className="cst-p cst-transition text-md">
                {t(k)}
              </p>
            ))}
            {children}
          </div>
        </div>
      );
    }

    return (
      <section className="cst-bg cst-transition">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-lg text-center">
            <h2 className="cst-title cst-transition mb-2 text-4xl tracking-tight font-extrabold">
              {t('constitution.title')}
            </h2>
            <p className="cst-sub cst-transition mb-8 lg:text-lg">
              {t('constitution.subtitle')}
            </p>
          </div>

          <div className="flex flex-col pt-8 text-left border-t cst-hr cst-transition">
            <Article titleKey="constitution.article1.title" paragraphs={["constitution.article1.p1"]} />

            <Article titleKey="constitution.article2.title" paragraphs={["constitution.article2.p1"]}>
              <ul className="space-y-1 list-disc list-inside">
                {bullets.map((b, i) => (
                  <li key={i} className="cst-li cst-transition">
                    {b}
                  </li>
                ))}
              </ul>
              <p className="cst-p cst-transition text-md mt-4">
                {t('constitution.article2.p2')}
              </p>
            </Article>

            <Article titleKey="constitution.article3.title" paragraphs={["constitution.article3.p1"]} />
            <Article titleKey="constitution.article4.title" paragraphs={["constitution.article4.p1","constitution.article4.p2","constitution.article4.p3"]} />
            <Article titleKey="constitution.article5.title" paragraphs={["constitution.article5.p1"]} />
            <Article titleKey="constitution.article6.title" paragraphs={["constitution.article6.p1"]} />
            <Article titleKey="constitution.article7.title" paragraphs={["constitution.article7.p1"]} />
            <Article titleKey="constitution.article8.title" paragraphs={["constitution.article8.p1","constitution.article8.p2","constitution.article8.p3","constitution.article8.p4"]} />
            <Article titleKey="constitution.article9.title" paragraphs={["constitution.article9.p1"]} />
            <Article titleKey="constitution.article10.title" paragraphs={["constitution.article10.p1"]} />
            <Article titleKey="constitution.article11.title" paragraphs={["constitution.article11.p1"]} />
            <Article titleKey="constitution.article12.title" paragraphs={["constitution.article12.p1"]} />
          </div>
        </div>
      </section>
    );
  }

  ReactDOM.render(<Div_main />, document.getElementById("div_main"));
}