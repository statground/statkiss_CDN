function set_main() {
  (function () {
    'use strict';

    const configEl = document.getElementById('statkiss-journals-public-config');
    const rawConfig = (() => {
      try {
        return JSON.parse((configEl && configEl.textContent) || '{}');
      } catch (_) {
        return {};
      }
    })();

    const ROLE_CATALOG = [
      { role_key: 'editor_in_chief', role_order: 10 },
      { role_key: 'co_editors', role_order: 20 },
      { role_key: 'honorary_editors', role_order: 30 },
      { role_key: 'managing_editor', role_order: 40 },
      { role_key: 'editorial_assistant', role_order: 50 },
    ];

    const EXTRA_I18N = {
      en: {
        manual_card_text: 'A Korean manual for e-submission',
        manual_label: 'Manual',
      },
      ko: {
        manual_card_text: '전자투고 한국어 매뉴얼',
        manual_label: '매뉴얼',
      },
    };

    function getGlobalI18N() {
      return window.StatKISS_I18N || null;
    }

    function resolveLang(value) {
      const helper = getGlobalI18N();
      if (helper && typeof helper.resolveLangCode === 'function') {
        return helper.resolveLangCode(value || 'en');
      }
      return value || 'en';
    }

    function currentLang() {
      const helper = getGlobalI18N();
      try {
        if (helper && helper.LANG_KEY) {
          const saved = localStorage.getItem(helper.LANG_KEY);
          if (saved) return resolveLang(saved);
        }
      } catch (_) {}
      return resolveLang(rawConfig.lang || document.documentElement.getAttribute('lang') || navigator.language || 'en');
    }

    function t(key) {
      const lang = currentLang();
      const dict = window.STATKISS_PUBS_JOURNALS_I18N || {};
      const current = dict[lang] || {};
      const english = dict.en || {};
      const extraCurrent = EXTRA_I18N[lang] || {};
      const extraEnglish = EXTRA_I18N.en || {};
      if (current[key] != null && current[key] !== '') return current[key];
      if (extraCurrent[key] != null && extraCurrent[key] !== '') return extraCurrent[key];
      if (english[key] != null && english[key] !== '') return english[key];
      if (extraEnglish[key] != null && extraEnglish[key] !== '') return extraEnglish[key];
      return key;
    }

    function normalizeText(value) {
      return String(value || '').trim();
    }

    function normalizeFlag(value, fallback) {
      if (typeof value === 'boolean') return value ? 1 : 0;
      if (value === null || value === undefined || value === '') return fallback;
      return Number(value) ? 1 : 0;
    }

    function normalizeBoardPayload(raw) {
      const rolesByKey = new Map();
      ROLE_CATALOG.forEach((role) => {
        rolesByKey.set(role.role_key, {
          role_key: role.role_key,
          role_order: role.role_order,
          items: [],
        });
      });

      const rawRoles = Array.isArray(raw && raw.roles) ? raw.roles : [];
      rawRoles.forEach((role) => {
        const roleKey = normalizeText(role && role.role_key);
        if (!rolesByKey.has(roleKey)) return;
        rolesByKey.set(roleKey, {
          role_key: roleKey,
          role_order: Number(role && role.role_order) || ROLE_CATALOG.find((item) => item.role_key === roleKey)?.role_order || 999,
          items: (Array.isArray(role && role.items) ? role.items : [])
            .map((item) => ({
              name: normalizeText(item && item.name),
              affiliation: normalizeText(item && item.affiliation),
            }))
            .filter((item) => item.name),
        });
      });

      return {
        board_visible: normalizeFlag(raw && raw.board_visible, 1),
        roles: Array.from(rolesByKey.values()).sort((a, b) => a.role_order - b.role_order),
      };
    }

    async function fetchBoard() {
      if (!rawConfig.api_public_url) {
        return normalizeBoardPayload({ board_visible: 1, roles: [] });
      }
      const response = await fetch(rawConfig.api_public_url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      if (!data || data.ok === false) {
        throw new Error((data && data.message) || 'Failed to load the editorial board.');
      }
      return normalizeBoardPayload(data);
    }

    function HeaderBlock() {
      return (
        <div className="mb-6 max-w-screen-lg lg:mb-0">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-900 md:text-5xl lg:text-6xl dark:text-red-300">
            {t('header_title')}
          </h1>
          <p className="mb-6 text-lg font-semibold text-gray-900 lg:mb-8 lg:text-xl dark:text-gray-100">
            {t('header_subtitle')}
          </p>

          <p className="mb-6 text-sm font-light text-gray-900 lg:mb-8 dark:text-gray-100">
            <a href="http://csam.or.kr/" target="_blank" rel="noreferrer" className="font-medium underline text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200">
              {t('header_link_label')}
            </a>{' '}
            {t('header_paragraph_1_after_link')}
          </p>
          <p className="mb-6 text-sm font-light text-gray-900 lg:mb-8 dark:text-gray-100">
            {t('header_paragraph_2')}
          </p>
          <p className="mb-6 text-sm font-light text-gray-900 lg:mb-8 dark:text-gray-100">
            {t('header_paragraph_3')}
          </p>
        </div>
      );
    }

    function ActionCard(props) {
      return (
        <div className="rounded-2xl border border-gray-300/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/45">
          <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">{props.text}</h2>
          {props.subText ? (
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{props.subText}</p>
          ) : null}
          <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-semibold text-blue-700 transition hover:underline dark:text-blue-300"
          >
            {props.urlName}
            <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      );
    }

    function LogoCard(props) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-gray-300/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/45">
          <img className="h-24 w-auto" src={props.imgUrl} alt="" />
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{props.text}</p>
        </div>
      );
    }

    function PersonItem(props) {
      return (
        <li className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500 dark:bg-gray-400"></span>
          <div className="flex min-w-0 flex-col">
            <span className="text-base font-medium text-gray-900 dark:text-gray-100">{props.name}</span>
            {props.affiliation ? (
              <span className="text-sm text-gray-600 dark:text-gray-300">({props.affiliation})</span>
            ) : null}
          </div>
        </li>
      );
    }

    function EditorialBoardSection(props) {
      if (!props.board.board_visible) return null;
      const visibleRoles = (props.board.roles || []).filter((role) => Array.isArray(role.items) && role.items.length > 0);
      if (!visibleRoles.length) return null;

      return (
        <div className="px-4 py-8 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">{t('editorial_board_title')}</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-5">
            {visibleRoles.map((role) => (
              <div key={role.role_key} className="max-w-xs">
                <div className="mb-3 flex min-h-[52px] w-full items-center justify-center text-center">
                  <p className="text-base leading-tight text-gray-700 dark:text-gray-200">{t(role.role_key)}</p>
                </div>
                <ul className="space-y-3">
                  {role.items.map((item, index) => (
                    <PersonItem
                      key={`${role.role_key}-${index}-${item.name}`}
                      name={item.name}
                      affiliation={item.affiliation}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    function App() {
      const [board, setBoard] = React.useState(normalizeBoardPayload({ board_visible: 1, roles: [] }));
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {
        let ignore = false;
        (async () => {
          try {
            const nextBoard = await fetchBoard();
            if (!ignore) setBoard(nextBoard);
          } catch (_) {
            if (!ignore) setBoard(normalizeBoardPayload({ board_visible: 0, roles: [] }));
          } finally {
            if (!ignore) setLoading(false);
          }
        })();
        return () => {
          ignore = true;
        };
      }, []);

      return (
        <div className="flex flex-col bg-white dark:bg-gray-950">
          <div className="bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/header_blank.png')] bg-cover bg-center bg-no-repeat">
            <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
              <HeaderBlock />

              <div className="mt-8 grid w-full grid-cols-1 gap-6 border-t border-gray-600 pt-8 lg:mt-12 lg:grid-cols-3 lg:pt-12">
                <ActionCard
                  text={t('contents_card_text')}
                  url="http://www.csam.or.kr/main.html"
                  urlName={t('visit_label')}
                />
                <ActionCard
                  text={t('submit_card_text')}
                  subText={t('submit_card_sub_text')}
                  url="http://submit.csam.or.kr/submission/Login.html"
                  urlName={t('link_label')}
                />
                <ActionCard
                  text={t('manual_card_text')}
                  url="https://www.statkiss.org/wp-content/uploads/2014/11/Author_manual_Kor.pdf"
                  urlName={t('manual_label')}
                />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <LogoCard imgUrl="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kss.png" text="pISSN: 2287-7843" />
                <LogoCard imgUrl="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kiss.png" text="eISSN: 2383-4757" />
              </div>
            </div>
          </div>

          {loading ? <div className="h-10"></div> : <EditorialBoardSection board={board} />}
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById('div_main'));
  })();
}
