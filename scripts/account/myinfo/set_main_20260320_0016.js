window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages(window.StatKISSAccountMyinfoMessages || {});

    function renderLoading() {
        app.render(app.pageShell(
            app.t('myinfo_title'),
            app.t('myinfo_desc'),
            '<div class="statkiss-account-soft rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">' + app.t('loading') + '</div>',
            ''
        ));
    }

    function renderForm(userinfo) {
        const formHtml = [
            '<form id="account_myinfo_form" class="space-y-6">',
            '  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
            '      <div class="sm:col-span-2">' + app.textInput('txt_email_readonly', app.t('email'), { type: 'email', readonly: true, value: userinfo.email || '', description: app.t('readonly_email_desc') }) + '</div>',
            '      <div class="sm:col-span-2">' + app.textInput('txt_name', app.t('name'), { value: userinfo.name || '' }) + '</div>',
            '      <div>' + app.textInput('txt_affiliation', app.t('affiliation'), { value: userinfo.affiliation || '' }) + '</div>',
            '      <div>' + app.textInput('txt_title', app.t('title'), { value: userinfo.title || '' }) + '</div>',
            '      <div>' + app.selectInput('sel_gender', app.t('gender'), app.genderOptions(), userinfo.gender || '') + '</div>',
            '      <div>' + app.selectInput('sel_education', app.t('education'), app.educationOptions(), userinfo.education || '') + '</div>',
            '      <div class="sm:col-span-2">' + app.textareaInput('txt_interest', app.t('interest'), { placeholder: app.t('no_interest_placeholder') }) + '</div>',
            '  </div>',
            '  <div class="pt-2">' + app.primaryButton('btn_myinfo_save', app.t('save')) + '</div>',
            '</form>'
        ].join('');

        app.render(app.pageShell(app.t('myinfo_title'), app.t('myinfo_desc'), formHtml, ''));
        app.setValue('txt_interest', userinfo.interest || '');

        app.bindSubmit('account_myinfo_form', async function () {
            app.clearFieldErrors();
            app.setNotice('', 'info');

            const name = app.valueOf('txt_name');
            if (!name.trim()) {
                app.setFieldError('txt_name', app.t('invalid_name'));
                return;
            }

            const button = document.getElementById('btn_myinfo_save');
            try {
                app.setButtonLoading(button, app.t('saving'), true);
                const response = await app.requestJSON(app.api.updateUserinfo, app.createFormData({
                    txt_name: app.valueOf('txt_name'),
                    txt_affiliation: app.valueOf('txt_affiliation'),
                    txt_title: app.valueOf('txt_title'),
                    sel_gender: app.valueOf('sel_gender'),
                    sel_education: app.valueOf('sel_education'),
                    txt_interest: app.valueOf('txt_interest'),
                }));

                if (response.checker === 'SUCCESS') {
                    app.setNotice(app.t('save_success'), 'success');
                    return;
                }
                if (response.checker === 'UNAUTHORIZED') {
                    app.setNotice(app.t('unauthorized'), 'error');
                    setTimeout(function () { app.redirect(app.routes.login); }, 600);
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
            const response = await app.requestJSON(app.api.getUserinfo, app.createFormData({}));
            if (response.checker === 'SUCCESS') {
                renderForm(response);
                return;
            }
            if (response.checker === 'UNAUTHORIZED') {
                app.render(app.pageShell(
                    app.t('myinfo_title'),
                    app.t('myinfo_desc'),
                    '<div class="space-y-4"><div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + app.t('unauthorized') + '</div>' + app.outlineButtonLink(app.routes.login, app.t('go_login')) + '</div>',
                    ''
                ));
                return;
            }
            app.render(app.pageShell(app.t('myinfo_title'), app.t('myinfo_desc'), '<div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + app.t('load_failed') + '</div>', ''));
        } catch (error) {
            app.render(app.pageShell(app.t('myinfo_title'), app.t('myinfo_desc'), '<div class="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + app.t('load_failed') + '</div>', ''));
            app.handleRequestError(error);
        }
    }

    boot();

};
