window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;
    const MIN_PASSWORD_LENGTH = 8;

    if (!app || !ui) return;

    ui.useMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    ui.useMessages(window.StatKISSAccountMyinfoPasswordMessages || {});

    function pageTitle() {
        return ui.t('myinfo_password_title');
    }

    function pageDesc() {
        return ui.t('myinfo_password_desc');
    }

    function renderLoading() {
        app.render(ui.layout(pageTitle(), pageDesc(), ui.loadingCard(), 'password'));
        ui.afterRender();
    }

    function passwordStatus(value) {
        const text = String(value || '');
        if (!text) return 'EMPTY';
        if (text.length < MIN_PASSWORD_LENGTH) return 'SHORT';
        return 'VALID';
    }

    function confirmStatus(passwordValue, confirmValue) {
        const confirmText = String(confirmValue || '');
        if (!confirmText) return 'EMPTY';
        if (String(passwordValue || '') !== confirmText) return 'MISMATCH';
        return 'VALID';
    }

    function currentPasswordField(userinfo) {
        if (!userinfo.has_usable_password) {
            return [
                '<div class="rounded-xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm text-sky-800 dark:border-sky-900/80 dark:bg-sky-950/30 dark:text-sky-200">',
                '  <p class="font-medium">' + ui.escapeHtml(ui.t('myinfo_password_no_current_password_notice')) + '</p>',
                '  <p class="mt-2 text-xs text-sky-700 dark:text-sky-300">' + ui.escapeHtml(ui.t('myinfo_password_current_password_not_set')) + '</p>',
                '</div>'
            ].join('');
        }

        return [
            '<div>',
            app.textInput('txt_current_password', ui.t('myinfo_password_current_password'), {
                type: 'password',
                autocomplete: 'current-password'
            }),
            ui.helperSlot('txt_current_password', '', 'info'),
            '</div>'
        ].join('');
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_password_form" class="space-y-6" novalidate>',
            ui.card(
                ui.t('change_password'),
                [
                    '<p class="text-sm leading-6 text-slate-600 dark:text-slate-300">' + ui.escapeHtml(ui.t('myinfo_password_form_desc')) + '</p>',
                    '<div class="space-y-5">',
                    currentPasswordField(userinfo),
                    '<div>' +
                    app.textInput('txt_new_password', ui.t('myinfo_password_new_password'), {
                        type: 'password',
                        autocomplete: 'new-password'
                    }) +
                    ui.helperSlot('txt_new_password', '', 'info') +
                    '</div>',
                    '<div>' +
                    app.textInput('txt_new_password_confirm', ui.t('myinfo_password_new_password_confirm'), {
                        type: 'password',
                        autocomplete: 'new-password'
                    }) +
                    ui.helperSlot('txt_new_password_confirm', '', 'info') +
                    '</div>',
                    '</div>'
                ].join('')
            ),
            '<div class="pt-2">' + app.primaryButton('btn_myinfo_password_save', ui.t('save')) + '</div>',
            '</form>'
        ].join('');

        app.render(ui.layout(pageTitle(), pageDesc(), formHtml, 'password'));
        ui.afterRender();

        const currentInput = document.getElementById('txt_current_password');
        const newInput = document.getElementById('txt_new_password');
        const confirmInput = document.getElementById('txt_new_password_confirm');

        function updateCurrentHelper(force) {
            if (!userinfo.has_usable_password || !currentInput) {
                return 'VALID';
            }
            const touched = currentInput.dataset.touched === '1';
            const status = passwordStatus(currentInput.value);
            if (!force && !touched && !String(currentInput.value || '').trim()) {
                ui.clearFieldMessage('txt_current_password', '', 'info');
                return status;
            }
            if (status === 'EMPTY') {
                ui.showFieldMessage('txt_current_password', ui.t('password_help_empty'), 'error');
            } else if (status === 'SHORT') {
                ui.showFieldMessage('txt_current_password', ui.t('password_help_short'), 'error');
            } else {
                ui.showFieldMessage('txt_current_password', ui.t('password_help_valid'), 'success');
            }
            return status;
        }

        function updateNewHelper(force) {
            if (!newInput) {
                return 'EMPTY';
            }
            const touched = newInput.dataset.touched === '1';
            const status = passwordStatus(newInput.value);
            const sameAsCurrent = (
                userinfo.has_usable_password &&
                currentInput &&
                String(currentInput.value || '') &&
                String(currentInput.value || '') === String(newInput.value || '')
            );

            if (!force && !touched && !String(newInput.value || '').trim()) {
                ui.clearFieldMessage('txt_new_password', '', 'info');
                return status;
            }

            if (status === 'EMPTY') {
                ui.showFieldMessage('txt_new_password', ui.t('password_help_empty'), 'error');
            } else if (status === 'SHORT') {
                ui.showFieldMessage('txt_new_password', ui.t('password_help_short'), 'error');
            } else if (sameAsCurrent) {
                ui.showFieldMessage('txt_new_password', ui.t('myinfo_password_same_as_current'), 'error');
                return 'SAME';
            } else {
                ui.showFieldMessage('txt_new_password', ui.t('password_help_valid'), 'success');
            }
            return status;
        }

        function updateConfirmHelper(force) {
            if (!confirmInput) {
                return 'EMPTY';
            }
            const touched = confirmInput.dataset.touched === '1';
            const status = confirmStatus(newInput ? newInput.value : '', confirmInput.value);
            if (!force && !touched && !String(confirmInput.value || '').trim()) {
                ui.clearFieldMessage('txt_new_password_confirm', '', 'info');
                return status;
            }
            if (status === 'EMPTY') {
                ui.showFieldMessage('txt_new_password_confirm', ui.t('password_confirm_help_empty'), 'error');
            } else if (status === 'MISMATCH') {
                ui.showFieldMessage('txt_new_password_confirm', ui.t('password_confirm_help_mismatch'), 'error');
            } else {
                ui.showFieldMessage('txt_new_password_confirm', ui.t('password_confirm_help_valid'), 'success');
            }
            return status;
        }

        if (currentInput) {
            currentInput.addEventListener('input', function () {
                currentInput.dataset.touched = '1';
                if (typeof app.setNotice === 'function') app.setNotice('', 'info');
                updateCurrentHelper(false);
                updateNewHelper(false);
            });
            currentInput.addEventListener('blur', function () {
                currentInput.dataset.touched = '1';
                updateCurrentHelper(true);
                updateNewHelper(false);
            });
        }

        if (newInput) {
            newInput.addEventListener('input', function () {
                newInput.dataset.touched = '1';
                if (typeof app.setNotice === 'function') app.setNotice('', 'info');
                updateNewHelper(false);
                updateConfirmHelper(false);
            });
            newInput.addEventListener('blur', function () {
                newInput.dataset.touched = '1';
                updateNewHelper(true);
                updateConfirmHelper(false);
            });
        }

        if (confirmInput) {
            confirmInput.addEventListener('input', function () {
                confirmInput.dataset.touched = '1';
                if (typeof app.setNotice === 'function') app.setNotice('', 'info');
                updateConfirmHelper(false);
            });
            confirmInput.addEventListener('blur', function () {
                confirmInput.dataset.touched = '1';
                updateConfirmHelper(true);
            });
        }

        app.bindSubmit('account_myinfo_password_form', async function () {
            if (typeof app.clearFieldErrors === 'function') app.clearFieldErrors();
            if (typeof app.setNotice === 'function') app.setNotice('', 'info');

            if (currentInput) currentInput.dataset.touched = '1';
            if (newInput) newInput.dataset.touched = '1';
            if (confirmInput) confirmInput.dataset.touched = '1';

            const currentStatus = updateCurrentHelper(true);
            const newStatus = updateNewHelper(true);
            const confirmState = updateConfirmHelper(true);

            if ((userinfo.has_usable_password && currentStatus !== 'VALID') || newStatus !== 'VALID' || confirmState !== 'VALID') {
                return;
            }

            const button = document.getElementById('btn_myinfo_password_save');
            try {
                if (typeof app.setButtonLoading === 'function') {
                    app.setButtonLoading(button, ui.t('saving'), true);
                }

                const response = await app.requestJSON(
                    ui.api('updatePasswordAuthenticated', '/account/ajax_update_password_authenticated/'),
                    app.createFormData({
                        txt_current_password: app.valueOf('txt_current_password'),
                        txt_new_password: app.valueOf('txt_new_password'),
                        txt_new_password_confirm: app.valueOf('txt_new_password_confirm')
                    })
                );

                if (response.checker === 'SUCCESS') {
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('change_password_success'), 'success');
                    }
                    app.redirect(response.redirect_url || ui.route('login', '/account/'));
                    return;
                }

                if (response.checker === 'CURRENT_PASSWORD_REQUIRED') {
                    ui.showFieldMessage('txt_current_password', ui.t('password_help_empty'), 'error');
                    return;
                }

                if (response.checker === 'WRONG_CURRENT_PASSWORD') {
                    ui.showFieldMessage('txt_current_password', ui.t('wrong_password'), 'error');
                    return;
                }

                if (response.checker === 'NEW_PASSWORD_REQUIRED') {
                    ui.showFieldMessage('txt_new_password', ui.t('password_help_empty'), 'error');
                    return;
                }

                if (response.checker === 'INVALID_PASSWORD') {
                    ui.showFieldMessage('txt_new_password', ui.t('password_help_short'), 'error');
                    return;
                }

                if (response.checker === 'PASSWORD_CONFIRM_REQUIRED') {
                    ui.showFieldMessage('txt_new_password_confirm', ui.t('password_confirm_help_empty'), 'error');
                    return;
                }

                if (response.checker === 'PASSWORD_MISMATCH') {
                    ui.showFieldMessage('txt_new_password_confirm', ui.t('password_confirm_help_mismatch'), 'error');
                    return;
                }

                if (response.checker === 'SAME_AS_CURRENT') {
                    ui.showFieldMessage('txt_new_password', ui.t('myinfo_password_same_as_current'), 'error');
                    return;
                }

                if (response.checker === 'UNAUTHORIZED') {
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('unauthorized'), 'error');
                    }
                    setTimeout(function () {
                        app.redirect(ui.route('login', '/account/'));
                    }, 400);
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
                ui.renderUnauthorized(pageTitle(), pageDesc(), 'password');
                return;
            }
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'password');
        } catch (error) {
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'password');
            if (app && typeof app.handleRequestError === 'function') {
                app.handleRequestError(error);
            }
        }
    }

    boot();
};
