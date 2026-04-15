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

    function normalizeLang(lang) {
        const rawValue = String(lang || 'en').trim();
        const value = rawValue.toLowerCase().replace(/_/g, '-');
        const dict = (window.STATKISS_PUBS_JOURNALS_EDIT_I18N && window.STATKISS_PUBS_JOURNALS_EDIT_I18N.dict) || {};
        const map = {
            'ko': 'ko', 'ko-kr': 'ko',
            'en': 'en', 'en-us': 'en', 'en-gb': 'en',
            'ja': 'ja', 'ja-jp': 'ja', 'jp': 'ja',
            'zh': 'zh-Hans', 'zh-cn': 'zh-Hans', 'zh-sg': 'zh-Hans', 'zh-hans': 'zh-Hans',
            'zh-tw': 'zh-Hant', 'zh-hk': 'zh-Hant', 'zh-mo': 'zh-Hant', 'zh-hant': 'zh-Hant',
            'es': 'es', 'fr': 'fr', 'de': 'de', 'pt': 'pt-BR', 'pt-br': 'pt-BR', 'ru': 'ru',
            'id': 'id', 'vi': 'vi', 'th': 'th', 'ms': 'ms', 'fil': 'fil', 'tl': 'fil',
            'hi': 'hi', 'ar': 'ar', 'it': 'it', 'nl': 'nl', 'pl': 'pl', 'sv': 'sv', 'tr': 'tr', 'uk': 'uk'
        };

        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.resolveLangCode === 'function') {
            const resolved = window.StatKISS_I18N.resolveLangCode(rawValue);
            if (dict[resolved]) return resolved;
        }
        if (map[value] && dict[map[value]]) return map[value];
        if (dict[rawValue]) return rawValue;
        if (dict[value]) return value;
        if (value.indexOf('zh-') === 0) return value.indexOf('hant') !== -1 || /(tw|hk|mo)$/.test(value) ? 'zh-Hant' : 'zh-Hans';
        if (value.indexOf('ko') === 0) return 'ko';
        if (value.indexOf('en') === 0) return 'en';
        return 'en';
    }

    function extractLangFromEvent(event) {
        if (!event || !event.detail) return '';
        return String(event.detail.lang || event.detail.language || event.detail.code || event.detail.value || '').trim();
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

    function readConfig() {
        const node = document.getElementById('statkiss-journals-editor-config') || document.getElementById('statkiss-pubs-journals-editor-config');
        const fallback = {
            public_url: '/en/pubs/journals/',
            edit_url: '/en/pubs/journals/edit/',
            api_get_url: '/en/pubs/ajax_get_editorial_board_editor_payload/',
            api_save_url: '/en/pubs/ajax_save_editorial_board_editor_payload/',
            api_restore_url: '/en/pubs/ajax_restore_editorial_board_version/',
            can_manage_editorial_board: false,
        };
        if (!node) {
            return fallback;
        }
        try {
            const parsed = JSON.parse(node.textContent || '{}') || {};
            return {
                public_url: parsed.public_url || parsed.journals_public_path || fallback.public_url,
                edit_url: parsed.edit_url || parsed.journals_edit_path || fallback.edit_url,
                api_get_url: parsed.api_get_url || parsed.api_editor_url || fallback.api_get_url,
                api_save_url: parsed.api_save_url || fallback.api_save_url,
                api_restore_url: parsed.api_restore_url || parsed.api_restore_version_url || fallback.api_restore_url,
                can_manage_editorial_board: !!(parsed.can_manage_editorial_board || parsed.can_edit_journals || parsed.can_manage_officers),
            };
        } catch (e) {
            return fallback;
        }
    }

    const CONFIG = readConfig();
    const BOARD_REFRESH_KEY = 'statkiss:editorial_board:updated_at';
    const VERSION_HISTORY_LIMIT = 5;

    function notifyEditorialBoardUpdated() {
        const value = String(Date.now());
        try {
            localStorage.setItem(BOARD_REFRESH_KEY, value);
        } catch (e) {}
        try {
            window.dispatchEvent(new CustomEvent('statkiss:editorial-board-updated', { detail: { value: value } }));
        } catch (e) {}
    }


    function t(lang, key) {
        const source = window.STATKISS_PUBS_JOURNALS_EDIT_I18N;
        if (source && typeof source.t === 'function') return source.t(lang, key);
        return key;
    }

    function buildNoCacheUrl(url) {
        const base = String(url || '').trim();
        if (!base) return base;
        return base + (base.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
    }

    function deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function createUuidLike() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function slugifyRoleKey(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '') || 'editorial_role';
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
        const sections = rawSections.map(function (section, sectionIndex) {
            const items = Array.isArray(section.items) ? section.items : [];
            return {
                role_uuid: String(section.role_uuid || createUuidLike()),
                role_key: String(section.role_key || slugifyRoleKey(section.role_name || ('role_' + (sectionIndex + 1)))),
                role_name: String(section.role_name || section.role_key || '').trim(),
                role_order: Number(section.role_order || sectionIndex + 1),
                items: items.map(function (item, itemIndex) {
                    return {
                        item_uuid: String(item.item_uuid || createUuidLike()),
                        name: String(item.name || '').trim(),
                        affiliation: String(item.affiliation || '').trim(),
                        person_order: Number(item.person_order || itemIndex + 1)
                    };
                }).filter(function (item) {
                    return item.name || item.affiliation;
                }).sort(function (a, b) {
                    return a.person_order - b.person_order;
                })
            };
        }).sort(function (a, b) {
            return a.role_order - b.role_order;
        });
        sections.forEach(function (section, index) {
            section.role_order = index + 1;
            section.items.forEach(function (item, itemIndex) {
                item.person_order = itemIndex + 1;
            });
        });
        return {
            ok: source.ok !== false,
            message: String(source.message || ''),
            visible: visible ? 1 : 0,
            sections: sections,
            versions: Array.isArray(source.versions) ? source.versions.slice(0, VERSION_HISTORY_LIMIT) : [],
            current_version_uuid: String(source.current_version_uuid || ''),
            updated_at: String(source.updated_at || ''),
        };
    }

    function reindexBoardState(boardState) {
        const state = boardState && typeof boardState === 'object' ? boardState : {};
        const sections = Array.isArray(state.sections) ? state.sections : [];
        sections.forEach(function (section, index) {
            section.role_order = index + 1;
            section.items = Array.isArray(section.items) ? section.items : [];
            section.items.forEach(function (item, itemIndex) {
                item.person_order = itemIndex + 1;
            });
        });
        state.sections = sections;
        return state;
    }

    function snapshotBoardState(value) {
        const source = getPayloadRoot(value);
        const visible = source.visible == null ? source.board_visible : source.visible;
        const rawSections = Array.isArray(source.sections) ? source.sections : Array.isArray(source.roles) ? source.roles : [];
        const sections = rawSections.map(function (section, sectionIndex) {
            const items = Array.isArray(section.items) ? section.items : [];
            return {
                role_uuid: String(section.role_uuid || createUuidLike()),
                role_key: String(section.role_key || slugifyRoleKey(section.role_name || ('role_' + (sectionIndex + 1)))),
                role_name: String(section.role_name || section.role_key || '').trim(),
                role_order: sectionIndex + 1,
                items: items.map(function (item, itemIndex) {
                    return {
                        item_uuid: String(item.item_uuid || createUuidLike()),
                        name: String(item.name || ''),
                        affiliation: String(item.affiliation || ''),
                        person_order: itemIndex + 1
                    };
                })
            };
        });
        return reindexBoardState({
            visible: visible ? 1 : 0,
            sections: sections,
        });
    }

    function clampIndex(index, maxLength) {
        if (maxLength <= 0) return -1;
        if (index < 0) return 0;
        if (index >= maxLength) return maxLength - 1;
        return index;
    }

    function IconButton(props) {
        const base = props.className || '';
        return (
            <button type="button" title={props.title} aria-label={props.title} disabled={!!props.disabled} onClick={props.onClick}
                className={base + (props.disabled ? ' cursor-not-allowed opacity-40' : '')}>
                {props.children}
            </button>
        );
    }

    function UndoIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 14 4 9l5-5"/><path d="M20 20a8 8 0 0 0-8-8H4"/></svg>; }
    function RedoIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 14 5-5-5-5"/><path d="M4 20a8 8 0 0 1 8-8h8"/></svg>; }
    function UpIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>; }
    function DownIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>; }
    function TrashIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>; }
    function PlusIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>; }

    function PersonRow(props) {
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

    function PublicPreview(props) {
        const visibleSections = props.board.sections.map(function (section) {
            return Object.assign({}, section, {
                items: (Array.isArray(section.items) ? section.items : []).filter(function (item) {
                    return String(item.name || '').trim() || String(item.affiliation || '').trim();
                })
            });
        }).filter(function (section) {
            return String(section.role_name || '').trim() || section.items.length;
        });
        const totalItems = visibleSections.reduce(function (sum, section) { return sum + section.items.length; }, 0);
        const titleClass = props.isDark ? 'mb-6 text-xl font-bold text-white' : 'mb-6 text-xl font-bold text-gray-900';
        const roleClass = props.isDark ? 'text-md leading-tight text-white' : 'text-md leading-tight text-gray-700';
        if (!props.board.visible) {
            return <div className={props.isDark ? 'text-sm text-amber-300' : 'text-sm text-amber-700'}>{t(props.lang, 'hidden_notice')}</div>;
        }
        if (!totalItems) {
            return <div className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{t(props.lang, 'public_preview_empty')}</div>;
        }
        return (
            <div>
                <h3 className={titleClass}>{t(props.lang, 'editorial_board_title')}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:grid-cols-5">
                    {visibleSections.map(function (section) {
                        return (
                            <div className="w-full" key={section.role_uuid}>
                                <div className="mb-2 min-h-[48px] text-center">
                                    <p className={roleClass}>{section.role_name}</p>
                                </div>
                                <ul className="m-0 max-w-md space-y-1 p-0">
                                    {section.items.map(function (item) {
                                        return <PersonRow key={item.item_uuid} isDark={props.isDark} name={item.name} affiliation={item.affiliation} />;
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
        const [langState, setLangState] = React.useState(normalizeLang(getCurrentLang()));
        const [isDark, setIsDark] = React.useState(isDarkModeEnabled());
        const [board, setBoard] = React.useState({ visible: 1, sections: [] });
        const [versions, setVersions] = React.useState([]);
        const [selectedRoleIndex, setSelectedRoleIndex] = React.useState(-1);
        const [history, setHistory] = React.useState({ undo: [], redo: [] });
        const [isSaving, setIsSaving] = React.useState(false);
        const [isReloading, setIsReloading] = React.useState(false);
        const [message, setMessage] = React.useState('');
        const [messageType, setMessageType] = React.useState('info');

        React.useEffect(function () {
            let lastLang = normalizeLang(getCurrentLang());
            let lastIsDark = isDarkModeEnabled();
            function syncUi(event) {
                const hintedLang = extractLangFromEvent(event);
                const nextLang = normalizeLang(hintedLang || getCurrentLang());
                const nextIsDark = isDarkModeEnabled();
                if (nextLang !== lastLang) {
                    lastLang = nextLang;
                    setLangState(nextLang);
                }
                if (nextIsDark !== lastIsDark) {
                    lastIsDark = nextIsDark;
                    setIsDark(nextIsDark);
                }
            }
            const events = ['languagechange', 'statkiss:languagechange', 'i18n:change', 'langchange'];
            events.forEach(function (eventName) { window.addEventListener(eventName, syncUi); });
            window.addEventListener('storage', syncUi);
            const observer = new MutationObserver(syncUi);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir', 'class', 'data-theme', 'theme'] });
            const timer = window.setInterval(syncUi, 500);
            syncUi();
            return function () {
                events.forEach(function (eventName) { window.removeEventListener(eventName, syncUi); });
                window.removeEventListener('storage', syncUi);
                observer.disconnect();
                window.clearInterval(timer);
            };
        }, []);

        React.useEffect(function () {
            async function loadInitial() {
                setIsReloading(true);
                setMessage('');
                try {
                    const response = await fetch(buildNoCacheUrl(CONFIG.api_get_url), {
                        method: 'GET',
                        credentials: 'same-origin',
                        cache: 'no-store',
                        headers: { 'Accept': 'application/json' }
                    });
                    const payload = normalizeBoardPayload(await response.json());
                    if (!response.ok || payload.ok === false) {
                        throw new Error(payload.message || t(langState, 'load_error'));
                    }
                    setBoard(snapshotBoardState(payload));
                    setVersions(payload.versions || []);
                    setSelectedRoleIndex(payload.sections.length ? 0 : -1);
                    setHistory({ undo: [], redo: [] });
                } catch (error) {
                    setMessage((error && error.message) || t(langState, 'load_error'));
                    setMessageType('error');
                } finally {
                    setIsReloading(false);
                }
            }
            loadInitial();
        }, []);

        React.useEffect(function () {
            setSelectedRoleIndex(function (prev) {
                return clampIndex(prev, board.sections.length);
            });
        }, [board.sections.length]);

        React.useEffect(function () {
            function onKeyDown(event) {
                const isMeta = event.ctrlKey || event.metaKey;
                if (!isMeta) return;
                if (event.key.toLowerCase() === 'z' && !event.shiftKey) {
                    event.preventDefault();
                    handleUndo();
                }
                if (event.key.toLowerCase() === 'y' || (event.key.toLowerCase() === 'z' && event.shiftKey)) {
                    event.preventDefault();
                    handleRedo();
                }
            }
            window.addEventListener('keydown', onKeyDown);
            return function () {
                window.removeEventListener('keydown', onKeyDown);
            };
        });

        function showMessage(type, text) {
            setMessageType(type);
            setMessage(text);
        }

        function applyBoard(nextBoard, options) {
            const normalizedNextBoard = snapshotBoardState(nextBoard);
            const opts = options || {};
            if (opts.trackHistory) {
                const previousBoard = snapshotBoardState(board);
                setHistory(function (prev) {
                    return {
                        undo: prev.undo.concat([previousBoard]).slice(-100),
                        redo: []
                    };
                });
            }
            setBoard(normalizedNextBoard);
            if (typeof opts.selectedRoleIndex === 'number') {
                setSelectedRoleIndex(clampIndex(opts.selectedRoleIndex, normalizedNextBoard.sections.length));
            }
        }

        function mutateBoard(mutator, selectedIndexHint) {
            const draft = snapshotBoardState(board);
            mutator(draft);
            applyBoard(draft, { trackHistory: true, selectedRoleIndex: typeof selectedIndexHint === 'number' ? selectedIndexHint : selectedRoleIndex });
        }

        function handleUndo() {
            setHistory(function (prev) {
                if (!prev.undo.length) return prev;
                const previousBoard = prev.undo[prev.undo.length - 1];
                const currentBoard = snapshotBoardState(board);
                setBoard(snapshotBoardState(previousBoard));
                setSelectedRoleIndex(function (currentIndex) {
                    return clampIndex(currentIndex, previousBoard.sections.length);
                });
                return {
                    undo: prev.undo.slice(0, -1),
                    redo: prev.redo.concat([currentBoard]).slice(-100)
                };
            });
        }

        function handleRedo() {
            setHistory(function (prev) {
                if (!prev.redo.length) return prev;
                const nextBoard = prev.redo[prev.redo.length - 1];
                const currentBoard = snapshotBoardState(board);
                setBoard(snapshotBoardState(nextBoard));
                setSelectedRoleIndex(function (currentIndex) {
                    return clampIndex(currentIndex, nextBoard.sections.length);
                });
                return {
                    undo: prev.undo.concat([currentBoard]).slice(-100),
                    redo: prev.redo.slice(0, -1)
                };
            });
        }

        function handleAddRole() {
            const nextIndex = board.sections.length;
            mutateBoard(function (draft) {
                draft.sections.push({
                    role_uuid: createUuidLike(),
                    role_key: 'editorial_role_' + (draft.sections.length + 1),
                    role_name: 'New Role',
                    role_order: draft.sections.length + 1,
                    items: []
                });
            }, nextIndex);
        }

        function handleDeleteRole(index) {
            mutateBoard(function (draft) {
                draft.sections.splice(index, 1);
            }, index - 1);
        }

        function handleMoveRole(index, direction) {
            mutateBoard(function (draft) {
                const nextIndex = index + direction;
                if (nextIndex < 0 || nextIndex >= draft.sections.length) return;
                const moved = draft.sections.splice(index, 1)[0];
                draft.sections.splice(nextIndex, 0, moved);
                reindexBoardState(draft);
            }, index + direction);
        }

        function handleRoleNameChange(index, value) {
            mutateBoard(function (draft) {
                const role = draft.sections[index];
                if (!role) return;
                role.role_name = value;
                role.role_key = slugifyRoleKey(value || role.role_key || ('role_' + (index + 1)));
            }, index);
        }

        function handleVisibleChange(checked) {
            mutateBoard(function (draft) {
                draft.visible = checked ? 1 : 0;
            }, selectedRoleIndex);
        }

        function handleAddMember() {
            if (selectedRoleIndex < 0) return;
            mutateBoard(function (draft) {
                const role = draft.sections[selectedRoleIndex];
                if (!role) return;
                role.items.push({
                    item_uuid: createUuidLike(),
                    name: '',
                    affiliation: '',
                    person_order: role.items.length + 1,
                });
            }, selectedRoleIndex);
        }

        function handleDeleteMember(itemIndex) {
            if (selectedRoleIndex < 0) return;
            mutateBoard(function (draft) {
                const role = draft.sections[selectedRoleIndex];
                if (!role) return;
                role.items.splice(itemIndex, 1);
            }, selectedRoleIndex);
        }

        function handleMoveMember(itemIndex, direction) {
            if (selectedRoleIndex < 0) return;
            mutateBoard(function (draft) {
                const role = draft.sections[selectedRoleIndex];
                if (!role) return;
                const nextIndex = itemIndex + direction;
                if (nextIndex < 0 || nextIndex >= role.items.length) return;
                const moved = role.items.splice(itemIndex, 1)[0];
                role.items.splice(nextIndex, 0, moved);
                reindexBoardState(draft);
            }, selectedRoleIndex);
        }

        function handleMemberChange(itemIndex, field, value) {
            if (selectedRoleIndex < 0) return;
            mutateBoard(function (draft) {
                const role = draft.sections[selectedRoleIndex];
                if (!role || !role.items[itemIndex]) return;
                role.items[itemIndex][field] = value;
            }, selectedRoleIndex);
        }

        async function reloadFromServer() {
            setIsReloading(true);
            try {
                const response = await fetch(buildNoCacheUrl(CONFIG.api_get_url), {
                    method: 'GET',
                    credentials: 'same-origin',
                    cache: 'no-store',
                    headers: { 'Accept': 'application/json' }
                });
                const payload = normalizeBoardPayload(await response.json());
                if (!response.ok || payload.ok === false) {
                    throw new Error(payload.message || t(langState, 'load_error'));
                }
                setBoard(snapshotBoardState(payload));
                setVersions(payload.versions || []);
                setSelectedRoleIndex(payload.sections.length ? clampIndex(selectedRoleIndex, payload.sections.length) : -1);
                setHistory({ undo: [], redo: [] });
                setMessage('');
                setMessageType('success');
            } catch (error) {
                showMessage('error', (error && error.message) || t(langState, 'load_error'));
            } finally {
                setIsReloading(false);
            }
        }

        async function handleSave() {
            setIsSaving(true);
            try {
                const payload = snapshotBoardState(board);
                const response = await fetch(CONFIG.api_save_url, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const result = normalizeBoardPayload(await response.json());
                if (!response.ok || result.ok === false) {
                    throw new Error(result.message || t(langState, 'save_error'));
                }
                setBoard(snapshotBoardState(result));
                setVersions(result.versions || []);
                setHistory({ undo: [], redo: [] });
                setSelectedRoleIndex(result.sections.length ? clampIndex(selectedRoleIndex, result.sections.length) : -1);
                notifyEditorialBoardUpdated();
                showMessage('success', result.message || t(langState, 'save_success'));
            } catch (error) {
                showMessage('error', (error && error.message) || t(langState, 'save_error'));
            } finally {
                setIsSaving(false);
            }
        }

        async function handleRestore(versionUuid) {
            if (!versionUuid) return;
            if (!window.confirm(t(langState, 'restore_confirm'))) return;
            try {
                const response = await fetch(CONFIG.api_restore_url, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ version_uuid: versionUuid })
                });
                const result = normalizeBoardPayload(await response.json());
                if (!response.ok || result.ok === false) {
                    throw new Error(result.message || t(langState, 'restore_error'));
                }
                setBoard(snapshotBoardState(result));
                setVersions(result.versions || []);
                setHistory({ undo: [], redo: [] });
                setSelectedRoleIndex(result.sections.length ? 0 : -1);
                notifyEditorialBoardUpdated();
                showMessage('success', result.message || t(langState, 'restore_success'));
            } catch (error) {
                showMessage('error', (error && error.message) || t(langState, 'restore_error'));
            }
        }

        const roleCardClass = isDark
            ? 'rounded-2xl border border-white/10 bg-slate-900/70 p-4'
            : 'rounded-2xl border border-gray-200 bg-white p-4';
        const panelClass = isDark
            ? 'rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-2xl'
            : 'rounded-3xl border border-gray-200 bg-white p-5 shadow-xl';
        const inputClass = isDark
            ? 'w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-400'
            : 'w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-fuchsia-500';
        const subtleBtn = isDark
            ? 'inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5'
            : 'inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100';
        const iconBtn = isDark
            ? 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-100 hover:bg-white/5'
            : 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100';
        const primaryBtn = 'inline-flex items-center gap-2 rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500';
        const selectedRole = selectedRoleIndex >= 0 ? board.sections[selectedRoleIndex] : null;
        const messageClass = messageType === 'error'
            ? (isDark ? 'text-sm text-rose-300' : 'text-sm text-rose-700')
            : (isDark ? 'text-sm text-emerald-300' : 'text-sm text-emerald-700');

        return (
            <div className={isDark ? 'mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 text-white' : 'mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 text-gray-900'}>
                <div className={panelClass}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className={isDark ? 'text-3xl font-bold text-white' : 'text-3xl font-bold text-gray-900'}>{t(langState, 'page_title')}</h1>
                            <p className={isDark ? 'mt-2 text-sm text-gray-300' : 'mt-2 text-sm text-gray-600'}>{t(langState, 'page_subtitle')}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                                <a href={CONFIG.public_url} className="text-blue-600 hover:underline">{t(langState, 'back_to_public')}</a>
                                <span className={isDark ? 'text-gray-500' : 'text-gray-300'}>•</span>
                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t(langState, 'keyboard_hint')}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <IconButton title={t(langState, 'undo')} onClick={handleUndo} className={iconBtn} disabled={!history.undo.length}><UndoIcon /></IconButton>
                            <IconButton title={t(langState, 'redo')} onClick={handleRedo} className={iconBtn} disabled={!history.redo.length}><RedoIcon /></IconButton>
                            <button type="button" className={subtleBtn} onClick={reloadFromServer} disabled={isReloading}>{t(langState, 'reload')}</button>
                            <button type="button" className={primaryBtn} onClick={handleSave} disabled={isSaving}>{isSaving ? t(langState, 'saving') : t(langState, 'save')}</button>
                        </div>
                    </div>
                    {message ? <p className={'mt-4 ' + messageClass}>{message}</p> : null}
                </div>

                <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
                    <div className="flex flex-col gap-6">
                        <div className={panelClass}>
                            <div className="flex items-center justify-between gap-3">
                                <h2 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{t(langState, 'role_list_title')}</h2>
                                <button type="button" className={subtleBtn} onClick={handleAddRole}><PlusIcon /> {t(langState, 'add_role')}</button>
                            </div>

                            <div className="mt-4 rounded-2xl border border-dashed border-fuchsia-300/60 p-4">
                                <label className="flex items-center justify-between gap-4 text-sm font-medium">
                                    <span>{t(langState, 'visibility_label')}</span>
                                    <input type="checkbox" checked={!!board.visible} onChange={function (event) { handleVisibleChange(event.target.checked); }} />
                                </label>
                                <p className={isDark ? 'mt-2 text-sm text-gray-300' : 'mt-2 text-sm text-gray-600'}>
                                    {board.visible ? t(langState, 'visible_badge') : t(langState, 'hidden_badge')}
                                </p>
                            </div>

                            <div className="mt-4 grid gap-3">
                                {!board.sections.length ? <div className={roleCardClass}><p className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{t(langState, 'role_list_empty')}</p></div> : null}
                                {board.sections.map(function (role, index) {
                                    const selected = index === selectedRoleIndex;
                                    const selectedClass = selected
                                        ? (isDark ? 'border-fuchsia-400 ring-2 ring-fuchsia-400/40' : 'border-fuchsia-400 ring-2 ring-fuchsia-300')
                                        : '';
                                    return (
                                        <div key={role.role_uuid} className={roleCardClass + ' ' + selectedClass}>
                                            <button type="button" className="w-full text-left" onClick={function () { setSelectedRoleIndex(index); }}>
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <div className={isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-gray-900'}>{role.role_name || '—'}</div>
                                                        <div className={isDark ? 'mt-1 text-xs text-gray-300' : 'mt-1 text-xs text-gray-500'}>{role.items.length} {t(langState, 'member_count')}</div>
                                                    </div>
                                                </div>
                                            </button>
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <IconButton title={t(langState, 'move_up')} onClick={function () { handleMoveRole(index, -1); }} className={iconBtn} disabled={index === 0}><UpIcon /></IconButton>
                                                <IconButton title={t(langState, 'move_down')} onClick={function () { handleMoveRole(index, 1); }} className={iconBtn} disabled={index === board.sections.length - 1}><DownIcon /></IconButton>
                                                <IconButton title={t(langState, 'delete_role')} onClick={function () { handleDeleteRole(index); }} className={iconBtn}><TrashIcon /></IconButton>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className={panelClass}>
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{t(langState, 'selected_role_title')}</h2>
                                    {selectedRole ? <p className={isDark ? 'mt-1 text-sm text-gray-300' : 'mt-1 text-sm text-gray-600'}>{selectedRole.items.length} {t(langState, 'member_count')}</p> : null}
                                </div>
                                {selectedRole ? <button type="button" className={subtleBtn} onClick={handleAddMember}><PlusIcon /> {t(langState, 'add_member')}</button> : null}
                            </div>

                            {!selectedRole ? (
                                <div className={roleCardClass + ' mt-4'}>
                                    <p className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{t(langState, 'selected_role_empty')}</p>
                                </div>
                            ) : (
                                <div className="mt-4 grid gap-4">
                                    <div>
                                        <label className={isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{t(langState, 'role_name')}</label>
                                        <input type="text" className={inputClass} value={selectedRole.role_name || ''} onChange={function (event) { handleRoleNameChange(selectedRoleIndex, event.target.value); }} />
                                    </div>
                                    <div className="grid gap-4">
                                        {!selectedRole.items.length ? <div className={roleCardClass}><p className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{t(langState, 'no_members')}</p></div> : null}
                                        {selectedRole.items.map(function (item, itemIndex) {
                                            return (
                                                <div className={roleCardClass} key={item.item_uuid}>
                                                    <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr_auto] lg:items-end">
                                                        <div>
                                                            <label className={isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{t(langState, 'member_name')}</label>
                                                            <input type="text" className={inputClass} value={item.name || ''} onChange={function (event) { handleMemberChange(itemIndex, 'name', event.target.value); }} />
                                                        </div>
                                                        <div>
                                                            <label className={isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{t(langState, 'affiliation')}</label>
                                                            <input type="text" className={inputClass} value={item.affiliation || ''} onChange={function (event) { handleMemberChange(itemIndex, 'affiliation', event.target.value); }} />
                                                        </div>
                                                        <div className="flex flex-wrap items-center justify-end gap-2">
                                                            <IconButton title={t(langState, 'move_up')} onClick={function () { handleMoveMember(itemIndex, -1); }} className={iconBtn} disabled={itemIndex === 0}><UpIcon /></IconButton>
                                                            <IconButton title={t(langState, 'move_down')} onClick={function () { handleMoveMember(itemIndex, 1); }} className={iconBtn} disabled={itemIndex === selectedRole.items.length - 1}><DownIcon /></IconButton>
                                                            <IconButton title={t(langState, 'delete_member')} onClick={function () { handleDeleteMember(itemIndex); }} className={iconBtn}><TrashIcon /></IconButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={panelClass}>
                            <div className="flex items-center justify-between gap-3">
                                <h2 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{t(langState, 'preview_title')}</h2>
                                <a href={CONFIG.public_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">{t(langState, 'open_public')}</a>
                            </div>
                            <div className="mt-4">
                                <PublicPreview board={board} isDark={isDark} lang={langState} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className={panelClass}>
                            <h2 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{t(langState, 'version_history')}</h2>
                            <div className="mt-4 grid gap-3">
                                {!versions.length ? <div className={roleCardClass}><p className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{t(langState, 'versions_empty')}</p></div> : null}
                                {versions.map(function (version) {
                                    return (
                                        <div className={roleCardClass} key={version.version_uuid || version.uuid}>
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className={isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-gray-900'}>{t(langState, 'saved_at')}: {version.created_at || '-'}</div>
                                                    <div className={isDark ? 'mt-1 text-xs text-gray-300' : 'mt-1 text-xs text-gray-600'}>{t(langState, 'action')}: {version.action || '-'} · {t(langState, 'role_count')}: {version.role_count || 0} · {t(langState, 'member_count')}: {version.item_count || 0}</div>
                                                    {version.actor_name || version.actor_email ? <div className={isDark ? 'mt-1 text-xs text-gray-400' : 'mt-1 text-xs text-gray-500'}>{t(langState, 'saved_by')}: {version.actor_name || version.actor_email}</div> : null}
                                                </div>
                                                <button type="button" className={subtleBtn} onClick={function () { handleRestore(version.version_uuid || version.uuid); }}>{t(langState, 'restore')}</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('div_main'));
}
