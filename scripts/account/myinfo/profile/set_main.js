window.set_main = function () {
    const app = window.StatKISSAccount;
    const ui = window.StatKISSAccountMyinfoCommon;

    app.extendPageMessages(window.StatKISSAccountMyinfoCommonMessages || {});
    app.extendPageMessages(window.StatKISSAccountMyinfoProfileMessages || {});

    function renderLoading() {
        app.render(ui.layout(app.t('myinfo_profile_title'), app.t('myinfo_profile_desc'), ui.loadingCard(), 'profile'));
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_profile_form" class="space-y-6">',
            ui.card(
                app.t('myinfo_card_profile'),
                [
                    '<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
                    '  <div class="sm:col-span-2">' + app.textInput('txt_name', app.t('name'), { value: userinfo.name || '' }) + '</div>',
                    '  <div>' + app.textInput('txt_affiliation', app.t('affiliation'), { value: userinfo.affiliation || '' }) + '</div>',
                    '  <div>' + app.textInput('txt_title', app.t('title'), { value: userinfo.title || '' }) + '</div>',
                    '  <div>' + app.selectInput('sel_gender', app.t('gender'), app.genderOptions(), userinfo.gender || '') + '</div>',
                    '  <div>' + app.selectInput('sel_education', app.t('education'), app.educationOptions(), userinfo.education || '') + '</div>',
                    '  <div class="sm:col-span-2">' + app.textareaInput('txt_interest', app.t('interest'), { placeholder: app.t('no_interest_placeholder') }) + '</div>',
                    '</div>',
                ].join('')
            ),
            '<div class="pt-2">' + app.primaryButton('btn_myinfo_profile_save', app.t('save')) + '</div>',
            '</form>',
        ].join('');

        app.render(ui.layout(app.t('myinfo_profile_title'), app.t('myinfo_profile_desc'), formHtml, 'profile'));

        const interestInput = document.getElementById('txt_interest');
        if (interestInput) {
            interestInput.value = userinfo.interest || '';
        }

        app.bindSubmit('account_myinfo_profile_form', async function () {
            app.clearFieldErrors();
            app.setNotice('', 'info');

            const name = String(app.valueOf('txt_name') || '').trim();
            if (!name) {
                app.setFieldError('txt_name', app.t('invalid_name'));
                return;
            }

            const button = document.getElementById('btn_myinfo_profile_save');
            try {
                app.setButtonLoading(button, app.t('saving'), true);
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
                    app.setNotice(app.t('save_success'), 'success');
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
                ui.renderUnauthorized(app.t('myinfo_profile_title'), app.t('myinfo_profile_desc'), 'profile');
                return;
            }
            ui.renderLoadFailed(app.t('myinfo_profile_title'), app.t('myinfo_profile_desc'), 'profile');
        } catch (error) {
            ui.renderLoadFailed(app.t('myinfo_profile_title'), app.t('myinfo_profile_desc'), 'profile');
            app.handleRequestError(error);
        }
    }

    boot();
};
