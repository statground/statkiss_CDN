window.set_main = function () {
    'use strict';

    const app = window.StatKISSAccount;
    const pageI18N = window.StatKISSAccountAccountI18N || null;
    const MIN_PASSWORD_LENGTH = 8;
    const RETURN_TO_KEY = 'statkiss_account_login_return_to';
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
        app.extendPageMessages(window.StatKISSAccountAccountMessages || {});
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
            if (/^\/(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?account\/?$/i.test(pathname)) return null;
            if (/^\/(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?account\/logout\/?$/i.test(pathname)) return null;
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

    function getReturnToUrl() {
        const fromQuery = normalizeRedirectTarget(nextUrl);
        if (fromQuery) return fromQuery;
        try {
            const stored = normalizeRedirectTarget(sessionStorage.getItem(RETURN_TO_KEY));
            if (stored) return stored;
        } catch (error) {}
        return '/';
    }

    function withNext(url, next) {
        if (!url) return '';
        if (!next) return url;
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'next=' + encodeURIComponent(next);
    }

    function googleLoginHref() {
        return withNext(app.routes && app.routes.googleLogin, getReturnToUrl());
    }

    function googleEnabled() {
        return !!(app.bootstrap && app.bootstrap.features && app.bootstrap.features.google_oauth_enabled && googleLoginHref());
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

    function renderChoiceSection() {
        if (!googleEnabled()) return '';
        return [
            '<section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
            '  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">',
            '    <div class="space-y-2">',
            '      <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(t('login_method_choice_title')) + '</h2>',
            '      <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">' + escapeHtml(t('login_method_choice_desc')) + '</p>',
            '    </div>',
            '    <a id="btn_google_login" href="' + escapeHtml(googleLoginHref()) + '" class="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900">' + escapeHtml(t('continue_with_google')) + '</a>',
            '  </div>',
            '</section>'
        ].join('');
    }

    const bodyHtml = [
        renderChoiceSection(),
        '<section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
        '  <div class="mb-5 space-y-1">',
        '    <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(t('email_login_title')) + '</h2>',
        '    <p class="text-sm text-slate-600 dark:text-slate-300">' + escapeHtml(t('email_login_desc')) + '</p>',
        '  </div>',
        '  <form id="account_login_form" class="space-y-5">',
        '    <div>' + app.textInput('txt_email', t('email'), { type: 'email', autocomplete: 'email', spellcheck: 'false' }) + '<div id="txt_email_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div></div>',
        '    <div>' + app.textInput('txt_password', t('password'), { type: 'password', autocomplete: 'current-password' }) + '<div id="txt_password_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500 dark:text-slate-400"></div></div>',
        '    <div class="pt-2">' + app.primaryButton('btn_login', t('login')) + '</div>',
        '  </form>',
        '</section>'
    ].join('');

    const footerHtml = [
        '<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">',
        '   <div class="flex flex-wrap items-center gap-x-4 gap-y-2">',
        '       ' + app.secondaryLink(app.routes.changePassword, t('recover_password')),
        '       <span class="text-slate-300 dark:text-slate-700">|</span>',
        '       ' + app.secondaryLink(app.routes.signup, t('go_signup')),
        '   </div>',
        '   <div class="text-xs leading-6 text-slate-500 dark:text-slate-400 sm:max-w-xs sm:text-right">' + escapeHtml(t('support_contact')) + ' <a class="font-medium text-sky-700 dark:text-sky-300" href="mailto:' + escapeHtml(app.supportEmail) + '">' + escapeHtml(app.supportEmail) + '</a></div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(t('login_title'), t('login_desc'), bodyHtml, footerHtml));

    const initialMessage = GOOGLE_MESSAGE_MAP[app.pageMsg || ''];
    if (initialMessage && typeof app.setNotice === 'function') {
        app.setNotice(t(initialMessage.key), initialMessage.kind || 'error');
    }

    const emailEl = document.getElementById('txt_email');
    const passwordEl = document.getElementById('txt_password');
    if (emailEl) {
        emailEl.addEventListener('input', function () {
            emailEl.dataset.touched = '1';
            if (typeof app.setNotice === 'function') app.setNotice('', 'info');
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
            if (typeof app.setNotice === 'function') app.setNotice('', 'info');
            updatePasswordHelper(false);
        });
        passwordEl.addEventListener('blur', function () {
            passwordEl.dataset.touched = '1';
            updatePasswordHelper(true);
        });
    }

    app.bindSubmit('account_login_form', async function () {
        if (typeof app.clearFieldErrors === 'function') app.clearFieldErrors();
        if (typeof app.setNotice === 'function') app.setNotice('', 'info');

        if (emailEl) emailEl.dataset.touched = '1';
        if (passwordEl) passwordEl.dataset.touched = '1';

        const email = app.valueOf('txt_email');
        const password = app.valueOf('txt_password');
        const button = document.getElementById('btn_login');

        if (updateEmailHelper(true) !== 'SUCCESS') return;
        if (updatePasswordHelper(true) !== 'SUCCESS') return;

        try {
            app.setButtonLoading(button, t('signing_in'), true);
            const response = await app.requestJSON(
                app.api.signin,
                app.createFormData({ txt_email: email, txt_password: password })
            );

            if (response.checker === 'SUCCESS') {
                if (typeof app.setNotice === 'function') app.setNotice(t('login_success'), 'success');
                try { sessionStorage.removeItem(RETURN_TO_KEY); } catch (error) {}
                app.redirect(getReturnToUrl());
                return;
            }
            if (response.checker === 'WRONGPASSWORD') {
                showFieldMessage('txt_password', t('wrong_password'), 'error');
                return;
            }
            if (response.checker === 'NOTEXIST') {
                showFieldMessage('txt_email', t('not_exist'), 'error');
                return;
            }
            if (typeof app.setNotice === 'function') app.setNotice(response.checker || t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, t('signing_in'), false);
        }
    });
};
