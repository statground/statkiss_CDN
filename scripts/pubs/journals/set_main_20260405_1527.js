function set_main() {
    function getHeaderLangKey() {
        return (window.StatKISS_I18N && window.StatKISS_I18N.LANG_KEY) || 'statkiss_lang';
    }

    function getCurrentLang() {
        function pickFirst(values) {
            for (let i = 0; i < values.length; i += 1) {
                const value = String(values[i] || '').trim();
                if (value) return value;
            }
            return '';
        }

        try {
            const headerLangKey = getHeaderLangKey();
            const htmlLang = (
                document.documentElement.getAttribute('lang') ||
                document.documentElement.lang ||
                (document.body && document.body.getAttribute('lang')) ||
                ''
            ).trim();

            const storedLang = pickFirst([
                localStorage.getItem(headerLangKey),
                localStorage.getItem('statkiss_lang'),
                localStorage.getItem('lang'),
                localStorage.getItem('language')
            ]);

            const headerLang = (
                window.StatKISS_I18N &&
                typeof window.StatKISS_I18N.getInitialLang === 'function' &&
                window.StatKISS_I18N.getInitialLang()
            ) || '';

            const winLang = pickFirst([
                window.currentLang,
                window.lang,
                window.__statkiss_lang,
                window.__lang
            ]);

            const browserLang = (navigator.language || navigator.userLanguage || '').trim();

            return pickFirst([htmlLang, storedLang, headerLang, winLang, browserLang, 'en']);
        } catch (e) {
            return 'en';
        }
    }

    function getI18nFingerprint() {
        const source = window.STATKISS_PUBS_JOURNALS_I18N || {};
        const languages = Object.keys(source).sort().join('|');
        const keys = source.en ? Object.keys(source.en).sort().join('|') : '';
        return languages + '::' + keys;
    }

    function extractLangFromEvent(event) {
        if (!event || !event.detail) return '';
        return String(
            event.detail.lang ||
            event.detail.language ||
            event.detail.code ||
            event.detail.value ||
            ''
        ).trim();
    }

    function normalizeLang(lang) {
        const rawValue = String(lang || 'en').trim();
        const value = rawValue.toLowerCase().replace(/_/g, '-');
        const i18nSource = window.STATKISS_PUBS_JOURNALS_I18N || {};

        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.resolveLangCode === 'function') {
            const resolvedByHeader = window.StatKISS_I18N.resolveLangCode(rawValue);
            if (i18nSource[resolvedByHeader]) {
                return resolvedByHeader;
            }
        }

        const map = {
            'ko': 'ko',
            'ko-kr': 'ko',
            'en': 'en',
            'en-us': 'en',
            'en-gb': 'en',
            'ja': 'ja',
            'ja-jp': 'ja',
            'jp': 'ja',
            'zh': 'zh-Hans',
            'zh-cn': 'zh-Hans',
            'zh-sg': 'zh-Hans',
            'zh-hans': 'zh-Hans',
            'zh-hans-cn': 'zh-Hans',
            'zh-hans-sg': 'zh-Hans',
            'zh-tw': 'zh-Hant',
            'zh-hk': 'zh-Hant',
            'zh-mo': 'zh-Hant',
            'zh-hant': 'zh-Hant',
            'zh-hant-tw': 'zh-Hant',
            'zh-hant-hk': 'zh-Hant',
            'es': 'es',
            'es-es': 'es',
            'es-419': 'es',
            'fr': 'fr',
            'fr-fr': 'fr',
            'de': 'de',
            'de-de': 'de',
            'pt': 'pt-BR',
            'pt-br': 'pt-BR',
            'ru': 'ru',
            'ru-ru': 'ru',
            'id': 'id',
            'id-id': 'id',
            'vi': 'vi',
            'vi-vn': 'vi',
            'th': 'th',
            'th-th': 'th',
            'ms': 'ms',
            'ms-my': 'ms',
            'fil': 'fil',
            'fil-ph': 'fil',
            'tl': 'fil',
            'tl-ph': 'fil',
            'hi': 'hi',
            'hi-in': 'hi',
            'ar': 'ar',
            'ar-sa': 'ar',
            'ar-ae': 'ar',
            'it': 'it',
            'it-it': 'it',
            'nl': 'nl',
            'nl-nl': 'nl',
            'pl': 'pl',
            'pl-pl': 'pl',
            'sv': 'sv',
            'sv-se': 'sv',
            'tr': 'tr',
            'tr-tr': 'tr',
            'uk': 'uk',
            'uk-ua': 'uk'
        };

        if (map[value]) return map[value];
        if (i18nSource[rawValue]) return rawValue;
        if (i18nSource[value]) return value;
        if (value.indexOf('zh-') === 0) {
            return value.indexOf('hant') !== -1 || value.slice(-2) === 'tw' || value.slice(-2) === 'hk' || value.slice(-2) === 'mo'
                ? 'zh-Hant'
                : 'zh-Hans';
        }
        if (value.indexOf('ko') === 0) return 'ko';
        if (value.indexOf('en') === 0) return 'en';
        if (value.indexOf('ja') === 0 || value.indexOf('jp') === 0) return 'ja';
        if (value.indexOf('es') === 0) return 'es';
        if (value.indexOf('fr') === 0) return 'fr';
        if (value.indexOf('de') === 0) return 'de';
        if (value.indexOf('pt') === 0) return 'pt-BR';
        if (value.indexOf('ru') === 0) return 'ru';
        if (value.indexOf('id') === 0) return 'id';
        if (value.indexOf('vi') === 0) return 'vi';
        if (value.indexOf('th') === 0) return 'th';
        if (value.indexOf('ms') === 0) return 'ms';
        if (value.indexOf('fil') === 0 || value.indexOf('tl') === 0) return 'fil';
        if (value.indexOf('hi') === 0) return 'hi';
        if (value.indexOf('ar') === 0) return 'ar';
        if (value.indexOf('it') === 0) return 'it';
        if (value.indexOf('nl') === 0) return 'nl';
        if (value.indexOf('pl') === 0) return 'pl';
        if (value.indexOf('sv') === 0) return 'sv';
        if (value.indexOf('tr') === 0) return 'tr';
        if (value.indexOf('uk') === 0) return 'uk';
        return 'en';
    }

    function isDarkModeEnabled() {
        try {
            const html = document.documentElement;
            const body = document.body;
            const htmlClass = (html && html.className) || '';
            const bodyClass = (body && body.className) || '';
            const htmlTheme = (html && (html.getAttribute('data-theme') || html.getAttribute('theme'))) || '';
            const bodyTheme = (body && (body.getAttribute('data-theme') || body.getAttribute('theme'))) || '';
            const colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            return (
                /(^|\s)dark(\s|$)/.test(htmlClass) ||
                /(^|\s)dark(\s|$)/.test(bodyClass) ||
                String(htmlTheme).toLowerCase() === 'dark' ||
                String(bodyTheme).toLowerCase() === 'dark' ||
                colorScheme
            );
        } catch (e) {
            return false;
        }
    }

    function getTranslations(lang) {
        const fallback = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N.en) || {};
        const current = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N[lang]) || fallback;
        return Object.assign({}, fallback, current);
    }

    function readConfig() {
        const node = document.getElementById('statkiss-journals-public-config') || document.getElementById('statkiss-pubs-journals-config');
        const fallback = {
            api_public_url: '/en/pubs/ajax_get_editorial_board_public/',
            public_url: '/en/pubs/journals/',
            edit_url: '/en/pubs/journals/edit/',
            can_manage_editorial_board: false,
        };
        if (!node) {
            return fallback;
        }
        try {
            const parsed = JSON.parse(node.textContent || '{}') || {};
            return {
                api_public_url: parsed.api_public_url || parsed.api_get_url || parsed.api_editor_url || fallback.api_public_url,
                public_url: parsed.public_url || parsed.journals_public_path || fallback.public_url,
                edit_url: parsed.edit_url || parsed.editor_url || fallback.edit_url,
                can_manage_editorial_board: !!(parsed.can_manage_editorial_board || parsed.can_edit_journals || parsed.can_manage_officers),
            };
        } catch (e) {
            return fallback;
        }
    }

    const CONFIG = readConfig();
    const BOARD_REFRESH_KEY = 'statkiss:editorial_board:updated_at';


    function ensureFloatingEditButton(label) {
        if (!CONFIG.can_manage_editorial_board || !CONFIG.edit_url) return;
        if (document.getElementById('statkiss-journals-edit-floating-btn')) return;
        const anchor = document.createElement('a');
        anchor.id = 'statkiss-journals-edit-floating-btn';
        anchor.setAttribute('data-statkiss-journals-edit-button', '1');
        anchor.href = CONFIG.edit_url;
        anchor.className = 'inline-flex items-center rounded-full border border-fuchsia-300 bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl ring-4 ring-fuchsia-200 transition hover:border-fuchsia-200 hover:bg-fuchsia-500 dark:border-fuchsia-500 dark:bg-fuchsia-500 dark:text-white dark:ring-fuchsia-950 dark:hover:border-fuchsia-400 dark:hover:bg-fuchsia-400';
        anchor.textContent = label || 'Edit';

        const wrapper = document.createElement('div');
        wrapper.className = 'fixed bottom-6 right-6 z-40';
        wrapper.appendChild(anchor);
        document.body.appendChild(wrapper);
    }

    function buildNoCacheUrl(url) {
        const base = String(url || '').trim();
        if (!base) return base;
        return base + (base.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
    }

    function getPayloadRoot(payload) {
        const source = payload && typeof payload === 'object' ? payload : {};
        const candidates = [source, source.board, source.snapshot, source.payload, source.data];
        for (let i = 0; i < candidates.length; i += 1) {
            const candidate = candidates[i];
            if (!candidate || typeof candidate !== 'object') continue;
            if (candidate.visible != null || candidate.board_visible != null || Array.isArray(candidate.sections) || Array.isArray(candidate.roles)) {
                return candidate;
            }
        }
        return source;
    }

    function normalizeBoardPayload(payload) {
        const source = payload && typeof payload === 'object' ? payload : {};
        const root = getPayloadRoot(source);
        const visible = root.visible == null ? root.board_visible : root.visible;
        const rawSections = Array.isArray(root.sections) ? root.sections : Array.isArray(root.roles) ? root.roles : [];
        const sections = rawSections
            .map(function(section, roleIndex) {
                const items = Array.isArray(section.items) ? section.items : [];
                return {
                    role_uuid: String(section.role_uuid || ('role-' + roleIndex)),
                    role_key: String(section.role_key || section.role_name || ('role-' + roleIndex)),
                    role_name: String(section.role_name || section.role_key || '').trim(),
                    role_order: Number(section.role_order || roleIndex + 1),
                    items: items
                        .map(function(item, itemIndex) {
                            return {
                                item_uuid: String(item.item_uuid || ('item-' + roleIndex + '-' + itemIndex)),
                                name: String(item.name || '').trim(),
                                affiliation: String(item.affiliation || '').trim(),
                                person_order: Number(item.person_order || itemIndex + 1)
                            };
                        })
                        .filter(function(item) { return item.name || item.affiliation; })
                        .sort(function(a, b) { return a.person_order - b.person_order; })
                };
            })
            .filter(function(section) { return section.role_name || section.items.length; })
            .sort(function(a, b) { return a.role_order - b.role_order; });
        return {
            ok: source.ok !== false,
            message: String(source.message || ''),
            visible: visible ? 1 : 0,
            sections: sections
        };
    }

    function Div_sub_card(props) {
        return (
            <div>
                <h2 className="mb-1 text-md text-gray-900 dark:text-white">{props.text}</h2>
                {props.sub_text ? <h2 className="mb-1 text-sm text-gray-600 dark:text-gray-300">{props.sub_text}</h2> : null}
                <a
                    href={props.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline text-blue-600"
                >
                    {props.url_name}
                    <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </a>
            </div>
        );
    }

    function Div_sub_card_img(props) {
        return (
            <div className="flex flex-col justify-center items-center space-y-4 bg-transparent">
                <img className="h-24 bg-transparent" src={props.img_url} alt={props.text} />
                <h2 className="mb-1 text-sm text-gray-900 dark:text-white">{props.text}</h2>
            </div>
        );
    }

    function Div_person_li(props) {
        return (
            <li className="flex items-start list-none">
                <svg className={props.isDark ? 'w-4 h-4 mr-2 mt-1 shrink-0 text-white' : 'w-4 h-4 mr-2 mt-1 shrink-0 text-gray-700'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="currentColor"></path>
                </svg>
                <div className="flex flex-col">
                    <span className={props.isDark ? 'text-md text-white font-medium' : 'text-md text-gray-900'}>{props.name}</span>
                    <span className={props.isDark ? 'text-xs text-gray-200' : 'text-xs text-gray-500'}>({props.affiliation})</span>
                </div>
            </li>
        );
    }

    function Div_header(props) {
        const t = props.t;
        return (
            <div className="mb-6 max-w-screen-lg lg:mb-0">
                <h1 className="mb-4 text-4xl font-extrabold text-red-900 tracking-tight leading-none md:text-5xl lg:text-6xl">
                    {t.header_title}
                </h1>
                <p className="mb-6 font-bold text-gray-900 dark:text-white lg:mb-8 md:text-lg lg:text-xl">
                    {t.header_subtitle}
                </p>
                <p className="mb-6 font-light text-gray-900 dark:text-white lg:mb-8 md:text-md lg:text-sm leading-7">
                    <a href="http://csam.or.kr/" target="_blank" rel="noreferrer" className="underline text-blue-600">
                        {t.header_link_label}
                    </a>{' '}
                    {t.header_paragraph_1_after_link}
                </p>
                <p className="mb-6 font-light text-gray-900 dark:text-white lg:mb-8 md:text-md lg:text-sm leading-7">
                    {t.header_paragraph_2}
                </p>
                <br />
                <p className="mb-6 font-light text-gray-900 dark:text-white lg:mb-8 md:text-md lg:text-sm leading-7">
                    {t.header_paragraph_3}
                </p>
            </div>
        );
    }

    function EditorialBoard(props) {
        const payload = props.payload;
        const totalItems = payload.sections.reduce(function(sum, section) { return sum + section.items.length; }, 0);
        if (!payload.visible || totalItems === 0) return null;
        const editorialBoardTitleClass = props.isDark ? 'mb-8 text-2xl font-bold text-white' : 'mb-8 text-2xl font-bold text-gray-900';
        const editorialRoleClass = props.isDark ? 'text-md leading-tight text-white' : 'text-md leading-tight text-gray-700';
        return (
            <div className="px-4 mx-auto max-w-screen-xl py-8">
                <h2 className={editorialBoardTitleClass}>{props.t.editorial_board_title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {payload.sections.map(function(section) {
                        return (
                            <div className="w-full max-w-full md:max-w-xs" key={section.role_uuid || section.role_key}>
                                <div className="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                    <p className={editorialRoleClass}>{section.role_name}</p>
                                </div>
                                <ul className="max-w-md space-y-1 list-none p-0 m-0">
                                    {section.items.map(function(item) {
                                        return <Div_person_li key={item.item_uuid} isDark={props.isDark} name={item.name} affiliation={item.affiliation} />;
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function App() {
        const [state, setState] = React.useState({
            lang: normalizeLang(getCurrentLang()),
            i18nFingerprint: getI18nFingerprint(),
            isDark: isDarkModeEnabled()
        });
        const [board, setBoard] = React.useState({ visible: 0, sections: [] });

        React.useEffect(() => {
            let lastLang = normalizeLang(getCurrentLang());
            let lastFingerprint = getI18nFingerprint();
            let lastIsDark = isDarkModeEnabled();

            function syncLang(event) {
                const hintedLang = extractLangFromEvent(event);
                const nextLang = normalizeLang(hintedLang || getCurrentLang());
                const nextFingerprint = getI18nFingerprint();
                const nextIsDark = isDarkModeEnabled();

                if (nextLang !== lastLang || nextFingerprint !== lastFingerprint || nextIsDark !== lastIsDark) {
                    lastLang = nextLang;
                    lastFingerprint = nextFingerprint;
                    lastIsDark = nextIsDark;
                    setState({
                        lang: nextLang,
                        i18nFingerprint: nextFingerprint,
                        isDark: nextIsDark
                    });
                }
            }

            const events = ['languagechange', 'statkiss:languagechange', 'i18n:change', 'langchange'];
            events.forEach((eventName) => window.addEventListener(eventName, syncLang));
            window.addEventListener('storage', syncLang);
            const observer = new MutationObserver(syncLang);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir', 'class', 'data-theme', 'theme'] });
            const timer = window.setInterval(syncLang, 500);
            syncLang();

            return () => {
                events.forEach((eventName) => window.removeEventListener(eventName, syncLang));
                window.removeEventListener('storage', syncLang);
                observer.disconnect();
                window.clearInterval(timer);
            };
        }, []);

        React.useEffect(() => {
            let mounted = true;
            let refreshing = false;

            async function loadBoard() {
                if (refreshing) return;
                refreshing = true;
                try {
                    const response = await fetch(buildNoCacheUrl(CONFIG.api_public_url), {
                        method: 'GET',
                        credentials: 'same-origin',
                        cache: 'no-store',
                        headers: { 'Accept': 'application/json' }
                    });
                    const payload = normalizeBoardPayload(await response.json());
                    if (!response.ok || payload.ok === false) {
                        throw new Error(payload.message || 'Failed to load Editorial Board.');
                    }
                    if (!mounted) return;
                    setBoard(payload);
                } catch (e) {
                    if (!mounted) return;
                    setBoard({ visible: 0, sections: [] });
                } finally {
                    refreshing = false;
                }
            }

            function triggerReload(event) {
                if (!mounted) return;
                if (event && event.type === 'visibilitychange' && document.visibilityState !== 'visible') return;
                loadBoard();
            }

            function triggerReloadFromStorage(event) {
                if (event && event.key && event.key !== BOARD_REFRESH_KEY) return;
                loadBoard();
            }

            loadBoard();
            window.addEventListener('pageshow', triggerReload);
            window.addEventListener('focus', triggerReload);
            document.addEventListener('visibilitychange', triggerReload);
            window.addEventListener('storage', triggerReloadFromStorage);
            window.addEventListener('statkiss:editorial-board-updated', triggerReload);

            return () => {
                mounted = false;
                window.removeEventListener('pageshow', triggerReload);
                window.removeEventListener('focus', triggerReload);
                document.removeEventListener('visibilitychange', triggerReload);
                window.removeEventListener('storage', triggerReloadFromStorage);
                window.removeEventListener('statkiss:editorial-board-updated', triggerReload);
            };
        }, []);

        const lang = state.lang;
        const isDark = !!state.isDark;
        const t = getTranslations(lang);

        React.useEffect(() => {
            ensureFloatingEditButton(t.edit_button || 'Edit');
        }, [t.edit_button]);

        return (
            <div className="flex flex-col">
                <div className="bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/header_blank.png')] bg-no-repeat bg-cover bg-center">
                    <div className="relative py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-1">
                        <Div_header t={t} />

                        <div className="grid grid-cols-1 gap-8 pt-8 lg:pt-12 mt-8 lg:mt-12 border-t border-gray-600 md:grid-cols-2 w-full">
                            <Div_sub_card
                                text={t.contents_card_text}
                                url={'http://www.csam.or.kr/main.html'}
                                url_name={t.visit_label}
                            />
                            <Div_sub_card
                                text={t.submit_card_text}
                                sub_text={t.submit_card_sub_text}
                                url={'http://submit.csam.or.kr/submission/Login.html'}
                                url_name={t.link_label}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8 mt-8 bg-transparent">
                            <Div_sub_card_img
                                img_url={'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kss.png'}
                                text={'pISSN: 2287-7843'}
                            />
                            <Div_sub_card_img
                                img_url={'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kiss.png'}
                                text={'eISSN: 2383-4757'}
                            />
                        </div>
                    </div>
                </div>

                <EditorialBoard payload={board} t={t} isDark={isDark} />
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('div_main'));
}
