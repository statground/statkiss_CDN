(() => {
    'use strict';

    const I18N_PREFIX = 'officers_edit.';

    function getI18N() {
        return window.StatKISS_I18N || null;
    }

    function getEditorI18N() {
        return window.StatKISS_OfficersEditor || null;
    }

    function safeJsonParse(text, fallback = {}) {
        try {
            const parsed = JSON.parse(text || '{}');
            return parsed && typeof parsed === 'object' ? parsed : fallback;
        } catch (_) {
            return fallback;
        }
    }

    function readEditorConfig() {
        const configEl = document.getElementById('statkiss-officers-editor-config');
        if (!configEl) return {};
        return safeJsonParse(configEl.textContent || '{}', {});
    }

    function inferLangFromPath() {
        const pathname = window.location.pathname || '/';
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length >= 2 && parts[1] === 'about') {
            return parts[0];
        }
        return '';
    }

    function inferAboutBasePath() {
        const pathname = window.location.pathname || '/';
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length >= 2 && parts[1] === 'about') {
            return `/${parts[0]}/about`;
        }
        if (parts.length >= 1 && parts[0] === 'about') {
            return '/about';
        }
        return '/about';
    }

    function resolveLang(value) {
        const editorI18N = getEditorI18N();
        if (editorI18N && typeof editorI18N.resolveLangCode === 'function') {
            return editorI18N.resolveLangCode(value || 'en');
        }

        const I = getI18N();
        if (I && typeof I.resolveLangCode === 'function') {
            return I.resolveLangCode(value || 'en');
        }

        const raw = String(value || 'en').trim();
        if (!raw) return 'en';

        const lower = raw.toLowerCase();
        if (lower === 'zh' || lower.startsWith('zh-')) {
            if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) {
                return 'zh-Hant';
            }
            return 'zh-Hans';
        }
        if (lower.startsWith('ko-')) return 'ko';
        if (lower.startsWith('ja-')) return 'ja';
        if (lower.startsWith('en-')) return 'en';
        return raw;
    }

    function getConfig() {
        const basePath = inferAboutBasePath();
        const inferredLang = inferLangFromPath() || document.documentElement.getAttribute('lang') || 'en';
        const inferred = {
            lang: resolveLang(inferredLang),
            can_manage_officers: false,
            officers_public_path: `${basePath}/officers/`,
            officers_edit_path: `${basePath}/officers/edit/`,
            api_get_url: `${basePath}/ajax_get_officer_editor_payload/`,
            api_save_url: `${basePath}/ajax_save_officer_editor_payload/`,
        };
        const provided = readEditorConfig();
        return {
            ...inferred,
            ...provided,
            lang: resolveLang((provided && provided.lang) || inferred.lang),
        };
    }

    function currentLang() {
        const config = getConfig();
        const editorI18N = getEditorI18N();
        if (editorI18N && typeof editorI18N.getCurrentLang === 'function') {
            return editorI18N.getCurrentLang(config.lang);
        }
        return resolveLang(config.lang || document.documentElement.getAttribute('lang') || 'en');
    }

    function t(key) {
        const lang = currentLang();
        const editorI18N = getEditorI18N();
        if (editorI18N && typeof editorI18N.t === 'function') {
            return editorI18N.t(lang, key);
        }

        const I = getI18N();
        const fullKey = `${I18N_PREFIX}${key}`;
        if (I && typeof I.t === 'function') {
            return I.t(lang, fullKey);
        }
        return key;
    }

    async function readJsonResponse(response) {
        const rawText = await response.text();
        if (!rawText) {
            return {};
        }
        try {
            return JSON.parse(rawText);
        } catch (_) {
            return {
                ok: false,
                message: rawText,
            };
        }
    }

function deepClone(value) {

                if (typeof structuredClone === 'function') {
                    return structuredClone(value);
                }
                return JSON.parse(JSON.stringify(value));
            }

            function makeClientId(prefix) {
                if (window.crypto && typeof window.crypto.randomUUID === 'function') {
                    return `${prefix}-${window.crypto.randomUUID()}`;
                }
                return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            }

            function normalizeFlag(value, fallback = 0) {
                if (typeof value === 'boolean') return value ? 1 : 0;
                if (value === null || value === undefined || value === '') return fallback;
                return Number(value) ? 1 : 0;
            }

            function ensureClientIds(terms) {
                return (Array.isArray(terms) ? terms : []).map((term) => ({
                    ...term,
                    visible: normalizeFlag(term.visible, 1),
                    on_duty: normalizeFlag(term.on_duty, 0),
                    _clientId: term._clientId || term.uuid || makeClientId('term'),
                    roles: (Array.isArray(term.roles) ? term.roles : []).map((role) => ({
                        ...role,
                        order: Number(role.order || 0),
                        _clientId: role._clientId || role.uuid || makeClientId('role'),
                        officers: (Array.isArray(role.officers) ? role.officers : []).map((officer) => ({
                            ...officer,
                            _clientId: officer._clientId || officer.uuid || makeClientId('officer'),
                            linked_user_found: normalizeFlag(officer.linked_user_found, 0),
                        })),
                    })),
                }));
            }

            function serializeTerms(terms) {
                return (Array.isArray(terms) ? terms : []).map((term) => ({
                    uuid: term.uuid || '',
                    name: term.name || '',
                    visible: normalizeFlag(term.visible, 1),
                    on_duty: normalizeFlag(term.on_duty, 0),
                    roles: (Array.isArray(term.roles) ? term.roles : []).map((role) => ({
                        uuid: role.uuid || '',
                        name: role.name || '',
                        order: Number(role.order || 0),
                        officers: (Array.isArray(role.officers) ? role.officers : []).map((officer) => ({
                            uuid: officer.uuid || '',
                            uuid_user: officer.uuid_user || '',
                            name: officer.name || '',
                            email: officer.email || '',
                            affiliation: officer.affiliation || '',
                        })),
                    })),
                }));
            }

            async function fetchEditorPayload() {
                const response = await fetch(getConfig().api_get_url, {
                    method: 'GET',
                    credentials: 'same-origin',
                    cache: 'no-store',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                const payload = await readJsonResponse(response);
                if (!response.ok) {
                    throw new Error((payload && payload.message) || `HTTP ${response.status}`);
                }
                if (!payload.ok) {
                    throw new Error(payload.message || t('load_error'));
                }
                return payload;
            }

            async function saveEditorPayload(terms) {
                const response = await fetch(getConfig().api_save_url, {
                    method: 'POST',
                    credentials: 'same-origin',
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ terms: serializeTerms(terms) }),
                });
                const payload = await readJsonResponse(response);
                if (!response.ok) {
                    throw new Error((payload && payload.message) || `HTTP ${response.status}`);
                }
                if (!payload.ok) {
                    throw new Error(payload.message || t('save_error_prefix'));
                }
                return payload;
            }

            function EmptyPreview() {
                return <span className="text-xs text-slate-500 dark:text-slate-400">{t('preview_empty')}</span>;
            }

            function PreviewLine({ label, value }) {
                return (
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
                        <span className="text-sm text-slate-900 dark:text-slate-100 break-all">{value || '—'}</span>
                    </div>
                );
            }

            function OfficerCard({ officer, onChange, onDelete }) {
                const previewName = (officer.linked_name || officer.name || '').trim();
                const previewEmail = (officer.linked_email || officer.email || '').trim();
                const previewAffiliation = (officer.linked_affiliation || officer.affiliation || '').trim();
                const hasPreview = Boolean(previewName || previewEmail || previewAffiliation);
                const linkMessage = officer.uuid_user
                    ? (officer.linked_user_found ? t('linked_user_active') : t('linked_user_pending'))
                    : t('uuid_hint');

                return (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-950/60">
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('linked_user_uuid')}</label>
                                    <input
                                        type="text"
                                        value={officer.uuid_user || ''}
                                        onChange={(event) => onChange({
                                            uuid_user: event.target.value,
                                            linked_name: '',
                                            linked_email: '',
                                            linked_affiliation: '',
                                            linked_user_found: 0,
                                        })}
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                    />
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{linkMessage}</p>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('fallback_name')}</label>
                                        <input
                                            type="text"
                                            value={officer.name || ''}
                                            onChange={(event) => onChange({ name: event.target.value })}
                                            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('fallback_email')}</label>
                                        <input
                                            type="email"
                                            value={officer.email || ''}
                                            onChange={(event) => onChange({ email: event.target.value })}
                                            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('fallback_affiliation')}</label>
                                    <input
                                        type="text"
                                        value={officer.affiliation || ''}
                                        onChange={(event) => onChange({ affiliation: event.target.value })}
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-between rounded-xl border border-dashed border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                                <div>
                                    <h4 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">{t('display_preview')}</h4>
                                    <div className="grid gap-3">
                                        {hasPreview ? (
                                            <>
                                                <PreviewLine label={t('fallback_name')} value={previewName} />
                                                <PreviewLine label={t('fallback_email')} value={previewEmail} />
                                                <PreviewLine label={t('fallback_affiliation')} value={previewAffiliation} />
                                            </>
                                        ) : (
                                            <EmptyPreview />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        className="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 dark:hover:border-rose-800"
                                    >
                                        {t('delete_officer')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            function RoleCard({ role, onChange, onDelete, onAddOfficer, onUpdateOfficer, onDeleteOfficer }) {
                return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                            <div className="grid flex-1 gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('role_name')}</label>
                                    <input
                                        type="text"
                                        value={role.name || ''}
                                        onChange={(event) => onChange({ name: event.target.value })}
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('role_order')}</label>
                                    <input
                                        type="number"
                                        value={role.order ?? 0}
                                        onChange={(event) => onChange({ order: event.target.value })}
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={onAddOfficer}
                                    className="inline-flex items-center rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-800"
                                >
                                    {t('add_officer')}
                                </button>
                                <button
                                    type="button"
                                    onClick={onDelete}
                                    className="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 dark:hover:border-rose-800"
                                >
                                    {t('delete_role')}
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 space-y-4">
                            {role.officers && role.officers.length ? (
                                role.officers.map((officer) => (
                                    <OfficerCard
                                        key={officer._clientId}
                                        officer={officer}
                                        onChange={(patch) => onUpdateOfficer(officer._clientId, patch)}
                                        onDelete={() => onDeleteOfficer(officer._clientId)}
                                    />
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                                    {t('no_officers')}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }

            function TermCard({ term, onChange, onDelete, onAddRole, onUpdateRole, onDeleteRole, onAddOfficer, onUpdateOfficer, onDeleteOfficer }) {
                return (
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">{t('term_name')}</label>
                                    <input
                                        type="text"
                                        value={term.name || ''}
                                        onChange={(event) => onChange({ name: event.target.value })}
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-5">
                                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(term.visible)}
                                            onChange={(event) => onChange({ visible: event.target.checked ? 1 : 0 })}
                                            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
                                        />
                                        <span>{t('term_visible')}</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(term.on_duty)}
                                            onChange={(event) => onChange({ on_duty: event.target.checked ? 1 : 0 })}
                                            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
                                        />
                                        <span>{t('term_on_duty')}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={onAddRole}
                                    className="inline-flex items-center rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-800"
                                >
                                    {t('add_role')}
                                </button>
                                <button
                                    type="button"
                                    onClick={onDelete}
                                    className="inline-flex items-center rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 dark:hover:border-rose-800"
                                >
                                    {t('delete_term')}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            {term.roles && term.roles.length ? (
                                term.roles.map((role) => (
                                    <RoleCard
                                        key={role._clientId}
                                        role={role}
                                        onChange={(patch) => onUpdateRole(role._clientId, patch)}
                                        onDelete={() => onDeleteRole(role._clientId)}
                                        onAddOfficer={() => onAddOfficer(role._clientId)}
                                        onUpdateOfficer={(officerId, patch) => onUpdateOfficer(role._clientId, officerId, patch)}
                                        onDeleteOfficer={(officerId) => onDeleteOfficer(role._clientId, officerId)}
                                    />
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                                    {t('no_roles')}
                                </div>
                            )}
                        </div>
                    </section>
                );
            }

            function EditorPage() {
                const [terms, setTerms] = React.useState([]);
                const [loading, setLoading] = React.useState(true);
                const [saving, setSaving] = React.useState(false);
                const [error, setError] = React.useState('');
                const [message, setMessage] = React.useState('');

                const load = React.useCallback(async () => {
                    setLoading(true);
                    setError('');
                    try {
                        const payload = await fetchEditorPayload();
                        setTerms(ensureClientIds(payload.terms || []));
                    } catch (err) {
                        setError(`${t('load_error_prefix')} ${String((err && err.message) || err || t('load_error'))}`);
                    } finally {
                        setLoading(false);
                    }
                }, []);

                React.useEffect(() => {
                    load();
                }, [load]);

                function mutateTerms(mutator) {
                    setTerms((prev) => {
                        const next = deepClone(prev);
                        mutator(next);
                        return next;
                    });
                }

                function findTermIndex(nextTerms, termId) {
                    return nextTerms.findIndex((item) => item._clientId === termId);
                }

                function createEmptyTerm() {
                    return {
                        uuid: '',
                        name: '',
                        visible: 1,
                        on_duty: 0,
                        roles: [],
                        _clientId: makeClientId('term'),
                    };
                }

                function createEmptyRole() {
                    return {
                        uuid: '',
                        name: '',
                        order: 0,
                        officers: [],
                        _clientId: makeClientId('role'),
                    };
                }

                function createEmptyOfficer() {
                    return {
                        uuid: '',
                        uuid_user: '',
                        name: '',
                        email: '',
                        affiliation: '',
                        linked_name: '',
                        linked_email: '',
                        linked_affiliation: '',
                        linked_user_found: 0,
                        _clientId: makeClientId('officer'),
                    };
                }

                function updateTerm(termId, patch) {
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        next[termIndex] = { ...next[termIndex], ...patch };
                    });
                }

                function deleteTerm(termId) {
                    if (!window.confirm(t('confirm_delete_term'))) return;
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        next.splice(termIndex, 1);
                    });
                }

                function addTerm() {
                    setTerms((prev) => [...prev, createEmptyTerm()]);
                }

                function addRole(termId) {
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        next[termIndex].roles = [...(next[termIndex].roles || []), createEmptyRole()];
                    });
                }

                function updateRole(termId, roleId, patch) {
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        const roleIndex = (next[termIndex].roles || []).findIndex((item) => item._clientId === roleId);
                        if (roleIndex === -1) return;
                        next[termIndex].roles[roleIndex] = { ...next[termIndex].roles[roleIndex], ...patch };
                    });
                }

                function deleteRole(termId, roleId) {
                    if (!window.confirm(t('confirm_delete_role'))) return;
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        const roleIndex = (next[termIndex].roles || []).findIndex((item) => item._clientId === roleId);
                        if (roleIndex === -1) return;
                        next[termIndex].roles.splice(roleIndex, 1);
                    });
                }

                function addOfficer(termId, roleId) {
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        const roleIndex = (next[termIndex].roles || []).findIndex((item) => item._clientId === roleId);
                        if (roleIndex === -1) return;
                        next[termIndex].roles[roleIndex].officers = [
                            ...(next[termIndex].roles[roleIndex].officers || []),
                            createEmptyOfficer(),
                        ];
                    });
                }

                function updateOfficer(termId, roleId, officerId, patch) {
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        const roleIndex = (next[termIndex].roles || []).findIndex((item) => item._clientId === roleId);
                        if (roleIndex === -1) return;
                        const officerIndex = (next[termIndex].roles[roleIndex].officers || []).findIndex((item) => item._clientId === officerId);
                        if (officerIndex === -1) return;
                        next[termIndex].roles[roleIndex].officers[officerIndex] = {
                            ...next[termIndex].roles[roleIndex].officers[officerIndex],
                            ...patch,
                        };
                    });
                }

                function deleteOfficer(termId, roleId, officerId) {
                    if (!window.confirm(t('confirm_delete_officer'))) return;
                    mutateTerms((next) => {
                        const termIndex = findTermIndex(next, termId);
                        if (termIndex === -1) return;
                        const roleIndex = (next[termIndex].roles || []).findIndex((item) => item._clientId === roleId);
                        if (roleIndex === -1) return;
                        const officerIndex = (next[termIndex].roles[roleIndex].officers || []).findIndex((item) => item._clientId === officerId);
                        if (officerIndex === -1) return;
                        next[termIndex].roles[roleIndex].officers.splice(officerIndex, 1);
                    });
                }

                async function handleSave() {
                    setSaving(true);
                    setError('');
                    setMessage('');
                    try {
                        const payload = await saveEditorPayload(terms);
                        setTerms(ensureClientIds(payload.terms || []));
                        setMessage(payload.message || t('save_success'));
                    } catch (err) {
                        setError(`${t('save_error_prefix')} ${String((err && err.message) || err)}`);
                    } finally {
                        setSaving(false);
                    }
                }

                return (
                    <main className="min-h-screen bg-slate-50 py-8 dark:bg-slate-950">
                        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 lg:px-6">
                            <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('title')}</h1>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href={getConfig().officers_public_path || `${inferAboutBasePath()}/officers/`}
                                            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600"
                                        >
                                            {t('back')}
                                        </a>
                                        <button
                                            type="button"
                                            onClick={addTerm}
                                            className="inline-flex items-center rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-800"
                                        >
                                            {t('add_term')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:border-emerald-800"
                                        >
                                            {saving ? t('saving') : t('save')}
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
                                    <h2 className="mb-2 font-semibold">{t('note_title')}</h2>
                                    <ul className="list-disc space-y-1 pl-5">
                                        <li>{t('note_roles')}</li>
                                        <li>{t('note_linked')}</li>
                                        <li>{t('note_delete')}</li>
                                    </ul>
                                </div>

                                {error ? (
                                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
                                        {error}
                                    </div>
                                ) : null}

                                {message ? (
                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                                        {message}
                                    </div>
                                ) : null}
                            </header>

                            {loading ? (
                                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-800"></div>
                                        <div className="h-12 rounded bg-slate-100 dark:bg-slate-800"></div>
                                        <div className="h-40 rounded bg-slate-100 dark:bg-slate-800"></div>
                                    </div>
                                </section>
                            ) : terms.length ? (
                                terms.map((term) => (
                                    <TermCard
                                        key={term._clientId}
                                        term={term}
                                        onChange={(patch) => updateTerm(term._clientId, patch)}
                                        onDelete={() => deleteTerm(term._clientId)}
                                        onAddRole={() => addRole(term._clientId)}
                                        onUpdateRole={(roleId, patch) => updateRole(term._clientId, roleId, patch)}
                                        onDeleteRole={(roleId) => deleteRole(term._clientId, roleId)}
                                        onAddOfficer={(roleId) => addOfficer(term._clientId, roleId)}
                                        onUpdateOfficer={(roleId, officerId, patch) => updateOfficer(term._clientId, roleId, officerId, patch)}
                                        onDeleteOfficer={(roleId, officerId) => deleteOfficer(term._clientId, roleId, officerId)}
                                    />
                                ))
                            ) : (
                                <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{t('no_terms')}</p>
                                    <div className="mt-4 flex justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={addTerm}
                                            className="inline-flex items-center rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-800"
                                        >
                                            {t('add_term')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={load}
                                            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600"
                                        >
                                            {t('reload')}
                                        </button>
                                    </div>
                                </section>
                            )}
                        </div>
                    </main>
                );
            }

            function set_main() {
                const rootElement = document.getElementById('div_main');
                if (!rootElement) return;
                ReactDOM.render(<EditorPage />, rootElement);
            }

            window.set_main = set_main;
        })();
