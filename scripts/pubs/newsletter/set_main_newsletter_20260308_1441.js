(function () {
    'use strict';

    const RANGE_STEP = 5;

    const state = {
        initialized: false,
        lang: 'en',
        loading: true,
        loadError: false,
        items: [],
        activeRange: null,
        hasUserSelectedRange: false,
        searchQuery: '',
        canManage: false,
        uploading: false,
        submitting: false,
        deletingUuid: '',
        form: {
            publish_date: '',
            volume: '',
            issue: ''
        },
        file: null
    };

    let rootHandlersBound = false;
    let languageWatcher = null;
    let themeWatcher = null;
    let themeObserver = null;
    let bodyThemeObserver = null;
    let lastDarkMode = null;

    function getRoot() {
        return document.getElementById('div_main');
    }

    function getHeaderI18n() {
        return window.StatKISS_I18N || null;
    }

    function getPageI18n() {
        return window.StatKISS_I18N_NEWSLETTER || window.StatKISS_I18N_PUBS_NEWSLETTER || null;
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
            const translated = header.t(state.lang, 'nav.newsletter');
            if (translated && translated !== 'nav.newsletter') {
                return translated;
            }
        }
        return t('newsletter.title');
    }

    function isDarkMode() {
        const root = document.documentElement;
        const body = document.body;
        const rootClass = root ? (root.className || '') : '';
        const bodyClass = body ? (body.className || '') : '';
        const rootTheme = root ? (root.getAttribute('data-theme') || '') : '';
        const bodyTheme = body ? (body.getAttribute('data-theme') || '') : '';

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
            const nextDarkMode = isDarkMode();
            if (nextDarkMode !== lastDarkMode) {
                lastDarkMode = nextDarkMode;
                renderPage();
            }
        }

        themeWatcher = window.setInterval(handleThemeChange, 500);

        if (window.MutationObserver) {
            themeObserver = new MutationObserver(handleThemeChange);
            if (document.documentElement) {
                themeObserver.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'style']
                });
            }
            if (document.body) {
                bodyThemeObserver = new MutationObserver(handleThemeChange);
                bodyThemeObserver.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'style']
                });
            }
        }

        try {
            if (window.matchMedia) {
                const media = window.matchMedia('(prefers-color-scheme: dark)');
                if (media && typeof media.addEventListener === 'function') {
                    media.addEventListener('change', handleThemeChange);
                } else if (media && typeof media.addListener === 'function') {
                    media.addListener(handleThemeChange);
                }
            }
        } catch (error) {}
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
                renderPage();
            }
        }, 700);
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
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

    function normalizeNewsletters(payload) {
        let rawList = [];

        if (Array.isArray(payload)) {
            rawList = payload;
        } else if (payload && Array.isArray(payload.list)) {
            rawList = payload.list;
        } else if (payload && Array.isArray(payload.all)) {
            rawList = payload.all;
        } else if (payload && typeof payload === 'object') {
            rawList = Object.values(payload);
        }

        return rawList
            .map(function (item, index) {
                const publishDate = item && item.publish_date != null ? String(item.publish_date) : '';
                const yearMatch = publishDate.match(/(19|20)\d{2}/);
                const year = yearMatch ? parseInt(yearMatch[0], 10) : null;

                return {
                    uuid: item && item.uuid ? String(item.uuid) : '',
                    publish_date: publishDate,
                    volume: item && item.volume != null ? String(item.volume) : '',
                    issue: item && item.issue != null ? String(item.issue) : '',
                    url_file: item && item.url_file ? String(item.url_file) : '',
                    year: year,
                    index: index,
                    sort_key: getDateSortKey(publishDate)
                };
            })
            .filter(function (item) {
                return item.year !== null;
            })
            .sort(function (a, b) {
                if (a.sort_key !== b.sort_key) {
                    return b.sort_key.localeCompare(a.sort_key);
                }
                if (a.volume !== b.volume) {
                    return String(b.volume).localeCompare(String(a.volume), undefined, { numeric: true, sensitivity: 'base' });
                }
                if (a.issue !== b.issue) {
                    return String(b.issue).localeCompare(String(a.issue), undefined, { numeric: true, sensitivity: 'base' });
                }
                return a.index - b.index;
            });
    }

    function getDateSortKey(publishDate) {
        const raw = String(publishDate || '').trim();

        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
            return raw;
        }

        const match = raw.match(/(19|20)\d{2}/);
        if (match) {
            return match[0] + '-00-00';
        }

        return raw;
    }

    function get5YearRanges(items) {
        if (!items || !items.length) {
            return [];
        }

        const years = Array.from(new Set(
            items
                .map(function (item) { return item.year; })
                .filter(Boolean)
        )).sort(function (a, b) { return b - a; });

        if (!years.length) {
            return [];
        }

        const minYear = years[years.length - 1];
        const maxYear = years[0];
        const ranges = [];

        for (let year = maxYear; year >= minYear; year -= RANGE_STEP) {
            ranges.push({
                from: year,
                to: year - (RANGE_STEP - 1)
            });
        }

        return ranges;
    }

    function ensureActiveRange() {
        const ranges = get5YearRanges(state.items);

        if (!ranges.length) {
            state.activeRange = null;
            return;
        }

        if (!state.hasUserSelectedRange && state.activeRange === null) {
            state.activeRange = ranges[0];
            return;
        }

        if (state.activeRange === null) {
            return;
        }

        const exists = ranges.some(function (range) {
            return range.from === state.activeRange.from && range.to === state.activeRange.to;
        });

        if (!exists) {
            state.activeRange = ranges[0];
        }
    }

    function getVisibleNewsletters() {
        let list = state.items.slice();

        if (state.activeRange) {
            list = list.filter(function (item) {
                return item.year <= state.activeRange.from && item.year >= state.activeRange.to;
            });
        }

        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            list = list.filter(function (item) {
                return [
                    item.publish_date,
                    item.volume,
                    item.issue,
                    item.year
                ].join(' ').toLowerCase().includes(query);
            });
        }

        return list;
    }

    function getGroupedByYear(items) {
        const groups = {};
        items.forEach(function (item) {
            if (!groups[item.year]) {
                groups[item.year] = [];
            }
            groups[item.year].push(item);
        });
        return groups;
    }

    function resolveFileUrl(rawUrl) {
        const value = String(rawUrl || '').trim();

        if (!value) {
            return '#';
        }
        if (/^https?:\/\//i.test(value) || /^\/\//.test(value)) {
            return value;
        }
        if (value.charAt(0) === '/') {
            return value;
        }
        return '/' + value;
    }

    function getAccent(index) {
        const tones = [
            {
                line: 'from-sky-400 via-blue-500 to-indigo-500',
                badge: isDarkMode() ? 'border-blue-400/30 bg-blue-500/10 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-700',
                icon: isDarkMode() ? 'from-sky-400 via-blue-500 to-indigo-500 shadow-blue-500/20' : 'from-sky-400 via-blue-500 to-indigo-500 shadow-blue-500/30'
            },
            {
                line: 'from-emerald-400 via-teal-500 to-cyan-500',
                badge: isDarkMode() ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700',
                icon: isDarkMode() ? 'from-emerald-400 via-teal-500 to-cyan-500 shadow-emerald-500/20' : 'from-emerald-400 via-teal-500 to-cyan-500 shadow-emerald-500/30'
            },
            {
                line: 'from-fuchsia-400 via-violet-500 to-purple-500',
                badge: isDarkMode() ? 'border-violet-400/30 bg-violet-500/10 text-violet-200' : 'border-violet-200 bg-violet-50 text-violet-700',
                icon: isDarkMode() ? 'from-fuchsia-400 via-violet-500 to-purple-500 shadow-violet-500/20' : 'from-fuchsia-400 via-violet-500 to-purple-500 shadow-violet-500/30'
            },
            {
                line: 'from-amber-400 via-orange-500 to-rose-500',
                badge: isDarkMode() ? 'border-orange-400/30 bg-orange-500/10 text-orange-200' : 'border-orange-200 bg-orange-50 text-orange-700',
                icon: isDarkMode() ? 'from-amber-400 via-orange-500 to-rose-500 shadow-orange-500/20' : 'from-amber-400 via-orange-500 to-rose-500 shadow-orange-500/30'
            }
        ];

        return tones[index % tones.length];
    }

    function formatIssueCount(count) {
        const unit = count === 1 ? t('newsletter.issue_singular') : t('newsletter.issue_plural');
        return count + ' ' + unit;
    }

    function formatMeta(item) {
        const parts = [];
        if (item.volume) {
            parts.push(t('newsletter.volume') + ' ' + escapeHtml(item.volume));
        }
        if (item.issue) {
            parts.push(t('newsletter.issue') + ' ' + escapeHtml(item.issue));
        }
        return parts.join(' · ');
    }

    function buildErrorHtml() {
        if (!state.loadError) {
            return '';
        }

        return '<div class="' +
            (isDarkMode()
                ? 'mb-6 rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200'
                : 'mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
            ) +
            '">' + escapeHtml(t('newsletter.load_error')) + '</div>';
    }

    function buildHeroHtml() {
        const dark = isDarkMode();

        return '' +
            '<section class="relative overflow-hidden rounded-[2.5rem] border ' + (dark ? 'border-slate-800 bg-[#020b2b]' : 'border-slate-200 bg-slate-50') + '">' +
                '<div class="absolute inset-0">' +
                    '<div class="absolute -left-10 top-0 h-56 w-56 rounded-full ' + (dark ? 'bg-blue-500/10' : 'bg-blue-200/40') + ' blur-3xl"></div>' +
                    '<div class="absolute right-0 top-10 h-64 w-64 rounded-full ' + (dark ? 'bg-cyan-400/10' : 'bg-cyan-200/50') + ' blur-3xl"></div>' +
                    '<div class="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full ' + (dark ? 'bg-violet-500/10' : 'bg-violet-200/40') + ' blur-3xl"></div>' +
                '</div>' +
                '<div class="relative mx-auto max-w-screen-lg px-6 py-14 text-center sm:px-10 sm:py-20">' +
                    '<span class="inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ' + (dark ? 'border-blue-400/20 bg-blue-400/10 text-blue-200' : 'border-blue-200 bg-white text-blue-700') + '">' +
                        escapeHtml(t('newsletter.badge')) +
                    '</span>' +
                    '<h2 class="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl ' + (dark ? 'text-white' : 'text-slate-900') + '">' +
                        escapeHtml(tTitle()) +
                    '</h2>' +
                    '<p class="mx-auto mt-5 max-w-4xl text-base leading-8 sm:text-lg ' + (dark ? 'text-slate-200' : 'text-slate-600') + '">' +
                        escapeHtml(t('newsletter.description')) +
                    '</p>' +
                '</div>' +
            '</section>';
    }

    function buildAdminHtml() {
        if (!state.canManage) {
            return '';
        }

        const dark = isDarkMode();
        const fileName = state.file && state.file.origin_file_name
            ? state.file.origin_file_name
            : t('newsletter.no_file_selected');

        const fileStatus = state.uploading
            ? t('newsletter.uploading')
            : (state.file && state.file.uuid ? t('newsletter.file_ready') : '');

        const uploadButtonLabel = state.uploading ? t('newsletter.uploading') : t('newsletter.file_upload');
        const submitButtonLabel = state.submitting ? t('newsletter.submitting') : t('newsletter.submit');

        return '' +
            '<section class="mt-8 rounded-[2rem] border p-6 shadow-sm sm:p-8 ' + (dark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white') + '">' +
                '<div class="flex flex-col gap-6">' +
                    '<div>' +
                        '<h3 class="text-2xl font-bold ' + (dark ? 'text-white' : 'text-slate-900') + '">' + escapeHtml(t('newsletter.manage_title')) + '</h3>' +
                        '<p class="mt-3 max-w-3xl text-sm leading-7 ' + (dark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(t('newsletter.manage_body')) + '</p>' +
                    '</div>' +
                    '<div class="grid gap-4 md:grid-cols-3">' +
                        '<div>' +
                            '<label for="newsletter_publish_date" class="mb-2 block text-sm font-medium ' + (dark ? 'text-slate-200' : 'text-slate-700') + '">' + escapeHtml(t('newsletter.publish_date')) + '</label>' +
                            '<input id="newsletter_publish_date" type="date" value="' + escapeHtml(state.form.publish_date) + '" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ' + (dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200') + '">' +
                        '</div>' +
                        '<div>' +
                            '<label for="newsletter_volume" class="mb-2 block text-sm font-medium ' + (dark ? 'text-slate-200' : 'text-slate-700') + '">' + escapeHtml(t('newsletter.volume')) + '</label>' +
                            '<input id="newsletter_volume" type="number" min="1" value="' + escapeHtml(state.form.volume) + '" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ' + (dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200') + '">' +
                        '</div>' +
                        '<div>' +
                            '<label for="newsletter_issue" class="mb-2 block text-sm font-medium ' + (dark ? 'text-slate-200' : 'text-slate-700') + '">' + escapeHtml(t('newsletter.issue')) + '</label>' +
                            '<input id="newsletter_issue" type="number" min="1" value="' + escapeHtml(state.form.issue) + '" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ' + (dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200') + '">' +
                        '</div>' +
                    '</div>' +
                    '<div class="flex flex-col gap-4 rounded-[1.5rem] border px-4 py-4 sm:flex-row sm:items-center sm:justify-between ' + (dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50') + '">' +
                        '<div class="min-w-0">' +
                            '<p class="text-xs font-semibold uppercase tracking-[0.22em] ' + (dark ? 'text-slate-400' : 'text-slate-500') + '">' + escapeHtml(t('newsletter.selected_file')) + '</p>' +
                            '<div class="mt-2 flex flex-wrap items-center gap-3">' +
                                '<p class="max-w-xl truncate text-sm font-medium ' + (dark ? 'text-white' : 'text-slate-900') + '">' + escapeHtml(fileName) + '</p>' +
                                (fileStatus ? '<span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ' + (dark ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700') + '">' + escapeHtml(fileStatus) + '</span>' : '') +
                            '</div>' +
                        '</div>' +
                        '<div class="flex flex-col gap-3 sm:flex-row">' +
                            '<button type="button" data-action="pick-file" class="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition ' + (dark ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800') + '"' + (state.uploading ? ' disabled' : '') + '>' +
                                '<span class="mr-2">📤</span>' + escapeHtml(uploadButtonLabel) +
                            '</button>' +
                            '<button type="button" data-action="submit-newsletter" class="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"' + ((state.submitting || state.uploading) ? ' disabled' : '') + '>' +
                                (state.submitting
                                    ? '<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>'
                                    : ''
                                ) +
                                escapeHtml(submitButtonLabel) +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                    '<input id="id_newsletter_file_upload" type="file" accept=".pdf,application/pdf" class="hidden">' +
                '</div>' +
            '</section>';
    }

    function buildArchiveShellHtml() {
        const dark = isDarkMode();

        return '' +
            '<section class="mt-8 overflow-hidden rounded-[2rem] border shadow-sm ' + (dark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white') + '">' +
                '<div class="border-b px-6 py-5 sm:px-8 ' + (dark ? 'border-slate-800' : 'border-slate-200') + '">' +
                    '<div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">' +
                        '<div>' +
                            '<p class="text-xs font-semibold uppercase tracking-[0.22em] ' + (dark ? 'text-slate-400' : 'text-slate-500') + '">' + escapeHtml(t('newsletter.filter_label')) + '</p>' +
                            '<div id="yearFilters" class="mt-3 flex flex-wrap gap-2"></div>' +
                        '</div>' +
                        '<div class="xl:min-w-[320px]">' +
                            '<div class="relative">' +
                                '<span class="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm ' + (dark ? 'text-slate-500' : 'text-slate-400') + '">🔎</span>' +
                                '<input id="newsletter_search" type="text" value="' + escapeHtml(state.searchQuery) + '" placeholder="' + escapeHtml(t('newsletter.search_placeholder')) + '" class="block h-12 w-full rounded-full border pl-11 pr-4 text-sm outline-none transition ' + (dark ? 'border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200') + '">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div id="archiveContainer" class="p-6 sm:p-8"></div>' +
            '</section>';
    }

    function buildPageHtml() {
        return '' +
            '<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">' +
                buildHeroHtml() +
                buildAdminHtml() +
                buildErrorHtml() +
                buildArchiveShellHtml() +
            '</div>';
    }

    function buildLoadingHtml() {
        const dark = isDarkMode();
        const card = '' +
            '<div class="overflow-hidden rounded-[1.75rem] border p-5 ' + (dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50') + '">' +
                '<div class="h-1.5 w-full rounded-full ' + (dark ? 'bg-slate-800' : 'bg-slate-200') + '"></div>' +
                '<div class="mt-5 h-4 w-24 rounded ' + (dark ? 'bg-slate-800' : 'bg-slate-200') + '"></div>' +
                '<div class="mt-4 h-7 w-40 rounded ' + (dark ? 'bg-slate-700' : 'bg-slate-300') + '"></div>' +
                '<div class="mt-3 h-4 w-32 rounded ' + (dark ? 'bg-slate-800' : 'bg-slate-200') + '"></div>' +
                '<div class="mt-8 flex items-center justify-between">' +
                    '<div class="h-4 w-12 rounded ' + (dark ? 'bg-slate-800' : 'bg-slate-200') + '"></div>' +
                    '<div class="h-12 w-12 rounded-full ' + (dark ? 'bg-slate-700' : 'bg-slate-300') + '"></div>' +
                '</div>' +
            '</div>';

        return '<div class="grid animate-pulse gap-4 md:grid-cols-2 xl:grid-cols-3">' +
            card + card + card + card + card + card +
        '</div>';
    }

    function buildEmptyHtml() {
        const dark = isDarkMode();
        return '' +
            '<div class="rounded-[1.75rem] border border-dashed px-6 py-12 text-center ' + (dark ? 'border-slate-700 bg-slate-950/40' : 'border-slate-300 bg-slate-50') + '">' +
                '<h3 class="text-xl font-bold ' + (dark ? 'text-white' : 'text-slate-900') + '">' + escapeHtml(t('newsletter.empty_title')) + '</h3>' +
                '<p class="mx-auto mt-3 max-w-2xl text-sm leading-7 ' + (dark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(t('newsletter.empty_body')) + '</p>' +
            '</div>';
    }

    function buildYearSectionHtml(year, items, yearIndex) {
        const dark = isDarkMode();
        const tone = getAccent(yearIndex);

        const cards = items.map(function (item, itemIndex) {
            const fileUrl = resolveFileUrl(item.url_file);
            const accent = getAccent(itemIndex + yearIndex);

            return '' +
                '<article class="group relative overflow-hidden rounded-[1.75rem] border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ' + (dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-white') + '">' +
                    '<div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ' + accent.line + '"></div>' +
                    '<div class="flex h-full min-h-[220px] flex-col">' +
                        '<div class="flex items-start justify-between gap-4">' +
                            '<div>' +
                                '<p class="text-xs font-semibold uppercase tracking-[0.22em] ' + (dark ? 'text-slate-400' : 'text-slate-500') + '">' + escapeHtml(item.publish_date) + '</p>' +
                                '<h3 class="mt-3 text-xl font-bold tracking-tight ' + (dark ? 'text-white' : 'text-slate-900') + '">' + escapeHtml(formatMeta(item) || item.publish_date) + '</h3>' +
                                '<p class="mt-3 text-sm leading-6 ' + (dark ? 'text-slate-300' : 'text-slate-600') + '">' + escapeHtml(item.publish_date) + '</p>' +
                            '</div>' +
                            '<span class="inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ' + accent.badge + '">' + escapeHtml(t('newsletter.pdf')) + '</span>' +
                        '</div>' +
                        '<div class="mt-auto flex items-center justify-between gap-3 pt-8">' +
                            '<a href="' + escapeHtml(fileUrl) + '" target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 text-sm font-semibold ' + (dark ? 'text-slate-200 hover:text-white' : 'text-slate-700 hover:text-slate-900') + '">' +
                                '<span class="text-base">📄</span>' +
                                '<span>' + escapeHtml(t('newsletter.open_pdf')) + '</span>' +
                            '</a>' +
                            '<div class="flex items-center gap-2">' +
                                (state.canManage
                                    ? '<button type="button" data-action="delete-newsletter" data-uuid="' + escapeHtml(item.uuid) + '" class="inline-flex h-10 w-10 items-center justify-center rounded-full border transition ' + (dark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-red-500/40 hover:bg-red-950/30 hover:text-red-300' : 'border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600') + '" aria-label="' + escapeHtml(t('newsletter.delete')) + '" title="' + escapeHtml(t('newsletter.delete')) + '">' +
                                        (state.deletingUuid === item.uuid
                                            ? '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>'
                                            : '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.5 2A1.5 1.5 0 007 3.5V4H4.75a.75.75 0 000 1.5h.638l.58 9.275A2.25 2.25 0 008.213 17h3.574a2.25 2.25 0 002.245-2.225l.58-9.275h.638a.75.75 0 000-1.5H13v-.5A1.5 1.5 0 0011.5 2h-3zm3 2v-.5h-3V4h3zM8.75 8a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8zm3 0a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8z" clip-rule="evenodd"></path></svg>'
                                        ) +
                                    '</button>'
                                    : ''
                                ) +
                                '<a href="' + escapeHtml(fileUrl) + '" target="_blank" rel="noreferrer noopener" class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-lg transition hover:scale-[1.03] hover:opacity-95 ' + accent.icon + '" aria-label="' + escapeHtml(t('newsletter.open_pdf')) + '">' +
                                    '<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</article>';
        }).join('');

        return '' +
            '<section class="space-y-5">' +
                '<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">' +
                    '<div>' +
                        '<h3 class="text-2xl font-bold ' + (dark ? 'text-white' : 'text-slate-900') + '">' + escapeHtml(year) + '</h3>' +
                        '<div class="mt-2 h-1 w-20 rounded-full bg-gradient-to-r ' + tone.line + '"></div>' +
                    '</div>' +
                    '<span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ' + tone.badge + '">' + escapeHtml(formatIssueCount(items.length)) + '</span>' +
                '</div>' +
                '<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">' + cards + '</div>' +
            '</section>';
    }

    function renderYearFilters() {
        const box = document.getElementById('yearFilters');
        if (!box) {
            return;
        }

        const dark = isDarkMode();
        const ranges = get5YearRanges(state.items);
        const allActive = state.activeRange === null;
        let html = '';

        html += '<button type="button" data-action="set-range" data-range="all" class="rounded-full border px-4 py-2 text-xs font-semibold transition ' +
            (allActive
                ? 'border-blue-600 bg-blue-600 text-white'
                : (dark ? 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300')
            ) +
        '">' + escapeHtml(t('newsletter.all')) + '</button>';

        ranges.forEach(function (range) {
            const isActive = state.activeRange && state.activeRange.from === range.from && state.activeRange.to === range.to;

            html += '<button type="button" data-action="set-range" data-from="' + escapeHtml(range.from) + '" data-to="' + escapeHtml(range.to) + '" class="rounded-full border px-4 py-2 text-xs font-semibold transition ' +
                (isActive
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : (dark ? 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300')
                ) +
            '">' + escapeHtml(range.from + '–' + range.to) + '</button>';
        });

        box.innerHTML = html;
    }

    function renderNewsletterList() {
        const container = document.getElementById('archiveContainer');
        if (!container) {
            return;
        }

        if (state.loading) {
            container.innerHTML = buildLoadingHtml();
            return;
        }

        const visible = getVisibleNewsletters();

        if (!visible.length) {
            container.innerHTML = buildEmptyHtml();
            return;
        }

        const grouped = getGroupedByYear(visible);
        const years = Object.keys(grouped)
            .map(function (year) { return parseInt(year, 10); })
            .sort(function (a, b) { return b - a; });

        container.innerHTML = years.map(function (year, index) {
            return buildYearSectionHtml(year, grouped[year], index);
        }).join('<div class="h-8"></div>');
    }

    function renderPage() {
        const root = getRoot();
        if (!root) {
            return;
        }

        root.innerHTML = buildPageHtml();
        renderYearFilters();
        renderNewsletterList();
    }

    async function detectCanManage() {
        try {
            const response = await fetch('/ajax_get_menu_header/', {
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch menu header.');
            }

            const data = await response.json();
            const username = typeof window.gv_username === 'string' ? window.gv_username : '';
            state.canManage = !!username && (
                data.role === 'Administrator' ||
                data.role === 'Developer' ||
                data.officer !== 'Member'
            );
        } catch (error) {
            console.error(error);
            state.canManage = false;
        }

        renderPage();
    }

    async function reloadNewsletters() {
        state.loading = true;
        state.loadError = false;
        renderPage();

        try {
            const response = await fetch('/pubs/ajax_get_newsletter', {
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch newsletters.');
            }

            const payload = await response.json();
            state.items = normalizeNewsletters(payload);
            state.loadError = false;
        } catch (error) {
            console.error(error);
            state.items = [];
            state.loadError = true;
        } finally {
            state.loading = false;
            ensureActiveRange();
            renderPage();
        }
    }

    async function handleFileUpload(file) {
        if (!file) {
            return;
        }

        state.uploading = true;
        renderPage();

        try {
            const formData = new FormData();
            formData.append('file_input', file);
            formData.append('host', window.location.href.toString());
            formData.append('note', 'KISS Newsletter');
            formData.append('active', 1);

            const response = await fetch('/blank/ajax_file_upload/', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            state.file = await response.json();
        } catch (error) {
            console.error(error);
            state.file = null;
            window.alert(t('newsletter.upload_failed'));
        } finally {
            state.uploading = false;
            renderPage();
        }
    }

    async function submitNewsletter() {
        if (state.submitting || state.uploading) {
            return;
        }

        if (!state.file || !state.file.uuid) {
            window.alert(t('newsletter.upload_first'));
            return;
        }

        state.submitting = true;
        renderPage();

        try {
            const formData = new FormData();
            formData.append('txt_publish_date', state.form.publish_date || '');
            formData.append('txt_volume', state.form.volume || '');
            formData.append('txt_issue', state.form.issue || '');
            formData.append('uuid_file', state.file.uuid);

            const response = await fetch('/pubs/ajax_add_newsletter/', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to save newsletter.');
            }

            state.form = {
                publish_date: '',
                volume: '',
                issue: ''
            };
            state.file = null;

            await reloadNewsletters();
        } catch (error) {
            console.error(error);
            window.alert(t('newsletter.save_failed'));
        } finally {
            state.submitting = false;
            renderPage();
        }
    }

    async function deleteNewsletter(uuid) {
        if (!uuid || state.deletingUuid) {
            return;
        }

        if (!window.confirm(t('newsletter.delete_confirm'))) {
            return;
        }

        state.deletingUuid = uuid;
        renderPage();

        try {
            const formData = new FormData();
            formData.append('uuid', uuid);

            const response = await fetch('/pubs/ajax_delete_newsletter/', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to delete newsletter.');
            }

            await reloadNewsletters();
        } catch (error) {
            console.error(error);
            window.alert(t('newsletter.delete_failed'));
        } finally {
            state.deletingUuid = '';
            renderPage();
        }
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

            if (target.id === 'newsletter_search') {
                state.searchQuery = String(target.value || '').trim().toLowerCase();
                renderNewsletterList();
            } else if (target.id === 'newsletter_publish_date') {
                state.form.publish_date = target.value;
            } else if (target.id === 'newsletter_volume') {
                state.form.volume = target.value;
            } else if (target.id === 'newsletter_issue') {
                state.form.issue = target.value;
            }
        });

        root.addEventListener('change', function (event) {
            const target = event.target;
            if (!target) {
                return;
            }

            if (target.id === 'newsletter_publish_date') {
                state.form.publish_date = target.value;
            } else if (target.id === 'newsletter_volume') {
                state.form.volume = target.value;
            } else if (target.id === 'newsletter_issue') {
                state.form.issue = target.value;
            } else if (target.id === 'id_newsletter_file_upload') {
                const file = target.files && target.files[0] ? target.files[0] : null;
                handleFileUpload(file);
                target.value = '';
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

            if (action === 'pick-file') {
                event.preventDefault();
                const input = document.getElementById('id_newsletter_file_upload');
                if (input && !state.uploading) {
                    input.click();
                }
            } else if (action === 'submit-newsletter') {
                event.preventDefault();
                submitNewsletter();
            } else if (action === 'delete-newsletter') {
                event.preventDefault();
                deleteNewsletter(target.getAttribute('data-uuid'));
            } else if (action === 'set-range') {
                event.preventDefault();
                const rangeValue = target.getAttribute('data-range');
                state.hasUserSelectedRange = true;
                if (rangeValue === 'all') {
                    state.activeRange = null;
                } else {
                    state.activeRange = {
                        from: parseInt(target.getAttribute('data-from'), 10),
                        to: parseInt(target.getAttribute('data-to'), 10)
                    };
                }
                renderYearFilters();
                renderNewsletterList();
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
        bindRootHandlers();

        if (!state.initialized) {
            state.initialized = true;
            startLanguageWatcher();
            startThemeWatcher();
            renderPage();
            detectCanManage();
            reloadNewsletters();
        } else {
            renderPage();
        }
    }

    window.set_main = set_main;
    window.StatKISSNewsletterPage = {
        init: set_main,
        reload: reloadNewsletters
    };
})();
