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
            '<form id="account_myinfo_profile_form" class="space-y-6">',
            ui.card(
                ui.t('myinfo_card_profile'),
                [
                    '<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
                    '  <div class="sm:col-span-2">' + app.textInput('txt_name', ui.t('name'), { value: userinfo.name || '' }) + '</div>',
                    '  <div>' + app.textInput('txt_affiliation', ui.t('affiliation'), { value: userinfo.affiliation || '' }) + '</div>',
                    '  <div>' + app.textInput('txt_title', ui.t('title'), { value: userinfo.title || '' }) + '</div>',
                    '  <div>' + app.selectInput('sel_gender', ui.t('gender'), app.genderOptions(), userinfo.gender || '') + '</div>',
                    '  <div>' + app.selectInput('sel_education', ui.t('education'), app.educationOptions(), userinfo.education || '') + '</div>',
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
        if (interestInput) {
            interestInput.value = userinfo.interest || '';
        }

        localizeDynamicOptions();

        app.bindSubmit('account_myinfo_profile_form', async function () {
            if (typeof app.clearFieldErrors === 'function') {
                app.clearFieldErrors();
            }
            if (typeof app.setNotice === 'function') {
                app.setNotice('', 'info');
            }

            const name = String(app.valueOf('txt_name') || '').trim();
            if (!name) {
                if (typeof app.setFieldError === 'function') {
                    app.setFieldError('txt_name', ui.t('invalid_name'));
                }
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
