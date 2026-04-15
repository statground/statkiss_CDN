window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;
    const GOOGLE_ICON_URL = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg';
    const MESSAGE_MAP = {
        GOOGLE_LINK_SUCCESS: { key: 'google_link_success', kind: 'success' },
        GOOGLE_ALREADY_LINKED: { key: 'google_already_linked', kind: 'info' },
        GOOGLE_LINK_CONFLICT: { key: 'google_link_conflict', kind: 'error' },
        GOOGLE_LINK_SIGNIN_REQUIRED: { key: 'google_link_signin_required', kind: 'error' },
        GOOGLE_LINK_RESTRICTED: { key: 'myinfo_connections_google_restricted_notice', kind: 'error' },
        GOOGLE_DISABLED: { key: 'google_disabled', kind: 'error' },
        GOOGLE_ACCESS_DENIED: { key: 'google_access_denied', kind: 'error' },
        GOOGLE_AUTH_FAILED: { key: 'google_auth_failed', kind: 'error' },
        GOOGLE_EMAIL_NOT_VERIFIED: { key: 'google_email_not_verified', kind: 'error' },
        GOOGLE_AMBIGUOUS_EMAIL: { key: 'google_ambiguous_email', kind: 'error' }
    };
    const SUPPORTED_LANGS = ["en", "ko", "ja", "zh-Hans", "zh-Hant", "es", "fr", "de", "pt-BR", "ru", "id", "vi", "th", "ms", "fil", "hi", "ar", "it", "nl", "pl", "sv", "tr", "uk"];
    let initialNoticeConsumed = false;
    let flashNotice = null;

    if (!app || !ui) return;

    ui.useMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    ui.useMessages(window.StatKISSAccountMyinfoConnectionsMessages || {});

    function pageTitle() { return ui.t('myinfo_connections_title'); }
    function pageDesc() { return ui.t('myinfo_connections_desc'); }
    function renderLoading() { app.render(ui.layout(pageTitle(), pageDesc(), ui.loadingCard(), 'connections')); ui.afterRender(); }
    function localePrefix() { const parts = String(window.location.pathname || '').split('/').filter(Boolean); if (parts.length && SUPPORTED_LANGS.indexOf(parts[0]) >= 0) return '/' + parts[0]; return ''; }
    function localizePath(path) { if (!path || path.charAt(0) !== '/') return path; const prefix = localePrefix(); if (!prefix || path.indexOf(prefix + '/') === 0) return path; return prefix + path; }
    function resolveInternalAccountRoute(raw, fallbackPath) { const value = String(raw || '').trim(); if (!value) return localizePath(fallbackPath); if (/^https?:\/\//i.test(value)) return value; if (value.charAt(0) === '/') return value; const cleaned = value.replace(/^\.\//, '').replace(/^\//, ''); if (cleaned.indexOf('account/') === 0) return localizePath('/' + cleaned); if (cleaned.indexOf('google/') === 0) return localizePath('/account/' + cleaned); if (cleaned.indexOf('myinfo/connections/google/link') === 0) return localizePath('/account/google/link/'); return localizePath(fallbackPath); }
    function connectGoogleHref() { const base = resolveInternalAccountRoute((app.routes && app.routes.googleLink) || ui.route('googleLink', '/account/google/link/'), '/account/google/link/'); const next = ui.myinfoRoute('connections'); return base + (base.indexOf('?') >= 0 ? '&' : '?') + 'next=' + encodeURIComponent(next); }

    function iconHtml() {
        return '<img src="' + ui.escapeHtml(GOOGLE_ICON_URL) + '" alt="" aria-hidden="true" class="h-5 w-5 shrink-0">';
    }

    function googleActionLink(href, label, outlined) {
        const classes = outlined
            ? 'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            : 'inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white';
        return '<a href="' + ui.escapeHtml(href) + '" class="' + classes + '">' + iconHtml() + '<span>' + ui.escapeHtml(label) + '</span></a>';
    }

    function actionButton(id, label, outlined, disabled, withIcon) {
        const classes = outlined
            ? 'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            : 'inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white';
        return '<button id="' + ui.escapeHtml(id) + '" type="button" class="' + classes + '"' + (disabled ? ' disabled aria-disabled="true"' : '') + '>' + (withIcon ? iconHtml() : '') + '<span>' + ui.escapeHtml(label) + '</span></button>';
    }

    function restrictedNotice() {
        return [
            '<div class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700 dark:border-rose-900/80 dark:bg-rose-950/30 dark:text-rose-200">',
            '  <p class="font-medium">' + ui.escapeHtml(ui.t('myinfo_connections_google_restricted_notice')) + '</p>',
            '  <p class="mt-2 text-xs text-rose-600 dark:text-rose-300">' + ui.escapeHtml(ui.t('myinfo_connections_google_restricted_desc')) + '</p>',
            '</div>'
        ].join('');
    }

    function disconnectRequiresPasswordNotice() {
        return [
            '<div class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800 dark:border-amber-900/80 dark:bg-amber-950/30 dark:text-amber-200">',
            '  <p>' + ui.escapeHtml(ui.t('myinfo_connections_google_disconnect_requires_password')) + '</p>',
            '  <div class="mt-3">' + ui.linkButton(ui.myinfoRoute('password'), ui.t('change_password'), true) + '</div>',
            '</div>'
        ].join('');
    }

    function localCard(userinfo) {
        const body = [
            '<dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + ui.escapeHtml(ui.t('myinfo_connections_local_email')) + '</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(userinfo.auth_email || userinfo.email || '') + '</dd>',
            '  </div>',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + ui.escapeHtml(ui.t('myinfo_connections_local_password')) + '</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(userinfo.has_usable_password ? ui.t('myinfo_connections_password_enabled') : ui.t('myinfo_connections_password_disabled')) + '</dd>',
            '  </div>',
            '</dl>'
        ].join('');
        return ui.card(ui.t('myinfo_connections_local_card'), body);
    }

    function googleDetails(userinfo) {
        const verifiedText = userinfo.google_email_verified ? ui.t('myinfo_connections_google_verified') : ui.t('myinfo_connections_google_not_verified');
        return [
            '<dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Google</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 flex items-center gap-3 text-sm leading-6 text-slate-800 dark:text-slate-100">' +
            (userinfo.google_picture_url ? '<img src="' + ui.escapeHtml(userinfo.google_picture_url) + '" alt="" aria-hidden="true" class="h-10 w-10 rounded-full border border-slate-200 object-cover dark:border-slate-700">' : '<span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">' + iconHtml() + '</span>') +
            '<span>' + ui.escapeHtml(userinfo.google_name || userinfo.google_email || 'Google') + '</span></dd>',
            '  </div>',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(userinfo.google_email || '') + '<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">' + ui.escapeHtml(verifiedText) + '</div></dd>',
            '  </div>',
            '</dl>'
        ].join('');
    }

    function googleCard(userinfo) {
        const parts = [];
        if (userinfo.google_link_restricted) {
            parts.push(restrictedNotice());
        }

        if (userinfo.google_linked) {
            parts.push(ui.noticeBox(ui.t('myinfo_connections_google_linked'), 'success'));
            parts.push(googleDetails(userinfo));
            if (userinfo.has_usable_password) {
                parts.push('<div>' + actionButton('btn_unlink_google', ui.t('myinfo_connections_google_disconnect_action'), true, false, true) + '</div>');
            } else {
                parts.push('<div>' + actionButton('btn_unlink_google', ui.t('myinfo_connections_google_disconnect_action'), true, true, true) + '</div>');
                parts.push(disconnectRequiresPasswordNotice());
            }
        } else {
            parts.push(ui.noticeBox(ui.t('myinfo_connections_google_not_linked'), 'info'));
            parts.push(ui.noticeBox(ui.t('myinfo_connections_help'), 'info'));
            if (userinfo.google_link_restricted) {
                parts.push('<div>' + actionButton('btn_connect_google_disabled', ui.t('myinfo_connections_google_action'), false, true, true) + '</div>');
            } else {
                parts.push('<div>' + googleActionLink(connectGoogleHref(), ui.t('myinfo_connections_google_action'), false) + '</div>');
            }
        }

        return ui.card(ui.t('myinfo_connections_google_card'), parts.join(''));
    }

    function applyNotice() {
        if (!app || typeof app.setNotice !== 'function') return;
        if (flashNotice && flashNotice.text) {
            app.setNotice(flashNotice.text, flashNotice.kind || 'info');
            flashNotice = null;
            initialNoticeConsumed = true;
            return;
        }
        if (initialNoticeConsumed) return;
        const message = MESSAGE_MAP[app.pageMsg || ''];
        if (message) {
            app.setNotice(ui.t(message.key), message.kind || 'info');
        }
        initialNoticeConsumed = true;
    }

    function bindPageActions(userinfo) {
        const unlinkButton = document.getElementById('btn_unlink_google');
        if (unlinkButton && !unlinkButton.disabled) {
            unlinkButton.addEventListener('click', async function () {
                if (!window.confirm(ui.t('myinfo_connections_google_disconnect_confirm'))) {
                    return;
                }
                try {
                    if (typeof app.setButtonLoading === 'function') {
                        app.setButtonLoading(unlinkButton, ui.t('saving'), true);
                    }
                    const response = await app.requestJSON(
                        ui.api('unlinkGoogle', '/account/ajax_unlink_google/'),
                        app.createFormData({})
                    );

                    if (response.checker === 'SUCCESS') {
                        flashNotice = { text: ui.t('myinfo_connections_google_disconnect_success'), kind: 'success' };
                        await boot(true);
                        return;
                    }
                    if (response.checker === 'PASSWORD_NOT_SET') {
                        flashNotice = { text: ui.t('myinfo_connections_google_disconnect_requires_password'), kind: 'error' };
                        await boot(true);
                        return;
                    }
                    if (response.checker === 'NOTEXIST') {
                        flashNotice = { text: ui.t('myinfo_connections_google_disconnect_missing'), kind: 'info' };
                        await boot(true);
                        return;
                    }
                    if (response.checker === 'UNAUTHORIZED') {
                        if (typeof app.setNotice === 'function') {
                            app.setNotice(ui.t('unauthorized'), 'error');
                        }
                        setTimeout(function () { app.redirect(ui.route('login', '/account/')); }, 400);
                        return;
                    }
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(response.checker || ui.t('generic_error'), 'error');
                    }
                } catch (error) {
                    if (app && typeof app.handleRequestError === 'function') {
                        app.handleRequestError(error);
                    }
                } finally {
                    if (typeof app.setButtonLoading === 'function') {
                        app.setButtonLoading(unlinkButton, ui.t('saving'), false);
                    }
                }
            });
        }
    }

    function renderPage(userinfo) {
        app.render(ui.layout(pageTitle(), pageDesc(), [localCard(userinfo), googleCard(userinfo)].join(''), 'connections'));
        ui.afterRender();
        applyNotice();
        bindPageActions(userinfo);
    }

    async function boot(silentReload) {
        if (!silentReload) renderLoading();
        try {
            const response = await ui.fetchUserinfo();
            if (response.checker === 'SUCCESS') { renderPage(response); return; }
            if (response.checker === 'UNAUTHORIZED') { ui.renderUnauthorized(pageTitle(), pageDesc(), 'connections'); return; }
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'connections');
        } catch (error) {
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'connections');
            if (app && typeof app.handleRequestError === 'function') app.handleRequestError(error);
        }
    }

    boot(false);
};
