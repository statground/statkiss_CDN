window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    if (!app || !ui) return;

    ui.useMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    ui.useMessages(window.StatKISSAccountMyinfoOverviewMessages || {});

    function pageTitle() {
        return ui.t('myinfo_overview_title');
    }

    function pageDesc() {
        return ui.t('myinfo_overview_desc');
    }

    function renderLoading() {
        app.render(ui.layout(pageTitle(), pageDesc(), ui.loadingCard(), ''));
        ui.afterRender();
    }

    function connectionCard(userinfo) {
        const emailStatus = userinfo.has_usable_password ? ui.t('myinfo_method_enabled') : ui.t('myinfo_method_not_enabled');
        const googleStatus = userinfo.google_linked ? (userinfo.google_email_verified ? ui.t('myinfo_google_verified') : ui.t('myinfo_google_not_verified')) : ui.t('myinfo_method_not_enabled');
        const manageHref = ui.myinfoRoute('connections');
        const body = [
            '<dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + ui.escapeHtml(ui.t('myinfo_method_email')) + '</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(emailStatus) + (userinfo.auth_email ? '<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">' + ui.escapeHtml(userinfo.auth_email) + '</div>' : '') + '</dd>',
            '  </div>',
            '  <div class="sk-myinfo-summary-item rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
            '    <dt class="sk-myinfo-summary-label text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + ui.escapeHtml(ui.t('myinfo_method_google')) + '</dt>',
            '    <dd class="sk-myinfo-summary-value mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + ui.escapeHtml(googleStatus) + (userinfo.google_email ? '<div class="mt-1 text-xs text-slate-500 dark:text-slate-400">' + ui.escapeHtml(userinfo.google_email) + '</div>' : '') + '</dd>',
            '  </div>',
            '</dl>',
            ui.noticeBox(ui.t('myinfo_manage_connections_desc'), 'info'),
            '<div>' + ui.linkButton(manageHref, ui.t('myinfo_manage_connections'), true) + '</div>'
        ].join('');
        return ui.card(ui.t('myinfo_card_connections'), body);
    }

    function renderOverview(userinfo) {
        const body = [
            ui.card(ui.t('myinfo_card_profile'), ui.summaryGrid(userinfo)),
            connectionCard(userinfo)
        ].join('');

        app.render(ui.layout(pageTitle(), pageDesc(), body, ''));
        ui.afterRender();
    }

    async function boot() {
        renderLoading();
        try {
            const response = await ui.fetchUserinfo();
            if (response.checker === 'SUCCESS') {
                renderOverview(response);
                return;
            }
            if (response.checker === 'UNAUTHORIZED') {
                ui.renderUnauthorized(pageTitle(), pageDesc(), '');
                return;
            }
            ui.renderLoadFailed(pageTitle(), pageDesc(), '');
        } catch (error) {
            ui.renderLoadFailed(pageTitle(), pageDesc(), '');
            if (app && typeof app.handleRequestError === 'function') {
                app.handleRequestError(error);
            }
        }
    }

    boot();
};
