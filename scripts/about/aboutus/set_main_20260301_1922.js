
function set_main() {
  const { useEffect, useMemo, useState } = React;

  (function injectAboutThemeFallback(){
    if (document.getElementById('statkiss-about-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-about-fallback';
    style.textContent = `
      #div_main .about-title { color: #0f172a; }
      #div_main .about-muted { color: #64748b; }
      #div_main .about-body { color: #334155; }
      #div_main .about-strong { color: #0f172a; }
      #div_main .about-card { background: #ffffff; border-color: rgba(226,232,240,1); }
      #div_main .about-li svg { color: #10b981; }

      html.dark #div_main .about-title { color: #ffffff; }
      html.dark #div_main .about-muted { color: #94a3b8; }
      html.dark #div_main .about-body { color: #e2e8f0; }
      html.dark #div_main .about-strong { color: #ffffff; }
      html.dark #div_main .about-card { background: rgba(2,6,23,0.55); border-color: rgba(51,65,85,0.75); }
      html.dark #div_main .about-li svg { color: #34d399; }
      html.dark #div_main .about-list { color: #e2e8f0; }
    `;
    document.head.appendChild(style);
  })();

  function getLang() {
    const saved = (() => { try { return localStorage.getItem('statkiss_lang'); } catch (_) { return null; } })();
    const browser = (navigator.language || 'en');
    return saved || browser;
  }

  function Div_main() {
    const I = window.StatKISS_I18N_ABOUT;
    const [lang, setLang] = useState(getLang());

    useEffect(() => {
      const onLang = (e) => {
        const v = e && e.detail && e.detail.lang ? e.detail.lang : getLang();
        setLang(v);
      };
      window.addEventListener('statkiss:lang', onLang);
      return () => window.removeEventListener('statkiss:lang', onLang);
    }, []);

    const t = useMemo(() => {
      if (!I || typeof I.t !== 'function') return (k) => k;
      return (key) => I.t(lang, key);
    }, [I, lang]);

    function Div_header(props) {
      return (
        <h1 className="about-title mb-6 max-w-2xl text-2xl font-extrabold tracking-tight leading-none">
          {props.text}
        </h1>
      );
    }

    function Div_li_start(props) {
      return (
        <li className="about-li flex items-start">
          <svg className="w-3.5 h-3.5 mt-1 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <span className="about-body">{props.text}</span>
        </li>
      );
    }

    return (
      <div className="flex flex-col justify-center items-center w-full pt-12 pb-12 space-y-16">

        <div className="flex flex-col space-y-6 w-full max-w-screen-xl px-4 mx-auto">
          {/* ✅ FIX: w-full so card width never shrinks by content length */}
          <div className="about-card w-full rounded-2xl border p-6 md:p-8">
            <Div_header text={t('about.title')} />

            <p className="about-muted font-light md:text-lg lg:text-xl">
              {t('about.intro')}
            </p>

            <ul className="about-list list-inside space-y-2 mt-6">
              <Div_li_start text={t('about.obj.1')} />
              <Div_li_start text={t('about.obj.2')} />
              <Div_li_start text={t('about.obj.3')} />
              <Div_li_start text={t('about.obj.4')} />
              <Div_li_start text={t('about.obj.5')} />
              <Div_li_start text={t('about.obj.6')} />
            </ul>

            <p className="about-muted mt-6">
              {t('about.note')}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-6 w-full max-w-screen-xl px-4 mx-auto">
          {/* ✅ FIX: w-full so card width never shrinks by content length */}
          <div className="about-card w-full rounded-2xl border p-6 md:p-8">
            <Div_header text={t('about.join.title')} />

            <ol className="about-list space-y-6 list-decimal list-inside">
              <li>
                <span className="about-strong font-semibold">
                  {t('about.join.1.title')}
                </span>
                <ul className="pl-5 mt-4 space-y-2 list-disc list-inside">
                  <li className="about-body">{t('about.join.1.b1')}</li>
                  <li className="about-body">{t('about.join.1.b2')}</li>
                  <li className="about-body">{t('about.join.1.b3')}</li>
                  <li className="about-body">{t('about.join.1.b4')}</li>
                  <li className="about-body">{t('about.join.1.b5')}</li>
                </ul>
              </li>

              <li>
                <span className="about-strong font-semibold">
                  {t('about.join.2.title')}
                </span>
                <ul className="pl-5 mt-4 space-y-2 list-disc list-inside">
                  <li className="about-body">{t('about.join.2.b1')}</li>
                  <li className="about-body">{t('about.join.2.b2')}</li>
                  <li className="about-body">{t('about.join.2.b3')}</li>
                </ul>
              </li>

              <li>
                <span className="about-strong font-semibold">
                  {t('about.join.3.title')}
                </span>
                <ul className="pl-5 mt-4 space-y-2 list-disc list-inside">
                  <li className="about-body">{t('about.join.3.b1')}</li>
                  <li className="about-body">{t('about.join.3.b2')}</li>
                  <li className="about-body">{t('about.join.3.b3')}</li>
                  <li className="about-body">{t('about.join.3.b4')}</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

      </div>
    );
  }

  ReactDOM.render(<Div_main />, document.getElementById("div_main"));
}
