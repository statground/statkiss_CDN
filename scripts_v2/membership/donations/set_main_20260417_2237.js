(function() {
  'use strict';

  const DONATIONS_STYLE_ID = 'statkiss-donations-styles-20260406';
  const HISTORY_LIMIT = 300;

  let donationsCleanupRegistered = false;
  let donationsMountHandlersBound = false;
  let donationsTempCounter = 0;

  const state = {
    lang: 'en',
    isDark: false,
    loading: true,
    loadError: false,
    payloadError: '',
    mode: 'view',
    canManage: false,
    config: {},
    rows: [],
    donationTypes: [],
    contacts: [],
    draft: { years: [] },
    originalSnapshot: { years: [] },
    history: [],
    historyIndex: -1,
    selectedYear: null,
    saving: false,
    allowNavigation: false,
  };

  function ensureDonationStyles() {
    if (document.getElementById(DONATIONS_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = DONATIONS_STYLE_ID;
    style.textContent = `
      .sk-donations-root {
        --sk-bg: #ffffff;
        --sk-surface: #ffffff;
        --sk-surface-soft: #f8fafc;
        --sk-surface-soft-2: #eef2ff;
        --sk-surface-strong: #eff6ff;
        --sk-surface-selected: rgba(59, 130, 246, 0.12);
        --sk-border: #dbeafe;
        --sk-border-strong: #bfdbfe;
        --sk-text: #111827;
        --sk-text-soft: #475569;
        --sk-text-muted: #64748b;
        --sk-accent: #2563eb;
        --sk-accent-hover: #1d4ed8;
        --sk-accent-ring: rgba(59, 130, 246, 0.28);
        --sk-danger-soft: rgba(239, 68, 68, 0.12);
        --sk-danger-text: #dc2626;
        --sk-success: #16a34a;
        --sk-warning: #d97706;
        --sk-skeleton: #e5e7eb;
        --sk-shadow: rgba(15, 23, 42, 0.06);
        --sk-platinum: #6d28d9;
        --sk-gold: #b45309;
        --sk-silver: #374151;
        --sk-bronze: #92400e;
      }
      .sk-donations-root.sk-mode-dark {
        --sk-bg: #020617;
        --sk-surface: #0f172a;
        --sk-surface-soft: #111827;
        --sk-surface-soft-2: #172554;
        --sk-surface-strong: #132036;
        --sk-surface-selected: rgba(96, 165, 250, 0.18);
        --sk-border: #334155;
        --sk-border-strong: #475569;
        --sk-text: #e5e7eb;
        --sk-text-soft: #cbd5e1;
        --sk-text-muted: #94a3b8;
        --sk-accent: #60a5fa;
        --sk-accent-hover: #93c5fd;
        --sk-accent-ring: rgba(96, 165, 250, 0.22);
        --sk-danger-soft: rgba(248, 113, 113, 0.16);
        --sk-danger-text: #fca5a5;
        --sk-success: #4ade80;
        --sk-warning: #fbbf24;
        --sk-skeleton: #334155;
        --sk-shadow: rgba(2, 8, 23, 0.38);
        --sk-platinum: #c4b5fd;
        --sk-gold: #fbbf24;
        --sk-silver: #d1d5db;
        --sk-bronze: #f59e0b;
      }
      .sk-donations-root {
        color: var(--sk-text);
        background: transparent;
      }
      .sk-page-title { color: var(--sk-text); }
      .sk-body-text { color: var(--sk-text-soft); }
      .sk-muted-text { color: var(--sk-text-muted); }
      .sk-section-title { color: var(--sk-text); }
      .sk-sub-title { color: var(--sk-text-soft); }
      .sk-card,
      .sk-panel,
      .sk-contact-card,
      .sk-donor-card,
      .sk-editor-item {
        background: var(--sk-surface);
        border: 1px solid var(--sk-border);
        box-shadow: 0 10px 30px var(--sk-shadow);
      }
      .sk-soft-panel {
        background: linear-gradient(180deg, var(--sk-surface-soft) 0%, var(--sk-surface) 100%);
        border: 1px solid var(--sk-border);
      }
      .sk-highlight-panel {
        background: linear-gradient(180deg, var(--sk-surface-strong) 0%, var(--sk-surface) 100%);
        border: 1px solid var(--sk-border-strong);
      }
      .sk-table {
        width: 100%;
        border-collapse: collapse;
      }
      .sk-table thead th {
        background: var(--sk-surface-soft);
        border: 1px solid var(--sk-border);
        color: var(--sk-text-soft);
      }
      .sk-table td {
        border: 1px solid var(--sk-border);
        background: var(--sk-surface);
        color: var(--sk-text);
      }
      .sk-tier-platinum { color: var(--sk-platinum) !important; }
      .sk-tier-gold { color: var(--sk-gold) !important; }
      .sk-tier-silver { color: var(--sk-silver) !important; }
      .sk-tier-bronze { color: var(--sk-bronze) !important; }
      .sk-check-icon { color: var(--sk-success); }
      .sk-input,
      .sk-select,
      .sk-textarea {
        width: 100%;
        border-radius: 0.875rem;
        border: 1px solid var(--sk-border-strong);
        background: var(--sk-surface);
        color: var(--sk-text);
        padding: 0.7rem 0.9rem;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      }
      .sk-textarea { min-height: 110px; resize: vertical; }
      .sk-input::placeholder,
      .sk-textarea::placeholder { color: var(--sk-text-muted); }
      .sk-input:focus,
      .sk-select:focus,
      .sk-textarea:focus {
        border-color: var(--sk-accent);
        box-shadow: 0 0 0 4px var(--sk-accent-ring);
      }
      .sk-button-primary,
      .sk-button-secondary,
      .sk-button-danger,
      .sk-toolbar-btn,
      .sk-year-btn,
      .sk-small-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: 0.875rem;
        font-weight: 600;
        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
      }
      .sk-button-primary,
      .sk-toolbar-btn.sk-primary {
        border: 0;
        background: var(--sk-accent);
        color: #ffffff;
        padding: 0.75rem 1.125rem;
      }
      .sk-button-primary:hover,
      .sk-toolbar-btn.sk-primary:hover { background: var(--sk-accent-hover); }
      .sk-button-secondary,
      .sk-year-btn,
      .sk-toolbar-btn,
      .sk-small-btn {
        border: 1px solid var(--sk-border-strong);
        background: var(--sk-surface);
        color: var(--sk-text-soft);
        padding: 0.7rem 1rem;
      }
      .sk-year-btn:hover,
      .sk-button-secondary:hover,
      .sk-toolbar-btn:hover,
      .sk-small-btn:hover {
        background: var(--sk-surface-soft);
        border-color: var(--sk-accent);
        color: var(--sk-text);
      }
      .sk-year-btn.is-active {
        background: var(--sk-surface-selected);
        border-color: var(--sk-accent);
        color: var(--sk-text);
      }
      .sk-button-danger {
        border: 1px solid rgba(239, 68, 68, 0.28);
        background: var(--sk-danger-soft);
        color: var(--sk-danger-text);
        padding: 0.7rem 1rem;
      }
      .sk-button-danger:hover {
        background: rgba(239, 68, 68, 0.2);
      }
      .sk-toolbar-btn:disabled,
      .sk-small-btn:disabled,
      .sk-year-btn:disabled,
      .sk-button-primary:disabled,
      .sk-button-secondary:disabled,
      .sk-button-danger:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .sk-status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 9999px;
        padding: 0.35rem 0.85rem;
        border: 1px solid var(--sk-border-strong);
        background: var(--sk-surface-soft);
        color: var(--sk-text-soft);
        font-size: 0.85rem;
        font-weight: 600;
      }
      .sk-status-badge.is-unsaved {
        border-color: rgba(217, 119, 6, 0.35);
        background: rgba(245, 158, 11, 0.12);
        color: var(--sk-warning);
      }
      .sk-empty-state {
        border: 1px dashed var(--sk-border-strong);
        background: var(--sk-surface-soft);
        color: var(--sk-text-muted);
      }
      .sk-skeleton-line,
      .sk-skeleton-block {
        background: var(--sk-skeleton);
        border-radius: 0.75rem;
      }
      .sk-icon-preview {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        background: transparent;
        border: 0;
        box-shadow: none;
        flex-shrink: 0;
      }
      .sk-donor-icon-img {
        display: block;
        width: 3rem;
        height: 3rem;
        object-fit: contain;
      }
      .sk-donations-root.sk-mode-dark .sk-donor-icon-img {
        filter: brightness(0) invert(1);
      }
      .sk-contact-card p,
      .sk-donor-card p,
      .sk-editor-item p,
      .sk-editor-item label {
        word-break: break-word;
      }
      .sk-email-link {
        color: var(--sk-accent);
        word-break: break-word;
      }
      .sk-editor-grid {
        display: grid;
        gap: 1.5rem;
      }
      @media (min-width: 1024px) {
        .sk-editor-grid {
          grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
          align-items: start;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getDonationsI18n() {
    return window.StatKISS_DONATIONS_I18N || null;
  }

  function getHeaderI18n() {
    return window.StatKISS_I18N || null;
  }

  function resolveCurrentLang() {
    const donationsI18n = getDonationsI18n();
    if (donationsI18n && typeof donationsI18n.getLang === 'function') {
      return donationsI18n.getLang();
    }
    const headerI18n = getHeaderI18n();
    if (headerI18n && typeof headerI18n.getInitialLang === 'function') {
      return headerI18n.getInitialLang();
    }
    return document.documentElement.getAttribute('lang') || 'en';
  }

  function isDarkModeEnabled() {
    try {
      if (window.StatKISSTheme && typeof window.StatKISSTheme.isDark === 'function') {
        return window.StatKISSTheme.isDark();
      }
    } catch (error) {}
    const root = document.documentElement;
    const body = document.body;
    const storageKeys = ['statkiss_theme', 'theme', 'color-theme', 'colorTheme'];

    for (let index = 0; index < storageKeys.length; index += 1) {
      try {
        const value = String(localStorage.getItem(storageKeys[index]) || '').toLowerCase();
        if (value === 'dark') return true;
        if (value === 'light') return false;
        if ((value === 'system' || value === 'auto') && window.matchMedia) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
      } catch (error) {
        // ignore storage issues
      }
    }

    const attrCandidates = [
      root ? root.getAttribute('data-theme') : '',
      root ? root.getAttribute('data-mode') : '',
      root ? root.getAttribute('data-color-mode') : '',
      body ? body.getAttribute('data-theme') : '',
      body ? body.getAttribute('data-mode') : '',
      body ? body.getAttribute('data-color-mode') : ''
    ].filter(Boolean).map((value) => String(value).toLowerCase());

    if (attrCandidates.includes('dark')) return true;
    if (attrCandidates.includes('light')) return false;

    return Boolean((root && root.classList.contains('dark')) || (body && body.classList.contains('dark')));
  }

  function t(key, params) {
    const donationsI18n = getDonationsI18n();
    if (donationsI18n && typeof donationsI18n.t === 'function') {
      return donationsI18n.t(state.lang, key, params);
    }
    return key;
  }

  function isRTL() {
    const donationsI18n = getDonationsI18n();
    return Boolean(donationsI18n && typeof donationsI18n.isRTL === 'function' && donationsI18n.isRTL(state.lang));
  }

  function normalizePath(pathValue) {
    const value = String(pathValue || '/').trim();
    if (!value) return '/';
    const withLeadingSlash = value.charAt(0) === '/' ? value : '/' + value;
    const collapsed = withLeadingSlash.replace(/\/+/g, '/');
    return collapsed.endsWith('/') ? collapsed : (collapsed + '/');
  }

  function stripLeadingSlash(pathValue) {
    return String(pathValue || '').replace(/^\/+/, '');
  }

  function buildPath(basePath, pathValue) {
    return normalizePath(basePath) + stripLeadingSlash(pathValue);
  }

  function resolveMembershipBasePath() {
    const pathname = window.location && window.location.pathname ? window.location.pathname : '/';
    const marker = '/membership/';
    const markerIndex = pathname.indexOf(marker);
    if (markerIndex !== -1) {
      return normalizePath(pathname.slice(0, markerIndex + marker.length));
    }

    const donationsI18n = getDonationsI18n();
    const supportedCodes = Array.isArray(donationsI18n && donationsI18n.languages)
      ? donationsI18n.languages.map((item) => item && item.code ? String(item.code) : '').filter(Boolean)
      : [];
    const firstSegment = pathname.replace(/^\/+/, '').split('/')[0];
    const localePrefix = supportedCodes.indexOf(firstSegment) !== -1 ? '/' + firstSegment + '/' : '/';
    return buildPath(localePrefix, 'membership/');
  }

  function parseConfig() {
    const configNode = document.getElementById('statkiss-donations-page-config');
    if (!configNode) return {};
    try {
      return JSON.parse(configNode.textContent || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function buildConfig(rawConfig) {
    const membershipBase = resolveMembershipBasePath();
    return {
      mode: rawConfig && rawConfig.mode === 'edit' ? 'edit' : 'view',
      can_manage_donations: Boolean(rawConfig && rawConfig.can_manage_donations),
      donations_public_path: (rawConfig && rawConfig.donations_public_path) || buildPath(membershipBase, 'donations/'),
      donations_edit_path: (rawConfig && rawConfig.donations_edit_path) || buildPath(membershipBase, 'donations/edit/'),
      api_page_payload_url: (rawConfig && rawConfig.api_page_payload_url) || buildPath(membershipBase, 'ajax_get_donations_page_payload/'),
      api_save_url: (rawConfig && rawConfig.api_save_url) || buildPath(membershipBase, 'ajax_save_donations_edit/'),
    };
  }

  function getCsrfToken() {
    return typeof window.getCookie === 'function' ? window.getCookie('csrftoken') : '';
  }

  async function fetchJson(urlValue, options) {
    const response = await fetch(urlValue, options || {});
    const text = await response.text();
    let payload = {};
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (error) {
        payload = { raw: text };
      }
    }
    if (!response.ok) {
      const message = payload.error || payload.message || payload.detail || payload.raw || ('HTTP ' + response.status);
      throw new Error(message);
    }
    return payload;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMultilineText(value) {
    return escapeHtml(value).replace(/\n/g, '<br />');
  }

  function formatMoney(amount) {
    const numeric = Number(amount);
    if (!Number.isFinite(numeric)) return escapeHtml(amount);
    try {
      return '$' + new Intl.NumberFormat(state.lang || 'en').format(numeric);
    } catch (error) {
      return '$' + numeric.toLocaleString('en-US');
    }
  }

  function uniqueDonorId() {
    donationsTempCounter += 1;
    return 'donor-temp-' + donationsTempCounter;
  }

  function normalizeYearValue(value) {
    if (value == null || value === '') return null;
    const parsed = Number.parseInt(String(value).trim(), 10);
    if (!Number.isFinite(parsed)) return null;
    return parsed;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function donationTypeByUuid(uuidValue) {
    const target = String(uuidValue || '').trim();
    for (let index = 0; index < state.donationTypes.length; index += 1) {
      const item = state.donationTypes[index] || {};
      if (String(item.uuid || '').trim() === target) {
        return item;
      }
    }
    return null;
  }

  function resolveDonationTypeLabel(typeItem) {
    if (!typeItem) return '';
    if (typeItem.translation_key) {
      return t(typeItem.translation_key) || String(typeItem.name || '');
    }
    return String(typeItem.name || '');
  }

  function normalizeDonorRecord(rawDonor, yearValue, indexWithinYear) {
    const typeItem = donationTypeByUuid(rawDonor && rawDonor.uuid_type);
    return {
      client_id: String((rawDonor && rawDonor.client_id) || (rawDonor && rawDonor.uuid) || uniqueDonorId()),
      uuid: String((rawDonor && rawDonor.uuid) || '').trim(),
      year: yearValue,
      amount: rawDonor && rawDonor.amount != null ? String(rawDonor.amount) : '',
      uuid_type: String((rawDonor && rawDonor.uuid_type) || (typeItem && typeItem.uuid) || '').trim(),
      category_name: String((rawDonor && rawDonor.category_name) || (typeItem && typeItem.name) || '').trim(),
      category_translation_key: String((rawDonor && rawDonor.category_translation_key) || (typeItem && typeItem.translation_key) || '').trim(),
      url_icon: String((rawDonor && rawDonor.url_icon) || (typeItem && typeItem.url_icon) || '').trim(),
      name: String((rawDonor && rawDonor.name) || '').trim(),
      affiliation: String((rawDonor && rawDonor.affiliation) || '').trim(),
      comment: String((rawDonor && rawDonor.comment) || '').trim(),
      sort_order: indexWithinYear + 1,
      created_at: String((rawDonor && rawDonor.created_at) || '').trim(),
      updated_at: String((rawDonor && rawDonor.updated_at) || '').trim(),
    };
  }

  function snapshotDraft(draftValue) {
    const years = [];
    const seenYears = new Set();
    const rawYears = Array.isArray(draftValue && draftValue.years) ? draftValue.years : [];

    rawYears.forEach((rawYearObj) => {
      const yearValue = normalizeYearValue(rawYearObj && rawYearObj.year);
      if (yearValue == null || seenYears.has(yearValue)) return;
      seenYears.add(yearValue);
      const donors = [];
      const rawDonors = Array.isArray(rawYearObj && rawYearObj.donors) ? rawYearObj.donors : [];
      rawDonors.forEach((rawDonor, donorIndex) => {
        donors.push(normalizeDonorRecord(rawDonor, yearValue, donorIndex));
      });
      years.push({ year: yearValue, donors: donors });
    });

    years.sort((a, b) => b.year - a.year);
    return { years: years };
  }

  function applySnapshot(snapshotValue, preserveSelection) {
    state.draft = snapshotDraft(snapshotValue || { years: [] });
    const availableYears = state.draft.years.map((item) => item.year);
    const requestedSelection = preserveSelection ? state.selectedYear : null;
    if (requestedSelection != null && availableYears.includes(requestedSelection)) {
      state.selectedYear = requestedSelection;
    } else {
      state.selectedYear = availableYears.length ? availableYears[0] : null;
    }
  }

  function pushHistoryFromDraft() {
    const snapshot = snapshotDraft(state.draft);
    const serialized = JSON.stringify(snapshot);
    const currentSerialized = state.historyIndex >= 0 && state.history[state.historyIndex]
      ? JSON.stringify(state.history[state.historyIndex])
      : '';
    if (serialized === currentSerialized) {
      refreshEditorChrome();
      return;
    }

    if (state.historyIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.historyIndex + 1);
    }
    state.history.push(snapshot);
    if (state.history.length > HISTORY_LIMIT) {
      state.history.shift();
    }
    state.historyIndex = state.history.length - 1;
    refreshEditorChrome();
  }

  function initializeHistoryFromRows(rows) {
    state.rows = Array.isArray(rows) ? rows : [];
    state.draft = buildDraftFromRows(state.rows);
    state.originalSnapshot = snapshotDraft(state.draft);
    state.history = [clone(state.originalSnapshot)];
    state.historyIndex = 0;
    state.selectedYear = state.originalSnapshot.years.length ? state.originalSnapshot.years[0].year : null;
    applySnapshot(state.originalSnapshot, true);
  }

  function buildDraftFromRows(rows) {
    const map = new Map();
    (Array.isArray(rows) ? rows : []).forEach((rawRow) => {
      const yearValue = normalizeYearValue(rawRow && rawRow.year);
      if (yearValue == null) return;
      if (!map.has(yearValue)) {
        map.set(yearValue, []);
      }
      map.get(yearValue).push(rawRow);
    });

    const years = Array.from(map.keys()).sort((a, b) => b - a).map((yearValue) => {
      const donorRows = map.get(yearValue).slice();
      donorRows.sort((a, b) => {
        const orderA = Number(a && a.sort_order ? a.sort_order : 0);
        const orderB = Number(b && b.sort_order ? b.sort_order : 0);
        if (orderA && orderB && orderA !== orderB) return orderA - orderB;
        const createdA = String(a && a.created_at ? a.created_at : '');
        const createdB = String(b && b.created_at ? b.created_at : '');
        if (createdA && createdB && createdA !== createdB) return createdA < createdB ? -1 : 1;
        const amountA = Number(a && a.amount ? a.amount : 0);
        const amountB = Number(b && b.amount ? b.amount : 0);
        if (amountA !== amountB) return amountB - amountA;
        return String(a && a.name ? a.name : '').localeCompare(String(b && b.name ? b.name : ''));
      });
      return {
        year: yearValue,
        donors: donorRows.map((item, donorIndex) => normalizeDonorRecord(item, yearValue, donorIndex))
      };
    });

    return { years: years };
  }

  function getSelectedYearObject() {
    const years = Array.isArray(state.draft && state.draft.years) ? state.draft.years : [];
    for (let index = 0; index < years.length; index += 1) {
      if (years[index].year === state.selectedYear) return years[index];
    }
    return null;
  }

  function findDonorRecord(clientId) {
    const years = Array.isArray(state.draft && state.draft.years) ? state.draft.years : [];
    for (let yearIndex = 0; yearIndex < years.length; yearIndex += 1) {
      const donors = Array.isArray(years[yearIndex].donors) ? years[yearIndex].donors : [];
      for (let donorIndex = 0; donorIndex < donors.length; donorIndex += 1) {
        if (donors[donorIndex].client_id === clientId) {
          return { yearObj: years[yearIndex], donor: donors[donorIndex], donorIndex: donorIndex };
        }
      }
    }
    return null;
  }

  function updateDonorCategoryDetails(donor) {
    const typeItem = donationTypeByUuid(donor.uuid_type);
    donor.category_name = typeItem ? String(typeItem.name || '').trim() : '';
    donor.category_translation_key = typeItem ? String(typeItem.translation_key || '').trim() : '';
    donor.url_icon = typeItem ? String(typeItem.url_icon || '').trim() : '';
  }

  function hasUnsavedChanges() {
    return JSON.stringify(snapshotDraft(state.draft)) !== JSON.stringify(state.originalSnapshot);
  }

  function isEditMode() {
    return state.mode === 'edit' && state.canManage;
  }

  function renderCheckIcon() {
    return '<svg class="sk-check-icon mx-auto h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>';
  }

  function renderActionIcon(type) {
    if (type === 'trash') {
      return '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M15 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 7L7 19C7.07 19.79 7.73 20.4 8.52 20.4H15.48C16.27 20.4 16.93 19.79 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 4.8C9 4.36 9.36 4 9.8 4H14.2C14.64 4 15 4.36 15 4.8V7H9V4.8Z" stroke="currentColor" stroke-width="1.8"/></svg>';
    }
    if (type === 'up') {
      return '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 4a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707A1 1 0 1 1 5.293 8.293l4-4A1 1 0 0 1 10 4Z" clip-rule="evenodd"/></svg>';
    }
    if (type === 'down') {
      return '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 16a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L9 12.586V5a1 1 0 1 1 2 0v7.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 16Z" clip-rule="evenodd"/></svg>';
    }
    if (type === 'undo') {
      return '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.172 7H12a4 4 0 1 1 0 8H9a1 1 0 1 1 0-2h3a2 2 0 1 0 0-4H7.172l1.414 1.414A1 1 0 0 1 7.172 11L4.05 7.879a1 1 0 0 1 0-1.414l3.122-3.121a1 1 0 1 1 1.414 1.414L7.172 7Z"/></svg>';
    }
    if (type === 'redo') {
      return '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.828 7H8a4 4 0 1 0 0 8h3a1 1 0 1 0 0-2H8a2 2 0 1 1 0-4h4.828l-1.414 1.414A1 1 0 1 0 12.828 11l3.122-3.121a1 1 0 0 0 0-1.414l-3.122-3.121a1 1 0 0 0-1.414 1.414L12.828 7Z"/></svg>';
    }
    return '';
  }

  function renderBenefitTable() {
    const rows = [
      { label: t('benefit_email_ack'), support: [true, true, true, true] },
      { label: t('benefit_recognition_sessions'), support: [true, true, true, true] },
      { label: t('benefit_website_ack'), support: [true, true, true, false] },
      { label: t('benefit_website_logo'), support: [true, true, true, false] },
      { label: t('benefit_booth_logo'), support: [true, true, false, false] },
      { label: t('benefit_opening_remarks'), support: [true, true, false, false] },
      { label: t('benefit_networking'), support: [true, false, false, false] },
    ];
    const tiers = [
      { key: 'platinum_heading', className: 'sk-tier-platinum', index: 0 },
      { key: 'gold_heading', className: 'sk-tier-gold', index: 1 },
      { key: 'silver_heading', className: 'sk-tier-silver', index: 2 },
      { key: 'bronze_heading', className: 'sk-tier-bronze', index: 3 },
    ];

    return `
      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
        <div class="max-w-screen-md mb-8"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('sponsorship_benefits'))}</h2></div>
        <div class="w-full grid grid-cols-1 gap-4 md:hidden">
          ${tiers.map((tier) => `
            <div class="sk-card rounded-2xl p-5 sm:p-6">
              <div class="${tier.className} text-center text-lg font-bold leading-7">${renderMultilineText(t(tier.key))}</div>
              <ul class="mt-5 space-y-3 text-left">
                ${rows.filter((row) => row.support[tier.index]).map((row) => `<li class="flex items-start gap-3"><div class="pt-0.5 flex-shrink-0">${renderCheckIcon()}</div><span class="sk-body-text text-sm leading-6">${escapeHtml(row.label)}</span></li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <div class="hidden md:block w-full overflow-x-auto rounded-2xl sk-card">
          <table class="sk-table text-left min-w-[780px]">
            <thead>
              <tr>
                <th class="px-4 py-3 text-center font-semibold">${escapeHtml(t('benefits_header'))}</th>
                <th class="px-4 py-3 text-center font-semibold sk-tier-platinum">${renderMultilineText(t('platinum_heading'))}</th>
                <th class="px-4 py-3 text-center font-semibold sk-tier-gold">${renderMultilineText(t('gold_heading'))}</th>
                <th class="px-4 py-3 text-center font-semibold sk-tier-silver">${renderMultilineText(t('silver_heading'))}</th>
                <th class="px-4 py-3 text-center font-semibold sk-tier-bronze">${renderMultilineText(t('bronze_heading'))}</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr>
                  <td class="px-4 py-3 align-top leading-6">${escapeHtml(row.label)}</td>
                  ${row.support.map((active) => `<td class="px-4 py-3 text-center align-middle">${active ? renderCheckIcon() : ''}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderContactCards() {
    if (state.loading) {
      return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full animate-pulse">${Array.from({ length: 3 }).map(() => '<div class="sk-skeleton-block h-40 rounded-2xl"></div>').join('')}</div>`;
    }
    if (!Array.isArray(state.contacts) || state.contacts.length === 0) {
      return `<div class="w-full rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">${escapeHtml(t('contact_empty'))}</div>`;
    }

    const contactCount = state.contacts.length;
    const gridClass = contactCount >= 3
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'
      : (contactCount === 2
        ? 'grid grid-cols-1 md:grid-cols-2 gap-4 w-full'
        : 'grid grid-cols-1 gap-4 w-full');

    return `
      <div class="${gridClass}">
        ${state.contacts.map((item) => {
          const roleLabel = item.role_translation_key ? t(item.role_translation_key) : (item.role || '');
          return `
            <div class="sk-contact-card rounded-2xl p-5 sm:p-6 text-center">
              <p class="text-base font-semibold sk-page-title">${escapeHtml(roleLabel)}</p>
              <p class="mt-2 text-lg font-bold sk-page-title">${escapeHtml(item.name || '')}</p>
              ${item.affiliation ? `<p class="mt-1 text-sm sk-muted-text">${escapeHtml(item.affiliation)}</p>` : ''}
              ${item.email ? `<p class="mt-2 text-sm"><a class="sk-email-link" href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a></p>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function buildDonationGroups(rows) {
    const map = new Map();
    (Array.isArray(rows) ? rows : []).forEach((item) => {
      const yearValue = normalizeYearValue(item && item.year);
      if (yearValue == null) return;
      if (!map.has(yearValue)) map.set(yearValue, []);
      map.get(yearValue).push(item);
    });

    return Array.from(map.keys()).sort((a, b) => b - a).map((yearValue) => {
      const items = map.get(yearValue).slice();
      items.sort((a, b) => {
        const orderA = Number(a && a.sort_order ? a.sort_order : 0);
        const orderB = Number(b && b.sort_order ? b.sort_order : 0);
        if (orderA && orderB && orderA !== orderB) return orderA - orderB;
        const createdA = String(a && a.created_at ? a.created_at : '');
        const createdB = String(b && b.created_at ? b.created_at : '');
        if (createdA && createdB && createdA !== createdB) return createdA < createdB ? -1 : 1;
        return String(a && a.name ? a.name : '').localeCompare(String(b && b.name ? b.name : ''));
      });
      return { year: yearValue, items: items };
    });
  }

  function renderDonorIcon(urlIcon, fallbackText) {
    if (urlIcon) {
      return `<div class="sk-icon-preview"><img class="sk-donor-icon-img" src="${escapeHtml(urlIcon)}" alt="" /></div>`;
    }
    return `<div class="sk-icon-preview text-lg font-bold sk-page-title">${escapeHtml(fallbackText || '?')}</div>`;
  }

  function renderPublicDonationSection() {
    if (state.loading) {
      return `
        <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full space-y-8 animate-pulse">
          <div class="max-w-screen-md mb-2"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('generous_donations'))}</h2></div>
          <div class="flex flex-col w-full justify-center items-center space-y-4">
            <div class="sk-skeleton-line h-3 w-48"></div>
            <div class="grid grid-cols-1 w-full sm:grid-cols-2 gap-4 xl:grid-cols-4">
              ${Array.from({ length: 8 }).map(() => '<div class="sk-skeleton-block h-40 w-full rounded-2xl"></div>').join('')}
            </div>
          </div>
        </div>
      `;
    }

    const groups = buildDonationGroups(state.rows);
    if (state.loadError) {
      return `<div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full"><div class="w-full rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">${escapeHtml(t('load_failed'))}</div></div>`;
    }
    if (groups.length === 0) {
      return `<div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full"><div class="w-full rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">${escapeHtml(t('no_donations'))}</div></div>`;
    }

    return `
      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full space-y-8">
        <div class="max-w-screen-md mb-2"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('generous_donations'))}</h2></div>
        ${groups.map((group) => `
          <div class="w-full rounded-3xl sk-soft-panel p-5 sm:p-7">
            <div class="max-w-screen-md mx-auto text-center mb-6">
              <p class="sk-page-title mt-3 text-2xl italic font-semibold">${escapeHtml(group.year)}</p>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              ${group.items.map((item) => {
                const initial = item && item.name ? String(item.name).trim().charAt(0).toUpperCase() : '?';
                return `
                  <div class="sk-donor-card rounded-2xl p-4 sm:p-5 text-center h-full flex flex-col justify-start items-center">
                    ${renderDonorIcon(item.url_icon, initial)}
                    <h5 class="mt-3 mb-1 text-base sm:text-lg font-bold tracking-tight sk-page-title">${escapeHtml(item.name || '')}</h5>
                    ${item.affiliation ? `<p class="sk-muted-text text-xs sm:text-sm mb-1">${escapeHtml(item.affiliation)}</p>` : ''}
                    <p class="sk-body-text text-sm font-semibold mb-1">${escapeHtml(formatMoney(item.amount))}</p>
                    ${item.comment ? `<p class="sk-muted-text text-xs sm:text-sm mb-1">${escapeHtml(item.comment)}</p>` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderDonationTypeOptions(selectedUuid) {
    return state.donationTypes.map((item) => {
      const selected = String(item.uuid || '') === String(selectedUuid || '') ? ' selected' : '';
      return `<option value="${escapeHtml(item.uuid || '')}"${selected}>${escapeHtml(resolveDonationTypeLabel(item))}</option>`;
    }).join('');
  }

  function renderEditorOverviewCard() {
    const canUndo = state.historyIndex > 0;
    const canRedo = state.historyIndex >= 0 && state.historyIndex < (state.history.length - 1);
    const unsaved = hasUnsavedChanges();
    return `
      <div class="w-full sk-panel rounded-3xl p-5 sm:p-6">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div class="space-y-2 min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('generous_donations'))}</h2>
              <span id="sk-donations-editor-status" class="sk-status-badge ${unsaved ? 'is-unsaved' : ''}">${escapeHtml(unsaved ? t('unsaved_changes') : t('all_changes_saved'))}</span>
            </div>
            <p class="sk-muted-text text-sm leading-6">${escapeHtml(t('editor_help'))}</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button id="sk-donations-undo-btn" type="button" class="sk-toolbar-btn" data-action="undo" ${canUndo ? '' : 'disabled'}>${renderActionIcon('undo')}${escapeHtml(t('undo'))}</button>
            <button id="sk-donations-redo-btn" type="button" class="sk-toolbar-btn" data-action="redo" ${canRedo ? '' : 'disabled'}>${renderActionIcon('redo')}${escapeHtml(t('redo'))}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderYearManagerPanel() {
    const years = Array.isArray(state.draft && state.draft.years) ? state.draft.years : [];
    const selectedYear = getSelectedYearObject();

    return `
      <div class="sk-panel rounded-3xl p-5 sm:p-6 lg:sticky lg:top-24">
        <div class="space-y-4">
          <div>
            <label for="sk-add-year-input" class="block text-sm font-semibold sk-body-text mb-2">${escapeHtml(t('add_year'))}</label>
            <div class="flex gap-3">
              <input id="sk-add-year-input" type="number" class="sk-input text-sm" placeholder="${escapeHtml(t('placeholder_year'))}" />
              <button type="button" class="sk-button-primary whitespace-nowrap" data-action="add-year">${escapeHtml(t('add_year'))}</button>
            </div>
          </div>

          <div class="rounded-2xl sk-soft-panel p-4">
            <p class="text-sm font-semibold sk-page-title mb-3">${escapeHtml(t('manage_years'))}</p>
            ${years.length ? `
              <div class="flex flex-col gap-2">
                ${years.map((item) => `
                  <button type="button" class="sk-year-btn ${item.year === state.selectedYear ? 'is-active' : ''} justify-between" data-action="select-year" data-year="${escapeHtml(item.year)}">
                    <span>${escapeHtml(item.year)}</span>
                    <span class="text-xs sk-muted-text">${escapeHtml(item.donors.length)}</span>
                  </button>
                `).join('')}
              </div>
            ` : `<div class="rounded-2xl sk-empty-state px-4 py-4 text-sm leading-6">${escapeHtml(t('no_years'))}</div>`}
          </div>

          ${selectedYear ? `
            <div class="rounded-2xl sk-soft-panel p-4 space-y-4">
              <p class="text-sm font-semibold sk-page-title">${escapeHtml(t('selected_year'))}</p>
              <input id="sk-selected-year-input" type="number" class="sk-input text-sm" value="${escapeHtml(selectedYear.year)}" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" class="sk-button-secondary" data-action="update-year">${escapeHtml(t('update_year'))}</button>
                <button type="button" class="sk-button-danger" data-action="delete-year">${escapeHtml(t('delete_year'))}</button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function renderDonorEditorRow(donor, index, total) {
    const typeItem = donationTypeByUuid(donor.uuid_type);
    const previewText = donor.name ? donor.name.charAt(0).toUpperCase() : String(index + 1);
    const categoryLabel = donor.category_translation_key ? t(donor.category_translation_key) : (donor.category_name || resolveDonationTypeLabel(typeItem) || '');
    return `
      <div class="sk-editor-item rounded-3xl p-5 sm:p-6 space-y-5" data-donor-id="${escapeHtml(donor.client_id)}">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-4 min-w-0">
            ${renderDonorIcon(donor.url_icon, previewText)}
            <div class="min-w-0">
              <h4 class="sk-page-title text-lg font-bold">${escapeHtml(donor.name || (t('form_name') + ' #' + (index + 1)))}</h4>
              <p class="sk-muted-text text-sm">${escapeHtml(t('donor_order'))}: ${index + 1}</p>
              ${categoryLabel ? `<p class="sk-muted-text text-sm mt-1">${escapeHtml(categoryLabel)}</p>` : ''}
            </div>
          </div>
          <div class="flex items-center gap-2 sm:justify-end">
            <button type="button" class="sk-small-btn" data-action="move-donor-up" data-donor-id="${escapeHtml(donor.client_id)}" ${index === 0 ? 'disabled' : ''}>${renderActionIcon('up')}</button>
            <button type="button" class="sk-small-btn" data-action="move-donor-down" data-donor-id="${escapeHtml(donor.client_id)}" ${index >= total - 1 ? 'disabled' : ''}>${renderActionIcon('down')}</button>
            <button type="button" class="sk-button-danger" data-action="delete-donor" data-donor-id="${escapeHtml(donor.client_id)}" title="${escapeHtml(t('confirm_delete_donor'))}">${renderActionIcon('trash')}</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold sk-body-text mb-2">${escapeHtml(t('form_amount'))}</label>
            <input type="number" class="sk-input text-sm" data-donor-field="amount" data-donor-id="${escapeHtml(donor.client_id)}" value="${escapeHtml(donor.amount)}" placeholder="${escapeHtml(t('placeholder_amount'))}" />
          </div>
          <div>
            <label class="block text-sm font-semibold sk-body-text mb-2">${escapeHtml(t('form_category'))}</label>
            <select class="sk-select text-sm" data-donor-field="uuid_type" data-donor-id="${escapeHtml(donor.client_id)}">
              <option value="">${escapeHtml(t('form_category'))}</option>
              ${renderDonationTypeOptions(donor.uuid_type)}
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold sk-body-text mb-2">${escapeHtml(t('form_name'))}</label>
            <input type="text" class="sk-input text-sm" data-donor-field="name" data-donor-id="${escapeHtml(donor.client_id)}" value="${escapeHtml(donor.name)}" placeholder="${escapeHtml(t('placeholder_name'))}" />
          </div>
          <div>
            <label class="block text-sm font-semibold sk-body-text mb-2">${escapeHtml(t('form_affiliation'))}</label>
            <input type="text" class="sk-input text-sm" data-donor-field="affiliation" data-donor-id="${escapeHtml(donor.client_id)}" value="${escapeHtml(donor.affiliation)}" placeholder="${escapeHtml(t('placeholder_affiliation'))}" />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold sk-body-text mb-2">${escapeHtml(t('form_comment'))}</label>
            <textarea class="sk-textarea text-sm" data-donor-field="comment" data-donor-id="${escapeHtml(donor.client_id)}" placeholder="${escapeHtml(t('placeholder_comment'))}">${escapeHtml(donor.comment)}</textarea>
          </div>
        </div>
      </div>
    `;
  }

  function renderEditorSection() {
    if (state.loading) {
      return `
        <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full space-y-8 animate-pulse">
          <div class="w-full sk-skeleton-block h-32 rounded-3xl"></div>
          <div class="w-full grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-6">
            <div class="sk-skeleton-block h-[420px] rounded-3xl"></div>
            <div class="sk-skeleton-block h-[540px] rounded-3xl"></div>
          </div>
        </div>
      `;
    }
    if (state.loadError) {
      return `<div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full"><div class="w-full rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">${escapeHtml(t('load_editor_failed'))}</div></div>`;
    }

    const selectedYear = getSelectedYearObject();
    const donors = selectedYear && Array.isArray(selectedYear.donors) ? selectedYear.donors : [];

    return `
      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full space-y-6">
        ${renderEditorOverviewCard()}
        <div class="sk-editor-grid w-full">
          ${renderYearManagerPanel()}
          <div class="sk-panel rounded-3xl p-5 sm:p-6">
            ${selectedYear ? `
              <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 class="sk-page-title text-xl font-bold">${escapeHtml(selectedYear.year)}</h3>
                  <p class="sk-muted-text text-sm mt-1">${escapeHtml(t('donor_order'))}</p>
                </div>
                <button type="button" class="sk-button-primary" data-action="add-donor">${escapeHtml(t('add_donor_record'))}</button>
              </div>
              ${donors.length ? `<div class="space-y-5">${donors.map((donor, index) => renderDonorEditorRow(donor, index, donors.length)).join('')}</div>` : `<div class="rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">${escapeHtml(t('no_donors_in_year'))}</div><div class="mt-5"><button type="button" class="sk-button-primary" data-action="add-donor">${escapeHtml(t('add_donor_record'))}</button></div>`}
            ` : `
              <div class="rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">${escapeHtml(t('select_year'))}</div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderMain() {
    const direction = isRTL() ? 'rtl' : 'ltr';
    const editMode = isEditMode();
    const donationSectionHtml = editMode ? renderEditorSection() : renderPublicDonationSection();

    const headerHtml = editMode
      ? `
        <div class="mx-auto max-w-screen-lg text-center">
          <h2 class="sk-page-title mb-2 text-3xl sm:text-4xl tracking-tight font-extrabold">${escapeHtml(t('title'))}</h2>
        </div>
      `
      : `
        <div class="mx-auto max-w-screen-lg text-center">
          <h2 class="sk-page-title mb-2 text-3xl sm:text-4xl tracking-tight font-extrabold">${escapeHtml(t('title'))}</h2>
          <p class="sk-body-text mb-6 sm:mb-8 text-base lg:text-lg leading-8">${escapeHtml(t('subtitle'))}</p>
        </div>
      `;

    const publicInfoHtml = editMode ? '' : `
      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
        <div class="max-w-screen-md mb-8"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('sponsorship_info'))}</h2></div>
        <div class="w-full rounded-3xl sk-soft-panel px-5 py-5 sm:px-7 sm:py-6"><p class="sk-body-text leading-8">${escapeHtml(t('sponsorship_info_body'))}</p></div>
      </div>

      ${renderBenefitTable()}

      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
        <div class="max-w-screen-md mb-8"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('how_to_sponsor'))}</h2></div>
        <div class="w-full rounded-3xl sk-soft-panel px-5 py-5 sm:px-7 sm:py-6"><p class="sk-body-text leading-8">${escapeHtml(t('how_to_sponsor_body'))}</p></div>
      </div>

      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
        <div class="max-w-screen-md mb-8"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('how_to_donate'))}</h2></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 items-start gap-6 w-full">
          <div class="sk-card rounded-3xl p-5 sm:p-7 flex flex-col w-full space-y-4">
            <h3 class="sk-sub-title text-base sm:text-lg font-semibold leading-7">${escapeHtml(t('paypal_intro'))}</h3>
            <div class="flex w-full justify-center items-baseline my-4">
              <form class="sk-paypal-form" action="https://www.paypal.com/donate" method="post" target="_top">
                <input name="hosted_button_id" type="hidden" value="WSLH4UUGTM8ZL" />
                <input alt="Donate with PayPal button" border="0" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" title="PayPal - The safer, easier way to pay online!" type="image" />
                <img alt="" border="0" height="1" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" />
              </form>
            </div>
          </div>
          <div class="sk-card rounded-3xl p-5 sm:p-7 flex flex-col w-full">
            <h3 class="sk-sub-title text-base sm:text-lg font-semibold leading-7">${escapeHtml(t('check_intro'))}</h3>
            <ul class="mt-6 sm:mt-8 space-y-4 text-left">
              <li class="flex items-start gap-3"><div class="pt-0.5">${renderCheckIcon()}</div><span class="sk-body-text leading-7">${escapeHtml(t('step1'))}</span></li>
              <li class="flex items-start gap-3"><div class="pt-0.5">${renderCheckIcon()}</div><span class="sk-body-text leading-7">${escapeHtml(t('step2'))}</span></li>
              <li class="flex items-start gap-3"><div class="pt-0.5">${renderCheckIcon()}</div><span class="sk-body-text leading-7">${escapeHtml(t('step3'))}</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
        <div class="max-w-screen-md mb-8"><h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(t('contact_heading'))}</h2></div>
        ${renderContactCards()}
      </div>
    `;

    return `
      <div class="sk-donations-root ${state.isDark ? 'sk-mode-dark' : 'sk-mode-light'} py-6 px-4 mx-auto max-w-screen-xl sm:py-12 lg:px-6" dir="${direction}">
        ${headerHtml}
        ${publicInfoHtml}
        ${donationSectionHtml}
      </div>
    `;
  }

  function renderApp() {
    const mountNode = document.getElementById('div_main');
    if (!mountNode) return;
    mountNode.innerHTML = renderMain();
    refreshEditorChrome();
    bindFloatingButtons();
  }

  function refreshEditorChrome() {
    if (!isEditMode()) {
      updateDoneButton();
      return;
    }
    const unsaved = hasUnsavedChanges();
    const statusNode = document.getElementById('sk-donations-editor-status');
    if (statusNode) {
      statusNode.textContent = unsaved ? t('unsaved_changes') : t('all_changes_saved');
      if (unsaved) statusNode.classList.add('is-unsaved');
      else statusNode.classList.remove('is-unsaved');
    }
    const undoBtn = document.getElementById('sk-donations-undo-btn');
    if (undoBtn) undoBtn.disabled = !(state.historyIndex > 0);
    const redoBtn = document.getElementById('sk-donations-redo-btn');
    if (redoBtn) redoBtn.disabled = !(state.historyIndex >= 0 && state.historyIndex < (state.history.length - 1));
    updateDoneButton();
  }

  function updateDoneButton() {
    const doneBtn = document.getElementById('statkiss-donations-done-btn');
    if (!doneBtn) return;
    doneBtn.disabled = state.saving;
    doneBtn.textContent = state.saving ? t('saving') : t('done');
  }

  function syncLanguageAndTheme(forceRender) {
    const nextLang = resolveCurrentLang();
    const nextDark = isDarkModeEnabled();
    const langChanged = nextLang !== state.lang;
    const themeChanged = nextDark !== state.isDark;

    if (langChanged) {
      state.lang = nextLang;
      const donationsI18n = getDonationsI18n();
      if (donationsI18n && typeof donationsI18n.applyDocumentLanguage === 'function') {
        donationsI18n.applyDocumentLanguage(state.lang);
      }
    }
    if (themeChanged) state.isDark = nextDark;
    if (forceRender || langChanged || themeChanged) {
      renderApp();
    }
  }

  function handleAddYear() {
    const input = document.getElementById('sk-add-year-input');
    const yearValue = normalizeYearValue(input ? input.value : '');
    if (yearValue == null) {
      alert(t('enter_valid_year'));
      return;
    }
    if (state.draft.years.some((item) => item.year === yearValue)) {
      alert(t('duplicate_year'));
      return;
    }
    state.draft.years.push({ year: yearValue, donors: [] });
    state.selectedYear = yearValue;
    applySnapshot(state.draft, true);
    pushHistoryFromDraft();
    renderApp();
  }

  function handleUpdateYear() {
    const selectedYear = getSelectedYearObject();
    if (!selectedYear) return;
    const input = document.getElementById('sk-selected-year-input');
    const nextYear = normalizeYearValue(input ? input.value : '');
    if (nextYear == null) {
      alert(t('enter_valid_year'));
      return;
    }
    if (nextYear !== selectedYear.year && state.draft.years.some((item) => item.year === nextYear)) {
      alert(t('duplicate_year'));
      return;
    }
    selectedYear.year = nextYear;
    selectedYear.donors.forEach((donor) => { donor.year = nextYear; });
    state.selectedYear = nextYear;
    applySnapshot(state.draft, true);
    pushHistoryFromDraft();
    renderApp();
  }

  function handleDeleteYear() {
    const selectedYear = getSelectedYearObject();
    if (!selectedYear) return;
    if (!window.confirm(t('confirm_delete_year'))) return;
    state.draft.years = state.draft.years.filter((item) => item.year !== selectedYear.year);
    applySnapshot(state.draft, false);
    pushHistoryFromDraft();
    renderApp();
  }

  function handleAddDonor() {
    const selectedYear = getSelectedYearObject();
    if (!selectedYear) {
      alert(t('select_year'));
      return;
    }
    const defaultType = state.donationTypes.length ? state.donationTypes[0] : null;
    selectedYear.donors.push(normalizeDonorRecord({
      uuid: '',
      amount: '',
      uuid_type: defaultType ? defaultType.uuid : '',
      category_name: defaultType ? defaultType.name : '',
      category_translation_key: defaultType ? defaultType.translation_key : '',
      url_icon: defaultType ? defaultType.url_icon : '',
      name: '',
      affiliation: '',
      comment: '',
    }, selectedYear.year, selectedYear.donors.length));
    applySnapshot(state.draft, true);
    pushHistoryFromDraft();
    renderApp();
  }

  function handleDeleteDonor(clientId) {
    const donorInfo = findDonorRecord(clientId);
    if (!donorInfo) return;
    if (!window.confirm(t('confirm_delete_donor'))) return;
    donorInfo.yearObj.donors.splice(donorInfo.donorIndex, 1);
    applySnapshot(state.draft, true);
    pushHistoryFromDraft();
    renderApp();
  }

  function handleMoveDonor(clientId, direction) {
    const donorInfo = findDonorRecord(clientId);
    if (!donorInfo) return;
    const donors = donorInfo.yearObj.donors;
    const currentIndex = donorInfo.donorIndex;
    const nextIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex >= donors.length) return;
    const temp = donors[currentIndex];
    donors[currentIndex] = donors[nextIndex];
    donors[nextIndex] = temp;
    donors.forEach((item, index) => { item.sort_order = index + 1; });
    applySnapshot(state.draft, true);
    pushHistoryFromDraft();
    renderApp();
  }

  function handleUndo() {
    if (!(state.historyIndex > 0)) return;
    state.historyIndex -= 1;
    applySnapshot(state.history[state.historyIndex], true);
    renderApp();
  }

  function handleRedo() {
    if (!(state.historyIndex >= 0 && state.historyIndex < state.history.length - 1)) return;
    state.historyIndex += 1;
    applySnapshot(state.history[state.historyIndex], true);
    renderApp();
  }

  function updateDonorField(clientId, fieldName, fieldValue, rerender) {
    const donorInfo = findDonorRecord(clientId);
    if (!donorInfo || !donorInfo.donor) return;
    donorInfo.donor[fieldName] = fieldValue;
    if (fieldName === 'uuid_type') {
      updateDonorCategoryDetails(donorInfo.donor);
    }
    pushHistoryFromDraft();
    if (rerender) renderApp();
    else refreshEditorChrome();
  }

  function validateRowsForSave(rows) {
    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index];
      if (!normalizeYearValue(row.year)) return t('enter_valid_year');
      if (String(row.amount || '').trim() === '') return t('enter_amount');
      if (String(row.name || '').trim() === '') return t('enter_name');
      if (String(row.uuid_type || '').trim() === '') return t('enter_donor_category');
    }
    return '';
  }

  function flattenDraftRowsForSave() {
    const snapshot = snapshotDraft(state.draft);
    const rows = [];
    snapshot.years.forEach((yearObj) => {
      yearObj.donors.forEach((donor, donorIndex) => {
        rows.push({
          uuid: donor.uuid || '',
          year: yearObj.year,
          amount: donor.amount,
          uuid_type: donor.uuid_type,
          name: donor.name,
          affiliation: donor.affiliation,
          comment: donor.comment,
          sort_order: donorIndex + 1,
        });
      });
    });
    return rows;
  }

  async function handleSave() {
    if (!isEditMode() || state.saving) return;
    const rows = flattenDraftRowsForSave();
    const validationMessage = validateRowsForSave(rows);
    if (validationMessage) {
      alert(validationMessage);
      return;
    }

    state.saving = true;
    updateDoneButton();
    try {
      await fetchJson(state.config.api_save_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({ rows: rows }),
      });
      state.originalSnapshot = snapshotDraft(state.draft);
      state.allowNavigation = true;
      window.location.href = state.config.donations_public_path;
    } catch (error) {
      alert(t('save_failed'));
      state.saving = false;
      updateDoneButton();
    }
  }

  function handleCancel(event) {
    if (!isEditMode()) return;
    if (!state.allowNavigation && hasUnsavedChanges()) {
      const shouldLeave = window.confirm(t('confirm_leave_unsaved'));
      if (!shouldLeave) {
        if (event) event.preventDefault();
        return;
      }
    }
    state.allowNavigation = true;
    if (event && event.currentTarget && event.currentTarget.getAttribute('href')) {
      return;
    }
    window.location.href = state.config.donations_public_path;
  }

  function bindFloatingButtons() {
    const doneBtn = document.getElementById('statkiss-donations-done-btn');
    if (doneBtn && !doneBtn.dataset.bound) {
      doneBtn.dataset.bound = '1';
      doneBtn.addEventListener('click', function(event) {
        event.preventDefault();
        handleSave();
      });
    }
    const cancelBtn = document.getElementById('statkiss-donations-cancel-btn');
    if (cancelBtn && !cancelBtn.dataset.bound) {
      cancelBtn.dataset.bound = '1';
      cancelBtn.addEventListener('click', function(event) {
        handleCancel(event);
      });
    }
    updateDoneButton();
  }

  function handleRootClick(event) {
    const actionNode = event.target && event.target.closest ? event.target.closest('[data-action]') : null;
    if (!actionNode) return;
    const action = actionNode.getAttribute('data-action');
    if (!action) return;

    if (action === 'add-year') {
      handleAddYear();
      return;
    }
    if (action === 'select-year') {
      const yearValue = normalizeYearValue(actionNode.getAttribute('data-year'));
      if (yearValue != null) {
        state.selectedYear = yearValue;
        renderApp();
      }
      return;
    }
    if (action === 'update-year') {
      handleUpdateYear();
      return;
    }
    if (action === 'delete-year') {
      handleDeleteYear();
      return;
    }
    if (action === 'add-donor') {
      handleAddDonor();
      return;
    }
    if (action === 'delete-donor') {
      handleDeleteDonor(actionNode.getAttribute('data-donor-id'));
      return;
    }
    if (action === 'move-donor-up') {
      handleMoveDonor(actionNode.getAttribute('data-donor-id'), 'up');
      return;
    }
    if (action === 'move-donor-down') {
      handleMoveDonor(actionNode.getAttribute('data-donor-id'), 'down');
      return;
    }
    if (action === 'undo') {
      handleUndo();
      return;
    }
    if (action === 'redo') {
      handleRedo();
    }
  }

  function handleRootInput(event) {
    const target = event.target;
    if (!target || !target.getAttribute) return;
    const fieldName = target.getAttribute('data-donor-field');
    const donorId = target.getAttribute('data-donor-id');
    if (!fieldName || !donorId) return;
    updateDonorField(donorId, fieldName, target.value, false);
  }

  function handleRootChange(event) {
    const target = event.target;
    if (!target || !target.getAttribute) return;
    const fieldName = target.getAttribute('data-donor-field');
    const donorId = target.getAttribute('data-donor-id');
    if (!fieldName || !donorId) return;
    if (fieldName === 'uuid_type') {
      updateDonorField(donorId, fieldName, target.value, true);
    }
  }

  function bindRootHandlers() {
    if (donationsMountHandlersBound) return;
    const mountNode = document.getElementById('div_main');
    if (!mountNode) return;
    donationsMountHandlersBound = true;
    mountNode.addEventListener('click', handleRootClick);
    mountNode.addEventListener('input', handleRootInput);
    mountNode.addEventListener('change', handleRootChange);
  }

  function handleBeforeUnload(event) {
    if (!isEditMode() || state.allowNavigation || !hasUnsavedChanges()) return undefined;
    event.preventDefault();
    event.returnValue = '';
    return '';
  }

  function handleEditorHotkeys(event) {
    if (!isEditMode()) return;
    if (event.defaultPrevented || event.altKey) return;
    const key = String(event.key || '').toLowerCase();
    const metaOrCtrl = event.metaKey || event.ctrlKey;
    if (!metaOrCtrl) return;

    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      handleUndo();
      return;
    }
    if (key === 'y' || (key === 'z' && event.shiftKey)) {
      event.preventDefault();
      handleRedo();
    }
  }

  function setupObservers() {
    if (typeof window.__statkissDonationsCleanup === 'function') {
      window.__statkissDonationsCleanup();
    }

    const onStorage = function() {
      syncLanguageAndTheme(false);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleEditorHotkeys);

    let mediaQuery = null;
    let onMedia = null;
    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      onMedia = function() {
        syncLanguageAndTheme(false);
      };
      if (typeof mediaQuery.addEventListener === 'function') mediaQuery.addEventListener('change', onMedia);
      else if (typeof mediaQuery.addListener === 'function') mediaQuery.addListener(onMedia);
    }

    const observer = new MutationObserver(function() {
      syncLanguageAndTheme(false);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'lang', 'dir', 'data-theme', 'data-mode', 'data-color-mode']
    });
    if (document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode', 'data-color-mode']
      });
    }

    window.__statkissDonationsCleanup = function cleanupDonationsPage() {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleEditorHotkeys);
      if (mediaQuery && onMedia) {
        if (typeof mediaQuery.removeEventListener === 'function') mediaQuery.removeEventListener('change', onMedia);
        else if (typeof mediaQuery.removeListener === 'function') mediaQuery.removeListener(onMedia);
      }
      donationsCleanupRegistered = false;
    };
    donationsCleanupRegistered = true;
  }

  async function loadPagePayload() {
    state.loading = true;
    state.loadError = false;
    state.payloadError = '';
    renderApp();

    try {
      const payload = await fetchJson(state.config.api_page_payload_url);
      state.rows = Array.isArray(payload.rows) ? payload.rows : [];
      state.donationTypes = Array.isArray(payload.donation_types) ? payload.donation_types : [];
      state.contacts = Array.isArray(payload.contacts) ? payload.contacts : [];
      state.canManage = Boolean(state.config.can_manage_donations || payload.can_manage_donations);
      initializeHistoryFromRows(state.rows);
      state.loadError = false;
    } catch (error) {
      state.rows = [];
      state.donationTypes = [];
      state.contacts = [];
      state.loadError = true;
      state.payloadError = String(error && error.message ? error.message : '');
      initializeHistoryFromRows([]);
    } finally {
      state.loading = false;
      renderApp();
    }
  }

  window.set_main = function set_main() {
    ensureDonationStyles();
    bindRootHandlers();
    if (!donationsCleanupRegistered) {
      setupObservers();
    }

    const donationsI18n = getDonationsI18n();
    state.lang = resolveCurrentLang();
    state.isDark = isDarkModeEnabled();
    if (donationsI18n && typeof donationsI18n.applyDocumentLanguage === 'function') {
      donationsI18n.applyDocumentLanguage(state.lang);
    }
    state.config = buildConfig(parseConfig());
    state.mode = state.config.mode;
    state.canManage = Boolean(state.config.can_manage_donations);
    state.allowNavigation = false;
    renderApp();
    loadPagePayload();
  };
})();
