(function () {
    'use strict';

    var DEFAULT_CATEGORY_META = [
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

    var CATEGORY_INDEX = {};
    var CATEGORY_KEY_BY_NORMALIZED_VALUE = {};
    var rootHandlersBound = false;
    var languageWatcher = null;
    var themeWatcher = null;
    var lastDarkMode = null;

    for (var i = 0; i < DEFAULT_CATEGORY_META.length; i += 1) {
        CATEGORY_INDEX[DEFAULT_CATEGORY_META[i].key] = i;
        for (var j = 0; j < DEFAULT_CATEGORY_META[i].aliases.length; j += 1) {
            CATEGORY_KEY_BY_NORMALIZED_VALUE[normalizeValue(DEFAULT_CATEGORY_META[i].aliases[j])] = DEFAULT_CATEGORY_META[i].key;
        }
    }

    var state = {
        initialized: false,
        lang: 'en',
        loading: true,
        loadError: false,
        links: [],
        observedCategories: [],
        canManage: false,
        submitting: false,
        deletingUuid: '',
        form: {
            category: DEFAULT_CATEGORY_META[0].defaultValue,
            name: '',
            url: '',
            description: ''
        }
    };

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

    function shuffleArray(list) {
        var items = list.slice();
        for (var i = items.length - 1; i > 0; i -= 1) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = items[i];
            items[i] = items[j];
            items[j] = temp;
        }
        return items;
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
        var header = getHeaderI18n();
        var page = getPageI18n();

        if (header && typeof header.getInitialLang === 'function') {
            return header.getInitialLang();
        }
        if (page && typeof page.getInitialLang === 'function') {
            return page.getInitialLang();
        }
        return 'en';
    }

    function applyLangToDocument(lang) {
        var header = getHeaderI18n();
        var page = getPageI18n();
        var isRTL = false;

        if (header && typeof header.applyLangToDocument === 'function') {
            header.applyLangToDocument(lang);
            return;
        }

        if (page && typeof page.isRTL === 'function') {
            isRTL = page.isRTL(lang);
        }

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }

    function syncLanguage() {
        state.lang = getLang();
        applyLangToDocument(state.lang);
    }

    function t(key) {
        var page = getPageI18n();
        if (page && typeof page.t === 'function') {
            return page.t(state.lang, key);
        }
        return key;
    }

    function tTitle() {
        var header = getHeaderI18n();
        if (header && typeof header.t === 'function') {
            var translated = header.t(state.lang, 'nav.useful_links');
            if (translated && translated !== 'nav.useful_links') {
                return translated;
            }
        }
        return t('useful_links.title');
    }

    function resolveCategoryKey(rawValue) {
        var normalized = normalizeValue(rawValue);
        return CATEGORY_KEY_BY_NORMALIZED_VALUE[normalized] || null;
    }

    function localizeCategory(rawValue) {
        var key = resolveCategoryKey(rawValue);
        return key ? t(key) : String(rawValue || '');
    }

    function getCategorySortIndex(rawValue) {
        var key = resolveCategoryKey(rawValue);
        if (!key) {
            return 999;
        }
        return CATEGORY_INDEX[key];
    }


    function isDarkMode() {
        var root = document.documentElement;
        var body = document.body;
        var rootClass = root ? (root.className || '') : '';
        var bodyClass = body ? (body.className || '') : '';
        var rootTheme = root ? (root.getAttribute('data-theme') || '') : '';
        var bodyTheme = body ? (body.getAttribute('data-theme') || '') : '';

        if (/\bdark\b/i.test(rootClass) || /\bdark\b/i.test(bodyClass)) {
            return true;
        }
        if (/dark/i.test(rootTheme) || /dark/i.test(bodyTheme)) {
            return true;
        }

        try {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (error) {
            return false;
        }
    }

    function startThemeWatcher() {
        if (themeWatcher) {
            return;
        }

        lastDarkMode = isDarkMode();

        function handleThemeChange() {
            var nextDarkMode = isDarkMode();
            if (nextDarkMode !== lastDarkMode) {
                lastDarkMode = nextDarkMode;
                render();
            }
        }

        themeWatcher = window.setInterval(handleThemeChange, 500);

        if (window.MutationObserver) {
            var observer = new MutationObserver(handleThemeChange);
            if (document.documentElement) {
                observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
            }
            if (document.body) {
                observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
            }
        }

        try {
            if (window.matchMedia) {
                var media = window.matchMedia('(prefers-color-scheme: dark)');
                if (media && typeof media.addEventListener === 'function') {
                    media.addEventListener('change', handleThemeChange);
                } else if (media && typeof media.addListener === 'function') {
                    media.addListener(handleThemeChange);
                }
            }
        } catch (error) {}
    }

    function getHeaderTitleClass() {
        return isDarkMode() ? 'text-white' : 'text-gray-900';
    }

    function getHeaderDescClass() {
        return isDarkMode() ? 'text-gray-200' : 'text-gray-500';
    }

    function getAdminPanelClass() {
        return isDarkMode()
            ? 'mx-auto mb-10 max-w-screen-lg rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-sm'
            : 'mx-auto mb-10 max-w-screen-lg rounded-2xl border border-blue-200 bg-white p-6 shadow-sm';
    }

    function getAdminTitleClass() {
        return isDarkMode() ? 'text-white' : 'text-gray-900';
    }

    function getAdminBodyClass() {
        return isDarkMode() ? 'text-slate-300' : 'text-gray-500';
    }

    function getAdminLabelClass() {
        return isDarkMode() ? 'text-slate-200' : 'text-gray-700';
    }

    function getAdminInputClass() {
        return isDarkMode()
            ? 'block w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30'
            : 'block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200';
    }

    function getLoadingCardClass() {
        return isDarkMode()
            ? 'overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900 p-6 shadow-sm'
            : 'overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm';
    }

    function getEmptyBoxClass() {
        return isDarkMode()
            ? 'mx-auto max-w-screen-md rounded-3xl border border-dashed border-slate-600 bg-slate-900 px-8 py-12 text-center shadow-sm'
            : 'mx-auto max-w-screen-md rounded-3xl border border-dashed border-gray-300 bg-white px-8 py-12 text-center shadow-sm';
    }

    function getEmptyTitleClass() {
        return isDarkMode() ? 'text-white' : 'text-gray-900';
    }

    function getEmptyBodyClass() {
        return isDarkMode() ? 'text-slate-300' : 'text-gray-500';
    }



function getCardTone(index) {
    var tones = [
        {
            accent: 'from-sky-300 via-blue-500 to-indigo-500',
            badge: 'bg-blue-50 text-blue-700 ring-blue-200',
            domain: 'text-blue-700',
            title: (isDarkMode() ? 'group-hover:text-blue-300' : 'group-hover:text-blue-700'),
            button: 'from-sky-300 via-blue-500 to-indigo-500',
            buttonShadow: 'shadow-blue-500/25'
        },
        {
            accent: 'from-emerald-200 via-emerald-500 to-teal-500',
            badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
            domain: 'text-emerald-700',
            title: (isDarkMode() ? 'group-hover:text-emerald-300' : 'group-hover:text-emerald-700'),
            button: 'from-emerald-300 via-emerald-500 to-teal-500',
            buttonShadow: 'shadow-emerald-500/25'
        },
        {
            accent: 'from-fuchsia-200 via-violet-500 to-purple-500',
            badge: 'bg-violet-50 text-violet-700 ring-violet-200',
            domain: 'text-violet-700',
            title: (isDarkMode() ? 'group-hover:text-violet-300' : 'group-hover:text-violet-700'),
            button: 'from-fuchsia-300 via-violet-500 to-purple-500',
            buttonShadow: 'shadow-violet-500/25'
        },
        {
            accent: 'from-amber-200 via-orange-500 to-rose-500',
            badge: 'bg-amber-50 text-amber-700 ring-amber-200',
            domain: 'text-orange-700',
            title: (isDarkMode() ? 'group-hover:text-orange-300' : 'group-hover:text-orange-700'),
            button: 'from-amber-300 via-orange-500 to-rose-500',
            buttonShadow: 'shadow-orange-500/25'
        }
    ];

    return tones[index % tones.length];
}

function getDisplayDomain(rawUrl) {
    var raw = String(rawUrl || '').trim();
    if (!raw) {
        return '';
    }

    try {
        var parsed = new URL(raw);
        return parsed.hostname.replace(/^www\./i, '').toUpperCase();
    } catch (error) {
        return raw
            .replace(/^https?:\/\//i, '')
            .replace(/^www\./i, '')
            .split('/')[0]
            .toUpperCase();
    }
}

    function deriveObservedCategories(links) {
        var map = {};
        var categories = [];

        for (var i = 0; i < links.length; i += 1) {
            if (links[i].category && !map[links[i].category]) {
                map[links[i].category] = true;
                categories.push(links[i].category);
            }
        }

        categories.sort(function (a, b) {
            var orderA = getCategorySortIndex(a);
            var orderB = getCategorySortIndex(b);

            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return a.localeCompare(b);
        });

        return categories;
    }

    function getCategoryOptions() {
        var observedByKey = {};
        var observedUnknown = [];

        for (var i = 0; i < state.observedCategories.length; i += 1) {
            var rawValue = state.observedCategories[i];
            var key = resolveCategoryKey(rawValue);

            if (key && !observedByKey[key]) {
                observedByKey[key] = rawValue;
            } else if (!key && rawValue) {
                observedUnknown.push(rawValue);
            }
        }

        var options = [];
        for (var j = 0; j < DEFAULT_CATEGORY_META.length; j += 1) {
            options.push({
                key: DEFAULT_CATEGORY_META[j].key,
                value: observedByKey[DEFAULT_CATEGORY_META[j].key] || DEFAULT_CATEGORY_META[j].defaultValue,
                label: t(DEFAULT_CATEGORY_META[j].key)
            });
        }

        observedUnknown.sort();
        for (var k = 0; k < observedUnknown.length; k += 1) {
            options.push({
                key: 'custom:' + observedUnknown[k],
                value: observedUnknown[k],
                label: observedUnknown[k]
            });
        }

        return options;
    }

    function syncFormCategory() {
        var options = getCategoryOptions();
        var found = false;

        for (var i = 0; i < options.length; i += 1) {
            if (options[i].value === state.form.category) {
                found = true;
                break;
            }
        }

        if (!found && options.length) {
            state.form.category = options[0].value;
        }
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i += 1) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function normalizeLinks(payload) {
        var links = [];
        var keys = Object.keys(payload || {});

        for (var i = 0; i < keys.length; i += 1) {
            var item = payload[keys[i]];
            if (!item) {
                continue;
            }
            links.push({
                uuid: item.uuid || '',
                title: item.title || '',
                category: item.category || '',
                url: item.url || '',
                description: item.description || ''
            });
        }

        return shuffleArray(links);
    }

    function detectCanManage() {
        if (window.StatKISS_USEFUL_LINKS_CONFIG && window.StatKISS_USEFUL_LINKS_CONFIG.canManage != null) {
            return !!window.StatKISS_USEFUL_LINKS_CONFIG.canManage;
        }

        var root = getRoot();
        if (root && root.dataset && root.dataset.canManage) {
            return root.dataset.canManage === 'true' || root.dataset.canManage === '1';
        }
        if (document.body && document.body.dataset && document.body.dataset.canManage) {
            return document.body.dataset.canManage === 'true' || document.body.dataset.canManage === '1';
        }
        return false;
    }

    function fetchLinks() {
        return fetch('/forums/ajax_get_links/', {
            credentials: 'same-origin'
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to fetch useful links.');
            }
            return response.json();
        });
    }

    function buildHeaderHtml() {
        return [
            '<div class="mx-auto max-w-screen-lg text-center">',
                '<h2 class="mb-4 text-4xl tracking-tight font-extrabold ' + getHeaderTitleClass() + '">', escapeHtml(tTitle()), '</h2>',
                '<p class="mb-10 lg:text-lg sm:px-16 xl:px-24 ' + getHeaderDescClass() + '">', escapeHtml(t('useful_links.description')), '</p>',
            '</div>'
        ].join('');
    }

    function buildErrorHtml() {
        if (!state.loadError) {
            return '';
        }
        return '<div class="mx-auto mb-8 max-w-screen-lg rounded-2xl border px-4 py-3 text-sm ' + (isDarkMode() ? 'border-red-500/40 bg-red-950/40 text-red-200' : 'border-red-200 bg-red-50 text-red-700') + '">' + escapeHtml(t('useful_links.load_error')) + '</div>';
    }

    function buildAdminHtml() {
        if (!state.canManage) {
            return '';
        }

        var options = getCategoryOptions();
        var optionHtml = '';
        for (var i = 0; i < options.length; i += 1) {
            optionHtml += '<option value="' + escapeHtml(options[i].value) + '"' + (options[i].value === state.form.category ? ' selected' : '') + '>' + escapeHtml(options[i].label) + '</option>';
        }

        return [
            '<div class="mx-auto mb-10 max-w-screen-lg rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">',
                '<div class="mb-5">',
                    '<h3 class="text-xl font-bold text-gray-900">', escapeHtml(t('useful_links.manage_title')), '</h3>',
                    '<p class="mt-2 text-sm leading-6 text-gray-500">', escapeHtml(t('useful_links.manage_body')), '</p>',
                '</div>',
                '<div class="grid gap-4 md:grid-cols-2">',
                    '<div>',
                        '<label class="mb-2 block text-sm font-medium ' + getAdminLabelClass() + '">', escapeHtml(t('useful_links.category')), '</label>',
                        '<select id="sel_category" class="' + getAdminInputClass() + '">',
                            optionHtml,
                        '</select>',
                    '</div>',
                    '<div>',
                        '<label class="mb-2 block text-sm font-medium ' + getAdminLabelClass() + '">', escapeHtml(t('useful_links.name')), '</label>',
                        '<input id="txt_name" type="text" value="', escapeHtml(state.form.name), '" placeholder="', escapeHtml(t('useful_links.name')), '" class="' + getAdminInputClass() + '">',
                    '</div>',
                    '<div class="md:col-span-2">',
                        '<label class="mb-2 block text-sm font-medium ' + getAdminLabelClass() + '">', escapeHtml(t('useful_links.url')), '</label>',
                        '<input id="txt_url" type="text" value="', escapeHtml(state.form.url), '" placeholder="https://www.statkiss.org" class="' + getAdminInputClass() + '">',
                    '</div>',
                    '<div class="md:col-span-2">',
                        '<label class="mb-2 block text-sm font-medium ' + getAdminLabelClass() + '">', escapeHtml(t('useful_links.item_description')), '</label>',
                        '<textarea id="txt_description" rows="3" placeholder="', escapeHtml(t('useful_links.item_description')), '" class="' + getAdminInputClass() + '">', escapeHtml(state.form.description), '</textarea>',
                    '</div>',
                '</div>',
                '<div class="mt-5 flex justify-end">',
                    '<button type="button" data-action="submit-link" class="inline-flex items-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"' + (state.submitting ? ' disabled' : '') + '>',
                        escapeHtml(state.submitting ? t('useful_links.submitting') : t('useful_links.submit')),
                    '</button>',
                '</div>',
            '</div>'
        ].join('');
    }


function buildLoadingHtml() {
    var card = [
        '<div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">',
            '<div class="h-1.5 w-full rounded-full bg-slate-100"></div>',
            '<div class="mt-5 flex items-center justify-between gap-3">',
                '<div class="h-7 w-32 rounded-full bg-slate-100"></div>',
                '<div class="h-11 w-11 rounded-2xl bg-slate-100"></div>',
            '</div>',
            '<div class="mt-7 h-8 w-4/5 rounded bg-slate-200"></div>',
            '<div class="mt-4 h-4 w-1/3 rounded bg-slate-100"></div>',
            '<div class="mt-4 h-4 w-5/6 rounded bg-slate-100"></div>',
            '<div class="mt-8 flex items-center justify-between">',
                '<div class="h-4 w-10 rounded bg-slate-100"></div>',
                '<div class="h-14 w-14 rounded-full bg-slate-200"></div>',
            '</div>',
        '</div>'
    ].join('');

    return '<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3 animate-pulse">' + card + card + card + card + card + card + '</div>';
}

    function buildEmptyHtml() {
        return [
            '<div class="mx-auto max-w-screen-md rounded-3xl border border-dashed border-gray-300 bg-white px-8 py-12 text-center shadow-sm">',
                '<h3 class="text-xl font-bold text-gray-900">', escapeHtml(t('useful_links.empty_title')), '</h3>',
                '<p class="mt-3 text-sm leading-6 text-gray-500">', escapeHtml(t('useful_links.empty_body')), '</p>',
            '</div>'
        ].join('');
    }


function buildCardsHtml() {
    var isDark = isDarkMode();
    if (state.loading) {
        return buildLoadingHtml();
    }
    if (!state.links.length) {
        return buildEmptyHtml();
    }

    var html = '<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">';

    for (var i = 0; i < state.links.length; i += 1) {
        var item = state.links[i];
        var tone = getCardTone(i);
        var domain = getDisplayDomain(item.url);

        html += '<article class="group relative overflow-hidden rounded-[2rem] border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ' + (isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white') + '">';
        html += '<div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ' + tone.accent + '"></div>';
        html += '<div class="flex h-full min-h-[230px] flex-col p-6 sm:min-h-[240px] sm:p-7">';

        html += '<div class="flex items-start justify-between gap-3">';
        html += '<span class="inline-flex max-w-full items-center rounded-full px-4 py-2 text-xs font-semibold ring-1 ' + tone.badge + '">' + escapeHtml(localizeCategory(item.category)) + '</span>';
        html += '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noreferrer noopener" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition ' + (isDark ? 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500 hover:text-white' : 'border-slate-200 bg-white text-slate-300 hover:border-slate-300 hover:text-slate-500') + '" aria-label="' + escapeHtml(t('useful_links.open_external')) + '">';
        html += '<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
        html += '</a>';
        html += '</div>';

        html += '<div class="mt-7">';
        html += '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noreferrer noopener" class="block">';
        html += '<h3 class="text-2xl font-bold tracking-tight transition ' + (isDark ? 'text-white ' : 'text-slate-900 ') + tone.title + '">' + escapeHtml(item.title) + '</h3>';
        html += '</a>';
        if (domain) {
            html += '<p class="mt-5 text-sm font-semibold uppercase tracking-[0.24em] ' + tone.domain + '">' + escapeHtml(domain) + '</p>';
        }
        if (item.description) {
            html += '<p class="mt-4 text-sm leading-6 ' + (isDark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(item.description) + '</p>';
        }
        html += '</div>';

        html += '<div class="mt-auto flex items-end justify-between gap-4 pt-7">';
        html += '<span class="text-sm font-semibold tracking-[0.18em] ' + (isDark ? 'text-slate-500' : 'text-slate-400') + '">#' + (i + 1) + '</span>';
        html += '<div class="flex items-center gap-3">';

        if (state.canManage) {
            html += '<button type="button" data-action="delete-link" data-uuid="' + escapeHtml(item.uuid) + '" class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent transition ' + (isDark ? 'text-slate-400 hover:border-red-500/30 hover:bg-red-950/40 hover:text-red-300' : 'text-slate-400 hover:border-red-100 hover:bg-red-50 hover:text-red-600') + '" aria-label="' + escapeHtml(t('useful_links.delete')) + '" title="' + escapeHtml(t('useful_links.delete')) + '">';
            if (state.deletingUuid === item.uuid) {
                html += '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>';
            } else {
                html += '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.5 2A1.5 1.5 0 007 3.5V4H4.75a.75.75 0 000 1.5h.638l.58 9.275A2.25 2.25 0 008.213 17h3.574a2.25 2.25 0 002.245-2.225l.58-9.275h.638a.75.75 0 000-1.5H13v-.5A1.5 1.5 0 0011.5 2h-3zm3 2v-.5h-3V4h3zM8.75 8a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8zm3 0a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8z" clip-rule="evenodd"></path></svg>';
            }
            html += '</button>';
        }

        html += '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noreferrer noopener" class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ' + tone.button + ' text-white shadow-lg ' + tone.buttonShadow + ' transition duration-300 hover:scale-[1.03] hover:opacity-95" aria-label="' + escapeHtml(t('useful_links.open_external')) + '">';
        html += '<svg class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
        html += '</a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</article>';
    }

    html += '</div>';
    return html;
}

    function buildPageHtml() {
        return '<div class="mx-auto max-w-screen-xl px-6 py-16 lg:px-6">' +
            buildHeaderHtml() +
            buildAdminHtml() +
            buildErrorHtml() +
            buildCardsHtml() +
            '</div>';
    }

    function render() {
        var root = getRoot();
        if (!root) {
            return;
        }
        root.innerHTML = buildPageHtml();

        var select = document.getElementById('sel_category');
        if (select) {
            select.value = state.form.category;
        }
    }

    function bindRootHandlers() {
        var root = getRoot();
        if (!root || rootHandlersBound) {
            return;
        }

        root.addEventListener('change', function (event) {
            var target = event.target;
            if (!target || !state.canManage) {
                return;
            }

            if (target.id === 'sel_category') {
                state.form.category = target.value;
            } else if (target.id === 'txt_name') {
                state.form.name = target.value;
            } else if (target.id === 'txt_url') {
                state.form.url = target.value;
            } else if (target.id === 'txt_description') {
                state.form.description = target.value;
            }
        });

        root.addEventListener('input', function (event) {
            var target = event.target;
            if (!target || !state.canManage) {
                return;
            }

            if (target.id === 'txt_name') {
                state.form.name = target.value;
            } else if (target.id === 'txt_url') {
                state.form.url = target.value;
            } else if (target.id === 'txt_description') {
                state.form.description = target.value;
            }
        });

        root.addEventListener('click', function (event) {
            var target = event.target;
            while (target && target !== root && !target.getAttribute('data-action')) {
                target = target.parentNode;
            }

            if (!target || target === root) {
                return;
            }

            var action = target.getAttribute('data-action');

            if (action === 'submit-link') {
                event.preventDefault();
                submitLink();
            } else if (action === 'delete-link') {
                event.preventDefault();
                deleteLink(target.getAttribute('data-uuid'));
            }
        });

        rootHandlersBound = true;
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
            syncFormCategory();
            render();
        }).catch(function (error) {
            console.error(error);
            state.links = [];
            state.observedCategories = [];
            state.loading = false;
            state.loadError = true;
            syncFormCategory();
            render();
        });
    }

    function submitLink() {
        if (!state.canManage || state.submitting) {
            return;
        }

        var name = String(state.form.name || '').trim();
        var url = String(state.form.url || '').trim();
        var description = String(state.form.description || '').trim();

        if (!name) {
            window.alert(t('useful_links.validation_name'));
            return;
        }
        if (!url) {
            window.alert(t('useful_links.validation_url'));
            return;
        }

        state.submitting = true;
        render();

        var formData = new FormData();
        formData.append('sel_category', state.form.category);
        formData.append('txt_name', name);
        formData.append('txt_url', url);
        formData.append('txt_description', description);

        fetch('/forums/ajax_add_links/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to add link.');
            }
            state.form = {
                category: getCategoryOptions().length ? getCategoryOptions()[0].value : DEFAULT_CATEGORY_META[0].defaultValue,
                name: '',
                url: '',
                description: ''
            };
            return reloadLinks();
        }).catch(function (error) {
            console.error(error);
            window.alert(t('useful_links.load_error'));
        }).finally(function () {
            state.submitting = false;
            render();
        });
    }

    function deleteLink(uuid) {
        if (!state.canManage || !uuid || state.deletingUuid) {
            return;
        }

        if (!window.confirm(t('useful_links.delete_confirm'))) {
            return;
        }

        state.deletingUuid = uuid;
        render();

        var formData = new FormData();
        formData.append('uuid', uuid);

        fetch('/forums/ajax_delete_links/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        }).then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to delete link.');
            }
            return reloadLinks();
        }).catch(function (error) {
            console.error(error);
            window.alert(t('useful_links.load_error'));
        }).finally(function () {
            state.deletingUuid = '';
            render();
        });
    }

    function startLanguageWatcher() {
        if (languageWatcher) {
            return;
        }

        languageWatcher = window.setInterval(function () {
            var nextLang = getLang();
            if (nextLang !== state.lang) {
                state.lang = nextLang;
                applyLangToDocument(nextLang);
                render();
            }
        }, 700);
    }

    function set_main() {
        var pageI18n = getPageI18n();
        if (pageI18n && typeof pageI18n.normalizeCoverage === 'function') {
            pageI18n.normalizeCoverage();
        }

        syncLanguage();
        state.canManage = detectCanManage();
        syncFormCategory();
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
