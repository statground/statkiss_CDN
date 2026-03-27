(function () {
    'use strict';

    const messages = {
        en: {
            login_title: 'Login',
            login_desc: 'Sign in to your StatKISS account with email or Google.',
            support_contact: 'If you have trouble signing in, contact',
            email: 'Email',
            password: 'Password',
            login: 'Login',
            recover_password: 'Recover Password',
            go_signup: 'Create an Account',
            signing_in: 'Signing in...',
            login_success: 'Signed in successfully.',
            wrong_password: 'Incorrect password.',
            not_exist: 'No account found with that email address.',
            generic_error: 'Something went wrong. Please try again.',
            email_help_empty: 'Enter your email address.',
            email_help_invalid: 'Use a valid email format.',
            email_help_valid: 'Email format looks good.',
            password_help_empty: 'Enter your password.',
            password_help_short: 'Password must be at least 8 characters.',
            password_help_valid: 'Password length looks good.',
            login_method_choice_title: 'Choose how to sign in',
            login_method_choice_desc: 'Use the method that already owns your StatKISS account. Google will automatically connect to an existing account when the verified email already exists.',
            continue_with_google: 'Continue with Google',
            email_login_title: 'Sign in with email',
            email_login_desc: 'Use the email address and password you already registered with StatKISS.',
            google_disabled: 'Google sign-in is not configured yet. Please contact the administrator.',
            google_access_denied: 'Google sign-in was cancelled.',
            google_auth_failed: 'Google sign-in failed. Please try again.',
            google_email_not_verified: 'Your Google account must have a verified email address to continue.',
            google_ambiguous_email: 'Multiple StatKISS accounts use this email. Please contact support.',
            google_already_linked: 'This StatKISS account is already linked to another Google account.',
            google_link_conflict: 'This Google account is already linked to another StatKISS account.'
        },
        ko: {
            login_title: '로그인',
            login_desc: '이메일 또는 Google로 StatKISS 계정에 로그인합니다.',
            support_contact: '로그인에 문제가 있으면',
            email: '이메일',
            password: '비밀번호',
            login: '로그인',
            recover_password: '비밀번호 찾기',
            go_signup: '회원가입',
            signing_in: '로그인하는 중...',
            login_success: '로그인되었습니다.',
            wrong_password: '비밀번호가 올바르지 않습니다.',
            not_exist: '해당 이메일 주소로 등록된 계정을 찾을 수 없습니다.',
            generic_error: '오류가 발생했습니다. 다시 시도해주세요.',
            email_help_empty: '이메일 주소를 입력해주세요.',
            email_help_invalid: '올바른 이메일 형식으로 입력해주세요.',
            email_help_valid: '올바른 이메일 형식입니다.',
            password_help_empty: '비밀번호를 입력해주세요.',
            password_help_short: '비밀번호는 8자 이상이어야 합니다.',
            password_help_valid: '비밀번호 길이가 적절합니다.',
            login_method_choice_title: '로그인 방법 선택',
            login_method_choice_desc: '이미 StatKISS 계정을 가지고 있는 방법으로 로그인하세요. 검증된 이메일이 기존 계정과 같으면 Google 로그인 시 자동 연동됩니다.',
            continue_with_google: 'Google로 계속하기',
            email_login_title: '이메일로 로그인',
            email_login_desc: '기존에 StatKISS에 가입한 이메일과 비밀번호로 로그인합니다.',
            google_disabled: 'Google 로그인이 아직 설정되지 않았습니다. 관리자에게 문의해주세요.',
            google_access_denied: 'Google 로그인이 취소되었습니다.',
            google_auth_failed: 'Google 로그인에 실패했습니다. 다시 시도해주세요.',
            google_email_not_verified: '계속하려면 Google 계정의 이메일이 검증되어 있어야 합니다.',
            google_ambiguous_email: '같은 이메일을 사용하는 StatKISS 계정이 여러 개입니다. 관리자에게 문의해주세요.',
            google_already_linked: '이 StatKISS 계정에는 이미 다른 Google 계정이 연동되어 있습니다.',
            google_link_conflict: '이 Google 계정은 이미 다른 StatKISS 계정과 연동되어 있습니다.'
        }
    };

    function resolveLangCode(code) {
        const raw = String(code || '').trim().toLowerCase();
        if (!raw) return 'en';
        if (raw.startsWith('ko')) return 'ko';
        return 'en';
    }

    window.StatKISSAccountAccountMessages = messages;
    window.StatKISSAccountAccountI18N = {
        getCurrentLang: function () {
            const app = window.StatKISSAccount;
            return resolveLangCode((app && app.lang) || (window.STATKISS_ACCOUNT_BOOTSTRAP || {}).lang || document.documentElement.lang || navigator.language || 'en');
        },
        t: function (key, lang) {
            const resolved = resolveLangCode(lang || this.getCurrentLang());
            return (messages[resolved] && messages[resolved][key]) || messages.en[key] || key;
        },
        resolveLangCode: resolveLangCode,
        getSupportedLangs: function () {
            return ['en', 'ko'];
        }
    };
})();
