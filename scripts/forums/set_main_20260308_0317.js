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
            .replace(/[_\-]+/g, ' ')
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

        links.sort(function (a, b) {
            var orderA = getCategorySortIndex(a.category);
            var orderB = getCategorySortIndex(b.category);

            if (orderA !== orderB) {
                return orderA - orderB;
            }
            if ((a.category || '') !== (b.category || '')) {
                return String(a.category || '').localeCompare(String(b.category || ''));
            }
            return String(a.title || '').localeCompare(String(b.title || ''));
        });

        return links;
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

    function groupLinks() {
        var bucket = {};
        var categories = [];
        var i;

        for (i = 0; i < state.links.length; i += 1) {
            var category = state.links[i].category || 'Other';
            if (!bucket[category]) {
                bucket[category] = [];
                categories.push(category);
            }
            bucket[category].push(state.links[i]);
        }

        categories.sort(function (a, b) {
            var orderA = getCategorySortIndex(a);
            var orderB = getCategorySortIndex(b);
            if (orderA !== orderB) {
                return orderA - orderB;
            }
            return a.localeCompare(b);
        });

        var groups = [];
        for (i = 0; i < categories.length; i += 1) {
            groups.push({
                category: categories[i],
                items: bucket[categories[i]]
            });
        }
        return groups;
    }

    function buildHeaderHtml() {
        return [
            '<div class="mx-auto max-w-screen-lg text-center">',
                '<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">', escapeHtml(tTitle()), '</h2>',
                '<p class="mb-10 text-gray-500 lg:text-lg sm:px-16 xl:px-24">', escapeHtml(t('useful_links.description')), '</p>',
            '</div>'
        ].join('');
    }

    function buildErrorHtml() {
        if (!state.loadError) {
            return '';
        }
        return '<div class="mx-auto mb-8 max-w-screen-lg rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">' + escapeHtml(t('useful_links.load_error')) + '</div>';
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
                        '<label class="mb-2 block text-sm font-medium text-gray-700">', escapeHtml(t('useful_links.category')), '</label>',
                        '<select id="sel_category" class="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">',
                            optionHtml,
                        '</select>',
                    '</div>',
                    '<div>',
                        '<label class="mb-2 block text-sm font-medium text-gray-700">', escapeHtml(t('useful_links.name')), '</label>',
                        '<input id="txt_name" type="text" value="', escapeHtml(state.form.name), '" placeholder="', escapeHtml(t('useful_links.name')), '" class="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">',
                    '</div>',
                    '<div class="md:col-span-2">',
                        '<label class="mb-2 block text-sm font-medium text-gray-700">', escapeHtml(t('useful_links.url')), '</label>',
                        '<input id="txt_url" type="text" value="', escapeHtml(state.form.url), '" placeholder="https://www.statkiss.org" class="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">',
                    '</div>',
                    '<div class="md:col-span-2">',
                        '<label class="mb-2 block text-sm font-medium text-gray-700">', escapeHtml(t('useful_links.item_description')), '</label>',
                        '<textarea id="txt_description" rows="3" placeholder="', escapeHtml(t('useful_links.item_description')), '" class="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">', escapeHtml(state.form.description), '</textarea>',
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
        var panel = [
            '<div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">',
                '<div class="border-b border-gray-100 bg-gray-50 px-6 py-5"><div class="h-5 w-40 rounded bg-gray-200"></div></div>',
                '<div class="divide-y divide-gray-100">',
                    '<div class="px-6 py-5"><div class="h-4 w-2/3 rounded bg-gray-200"></div><div class="mt-3 h-3 w-5/6 rounded bg-gray-100"></div></div>',
                    '<div class="px-6 py-5"><div class="h-4 w-2/3 rounded bg-gray-200"></div><div class="mt-3 h-3 w-5/6 rounded bg-gray-100"></div></div>',
                    '<div class="px-6 py-5"><div class="h-4 w-2/3 rounded bg-gray-200"></div><div class="mt-3 h-3 w-5/6 rounded bg-gray-100"></div></div>',
                '</div>',
            '</div>'
        ].join('');

        return '<div class="grid gap-6 lg:grid-cols-2 animate-pulse">' + panel + panel + panel + panel + '</div>';
    }

    function buildEmptyHtml() {
        return [
            '<div class="mx-auto max-w-screen-md rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-12 text-center shadow-sm">',
                '<h3 class="text-xl font-bold text-gray-900">', escapeHtml(t('useful_links.empty_title')), '</h3>',
                '<p class="mt-3 text-sm leading-6 text-gray-500">', escapeHtml(t('useful_links.empty_body')), '</p>',
            '</div>'
        ].join('');
    }

    function buildPanelsHtml() {
        if (state.loading) {
            return buildLoadingHtml();
        }
        if (!state.links.length) {
            return buildEmptyHtml();
        }

        var groups = groupLinks();
        var html = '<div class="grid gap-6 lg:grid-cols-2">';

        for (var i = 0; i < groups.length; i += 1) {
            html += '<div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">';
            html += '<div class="flex items-center justify-between border-b border-gray-100 bg-slate-50 px-6 py-5">';
            html += '<h3 class="text-lg font-bold text-gray-900">' + escapeHtml(localizeCategory(groups[i].category)) + '</h3>';
            html += '<span class="inline-flex min-w-[2rem] items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-gray-200">' + groups[i].items.length + '</span>';
            html += '</div>';
            html += '<div class="divide-y divide-gray-100">';

            for (var j = 0; j < groups[i].items.length; j += 1) {
                var item = groups[i].items[j];
                html += '<div class="group flex items-start gap-3 px-6 py-5 transition hover:bg-gray-50">';
                html += '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="noreferrer noopener" class="min-w-0 flex-1" aria-label="' + escapeHtml(t('useful_links.open_external')) + '">';
                html += '<div class="flex items-start justify-between gap-4">';
                html += '<div class="min-w-0">';
                html += '<p class="text-base font-semibold text-gray-900 transition group-hover:text-blue-700">' + escapeHtml(item.title) + '</p>';
                if (item.description) {
                    html += '<p class="mt-2 text-sm leading-6 text-gray-500">' + escapeHtml(item.description) + '</p>';
                }
                html += '</div>';
                html += '<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition group-hover:border-gray-900 group-hover:text-gray-900">';
                html += '<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>';
                html += '</span>';
                html += '</div>';
                html += '</a>';

                if (state.canManage) {
                    html += '<button type="button" data-action="delete-link" data-uuid="' + escapeHtml(item.uuid) + '" class="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent text-gray-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600" aria-label="' + escapeHtml(t('useful_links.delete')) + '" title="' + escapeHtml(t('useful_links.delete')) + '">';
                    if (state.deletingUuid === item.uuid) {
                        html += '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>';
                    } else {
                        html += '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.5 2A1.5 1.5 0 007 3.5V4H4.75a.75.75 0 000 1.5h.638l.58 9.275A2.25 2.25 0 008.213 17h3.574a2.25 2.25 0 002.245-2.225l.58-9.275h.638a.75.75 0 000-1.5H13v-.5A1.5 1.5 0 0011.5 2h-3zm3 2v-.5h-3V4h3zM8.75 8a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8zm3 0a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8z" clip-rule="evenodd"></path></svg>';
                    }
                    html += '</button>';
                }

                html += '</div>';
            }

            html += '</div></div>';
        }

        html += '</div>';
        return html;
    }

    function buildPageHtml() {
        return '<div class="mx-auto max-w-screen-xl px-6 py-16 lg:px-6">' +
            buildHeaderHtml() +
            buildAdminHtml() +
            buildErrorHtml() +
            buildPanelsHtml() +
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