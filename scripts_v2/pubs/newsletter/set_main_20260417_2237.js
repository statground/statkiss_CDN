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
        file: null,
        writeModalOpen: false,
        writeSubmitting: false,
        writeForm: {
            publish_month: '',
            volume: '',
            issue: '',
            file: null,
            file_name: ''
        },
        editing: false,
        savingEdits: false,
        editRows: [],
        editSnapshot: {}
    };

    let rootHandlersBound = false;
    let languageWatcher = null;
    let themeObserver = null;
    let bodyThemeObserver = null;
    let mediaListenerBound = false;
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

    function getSupportedLangs() {
        const header = getHeaderI18n();
        const page = getPageI18n();
        const langs = [];

        function pushFrom(source) {
            if (!source || !Array.isArray(source.languages)) {
                return;
            }
            source.languages.forEach(function (item) {
                if (!item || !item.code) {
                    return;
                }
                if (langs.indexOf(item.code) === -1) {
                    langs.push(item.code);
                }
            });
        }

        pushFrom(header);
        pushFrom(page);
        return langs;
    }

    function getPathLang() {
        const parts = window.location.pathname.split('/').filter(Boolean);
        if (!parts.length) {
            return '';
        }

        const candidate = parts[0];
        return getSupportedLangs().indexOf(candidate) !== -1 ? candidate : '';
    }

    function getLangPrefix() {
        const pathLang = getPathLang();
        if (pathLang) {
            return '/' + pathLang;
        }
        const currentLang = state.lang || getLang() || 'en';
        return '/' + currentLang;
    }

    function buildPubsUrl(path) {
        const suffix = String(path || '').replace(/^\/+/, '');
        return getLangPrefix() + '/pubs/' + suffix;
    }

    function buildRootUrl(path) {
        return '/' + String(path || '').replace(/^\/+/, '');
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

    function formatWithPageI18n(methodName) {
        const page = getPageI18n();
        if (!page || typeof page[methodName] !== 'function') {
            return '';
        }

        const args = Array.prototype.slice.call(arguments, 1);
        try {
            return page[methodName].apply(page, args);
        } catch (error) {
            return '';
        }
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
        const rootTheme = root ? (root.getAttribute('data-theme') || '') : '';
        const bodyTheme = body ? (body.getAttribute('data-theme') || '') : '';

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
                renderPage();
            }
        }

        if (window.MutationObserver && document.documentElement) {
            themeObserver = new MutationObserver(handleThemeChange);
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'style']
            });
        }

        if (window.MutationObserver && document.body) {
            bodyThemeObserver = new MutationObserver(handleThemeChange);
            bodyThemeObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'style']
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

    function parseIsoDate(value) {
        const raw = String(value || '').trim();
        const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
            return null;
        }
        return {
            year: parseInt(match[1], 10),
            month: parseInt(match[2], 10),
            day: parseInt(match[3], 10)
        };
    }

    function getDateSortKey(publishDate) {
        const parsed = parseIsoDate(publishDate);
        if (!parsed) {
            return String(publishDate || '');
        }
        return [
            String(parsed.year).padStart(4, '0'),
            String(parsed.month).padStart(2, '0'),
            String(parsed.day).padStart(2, '0')
        ].join('-');
    }

    
    function normalizeNewsletters(payload) {
        let rawList = [];

        if (Array.isArray(payload)) {
            rawList = payload;
        } else if (payload && Array.isArray(payload.items)) {
            rawList = payload.items;
        } else if (payload && Array.isArray(payload.list)) {
            rawList = payload.list;
        } else if (payload && Array.isArray(payload.all)) {
            rawList = payload.all;
        } else if (payload && typeof payload === 'object') {
            rawList = Object.values(payload);
        }

        return rawList
            .map(function (item, index) {
                const publishDate = item && item.publish_date != null ? String(item.publish_date).trim() : '';
                const publishMonth = item && item.publish_month != null
                    ? String(item.publish_month).trim()
                    : (publishDate ? String(publishDate).slice(0, 7) : '');
                const parsed = parseIsoDate(monthInputToDate(publishMonth, publishDate));

                return {
                    uuid: item && item.uuid ? String(item.uuid) : '',
                    publish_date: monthInputToDate(publishMonth, publishDate),
                    publish_month: publishMonth,
                    volume: item && item.volume != null ? String(item.volume).trim() : '',
                    issue: item && item.issue != null ? String(item.issue).trim() : '',
                    url_file: item && item.url_file ? String(item.url_file).trim() : '',
                    origin_file_name: item && item.origin_file_name ? String(item.origin_file_name).trim() : '',
                    marked_deleted: false,
                    year: parsed ? parsed.year : null,
                    month: parsed ? parsed.month : null,
                    day: parsed ? parsed.day : null,
                    index: index,
                    sort_key: getDateSortKey(monthInputToDate(publishMonth, publishDate))
                };
            })
            .filter(function (item) {
                return item.year !== null;
            })
            .sort(function (a, b) {
                if (a.sort_key !== b.sort_key) {
                    return b.sort_key.localeCompare(a.sort_key);
                }
                if (a.issue !== b.issue) {
                    return String(b.issue).localeCompare(String(a.issue), undefined, { numeric: true, sensitivity: 'base' });
                }
                if (a.volume !== b.volume) {
                    return String(b.volume).localeCompare(String(a.volume), undefined, { numeric: true, sensitivity: 'base' });
                }
                return a.index - b.index;
            });
    }

    function getPageConfig() {
        const script = document.getElementById('statkiss-newsletter-page-config');
        if (!script) {
            return {};
        }

        try {
            const raw = script.textContent || script.innerText || '{}';
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error) {
            return {};
        }
    }

    function initializeManagementState() {
        const config = getPageConfig();
        state.canManage = !!config.can_manage_newsletter;
    }

    function currentMonthInputValue() {
        const now = new Date();
        const year = String(now.getFullYear()).padStart(4, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return year + '-' + month;
    }

    function toMonthInputValue(value) {
        const raw = String(value || '').trim();
        if (/^\d{4}-\d{2}$/.test(raw)) {
            return raw;
        }
        const parsed = parseIsoDate(raw);
        if (!parsed) {
            return '';
        }
        return String(parsed.year).padStart(4, '0') + '-' + String(parsed.month).padStart(2, '0');
    }

    function monthInputToDate(monthValue, fallbackDate) {
        const raw = String(monthValue || '').trim();
        if (/^\d{4}-\d{2}$/.test(raw)) {
            return raw + '-01';
        }
        const fallback = String(fallbackDate || '').trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(fallback)) {
            return fallback;
        }
        return currentMonthInputValue() + '-01';
    }

    function updateDateParts(item) {
        const parsed = parseIsoDate(item.publish_date);
        item.year = parsed ? parsed.year : null;
        item.month = parsed ? parsed.month : null;
        item.day = parsed ? parsed.day : null;
        item.sort_key = getDateSortKey(item.publish_date);
    }

    function createEditableRow(item) {
        const row = Object.assign({}, item || {});
        row.publish_month = toMonthInputValue(item && item.publish_month ? item.publish_month : item && item.publish_date ? item.publish_date : '');
        row.publish_date = monthInputToDate(row.publish_month, item && item.publish_date ? item.publish_date : '');
        row.volume = String(item && item.volume != null ? item.volume : '').trim();
        row.issue = String(item && item.issue != null ? item.issue : '').trim();
        row.marked_deleted = false;
        updateDateParts(row);
        return row;
    }

    function buildEditSnapshot(items) {
        const snapshot = {};
        (items || []).forEach(function (item) {
            if (!item || !item.uuid) {
                return;
            }
            snapshot[item.uuid] = {
                publish_month: toMonthInputValue(item.publish_month || item.publish_date || ''),
                volume: String(item.volume || '').trim(),
                issue: String(item.issue || '').trim()
            };
        });
        return snapshot;
    }

    function getWorkingItems() {
        return state.editing ? state.editRows.slice() : state.items.slice();
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
        const ranges = get5YearRanges(getWorkingItems());

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

    function formatCardHeadline(item) {
        return formatWithPageI18n('formatNewsletterHeading', state.lang, item.publish_date, item.volume, item.issue) || item.publish_date;
    }

    function formatYearMonthChip(item) {
        return formatWithPageI18n('formatYearMonth', state.lang, item.publish_date) || item.publish_date;
    }

    function formatVolumeLine(item) {
        return formatWithPageI18n('formatVolumeLine', state.lang, item.volume, item.issue) || [item.volume ? ('Vol. ' + item.volume) : '', item.issue ? (t('newsletter.issue') + ' ' + item.issue) : ''].filter(Boolean).join(', ');
    }

    function formatIssueCount(count) {
        return formatWithPageI18n('formatIssueCount', state.lang, count) || String(count);
    }

    
    function getVisibleNewsletters() {
        let list = getWorkingItems();

        if (state.activeRange) {
            list = list.filter(function (item) {
                return item.year <= state.activeRange.from && item.year >= state.activeRange.to;
            });
        }

        const query = String(state.searchQuery || '').trim().toLowerCase();
        if (query) {
            list = list.filter(function (item) {
                const haystack = [
                    item.publish_date,
                    item.publish_month,
                    item.year,
                    item.month,
                    item.volume,
                    item.issue,
                    item.origin_file_name,
                    formatCardHeadline(item),
                    formatYearMonthChip(item),
                    formatVolumeLine(item)
                ].join(' ').toLowerCase();
                return haystack.includes(query);
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

    function getLatestItem() {
        return state.items && state.items.length ? state.items[0] : null;
    }

    function getYearSpanLabel() {
        if (!state.items.length) {
            return '';
        }
        const years = state.items.map(function (item) { return item.year; }).filter(Boolean);
        if (!years.length) {
            return '';
        }
        const max = Math.max.apply(null, years);
        const min = Math.min.apply(null, years);
        return max === min ? String(max) : (String(min) + '–' + String(max));
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

    function getNewsletterOpenUrl(item) {
        if (item && item.uuid) {
            return buildPubsUrl('newsletter/download/' + String(item.uuid).trim() + '/');
        }
        return resolveFileUrl(item && item.url_file ? item.url_file : '');
    }

    function getAccent(index) {
        const tones = [
            {
                line: 'from-sky-400 via-blue-500 to-indigo-500',
                chip: isDarkMode() ? 'border-sky-400/25 bg-sky-400/10 text-sky-100' : 'border-sky-200 bg-sky-50 text-sky-700',
                ghost: isDarkMode() ? 'border-slate-700/70 bg-slate-950/70 text-slate-300' : 'border-slate-200 bg-white text-slate-600',
                dot: isDarkMode() ? 'bg-sky-300 shadow-[0_0_0_8px_rgba(56,189,248,0.12)]' : 'bg-sky-500 shadow-[0_0_0_8px_rgba(56,189,248,0.12)]',
                button: isDarkMode() ? 'border-sky-400/20 bg-sky-400/10 text-sky-100 hover:bg-sky-400/15' : 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100'
            },
            {
                line: 'from-emerald-400 via-teal-500 to-cyan-500',
                chip: isDarkMode() ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700',
                ghost: isDarkMode() ? 'border-slate-700/70 bg-slate-950/70 text-slate-300' : 'border-slate-200 bg-white text-slate-600',
                dot: isDarkMode() ? 'bg-emerald-300 shadow-[0_0_0_8px_rgba(16,185,129,0.14)]' : 'bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.12)]',
                button: isDarkMode() ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/15' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            },
            {
                line: 'from-fuchsia-400 via-violet-500 to-purple-500',
                chip: isDarkMode() ? 'border-violet-400/25 bg-violet-400/10 text-violet-100' : 'border-violet-200 bg-violet-50 text-violet-700',
                ghost: isDarkMode() ? 'border-slate-700/70 bg-slate-950/70 text-slate-300' : 'border-slate-200 bg-white text-slate-600',
                dot: isDarkMode() ? 'bg-violet-300 shadow-[0_0_0_8px_rgba(139,92,246,0.14)]' : 'bg-violet-500 shadow-[0_0_0_8px_rgba(139,92,246,0.12)]',
                button: isDarkMode() ? 'border-violet-400/20 bg-violet-400/10 text-violet-100 hover:bg-violet-400/15' : 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100'
            },
            {
                line: 'from-amber-400 via-orange-500 to-rose-500',
                chip: isDarkMode() ? 'border-orange-400/25 bg-orange-400/10 text-orange-100' : 'border-orange-200 bg-orange-50 text-orange-700',
                ghost: isDarkMode() ? 'border-slate-700/70 bg-slate-950/70 text-slate-300' : 'border-slate-200 bg-white text-slate-600',
                dot: isDarkMode() ? 'bg-orange-300 shadow-[0_0_0_8px_rgba(249,115,22,0.14)]' : 'bg-orange-500 shadow-[0_0_0_8px_rgba(249,115,22,0.12)]',
                button: isDarkMode() ? 'border-orange-400/20 bg-orange-400/10 text-orange-100 hover:bg-orange-400/15' : 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
            }
        ];
        return tones[index % tones.length];
    }

    function buildErrorHtml() {
        if (!state.loadError) {
            return '';
        }

        const dark = isDarkMode();
        return `
            <div class="mt-8 rounded-[1.75rem] border px-5 py-4 text-sm font-medium ${dark ? 'border-red-500/30 bg-red-950/40 text-red-100' : 'border-red-200 bg-red-50 text-red-700'}">
                ${escapeHtml(t('newsletter.load_error'))}
            </div>
        `;
    }

    function buildHeroHtml() {
        const dark = isDarkMode();
        const latest = getLatestItem();
        const latestUrl = latest ? getNewsletterOpenUrl(latest) : '#';
        const latestHeadline = latest ? formatCardHeadline(latest) : '';
        const rangeLabel = getYearSpanLabel();

        return `
            <section class="relative overflow-hidden rounded-[2.75rem] border ${dark ? 'border-slate-800 bg-[#06132f]' : 'border-slate-200 bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_45%,#eef8ff_100%)]'}">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="absolute -left-12 top-0 h-72 w-72 rounded-full ${dark ? 'bg-blue-500/12' : 'bg-blue-300/35'} blur-3xl"></div>
                    <div class="absolute right-0 top-8 h-80 w-80 rounded-full ${dark ? 'bg-cyan-400/10' : 'bg-cyan-200/40'} blur-3xl"></div>
                    <div class="absolute bottom-0 left-1/3 h-56 w-56 rounded-full ${dark ? 'bg-violet-500/12' : 'bg-violet-200/35'} blur-3xl"></div>
                    <div class="absolute inset-0 opacity-[0.08]" style="background-image: radial-gradient(currentColor 1px, transparent 1px); background-size: 24px 24px;"></div>
                </div>
                <div class="relative grid gap-8 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.25fr_.85fr] lg:px-14 lg:py-14">
                    <div class="flex flex-col justify-center">
                        <span class="inline-flex w-fit items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${dark ? 'border-white/10 bg-white/5 text-blue-100' : 'border-blue-200 bg-white/80 text-blue-700'}">
                            ${escapeHtml(t('newsletter.badge'))}
                        </span>
                        <h2 class="mt-6 text-4xl font-black tracking-tight sm:text-5xl ${dark ? 'text-white' : 'text-slate-950'}">
                            ${escapeHtml(tTitle())}
                        </h2>
                        <p class="mt-5 max-w-3xl text-base leading-8 sm:text-lg ${dark ? 'text-slate-200' : 'text-slate-600'}">
                            ${escapeHtml(t('newsletter.description'))}
                        </p>
                        <div class="mt-8 flex flex-wrap gap-3">
                            <span class="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${dark ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white text-slate-700'}">
                                ${escapeHtml(formatIssueCount(state.items.length))}
                            </span>
                            ${rangeLabel ? `<span class="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${dark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-white text-slate-600'}">${escapeHtml(rangeLabel)}</span>` : ''}
                        </div>
                    </div>
                    <div class="rounded-[2rem] border p-6 shadow-2xl backdrop-blur-xl ${dark ? 'border-white/10 bg-white/5 shadow-black/20' : 'border-white/80 bg-white/80 shadow-blue-100/80'}">
                        ${latest ? `
                            <div class="flex h-full flex-col">
                                <div class="flex items-start justify-between gap-4">
                                    <div>
                                        <p class="text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-slate-300' : 'text-slate-500'}">${escapeHtml(latest.publish_date)}</p>
                                        <h3 class="mt-3 text-2xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(latestHeadline)}</h3>
                                    </div>
                                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'border-blue-400/20 bg-blue-400/10 text-blue-100' : 'border-blue-200 bg-blue-50 text-blue-700'}">${escapeHtml(t('newsletter.pdf'))}</span>
                                </div>
                                <div class="mt-auto pt-7">
                                    <a href="${escapeHtml(latestUrl)}" target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${dark ? 'border-white/10 bg-white text-slate-950 hover:bg-blue-50' : 'border-slate-200 bg-slate-950 text-white hover:bg-slate-800'}">
                                        <span>${escapeHtml(t('newsletter.open_pdf'))}</span>
                                        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </div>
                            </div>
                        ` : `
                            <div class="flex h-full flex-col items-start justify-center rounded-[1.5rem] border border-dashed p-6 ${dark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-500'}">
                                <p class="text-sm leading-7">${escapeHtml(t('newsletter.empty_body'))}</p>
                            </div>
                        `}
                    </div>
                </div>
            </section>
        `;
    }

    
    function buildWriteModalHtml() {
        if (!state.writeModalOpen) {
            return '';
        }

        const dark = isDarkMode();
        const fileName = state.writeForm.file_name || t('newsletter.no_file_selected');
        const submitLabel = state.writeSubmitting ? t('newsletter.submitting') : t('newsletter.submit');
        const buttonClass = dark
            ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500'
            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300';

        return `
            <div class="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
                <div class="absolute inset-0 bg-slate-950/65 backdrop-blur-sm" data-action="close-write-modal"></div>
                <div class="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border ${dark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'} shadow-2xl">
                    <div class="flex items-start justify-between gap-4 border-b px-6 py-5 sm:px-8 ${dark ? 'border-slate-800' : 'border-slate-200'}">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-slate-400' : 'text-slate-500'}">${escapeHtml(t('newsletter.title'))}</p>
                            <h2 id="newsletter-write-modal-title" class="mt-2 text-2xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(t('newsletter.write'))}</h2>
                        </div>
                        <button type="button" data-action="close-write-modal" class="inline-flex h-11 w-11 items-center justify-center rounded-full border text-xl transition ${buttonClass}" aria-label="${escapeHtml(t('newsletter.cancel'))}" title="${escapeHtml(t('newsletter.cancel'))}">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                        <div class="grid gap-4 sm:grid-cols-3">
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.publish_month'))}</span>
                                <input id="write_publish_month" type="month" value="${escapeHtml(state.writeForm.publish_month || currentMonthInputValue())}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </label>
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.volume'))}</span>
                                <input id="write_volume" type="text" inputmode="numeric" value="${escapeHtml(state.writeForm.volume)}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </label>
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.issue'))}</span>
                                <input id="write_issue" type="text" inputmode="numeric" value="${escapeHtml(state.writeForm.issue)}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </label>
                        </div>
                        <div class="rounded-[1.5rem] border p-4 ${dark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}">
                            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div class="min-w-0">
                                    <p class="text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.selected_file'))}</p>
                                    <p class="mt-1 truncate text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}">${escapeHtml(fileName)}</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <button type="button" data-action="pick-write-file" class="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition ${buttonClass}">
                                        <span>${escapeHtml(t('newsletter.file_upload'))}</span>
                                    </button>
                                    <input id="newsletter_write_file_input" type="file" accept="application/pdf" class="hidden">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col-reverse gap-3 border-t px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8 ${dark ? 'border-slate-800' : 'border-slate-200'}">
                        <button type="button" data-action="close-write-modal" class="inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-semibold transition ${buttonClass}">${escapeHtml(t('newsletter.cancel'))}</button>
                        <button type="button" data-action="submit-write-newsletter" class="inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold text-white transition ${dark ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 hover:bg-slate-800'} ${state.writeSubmitting ? 'cursor-wait opacity-70' : ''}">
                            ${state.writeSubmitting ? '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>' : ''}
                            <span>${escapeHtml(submitLabel)}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function buildAdminHtml() {
        if (!state.canManage) {
            return '';
        }

        const dark = isDarkMode();
        const writeButtonClass = dark
            ? 'border-fuchsia-500 bg-fuchsia-500 text-white hover:border-fuchsia-400 hover:bg-fuchsia-400'
            : 'border-fuchsia-300 bg-fuchsia-600 text-white hover:border-fuchsia-200 hover:bg-fuchsia-500';
        const secondaryButtonClass = dark
            ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500'
            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300';
        const doneButtonClass = dark
            ? 'border-emerald-500 bg-emerald-500 text-slate-950 hover:border-emerald-400 hover:bg-emerald-400'
            : 'border-emerald-300 bg-emerald-500 text-white hover:border-emerald-200 hover:bg-emerald-400';

        const controls = state.editing ? `
            <button type="button" data-action="save-editing" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${doneButtonClass} ${state.savingEdits ? 'cursor-wait opacity-70' : ''}">${escapeHtml(t('newsletter.done'))}</button>
            <button type="button" data-action="cancel-editing" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${secondaryButtonClass}">${escapeHtml(t('newsletter.cancel'))}</button>
        ` : `
            <button type="button" data-action="open-write-modal" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${writeButtonClass}">${escapeHtml(t('newsletter.write'))}</button>
            <button type="button" data-action="start-editing" class="inline-flex min-w-[112px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold shadow-2xl ring-4 transition ${secondaryButtonClass}">${escapeHtml(t('newsletter.edit'))}</button>
        `;

        return `
            <div class="fixed bottom-6 right-6 z-40 flex flex-col gap-3">${controls}</div>
            ${buildWriteModalHtml()}
        `;
    }

    function buildArchiveShellHtml() {
        const dark = isDarkMode();

        return `
            <section class="relative mt-8 overflow-hidden rounded-[2.25rem] border ${dark ? 'border-slate-800 bg-slate-900/92' : 'border-slate-200 bg-white'}">
                <div class="absolute inset-x-0 top-0 h-32 ${dark ? 'bg-[linear-gradient(180deg,rgba(37,99,235,0.10),rgba(2,6,23,0))]' : 'bg-[linear-gradient(180deg,rgba(59,130,246,0.10),rgba(255,255,255,0))]'}"></div>
                <div class="relative border-b p-5 sm:p-6 ${dark ? 'border-slate-800' : 'border-slate-200'}">
                    <div class="grid gap-5 xl:grid-cols-[1fr_360px] xl:items-end">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-slate-400' : 'text-slate-500'}">${escapeHtml(t('newsletter.filter_label'))}</p>
                            <div id="yearFilters" class="mt-3 flex flex-wrap gap-2"></div>
                        </div>
                        <label class="block">
                            <span class="sr-only">${escapeHtml(t('newsletter.search_placeholder'))}</span>
                            <div class="relative">
                                <span class="pointer-events-none absolute inset-y-0 left-4 flex items-center ${dark ? 'text-slate-500' : 'text-slate-400'}">
                                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.5 3a5.5 5.5 0 104.294 8.94l3.133 3.133a.75.75 0 101.06-1.06l-3.132-3.133A5.5 5.5 0 008.5 3zm-4 5.5a4 4 0 118 0 4 4 0 01-8 0z" clip-rule="evenodd"></path></svg>
                                </span>
                                <input id="newsletter_search" type="text" value="${escapeHtml(state.searchQuery)}" placeholder="${escapeHtml(t('newsletter.search_placeholder'))}" class="block h-12 w-full rounded-full border pl-11 pr-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </div>
                        </label>
                    </div>
                </div>
                <div id="archiveContainer" class="relative p-5 sm:p-8 md:p-10"></div>
            </section>
        `;
    }

    function buildPageHtml() {
        return `
            <div class="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
                ${buildHeroHtml()}
                ${buildAdminHtml()}
                ${buildErrorHtml()}
                ${buildArchiveShellHtml()}
            </div>
        `;
    }

    function buildLoadingHtml() {
        const dark = isDarkMode();
        const card = `
            <div class="overflow-hidden rounded-[1.5rem] border p-4 animate-pulse ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}">
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0 flex-1">
                        <div class="h-5 w-28 rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                        <div class="mt-4 h-7 w-4/5 rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-300'}"></div>
                    </div>
                    <div class="h-9 w-9 rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                </div>
                <div class="mt-5 flex items-center justify-between">
                    <div class="h-4 w-14 rounded ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                    <div class="h-10 w-28 rounded-full ${dark ? 'bg-slate-700' : 'bg-slate-300'}"></div>
                </div>
            </div>
        `;

        return `
            <div class="space-y-10">
                <section class="grid gap-6 xl:grid-cols-[160px_minmax(0,1fr)]">
                    <div class="animate-pulse">
                        <div class="h-10 w-24 rounded-xl ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                        <div class="mt-3 h-4 w-20 rounded ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                    </div>
                    <div class="grid gap-4 lg:grid-cols-2">${card}${card}${card}${card}</div>
                </section>
            </div>
        `;
    }

    function buildEmptyHtml() {
        const dark = isDarkMode();
        return `
            <div class="rounded-[2rem] border border-dashed px-6 py-14 text-center ${dark ? 'border-slate-700 bg-slate-950/50' : 'border-slate-300 bg-slate-50'}">
                <h3 class="text-2xl font-black ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(t('newsletter.empty_title'))}</h3>
                <p class="mx-auto mt-4 max-w-2xl text-sm leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(t('newsletter.empty_body'))}</p>
            </div>
        `;
    }

    
    function buildYearSectionHtml(year, items, yearIndex) {
        const dark = isDarkMode();
        const tone = getAccent(yearIndex);

        const cards = items.map(function (item) {
            const fileUrl = getNewsletterOpenUrl(item);
            const headline = formatCardHeadline(item);
            const openButtonClass = tone.button;
            const cardSurface = item.marked_deleted
                ? (dark
                    ? 'border-red-500/40 bg-red-950/20 shadow-black/10 hover:border-red-500/50'
                    : 'border-red-200 bg-red-50/70 shadow-red-100/60 hover:border-red-300')
                : (dark
                    ? 'border-slate-800 bg-slate-950/60 shadow-black/10 hover:border-slate-700 hover:bg-slate-950'
                    : 'border-slate-200 bg-white shadow-slate-200/70 hover:border-slate-300 hover:shadow-lg');
            const titleClass = item.marked_deleted ? 'line-through opacity-70' : '';
            const panelClass = dark
                ? 'border-slate-800 bg-slate-900/80'
                : 'border-slate-200 bg-slate-50';
            const inputClass = dark
                ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
                : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200';
            const toggleClass = item.marked_deleted
                ? (dark ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100 hover:bg-emerald-500/15' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100')
                : (dark ? 'border-red-500/30 bg-red-500/10 text-red-100 hover:bg-red-500/15' : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100');
            const disabled = item.marked_deleted ? 'disabled' : '';
            const disabledClass = item.marked_deleted ? 'cursor-not-allowed opacity-60' : '';

            const editorPanel = state.editing ? `
                <div class="rounded-[1.25rem] border p-3 ${panelClass}">
                    <div class="grid gap-3 sm:grid-cols-3">
                        <label class="block">
                            <span class="mb-2 block text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(t('newsletter.publish_month'))}</span>
                            <input type="month" data-edit-field="publish_month" data-uuid="${escapeHtml(item.uuid)}" value="${escapeHtml(item.publish_month || '')}" ${disabled} class="block h-11 w-full rounded-2xl border px-3 text-sm outline-none transition ${inputClass} ${disabledClass}">
                        </label>
                        <label class="block">
                            <span class="mb-2 block text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(t('newsletter.volume'))}</span>
                            <input type="text" inputmode="numeric" data-edit-field="volume" data-uuid="${escapeHtml(item.uuid)}" value="${escapeHtml(item.volume || '')}" ${disabled} class="block h-11 w-full rounded-2xl border px-3 text-sm outline-none transition ${inputClass} ${disabledClass}">
                        </label>
                        <label class="block">
                            <span class="mb-2 block text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(t('newsletter.issue'))}</span>
                            <input type="text" inputmode="numeric" data-edit-field="issue" data-uuid="${escapeHtml(item.uuid)}" value="${escapeHtml(item.issue || '')}" ${disabled} class="block h-11 w-full rounded-2xl border px-3 text-sm outline-none transition ${inputClass} ${disabledClass}">
                        </label>
                    </div>
                </div>
            ` : '';

            const pendingBadge = item.marked_deleted
                ? `<span class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'border-red-500/25 bg-red-500/10 text-red-100' : 'border-red-200 bg-red-50 text-red-700'}">${escapeHtml(t('newsletter.pending_delete'))}</span>`
                : '';

            const editActions = state.editing ? `
                <button type="button" data-action="toggle-delete" data-uuid="${escapeHtml(item.uuid)}" class="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${toggleClass}">
                    <span>${escapeHtml(item.marked_deleted ? t('newsletter.restore') : t('newsletter.delete'))}</span>
                </button>
            ` : '';

            return `
                <article class="group relative overflow-hidden rounded-[1.5rem] border p-4 transition duration-200 ${cardSurface}">
                    <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${tone.line}"></div>
                    <div class="flex h-full flex-col gap-4 pl-1">
                        <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0 flex-1">
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${tone.ghost}">${escapeHtml(formatYearMonthChip(item) || item.publish_month || item.publish_date)}</span>
                                    ${pendingBadge}
                                </div>
                                <h4 class="mt-3 text-lg font-black leading-snug tracking-tight ${dark ? 'text-white' : 'text-slate-950'} ${titleClass}">${escapeHtml(headline)}</h4>
                                ${item.origin_file_name ? `<p class="mt-2 truncate text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}">${escapeHtml(item.origin_file_name)}</p>` : ''}
                            </div>
                        </div>
                        ${editorPanel}
                        <div class="mt-auto flex items-center justify-between gap-3 border-t pt-3 ${dark ? 'border-slate-800/90' : 'border-slate-100'}">
                            <div class="inline-flex items-center gap-2 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}">
                                <span class="text-base">📄</span>
                                <span>${escapeHtml(t('newsletter.pdf'))}</span>
                            </div>
                            <div class="flex flex-wrap items-center justify-end gap-2">
                                ${editActions}
                                <a href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${openButtonClass}">
                                    <span>${escapeHtml(t('newsletter.open_pdf'))}</span>
                                    <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        return `
            <section class="grid gap-6 xl:grid-cols-[160px_minmax(0,1fr)] xl:gap-8">
                <div class="xl:sticky xl:top-24 h-fit">
                    <div class="inline-flex items-center gap-3">
                        <span class="h-3 w-3 rounded-full ${tone.dot}"></span>
                        <h3 class="text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(year)}</h3>
                    </div>
                    <p class="mt-3 text-sm font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}">${escapeHtml(formatIssueCount(items.length))}</p>
                </div>
                <div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">${cards}</div>
            </section>
        `;
    }

    function renderYearFilters() {
        const box = document.getElementById('yearFilters');
        if (!box) {
            return;
        }

        const dark = isDarkMode();
        const ranges = get5YearRanges(getWorkingItems());
        const allActive = state.activeRange === null;

        let html = `
            <button type="button" data-action="set-range" data-range="all" class="rounded-full border px-4 py-2 text-xs font-semibold transition ${allActive
                ? (dark ? 'border-white bg-white text-slate-950' : 'border-slate-950 bg-slate-950 text-white')
                : (dark ? 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300')}">
                ${escapeHtml(t('newsletter.all'))}
            </button>
        `;

        ranges.forEach(function (range) {
            const isActive = state.activeRange && state.activeRange.from === range.from && state.activeRange.to === range.to;
            html += `
                <button type="button" data-action="set-range" data-from="${escapeHtml(range.from)}" data-to="${escapeHtml(range.to)}" class="rounded-full border px-4 py-2 text-xs font-semibold transition ${isActive
                    ? (dark ? 'border-white bg-white text-slate-950' : 'border-slate-950 bg-slate-950 text-white')
                    : (dark ? 'border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300')}">
                    ${escapeHtml(range.from + '–' + range.to)}
                </button>
            `;
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
            const response = await fetch(buildPubsUrl('ajax_get_menu_header/'), {
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
            const response = await fetch(buildPubsUrl('ajax_get_newsletter/'), {
                credentials: 'same-origin'
            });

            const payload = await response.json();
            if (!response.ok || !payload || !payload.ok) {
                throw new Error('Failed to fetch newsletters.');
            }

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

    function resetWriteForm() {
        state.writeForm = {
            publish_month: currentMonthInputValue(),
            volume: '',
            issue: '',
            file: null,
            file_name: ''
        };
    }

    function openWriteModal() {
        if (!state.canManage || state.editing || state.writeSubmitting) {
            return;
        }
        if (!state.writeForm.publish_month) {
            resetWriteForm();
        }
        state.writeModalOpen = true;
        renderPage();
    }

    function closeWriteModal() {
        if (state.writeSubmitting) {
            return;
        }
        state.writeModalOpen = false;
        resetWriteForm();
        renderPage();
    }

    function startEditing() {
        if (!state.canManage || state.editing || state.savingEdits) {
            return;
        }
        state.writeModalOpen = false;
        state.editing = true;
        state.editRows = state.items.map(createEditableRow);
        state.editSnapshot = buildEditSnapshot(state.items);
        ensureActiveRange();
        renderPage();
    }

    function cancelEditing() {
        if (state.savingEdits) {
            return;
        }
        state.editing = false;
        state.editRows = [];
        state.editSnapshot = {};
        renderPage();
    }

    function updateEditableField(uuid, field, value) {
        const targetUuid = String(uuid || '').trim();
        if (!targetUuid) {
            return;
        }
        const row = state.editRows.find(function (item) {
            return item && item.uuid === targetUuid;
        });
        if (!row) {
            return;
        }

        if (field === 'publish_month') {
            row.publish_month = String(value || '').trim();
            row.publish_date = monthInputToDate(row.publish_month, row.publish_date);
            updateDateParts(row);
        } else if (field === 'volume' || field === 'issue') {
            row[field] = String(value || '').trim();
        }
    }

    function toggleDeleteMark(uuid) {
        const targetUuid = String(uuid || '').trim();
        if (!targetUuid) {
            return;
        }
        const row = state.editRows.find(function (item) {
            return item && item.uuid === targetUuid;
        });
        if (!row) {
            return;
        }
        row.marked_deleted = !row.marked_deleted;
        renderNewsletterList();
    }

    function buildEditPayload() {
        const updates = [];
        const delete_uuids = [];

        state.editRows.forEach(function (row) {
            if (!row || !row.uuid) {
                return;
            }
            if (row.marked_deleted) {
                delete_uuids.push(row.uuid);
                return;
            }

            const snapshot = state.editSnapshot[row.uuid] || {
                publish_month: '',
                volume: '',
                issue: ''
            };
            const currentMonth = toMonthInputValue(row.publish_month || row.publish_date || '');
            const currentVolume = String(row.volume || '').trim();
            const currentIssue = String(row.issue || '').trim();

            if (
                currentMonth !== snapshot.publish_month ||
                currentVolume !== snapshot.volume ||
                currentIssue !== snapshot.issue
            ) {
                updates.push({
                    uuid: row.uuid,
                    publish_month: currentMonth,
                    volume: currentVolume,
                    issue: currentIssue
                });
            }
        });

        return {
            updates: updates,
            delete_uuids: delete_uuids
        };
    }

    async function uploadNewsletterFile(file) {
        const formData = new FormData();
        formData.append('file_input', file);
        formData.append('host', window.location.href.toString());
        formData.append('note', 'KISS Newsletter');
        formData.append('active', 1);

        const response = await fetch(buildRootUrl('blank/ajax_file_upload/'), {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload newsletter file.');
        }

        return response.json();
    }

    async function submitWriteNewsletter() {
        if (state.writeSubmitting) {
            return;
        }

        if (!state.writeForm.file) {
            window.alert(t('newsletter.upload_first'));
            return;
        }

        state.writeSubmitting = true;
        renderPage();

        try {
            const uploadPayload = await uploadNewsletterFile(state.writeForm.file);
            if (!uploadPayload || !uploadPayload.uuid) {
                throw new Error('Uploaded file UUID is missing.');
            }

            const formData = new FormData();
            formData.append('txt_publish_month', state.writeForm.publish_month || currentMonthInputValue());
            formData.append('txt_volume', state.writeForm.volume || '');
            formData.append('txt_issue', state.writeForm.issue || '');
            formData.append('uuid_file', uploadPayload.uuid);

            const response = await fetch(buildPubsUrl('ajax_add_newsletter/'), {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            });
            const payload = await response.json();

            if (!response.ok || !payload || !payload.ok) {
                throw new Error('Failed to save newsletter.');
            }

            state.writeModalOpen = false;
            resetWriteForm();
            await reloadNewsletters();
        } catch (error) {
            console.error(error);
            window.alert(t('newsletter.save_failed'));
        } finally {
            state.writeSubmitting = false;
            renderPage();
        }
    }

    async function saveEditingChanges() {
        if (!state.editing || state.savingEdits) {
            return;
        }

        const payload = buildEditPayload();
        if (!payload.updates.length && !payload.delete_uuids.length) {
            cancelEditing();
            return;
        }

        state.savingEdits = true;
        renderPage();

        try {
            const response = await fetch(buildPubsUrl('ajax_save_newsletter_edits/'), {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (!response.ok || !result || !result.ok) {
                throw new Error('Failed to save newsletter edits.');
            }

            state.editing = false;
            state.editRows = [];
            state.editSnapshot = {};
            await reloadNewsletters();
        } catch (error) {
            console.error(error);
            window.alert(t('newsletter.save_failed'));
        } finally {
            state.savingEdits = false;
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

            const response = await fetch(buildRootUrl('blank/ajax_file_upload/'), {
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

            const response = await fetch(buildPubsUrl('ajax_add_newsletter/'), {
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

            const response = await fetch(buildPubsUrl('ajax_delete_newsletter/'), {
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
                state.searchQuery = String(target.value || '');
                renderNewsletterList();
                return;
            }

            if (target.id === 'write_publish_month') {
                state.writeForm.publish_month = String(target.value || '').trim();
                return;
            }
            if (target.id === 'write_volume') {
                state.writeForm.volume = String(target.value || '').trim();
                return;
            }
            if (target.id === 'write_issue') {
                state.writeForm.issue = String(target.value || '').trim();
                return;
            }

            const editField = target.getAttribute('data-edit-field');
            const editUuid = target.getAttribute('data-uuid');
            if (editField && editUuid) {
                updateEditableField(editUuid, editField, target.value);
            }
        });

        root.addEventListener('change', function (event) {
            const target = event.target;
            if (!target) {
                return;
            }

            if (target.id === 'newsletter_write_file_input') {
                const file = target.files && target.files[0] ? target.files[0] : null;
                state.writeForm.file = file;
                state.writeForm.file_name = file && file.name ? String(file.name) : '';
                target.value = '';
                renderPage();
                return;
            }

            const editField = target.getAttribute('data-edit-field');
            const editUuid = target.getAttribute('data-uuid');
            if (editField && editUuid) {
                updateEditableField(editUuid, editField, target.value);
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

            if (action === 'open-write-modal') {
                event.preventDefault();
                openWriteModal();
            } else if (action === 'close-write-modal') {
                event.preventDefault();
                closeWriteModal();
            } else if (action === 'pick-write-file') {
                event.preventDefault();
                const input = document.getElementById('newsletter_write_file_input');
                if (input && !state.writeSubmitting) {
                    input.click();
                }
            } else if (action === 'submit-write-newsletter') {
                event.preventDefault();
                submitWriteNewsletter();
            } else if (action === 'start-editing') {
                event.preventDefault();
                startEditing();
            } else if (action === 'cancel-editing') {
                event.preventDefault();
                cancelEditing();
            } else if (action === 'save-editing') {
                event.preventDefault();
                saveEditingChanges();
            } else if (action === 'toggle-delete') {
                event.preventDefault();
                toggleDeleteMark(target.getAttribute('data-uuid'));
            } else if (action === 'set-range') {
                event.preventDefault();
                state.hasUserSelectedRange = true;
                if (target.getAttribute('data-range') === 'all') {
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
        initializeManagementState();
        bindRootHandlers();

        if (!state.initialized) {
            state.initialized = true;
            resetWriteForm();
            startLanguageWatcher();
            startThemeWatcher();
            renderPage();
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
