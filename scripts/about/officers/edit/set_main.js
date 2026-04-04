(() => {
            const configEl = document.getElementById('statkiss-officers-editor-config');
            let CONFIG = {};
            try {
                CONFIG = JSON.parse((configEl && configEl.textContent) || '{}');
            } catch (_) {
                CONFIG = {};
            }

            const TEXT = {
                en: {
                    title: 'Officers Editor',
                    subtitle: 'Edit officer terms, roles, and assignments in AliSQL.',
                    back: 'Back to Officers',
                    save: 'Save changes',
                    saving: 'Saving…',
                    reload: 'Reload',
                    add_term: 'Add term',
                    add_role: 'Add role',
                    add_officer: 'Add person',
                    term_name: 'Term name',
                    term_visible: 'Visible on public page',
                    term_on_duty: 'Current term (on duty)',
                    delete_term: 'Delete term',
                    role_name: 'Role name',
                    role_order: 'Display order',
                    delete_role: 'Delete role',
                    linked_user_uuid: 'Linked user UUID (optional)',
                    fallback_name: 'Fallback name',
                    fallback_email: 'Fallback email',
                    fallback_affiliation: 'Fallback affiliation',
                    delete_officer: 'Delete person',
                    display_preview: 'Display preview',
                    linked_user_active: 'Linked user found. Public display prefers userinfo fields and falls back to officer values only when a field is empty.',
                    linked_user_pending: 'If you enter a user UUID, save once to validate and refresh the linked user preview.',
                    no_terms: 'No officer terms yet. Add the first term to begin editing.',
                    no_roles: 'No roles in this term yet.',
                    no_officers: 'No people assigned to this role yet.',
                    load_error: 'Unable to load the officers editor data.',
                    save_success: 'Officer data has been saved.',
                    note_title: 'How this editor works',
                    note_roles: 'Roles named “Board of Directors” and “Incoming Board Member” are rendered in their special public sections. Other role names appear in the current officers section.',
                    note_linked: 'When uuid_user is connected to statkiss_user.v_d1_userinfo, name / email / affiliation are displayed from userinfo first, and fall back to the officer row only if the linked field is empty.',
                    note_delete: 'Delete actions here are saved as active=0 on the AliSQL officer tables.',
                    confirm_delete_term: 'Delete this term and all nested roles and officers?',
                    confirm_delete_role: 'Delete this role and all nested officers?',
                    confirm_delete_officer: 'Delete this officer entry?',
                    preview_empty: 'Nothing to display yet.',
                    uuid_hint: 'Use a uuid from statkiss_user.v_d1_userinfo when you want this officer linked to a user.',
                    save_error_prefix: 'Save failed:',
                    load_error_prefix: 'Load failed:',
                },
                ko: {
                    title: '임원진 편집',
                    subtitle: 'AliSQL의 임기, 역할, 임원 배정을 수정합니다.',
                    back: '임원진 페이지로',
                    save: '저장',
                    saving: '저장 중…',
                    reload: '다시 불러오기',
                    add_term: '임기 추가',
                    add_role: '역할 추가',
                    add_officer: '인원 추가',
                    term_name: '임기명',
                    term_visible: '공개 페이지에 표시',
                    term_on_duty: '현재 임기(on duty)',
                    delete_term: '임기 삭제',
                    role_name: '역할명',
                    role_order: '표시 순서',
                    delete_role: '역할 삭제',
                    linked_user_uuid: '연결된 사용자 UUID (선택)',
                    fallback_name: '대체 이름',
                    fallback_email: '대체 이메일',
                    fallback_affiliation: '대체 소속',
                    delete_officer: '인원 삭제',
                    display_preview: '표시 미리보기',
                    linked_user_active: '연결된 사용자를 찾았습니다. 공개 표시는 userinfo 값을 우선 사용하고, 해당 필드가 비어 있을 때만 officer 값을 사용합니다.',
                    linked_user_pending: '사용자 UUID를 입력했다면 한 번 저장해서 연결 여부와 미리보기를 갱신하세요.',
                    no_terms: '아직 임기 정보가 없습니다. 첫 임기를 추가해 주세요.',
                    no_roles: '이 임기에 아직 역할이 없습니다.',
                    no_officers: '이 역할에 아직 배정된 인원이 없습니다.',
                    load_error: '임원진 편집 데이터를 불러오지 못했습니다.',
                    save_success: '임원진 정보가 저장되었습니다.',
                    note_title: '편집 규칙',
                    note_roles: '역할명이 “Board of Directors” 또는 “Incoming Board Member”이면 공개 페이지에서 해당 전용 섹션으로 렌더링됩니다. 그 외 역할은 current officers 섹션에 표시됩니다.',
                    note_linked: 'uuid_user가 statkiss_user.v_d1_userinfo와 연결되면 name / email / affiliation은 userinfo 값을 우선 사용하고, 해당 필드가 비어 있을 때만 officer 행의 값을 사용합니다.',
                    note_delete: '여기서의 삭제는 AliSQL officer 계열 테이블에서 active=0으로 저장됩니다.',
                    confirm_delete_term: '이 임기와 하위 역할/임원 정보를 삭제할까요?',
                    confirm_delete_role: '이 역할과 하위 임원 정보를 삭제할까요?',
                    confirm_delete_officer: '이 임원 정보를 삭제할까요?',
                    preview_empty: '아직 표시할 값이 없습니다.',
                    uuid_hint: '사용자와 연결하려면 statkiss_user.v_d1_userinfo의 uuid를 넣으세요.',
                    save_error_prefix: '저장 실패:',
                    load_error_prefix: '불러오기 실패:',
                },
            };

            function getI18N() {
                return window.StatKISS_I18N || null;
            }

            function resolveLang(value) {
                const I = getI18N();
                if (I && typeof I.resolveLangCode === 'function') {
                    return I.resolveLangCode(value || 'en');
                }
                const raw = String(value || 'en').trim();
                if (!raw) return 'en';
                if (raw.toLowerCase().startsWith('ko')) return 'ko';
                return raw;
            }

            function currentLang() {
                return resolveLang(CONFIG.lang || document.documentElement.getAttribute('lang') || 'en');
            }

            function t(key) {
                const lang = currentLang();
                const dict = TEXT[lang] || TEXT[(lang || '').split('-')[0]] || TEXT.en;
                return (dict && dict[key]) || TEXT.en[key] || key;
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
                const response = await fetch(CONFIG.api_get_url, {
                    method: 'GET',
                    credentials: 'same-origin',
                    cache: 'no-store',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                const payload = await response.json();
                if (!response.ok) {
                    throw new Error((payload && payload.message) || `HTTP ${response.status}`);
                }
                if (!payload.ok) {
                    throw new Error(payload.message || t('load_error'));
                }
                return payload;
            }

            async function saveEditorPayload(terms) {
                const response = await fetch(CONFIG.api_save_url, {
                    method: 'POST',
                    credentials: 'same-origin',
                    cache: 'no-store',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({ terms: serializeTerms(terms) }),
                });
                const payload = await response.json();
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
                                            href={CONFIG.officers_public_path || '/about/officers/'}
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
                ReactDOM.render(<EditorPage />, document.getElementById('div_main'));
            }

            window.set_main = set_main;
        })();
