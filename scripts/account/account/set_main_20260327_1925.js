
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
        GOOGLE_LINK_CONFLICT: { key: 'google_link_conflict', kind: 'error' },
        GOOGLE_LINK_SIGNIN_REQUIRED: { key: 'google_link_signin_required', kind: 'error' },
        GOOGLE_LINK_SUCCESS: { key: 'google_link_success', kind: 'success' }
    };
    const SUPPORTED_LANGS = ["en", "ko", "ja", "zh-Hans", "zh-Hant", "es", "fr", "de", "pt-BR", "ru", "id", "vi", "th", "ms", "fil", "hi", "ar", "it", "nl", "pl", "sv", "tr", "uk"];

    if (!app) return;
    if (typeof app.extendPageMessages === 'function') app.extendPageMessages(window.StatKISSAccountAccountMessages || {});

    function t(key, params) {
        return typeof app.t === 'function' ? app.t(key, params) : key;
    }

    function escapeHtml(value) {
        return typeof app.escapeHtml === 'function' ? app.escapeHtml(value) : String(value == null ? '' : value);
    }

    function localePrefix() {
        const parts = String(window.location.pathname || '').split('/').filter(Boolean);
        if (parts.length && SUPPORTED_LANGS.indexOf(parts[0]) >= 0) return '/' + parts[0];
        return '';
    }

    function localizePath(path) {
        if (!path || path.charAt(0) !== '/') return path;
        const prefix = localePrefix();
        if (!prefix || path.indexOf(prefix + '/') === 0) return path;
        return prefix + path;
    }

    function resolveInternalAccountRoute(raw, fallbackPath) {
        const value = String(raw || '').trim();
        if (!value) return localizePath(fallbackPath);
        if (/^https?:\/\//i.test(value)) return value;
        if (value.charAt(0) === '/') return value;
        const cleaned = value.replace(/^\.\//, '').replace(/^\//, '');
        if (cleaned.startsWith('account/')) return localizePath('/' + cleaned);
        if (cleaned.startsWith('google/')) return localizePath('/account/' + cleaned);
        if (cleaned.startsWith('myinfo/connections/google/link')) return localizePath('/account/google/link/');
        return localizePath(fallbackPath);
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
    if (rememberedReturnTo) { try { sessionStorage.setItem(RETURN_TO_KEY, rememberedReturnTo); } catch (error) {} }

    function getReturnToUrl() {
        const fromQuery = normalizeRedirectTarget(nextUrl);
        if (fromQuery) return fromQuery;
        try {
            const stored = normalizeRedirectTarget(sessionStorage.getItem(RETURN_TO_KEY));
            if (stored) return stored;
        } catch (error) {}
        return localizePath('/');
    }

    function withNext(url, next) {
        if (!url) return '';
        if (!next) return url;
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'next=' + encodeURIComponent(next);
    }

    function googleLoginHref() {
        const base = resolveInternalAccountRoute(app.routes && app.routes.googleLogin, '/account/google/login/');
        return withNext(base, getReturnToUrl());
    }

    function googleEnabled() {
        return !!(app.bootstrap && app.bootstrap.features && app.bootstrap.features.google_oauth_enabled && googleLoginHref());
    }

    function setHelper(fieldId, message, tone) {
        const helper = document.getElementById(fieldId + '_helper');
        if (!helper) return;
        const toneClass = { info: 'text-slate-500', success: 'text-emerald-600', error: 'text-rose-600' }[tone || 'info'] || 'text-slate-500';
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

    function showFieldMessage(fieldId, message, tone) { setHelper(fieldId, message, tone || 'info'); applyFieldTone(fieldId, tone || 'info'); }
    function clearFieldMessage(fieldId) { setHelper(fieldId, '', 'info'); applyFieldTone(fieldId, 'info'); }
    function emailStatus(value) { const email = String(value || '').trim(); if (!email) return 'NOT_EXIST'; return typeof app.validateEmail === 'function' && app.validateEmail(email) ? 'SUCCESS' : 'FAILED'; }
    function passwordStatus(value) { const password = String(value || ''); if (!password) return 'NOT_EXIST'; return typeof app.validatePassword === 'function' ? (app.validatePassword(password) ? 'SUCCESS' : 'FAILED') : (password.length >= MIN_PASSWORD_LENGTH ? 'SUCCESS' : 'FAILED'); }

    function updateEmailHelper(force) {
        const field = document.getElementById('txt_email'); if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = emailStatus(field.value); const shouldShow = force || touched || String(field.value || '').trim() !== '';
        if (!shouldShow) { clearFieldMessage('txt_email'); return status; }
        if (status === 'SUCCESS') showFieldMessage('txt_email', t('email_help_valid'), 'success');
        else if (status === 'FAILED') showFieldMessage('txt_email', t('email_help_invalid'), 'error');
        else showFieldMessage('txt_email', t('email_help_empty'), 'error');
        return status;
    }

    function updatePasswordHelper(force) {
        const field = document.getElementById('txt_password'); if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = passwordStatus(field.value); const shouldShow = force || touched || String(field.value || '').trim() !== '';
        if (!shouldShow) { clearFieldMessage('txt_password'); return status; }
        if (status === 'SUCCESS') showFieldMessage('txt_password', t('password_help_valid'), 'success');
        else if (status === 'FAILED') showFieldMessage('txt_password', t('password_help_short'), 'error');
        else showFieldMessage('txt_password', t('password_help_empty'), 'error');
        return status;
    }

    function googleButton(label, href) {
        return [
            '<a id="btn_google_login" href="' + escapeHtml(href) + '" class="statkiss-account-social-btn inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border px-5 text-sm font-semibold">',
            '  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg" alt="" aria-hidden="true" class="h-5 w-5 shrink-0">',
            '  <span>' + escapeHtml(label) + '</span>',
            '</a>'
        ].join('');
    }

    function renderSocialSection() {
        const body = googleEnabled()
            ? [
                '<div class="space-y-4">',
                '  <div class="space-y-1">',
                '    <h2 class="statkiss-account-section-title text-base font-semibold text-slate-900">' + escapeHtml(t('social_login_title')) + '</h2>',
                '    <p class="statkiss-account-section-desc text-sm leading-6 text-slate-600">' + escapeHtml(t('social_login_desc')) + '</p>',
                '  </div>',
                '  ' + googleButton(t('continue_with_google'), googleLoginHref()),
                '  <div class="statkiss-account-notice-box is-info rounded-2xl border px-4 py-3 text-sm">' + escapeHtml(t('social_login_hint')) + '</div>',
                '</div>'
            ].join('')
            : [
                '<div class="space-y-3">',
                '  <div class="space-y-1">',
                '    <h2 class="statkiss-account-section-title text-base font-semibold text-slate-900">' + escapeHtml(t('social_login_title')) + '</h2>',
                '    <p class="statkiss-account-section-desc text-sm leading-6 text-slate-600">' + escapeHtml(t('social_login_desc')) + '</p>',
                '  </div>',
                '  <div class="statkiss-account-notice-box is-error rounded-2xl border px-4 py-3 text-sm">' + escapeHtml(t('social_login_disabled')) + '</div>',
                '</div>'
            ].join('');
        return '<section class="statkiss-account-panel rounded-2xl border p-5 shadow-sm">' + body + '</section>';
    }

    const bodyHtml = [
        '<section class="statkiss-account-panel rounded-2xl border p-5 shadow-sm">',
        '  <div class="mb-5 space-y-1">',
        '    <h2 class="statkiss-account-section-title text-base font-semibold text-slate-900">' + escapeHtml(t('email_login_title')) + '</h2>',
        '    <p class="statkiss-account-section-desc text-sm leading-6 text-slate-600">' + escapeHtml(t('email_login_desc')) + '</p>',
        '  </div>',
        '  <form id="account_login_form" class="space-y-5">',
        '    <div>' + app.textInput('txt_email', t('email'), { type: 'email', autocomplete: 'email', spellcheck: 'false' }) + '<div id="txt_email_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500"></div></div>',
        '    <div>' + app.textInput('txt_password', t('password'), { type: 'password', autocomplete: 'current-password' }) + '<div id="txt_password_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500"></div></div>',
        '    <div class="pt-2">' + app.primaryButton('btn_login', t('login')) + '</div>',
        '  </form>',
        '</section>',
        '<div class="statkiss-account-divider relative my-7 border-t border-slate-200">',
        '  <span class="statkiss-account-divider-badge absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">' + escapeHtml(t('or_continue_with')) + '</span>',
        '</div>',
        renderSocialSection()
    ].join('');

    const footerHtml = [
        '<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">',
        '   <div class="flex flex-wrap items-center gap-x-4 gap-y-2">',
        '       ' + app.secondaryLink(resolveInternalAccountRoute(app.routes && app.routes.changePassword, '/account/change_password/'), t('recover_password')),
        '       <span class="text-slate-300 dark:text-slate-700">|</span>',
        '       ' + app.secondaryLink(resolveInternalAccountRoute(app.routes && app.routes.signup, '/account/signup/'), t('go_signup')),
        '   </div>',
        '   <div class="text-xs leading-6 text-slate-500 sm:max-w-xs sm:text-right">' + escapeHtml(t('support_contact')) + ' <a class="font-medium text-sky-700" href="mailto:' + escapeHtml(app.supportEmail) + '">' + escapeHtml(app.supportEmail) + '</a></div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(t('login_title'), t('login_desc'), bodyHtml, footerHtml));

    const initialMessage = GOOGLE_MESSAGE_MAP[app.pageMsg || ''];
    if (initialMessage && typeof app.setNotice === 'function') app.setNotice(t(initialMessage.key), initialMessage.kind || 'error');

    const emailEl = document.getElementById('txt_email');
    const passwordEl = document.getElementById('txt_password');
    if (emailEl) {
        emailEl.addEventListener('input', function () { emailEl.dataset.touched = '1'; if (typeof app.setNotice === 'function') app.setNotice('', 'info'); updateEmailHelper(false); });
        emailEl.addEventListener('blur', function () { emailEl.dataset.touched = '1'; updateEmailHelper(true); });
    }
    if (passwordEl) {
        passwordEl.addEventListener('input', function () { passwordEl.dataset.touched = '1'; if (typeof app.setNotice === 'function') app.setNotice('', 'info'); updatePasswordHelper(false); });
        passwordEl.addEventListener('blur', function () { passwordEl.dataset.touched = '1'; updatePasswordHelper(true); });
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
            const response = await app.requestJSON(app.api.signin, app.createFormData({ txt_email: email, txt_password: password }));
            if (response.checker === 'SUCCESS') {
                if (typeof app.setNotice === 'function') app.setNotice(t('login_success'), 'success');
                try { sessionStorage.removeItem(RETURN_TO_KEY); } catch (error) {}
                app.redirect(getReturnToUrl());
                return;
            }
            if (response.checker === 'WRONGPASSWORD') { showFieldMessage('txt_password', t('wrong_password'), 'error'); return; }
            if (response.checker === 'NOTEXIST') { showFieldMessage('txt_email', t('not_exist'), 'error'); return; }
            if (typeof app.setNotice === 'function') app.setNotice(response.checker || t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, t('signing_in'), false);
        }
    });
};
