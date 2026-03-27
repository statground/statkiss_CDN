
window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;
    const MESSAGE_MAP = {
        GOOGLE_LINK_SUCCESS: { key: 'google_link_success', kind: 'success' },
        GOOGLE_ALREADY_LINKED: { key: 'google_already_linked', kind: 'info' },
        GOOGLE_LINK_CONFLICT: { key: 'google_link_conflict', kind: 'error' },
        GOOGLE_LINK_SIGNIN_REQUIRED: { key: 'google_link_signin_required', kind: 'error' },
        GOOGLE_DISABLED: { key: 'google_disabled', kind: 'error' },
        GOOGLE_ACCESS_DENIED: { key: 'google_access_denied', kind: 'error' },
        GOOGLE_AUTH_FAILED: { key: 'google_auth_failed', kind: 'error' },
        GOOGLE_EMAIL_NOT_VERIFIED: { key: 'google_email_not_verified', kind: 'error' },
        GOOGLE_AMBIGUOUS_EMAIL: { key: 'google_ambiguous_email', kind: 'error' }
    };
    const SUPPORTED_LANGS = ["en", "ko", "ja", "zh-Hans", "zh-Hant", "es", "fr", "de", "pt-BR", "ru", "id", "vi", "th", "ms", "fil", "hi", "ar", "it", "nl", "pl", "sv", "tr", "uk"];
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
    function googleCard(userinfo) {
        const verifiedText = userinfo.google_email_verified ? ui.t('myinfo_connections_google_verified') : ui.t('myinfo_connections_google_not_verified');
        const body = userinfo.google_linked ? [
            ui.noticeBox(ui.t('myinfo_connections_google_linked'), 'success'),
            '<dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Google</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(userinfo.google_name || userinfo.google_email || 'Google') + '</dd>',
            '  </div>',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Email</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(userinfo.google_email || '') + '<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">' + ui.escapeHtml(verifiedText) + '</div></dd>',
            '  </div>',
            '</dl>'
        ].join('') : [
            ui.noticeBox(ui.t('myinfo_connections_google_not_linked'), 'info'),
            ui.noticeBox(ui.t('myinfo_connections_help'), 'info'),
            '<div>' + ui.linkButton(connectGoogleHref(), ui.t('myinfo_connections_google_action'), true) + '</div>'
        ].join('');
        return ui.card(ui.t('myinfo_connections_google_card'), body);
    }
    function renderPage(userinfo) {
        app.render(ui.layout(pageTitle(), pageDesc(), [localCard(userinfo), googleCard(userinfo)].join(''), 'connections'));
        const message = MESSAGE_MAP[app.pageMsg || ''];
        if (message && typeof app.setNotice === 'function') app.setNotice(ui.t(message.key), message.kind || 'info');
        ui.afterRender();
    }
    async function boot() {
        renderLoading();
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
    boot();
};
