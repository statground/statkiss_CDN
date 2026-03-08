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

        if (map[value]) {
            return map[value];
        }

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

    function getTranslations() {
        const lang = normalizeLang(getCurrentLang());
        const fallback = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N.en) || {};
        const current = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N[lang]) || fallback;
        return Object.assign({}, fallback, current);
    }

    function Div_sub_card(props) {
        return (
            <div>
                <h2 class="mb-1 text-md text-gray-900">{props.text}</h2>
                {props.sub_text ? <h2 class="mb-1 text-sm text-gray-600">{props.sub_text}</h2> : null}
                <a
                    href={props.url}
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline text-blue-600"
                >
                    {props.url_name}
                    <svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        )
    }

    function Div_sub_card_img(props) {
        return (
            <div class="flex flex-col justify-center items-center space-y-4">
                <img class="h-24" src={props.img_url} alt={props.text} />
                <h2 class="mb-1 text-sm text-gray-900">{props.text}</h2>
            </div>
        )
    }

    function Div_person_li(props) {
        return (
            <li class="flex items-start">
                <svg class="w-4 h-4 mr-2 mt-1 shrink-0 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="currentColor"></path>
                </svg>
                <div class="flex flex-col">
                    <span class="text-md text-gray-900 dark:text-gray-100">{props.name}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-300">({props.affiliation})</span>
                </div>
            </li>
        )
    }

    function Div_header(props) {
        const t = props.t;
        return (
            <div class="mb-6 max-w-screen-lg lg:mb-0">
                <h1 class="mb-4 text-4xl font-extrabold text-red-900 tracking-tight leading-none md:text-5xl lg:text-6xl">
                    {t.header_title}
                </h1>
                <p class="mb-6 font-bold text-gray-900 lg:mb-8 md:text-lg lg:text-xl">
                    {t.header_subtitle}
                </p>

                <p class="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7">
                    <a href="http://csam.or.kr/" target="_blank" rel="noreferrer" class="underline text-blue-600">
                        {t.header_link_label}
                    </a>{' '}
                    {t.header_paragraph_1_after_link}
                </p>
                <p class="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7">
                    {t.header_paragraph_2}
                </p>
                <br />
                <p class="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7">
                    {t.header_paragraph_3}
                </p>
            </div>
        )
    }

    function App() {
        const initialLang = normalizeLang(getCurrentLang());
        const [state, setState] = React.useState({
            lang: initialLang,
            i18nFingerprint: getI18nFingerprint()
        });

        React.useEffect(() => {
            let lastLang = normalizeLang(getCurrentLang());
            let lastFingerprint = getI18nFingerprint();

            function syncLang(event) {
                const hintedLang = extractLangFromEvent(event);
                const nextLang = normalizeLang(hintedLang || getCurrentLang());
                const nextFingerprint = getI18nFingerprint();

                if (nextLang !== lastLang || nextFingerprint !== lastFingerprint) {
                    lastLang = nextLang;
                    lastFingerprint = nextFingerprint;
                    setState({
                        lang: nextLang,
                        i18nFingerprint: nextFingerprint
                    });
                }
            }

            const events = ['languagechange', 'statkiss:languagechange', 'i18n:change', 'langchange'];
            events.forEach((eventName) => window.addEventListener(eventName, syncLang));
            window.addEventListener('storage', syncLang);

            const observer = new MutationObserver(syncLang);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

            const timer = window.setInterval(syncLang, 500);
            syncLang();

            return () => {
                events.forEach((eventName) => window.removeEventListener(eventName, syncLang));
                window.removeEventListener('storage', syncLang);
                observer.disconnect();
                window.clearInterval(timer);
            };
        }, []);

        const lang = state.lang;
        const fallback = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N.en) || {};
        const current = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N[lang]) || fallback;
        const t = Object.assign({}, fallback, current);

        return (
            <div class="flex flex-col">
                <div class="bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/header_blank.png')] bg-no-repeat bg-cover bg-center">
                    <div class="relative py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-1">
                        <Div_header t={t} />

                        <div class="grid grid-cols-1 gap-8 pt-8 lg:pt-12 mt-8 lg:mt-12 border-t border-gray-600 md:grid-cols-2 w-full">
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

                        <div class="flex flex-col sm:flex-row justify-center items-center w-full gap-8 mt-8">
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

                <div class="px-4 mx-auto max-w-screen-xl py-8">
                    <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">{t.editorial_board_title}</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div class="w-full max-w-full md:max-w-xs">
                            <div class="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                <p class="text-md leading-tight text-gray-700 dark:text-gray-200">{t.editor_in_chief}</p>
                            </div>
                            <ul class="max-w-md space-y-1 text-gray-500 dark:text-gray-300 list-disc list-inside">
                                <Div_person_li name={'Seongjoo Song'} affiliation={'Korea University, Korea'} />
                            </ul>
                        </div>

                        <div class="w-full max-w-full md:max-w-xs">
                            <div class="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                <p class="text-md leading-tight text-gray-700 dark:text-gray-200">{t.co_editors}</p>
                            </div>
                            <ul class="max-w-md space-y-1 text-gray-500 dark:text-gray-300 list-disc list-inside">
                                <Div_person_li name={'Dongseok Choi'} affiliation={'Oregon Health and Science University, USA'} />
                                <Div_person_li name={'Hyemi Choi'} affiliation={'Chonbuk National University, Korea'} />
                            </ul>
                        </div>

                        <div class="w-full max-w-full md:max-w-xs">
                            <div class="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                <p class="text-md leading-tight text-gray-700 dark:text-gray-200">{t.honorary_editors}</p>
                            </div>
                            <ul class="max-w-md space-y-1 text-gray-500 dark:text-gray-300 list-disc list-inside">
                                <Div_person_li name={'Wayne Fuller'} affiliation={'Iowa State University, USA'} />
                                <Div_person_li name={'Donald B. Rubin'} affiliation={'Harvard University, USA'} />
                                <Div_person_li name={'Grace Wahba'} affiliation={'University of Wisconsin-Madison, USA'} />
                            </ul>
                        </div>

                        <div class="w-full max-w-full md:max-w-xs">
                            <div class="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                <p class="text-md leading-tight text-gray-700 dark:text-gray-200">{t.managing_editor}</p>
                            </div>
                            <ul class="max-w-md space-y-1 text-gray-500 dark:text-gray-300 list-disc list-inside">
                                <Div_person_li name={'Sangbum Choi'} affiliation={'Korea University, Korea'} />
                            </ul>
                        </div>

                        <div class="w-full max-w-full md:max-w-xs">
                            <div class="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                <p class="text-md leading-tight text-gray-700 dark:text-gray-200">{t.editorial_assistant}</p>
                            </div>
                            <ul class="max-w-md space-y-1 text-gray-500 dark:text-gray-300 list-disc list-inside">
                                <Div_person_li name={'Jae Rim Lee'} affiliation={'Korean Statistical Society, Korea'} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('div_main'));
}
