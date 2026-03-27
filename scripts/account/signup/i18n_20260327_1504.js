(function () {
    'use strict';

    const messages = {
        en: {
            signup_title: 'Create your account',
            signup_desc: 'Join StatKISS with email or Google.',
            email: 'Email',
            password: 'Password',
            password_confirm: 'Confirm password',
            name: 'Name',
            affiliation: 'Affiliation',
            title: 'Title',
            gender: 'Gender',
            education: 'Education',
            interest: 'Research interests',
            student_member: 'Apply as a student member',
            student_member_desc: 'A student membership record will be created automatically after sign-up.',
            signup: 'Sign up',
            back_to_login: 'Already have an account?',
            login: 'Login',
            signing_up: 'Creating account...',
            signup_success: 'Your account has been created.',
            email_in_use: 'That email address is already in use.',
            generic_error: 'Something went wrong. Please try again.',
            no_interest_placeholder: 'Tell us your research interests',
            invalid_name: 'Enter your name.',
            email_help_empty: 'Enter your email address.',
            email_help_invalid: 'Use a valid email format.',
            email_help_valid: 'Email format looks good.',
            password_help_empty: 'Enter a password.',
            password_help_short: 'Password must be at least 8 characters.',
            password_help_valid: 'Password length looks good.',
            password_confirm_help_empty: 'Enter the password again.',
            password_confirm_help_mismatch: 'Passwords do not match.',
            password_confirm_help_valid: 'Passwords match.',
            signup_method_choice_title: 'Choose how to create your account',
            signup_method_choice_desc: 'Google sign-up will automatically connect to an existing StatKISS account when the verified Google email already exists in auth_user or the user mart view.',
            continue_with_google: 'Sign up with Google',
            email_signup_title: 'Sign up with email',
            email_signup_desc: 'Create a StatKISS account with your email address and password.',
            google_disabled: 'Google sign-in is not configured yet. Please contact the administrator.',
            google_access_denied: 'Google sign-in was cancelled.',
            google_auth_failed: 'Google sign-in failed. Please try again.',
            google_email_not_verified: 'Your Google account must have a verified email address to continue.',
            google_ambiguous_email: 'Multiple StatKISS accounts use this email. Please contact support.',
            google_already_linked: 'This StatKISS account is already linked to another Google account.',
            google_link_conflict: 'This Google account is already linked to another StatKISS account.'
        },
        ko: {
            signup_title: '회원가입',
            signup_desc: '이메일 또는 Google로 StatKISS에 가입합니다.',
            email: '이메일',
            password: '비밀번호',
            password_confirm: '비밀번호 확인',
            name: '이름',
            affiliation: '소속',
            title: '직함',
            gender: '성별',
            education: '학력',
            interest: '관심 연구 분야',
            student_member: '학생회원으로 신청',
            student_member_desc: '회원가입 후 학생회원 기록이 자동으로 생성됩니다.',
            signup: '회원가입',
            back_to_login: '이미 계정이 있나요?',
            login: '로그인',
            signing_up: '가입하는 중...',
            signup_success: '계정이 생성되었습니다.',
            email_in_use: '이미 사용 중인 이메일 주소입니다.',
            generic_error: '오류가 발생했습니다. 다시 시도해주세요.',
            no_interest_placeholder: '연구 관심 분야를 입력해주세요',
            invalid_name: '이름을 입력해주세요.',
            email_help_empty: '이메일 주소를 입력해주세요.',
            email_help_invalid: '올바른 이메일 형식으로 입력해주세요.',
            email_help_valid: '올바른 이메일 형식입니다.',
            password_help_empty: '비밀번호를 입력해주세요.',
            password_help_short: '비밀번호는 8자 이상이어야 합니다.',
            password_help_valid: '비밀번호 길이가 적절합니다.',
            password_confirm_help_empty: '비밀번호를 다시 입력해주세요.',
            password_confirm_help_mismatch: '비밀번호가 일치하지 않습니다.',
            password_confirm_help_valid: '비밀번호가 일치합니다.',
            signup_method_choice_title: '가입 방법 선택',
            signup_method_choice_desc: 'Google 가입 시 검증된 이메일이 기존 auth_user 또는 사용자 뷰와 같으면 기존 계정에 자동 연동됩니다.',
            continue_with_google: 'Google로 가입하기',
            email_signup_title: '이메일로 가입',
            email_signup_desc: '이메일 주소와 비밀번호로 StatKISS 계정을 생성합니다.',
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

    window.StatKISSAccountSignupMessages = messages;
    window.StatKISSAccountSignupI18N = {
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
