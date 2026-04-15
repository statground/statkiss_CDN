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
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
    }

    function validationState(currentEmail, nextEmail) {
        const normalizedCurrent = String(currentEmail || '').trim().toLowerCase();
        const normalizedNext = String(nextEmail || '').trim().toLowerCase();

        if (!normalizedNext) {
            return 'EMPTY';
        }
        if (!isValidEmail(normalizedNext)) {
            return 'INVALID';
        }
        if (normalizedNext === normalizedCurrent) {
            return 'SAME';
        }
        return 'SUCCESS';
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_email_form" class="space-y-6" novalidate>',
            ui.card(
                ui.t('myinfo_card_profile'),
                '<div class="space-y-5">' +
                    app.textInput('txt_email_current', ui.t('current_email'), {
                        type: 'text',
                        readonly: true,
                        value: userinfo.email || '',
                        autocomplete: 'off',
                        spellcheck: 'false',
                        description: ui.t('readonly_email_desc'),
                    }) +
                    '<div>' +
                        app.textInput('txt_email_new', ui.t('new_email'), {
                            type: 'text',
                            value: '',
                            autocomplete: 'email',
                            spellcheck: 'false',
                        }) +
                        ui.helperSlot('txt_email_new', ui.t('email_change_help'), 'info') +
                    '</div>' +
                '</div>'
            ),
            '<div class="pt-2">' + app.primaryButton('btn_myinfo_email_save', ui.t('save')) + '</div>',
            '</form>',
        ].join('');

        app.render(ui.layout(pageTitle(), pageDesc(), formHtml, 'email'));
        ui.afterRender();

        const currentInput = document.getElementById('txt_email_current');
        const newInput = document.getElementById('txt_email_new');

        function updateEmailHelper(force) {
            if (!newInput) {
                return 'EMPTY';
            }

            const touched = newInput.dataset.touched === '1';
            const status = validationState(currentInput ? currentInput.value : '', newInput.value);

            if (!force && !touched && !String(newInput.value || '').trim()) {
                ui.clearFieldMessage('txt_email_new', ui.t('email_change_help'), 'info');
                return status;
            }

            if (status === 'EMPTY') {
                ui.showFieldMessage('txt_email_new', ui.t('email_help_empty'), 'error');
            } else if (status === 'INVALID') {
                ui.showFieldMessage('txt_email_new', ui.t('invalid_new_email'), 'error');
            } else if (status === 'SAME') {
                ui.showFieldMessage('txt_email_new', ui.t('email_same_as_current'), 'error');
            } else {
                ui.clearFieldMessage('txt_email_new', ui.t('email_change_help'), 'info');
            }
            return status;
        }

        if (newInput) {
            newInput.addEventListener('input', function () {
                newInput.dataset.touched = '1';
                if (typeof app.setNotice === 'function') {
                    app.setNotice('', 'info');
                }
                updateEmailHelper(false);
            });
            newInput.addEventListener('blur', function () {
                newInput.dataset.touched = '1';
                updateEmailHelper(true);
            });
        }

        app.bindSubmit('account_myinfo_email_form', async function () {
            if (typeof app.clearFieldErrors === 'function') {
                app.clearFieldErrors();
            }
            if (typeof app.setNotice === 'function') {
                app.setNotice('', 'info');
            }

            if (newInput) {
                newInput.dataset.touched = '1';
            }

            const localStatus = updateEmailHelper(true);
            if (localStatus !== 'SUCCESS') {
                return;
            }

            const nextEmail = String(app.valueOf('txt_email_new') || '').trim().toLowerCase();
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
                    if (currentInput) {
                        currentInput.value = response.email || nextEmail;
                    }
                    if (newInput) {
                        newInput.value = '';
                        newInput.dataset.touched = '0';
                    }
                    ui.showFieldMessage('txt_email_new', ui.t('email_change_success'), 'success');
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('email_change_success'), 'success');
                    }
                    return;
                }

                if (response.checker === 'EXIST') {
                    ui.showFieldMessage('txt_email_new', ui.t('email_change_conflict'), 'error');
                    return;
                }

                if (response.checker === 'SAME') {
                    ui.showFieldMessage('txt_email_new', ui.t('email_same_as_current'), 'error');
                    return;
                }

                if (response.checker === 'EMPTY') {
                    ui.showFieldMessage('txt_email_new', ui.t('email_help_empty'), 'error');
                    return;
                }

                if (response.checker === 'INVALID') {
                    ui.showFieldMessage('txt_email_new', ui.t('invalid_new_email'), 'error');
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
