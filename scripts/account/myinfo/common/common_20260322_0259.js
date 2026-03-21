(function () {
    'use strict';

    const SUPPORTED_LANGS = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];
    const DEFAULT_LANG = 'en';
    const LOCAL_LANG_KEY = 'statkiss_lang';

    const THEME_STYLE_ID = 'statkiss-myinfo-theme-style-v3';
    const THEME_STORAGE_KEYS = ['statkiss_theme', 'statkiss_appearance', 'appearance', 'theme', 'color-theme', 'mode'];
    const THEME_ATTRS = ['data-theme', 'theme', 'data-color-mode', 'data-bs-theme', 'color-scheme'];
    const localMessages = {};
    let themeObserverInstalled = false;

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

    function plainText(value) {
        return String(value == null ? '' : value)
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function ensureHeadElement(selector, tagName, attributes) {
        let node = document.head ? document.head.querySelector(selector) : null;
        if (!node) {
            node = document.createElement(tagName);
            Object.keys(attributes || {}).forEach(function (key) {
                node.setAttribute(key, attributes[key]);
            });
            if (document.head) {
                document.head.appendChild(node);
            }
        }
        return node;
    }

    function setMetaByName(name, content) {
        const node = ensureHeadElement('meta[name="' + name + '"]', 'meta', { name: name });
        if (node) {
            node.setAttribute('content', content || '');
        }
    }

    function setMetaByProperty(property, content) {
        const node = ensureHeadElement('meta[property="' + property + '"]', 'meta', { property: property });
        if (node) {
            node.setAttribute('content', content || '');
        }
    }

    function setCanonicalHref(href) {
        const node = ensureHeadElement('link[rel="canonical"]', 'link', { rel: 'canonical' });
        if (node) {
            node.setAttribute('href', href || '');
        }
    }

    function currentAbsoluteUrl() {
        try {
            const url = new URL(window.location.href);
            url.hash = '';
            url.search = '';
            return url.toString();
        } catch (error) {
            return window.location.origin + (window.location.pathname || '/');
        }
    }

    function buildMetaTitle(pageTitle) {
        const cleanedTitle = plainText(pageTitle);
        const brand = 'StatKISS';
        if (!cleanedTitle) {
            return brand;
        }
        return cleanedTitle + ' | ' + brand;
    }

    function buildMetaDescription(pageTitle, pageDescription) {
        const cleanedDescription = plainText(pageDescription);
        if (cleanedDescription) {
            return cleanedDescription;
        }
        const cleanedTitle = plainText(pageTitle);
        if (cleanedTitle) {
            return cleanedTitle + ' - StatKISS account page.';
        }
        return 'StatKISS account page.';
    }

    function setPageMeta(pageTitle, pageDescription) {
        const metaTitle = buildMetaTitle(pageTitle);
        const metaDescription = buildMetaDescription(pageTitle, pageDescription);
        const url = currentAbsoluteUrl();

        document.title = metaTitle;
        setMetaByName('description', metaDescription);
        setMetaByName('robots', 'noindex, nofollow, noarchive');
        setMetaByName('googlebot', 'noindex, nofollow, noarchive');
        setMetaByProperty('og:title', metaTitle);
        setMetaByProperty('og:description', metaDescription);
        setMetaByProperty('og:type', 'website');
        setMetaByProperty('og:url', url);
        setMetaByProperty('og:site_name', 'StatKISS');
        setMetaByName('twitter:card', 'summary');
        setMetaByName('twitter:title', metaTitle);
        setMetaByName('twitter:description', metaDescription);
        setCanonicalHref(url);
    }


    const FIELD_HELPER_BASE_CLASS = 'sk-myinfo-field-helper mt-2 min-h-[1.25rem] text-xs';
    const EMPTY_CHOICE_TOKENS = [
        '',
        'select an option',
        'select option',
        'select gender',
        'select education',
        'choose an option',
        'choose option',
        'please select',
        'please choose',
        'none',
        'null',
        'undefined'
    ];

    function helperClass(tone) {
        const toneClass = {
            info: 'text-slate-500 dark:text-slate-400',
            success: 'text-emerald-600 dark:text-emerald-400',
            error: 'text-rose-600 dark:text-rose-400'
        }[tone || 'info'] || 'text-slate-500 dark:text-slate-400';
        return FIELD_HELPER_BASE_CLASS + ' ' + toneClass;
    }

    function helperSlot(fieldId, message, tone) {
        return '<div id="' + escapeHtml(fieldId) + '_helper" class="' + helperClass(tone || 'info') + '">' + escapeHtml(message || '') + '</div>';
    }

    function setHelper(fieldId, message, tone) {
        const helperEl = document.getElementById(fieldId + '_helper');
        if (!helperEl) {
            return;
        }
        helperEl.className = helperClass(tone || 'info');
        helperEl.textContent = message || '';
    }

    function setFieldTone(fieldId, tone) {
        const fieldEl = document.getElementById(fieldId);
        if (!fieldEl) {
            return;
        }

        if (tone === 'error' || tone === 'success') {
            fieldEl.setAttribute('data-sk-field-tone', tone);
        } else {
            fieldEl.removeAttribute('data-sk-field-tone');
        }

        if (tone === 'error') {
            fieldEl.setAttribute('aria-invalid', 'true');
        } else {
            fieldEl.removeAttribute('aria-invalid');
        }
    }

    function showFieldMessage(fieldId, message, tone) {
        setHelper(fieldId, message, tone || 'info');
        setFieldTone(fieldId, tone || 'info');
    }

    function clearFieldMessage(fieldId, defaultMessage, defaultTone) {
        setHelper(fieldId, defaultMessage || '', defaultTone || 'info');
        setFieldTone(fieldId, 'info');
    }

    function normalizeChoiceToken(value) {
        return String(value == null ? '' : value).trim().toLowerCase().replace(/\s+/g, ' ');
    }

    function isEmptyChoice(value) {
        return EMPTY_CHOICE_TOKENS.indexOf(normalizeChoiceToken(value)) >= 0;
    }


    function normalizeThemeToken(value) {
        const text = String(value == null ? '' : value).trim().toLowerCase();
        if (!text) {
            return '';
        }
        if (text === 'dark' || text === 'night' || text === 'black' || text.indexOf('dark') >= 0 || text.indexOf('night') >= 0) {
            return 'dark';
        }
        if (text === 'light' || text === 'day' || text === 'white' || text.indexOf('light') >= 0 || text.indexOf('day') >= 0) {
            return 'light';
        }
        return '';
    }

    function readThemeSignalFromElement(element) {
        if (!element || element.nodeType !== 1) {
            return '';
        }

        for (let i = 0; i < THEME_ATTRS.length; i += 1) {
            const attr = THEME_ATTRS[i];
            const value = element.getAttribute(attr);
            const normalized = normalizeThemeToken(value);
            if (normalized) {
                return normalized;
            }
        }

        const className = typeof element.className === 'string' ? element.className : '';
        const tokens = className.split(/\s+/).filter(Boolean);
        for (let i = 0; i < tokens.length; i += 1) {
            const token = tokens[i].toLowerCase();
            if (token === 'dark' || token === 'theme-dark' || token === 'dark-mode' || token === 'mode-dark' || token === 'is-dark') {
                return 'dark';
            }
            if (token === 'light' || token === 'theme-light' || token === 'light-mode' || token === 'mode-light' || token === 'is-light') {
                return 'light';
            }
        }
        return '';
    }

    function readThemeSignalFromStorage() {
        for (let i = 0; i < THEME_STORAGE_KEYS.length; i += 1) {
            const key = THEME_STORAGE_KEYS[i];
            try {
                const value = localStorage.getItem(key);
                const normalized = normalizeThemeToken(value);
                if (normalized) {
                    return normalized;
                }
            } catch (error) {
                /* ignore */
            }
        }
        return '';
    }

    function parseColor(color) {
        const raw = String(color == null ? '' : color).trim();
        if (!raw || raw === 'transparent') {
            return null;
        }

        if (raw.charAt(0) === '#') {
            let hex = raw.slice(1);
            if (hex.length === 3 || hex.length === 4) {
                hex = hex.split('').map(function (part) { return part + part; }).join('');
            }
            if (hex.length === 6) {
                hex += 'ff';
            }
            if (hex.length !== 8) {
                return null;
            }
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16),
                a: parseInt(hex.slice(6, 8), 16) / 255,
            };
        }

        const match = raw.match(/rgba?\(([^)]+)\)/i);
        if (!match) {
            return null;
        }
        const parts = match[1].split(',').map(function (part) { return part.trim(); });
        if (parts.length < 3) {
            return null;
        }
        return {
            r: parseFloat(parts[0]) || 0,
            g: parseFloat(parts[1]) || 0,
            b: parseFloat(parts[2]) || 0,
            a: parts.length >= 4 ? (parseFloat(parts[3]) || 0) : 1,
        };
    }

    function isDarkColor(color) {
        const parsed = parseColor(color);
        if (!parsed || parsed.a === 0) {
            return null;
        }
        const brightness = ((parsed.r * 299) + (parsed.g * 587) + (parsed.b * 114)) / 1000;
        return brightness < 150;
    }

    function detectDarkMode() {
        const candidates = [
            document.querySelector('[data-statkiss-myinfo-root="1"]'),
            document.getElementById('div_main'),
            document.body,
            document.documentElement,
        ];

        for (let i = 0; i < candidates.length; i += 1) {
            const signal = readThemeSignalFromElement(candidates[i]);
            if (signal) {
                return signal === 'dark';
            }
        }

        const storageSignal = readThemeSignalFromStorage();
        if (storageSignal) {
            return storageSignal === 'dark';
        }

        for (let i = 0; i < candidates.length; i += 1) {
            const element = candidates[i];
            if (!element) {
                continue;
            }
            try {
                const background = window.getComputedStyle(element).backgroundColor;
                const dark = isDarkColor(background);
                if (dark !== null) {
                    return dark;
                }
            } catch (error) {
                /* ignore */
            }
        }

        if (typeof window.matchMedia === 'function') {
            try {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            } catch (error) {
                return false;
            }
        }
        return false;
    }

    function ensureThemeStyles() {
        if (document.getElementById(THEME_STYLE_ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = THEME_STYLE_ID;
        style.textContent = [
            '.sk-myinfo-root{transition:color .18s ease,border-color .18s ease,background-color .18s ease;}',
            '.sk-myinfo-root .sk-myinfo-card,.sk-myinfo-root .sk-myinfo-submenu,.sk-myinfo-root .sk-myinfo-summary-item,.sk-myinfo-root .sk-myinfo-nav-link{transition:color .18s ease,border-color .18s ease,background-color .18s ease,box-shadow .18s ease;}',
            '.sk-myinfo-root.sk-theme-dark{color-scheme:dark;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card,.sk-myinfo-root.sk-theme-dark .sk-myinfo-submenu{background:linear-gradient(180deg,rgba(7,16,32,.96),rgba(9,21,43,.96)) !important;border-color:rgba(92,123,178,.28) !important;box-shadow:0 20px 48px rgba(2,8,23,.24) !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card-title,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card-body,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card label,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card legend,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card dt,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card dd,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card h1,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card h2,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card h3,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card h4,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card h5,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card h6{color:#f8fafc !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card p,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card small,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [class*="text-slate-4"],.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [class*="text-slate-5"],.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [class*="text-slate-6"]{color:#9fb0c9 !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [class*="text-slate-7"],.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [class*="text-slate-8"],.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [class*="text-slate-9"]{color:#f8fafc !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-summary-item{background:rgba(14,24,46,.94) !important;border-color:rgba(92,123,178,.22) !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-summary-label{color:#8ea5c7 !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-summary-value,.sk-myinfo-root.sk-theme-dark .sk-myinfo-summary-value *{color:#f8fafc !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-submenu .sk-myinfo-nav-link.is-idle{color:#e2e8f0 !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-submenu .sk-myinfo-nav-link.is-idle:hover{background:rgba(59,130,246,.12) !important;color:#ffffff !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-submenu .sk-myinfo-nav-link.is-active{background:rgba(30,64,124,.88) !important;color:#ffffff !important;box-shadow:inset 0 0 0 1px rgba(148,163,184,.14) !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-action-link.is-outlined{background:rgba(255,255,255,.03) !important;border-color:rgba(148,163,184,.28) !important;color:#f8fafc !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-action-link.is-outlined:hover{background:rgba(59,130,246,.12) !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-action-link.is-solid{background:#1d4ed8 !important;color:#ffffff !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card input,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card select,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card textarea{background:#061226 !important;border-color:rgba(96,129,184,.32) !important;color:#f8fafc !important;box-shadow:none !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card input[readonly],.sk-myinfo-root.sk-theme-dark .sk-myinfo-card input:read-only,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card textarea[readonly],.sk-myinfo-root.sk-theme-dark .sk-myinfo-card textarea:read-only,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card select[disabled]{background:#08192f !important;color:#e5eefc !important;opacity:1 !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card input::placeholder,.sk-myinfo-root.sk-theme-dark .sk-myinfo-card textarea::placeholder{color:#6f88ad !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card option{background:#061226 !important;color:#f8fafc !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card :focus{outline-color:rgba(96,165,250,.8) !important;}',
            '.sk-myinfo-root .sk-myinfo-card [data-sk-field-tone="error"]{border-color:rgba(244,63,94,.72) !important;box-shadow:0 0 0 1px rgba(244,63,94,.12) !important;}',
            '.sk-myinfo-root .sk-myinfo-card [data-sk-field-tone="success"]{border-color:rgba(16,185,129,.72) !important;box-shadow:0 0 0 1px rgba(16,185,129,.12) !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [data-sk-field-tone="error"]{border-color:rgba(251,113,133,.82) !important;box-shadow:0 0 0 1px rgba(251,113,133,.22) !important;}',
            '.sk-myinfo-root.sk-theme-dark .sk-myinfo-card [data-sk-field-tone="success"]{border-color:rgba(52,211,153,.82) !important;box-shadow:0 0 0 1px rgba(52,211,153,.22) !important;}'
        ].join('');
        document.head.appendChild(style);
    }

    function syncThemeState() {
        const dark = detectDarkMode();
        const roots = document.querySelectorAll('[data-statkiss-myinfo-root="1"]');
        roots.forEach(function (root) {
            root.classList.toggle('sk-theme-dark', dark);
            root.classList.toggle('sk-theme-light', !dark);
            root.setAttribute('data-statkiss-theme', dark ? 'dark' : 'light');
        });
    }

    function observeThemeChanges() {
        if (themeObserverInstalled) {
            return;
        }
        themeObserverInstalled = true;

        const refresh = function () {
            syncThemeState();
        };

        if (typeof MutationObserver === 'function') {
            const observer = new MutationObserver(refresh);
            const observeTarget = function (target) {
                if (!target) {
                    return;
                }
                observer.observe(target, {
                    attributes: true,
                    attributeFilter: ['class', 'style', 'data-theme', 'theme', 'data-color-mode', 'data-bs-theme', 'color-scheme'],
                });
            };
            observeTarget(document.documentElement);
            observeTarget(document.body);
        }

        if (typeof window.matchMedia === 'function') {
            try {
                const media = window.matchMedia('(prefers-color-scheme: dark)');
                if (typeof media.addEventListener === 'function') {
                    media.addEventListener('change', refresh);
                } else if (typeof media.addListener === 'function') {
                    media.addListener(refresh);
                }
            } catch (error) {
                /* ignore */
            }
        }
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
            ? 'sk-myinfo-action-link is-outlined inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            : 'sk-myinfo-action-link is-solid inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white';
        return '<a href="' + escapeHtml(href) + '" class="' + classes + '">' + escapeHtml(label) + '</a>';
    }

    function card(title, bodyHtml) {
        return [
            '<section class="sk-myinfo-card w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
            title ? '  <h2 class="sk-myinfo-card-title text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(title) + '</h2>' : '',
            '  <div class="sk-myinfo-card-body ' + (title ? 'mt-4' : '') + ' space-y-4 text-sm text-slate-600 dark:text-slate-300">' + bodyHtml + '</div>',
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
            '<aside class="sk-myinfo-submenu rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-24 self-start">',
            '  <nav class="flex flex-col gap-1">',
            items.map(function (item) {
                const active = currentMode === item.mode;
                const classes = active
                    ? 'sk-myinfo-nav-link is-active block rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'sk-myinfo-nav-link is-idle block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900';
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
        ensureThemeStyles();
        syncThemeState();
        observeThemeChanges();
        widenShellWidth();

        if (typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(function () {
                syncThemeState();
                widenShellWidth();
            });
        }

        window.setTimeout(function () {
            syncThemeState();
            widenShellWidth();
        }, 0);
    }

    function layout(title, desc, bodyHtml, currentMode) {
        const app = getApp();
        applyLangToDocument();
        setPageMeta(title, desc);
        const content = [
            '<div data-statkiss-myinfo-root="1" class="sk-myinfo-root w-full max-w-none">',
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
                    '<div class="sk-myinfo-summary-item ' + spanClass + 'rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
                    '  <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + escapeHtml(field.label) + '</dt>',
                    '  <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + valueOrEmpty(field.value, field.type) + '</dd>',
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
        detectDarkMode: detectDarkMode,
        ensureThemeStyles: ensureThemeStyles,
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
        setPageMeta: setPageMeta,
        summaryGrid: summaryGrid,
        t: t,
        translateKnownValue: translateKnownValue,
        useMessages: useMessages,
        valueOrEmpty: valueOrEmpty,
        helperSlot: helperSlot,
        setHelper: setHelper,
        setFieldTone: setFieldTone,
        showFieldMessage: showFieldMessage,
        clearFieldMessage: clearFieldMessage,
        isEmptyChoice: isEmptyChoice,
    };
})();
