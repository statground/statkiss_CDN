window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages({
  "en": {
    "forgot_title": "Reset password",
    "forgot_desc": "We will send a verification link to your email.",
    "reset_title": "Set a new password",
    "reset_desc": "Enter a new password after verifying the link."
  },
  "ko": {
    "forgot_title": "비밀번호 재설정",
    "forgot_desc": "이메일로 인증 링크를 보냅니다.",
    "reset_title": "새 비밀번호 설정",
    "reset_desc": "링크 확인 후 새 비밀번호를 입력해 주세요."
  },
  "ja": {
    "forgot_title": "パスワード再設定",
    "forgot_desc": "メールに認証リンクを送信します。",
    "reset_title": "新しいパスワードを設定",
    "reset_desc": "リンク確認後、新しいパスワードを入力してください。"
  },
  "zh-Hans": {
    "forgot_title": "重置密码",
    "forgot_desc": "我们会将验证链接发送到您的邮箱。",
    "reset_title": "设置新密码",
    "reset_desc": "验证链接后请输入新密码。"
  },
  "zh-Hant": {
    "forgot_title": "重設密碼",
    "forgot_desc": "我們會將驗證連結寄到您的電子郵件。",
    "reset_title": "設定新密碼",
    "reset_desc": "驗證連結後請輸入新密碼。"
  },
  "es": {
    "forgot_title": "Restablecer contraseña",
    "forgot_desc": "Enviaremos un enlace de verificación a tu correo.",
    "reset_title": "Establecer nueva contraseña",
    "reset_desc": "Introduce una nueva contraseña después de verificar el enlace."
  },
  "fr": {
    "forgot_title": "Réinitialiser le mot de passe",
    "forgot_desc": "Nous enverrons un lien de vérification à votre e-mail.",
    "reset_title": "Définir un nouveau mot de passe",
    "reset_desc": "Saisissez un nouveau mot de passe après avoir vérifié le lien."
  },
  "de": {
    "forgot_title": "Passwort zurücksetzen",
    "forgot_desc": "Wir senden einen Bestätigungslink an Ihre E-Mail.",
    "reset_title": "Neues Passwort festlegen",
    "reset_desc": "Geben Sie nach der Bestätigung des Links ein neues Passwort ein."
  },
  "pt-BR": {
    "forgot_title": "Redefinir senha",
    "forgot_desc": "Enviaremos um link de verificação para o seu e-mail.",
    "reset_title": "Definir nova senha",
    "reset_desc": "Digite uma nova senha após verificar o link."
  },
  "ru": {
    "forgot_title": "Сброс пароля",
    "forgot_desc": "Мы отправим ссылку подтверждения на вашу почту.",
    "reset_title": "Установить новый пароль",
    "reset_desc": "Введите новый пароль после подтверждения ссылки."
  },
  "id": {
    "forgot_title": "Atur ulang kata sandi",
    "forgot_desc": "Kami akan mengirim tautan verifikasi ke email Anda.",
    "reset_title": "Tetapkan kata sandi baru",
    "reset_desc": "Masukkan kata sandi baru setelah memverifikasi tautan."
  },
  "vi": {
    "forgot_title": "Đặt lại mật khẩu",
    "forgot_desc": "Chúng tôi sẽ gửi liên kết xác minh đến email của bạn.",
    "reset_title": "Đặt mật khẩu mới",
    "reset_desc": "Nhập mật khẩu mới sau khi xác minh liên kết."
  },
  "th": {
    "forgot_title": "รีเซ็ตรหัสผ่าน",
    "forgot_desc": "เราจะส่งลิงก์ยืนยันไปยังอีเมลของคุณ",
    "reset_title": "ตั้งรหัสผ่านใหม่",
    "reset_desc": "กรอกรหัสผ่านใหม่หลังจากยืนยันลิงก์แล้ว"
  },
  "ms": {
    "forgot_title": "Tetapkan semula kata laluan",
    "forgot_desc": "Kami akan menghantar pautan pengesahan ke e-mel anda.",
    "reset_title": "Tetapkan kata laluan baharu",
    "reset_desc": "Masukkan kata laluan baharu selepas mengesahkan pautan."
  },
  "fil": {
    "forgot_title": "I-reset ang password",
    "forgot_desc": "Magpapadala kami ng verification link sa iyong email.",
    "reset_title": "Magtakda ng bagong password",
    "reset_desc": "Maglagay ng bagong password pagkatapos ma-verify ang link."
  },
  "hi": {
    "forgot_title": "पासवर्ड रीसेट करें",
    "forgot_desc": "हम आपके ईमेल पर सत्यापन लिंक भेजेंगे।",
    "reset_title": "नया पासवर्ड सेट करें",
    "reset_desc": "लिंक सत्यापित करने के बाद नया पासवर्ड दर्ज करें।"
  },
  "ar": {
    "forgot_title": "إعادة تعيين كلمة المرور",
    "forgot_desc": "سنرسل رابط تحقق إلى بريدك الإلكتروني.",
    "reset_title": "تعيين كلمة مرور جديدة",
    "reset_desc": "أدخل كلمة مرور جديدة بعد التحقق من الرابط."
  },
  "it": {
    "forgot_title": "Reimposta password",
    "forgot_desc": "Invieremo un link di verifica alla tua email.",
    "reset_title": "Imposta una nuova password",
    "reset_desc": "Inserisci una nuova password dopo aver verificato il link."
  },
  "nl": {
    "forgot_title": "Wachtwoord resetten",
    "forgot_desc": "We sturen een verificatielink naar uw e-mail.",
    "reset_title": "Nieuw wachtwoord instellen",
    "reset_desc": "Voer een nieuw wachtwoord in nadat de link is gecontroleerd."
  },
  "pl": {
    "forgot_title": "Zresetuj hasło",
    "forgot_desc": "Wyślemy link weryfikacyjny na Twój e-mail.",
    "reset_title": "Ustaw nowe hasło",
    "reset_desc": "Wprowadź nowe hasło po zweryfikowaniu linku."
  },
  "sv": {
    "forgot_title": "Återställ lösenord",
    "forgot_desc": "Vi skickar en verifieringslänk till din e-post.",
    "reset_title": "Ange ett nytt lösenord",
    "reset_desc": "Ange ett nytt lösenord efter att länken har verifierats."
  },
  "tr": {
    "forgot_title": "Şifre sıfırla",
    "forgot_desc": "E-posta adresinize bir doğrulama bağlantısı göndereceğiz.",
    "reset_title": "Yeni şifre belirle",
    "reset_desc": "Bağlantıyı doğruladıktan sonra yeni şifrenizi girin."
  },
  "uk": {
    "forgot_title": "Скинути пароль",
    "forgot_desc": "Ми надішлемо посилання для підтвердження на вашу пошту.",
    "reset_title": "Встановити новий пароль",
    "reset_desc": "Введіть новий пароль після підтвердження посилання."
  }
});

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
