(function () {
  'use strict';

  const ROLE_ORDER_FALLBACK = {
    'President': 10,
    'President-elect': 20,
    'President-past': 30,
    'Executive Director': 40,
    'General Director': 50,
    'Financial Director': 60,
    'Communications Director': 70,
    'co-Communications Director': 71,
    'Membership Director': 80,
    'Membership Co-Director': 81,
    'Student representative': 90,
    'Board of Directors': 200,
    'Incoming Board Member': 300,
  };

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function resolveLang(lang) {
    const I = getI18N();
    if (I && typeof I.resolveLangCode === 'function') return I.resolveLangCode(lang || 'en');
    return lang || 'en';
  }

  function getCurrentLang() {
    const I = getI18N();
    try {
      if (I && I.LANG_KEY) {
        const saved = localStorage.getItem(I.LANG_KEY);
        if (saved) return resolveLang(saved);
      }
    } catch (_) {}

    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    const supported = (I && Array.isArray(I.languages)) ? I.languages.map((v) => v.code) : [];
    if (parts.length && supported.includes(parts[0])) return parts[0];

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang) return resolveLang(htmlLang);
    return 'en';
  }

  function getCurrentTheme() {
    try {
      const saved = localStorage.getItem('statkiss_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  function pageText(lang, key) {
    const I = getI18N();
    if (I && typeof I.t === 'function') return I.t(lang, key);
    return key;
  }

  function translateRole(lang, role) {
    if (window.StatKISS_Officers && typeof window.StatKISS_Officers.translateRole === 'function') {
      return window.StatKISS_Officers.translateRole(lang, role);
    }
    return role;
  }

  function injectOfficersDarkFallbackCSS() {
    if (document.getElementById('statkiss-officers-dark-fallback')) return;

    const style = document.createElement('style');
    style.id = 'statkiss-officers-dark-fallback';
    style.textContent = `
      html.dark .statkiss-officers-page { color: #e2e8f0; }
      html.dark .statkiss-officers-title { color: #f8fafc !important; }
      html.dark .statkiss-officers-subtitle { color: #cbd5e1 !important; }
      html.dark .statkiss-officers-section-title { color: #f8fafc !important; }
      html.dark .statkiss-officers-card,
      html.dark .statkiss-officers-board-card,
      html.dark .statkiss-officers-incoming-card,
      html.dark .statkiss-officers-error,
      html.dark .statkiss-officers-empty {
        background: #0b1220 !important;
        border-color: #1f2937 !important;
        color: #e2e8f0 !important;
      }
      html.dark .statkiss-officers-card:hover,
      html.dark .statkiss-officers-board-card:hover,
      html.dark .statkiss-officers-incoming-card:hover {
        border-color: #334155 !important;
      }
      html.dark .statkiss-officers-badge {
        background: rgba(148, 163, 184, 0.16) !important;
        color: #cbd5e1 !important;
      }
      html.dark .statkiss-officers-badge--highlight {
        background: rgba(56, 189, 248, 0.16) !important;
        color: #bae6fd !important;
      }
      html.dark .statkiss-officers-muted { color: #94a3b8 !important; }
      html.dark .statkiss-officers-divider { border-color: #1f2937 !important; }
      html.dark .statkiss-officers-board-dot { background: #38bdf8 !important; }
      html.dark .statkiss-officers-incoming {
        background: rgba(16, 185, 129, 0.10) !important;
        border-color: rgba(16, 185, 129, 0.18) !important;
      }
      html.dark .statkiss-officers-incoming-eyebrow { color: #6ee7b7 !important; }
      html.dark .statkiss-officers-incoming-title { color: #ecfdf5 !important; }
      html.dark .statkiss-officers-incoming-meta { color: #a7f3d0 !important; }
      html.dark .statkiss-officers-list-icon { color: #34d399 !important; }
      html.dark .statkiss-officers-retry {
        background: rgba(56, 189, 248, 0.16) !important;
        color: #e0f2fe !important;
        border-color: rgba(56, 189, 248, 0.35) !important;
      }
      html.dark .statkiss-officers-retry:hover {
        background: rgba(56, 189, 248, 0.24) !important;
      }
      html.dark .statkiss-officers-skeleton {
        background: #0b1220 !important;
        border-color: #1f2937 !important;
      }
      html.dark .statkiss-officers-skeleton-bar { background: #1f2937 !important; }
    `;
    document.head.appendChild(style);
  }

  function unique(list) {
    return Array.from(new Set(list.filter(Boolean)));
  }

  function buildAjaxUrls() {
    const lang = getCurrentLang();
    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    const I = getI18N();
    const supported = (I && Array.isArray(I.languages)) ? I.languages.map((v) => v.code) : [];

    const urls = [];
    if (parts.length && supported.includes(parts[0])) {
      urls.push(`/${lang}/about/ajax_get_officer_list/`);
    }
    urls.push('/about/ajax_get_officer_list/');

    return unique(urls);
  }

  async function fetchJsonWithFallback(urls) {
    let lastError = null;

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          credentials: 'same-origin',
          cache: 'no-store',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} for ${url}`);
        }

        return await response.json();
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Unable to fetch officers list');
  }

  function normalizeString(value) {
    return value == null ? '' : String(value).trim();
  }

  function safeNumber(value, fallbackValue) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallbackValue;
  }

  function compareByName(a, b) {
    return normalizeString(a.name).localeCompare(normalizeString(b.name), undefined, { sensitivity: 'base' });
  }

  function termSortKey(term) {
    const raw = normalizeString(term);
    if (!raw) return -1;

    const yearMatches = raw.match(/\d{4}/g);
    if (yearMatches && yearMatches.length) {
      const years = yearMatches.map((v) => Number(v));
      const maxYear = Math.max.apply(null, years);
      const minYear = Math.min.apply(null, years);
      return (maxYear * 10000) + minYear;
    }

    const parsed = Date.parse(raw);
    if (!Number.isNaN(parsed)) return Math.floor(parsed / 86400000);

    return raw.toLowerCase();
  }

  function compareTermsDesc(a, b) {
    const keyA = termSortKey(a);
    const keyB = termSortKey(b);

    if (typeof keyA === 'number' && typeof keyB === 'number') return keyB - keyA;
    return String(keyB).localeCompare(String(keyA), undefined, { numeric: true, sensitivity: 'base' });
  }

  function normalizePayload(raw) {
    const list = Array.isArray(raw) ? raw : Object.values(raw || {});
    const normalized = list
      .filter(Boolean)
      .map((item) => {
        const role = normalizeString(item.role);
        return {
          uuid: normalizeString(item.uuid),
          name: normalizeString(item.name),
          affiliation: normalizeString(item.affiliation),
          email: normalizeString(item.email),
          role,
          term: normalizeString(item.term),
          role_order: safeNumber(item.role_order, ROLE_ORDER_FALLBACK[role] || 999),
        };
      })
      .filter((item) => item.role && item.term && item.name);

    const current = normalized
      .filter((item) => item.role !== 'Board of Directors' && item.role !== 'Incoming Board Member')
      .sort((a, b) => {
        if (a.role_order !== b.role_order) return a.role_order - b.role_order;
        return compareByName(a, b);
      });

    const incoming = normalized
      .filter((item) => item.role === 'Incoming Board Member')
      .sort(compareByName);

    const boardRows = normalized
      .filter((item) => item.role === 'Board of Directors')
      .sort((a, b) => {
        const termCmp = compareTermsDesc(a.term, b.term);
        if (termCmp !== 0) return termCmp;
        return compareByName(a, b);
      });

    const boardOfDirectors = {};
    boardRows.forEach((item) => {
      if (!boardOfDirectors[item.term]) boardOfDirectors[item.term] = [];
      boardOfDirectors[item.term].push(item);
    });

    return {
      current,
      incoming,
      boardOfDirectors,
      boardTerms: Object.keys(boardOfDirectors).sort(compareTermsDesc),
    };
  }

  async function get_officer_list() {
    const raw = await fetchJsonWithFallback(buildAjaxUrls());
    return normalizePayload(raw);
  }

  function SectionHeader({ title, subtitle }) {
    return (
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
        <h2 className="statkiss-officers-title mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="statkiss-officers-subtitle font-light text-gray-500 dark:text-slate-300 sm:text-xl">
          {subtitle}
        </p>
      </div>
    );
  }

  function CurrentOfficers({ data, lang }) {
    if (!data || data.length === 0) return null;

    return (
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.map((person) => {
            const isHighlight = ['President', 'President-elect', 'President-past'].includes(person.role);
            return (
              <article
                key={`${person.uuid || person.name}-${person.role}`}
                className={
                  'statkiss-officers-card relative flex flex-col items-start p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border w-full transition ' +
                  (isHighlight
                    ? 'border-sky-300 dark:border-sky-700 shadow-md'
                    : 'border-gray-100 dark:border-slate-700 hover:border-sky-200 dark:hover:border-slate-500 hover:shadow-md')
                }
              >
                <span
                  className={
                    'statkiss-officers-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-3 ' +
                    (isHighlight
                      ? 'statkiss-officers-badge--highlight bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-200'
                      : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-200')
                  }
                >
                  {translateRole(lang, person.role)}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{person.name}</h3>
                {person.affiliation ? (
                  <p className="statkiss-officers-muted text-sm text-gray-500 dark:text-slate-400 leading-snug">
                    {person.affiliation}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  function BoardOfDirectors({ boardOfDirectors, boardTerms, lang }) {
    if (!boardTerms || boardTerms.length === 0) return null;

    return (
      <section className="mt-2">
        <h2 className="statkiss-officers-section-title mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          {pageText(lang, 'officers.board_title')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boardTerms.map((term) => (
            <article
              key={term}
              className="statkiss-officers-board-card bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 flex flex-col"
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{term}</h3>
              <ul className="space-y-1.5">
                {(boardOfDirectors[term] || []).map((member) => (
                  <li key={`${term}-${member.uuid || member.name}`} className="flex items-start gap-2">
                    <span className="statkiss-officers-board-dot mt-1 h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900 dark:text-white">{member.name}</span>
                      {member.affiliation ? (
                        <span className="statkiss-officers-muted text-xs text-gray-500 dark:text-slate-400">
                          {member.affiliation}
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  function IncomingBoardMembers({ data, term, lang }) {
    if (!data || data.length === 0) return null;

    return (
      <section className="statkiss-officers-incoming mt-10 bg-emerald-50/60 dark:bg-emerald-900/10 border-y border-emerald-100 dark:border-emerald-900/30">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <p className="statkiss-officers-incoming-eyebrow text-xs font-semibold tracking-[0.25em] text-emerald-700 dark:text-emerald-300 uppercase mb-1">
                {pageText(lang, 'officers.incoming_eyebrow')}
              </p>
              <h2 className="statkiss-officers-incoming-title text-xl font-semibold text-emerald-900 dark:text-emerald-50">
                {pageText(lang, 'officers.incoming_title')}
              </h2>
              {term ? (
                <p className="statkiss-officers-incoming-meta text-xs text-emerald-800 dark:text-emerald-200 mt-1">
                  {pageText(lang, 'officers.term_label')}: <span className="font-medium">{term}</span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="statkiss-officers-incoming-card bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/30 p-5">
            <ul className="space-y-1.5">
              {data.map((person) => (
                <li key={`${person.uuid || person.name}-incoming`} className="flex items-start gap-2">
                  <svg
                    className="statkiss-officers-list-icon w-4 h-4 text-emerald-500 dark:text-emerald-300 flex-shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900 dark:text-white">{person.name}</span>
                    {person.affiliation ? (
                      <span className="statkiss-officers-muted text-xs text-gray-500 dark:text-slate-400">
                        {person.affiliation}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  function SkeletonOfficerCard({ keyValue }) {
    return (
      <div key={keyValue} className="statkiss-officers-skeleton flex flex-col justify-center items-start p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 animate-pulse space-y-3">
        <div className="statkiss-officers-skeleton-bar h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
        <div className="statkiss-officers-skeleton-bar h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
        <div className="statkiss-officers-skeleton-bar h-3 w-32 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
      </div>
    );
  }

  function SkeletonBoardCard({ keyValue }) {
    return (
      <div key={keyValue} className="statkiss-officers-skeleton bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 animate-pulse space-y-3">
        <div className="statkiss-officers-skeleton-bar h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded-full mb-2"></div>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="statkiss-officers-skeleton-bar h-1.5 w-1.5 rounded-full bg-gray-200 dark:bg-slate-700"></div>
            <div className="statkiss-officers-skeleton-bar h-3 w-36 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  function LoadingView({ lang }) {
    return (
      <div className="statkiss-officers-page py-8 px-4 mx-auto w-full">
        <SectionHeader
          title={pageText(lang, 'officers.title')}
          subtitle={pageText(lang, 'officers.subtitle')}
        />

        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonOfficerCard key={idx} keyValue={idx} />
            ))}
          </div>
        </section>

        <section className="mt-2">
          <div className="statkiss-officers-skeleton-bar h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded-full mb-6 animate-pulse"></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonBoardCard key={idx} keyValue={idx} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  function ErrorView({ lang, onRetry }) {
    return (
      <div className="statkiss-officers-page py-8 px-4 mx-auto w-full">
        <div className="statkiss-officers-error max-w-2xl mx-auto rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-slate-900 p-6 text-center shadow-sm">
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">{pageText(lang, 'officers.error')}</p>
          <button
            type="button"
            onClick={onRetry}
            className="statkiss-officers-retry inline-flex items-center rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm hover:bg-sky-50 transition"
          >
            {pageText(lang, 'officers.retry')}
          </button>
        </div>
      </div>
    );
  }

  function EmptyView({ lang }) {
    return (
      <div className="statkiss-officers-page py-8 px-4 mx-auto w-full">
        <SectionHeader
          title={pageText(lang, 'officers.title')}
          subtitle={pageText(lang, 'officers.subtitle')}
        />
        <div className="statkiss-officers-empty max-w-2xl mx-auto rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center shadow-sm">
          <p className="text-sm text-gray-600 dark:text-slate-300">{pageText(lang, 'officers.empty')}</p>
        </div>
      </div>
    );
  }

  function Div_main() {
    const [lang, setLang] = React.useState(getCurrentLang());
    const [theme, setTheme] = React.useState(getCurrentTheme());
    const [state, setState] = React.useState({
      loading: true,
      data: null,
      error: null,
    });

    const loadData = React.useCallback(() => {
      setState((prev) => ({ loading: true, data: prev.data, error: null }));
      get_officer_list()
        .then((data) => {
          setState({ loading: false, data, error: null });
        })
        .catch((error) => {
          console.error(error);
          setState({ loading: false, data: null, error });
        });
    }, []);

    React.useEffect(() => {
      injectOfficersDarkFallbackCSS();
    }, []);

    React.useEffect(() => {
      loadData();
    }, [loadData]);

    React.useEffect(() => {
      function handleLang(event) {
        const nextLang = resolveLang(event && event.detail ? event.detail.lang : getCurrentLang());
        setLang(nextLang);
      }

      function handleTheme(event) {
        const nextTheme = event && event.detail && (event.detail.theme === 'dark' || event.detail.theme === 'light')
          ? event.detail.theme
          : getCurrentTheme();
        setTheme(nextTheme);
      }

      window.addEventListener('statkiss:lang', handleLang);
      window.addEventListener('statkiss:theme', handleTheme);

      return () => {
        window.removeEventListener('statkiss:lang', handleLang);
        window.removeEventListener('statkiss:theme', handleTheme);
      };
    }, []);

    if (state.loading) {
      return <LoadingView lang={lang} />;
    }

    if (state.error) {
      return <ErrorView lang={lang} onRetry={loadData} />;
    }

    const data = state.data || { current: [], incoming: [], boardOfDirectors: {}, boardTerms: [] };
    const hasAnyData = data.current.length > 0 || data.incoming.length > 0 || data.boardTerms.length > 0;
    if (!hasAnyData) {
      return <EmptyView lang={lang} />;
    }

    const currentTerm = data.current[0] ? data.current[0].term : (data.incoming[0] ? data.incoming[0].term : '');
    const subtitle = currentTerm
      ? `${pageText(lang, 'officers.subtitle')} (${currentTerm})`
      : pageText(lang, 'officers.subtitle');

    return (
      <div className="statkiss-officers-page py-8 px-4 mx-auto w-full" data-theme={theme}>
        <SectionHeader title={pageText(lang, 'officers.title')} subtitle={subtitle} />
        <CurrentOfficers data={data.current} lang={lang} />
        <BoardOfDirectors boardOfDirectors={data.boardOfDirectors} boardTerms={data.boardTerms} lang={lang} />
        <IncomingBoardMembers data={data.incoming} term={data.incoming[0] ? data.incoming[0].term : ''} lang={lang} />
      </div>
    );
  }

  function set_main() {
    injectOfficersDarkFallbackCSS();
    const root = document.getElementById('div_main');
    if (!root) return;
    ReactDOM.render(<Div_main />, root);
  }

  window.get_officer_list = get_officer_list;
  window.Div_main = Div_main;
  window.set_main = set_main;
})();
