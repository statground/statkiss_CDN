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
  const HISTORY_LIMIT = 120;

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

  const FALLBACK_LANG_CODES = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];

  function getSupportedLangCodes() {
    const codes = [];
    const editor = getEditorI18N();
    const helper = getGlobalI18N();

    [editor && editor.languages, helper && helper.languages].forEach((items) => {
      if (!Array.isArray(items)) return;
      items.forEach((item) => {
        const code = typeof item === 'string' ? item : item && item.code;
        if (code && !codes.includes(code)) codes.push(code);
      });
    });

    FALLBACK_LANG_CODES.forEach((code) => {
      if (!codes.includes(code)) codes.push(code);
    });
    return codes;
  }

  function inferAboutBasePath() {
    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    const supported = getSupportedLangCodes();
    if (parts.length && supported.includes(parts[0])) return `/${parts[0]}/about/`;
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

  function toInt(value, fallback) {
    const num = Number.parseInt(value, 10);
    return Number.isFinite(num) ? num : fallback;
  }

  function extractTermYears(termName) {
    const text = normalizeText(termName);
    const startMatch = text.match(/^(19|20)\d{2}/);
    const endMatch = text.match(/(19|20)\d{2}$/);
    return {
      start: startMatch ? toInt(startMatch[0], 0) : 0,
      end: endMatch ? toInt(endMatch[0], 0) : 0,
    };
  }

  function compareTerms(a, b) {
    const aVisible = normalizeFlag(a && a.visible, 1);
    const bVisible = normalizeFlag(b && b.visible, 1);
    if (aVisible !== bVisible) return bVisible - aVisible;

    const aDuty = normalizeFlag(a && a.on_duty, 0);
    const bDuty = normalizeFlag(b && b.on_duty, 0);
    if (aDuty !== bDuty) return bDuty - aDuty;

    const aYears = extractTermYears(a && a.name);
    const bYears = extractTermYears(b && b.name);
    const endDelta = (bYears.end || bYears.start || 0) - (aYears.end || aYears.start || 0);
    if (endDelta !== 0) return endDelta;

    const startDelta = (bYears.start || bYears.end || 0) - (aYears.start || aYears.end || 0);
    if (startDelta !== 0) return startDelta;

    const nameDelta = normalizeText(a && a.name).localeCompare(normalizeText(b && b.name), undefined, { sensitivity: 'base' });
    if (nameDelta !== 0) return nameDelta;

    return normalizeText(a && (a.uuid || a._clientId)).localeCompare(normalizeText(b && (b.uuid || b._clientId)), undefined, { sensitivity: 'base' });
  }

  function normalizeOfficer(raw) {
    const next = {
      uuid: normalizeText(raw && raw.uuid),
      uuid_user: normalizeText(raw && raw.uuid_user),
      name: normalizeText(raw && raw.name),
      email: normalizeText(raw && raw.email),
      affiliation: normalizeText(raw && raw.affiliation),
      linked_name: normalizeText(raw && raw.linked_name),
      linked_email: normalizeText(raw && raw.linked_email),
      linked_affiliation: normalizeText(raw && raw.linked_affiliation),
      resolved_name: normalizeText(raw && raw.resolved_name),
      resolved_email: normalizeText(raw && raw.resolved_email),
      resolved_affiliation: normalizeText(raw && raw.resolved_affiliation),
      linked_user_found: normalizeFlag(raw && raw.linked_user_found, 0),
      _clientId: normalizeText(raw && raw._clientId) || normalizeText(raw && raw.uuid) || makeClientId('officer'),
    };

    if (!next.uuid_user) {
      next.linked_name = '';
      next.linked_email = '';
      next.linked_affiliation = '';
      next.linked_user_found = 0;
    }

    next.resolved_name = normalizeText(next.linked_name || next.name);
    next.resolved_email = normalizeText(next.linked_email || next.email);
    next.resolved_affiliation = normalizeText(next.linked_affiliation || next.affiliation);
    return next;
  }

  function sortRoles(rawRoles) {
    return deepClone(Array.isArray(rawRoles) ? rawRoles : []).sort((a, b) => {
      const orderDelta = toInt(a && a.order, 0) - toInt(b && b.order, 0);
      if (orderDelta !== 0) return orderDelta;
      const nameDelta = normalizeText(a && a.name).localeCompare(normalizeText(b && b.name), undefined, { sensitivity: 'base' });
      if (nameDelta !== 0) return nameDelta;
      return normalizeText(a && (a.uuid || a._clientId)).localeCompare(normalizeText(b && (b.uuid || b._clientId)), undefined, { sensitivity: 'base' });
    });
  }

  function normalizeRoles(rawRoles) {
    return sortRoles(rawRoles).map((rawRole, index) => ({
      uuid: normalizeText(rawRole && rawRole.uuid),
      uuid_officer_term: normalizeText(rawRole && rawRole.uuid_officer_term),
      name: normalizeText(rawRole && rawRole.name),
      order: index + 1,
      active: normalizeFlag(rawRole && rawRole.active, 1),
      _clientId: normalizeText(rawRole && rawRole._clientId) || normalizeText(rawRole && rawRole.uuid) || makeClientId('role'),
      officers: (Array.isArray(rawRole && rawRole.officers) ? rawRole.officers : []).map(normalizeOfficer),
    }));
  }

  function resequenceRoleOrder(term) {
    if (!term || !Array.isArray(term.roles)) return;
    term.roles.forEach((role, index) => {
      role.order = index + 1;
    });
  }

  function normalizeTerms(rawTerms) {
    return deepClone(Array.isArray(rawTerms) ? rawTerms : []).map((rawTerm) => ({
      uuid: normalizeText(rawTerm && rawTerm.uuid),
      name: normalizeText(rawTerm && rawTerm.name),
      visible: normalizeFlag(rawTerm && rawTerm.visible, 1),
      on_duty: normalizeFlag(rawTerm && rawTerm.on_duty, 0),
      active: normalizeFlag(rawTerm && rawTerm.active, 1),
      term_year_start: toInt(rawTerm && rawTerm.term_year_start, extractTermYears(rawTerm && rawTerm.name).start),
      term_year_end: toInt(rawTerm && rawTerm.term_year_end, extractTermYears(rawTerm && rawTerm.name).end),
      _clientId: normalizeText(rawTerm && rawTerm._clientId) || normalizeText(rawTerm && rawTerm.uuid) || makeClientId('term'),
      roles: normalizeRoles(rawTerm && rawTerm.roles),
    }));
  }

  function normalizeVersions(rawVersions) {
    return (Array.isArray(rawVersions) ? rawVersions : []).map((version) => ({
      version_seq: toInt(version && version.version_seq, 0),
      uuid: normalizeText(version && version.uuid),
      action: normalizeText(version && version.action) || 'save',
      source_version_uuid: normalizeText(version && version.source_version_uuid),
      note: normalizeText(version && version.note),
      created_at: normalizeText(version && version.created_at),
      created_by_uuid: normalizeText(version && version.created_by_uuid),
      created_by_email: normalizeText(version && version.created_by_email),
      created_by_name: normalizeText(version && version.created_by_name),
    }));
  }

  function serializeTerms(terms) {
    return (Array.isArray(terms) ? terms : []).map((term) => ({
      uuid: normalizeText(term && term.uuid),
      name: normalizeText(term && term.name),
      visible: normalizeFlag(term && term.visible, 1),
      on_duty: normalizeFlag(term && term.on_duty, 0),
      roles: (Array.isArray(term && term.roles) ? term.roles : []).map((role, index) => ({
        uuid: normalizeText(role && role.uuid),
        name: normalizeText(role && role.name),
        order: index + 1,
        officers: (Array.isArray(role && role.officers) ? role.officers : []).map((officer) => ({
          uuid: normalizeText(officer && officer.uuid),
          uuid_user: normalizeText(officer && officer.uuid_user),
          name: normalizeText(officer && officer.name),
          email: normalizeText(officer && officer.email),
          affiliation: normalizeText(officer && officer.affiliation),
        })),
      })),
    }));
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

  function sortSidebarTerms(terms, showHiddenTerms) {
    return deepClone(Array.isArray(terms) ? terms : [])
      .filter((term) => showHiddenTerms || normalizeFlag(term && term.visible, 1) === 1)
      .sort(compareTerms);
  }

  function pickPreferredTermId(terms, preferredId, showHiddenTerms) {
    const list = sortSidebarTerms(terms, showHiddenTerms);
    if (preferredId && list.some((item) => item._clientId === preferredId)) return preferredId;
    return list[0] ? list[0]._clientId : '';
  }

  function findTerm(terms, termId) {
    return (Array.isArray(terms) ? terms : []).find((item) => item._clientId === termId) || null;
  }

  function findRole(term, roleId) {
    return (Array.isArray(term && term.roles) ? term.roles : []).find((item) => item._clientId === roleId) || null;
  }

  function findOfficer(role, officerId) {
    return (Array.isArray(role && role.officers) ? role.officers : []).find((item) => item._clientId === officerId) || null;
  }

  function displayField(officer, fieldName) {
    if (!officer) return '';
    const linkedKey = `linked_${fieldName}`;
    return normalizeText(officer[linkedKey] || officer[fieldName]);
  }

  function summarizeOfficer(officer) {
    return {
      name: displayField(officer, 'name') || '—',
      secondary: displayField(officer, 'affiliation') || displayField(officer, 'email') || '—',
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
      ...options,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.ok === false) {
      throw new Error(payload.message || `HTTP ${response.status}`);
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
    const q = normalizeText(keyword);
    if (q.length < 2) return [];
    const url = `${CONFIG.api_search_users_url}?q=${encodeURIComponent(q)}`;
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

  function versionActionLabel(action) {
    if (action === 'baseline') return t('versionBaseline');
    if (action === 'restore') return t('versionRestored');
    return t('versionSaved');
  }

  function isEditableTarget(target) {
    if (!target || typeof target !== 'object') return false;
    const tagName = String(target.tagName || '').toLowerCase();
    if (['input', 'textarea', 'select'].includes(tagName)) return true;
    return Boolean(target.isContentEditable);
  }

  function injectEditorThemeCSS() {
    if (document.getElementById('statkiss-officers-editor-theme-css')) return;

    const roots = [
      'html.dark',
      'body.dark',
      '.dark',
      'html[data-theme="dark"]',
      'body[data-theme="dark"]',
      'html[data-bs-theme="dark"]',
      'body[data-bs-theme="dark"]',
    ];

    function themed(selector) {
      return roots.map((root) => `${root} ${selector}`).join(',\n');
    }

    const style = document.createElement('style');
    style.id = 'statkiss-officers-editor-theme-css';
    style.textContent = `
      ${themed('.statkiss-officers-editor-page')} {
        background: #020617 !important;
      }

      ${themed('.statkiss-officers-editor')} {
        color: #e2e8f0 !important;
        color-scheme: dark;
      }

      ${themed('.statkiss-officers-editor .bg-white')} {
        background-color: #0b1220 !important;
      }

      ${themed('.statkiss-officers-editor .bg-slate-50')} {
        background-color: #101827 !important;
      }

      ${themed('.statkiss-officers-editor .bg-slate-100')} {
        background-color: #162133 !important;
      }

      ${themed('.statkiss-officers-editor .bg-slate-950')} {
        background-color: #030712 !important;
      }

      ${themed('.statkiss-officers-editor .border-slate-100')} {
        border-color: #162033 !important;
      }

      ${themed('.statkiss-officers-editor .border-slate-200')} {
        border-color: #223047 !important;
      }

      ${themed('.statkiss-officers-editor .border-slate-300')} {
        border-color: #334155 !important;
      }

      ${themed('.statkiss-officers-editor .border-slate-700')} {
        border-color: #334155 !important;
      }

      ${themed('.statkiss-officers-editor .text-slate-900')} {
        color: #f8fafc !important;
      }

      ${themed('.statkiss-officers-editor .text-slate-700')} {
        color: #e2e8f0 !important;
      }

      ${themed('.statkiss-officers-editor .text-slate-600')} {
        color: #cbd5e1 !important;
      }

      ${themed('.statkiss-officers-editor .text-slate-500')} {
        color: #94a3b8 !important;
      }

      ${themed('.statkiss-officers-editor .text-slate-400')} {
        color: #64748b !important;
      }

      ${themed('.statkiss-officers-editor .placeholder\\:text-slate-400::placeholder')} {
        color: #64748b !important;
      }

      ${themed('.statkiss-officers-editor .placeholder\\:text-slate-500::placeholder')} {
        color: #475569 !important;
      }

      ${themed('.statkiss-officers-editor .bg-sky-50')} {
        background-color: #082f49 !important;
      }

      ${themed('.statkiss-officers-editor .border-sky-200')} {
        border-color: #0c4a6e !important;
      }

      ${themed('.statkiss-officers-editor .border-sky-300')} {
        border-color: #0369a1 !important;
      }

      ${themed('.statkiss-officers-editor .border-sky-800')} {
        border-color: #075985 !important;
      }

      ${themed('.statkiss-officers-editor .text-sky-700')} {
        color: #bae6fd !important;
      }

      ${themed('.statkiss-officers-editor .bg-emerald-50')} {
        background-color: #052e2b !important;
      }

      ${themed('.statkiss-officers-editor .border-emerald-200')} {
        border-color: #065f46 !important;
      }

      ${themed('.statkiss-officers-editor .text-emerald-700')} {
        color: #a7f3d0 !important;
      }

      ${themed('.statkiss-officers-editor .bg-rose-50')} {
        background-color: #3f1224 !important;
      }

      ${themed('.statkiss-officers-editor .border-rose-200')} {
        border-color: #9f1239 !important;
      }

      ${themed('.statkiss-officers-editor .text-rose-700')} {
        color: #fecdd3 !important;
      }

      ${themed('.statkiss-officers-editor .shadow-sm')} {
        box-shadow: 0 10px 26px rgba(2, 6, 23, 0.28) !important;
      }

      ${themed('.statkiss-officers-editor .shadow-2xl')} {
        box-shadow: 0 28px 60px rgba(2, 6, 23, 0.6) !important;
      }

      ${themed('.statkiss-officers-editor .bg-slate-950\\/50')} {
        background-color: rgba(2, 6, 23, 0.72) !important;
      }
    `;
    document.head.appendChild(style);
  }

  function set_main() {
    injectEditorThemeCSS();

    const { useEffect, useMemo, useRef, useState } = React;

    function Badge({ tone = 'slate', children }) {
      const toneMap = {
        slate: 'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
        sky: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
        rose: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200',
      };
      return (
        <span className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneMap[tone] || toneMap.slate}`}>
          {children}
        </span>
      );
    }

    function TextInput({ label, value, onChange, placeholder = '', type = 'text', onFocus }) {
      return (
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onFocus={onFocus}
            onChange={(event) => onChange(event.target.value)}
            className="statkiss-officers-editor-input w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-950"
          />
        </label>
      );
    }

    function Toggle({ label, checked, onChange }) {
      return (
        <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            checked={Boolean(checked)}
            onChange={(event) => onChange(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-sky-800"
          />
          <span>{label}</span>
        </label>
      );
    }

    function IconSvg({ name }) {
      if (name === 'undo') {
        return (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M7.5 6 4 9.5 7.5 13" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 9.5h7a4 4 0 1 1 0 8h-1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      }
      if (name === 'redo') {
        return (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m12.5 6 3.5 3.5-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9.5H8a4 4 0 1 0 0 8h1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      }
      if (name === 'up') {
        return (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m5 12 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      }
      if (name === 'down') {
        return (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      }
      if (name === 'chevron') {
        return (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      }
      return (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    function IconButton({ title, onClick, tone = 'slate', disabled = false, children }) {
      const toneMap = {
        slate: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white',
        sky: 'border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-700 dark:hover:bg-sky-900',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-900',
        rose: 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 dark:hover:border-rose-800 dark:hover:bg-rose-900',
      };
      return (
        <button
          type="button"
          title={title}
          aria-label={title}
          disabled={disabled}
          onClick={onClick}
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${toneMap[tone] || toneMap.slate}`}
        >
          {children}
        </button>
      );
    }

    function TextActionButton({ text, onClick, tone = 'slate', disabled = false }) {
      const toneMap = {
        slate: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white',
        sky: 'border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-300 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200 dark:hover:border-sky-700 dark:hover:bg-sky-900',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-900',
        rose: 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 dark:hover:border-rose-800 dark:hover:bg-rose-900',
      };
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap rounded-2xl border px-4 py-2 text-center text-sm font-semibold leading-none transition disabled:cursor-not-allowed disabled:opacity-45 ${toneMap[tone] || toneMap.slate}`}
        >
          {text}
        </button>
      );
    }

    function CollapsibleSection({ title, open, onToggle, children }) {
      return (
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          >
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            <span className={`text-slate-400 transition ${open ? 'rotate-180' : ''}`}>
              <IconSvg name="chevron" />
            </span>
          </button>
          {open ? <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">{children}</div> : null}
        </section>
      );
    }

    function TermSidebar({ terms, allTerms, selectedTermId, showHiddenTerms, onToggleHidden, onSelectTerm, onAddTerm }) {
      const hasAnyTerm = allTerms.length > 0;
      return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('termList')}</h2>
            <TextActionButton text={t('addTerm')} tone="sky" onClick={onAddTerm} />
          </div>

          <div className="mt-4">
            <Toggle label={t('showHiddenTerms')} checked={showHiddenTerms} onChange={onToggleHidden} />
          </div>

          {!hasAnyTerm ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-600 dark:text-slate-300">{t('noTerms')}</p>
              <div className="mt-4">
                <TextActionButton text={t('createFirstTerm')} tone="sky" onClick={onAddTerm} />
              </div>
            </div>
          ) : null}

          {hasAnyTerm && !terms.length ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-600 dark:text-slate-300">{t('noTermsFiltered')}</p>
            </div>
          ) : null}

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
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{term.name || '—'}</div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{(term.roles || []).length}</div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {term.on_duty ? <Badge tone="emerald">{t('badgeCurrent')}</Badge> : null}
                      <Badge tone={term.visible ? 'sky' : 'rose'}>{term.visible ? t('badgePublic') : t('badgeHidden')}</Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : null}
        </section>
      );
    }

    function TermSettings({ term, onUpdateTerm, onDeleteTerm }) {
      if (!term) {
        return (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-300">{t('chooseTermFirst')}</p>
          </section>
        );
      }

      return (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('termSettings')}</h2>
            <div className="flex flex-wrap gap-2">
              {term.on_duty ? <Badge tone="emerald">{t('badgeCurrent')}</Badge> : null}
              <Badge tone={term.visible ? 'sky' : 'rose'}>{term.visible ? t('badgePublic') : t('badgeHidden')}</Badge>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <TextInput label={t('termName')} value={term.name || ''} onChange={(value) => onUpdateTerm(term._clientId, { name: value })} />
            <div className="flex flex-col gap-3">
              <Toggle label={t('termVisible')} checked={term.visible} onChange={(value) => onUpdateTerm(term._clientId, { visible: value })} />
              <Toggle label={t('termOnDuty')} checked={term.on_duty} onChange={(value) => onUpdateTerm(term._clientId, { on_duty: value })} />
            </div>
            <TextActionButton text={t('deleteTerm')} tone="rose" onClick={() => onDeleteTerm(term._clientId)} />
          </div>
        </section>
      );
    }

    function RoleCard({
      termId,
      role,
      roleIndex,
      totalRoles,
      onRename,
      onMoveRole,
      onDeleteRole,
      onAddOfficer,
      onOpenOfficer,
      modalOfficerId,
    }) {
      return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <TextInput label={t('roleName')} value={role.name || ''} onChange={(value) => onRename(termId, role._clientId, value)} />
              </div>
              <div className="flex flex-wrap gap-2 md:pt-7">
                <IconButton title={t('moveUp')} tone="slate" disabled={roleIndex === 0} onClick={() => onMoveRole(termId, role._clientId, -1)}><IconSvg name="up" /></IconButton>
                <IconButton title={t('moveDown')} tone="slate" disabled={roleIndex === totalRoles - 1} onClick={() => onMoveRole(termId, role._clientId, 1)}><IconSvg name="down" /></IconButton>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('officersTitle')}</h3>
                <div className="flex items-center gap-2">
                  <Badge tone="slate">{(role.officers || []).length}</Badge>
                  <IconButton title={t('addOfficer')} tone="sky" onClick={() => onAddOfficer(termId, role._clientId)}><span className="text-lg leading-none">+</span></IconButton>
                  <IconButton title={t('deleteRole')} tone="rose" onClick={() => onDeleteRole(termId, role._clientId)}><span className="text-lg leading-none">−</span></IconButton>
                </div>
              </div>

              {(role.officers || []).length ? (
                <div className="space-y-2">
                  {(role.officers || []).map((officer) => {
                    const summary = summarizeOfficer(officer);
                    const isActive = modalOfficerId && modalOfficerId === officer._clientId;
                    return (
                      <button
                        key={officer._clientId}
                        type="button"
                        onClick={() => onOpenOfficer(termId, role._clientId, officer._clientId)}
                        className={`block w-full rounded-2xl border px-4 py-3 text-left transition ${isActive
                          ? 'border-sky-300 bg-sky-50 shadow-sm dark:border-sky-800 dark:bg-sky-950'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600'}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{summary.name}</div>
                            <div className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{summary.secondary}</div>
                          </div>
                          {officer.uuid_user ? <Badge tone="emerald">{t('linkedAccount')}</Badge> : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                  {t('noOfficers')}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    function VersionsPanel({ open, onToggle, versioningEnabled, versions, restoringVersionUuid, onRestore }) {
      return (
        <CollapsibleSection title={t('versionsTitle')} open={open} onToggle={onToggle}>
          {!versioningEnabled ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('versionsUnavailable')}</p>
          ) : null}

          {versioningEnabled && !versions.length ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('versionsEmpty')}</p>
          ) : null}

          {versioningEnabled && versions.length ? (
            <div className="space-y-3">
              {versions.map((version) => (
                <div key={version.uuid} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <Badge tone="slate">{versionActionLabel(version.action)}</Badge>
                        {version.created_at ? <Badge tone="slate">{version.created_at}</Badge> : null}
                      </div>
                      {(version.created_by_name || version.created_by_email) ? (
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                          {t('savedBy')}: {version.created_by_name || version.created_by_email}
                        </p>
                      ) : null}
                    </div>
                    <TextActionButton
                      text={restoringVersionUuid === version.uuid ? t('restoring') : t('restore')}
                      tone="emerald"
                      disabled={restoringVersionUuid === version.uuid}
                      onClick={() => onRestore(version)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </CollapsibleSection>
      );
    }

    function GuidePanel({ open, onToggle }) {
      return (
        <CollapsibleSection title={t('guideTitle')} open={open} onToggle={onToggle}>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>{t('guideFlow')}</li>
            <li>{t('guideLinked')}</li>
            <li>{t('guideHistory')}</li>
          </ul>
        </CollapsibleSection>
      );
    }

    function OfficerModal({ open, term, role, officer, onPatchOfficer, onDeleteOfficer, onClose }) {
      const [searchValue, setSearchValue] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [searching, setSearching] = useState(false);
      const [searchError, setSearchError] = useState('');
      const requestSeqRef = useRef(0);

      useEffect(() => {
        setSearchValue('');
        setSearchResults([]);
        setSearching(false);
        setSearchError('');
        requestSeqRef.current += 1;
      }, [open, officer ? officer._clientId : 'none']);

      useEffect(() => {
        if (!open || !officer) return undefined;
        const keyword = normalizeText(searchValue);
        if (!keyword) {
          setSearchResults([]);
          setSearching(false);
          setSearchError('');
          return undefined;
        }
        if (keyword.length < 2) {
          setSearchResults([]);
          setSearching(false);
          setSearchError('');
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
            setSearchError(`${t('loadErrorPrefix')} ${String((error && error.message) || error)}`);
            setSearchResults([]);
          } finally {
            if (!cancelled && requestSeqRef.current === seq) setSearching(false);
          }
        }, 250);

        return () => {
          cancelled = true;
          window.clearTimeout(timer);
        };
      }, [open, officer ? officer._clientId : 'none', searchValue]);

      if (!open || !officer) return null;

      const previewName = displayField(officer, 'name');
      const previewEmail = displayField(officer, 'email');
      const previewAffiliation = displayField(officer, 'affiliation');
      const linkedFound = Boolean(officer.uuid_user) && Boolean(normalizeFlag(officer.linked_user_found, 0));

      function patch(patchValue) {
        const nextPatch = { ...patchValue };
        if (Object.prototype.hasOwnProperty.call(nextPatch, 'name')) nextPatch.name = normalizeText(nextPatch.name);
        if (Object.prototype.hasOwnProperty.call(nextPatch, 'email')) nextPatch.email = normalizeText(nextPatch.email);
        if (Object.prototype.hasOwnProperty.call(nextPatch, 'affiliation')) nextPatch.affiliation = normalizeText(nextPatch.affiliation);
        if (Object.prototype.hasOwnProperty.call(nextPatch, 'uuid_user')) nextPatch.uuid_user = normalizeText(nextPatch.uuid_user);
        onPatchOfficer(nextPatch);
      }

      function handleSelectUser(candidate) {
        patch({
          uuid_user: normalizeText(candidate && candidate.uuid),
          linked_name: normalizeText(candidate && candidate.name),
          linked_email: normalizeText(candidate && candidate.email),
          linked_affiliation: normalizeText(candidate && candidate.affiliation),
          linked_user_found: 1,
          name: officer.name || normalizeText(candidate && candidate.name),
          email: officer.email || normalizeText(candidate && candidate.email),
          affiliation: officer.affiliation || normalizeText(candidate && candidate.affiliation),
        });
        setSearchValue('');
        setSearchResults([]);
        setSearchError('');
      }

      function handleUnlink() {
        patch({
          uuid_user: '',
          linked_name: '',
          linked_email: '',
          linked_affiliation: '',
          linked_user_found: 0,
        });
        setSearchValue('');
        setSearchResults([]);
        setSearchError('');
      }

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('modalTitle')}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {term ? <Badge tone="slate">{term.name || '—'}</Badge> : null}
                  {role ? <Badge tone="slate">{role.name || '—'}</Badge> : null}
                </div>
              </div>
              <IconButton title={t('close')} onClick={onClose} tone="slate"><IconSvg name="close" /></IconButton>
            </div>

            <div className="max-h-[calc(92vh-150px)] overflow-y-auto p-5">
              <div className="space-y-5">
                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('linkedAccount')}</h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {officer.uuid_user
                          ? (linkedFound ? t('linkedAccountFound') : t('linkedAccountMissing'))
                          : t('searchHelp')}
                      </p>
                    </div>
                    {officer.uuid_user ? <TextActionButton text={t('unlinkUser')} tone="rose" onClick={handleUnlink} /> : null}
                  </div>

                  {officer.uuid_user ? (
                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-white p-4 dark:border-emerald-900 dark:bg-slate-900">
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{previewName || '—'}</div>
                      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{previewEmail || '—'}</div>
                      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{previewAffiliation || '—'}</div>
                    </div>
                  ) : null}

                  <div className="mt-4 space-y-3">
                    <TextInput
                      label={t('searchUser')}
                      value={searchValue}
                      placeholder={t('searchPlaceholder')}
                      onChange={setSearchValue}
                    />

                    {searchValue.trim().length > 0 && searchValue.trim().length < 2 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('searchMinimum')}</p>
                    ) : null}

                    {searching ? <p className="text-sm text-slate-500 dark:text-slate-400">{t('searchLoading')}</p> : null}
                    {searchError ? <p className="text-sm text-rose-600 dark:text-rose-300">{searchError}</p> : null}

                    {!searching && !searchError && searchValue.trim().length >= 2 ? (
                      searchResults.length ? (
                        <div className="space-y-2">
                          {searchResults.map((candidate) => (
                            <button
                              key={candidate.uuid}
                              type="button"
                              onClick={() => handleSelectUser(candidate)}
                              className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-sky-300 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:bg-sky-950"
                            >
                              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{candidate.name || candidate.email || '—'}</div>
                              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{candidate.email || '—'}</div>
                              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{candidate.affiliation || '—'}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                          {t('searchNoResult')}
                        </div>
                      )
                    ) : null}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('manualInfo')}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <TextInput label={t('name')} value={officer.name || ''} onChange={(value) => patch({ name: value })} />
                    <TextInput label={t('email')} type="email" value={officer.email || ''} onChange={(value) => patch({ email: value })} />
                    <div className="md:col-span-2">
                      <TextInput label={t('affiliation')} value={officer.affiliation || ''} onChange={(value) => patch({ affiliation: value })} />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('previewTitle')}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('name')}</div>
                      <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">{previewName || '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('email')}</div>
                      <div className="mt-1 break-all text-sm text-slate-900 dark:text-slate-100">{previewEmail || '—'}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('affiliation')}</div>
                      <div className="mt-1 text-sm text-slate-900 dark:text-slate-100">{previewAffiliation || '—'}</div>
                    </div>
                  </div>
                </section>

                <p className="text-xs text-slate-500 dark:text-slate-400">{t('localChangesHint')}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-slate-800">
              <TextActionButton text={t('deleteOfficer')} tone="rose" onClick={onDeleteOfficer} />
              <TextActionButton text={t('close')} tone="slate" onClick={onClose} />
            </div>
          </div>
        </div>
      );
    }

    function EditorPage() {
      const [terms, setTerms] = useState([]);
      const [versions, setVersions] = useState([]);
      const [versioningEnabled, setVersioningEnabled] = useState(false);
      const [selectedTermId, setSelectedTermId] = useState('');
      const [showHiddenTerms, setShowHiddenTerms] = useState(false);
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [restoringVersionUuid, setRestoringVersionUuid] = useState('');
      const [error, setError] = useState('');
      const [message, setMessage] = useState('');
      const [showGuide, setShowGuide] = useState(false);
      const [showVersions, setShowVersions] = useState(false);
      const [modalState, setModalState] = useState({ open: false, termId: '', roleId: '', officerId: '' });
      const [historyTick, setHistoryTick] = useState(0);
      const historyRef = useRef({ past: [], future: [] });
      const termsRef = useRef([]);
      const selectedTermIdRef = useRef('');

      useEffect(() => {
        termsRef.current = terms;
      }, [terms]);

      useEffect(() => {
        selectedTermIdRef.current = selectedTermId;
      }, [selectedTermId]);

      function applyTermsState(nextTerms) {
        const normalized = normalizeTerms(nextTerms);
        termsRef.current = normalized;
        setTerms(normalized);
        return normalized;
      }

      function applySelectedTermId(nextValue) {
        const normalized = normalizeText(nextValue);
        selectedTermIdRef.current = normalized;
        setSelectedTermId(normalized);
        return normalized;
      }

      const canUndo = historyRef.current.past.length > 0;
      const canRedo = historyRef.current.future.length > 0;

      const sidebarTerms = useMemo(() => sortSidebarTerms(terms, showHiddenTerms), [terms, showHiddenTerms]);
      const selectedTerm = useMemo(() => findTerm(terms, selectedTermId), [terms, selectedTermId]);
      const modalTerm = useMemo(() => findTerm(terms, modalState.termId), [terms, modalState.termId]);
      const modalRole = useMemo(() => findRole(modalTerm, modalState.roleId), [modalTerm, modalState.roleId]);
      const modalOfficer = useMemo(() => findOfficer(modalRole, modalState.officerId), [modalRole, modalState.officerId]);

      function resetHistory() {
        historyRef.current = { past: [], future: [] };
        setHistoryTick((value) => value + 1);
      }

      function applyServerPayload(payload, successMessage) {
        const nextTerms = applyTermsState(payload && payload.terms);
        setVersions(normalizeVersions(payload && payload.versions));
        setVersioningEnabled(Boolean(payload && payload.versioning_enabled));
        applySelectedTermId(pickPreferredTermId(nextTerms, selectedTermIdRef.current, showHiddenTerms));
        setModalState({ open: false, termId: '', roleId: '', officerId: '' });
        resetHistory();
        setError('');
        setMessage(successMessage || '');
      }

      async function load() {
        setLoading(true);
        setError('');
        setMessage('');
        try {
          const payload = await fetchEditorPayload();
          const nextTerms = applyTermsState(payload && payload.terms);
          setVersions(normalizeVersions(payload && payload.versions));
          setVersioningEnabled(Boolean(payload && payload.versioning_enabled));
          applySelectedTermId(pickPreferredTermId(nextTerms, '', false));
          setShowHiddenTerms(false);
          setModalState({ open: false, termId: '', roleId: '', officerId: '' });
          resetHistory();
        } catch (loadError) {
          applyTermsState([]);
          setVersions([]);
          setVersioningEnabled(false);
          applySelectedTermId('');
          setError(`${t('loadErrorPrefix')} ${String((loadError && loadError.message) || loadError)}`);
        } finally {
          setLoading(false);
        }
      }

      useEffect(() => {
        load();
      }, []);

      useEffect(() => {
        const preferred = pickPreferredTermId(terms, selectedTermId, showHiddenTerms);
        if (preferred !== selectedTermId) {
          applySelectedTermId(preferred);
        }
      }, [terms, selectedTermId, showHiddenTerms]);

      useEffect(() => {
        if (!modalState.open) return;
        if (!modalTerm || !modalRole || !modalOfficer) {
          setModalState({ open: false, termId: '', roleId: '', officerId: '' });
        }
      }, [modalState, modalTerm, modalRole, modalOfficer]);

      function commitMutation(mutator) {
        const before = normalizeTerms(termsRef.current);
        const next = deepClone(before);
        mutator(next);
        const normalized = normalizeTerms(next);
        if (JSON.stringify(serializeTerms(before)) === JSON.stringify(serializeTerms(normalized))) return;
        historyRef.current.past.push(deepClone(before));
        if (historyRef.current.past.length > HISTORY_LIMIT) historyRef.current.past.shift();
        historyRef.current.future = [];
        setHistoryTick((value) => value + 1);
        applyTermsState(normalized);
        setError('');
        setMessage('');
      }

      function handleUndo() {
        if (!historyRef.current.past.length) return;
        const previous = historyRef.current.past.pop();
        historyRef.current.future.push(deepClone(normalizeTerms(termsRef.current)));
        applyTermsState(previous);
        setHistoryTick((value) => value + 1);
        setError('');
        setMessage('');
      }

      function handleRedo() {
        if (!historyRef.current.future.length) return;
        const next = historyRef.current.future.pop();
        historyRef.current.past.push(deepClone(normalizeTerms(termsRef.current)));
        if (historyRef.current.past.length > HISTORY_LIMIT) historyRef.current.past.shift();
        applyTermsState(next);
        setHistoryTick((value) => value + 1);
        setError('');
        setMessage('');
      }

      useEffect(() => {
        const handleKeyDown = (event) => {
          const isModifier = event.ctrlKey || event.metaKey;
          if (!isModifier || event.altKey) return;
          if (isEditableTarget(event.target)) return;
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
      }, [terms, historyTick]);

      function addTerm() {
        const newTerm = createEmptyTerm();
        commitMutation((next) => {
          next.unshift(newTerm);
        });
        applySelectedTermId(newTerm._clientId);
      }

      function handleSelectTerm(termId) {
        applySelectedTermId(termId);
        setModalState({ open: false, termId: '', roleId: '', officerId: '' });
      }

      function updateTerm(termId, patch) {
        if (Object.prototype.hasOwnProperty.call(patch, 'visible') && !patch.visible) {
          setShowHiddenTerms(true);
        }
        commitMutation((next) => {
          const term = findTerm(next, termId);
          if (!term) return;
          if (Object.prototype.hasOwnProperty.call(patch, 'name')) term.name = normalizeText(patch.name);
          if (Object.prototype.hasOwnProperty.call(patch, 'visible')) term.visible = normalizeFlag(patch.visible, 1);
          if (Object.prototype.hasOwnProperty.call(patch, 'on_duty')) {
            const flag = normalizeFlag(patch.on_duty, 0);
            next.forEach((item) => {
              if (item._clientId === termId) {
                item.on_duty = flag;
              } else if (flag) {
                item.on_duty = 0;
              }
            });
          }
        });
      }

      function deleteTerm(termId) {
        if (!window.confirm(t('confirmDeleteTerm'))) return;
        commitMutation((next) => {
          const index = next.findIndex((item) => item._clientId === termId);
          if (index >= 0) next.splice(index, 1);
        });
        if (selectedTermIdRef.current === termId) applySelectedTermId('');
      }

      function addRole(termId) {
        const newRole = createEmptyRole();
        commitMutation((next) => {
          const term = findTerm(next, termId);
          if (!term) return;
          term.roles = [newRole, ...(term.roles || [])];
          resequenceRoleOrder(term);
        });
      }

      function renameRole(termId, roleId, value) {
        commitMutation((next) => {
          const role = findRole(findTerm(next, termId), roleId);
          if (role) role.name = normalizeText(value);
        });
      }

      function moveRole(termId, roleId, direction) {
        commitMutation((next) => {
          const term = findTerm(next, termId);
          if (!term || !Array.isArray(term.roles)) return;
          const index = term.roles.findIndex((item) => item._clientId === roleId);
          const targetIndex = index + direction;
          if (index < 0 || targetIndex < 0 || targetIndex >= term.roles.length) return;
          const temp = term.roles[index];
          term.roles[index] = term.roles[targetIndex];
          term.roles[targetIndex] = temp;
          resequenceRoleOrder(term);
        });
      }

      function deleteRole(termId, roleId) {
        if (!window.confirm(t('confirmDeleteRole'))) return;
        commitMutation((next) => {
          const term = findTerm(next, termId);
          if (!term || !Array.isArray(term.roles)) return;
          const index = term.roles.findIndex((item) => item._clientId === roleId);
          if (index >= 0) term.roles.splice(index, 1);
          resequenceRoleOrder(term);
        });
      }

      function addOfficer(termId, roleId) {
        const newOfficer = createEmptyOfficer();
        commitMutation((next) => {
          const role = findRole(findTerm(next, termId), roleId);
          if (!role) return;
          role.officers = [newOfficer, ...(role.officers || [])];
        });
        setModalState({ open: true, termId, roleId, officerId: newOfficer._clientId });
      }

      function openOfficer(termId, roleId, officerId) {
        setModalState({ open: true, termId, roleId, officerId });
      }

      function patchOfficer(patch) {
        if (!modalState.open) return;
        commitMutation((next) => {
          const officer = findOfficer(findRole(findTerm(next, modalState.termId), modalState.roleId), modalState.officerId);
          if (!officer) return;
          Object.assign(officer, patch);
          officer.uuid_user = normalizeText(officer.uuid_user);
          officer.name = normalizeText(officer.name);
          officer.email = normalizeText(officer.email);
          officer.affiliation = normalizeText(officer.affiliation);
          officer.linked_name = normalizeText(officer.linked_name);
          officer.linked_email = normalizeText(officer.linked_email);
          officer.linked_affiliation = normalizeText(officer.linked_affiliation);
          officer.linked_user_found = normalizeFlag(officer.linked_user_found, 0);
          if (!officer.uuid_user) {
            officer.linked_name = '';
            officer.linked_email = '';
            officer.linked_affiliation = '';
            officer.linked_user_found = 0;
          }
          officer.resolved_name = normalizeText(officer.linked_name || officer.name);
          officer.resolved_email = normalizeText(officer.linked_email || officer.email);
          officer.resolved_affiliation = normalizeText(officer.linked_affiliation || officer.affiliation);
        });
      }

      function deleteOfficer() {
        if (!modalState.open || !window.confirm(t('confirmDeleteOfficer'))) return;
        const { termId, roleId, officerId } = modalState;
        commitMutation((next) => {
          const role = findRole(findTerm(next, termId), roleId);
          if (!role || !Array.isArray(role.officers)) return;
          const index = role.officers.findIndex((item) => item._clientId === officerId);
          if (index >= 0) role.officers.splice(index, 1);
        });
        setModalState({ open: false, termId: '', roleId: '', officerId: '' });
      }

      async function handleSave() {
        setSaving(true);
        setError('');
        setMessage('');
        try {
          const payload = await saveEditorPayload(termsRef.current);
          applyServerPayload(payload, payload && payload.message ? payload.message : t('saveSuccess'));
        } catch (saveError) {
          setError(`${t('saveErrorPrefix')} ${String((saveError && saveError.message) || saveError)}`);
        } finally {
          setSaving(false);
        }
      }

      async function handleRestore(version) {
        if (!version || !version.uuid) return;
        if (!window.confirm(t('restoreConfirm'))) return;
        setRestoringVersionUuid(version.uuid);
        setError('');
        setMessage('');
        try {
          const payload = await restoreEditorVersion(version.uuid);
          applyServerPayload(payload, payload && payload.message ? payload.message : t('restoreSuccess'));
        } catch (restoreError) {
          setError(`${t('restoreErrorPrefix')} ${String((restoreError && restoreError.message) || restoreError)}`);
        } finally {
          setRestoringVersionUuid('');
        }
      }

      return (
        <main className="statkiss-officers-editor statkiss-officers-editor-page min-h-screen bg-slate-50 py-8 dark:bg-slate-950" data-statkiss-officers-editor>
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 lg:px-6">
            <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('title')}</h1>
                  <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={CONFIG.officers_public_path}
                    className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
                  >
                    {t('back')}
                  </a>
                  <TextActionButton text={t('reload')} tone="slate" onClick={load} />
                  <IconButton title={t('undo')} tone="slate" disabled={!canUndo} onClick={handleUndo}><IconSvg name="undo" /></IconButton>
                  <IconButton title={t('redo')} tone="slate" disabled={!canRedo} onClick={handleRedo}><IconSvg name="redo" /></IconButton>
                  <TextActionButton text={saving ? t('saving') : t('save')} tone="emerald" disabled={saving} onClick={handleSave} />
                </div>
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

            <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
              <div className="space-y-6">
                <TermSidebar
                  terms={sidebarTerms}
                  allTerms={terms}
                  selectedTermId={selectedTermId}
                  showHiddenTerms={showHiddenTerms}
                  onToggleHidden={setShowHiddenTerms}
                  onSelectTerm={handleSelectTerm}
                  onAddTerm={addTerm}
                />
                <TermSettings term={selectedTerm} onUpdateTerm={updateTerm} onDeleteTerm={deleteTerm} />
                <VersionsPanel
                  open={showVersions}
                  onToggle={() => setShowVersions((value) => !value)}
                  versioningEnabled={versioningEnabled}
                  versions={versions}
                  restoringVersionUuid={restoringVersionUuid}
                  onRestore={handleRestore}
                />
              </div>

              <div className="space-y-6">
                <GuidePanel open={showGuide} onToggle={() => setShowGuide((value) => !value)} />

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{selectedTerm ? (selectedTerm.name || '—') : t('chooseTermFirst')}</h2>
                      {selectedTerm ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedTerm.on_duty ? <Badge tone="emerald">{t('badgeCurrent')}</Badge> : null}
                          <Badge tone={selectedTerm.visible ? 'sky' : 'rose'}>{selectedTerm.visible ? t('badgePublic') : t('badgeHidden')}</Badge>
                        </div>
                      ) : null}
                    </div>
                    {selectedTerm ? <TextActionButton text={t('addRole')} tone="sky" onClick={() => addRole(selectedTerm._clientId)} /> : null}
                  </div>

                  {!selectedTerm ? null : (
                    <div className="mt-5">
                      {(selectedTerm.roles || []).length ? (
                        <div className="space-y-4">
                          {(selectedTerm.roles || []).map((role, roleIndex) => (
                            <RoleCard
                              key={role._clientId}
                              termId={selectedTerm._clientId}
                              role={role}
                              roleIndex={roleIndex}
                              totalRoles={(selectedTerm.roles || []).length}
                              onRename={renameRole}
                              onMoveRole={moveRole}
                              onDeleteRole={deleteRole}
                              onAddOfficer={addOfficer}
                              onOpenOfficer={openOfficer}
                              modalOfficerId={modalState.open ? modalState.officerId : ''}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                          {t('noRoles')}
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>

          <OfficerModal
            open={modalState.open}
            term={modalTerm}
            role={modalRole}
            officer={modalOfficer}
            onPatchOfficer={patchOfficer}
            onDeleteOfficer={deleteOfficer}
            onClose={() => setModalState({ open: false, termId: '', roleId: '', officerId: '' })}
          />
        </main>
      );
    }

    ReactDOM.render(<EditorPage />, document.getElementById('div_main'));
  }

  window.set_main = set_main;
})();
