window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    app.extendPageMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    app.extendPageMessages(window.StatKISSAccountMyinfoPasswordMessages || {});

    const target = ui.changePasswordRoute();
    const body = ui.card(
        app.t('myinfo_card_actions'),
        '<p class="text-sm text-slate-600 dark:text-slate-300">' + ui.escapeHtml(app.t('myinfo_password_redirect_notice')) + '</p>' +
        '<div>' + app.outlineButtonLink(target, app.t('myinfo_password_open')) + '</div>'
    );

    app.render(ui.layout(app.t('myinfo_password_title'), app.t('myinfo_password_desc'), body, 'password'));

    setTimeout(function () {
        app.redirect(target);
    }, 120);
};
