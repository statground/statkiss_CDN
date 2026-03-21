window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    app.extendPageMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    app.extendPageMessages(window.StatKISSAccountMyinfoEmailMessages || {});

    function renderLoading() {
        app.render(ui.layout(app.t('myinfo_email_title'), app.t('myinfo_email_desc'), ui.loadingCard(), 'email'));
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_email_form" class="space-y-6">',
            ui.card(
                app.t('myinfo_card_profile'),
                '<div class="space-y-5">' +
                    app.textInput('txt_email_current', app.t('current_email'), {
                        type: 'email',
                        readonly: true,
                        value: userinfo.email || '',
                        description: app.t('readonly_email_desc'),
                    }) +
                    app.textInput('txt_email_new', app.t('new_email'), {
                        type: 'email',
                        value: '',
                        description: app.t('email_change_help'),
                    }) +
                '</div>'
            ),
            '<div class="pt-2">' + app.primaryButton('btn_myinfo_email_save', app.t('save')) + '</div>',
            '</form>',
        ].join('');

        app.render(ui.layout(app.t('myinfo_email_title'), app.t('myinfo_email_desc'), formHtml, 'email'));

        app.bindSubmit('account_myinfo_email_form', async function () {
            app.clearFieldErrors();
            app.setNotice('', 'info');

            const currentEmail = String(app.valueOf('txt_email_current') || '').trim().toLowerCase();
            const nextEmail = String(app.valueOf('txt_email_new') || '').trim().toLowerCase();

            if (!nextEmail || !isValidEmail(nextEmail)) {
                app.setFieldError('txt_email_new', app.t('invalid_new_email'));
                return;
            }

            if (nextEmail === currentEmail) {
                app.setFieldError('txt_email_new', app.t('email_same_as_current'));
                return;
            }

            const button = document.getElementById('btn_myinfo_email_save');
            try {
                app.setButtonLoading(button, app.t('saving'), true);
                const response = await app.requestJSON(
                    ui.api('updateEmail', '/account/ajax_update_email/'),
                    app.createFormData({
                        txt_email_new: nextEmail,
                    })
                );

                if (response.checker === 'SUCCESS') {
                    const currentInput = document.getElementById('txt_email_current');
                    const newInput = document.getElementById('txt_email_new');
                    if (currentInput) {
                        currentInput.value = response.email || nextEmail;
                    }
                    if (newInput) {
                        newInput.value = '';
                    }
                    app.setNotice(app.t('email_change_success'), 'success');
                    return;
                }

                if (response.checker === 'EXIST') {
                    app.setFieldError('txt_email_new', app.t('email_change_conflict'));
                    app.setNotice(app.t('email_change_conflict'), 'error');
                    return;
                }

                if (response.checker === 'INVALID') {
                    app.setFieldError('txt_email_new', app.t('invalid_new_email'));
                    return;
                }

                if (response.checker === 'UNAUTHORIZED') {
                    app.setNotice(app.t('unauthorized'), 'error');
                    setTimeout(function () { app.redirect((window.STATKISS_ACCOUNT_BOOTSTRAP.routes || {}).login || '/account/'); }, 400);
                    return;
                }

                app.setNotice(response.checker || app.t('generic_error'), 'error');
            } catch (error) {
                app.handleRequestError(error);
            } finally {
                app.setButtonLoading(button, app.t('saving'), false);
            }
        });
    }

    async function boot() {
        renderLoading();
        try {
            const response = await ui.fetchUserinfo();
            if (response.checker === 'SUCCESS') {
                renderForm(response);
                return;
            }
            if (response.checker === 'UNAUTHORIZED') {
                ui.renderUnauthorized(app.t('myinfo_email_title'), app.t('myinfo_email_desc'), 'email');
                return;
            }
            ui.renderLoadFailed(app.t('myinfo_email_title'), app.t('myinfo_email_desc'), 'email');
        } catch (error) {
            ui.renderLoadFailed(app.t('myinfo_email_title'), app.t('myinfo_email_desc'), 'email');
            app.handleRequestError(error);
        }
    }

    boot();
};
