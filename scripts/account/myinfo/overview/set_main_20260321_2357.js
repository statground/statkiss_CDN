window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

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

    function renderOverview(userinfo) {
        const actionsHtml = [
            '<p class="text-sm text-slate-600 dark:text-slate-300">' + ui.escapeHtml(ui.t('myinfo_overview_notice')) + '</p>',
            '<div class="flex flex-wrap gap-3">',
            ui.linkButton(ui.myinfoRoute('email'), ui.t('myinfo_nav_email')),
            ui.linkButton(ui.myinfoRoute('password'), ui.t('myinfo_nav_password'), true),
            ui.linkButton(ui.myinfoRoute('profile'), ui.t('myinfo_nav_profile'), true),
            '</div>',
        ].join('');

        const body = [
            ui.card(ui.t('myinfo_card_profile'), ui.summaryGrid(userinfo)),
            ui.card(ui.t('myinfo_card_actions'), actionsHtml),
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
