window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages({
  "en": {
    "myinfo_title": "My profile",
    "myinfo_desc": "Review and update your account details."
  },
  "ko": {
    "myinfo_title": "내 정보",
    "myinfo_desc": "계정 정보를 확인하고 수정합니다."
  },
  "ja": {
    "myinfo_title": "プロフィール",
    "myinfo_desc": "アカウント情報を確認・更新します。"
  },
  "zh-Hans": {
    "myinfo_title": "我的资料",
    "myinfo_desc": "查看并更新您的账户信息。"
  },
  "zh-Hant": {
    "myinfo_title": "我的資料",
    "myinfo_desc": "查看並更新您的帳戶資訊。"
  },
  "es": {
    "myinfo_title": "Mi perfil",
    "myinfo_desc": "Revisa y actualiza los datos de tu cuenta."
  },
  "fr": {
    "myinfo_title": "Mon profil",
    "myinfo_desc": "Consultez et mettez à jour les informations de votre compte."
  },
  "de": {
    "myinfo_title": "Mein Profil",
    "myinfo_desc": "Überprüfen und aktualisieren Sie Ihre Kontodaten."
  },
  "pt-BR": {
    "myinfo_title": "Meu perfil",
    "myinfo_desc": "Revise e atualize os dados da sua conta."
  },
  "ru": {
    "myinfo_title": "Мой профиль",
    "myinfo_desc": "Просмотрите и обновите данные аккаунта."
  },
  "id": {
    "myinfo_title": "Profil saya",
    "myinfo_desc": "Tinjau dan perbarui detail akun Anda."
  },
  "vi": {
    "myinfo_title": "Hồ sơ của tôi",
    "myinfo_desc": "Xem và cập nhật thông tin tài khoản của bạn."
  },
  "th": {
    "myinfo_title": "ข้อมูลของฉัน",
    "myinfo_desc": "ตรวจสอบและแก้ไขรายละเอียดบัญชีของคุณ"
  },
  "ms": {
    "myinfo_title": "Profil saya",
    "myinfo_desc": "Semak dan kemas kini butiran akaun anda."
  },
  "fil": {
    "myinfo_title": "Aking profile",
    "myinfo_desc": "Suriin at i-update ang detalye ng iyong account."
  },
  "hi": {
    "myinfo_title": "मेरा प्रोफ़ाइल",
    "myinfo_desc": "अपने खाते की जानकारी देखें और अपडेट करें।"
  },
  "ar": {
    "myinfo_title": "ملفي الشخصي",
    "myinfo_desc": "راجع وحدّث تفاصيل حسابك."
  },
  "it": {
    "myinfo_title": "Il mio profilo",
    "myinfo_desc": "Controlla e aggiorna i dati del tuo account."
  },
  "nl": {
    "myinfo_title": "Mijn profiel",
    "myinfo_desc": "Bekijk en werk uw accountgegevens bij."
  },
  "pl": {
    "myinfo_title": "Mój profil",
    "myinfo_desc": "Sprawdź i zaktualizuj dane swojego konta."
  },
  "sv": {
    "myinfo_title": "Min profil",
    "myinfo_desc": "Granska och uppdatera dina kontouppgifter."
  },
  "tr": {
    "myinfo_title": "Profilim",
    "myinfo_desc": "Hesap bilgilerinizi gözden geçirin ve güncelleyin."
  },
  "uk": {
    "myinfo_title": "Мій профіль",
    "myinfo_desc": "Перегляньте та оновіть дані свого облікового запису."
  }
});

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
