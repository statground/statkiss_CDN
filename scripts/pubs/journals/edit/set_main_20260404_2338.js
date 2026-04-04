(function () {
  'use strict';

  const mountNode = document.getElementById('div_main');
  const configEl = document.getElementById('statkiss-journals-editor-config');
  if (!mountNode || !configEl) return;

  const HISTORY_LIMIT = 120;
  const FALLBACK_ROLE_CATALOG = [
    { role_key: 'editor_in_chief', role_order: 10 },
    { role_key: 'co_editors', role_order: 20 },
    { role_key: 'honorary_editors', role_order: 30 },
    { role_key: 'managing_editor', role_order: 40 },
    { role_key: 'editorial_assistant', role_order: 50 },
  ];

  function parseJSONSafe(text, fallback) {
    try {
      return JSON.parse(text);
    } catch (_) {
      return fallback;
    }
  }

  const RAW_CONFIG = parseJSONSafe(configEl.textContent || '{}', {});

  function getGlobalI18N() {
    return window.StatKISS_I18N || null;
  }

  function getSharedJournalsI18N() {
    return window.STATKISS_PUBS_JOURNALS_I18N || {};
  }

  function getEditorI18N() {
    return window.STATKISS_PUBS_JOURNALS_EDIT_I18N || null;
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
    const editor = getEditorI18N();
    if (editor && typeof editor.t === 'function') {
      return editor.t(currentLang(), key);
    }
    return key;
  }

  function tRole(key) {
    const lang = currentLang();
    const dict = getSharedJournalsI18N();
    const current = dict[lang] || {};
    const english = dict.en || {};
    if (current[key] != null && current[key] !== '') return current[key];
    if (english[key] != null && english[key] !== '') return english[key];
    return key;
  }

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

  function normalizeText(value) {
    return String(value || '').trim();
  }

  function normalizeFlag(value, fallback) {
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (value === null || value === undefined || value === '') return fallback;
    return Number(value) ? 1 : 0;
  }

  function normalizeRoleCatalog(rawCatalog) {
    const catalog = Array.isArray(rawCatalog) && rawCatalog.length ? rawCatalog : FALLBACK_ROLE_CATALOG;
    return deepClone(catalog)
      .map((item, index) => ({
        role_key: normalizeText(item && item.role_key),
        role_order: Number(item && item.role_order) || (index + 1) * 10,
      }))
      .filter((item) => item.role_key)
      .sort((a, b) => a.role_order - b.role_order);
  }

  function normalizeMember(raw) {
    return {
      _clientId: normalizeText(raw && raw._clientId) || makeClientId('member'),
      name: normalizeText(raw && raw.name),
      affiliation: normalizeText(raw && raw.affiliation),
    };
  }

  function normalizeBoard(rawBoard, roleCatalog) {
    const catalog = normalizeRoleCatalog(roleCatalog);
    const roleMap = new Map();
    catalog.forEach((role) => {
      roleMap.set(role.role_key, {
        role_key: role.role_key,
        role_order: role.role_order,
        items: [],
      });
    });

    const rawRoles = Array.isArray(rawBoard && rawBoard.roles) ? rawBoard.roles : [];
    rawRoles.forEach((role) => {
      const roleKey = normalizeText(role && role.role_key);
      if (!roleMap.has(roleKey)) return;
      roleMap.set(roleKey, {
        role_key: roleKey,
        role_order: Number(role && role.role_order) || roleMap.get(roleKey).role_order,
        items: (Array.isArray(role && role.items) ? role.items : []).map(normalizeMember),
      });
    });

    return {
      board_visible: normalizeFlag(rawBoard && rawBoard.board_visible, 1),
      roles: Array.from(roleMap.values()).sort((a, b) => a.role_order - b.role_order),
    };
  }

  function normalizeVersions(rawVersions) {
    return (Array.isArray(rawVersions) ? rawVersions : []).map((item) => ({
      uuid: normalizeText(item && item.uuid),
      version_seq: Number(item && item.version_seq) || 0,
      action: normalizeText(item && item.action) || 'save',
      source_version_uuid: normalizeText(item && item.source_version_uuid),
      board_visible: normalizeFlag(item && item.board_visible, 1),
      note: normalizeText(item && item.note),
      role_count: Number(item && item.role_count) || 0,
      member_count: Number(item && item.member_count) || 0,
      created_at: normalizeText(item && item.created_at),
      created_by_username: normalizeText(item && item.created_by_username),
      created_by_email: normalizeText(item && item.created_by_email),
      created_by_name: normalizeText(item && item.created_by_name),
      created_by_ip: normalizeText(item && item.created_by_ip),
    }));
  }

  function serializeBoard(board) {
    return {
      board_visible: normalizeFlag(board && board.board_visible, 1),
      roles: (Array.isArray(board && board.roles) ? board.roles : []).map((role) => ({
        role_key: normalizeText(role && role.role_key),
        items: (Array.isArray(role && role.items) ? role.items : [])
          .map((item) => ({
            name: normalizeText(item && item.name),
            affiliation: normalizeText(item && item.affiliation),
          }))
          .filter((item) => item.name || item.affiliation),
      })),
    };
  }

  async function fetchJSON(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!data || data.ok === false) {
      throw new Error((data && data.message) || 'Unexpected error');
    }
    return data;
  }

  function IconButton(props) {
    const disabled = Boolean(props.disabled);
    return (
      <button
        type="button"
        onClick={props.onClick}
        title={props.title}
        aria-label={props.title}
        disabled={disabled}
        className={[
          'inline-flex h-10 w-10 items-center justify-center rounded-full border text-gray-700 shadow-sm transition',
          'border-gray-300 bg-white hover:border-fuchsia-300 hover:text-fuchsia-600',
          'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-fuchsia-400 dark:hover:text-fuchsia-300',
          disabled ? 'cursor-not-allowed opacity-40' : '',
        ].join(' ')}
      >
        <span className="sr-only">{props.title}</span>
        {props.children}
      </button>
    );
  }

  function Badge(props) {
    return (
      <span className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        props.variant === 'current' ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-200' : '',
        props.variant === 'visible' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200' : '',
        props.variant === 'hidden' ? 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200' : '',
        props.variant === 'action' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200' : '',
      ].join(' ')}>
        {props.children}
      </span>
    );
  }

  function IconUndo() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14 4 9m0 0 5-5M4 9h8a8 8 0 0 1 8 8v1" />
      </svg>
    );
  }

  function IconRedo() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 14 5-5m0 0-5-5m5 5h-8a8 8 0 0 0-8 8v1" />
      </svg>
    );
  }

  function IconReload() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9A6.977 6.977 0 0 0 12 7a7 7 0 1 0 6.588 4.636M16 3v6h6" />
      </svg>
    );
  }

  function IconSave() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-8H7v8M7 3v5h8" />
      </svg>
    );
  }

  function IconEye() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  function IconEyeOff() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.584 10.587A2 2 0 0 0 12 14a2 2 0 0 0 1.414-.586" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.878 5.09A10.94 10.94 0 0 1 12 5c4.477 0 8.268 2.943 9.542 7a11.01 11.01 0 0 1-4.132 5.411" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.228 6.228A10.97 10.97 0 0 0 2.458 12c1.274 4.057 5.065 7 9.542 7a10.97 10.97 0 0 0 5.772-1.628" />
      </svg>
    );
  }

  function IconPlus() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    );
  }

  function IconTrash() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4h8v2M19 6l-1 14H6L5 6" />
      </svg>
    );
  }

  function IconUp() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18 15-6-6-6 6" />
      </svg>
    );
  }

  function IconDown() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    );
  }

  function IconRestore() {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1 0 3-6.708L3 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v5h5" />
      </svg>
    );
  }

  function ToolbarLink(props) {
    return (
      <a
        href={props.href}
        className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-fuchsia-300 hover:text-fuchsia-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-fuchsia-400 dark:hover:text-fuchsia-300"
      >
        {props.children}
      </a>
    );
  }

  function Root() {
    const [roleCatalog, setRoleCatalog] = React.useState(normalizeRoleCatalog(FALLBACK_ROLE_CATALOG));
    const [history, setHistory] = React.useState({
      past: [],
      present: normalizeBoard({ board_visible: 1, roles: [] }, FALLBACK_ROLE_CATALOG),
      future: [],
    });
    const [versions, setVersions] = React.useState([]);
    const [currentVersionUuid, setCurrentVersionUuid] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState('');

    const board = history.present;
    const canUndo = history.past.length > 0;
    const canRedo = history.future.length > 0;

    function replaceFromServer(payload, successMessage) {
      const nextCatalog = normalizeRoleCatalog(payload && payload.role_catalog ? payload.role_catalog : roleCatalog);
      const nextBoard = normalizeBoard(payload && payload.board, nextCatalog);
      setRoleCatalog(nextCatalog);
      setHistory({ past: [], present: nextBoard, future: [] });
      setVersions(normalizeVersions(payload && payload.versions));
      setCurrentVersionUuid(normalizeText(payload && payload.current_version_uuid));
      setMessage(successMessage || '');
      setError('');
    }

    async function loadFromServer() {
      setLoading(true);
      setError('');
      setMessage('');
      try {
        const data = await fetchJSON(RAW_CONFIG.api_get_url, {
          method: 'GET',
          credentials: 'same-origin',
          headers: { Accept: 'application/json' },
        });
        replaceFromServer(data, '');
      } catch (err) {
        setError(`${t('loadErrorPrefix')} ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    React.useEffect(() => {
      loadFromServer();
    }, []);

    React.useEffect(() => {
      function handleKeyDown(event) {
        const isMeta = event.metaKey || event.ctrlKey;
        if (!isMeta) return;
        const key = String(event.key || '').toLowerCase();
        if (key === 'z' && !event.shiftKey) {
          if (!canUndo) return;
          event.preventDefault();
          setHistory((prev) => {
            if (!prev.past.length) return prev;
            const previous = prev.past[prev.past.length - 1];
            return {
              past: prev.past.slice(0, -1),
              present: deepClone(previous),
              future: [deepClone(prev.present), ...prev.future].slice(0, HISTORY_LIMIT),
            };
          });
          setMessage('');
          setError('');
          return;
        }
        if (key === 'y' || (key === 'z' && event.shiftKey)) {
          if (!canRedo) return;
          event.preventDefault();
          setHistory((prev) => {
            if (!prev.future.length) return prev;
            const [next, ...rest] = prev.future;
            return {
              past: [...prev.past, deepClone(prev.present)].slice(-HISTORY_LIMIT),
              present: deepClone(next),
              future: rest,
            };
          });
          setMessage('');
          setError('');
        }
      }

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo]);

    function applyBoardChange(mutator) {
      setHistory((prev) => {
        const nextPresent = deepClone(prev.present);
        mutator(nextPresent);
        const normalizedNext = normalizeBoard(nextPresent, roleCatalog);
        return {
          past: [...prev.past, deepClone(prev.present)].slice(-HISTORY_LIMIT),
          present: normalizedNext,
          future: [],
        };
      });
      setMessage('');
      setError('');
    }

    function undo() {
      if (!canUndo) return;
      setHistory((prev) => {
        if (!prev.past.length) return prev;
        const previous = prev.past[prev.past.length - 1];
        return {
          past: prev.past.slice(0, -1),
          present: deepClone(previous),
          future: [deepClone(prev.present), ...prev.future].slice(0, HISTORY_LIMIT),
        };
      });
      setMessage('');
      setError('');
    }

    function redo() {
      if (!canRedo) return;
      setHistory((prev) => {
        if (!prev.future.length) return prev;
        const [next, ...rest] = prev.future;
        return {
          past: [...prev.past, deepClone(prev.present)].slice(-HISTORY_LIMIT),
          present: deepClone(next),
          future: rest,
        };
      });
      setMessage('');
      setError('');
    }

    function toggleBoardVisible() {
      applyBoardChange((draft) => {
        draft.board_visible = draft.board_visible ? 0 : 1;
      });
    }

    function addMember(roleKey) {
      applyBoardChange((draft) => {
        const role = draft.roles.find((item) => item.role_key === roleKey);
        if (!role) return;
        role.items.push({ _clientId: makeClientId('member'), name: '', affiliation: '' });
      });
    }

    function updateMember(roleKey, memberId, field, value) {
      applyBoardChange((draft) => {
        const role = draft.roles.find((item) => item.role_key === roleKey);
        if (!role) return;
        const member = role.items.find((item) => item._clientId === memberId);
        if (!member) return;
        member[field] = value;
      });
    }

    function removeMember(roleKey, memberId) {
      applyBoardChange((draft) => {
        const role = draft.roles.find((item) => item.role_key === roleKey);
        if (!role) return;
        role.items = role.items.filter((item) => item._clientId !== memberId);
      });
    }

    function moveMember(roleKey, memberId, direction) {
      applyBoardChange((draft) => {
        const role = draft.roles.find((item) => item.role_key === roleKey);
        if (!role) return;
        const index = role.items.findIndex((item) => item._clientId === memberId);
        const target = index + direction;
        if (index < 0 || target < 0 || target >= role.items.length) return;
        const nextItems = role.items.slice();
        const temp = nextItems[index];
        nextItems[index] = nextItems[target];
        nextItems[target] = temp;
        role.items = nextItems;
      });
    }

    async function saveBoard() {
      if (saving || loading) return;
      setSaving(true);
      setError('');
      setMessage('');
      try {
        const data = await fetchJSON(RAW_CONFIG.api_save_url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serializeBoard(board)),
        });
        replaceFromServer(data, t('saveSuccess'));
      } catch (err) {
        setError(`${t('saveErrorPrefix')} ${err.message}`);
      } finally {
        setSaving(false);
      }
    }

    async function restoreVersion(versionUuid) {
      if (!versionUuid || saving || loading) return;
      if (!window.confirm(t('restoreConfirm'))) return;
      setSaving(true);
      setError('');
      setMessage('');
      try {
        const data = await fetchJSON(RAW_CONFIG.api_restore_version_url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ version_uuid: versionUuid }),
        });
        replaceFromServer(data, t('restoreSuccess'));
      } catch (err) {
        setError(`${t('restoreErrorPrefix')} ${err.message}`);
      } finally {
        setSaving(false);
      }
    }

    function actionBadgeLabel(action) {
      if (action === 'restore') return t('restoredBadge');
      if (action === 'seed') return t('seedBadge');
      return t('savedBadge');
    }

    function savedByLabel(version) {
      return version.created_by_name || version.created_by_email || version.created_by_username || '-';
    }

    const visibleRoles = board.roles.filter((role) => Array.isArray(role.items) && role.items.some((item) => item.name));

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-screen-2xl px-4 py-8">
          <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">{t('title')}</h1>
              <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t('keyboardHint')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ToolbarLink href={RAW_CONFIG.journals_public_path}>{t('back')}</ToolbarLink>
              <Badge variant={board.board_visible ? 'visible' : 'hidden'}>
                {board.board_visible ? t('statusVisible') : t('statusHidden')}
              </Badge>
              <IconButton title={t('reload')} onClick={loadFromServer} disabled={loading || saving}>
                <IconReload />
              </IconButton>
              <IconButton title={t('undo')} onClick={undo} disabled={!canUndo || loading || saving}>
                <IconUndo />
              </IconButton>
              <IconButton title={t('redo')} onClick={redo} disabled={!canRedo || loading || saving}>
                <IconRedo />
              </IconButton>
              <IconButton
                title={board.board_visible ? t('hideBoard') : t('showBoard')}
                onClick={toggleBoardVisible}
                disabled={loading || saving}
              >
                {board.board_visible ? <IconEyeOff /> : <IconEye />}
              </IconButton>
              <IconButton title={saving ? t('saving') : t('save')} onClick={saveBoard} disabled={loading || saving}>
                <IconSave />
              </IconButton>
            </div>
          </div>

          {message ? (
            <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
              {message}
            </div>
          ) : null}
          {error ? (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
              {error}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              {loading ? (
                <div className="rounded-3xl border border-gray-200 bg-white p-8 text-sm text-gray-500 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                  {t('reload')}
                </div>
              ) : null}

              {board.roles.map((role) => (
                <div key={role.role_key} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{tRole(role.role_key)}</h2>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{role.items.length ? `${role.items.length}` : t('noMembers')}</p>
                    </div>
                    <IconButton title={t('addMember')} onClick={() => addMember(role.role_key)} disabled={saving || loading}>
                      <IconPlus />
                    </IconButton>
                  </div>

                  {role.items.length ? (
                    <div className="space-y-3">
                      {role.items.map((member, index) => (
                        <div key={member._clientId} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start">
                            <label className="block">
                              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('name')}</span>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(event) => updateMember(role.role_key, member._clientId, 'name', event.target.value)}
                                className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-fuchsia-400 dark:focus:ring-fuchsia-900"
                              />
                            </label>
                            <label className="block">
                              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('affiliation')}</span>
                              <input
                                type="text"
                                value={member.affiliation}
                                onChange={(event) => updateMember(role.role_key, member._clientId, 'affiliation', event.target.value)}
                                className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-fuchsia-400 dark:focus:ring-fuchsia-900"
                              />
                            </label>
                            <div className="flex items-center justify-end gap-2 lg:pt-6">
                              <IconButton title={t('moveUp')} onClick={() => moveMember(role.role_key, member._clientId, -1)} disabled={saving || loading || index === 0}>
                                <IconUp />
                              </IconButton>
                              <IconButton title={t('moveDown')} onClick={() => moveMember(role.role_key, member._clientId, 1)} disabled={saving || loading || index === role.items.length - 1}>
                                <IconDown />
                              </IconButton>
                              <IconButton title={t('removeMember')} onClick={() => removeMember(role.role_key, member._clientId)} disabled={saving || loading}>
                                <IconTrash />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-gray-400">
                      {t('noMembers')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('previewTitle')}</h2>
                  <Badge variant={board.board_visible ? 'visible' : 'hidden'}>
                    {board.board_visible ? t('visibleBadge') : t('hiddenBadge')}
                  </Badge>
                </div>

                {!board.board_visible ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-gray-400">
                    {t('publicHidden')}
                  </div>
                ) : visibleRoles.length ? (
                  <div className="space-y-4">
                    {visibleRoles.map((role) => (
                      <div key={role.role_key} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">{tRole(role.role_key)}</h3>
                        <ul className="mt-3 space-y-2">
                          {role.items.filter((item) => item.name).map((item) => (
                            <li key={`${role.role_key}-${item._clientId}`} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                                {item.affiliation ? <p className="text-xs text-gray-600 dark:text-gray-300">({item.affiliation})</p> : null}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-gray-400">
                    {t('emptyPreview')}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('versionsTitle')}</h2>
                  {currentVersionUuid ? <Badge variant="current">{t('currentBadge')}</Badge> : null}
                </div>

                {versions.length ? (
                  <div className="space-y-3">
                    {versions.map((version) => (
                      <div
                        key={version.uuid}
                        className={[
                          'rounded-2xl border p-4',
                          version.uuid === currentVersionUuid
                            ? 'border-fuchsia-300 bg-fuchsia-50/70 dark:border-fuchsia-700 dark:bg-fuchsia-950/25'
                            : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/40',
                        ].join(' ')}
                      >
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">#{version.version_seq}</span>
                              <Badge variant="action">{actionBadgeLabel(version.action)}</Badge>
                              <Badge variant={version.board_visible ? 'visible' : 'hidden'}>
                                {version.board_visible ? t('visibleBadge') : t('hiddenBadge')}
                              </Badge>
                              {version.uuid === currentVersionUuid ? <Badge variant="current">{t('currentBadge')}</Badge> : null}
                            </div>
                            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">{version.created_at || '-'}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{t('savedBy')}: {savedByLabel(version)}</p>
                          </div>
                          <IconButton
                            title={t('restore')}
                            onClick={() => restoreVersion(version.uuid)}
                            disabled={saving || loading || version.uuid === currentVersionUuid}
                          >
                            <IconRestore />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-950/40 dark:text-gray-400">
                    {t('versionsEmpty')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  ReactDOM.render(<Root />, mountNode);
})();
