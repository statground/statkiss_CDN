window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages({
  "en": {
    "signup_title": "Sign up",
    "signup_desc": "Create your StatKISS account."
  },
  "ko": {
    "signup_title": "회원가입",
    "signup_desc": "StatKISS 계정을 만듭니다."
  },
  "ja": {
    "signup_title": "新規登録",
    "signup_desc": "StatKISS アカウントを作成します。"
  },
  "zh-Hans": {
    "signup_title": "注册",
    "signup_desc": "创建您的 StatKISS 账户。"
  },
  "zh-Hant": {
    "signup_title": "註冊",
    "signup_desc": "建立您的 StatKISS 帳戶。"
  },
  "es": {
    "signup_title": "Registrarse",
    "signup_desc": "Crea tu cuenta de StatKISS."
  },
  "fr": {
    "signup_title": "S’inscrire",
    "signup_desc": "Créez votre compte StatKISS."
  },
  "de": {
    "signup_title": "Registrieren",
    "signup_desc": "Erstellen Sie Ihr StatKISS-Konto."
  },
  "pt-BR": {
    "signup_title": "Cadastrar-se",
    "signup_desc": "Crie sua conta StatKISS."
  },
  "ru": {
    "signup_title": "Регистрация",
    "signup_desc": "Создайте свой аккаунт StatKISS."
  },
  "id": {
    "signup_title": "Daftar",
    "signup_desc": "Buat akun StatKISS Anda."
  },
  "vi": {
    "signup_title": "Đăng ký",
    "signup_desc": "Tạo tài khoản StatKISS của bạn."
  },
  "th": {
    "signup_title": "สมัครสมาชิก",
    "signup_desc": "สร้างบัญชี StatKISS ของคุณ"
  },
  "ms": {
    "signup_title": "Daftar",
    "signup_desc": "Cipta akaun StatKISS anda."
  },
  "fil": {
    "signup_title": "Mag-sign up",
    "signup_desc": "Gumawa ng iyong StatKISS account."
  },
  "hi": {
    "signup_title": "साइन अप",
    "signup_desc": "अपना StatKISS खाता बनाएँ।"
  },
  "ar": {
    "signup_title": "إنشاء حساب",
    "signup_desc": "أنشئ حسابك في StatKISS."
  },
  "it": {
    "signup_title": "Registrati",
    "signup_desc": "Crea il tuo account StatKISS."
  },
  "nl": {
    "signup_title": "Registreren",
    "signup_desc": "Maak uw StatKISS-account aan."
  },
  "pl": {
    "signup_title": "Rejestracja",
    "signup_desc": "Utwórz swoje konto StatKISS."
  },
  "sv": {
    "signup_title": "Registrera dig",
    "signup_desc": "Skapa ditt StatKISS-konto."
  },
  "tr": {
    "signup_title": "Kayıt ol",
    "signup_desc": "StatKISS hesabınızı oluşturun."
  },
  "uk": {
    "signup_title": "Реєстрація",
    "signup_desc": "Створіть свій обліковий запис StatKISS."
  }
});

    const formHtml = [
        '<form id="account_signup_form" class="space-y-6">',
        '  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">',
        '      <div class="sm:col-span-2">' + app.textInput('txt_email', app.t('email'), { type: 'email', autocomplete: 'email' }) + '</div>',
        '      <div>' + app.textInput('txt_password', app.t('password'), { type: 'password', autocomplete: 'new-password' }) + '</div>',
        '      <div>' + app.textInput('txt_password_confirm', app.t('password_confirm'), { type: 'password', autocomplete: 'new-password' }) + '</div>',
        '      <div class="sm:col-span-2">' + app.textInput('txt_name', app.t('name'), { autocomplete: 'name' }) + '</div>',
        '      <div>' + app.textInput('txt_affiliation', app.t('affiliation'), {}) + '</div>',
        '      <div>' + app.textInput('txt_title', app.t('title'), {}) + '</div>',
        '      <div>' + app.selectInput('sel_gender', app.t('gender'), app.genderOptions()) + '</div>',
        '      <div>' + app.selectInput('sel_education', app.t('education'), app.educationOptions()) + '</div>',
        '      <div class="sm:col-span-2">' + app.textareaInput('txt_interest', app.t('interest'), { placeholder: app.t('no_interest_placeholder') }) + '</div>',
        '      <div class="sm:col-span-2">' + app.checkboxInput('chk_student', app.t('student_member'), app.t('student_member_desc')) + '</div>',
        '  </div>',
        '  <div class="pt-2">' + app.primaryButton('btn_signup', app.t('signup')) + '</div>',
        '</form>'
    ].join('');

    const footerHtml = '<div class="text-sm statkiss-account-muted text-slate-500 dark:text-slate-400">' +
        app.t('back_to_login') + ': ' + app.secondaryLink(app.routes.login, app.t('login')) +
        '</div>';

    app.render(app.pageShell(app.t('signup_title'), app.t('signup_desc'), formHtml, footerHtml));

    app.bindSubmit('account_signup_form', async function () {
        app.clearFieldErrors();
        app.setNotice('', 'info');

        const email = app.valueOf('txt_email');
        const password = app.valueOf('txt_password');
        const passwordConfirm = app.valueOf('txt_password_confirm');
        const name = app.valueOf('txt_name');
        const button = document.getElementById('btn_signup');

        if (!app.validateEmail(email)) {
            app.setFieldError('txt_email', app.t('invalid_email'));
            return;
        }
        if (!app.validatePassword(password)) {
            app.setFieldError('txt_password', app.t('invalid_password'));
            return;
        }
        if (password !== passwordConfirm) {
            app.setFieldError('txt_password_confirm', app.t('password_mismatch'));
            return;
        }
        if (!name.trim()) {
            app.setFieldError('txt_name', app.t('invalid_name'));
            return;
        }

        try {
            app.setButtonLoading(button, app.t('signing_up'), true);
            const response = await app.requestJSON(app.api.signup, app.createFormData({
                txt_email: email,
                txt_password: password,
                txt_name: name,
                txt_affiliation: app.valueOf('txt_affiliation'),
                txt_title: app.valueOf('txt_title'),
                sel_gender: app.valueOf('sel_gender'),
                sel_education: app.valueOf('sel_education'),
                txt_interest: app.valueOf('txt_interest'),
                chk_student: app.isChecked('chk_student') ? 'true' : '',
            }));

            if (response.checker === 'SUCCESS') {
                app.setNotice(app.t('signup_success'), 'success');
                app.redirect(app.routes.welcome);
                return;
            }
            if (response.checker === 'EXIST') {
                app.setFieldError('txt_email', app.t('email_in_use'));
                return;
            }
            app.setNotice(response.checker || app.t('generic_error'), 'error');
        } catch (error) {
            app.handleRequestError(error);
        } finally {
            app.setButtonLoading(button, app.t('signing_up'), false);
        }
    });

};
