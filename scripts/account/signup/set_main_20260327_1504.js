window.set_main = function () {
    'use strict';

    const app = window.StatKISSAccount;
    const pageI18N = window.StatKISSAccountSignupI18N || null;
    const MIN_PASSWORD_LENGTH = 8;
    const RETURN_TO_KEY = 'statkiss_account_signup_return_to';
    const HELPER_BASE_CLASS = 'mt-2 min-h-[1.25rem] text-xs';
    const GOOGLE_MESSAGE_MAP = {
        GOOGLE_DISABLED: { key: 'google_disabled', kind: 'error' },
        GOOGLE_ACCESS_DENIED: { key: 'google_access_denied', kind: 'error' },
        GOOGLE_AUTH_FAILED: { key: 'google_auth_failed', kind: 'error' },
        GOOGLE_EMAIL_NOT_VERIFIED: { key: 'google_email_not_verified', kind: 'error' },
        GOOGLE_AMBIGUOUS_EMAIL: { key: 'google_ambiguous_email', kind: 'error' },
        GOOGLE_ALREADY_LINKED: { key: 'google_already_linked', kind: 'error' },
        GOOGLE_LINK_CONFLICT: { key: 'google_link_conflict', kind: 'error' }
    };

    if (!app) return;

    if (typeof app.extendPageMessages === 'function') {
        app.extendPageMessages(window.StatKISSAccountSignupMessages || {});
    }

    function t(key) {
        if (pageI18N && typeof pageI18N.t === 'function') {
            return pageI18N.t(key, pageI18N.getCurrentLang());
        }
        return typeof app.t === 'function' ? app.t(key) : key;
    }

    function escapeHtml(value) {
        return typeof app.escapeHtml === 'function' ? app.escapeHtml(value) : String(value == null ? '' : value);
    }

    function normalizeRedirectTarget(value) {
        if (!value) return null;
        try {
            const url = new URL(String(value), window.location.origin);
            if (url.origin !== window.location.origin) return null;
            const pathname = url.pathname || '/';
            if (!pathname.startsWith('/')) return null;
            return pathname + (url.search || '') + (url.hash || '');
        } catch (error) {
            return null;
        }
    }

    const nextUrl = typeof app.queryParam === 'function' ? app.queryParam('next') : '';
    const rememberedReturnTo = normalizeRedirectTarget(nextUrl) || normalizeRedirectTarget(document.referrer);
    if (rememberedReturnTo) {
        try { sessionStorage.setItem(RETURN_TO_KEY, rememberedReturnTo); } catch (error) {}
    }

    function getPreferredNextUrl() {
        const fromQuery = normalizeRedirectTarget(nextUrl);
        if (fromQuery) return fromQuery;
        try {
            const stored = normalizeRedirectTarget(sessionStorage.getItem(RETURN_TO_KEY));
            if (stored) return stored;
        } catch (error) {}
        return '';
    }

    function getSuccessRedirectUrl() {
        return getPreferredNextUrl() || (app.routes && app.routes.welcome) || '/';
    }

    function withNext(url, next) {
        if (!url) return '';
        if (!next) return url;
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'next=' + encodeURIComponent(next);
    }

    function googleSignupHref() {
        return withNext(app.routes && app.routes.googleSignup, getPreferredNextUrl());
    }

    function googleEnabled() {
        return !!(app.bootstrap && app.bootstrap.features && app.bootstrap.features.google_oauth_enabled && googleSignupHref());
    }

    function setHelper(fieldId, message, tone) {
        const helper = document.getElementById(fieldId + '_helper');
        if (!helper) return;
        const toneClass = {
            info: 'text-slate-500 dark:text-slate-400',
            success: 'text-emerald-600 dark:text-emerald-400',
            error: 'text-rose-600 dark:text-rose-400'
        }[tone || 'info'] || 'text-slate-500 dark:text-slate-400';
        helper.className = HELPER_BASE_CLASS + ' ' + toneClass;
        helper.textContent = message || '';
    }

    function applyFieldTone(fieldId, tone) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        field.classList.remove('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200', 'dark:border-rose-400', 'border-emerald-500', 'focus:border-emerald-500', 'focus:ring-emerald-200', 'dark:border-emerald-400');
        field.removeAttribute('aria-invalid');
        if (tone === 'error') {
            field.classList.add('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200', 'dark:border-rose-400');
            field.setAttribute('aria-invalid', 'true');
        } else if (tone === 'success') {
            field.classList.add('border-emerald-500', 'focus:border-emerald-500', 'focus:ring-emerald-200', 'dark:border-emerald-400');
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

    function emailStatus(value) {
        const email = String(value || '').trim();
        if (!email) return 'NOT_EXIST';
        return typeof app.validateEmail === 'function' && app.validateEmail(email) ? 'SUCCESS' : 'FAILED';
    }

    function passwordStatus(value) {
        const password = String(value || '');
        if (!password) return 'NOT_EXIST';
        return typeof app.validatePassword === 'function' ? (app.validatePassword(password) ? 'SUCCESS' : 'FAILED') : (password.length >= MIN_PASSWORD_LENGTH ? 'SUCCESS' : 'FAILED');
    }

    function passwordConfirmStatus(password, confirmPassword) {
        const value = String(confirmPassword || '');
        if (!value) return 'NOT_EXIST';
        return String(password || '') === value ? 'SUCCESS' : 'FAILED';
    }

    function updateEmailHelper(force) {
        const field = document.getElementById('txt_email');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = emailStatus(field.value);
        const shouldShow = force || touched || String(field.value || '').trim() !== '';
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
        const field = document.getElementById('txt_password');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = passwordStatus(field.value);
        const shouldShow = force || touched || String(field.value || '').trim() !== '';
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
        const field = document.getElementById('txt_password_confirm');
        const passwordField = document.getElementById('txt_password');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = passwordConfirmStatus(passwordField ? passwordField.value : '', field.value);
        const shouldShow = force || touched || String(field.value || '').trim() !== '';
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
        const field = document.getElementById('txt_name');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const value = String(field.value || '').trim();
        const shouldShow = force || touched || value !== '';
        if (!shouldShow) {
            clearFieldMessage('txt_name');
            return value ? 'SUCCESS' : 'NOT_EXIST';
        }
        if (value) {
            clearFieldMessage('txt_name');
            return 'SUCCESS';
        }
        showFieldMessage('txt_name', t('invalid_name'), 'error');
        return 'NOT_EXIST';
    }

    function renderChoiceSection() {
        if (!googleEnabled()) return '';
        return [
            '<section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
            '  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">',
            '    <div class="space-y-2">',
            '      <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(t('signup_method_choice_title')) + '</h2>',
            '      <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">' + escapeHtml(t('signup_method_choice_desc')) + '</p>',
            '    </div>',
            '    <a id="btn_google_signup" href="' + escapeHtml(googleSignupHref()) + '" class="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900">' + escapeHtml(t('continue_with_google')) + '</a>',
            '  </div>',
            '</section>'
        ].join('');
    }

    const bodyHtml = [
        renderChoiceSection(),
        '<section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
        '  <div class="mb-5 space-y-1">',
        '    <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(t('email_signup_title')) + '</h2>',
        '    <p class="text-sm text-slate-600 dark:text-slate-300">' + escapeHtml(t('email_signup_desc')) + '</p>',
        '  </div>',
        '  <form id="account_signup_form" class="space-y-6">',
        '    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
        '      <div class="sm:col-span-2">' + app.textInput('txt_email', t('email'), { type: 'email', autocomplete: 'email', spellcheck: 'false' }) + '<div id="txt_email_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div></div>',
        '      <div>' + app.textInput('txt_password', t('password'), { type: 'password', autocomplete: 'new-password' }) + '<div id="txt_password_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div></div>',
        '      <div>' + app.textInput('txt_password_confirm', t('password_confirm'), { type: 'password', autocomplete: 'new-password' }) + '<div id="txt_password_confirm_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div></div>',
        '      <div class="sm:col-span-2">' + app.textInput('txt_name', t('name'), { autocomplete: 'name' }) + '<div id="txt_name_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div></div>',
        '      <div>' + app.textInput('txt_affiliation', t('affiliation'), {}) + '</div>',
        '      <div>' + app.textInput('txt_title', t('title'), {}) + '</div>',
        '      <div>' + app.selectInput('sel_gender', t('gender'), app.genderOptions()) + '</div>',
        '      <div>' + app.selectInput('sel_education', t('education'), app.educationOptions()) + '</div>',
        '      <div class="sm:col-span-2">' + app.textareaInput('txt_interest', t('interest'), { placeholder: t('no_interest_placeholder') }) + '</div>',
        '      <div class="sm:col-span-2">' + app.checkboxInput('chk_student', t('student_member'), t('student_member_desc')) + '</div>',
        '    </div>',
        '    <div class="pt-2">' + app.primaryButton('btn_signup', t('signup')) + '</div>',
        '  </form>',
        '</section>'
    ].join('');

    const footerHtml = '<div class="text-sm text-slate-500 dark:text-slate-400">' + escapeHtml(t('back_to_login')) + ' ' + app.secondaryLink(app.routes.login, t('login')) + '</div>';
    app.render(app.pageShell(t('signup_title'), t('signup_desc'), bodyHtml, footerHtml));

    const initialMessage = GOOGLE_MESSAGE_MAP[app.pageMsg || ''];
    if (initialMessage && typeof app.setNotice === 'function') {
        app.setNotice(t(initialMessage.key), initialMessage.kind || 'error');
    }

    ['txt_email', 'txt_password', 'txt_password_confirm', 'txt_name'].forEach(function (id) {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener('input', function () {
            field.dataset.touched = '1';
            if (typeof app.setNotice === 'function') app.setNotice('', 'info');
            if (id === 'txt_email') updateEmailHelper(false);
            if (id === 'txt_password') {
                updatePasswordHelper(false);
                updatePasswordConfirmHelper(false);
            }
            if (id === 'txt_password_confirm') updatePasswordConfirmHelper(false);
            if (id === 'txt_name') updateNameHelper(false);
        });
        field.addEventListener('blur', function () {
            field.dataset.touched = '1';
            if (id === 'txt_email') updateEmailHelper(true);
            if (id === 'txt_password') {
                updatePasswordHelper(true);
                updatePasswordConfirmHelper(true);
            }
            if (id === 'txt_password_confirm') updatePasswordConfirmHelper(true);
            if (id === 'txt_name') updateNameHelper(true);
        });
    });

    app.bindSubmit('account_signup_form', async function () {
        if (typeof app.clearFieldErrors === 'function') app.clearFieldErrors();
        if (typeof app.setNotice === 'function') app.setNotice('', 'info');

        ['txt_email', 'txt_password', 'txt_password_confirm', 'txt_name'].forEach(function (id) {
            const field = document.getElementById(id);
            if (field) field.dataset.touched = '1';
        });

        if (updateEmailHelper(true) !== 'SUCCESS') return;
        if (updatePasswordHelper(true) !== 'SUCCESS') return;
        if (updatePasswordConfirmHelper(true) !== 'SUCCESS') return;
        if (updateNameHelper(true) !== 'SUCCESS') return;

        const button = document.getElementById('btn_signup');
        try {
            app.setButtonLoading(button, t('signing_up'), true);
            const response = await app.requestJSON(app.api.signup, app.createFormData({
                txt_email: app.valueOf('txt_email'),
                txt_password: app.valueOf('txt_password'),
                txt_name: app.valueOf('txt_name'),
                txt_affiliation: app.valueOf('txt_affiliation'),
                txt_title: app.valueOf('txt_title'),
                sel_gender: app.valueOf('sel_gender'),
                sel_education: app.valueOf('sel_education'),
                txt_interest: app.valueOf('txt_interest'),
                chk_student: app.isChecked('chk_student') ? 'true' : ''
            }));

            if (response.checker === 'SUCCESS') {
                if (typeof app.setNotice === 'function') app.setNotice(t('signup_success'), 'success');
                try { sessionStorage.removeItem(RETURN_TO_KEY); } catch (error) {}
                app.redirect(getSuccessRedirectUrl());
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
