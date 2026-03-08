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
                const parsed = parseIsoDate(publishDate);

                return {
                    uuid: item && item.uuid ? String(item.uuid) : '',
                    publish_date: publishDate,
                    volume: item && item.volume != null ? String(item.volume).trim() : '',
                    issue: item && item.issue != null ? String(item.issue).trim() : '',
                    url_file: item && item.url_file ? String(item.url_file).trim() : '',
                    year: parsed ? parsed.year : null,
                    month: parsed ? parsed.month : null,
                    day: parsed ? parsed.day : null,
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
                if (a.issue !== b.issue) {
                    return String(b.issue).localeCompare(String(a.issue), undefined, { numeric: true, sensitivity: 'base' });
                }
                if (a.volume !== b.volume) {
                    return String(b.volume).localeCompare(String(a.volume), undefined, { numeric: true, sensitivity: 'base' });
                }
                return a.index - b.index;
            });
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

    function formatCardHeadline(item) {
        return formatWithPageI18n('formatNewsletterHeading', state.lang, item.publish_date, item.issue) || item.publish_date;
    }

    function formatYearMonthChip(item) {
        return formatWithPageI18n('formatYearMonth', state.lang, item.publish_date) || item.publish_date;
    }

    function formatVolumeLine(item) {
        return formatWithPageI18n('formatVolumeLine', state.lang, item.volume, item.issue) || (item.volume ? (t('newsletter.volume') + ' ' + item.volume) : '');
    }

    function formatIssueCount(count) {
        return formatWithPageI18n('formatIssueCount', state.lang, count) || String(count);
    }

    function getVisibleNewsletters() {
        let list = state.items.slice();

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
                    item.year,
                    item.month,
                    item.volume,
                    item.issue,
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
        const latestUrl = latest ? resolveFileUrl(latest.url_file) : '#';
        const latestHeadline = latest ? formatCardHeadline(latest) : '';
        const latestVolume = latest ? formatVolumeLine(latest) : '';
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
                                        <p class="text-xs font-semibold uppercase tracking-[0.22em] ${dark ? 'text-slate-300' : 'text-slate-500'}">${escapeHtml(formatYearMonthChip(latest))}</p>
                                        <h3 class="mt-4 text-2xl font-black leading-tight ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(latestHeadline)}</h3>
                                        ${latestVolume ? `<p class="mt-3 text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(latestVolume)}</p>` : ''}
                                    </div>
                                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'border-blue-400/20 bg-blue-400/10 text-blue-100' : 'border-blue-200 bg-blue-50 text-blue-700'}">${escapeHtml(t('newsletter.pdf'))}</span>
                                </div>
                                <div class="mt-6 flex flex-wrap gap-2">
                                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${dark ? 'border-white/10 bg-slate-950/50 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600'}">${escapeHtml(latest.publish_date)}</span>
                                </div>
                                <div class="mt-auto pt-8">
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

    function buildAdminHtml() {
        if (!state.canManage) {
            return '';
        }

        const dark = isDarkMode();
        const fileName = state.file && state.file.origin_file_name ? state.file.origin_file_name : t('newsletter.no_file_selected');
        const uploadButtonLabel = state.uploading ? t('newsletter.uploading') : t('newsletter.file_upload');
        const submitButtonLabel = state.submitting ? t('newsletter.submitting') : t('newsletter.submit');
        const fileReady = !!(state.file && state.file.uuid);

        return `
            <section class="mt-8 overflow-hidden rounded-[2.25rem] border ${dark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white'}">
                <div class="grid gap-6 p-6 sm:p-8 xl:grid-cols-[0.92fr_1.08fr]">
                    <div>
                        <span class="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? 'border-violet-400/20 bg-violet-400/10 text-violet-100' : 'border-violet-200 bg-violet-50 text-violet-700'}">${escapeHtml(t('newsletter.manage_title'))}</span>
                        <p class="mt-4 max-w-2xl text-sm leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(t('newsletter.manage_body'))}</p>
                        <div class="mt-6 flex flex-wrap gap-3">
                            <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${fileReady ? (dark ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700') : (dark ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600')}">${escapeHtml(fileReady ? t('newsletter.file_ready') : t('newsletter.no_file_selected'))}</span>
                        </div>
                    </div>
                    <div class="rounded-[1.75rem] border p-5 ${dark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-slate-50'}">
                        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.publish_date'))}</span>
                                <input id="newsletter_publish_date" type="date" value="${escapeHtml(state.form.publish_date)}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </label>
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.volume'))}</span>
                                <input id="newsletter_volume" type="number" min="1" value="${escapeHtml(state.form.volume)}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </label>
                            <label class="block">
                                <span class="mb-2 block text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}">${escapeHtml(t('newsletter.issue'))}</span>
                                <input id="newsletter_issue" type="number" min="1" value="${escapeHtml(state.form.issue)}" class="block h-12 w-full rounded-2xl border px-4 text-sm outline-none transition ${dark ? 'border-slate-700 bg-slate-950 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30' : 'border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}">
                            </label>
                            <div class="flex flex-col justify-end gap-2">
                                <button type="button" data-action="pick-file" class="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition ${dark ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'} ${state.uploading ? 'cursor-wait opacity-70' : ''}">
                                    <span>${escapeHtml(uploadButtonLabel)}</span>
                                </button>
                                <button type="button" data-action="submit-newsletter" class="inline-flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white transition ${dark ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 hover:bg-slate-800'} ${state.submitting || state.uploading ? 'cursor-wait opacity-70' : ''}">
                                    ${state.submitting ? '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>' : ''}
                                    <span>${escapeHtml(submitButtonLabel)}</span>
                                </button>
                            </div>
                        </div>
                        <div class="mt-4 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${dark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-slate-600'}">
                            <span class="shrink-0 font-semibold ${dark ? 'text-slate-100' : 'text-slate-800'}">${escapeHtml(t('newsletter.selected_file'))}</span>
                            <span class="min-w-0 truncate">${escapeHtml(fileName)}</span>
                        </div>
                        <input id="id_newsletter_file_upload" type="file" accept="application/pdf" class="hidden">
                    </div>
                </div>
            </section>
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
            <div class="overflow-hidden rounded-[1.75rem] border p-5 animate-pulse ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}">
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0 flex-1">
                        <div class="h-6 w-28 rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                        <div class="mt-5 h-8 w-3/4 rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-300'}"></div>
                        <div class="mt-3 h-4 w-1/2 rounded ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                    </div>
                    <div class="h-10 w-10 rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                </div>
                <div class="mt-8 flex items-center justify-between">
                    <div class="h-4 w-16 rounded ${dark ? 'bg-slate-800' : 'bg-slate-200'}"></div>
                    <div class="h-11 w-28 rounded-full ${dark ? 'bg-slate-700' : 'bg-slate-300'}"></div>
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
            const fileUrl = resolveFileUrl(item.url_file);
            const headline = formatCardHeadline(item);
            const volumeLine = formatVolumeLine(item);
            const chipText = formatYearMonthChip(item);
            const openButtonClass = tone.button;
            const cardSurface = dark
                ? 'border-slate-800 bg-slate-950/60 shadow-black/10 hover:border-slate-700 hover:bg-slate-950'
                : 'border-slate-200 bg-white shadow-slate-200/70 hover:border-slate-300 hover:shadow-lg';
            const deleteButtonClass = dark
                ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-red-500/40 hover:bg-red-950/30 hover:text-red-300'
                : 'border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600';

            return `
                <article class="group relative overflow-hidden rounded-[1.75rem] border p-5 transition duration-200 ${cardSurface}">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.line}"></div>
                    <div class="flex h-full flex-col gap-6">
                        <div class="flex items-start justify-between gap-4">
                            <div class="min-w-0 flex-1">
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tone.chip}">${escapeHtml(chipText)}</span>
                                    <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${tone.ghost}">${escapeHtml(item.publish_date)}</span>
                                </div>
                                <h4 class="mt-4 text-xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-950'}">${escapeHtml(headline)}</h4>
                                ${volumeLine ? `<p class="mt-3 text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}">${escapeHtml(volumeLine)}</p>` : ''}
                            </div>
                            ${state.canManage ? `
                                <button type="button" data-action="delete-newsletter" data-uuid="${escapeHtml(item.uuid)}" class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${deleteButtonClass}" aria-label="${escapeHtml(t('newsletter.delete'))}" title="${escapeHtml(t('newsletter.delete'))}">
                                    ${state.deletingUuid === item.uuid
                                        ? '<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M22 12a10 10 0 00-10-10v3a7 7 0 017 7h3z"></path></svg>'
                                        : '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.5 2A1.5 1.5 0 007 3.5V4H4.75a.75.75 0 000 1.5h.638l.58 9.275A2.25 2.25 0 008.213 17h3.574a2.25 2.25 0 002.245-2.225l.58-9.275h.638a.75.75 0 000-1.5H13v-.5A1.5 1.5 0 0011.5 2h-3zm3 2v-.5h-3V4h3zM8.75 8a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8zm3 0a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0V8z" clip-rule="evenodd"></path></svg>'}
                                </button>
                            ` : ''}
                        </div>
                        <div class="mt-auto flex items-center justify-between gap-3">
                            <div class="inline-flex items-center gap-2 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}">
                                <span class="text-base">📄</span>
                                <span>${escapeHtml(t('newsletter.pdf'))}</span>
                            </div>
                            <a href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${openButtonClass}">
                                <span>${escapeHtml(t('newsletter.open_pdf'))}</span>
                                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
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
        const ranges = get5YearRanges(state.items);
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
                state.searchQuery = String(target.value || '');
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
