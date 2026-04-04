function set_main() {
    'use strict';

    function parseJSONSafe(text, fallback) {
        try {
            return JSON.parse(text);
        } catch (error) {
            return fallback;
        }
    }

    const configEl = document.getElementById('statkiss-pubs-journals-config');
    const RAW_CONFIG = parseJSONSafe((configEl && configEl.textContent) || '{}', {});
    const FALLBACK_LANG_CODES = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];

    const EXTRA_JOURNAL_I18N = {
        en: { manual_card_text: 'A Korean manual for e-submission', manual_label: 'Manual' },
        ko: { manual_card_text: '전자투고 한국어 매뉴얼', manual_label: '매뉴얼' },
        ja: { manual_card_text: '電子投稿の韓国語マニュアル', manual_label: 'マニュアル' },
        'zh-Hans': { manual_card_text: '电子投稿韩文手册', manual_label: '手册' },
        'zh-Hant': { manual_card_text: '電子投稿韓文手冊', manual_label: '手冊' },
    };

    const EDITOR_UI = {
        en: {
            editor_panel: 'Editorial Board Editor',
            version_history: 'Version history',
            public_preview: 'Public preview',
            visible_label: 'Visible on the public page',
            hidden_notice: 'Editorial Board is hidden on the public page.',
            show_board: 'Show Editorial Board',
            hide_board: 'Hide Editorial Board',
            visible_state: 'Visible',
            hidden_state: 'Hidden',
            current_state: 'Current',
            add_role: 'Add role',
            add_person: 'Add person',
            delete_role: 'Delete role',
            delete_person: 'Delete person',
            role_name: 'Role name',
            member_name: 'Name',
            affiliation: 'Affiliation',
            save: 'Save',
            saving: 'Saving…',
            restore: 'Restore',
            restoring: 'Restoring…',
            note_placeholder: 'Optional version note',
            no_roles: 'There are no roles yet. Add a role to start editing.',
            no_versions: 'There is no saved version yet.',
            save_success: 'Editorial Board has been saved.',
            restore_success: 'Editorial Board version has been restored.',
            undo: 'Undo',
            redo: 'Redo',
            move_up: 'Move up',
            move_down: 'Move down',
            keyboard_hint: 'Keyboard: Ctrl/Cmd+Z = undo, Ctrl/Cmd+Y or Cmd+Shift+Z = redo',
            saved_at: 'Saved at',
            action: 'Action',
            roles: 'Roles',
            people: 'People',
            saved_by: 'Saved by',
            open_public: 'Open public page',
            reload: 'Reload',
            load_error_prefix: 'Load failed:',
            save_error_prefix: 'Save failed:',
            restore_error_prefix: 'Restore failed:',
            restore_confirm: 'Restore this version? Unsaved local changes will be replaced.',
            empty_preview: 'There is no Editorial Board content yet.',
        },
        ko: {
            editor_panel: 'Editorial Board 편집',
            version_history: '버전 기록',
            public_preview: '공개 미리보기',
            visible_label: '공개 페이지 표시',
            hidden_notice: '현재 공개 페이지에서 Editorial Board가 숨겨져 있습니다.',
            show_board: 'Editorial Board 보이기',
            hide_board: 'Editorial Board 숨기기',
            visible_state: '표시',
            hidden_state: '숨김',
            current_state: '현재',
            add_role: 'Role 추가',
            add_person: '인원 추가',
            delete_role: 'Role 삭제',
            delete_person: '인원 삭제',
            role_name: 'Role 이름',
            member_name: '이름',
            affiliation: '소속',
            save: '저장',
            saving: '저장 중…',
            restore: '복원',
            restoring: '복원 중…',
            note_placeholder: '버전 메모(선택)',
            no_roles: '아직 Role이 없습니다. Role을 추가해 주세요.',
            no_versions: '아직 저장된 버전이 없습니다.',
            save_success: 'Editorial Board를 저장했습니다.',
            restore_success: 'Editorial Board 버전을 복원했습니다.',
            undo: '되돌리기',
            redo: '다시 실행',
            move_up: '위로',
            move_down: '아래로',
            keyboard_hint: '단축키: Ctrl/Cmd+Z = 되돌리기, Ctrl/Cmd+Y 또는 Cmd+Shift+Z = 다시 실행',
            saved_at: '저장 시각',
            action: '동작',
            roles: 'Role 수',
            people: '인원 수',
            saved_by: '저장자',
            open_public: '공개 페이지 열기',
            reload: '다시 불러오기',
            load_error_prefix: '불러오기 실패:',
            save_error_prefix: '저장 실패:',
            restore_error_prefix: '복원 실패:',
            restore_confirm: '이 버전으로 복원할까요? 저장하지 않은 로컬 변경은 사라집니다.',
            empty_preview: '아직 Editorial Board 내용이 없습니다.',
        },
    };

    const DEFAULT_ROLE_LABEL_KEYS = {
        editor_in_chief: 'editor_in_chief',
        co_editors: 'co_editors',
        honorary_editors: 'honorary_editors',
        managing_editor: 'managing_editor',
        editorial_assistant: 'editorial_assistant',
    };

    const DEFAULT_AFFILIATION_BY_NAME = {
        'seongjoo song': 'aff_seongjoo_song',
        'dongseok choi': 'aff_dongseok_choi',
        'hyemi choi': 'aff_hyemi_choi',
        'wayne fuller': 'aff_wayne_fuller',
        'donald b. rubin': 'aff_donald_rubin',
        'grace wahba': 'aff_grace_wahba',
        'sangbum choi': 'aff_sangbum_choi',
        'jae rim lee': 'aff_jae_rim_lee',
    };

    function pickFirst(values) {
        for (let i = 0; i < values.length; i += 1) {
            const value = String(values[i] || '').trim();
            if (value) return value;
        }
        return '';
    }

    function getHeaderLangKey() {
        return (window.StatKISS_I18N && window.StatKISS_I18N.LANG_KEY) || 'statkiss_lang';
    }

    function normalizeLang(lang) {
        const rawValue = String(lang || 'en').trim();
        const value = rawValue.toLowerCase().replace(/_/g, '-');
        const i18nSource = window.STATKISS_PUBS_JOURNALS_I18N || {};

        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.resolveLangCode === 'function') {
            const resolvedByHeader = window.StatKISS_I18N.resolveLangCode(rawValue);
            if (i18nSource[resolvedByHeader]) return resolvedByHeader;
        }

        const map = {
            'ko': 'ko', 'ko-kr': 'ko', 'en': 'en', 'en-us': 'en', 'en-gb': 'en', 'ja': 'ja', 'ja-jp': 'ja', 'jp': 'ja',
            'zh': 'zh-Hans', 'zh-cn': 'zh-Hans', 'zh-sg': 'zh-Hans', 'zh-hans': 'zh-Hans', 'zh-hans-cn': 'zh-Hans', 'zh-hans-sg': 'zh-Hans',
            'zh-tw': 'zh-Hant', 'zh-hk': 'zh-Hant', 'zh-mo': 'zh-Hant', 'zh-hant': 'zh-Hant', 'zh-hant-tw': 'zh-Hant', 'zh-hant-hk': 'zh-Hant',
            'es': 'es', 'es-es': 'es', 'es-419': 'es', 'fr': 'fr', 'fr-fr': 'fr', 'de': 'de', 'de-de': 'de', 'pt': 'pt-BR', 'pt-br': 'pt-BR',
            'ru': 'ru', 'ru-ru': 'ru', 'id': 'id', 'id-id': 'id', 'vi': 'vi', 'vi-vn': 'vi', 'th': 'th', 'th-th': 'th', 'ms': 'ms', 'ms-my': 'ms',
            'fil': 'fil', 'fil-ph': 'fil', 'tl': 'fil', 'tl-ph': 'fil', 'hi': 'hi', 'hi-in': 'hi', 'ar': 'ar', 'ar-sa': 'ar', 'ar-ae': 'ar',
            'it': 'it', 'it-it': 'it', 'nl': 'nl', 'nl-nl': 'nl', 'pl': 'pl', 'pl-pl': 'pl', 'sv': 'sv', 'sv-se': 'sv', 'tr': 'tr', 'tr-tr': 'tr',
            'uk': 'uk', 'uk-ua': 'uk'
        };
        if (map[value]) return map[value];
        if (i18nSource[rawValue]) return rawValue;
        if (i18nSource[value]) return value;
        if (value.indexOf('zh-') === 0) return value.indexOf('hant') !== -1 || /-(tw|hk|mo)$/.test(value) ? 'zh-Hant' : 'zh-Hans';
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

    function getCurrentLang() {
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
            const winLang = pickFirst([window.currentLang, window.lang, window.__statkiss_lang, window.__lang]);
            const browserLang = (navigator.language || navigator.userLanguage || '').trim();
            return pickFirst([htmlLang, storedLang, headerLang, winLang, RAW_CONFIG.lang, browserLang, 'en']);
        } catch (error) {
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
        return String(event.detail.lang || event.detail.language || event.detail.code || event.detail.value || '').trim();
    }

    function getTranslations(lang) {
        const normalizedLang = normalizeLang(lang);
        const source = window.STATKISS_PUBS_JOURNALS_I18N || {};
        const fallback = source.en || {};
        const current = source[normalizedLang] || fallback;
        const extraFallback = EXTRA_JOURNAL_I18N.en || {};
        const extraCurrent = EXTRA_JOURNAL_I18N[normalizedLang] || {};
        const editorFallback = EDITOR_UI.en || {};
        const editorCurrent = EDITOR_UI[normalizedLang] || {};
        return Object.assign({}, fallback, extraFallback, editorFallback, current, extraCurrent, editorCurrent);
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
            return /(^|\s)dark(\s|$)/.test(htmlClass) || /(^|\s)dark(\s|$)/.test(bodyClass) || String(htmlTheme).toLowerCase() === 'dark' || String(bodyTheme).toLowerCase() === 'dark' || colorScheme;
        } catch (error) {
            return false;
        }
    }

    function inferPubsBasePath() {
        const pathname = window.location.pathname || '/';
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length && FALLBACK_LANG_CODES.indexOf(parts[0]) !== -1) return '/' + parts[0] + '/pubs/';
        return '/pubs/';
    }

    function buildConfig(raw) {
        const pubsBase = inferPubsBasePath();
        return {
            lang: normalizeLang(raw.lang || getCurrentLang()),
            mode: raw.mode === 'edit' ? 'edit' : 'view',
            can_manage_editorial_board: !!raw.can_manage_editorial_board,
            public_url: raw.public_url || (pubsBase + 'journals/'),
            edit_url: raw.edit_url || (pubsBase + 'journals/edit/'),
            api_public_url: raw.api_public_url || (pubsBase + 'ajax_get_editorial_board_public/'),
            api_editor_url: raw.api_editor_url || (pubsBase + 'ajax_get_editorial_board_editor_payload/'),
            api_save_url: raw.api_save_url || (pubsBase + 'ajax_save_editorial_board_editor_payload/'),
            api_restore_url: raw.api_restore_url || (pubsBase + 'ajax_restore_editorial_board_version/'),
        };
    }

    const CONFIG = buildConfig(RAW_CONFIG || {});

    function cleanText(value) {
        return String(value || '').trim();
    }

    function normalizeFlag(value, fallback) {
        if (typeof value === 'boolean') return value ? 1 : 0;
        if (value === null || value === undefined || value === '') return fallback ? 1 : 0;
        return Number(value) ? 1 : 0;
    }

    function deepClone(value) {
        if (typeof structuredClone === 'function') return structuredClone(value);
        return JSON.parse(JSON.stringify(value));
    }

    function createUuidLike() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(letter) {
            const randomValue = Math.random() * 16 | 0;
            const nextValue = letter === 'x' ? randomValue : ((randomValue & 0x3) | 0x8);
            return nextValue.toString(16);
        });
    }

    function slugifyRoleKey(value) {
        return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'editorial_role';
    }

    function normalizeBoardPayload(rawPayload) {
        const raw = rawPayload && typeof rawPayload === 'object' ? rawPayload : {};
        const visible = normalizeFlag(raw.visible !== undefined ? raw.visible : raw.board_visible, 1);
        const sourceSections = Array.isArray(raw.sections) ? raw.sections : (Array.isArray(raw.roles) ? raw.roles : []);
        const sections = sourceSections.map(function(section, sectionIndex) {
            const roleName = cleanText(section && (section.role_name || section.label || section.title || ''));
            const roleKey = cleanText(section && section.role_key) || slugifyRoleKey(roleName || ('role_' + (sectionIndex + 1)));
            const roleUuid = cleanText(section && section.role_uuid) || createUuidLike();
            const sourceItems = Array.isArray(section && section.items) ? section.items : [];
            const items = sourceItems.map(function(item, itemIndex) {
                return {
                    item_uuid: cleanText(item && item.item_uuid) || createUuidLike(),
                    name: cleanText(item && item.name),
                    affiliation: cleanText(item && item.affiliation),
                    person_order: Number(item && item.person_order) || (itemIndex + 1),
                };
            }).filter(function(item) {
                return item.name || item.affiliation;
            });
            return {
                role_uuid: roleUuid,
                role_key: roleKey,
                role_name: roleName || roleKey,
                role_order: Number(section && section.role_order) || (sectionIndex + 1),
                items: items,
            };
        }).filter(function(section) {
            return section.role_name || section.items.length;
        }).sort(function(left, right) {
            return (left.role_order || 0) - (right.role_order || 0);
        }).map(function(section, index) {
            return Object.assign({}, section, { role_order: index + 1, items: section.items.map(function(item, itemIndex) {
                return Object.assign({}, item, { person_order: itemIndex + 1 });
            }) });
        });
        return {
            visible: visible,
            sections: sections,
        };
    }

    function serializeBoardPayload(board, note) {
        const normalized = normalizeBoardPayload(board);
        return {
            visible: normalized.visible,
            board_visible: normalized.visible,
            sections: normalized.sections,
            roles: normalized.sections,
            note: cleanText(note),
        };
    }

    function normalizeVersions(rawVersions) {
        return (Array.isArray(rawVersions) ? rawVersions : []).map(function(versionRow) {
            return {
                version_uuid: cleanText(versionRow && (versionRow.version_uuid || versionRow.uuid)),
                version_seq: Number(versionRow && versionRow.version_seq) || 0,
                created_at: cleanText(versionRow && versionRow.created_at),
                action: cleanText(versionRow && versionRow.action) || 'save',
                source_version_uuid: cleanText(versionRow && versionRow.source_version_uuid),
                visible: normalizeFlag(versionRow && (versionRow.visible !== undefined ? versionRow.visible : versionRow.board_visible), 1),
                role_count: Number(versionRow && versionRow.role_count) || 0,
                item_count: Number(versionRow && (versionRow.item_count !== undefined ? versionRow.item_count : versionRow.member_count)) || 0,
                note: cleanText(versionRow && versionRow.note),
                actor_name: cleanText(versionRow && versionRow.actor_name),
                actor_email: cleanText(versionRow && versionRow.actor_email),
                actor_uuid_user: cleanText(versionRow && versionRow.actor_uuid_user),
            };
        });
    }

    async function fetchJson(url, options) {
        const response = await fetch(url, Object.assign({ credentials: 'same-origin' }, options || {}));
        const data = await response.json();
        if (!response.ok || !data || data.ok === false) {
            throw new Error((data && data.message) || ('HTTP ' + response.status));
        }
        return data;
    }

    function roleDisplayName(section, t) {
        const translationKey = DEFAULT_ROLE_LABEL_KEYS[cleanText(section && section.role_key)];
        if (translationKey && t[translationKey]) return t[translationKey];
        return cleanText(section && section.role_name) || cleanText(section && section.role_key);
    }

    function affiliationDisplay(item, t) {
        const translationKey = DEFAULT_AFFILIATION_BY_NAME[cleanText(item && item.name).toLowerCase()];
        if (translationKey && t[translationKey]) return t[translationKey];
        return cleanText(item && item.affiliation);
    }

    function Div_sub_card(props) {
        return (
            <div className="bg-transparent">
                <h2 className={props.isDark ? 'mb-1 text-md text-white' : 'mb-1 text-md text-gray-900'}>{props.text}</h2>
                {props.sub_text ? <h2 className={props.isDark ? 'mb-1 text-sm text-gray-300' : 'mb-1 text-sm text-gray-600'}>{props.sub_text}</h2> : null}
                <a
                    href={props.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline"
                >
                    {props.url_name}
                    <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </a>
            </div>
        );
    }

    function Div_sub_card_img(props) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 bg-transparent">
                <img className="h-24 bg-transparent" src={props.img_url} alt={props.text} />
                <h2 className={props.isDark ? 'mb-1 text-sm text-white' : 'mb-1 text-sm text-gray-900'}>{props.text}</h2>
            </div>
        );
    }

    function Div_person_li(props) {
        return (
            <li className="flex items-start">
                <svg className={props.isDark ? 'mt-1 mr-2 h-4 w-4 shrink-0 text-white' : 'mt-1 mr-2 h-4 w-4 shrink-0 text-gray-700'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="currentColor"></path>
                </svg>
                <div className="flex flex-col">
                    <span className={props.isDark ? 'text-md font-medium text-white' : 'text-md text-gray-900'}>{props.name}</span>
                    <span className={props.isDark ? 'text-xs text-gray-200' : 'text-xs text-gray-500'}>({props.affiliation})</span>
                </div>
            </li>
        );
    }

    function Div_header(props) {
        const t = props.t;
        return (
            <div className="mb-6 max-w-screen-lg lg:mb-0">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-red-900 md:text-5xl lg:text-6xl">{t.header_title}</h1>
                <p className={props.isDark ? 'mb-6 font-bold text-white lg:mb-8 md:text-lg lg:text-xl' : 'mb-6 font-bold text-gray-900 lg:mb-8 md:text-lg lg:text-xl'}>{t.header_subtitle}</p>
                <p className={props.isDark ? 'mb-6 font-light text-white lg:mb-8 md:text-md lg:text-sm leading-7' : 'mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7'}>
                    <a href="http://csam.or.kr/" target="_blank" rel="noreferrer" className="underline text-blue-600">{t.header_link_label}</a>{' '}
                    {t.header_paragraph_1_after_link}
                </p>
                <p className={props.isDark ? 'mb-6 font-light text-white lg:mb-8 md:text-md lg:text-sm leading-7' : 'mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7'}>{t.header_paragraph_2}</p>
                <br />
                <p className={props.isDark ? 'mb-6 font-light text-white lg:mb-8 md:text-md lg:text-sm leading-7' : 'mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7'}>{t.header_paragraph_3}</p>
            </div>
        );
    }

    function EditorialBoardPublic(props) {
        const payload = normalizeBoardPayload(props.payload);
        if (!payload.visible) return null;
        if (!payload.sections.length) {
            if (!props.showEmptyMessage) return null;
            return (
                <div className="px-4 mx-auto max-w-screen-xl py-8">
                    <h2 className={props.isDark ? 'mb-8 text-2xl font-bold text-white' : 'mb-8 text-2xl font-bold text-gray-900'}>{props.t.editorial_board_title}</h2>
                    <p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.empty_preview}</p>
                </div>
            );
        }
        const editorialBoardTitleClass = props.isDark ? 'mb-8 text-2xl font-bold text-white' : 'mb-8 text-2xl font-bold text-gray-900';
        const editorialRoleClass = props.isDark ? 'text-md leading-tight text-white' : 'text-md leading-tight text-gray-700';
        return (
            <div className="px-4 mx-auto max-w-screen-xl py-8">
                <h2 className={editorialBoardTitleClass}>{props.t.editorial_board_title}</h2>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                    {payload.sections.map(function(section) {
                        return (
                            <div className="w-full max-w-full md:max-w-xs" key={section.role_uuid || section.role_key}>
                                <div className="mb-2 flex min-h-[50px] w-full flex-col items-center justify-center text-center">
                                    <p className={editorialRoleClass}>{roleDisplayName(section, props.t)}</p>
                                </div>
                                <ul className="m-0 max-w-md list-none space-y-1 p-0">
                                    {section.items.map(function(item) {
                                        return <Div_person_li key={item.item_uuid} isDark={props.isDark} name={item.name} affiliation={affiliationDisplay(item, props.t)} />;
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function IconButton(props) {
        const className = props.className || '';
        return (
            <button type="button" onClick={props.onClick} title={props.title} aria-label={props.title} disabled={props.disabled} className={className}>
                {props.children}
            </button>
        );
    }

    function UndoIcon() {
        return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 14 4 9l5-5"></path><path d="M20 20a8 8 0 0 0-8-8H4"></path></svg>;
    }
    function RedoIcon() {
        return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 14 5-5-5-5"></path><path d="M4 20a8 8 0 0 1 8-8h8"></path></svg>;
    }
    function UpIcon() {
        return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"></path></svg>;
    }
    function DownIcon() {
        return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"></path></svg>;
    }
    function TrashIcon() {
        return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="m19 6-1 14H6L5 6"></path></svg>;
    }

    function VersionHistory(props) {
        const versions = props.versions || [];
        const cardClass = props.isDark ? 'rounded-2xl border border-white/10 bg-slate-900/70 p-4' : 'rounded-2xl border border-gray-200 bg-gray-50 p-4';
        const restoreBtnClass = props.isDark ? 'inline-flex items-center rounded-xl border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-100 hover:bg-white/5' : 'inline-flex items-center rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100';
        if (!versions.length) {
            return <div className={cardClass}><p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.no_versions}</p></div>;
        }
        return (
            <div className="grid gap-3">
                {versions.map(function(version) {
                    const isCurrent = props.currentVersionUuid && props.currentVersionUuid === version.version_uuid;
                    return (
                        <div key={version.version_uuid || version.version_seq} className={cardClass}>
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={props.isDark ? 'rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-gray-100' : 'rounded-full bg-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700'}>{version.action || props.t.action}</span>
                                        <span className={version.visible ? 'rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200' : 'rounded-full bg-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200'}>{version.visible ? props.t.visible_state : props.t.hidden_state}</span>
                                        {isCurrent ? <span className="rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-semibold text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-200">{props.t.current_state}</span> : null}
                                    </div>
                                    <p className={props.isDark ? 'text-sm text-white' : 'text-sm text-gray-900'}>{props.t.saved_at}: {version.created_at || '-'}</p>
                                    <p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.roles}: {version.role_count || 0} · {props.t.people}: {version.item_count || 0}</p>
                                    {(version.actor_name || version.actor_email) ? <p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.saved_by}: {version.actor_name || version.actor_email}</p> : null}
                                    {version.note ? <p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{version.note}</p> : null}
                                </div>
                                <div>
                                    <button type="button" onClick={function() { props.onRestore(version.version_uuid); }} className={restoreBtnClass} disabled={props.isBusy}>{props.isBusy ? props.t.restoring : props.t.restore}</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    function EditorPanel(props) {
        const shellClass = props.isDark ? 'mt-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur' : 'mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl';
        const cardClass = props.isDark ? 'rounded-2xl border border-white/10 bg-slate-900/70 p-4' : 'rounded-2xl border border-gray-200 bg-gray-50 p-4';
        const inputClass = props.isDark ? 'w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-400' : 'w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-fuchsia-500';
        const subtleBtn = props.isDark ? 'inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5' : 'inline-flex items-center gap-1 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100';
        const iconBtn = props.isDark ? 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-100 hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed' : 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed';
        const primaryBtn = 'inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-50';
        const sections = props.board.sections || [];

        return (
            <div className="px-4 mx-auto max-w-screen-xl py-8">
                <div className={shellClass}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className={props.isDark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-900'}>{props.t.editor_panel}</h2>
                            <p className={props.isDark ? 'mt-2 text-sm text-gray-300' : 'mt-2 text-sm text-gray-600'}>{props.board.visible ? props.t.visible_label : props.t.hidden_notice}</p>
                            <p className={props.isDark ? 'mt-1 text-xs text-gray-400' : 'mt-1 text-xs text-gray-500'}>{props.t.keyboard_hint}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <IconButton title={props.t.undo} onClick={props.onUndo} className={iconBtn} disabled={!props.canUndo}><UndoIcon /></IconButton>
                            <IconButton title={props.t.redo} onClick={props.onRedo} className={iconBtn} disabled={!props.canRedo}><RedoIcon /></IconButton>
                            <label className={subtleBtn + ' cursor-pointer'}>
                                <input type="checkbox" className="mr-2" checked={!!props.board.visible} onChange={function(event) { props.onToggleVisible(event.target.checked ? 1 : 0); }} />
                                {props.board.visible ? props.t.hide_board : props.t.show_board}
                            </label>
                            <button type="button" onClick={props.onReload} className={subtleBtn}>{props.t.reload}</button>
                            <button type="button" onClick={props.onAddRole} className={subtleBtn}>{props.t.add_role}</button>
                            <button type="button" onClick={props.onSave} className={primaryBtn} disabled={props.isSaving}>{props.isSaving ? props.t.saving : props.t.save}</button>
                        </div>
                    </div>

                    {props.notice ? <div className={props.isDark ? 'mt-4 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-3 text-sm text-fuchsia-200' : 'mt-4 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-sm text-fuchsia-700'}>{props.notice}</div> : null}
                    {props.error ? <div className={props.isDark ? 'mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200' : 'mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'}>{props.error}</div> : null}

                    <div className="mt-4">
                        <input type="text" className={inputClass} value={props.note} onChange={function(event) { props.onNoteChange(event.target.value); }} placeholder={props.t.note_placeholder} />
                    </div>

                    <div className="mt-6 grid gap-4">
                        {!sections.length ? <div className={cardClass}><p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.no_roles}</p></div> : null}
                        {sections.map(function(section, sectionIndex) {
                            return (
                                <div className={cardClass} key={section.role_uuid || section.role_key || sectionIndex}>
                                    <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
                                        <div>
                                            <label className={props.isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{props.t.role_name}</label>
                                            <input type="text" className={inputClass} value={section.role_name || ''} onChange={function(event) { props.onChangeRoleName(sectionIndex, event.target.value); }} />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                            <IconButton title={props.t.move_up} onClick={function() { props.onMoveRole(sectionIndex, -1); }} className={iconBtn} disabled={sectionIndex === 0}><UpIcon /></IconButton>
                                            <IconButton title={props.t.move_down} onClick={function() { props.onMoveRole(sectionIndex, 1); }} className={iconBtn} disabled={sectionIndex === sections.length - 1}><DownIcon /></IconButton>
                                            <IconButton title={props.t.delete_role} onClick={function() { props.onDeleteRole(sectionIndex); }} className={iconBtn}><TrashIcon /></IconButton>
                                            <button type="button" onClick={function() { props.onAddPerson(sectionIndex); }} className={subtleBtn}>{props.t.add_person}</button>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid gap-3">
                                        {!section.items.length ? <p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.empty_preview}</p> : null}
                                        {section.items.map(function(item, itemIndex) {
                                            return (
                                                <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-center" key={item.item_uuid || itemIndex}>
                                                    <div>
                                                        <label className={props.isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{props.t.member_name}</label>
                                                        <input type="text" className={inputClass} value={item.name || ''} onChange={function(event) { props.onChangePerson(sectionIndex, itemIndex, 'name', event.target.value); }} />
                                                    </div>
                                                    <div>
                                                        <label className={props.isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{props.t.affiliation}</label>
                                                        <input type="text" className={inputClass} value={item.affiliation || ''} onChange={function(event) { props.onChangePerson(sectionIndex, itemIndex, 'affiliation', event.target.value); }} />
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                                        <IconButton title={props.t.move_up} onClick={function() { props.onMovePerson(sectionIndex, itemIndex, -1); }} className={iconBtn} disabled={itemIndex === 0}><UpIcon /></IconButton>
                                                        <IconButton title={props.t.move_down} onClick={function() { props.onMovePerson(sectionIndex, itemIndex, 1); }} className={iconBtn} disabled={itemIndex === section.items.length - 1}><DownIcon /></IconButton>
                                                        <IconButton title={props.t.delete_person} onClick={function() { props.onDeletePerson(sectionIndex, itemIndex); }} className={iconBtn}><TrashIcon /></IconButton>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6 dark:border-white/10">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <h3 className={props.isDark ? 'text-xl font-bold text-white' : 'text-xl font-bold text-gray-900'}>{props.t.version_history}</h3>
                            <a href={CONFIG.public_url} className={subtleBtn}>{props.t.open_public}</a>
                        </div>
                        <VersionHistory t={props.t} versions={props.versions} isDark={props.isDark} onRestore={props.onRestoreVersion} isBusy={props.isRestoring} currentVersionUuid={props.currentVersionUuid} />
                    </div>
                </div>
            </div>
        );
    }

    function App() {
        const initialLang = normalizeLang(getCurrentLang());
        const [state, setState] = React.useState({
            lang: initialLang,
            i18nFingerprint: getI18nFingerprint(),
            isDark: isDarkModeEnabled(),
            isLoading: true,
            loadError: '',
            notice: '',
            publicBoard: normalizeBoardPayload({ visible: 1, sections: [] }),
            editorBoard: normalizeBoardPayload({ visible: 1, sections: [] }),
            versions: [],
            currentVersionUuid: '',
            note: '',
            isSaving: false,
            isRestoring: false,
            undoStack: [],
            redoStack: [],
        });

        const isEditMode = CONFIG.mode === 'edit';

        const loadBoardPayload = React.useCallback(async function() {
            const url = isEditMode ? CONFIG.api_editor_url : CONFIG.api_public_url;
            setState(function(previous) {
                return Object.assign({}, previous, { isLoading: true, loadError: '', notice: '' });
            });
            try {
                const data = await fetchJson(url, {});
                const normalizedBoard = normalizeBoardPayload(data);
                setState(function(previous) {
                    return Object.assign({}, previous, {
                        isLoading: false,
                        loadError: '',
                        publicBoard: normalizedBoard,
                        editorBoard: normalizedBoard,
                        versions: normalizeVersions(data.versions),
                        currentVersionUuid: cleanText(data.current_version_uuid || data.saved_version_uuid),
                        undoStack: [],
                        redoStack: [],
                    });
                });
            } catch (error) {
                const message = (error && error.message) || 'Failed to load.';
                setState(function(previous) {
                    return Object.assign({}, previous, {
                        isLoading: false,
                        loadError: message,
                        versions: [],
                    });
                });
            }
        }, [isEditMode]);

        React.useEffect(function() {
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
                    setState(function(previous) {
                        return Object.assign({}, previous, {
                            lang: nextLang,
                            i18nFingerprint: nextFingerprint,
                            isDark: nextIsDark,
                        });
                    });
                }
            }

            const events = ['languagechange', 'statkiss:languagechange', 'i18n:change', 'langchange'];
            events.forEach(function(eventName) { window.addEventListener(eventName, syncLang); });
            window.addEventListener('storage', syncLang);

            const observer = new MutationObserver(syncLang);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir', 'class', 'data-theme', 'theme'] });
            if (document.body) {
                observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme', 'theme'] });
            }

            const timer = window.setInterval(syncLang, 500);
            syncLang(null);

            return function() {
                events.forEach(function(eventName) { window.removeEventListener(eventName, syncLang); });
                window.removeEventListener('storage', syncLang);
                observer.disconnect();
                window.clearInterval(timer);
            };
        }, []);

        React.useEffect(function() {
            loadBoardPayload();
        }, [loadBoardPayload]);

        React.useEffect(function() {
            if (!isEditMode) return undefined;
            function handleKeyDown(event) {
                const isMeta = event.metaKey || event.ctrlKey;
                if (!isMeta) return;
                const key = String(event.key || '').toLowerCase();
                if (key === 'z' && !event.shiftKey) {
                    event.preventDefault();
                    setState(function(previous) {
                        if (!previous.undoStack.length) return previous;
                        const undoStack = previous.undoStack.slice();
                        const restoredBoard = undoStack.pop();
                        const redoStack = previous.redoStack.concat([deepClone(previous.editorBoard)]).slice(-120);
                        return Object.assign({}, previous, {
                            editorBoard: normalizeBoardPayload(restoredBoard),
                            publicBoard: normalizeBoardPayload(restoredBoard),
                            undoStack: undoStack,
                            redoStack: redoStack,
                            notice: '',
                        });
                    });
                } else if (key === 'y' || (key === 'z' && event.shiftKey)) {
                    event.preventDefault();
                    setState(function(previous) {
                        if (!previous.redoStack.length) return previous;
                        const redoStack = previous.redoStack.slice();
                        const restoredBoard = redoStack.pop();
                        const undoStack = previous.undoStack.concat([deepClone(previous.editorBoard)]).slice(-120);
                        return Object.assign({}, previous, {
                            editorBoard: normalizeBoardPayload(restoredBoard),
                            publicBoard: normalizeBoardPayload(restoredBoard),
                            undoStack: undoStack,
                            redoStack: redoStack,
                            notice: '',
                        });
                    });
                }
            }
            window.addEventListener('keydown', handleKeyDown);
            return function() {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [isEditMode]);

        function updateBoard(mutator) {
            setState(function(previous) {
                const currentBoard = deepClone(previous.editorBoard);
                const nextBoard = normalizeBoardPayload(mutator(deepClone(previous.editorBoard)));
                return Object.assign({}, previous, {
                    editorBoard: nextBoard,
                    publicBoard: nextBoard,
                    undoStack: previous.undoStack.concat([currentBoard]).slice(-120),
                    redoStack: [],
                    notice: '',
                });
            });
        }

        function handleUndo() {
            setState(function(previous) {
                if (!previous.undoStack.length) return previous;
                const undoStack = previous.undoStack.slice();
                const restoredBoard = undoStack.pop();
                const redoStack = previous.redoStack.concat([deepClone(previous.editorBoard)]).slice(-120);
                return Object.assign({}, previous, {
                    editorBoard: normalizeBoardPayload(restoredBoard),
                    publicBoard: normalizeBoardPayload(restoredBoard),
                    undoStack: undoStack,
                    redoStack: redoStack,
                    notice: '',
                });
            });
        }

        function handleRedo() {
            setState(function(previous) {
                if (!previous.redoStack.length) return previous;
                const redoStack = previous.redoStack.slice();
                const restoredBoard = redoStack.pop();
                const undoStack = previous.undoStack.concat([deepClone(previous.editorBoard)]).slice(-120);
                return Object.assign({}, previous, {
                    editorBoard: normalizeBoardPayload(restoredBoard),
                    publicBoard: normalizeBoardPayload(restoredBoard),
                    undoStack: undoStack,
                    redoStack: redoStack,
                    notice: '',
                });
            });
        }

        function handleToggleVisible(nextVisible) {
            updateBoard(function(board) {
                board.visible = nextVisible ? 1 : 0;
                return board;
            });
        }

        function handleAddRole() {
            updateBoard(function(board) {
                board.sections.push({
                    role_uuid: createUuidLike(),
                    role_key: 'editorial_role_' + (board.sections.length + 1),
                    role_name: '',
                    role_order: board.sections.length + 1,
                    items: [],
                });
                return board;
            });
        }

        function handleDeleteRole(sectionIndex) {
            updateBoard(function(board) {
                board.sections.splice(sectionIndex, 1);
                return board;
            });
        }

        function handleMoveRole(sectionIndex, direction) {
            updateBoard(function(board) {
                const targetIndex = sectionIndex + direction;
                if (targetIndex < 0 || targetIndex >= board.sections.length) return board;
                const moved = board.sections.splice(sectionIndex, 1)[0];
                board.sections.splice(targetIndex, 0, moved);
                return board;
            });
        }

        function handleChangeRoleName(sectionIndex, nextName) {
            updateBoard(function(board) {
                const section = board.sections[sectionIndex];
                if (!section) return board;
                section.role_name = nextName;
                if (!cleanText(section.role_key) || cleanText(section.role_key).indexOf('editorial_role_') === 0) {
                    section.role_key = slugifyRoleKey(nextName || section.role_key || ('editorial_role_' + (sectionIndex + 1)));
                }
                return board;
            });
        }

        function handleAddPerson(sectionIndex) {
            updateBoard(function(board) {
                const section = board.sections[sectionIndex];
                if (!section) return board;
                section.items.push({ item_uuid: createUuidLike(), name: '', affiliation: '', person_order: section.items.length + 1 });
                return board;
            });
        }

        function handleDeletePerson(sectionIndex, itemIndex) {
            updateBoard(function(board) {
                const section = board.sections[sectionIndex];
                if (!section) return board;
                section.items.splice(itemIndex, 1);
                return board;
            });
        }

        function handleMovePerson(sectionIndex, itemIndex, direction) {
            updateBoard(function(board) {
                const section = board.sections[sectionIndex];
                if (!section) return board;
                const targetIndex = itemIndex + direction;
                if (targetIndex < 0 || targetIndex >= section.items.length) return board;
                const moved = section.items.splice(itemIndex, 1)[0];
                section.items.splice(targetIndex, 0, moved);
                return board;
            });
        }

        function handleChangePerson(sectionIndex, itemIndex, fieldName, value) {
            updateBoard(function(board) {
                const section = board.sections[sectionIndex];
                if (!section || !section.items[itemIndex]) return board;
                section.items[itemIndex][fieldName] = value;
                return board;
            });
        }

        async function handleSave() {
            setState(function(previous) {
                return Object.assign({}, previous, { isSaving: true, notice: '', loadError: '' });
            });
            try {
                const payload = serializeBoardPayload(state.editorBoard, state.note);
                const data = await fetchJson(CONFIG.api_save_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const normalizedBoard = normalizeBoardPayload(data);
                setState(function(previous) {
                    return Object.assign({}, previous, {
                        isSaving: false,
                        notice: data.message || getTranslations(previous.lang).save_success,
                        loadError: '',
                        publicBoard: normalizedBoard,
                        editorBoard: normalizedBoard,
                        versions: normalizeVersions(data.versions),
                        currentVersionUuid: cleanText(data.current_version_uuid || data.saved_version_uuid),
                        note: '',
                        undoStack: [],
                        redoStack: [],
                    });
                });
            } catch (error) {
                const translated = getTranslations(state.lang);
                setState(function(previous) {
                    return Object.assign({}, previous, {
                        isSaving: false,
                        loadError: translated.save_error_prefix + ' ' + ((error && error.message) || ''),
                    });
                });
            }
        }

        async function handleRestoreVersion(versionUuid) {
            const translated = getTranslations(state.lang);
            if (!window.confirm(translated.restore_confirm)) return;
            setState(function(previous) {
                return Object.assign({}, previous, { isRestoring: true, notice: '', loadError: '' });
            });
            try {
                const data = await fetchJson(CONFIG.api_restore_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ version_uuid: versionUuid }),
                });
                const normalizedBoard = normalizeBoardPayload(data);
                setState(function(previous) {
                    return Object.assign({}, previous, {
                        isRestoring: false,
                        notice: data.message || translated.restore_success,
                        loadError: '',
                        publicBoard: normalizedBoard,
                        editorBoard: normalizedBoard,
                        versions: normalizeVersions(data.versions),
                        currentVersionUuid: cleanText(data.current_version_uuid || data.saved_version_uuid),
                        note: '',
                        undoStack: [],
                        redoStack: [],
                    });
                });
            } catch (error) {
                setState(function(previous) {
                    return Object.assign({}, previous, {
                        isRestoring: false,
                        loadError: translated.restore_error_prefix + ' ' + ((error && error.message) || ''),
                    });
                });
            }
        }

        const t = getTranslations(state.lang);
        const boardForRender = isEditMode ? state.editorBoard : state.publicBoard;
        const renderError = state.loadError ? (isEditMode ? state.loadError : '') : '';

        return (
            <div className="flex flex-col">
                <div className="bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/header_blank.png')] bg-cover bg-center bg-no-repeat">
                    <div className="relative z-[1] mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
                        <Div_header t={t} isDark={state.isDark} />

                        <div className="mt-8 grid w-full grid-cols-1 gap-8 border-t border-gray-600 pt-8 lg:mt-12 lg:pt-12 md:grid-cols-3">
                            <Div_sub_card isDark={state.isDark} text={t.contents_card_text} url={'http://www.csam.or.kr/main.html'} url_name={t.visit_label} />
                            <Div_sub_card isDark={state.isDark} text={t.submit_card_text} sub_text={t.submit_card_sub_text} url={'http://submit.csam.or.kr/submission/Login.html'} url_name={t.link_label} />
                            <Div_sub_card isDark={state.isDark} text={t.manual_card_text} url={'https://www.statkiss.org/wp-content/uploads/2014/11/Author_manual_Kor.pdf'} url_name={t.manual_label} />
                        </div>

                        <div className="mt-8 flex w-full flex-col items-center justify-center gap-8 sm:flex-row">
                            <Div_sub_card_img isDark={state.isDark} img_url={'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kss.png'} text={'pISSN: 2287-7843'} />
                            <Div_sub_card_img isDark={state.isDark} img_url={'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kiss.png'} text={'eISSN: 2383-4757'} />
                        </div>
                    </div>
                </div>

                {state.loadError && !isEditMode ? null : <EditorialBoardPublic payload={boardForRender} isDark={state.isDark} t={t} showEmptyMessage={isEditMode} />}

                {isEditMode ? (
                    <EditorPanel
                        t={t}
                        isDark={state.isDark}
                        board={state.editorBoard}
                        versions={state.versions}
                        currentVersionUuid={state.currentVersionUuid}
                        note={state.note}
                        isSaving={state.isSaving}
                        isRestoring={state.isRestoring}
                        canUndo={state.undoStack.length > 0}
                        canRedo={state.redoStack.length > 0}
                        notice={state.notice}
                        error={renderError}
                        onUndo={handleUndo}
                        onRedo={handleRedo}
                        onToggleVisible={handleToggleVisible}
                        onReload={loadBoardPayload}
                        onAddRole={handleAddRole}
                        onDeleteRole={handleDeleteRole}
                        onMoveRole={handleMoveRole}
                        onChangeRoleName={handleChangeRoleName}
                        onAddPerson={handleAddPerson}
                        onDeletePerson={handleDeletePerson}
                        onMovePerson={handleMovePerson}
                        onChangePerson={handleChangePerson}
                        onNoteChange={function(value) { setState(function(previous) { return Object.assign({}, previous, { note: value }); }); }}
                        onSave={handleSave}
                        onRestoreVersion={handleRestoreVersion}
                    />
                ) : null}
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('div_main'));
}
