window.set_main = function () {
    'use strict';

    const app = window.StatKISSAccount;
    const pageI18N = window.StatKISSAccountSignupI18N || window.StatKISSAccountAccountI18N || null;
    const MIN_PASSWORD_LENGTH = 8;
    const RETURN_TO_KEY = 'statkiss_account_signup_return_to';
    const FALLBACK_LANGS = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];
    const HELPER_BASE_CLASS = 'mt-2 min-h-[1.25rem] text-xs';

    if (!app) return;

    const pageMessages = window.StatKISSAccountSignupMessages || window.StatKISSAccountAccountMessages || {};

    if (typeof app.extendPageMessages === 'function') {
        app.extendPageMessages(pageMessages);
    }

    function t(key) {
        if (pageI18N && typeof pageI18N.t === 'function') {
            return pageI18N.t(key, pageI18N.getCurrentLang());
        }
        if (typeof app.t === 'function') return app.t(key);
        return key;
    }

    function getSupportedLangs() {
        if (pageI18N && typeof pageI18N.getSupportedLangs === 'function') return pageI18N.getSupportedLangs();
        if (window.StatKISS_I18N && Array.isArray(window.StatKISS_I18N.languages)) {
            return window.StatKISS_I18N.languages.map(function (item) { return item.code; });
        }
        return FALLBACK_LANGS.slice();
    }

    function resolveLangCode(code) {
        if (pageI18N && typeof pageI18N.resolveLangCode === 'function') return pageI18N.resolveLangCode(code || 'en');
        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.resolveLangCode === 'function') {
            return window.StatKISS_I18N.resolveLangCode(code || 'en');
        }
        if (!code) return 'en';
        const c = String(code).trim();
        const lower = c.toLowerCase();
        if (c === 'zh' || lower.startsWith('zh-')) {
            if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) return 'zh-Hant';
            return 'zh-Hans';
        }
        if (c === 'tl' || lower.startsWith('tl-') || c === 'fil' || lower.startsWith('fil-')) return 'fil';
        if (c === 'pt' || lower.startsWith('pt-')) return 'pt-BR';
        if (lower.startsWith('en-')) return 'en';
        if (lower.startsWith('ja-')) return 'ja';
        if (lower.startsWith('ko-')) return 'ko';
        return c;
    }


    function injectAuthDarkModeCss() {
        if (document.getElementById('statkiss-auth-dark-mode-fix')) return;

        const style = document.createElement('style');
        style.id = 'statkiss-auth-dark-mode-fix';
        style.textContent = `
            html.dark [data-statkiss-auth-scope] h1,
            html.dark [data-statkiss-auth-scope] h2,
            html.dark [data-statkiss-auth-scope] h3,
            html.dark [data-statkiss-auth-scope] h4,
            html.dark [data-statkiss-auth-scope] label,
            html.dark [data-statkiss-auth-scope] .statkiss-account-title,
            html.dark [data-statkiss-auth-scope] .text-slate-900,
            html.dark [data-statkiss-auth-scope] .text-slate-800,
            html.dark [data-statkiss-auth-scope] .text-slate-700,
            html.dark [data-statkiss-auth-scope] .text-gray-900,
            html.dark [data-statkiss-auth-scope] .text-gray-800,
            html.dark [data-statkiss-auth-scope] .text-gray-700 {
                color: #f8fafc !important;
            }

            html.dark [data-statkiss-auth-scope] p,
            html.dark [data-statkiss-auth-scope] .statkiss-account-muted,
            html.dark [data-statkiss-auth-scope] .statkiss-account-subtitle,
            html.dark [data-statkiss-auth-scope] .text-slate-600,
            html.dark [data-statkiss-auth-scope] .text-slate-500,
            html.dark [data-statkiss-auth-scope] .text-slate-400,
            html.dark [data-statkiss-auth-scope] .text-gray-600,
            html.dark [data-statkiss-auth-scope] .text-gray-500,
            html.dark [data-statkiss-auth-scope] .text-gray-400 {
                color: #cbd5e1 !important;
            }

            html.dark [data-statkiss-auth-scope] input,
            html.dark [data-statkiss-auth-scope] select,
            html.dark [data-statkiss-auth-scope] textarea {
                color: #f8fafc !important;
                caret-color: #f8fafc !important;
                border-color: rgba(148, 163, 184, 0.35) !important;
                background: rgba(15, 23, 42, 0.82) !important;
            }

            html.dark [data-statkiss-auth-scope] input::placeholder,
            html.dark [data-statkiss-auth-scope] textarea::placeholder {
                color: #94a3b8 !important;
            }

            html.dark [data-statkiss-auth-scope] option {
                color: #e2e8f0 !important;
                background: #020617 !important;
            }

            html.dark [data-statkiss-auth-scope] input[type="checkbox"] {
                accent-color: #38bdf8;
            }

            html.dark [data-statkiss-auth-scope] .statkiss-account-link,
            html.dark [data-statkiss-auth-scope] a[href^="mailto:"] {
                color: #7dd3fc !important;
            }

            html.dark [data-statkiss-auth-scope] input:-webkit-autofill,
            html.dark [data-statkiss-auth-scope] input:-webkit-autofill:hover,
            html.dark [data-statkiss-auth-scope] input:-webkit-autofill:focus,
            html.dark [data-statkiss-auth-scope] textarea:-webkit-autofill,
            html.dark [data-statkiss-auth-scope] select:-webkit-autofill {
                -webkit-text-fill-color: #f8fafc !important;
                -webkit-box-shadow: 0 0 0 1000px rgba(15, 23, 42, 0.82) inset !important;
                transition: background-color 9999s ease-in-out 0s;
            }
        `;
        document.head.appendChild(style);
    }

    function tagAuthScope(formId, pageName) {
        const formEl = document.getElementById(formId);
        if (!formEl) return;

        formEl.setAttribute('data-statkiss-auth-scope', pageName);

        let el = formEl.parentElement;
        let depth = 0;
        while (el && el !== document.body && depth < 6) {
            el.setAttribute('data-statkiss-auth-scope', pageName);
            if (/^(main|section|article)$/i.test(el.tagName)) break;
            el = el.parentElement;
            depth += 1;
        }
    }


    function optionTranslationKey(selectId, option) {
        if (!option) return null;

        const rawValue = String(option.value == null ? '' : option.value).trim();
        const rawLabel = String(option.textContent == null ? '' : option.textContent).trim();
        const value = rawValue.toLowerCase();
        const label = rawLabel.toLowerCase();

        if (!rawValue || !rawLabel || /^select\b|choose\b|please select\b/.test(label)) {
            return 'select_option';
        }

        if (selectId === 'sel_gender') {
            if (/prefer.*not|rather not|no answer|n\/a/.test(value) || /prefer.*not|rather not|no answer/.test(label)) return 'gender_prefer_not_to_say';
            if (/non.?binary/.test(value) || /non.?binary/.test(label)) return 'gender_nonbinary';
            if (/female|woman|girl/.test(value) || /female|woman|girl/.test(label)) return 'gender_female';
            if (/male|man|boy/.test(value) || /male|man|boy/.test(label)) return 'gender_male';
            if (/other/.test(value) || /other/.test(label)) return 'gender_other';
        }

        if (selectId === 'sel_education') {
            if (/high.*school|secondary/.test(value) || /high.*school|secondary/.test(label)) return 'education_high_school';
            if (/undergrad/.test(value) || /undergrad/.test(label)) return 'education_undergraduate';
            if (/bachelor/.test(value) || /bachelor/.test(label)) return 'education_bachelor';
            if (/master/.test(value) || /master/.test(label)) return 'education_master';
            if (/postdoc/.test(value) || /postdoc/.test(label)) return 'education_postdoc';
            if (/faculty|professor|lecturer|instructor/.test(value) || /faculty|professor|lecturer|instructor/.test(label)) return 'education_faculty';
            if (/doctor|doctoral|phd/.test(value) || /doctor|doctoral|phd/.test(label)) {
                return /phd/.test(value) || /phd/.test(label) ? 'education_phd' : 'education_doctoral';
            }
            if (/other/.test(value) || /other/.test(label)) return 'education_other';
        }

        return null;
    }

    function localizeSelectOptions() {
        ['sel_gender', 'sel_education'].forEach(function (selectId) {
            const selectEl = document.getElementById(selectId);
            if (!selectEl || !selectEl.options) return;

            Array.prototype.forEach.call(selectEl.options, function (option) {
                const key = optionTranslationKey(selectId, option);
                if (!key) return;
                option.textContent = t(key);
            });
        });
    }


    function splitPathParts(pathname) {
        return String(pathname || '').split('/').filter(Boolean);
    }

    function stripLangPrefix(pathname) {
        const parts = splitPathParts(pathname);
        const supported = getSupportedLangs();
        if (parts.length && supported.includes(resolveLangCode(parts[0]))) {
            return parts.slice(1);
        }
        return parts;
    }

    function isLangOnlyPath(pathname) {
        const parts = splitPathParts(pathname);
        return parts.length === 1 && getSupportedLangs().includes(resolveLangCode(parts[0]));
    }

    function isLoginPath(pathname) {
        const parts = stripLangPrefix(pathname);
        return parts.length === 1 && parts[0] === 'account';
    }

    function isSignupPath(pathname) {
        const parts = stripLangPrefix(pathname);
        return parts.length >= 2 && parts[0] === 'account' && (parts[1] === 'signup' || parts[1] === 'register');
    }

    function isLogoutPath(pathname) {
        const parts = stripLangPrefix(pathname);
        return parts.length >= 2 && parts[0] === 'account' && parts[1] === 'logout';
    }

    function normalizeRedirectTarget(value, options) {
        const opts = options || {};
        if (!value) return null;

        try {
            const url = new URL(String(value), window.location.origin);
            if (url.origin !== window.location.origin) return null;

            const pathname = url.pathname || '/';
            if (isLangOnlyPath(pathname)) return null;
            if (!opts.allowLogin && isLoginPath(pathname)) return null;
            if (!opts.allowSignup && isSignupPath(pathname)) return null;
            if (isLogoutPath(pathname)) return null;

            const current = window.location.pathname + window.location.search + window.location.hash;
            const next = pathname + url.search + url.hash;
            if (next === current) return null;
            return next;
        } catch (_) {
            return null;
        }
    }

    const nextUrl = typeof app.queryParam === 'function' ? app.queryParam('next') : '';
    const rememberedReturnTo = normalizeRedirectTarget(nextUrl) || normalizeRedirectTarget(document.referrer);

    if (rememberedReturnTo) {
        try { sessionStorage.setItem(RETURN_TO_KEY, rememberedReturnTo); } catch (_) {}
    }

    function getSuccessRedirectUrl() {
        const candidateFromQuery = normalizeRedirectTarget(nextUrl);
        if (candidateFromQuery) return candidateFromQuery;

        try {
            const stored = normalizeRedirectTarget(sessionStorage.getItem(RETURN_TO_KEY));
            if (stored) return stored;
        } catch (_) {}

        const candidateFromReferrer = normalizeRedirectTarget(document.referrer);
        if (candidateFromReferrer) return candidateFromReferrer;

        const welcomeRoute = normalizeRedirectTarget(app.routes && app.routes.welcome, { allowLogin: true });
        if (welcomeRoute) return welcomeRoute;

        const loginRoute = normalizeRedirectTarget(app.routes && app.routes.login, { allowLogin: true });
        if (loginRoute) return loginRoute;

        return '/';
    }

    function emailFormCheckValue(value) {
        const email = String(value || '').trim();
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!email) return 'NOT EXIST';
        return regExp.test(email) ? 'SUCCESS' : 'FAILED';
    }

    function passwordFormCheckValue(value, minLen) {
        const passwd = String(value || '').trim();
        if (!passwd) return 'NOT EXIST';
        return passwd.length < minLen ? 'FAILED' : 'SUCCESS';
    }

    function confirmPasswordCheckValue(password, confirmPassword) {
        const confirmValue = String(confirmPassword || '').trim();
        if (!confirmValue) return 'NOT EXIST';
        return String(password || '') === String(confirmPassword || '') ? 'SUCCESS' : 'FAILED';
    }

    function setHelper(fieldId, message, tone) {
        const helperEl = document.getElementById(fieldId + '_helper');
        if (!helperEl) return;

        const toneClass = {
            info: 'text-slate-500 dark:text-slate-400',
            success: 'text-emerald-600 dark:text-emerald-400',
            error: 'text-rose-600 dark:text-rose-400'
        }[tone || 'info'];

        helperEl.className = HELPER_BASE_CLASS + ' ' + toneClass;
        helperEl.textContent = message || '';
    }

    function applyFieldTone(fieldId, tone) {
        const fieldEl = document.getElementById(fieldId);
        if (!fieldEl) return;

        const classesToRemove = [
            'border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200', 'dark:border-rose-400',
            'border-emerald-500', 'focus:border-emerald-500', 'focus:ring-emerald-200', 'dark:border-emerald-400'
        ];
        fieldEl.classList.remove.apply(fieldEl.classList, classesToRemove);
        fieldEl.removeAttribute('aria-invalid');

        if (tone === 'error') {
            fieldEl.classList.add('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200', 'dark:border-rose-400');
            fieldEl.setAttribute('aria-invalid', 'true');
            return;
        }
        if (tone === 'success') {
            fieldEl.classList.add('border-emerald-500', 'focus:border-emerald-500', 'focus:ring-emerald-200', 'dark:border-emerald-400');
        }
    }

    function showFieldMessage(fieldId, message, tone) {
        setHelper(fieldId, message, tone || 'info');
        applyFieldTone(fieldId, tone || 'info');
    }

    function clearFieldMessage(fieldId) {
        setHelper(fieldId, '', 'info');
        applyFieldTone(fieldId, 'info');
    }

    function clearLocalFeedback() {
        ['txt_email', 'txt_password', 'txt_password_confirm', 'txt_name'].forEach(clearFieldMessage);
    }

    function clearTransientErrors() {
        if (typeof app.clearFieldErrors === 'function') app.clearFieldErrors();
        if (typeof app.setNotice === 'function') app.setNotice('', 'info');
    }

    const formHtml = [
        '<form id="account_signup_form" class="space-y-6">',
        '  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
        '      <div class="sm:col-span-2">',
        '          ' + app.textInput('txt_email', t('email'), { type: 'email', autocomplete: 'email', spellcheck: 'false' }),
        '          <div id="txt_email_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div>',
        '      </div>',
        '      <div>',
        '          ' + app.textInput('txt_password', t('password'), { type: 'password', autocomplete: 'new-password' }),
        '          <div id="txt_password_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div>',
        '      </div>',
        '      <div>',
        '          ' + app.textInput('txt_password_confirm', t('password_confirm'), { type: 'password', autocomplete: 'new-password' }),
        '          <div id="txt_password_confirm_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div>',
        '      </div>',
        '      <div class="sm:col-span-2">',
        '          ' + app.textInput('txt_name', t('name'), { autocomplete: 'name' }),
        '          <div id="txt_name_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div>',
        '      </div>',
        '      <div>' + app.textInput('txt_affiliation', t('affiliation'), {}) + '</div>',
        '      <div>' + app.textInput('txt_title', t('title'), {}) + '</div>',
        '      <div>' + app.selectInput('sel_gender', t('gender'), app.genderOptions()) + '</div>',
        '      <div>' + app.selectInput('sel_education', t('education'), app.educationOptions()) + '</div>',
        '      <div class="sm:col-span-2">' + app.textareaInput('txt_interest', t('interest'), { placeholder: t('no_interest_placeholder') }) + '</div>',
        '      <div class="sm:col-span-2">' + app.checkboxInput('chk_student', t('student_member'), t('student_member_desc')) + '</div>',
        '  </div>',
        '  <div class="pt-2">' + app.primaryButton('btn_signup', t('signup')) + '</div>',
        '</form>'
    ].join('');

    const footerHtml = '<div class="text-sm statkiss-account-muted text-slate-500 dark:text-slate-400">' +
        t('back_to_login') + ': ' + app.secondaryLink(app.routes.login, t('login')) +
        '</div>';

    injectAuthDarkModeCss();
    app.render(app.pageShell(t('signup_title'), t('signup_desc'), formHtml, footerHtml));
    tagAuthScope('account_signup_form', 'signup');
    localizeSelectOptions();

    const emailEl = document.getElementById('txt_email');
    const passwordEl = document.getElementById('txt_password');
    const confirmEl = document.getElementById('txt_password_confirm');
    const nameEl = document.getElementById('txt_name');

    function updateEmailHelper(force) {
        if (!emailEl) return 'NOT EXIST';

        const touched = emailEl.dataset.touched === '1';
        const status = emailFormCheckValue(emailEl.value);
        const shouldShow = force || touched || String(emailEl.value || '').trim() !== '';

        if (!shouldShow) {
            clearFieldMessage('txt_email');
            return status;
        }

        if (status === 'SUCCESS') {
            showFieldMessage('txt_email', t('email_help_valid'), 'success');
        } else if (status === 'FAILED') {
            showFieldMessage('txt_email', t('email_help_invalid'), 'error');
        } else {
            showFieldMessage('txt_email', t('email_help_empty'), 'error');
        }

        return status;
    }

    function updatePasswordHelper(force) {
        if (!passwordEl) return 'NOT EXIST';

        const touched = passwordEl.dataset.touched === '1';
        const status = passwordFormCheckValue(passwordEl.value, MIN_PASSWORD_LENGTH);
        const shouldShow = force || touched || String(passwordEl.value || '').trim() !== '';

        if (!shouldShow) {
            clearFieldMessage('txt_password');
            return status;
        }

        if (status === 'SUCCESS') {
            showFieldMessage('txt_password', t('password_help_valid'), 'success');
        } else if (status === 'FAILED') {
            showFieldMessage('txt_password', t('password_help_short'), 'error');
        } else {
            showFieldMessage('txt_password', t('password_help_empty'), 'error');
        }

        return status;
    }

    function updatePasswordConfirmHelper(force) {
        if (!confirmEl) return 'NOT EXIST';

        const touched = confirmEl.dataset.touched === '1';
        const hasPasswordValue = passwordEl && String(passwordEl.value || '').trim() !== '';
        const status = confirmPasswordCheckValue(passwordEl ? passwordEl.value : '', confirmEl.value);
        const shouldShow = force || touched || String(confirmEl.value || '').trim() !== '' || hasPasswordValue;

        if (!shouldShow) {
            clearFieldMessage('txt_password_confirm');
            return status;
        }

        if (status === 'SUCCESS') {
            showFieldMessage('txt_password_confirm', t('password_confirm_help_valid'), 'success');
        } else if (status === 'FAILED') {
            showFieldMessage('txt_password_confirm', t('password_confirm_help_mismatch'), 'error');
        } else {
            showFieldMessage('txt_password_confirm', t('password_confirm_help_empty'), 'error');
        }

        return status;
    }

    function updateNameHelper(force) {
        if (!nameEl) return 'NOT EXIST';

        const touched = nameEl.dataset.touched === '1';
        const value = String(nameEl.value || '').trim();
        const shouldShow = force || touched || value !== '';

        if (!shouldShow) {
            clearFieldMessage('txt_name');
            return value ? 'SUCCESS' : 'NOT EXIST';
        }

        if (value) {
            clearFieldMessage('txt_name');
            return 'SUCCESS';
        }

        showFieldMessage('txt_name', t('invalid_name'), 'error');
        return 'NOT EXIST';
    }

    if (emailEl) {
        emailEl.addEventListener('input', function () {
            emailEl.dataset.touched = '1';
            clearTransientErrors();
            updateEmailHelper(false);
        });
        emailEl.addEventListener('blur', function () {
            emailEl.dataset.touched = '1';
            updateEmailHelper(true);
        });
    }

    if (passwordEl) {
        passwordEl.addEventListener('input', function () {
            passwordEl.dataset.touched = '1';
            clearTransientErrors();
            updatePasswordHelper(false);
            if (confirmEl && (confirmEl.dataset.touched === '1' || String(confirmEl.value || '').trim() !== '')) {
                updatePasswordConfirmHelper(false);
            }
        });
        passwordEl.addEventListener('blur', function () {
            passwordEl.dataset.touched = '1';
            updatePasswordHelper(true);
            if (confirmEl && (confirmEl.dataset.touched === '1' || String(confirmEl.value || '').trim() !== '')) {
                updatePasswordConfirmHelper(true);
            }
        });
    }

    if (confirmEl) {
        confirmEl.addEventListener('input', function () {
            confirmEl.dataset.touched = '1';
            clearTransientErrors();
            updatePasswordConfirmHelper(false);
        });
        confirmEl.addEventListener('blur', function () {
            confirmEl.dataset.touched = '1';
            updatePasswordConfirmHelper(true);
        });
    }

    if (nameEl) {
        nameEl.addEventListener('input', function () {
            nameEl.dataset.touched = '1';
            clearTransientErrors();
            updateNameHelper(false);
        });
        nameEl.addEventListener('blur', function () {
            nameEl.dataset.touched = '1';
            updateNameHelper(true);
        });
    }

    app.bindSubmit('account_signup_form', async function () {
        clearTransientErrors();
        clearLocalFeedback();

        if (emailEl) emailEl.dataset.touched = '1';
        if (passwordEl) passwordEl.dataset.touched = '1';
        if (confirmEl) confirmEl.dataset.touched = '1';
        if (nameEl) nameEl.dataset.touched = '1';

        const email = app.valueOf('txt_email');
        const password = app.valueOf('txt_password');
        const passwordConfirm = app.valueOf('txt_password_confirm');
        const name = app.valueOf('txt_name');
        const button = document.getElementById('btn_signup');

        const emailStatus = updateEmailHelper(true);
        const passwordStatus = updatePasswordHelper(true);
        const confirmStatus = updatePasswordConfirmHelper(true);
        const nameStatus = updateNameHelper(true);

        if (emailStatus !== 'SUCCESS') return;
        if (passwordStatus !== 'SUCCESS') return;
        if (confirmStatus !== 'SUCCESS') return;
        if (nameStatus !== 'SUCCESS') return;

        try {
            app.setButtonLoading(button, t('signing_up'), true);
            const response = await app.requestJSON(app.api.signup, app.createFormData({
                txt_email: email,
                txt_password: password,
                txt_name: name,
                txt_affiliation: app.valueOf('txt_affiliation'),
                txt_title: app.valueOf('txt_title'),
                sel_gender: app.valueOf('sel_gender'),
                sel_education: app.valueOf('sel_education'),
                txt_interest: app.valueOf('txt_interest'),
                chk_student: app.isChecked('chk_student') ? 'true' : '',
            }));

            if (response.checker === 'SUCCESS') {
                if (typeof app.setNotice === 'function') app.setNotice(t('signup_success'), 'success');
                const targetUrl = getSuccessRedirectUrl();
                try { sessionStorage.removeItem(RETURN_TO_KEY); } catch (_) {}
                app.redirect(targetUrl);
                return;
            }
            if (response.checker === 'EXIST') {
                showFieldMessage('txt_email', t('email_in_use'), 'error');
                return;
            }
            if (typeof app.setNotice === 'function') app.setNotice(response.checker || t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, t('signing_up'), false);
        }
    });
};
