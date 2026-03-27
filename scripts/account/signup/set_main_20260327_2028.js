window.set_main = function () {
    'use strict';

    const app = window.StatKISSAccount;
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
    const SUPPORTED_LANGS = ["en", "ko", "ja", "zh-Hans", "zh-Hant", "es", "fr", "de", "pt-BR", "ru", "id", "vi", "th", "ms", "fil", "hi", "ar", "it", "nl", "pl", "sv", "tr", "uk"];
    const state = { step: (app && app.pageMode === 'email') ? 'email' : 'method' };

    if (!app) return;
    if (typeof app.extendPageMessages === 'function') app.extendPageMessages(window.StatKISSAccountSignupMessages || {});

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


    function ensureMetaTag(attrName, attrValue) {
        var selector = 'meta[' + attrName + '="' + attrValue.replace(/"/g, '\\"') + '"]';
        var tag = document.head ? document.head.querySelector(selector) : null;
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attrName, attrValue);
            document.head.appendChild(tag);
        }
        return tag;
    }

    function applySeoMeta(titleText, descriptionText) {
        var brand = 'StatKISS';
        var safeTitle = String(titleText || brand).trim();
        var safeDescription = String(descriptionText || '').trim();
        document.title = safeTitle ? safeTitle + ' | ' + brand : brand;
        if (!document.head) return;
        ensureMetaTag('name', 'description').setAttribute('content', safeDescription);
        ensureMetaTag('property', 'og:title').setAttribute('content', document.title);
        ensureMetaTag('property', 'og:description').setAttribute('content', safeDescription);
        ensureMetaTag('property', 'og:type').setAttribute('content', 'website');
        ensureMetaTag('name', 'twitter:title').setAttribute('content', document.title);
        ensureMetaTag('name', 'twitter:description').setAttribute('content', safeDescription);
    }

    function resolveInternalAccountRoute(raw, fallbackPath) {
        const value = String(raw || '').trim();
        if (!value) return localizePath(fallbackPath);
        if (/^https?:\/\//i.test(value)) return value;
        if (value.charAt(0) === '/') return value;
        const cleaned = value.replace(/^\.\//, '').replace(/^\//, '');
        if (cleaned.startsWith('account/')) return localizePath('/' + cleaned);
        if (cleaned.startsWith('google/')) return localizePath('/account/' + cleaned);
        return localizePath(fallbackPath);
    }

    function withNext(url, next) {
        if (!url) return '';
        if (!next) return url;
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'next=' + encodeURIComponent(next);
    }

    function getSuccessRedirectUrl() {
        try {
            const remembered = sessionStorage.getItem(RETURN_TO_KEY) || '';
            if (remembered) return remembered;
        } catch (error) {}
        return resolveInternalAccountRoute(app.routes && app.routes.welcome, '/account/welcome/');
    }

    function googleSignupHref() {
        return withNext(resolveInternalAccountRoute(app.routes && app.routes.googleSignup, '/account/google/signup/'), getSuccessRedirectUrl());
    }

    function googleEnabled() {
        return !!(app.bootstrap && app.bootstrap.features && app.bootstrap.features.google_oauth_enabled && googleSignupHref());
    }

    function applyInitialMessage() {
        const initialMessage = GOOGLE_MESSAGE_MAP[app.pageMsg || ''];
        if (initialMessage && typeof app.setNotice === 'function') {
            app.setNotice(t(initialMessage.key), initialMessage.kind || 'error');
        }
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
        field.classList.remove('border-rose-500','focus:border-rose-500','focus:ring-rose-200','dark:border-rose-400','border-emerald-500','focus:border-emerald-500','focus:ring-emerald-200','dark:border-emerald-400');
        field.removeAttribute('aria-invalid');
        if (tone === 'error') {
            field.classList.add('border-rose-500','focus:border-rose-500','focus:ring-rose-200','dark:border-rose-400');
            field.setAttribute('aria-invalid', 'true');
        } else if (tone === 'success') {
            field.classList.add('border-emerald-500','focus:border-emerald-500','focus:ring-emerald-200','dark:border-emerald-400');
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

    function passwordConfirmStatus(password, confirm) {
        const p = String(password || '');
        const c = String(confirm || '');
        if (!c) return 'NOT_EXIST';
        return p && p === c ? 'SUCCESS' : 'FAILED';
    }

    function updateEmailHelper(force) {
        const field = document.getElementById('txt_email');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = emailStatus(field.value);
        const shouldShow = force || touched || String(field.value || '').trim() !== '';
        if (!shouldShow) { clearFieldMessage('txt_email'); return status; }
        if (status === 'SUCCESS') showFieldMessage('txt_email', t('email_help_valid'), 'success');
        else if (status === 'FAILED') showFieldMessage('txt_email', t('email_help_invalid'), 'error');
        else showFieldMessage('txt_email', t('email_help_empty'), 'error');
        return status;
    }

    function updatePasswordHelper(force) {
        const field = document.getElementById('txt_password');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = passwordStatus(field.value);
        const shouldShow = force || touched || String(field.value || '').trim() !== '';
        if (!shouldShow) { clearFieldMessage('txt_password'); return status; }
        if (status === 'SUCCESS') showFieldMessage('txt_password', t('password_help_valid'), 'success');
        else if (status === 'FAILED') showFieldMessage('txt_password', t('password_help_short'), 'error');
        else showFieldMessage('txt_password', t('password_help_empty'), 'error');
        return status;
    }

    function updatePasswordConfirmHelper(force) {
        const field = document.getElementById('txt_password_confirm');
        const passwordField = document.getElementById('txt_password');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const status = passwordConfirmStatus(passwordField ? passwordField.value : '', field.value);
        const shouldShow = force || touched || String(field.value || '').trim() !== '';
        if (!shouldShow) { clearFieldMessage('txt_password_confirm'); return status; }
        if (status === 'SUCCESS') showFieldMessage('txt_password_confirm', t('password_confirm_help_valid'), 'success');
        else if (status === 'FAILED') showFieldMessage('txt_password_confirm', t('password_confirm_help_mismatch'), 'error');
        else showFieldMessage('txt_password_confirm', t('password_confirm_help_empty'), 'error');
        return status;
    }

    function updateNameHelper(force) {
        const field = document.getElementById('txt_name');
        if (!field) return 'NOT_EXIST';
        const touched = field.dataset.touched === '1';
        const value = String(field.value || '').trim();
        const shouldShow = force || touched || value !== '';
        if (!shouldShow) { clearFieldMessage('txt_name'); return value ? 'SUCCESS' : 'NOT_EXIST'; }
        if (value) { clearFieldMessage('txt_name'); return 'SUCCESS'; }
        showFieldMessage('txt_name', t('invalid_name'), 'error');
        return 'NOT_EXIST';
    }

    function googleButton(label, href) {
        return [
            '<a id="btn_google_signup" href="' + escapeHtml(href) + '" class="statkiss-account-social-btn inline-flex h-12 w-full items-center justify-center gap-3 rounded-2xl border px-5 text-sm font-semibold">',
            '  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg" alt="" aria-hidden="true" class="h-5 w-5 shrink-0">',
            '  <span>' + escapeHtml(label) + '</span>',
            '</a>'
        ].join('');
    }

    function methodActionButton(id, label, solid) {
        const classes = solid
            ? 'statkiss-account-solid-btn inline-flex h-12 w-full items-center justify-center rounded-2xl px-5 text-sm font-semibold'
            : 'statkiss-account-outline-btn inline-flex h-12 w-full items-center justify-center rounded-2xl border px-5 text-sm font-semibold';
        return '<button id="' + escapeHtml(id) + '" type="button" class="' + classes + '">' + escapeHtml(label) + '</button>';
    }

    function renderMethodChoice() {
        const bodyHtml = [
            '<div class="space-y-6">',
            '  <section class="statkiss-account-panel rounded-2xl border p-5 shadow-sm">',
            '    <div class="space-y-4">',
            '      <div class="space-y-1">',
            '        <h2 class="statkiss-account-section-title text-base font-semibold text-slate-900">' + escapeHtml(t('email_signup_title')) + '</h2>',
            '        <p class="statkiss-account-section-desc text-sm leading-6 text-slate-600">' + escapeHtml(t('email_signup_desc')) + '</p>',
            '      </div>',
            '      ' + methodActionButton('btn_pick_email_signup', t('signup_method_email_action'), true),
            '    </div>',
            '  </section>',
            '  <div class="my-6"></div>',
            '  <section class="statkiss-account-panel rounded-2xl border p-5 shadow-sm">',
            '    <div class="space-y-4">',
            '      <div class="space-y-1">',
            '        <h2 class="statkiss-account-section-title text-base font-semibold text-slate-900">' + escapeHtml(t('social_signup_title')) + '</h2>',
            '        <p class="statkiss-account-section-desc text-sm leading-6 text-slate-600">' + escapeHtml(t('social_signup_desc')) + '</p>',
            '      </div>',
            googleEnabled()
                ? '      ' + googleButton(t('signup_method_google_action'), googleSignupHref())
                : '      <div class="statkiss-account-notice-box is-error rounded-2xl border px-4 py-3 text-sm">' + escapeHtml(t('social_signup_disabled')) + '</div>',
            '      <div class="statkiss-account-notice-box is-info rounded-2xl border px-4 py-3 text-sm">' + escapeHtml(t('social_signup_hint')) + '</div>',
            '    </div>',
            '  </section>',
            '</div>'
        ].join('');
        const footerHtml = '<div class="text-sm text-slate-500">' + escapeHtml(t('back_to_login')) + ' ' + app.secondaryLink(resolveInternalAccountRoute(app.routes && app.routes.login, '/account/'), t('login')) + '</div>';
        applySeoMeta(t('signup_title'), t('signup_desc'));
        app.render(app.pageShell(t('signup_title'), t('signup_desc'), bodyHtml, footerHtml));
        applyInitialMessage();
        const emailButton = document.getElementById('btn_pick_email_signup');
        if (emailButton) {
            emailButton.addEventListener('click', function () {
                state.step = 'email';
                render();
            });
        }
    }

    function renderEmailForm() {
        const bodyHtml = [
            '<div class="space-y-6">',
            '  <div>',
            '    <button id="btn_back_to_signup_method" type="button" class="statkiss-account-link text-sm font-medium text-sky-700 transition hover:underline dark:text-sky-300">' + escapeHtml(t('back_to_method_choice')) + '</button>',
            '  </div>',
            '  <section class="statkiss-account-panel rounded-2xl border p-5 shadow-sm">',
            '    <div class="mb-5 space-y-1">',
            '      <h2 class="statkiss-account-section-title text-base font-semibold text-slate-900">' + escapeHtml(t('email_signup_title')) + '</h2>',
            '      <p class="statkiss-account-section-desc text-sm leading-6 text-slate-600">' + escapeHtml(t('email_signup_desc')) + '</p>',
            '    </div>',
            '    <form id="account_signup_form" class="space-y-6">',
            '      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
            '        <div class="sm:col-span-2">' + app.textInput('txt_email', t('email'), { type: 'email', autocomplete: 'email', spellcheck: 'false' }) + '<div id="txt_email_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500"></div></div>',
            '        <div>' + app.textInput('txt_password', t('password'), { type: 'password', autocomplete: 'new-password' }) + '<div id="txt_password_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500"></div></div>',
            '        <div>' + app.textInput('txt_password_confirm', t('password_confirm'), { type: 'password', autocomplete: 'new-password' }) + '<div id="txt_password_confirm_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500"></div></div>',
            '        <div class="sm:col-span-2">' + app.textInput('txt_name', t('name'), { autocomplete: 'name' }) + '<div id="txt_name_helper" class="' + HELPER_BASE_CLASS + ' text-slate-500"></div></div>',
            '        <div>' + app.textInput('txt_affiliation', t('affiliation'), {}) + '</div>',
            '        <div>' + app.textInput('txt_title', t('title'), {}) + '</div>',
            '        <div>' + app.selectInput('sel_gender', t('gender'), app.genderOptions()) + '</div>',
            '        <div>' + app.selectInput('sel_education', t('education'), app.educationOptions()) + '</div>',
            '        <div class="sm:col-span-2">' + app.textareaInput('txt_interest', t('interest'), { placeholder: t('no_interest_placeholder') }) + '</div>',
            '        <div class="sm:col-span-2">' + app.checkboxInput('chk_student', t('student_member'), t('student_member_desc')) + '</div>',
            '      </div>',
            '      <div class="pt-2">' + app.primaryButton('btn_signup', t('signup')) + '</div>',
            '    </form>',
            '  </section>',
            '</div>'
        ].join('');
        const footerHtml = '<div class="text-sm text-slate-500">' + escapeHtml(t('back_to_login')) + ' ' + app.secondaryLink(resolveInternalAccountRoute(app.routes && app.routes.login, '/account/'), t('login')) + '</div>';
        applySeoMeta(t('signup_title'), t('signup_desc'));
        app.render(app.pageShell(t('signup_title'), t('signup_desc'), bodyHtml, footerHtml));
        applyInitialMessage();
        const backButton = document.getElementById('btn_back_to_signup_method');
        if (backButton) {
            backButton.addEventListener('click', function () {
                state.step = 'method';
                render();
            });
        }
        ['txt_email', 'txt_password', 'txt_password_confirm', 'txt_name'].forEach(function (id) {
            const field = document.getElementById(id);
            if (!field) return;
            field.addEventListener('input', function () {
                field.dataset.touched = '1';
                if (typeof app.setNotice === 'function') app.setNotice('', 'info');
                if (id === 'txt_email') updateEmailHelper(false);
                if (id === 'txt_password') { updatePasswordHelper(false); updatePasswordConfirmHelper(false); }
                if (id === 'txt_password_confirm') updatePasswordConfirmHelper(false);
                if (id === 'txt_name') updateNameHelper(false);
            });
            field.addEventListener('blur', function () {
                field.dataset.touched = '1';
                if (id === 'txt_email') updateEmailHelper(true);
                if (id === 'txt_password') { updatePasswordHelper(true); updatePasswordConfirmHelper(true); }
                if (id === 'txt_password_confirm') updatePasswordConfirmHelper(true);
                if (id === 'txt_name') updateNameHelper(true);
            });
        });
        app.bindSubmit('account_signup_form', async function () {
            if (typeof app.clearFieldErrors === 'function') app.clearFieldErrors();
            if (typeof app.setNotice === 'function') app.setNotice('', 'info');
            ['txt_email', 'txt_password', 'txt_password_confirm', 'txt_name'].forEach(function (id) { const field = document.getElementById(id); if (field) field.dataset.touched = '1'; });
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
    }

    function render() {
        if (state.step === 'email') renderEmailForm();
        else renderMethodChoice();
    }

    render();
};
