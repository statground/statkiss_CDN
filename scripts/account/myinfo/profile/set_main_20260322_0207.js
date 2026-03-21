window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    ui.useMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    ui.useMessages(window.StatKISSAccountMyinfoProfileMessages || {});

    function pageTitle() {
        return ui.t('myinfo_profile_title');
    }

    function pageDesc() {
        return ui.t('myinfo_profile_desc');
    }

    function renderLoading() {
        app.render(ui.layout(pageTitle(), pageDesc(), ui.loadingCard(), 'profile'));
        ui.afterRender();
    }

    function localizeDynamicOptions() {
        ui.localizeSelectOptions(document.getElementById('sel_gender'), 'gender');
        ui.localizeSelectOptions(document.getElementById('sel_education'), 'education');
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_profile_form" class="space-y-6" novalidate>',
            ui.card(
                ui.t('myinfo_card_profile'),
                [
                    '<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
                    '  <div class="sm:col-span-2">' +
                    '      ' + app.textInput('txt_name', ui.t('name'), { value: userinfo.name || '' }) +
                    '      ' + ui.helperSlot('txt_name', '', 'info') +
                    '  </div>',
                    '  <div>' + app.textInput('txt_affiliation', ui.t('affiliation'), { value: userinfo.affiliation || '' }) + '</div>',
                    '  <div>' + app.textInput('txt_title', ui.t('title'), { value: userinfo.title || '' }) + '</div>',
                    '  <div>' +
                    '      ' + app.selectInput('sel_gender', ui.t('gender'), app.genderOptions(), userinfo.gender || '') +
                    '      ' + ui.helperSlot('sel_gender', '', 'info') +
                    '  </div>',
                    '  <div>' +
                    '      ' + app.selectInput('sel_education', ui.t('education'), app.educationOptions(), userinfo.education || '') +
                    '      ' + ui.helperSlot('sel_education', '', 'info') +
                    '  </div>',
                    '  <div class="sm:col-span-2">' + app.textareaInput('txt_interest', ui.t('interest'), { placeholder: ui.t('no_interest_placeholder') }) + '</div>',
                    '</div>',
                ].join('')
            ),
            '<div class="pt-2">' + app.primaryButton('btn_myinfo_profile_save', ui.t('save')) + '</div>',
            '</form>',
        ].join('');

        app.render(ui.layout(pageTitle(), pageDesc(), formHtml, 'profile'));
        ui.afterRender();

        const interestInput = document.getElementById('txt_interest');
        const nameInput = document.getElementById('txt_name');
        const genderSelect = document.getElementById('sel_gender');
        const educationSelect = document.getElementById('sel_education');

        if (interestInput) {
            interestInput.value = userinfo.interest || '';
        }

        localizeDynamicOptions();

        function validateName(force) {
            if (!nameInput) {
                return 'SUCCESS';
            }
            const touched = nameInput.dataset.touched === '1';
            const value = String(nameInput.value || '').trim();
            if (!force && !touched && !value) {
                ui.clearFieldMessage('txt_name');
                return 'EMPTY';
            }
            if (!value) {
                ui.showFieldMessage('txt_name', ui.t('invalid_name'), 'error');
                return 'EMPTY';
            }
            ui.clearFieldMessage('txt_name');
            return 'SUCCESS';
        }

        function validateGender(force) {
            if (!genderSelect) {
                return 'SUCCESS';
            }
            const touched = genderSelect.dataset.touched === '1';
            const value = app.valueOf('sel_gender');
            if (!force && !touched && ui.isEmptyChoice(value)) {
                ui.clearFieldMessage('sel_gender');
                return 'EMPTY';
            }
            if (ui.isEmptyChoice(value)) {
                ui.showFieldMessage('sel_gender', ui.t('invalid_gender'), 'error');
                return 'EMPTY';
            }
            ui.clearFieldMessage('sel_gender');
            return 'SUCCESS';
        }

        function validateEducation(force) {
            if (!educationSelect) {
                return 'SUCCESS';
            }
            const touched = educationSelect.dataset.touched === '1';
            const value = app.valueOf('sel_education');
            if (!force && !touched && ui.isEmptyChoice(value)) {
                ui.clearFieldMessage('sel_education');
                return 'EMPTY';
            }
            if (ui.isEmptyChoice(value)) {
                ui.showFieldMessage('sel_education', ui.t('invalid_education'), 'error');
                return 'EMPTY';
            }
            ui.clearFieldMessage('sel_education');
            return 'SUCCESS';
        }

        if (nameInput) {
            nameInput.addEventListener('input', function () {
                nameInput.dataset.touched = '1';
                if (typeof app.setNotice === 'function') {
                    app.setNotice('', 'info');
                }
                validateName(false);
            });
            nameInput.addEventListener('blur', function () {
                nameInput.dataset.touched = '1';
                validateName(true);
            });
        }

        if (genderSelect) {
            genderSelect.addEventListener('change', function () {
                genderSelect.dataset.touched = '1';
                if (typeof app.setNotice === 'function') {
                    app.setNotice('', 'info');
                }
                validateGender(true);
            });
            genderSelect.addEventListener('blur', function () {
                genderSelect.dataset.touched = '1';
                validateGender(true);
            });
        }

        if (educationSelect) {
            educationSelect.addEventListener('change', function () {
                educationSelect.dataset.touched = '1';
                if (typeof app.setNotice === 'function') {
                    app.setNotice('', 'info');
                }
                validateEducation(true);
            });
            educationSelect.addEventListener('blur', function () {
                educationSelect.dataset.touched = '1';
                validateEducation(true);
            });
        }

        app.bindSubmit('account_myinfo_profile_form', async function () {
            if (typeof app.clearFieldErrors === 'function') {
                app.clearFieldErrors();
            }
            if (typeof app.setNotice === 'function') {
                app.setNotice('', 'info');
            }

            if (nameInput) nameInput.dataset.touched = '1';
            if (genderSelect) genderSelect.dataset.touched = '1';
            if (educationSelect) educationSelect.dataset.touched = '1';

            const nameStatus = validateName(true);
            const genderStatus = validateGender(true);
            const educationStatus = validateEducation(true);

            if (nameStatus !== 'SUCCESS' || genderStatus !== 'SUCCESS' || educationStatus !== 'SUCCESS') {
                return;
            }

            const button = document.getElementById('btn_myinfo_profile_save');
            try {
                if (typeof app.setButtonLoading === 'function') {
                    app.setButtonLoading(button, ui.t('saving'), true);
                }
                const response = await app.requestJSON(
                    ui.api('updateUserinfo', '/account/ajax_update_userinfo/'),
                    app.createFormData({
                        txt_name: app.valueOf('txt_name'),
                        txt_affiliation: app.valueOf('txt_affiliation'),
                        txt_title: app.valueOf('txt_title'),
                        sel_gender: app.valueOf('sel_gender'),
                        sel_education: app.valueOf('sel_education'),
                        txt_interest: app.valueOf('txt_interest'),
                    })
                );

                if (response.checker === 'SUCCESS') {
                    if (typeof app.setNotice === 'function') {
                        app.setNotice(ui.t('save_success'), 'success');
                    }
                    try {
                        const refreshed = await ui.fetchUserinfo();
                        if (refreshed.checker === 'SUCCESS') {
                            renderForm(refreshed);
                            if (typeof app.setNotice === 'function') {
                                app.setNotice(ui.t('save_success'), 'success');
                            }
                        }
                    } catch (error) {
                        /* ignore refresh error and keep optimistic success */
                    }
                    return;
                }

                if (response.checker === 'INVALIDNAME') {
                    ui.showFieldMessage('txt_name', ui.t('invalid_name'), 'error');
                    return;
                }

                if (response.checker === 'INVALIDGENDER') {
                    ui.showFieldMessage('sel_gender', ui.t('invalid_gender'), 'error');
                    return;
                }

                if (response.checker === 'INVALIDEDUCATION') {
                    ui.showFieldMessage('sel_education', ui.t('invalid_education'), 'error');
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
                ui.renderUnauthorized(pageTitle(), pageDesc(), 'profile');
                return;
            }
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'profile');
        } catch (error) {
            ui.renderLoadFailed(pageTitle(), pageDesc(), 'profile');
            if (app && typeof app.handleRequestError === 'function') {
                app.handleRequestError(error);
            }
        }
    }

    boot();
};
