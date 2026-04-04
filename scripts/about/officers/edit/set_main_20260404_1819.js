(function () {
  'use strict';

  function parseJSONSafe(text, fallback) {
    try {
      return JSON.parse(text);
    } catch (_) {
      return fallback;
    }
  }

  const configEl = document.getElementById('statkiss-officers-editor-config');
  const RAW_CONFIG = parseJSONSafe((configEl && configEl.textContent) || '{}', {});

  function getGlobalI18N() {
    return window.StatKISS_I18N || null;
  }

  function getEditorI18N() {
    return window.StatKISS_I18N_OFFICERS_EDIT || null;
  }

  function resolveLang(value) {
    const helper = getGlobalI18N();
    if (helper && typeof helper.resolveLangCode === 'function') return helper.resolveLangCode(value || 'en');
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
    return resolveLang(RAW_CONFIG.lang || document.documentElement.getAttribute('lang') || navigator.language || 'en');
  }

  function t(key) {
    const lang = currentLang();
    const editor = getEditorI18N();
    if (editor && typeof editor.t === 'function') return editor.t(lang, key);
    const helper = getGlobalI18N();
    if (helper && typeof helper.t === 'function') return helper.t(lang, key);
    return key;
  }

  function getSupportedLangCodes() {
    const helper = getGlobalI18N();
    if (helper && Array.isArray(helper.languages)) {
      return helper.languages.map((item) => item.code);
    }
    return ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant'];
  }

  function inferAboutBasePath() {
    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    const supported = getSupportedLangCodes();
    if (parts.length && supported.includes(parts[0])) {
      return `/${parts[0]}/about/`;
    }
    return '/about/';
  }

  function buildConfig(raw) {
    const aboutBase = inferAboutBasePath();
    return {
      lang: raw.lang || currentLang(),
      can_manage_officers: Boolean(raw.can_manage_officers),
      officers_public_path: raw.officers_public_path || `${aboutBase}officers/`,
      officers_edit_path: raw.officers_edit_path || `${aboutBase}officers/edit/`,
      api_get_url: raw.api_get_url || `${aboutBase}ajax_get_officer_editor_payload/`,
      api_save_url: raw.api_save_url || `${aboutBase}ajax_save_officer_editor_payload/`,
      api_search_users_url: raw.api_search_users_url || `${aboutBase}ajax_search_officer_users/`,
      api_restore_version_url: raw.api_restore_version_url || `${aboutBase}ajax_restore_officer_editor_version/`,
    };
  }

  const CONFIG = buildConfig(RAW_CONFIG || {});
  const HISTORY_LIMIT = 120;

  function deepClone(value) {
    if (typeof structuredClone === 'function') return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function makeClientId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return `${prefix}-${window.crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function normalizeFlag(value, fallback) {
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (value === null || value === undefined || value === '') return fallback;
    return Number(value) ? 1 : 0;
  }

  function normalizeText(value) {
    return String(value || '').trim();
  }

  function normalizeTerms(rawTerms) {
    return (Array.isArray(rawTerms) ? rawTerms : []).map((term) => ({
      ...term,
      visible: normalizeFlag(term.visible, 1),
      on_duty: normalizeFlag(term.on_duty, 0),
      _clientId: term._clientId || term.uuid || makeClientId('term'),
      roles: (Array.isArray(term.roles) ? term.roles : []).map((role) => ({
        ...role,
        order: Number(role.order || 0),
        _clientId: role._clientId || role.uuid || makeClientId('role'),
        officers: (Array.isArray(role.officers) ? role.officers : []).map((officer) => {
          const next = {
            ...officer,
            uuid_user: normalizeText(officer.uuid_user),
            name: normalizeText(officer.name),
            email: normalizeText(officer.email),
            affiliation: normalizeText(officer.affiliation),
            linked_name: normalizeText(officer.linked_name),
            linked_email: normalizeText(officer.linked_email),
            linked_affiliation: normalizeText(officer.linked_affiliation),
            linked_user_found: normalizeFlag(officer.linked_user_found, 0),
            _clientId: officer._clientId || officer.uuid || makeClientId('officer'),
          };
          next.resolved_name = normalizeText(officer.resolved_name || next.linked_name || next.name);
          next.resolved_email = normalizeText(officer.resolved_email || next.linked_email || next.email);
          next.resolved_affiliation = normalizeText(officer.resolved_affiliation || next.linked_affiliation || next.affiliation);
          return next;
        }),
      })),
    }));
  }

  function normalizeVersions(rawVersions) {
    return (Array.isArray(rawVersions) ? rawVersions : []).map((version) => ({
      version_seq: Number(version.version_seq || 0),
      uuid: normalizeText(version.uuid),
      action: normalizeText(version.action || 'save'),
      source_version_uuid: normalizeText(version.source_version_uuid),
      note: normalizeText(version.note),
      created_at: normalizeText(version.created_at),
      created_by_uuid: normalizeText(version.created_by_uuid),
      created_by_email: normalizeText(version.created_by_email),
      created_by_name: normalizeText(version.created_by_name),
    }));
  }

  function serializeTerms(terms) {
    return (Array.isArray(terms) ? terms : []).map((term) => ({
      uuid: term.uuid || '',
      name: normalizeText(term.name),
      visible: normalizeFlag(term.visible, 1),
      on_duty: normalizeFlag(term.on_duty, 0),
      roles: (Array.isArray(term.roles) ? term.roles : []).map((role) => ({
        uuid: role.uuid || '',
        name: normalizeText(role.name),
        order: Number(role.order || 0),
        officers: (Array.isArray(role.officers) ? role.officers : []).map((officer) => ({
          uuid: officer.uuid || '',
          uuid_user: normalizeText(officer.uuid_user),
          name: normalizeText(officer.name),
          email: normalizeText(officer.email),
          affiliation: normalizeText(officer.affiliation),
        })),
      })),
    }));
  }

  function selectionEquals(a, b) {
    return (a?.termId || '') === (b?.termId || '')
      && (a?.roleId || '') === (b?.roleId || '')
      && (a?.officerId || '') === (b?.officerId || '');
  }

  function deriveSelection(terms, previous) {
    const next = { termId: '', roleId: '', officerId: '' };
    const term = (Array.isArray(terms) ? terms : []).find((item) => item._clientId === previous?.termId) || (terms && terms[0]) || null;
    if (!term) return next;
    next.termId = term._clientId;

    const roles = Array.isArray(term.roles) ? term.roles : [];
    const role = roles.find((item) => item._clientId === previous?.roleId) || roles[0] || null;
    if (!role) return next;
    next.roleId = role._clientId;

    const officers = Array.isArray(role.officers) ? role.officers : [];
    const officer = officers.find((item) => item._clientId === previous?.officerId) || officers[0] || null;
    next.officerId = officer ? officer._clientId : '';
    return next;
  }

  function findSelectedTerm(terms, selection) {
    return (Array.isArray(terms) ? terms : []).find((item) => item._clientId === selection.termId) || null;
  }

  function findSelectedRole(term, selection) {
    return (Array.isArray(term?.roles) ? term.roles : []).find((item) => item._clientId === selection.roleId) || null;
  }

  function findSelectedOfficer(role, selection) {
    return (Array.isArray(role?.officers) ? role.officers : []).find((item) => item._clientId === selection.officerId) || null;
  }

  function summarizeOfficer(officer) {
    const name = normalizeText(officer?.resolved_name || officer?.linked_name || officer?.name) || '—';
    const secondary = normalizeText(officer?.resolved_affiliation || officer?.linked_affiliation || officer?.affiliation)
      || normalizeText(officer?.resolved_email || officer?.linked_email || officer?.email)
      || '—';
    return { name, secondary };
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
      resolved_name: '',
      resolved_email: '',
      resolved_affiliation: '',
      linked_user_found: 0,
      _clientId: makeClientId('officer'),
    };
  }

  async function requestJSON(url, options) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      cache: 'no-store',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(options && options.headers ? options.headers : {}),
      },
      ...(options || {}),
    });

    const text = await response.text();
    const payload = parseJSONSafe(text || '{}', null);
    if (!response.ok) {
      throw new Error((payload && (payload.message || payload.error)) || `HTTP ${response.status}`);
    }
    if (!payload) {
      throw new Error('Invalid server response.');
    }
    if (payload.ok === false) {
      throw new Error(payload.message || 'Request failed.');
    }
    return payload;
  }

  async function fetchEditorPayload() {
    return requestJSON(CONFIG.api_get_url, { method: 'GET' });
  }

  async function saveEditorPayload(terms) {
    return requestJSON(CONFIG.api_save_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terms: serializeTerms(terms) }),
    });
  }

  async function searchOfficerUsers(keyword) {
    const url = `${CONFIG.api_search_users_url}?q=${encodeURIComponent(keyword)}`;
    const payload = await requestJSON(url, { method: 'GET' });
    return Array.isArray(payload.items) ? payload.items : [];
  }

  async function restoreEditorVersion(versionUuid) {
    return requestJSON(CONFIG.api_restore_version_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ version_uuid: versionUuid }),
    });
  }

  function Badge({ children, tone }) {
    const toneMap = {
      sky: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200',
      emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
      slate: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300',
      amber: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
      rose: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200',
    };
    return (
      <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${toneMap[tone] || toneMap.slate}`}>
        {children}
      </span>
    );
  }

  function SmallIconButton({ children, onClick, disabled, tone = 'slate', title }) {
    const toneMap = {
      slate: 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600',
      sky: 'border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-800',
      emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:border-emerald-800',
      rose: 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 dark:hover:border-rose-800',
    };
    return (
      <button
        type="button"
        title={title}
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${toneMap[tone] || toneMap.slate}`}
      >
        {children}
      </button>
    );
  }

  function TextInput({ label, value, onChange, type = 'text', placeholder, onFocus }) {
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
        <input
          type={type}
          value={value}
          onFocus={onFocus}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900"
        />
      </label>
    );
  }

  function Checkbox({ label, checked, onChange }) {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
        <input
          type="checkbox"
          checked={Boolean(checked)}
          onChange={(event) => onChange(event.target.checked ? 1 : 0)}
          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950"
        />
        <span>{label}</span>
      </label>
    );
  }

  function VersionPanel({ versions, versioningEnabled, onRestore, restoringVersionUuid }) {
    function actionLabel(action) {
      if (action === 'restore') return t('officersEdit.actionRestore');
      if (action === 'baseline') return t('officersEdit.actionBaseline');
      return t('officersEdit.actionSave');
    }

    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.versionTitle')}</h2>
          <Badge tone="amber">{versions.length}</Badge>
        </div>

        {!versioningEnabled ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t('officersEdit.versionUnavailable')}</p>
        ) : versions.length ? (
          <div className="mt-4 space-y-3">
            {versions.map((version) => (
              <div key={version.uuid} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">#{version.version_seq}</span>
                      <Badge tone={version.action === 'restore' ? 'emerald' : version.action === 'baseline' ? 'amber' : 'sky'}>
                        {actionLabel(version.action)}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{version.created_at || '—'}</p>
                    {(version.created_by_name || version.created_by_email) ? (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {t('officersEdit.savedBy')}: {version.created_by_name || version.created_by_email}
                      </p>
                    ) : null}
                  </div>
                  <SmallIconButton
                    tone="emerald"
                    disabled={restoringVersionUuid === version.uuid}
                    onClick={() => onRestore(version)}
                  >
                    {restoringVersionUuid === version.uuid ? t('officersEdit.restoring') : t('officersEdit.restore')}
                  </SmallIconButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t('officersEdit.versionEmpty')}</p>
        )}
      </section>
    );
  }

  function TermSidebar({ terms, selectedTermId, onSelectTerm, onAddTerm }) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.termList')}</h2>
          <SmallIconButton tone="sky" onClick={onAddTerm}>{t('officersEdit.addTerm')}</SmallIconButton>
        </div>

        {terms.length ? (
          <div className="mt-4 space-y-3">
            {terms.map((term) => (
              <button
                key={term._clientId}
                type="button"
                onClick={() => onSelectTerm(term._clientId)}
                className={`block w-full rounded-2xl border px-4 py-4 text-left transition ${selectedTermId === term._clientId
                  ? 'border-sky-300 bg-sky-50 shadow-sm dark:border-sky-800 dark:bg-sky-950'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{term.name || '—'}</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {(term.roles || []).length} role{(term.roles || []).length === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {term.on_duty ? <Badge tone="emerald">{t('officersEdit.badgeOnDuty')}</Badge> : null}
                    <Badge tone={term.visible ? 'sky' : 'slate'}>
                      {term.visible ? t('officersEdit.badgeVisible') : t('officersEdit.badgeHidden')}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center dark:border-slate-700 dark:bg-slate-950">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t('officersEdit.noTerms')}</p>
            <div className="mt-4">
              <SmallIconButton tone="sky" onClick={onAddTerm}>{t('officersEdit.createFirstTerm')}</SmallIconButton>
            </div>
          </div>
        )}
      </section>
    );
  }

  function RoleCard({
    termId,
    role,
    selectedRoleId,
    selectedOfficerId,
    onSelectRole,
    onSelectOfficer,
    onUpdateRole,
    onDeleteRole,
    onAddOfficer,
  }) {
    return (
      <section
        className={`rounded-2xl border p-4 shadow-sm transition ${selectedRoleId === role._clientId
          ? 'border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/60'
          : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'}`}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="grid flex-1 gap-3 md:grid-cols-[minmax(0,1fr)_140px]" onClick={() => onSelectRole(termId, role._clientId)}>
            <TextInput
              label={t('officersEdit.roleName')}
              value={role.name || ''}
              onChange={(value) => onUpdateRole(termId, role._clientId, { name: value })}
              onFocus={() => onSelectRole(termId, role._clientId)}
            />
            <TextInput
              label={t('officersEdit.roleOrder')}
              type="number"
              value={role.order ?? 0}
              onChange={(value) => onUpdateRole(termId, role._clientId, { order: value })}
              onFocus={() => onSelectRole(termId, role._clientId)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <SmallIconButton tone="sky" onClick={() => onAddOfficer(termId, role._clientId)}>{t('officersEdit.addOfficer')}</SmallIconButton>
            <SmallIconButton tone="rose" onClick={() => onDeleteRole(termId, role._clientId)}>{t('officersEdit.deleteRole')}</SmallIconButton>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.officerList')}</h4>
            <Badge tone="slate">{(role.officers || []).length}</Badge>
          </div>

          {(role.officers || []).length ? (
            <div className="grid gap-2">
              {role.officers.map((officer) => {
                const summary = summarizeOfficer(officer);
                const isSelected = selectedOfficerId === officer._clientId;
                return (
                  <button
                    key={officer._clientId}
                    type="button"
                    onClick={() => onSelectOfficer(termId, role._clientId, officer._clientId)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${isSelected
                      ? 'border-sky-300 bg-white shadow-sm dark:border-sky-700 dark:bg-slate-900'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{summary.name}</div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{summary.secondary}</div>
                      </div>
                      {officer.uuid_user ? <Badge tone="emerald">{t('officersEdit.linkedAccount')}</Badge> : null}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
              {t('officersEdit.noOfficers')}
            </div>
          )}
        </div>
      </section>
    );
  }

  function OfficerDetailPanel({ term, role, officer, onPatchOfficer, onDeleteOfficer }) {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [searching, setSearching] = React.useState(false);
    const [searchError, setSearchError] = React.useState('');
    const requestSeqRef = React.useRef(0);

    React.useEffect(() => {
      setSearchValue('');
      setSearchResults([]);
      setSearchError('');
      setSearching(false);
      requestSeqRef.current += 1;
    }, [officer ? officer._clientId : 'none']);

    React.useEffect(() => {
      if (!officer) return undefined;
      const keyword = searchValue.trim();
      if (!keyword) {
        setSearchResults([]);
        setSearchError('');
        setSearching(false);
        return undefined;
      }
      if (keyword.length < 2) {
        setSearchResults([]);
        setSearchError('');
        setSearching(false);
        return undefined;
      }

      const seq = requestSeqRef.current + 1;
      requestSeqRef.current = seq;
      let cancelled = false;
      const timer = window.setTimeout(async () => {
        setSearching(true);
        setSearchError('');
        try {
          const items = await searchOfficerUsers(keyword);
          if (cancelled || requestSeqRef.current !== seq) return;
          setSearchResults(Array.isArray(items) ? items : []);
        } catch (error) {
          if (cancelled || requestSeqRef.current !== seq) return;
          setSearchError(`${t('officersEdit.searchErrorPrefix')} ${String((error && error.message) || error)}`);
          setSearchResults([]);
        } finally {
          if (!cancelled && requestSeqRef.current === seq) setSearching(false);
        }
      }, 250);

      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }, [searchValue, officer ? officer._clientId : 'none']);

    if (!officer) {
      return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.noOfficerSelected')}</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('officersEdit.noOfficerSelectedDetail')}</p>
        </section>
      );
    }

    const previewName = normalizeText(officer.linked_name || officer.name);
    const previewEmail = normalizeText(officer.linked_email || officer.email);
    const previewAffiliation = normalizeText(officer.linked_affiliation || officer.affiliation);
    const linkedFound = Boolean(officer.uuid_user) && Boolean(Number(officer.linked_user_found || 0));

    function applyOfficerPatch(patch) {
      const next = {
        ...patch,
      };
      if (Object.prototype.hasOwnProperty.call(next, 'name')) next.name = normalizeText(next.name);
      if (Object.prototype.hasOwnProperty.call(next, 'email')) next.email = normalizeText(next.email);
      if (Object.prototype.hasOwnProperty.call(next, 'affiliation')) next.affiliation = normalizeText(next.affiliation);
      if (Object.prototype.hasOwnProperty.call(next, 'uuid_user')) next.uuid_user = normalizeText(next.uuid_user);
      onPatchOfficer(next);
    }

    function handleSelectUser(candidate) {
      applyOfficerPatch({
        uuid_user: normalizeText(candidate.uuid),
        linked_name: normalizeText(candidate.name),
        linked_email: normalizeText(candidate.email),
        linked_affiliation: normalizeText(candidate.affiliation),
        resolved_name: normalizeText(candidate.name || officer.name),
        resolved_email: normalizeText(candidate.email || officer.email),
        resolved_affiliation: normalizeText(candidate.affiliation || officer.affiliation),
        linked_user_found: 1,
        name: officer.name || normalizeText(candidate.name),
        email: officer.email || normalizeText(candidate.email),
        affiliation: officer.affiliation || normalizeText(candidate.affiliation),
      });
      setSearchValue('');
      setSearchResults([]);
      setSearchError('');
    }

    function handleUnlink() {
      applyOfficerPatch({
        uuid_user: '',
        linked_name: '',
        linked_email: '',
        linked_affiliation: '',
        resolved_name: normalizeText(officer.name),
        resolved_email: normalizeText(officer.email),
        resolved_affiliation: normalizeText(officer.affiliation),
        linked_user_found: 0,
      });
      setSearchValue('');
      setSearchResults([]);
      setSearchError('');
    }

    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.selectedOfficer')}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="slate">{t('officersEdit.selectedTerm')}: {term?.name || '—'}</Badge>
              <Badge tone="slate">{t('officersEdit.selectedRole')}: {role?.name || '—'}</Badge>
            </div>
          </div>
          <SmallIconButton tone="rose" onClick={onDeleteOfficer}>{t('officersEdit.deleteOfficer')}</SmallIconButton>
        </div>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.linkedAccount')}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {officer.uuid_user
                    ? (linkedFound ? t('officersEdit.linkedAccountFound') : t('officersEdit.linkedAccountMissing'))
                    : t('officersEdit.searchHelp')}
                </p>
              </div>
              {officer.uuid_user ? (
                <SmallIconButton tone="rose" onClick={handleUnlink}>{t('officersEdit.unlinkUser')}</SmallIconButton>
              ) : null}
            </div>

            {officer.uuid_user ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4 dark:border-emerald-900 dark:bg-slate-900">
                <div className="grid gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{previewName || '—'}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{previewEmail || '—'}</div>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{previewAffiliation || '—'}</div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-4">
              <TextInput
                label={t('officersEdit.searchUser')}
                value={searchValue}
                placeholder={t('officersEdit.searchPlaceholder')}
                onChange={setSearchValue}
              />
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {searchValue.trim().length > 0 && searchValue.trim().length < 2
                  ? t('officersEdit.searchMinimum')
                  : t('officersEdit.searchHelp')}
              </p>

              {searching ? (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t('officersEdit.searchLoading')}</p>
              ) : null}

              {searchError ? (
                <div className="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
                  {searchError}
                </div>
              ) : null}

              {!searching && !searchError && searchValue.trim().length >= 2 ? (
                <div className="mt-3 space-y-2">
                  {searchResults.length ? searchResults.map((candidate) => (
                    <button
                      key={candidate.uuid}
                      type="button"
                      onClick={() => handleSelectUser(candidate)}
                      className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-sky-300 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-sky-950"
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{candidate.name || candidate.email || candidate.uuid}</div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{candidate.email || '—'}</div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{candidate.affiliation || '—'}</div>
                    </button>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                      {t('officersEdit.searchNoResult')}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.manualBackup')}</h3>
            <div className="mt-4 grid gap-4">
              <TextInput
                label={t('officersEdit.fallbackName')}
                value={officer.name || ''}
                onChange={(value) => applyOfficerPatch({ name: value })}
              />
              <TextInput
                label={t('officersEdit.fallbackEmail')}
                type="email"
                value={officer.email || ''}
                onChange={(value) => applyOfficerPatch({ email: value })}
              />
              <TextInput
                label={t('officersEdit.fallbackAffiliation')}
                value={officer.affiliation || ''}
                onChange={(value) => applyOfficerPatch({ affiliation: value })}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.previewTitle')}</h3>
            <div className="mt-4 grid gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('officersEdit.previewName')}</div>
                <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">{previewName || '—'}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('officersEdit.previewEmail')}</div>
                <div className="mt-1 text-sm text-slate-900 dark:text-slate-100 break-all">{previewEmail || '—'}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('officersEdit.previewAffiliation')}</div>
                <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">{previewAffiliation || '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function EditorPage() {
    const [terms, setTerms] = React.useState([]);
    const [versions, setVersions] = React.useState([]);
    const [versioningEnabled, setVersioningEnabled] = React.useState(false);
    const [selection, setSelection] = React.useState({ termId: '', roleId: '', officerId: '' });
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [restoringVersionUuid, setRestoringVersionUuid] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [historyTick, setHistoryTick] = React.useState(0);
    const historyRef = React.useRef({ past: [], future: [] });

    const resetHistory = React.useCallback(() => {
      historyRef.current = { past: [], future: [] };
      setHistoryTick((value) => value + 1);
    }, []);

    const applyPayload = React.useCallback((payload, nextMessage) => {
      const nextTerms = normalizeTerms(payload.terms || []);
      setTerms(nextTerms);
      setVersions(normalizeVersions(payload.versions || []));
      setVersioningEnabled(Boolean(payload.versioning_enabled));
      setSelection(deriveSelection(nextTerms, {}));
      if (typeof nextMessage === 'string') {
        setMessage(nextMessage);
      }
      resetHistory();
    }, [resetHistory]);

    const load = React.useCallback(async () => {
      setLoading(true);
      setError('');
      try {
        const payload = await fetchEditorPayload();
        applyPayload(payload, '');
      } catch (loadError) {
        setError(`${t('officersEdit.loadErrorPrefix')} ${String((loadError && loadError.message) || loadError)}`);
      } finally {
        setLoading(false);
      }
    }, [applyPayload]);

    React.useEffect(() => {
      load();
    }, [load]);

    React.useEffect(() => {
      setSelection((previous) => {
        const next = deriveSelection(terms, previous);
        return selectionEquals(previous, next) ? previous : next;
      });
    }, [terms]);

    const canUndo = historyRef.current.past.length > 0;
    const canRedo = historyRef.current.future.length > 0;

    function pushHistory(previousTerms) {
      historyRef.current.past.push(previousTerms);
      if (historyRef.current.past.length > HISTORY_LIMIT) historyRef.current.past.shift();
      historyRef.current.future = [];
      setHistoryTick((value) => value + 1);
    }

    function applyMutation(mutator) {
      setError('');
      setMessage('');
      setTerms((previous) => {
        const previousClone = deepClone(previous);
        const next = deepClone(previous);
        mutator(next);
        pushHistory(previousClone);
        return next;
      });
    }

    function handleUndo() {
      if (!historyRef.current.past.length) return;
      setError('');
      setMessage('');
      setTerms((current) => {
        const previous = historyRef.current.past.pop();
        historyRef.current.future.push(deepClone(current));
        setHistoryTick((value) => value + 1);
        return deepClone(previous);
      });
    }

    function handleRedo() {
      if (!historyRef.current.future.length) return;
      setError('');
      setMessage('');
      setTerms((current) => {
        const next = historyRef.current.future.pop();
        historyRef.current.past.push(deepClone(current));
        if (historyRef.current.past.length > HISTORY_LIMIT) historyRef.current.past.shift();
        setHistoryTick((value) => value + 1);
        return deepClone(next);
      });
    }

    React.useEffect(() => {
      const handleKeyDown = (event) => {
        const isModifier = event.ctrlKey || event.metaKey;
        if (!isModifier || event.altKey) return;
        const key = String(event.key || '').toLowerCase();
        if (key === 'z' && !event.shiftKey) {
          event.preventDefault();
          handleUndo();
          return;
        }
        if (key === 'y' || (key === 'z' && event.shiftKey)) {
          event.preventDefault();
          handleRedo();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [historyTick]);

    function selectTerm(termId) {
      const term = (terms || []).find((item) => item._clientId === termId) || null;
      const role = term && Array.isArray(term.roles) ? term.roles[0] || null : null;
      const officer = role && Array.isArray(role.officers) ? role.officers[0] || null : null;
      setSelection({
        termId: term ? term._clientId : '',
        roleId: role ? role._clientId : '',
        officerId: officer ? officer._clientId : '',
      });
    }

    function selectRole(termId, roleId) {
      const term = (terms || []).find((item) => item._clientId === termId) || null;
      const role = (Array.isArray(term?.roles) ? term.roles : []).find((item) => item._clientId === roleId) || null;
      const officer = role && Array.isArray(role.officers) ? role.officers[0] || null : null;
      setSelection({
        termId: term ? term._clientId : '',
        roleId: role ? role._clientId : '',
        officerId: officer ? officer._clientId : '',
      });
    }

    function selectOfficer(termId, roleId, officerId) {
      setSelection({ termId, roleId, officerId });
    }

    function updateTerm(termId, patch) {
      applyMutation((nextTerms) => {
        const termIndex = nextTerms.findIndex((item) => item._clientId === termId);
        if (termIndex === -1) return;
        nextTerms[termIndex] = { ...nextTerms[termIndex], ...patch };
      });
    }

    function deleteTerm(termId) {
      if (!window.confirm(t('officersEdit.confirmDeleteTerm'))) return;
      applyMutation((nextTerms) => {
        const termIndex = nextTerms.findIndex((item) => item._clientId === termId);
        if (termIndex === -1) return;
        nextTerms.splice(termIndex, 1);
      });
    }

    function addTerm() {
      const newTerm = createEmptyTerm();
      applyMutation((nextTerms) => {
        nextTerms.unshift(newTerm);
      });
      setSelection({ termId: newTerm._clientId, roleId: '', officerId: '' });
    }

    function addRole(termId) {
      const newRole = createEmptyRole();
      applyMutation((nextTerms) => {
        const termIndex = nextTerms.findIndex((item) => item._clientId === termId);
        if (termIndex === -1) return;
        nextTerms[termIndex].roles = [newRole, ...(nextTerms[termIndex].roles || [])];
      });
      setSelection({ termId, roleId: newRole._clientId, officerId: '' });
    }

    function updateRole(termId, roleId, patch) {
      applyMutation((nextTerms) => {
        const term = nextTerms.find((item) => item._clientId === termId);
        if (!term) return;
        const roleIndex = (term.roles || []).findIndex((item) => item._clientId === roleId);
        if (roleIndex === -1) return;
        term.roles[roleIndex] = { ...term.roles[roleIndex], ...patch };
      });
    }

    function deleteRole(termId, roleId) {
      if (!window.confirm(t('officersEdit.confirmDeleteRole'))) return;
      applyMutation((nextTerms) => {
        const term = nextTerms.find((item) => item._clientId === termId);
        if (!term) return;
        const roleIndex = (term.roles || []).findIndex((item) => item._clientId === roleId);
        if (roleIndex === -1) return;
        term.roles.splice(roleIndex, 1);
      });
    }

    function addOfficer(termId, roleId) {
      const newOfficer = createEmptyOfficer();
      applyMutation((nextTerms) => {
        const term = nextTerms.find((item) => item._clientId === termId);
        if (!term) return;
        const role = (term.roles || []).find((item) => item._clientId === roleId);
        if (!role) return;
        role.officers = [newOfficer, ...(role.officers || [])];
      });
      setSelection({ termId, roleId, officerId: newOfficer._clientId });
    }

    function updateOfficer(termId, roleId, officerId, patch) {
      applyMutation((nextTerms) => {
        const term = nextTerms.find((item) => item._clientId === termId);
        if (!term) return;
        const role = (term.roles || []).find((item) => item._clientId === roleId);
        if (!role) return;
        const officerIndex = (role.officers || []).findIndex((item) => item._clientId === officerId);
        if (officerIndex === -1) return;
        const current = role.officers[officerIndex];
        const next = {
          ...current,
          ...patch,
        };
        next.uuid_user = normalizeText(next.uuid_user);
        next.name = normalizeText(next.name);
        next.email = normalizeText(next.email);
        next.affiliation = normalizeText(next.affiliation);
        next.linked_name = normalizeText(next.linked_name);
        next.linked_email = normalizeText(next.linked_email);
        next.linked_affiliation = normalizeText(next.linked_affiliation);
        next.linked_user_found = normalizeFlag(next.linked_user_found, 0);
        next.resolved_name = normalizeText(next.linked_name || next.name);
        next.resolved_email = normalizeText(next.linked_email || next.email);
        next.resolved_affiliation = normalizeText(next.linked_affiliation || next.affiliation);
        role.officers[officerIndex] = next;
      });
    }

    function deleteOfficer(termId, roleId, officerId) {
      if (!window.confirm(t('officersEdit.confirmDeleteOfficer'))) return;
      applyMutation((nextTerms) => {
        const term = nextTerms.find((item) => item._clientId === termId);
        if (!term) return;
        const role = (term.roles || []).find((item) => item._clientId === roleId);
        if (!role) return;
        const officerIndex = (role.officers || []).findIndex((item) => item._clientId === officerId);
        if (officerIndex === -1) return;
        role.officers.splice(officerIndex, 1);
      });
    }

    async function handleSave() {
      setSaving(true);
      setError('');
      setMessage('');
      try {
        const payload = await saveEditorPayload(terms);
        applyPayload(payload, payload.message || t('officersEdit.saveSuccess'));
      } catch (saveError) {
        setError(`${t('officersEdit.saveErrorPrefix')} ${String((saveError && saveError.message) || saveError)}`);
      } finally {
        setSaving(false);
      }
    }

    async function handleRestore(version) {
      if (!version || !version.uuid) return;
      if (!window.confirm(t('officersEdit.restoreConfirm'))) return;
      setRestoringVersionUuid(version.uuid);
      setError('');
      setMessage('');
      try {
        const payload = await restoreEditorVersion(version.uuid);
        applyPayload(payload, payload.message || t('officersEdit.restoreSuccess'));
      } catch (restoreError) {
        setError(`${t('officersEdit.restoreErrorPrefix')} ${String((restoreError && restoreError.message) || restoreError)}`);
      } finally {
        setRestoringVersionUuid('');
      }
    }

    const selectedTerm = findSelectedTerm(terms, selection);
    const selectedRole = findSelectedRole(selectedTerm, selection);
    const selectedOfficer = findSelectedOfficer(selectedRole, selection);

    return (
      <main className="min-h-screen bg-slate-50 py-8 dark:bg-slate-950" data-officer-editor-root>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 lg:px-6">
          <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('officersEdit.title')}</h1>
                <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">{t('officersEdit.subtitle')}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={CONFIG.officers_public_path}
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600"
                >
                  {t('officersEdit.back')}
                </a>
                <SmallIconButton tone="slate" onClick={load}>{t('officersEdit.reload')}</SmallIconButton>
                <SmallIconButton tone="slate" disabled={!canUndo} onClick={handleUndo}>{t('officersEdit.undo')}</SmallIconButton>
                <SmallIconButton tone="slate" disabled={!canRedo} onClick={handleRedo}>{t('officersEdit.redo')}</SmallIconButton>
                <SmallIconButton tone="emerald" disabled={saving} onClick={handleSave}>{saving ? t('officersEdit.saving') : t('officersEdit.save')}</SmallIconButton>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="slate">{t('officersEdit.keyboardHint')}</Badge>
              <Badge tone="slate">{terms.length} term{terms.length === 1 ? '' : 's'}</Badge>
              <Badge tone="slate">{terms.reduce((sum, term) => sum + ((term.roles || []).length), 0)} role{terms.reduce((sum, term) => sum + ((term.roles || []).length), 0) === 1 ? '' : 's'}</Badge>
              <Badge tone="slate">{terms.reduce((sum, term) => sum + (term.roles || []).reduce((sub, role) => sub + ((role.officers || []).length), 0), 0)} officer{terms.reduce((sum, term) => sum + (term.roles || []).reduce((sub, role) => sub + ((role.officers || []).length), 0), 0) === 1 ? '' : 's'}</Badge>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
              <h2 className="font-semibold">{t('officersEdit.noteTitle')}</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>{t('officersEdit.noteFlow')}</li>
                <li>{t('officersEdit.noteLinked')}</li>
                <li>{t('officersEdit.noteHistory')}</li>
              </ul>
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            {message ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                {message}
              </div>
            ) : null}
          </header>

          {loading ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-44 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-16 rounded bg-slate-100 dark:bg-slate-800"></div>
                <div className="h-72 rounded bg-slate-100 dark:bg-slate-800"></div>
              </div>
            </section>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1.15fr)_minmax(0,0.95fr)]">
              <div className="space-y-6">
                <TermSidebar
                  terms={terms}
                  selectedTermId={selection.termId}
                  onSelectTerm={selectTerm}
                  onAddTerm={addTerm}
                />
                <VersionPanel
                  versions={versions}
                  versioningEnabled={versioningEnabled}
                  onRestore={handleRestore}
                  restoringVersionUuid={restoringVersionUuid}
                />
              </div>

              <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  {selectedTerm ? (
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                      <div className="grid flex-1 gap-4">
                        <TextInput
                          label={t('officersEdit.termName')}
                          value={selectedTerm.name || ''}
                          onChange={(value) => updateTerm(selectedTerm._clientId, { name: value })}
                        />
                        <div className="flex flex-wrap gap-5">
                          <Checkbox
                            label={t('officersEdit.termVisible')}
                            checked={selectedTerm.visible}
                            onChange={(value) => updateTerm(selectedTerm._clientId, { visible: value })}
                          />
                          <Checkbox
                            label={t('officersEdit.termOnDuty')}
                            checked={selectedTerm.on_duty}
                            onChange={(value) => updateTerm(selectedTerm._clientId, { on_duty: value })}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <SmallIconButton tone="sky" onClick={() => addRole(selectedTerm._clientId)}>{t('officersEdit.addRole')}</SmallIconButton>
                        <SmallIconButton tone="rose" onClick={() => deleteTerm(selectedTerm._clientId)}>{t('officersEdit.deleteTerm')}</SmallIconButton>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                      {t('officersEdit.noTerms')}
                    </div>
                  )}
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('officersEdit.roleList')}</h2>
                    <Badge tone="slate">{(selectedTerm?.roles || []).length}</Badge>
                  </div>

                  {selectedTerm && (selectedTerm.roles || []).length ? (
                    <div className="space-y-4">
                      {(selectedTerm.roles || []).map((role) => (
                        <RoleCard
                          key={role._clientId}
                          termId={selectedTerm._clientId}
                          role={role}
                          selectedRoleId={selection.roleId}
                          selectedOfficerId={selection.officerId}
                          onSelectRole={selectRole}
                          onSelectOfficer={selectOfficer}
                          onUpdateRole={updateRole}
                          onDeleteRole={deleteRole}
                          onAddOfficer={addOfficer}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                      {selectedTerm ? t('officersEdit.noRoles') : t('officersEdit.noTerms')}
                    </div>
                  )}
                </section>
              </div>

              <OfficerDetailPanel
                term={selectedTerm}
                role={selectedRole}
                officer={selectedOfficer}
                onPatchOfficer={(patch) => selectedTerm && selectedRole && selectedOfficer && updateOfficer(selectedTerm._clientId, selectedRole._clientId, selectedOfficer._clientId, patch)}
                onDeleteOfficer={() => selectedTerm && selectedRole && selectedOfficer && deleteOfficer(selectedTerm._clientId, selectedRole._clientId, selectedOfficer._clientId)}
              />
            </div>
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
