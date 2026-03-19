window.set_main = function () {
    const app = window.StatKISSAccount;
    app.extendPageMessages({
  "en": {
    "welcome_title": "Account created",
    "welcome_desc": "Your account is ready."
  },
  "ko": {
    "welcome_title": "가입 완료",
    "welcome_desc": "계정이 준비되었습니다."
  },
  "ja": {
    "welcome_title": "登録完了",
    "welcome_desc": "アカウントの準備ができました。"
  },
  "zh-Hans": {
    "welcome_title": "账户已创建",
    "welcome_desc": "您的账户已准备就绪。"
  },
  "zh-Hant": {
    "welcome_title": "帳戶已建立",
    "welcome_desc": "您的帳戶已準備完成。"
  },
  "es": {
    "welcome_title": "Cuenta creada",
    "welcome_desc": "Tu cuenta está lista."
  },
  "fr": {
    "welcome_title": "Compte créé",
    "welcome_desc": "Votre compte est prêt."
  },
  "de": {
    "welcome_title": "Konto erstellt",
    "welcome_desc": "Ihr Konto ist bereit."
  },
  "pt-BR": {
    "welcome_title": "Conta criada",
    "welcome_desc": "Sua conta está pronta."
  },
  "ru": {
    "welcome_title": "Аккаунт создан",
    "welcome_desc": "Ваш аккаунт готов."
  },
  "id": {
    "welcome_title": "Akun dibuat",
    "welcome_desc": "Akun Anda sudah siap."
  },
  "vi": {
    "welcome_title": "Tài khoản đã được tạo",
    "welcome_desc": "Tài khoản của bạn đã sẵn sàng."
  },
  "th": {
    "welcome_title": "สร้างบัญชีแล้ว",
    "welcome_desc": "บัญชีของคุณพร้อมใช้งานแล้ว"
  },
  "ms": {
    "welcome_title": "Akaun berjaya dicipta",
    "welcome_desc": "Akaun anda sudah sedia."
  },
  "fil": {
    "welcome_title": "Nagawa na ang account",
    "welcome_desc": "Handa na ang iyong account."
  },
  "hi": {
    "welcome_title": "खाता बन गया",
    "welcome_desc": "आपका खाता तैयार है।"
  },
  "ar": {
    "welcome_title": "تم إنشاء الحساب",
    "welcome_desc": "حسابك جاهز الآن."
  },
  "it": {
    "welcome_title": "Account creato",
    "welcome_desc": "Il tuo account è pronto."
  },
  "nl": {
    "welcome_title": "Account aangemaakt",
    "welcome_desc": "Uw account is klaar."
  },
  "pl": {
    "welcome_title": "Konto utworzone",
    "welcome_desc": "Twoje konto jest gotowe."
  },
  "sv": {
    "welcome_title": "Konto skapat",
    "welcome_desc": "Ditt konto är klart."
  },
  "tr": {
    "welcome_title": "Hesap oluşturuldu",
    "welcome_desc": "Hesabınız hazır."
  },
  "uk": {
    "welcome_title": "Обліковий запис створено",
    "welcome_desc": "Ваш обліковий запис готовий."
  }
});

    const bodyHtml = [
        '<div class="space-y-5">',
        '  <div class="statkiss-account-soft rounded-3xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">',
        '      <p class="text-sm leading-7 text-emerald-800 dark:text-emerald-200">' + app.t('welcome_body') + '</p>',
        '  </div>',
        '  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">',
        '      <a href="' + app.routes.login + '" class="statkiss-account-solid-btn inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">' + app.t('go_login') + '</a>',
        '      ' + app.outlineButtonLink(app.routes.home, app.t('go_home')),
        '  </div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(app.t('welcome_title'), app.t('welcome_desc'), bodyHtml, ''));

};
