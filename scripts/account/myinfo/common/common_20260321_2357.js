(function () {
    'use strict';

    const SUPPORTED_LANGS = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];
    const DEFAULT_LANG = 'en';
    const LOCAL_LANG_KEY = 'statkiss_lang';
    const localMessages = {};

    function getApp() {
        return window.StatKISSAccount || {};
    }

    function getBootstrap() {
        return window.STATKISS_ACCOUNT_BOOTSTRAP || {};
    }

    function normalizeLangCode(code) {
        if (!code) {
            return DEFAULT_LANG;
        }
        const raw = String(code).trim();
        const lower = raw.toLowerCase();

        if (lower === 'zh' || lower.startsWith('zh-')) {
            if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) {
                return 'zh-Hant';
            }
            return 'zh-Hans';
        }
        if (lower === 'tl' || lower.startsWith('tl-') || lower === 'fil' || lower.startsWith('fil-')) {
            return 'fil';
        }
        if (lower === 'pt' || lower.startsWith('pt-')) {
            return 'pt-BR';
        }
        if (lower.startsWith('en-')) return 'en';
        if (lower.startsWith('ko-')) return 'ko';
        if (lower.startsWith('ja-')) return 'ja';
        if (lower.startsWith('es-')) return 'es';
        if (lower.startsWith('fr-')) return 'fr';
        if (lower.startsWith('de-')) return 'de';
        if (lower.startsWith('ru-')) return 'ru';
        if (lower.startsWith('id-')) return 'id';
        if (lower.startsWith('vi-')) return 'vi';
        if (lower.startsWith('th-')) return 'th';
        if (lower.startsWith('ms-')) return 'ms';
        if (lower.startsWith('hi-')) return 'hi';
        if (lower.startsWith('ar-')) return 'ar';
        if (lower.startsWith('it-')) return 'it';
        if (lower.startsWith('nl-')) return 'nl';
        if (lower.startsWith('pl-')) return 'pl';
        if (lower.startsWith('sv-')) return 'sv';
        if (lower.startsWith('tr-')) return 'tr';
        if (lower.startsWith('uk-')) return 'uk';
        return SUPPORTED_LANGS.indexOf(raw) >= 0 ? raw : (SUPPORTED_LANGS.indexOf(lower) >= 0 ? lower : DEFAULT_LANG);
    }

    function currentLocalePrefix() {
        const path = window.location.pathname || '';
        const segments = path.split('/').filter(Boolean);
        if (!segments.length) {
            return '';
        }
        const first = segments[0];
        const normalized = normalizeLangCode(first);
        if (SUPPORTED_LANGS.indexOf(normalized) >= 0 && first.toLowerCase() !== 'account') {
            return '/' + first;
        }
        return '';
    }

    function withLocalePrefix(path) {
        if (!path || path.charAt(0) !== '/') {
            return path;
        }
        const prefix = currentLocalePrefix();
        if (!prefix || path.indexOf(prefix + '/') === 0) {
            return path;
        }
        return prefix + path;
    }

    function route(key, fallbackPath) {
        const routes = getBootstrap().routes || {};
        if (routes[key]) {
            return routes[key];
        }
        return withLocalePrefix(fallbackPath);
    }

    function api(key, fallbackPath) {
        const endpoints = getBootstrap().api || {};
        if (endpoints[key]) {
            return endpoints[key];
        }
        return withLocalePrefix(fallbackPath);
    }

    function myinfoRoute(mode) {
        if (!mode) {
            return route('myinfoOverview', route('myinfo', '/account/myinfo/'));
        }
        if (mode === 'email') {
            return route('myinfoEmail', '/account/myinfo/email/');
        }
        if (mode === 'password') {
            return route('myinfoPassword', '/account/myinfo/password/');
        }
        if (mode === 'profile') {
            return route('myinfoProfile', '/account/myinfo/profile/');
        }
        return route('myinfoOverview', route('myinfo', '/account/myinfo/'));
    }

    function changePasswordRoute() {
        return route('changePassword', '/account/change_password/');
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getCurrentLang() {
        const header = window.StatKISS_I18N || {};
        let candidate = '';

        if (typeof header.getInitialLang === 'function') {
            try {
                candidate = header.getInitialLang() || candidate;
            } catch (error) {
                candidate = candidate || '';
            }
        }
        if (!candidate) {
            try {
                candidate = localStorage.getItem((header && header.LANG_KEY) || LOCAL_LANG_KEY) || '';
            } catch (error) {
                candidate = '';
            }
        }
        if (!candidate) {
            candidate = document.documentElement.getAttribute('lang') || '';
        }
        if (!candidate) {
            candidate = getBootstrap().lang || '';
        }
        if (!candidate) {
            candidate = navigator.language || DEFAULT_LANG;
        }

        const normalized = typeof header.resolveLangCode === 'function'
            ? header.resolveLangCode(candidate)
            : normalizeLangCode(candidate);

        return SUPPORTED_LANGS.indexOf(normalized) >= 0 ? normalized : DEFAULT_LANG;
    }

    function applyLangToDocument() {
        const header = window.StatKISS_I18N || {};
        const lang = getCurrentLang();
        if (typeof header.applyLangToDocument === 'function') {
            try {
                header.applyLangToDocument(lang);
                return lang;
            } catch (error) {
                /* ignore */
            }
        }
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        return lang;
    }

    function extendMessages(bundle) {
        if (!bundle || typeof bundle !== 'object') {
            return;
        }
        SUPPORTED_LANGS.forEach(function (lang) {
            if (!localMessages[lang]) {
                localMessages[lang] = {};
            }
            const bucket = bundle[lang] || {};
            Object.keys(bucket).forEach(function (key) {
                localMessages[lang][key] = bucket[key];
            });
        });
    }

    function useMessages(bundle) {
        extendMessages(bundle);
        const app = getApp();
        if (typeof app.extendPageMessages === 'function') {
            try {
                app.extendPageMessages(bundle || {});
            } catch (error) {
                /* ignore runtime i18n mismatch */
            }
        }
        applyLangToDocument();
    }

    function t(key) {
        const lang = getCurrentLang();
        const current = localMessages[lang] || {};
        const english = localMessages.en || {};
        const korean = localMessages.ko || {};
        if (Object.prototype.hasOwnProperty.call(current, key) && current[key] != null && current[key] !== '') {
            return current[key];
        }
        if (Object.prototype.hasOwnProperty.call(english, key) && english[key] != null && english[key] !== '') {
            return english[key];
        }
        if (Object.prototype.hasOwnProperty.call(korean, key) && korean[key] != null && korean[key] !== '') {
            return korean[key];
        }
        const app = getApp();
        if (typeof app.t === 'function') {
            const fallback = app.t(key);
            if (fallback != null && fallback !== key) {
                return fallback;
            }
        }
        return key;
    }

    function knownValueKey(type, rawValue) {
        const value = String(rawValue == null ? '' : rawValue).trim().toLowerCase();
        if (!value) {
            return '';
        }
        if (type === 'gender') {
            if (value === 'male' || value === 'm') return 'gender_option_male';
            if (value === 'female' || value === 'f') return 'gender_option_female';
            if (value === 'other' || value === 'others' || value === 'prefer not to say' || value === 'unknown') return 'gender_option_other';
        }
        if (type === 'education') {
            if (value === 'high school' || value === 'highschool' || value === 'secondary school' || value === 'secondary') return 'education_option_high_school';
            if (value === 'bachelor' || value === "bachelor's" || value === 'bachelors' || value === 'ba' || value === 'bs' || value === 'undergraduate') return 'education_option_bachelor';
            if (value === 'master' || value === "master's" || value === 'masters' || value === 'ma' || value === 'ms' || value === 'graduate') return 'education_option_master';
            if (value === 'phd' || value === 'ph.d' || value === 'doctorate' || value === 'doctoral') return 'education_option_phd';
            if (value === 'other' || value === 'others') return 'education_option_other';
        }
        return '';
    }

    function translateKnownValue(type, rawValue) {
        const key = knownValueKey(type, rawValue);
        if (!key) {
            return rawValue;
        }
        return t(key);
    }

    function valueOrEmpty(value, type) {
        const raw = value == null ? '' : String(value);
        const text = raw.trim();
        if (!text) {
            return '<span class="text-slate-400 dark:text-slate-500">' + escapeHtml(t('myinfo_value_empty')) + '</span>';
        }
        const translated = type ? translateKnownValue(type, text) : text;
        return escapeHtml(String(translated)).replace(/\n/g, '<br>');
    }

    function linkButton(href, label, outlined) {
        const classes = outlined
            ? 'inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            : 'inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white';
        return '<a href="' + escapeHtml(href) + '" class="' + classes + '">' + escapeHtml(label) + '</a>';
    }

    function card(title, bodyHtml) {
        return [
            '<section class="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
            title ? '  <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(title) + '</h2>' : '',
            '  <div class="' + (title ? 'mt-4' : '') + ' space-y-4 text-sm text-slate-600 dark:text-slate-300">' + bodyHtml + '</div>',
            '</section>',
        ].join('');
    }

    function submenu(currentMode) {
        const items = [
            { mode: '', label: t('myinfo_nav_overview'), href: myinfoRoute('') },
            { mode: 'email', label: t('myinfo_nav_email'), href: myinfoRoute('email') },
            { mode: 'password', label: t('myinfo_nav_password'), href: myinfoRoute('password') },
            { mode: 'profile', label: t('myinfo_nav_profile'), href: myinfoRoute('profile') },
        ];

        return [
            '<aside class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-24 self-start">',
            '  <nav class="flex flex-col gap-1">',
            items.map(function (item) {
                const active = currentMode === item.mode;
                const classes = active
                    ? 'block rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900';
                return '<a href="' + escapeHtml(item.href) + '" class="' + classes + '">' + escapeHtml(item.label) + '</a>';
            }).join(''),
            '  </nav>',
            '</aside>',
        ].join('');
    }

    function widenShellWidth() {
        const main = document.getElementById('div_main');
        const root = main ? main.querySelector('[data-statkiss-myinfo-root="1"]') : null;
        if (!root) {
            return;
        }

        const candidates = [];
        let node = root.parentElement;
        while (node && node !== main) {
            candidates.push(node);
            node = node.parentElement;
        }

        let applied = false;
        candidates.forEach(function (element, index) {
            if (!element || element.nodeType !== 1) {
                return;
            }

            const className = typeof element.className === 'string' ? element.className : '';
            const hasLimitClass = /\bmax-w-(?!none\b)[^\s]+/.test(className);
            let computedMaxWidth = '';
            try {
                computedMaxWidth = window.getComputedStyle(element).maxWidth || '';
            } catch (error) {
                computedMaxWidth = '';
            }
            const hasComputedLimit = !!computedMaxWidth && computedMaxWidth !== 'none' && computedMaxWidth !== 'max-content' && computedMaxWidth !== 'min-content' && computedMaxWidth !== 'fit-content';

            if (!hasLimitClass && !hasComputedLimit && index > 1) {
                return;
            }

            if (className) {
                const cleaned = className
                    .replace(/\bmax-w-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|screen|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl)\b/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                if (cleaned !== className) {
                    element.className = cleaned;
                }
            }

            if (element.classList) {
                element.classList.add('w-full', 'mx-auto');
            }
            element.style.maxWidth = '80rem';
            element.style.width = 'min(80rem, calc(100vw - 3rem))';
            applied = true;
        });

        if (!applied) {
            root.style.maxWidth = '80rem';
            root.style.width = 'min(80rem, calc(100vw - 3rem))';
        }
    }

    function afterRender() {
        applyLangToDocument();
        widenShellWidth();
        if (typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(widenShellWidth);
        }
        window.setTimeout(widenShellWidth, 0);
    }

    function layout(title, desc, bodyHtml, currentMode) {
        const app = getApp();
        applyLangToDocument();
        const content = [
            '<div data-statkiss-myinfo-root="1" class="w-full max-w-none">',
            '  <div class="grid grid-cols-1 gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)]">',
            submenu(currentMode),
            '    <div class="min-w-0 space-y-6">',
            bodyHtml,
            '    </div>',
            '  </div>',
            '</div>',
        ].join('');
        return app.pageShell(title, desc, content, '');
    }

    function summaryGrid(userinfo) {
        const fields = [
            { label: t('email'), value: userinfo.email, type: '' },
            { label: t('name'), value: userinfo.name, type: '' },
            { label: t('affiliation'), value: userinfo.affiliation, type: '' },
            { label: t('title'), value: userinfo.title, type: '' },
            { label: t('gender'), value: userinfo.gender, type: 'gender' },
            { label: t('education'), value: userinfo.education, type: 'education' },
            { label: t('interest'), value: userinfo.interest, type: '' },
        ];

        return [
            '<dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">',
            fields.map(function (field) {
                const spanClass = field.label === t('interest') ? 'sm:col-span-2 xl:col-span-3 ' : '';
                return [
                    '<div class="' + spanClass + 'rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
                    '  <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + escapeHtml(field.label) + '</dt>',
                    '  <dd class="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + valueOrEmpty(field.value, field.type) + '</dd>',
                    '</div>',
                ].join('');
            }).join(''),
            '</dl>',
        ].join('');
    }

    function loadingCard() {
        return card('', '<div class="text-sm text-slate-500 dark:text-slate-400">' + escapeHtml(t('loading')) + '</div>');
    }

    function renderUnauthorized(title, desc, currentMode) {
        const app = getApp();
        const body = card(
            '',
            '<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + escapeHtml(t('unauthorized')) + '</div>' +
            '<div>' + (typeof app.outlineButtonLink === 'function' ? app.outlineButtonLink(route('login', '/account/'), t('go_login')) : linkButton(route('login', '/account/'), t('go_login'), true)) + '</div>'
        );
        app.render(layout(title, desc, body, currentMode));
        afterRender();
    }

    function renderLoadFailed(title, desc, currentMode) {
        const app = getApp();
        const body = card(
            '',
            '<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + escapeHtml(t('load_failed')) + '</div>'
        );
        app.render(layout(title, desc, body, currentMode));
        afterRender();
    }

    async function fetchUserinfo() {
        const app = getApp();
        if (typeof app.requestJSON === 'function' && typeof app.createFormData === 'function') {
            return app.requestJSON(api('getUserinfo', '/account/ajax_get_userinfo/'), app.createFormData({}));
        }
        const response = await fetch(api('getUserinfo', '/account/ajax_get_userinfo/'), { method: 'POST', credentials: 'same-origin' });
        return response.json();
    }

    function localizeSelectOptions(select, type) {
        if (!select || !select.options) {
            return;
        }
        const emptyKey = type === 'gender' ? 'gender_option_empty' : 'education_option_empty';
        Array.prototype.forEach.call(select.options, function (option) {
            const rawValue = option.value || option.text || '';
            const trimmed = String(rawValue).trim();
            if (!trimmed) {
                option.text = t(emptyKey);
                return;
            }
            const translated = translateKnownValue(type, rawValue);
            if (translated && String(translated) !== String(rawValue)) {
                option.text = translated;
            }
        });
    }

    window.StatKISSAccountMyinfoCommon = {
        afterRender: afterRender,
        api: api,
        applyLangToDocument: applyLangToDocument,
        card: card,
        changePasswordRoute: changePasswordRoute,
        escapeHtml: escapeHtml,
        extendMessages: extendMessages,
        fetchUserinfo: fetchUserinfo,
        getCurrentLang: getCurrentLang,
        layout: layout,
        linkButton: linkButton,
        loadingCard: loadingCard,
        localizeSelectOptions: localizeSelectOptions,
        myinfoRoute: myinfoRoute,
        renderLoadFailed: renderLoadFailed,
        renderUnauthorized: renderUnauthorized,
        route: route,
        summaryGrid: summaryGrid,
        t: t,
        translateKnownValue: translateKnownValue,
        useMessages: useMessages,
        valueOrEmpty: valueOrEmpty,
    };
})();
