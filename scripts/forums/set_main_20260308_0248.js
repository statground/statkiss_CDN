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

    for (let i = 0; i < DEFAULT_CATEGORY_META.length; i += 1) {
        CATEGORY_INDEX[DEFAULT_CATEGORY_META[i].key] = i;

        for (let j = 0; j < DEFAULT_CATEGORY_META[i].aliases.length; j += 1) {
            CATEGORY_KEY_BY_NORMALIZED_VALUE[normalizeValue(DEFAULT_CATEGORY_META[i].aliases[j])] = DEFAULT_CATEGORY_META[i].key;
        }
    }

    const state = {
        lang: 'en',
        loading: true,
        loadError: false,
        canManage: false,
        links: [],
        observedCategories: [],
        submitting: false,
        deletingUuid: '',
        form: {
            category: DEFAULT_CATEGORY_META[0].defaultValue,
            name: '',
            url: '',
            description: ''
        }
    };

    let languageWatcher = null;

    function normalizeValue(value) {
        return String(value || '')
            .trim()
            .toLowerCase()
            .replace(/[_\-]+/g, ' ')
            .replace(/\s+/g, ' ');
    }

    function getHeaderI18n() {
        if (window.StatKISS_I18N) {
            return window.StatKISS_I18N;
        }

        return {
            LANG_KEY: 'statkiss_lang',
            t: function (_lang, key) {
                return key;
            },
            getInitialLang: function () {
                return 'en';
            },
            applyLangToDocument: function () {},
            resolveLangCode: function (code) {
                return code || 'en';
            }
        };
    }

    function getPageI18n() {
        if (window.StatKISS_I18N_USEFUL_LINKS) {
            return window.StatKISS_I18N_USEFUL_LINKS;
        }

        return {
            t: function (_lang, key) {
                return key;
            },
            normalizeCoverage: function () {}
        };
    }

    function syncLanguage() {
        const header = getHeaderI18n();
        state.lang = typeof header.getInitialLang === 'function' ? header.getInitialLang() : 'en';

        if (typeof header.applyLangToDocument === 'function') {
            header.applyLangToDocument(state.lang);
        }
    }

    function translateHeader(key) {
        const header = getHeaderI18n();
        return typeof header.t === 'function' ? header.t(state.lang, key) : key;
    }

    function translatePage(key) {
        const page = getPageI18n();
        return typeof page.t === 'function' ? page.t(state.lang, key) : key;
    }

    function resolveCategoryKey(rawValue) {
        const normalized = normalizeValue(rawValue);
        return CATEGORY_KEY_BY_NORMALIZED_VALUE[normalized] || null;
    }

    function localizeCategory(rawValue) {
        const key = resolveCategoryKey(rawValue);
        if (!key) {
            return rawValue || '';
        }
        return translatePage(key);
    }

    function getCategorySortIndex(rawValue) {
        const key = resolveCategoryKey(rawValue);
        if (!key) {
            return 999;
        }
        return CATEGORY_INDEX[key];
    }

    function getCategoryOptions() {
        const observedByKey = {};
        const observedUnknown = [];

        for (let i = 0; i < state.observedCategories.length; i += 1) {
            const rawValue = state.observedCategories[i];
            const key = resolveCategoryKey(rawValue);

            if (key && !observedByKey[key]) {
                observedByKey[key] = rawValue;
            } else if (!key && rawValue) {
                observedUnknown.push(rawValue);
            }
        }

        const options = DEFAULT_CATEGORY_META.map(function (item) {
            return {
                key: item.key,
                value: observedByKey[item.key] || item.defaultValue,
                label: translatePage(item.key)
            };
        });

        observedUnknown.sort();

        for (let i = 0; i < observedUnknown.length; i += 1) {
            options.push({
                key: 'custom:' + observedUnknown[i],
                value: observedUnknown[i],
                label: observedUnknown[i]
            });
        }

        return options;
    }

    function getCookie(name) {
        let cookieValue = null;

        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');

            for (let i = 0; i < cookies.length; i += 1) {
                const cookie = cookies[i].trim();

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }

        return cookieValue;
    }

    function normalizeLinks(payload) {
        const links = [];
        const keys = Object.keys(payload || {});

        for (let i = 0; i < keys.length; i += 1) {
            const item = payload[keys[i]];
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
            const orderA = getCategorySortIndex(a.category);
            const orderB = getCategorySortIndex(b.category);

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            const categoryA = a.category || '';
            const categoryB = b.category || '';
            if (categoryA < categoryB) {
                return -1;
            }
            if (categoryA > categoryB) {
                return 1;
            }

            const titleA = a.title || '';
            const titleB = b.title || '';
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }

            return 0;
        });

        return links;
    }

    function deriveObservedCategories(links) {
        const categoryMap = {};

        for (let i = 0; i < links.length; i += 1) {
            const category = links[i].category || '';
            if (category) {
                categoryMap[category] = true;
            }
        }

        const categories = Object.keys(categoryMap);

        categories.sort(function (a, b) {
            const orderA = getCategorySortIndex(a);
            const orderB = getCategorySortIndex(b);

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        return categories;
    }

    function groupLinks(links) {
        const bucket = {};

        for (let i = 0; i < links.length; i += 1) {
            const category = links[i].category || 'Other';

            if (!bucket[category]) {
                bucket[category] = [];
            }

            bucket[category].push(links[i]);
        }

        const categories = Object.keys(bucket);

        categories.sort(function (a, b) {
            const orderA = getCategorySortIndex(a);
            const orderB = getCategorySortIndex(b);

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        return categories.map(function (category) {
            return {
                category: category,
                items: bucket[category]
            };
        });
    }

    async function fetchLinks() {
        const response = await fetch('/forums/ajax_get_links/');
        if (!response.ok) {
            throw new Error('Failed to fetch useful links.');
        }
        return response.json();
    }

    async function fetchMenuHeader() {
        const response = await fetch('/ajax_get_menu_header/');
        if (!response.ok) {
            throw new Error('Failed to fetch menu header.');
        }
        return response.json();
    }

    function canManage(menuData) {
        if (!menuData || typeof menuData !== 'object') {
            return false;
        }

        const role = menuData.role ? String(menuData.role) : '';
        const officer = menuData.officer ? String(menuData.officer) : '';

        return role === 'Administrator' || role === 'Developer' || (officer !== '' && officer !== 'Member');
    }

    function updateForm(field, value) {
        state.form[field] = value;
        render();
    }

    function resetForm() {
        const options = getCategoryOptions();
        state.form = {
            category: options.length ? options[0].value : DEFAULT_CATEGORY_META[0].defaultValue,
            name: '',
            url: '',
            description: ''
        };
    }

    function syncFormCategory() {
        const options = getCategoryOptions();
        const exists = options.some(function (item) {
            return item.value === state.form.category;
        });

        if (!exists && options.length) {
            state.form.category = options[0].value;
        }
    }

    async function hydrate() {
        state.loading = true;
        state.loadError = false;
        render();

        const results = await Promise.allSettled([
            fetchLinks(),
            fetchMenuHeader()
        ]);

        if (results[0].status !== 'fulfilled') {
            console.error(results[0].reason);
            state.links = [];
            state.observedCategories = [];
            state.canManage = false;
            state.loading = false;
            state.loadError = true;
            syncFormCategory();
            render();
            return;
        }

        state.links = normalizeLinks(results[0].value);
        state.observedCategories = deriveObservedCategories(state.links);
        state.canManage = results[1].status === 'fulfilled' ? canManage(results[1].value) : false;
        state.loading = false;
        state.loadError = false;
        syncFormCategory();

        render();
    }

    async function submitLink() {
        if (state.submitting || !state.canManage) {
            return;
        }

        const name = (state.form.name || '').trim();
        const url = (state.form.url || '').trim();
        const description = (state.form.description || '').trim();

        if (!name) {
            alert(translatePage('useful_links.validation_name'));
            return;
        }

        if (!url) {
            alert(translatePage('useful_links.validation_url'));
            return;
        }

        state.submitting = true;
        render();

        try {
            const inputData = new FormData();
            inputData.append('sel_category', state.form.category);
            inputData.append('txt_name', name);
            inputData.append('txt_url', url);
            inputData.append('txt_description', description);

            const response = await fetch('/forums/ajax_add_links/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: inputData
            });

            if (!response.ok) {
                throw new Error('Failed to add link.');
            }

            resetForm();
            await hydrate();
        } catch (error) {
            console.error(error);
            alert(translatePage('useful_links.load_error'));
        } finally {
            state.submitting = false;
            render();
        }
    }

    async function deleteLink(uuid) {
        if (!uuid || state.deletingUuid) {
            return;
        }

        const checker = window.confirm(translatePage('useful_links.delete_confirm'));
        if (!checker) {
            return;
        }

        state.deletingUuid = uuid;
        render();

        try {
            const inputData = new FormData();
            inputData.append('uuid', uuid);

            const response = await fetch('/forums/ajax_delete_links/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: inputData
            });

            if (!response.ok) {
                throw new Error('Failed to delete link.');
            }

            await hydrate();
        } catch (error) {
            console.error(error);
            alert(translatePage('useful_links.load_error'));
        } finally {
            state.deletingUuid = '';
            render();
        }
    }

    function startLanguageWatcher() {
        if (languageWatcher) {
            return;
        }

        languageWatcher = window.setInterval(function () {
            const header = getHeaderI18n();
            const nextLang = typeof header.getInitialLang === 'function' ? header.getInitialLang() : 'en';

            if (nextLang !== state.lang) {
                state.lang = nextLang;

                if (typeof header.applyLangToDocument === 'function') {
                    header.applyLangToDocument(nextLang);
                }

                render();
            }
        }, 700);
    }

    function ArrowIcon() {
        return (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
        );
    }

    function TrashIcon() {
        return (
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.5 2A1.5 1.5 0 007 3.5V4H4.75a.75.75 0 000 1.5h.638l.58 9.275A2.25 2.25 0 008.213 17h3.574a2.25 2.25 0 002.245-2.225l.58-9.275h.638a.75.75 0 000-1.5H13v-.5A1.5 1.5 0 0011.5 2h-3zm3 2v-.5h-3V4h3zM8.75 8a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8zm3 0a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8z" clipRule="evenodd"></path>
            </svg>
        );
    }

    function SpinnerIcon() {
        return (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path>
            </svg>
        );
    }

    function SectionHeader() {
        return (
            <div className="mx-auto max-w-screen-lg text-center">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                    {translateHeader('nav.useful_links')}
                </h2>

                <p className="mb-10 text-gray-500 lg:text-lg sm:px-16 xl:px-24">
                    {translatePage('useful_links.description')}
                </p>
            </div>
        );
    }

    function ErrorBanner() {
        return (
            <div className="mx-auto mb-8 max-w-screen-lg rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {translatePage('useful_links.load_error')}
            </div>
        );
    }

    function AdminPanel() {
        if (!state.canManage) {
            return null;
        }

        const options = getCategoryOptions();

        return (
            <div className="mx-auto mb-10 max-w-screen-lg rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                    <h3 className="text-xl font-bold text-gray-900">
                        {translatePage('useful_links.manage_title')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {translatePage('useful_links.manage_body')}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            {translatePage('useful_links.category')}
                        </label>
                        <select
                            id="sel_category"
                            value={state.form.category}
                            onChange={function (event) { updateForm('category', event.target.value); }}
                            className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            {options.map(function (item) {
                                return (
                                    <option key={item.key} value={item.value}>
                                        {item.label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            {translatePage('useful_links.name')}
                        </label>
                        <input
                            id="txt_name"
                            type="text"
                            value={state.form.name}
                            onChange={function (event) { updateForm('name', event.target.value); }}
                            placeholder={translatePage('useful_links.name')}
                            className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            {translatePage('useful_links.url')}
                        </label>
                        <input
                            id="txt_url"
                            type="text"
                            value={state.form.url}
                            onChange={function (event) { updateForm('url', event.target.value); }}
                            placeholder="https://www.statkiss.org"
                            className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            {translatePage('useful_links.item_description')}
                        </label>
                        <textarea
                            id="txt_description"
                            rows="3"
                            value={state.form.description}
                            onChange={function (event) { updateForm('description', event.target.value); }}
                            placeholder={translatePage('useful_links.item_description')}
                            className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-5 flex justify-end">
                    <button
                        type="button"
                        onClick={submitLink}
                        disabled={state.submitting}
                        className="inline-flex items-center rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {state.submitting ? translatePage('useful_links.submitting') : translatePage('useful_links.submit')}
                    </button>
                </div>
            </div>
        );
    }

    function LinkPanelSkeleton() {
        const rows = [1, 2, 3];

        return (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50 px-6 py-5">
                    <div className="h-5 w-40 rounded bg-gray-200"></div>
                </div>

                <div className="divide-y divide-gray-100">
                    {rows.map(function (row) {
                        return (
                            <div key={row} className="px-6 py-5">
                                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                                <div className="mt-3 h-3 w-5/6 rounded bg-gray-100"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function LoadingPanels() {
        return (
            <div className="grid gap-6 lg:grid-cols-2 animate-pulse">
                <LinkPanelSkeleton />
                <LinkPanelSkeleton />
                <LinkPanelSkeleton />
                <LinkPanelSkeleton />
            </div>
        );
    }

    function EmptyState() {
        return (
            <div className="mx-auto max-w-screen-md rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-12 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">
                    {translatePage('useful_links.empty_title')}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                    {translatePage('useful_links.empty_body')}
                </p>
            </div>
        );
    }

    function CategoryPanel(props) {
        return (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="flex items-center justify-between border-b border-gray-100 bg-slate-50 px-6 py-5">
                    <h3 className="text-lg font-bold text-gray-900">
                        {localizeCategory(props.group.category)}
                    </h3>
                    <span className="inline-flex min-w-[2rem] items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-gray-200">
                        {props.group.items.length}
                    </span>
                </div>

                <div className="divide-y divide-gray-100">
                    {props.group.items.map(function (item) {
                        return (
                            <div key={item.uuid} className="group flex items-start gap-3 px-6 py-5 transition hover:bg-gray-50">
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="min-w-0 flex-1"
                                    aria-label={translatePage('useful_links.open_external')}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-base font-semibold text-gray-900 transition group-hover:text-blue-700">
                                                {item.title}
                                            </p>

                                            {item.description ? (
                                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                                    {item.description}
                                                </p>
                                            ) : null}
                                        </div>

                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition group-hover:border-gray-900 group-hover:text-gray-900">
                                            <ArrowIcon />
                                        </span>
                                    </div>
                                </a>

                                {state.canManage ? (
                                    <button
                                        type="button"
                                        onClick={function () { deleteLink(item.uuid); }}
                                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-transparent text-gray-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                                        aria-label={translatePage('useful_links.delete')}
                                        title={translatePage('useful_links.delete')}
                                    >
                                        {state.deletingUuid === item.uuid ? <SpinnerIcon /> : <TrashIcon />}
                                    </button>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function LinkPanels() {
        if (state.loading) {
            return <LoadingPanels />;
        }

        if (!state.links.length) {
            return <EmptyState />;
        }

        const groups = groupLinks(state.links);

        return (
            <div className="grid gap-6 lg:grid-cols-2">
                {groups.map(function (group) {
                    return (
                        <CategoryPanel
                            key={group.category}
                            group={group}
                        />
                    );
                })}
            </div>
        );
    }

    function Page() {
        return (
            <div className="mx-auto max-w-screen-xl px-6 py-16 lg:px-6">
                <SectionHeader />
                <AdminPanel />
                {state.loadError ? <ErrorBanner /> : null}
                <LinkPanels />
            </div>
        );
    }

    function render() {
        const root = document.getElementById('div_main');
        if (!root) {
            return;
        }

        ReactDOM.render(<Page />, root);
    }

    function init() {
        const pageI18n = getPageI18n();

        if (typeof pageI18n.normalizeCoverage === 'function') {
            pageI18n.normalizeCoverage();
        }

        syncLanguage();
        syncFormCategory();
        startLanguageWatcher();
        hydrate();
    }

    window.StatKISSUsefulLinksPage = {
        init: init,
        reload: hydrate
    };
})();