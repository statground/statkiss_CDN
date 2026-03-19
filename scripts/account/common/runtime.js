(function () {
    'use strict';

    const bootstrap = window.STATKISS_ACCOUNT_BOOTSTRAP || {};
    const HeaderI18N = window.StatKISS_I18N || null;
    const SUPPORTED_LANGS = Array.isArray(window.StatKISSAccountSupportedLangs) && window.StatKISSAccountSupportedLangs.length ? window.StatKISSAccountSupportedLangs : (HeaderI18N && Array.isArray(HeaderI18N.languages) ? HeaderI18N.languages.map(function (item) { return item.code; }) : ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk']);
    const ACCOUNT_SECTIONS = new Set(['account', 'admin', 'about', 'announcement', 'pubs', 'awards', 'forums', 'membership']);
    const COMMON_MESSAGES = window.StatKISSAccountCommonMessages || {};

    const PAGE_MESSAGES = {};

    function normalizeText(value) {
        return typeof value === 'string' ? value.trim() : '';
    }

    function safeLocalStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return '';
        }
    }

    function resolveLangCode(value) {
        if (HeaderI18N && typeof HeaderI18N.resolveLangCode === 'function') {
            return HeaderI18N.resolveLangCode(value || '');
        }
        const raw = normalizeText(value).toLowerCase();
        if (!raw) return 'en';
        if (raw === 'zh' || raw.startsWith('zh-')) return raw.includes('tw') || raw.includes('hk') || raw.includes('mo') || raw.includes('hant') ? 'zh-Hant' : 'zh-Hans';
        if (raw === 'pt' || raw.startsWith('pt-')) return 'pt-BR';
        if (raw === 'tl' || raw.startsWith('tl-') || raw === 'fil' || raw.startsWith('fil-')) return 'fil';
        if (raw.startsWith('ko')) return 'ko';
        if (raw.startsWith('ja')) return 'ja';
        if (raw.startsWith('en')) return 'en';
        const exact = SUPPORTED_LANGS.find((code) => code.toLowerCase() === raw);
        if (exact) return exact;
        const prefix = SUPPORTED_LANGS.find((code) => code.toLowerCase().startsWith(raw.split('-')[0]));
        return prefix || 'en';
    }

    function getLanguage() {
        const candidates = [
            bootstrap.lang,
            safeLocalStorageGet('statkiss_lang'),
            safeLocalStorageGet('statkiss.lang'),
            safeLocalStorageGet('lang'),
            document.documentElement.getAttribute('lang'),
            navigator.language,
        ];
        for (const raw of candidates) {
            const resolved = resolveLangCode(raw);
            if (resolved) return resolved;
        }
        return 'en';
    }

    const lang = getLanguage();
    const pageKey = normalizeText(bootstrap.url);
    const pageMode = normalizeText(bootstrap.mode);
    const pageMsg = normalizeText(bootstrap.msg);
    const supportEmail = normalizeText(bootstrap.contact_email) || 'info@statkiss.org';

    function isRTL(languageCode) {
        if (HeaderI18N && typeof HeaderI18N.isRTL === 'function') {
            return !!HeaderI18N.isRTL(languageCode);
        }
        return languageCode === 'ar';
    }

    function dirValue() {
        return isRTL(lang) ? 'rtl' : 'ltr';
    }

    function mergeMessages(target, source) {
        Object.keys(source || {}).forEach((code) => {
            if (!target[code]) target[code] = {};
            Object.assign(target[code], source[code]);
        });
        return target;
    }

    function extendPageMessages(bundle) {
        mergeMessages(PAGE_MESSAGES, bundle || {});
    }

    function lookup(bundle, key) {
        return (
            (bundle[lang] && bundle[lang][key] != null && bundle[lang][key] !== '' ? bundle[lang][key] : null) ||
            (bundle['en'] && bundle['en'][key] != null && bundle['en'][key] !== '' ? bundle['en'][key] : null) ||
            (bundle['ko'] && bundle['ko'][key] != null && bundle['ko'][key] !== '' ? bundle['ko'][key] : null) ||
            null
        );
    }

    function interpolate(template, params) {
        return String(template || '').replace(/\{\s*(\w+)\s*\}/g, function (_, key) {
            return params && params[key] != null ? String(params[key]) : '';
        });
    }

    function t(key, params) {
        const pageValue = lookup(PAGE_MESSAGES, key);
        if (pageValue != null) return interpolate(pageValue, params);

        const headerMap = {
            login: 'auth.login',
            signup: 'auth.signup',
            logout: 'auth.logout',
        };
        if (headerMap[key] && HeaderI18N && typeof HeaderI18N.t === 'function') {
            return interpolate(HeaderI18N.t(lang, headerMap[key]), params);
        }

        const commonValue = lookup(COMMON_MESSAGES, key);
        if (commonValue != null) return interpolate(commonValue, params);

        return interpolate(key, params);
    }

    function ensureTrailingSlash(pathname) {
        if (!pathname) return '/';
        return pathname.endsWith('/') ? pathname : pathname + '/';
    }

    function splitPath(pathname) {
        return String(pathname || '').split('/').filter(Boolean);
    }

    function getLocalePrefix(pathname) {
        const parts = splitPath(pathname || window.location.pathname);
        if (parts.length && SUPPORTED_LANGS.includes(parts[0])) {
            return '/' + parts[0];
        }
        return '';
    }

    function stripLocalePrefix(pathname) {
        const parts = splitPath(pathname);
        if (parts.length && SUPPORTED_LANGS.includes(parts[0])) {
            return '/' + parts.slice(1).join('/') + (String(pathname || '').endsWith('/') ? '/' : '');
        }
        return pathname || '/';
    }

    function prefixInternalPath(path, localePrefix) {
        if (!path || path[0] !== '/') return path;
        if (path === '/') return localePrefix ? localePrefix + '/' : '/';

        const parts = splitPath(path);
        if (!parts.length) return localePrefix ? localePrefix + '/' : '/';

        if (SUPPORTED_LANGS.includes(parts[0])) {
            parts[0] = localePrefix ? localePrefix.slice(1) : parts[0];
            return '/' + parts.join('/') + (path.endsWith('/') ? '/' : '');
        }
        if (localePrefix && ACCOUNT_SECTIONS.has(parts[0])) {
            return localePrefix + path;
        }
        return path;
    }

    const localePrefix = getLocalePrefix(window.location.pathname);

    function localizeInternalPath(path) {
        return prefixInternalPath(path, localePrefix);
    }

    function inferBasePath() {
        const pathname = ensureTrailingSlash(window.location.pathname);
        const suffixes = [];
        if (pageKey === 'change_password' && pageMode === 'auth') {
            suffixes.push('change_password/auth/');
        }
        if (pageKey) {
            suffixes.push(pageKey + '/');
        }
        for (const suffix of suffixes) {
            if (pathname.endsWith(suffix)) {
                return pathname.slice(0, pathname.length - suffix.length) || '/';
            }
        }
        return pathname;
    }

    const basePath = ensureTrailingSlash(inferBasePath());

    function pathFromBase(relativePath) {
        const url = new URL(relativePath, window.location.origin + basePath);
        return url.pathname;
    }

    function isAccountPath(pathname) {
        const stripped = stripLocalePrefix(pathname);
        return stripped === '/account/' || stripped.startsWith('/account/');
    }

    function unique(values) {
        return Array.from(new Set(values.filter(Boolean)));
    }

    function buildPathCandidates(relativePath) {
        const primary = pathFromBase(relativePath);
        const candidates = [primary];

        const stripped = stripLocalePrefix(primary);
        if (stripped && stripped !== primary) {
            candidates.push(stripped);
        }

        if (localePrefix && isAccountPath(stripped) && !primary.startsWith(localePrefix + '/')) {
            candidates.push(localePrefix + stripped);
        }

        if (localePrefix && isAccountPath(primary)) {
            candidates.push(stripLocalePrefix(primary));
        }

        return unique(candidates);
    }

    const routes = {
        login: (bootstrap.routes && bootstrap.routes.login) || basePath,
        signup: (bootstrap.routes && bootstrap.routes.signup) || pathFromBase('signup/'),
        welcome: (bootstrap.routes && bootstrap.routes.welcome) || pathFromBase('welcome/'),
        myinfo: (bootstrap.routes && bootstrap.routes.myinfo) || pathFromBase('myinfo/'),
        changePassword: (bootstrap.routes && bootstrap.routes.changePassword) || pathFromBase('change_password/'),
        changePasswordAuth: (bootstrap.routes && bootstrap.routes.changePasswordAuth) || pathFromBase('change_password/auth/'),
        logout: (bootstrap.routes && bootstrap.routes.logout) || pathFromBase('logout/'),
        home: (bootstrap.routes && bootstrap.routes.home) || localizeInternalPath('/'),
    };

    const api = {
        signin: bootstrap.api && bootstrap.api.signin ? buildPathCandidates(bootstrap.api.signin) : buildPathCandidates('ajax_signin_email/'),
        signup: bootstrap.api && bootstrap.api.signup ? buildPathCandidates(bootstrap.api.signup) : buildPathCandidates('ajax_signup/'),
        getUserinfo: bootstrap.api && bootstrap.api.getUserinfo ? buildPathCandidates(bootstrap.api.getUserinfo) : buildPathCandidates('ajax_get_userinfo/'),
        updateUserinfo: bootstrap.api && bootstrap.api.updateUserinfo ? buildPathCandidates(bootstrap.api.updateUserinfo) : buildPathCandidates('ajax_update_userinfo/'),
        sendAuthEmail: bootstrap.api && bootstrap.api.sendAuthEmail ? buildPathCandidates(bootstrap.api.sendAuthEmail) : buildPathCandidates('ajax_send_auth_email/'),
        checkAuthCode: bootstrap.api && bootstrap.api.checkAuthCode ? buildPathCandidates(bootstrap.api.checkAuthCode) : buildPathCandidates('ajax_check_auth_code/'),
        passwordChange: bootstrap.api && bootstrap.api.passwordChange ? buildPathCandidates(bootstrap.api.passwordChange) : buildPathCandidates('ajax_password_change/'),
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function ensureAccountDarkFallback() {
        if (document.getElementById('statkiss-account-dark-fallback')) return;
        const style = document.createElement('style');
        style.id = 'statkiss-account-dark-fallback';
        style.textContent = `
            html.dark .statkiss-account-card { background:#0b1220 !important; border-color:#1f2937 !important; color:#e2e8f0 !important; }
            html.dark .statkiss-account-card h1, html.dark .statkiss-account-card h2, html.dark .statkiss-account-card h3 { color:#f8fafc !important; }
            html.dark .statkiss-account-muted { color:#94a3b8 !important; }
            html.dark .statkiss-account-divider { border-color:#1f2937 !important; }
            html.dark .statkiss-account-input,
            html.dark .statkiss-account-textarea,
            html.dark .statkiss-account-select {
                background:#020617 !important;
                border-color:#334155 !important;
                color:#f8fafc !important;
            }
            html.dark .statkiss-account-soft {
                background:#111827 !important;
                border-color:#334155 !important;
                color:#e2e8f0 !important;
            }
            html.dark .statkiss-account-link { color:#7dd3fc !important; }
            html.dark .statkiss-account-outline-btn {
                border-color:#334155 !important;
                color:#e2e8f0 !important;
                background:transparent !important;
            }
            html.dark .statkiss-account-outline-btn:hover { background:#111827 !important; }
            html.dark .statkiss-account-solid-btn {
                background:#38bdf8 !important;
                color:#082f49 !important;
            }
        `;
        document.head.appendChild(style);
    }

    ensureAccountDarkFallback();

    function getMainElement() {
        return document.getElementById('div_main');
    }

    function getCsrfToken() {
        const cookie = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
    }

    function createFormData(values) {
        const formData = new FormData();
        Object.entries(values || {}).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            formData.append(key, value);
        });
        return formData;
    }

    function cloneFormData(formData) {
        if (!(formData instanceof FormData)) return formData;
        const copied = new FormData();
        formData.forEach((value, key) => {
            copied.append(key, value);
        });
        return copied;
    }

    async function fetchJSONCandidate(url, formData) {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCsrfToken(),
            },
            body: cloneFormData(formData),
        });

        const rawText = await response.text();
        let data = null;
        try {
            data = rawText ? JSON.parse(rawText) : {};
        } catch (error) {
            const parseError = new Error('NON_JSON_RESPONSE');
            parseError.status = response.status;
            parseError.rawText = rawText;
            parseError.url = url;
            throw parseError;
        }

        if (!response.ok) {
            const httpError = new Error('HTTP_' + response.status);
            httpError.status = response.status;
            httpError.data = data;
            httpError.url = url;
            throw httpError;
        }
        return data;
    }

    async function requestJSON(urlOrList, formData) {
        const candidates = Array.isArray(urlOrList) ? unique(urlOrList) : [urlOrList];
        let lastError = null;

        for (let index = 0; index < candidates.length; index += 1) {
            const candidate = candidates[index];
            try {
                return await fetchJSONCandidate(candidate, formData);
            } catch (error) {
                lastError = error;
                const canRetry = index < candidates.length - 1 && (
                    error.message === 'NON_JSON_RESPONSE' ||
                    error.status === 404
                );
                if (canRetry) continue;
                throw error;
            }
        }
        throw lastError || new Error('REQUEST_FAILED');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeText(email));
    }

    function validatePassword(password) {
        return String(password || '').length >= 8;
    }

    function queryParam(name) {
        return new URLSearchParams(window.location.search).get(name) || '';
    }

    function isChecked(id) {
        const node = document.getElementById(id);
        return !!(node && node.checked);
    }

    function valueOf(id) {
        const node = document.getElementById(id);
        return node ? node.value : '';
    }

    function setValue(id, value) {
        const node = document.getElementById(id);
        if (node) node.value = value == null ? '' : value;
    }

    function setChecked(id, checked) {
        const node = document.getElementById(id);
        if (node) node.checked = !!checked;
    }

    function setText(id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value == null ? '' : String(value);
    }

    function setNotice(message, kind) {
        const node = document.getElementById('account_notice');
        if (!node) return;
        if (!message) {
            node.className = 'hidden';
            node.textContent = '';
            return;
        }

        const colorByKind = {
            error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200',
            success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200',
            info: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-200',
        };

        node.className = 'w-full rounded-2xl border px-4 py-3 text-sm ' + (colorByKind[kind] || colorByKind.info);
        node.textContent = message;
    }

    function clearFieldErrors() {
        document.querySelectorAll('[data-field-error]').forEach((node) => {
            node.textContent = '';
            node.classList.add('hidden');
        });
    }

    function setFieldError(fieldName, message) {
        const node = document.querySelector('[data-field-error="' + fieldName + '"]');
        if (!node) {
            setNotice(message, 'error');
            return;
        }
        node.textContent = message;
        node.classList.remove('hidden');
    }

    function fieldError(fieldName) {
        return '<p data-field-error="' + escapeHtml(fieldName) + '" class="hidden mt-2 text-xs text-red-600 dark:text-red-300"></p>';
    }

    function textInput(id, label, options) {
        const settings = options || {};
        const type = settings.type || 'text';
        const readonly = settings.readonly ? 'readonly' : '';
        const autocomplete = settings.autocomplete ? 'autocomplete="' + escapeHtml(settings.autocomplete) + '"' : '';
        const placeholder = settings.placeholder ? 'placeholder="' + escapeHtml(settings.placeholder) + '"' : '';
        const value = settings.value ? 'value="' + escapeHtml(settings.value) + '"' : '';
        return [
            '<label for="' + escapeHtml(id) + '" class="block text-sm font-medium text-slate-700 dark:text-slate-200">' + escapeHtml(label) + '</label>',
            '<input id="' + escapeHtml(id) + '" type="' + escapeHtml(type) + '" ' + readonly + ' ' + autocomplete + ' ' + placeholder + ' ' + value + ' class="statkiss-account-input mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/60 ' + (settings.extraClass || '') + '">',
            settings.description ? '<p class="statkiss-account-muted mt-2 text-xs text-slate-500 dark:text-slate-400">' + escapeHtml(settings.description) + '</p>' : '',
            fieldError(id)
        ].join('');
    }

    function textareaInput(id, label, options) {
        const settings = options || {};
        return [
            '<label for="' + escapeHtml(id) + '" class="block text-sm font-medium text-slate-700 dark:text-slate-200">' + escapeHtml(label) + '</label>',
            '<textarea id="' + escapeHtml(id) + '" rows="4" placeholder="' + escapeHtml(settings.placeholder || '') + '" class="statkiss-account-textarea mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/60"></textarea>',
            fieldError(id)
        ].join('');
    }

    function selectInput(id, label, options, selectedValue) {
        const normalizedSelected = normalizeText(selectedValue);
        let hasSelected = !normalizedSelected;
        const items = ['<option value="">' + escapeHtml(t('select_placeholder')) + '</option>'];
        (options || []).forEach((item) => {
            const value = normalizeText(item.value);
            const selected = value === normalizedSelected ? 'selected' : '';
            if (selected) hasSelected = true;
            items.push('<option value="' + escapeHtml(value) + '" ' + selected + '>' + escapeHtml(item.label) + '</option>');
        });
        if (normalizedSelected && !hasSelected) {
            items.push('<option value="' + escapeHtml(normalizedSelected) + '" selected>' + escapeHtml(normalizedSelected) + '</option>');
        }
        return [
            '<label for="' + escapeHtml(id) + '" class="block text-sm font-medium text-slate-700 dark:text-slate-200">' + escapeHtml(label) + '</label>',
            '<select id="' + escapeHtml(id) + '" class="statkiss-account-select mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/60">' + items.join('') + '</select>',
            fieldError(id)
        ].join('');
    }

    function checkboxInput(id, label, description) {
        return [
            '<label class="statkiss-account-soft flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">',
            '  <input id="' + escapeHtml(id) + '" type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950">',
            '  <span class="min-w-0">',
            '      <span class="block text-sm font-medium text-slate-800 dark:text-slate-100">' + escapeHtml(label) + '</span>',
            description ? '      <span class="statkiss-account-muted mt-1 block text-xs text-slate-500 dark:text-slate-400">' + escapeHtml(description) + '</span>' : '',
            '  </span>',
            '</label>'
        ].join('');
    }

    function primaryButton(id, label) {
        return '<button id="' + escapeHtml(id) + '" type="submit" class="statkiss-account-solid-btn inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">' + escapeHtml(label) + '</button>';
    }

    function outlineButtonLink(href, label) {
        return '<a href="' + escapeHtml(href) + '" class="statkiss-account-outline-btn inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">' + escapeHtml(label) + '</a>';
    }

    function secondaryLink(href, label, extraClass) {
        return '<a href="' + escapeHtml(href) + '" class="statkiss-account-link text-sm font-medium text-sky-700 transition hover:underline dark:text-sky-300 ' + (extraClass || '') + '">' + escapeHtml(label) + '</a>';
    }

    function pageShell(title, description, bodyHtml, footerHtml) {
        return [
            '<section class="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10" dir="' + escapeHtml(dirValue()) + '">',
            '  <div class="statkiss-account-card rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:p-8">',
            '      <div class="mb-8">',
            '          <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">' + escapeHtml(title) + '</h1>',
            description ? '          <p class="statkiss-account-muted mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">' + escapeHtml(description) + '</p>' : '',
            '      </div>',
            '      <div id="account_notice" class="hidden"></div>',
            bodyHtml,
            footerHtml ? '<div class="statkiss-account-divider mt-8 border-t border-slate-200 pt-5 dark:border-slate-800">' + footerHtml + '</div>' : '',
            '  </div>',
            '</section>'
        ].join('');
    }

    function render(html) {
        const main = getMainElement();
        if (main) main.innerHTML = html;
    }

    function setButtonLoading(button, loadingLabel, isLoading) {
        if (!button) return;
        if (isLoading) {
            button.dataset.originalLabel = button.textContent;
            button.disabled = true;
            button.textContent = loadingLabel;
            return;
        }
        button.disabled = false;
        if (button.dataset.originalLabel) {
            button.textContent = button.dataset.originalLabel;
        }
    }

    function bindSubmit(formId, handler) {
        const form = document.getElementById(formId);
        if (!form) return;
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            handler(event);
        });
    }

    function genderOptions() {
        return [
            { value: 'Male', label: t('gender_male') },
            { value: 'Female', label: t('gender_female') },
            { value: 'Other', label: t('gender_other') },
            { value: 'Prefer not to say', label: t('gender_noanswer') },
        ];
    }

    function educationOptions() {
        return [
            { value: 'Bachelor', label: t('edu_bachelor') },
            { value: 'Master', label: t('edu_master') },
            { value: 'Doctor', label: t('edu_doctor') },
            { value: 'Other', label: t('edu_other') },
        ];
    }

    function handleRequestError(error) {
        console.error('[StatKISS account frontend]', error);
        if (error && error.message === 'NON_JSON_RESPONSE') {
            setNotice(t('endpoint_error') + ' [' + error.url + ']', 'error');
            return;
        }
        if (error && error.status === 404 && error.url) {
            setNotice(t('endpoint_error') + ' [' + error.url + ']', 'error');
            return;
        }
        setNotice(t('generic_error'), 'error');
    }

    function redirect(url) {
        window.location.href = url;
    }

    window.StatKISSAccount = {
        bootstrap,
        pageKey,
        pageMode,
        pageMsg,
        lang,
        api,
        routes,
        supportEmail,
        t,
        extendPageMessages,
        render,
        pageShell,
        textInput,
        textareaInput,
        selectInput,
        checkboxInput,
        primaryButton,
        outlineButtonLink,
        secondaryLink,
        setNotice,
        clearFieldErrors,
        setFieldError,
        createFormData,
        requestJSON,
        validateEmail,
        validatePassword,
        queryParam,
        valueOf,
        setValue,
        setChecked,
        setText,
        bindSubmit,
        genderOptions,
        educationOptions,
        setButtonLoading,
        handleRequestError,
        redirect,
        escapeHtml,
        isChecked,
        dirValue,
    };

})();
