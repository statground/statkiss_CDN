/**
 * set_main_fixed.js
 * Fixes:
 * 1) i18n: uses StatKISS_I18N_MAIN (not header i18n) so keys won't show.
 * 2) responsive: NO Tailwind breakpoint classes (no lg:, sm:) for layout logic.
 *    - Desktop (>=1024): bulletin + quick in ONE ROW (2 columns).
 *    - Mobile (<1024): bulletin then quick STACKED (column).
 *
 * Requirement:
 * - Load i18n_main_fixed.js BEFORE this file.
 * - React/ReactDOM already present.
 */
function set_main() {
  const ROOT_ID = "div_main";
  const DESKTOP_BP = 1024;

  // Dark mode fallback CSS for main (works even if Tailwind dark variants are not enabled)
  (function injectDarkFallback(){
    if (document.getElementById('statkiss-main-dark-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-main-dark-fallback';
    style.textContent = `
      html.dark body { background-color:#020617; color:#e2e8f0; }
      html.dark .kiss-main-bg { background-color:#020617; color:#e2e8f0; }
      html.dark .kiss-card { background-color:#0b1220 !important; border-color:rgba(148,163,184,0.14) !important; }
      html.dark .kiss-muted { color:#94a3b8 !important; }
      html.dark .kiss-border { border-color:rgba(148,163,184,0.14) !important; }
      html.dark .kiss-hover:hover { background-color:#111827 !important; }
      html.dark .kiss-chip { background-color:#111827 !important; color:#e2e8f0 !important; }
    
      html.dark .kiss-main-bg .bg-white { background-color:#0b1220 !important; }
      html.dark .kiss-main-bg .bg-slate-50 { background-color:#020617 !important; }
      html.dark .kiss-main-bg .text-slate-900,
      html.dark .kiss-main-bg .text-slate-800 { color:#e2e8f0 !important; }
      html.dark .kiss-main-bg .text-slate-700,
      html.dark .kiss-main-bg .text-slate-600,
      html.dark .kiss-main-bg .text-slate-500 { color:#cbd5e1 !important; }
      html.dark .kiss-main-bg .text-slate-400 { color:#94a3b8 !important; }
      html.dark .kiss-main-bg .border-slate-100,
      html.dark .kiss-main-bg .border-slate-200 { border-color:rgba(148,163,184,0.14) !important; }
      html.dark .kiss-main-bg .divide-slate-50 { border-color:rgba(148,163,184,0.14) !important; }
      html.dark .kiss-main-bg .bg-indigo-50 { background-color:#0f172a !important; }
      html.dark .kiss-main-bg .bg-slate-100 { background-color:#0f172a !important; }
      html.dark .kiss-main-bg .text-indigo-600 { color:#93c5fd !important; }
      \n      \n      
      html.dark .kiss-main-bg .bulletin-item.border { border: none !important; }
      html.dark .kiss-main-bg .shadow-xl,
      html.dark .kiss-main-bg .shadow-lg,
      html.dark .kiss-main-bg .shadow-md { box-shadow: 0 18px 44px rgba(0,0,0,.35) !important; }
    
      html.dark .kiss-main-bg .bg-slate-100.text-slate-500 { color:#cbd5e1 !important; }

      /* Bulletin container background fix (Tailwind class with slash) */
      html.dark .kiss-main-bg .bg-slate-50\/50 { background-color: rgba(255,255,255,0.03) !important; }
      html.dark .kiss-main-bg .bg-slate-50\/50 * { border-color: rgba(255,255,255,0.06) !important; }
      
      html.dark .kiss-main-bg .bulletin-item .bg-indigo-50 { background-color: rgba(59,130,246,0.16) !important; }
    
      /* Fix hover turning white on dark backgrounds */
      html.dark .kiss-main-bg .latest-item:hover { background-color: rgba(255,255,255,0.08) !important; }
      html.dark .kiss-main-bg .latest-item:hover * { color: inherit !important; }
      html.dark .kiss-main-bg .latest-item .text-indigo-600 { color:#93c5fd !important; }
    
      /* Unified dark card styling for Bulletin */
      html.dark .kiss-main-bg .bulletin-item {
        background-color: #0b1220 !important;
        border: 1px solid rgba(148,163,184,0.12) !important;
        box-shadow: none !important;
      }
      html.dark .kiss-main-bg .bulletin-item:hover {
        background-color: #111827 !important;
      }
      html.dark .kiss-main-bg .bulletin-item .text-slate-800,
      html.dark .kiss-main-bg .bulletin-item .text-slate-900 {
        color: #e2e8f0 !important;
      }
      html.dark .kiss-main-bg .bulletin-item .text-slate-500,
      html.dark .kiss-main-bg .bulletin-item .text-slate-400 {
        color: #94a3b8 !important;
      }
    `;
    document.head.appendChild(style);
  })();


  function I18N() { return window.StatKISS_I18N_MAIN || null; }
  function getLang() { const I = I18N(); return I ? I.init() : "en"; }
  function t(lang, key) { const I = I18N(); return I ? I.t(lang, key) : key; }

  function useViewportWidth() {
    const [w, setW] = React.useState(() => (typeof window !== "undefined" ? window.innerWidth : 0));
    React.useEffect(() => {
      let raf = 0;
      const onResize = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setW(window.innerWidth));
      };
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("orientationchange", onResize, { passive: true });
      onResize();
      return () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
      };
    }, []);
    return w;
  }

  async function fetchJson(url) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      console.warn("[KISS Main] Fetch failed:", url, e);
      return null;
    }
  }

  function normalizeList(maybeList) {
    if (!maybeList) return [];
    const list = Array.isArray(maybeList) ? maybeList : Object.values(maybeList);
    return list.filter(Boolean).sort((a,b) => new Date(b.created_at_kst||b.created_at) - new Date(a.created_at_kst||a.created_at));
  }

  function articleHref(item) {
    if (!item || !item.url || !item.uuid) return "#";
    return `/announcement/${item.url}/read/${item.uuid}/`;
  }

  function stripHtml(str) {
    if (!str) return "";
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    const decoded = txt.value || "";
    return decoded.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }

  function fmtDate(v, lang) {
    if (!v) return "";
    const ts = Number(v);
    if (!isNaN(ts) && ts > 0) {
      const d = new Date(ts);
      const locale =
        lang === "ko" ? "ko-KR" :
        lang === "ja" ? "ja-JP" :
        lang === "zh-Hans" ? "zh-CN" :
        lang === "zh-Hant" ? "zh-TW" :
        "en-US";
      return d.toLocaleDateString(locale, { day:"numeric", month:"long", year:"numeric" });
    }
    return v;
  }

  function HeroNewsItem({ item, lang, isDesktop }) {
    return (
      <a
        href={articleHref(item)}
        className={"latest-item group flex justify-between gap-4 py-3 px-2 rounded-lg transition hover:bg-slate-50 dark:hover:bg-white/10 " + (isDesktop ? "flex-row items-start" : "flex-col")}
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-indigo-500">
            {item.category || item.type || "News"}
          </div>
          <div className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors dark:text-slate-100">
            {item.title}
          </div>
        </div>
        <div className={(isDesktop ? "text-right" : "text-left") + " text-[11px] text-slate-400 whitespace-nowrap mt-1"}>
          {fmtDate(item.created_at_kst || item.date, lang)}
        </div>
      </a>
    );
  }

  function HeroSection({ articleData, loading, lang, isDesktop }) {
    const all = normalizeList(articleData?.all);
    if (loading || all.length === 0) return null;

    const main = all[0];
    const side = all.slice(1, 4);
    const desc = stripHtml(main.content || "") || t(lang, "main.news_default_desc");

    return (
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-6">
        <div className="kiss-card rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 dark:bg-slate-900">
          {isDesktop ? (
            <div className="grid" style={{ gridTemplateColumns:"1.8fr 1fr", gap:"2.5rem" }}>
              <div className="flex flex-col justify-between border-r border-slate-100 pr-10 dark:border-slate-800">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{t(lang,"main.latest_news")}</span>
                  </div>

                  <a href={articleHref(main)} className="group block">
                    <div className="mb-3 inline-block rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                      {main.category || "News"}
                    </div>
                    <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 group-hover:text-indigo-700 dark:text-slate-100">
                      {main.title}
                    </h1>
                    <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-4 dark:text-slate-300">
                      {desc}
                    </p>
                  </a>
                </div>

                <div className="flex items-center justify-between gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full dark:bg-slate-800 dark:text-slate-200">
                    📅 {fmtDate(main.created_at_kst || main.created_at, lang)}
                  </span>
                  <a href={articleHref(main)} className="text-indigo-600 hover:text-indigo-800 hover:underline">
                    {t(lang,"main.read_more")}
                  </a>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-4 flex items-center justify-between pb-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{t(lang,"main.more_latest")}</span>
                </div>
                <div className="flex flex-col divide-y divide-slate-50 dark:divide-slate-800">
                  {side.map((item) => (<HeroNewsItem key={item.uuid} item={item} lang={lang} isDesktop={true} />))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{t(lang,"main.latest_news")}</span>
                </div>

                <a href={articleHref(main)} className="group block">
                  <div className="mb-3 inline-block rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                    {main.category || "News"}
                  </div>
                  <h1 className="mb-4 text-2xl font-bold leading-tight text-slate-900 group-hover:text-indigo-700 dark:text-slate-100">
                    {main.title}
                  </h1>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-4 dark:text-slate-300">
                    {desc}
                  </p>
                </a>

                <div className="flex items-center justify-between gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full dark:bg-slate-800 dark:text-slate-200">
                    📅 {fmtDate(main.created_at_kst || main.created_at, lang)}
                  </span>
                  <a href={articleHref(main)} className="text-indigo-600 hover:text-indigo-800 hover:underline">
                    {t(lang,"main.read_more")}
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="mb-3 text-xs font-bold text-slate-900 dark:text-slate-100">{t(lang,"main.more_latest")}</div>
                <div className="flex flex-col divide-y divide-slate-50 dark:divide-slate-800">
                  {side.map((item) => (<HeroNewsItem key={item.uuid} item={item} lang={lang} isDesktop={false} />))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  function BulletinSection({ loading, articleData, lang }) {
    const tabs = [
      { key:"event", label:t(lang,"main.tab.event"), icon:"📅", list: normalizeList(articleData.event) },
      { key:"ads", label:t(lang,"main.tab.ads"), icon:"📢", list: normalizeList(articleData.ads) },
      { key:"member", label:t(lang,"main.tab.member"), icon:"👥", list: normalizeList(articleData.member) },
      { key:"jobs", label:t(lang,"main.tab.jobs"), icon:"💼", list: normalizeList(articleData.jobs) },
    ];
    const [active, setActive] = React.useState("event");
    const cur = tabs.find(x=>x.key===active) || tabs[0];

    return (
      <section className="kiss-card flex flex-col rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 dark:bg-slate-900">
        <div className="mb-5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">{t(lang,"main.bulletin_title")}</h2>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-300">{t(lang,"main.bulletin_desc")}</p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map(tab => {
            const isActive = tab.key === active;
            return (
              <button key={tab.key} type="button" onClick={() => setActive(tab.key)}
                className={"inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold transition-all " + (
                  isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                           : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                )}>
                <span>{tab.icon}</span><span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3 bg-slate-50/50 p-1 rounded-xl dark:bg-slate-950/40">
          {loading ? (
            <div className="p-4 text-center text-xs text-slate-400">{t(lang,"main.loading")}</div>
          ) : cur.list.length === 0 ? (
            <div className="p-8 text-center text-[11px] text-slate-400">{t(lang,"main.no_posts")}</div>
          ) : (
            cur.list.slice(0,5).map(item => (
              <a key={item.uuid} href={articleHref(item)}
                className="bulletin-item block rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:bg-slate-900 dark:border-slate-800">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600">{item.category || cur.label}</span>
                  <span className="text-[10px] text-slate-400">{fmtDate(item.created_at_kst || item.date, lang)}</span>
                </div>
                <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{item.title}</div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-300 line-clamp-1">{stripHtml(item.content || "")}</div>
              </a>
            ))
          )}
        </div>
      </section>
    );
  }

  function QuickAccessSection({ memberCount, loadingMember, lang }) {
    const items = [
      { icon:"📘", label:t(lang,"main.qa.journal"), desc:t(lang,"main.qa.journal_desc"), url:"/pubs/journals/" },
      { icon:"🏆", label:t(lang,"main.qa.awards"), desc:t(lang,"main.qa.awards_desc"), url:"/awards/career/" },
      { icon:"📨", label:t(lang,"main.qa.newsletter"), desc:t(lang,"main.qa.newsletter_desc"), url:"/pubs/newsletter/" },
      { icon:"📣", label:t(lang,"main.qa.kiss_news"), desc:t(lang,"main.qa.kiss_news_desc"), url:"/announcement/event/" },
      { icon:"👤", label:t(lang,"main.qa.membership"), desc:t(lang,"main.qa.membership_desc"), url:"/membership/" },
      { icon:"💝", label:t(lang,"main.qa.donation"), desc:t(lang,"main.qa.donation_desc"), url:"/membership/donations/" },
    ];

    return (
      <section className="flex flex-col gap-6">
        <div className="kiss-card rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 dark:bg-slate-900">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">{t(lang,"main.quick_title")}</h2>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-300">{t(lang,"main.quick_desc")}</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {items.map(it => (
              <button key={it.label} type="button" onClick={() => it.url && (location.href = it.url)}
                className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50 hover:shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg group-hover:bg-white dark:bg-slate-800 dark:group-hover:bg-slate-700">{it.icon}</div>
                <div>
                  <div className="text-[12px] font-bold text-slate-800 group-hover:text-indigo-700 dark:text-slate-100">{it.label}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 dark:text-slate-300">{it.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-500/30">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>

          <div className="relative z-10 flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <span className="text-2xl leading-none">👥</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">{t(lang,"main.total_members")}</span>
              <span className="text-[11px] text-white/90/80">{t(lang,"main.total_members_desc")}</span>
            </div>
          </div>

          <div className="relative z-10 mt-1 text-4xl font-extrabold tracking-tight text-right">
            {loadingMember ? "..." : String(memberCount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
      </section>
    );
  }

  function SponsorsSection({ banners, loadingBanners, lang }) {
    return (
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl shadow-slate-900/20">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px w-8 bg-indigo-500"></div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">{t(lang,"main.sponsors")}</div>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {loadingBanners ? (
              <div className="text-[11px] text-slate-500">{t(lang,"main.loading_banners")}</div>
            ) : banners.length === 0 ? (
              <div className="text-[11px] text-slate-500">{t(lang,"main.no_banners")}</div>
            ) : (
              banners.map((b, idx) => (
                <button key={idx} type="button" onClick={() => window.open(b.url, "_blank")}
                  className="h-16 w-48 flex-none rounded-lg bg-slate-800 bg-cover bg-center shadow-lg transition-all hover:scale-105 hover:opacity-100 opacity-80 border border-slate-700"
                  style={{ backgroundImage: `url(${b.url_banner})` }} />
              ))
            )}
          </div>
        </div>
      </section>
    );
  }

  function KissMainLayout() {
    const vw = useViewportWidth();
    const isDesktop = vw >= DESKTOP_BP;

    const [lang, setLang] = React.useState(getLang());

    const [loadingArticles, setLoadingArticles] = React.useState(true);
    const [loadingMember, setLoadingMember] = React.useState(true);
    const [loadingBanners, setLoadingBanners] = React.useState(true);

    const [articleData, setArticleData] = React.useState({});
    const [memberCount, setMemberCount] = React.useState(0);
    const [banners, setBanners] = React.useState([]);

    React.useEffect(() => {
      function onLang(e) { setLang(e?.detail?.lang || getLang()); }
      window.addEventListener("statkiss:lang", onLang);
      return () => window.removeEventListener("statkiss:lang", onLang);
    }, []);

    React.useEffect(() => {
      let alive = true;
      (async () => {
        const [art, mem, ban] = await Promise.all([
          fetchJson("/ajax_get_article_list/"),
          fetchJson("/ajax_get_member_count/"),
          fetchJson("/ajax_get_footer_banner_list/"),
        ]);
        if (!alive) return;

        setArticleData(art || {});
        setLoadingArticles(false);

        if (mem && typeof mem.CNT === "number") setMemberCount(mem.CNT);
        setLoadingMember(false);

        if (ban) {
          const list = Array.isArray(ban) ? ban : Object.values(ban);
          setBanners(list.map(x => ({ url: x.url, url_banner: x.url_banner })));
        }
        setLoadingBanners(false);
      })();
      return () => { alive = false; };
    }, []);

    return (
      <div className="kiss-main-bg bg-slate-50 min-h-screen font-sans text-slate-900 pb-10 dark:bg-slate-950 dark:text-slate-100">
        <HeroSection articleData={articleData} loading={loadingArticles} lang={lang} isDesktop={isDesktop} />

        <section className="mx-auto max-w-6xl px-6 pb-8">
          {isDesktop ? (
            <div className="grid" style={{ gridTemplateColumns:"2.2fr 1.1fr", gap:"1.5rem" }}>
              <BulletinSection loading={loadingArticles} articleData={articleData} lang={lang} />
              <QuickAccessSection memberCount={memberCount} loadingMember={loadingMember} lang={lang} />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <BulletinSection loading={loadingArticles} articleData={articleData} lang={lang} />
              <QuickAccessSection memberCount={memberCount} loadingMember={loadingMember} lang={lang} />
            </div>
          )}
        </section>

        <SponsorsSection banners={banners} loadingBanners={loadingBanners} lang={lang} />
      </div>
    );
  }

  const rootEl = document.getElementById(ROOT_ID);
  if (!rootEl) return;

  if (window.ReactDOM && ReactDOM.createRoot) ReactDOM.createRoot(rootEl).render(<KissMainLayout />);
  else if (window.ReactDOM && ReactDOM.render) ReactDOM.render(<KissMainLayout />, rootEl);
}
