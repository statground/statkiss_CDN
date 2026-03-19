window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages(window.StatKISSAccountAccountMessages || {});

    const nextUrl = app.queryParam('next');

    const bodyHtml = [
        '<form id="account_login_form" class="space-y-5">',
        '  <div class="grid grid-cols-1 gap-5">',
        '      <div>' + app.textInput('txt_email', app.t('email'), { type: 'email', autocomplete: 'email' }) + '</div>',
        '      <div>' + app.textInput('txt_password', app.t('password'), { type: 'password', autocomplete: 'current-password' }) + '</div>',
        '  </div>',
        '  <div class="pt-2">' + app.primaryButton('btn_login', app.t('login')) + '</div>',
        '</form>'
    ].join('');

    const footerHtml = [
        '<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">',
        '   <div class="flex flex-wrap items-center gap-x-4 gap-y-2">',
        '       ' + app.secondaryLink(app.routes.changePassword, app.t('recover_password')),
        '       <span class="text-slate-300 dark:text-slate-700">|</span>',
        '       ' + app.secondaryLink(app.routes.signup, app.t('go_signup')),
        '   </div>',
        '   <div class="statkiss-account-muted text-xs leading-6 text-slate-500 dark:text-slate-400 sm:max-w-xs sm:text-right">' + app.escapeHtml(app.t('support_contact')) + ' <a class="statkiss-account-link font-medium text-sky-700 dark:text-sky-300" href="mailto:' + app.escapeHtml(app.supportEmail) + '">' + app.escapeHtml(app.supportEmail) + '</a></div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(app.t('login_title'), app.t('login_desc'), bodyHtml, footerHtml));

    app.bindSubmit('account_login_form', async function () {
        app.clearFieldErrors();
        app.setNotice('', 'info');

        const email = app.valueOf('txt_email');
        const password = app.valueOf('txt_password');
        const button = document.getElementById('btn_login');

        if (!app.validateEmail(email)) {
            app.setFieldError('txt_email', app.t('invalid_email'));
            return;
        }
        if (!password) {
            app.setFieldError('txt_password', app.t('password_required'));
            return;
        }

        try {
            app.setButtonLoading(button, app.t('signing_in'), true);
            const response = await app.requestJSON(
                app.api.signin,
                app.createFormData({ txt_email: email, txt_password: password })
            );

            if (response.checker === 'SUCCESS') {
                app.setNotice(app.t('login_success'), 'success');
                app.redirect(nextUrl || app.routes.home);
                return;
            }
            if (response.checker === 'WRONGPASSWORD') {
                app.setFieldError('txt_password', app.t('wrong_password'));
                return;
            }
            if (response.checker === 'NOTEXIST') {
                app.setFieldError('txt_email', app.t('not_exist'));
                return;
            }
            app.setNotice(response.checker || app.t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, app.t('signing_in'), false);
        }
    });

};
