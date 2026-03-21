window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    app.extendPageMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    app.extendPageMessages(window.StatKISSAccountMyinfoOverviewMessages || {});

    function renderLoading() {
        app.render(ui.layout(app.t('myinfo_overview_title'), app.t('myinfo_overview_desc'), ui.loadingCard(), ''));
    }

    function renderOverview(userinfo) {
        const actionsHtml = [
            '<p class="text-sm text-slate-600 dark:text-slate-300">' + ui.escapeHtml(app.t('myinfo_overview_notice')) + '</p>',
            '<div class="flex flex-wrap gap-3">',
            ui.linkButton(ui.myinfoRoute('email'), app.t('myinfo_nav_email')),
            ui.linkButton(ui.myinfoRoute('password'), app.t('myinfo_nav_password'), true),
            ui.linkButton(ui.myinfoRoute('profile'), app.t('myinfo_nav_profile'), true),
            '</div>',
        ].join('');

        const body = [
            ui.card(app.t('myinfo_card_profile'), ui.summaryGrid(userinfo)),
            ui.card(app.t('myinfo_card_actions'), actionsHtml),
        ].join('');

        app.render(ui.layout(app.t('myinfo_overview_title'), app.t('myinfo_overview_desc'), body, ''));
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
                ui.renderUnauthorized(app.t('myinfo_overview_title'), app.t('myinfo_overview_desc'), '');
                return;
            }
            ui.renderLoadFailed(app.t('myinfo_overview_title'), app.t('myinfo_overview_desc'), '');
        } catch (error) {
            ui.renderLoadFailed(app.t('myinfo_overview_title'), app.t('myinfo_overview_desc'), '');
            app.handleRequestError(error);
        }
    }

    boot();
};
