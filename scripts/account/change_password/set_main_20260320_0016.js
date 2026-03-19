window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages(window.StatKISSAccountChangePasswordMessages || {});

    function renderRequestForm() {
        const bodyHtml = [
            '<form id="password_request_form" class="space-y-5">',
            '  <div>' + app.textInput('email', app.t('email'), { type: 'email', autocomplete: 'email' }) + '</div>',
            '  <div class="pt-2">' + app.primaryButton('btn_send_link', app.t('send_link')) + '</div>',
            '</form>'
        ].join('');

        const footerHtml = app.secondaryLink(app.routes.login, app.t('back_to_login'));
        app.render(app.pageShell(app.t('forgot_title'), app.t('forgot_desc'), bodyHtml, footerHtml));

        app.bindSubmit('password_request_form', async function () {
            app.clearFieldErrors();
            app.setNotice('', 'info');
            const email = app.valueOf('email');
            if (!app.validateEmail(email)) {
                app.setFieldError('email', app.t('invalid_email'));
                return;
            }

            const button = document.getElementById('btn_send_link');
            try {
                app.setButtonLoading(button, app.t('sending'), true);
                const response = await app.requestJSON(app.api.sendAuthEmail, app.createFormData({ email: email }));
                if (response.exist === 'EXIST') {
                    app.setNotice(app.t('email_sent'), 'success');
                    return;
                }
                if (response.exist === 'NOTEXIST') {
                    app.setFieldError('email', app.t('email_not_found'));
                    return;
                }
                app.setNotice(response.exist || app.t('generic_error'), 'error');
            } catch (error) {
                app.handleRequestError(error);
            } finally {
                app.setButtonLoading(button, app.t('sending'), false);
            }
        });
    }

    function renderInvalidToken() {
        const bodyHtml = [
            '<div class="space-y-4">',
            '   <div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + app.t('invalid_auth_code') + '</div>',
            '   <div class="flex flex-wrap gap-3">',
            '       <a href="' + app.routes.changePassword + '" class="statkiss-account-solid-btn inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">' + app.t('retry') + '</a>',
            '       ' + app.outlineButtonLink(app.routes.login, app.t('go_login')),
            '   </div>',
            '</div>'
        ].join('');
        app.render(app.pageShell(app.t('reset_title'), app.t('reset_desc'), bodyHtml, ''));
    }

    function renderResetForm(tokenResponse) {
        const bodyHtml = [
            '<form id="password_change_form" class="space-y-5">',
            '  <div>' + app.textInput('email_receiver', app.t('email'), { type: 'email', readonly: true, value: tokenResponse.email_receiver || '' }) + '</div>',
            '  <div>' + app.textInput('new_password', app.t('password'), { type: 'password', autocomplete: 'new-password' }) + '</div>',
            '  <div>' + app.textInput('new_password_confirm', app.t('password_confirm'), { type: 'password', autocomplete: 'new-password' }) + '</div>',
            '  <div class="pt-2">' + app.primaryButton('btn_password_change', app.t('change_password')) + '</div>',
            '</form>'
        ].join('');

        const footerHtml = app.secondaryLink(app.routes.login, app.t('back_to_login'));
        app.render(app.pageShell(app.t('reset_title'), app.t('reset_desc'), bodyHtml, footerHtml));

        app.bindSubmit('password_change_form', async function () {
            app.clearFieldErrors();
            app.setNotice('', 'info');

            const password = app.valueOf('new_password');
            const passwordConfirm = app.valueOf('new_password_confirm');
            if (!app.validatePassword(password)) {
                app.setFieldError('new_password', app.t('invalid_password'));
                return;
            }
            if (password !== passwordConfirm) {
                app.setFieldError('new_password_confirm', app.t('password_mismatch'));
                return;
            }

            const button = document.getElementById('btn_password_change');
            try {
                app.setButtonLoading(button, app.t('changing'), true);
                const response = await app.requestJSON(app.api.passwordChange, app.createFormData({
                    email: tokenResponse.email_receiver || '',
                    password: password,
                    auth_code: tokenResponse.auth_code || app.pageMsg || '',
                }));
                if (response.checker === 'SUCCESS') {
                    app.setNotice(app.t('change_password_success'), 'success');
                    setTimeout(function () { app.redirect(app.routes.login); }, 700);
                    return;
                }
                if (response.checker === 'NOTEXIST' || response.checker === 'EXPIRED' || response.checker === 'MISMATCH') {
                    renderInvalidToken();
                    return;
                }
                app.setNotice(response.checker || app.t('generic_error'), 'error');
            } catch (error) {
                app.handleRequestError(error);
            } finally {
                app.setButtonLoading(button, app.t('changing'), false);
            }
        });
    }

    async function bootAuthMode() {
        app.render(app.pageShell(
            app.t('reset_title'),
            app.t('reset_desc'),
            '<div class="statkiss-account-soft rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">' + app.t('loading') + '</div>',
            ''
        ));

        const authCode = app.pageMsg || app.queryParam('auth_code');
        if (!authCode) {
            renderInvalidToken();
            return;
        }

        try {
            const response = await app.requestJSON(app.api.checkAuthCode, app.createFormData({ auth_code: authCode }));
            if (response.checker === 'SUCCESS') {
                renderResetForm(response);
                return;
            }
            renderInvalidToken();
        } catch (error) {
            renderInvalidToken();
            app.handleRequestError(error);
        }
    }

    if (app.pageMode === 'auth') {
        bootAuthMode();
        return;
    }
    renderRequestForm();

};
