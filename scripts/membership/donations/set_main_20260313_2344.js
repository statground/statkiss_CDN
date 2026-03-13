(function(){
  'use strict';

  const DONATIONS_STYLE_ID = 'statkiss-donations-styles';

  function ensureDonationStyles() {
    if (document.getElementById(DONATIONS_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = DONATIONS_STYLE_ID;
    style.textContent = `
      .sk-donations-root {
        --sk-bg: #ffffff;
        --sk-surface: #ffffff;
        --sk-surface-soft: #f8fafc;
        --sk-surface-strong: #eff6ff;
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
        --sk-skeleton: #e5e7eb;
        --sk-shadow: rgba(15, 23, 42, 0.06);
        --sk-platinum: #6d28d9;
        --sk-gold: #b45309;
        --sk-silver: #374151;
        --sk-bronze: #92400e;
      }
      .sk-donations-root.sk-mode-dark {
        --sk-bg: #0b1120;
        --sk-surface: #111827;
        --sk-surface-soft: #0f172a;
        --sk-surface-strong: #0b1f3a;
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
        --sk-skeleton: #334155;
        --sk-shadow: rgba(2, 8, 23, 0.35);
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
      .sk-card {
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
        overflow: hidden;
        border-radius: 1rem;
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
      .sk-select {
        width: 100%;
        border-radius: 0.75rem;
        border: 1px solid var(--sk-border-strong);
        background: var(--sk-surface);
        color: var(--sk-text);
        padding: 0.625rem 0.875rem;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .sk-input::placeholder { color: var(--sk-text-muted); }
      .sk-input:focus,
      .sk-select:focus {
        border-color: var(--sk-accent);
        box-shadow: 0 0 0 4px var(--sk-accent-ring);
      }
      .sk-button-primary {
        border: 0;
        border-radius: 0.75rem;
        background: var(--sk-accent);
        color: #ffffff;
        padding: 0.625rem 1.125rem;
        font-weight: 600;
        transition: background 0.15s ease, transform 0.15s ease;
      }
      .sk-button-primary:hover { background: var(--sk-accent-hover); }
      .sk-button-primary:disabled {
        cursor: not-allowed;
        opacity: 0.9;
      }
      .sk-delete-btn {
        border-radius: 9999px;
        padding: 0.375rem;
        transition: background 0.15s ease;
      }
      .sk-delete-btn:hover { background: var(--sk-danger-soft); }
      .sk-email-link {
        color: var(--sk-accent);
        word-break: break-word;
      }
      .sk-skeleton-line,
      .sk-skeleton-block {
        background: var(--sk-skeleton);
        border-radius: 0.75rem;
      }
      .sk-empty-state {
        border: 1px dashed var(--sk-border-strong);
        background: var(--sk-surface-soft);
        color: var(--sk-text-muted);
      }
      .sk-paypal-form input[type='image'] {
        max-width: 100%;
        height: auto;
      }
      .sk-benefit-mobile-list li:last-child {
        margin-bottom: 0;
      }
      .sk-donor-card h5,
      .sk-donor-card p {
        word-break: break-word;
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
    const root = document.documentElement;
    const body = document.body;
    const storageKeys = ['statkiss_theme', 'theme', 'color-theme', 'colorTheme'];

    for (const key of storageKeys) {
      try {
        const value = (localStorage.getItem(key) || '').toLowerCase();
        if (value === 'dark') return true;
        if (value === 'light') return false;
        if ((value === 'system' || value === 'auto') && window.matchMedia) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
      } catch (error) {
        // ignore storage errors
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

  function formatMoney(amount, lang) {
    const numeric = Number(amount);
    if (!Number.isFinite(numeric)) return amount;
    try {
      return '$' + new Intl.NumberFormat(lang || 'en').format(numeric);
    } catch (error) {
      return '$' + numeric.toLocaleString('en-US');
    }
  }

  function renderMultilineText(text) {
    return String(text || '').split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {index > 0 ? <br /> : null}
        {line}
      </React.Fragment>
    ));
  }

  function buildDonationGroups(rawData) {
    const rows = Array.isArray(rawData) ? rawData : Object.values(rawData || {});
    const grouped = {};
    rows.forEach((item) => {
      const year = item && item.year != null ? String(item.year) : 'Unknown';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(item);
    });
    return Object.keys(grouped)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({ year, items: grouped[year] }));
  }

  function getCsrfToken() {
    return typeof window.getCookie === 'function' ? window.getCookie('csrftoken') : '';
  }

  function normalizePath(path) {
    const value = String(path || '/').trim();
    if (!value) return '/';
    const withLeadingSlash = value.charAt(0) === '/' ? value : '/' + value;
    const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');
    return collapsed.endsWith('/') ? collapsed : collapsed + '/';
  }

  function stripLeadingSlash(path) {
    return String(path || '').replace(/^\/+/, '');
  }

  function buildPath(basePath, path) {
    return normalizePath(basePath) + stripLeadingSlash(path);
  }

  function legacyMembershipUrl(path) {
    return buildPath('/membership/', path);
  }

  function legacySiteUrl(path) {
    return buildPath('/', path);
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

  function resolveSiteBasePath() {
    return normalizePath(resolveMembershipBasePath().replace(/membership\/$/, ''));
  }

  function buildMembershipUrl(path) {
    return buildPath(resolveMembershipBasePath(), path);
  }

  function buildSiteUrl(path) {
    return buildPath(resolveSiteBasePath(), path);
  }

  function uniqueUrls(urls) {
    const seen = {};
    return (Array.isArray(urls) ? urls : [urls]).filter((url) => {
      const key = String(url || '');
      if (!key || seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  async function fetchJsonWithFallback(urlCandidates, init) {
    const urls = uniqueUrls(urlCandidates);
    let lastError = null;

    for (const url of urls) {
      try {
        const response = await fetch(url, init);
        const contentType = (response.headers.get('content-type') || '').toLowerCase();

        if (!response.ok) {
          throw new Error('HTTP ' + response.status + ' from ' + url);
        }

        if (contentType.indexOf('application/json') === -1) {
          throw new Error('Expected JSON but received ' + (contentType || 'unknown') + ' from ' + url);
        }

        return await response.json();
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('AJAX request failed');
  }

  window.set_main = function set_main() {
    ensureDonationStyles();

    if (typeof window.__statkissDonationsCleanup === 'function') {
      window.__statkissDonationsCleanup();
    }

    const state = {
      lang: resolveCurrentLang(),
      isDark: isDarkModeEnabled(),
      loadingDonations: true,
      loadError: false,
      donationsGrouped: [],
      canManage: false,
      isSubmitting: false,
    };

    const donationsI18n = getDonationsI18n();
    if (donationsI18n && typeof donationsI18n.applyDocumentLanguage === 'function') {
      donationsI18n.applyDocumentLanguage(state.lang);
    }

    function t(key, params) {
      if (donationsI18n && typeof donationsI18n.t === 'function') {
        return donationsI18n.t(state.lang, key, params);
      }
      return key;
    }

    function isRTL() {
      return Boolean(donationsI18n && typeof donationsI18n.isRTL === 'function' && donationsI18n.isRTL(state.lang));
    }

    function renderApp() {
      const mountNode = document.getElementById('div_main');
      if (!mountNode) return;
      ReactDOM.render(<DivMain />, mountNode);
    }

    function syncLanguageAndTheme(forceRender) {
      const nextLang = resolveCurrentLang();
      const nextDark = isDarkModeEnabled();
      const langChanged = nextLang !== state.lang;
      const themeChanged = nextDark !== state.isDark;

      if (langChanged) {
        state.lang = nextLang;
        if (donationsI18n && typeof donationsI18n.applyDocumentLanguage === 'function') {
          donationsI18n.applyDocumentLanguage(state.lang);
        }
      }
      if (themeChanged) {
        state.isDark = nextDark;
      }
      if (forceRender || langChanged || themeChanged) {
        renderApp();
      }
    }

    function CheckSvg() {
      return (
        <svg class="sk-check-icon mx-auto h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
      );
    }

    function TrashSvg() {
      return (
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M9 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M15 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M6 7L7 19C7.07 19.79 7.73 20.4 8.52 20.4H15.48C16.27 20.4 16.93 19.79 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M9 4.8C9 4.36 9.36 4 9.8 4H14.2C14.64 4 15 4.36 15 4.8V7H9V4.8Z" stroke="currentColor" stroke-width="1.8"/>
        </svg>
      );
    }

    function DivSubHeader(props) {
      return (
        <h2 class="sk-section-title text-lg sm:text-xl font-extrabold tracking-tight">
          {props.text}
        </h2>
      );
    }

    function DivSubDonationHeader(props) {
      return (
        <h3 class="sk-sub-title text-base sm:text-lg font-semibold leading-7">
          {props.text}
        </h3>
      );
    }

    function DivStepItem(props) {
      return (
        <li class="flex items-start gap-3">
          <div class="pt-0.5"><CheckSvg /></div>
          <span class="sk-body-text leading-7">{props.text}</span>
        </li>
      );
    }

    function DivBenefitTable() {
      const rows = [
        { label: t('benefit_email_ack'), support: [true, true, true, true] },
        { label: t('benefit_recognition_sessions'), support: [true, true, true, true] },
        { label: t('benefit_website_ack'), support: [true, true, true, false] },
        { label: t('benefit_website_logo'), support: [true, true, true, false] },
        { label: t('benefit_booth_logo'), support: [true, true, false, false] },
        { label: t('benefit_opening_remarks'), support: [true, true, false, false] },
        { label: t('benefit_networking'), support: [true, false, false, false] },
      ];

      return (
        <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
          <div class="max-w-screen-md mb-8">
            <DivSubHeader text={t('sponsorship_benefits')} />
          </div>

          <div class="w-full grid grid-cols-1 gap-4 md:hidden">
            {[
              { headingKey: 'platinum_heading', className: 'sk-tier-platinum', index: 0 },
              { headingKey: 'gold_heading', className: 'sk-tier-gold', index: 1 },
              { headingKey: 'silver_heading', className: 'sk-tier-silver', index: 2 },
              { headingKey: 'bronze_heading', className: 'sk-tier-bronze', index: 3 },
            ].map((tier) => (
              <div key={tier.headingKey} class="sk-card rounded-2xl p-5 sm:p-6">
                <div class={tier.className + ' text-center text-lg font-bold leading-7'}>
                  {renderMultilineText(t(tier.headingKey))}
                </div>
                <ul role="list" class="sk-benefit-mobile-list mt-5 space-y-3 text-left">
                  {rows.filter((row) => row.support[tier.index]).map((row) => (
                    <li key={row.label} class="flex items-start gap-3">
                      <div class="pt-0.5 flex-shrink-0"><CheckSvg /></div>
                      <span class="sk-body-text text-sm leading-6">{row.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div class="hidden md:block w-full overflow-x-auto rounded-2xl sk-card">
            <table class="sk-table text-left min-w-[780px]">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-center font-semibold">{t('benefits_header')}</th>
                  <th class="px-4 py-3 text-center font-semibold sk-tier-platinum">{renderMultilineText(t('platinum_heading'))}</th>
                  <th class="px-4 py-3 text-center font-semibold sk-tier-gold">{renderMultilineText(t('gold_heading'))}</th>
                  <th class="px-4 py-3 text-center font-semibold sk-tier-silver">{renderMultilineText(t('silver_heading'))}</th>
                  <th class="px-4 py-3 text-center font-semibold sk-tier-bronze">{renderMultilineText(t('bronze_heading'))}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td class="px-4 py-3 align-top leading-6">{row.label}</td>
                    {row.support.map((active, index) => (
                      <td key={index} class="px-4 py-3 text-center align-middle">
                        {active ? <CheckSvg /> : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    function DivAddDonorForm() {
      const categoryOptions = [
        { value: '9d918d2d-b85e-4e0c-813f-0383b2e7b24f', key: 'category.personal' },
        { value: 'ab713c0f-bbb7-46c0-bda4-ae314d634fc9', key: 'category.academic_society' },
        { value: '90cc2fe2-bbed-4531-85da-3f34a884f7dd', key: 'category.government_institutions' },
        { value: 'd44c8e2c-d168-4bec-9fc5-e94142863d9a', key: 'category.ngo' },
        { value: 'b71e2fdc-1b83-492b-b288-7278833df576', key: 'category.financial_institutions' },
        { value: '9708c0ae-2996-49dc-9f1b-7c7f023bc9f2', key: 'category.educational_institutions' },
        { value: 'ad584c2a-f99c-4ce5-a993-1292c09df3bd', key: 'category.healthcare_institutions' },
        { value: 'c0360f95-ccf1-48bc-82bb-39faabbe671f', key: 'category.research_institutions' },
        { value: '9c03ed19-3722-4a43-b90f-b03471a85e00', key: 'category.cultural_arts_institutions' },
        { value: 'd12d881f-5320-4fd2-80ab-d664f6e309a8', key: 'category.private_company' },
        { value: 'd12d881f-5320-4fd2-80ab-d664f6e309a8', key: 'category.business_corporation' },
      ];

      return (
        <div class="sk-card rounded-3xl p-5 sm:p-7">
          <div class="flex flex-col w-full justify-end items-center space-y-5">
            <div class="flex-row justify-start items-start w-full">
              <p class="sk-page-title font-bold">{t('add_donator')}</p>
            </div>

            <div class="flex flex-col w-full space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-6">
                <div class="flex flex-col justify-center items-start space-y-2 w-full">
                  <p class="sk-body-text text-sm font-medium">{t('form_year')}</p>
                  <input type="number" id="txt_year" placeholder={t('placeholder_year')} class="sk-input text-sm" />
                </div>

                <div class="flex flex-col justify-center items-start space-y-2 w-full">
                  <p class="sk-body-text text-sm font-medium">{t('form_amount')}</p>
                  <input type="number" id="txt_amount" placeholder={t('placeholder_amount')} class="sk-input text-sm" />
                </div>

                <div class="flex flex-col justify-center items-start space-y-2 w-full">
                  <p class="sk-body-text text-sm font-medium">{t('form_category')}</p>
                  <select id="sel_category" class="sk-select text-sm">
                    {categoryOptions.map((option, index) => (
                      <option key={option.key + '_' + index} value={option.value}>{t(option.key)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 w-full">
                <div class="flex flex-col justify-center items-start space-y-2 w-full">
                  <p class="sk-body-text text-sm font-medium">{t('form_name')}</p>
                  <input type="text" placeholder={t('placeholder_name')} id="txt_name" class="sk-input text-sm" />
                </div>

                <div class="flex flex-col justify-center items-start space-y-2 w-full">
                  <p class="sk-body-text text-sm font-medium">{t('form_affiliation')}</p>
                  <input type="text" placeholder={t('placeholder_affiliation')} id="txt_affiliation" class="sk-input text-sm" />
                </div>

                <div class="flex flex-col justify-center items-start space-y-2 w-full">
                  <p class="sk-body-text text-sm font-medium">{t('form_comment')}</p>
                  <input type="text" placeholder={t('placeholder_comment')} id="txt_comment" class="sk-input text-sm" />
                </div>
              </div>
            </div>

            <div class="flex flex-row justify-end items-center w-full">
              <button type="button" onClick={handleSubmit} disabled={state.isSubmitting} class="sk-button-primary text-sm w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
                {state.isSubmitting ? (
                  <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" fill-opacity="0.28"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                  </svg>
                ) : null}
                <span>{state.isSubmitting ? t('submitting') : t('submit')}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    function DivDonationSkeleton() {
      return (
        <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full space-y-8 animate-pulse">
          <div class="max-w-screen-md mb-2">
            <DivSubHeader text={t('generous_donations')} />
          </div>
          <div class="flex flex-col w-full justify-center items-center space-y-4">
            <div class="sk-skeleton-line h-3 w-48"></div>
            <div class="grid grid-cols-1 w-full sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} class="sk-skeleton-block h-36 w-full rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    function DivYearBlock(props) {
      return (
        <div class="w-full rounded-3xl sk-soft-panel p-5 sm:p-7">
          <div class="max-w-screen-md mx-auto text-center mb-6">
            <div class="inline-flex h-14 w-14 items-center justify-center rounded-full sk-highlight-panel">
              <svg class="h-7 w-7 sk-muted-text" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
              </svg>
            </div>
            <p class="sk-page-title mt-3 text-2xl italic font-semibold">{props.year}</p>
          </div>

          <div class="grid grid-cols-1 w-full sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {props.items.map((item, index) => (
              <DivDonorCard key={(item && item.uuid) || index} item={item} />
            ))}
          </div>
        </div>
      );
    }

    function DivDonorCard(props) {
      const item = props.item || {};
      const hasComment = item.comment != null && String(item.comment).trim() !== '';
      const initial = (item.name ? String(item.name).trim().charAt(0) : '?') || '?';

      return (
        <div class="sk-card sk-donor-card rounded-2xl p-4 sm:p-5 text-center h-full flex flex-col justify-start items-center">
          <div class="w-full flex justify-end">
            {state.canManage ? (
              <button type="button" class="sk-delete-btn sk-muted-text" onClick={() => handleDelete(item.uuid)} aria-label="Delete donor record">
                <TrashSvg />
              </button>
            ) : null}
          </div>

          {item.url_icon ? (
            <img class="mx-auto mb-4 w-12 h-12 rounded-lg object-cover" src={item.url_icon} alt="" />
          ) : (
            <div class="mx-auto mb-4 w-12 h-12 rounded-lg sk-highlight-panel flex items-center justify-center text-base font-bold sk-page-title">
              {initial.toUpperCase()}
            </div>
          )}

          <h5 class="mb-1 text-base sm:text-lg font-bold tracking-tight sk-page-title">{item.name}</h5>
          <p class="sk-muted-text text-xs sm:text-sm mb-1">{item.affiliation}</p>
          <p class="sk-body-text text-sm font-semibold mb-1">{formatMoney(item.amount, state.lang)}</p>
          {hasComment ? <p class="sk-muted-text text-xs sm:text-sm mb-1">{item.comment}</p> : null}
        </div>
      );
    }

    function DivDonationSection() {
      if (state.loadingDonations) {
        return <DivDonationSkeleton />;
      }

      return (
        <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full space-y-8">
          <div class="max-w-screen-md mb-2">
            <DivSubHeader text={t('generous_donations')} />
          </div>

          {state.canManage ? (
            <div class="w-full">
              <DivAddDonorForm />
            </div>
          ) : null}

          {state.loadError ? (
            <div class="w-full rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">
              {t('load_failed')}
            </div>
          ) : null}

          {!state.loadError && state.donationsGrouped.length === 0 ? (
            <div class="w-full rounded-2xl sk-empty-state px-6 py-5 text-sm leading-6">
              {t('no_donations')}
            </div>
          ) : null}

          {!state.loadError && state.donationsGrouped.map((group) => (
            <DivYearBlock key={group.year} year={group.year} items={group.items} />
          ))}
        </div>
      );
    }

    function DivMain() {
      return (
        <div class={'sk-donations-root ' + (state.isDark ? 'sk-mode-dark' : 'sk-mode-light') + ' py-6 px-4 mx-auto max-w-screen-xl sm:py-12 lg:px-6'} dir={isRTL() ? 'rtl' : 'ltr'}>
          <div class="mx-auto max-w-screen-lg text-center">
            <h2 class="sk-page-title mb-2 text-3xl sm:text-4xl tracking-tight font-extrabold">
              {t('title')}
            </h2>
            <p class="sk-body-text mb-6 sm:mb-8 text-base lg:text-lg leading-8">
              {t('subtitle')}
            </p>
          </div>

          <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
            <div class="max-w-screen-md mb-8">
              <DivSubHeader text={t('sponsorship_info')} />
            </div>
            <div class="w-full rounded-3xl sk-soft-panel px-5 py-5 sm:px-7 sm:py-6">
              <p class="sk-body-text leading-8">{t('sponsorship_info_body')}</p>
            </div>
          </div>

          <DivBenefitTable />

          <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
            <div class="max-w-screen-md mb-8">
              <DivSubHeader text={t('how_to_sponsor')} />
            </div>
            <div class="w-full rounded-3xl sk-soft-panel px-5 py-5 sm:px-7 sm:py-6">
              <p class="sk-body-text leading-8">{t('how_to_sponsor_body')}</p>
            </div>
          </div>

          <div class="flex flex-col justify-center items-start py-6 sm:py-8 w-full">
            <div class="max-w-screen-md mb-8">
              <DivSubHeader text={t('how_to_donate')} />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 items-start gap-6 w-full">
              <div class="sk-card rounded-3xl p-5 sm:p-7 flex flex-col w-full space-y-4">
                <DivSubDonationHeader text={t('paypal_intro')} />
                <div class="flex w-full justify-center items-baseline my-4">
                  <form class="sk-paypal-form" action="https://www.paypal.com/donate" method="post" target="_top">
                    <input name="hosted_button_id" type="hidden" value="WSLH4UUGTM8ZL" />
                    <input alt="Donate with PayPal button" border="0" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" title="PayPal - The safer, easier way to pay online!" type="image" />
                    <img alt="" border="0" height="1" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" />
                  </form>
                </div>
              </div>

              <div class="sk-card rounded-3xl p-5 sm:p-7 flex flex-col w-full">
                <DivSubDonationHeader text={t('check_intro')} />
                <ul role="list" class="mt-6 sm:mt-8 space-y-4 text-left">
                  <DivStepItem text={t('step1')} />
                  <DivStepItem text={t('step2')} />
                  <DivStepItem text={t('step3')} />
                </ul>
              </div>
            </div>
          </div>

          {/* TODO(statkiss): Re-enable the Whom to contact block after the fetch contract is redesigned.
              fetch(buildMembershipUrl('ajax_get_whom_to_contact/')) is intentionally disabled for now. */}
          <div id="div_whom_to_contact" class="hidden" data-fetch-disabled="true"></div>

          <DivDonationSection />
        </div>
      );
    }

    async function handleSubmit() {
      if (state.isSubmitting) return;
      state.isSubmitting = true;
      renderApp();

      try {
        const txtYear = document.getElementById('txt_year') ? document.getElementById('txt_year').value.trim() : '';
        const txtAmount = document.getElementById('txt_amount') ? document.getElementById('txt_amount').value.trim() : '';
        const txtName = document.getElementById('txt_name') ? document.getElementById('txt_name').value.trim() : '';
        const txtAffiliation = document.getElementById('txt_affiliation') ? document.getElementById('txt_affiliation').value.trim() : '';
        const txtComment = document.getElementById('txt_comment') ? document.getElementById('txt_comment').value.trim() : '';
        const selCategory = document.getElementById('sel_category') ? document.getElementById('sel_category').value.trim() : '';

        if (!txtYear) {
          alert(t('enter_year'));
          return;
        }
        if (!txtAmount) {
          alert(t('enter_amount'));
          return;
        }
        if (!txtName) {
          alert(t('enter_name'));
          return;
        }

        const inputData = new FormData();
        inputData.append('txt_year', txtYear);
        inputData.append('txt_amount', txtAmount);
        inputData.append('txt_name', txtName);
        inputData.append('txt_affiliation', txtAffiliation);
        inputData.append('txt_comment', txtComment);
        inputData.append('sel_category', selCategory);

        await fetchJsonWithFallback([
          buildMembershipUrl('ajax_add_donator/'),
          legacyMembershipUrl('ajax_add_donator/')
        ], {
          method: 'post',
          headers: { 'X-CSRFToken': getCsrfToken() },
          body: inputData,
        });

        location.href = buildMembershipUrl('donations/');
      } catch (error) {
        alert(t('submit_failed'));
      } finally {
        state.isSubmitting = false;
        renderApp();
      }
    }

    async function handleDelete(uuid) {
      if (!uuid) return;
      if (!confirm(t('confirm_delete'))) return;

      try {
        const inputData = new FormData();
        inputData.append('uuid', uuid);

        await fetchJsonWithFallback([
          buildMembershipUrl('ajax_delete_donator/'),
          legacyMembershipUrl('ajax_delete_donator/')
        ], {
          method: 'post',
          headers: { 'X-CSRFToken': getCsrfToken() },
          body: inputData,
        });

        location.href = buildMembershipUrl('donations/');
      } catch (error) {
        alert(t('delete_failed'));
      }
    }

    async function loadDonations() {
      try {
        const data = await fetchJsonWithFallback([
          buildMembershipUrl('ajax_get_donation_list/'),
          legacyMembershipUrl('ajax_get_donation_list/')
        ]);
        state.donationsGrouped = buildDonationGroups(data);
        state.loadError = false;
      } catch (error) {
        state.donationsGrouped = [];
        state.loadError = true;
      } finally {
        state.loadingDonations = false;
        renderApp();
      }
    }

    function resolveCanManage(menuData) {
      const username = typeof window.gv_username === 'string' ? window.gv_username : '';
      if (!username) return false;
      return Boolean(menuData && (menuData.role === 'Administrator' || menuData.role === 'Developer' || menuData.officer !== 'Member'));
    }

    async function loadPermissions() {
      try {
        const data = await fetchJsonWithFallback([
          buildSiteUrl('ajax_get_menu_header/'),
          legacySiteUrl('ajax_get_menu_header/')
        ]);
        state.canManage = resolveCanManage(data);
      } catch (error) {
        state.canManage = false;
      } finally {
        renderApp();
      }
    }

    function setupObservers() {
      const onStorage = function() {
        syncLanguageAndTheme(false);
      };
      window.addEventListener('storage', onStorage);

      let mediaQuery = null;
      let onMedia = null;
      if (window.matchMedia) {
        mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        onMedia = function() {
          syncLanguageAndTheme(false);
        };
        if (typeof mediaQuery.addEventListener === 'function') {
          mediaQuery.addEventListener('change', onMedia);
        } else if (typeof mediaQuery.addListener === 'function') {
          mediaQuery.addListener(onMedia);
        }
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
        if (mediaQuery && onMedia) {
          if (typeof mediaQuery.removeEventListener === 'function') {
            mediaQuery.removeEventListener('change', onMedia);
          } else if (typeof mediaQuery.removeListener === 'function') {
            mediaQuery.removeListener(onMedia);
          }
        }
      };
    }

    setupObservers();
    renderApp();
    loadDonations();
    loadPermissions();
  };
})();
