window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages({
  "en": {
    "login_title": "Login",
    "login_desc": "Sign in to your StatKISS account.",
    "support_contact": "If you have trouble signing in, contact"
  },
  "ko": {
    "login_title": "로그인",
    "login_desc": "StatKISS 계정으로 로그인합니다.",
    "support_contact": "로그인에 문제가 있으면"
  },
  "ja": {
    "login_title": "ログイン",
    "login_desc": "StatKISS アカウントにログインします。",
    "support_contact": "ログインに問題がある場合は"
  },
  "zh-Hans": {
    "login_title": "登录",
    "login_desc": "登录您的 StatKISS 账户。",
    "support_contact": "如果登录遇到问题，请联系"
  },
  "zh-Hant": {
    "login_title": "登入",
    "login_desc": "登入您的 StatKISS 帳戶。",
    "support_contact": "如果登入遇到問題，請聯絡"
  },
  "es": {
    "login_title": "Iniciar sesión",
    "login_desc": "Inicia sesión en tu cuenta de StatKISS.",
    "support_contact": "Si tienes problemas para iniciar sesión, escribe a"
  },
  "fr": {
    "login_title": "Connexion",
    "login_desc": "Connectez-vous à votre compte StatKISS.",
    "support_contact": "Si vous avez des difficultés à vous connecter, contactez"
  },
  "de": {
    "login_title": "Anmelden",
    "login_desc": "Melden Sie sich bei Ihrem StatKISS-Konto an.",
    "support_contact": "Wenn Sie Probleme bei der Anmeldung haben, kontaktieren Sie"
  },
  "pt-BR": {
    "login_title": "Entrar",
    "login_desc": "Entre na sua conta StatKISS.",
    "support_contact": "Se tiver problemas para entrar, entre em contato com"
  },
  "ru": {
    "login_title": "Вход",
    "login_desc": "Войдите в свой аккаунт StatKISS.",
    "support_contact": "Если у вас возникли проблемы со входом, напишите на"
  },
  "id": {
    "login_title": "Masuk",
    "login_desc": "Masuk ke akun StatKISS Anda.",
    "support_contact": "Jika Anda mengalami masalah saat masuk, hubungi"
  },
  "vi": {
    "login_title": "Đăng nhập",
    "login_desc": "Đăng nhập vào tài khoản StatKISS của bạn.",
    "support_contact": "Nếu bạn gặp sự cố khi đăng nhập, hãy liên hệ"
  },
  "th": {
    "login_title": "เข้าสู่ระบบ",
    "login_desc": "เข้าสู่ระบบด้วยบัญชี StatKISS ของคุณ",
    "support_contact": "หากคุณมีปัญหาในการเข้าสู่ระบบ โปรดติดต่อ"
  },
  "ms": {
    "login_title": "Log masuk",
    "login_desc": "Log masuk ke akaun StatKISS anda.",
    "support_contact": "Jika anda menghadapi masalah untuk log masuk, hubungi"
  },
  "fil": {
    "login_title": "Mag-login",
    "login_desc": "Mag-login sa iyong StatKISS account.",
    "support_contact": "Kung may problema ka sa pag-login, makipag-ugnayan sa"
  },
  "hi": {
    "login_title": "लॉगिन",
    "login_desc": "अपने StatKISS खाते में लॉगिन करें।",
    "support_contact": "यदि लॉगिन में समस्या हो, तो संपर्क करें"
  },
  "ar": {
    "login_title": "تسجيل الدخول",
    "login_desc": "سجّل الدخول إلى حساب StatKISS الخاص بك.",
    "support_contact": "إذا واجهتك مشكلة في تسجيل الدخول، تواصل مع"
  },
  "it": {
    "login_title": "Accedi",
    "login_desc": "Accedi al tuo account StatKISS.",
    "support_contact": "Se hai problemi di accesso, contatta"
  },
  "nl": {
    "login_title": "Inloggen",
    "login_desc": "Log in op uw StatKISS-account.",
    "support_contact": "Neem contact op met"
  },
  "pl": {
    "login_title": "Logowanie",
    "login_desc": "Zaloguj się do swojego konta StatKISS.",
    "support_contact": "Jeśli masz problemy z logowaniem, skontaktuj się z"
  },
  "sv": {
    "login_title": "Logga in",
    "login_desc": "Logga in på ditt StatKISS-konto.",
    "support_contact": "Om du har problem med att logga in, kontakta"
  },
  "tr": {
    "login_title": "Giriş yap",
    "login_desc": "StatKISS hesabınıza giriş yapın.",
    "support_contact": "Giriş yapmakta sorun yaşarsanız"
  },
  "uk": {
    "login_title": "Увійти",
    "login_desc": "Увійдіть до свого облікового запису StatKISS.",
    "support_contact": "Якщо у вас виникли проблеми зі входом, зверніться на"
  }
});

    const nextUrl = app.queryParam('next');

    const bodyHtml = [
        '<form id="account_login_form" class="space-y-5">',
        '  <div class="grid grid-cols-1 gap-5">',
        '      <div>' + app.textInput('txt_email', app.t('email'), { type: 'email', autocomplete: 'email' }) + '</div>',
        '      <div>' + app.textInput('txt_password', app.t('password'), { type: 'password', autocomplete: 'current-password' }) + '</div>',
        '  </div>',
        '  <div class="pt-2">' + app.primaryButton('btn_login', app.t('login')) + '</div>',
        '</form>'
    ].join('');

    const footerHtml = [
        '<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">',
        '   <div class="flex flex-wrap items-center gap-x-4 gap-y-2">',
        '       ' + app.secondaryLink(app.routes.changePassword, app.t('recover_password')),
        '       <span class="text-slate-300 dark:text-slate-700">|</span>',
        '       ' + app.secondaryLink(app.routes.signup, app.t('go_signup')),
        '   </div>',
        '   <div class="statkiss-account-muted text-xs leading-6 text-slate-500 dark:text-slate-400 sm:max-w-xs sm:text-right">' + app.escapeHtml(app.t('support_contact')) + ' <a class="statkiss-account-link font-medium text-sky-700 dark:text-sky-300" href="mailto:' + app.escapeHtml(app.supportEmail) + '">' + app.escapeHtml(app.supportEmail) + '</a></div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(app.t('login_title'), app.t('login_desc'), bodyHtml, footerHtml));

    app.bindSubmit('account_login_form', async function () {
        app.clearFieldErrors();
        app.setNotice('', 'info');

        const email = app.valueOf('txt_email');
        const password = app.valueOf('txt_password');
        const button = document.getElementById('btn_login');

        if (!app.validateEmail(email)) {
            app.setFieldError('txt_email', app.t('invalid_email'));
            return;
        }
        if (!password) {
            app.setFieldError('txt_password', app.t('password_required'));
            return;
        }

        try {
            app.setButtonLoading(button, app.t('signing_in'), true);
            const response = await app.requestJSON(
                app.api.signin,
                app.createFormData({ txt_email: email, txt_password: password })
            );

            if (response.checker === 'SUCCESS') {
                app.setNotice(app.t('login_success'), 'success');
                app.redirect(nextUrl || app.routes.home);
                return;
            }
            if (response.checker === 'WRONGPASSWORD') {
                app.setFieldError('txt_password', app.t('wrong_password'));
                return;
            }
            if (response.checker === 'NOTEXIST') {
                app.setFieldError('txt_email', app.t('not_exist'));
                return;
            }
            app.setNotice(response.checker || app.t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, app.t('signing_in'), false);
        }
    });

};
