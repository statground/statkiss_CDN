(function () {
    'use strict';

    const DEFAULT_CATEGORY_META = [
        { key: 'category.academic_society', defaultValue: 'Academic Society', aliases: ['Academic Society', 'ACADEMIC SOCIETY'] },
        { key: 'category.government_institutions', defaultValue: 'Government Institutions', aliases: ['Government Institutions', 'GOVERNMENT INSTITUTIONS'] },
        { key: 'category.ngo', defaultValue: 'NGO', aliases: ['NGO'] },
        { key: 'category.financial_institutions', defaultValue: 'Financial Institutions', aliases: ['Financial Institutions', 'FINANCIAL INSTITUTIONS'] },
        { key: 'category.educational_institutions', defaultValue: 'Educational Institutions', aliases: ['Educational Institutions', 'EDUCATIONAL INSTITUTIONS'] },
        { key: 'category.healthcare_institutions', defaultValue: 'Healthcare Institutions', aliases: ['Healthcare Institutions', 'HEALTHCARE INSTITUTIONS'] },
        { key: 'category.research_institutions', defaultValue: 'Research Institutions', aliases: ['Research Institutions', 'RESEARCH INSTITUTIONS'] },
        { key: 'category.cultural_and_arts_institutions', defaultValue: 'Cultural and Arts Institutions', aliases: ['Cultural and Arts Institutions', 'CULTURAL AND ARTS INSTITUTIONS'] },
        { key: 'category.private_company', defaultValue: 'Private Company', aliases: ['Private Company', 'PRIVATE COMPANY'] },
        { key: 'category.business_corporation', defaultValue: 'Business Corporation', aliases: ['Business Corporation', 'BUSINESS CORPORATION'] }
    ];

    const CATEGORY_INDEX = {};
    const CATEGORY_KEY_BY_NORMALIZED_VALUE = {};
    let rootHandlersBound = false;
    let languageWatcher = null;
    let themeObserver = null;
    let bodyThemeObserver = null;
    let mediaListenerBound = false;
    let lastDarkMode = null;

    DEFAULT_CATEGORY_META.forEach(function (item, index) {
        CATEGORY_INDEX[item.key] = index;
        item.aliases.forEach(function (alias) {
            CATEGORY_KEY_BY_NORMALIZED_VALUE[normalizeValue(alias)] = item.key;
        });
    });

    const state = {
        initialized: false,
        lang: 'en',
        loading: true,
        loadError: false,
        links: [],
        observedCategories: [],
        canManage: false,
        writeModalOpen: false,
        writeSubmitting: false,
        editMode: false,
        savingEdits: false,
        writeForm: {
            category: DEFAULT_CATEGORY_META[0].defaultValue,
            title: '',
            url: ''
        },
        editRows: []
    };

    function deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeValue(value) {
        return String(value || '')
            .trim()
            .toLowerCase()
            .replace(/[\_\-]+/g, ' ')
            .replace(/\s+/g, ' ');
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getRoot() {
        return document.getElementById('div_main');
    }

    function getHeaderI18n() {
        return window.StatKISS_I18N || null;
    }

    function getPageI18n() {
        return window.StatKISS_I18N_FORUMS_LINKS || window.StatKISS_I18N_USEFUL_LINKS || null;
    }

    function getLang() {
        const header = getHeaderI18n();
        const page = getPageI18n();

        if (header && typeof header.getInitialLang === 'function') {
            return header.getInitialLang();
        }
        if (page && typeof page.getInitialLang === 'function') {
            return page.getInitialLang();
        }
        return 'en';
    }

    function applyLangToDocument(lang) {
        const header = getHeaderI18n();
        const page = getPageI18n();
        let rtl = false;

        if (header && typeof header.applyLangToDocument === 'function') {
            header.applyLangToDocument(lang);
            return;
        }

        if (page && typeof page.isRTL === 'function') {
            rtl = page.isRTL(lang);
        }

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    }

    function syncLanguage() {
        state.lang = getLang();
        applyLangToDocument(state.lang);
    }

    function t(key) {
        const page = getPageI18n();
        if (page && typeof page.t === 'function') {
            return page.t(state.lang, key);
        }
        return key;
    }

    function tTitle() {
        const header = getHeaderI18n();
        if (header && typeof header.t === 'function') {
            const translated = header.t(state.lang, 'nav.useful_links');
            if (translated && translated !== 'nav.useful_links') {
                return translated;
            }
        }
        return t('useful_links.title');
    }

    function isDarkMode() {
        try {
            if (window.StatKISSTheme && typeof window.StatKISSTheme.isDark === 'function') {
                return window.StatKISSTheme.isDark();
            }
        } catch (error) {}

        const root = document.documentElement;
        const body = document.body;
        const rootClass = root ? (root.className || '') : '';
        const bodyClass = body ? (body.className || '') : '';
        const rootTheme = root ? (root.getAttribute('data-theme') || root.getAttribute('data-bs-theme') || root.getAttribute('data-mode') || root.getAttribute('data-statkiss-theme') || '') : '';
        const bodyTheme = body ? (body.getAttribute('data-theme') || body.getAttribute('data-bs-theme') || body.getAttribute('data-mode') || body.getAttribute('data-statkiss-theme') || '') : '';

        if (/\bdark\b/i.test(rootClass) || /\bdark\b/i.test(bodyClass)) {
            return true;
        }
        if (/dark/i.test(rootTheme) || /dark/i.test(bodyTheme)) {
            return true;
        }

        try {
            return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        } catch (error) {
            return false;
        }
    }

    function startThemeWatcher() {
        if (themeObserver || bodyThemeObserver) {
            return;
        }

        lastDarkMode = isDarkMode();

        function handleThemeChange() {
            const nextDarkMode = isDarkMode();
            if (nextDarkMode !== lastDarkMode) {
                lastDarkMode = nextDarkMode;
                render();
            }
        }

        if (window.MutationObserver && document.documentElement) {
            themeObserver = new MutationObserver(handleThemeChange);
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'data-bs-theme', 'data-mode', 'data-statkiss-theme', 'style']
            });
        }

        if (window.MutationObserver && document.body) {
            bodyThemeObserver = new MutationObserver(handleThemeChange);
            bodyThemeObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'data-bs-theme', 'data-mode', 'data-statkiss-theme', 'style']
            });
        }

        if (!mediaListenerBound) {
            mediaListenerBound = true;
            try {
                const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
                if (media && typeof media.addEventListener === 'function') {
                    media.addEventListener('change', handleThemeChange);
                } else if (media && typeof media.addListener === 'function') {
                    media.addListener(handleThemeChange);
                }
            } catch (error) {}
        }
    }

    function startLanguageWatcher() {
        if (languageWatcher) {
            return;
        }

        languageWatcher = window.setInterval(function () {
            const nextLang = getLang();
            if (nextLang !== state.lang) {
                state.lang = nextLang;
                applyLangToDocument(nextLang);
                render();
            }
        }, 700);
    }

    function getConfig() {
        if (window.StatKISS_USEFUL_LINKS_CONFIG && typeof window.StatKISS_USEFUL_LINKS_CONFIG === 'object') {
            return window.StatKISS_USEFUL_LINKS_CONFIG;
        }

        const el = document.getElementById('statkiss-useful-links-config');
        if (!el) {
            return {};
        }

        try {
            window.StatKISS_USEFUL_LINKS_CONFIG = JSON.parse(el.textContent || '{}');
        } catch (error) {
            window.StatKISS_USEFUL_LINKS_CONFIG = {};
        }
        return window.StatKISS_USEFUL_LINKS_CONFIG;
    }

    function detectCanManage() {
        const config = getConfig();
        if (config.can_manage_links != null) {
            return !!config.can_manage_links;
        }
        if (config.canManage != null) {
            return !!config.canManage;
        }
        return false;
    }

    function buildAjaxUrl(action) {
        const config = getConfig();
        const map = {
            get_links: config.ajax_get_url || config.ajaxGetUrl,
            add_links: config.ajax_add_url || config.ajaxAddUrl,
            delete_links: config.ajax_delete_url || config.ajaxDeleteUrl,
            save_links_edits: config.ajax_save_edits_url || config.ajaxSaveEditsUrl
        };

        if (map[action]) {
            return map[action];
        }

        let basePath = String(config.base_path || config.basePath || '/forums/').trim() || '/forums/';
        if (basePath.charAt(0) !== '/') {
            basePath = '/' + basePath;
        }
        basePath = basePath.replace(/\/+$/g, '') + '/';
        return basePath + 'ajax_' + action + '/';
    }

    function resolveCategoryKey(rawValue) {
        return CATEGORY_KEY_BY_NORMALIZED_VALUE[normalizeValue(rawValue)] || null;
    }

    function localizeCategory(rawValue) {
        const key = resolveCategoryKey(rawValue);
        return key ? t(key) : String(rawValue || '');
    }

    function getCategorySortIndex(rawValue) {
        const key = resolveCategoryKey(rawValue);
        if (!key) {
            return 999;
        }
        return CATEGORY_INDEX[key];
    }

    function sortLinks(rows) {
        return rows.slice().sort(function (a, b) {
            const categoryA = getCategorySortIndex(a.category);
            const categoryB = getCategorySortIndex(b.category);
            if (categoryA !== categoryB) {
                return categoryA - categoryB;
            }

            const titleA = String(a.title || '').toLowerCase();
            const titleB = String(b.title || '').toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;

            const uuidA = String(a.uuid || '');
            const uuidB = String(b.uuid || '');
            if (uuidA < uuidB) return -1;
            if (uuidA > uuidB) return 1;
            return 0;
        });
    }

    function normalizeLinks(payload) {
        let rows = [];

        if (payload && Array.isArray(payload.links)) {
            rows = payload.links;
        } else if (Array.isArray(payload)) {
            rows = payload;
        } else if (payload && typeof payload === 'object') {
            rows = Object.keys(payload).map(function (key) {
                return payload[key];
            }).filter(function (item) {
                return item && typeof item === 'object' && (
                    Object.prototype.hasOwnProperty.call(item, 'title') ||
                    Object.prototype.hasOwnProperty.call(item, 'url') ||
                    Object.prototype.hasOwnProperty.call(item, 'category')
                );
            });
        }

        return sortLinks(rows.map(function (item) {
            return {
                uuid: String(item.uuid || ''),
                title: String(item.title || ''),
                category: String(item.category || ''),
                url: String(item.url || ''),
                description: String(item.description || '')
            };
        }));
    }

    function deriveObservedCategories(links) {
        const seen = {};
        const categories = [];

        links.forEach(function (item) {
            const value = String(item.category || '').trim();
            if (!value || seen[value]) {
                return;
            }
            seen[value] = true;
            categories.push(value);
        });

        categories.sort(function (a, b) {
            const orderA = getCategorySortIndex(a);
            const orderB = getCategorySortIndex(b);
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return String(a).localeCompare(String(b));
        });

        return categories;
    }

    function getCategoryOptions() {
        const observedByKey = {};
        const observedUnknown = [];

        state.observedCategories.forEach(function (rawValue) {
            const key = resolveCategoryKey(rawValue);
            if (key && !observedByKey[key]) {
                observedByKey[key] = rawValue;
            } else if (!key && rawValue) {
                observedUnknown.push(rawValue);
            }
        });

        const options = DEFAULT_CATEGORY_META.map(function (item) {
            return {
                key: item.key,
                value: observedByKey[item.key] || item.defaultValue,
                label: t(item.key)
            };
        });

        observedUnknown.sort();
        observedUnknown.forEach(function (rawValue) {
            options.push({
                key: 'custom:' + rawValue,
                value: rawValue,
                label: rawValue
            });
        });

        return options;
    }

    function syncWriteFormCategory() {
        const options = getCategoryOptions();
        const found = options.some(function (option) {
            return option.value === state.writeForm.category;
        });
        if (!found && options.length) {
            state.writeForm.category = options[0].value;
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            document.cookie.split(';').forEach(function (cookie) {
                const trimmed = cookie.trim();
                if (cookieValue == null && trimmed.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(trimmed.substring(name.length + 1));
                }
            });
        }
        return cookieValue;
    }

    function fetchLinks() {
        return fetch(buildAjaxUrl('get_links'), {
            credentials: 'same-origin',
            cache: 'no-store'
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to fetch useful links.');
            }
            return response.json();
        });
    }

    function reloadLinks() {
        state.loading = true;
        state.loadError = false;
        render();

        return fetchLinks().then(function (payload) {
            state.links = normalizeLinks(payload);
            state.observedCategories = deriveObservedCategories(state.links);
            state.loading = false;
            state.loadError = false;
            syncWriteFormCategory();
            render();
        }).catch(function (error) {
            console.error(error);
            state.links = [];
            state.observedCategories = [];
            state.loading = false;
            state.loadError = true;
            syncWriteFormCategory();
            render();
        });
    }

    function getCardTone(index) {
        const dark = isDarkMode();
        const tones = [
            {
                accent: 'from-sky-300 via-blue-500 to-indigo-500',
                badge: dark ? 'bg-blue-500/10 text-blue-100 ring-blue-400/30' : 'bg-blue-50 text-blue-700 ring-blue-200',
                domain: dark ? 'text-blue-300' : 'text-blue-700',
                titleHover: dark ? 'group-hover:text-blue-300' : 'group-hover:text-blue-700',
                button: 'from-sky-300 via-blue-500 to-indigo-500',
                buttonShadow: 'shadow-blue-500/25'
            },
            {
                accent: 'from-emerald-200 via-emerald-500 to-teal-500',
                badge: dark ? 'bg-emerald-500/10 text-emerald-100 ring-emerald-400/30' : 'bg-emerald-50 text-emerald-700 ring-emerald-200',
                domain: dark ? 'text-emerald-300' : 'text-emerald-700',
                titleHover: dark ? 'group-hover:text-emerald-300' : 'group-hover:text-emerald-700',
                button: 'from-emerald-300 via-emerald-500 to-teal-500',
                buttonShadow: 'shadow-emerald-500/25'
            },
            {
                accent: 'from-fuchsia-200 via-violet-500 to-purple-500',
                badge: dark ? 'bg-violet-500/10 text-violet-100 ring-violet-400/30' : 'bg-violet-50 text-violet-700 ring-violet-200',
                domain: dark ? 'text-violet-300' : 'text-violet-700',
                titleHover: dark ? 'group-hover:text-violet-300' : 'group-hover:text-violet-700',
                button: 'from-fuchsia-300 via-violet-500 to-purple-500',
                buttonShadow: 'shadow-violet-500/25'
            },
            {
                accent: 'from-amber-200 via-orange-500 to-rose-500',
                badge: dark ? 'bg-orange-500/10 text-orange-100 ring-orange-400/30' : 'bg-amber-50 text-orange-700 ring-amber-200',
                domain: dark ? 'text-orange-300' : 'text-orange-700',
                titleHover: dark ? 'group-hover:text-orange-300' : 'group-hover:text-orange-700',
                button: 'from-amber-300 via-orange-500 to-rose-500',
                buttonShadow: 'shadow-orange-500/25'
            }
        ];
        return tones[index % tones.length];
    }

    function getDisplayDomain(rawUrl) {
        const raw = String(rawUrl || '').trim();
        if (!raw) {
            return '';
        }

        try {
            const parsed = new URL(raw);
            return parsed.hostname.replace(/^www\./i, '').toUpperCase();
        } catch (error) {
            return raw
                .replace(/^https?:\/\//i, '')
                .replace(/^www\./i, '')
                .split('/')[0]
                .toUpperCase();
        }
    }

    function buildHeaderHtml() {
        return [
            '<div class="mx-auto max-w-screen-lg text-center">',
                '<h2 class="mb-4 text-4xl font-extrabold tracking-tight ', isDarkMode() ? 'text-white' : 'text-gray-900', '">', escapeHtml(tTitle()), '</h2>',
                '<p class="mb-10 lg:text-lg sm:px-16 xl:px-24 ', isDarkMode() ? 'text-gray-200' : 'text-gray-500', '">', escapeHtml(t('useful_links.description')), '</p>',
            '</div>'
        ].join('');
    }

    function buildErrorHtml() {
        if (!state.loadError) {
            return '';
        }
        const tone = isDarkMode()
            ? 'border-red-500/40 bg-red-950/40 text-red-200'
            : 'border-red-200 bg-red-50 text-red-700';
        return '<div class="mx-auto mb-8 max-w-screen-lg rounded-2xl border px-4 py-3 text-sm ' + tone + '">' + escapeHtml(t('useful_links.load_error')) + '</div>';
    }

    function buildWriteModalHtml() {
        if (!state.writeModalOpen) {
            return '';
        }

        const dark = isDarkMode();
        const optionsHtml = getCategoryOptions().map(function (option) {
            return '<option value="' + escapeHtml(option.value) + '"' + (option.value === state.writeForm.category ? ' selected' : '') + '>' + escapeHtml(option.label) + '</option>';
        }).join('');
        const fieldClass = dark
            ? 'border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
            : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
        const secondaryButtonClass = dark
            ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500'
            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300';
        const submitButtonClass = dark
            ? 'bg-white text-slate-950 hover:bg-slate-100'
            : 'bg-slate-950 text-white hover:bg-slate-800';

        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
                <div class="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" data-action="close-write-modal"></div>
                <div class="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border ${dark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'} shadow-2xl">
                    <div class="flex items-start justify-between gap-4 border-b px-6 py-5 sm:px-8 ${dark ? 'border-slate-800' : 'border-slate-200'}">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-slate-400' : 'text-slate-500'}">${escapeHtml(tTitle())}</p>
                            <h2 class="mt-2 text-2xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(t('useful_links.add_link'))}</h2>
                        </div>
                        <button type="button" data-action="close-write-modal" class="inline-flex h-11 w-11 items-center justify-center rounded-full border text-xl transition ${secondaryButtonClass}" aria-label="${escapeHtml(t('useful_links.cancel'))}" title="${escapeHtml(t('useful_links.cancel'))}">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                        <div class="grid gap-4 sm:grid-cols-2">
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('useful_links.link_title'))}</span>
                                <input id="write_link_title" type="text" value="${escapeHtml(state.writeForm.title)}" placeholder="${escapeHtml(t('useful_links.link_title'))}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${fieldClass}">
                            </label>
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('useful_links.category'))}</span>
                                <select id="write_link_category" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${fieldClass}">${optionsHtml}</select>
                            </label>
                        </div>
                        <label class="block">
                            <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('useful_links.url'))}</span>
                            <input id="write_link_url" type="url" value="${escapeHtml(state.writeForm.url)}" placeholder="https://www.statkiss.org" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${fieldClass}">
                        </label>
                    </div>
                    <div class="flex flex-col-reverse gap-3 border-t px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8 ${dark ? 'border-slate-800' : 'border-slate-200'}">
                        <button type="button" data-action="close-write-modal" class="inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-semibold transition ${secondaryButtonClass}">${escapeHtml(t('useful_links.cancel'))}</button>
                        <button type="button" data-action="submit-write-link" class="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition ${submitButtonClass} ${state.writeSubmitting ? 'cursor-wait opacity-70' : ''}">
                            ${state.writeSubmitting ? '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>' : ''}
                            <span>${escapeHtml(state.writeSubmitting ? t('useful_links.submitting') : t('useful_links.submit'))}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function buildFloatingControlsHtml() {
        if (!state.canManage) {
            return '';
        }

        const dark = isDarkMode();
        const primaryClass = dark
            ? 'border-fuchsia-500 bg-fuchsia-500 text-white ring-fuchsia-950 hover:border-fuchsia-400 hover:bg-fuchsia-400'
            : 'border-fuchsia-300 bg-fuchsia-600 text-white ring-fuchsia-200 hover:border-fuchsia-200 hover:bg-fuchsia-500';
        const secondaryClass = dark
            ? 'border-slate-700 bg-slate-900 text-slate-100 ring-slate-950 hover:border-slate-500'
            : 'border-slate-200 bg-white text-slate-800 ring-slate-200 hover:border-slate-300';
        const doneClass = dark
            ? 'border-emerald-500 bg-emerald-500 text-slate-950 ring-emerald-950 hover:border-emerald-400 hover:bg-emerald-400'
            : 'border-emerald-300 bg-emerald-500 text-white ring-emerald-200 hover:border-emerald-200 hover:bg-emerald-400';

        const controls = state.editMode ? `
            <button type="button" data-action="save-editing" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${doneClass} ${state.savingEdits ? 'cursor-wait opacity-70' : ''}">
                ${state.savingEdits ? '<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>' : ''}
                <span>${escapeHtml(t('useful_links.done'))}</span>
            </button>
            <button type="button" data-action="cancel-editing" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${secondaryClass}">${escapeHtml(t('useful_links.cancel'))}</button>
        ` : `
            <button type="button" data-action="open-write-modal" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${primaryClass}">${escapeHtml(t('useful_links.write'))}</button>
            <button type="button" data-action="start-editing" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${secondaryClass}">${escapeHtml(t('useful_links.edit'))}</button>
        `;

        return `
            <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
                ${controls}
            </div>
        `;
    }

    function buildLoadingHtml() {
        const dark = isDarkMode();
        const card = `
            <div class="overflow-hidden rounded-[2rem] border p-6 shadow-sm ${dark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'} animate-pulse">
                <div class="h-1.5 w-full rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-100'}"></div>
                <div class="mt-5 flex items-center justify-between gap-3">
                    <div class="h-7 w-32 rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-100'}"></div>
                    <div class="h-11 w-11 rounded-2xl ${dark ? 'bg-slate-800' : 'bg-slate-100'}"></div>
                </div>
                <div class="mt-7 h-8 w-4/5 rounded ${dark ? 'bg-slate-700' : 'bg-slate-200'}"></div>
                <div class="mt-4 h-4 w-1/3 rounded ${dark ? 'bg-slate-800' : 'bg-slate-100'}"></div>
                <div class="mt-4 h-4 w-5/6 rounded ${dark ? 'bg-slate-800' : 'bg-slate-100'}"></div>
                <div class="mt-8 flex items-center justify-between">
                    <div class="h-4 w-10 rounded ${dark ? 'bg-slate-800' : 'bg-slate-100'}"></div>
                    <div class="h-14 w-14 rounded-full ${dark ? 'bg-slate-700' : 'bg-slate-200'}"></div>
                </div>
            </div>
        `;
        return '<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">' + card + card + card + card + card + card + '</div>';
    }

    function buildEmptyHtml() {
        const dark = isDarkMode();
        return `
            <div class="mx-auto max-w-screen-md rounded-3xl border border-dashed px-8 py-12 text-center shadow-sm ${dark ? 'border-slate-600 bg-slate-900' : 'border-gray-300 bg-white'}">
                <h3 class="text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}">${escapeHtml(t('useful_links.empty_title'))}</h3>
                <p class="mt-3 text-sm leading-6 ${dark ? 'text-slate-300' : 'text-gray-500'}">${escapeHtml(t('useful_links.empty_body'))}</p>
            </div>
        `;
    }

    function buildCategoryOptionsHtml(selectedValue) {
        return getCategoryOptions().map(function (option) {
            return '<option value="' + escapeHtml(option.value) + '"' + (option.value === selectedValue ? ' selected' : '') + '>' + escapeHtml(option.label) + '</option>';
        }).join('');
    }

    function buildCardsHtml() {
        if (state.loading) {
            return buildLoadingHtml();
        }
        if (!state.links.length && !state.editMode) {
            return buildEmptyHtml();
        }

        const dark = isDarkMode();
        const rows = state.editMode ? state.editRows : state.links;
        if (!rows.length) {
            return buildEmptyHtml();
        }

        let html = '<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">';

        rows.forEach(function (item, index) {
            const tone = getCardTone(index);
            const domain = getDisplayDomain(item.url);
            const markedDeleted = !!item.marked_deleted;
            const cardSurface = state.editMode && markedDeleted
                ? (dark ? 'border-red-500/40 bg-red-950/20' : 'border-red-200 bg-red-50/80')
                : (dark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white');
            const fieldClass = dark
                ? 'border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
                : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
            const smallButtonClass = dark
                ? 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500 hover:text-white'
                : 'border-slate-200 bg-white text-slate-300 hover:border-slate-300 hover:text-slate-500';
            const pendingBadge = state.editMode && markedDeleted
                ? '<span class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ' + (dark ? 'border-red-500/25 bg-red-500/10 text-red-100' : 'border-red-200 bg-red-50 text-red-700') + '">' + escapeHtml(t('useful_links.pending_delete')) + '</span>'
                : '';
            const deleteButtonClass = markedDeleted
                ? (dark ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100')
                : (dark ? 'border-red-500/30 bg-red-500/10 text-red-100 hover:bg-red-500/15' : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100');
            const disabledClass = markedDeleted ? 'cursor-not-allowed opacity-60' : '';
            const disabledAttr = markedDeleted ? ' disabled' : '';
            const safeUrl = escapeHtml(item.url || '#');

            html += '<article class="group relative overflow-hidden rounded-[2rem] border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ' + cardSurface + '">';
            html += '<div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ' + tone.accent + '"></div>';
            html += '<div class="flex h-full min-h-[250px] flex-col p-6 sm:min-h-[260px] sm:p-7">';

            html += '<div class="flex items-start justify-between gap-3">';
            if (state.editMode) {
                html += '<div class="min-w-0 flex-1">';
                html += '<label class="block">';
                html += '<span class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] ' + (dark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(t('useful_links.category')) + '</span>';
                html += '<select data-edit-field="category" data-uuid="' + escapeHtml(item.uuid) + '"' + disabledAttr + ' class="block h-11 w-full rounded-2xl border px-4 text-sm outline-none transition ' + fieldClass + ' ' + disabledClass + '">';
                html += buildCategoryOptionsHtml(item.category);
                html += '</select>';
                html += '</label>';
                if (pendingBadge) {
                    html += '<div class="mt-3">' + pendingBadge + '</div>';
                }
                html += '</div>';
                html += '<a href="' + safeUrl + '" target="_blank" rel="noreferrer noopener" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition ' + smallButtonClass + '" aria-label="' + escapeHtml(t('useful_links.open_external')) + '">';
                html += '<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
                html += '</a>';
            } else {
                html += '<span class="inline-flex max-w-full items-center rounded-full px-4 py-2 text-xs font-semibold ring-1 ' + tone.badge + '">' + escapeHtml(localizeCategory(item.category)) + '</span>';
                html += '<a href="' + safeUrl + '" target="_blank" rel="noreferrer noopener" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition ' + smallButtonClass + '" aria-label="' + escapeHtml(t('useful_links.open_external')) + '">';
                html += '<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
                html += '</a>';
            }
            html += '</div>';

            html += '<div class="mt-6">';
            if (state.editMode) {
                html += '<label class="block">';
                html += '<span class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] ' + (dark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(t('useful_links.link_title')) + '</span>';
                html += '<input type="text" data-edit-field="title" data-uuid="' + escapeHtml(item.uuid) + '" value="' + escapeHtml(item.title) + '"' + disabledAttr + ' class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ' + fieldClass + ' ' + disabledClass + '">';
                html += '</label>';
                html += '<label class="mt-4 block">';
                html += '<span class="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] ' + (dark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(t('useful_links.url')) + '</span>';
                html += '<input type="url" data-edit-field="url" data-uuid="' + escapeHtml(item.uuid) + '" value="' + escapeHtml(item.url) + '"' + disabledAttr + ' class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ' + fieldClass + ' ' + disabledClass + '">';
                html += '</label>';
            } else {
                html += '<a href="' + safeUrl + '" target="_blank" rel="noreferrer noopener" class="block">';
                html += '<h3 class="text-2xl font-bold tracking-tight transition ' + (dark ? 'text-white ' : 'text-slate-900 ') + tone.titleHover + '">' + escapeHtml(item.title) + '</h3>';
                html += '</a>';
                if (domain) {
                    html += '<p class="mt-5 text-sm font-semibold uppercase tracking-[0.24em] ' + tone.domain + '">' + escapeHtml(domain) + '</p>';
                }
            }
            if (item.description) {
                html += '<p class="mt-4 text-sm leading-6 ' + (dark ? 'text-slate-300' : 'text-slate-600') + (markedDeleted ? ' line-through opacity-70' : '') + '">' + escapeHtml(item.description) + '</p>';
            }
            html += '</div>';

            html += '<div class="mt-auto flex items-end justify-between gap-4 pt-7">';
            html += '<span class="text-sm font-semibold tracking-[0.18em] ' + (dark ? 'text-slate-500' : 'text-slate-400') + '">#' + (index + 1) + '</span>';
            html += '<div class="flex items-center gap-3">';
            if (state.editMode) {
                html += '<button type="button" data-action="toggle-delete" data-uuid="' + escapeHtml(item.uuid) + '" class="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition ' + deleteButtonClass + '">';
                html += '<span>' + escapeHtml(markedDeleted ? t('useful_links.restore') : t('useful_links.delete')) + '</span>';
                html += '</button>';
            }
            html += '<a href="' + safeUrl + '" target="_blank" rel="noreferrer noopener" class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ' + tone.button + ' text-white shadow-lg ' + tone.buttonShadow + ' transition duration-300 hover:scale-[1.03] hover:opacity-95" aria-label="' + escapeHtml(t('useful_links.open_external')) + '">';
            html += '<svg class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
            html += '</a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</article>';
        });

        html += '</div>';
        return html;
    }

    function buildPageHtml() {
        return `
            <div class="mx-auto max-w-screen-xl px-6 py-16 lg:px-6">
                ${buildHeaderHtml()}
                ${buildErrorHtml()}
                ${buildCardsHtml()}
                ${buildFloatingControlsHtml()}
                ${buildWriteModalHtml()}
            </div>
        `;
    }

    function render() {
        const root = getRoot();
        if (!root) {
            return;
        }
        root.innerHTML = buildPageHtml();
    }

    function resetWriteForm() {
        state.writeForm = {
            category: getCategoryOptions().length ? getCategoryOptions()[0].value : DEFAULT_CATEGORY_META[0].defaultValue,
            title: '',
            url: ''
        };
    }

    function startEditing() {
        if (!state.canManage || state.savingEdits) {
            return;
        }
        state.writeModalOpen = false;
        state.editMode = true;
        state.editRows = deepClone(state.links).map(function (item) {
            item.marked_deleted = false;
            return item;
        });
        render();
    }

    function cancelEditing() {
        state.editMode = false;
        state.savingEdits = false;
        state.editRows = [];
        render();
    }

    function openWriteModal() {
        if (!state.canManage || state.editMode || state.writeSubmitting) {
            return;
        }
        syncWriteFormCategory();
        state.writeModalOpen = true;
        render();
    }

    function closeWriteModal() {
        if (state.writeSubmitting) {
            return;
        }
        state.writeModalOpen = false;
        render();
    }

    function submitWrite() {
        if (!state.canManage || state.writeSubmitting) {
            return;
        }

        const title = String(state.writeForm.title || '').trim();
        const category = String(state.writeForm.category || '').trim();
        const url = String(state.writeForm.url || '').trim();

        if (!title) {
            window.alert(t('useful_links.validation_title'));
            return;
        }
        if (!url) {
            window.alert(t('useful_links.validation_url'));
            return;
        }

        state.writeSubmitting = true;
        render();

        const formData = new FormData();
        formData.append('sel_category', category);
        formData.append('txt_name', title);
        formData.append('txt_url', url);
        formData.append('txt_description', '');

        fetch(buildAjaxUrl('add_links'), {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        }).then(function (response) {
            return response.json().then(function (payload) {
                if (!response.ok || !payload.ok) {
                    throw new Error(payload.message || t('useful_links.load_error'));
                }
                return payload;
            });
        }).then(function () {
            resetWriteForm();
            state.writeModalOpen = false;
            return reloadLinks();
        }).catch(function (error) {
            console.error(error);
            window.alert(error.message || t('useful_links.load_error'));
        }).finally(function () {
            state.writeSubmitting = false;
            render();
        });
    }

    function findEditRow(uuid) {
        const targetUuid = String(uuid || '');
        for (let i = 0; i < state.editRows.length; i += 1) {
            if (String(state.editRows[i].uuid || '') === targetUuid) {
                return state.editRows[i];
            }
        }
        return null;
    }

    function updateEditField(uuid, field, value) {
        const row = findEditRow(uuid);
        if (!row || row.marked_deleted) {
            return;
        }
        row[field] = value;
    }

    function toggleDelete(uuid) {
        const row = findEditRow(uuid);
        if (!row) {
            return;
        }
        row.marked_deleted = !row.marked_deleted;
        render();
    }

    function saveEditing() {
        if (!state.editMode || state.savingEdits) {
            return;
        }

        const updates = [];
        const deleteUuids = [];

        for (let i = 0; i < state.editRows.length; i += 1) {
            const row = state.editRows[i];
            if (row.marked_deleted) {
                deleteUuids.push(row.uuid);
                continue;
            }

            const title = String(row.title || '').trim();
            const category = String(row.category || '').trim();
            const url = String(row.url || '').trim();

            if (!title) {
                window.alert(t('useful_links.validation_title'));
                return;
            }
            if (!url) {
                window.alert(t('useful_links.validation_url'));
                return;
            }

            updates.push({
                uuid: row.uuid,
                title: title,
                category: category,
                url: url
            });
        }

        state.savingEdits = true;
        render();

        fetch(buildAjaxUrl('save_links_edits'), {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                updates: updates,
                delete_uuids: deleteUuids
            })
        }).then(function (response) {
            return response.json().then(function (payload) {
                if (!response.ok || !payload.ok) {
                    throw new Error(payload.message || t('useful_links.save_failed'));
                }
                return payload;
            });
        }).then(function () {
            state.editMode = false;
            state.editRows = [];
            return reloadLinks();
        }).catch(function (error) {
            console.error(error);
            window.alert(error.message || t('useful_links.save_failed'));
        }).finally(function () {
            state.savingEdits = false;
            render();
        });
    }

    function bindRootHandlers() {
        const root = getRoot();
        if (!root || rootHandlersBound) {
            return;
        }

        root.addEventListener('input', function (event) {
            const target = event.target;
            if (!target) {
                return;
            }

            if (target.id === 'write_link_title') {
                state.writeForm.title = target.value;
            } else if (target.id === 'write_link_url') {
                state.writeForm.url = target.value;
            } else if (target.getAttribute('data-edit-field') === 'title') {
                updateEditField(target.getAttribute('data-uuid'), 'title', target.value);
            } else if (target.getAttribute('data-edit-field') === 'url') {
                updateEditField(target.getAttribute('data-uuid'), 'url', target.value);
            }
        });

        root.addEventListener('change', function (event) {
            const target = event.target;
            if (!target) {
                return;
            }

            if (target.id === 'write_link_category') {
                state.writeForm.category = target.value;
            } else if (target.getAttribute('data-edit-field') === 'category') {
                updateEditField(target.getAttribute('data-uuid'), 'category', target.value);
            }
        });

        root.addEventListener('click', function (event) {
            let target = event.target;
            while (target && target !== root && !target.getAttribute('data-action')) {
                target = target.parentNode;
            }

            if (!target || target === root) {
                return;
            }

            const action = target.getAttribute('data-action');
            if (!action) {
                return;
            }

            event.preventDefault();

            if (action === 'open-write-modal') {
                openWriteModal();
            } else if (action === 'close-write-modal') {
                closeWriteModal();
            } else if (action === 'submit-write-link') {
                submitWrite();
            } else if (action === 'start-editing') {
                startEditing();
            } else if (action === 'cancel-editing') {
                cancelEditing();
            } else if (action === 'save-editing') {
                saveEditing();
            } else if (action === 'toggle-delete') {
                toggleDelete(target.getAttribute('data-uuid'));
            }
        });

        rootHandlersBound = true;
    }

    function set_main() {
        const pageI18n = getPageI18n();
        if (pageI18n && typeof pageI18n.normalizeCoverage === 'function') {
            pageI18n.normalizeCoverage();
        }

        syncLanguage();
        state.canManage = detectCanManage();
        syncWriteFormCategory();
        bindRootHandlers();

        if (!state.initialized) {
            state.initialized = true;
            startLanguageWatcher();
            startThemeWatcher();
            reloadLinks();
        } else {
            render();
        }
    }

    window.set_main = set_main;
    window.StatKISSForumsLinksPage = {
        init: set_main,
        reload: reloadLinks
    };
})();
