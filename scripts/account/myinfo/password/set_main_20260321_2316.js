window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    ui.useMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    ui.useMessages(window.StatKISSAccountMyinfoPasswordMessages || {});

    const target = ui.changePasswordRoute();
    const body = ui.card(
        ui.t('myinfo_card_actions'),
        '<p class="text-sm text-slate-600 dark:text-slate-300">' + ui.escapeHtml(ui.t('myinfo_password_redirect_notice')) + '</p>' +
        '<div>' + (typeof app.outlineButtonLink === 'function'
            ? app.outlineButtonLink(target, ui.t('myinfo_password_open'))
            : ui.linkButton(target, ui.t('myinfo_password_open'), true)) + '</div>'
    );

    app.render(ui.layout(ui.t('myinfo_password_title'), ui.t('myinfo_password_desc'), body, 'password'));

    setTimeout(function () {
        app.redirect(target);
    }, 120);
};
