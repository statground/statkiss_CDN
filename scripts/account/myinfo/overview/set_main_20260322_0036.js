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
        const body = ui.card(ui.t('myinfo_card_profile'), ui.summaryGrid(userinfo));

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
