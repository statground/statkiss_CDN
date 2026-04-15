(function () {
  'use strict';

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function resolveLang(value) {
    const I = getI18N();
    if (I && typeof I.resolveLangCode === 'function') return I.resolveLangCode(value || 'en');
    return value || 'en';
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
    const supported = (I && Array.isArray(I.languages)) ? I.languages.map((it) => it.code) : [];
    if (parts.length && supported.includes(parts[0])) return parts[0];

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang) return resolveLang(htmlLang);
    return 'en';
  }

  function t(key) {
    const I = getI18N();
    const lang = getCurrentLang();
    if (I && typeof I.t === 'function') return I.t(lang, key);
    return key;
  }

  function translateRole(role) {
    const lang = getCurrentLang();
    if (window.StatKISS_Officers && typeof window.StatKISS_Officers.translateRole === 'function') {
      return window.StatKISS_Officers.translateRole(lang, role);
    }
    return role;
  }

  function injectFallbackCSS() {
    if (document.getElementById('statkiss-officers-page-css')) return;

    const style = document.createElement('style');
    style.id = 'statkiss-officers-page-css';
    style.textContent = `
      html.dark .statkiss-officers-page,
      body.dark .statkiss-officers-page,
      .dark .statkiss-officers-page { color: #e5e7eb; }

      html.dark .statkiss-officers-title,
      body.dark .statkiss-officers-title,
      .dark .statkiss-officers-title,
      html.dark .statkiss-officers-section-title,
      body.dark .statkiss-officers-section-title,
      .dark .statkiss-officers-section-title,
      html.dark .statkiss-officers-card-title,
      body.dark .statkiss-officers-card-title,
      .dark .statkiss-officers-card-title,
      html.dark .statkiss-officers-board-term,
      body.dark .statkiss-officers-board-term,
      .dark .statkiss-officers-board-term,
      html.dark .statkiss-officers-incoming-title,
      body.dark .statkiss-officers-incoming-title,
      .dark .statkiss-officers-incoming-title { color: #f8fafc !important; }

      html.dark .statkiss-officers-subtitle,
      body.dark .statkiss-officers-subtitle,
      .dark .statkiss-officers-subtitle,
      html.dark .statkiss-officers-muted,
      body.dark .statkiss-officers-muted,
      .dark .statkiss-officers-muted,
      html.dark .statkiss-officers-incoming-meta,
      body.dark .statkiss-officers-incoming-meta,
      .dark .statkiss-officers-incoming-meta { color: #cbd5e1 !important; }

      html.dark .statkiss-officers-card,
      body.dark .statkiss-officers-card,
      .dark .statkiss-officers-card,
      html.dark .statkiss-officers-board-card,
      body.dark .statkiss-officers-board-card,
      .dark .statkiss-officers-board-card,
      html.dark .statkiss-officers-incoming-box,
      body.dark .statkiss-officers-incoming-box,
      .dark .statkiss-officers-incoming-box,
      html.dark .statkiss-officers-empty,
      body.dark .statkiss-officers-empty,
      .dark .statkiss-officers-empty,
      html.dark .statkiss-officers-error,
      body.dark .statkiss-officers-error,
      .dark .statkiss-officers-error { background: #0f172a !important; border-color: #1f2937 !important; }

      html.dark .statkiss-officers-card .text-gray-900,
      body.dark .statkiss-officers-card .text-gray-900,
      .dark .statkiss-officers-card .text-gray-900,
      html.dark .statkiss-officers-board-card .text-gray-900,
      body.dark .statkiss-officers-board-card .text-gray-900,
      .dark .statkiss-officers-board-card .text-gray-900,
      html.dark .statkiss-officers-incoming-box .text-gray-900,
      body.dark .statkiss-officers-incoming-box .text-gray-900,
      .dark .statkiss-officers-incoming-box .text-gray-900,
      html.dark .statkiss-officers-empty .text-gray-900,
      body.dark .statkiss-officers-empty .text-gray-900,
      .dark .statkiss-officers-empty .text-gray-900 { color: #f8fafc !important; }

      html.dark .statkiss-officers-card .text-gray-500,
      body.dark .statkiss-officers-card .text-gray-500,
      .dark .statkiss-officers-card .text-gray-500,
      html.dark .statkiss-officers-board-card .text-gray-500,
      body.dark .statkiss-officers-board-card .text-gray-500,
      .dark .statkiss-officers-board-card .text-gray-500,
      html.dark .statkiss-officers-incoming-box .text-gray-500,
      body.dark .statkiss-officers-incoming-box .text-gray-500,
      .dark .statkiss-officers-incoming-box .text-gray-500,
      html.dark .statkiss-officers-error .text-gray-500,
      body.dark .statkiss-officers-error .text-gray-500,
      .dark .statkiss-officers-error .text-gray-500 { color: #cbd5e1 !important; }

      html.dark .statkiss-officers-badge,
      body.dark .statkiss-officers-badge,
      .dark .statkiss-officers-badge { background: rgba(148, 163, 184, 0.15) !important; color: #cbd5e1 !important; }

      html.dark .statkiss-officers-badge--highlight,
      body.dark .statkiss-officers-badge--highlight,
      .dark .statkiss-officers-badge--highlight { background: rgba(56, 189, 248, 0.16) !important; color: #bae6fd !important; }

      html.dark .statkiss-officers-board-dot,
      body.dark .statkiss-officers-board-dot,
      .dark .statkiss-officers-board-dot { background: #38bdf8 !important; }

      html.dark .statkiss-officers-incoming-wrap,
      body.dark .statkiss-officers-incoming-wrap,
      .dark .statkiss-officers-incoming-wrap { background: rgba(16, 185, 129, 0.08) !important; border-color: rgba(16, 185, 129, 0.18) !important; }

      html.dark .statkiss-officers-incoming-wrap .text-emerald-700,
      body.dark .statkiss-officers-incoming-wrap .text-emerald-700,
      .dark .statkiss-officers-incoming-wrap .text-emerald-700 { color: #a7f3d0 !important; }

      html.dark .statkiss-officers-incoming-wrap .text-emerald-900,
      body.dark .statkiss-officers-incoming-wrap .text-emerald-900,
      .dark .statkiss-officers-incoming-wrap .text-emerald-900 { color: #ecfdf5 !important; }

      html.dark .statkiss-officers-incoming-wrap .text-emerald-800,
      body.dark .statkiss-officers-incoming-wrap .text-emerald-800,
      .dark .statkiss-officers-incoming-wrap .text-emerald-800 { color: #d1fae5 !important; }

      html.dark .statkiss-officers-retry,
      body.dark .statkiss-officers-retry,
      .dark .statkiss-officers-retry { background: rgba(56, 189, 248, 0.16) !important; color: #e0f2fe !important; border-color: rgba(56, 189, 248, 0.25) !important; }
    `;
    document.head.appendChild(style);
  }

  function apiCandidates() {
    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    const I = getI18N();
    const supported = (I && Array.isArray(I.languages)) ? I.languages.map((it) => it.code) : [];
    const urls = [];

    if (parts.length && supported.includes(parts[0])) {
      urls.push(`/${parts[0]}/about/ajax_get_officer_list/`);
    }
    urls.push('/about/ajax_get_officer_list/');

    return Array.from(new Set(urls));
  }

  function inferSection(role) {
    if (role === 'Board of Directors') return 'board';
    if (role === 'Incoming Board Member') return 'incoming';
    return 'current';
  }

  function toInt(value, fallback) {
    const num = Number.parseInt(value, 10);
    return Number.isFinite(num) ? num : fallback;
  }

  function normalizeRows(payload) {
    const rows = Array.isArray(payload) ? payload : Object.values(payload || {});
    return rows
      .map((row, idx) => ({
        uuid: row.uuid || `officer-${idx}`,
        name: (row.name || '').trim(),
        affiliation: (row.affiliation || '').trim(),
        email: (row.email || '').trim(),
        role: (row.role || '').trim(),
        term: (row.term || '').trim(),
        role_order: toInt(row.role_order, 999),
        section_key: row.section_key || inferSection((row.role || '').trim()),
        on_duty: toInt(row.on_duty, 0),
        visible: toInt(row.visible, 1),
        active: toInt(row.active, 1),
        is_highlight: toInt(row.is_highlight, 0),
        term_year_start: toInt(row.term_year_start, 0),
        term_year_end: toInt(row.term_year_end, 0),
      }))
      .filter((row) => row.name && row.visible === 1 && row.active === 1);
  }

  function compareRows(a, b) {
    const sectionRank = { current: 10, board: 20, incoming: 30 };
    const sectionDelta = (sectionRank[a.section_key] || 99) - (sectionRank[b.section_key] || 99);
    if (sectionDelta !== 0) return sectionDelta;

    const dutyDelta = (b.on_duty || 0) - (a.on_duty || 0);
    if (dutyDelta !== 0) return dutyDelta;

    const endDelta = (b.term_year_end || b.term_year_start || 0) - (a.term_year_end || a.term_year_start || 0);
    if (endDelta !== 0) return endDelta;

    const startDelta = (b.term_year_start || b.term_year_end || 0) - (a.term_year_start || a.term_year_end || 0);
    if (startDelta !== 0) return startDelta;

    const orderDelta = (a.role_order || 999) - (b.role_order || 999);
    if (orderDelta !== 0) return orderDelta;

    const nameDelta = (a.name || '').localeCompare((b.name || ''), undefined, { sensitivity: 'base' });
    if (nameDelta !== 0) return nameDelta;

    return (a.uuid || '').localeCompare((b.uuid || ''), undefined, { sensitivity: 'base' });
  }

  async function loadOfficerList() {
    const candidates = apiCandidates();
    let lastError = null;

    for (const url of candidates) {
      try {
        const res = await fetch(url, {
          credentials: 'same-origin',
          cache: 'no-store',
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
        if (!res.ok) {
          let message = `HTTP ${res.status}`;
          try {
            const payload = await res.json();
            if (payload && payload.error) message = payload.error;
          } catch (_) {}
          throw new Error(message);
        }
        return normalizeRows(await res.json()).sort(compareRows);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('Unable to load officers');
  }

  function groupRows(rows) {
    const current = [];
    const incoming = [];
    const boardMap = new Map();

    rows.forEach((row) => {
      if (row.section_key === 'board') {
        if (!boardMap.has(row.term)) boardMap.set(row.term, []);
        boardMap.get(row.term).push(row);
        return;
      }
      if (row.section_key === 'incoming') {
        incoming.push(row);
        return;
      }
      current.push(row);
    });

    return {
      current,
      incoming,
      boardOfDirectors: Array.from(boardMap.entries()).map(([term, members]) => ({ term, members })),
      currentTerm: current.find((row) => row.on_duty === 1)?.term || current[0]?.term || incoming[0]?.term || '',
    };
  }

  function SkeletonCard() {
    return (
      <div className="statkiss-officers-card rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-pulse space-y-3">
        <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-36 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-28 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  function OfficerCard({ row }) {
    const highlight = row.is_highlight === 1;
    return (
      <article className={[
        'statkiss-officers-card rounded-2xl border bg-white p-5 shadow-sm transition',
        highlight ? 'border-sky-300 shadow-md' : 'border-gray-100 hover:border-sky-200 hover:shadow-md',
      ].join(' ')}>
        <span className={[
          'statkiss-officers-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-3',
          highlight ? 'statkiss-officers-badge--highlight bg-sky-50 text-sky-700' : 'bg-gray-100 text-gray-600',
        ].join(' ')}>
          {translateRole(row.role)}
        </span>
        <h3 className="statkiss-officers-card-title text-lg font-semibold text-gray-900 mb-1">{row.name}</h3>
        {row.affiliation ? <p className="statkiss-officers-muted text-sm text-gray-500 leading-snug">{row.affiliation}</p> : null}
      </article>
    );
  }

  function CurrentSection({ rows }) {
    if (!rows.length) return null;
    return (
      <section className="mb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => <OfficerCard key={row.uuid} row={row} />)}
        </div>
      </section>
    );
  }

  function BoardSection({ groups }) {
    if (!groups.length) return null;
    return (
      <section className="mt-2">
        <h2 className="statkiss-officers-section-title mb-8 text-2xl font-bold text-gray-900">{t('officers.board_title')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.term} className="statkiss-officers-board-card rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="statkiss-officers-board-term mb-3 text-sm font-semibold text-gray-900">{group.term}</h3>
              <ul className="space-y-1.5">
                {group.members.map((row) => (
                  <li key={row.uuid} className="flex items-start">
                    <span className="statkiss-officers-board-dot mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{row.name}</span>
                      {row.affiliation ? <span className="statkiss-officers-muted text-xs text-gray-500">{row.affiliation}</span> : null}
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

  function IncomingSection({ rows }) {
    if (!rows.length) return null;
    const term = rows[0]?.term || '';
    return (
      <section className="statkiss-officers-incoming-wrap mt-10 border-t border-b border-emerald-100 bg-emerald-50/60">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 mb-1">{t('officers.incoming_eyebrow')}</p>
              <h2 className="statkiss-officers-incoming-title text-xl font-semibold text-emerald-900">{t('officers.incoming_title')}</h2>
              {term ? (
                <p className="statkiss-officers-incoming-meta mt-1 text-xs text-emerald-800">
                  {t('officers.term_label')}: <span className="font-medium">{term}</span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="statkiss-officers-incoming-box rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <ul className="space-y-1.5">
              {rows.map((row) => (
                <li key={row.uuid} className="flex items-start">
                  <svg className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">{row.name}</span>
                    {row.affiliation ? <span className="statkiss-officers-muted text-xs text-gray-500">{row.affiliation}</span> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  function OfficersPage() {
    const [state, setState] = React.useState({ loading: true, error: null, rows: [] });
    const [reloadKey, setReloadKey] = React.useState(0);

    React.useEffect(() => {
      let mounted = true;
      setState((prev) => ({ ...prev, loading: true, error: null }));

      loadOfficerList()
        .then((rows) => {
          if (!mounted) return;
          setState({ loading: false, error: null, rows });
        })
        .catch((error) => {
          console.error(error);
          if (!mounted) return;
          setState({ loading: false, error, rows: [] });
        });

      return () => {
        mounted = false;
      };
    }, [reloadKey]);

    const data = groupRows(state.rows);

    if (state.loading) {
      return (
        <div className="statkiss-officers-page py-8 px-4 mx-auto w-full">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
            <div className="h-9 w-40 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 w-72 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          <section className="mb-12">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={`sk-${idx}`} />)}
            </div>
          </section>
        </div>
      );
    }

    if (state.error) {
      return (
        <div className="statkiss-officers-page py-8 px-4 mx-auto w-full">
          <div className="statkiss-officers-error rounded-2xl border border-red-100 bg-white p-5 shadow-sm max-w-2xl">
            <p className="text-sm text-red-600 mb-4">{t('officers.error')}</p>
            <p className="statkiss-officers-muted text-xs text-gray-500 mb-4 break-all">{String(state.error.message || state.error)}</p>
            <button
              type="button"
              className="statkiss-officers-retry inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700"
              onClick={() => setReloadKey((v) => v + 1)}
            >
              {t('officers.retry')}
            </button>
          </div>
        </div>
      );
    }

    const pageTerm = data.currentTerm ? ` (${data.currentTerm})` : '';
    const isEmpty = !data.current.length && !data.boardOfDirectors.length && !data.incoming.length;

    return (
      <div className="statkiss-officers-page py-8 px-4 mx-auto w-full">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
          <h2 className="statkiss-officers-title mb-4 text-4xl tracking-tight font-extrabold text-gray-900">{t('officers.title')}</h2>
          <p className="statkiss-officers-subtitle font-light text-gray-500 sm:text-xl">{t('officers.subtitle')}{pageTerm}</p>
        </div>

        {isEmpty ? (
          <div className="statkiss-officers-empty rounded-2xl border border-gray-100 bg-white p-5 shadow-sm max-w-2xl">
            <p className="statkiss-officers-muted text-sm text-gray-500">{t('officers.empty')}</p>
          </div>
        ) : null}

        <CurrentSection rows={data.current} />
        <BoardSection groups={data.boardOfDirectors} />
        <IncomingSection rows={data.incoming} />
      </div>
    );
  }

  function renderPage() {
    injectFallbackCSS();
    const target = document.getElementById('div_main');
    if (!target) return;
    ReactDOM.render(<OfficersPage />, target);
  }

  window.set_main = renderPage;

  if (!window.__STATKISS_OFFICERS_EVENTS_BOUND__) {
    window.addEventListener('statkiss:lang', renderPage);
    window.addEventListener('statkiss:theme', renderPage);
    window.__STATKISS_OFFICERS_EVENTS_BOUND__ = true;
  }
})();
