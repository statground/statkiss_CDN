
function set_main() {
    'use strict';

    function parseJSONSafe(text, fallback) {
        try { return JSON.parse(text); } catch (error) { return fallback; }
    }

    const configEl = document.getElementById('statkiss-pubs-journals-config') || document.getElementById('statkiss-journals-editor-config') || document.getElementById('statkiss-journals-public-config');
    let RAW_CONFIG = parseJSONSafe((configEl && configEl.textContent) || '{}', {});
    if (typeof RAW_CONFIG === 'string') {
        RAW_CONFIG = parseJSONSafe(RAW_CONFIG, {});
    }
    const FALLBACK_LANG_CODES = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];
    const EDITOR_UI_FALLBACK = {
        edit_button: 'Edit', hide_board: 'Hide Editorial Board', show_board: 'Show Editorial Board', save: 'Save', saving: 'Saving…',
        add_role: 'Add role', add_person: 'Add person', delete_role: 'Delete role', delete_person: 'Delete person',
        role_name: 'Role name', member_name: 'Name', affiliation: 'Affiliation', version_history: 'Version history',
        restore: 'Restore', note_placeholder: 'Optional version note', public_preview: 'Public preview', editor_panel: 'Editorial Board Editor',
        visible_label: 'Visible on public page', hidden_notice: 'Editorial Board is hidden on the public page.', no_roles: 'No roles yet. Add a role to begin.',
        undo: 'Undo', redo: 'Redo', move_up: 'Move up', move_down: 'Move down', saved_at: 'Saved at', action: 'Action', item_count: 'Items', role_count: 'Roles',
    };
    const EDITOR_UI_KO = {
        edit_button: '수정', hide_board: '편집위원회 숨기기', show_board: '편집위원회 보이기', save: '저장', saving: '저장 중…',
        add_role: 'Role 추가', add_person: '인원 추가', delete_role: 'Role 삭제', delete_person: '인원 삭제',
        role_name: 'Role 이름', member_name: '이름', affiliation: '소속', version_history: '버전 기록',
        restore: '복원', note_placeholder: '버전 메모(선택)', public_preview: '공개 페이지 미리보기', editor_panel: 'Editorial Board 편집',
        visible_label: '공개 페이지 표시', hidden_notice: '현재 공개 페이지에서 Editorial Board가 숨겨져 있습니다.', no_roles: '아직 Role이 없습니다. Role을 추가해 주세요.',
        undo: '되돌리기', redo: '다시 실행', move_up: '위로', move_down: '아래로', saved_at: '저장 시각', action: '동작', item_count: '인원 수', role_count: 'Role 수',
    };

    function getHeaderLangKey() { return (window.StatKISS_I18N && window.StatKISS_I18N.LANG_KEY) || 'statkiss_lang'; }
    function pickFirst(values) { for (let i = 0; i < values.length; i += 1) { const v = String(values[i] || '').trim(); if (v) return v; } return ''; }

    function normalizeLang(lang) {
        const rawValue = String(lang || 'en').trim();
        const value = rawValue.toLowerCase().replace(/_/g, '-');
        const i18nSource = window.STATKISS_PUBS_JOURNALS_I18N || {};
        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.resolveLangCode === 'function') {
            const resolvedByHeader = window.StatKISS_I18N.resolveLangCode(rawValue);
            if (i18nSource[resolvedByHeader]) return resolvedByHeader;
        }
        const map = {'ko':'ko','ko-kr':'ko','en':'en','en-us':'en','en-gb':'en','ja':'ja','ja-jp':'ja','jp':'ja','zh':'zh-Hans','zh-cn':'zh-Hans','zh-sg':'zh-Hans','zh-hans':'zh-Hans','zh-hans-cn':'zh-Hans','zh-hans-sg':'zh-Hans','zh-tw':'zh-Hant','zh-hk':'zh-Hant','zh-mo':'zh-Hant','zh-hant':'zh-Hant','zh-hant-tw':'zh-Hant','zh-hant-hk':'zh-Hant','es':'es','es-es':'es','es-419':'es','fr':'fr','fr-fr':'fr','de':'de','de-de':'de','pt':'pt-BR','pt-br':'pt-BR','ru':'ru','ru-ru':'ru','id':'id','id-id':'id','vi':'vi','vi-vn':'vi','th':'th','th-th':'th','ms':'ms','ms-my':'ms','fil':'fil','fil-ph':'fil','tl':'fil','tl-ph':'fil','hi':'hi','hi-in':'hi','ar':'ar','ar-sa':'ar','ar-ae':'ar','it':'it','it-it':'it','nl':'nl','nl-nl':'nl','pl':'pl','pl-pl':'pl','sv':'sv','sv-se':'sv','tr':'tr','tr-tr':'tr','uk':'uk','uk-ua':'uk'};
        if (map[value]) return map[value];
        if (i18nSource[rawValue]) return rawValue;
        if (i18nSource[value]) return value;
        if (value.indexOf('zh-') === 0) return value.indexOf('hant') !== -1 || /-(tw|hk|mo)$/.test(value) ? 'zh-Hant' : 'zh-Hans';
        if (value.indexOf('ko') === 0) return 'ko'; if (value.indexOf('en') === 0) return 'en'; if (value.indexOf('ja') === 0 || value.indexOf('jp') === 0) return 'ja';
        if (value.indexOf('es') === 0) return 'es'; if (value.indexOf('fr') === 0) return 'fr'; if (value.indexOf('de') === 0) return 'de'; if (value.indexOf('pt') === 0) return 'pt-BR';
        if (value.indexOf('ru') === 0) return 'ru'; if (value.indexOf('id') === 0) return 'id'; if (value.indexOf('vi') === 0) return 'vi'; if (value.indexOf('th') === 0) return 'th';
        if (value.indexOf('ms') === 0) return 'ms'; if (value.indexOf('fil') === 0 || value.indexOf('tl') === 0) return 'fil'; if (value.indexOf('hi') === 0) return 'hi';
        if (value.indexOf('ar') === 0) return 'ar'; if (value.indexOf('it') === 0) return 'it'; if (value.indexOf('nl') === 0) return 'nl'; if (value.indexOf('pl') === 0) return 'pl';
        if (value.indexOf('sv') === 0) return 'sv'; if (value.indexOf('tr') === 0) return 'tr'; if (value.indexOf('uk') === 0) return 'uk';
        return 'en';
    }

    function getCurrentLang() {
        try {
            const headerLangKey = getHeaderLangKey();
            const htmlLang = (document.documentElement.getAttribute('lang') || document.documentElement.lang || (document.body && document.body.getAttribute('lang')) || '').trim();
            const storedLang = pickFirst([localStorage.getItem(headerLangKey), localStorage.getItem('statkiss_lang'), localStorage.getItem('lang'), localStorage.getItem('language')]);
            const headerLang = (window.StatKISS_I18N && typeof window.StatKISS_I18N.getInitialLang === 'function' && window.StatKISS_I18N.getInitialLang()) || '';
            const winLang = pickFirst([window.currentLang, window.lang, window.__statkiss_lang, window.__lang]);
            const browserLang = (navigator.language || navigator.userLanguage || '').trim();
            return pickFirst([htmlLang, storedLang, headerLang, winLang, RAW_CONFIG.lang, browserLang, 'en']);
        } catch (error) { return 'en'; }
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
        } catch (error) { return false; }
    }

    function inferPubsBasePath() {
        const pathname = window.location.pathname || '/';
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length && FALLBACK_LANG_CODES.includes(parts[0])) return '/' + parts[0] + '/pubs/';
        return '/pubs/';
    }

    function inferMode(rawMode) {
        const requested = String(rawMode || '').trim().toLowerCase();
        if (requested === 'edit' || requested === 'view') return requested;
        const pathname = (window.location && window.location.pathname) || '';
        return /\/journals\/edit\/?$/.test(pathname) ? 'edit' : 'view';
    }

    function buildConfig(raw) {
        const pubsBase = inferPubsBasePath();
        const source = raw && typeof raw === 'object' ? raw : {};
        return {
            lang: source.lang || normalizeLang(getCurrentLang()),
            mode: inferMode(source.mode),
            can_manage_editorial_board: !!(source.can_manage_editorial_board || source.can_manage_journals_editorial_board),
            public_url: source.public_url || source.journals_public_path || (pubsBase + 'journals/'),
            edit_url: source.edit_url || source.journals_edit_path || (pubsBase + 'journals/edit/'),
            api_public_url: source.api_public_url || (pubsBase + 'ajax_get_editorial_board_public/'),
            api_editor_url: source.api_editor_url || source.api_get_url || (pubsBase + 'ajax_get_editorial_board_editor_payload/'),
            api_save_url: source.api_save_url || (pubsBase + 'ajax_save_editorial_board_editor_payload/'),
            api_restore_url: source.api_restore_url || source.api_restore_version_url || (pubsBase + 'ajax_restore_editorial_board_version/'),
        };
    }
    const CONFIG = buildConfig(RAW_CONFIG || {});

    function getTranslations(lang) {
        const fallback = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N.en) || {};
        const current = (window.STATKISS_PUBS_JOURNALS_I18N && window.STATKISS_PUBS_JOURNALS_I18N[lang]) || fallback;
        return Object.assign({}, fallback, current, lang === 'ko' ? EDITOR_UI_KO : EDITOR_UI_FALLBACK);
    }

    function normalizeItem(rawItem, index) {
        return { item_uuid: String((rawItem && rawItem.item_uuid) || '').trim(), name: String((rawItem && rawItem.name) || '').trim(), affiliation: String((rawItem && rawItem.affiliation) || '').trim(), person_order: Number.parseInt((rawItem && rawItem.person_order) || index + 1, 10) || (index + 1) };
    }
    function slugifyRoleKey(value) { return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'editorial_role'; }
    function createUuidLike() { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }); }

    function normalizeBoardPayload(rawPayload) {
        const raw = rawPayload && typeof rawPayload === 'object' ? rawPayload : {};
        const rawSections = Array.isArray(raw.sections) ? raw.sections : [];
        const sections = rawSections.map(function(section, sectionIndex) {
            const items = Array.isArray(section.items) ? section.items.map(function(item, itemIndex) { return normalizeItem(item, itemIndex); }).filter(function(item){ return item.name || item.affiliation; }) : [];
            return {
                role_uuid: String(section.role_uuid || '').trim() || createUuidLike(),
                role_key: String(section.role_key || '').trim() || slugifyRoleKey(section.role_name || ('role_' + (sectionIndex + 1))),
                role_name: String(section.role_name || section.role_key || '').trim() || ('Role ' + (sectionIndex + 1)),
                role_order: Number.parseInt(section.role_order || sectionIndex + 1, 10) || (sectionIndex + 1),
                items: items.map(function(item, itemIndex){ return Object.assign({}, item, { person_order: itemIndex + 1, item_uuid: item.item_uuid || createUuidLike() }); }),
            };
        });
        return { ok: true, visible: Number(raw.visible) ? 1 : 0, current_version_uuid: String(raw.current_version_uuid || '').trim(), updated_at: String(raw.updated_at || '').trim(), sections: sections, versions: Array.isArray(raw.versions) ? raw.versions : [], item_count: Number.parseInt(raw.item_count, 10) || sections.reduce(function(sum, section){ return sum + section.items.length; }, 0) };
    }

    function snapshotBoardState(state) {
        return { visible: Number(state.visible) ? 1 : 0, sections: (state.sections || []).map(function(section, sectionIndex) { return { role_uuid: section.role_uuid || createUuidLike(), role_key: section.role_key || slugifyRoleKey(section.role_name || ('role_' + (sectionIndex + 1))), role_name: section.role_name || ('Role ' + (sectionIndex + 1)), role_order: sectionIndex + 1, items: (section.items || []).map(function(item, itemIndex) { return { item_uuid: item.item_uuid || createUuidLike(), name: item.name || '', affiliation: item.affiliation || '', person_order: itemIndex + 1 }; }) }; }) };
    }
    function deepClone(value) { return parseJSONSafe(JSON.stringify(value), value); }

    function Div_sub_card(props) { return (<div><h2 className="mb-1 text-md text-gray-900">{props.text}</h2>{props.sub_text ? <h2 className="mb-1 text-sm text-gray-600">{props.sub_text}</h2> : null}<a href={props.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline text-blue-600">{props.url_name}<svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></a></div>); }
    function Div_sub_card_img(props) { return (<div className="flex flex-col justify-center items-center space-y-4"><img className="h-24" src={props.img_url} alt={props.text} /><h2 className="mb-1 text-sm text-gray-900">{props.text}</h2></div>); }
    function Div_person_li(props) { return (<li className="flex items-start"><svg className={props.isDark ? 'w-4 h-4 mr-2 mt-1 shrink-0 text-white' : 'w-4 h-4 mr-2 mt-1 shrink-0 text-gray-700'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="currentColor"></path></svg><div className="flex flex-col"><span className={props.isDark ? 'text-md text-white font-medium' : 'text-md text-gray-900'}>{props.name}</span><span className={props.isDark ? 'text-xs text-gray-200' : 'text-xs text-gray-500'}>({props.affiliation})</span></div></li>); }
    function Div_header(props) { const t = props.t; return (<div className="mb-6 max-w-screen-lg lg:mb-0"><h1 className="mb-4 text-4xl font-extrabold text-red-900 tracking-tight leading-none md:text-5xl lg:text-6xl">{t.header_title}</h1><p className="mb-6 font-bold text-gray-900 lg:mb-8 md:text-lg lg:text-xl">{t.header_subtitle}</p><p className="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7"><a href="http://csam.or.kr/" target="_blank" rel="noreferrer" className="underline text-blue-600">{t.header_link_label}</a>{' '}{t.header_paragraph_1_after_link}</p><p className="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7">{t.header_paragraph_2}</p><br /><p className="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm leading-7">{t.header_paragraph_3}</p></div>); }

    function EditFloatingButton(props) {
        if (!props.show) return null;
        if (typeof document !== 'undefined' && document.getElementById('journals-edit-fab')) return null;
        return (
            <a href={props.href} aria-label={props.label} className="fixed bottom-6 right-6 z-[60] inline-flex h-16 min-w-[4rem] items-center justify-center rounded-full bg-fuchsia-600 px-4 text-lg font-bold text-white shadow-[0_0_0_10px_rgba(217,70,239,0.25)] transition hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-fuchsia-300">
                {props.label}
            </a>
        );
    }

    function EditorialBoardPublic(props) {
        const payload = normalizeBoardPayload(props.payload);
        const totalItems = payload.sections.reduce(function(sum, section){ return sum + section.items.length; }, 0);
        if (!payload.visible || totalItems === 0) return null;
        const titleClass = props.isDark ? 'mb-8 text-2xl font-bold text-white' : 'mb-8 text-2xl font-bold text-gray-900';
        const roleClass = props.isDark ? 'text-md leading-tight text-white' : 'text-md leading-tight text-gray-700';
        return (
            <div className="px-4 mx-auto max-w-screen-xl py-8">
                <h2 className={titleClass}>{props.t.editorial_board_title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {payload.sections.map(function(section){
                        return (
                            <div className="w-full max-w-full md:max-w-xs" key={section.role_uuid || section.role_key}>
                                <div className="flex flex-col w-full min-h-[50px] justify-center items-center mb-2 text-center">
                                    <p className={roleClass}>{section.role_name}</p>
                                </div>
                                <ul className="max-w-md space-y-1 list-none p-0 m-0">
                                    {section.items.map(function(item){ return <Div_person_li key={item.item_uuid} isDark={props.isDark} name={item.name} affiliation={item.affiliation} />; })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function IconButton(props) {
        return <button type="button" onClick={props.onClick} title={props.title} aria-label={props.title} className={props.className} disabled={!!props.disabled}>{props.children}</button>;
    }

    function UndoIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 14 4 9l5-5"/><path d="M20 20a8 8 0 0 0-8-8H4"/></svg>; }
    function RedoIcon() { return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 14 5-5-5-5"/><path d="M4 20a8 8 0 0 1 8-8h8"/></svg>; }
    function UpIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>; }
    function DownIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>; }
    function TrashIcon() { return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/></svg>; }

    function EditorPanel(props) {
        const shellClass = props.isDark ? 'mt-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl backdrop-blur' : 'mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl';
        const cardClass = props.isDark ? 'rounded-2xl border border-white/10 bg-slate-900/70 p-4' : 'rounded-2xl border border-gray-200 bg-gray-50 p-4';
        const inputClass = props.isDark ? 'w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-fuchsia-400' : 'w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-fuchsia-500';
        const subtleBtn = props.isDark ? 'inline-flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-white/5' : 'inline-flex items-center gap-1 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100';
        const iconBtn = props.isDark ? 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-100 hover:bg-white/5 disabled:opacity-40' : 'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40';
        const primaryBtn = 'inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500';
        const sections = props.state.sections || [];
        return (
            <div className="px-4 mx-auto max-w-screen-xl py-8">
                <div className={shellClass}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className={props.isDark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-900'}>{props.t.editor_panel}</h2>
                            <p className={props.isDark ? 'mt-2 text-sm text-gray-300' : 'mt-2 text-sm text-gray-600'}>{props.state.visible ? props.t.visible_label : props.t.hidden_notice}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <IconButton title={props.t.undo} onClick={props.onUndo} className={iconBtn + ' disabled:cursor-not-allowed'} disabled={!props.canUndo}><UndoIcon /></IconButton>
                            <IconButton title={props.t.redo} onClick={props.onRedo} className={iconBtn + ' disabled:cursor-not-allowed'} disabled={!props.canRedo}><RedoIcon /></IconButton>
                            <label className={subtleBtn + ' cursor-pointer'}>
                                <input type="checkbox" className="mr-2" checked={!!props.state.visible} onChange={function(e){ props.onChangeVisible(e.target.checked ? 1 : 0); }} />
                                {props.state.visible ? props.t.hide_board : props.t.show_board}
                            </label>
                            <button type="button" onClick={props.onAddRole} className={subtleBtn}>{props.t.add_role}</button>
                            <button type="button" onClick={props.onSave} className={primaryBtn}>{props.isSaving ? props.t.saving : props.t.save}</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input type="text" className={inputClass} value={props.note} onChange={function(e){ props.onNoteChange(e.target.value); }} placeholder={props.t.note_placeholder} />
                    </div>

                    <div className="mt-6 grid gap-4">
                        {!sections.length ? <div className={cardClass}><p className={props.isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>{props.t.no_roles}</p></div> : null}
                        {sections.map(function(section, sectionIndex){
                            return (
                                <div className={cardClass} key={section.role_uuid || section.role_key || sectionIndex}>
                                    <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
                                        <div className="grid gap-3 md:grid-cols-2">
                                            <div>
                                                <label className={props.isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{props.t.role_name}</label>
                                                <input type="text" className={inputClass} value={section.role_name || ''} onChange={function(e){ props.onChangeRoleName(sectionIndex, e.target.value); }} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-end gap-2">
                                            <IconButton title={props.t.move_up} onClick={function(){ props.onMoveRole(sectionIndex, -1); }} className={iconBtn} disabled={sectionIndex === 0}><UpIcon /></IconButton>
                                            <IconButton title={props.t.move_down} onClick={function(){ props.onMoveRole(sectionIndex, 1); }} className={iconBtn} disabled={sectionIndex === sections.length - 1}><DownIcon /></IconButton>
                                            <button type="button" onClick={function(){ props.onAddPerson(sectionIndex); }} className={subtleBtn}>{props.t.add_person}</button>
                                            <IconButton title={props.t.delete_role} onClick={function(){ props.onDeleteRole(sectionIndex); }} className={iconBtn}><TrashIcon /></IconButton>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid gap-3">
                                        {section.items.map(function(item, itemIndex){
                                            return (
                                                <div className="grid gap-3 rounded-2xl border border-black/5 p-3 md:grid-cols-[1fr_1.5fr_auto] dark:border-white/10" key={item.item_uuid || itemIndex}>
                                                    <div>
                                                        <label className={props.isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{props.t.member_name}</label>
                                                        <input type="text" className={inputClass} value={item.name || ''} onChange={function(e){ props.onChangeItem(sectionIndex, itemIndex, 'name', e.target.value); }} />
                                                    </div>
                                                    <div>
                                                        <label className={props.isDark ? 'mb-1 block text-xs font-semibold text-gray-300' : 'mb-1 block text-xs font-semibold text-gray-600'}>{props.t.affiliation}</label>
                                                        <input type="text" className={inputClass} value={item.affiliation || ''} onChange={function(e){ props.onChangeItem(sectionIndex, itemIndex, 'affiliation', e.target.value); }} />
                                                    </div>
                                                    <div className="flex items-end justify-end gap-2">
                                                        <IconButton title={props.t.move_up} onClick={function(){ props.onMoveItem(sectionIndex, itemIndex, -1); }} className={iconBtn} disabled={itemIndex === 0}><UpIcon /></IconButton>
                                                        <IconButton title={props.t.move_down} onClick={function(){ props.onMoveItem(sectionIndex, itemIndex, 1); }} className={iconBtn} disabled={itemIndex === section.items.length - 1}><DownIcon /></IconButton>
                                                        <IconButton title={props.t.delete_person} onClick={function(){ props.onDeleteItem(sectionIndex, itemIndex); }} className={iconBtn}><TrashIcon /></IconButton>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <h3 className={props.isDark ? 'mb-4 text-lg font-semibold text-white' : 'mb-4 text-lg font-semibold text-gray-900'}>{props.t.public_preview}</h3>
                            <div className={props.isDark ? 'rounded-3xl border border-white/10 bg-slate-900/60 p-4' : 'rounded-3xl border border-gray-200 bg-white p-4'}>
                                <EditorialBoardPublic payload={props.state} t={props.t} isDark={props.isDark} />
                            </div>
                        </div>
                        <div>
                            <h3 className={props.isDark ? 'mb-4 text-lg font-semibold text-white' : 'mb-4 text-lg font-semibold text-gray-900'}>{props.t.version_history}</h3>
                            <div className={props.isDark ? 'overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60' : 'overflow-hidden rounded-3xl border border-gray-200 bg-white'}>
                                <div className="max-h-[560px] overflow-auto">
                                    {(props.versions || []).map(function(version){
                                        return (
                                            <div key={version.version_uuid} className={props.isDark ? 'border-b border-white/10 p-4' : 'border-b border-gray-200 p-4'}>
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <div className={props.isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-gray-900'}>{props.t.saved_at}: {version.created_at || '-'}</div>
                                                        <div className={props.isDark ? 'mt-1 text-xs text-gray-300' : 'mt-1 text-xs text-gray-600'}>{props.t.action}: {version.action || '-'} · {props.t.role_count}: {version.role_count || 0} · {props.t.item_count}: {version.item_count || 0}</div>
                                                        {version.note ? <div className={props.isDark ? 'mt-2 text-xs text-gray-400' : 'mt-2 text-xs text-gray-500'}>{version.note}</div> : null}
                                                    </div>
                                                    <button type="button" onClick={function(){ props.onRestore(version.version_uuid); }} className={subtleBtn}>{props.t.restore}</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {!(props.versions || []).length ? <div className="p-4 text-sm text-gray-500">—</div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function App() {
        const [uiState, setUiState] = React.useState({ lang: normalizeLang(getCurrentLang()), i18nFingerprint: getI18nFingerprint(), isDark: isDarkModeEnabled() });
        const [publicPayload, setPublicPayload] = React.useState({ visible: 0, sections: [] });
        const [editorState, setEditorState] = React.useState({ visible: 1, sections: [] });
        const [versions, setVersions] = React.useState([]);
        const [history, setHistory] = React.useState({ undo: [], redo: [] });
        const [note, setNote] = React.useState('');
        const [isSaving, setIsSaving] = React.useState(false);

        React.useEffect(function() {
            let lastLang = normalizeLang(getCurrentLang());
            let lastFingerprint = getI18nFingerprint();
            let lastIsDark = isDarkModeEnabled();
            function syncUi(event) {
                const hintedLang = extractLangFromEvent(event);
                const nextLang = normalizeLang(hintedLang || getCurrentLang());
                const nextFingerprint = getI18nFingerprint();
                const nextIsDark = isDarkModeEnabled();
                if (nextLang !== lastLang || nextFingerprint !== lastFingerprint || nextIsDark !== lastIsDark) {
                    lastLang = nextLang; lastFingerprint = nextFingerprint; lastIsDark = nextIsDark;
                    setUiState({ lang: nextLang, i18nFingerprint: nextFingerprint, isDark: nextIsDark });
                }
            }
            const events = ['languagechange', 'statkiss:languagechange', 'i18n:change', 'langchange'];
            events.forEach(function(eventName){ window.addEventListener(eventName, syncUi); });
            window.addEventListener('storage', syncUi);
            const observer = new MutationObserver(syncUi);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir', 'class', 'data-theme', 'theme'] });
            const timer = window.setInterval(syncUi, 500);
            syncUi();
            return function(){ events.forEach(function(eventName){ window.removeEventListener(eventName, syncUi); }); window.removeEventListener('storage', syncUi); observer.disconnect(); window.clearInterval(timer); };
        }, []);

        React.useEffect(function() {
            let cancelled = false;
            async function load() {
                try {
                    const endpoint = CONFIG.mode === 'edit' ? CONFIG.api_editor_url : CONFIG.api_public_url;
                    const response = await fetch(endpoint, { method: 'GET', credentials: 'same-origin', cache: 'no-store', headers: { 'Accept': 'application/json' } });
                    const payload = normalizeBoardPayload(await response.json());
                    if (cancelled) return;
                    setPublicPayload(payload);
                    if (CONFIG.mode === 'edit') {
                        const snapshot = snapshotBoardState(payload);
                        setEditorState(snapshot);
                        setVersions(Array.isArray(payload.versions) ? payload.versions : []);
                        setHistory({ undo: [], redo: [] });
                    }
                } catch (error) {
                    if (cancelled) return;
                    setPublicPayload({ visible: 0, sections: [] });
                }
            }
            load();
            return function(){ cancelled = true; };
        }, []);

        React.useEffect(function() {
            function onKeyDown(event) {
                const isMeta = event.ctrlKey || event.metaKey;
                if (!isMeta || CONFIG.mode !== 'edit') return;
                if (event.key.toLowerCase() === 'z' && !event.shiftKey) { event.preventDefault(); handleUndo(); }
                if ((event.key.toLowerCase() === 'y') || (event.key.toLowerCase() === 'z' && event.shiftKey)) { event.preventDefault(); handleRedo(); }
            }
            window.addEventListener('keydown', onKeyDown);
            return function(){ window.removeEventListener('keydown', onKeyDown); };
        });

        function pushHistory(nextState) {
            setHistory(function(prev){ return { undo: prev.undo.concat([deepClone(editorState)]).slice(-100), redo: [] }; });
            setEditorState(nextState);
        }
        function mutateEditor(mutator) { const draft = deepClone(editorState); mutator(draft); pushHistory(snapshotBoardState(draft)); }
        function handleUndo() { setHistory(function(prev){ if (!prev.undo.length) return prev; const previous = prev.undo[prev.undo.length - 1]; setEditorState(previous); return { undo: prev.undo.slice(0, -1), redo: prev.redo.concat([deepClone(editorState)]).slice(-100) }; }); }
        function handleRedo() { setHistory(function(prev){ if (!prev.redo.length) return prev; const next = prev.redo[prev.redo.length - 1]; setEditorState(next); return { undo: prev.undo.concat([deepClone(editorState)]).slice(-100), redo: prev.redo.slice(0, -1) }; }); }
        function addRole() { mutateEditor(function(draft){ draft.sections.push({ role_uuid: createUuidLike(), role_key: 'editorial_role_' + (draft.sections.length + 1), role_name: 'New Role', role_order: draft.sections.length + 1, items: [] }); }); }
        function deleteRole(sectionIndex) { mutateEditor(function(draft){ draft.sections.splice(sectionIndex, 1); }); }
        function changeRoleName(sectionIndex, value) { mutateEditor(function(draft){ const section = draft.sections[sectionIndex]; if (!section) return; section.role_name = value; section.role_key = slugifyRoleKey(value || section.role_key || ('role_' + (sectionIndex + 1))); }); }
        function moveRole(sectionIndex, direction) { mutateEditor(function(draft){ const nextIndex = sectionIndex + direction; if (nextIndex < 0 || nextIndex >= draft.sections.length) return; const moved = draft.sections.splice(sectionIndex, 1)[0]; draft.sections.splice(nextIndex, 0, moved); }); }
        function addPerson(sectionIndex) { mutateEditor(function(draft){ const section = draft.sections[sectionIndex]; if (!section) return; section.items.push({ item_uuid: createUuidLike(), name: '', affiliation: '', person_order: section.items.length + 1 }); }); }
        function deletePerson(sectionIndex, itemIndex) { mutateEditor(function(draft){ const section = draft.sections[sectionIndex]; if (!section) return; section.items.splice(itemIndex, 1); }); }
        function changeItem(sectionIndex, itemIndex, field, value) { mutateEditor(function(draft){ const item = draft.sections[sectionIndex] && draft.sections[sectionIndex].items[itemIndex]; if (!item) return; item[field] = value; }); }
        function moveItem(sectionIndex, itemIndex, direction) { mutateEditor(function(draft){ const section = draft.sections[sectionIndex]; if (!section) return; const nextIndex = itemIndex + direction; if (nextIndex < 0 || nextIndex >= section.items.length) return; const moved = section.items.splice(itemIndex, 1)[0]; section.items.splice(nextIndex, 0, moved); }); }
        function changeVisible(nextVisible) { mutateEditor(function(draft){ draft.visible = nextVisible ? 1 : 0; }); }

        async function handleSave() {
            setIsSaving(true);
            try {
                const payload = snapshotBoardState(editorState);
                payload.note = note;
                const response = await fetch(CONFIG.api_save_url, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) });
                const result = normalizeBoardPayload(await response.json());
                setPublicPayload(result);
                setEditorState(snapshotBoardState(result));
                setVersions(Array.isArray(result.versions) ? result.versions : []);
                setHistory({ undo: [], redo: [] });
                setNote('');
            } catch (error) {
                window.alert('Failed to save Editorial Board.');
            } finally {
                setIsSaving(false);
            }
        }

        async function handleRestore(versionUuid) {
            if (!versionUuid) return;
            try {
                const response = await fetch(CONFIG.api_restore_url, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ version_uuid: versionUuid }) });
                const result = normalizeBoardPayload(await response.json());
                setPublicPayload(result);
                setEditorState(snapshotBoardState(result));
                setVersions(Array.isArray(result.versions) ? result.versions : []);
                setHistory({ undo: [], redo: [] });
            } catch (error) {
                window.alert('Failed to restore version.');
            }
        }

        const lang = uiState.lang;
        const isDark = !!uiState.isDark;
        const t = getTranslations(lang);
        const editorialPayload = CONFIG.mode === 'edit' ? editorState : publicPayload;
        return (
            <div className="flex flex-col">
                <div className="bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/header_blank.png')] bg-no-repeat bg-cover bg-center">
                    <div className="relative py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-1">
                        <Div_header t={t} />
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:pt-12 mt-8 lg:mt-12 border-t border-gray-600 md:grid-cols-2 w-full">
                            <Div_sub_card text={t.contents_card_text} url={'http://www.csam.or.kr/main.html'} url_name={t.visit_label} />
                            <Div_sub_card text={t.submit_card_text} sub_text={t.submit_card_sub_text} url={'http://submit.csam.or.kr/submission/Login.html'} url_name={t.link_label} />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8 mt-8">
                            <Div_sub_card_img img_url={'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kss.png'} text={'pISSN: 2287-7843'} />
                            <Div_sub_card_img img_url={'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kiss.png'} text={'eISSN: 2383-4757'} />
                        </div>
                    </div>
                </div>
                {CONFIG.mode === 'edit' ? (
                    <EditorPanel
                        t={t}
                        isDark={isDark}
                        state={editorState}
                        versions={versions}
                        note={note}
                        isSaving={isSaving}
                        canUndo={history.undo.length > 0}
                        canRedo={history.redo.length > 0}
                        onUndo={handleUndo}
                        onRedo={handleRedo}
                        onChangeVisible={changeVisible}
                        onAddRole={addRole}
                        onDeleteRole={deleteRole}
                        onChangeRoleName={changeRoleName}
                        onMoveRole={moveRole}
                        onAddPerson={addPerson}
                        onDeleteItem={deletePerson}
                        onChangeItem={changeItem}
                        onMoveItem={moveItem}
                        onSave={handleSave}
                        onRestore={handleRestore}
                        onNoteChange={setNote}
                    />
                ) : (
                    <EditorialBoardPublic payload={editorialPayload} t={t} isDark={isDark} />
                )}
                <EditFloatingButton show={CONFIG.mode !== 'edit' && !!CONFIG.can_manage_editorial_board} href={CONFIG.edit_url} label={t.edit_button || 'Edit'} />
            </div>
        );
    }

    ReactDOM.render(<App />, document.getElementById('div_main'));
}
