window.set_main = function () {
    'use strict';

    const app = window.StatKISSAccount;
    const pageI18N = window.StatKISSAccountAccountI18N || null;
    const MIN_PASSWORD_LENGTH = 8;
    const RETURN_TO_KEY = 'statkiss_account_login_return_to';
    const FALLBACK_LANGS = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk'];

    if (!app) return;

    if (typeof app.extendPageMessages === 'function') {
        app.extendPageMessages(window.StatKISSAccountAccountMessages || {});
    }

    function t(key) {
        if (pageI18N && typeof pageI18N.t === 'function') {
            return pageI18N.t(key, pageI18N.getCurrentLang());
        }
        if (typeof app.t === 'function') return app.t(key);
        return key;
    }

    function escapeHtml(value) {
        if (typeof app.escapeHtml === 'function') return app.escapeHtml(value);
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
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

    function isLogoutPath(pathname) {
        const parts = stripLangPrefix(pathname);
        return parts.length >= 2 && parts[0] === 'account' && parts[1] === 'logout';
    }

    function normalizeRedirectTarget(value) {
        if (!value) return null;

        try {
            const url = new URL(String(value), window.location.origin);
            if (url.origin !== window.location.origin) return null;

            const pathname = url.pathname || '/';
            if (isLangOnlyPath(pathname)) return null;
            if (isLoginPath(pathname) || isLogoutPath(pathname)) return null;

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

    function getReturnToUrl() {
        const candidateFromQuery = normalizeRedirectTarget(nextUrl);
        if (candidateFromQuery) return candidateFromQuery;

        try {
            const stored = normalizeRedirectTarget(sessionStorage.getItem(RETURN_TO_KEY));
            if (stored) return stored;
        } catch (_) {}

        const candidateFromReferrer = normalizeRedirectTarget(document.referrer);
        if (candidateFromReferrer) return candidateFromReferrer;

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

    const bodyHtml = [
        '<form id="account_login_form" class="space-y-5">',
        '  <div class="grid grid-cols-1 gap-5">',
        '      <div>',
        '          ' + app.textInput('txt_email', t('email'), { type: 'email', autocomplete: 'email', spellcheck: 'false' }),
        '          <div id="txt_email_helper" class="mt-2 min-h-[1.25rem] text-xs text-slate-500 dark:text-slate-400"></div>',
        '      </div>',
        '      <div>',
        '          ' + app.textInput('txt_password', t('password'), { type: 'password', autocomplete: 'current-password' }),
        '          <div id="txt_password_helper" class="mt-2 min-h-[1.25rem] text-xs text-slate-500 dark:text-slate-400"></div>',
        '      </div>',
        '  </div>',
        '  <div class="pt-2">' + app.primaryButton('btn_login', t('login')) + '</div>',
        '</form>'
    ].join('');

    const footerHtml = [
        '<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">',
        '   <div class="flex flex-wrap items-center gap-x-4 gap-y-2">',
        '       ' + app.secondaryLink(app.routes.changePassword, t('recover_password')),
        '       <span class="text-slate-300 dark:text-slate-700">|</span>',
        '       ' + app.secondaryLink(app.routes.signup, t('go_signup')),
        '   </div>',
        '   <div class="statkiss-account-muted text-xs leading-6 text-slate-500 dark:text-slate-400 sm:max-w-xs sm:text-right">' + escapeHtml(t('support_contact')) + ' <a class="statkiss-account-link font-medium text-sky-700 dark:text-sky-300" href="mailto:' + escapeHtml(app.supportEmail) + '">' + escapeHtml(app.supportEmail) + '</a></div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(t('login_title'), t('login_desc'), bodyHtml, footerHtml));

    const emailEl = document.getElementById('txt_email');
    const passwordEl = document.getElementById('txt_password');

    function setHelper(fieldId, message, tone) {
        const helperEl = document.getElementById(fieldId + '_helper');
        if (!helperEl) return;

        const toneClass = {
            info: 'text-slate-500 dark:text-slate-400',
            success: 'text-emerald-600 dark:text-emerald-400',
            error: 'text-rose-600 dark:text-rose-400'
        }[tone || 'info'];

        helperEl.className = 'mt-2 min-h-[1.25rem] text-xs ' + toneClass;
        helperEl.textContent = message || '';
    }

    function clearStaleErrors() {
        if (typeof app.clearFieldErrors === 'function') app.clearFieldErrors();
        if (typeof app.setNotice === 'function') app.setNotice('', 'info');
    }

    function updateEmailHelper(force) {
        if (!emailEl) return 'NOT EXIST';

        const touched = emailEl.dataset.touched === '1';
        const status = emailFormCheckValue(emailEl.value);
        const shouldShow = force || touched || String(emailEl.value || '').trim() !== '';

        if (!shouldShow) {
            setHelper('txt_email', '', 'info');
            return status;
        }

        if (status === 'SUCCESS') {
            setHelper('txt_email', t('email_help_valid'), 'success');
        } else if (status === 'FAILED') {
            setHelper('txt_email', t('email_help_invalid'), 'error');
        } else {
            setHelper('txt_email', t('email_help_empty'), 'error');
        }

        return status;
    }

    function updatePasswordHelper(force) {
        if (!passwordEl) return 'NOT EXIST';

        const touched = passwordEl.dataset.touched === '1';
        const status = passwordFormCheckValue(passwordEl.value, MIN_PASSWORD_LENGTH);
        const shouldShow = force || touched || String(passwordEl.value || '').trim() !== '';

        if (!shouldShow) {
            setHelper('txt_password', '', 'info');
            return status;
        }

        if (status === 'SUCCESS') {
            setHelper('txt_password', t('password_help_valid'), 'success');
        } else if (status === 'FAILED') {
            setHelper('txt_password', t('password_help_short'), 'error');
        } else {
            setHelper('txt_password', t('password_help_empty'), 'error');
        }

        return status;
    }

    if (emailEl) {
        emailEl.addEventListener('input', function () {
            emailEl.dataset.touched = '1';
            clearStaleErrors();
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
            clearStaleErrors();
            updatePasswordHelper(false);
        });
        passwordEl.addEventListener('blur', function () {
            passwordEl.dataset.touched = '1';
            updatePasswordHelper(true);
        });
    }

    app.bindSubmit('account_login_form', async function () {
        app.clearFieldErrors();
        app.setNotice('', 'info');

        if (emailEl) emailEl.dataset.touched = '1';
        if (passwordEl) passwordEl.dataset.touched = '1';

        const email = app.valueOf('txt_email');
        const password = app.valueOf('txt_password');
        const button = document.getElementById('btn_login');

        const emailStatus = updateEmailHelper(true);
        const passwordStatus = updatePasswordHelper(true);

        if (emailStatus !== 'SUCCESS') {
            app.setFieldError('txt_email', emailStatus === 'NOT EXIST' ? t('email_help_empty') : t('invalid_email'));
            return;
        }
        if (passwordStatus !== 'SUCCESS') {
            app.setFieldError('txt_password', passwordStatus === 'NOT EXIST' ? t('password_required') : t('password_help_short'));
            return;
        }

        try {
            app.setButtonLoading(button, t('signing_in'), true);
            const response = await app.requestJSON(
                app.api.signin,
                app.createFormData({ txt_email: email, txt_password: password })
            );

            if (response.checker === 'SUCCESS') {
                app.setNotice(t('login_success'), 'success');
                const targetUrl = getReturnToUrl();
                try { sessionStorage.removeItem(RETURN_TO_KEY); } catch (_) {}
                app.redirect(targetUrl);
                return;
            }
            if (response.checker === 'WRONGPASSWORD') {
                setHelper('txt_password', t('wrong_password'), 'error');
                app.setFieldError('txt_password', t('wrong_password'));
                return;
            }
            if (response.checker === 'NOTEXIST') {
                setHelper('txt_email', t('not_exist'), 'error');
                app.setFieldError('txt_email', t('not_exist'));
                return;
            }
            app.setNotice(response.checker || t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, t('signing_in'), false);
        }
    });
};
