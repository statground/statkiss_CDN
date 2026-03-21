window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    ui.useMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    ui.useMessages(window.StatKISSAccountMyinfoEmailMessages || {});

    function pageTitle() {
        return ui.t('myinfo_email_title');
    }

    function pageDesc() {
        return ui.t('myinfo_email_desc');
    }

    function renderLoading() {
        app.render(ui.layout(pageTitle(), pageDesc(), ui.loadingCard(), 'email'));
        ui.afterRender();
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_email_form" class="space-y-6">',
            ui.card(
                ui.t('myinfo_card_profile'),
                '<div class="space-y-5">' +
                    app.textInput('txt_email_current', ui.t('current_email'), {
                        type: 'email',
                        readonly: true,
                        value: userinfo.email || '',
                        description: ui.t('readonly_email_desc'),
                    }) +
                    app.textInput('txt_email_new', ui.t('new_email'), {
                        type: 'email',
                        value: '',
                        description: ui.t('email_change_help'),
                    }) +
                '</div>'
            ),
            '<div class="pt-2">' + app.primaryButton('btn_myinfo_email_save', ui.t('save')) + '</div>',
            '</form>',
        ].join('');

        app.render(ui.layout(pageTitle(), pageDesc(), formHtml, 'email'));
        ui.afterRender();

        app.bindSubmit('account_myinfo_email_form', async function () {
            if (typeof app.clearFieldErrors === 'function') {
                app.clearFieldErrors();
            }
            if (typeof app.setNotice === 'function') {
                app.setNotice('', 'info');
            }

            const currentEmail = String(app.valueOf('txt_email_current') || '').trim().toLowerCase();
            const nextEmail = String(app.valueOf('txt_email_new') || '').trim().toLowerCase();

            if (!nextEmail || !isValidEmail(nextEmail)) {
                if (typeof app.setFieldError === 'function') {
                    app.setFieldError('txt_email_new', ui.t('invalid_new_email'));
                }
                return;
            }

            if (nextEmail === currentEmail) {
                if (typeof app.setFieldError === 'function') {
                    app.setFieldError('txt_email_new', ui.t('email_same_as_current'));
                }
                return;
            }

            const button = document.getElementById('btn_myinfo_email_save');
            try {
                if (typeof app.setButtonLoading === 'function') {
                    app.setButtonLoading(button, ui.t('saving'), true);
                }
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
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('email_change_success'), 'success');
                    }
                    return;
                }

                if (response.checker === 'EXIST') {
                    if (typeof app.setFieldError === 'function') {
                        app.setFieldError('txt_email_new', ui.t('email_change_conflict'));
                    }
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('email_change_conflict'), 'error');
                    }
                    return;
                }

                if (response.checker === 'INVALID') {
                    if (typeof app.setFieldError === 'function') {
                        app.setFieldError('txt_email_new', ui.t('invalid_new_email'));
                    }
                    return;
                }

                if (response.checker === 'UNAUTHORIZED') {
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('unauthorized'), 'error');
                    }
                    setTimeout(function () { app.redirect((window.STATKISS_ACCOUNT_BOOTSTRAP.routes || {}).login || '/account/'); }, 400);
                    return;
                }

                if (typeof app.setNotice === 'function') {
                    app.setNotice(response.checker || ui.t('generic_error'), 'error');
                }
            } catch (error) {
                if (app && typeof app.handleRequestError === 'function') {
                    app.handleRequestError(error);
                }
            } finally {
                if (typeof app.setButtonLoading === 'function') {
                    app.setButtonLoading(button, ui.t('saving'), false);
                }
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
                ui.renderUnauthorized(pageTitle(), pageDesc(), 'email');
                return;
            }
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'email');
        } catch (error) {
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'email');
            if (app && typeof app.handleRequestError === 'function') {
                app.handleRequestError(error);
            }
        }
    }

    boot();
};
