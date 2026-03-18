(function () {
    const bootstrap = window.STATKISS_ACCOUNT_BOOTSTRAP || {};

    function normalizeText(value) {
        return typeof value === 'string' ? value.trim() : '';
    }

    function getLanguage() {
        const candidates = [
            bootstrap.lang,
            safeLocalStorageGet('statkiss.lang'),
            safeLocalStorageGet('lang'),
            document.documentElement.getAttribute('lang'),
            navigator.language,
        ];
        for (const raw of candidates) {
            const value = normalizeText(raw).toLowerCase();
            if (!value) continue;
            if (value.startsWith('ko')) return 'ko';
            if (value.startsWith('en')) return 'en';
        }
        return 'ko';
    }

    function safeLocalStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return '';
        }
    }

    const I18N = {
        ko: {
            login_title: '로그인',
            login_desc: 'StatKISS 계정으로 로그인합니다.',
            signup_title: '회원가입',
            signup_desc: '기본 계정을 만들고 바로 로그인합니다.',
            welcome_title: '가입이 완료되었습니다',
            welcome_desc: '이제 StatKISS 서비스를 이용할 수 있습니다.',
            myinfo_title: '내 정보',
            myinfo_desc: 'AliSQL의 회원 기본 정보를 확인하고 수정합니다.',
            forgot_title: '비밀번호 재설정',
            forgot_desc: '가입한 이메일로 재설정 링크를 보냅니다.',
            reset_title: '새 비밀번호 설정',
            reset_desc: '인증 링크 확인 후 새 비밀번호를 설정합니다.',
            email: '이메일',
            password: '비밀번호',
            password_confirm: '비밀번호 확인',
            name: '이름',
            affiliation: '소속',
            title: '직함',
            gender: '성별',
            education: '학력',
            interest: '관심 분야',
            role: '회원 등급',
            date_joined: '가입일',
            officer: '현직 임원',
            student_member: '학생 회원으로 가입',
            student_member_desc: '체크하면 학생회원 membership 로그를 함께 기록합니다.',
            send_link: '재설정 링크 보내기',
            change_password: '비밀번호 변경',
            save: '저장',
            signup: '회원가입',
            login: '로그인',
            logout: '로그아웃',
            go_home: '메인으로',
            go_login: '로그인으로',
            go_signup: '회원가입으로',
            recover_password: '비밀번호 찾기',
            back_to_login: '로그인으로 돌아가기',
            email_sent: '재설정 링크를 이메일로 보냈습니다. 메일함을 확인해 주세요.',
            email_not_found: '등록된 계정을 찾지 못했습니다.',
            email_in_use: '이미 사용 중인 이메일입니다.',
            invalid_email: '올바른 이메일 형식이 아닙니다.',
            invalid_password: '비밀번호는 8자 이상으로 입력해 주세요.',
            password_required: '비밀번호를 입력해 주세요.',
            password_mismatch: '비밀번호 확인이 일치하지 않습니다.',
            invalid_name: '이름을 입력해 주세요.',
            invalid_auth_code: '인증 링크가 잘못되었거나 만료되었습니다.',
            load_failed: '데이터를 불러오지 못했습니다.',
            save_success: '저장했습니다.',
            signup_success: '가입이 완료되었습니다.',
            login_success: '로그인되었습니다.',
            wrong_password: '비밀번호가 올바르지 않습니다.',
            not_exist: '등록된 계정을 찾지 못했습니다.',
            unauthorized: '로그인이 필요합니다.',
            generic_error: '처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
            endpoint_error: 'AJAX 응답이 올바른 JSON이 아닙니다. URL 연결을 확인해 주세요.',
            no_interest_placeholder: '예: 통계교육, 베이지안, 생존분석, 인과추론',
            select_placeholder: '선택하세요',
            gender_male: 'Male',
            gender_female: 'Female',
            gender_other: 'Other',
            gender_noanswer: 'Prefer not to say',
            edu_bachelor: 'Bachelor',
            edu_master: 'Master',
            edu_doctor: 'Doctor',
            edu_other: 'Other',
            loading: '불러오는 중...',
            sending: '전송 중...',
            saving: '저장 중...',
            changing: '변경 중...',
            signing_in: '로그인 중...',
            signing_up: '가입 중...',
            welcome_body: '회원가입 직후에는 일부 membership 정보가 반영되기까지 약간의 시간이 걸릴 수 있습니다.',
            readonly_email_desc: '이메일 변경은 현재 프론트에서 제공하지 않습니다.',
            change_password_success: '비밀번호가 변경되었습니다. 다시 로그인해 주세요.',
            retry: '다시 시도',
            cleanup_note: '불필요한 genre, role/instrument 같은 레거시 항목은 제거되었습니다.',
            auth_note: 'AliSQL 계정 인증',
            profile_note: '새 AliSQL 백엔드가 지원하는 필드만 노출합니다.',
        },
        en: {
            login_title: 'Login',
            login_desc: 'Sign in with your StatKISS account.',
            signup_title: 'Sign up',
            signup_desc: 'Create a basic account and sign in immediately.',
            welcome_title: 'Your account has been created',
            welcome_desc: 'You can now use StatKISS services.',
            myinfo_title: 'My profile',
            myinfo_desc: 'Review and update the member profile stored in AliSQL.',
            forgot_title: 'Reset password',
            forgot_desc: 'We will send a reset link to your registered email.',
            reset_title: 'Set a new password',
            reset_desc: 'After validating the email link, set a new password.',
            email: 'Email',
            password: 'Password',
            password_confirm: 'Confirm password',
            name: 'Name',
            affiliation: 'Affiliation',
            title: 'Title',
            gender: 'Gender',
            education: 'Education',
            interest: 'Research interests',
            role: 'Membership',
            date_joined: 'Joined',
            officer: 'Current officer',
            student_member: 'Join as student member',
            student_member_desc: 'When checked, a student membership log is created together.',
            send_link: 'Send reset link',
            change_password: 'Change password',
            save: 'Save',
            signup: 'Sign up',
            login: 'Login',
            logout: 'Logout',
            go_home: 'Home',
            go_login: 'Go to login',
            go_signup: 'Go to sign up',
            recover_password: 'Recover password',
            back_to_login: 'Back to login',
            email_sent: 'A reset link has been sent. Please check your inbox.',
            email_not_found: 'No matching account was found.',
            email_in_use: 'This email address is already in use.',
            invalid_email: 'Please enter a valid email address.',
            invalid_password: 'Password must be at least 8 characters.',
            password_required: 'Please enter your password.',
            password_mismatch: 'Password confirmation does not match.',
            invalid_name: 'Please enter your name.',
            invalid_auth_code: 'The reset link is invalid or expired.',
            load_failed: 'Failed to load data.',
            save_success: 'Saved successfully.',
            signup_success: 'Sign-up completed successfully.',
            login_success: 'Signed in successfully.',
            wrong_password: 'The password is incorrect.',
            not_exist: 'No matching account was found.',
            unauthorized: 'Please sign in first.',
            generic_error: 'Something went wrong. Please try again later.',
            endpoint_error: 'The AJAX response was not valid JSON. Please check the URL mapping.',
            no_interest_placeholder: 'e.g. statistics education, Bayesian methods, survival analysis',
            select_placeholder: 'Select an option',
            gender_male: 'Male',
            gender_female: 'Female',
            gender_other: 'Other',
            gender_noanswer: 'Prefer not to say',
            edu_bachelor: 'Bachelor',
            edu_master: 'Master',
            edu_doctor: 'Doctor',
            edu_other: 'Other',
            loading: 'Loading...',
            sending: 'Sending...',
            saving: 'Saving...',
            changing: 'Changing...',
            signing_in: 'Signing in...',
            signing_up: 'Signing up...',
            welcome_body: 'Some membership data may take a short time to appear after sign-up.',
            readonly_email_desc: 'Email change is not currently provided on this screen.',
            change_password_success: 'Your password was changed. Please sign in again.',
            retry: 'Try again',
            cleanup_note: 'Legacy fields such as genre or role/instrument have been removed.',
            auth_note: 'AliSQL account authentication',
            profile_note: 'Only fields supported by the new AliSQL backend are exposed here.',
        }
    };

    const lang = getLanguage();
    const pageKey = normalizeText(bootstrap.url);
    const pageMode = normalizeText(bootstrap.mode);
    const pageMsg = normalizeText(bootstrap.msg);

    function t(key) {
        return (I18N[lang] && I18N[lang][key]) || I18N.ko[key] || key;
    }

    function ensureTrailingSlash(pathname) {
        if (!pathname) return '/';
        return pathname.endsWith('/') ? pathname : pathname + '/';
    }

    function inferBasePath() {
        const pathname = ensureTrailingSlash(window.location.pathname);
        const suffixes = [];
        if (pageKey === 'change_password' && pageMode === 'auth') {
            suffixes.push('change_password/auth/');
        }
        if (pageKey) {
            suffixes.push(pageKey + '/');
        }
        for (const suffix of suffixes) {
            if (pathname.endsWith(suffix)) {
                return pathname.slice(0, pathname.length - suffix.length) || '/';
            }
        }
        return pathname;
    }

    const basePath = ensureTrailingSlash(inferBasePath());

    function pathFromBase(relativePath) {
        return new URL(relativePath, window.location.origin + basePath).pathname;
    }

    const routes = {
        login: basePath,
        signup: pathFromBase('signup/'),
        welcome: pathFromBase('welcome/'),
        myinfo: pathFromBase('myinfo/'),
        changePassword: pathFromBase('change_password/'),
        changePasswordAuth: pathFromBase('change_password/auth/'),
        home: '/',
    };

    const api = {
        signin: pathFromBase('ajax_signin_email/'),
        signup: pathFromBase('ajax_signup/'),
        getUserinfo: pathFromBase('ajax_get_userinfo/'),
        updateUserinfo: pathFromBase('ajax_update_userinfo/'),
        sendAuthEmail: pathFromBase('ajax_send_auth_email/'),
        checkAuthCode: pathFromBase('ajax_check_auth_code/'),
        passwordChange: pathFromBase('ajax_password_change/'),
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getMainElement() {
        return document.getElementById('div_main');
    }

    function getCsrfToken() {
        const cookie = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
    }

    function createFormData(values) {
        const formData = new FormData();
        Object.entries(values || {}).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            formData.append(key, value);
        });
        return formData;
    }

    async function requestJSON(url, formData) {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCsrfToken(),
            },
            body: formData,
        });

        const rawText = await response.text();
        let data = null;
        try {
            data = rawText ? JSON.parse(rawText) : {};
        } catch (error) {
            const endpointError = new Error('NON_JSON_RESPONSE');
            endpointError.status = response.status;
            endpointError.rawText = rawText;
            endpointError.url = url;
            throw endpointError;
        }

        if (!response.ok) {
            const httpError = new Error('HTTP_' + response.status);
            httpError.status = response.status;
            httpError.data = data;
            httpError.url = url;
            throw httpError;
        }
        return data;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeText(email));
    }

    function validatePassword(password) {
        return String(password || '').length >= 8;
    }

    function queryParam(name) {
        return new URLSearchParams(window.location.search).get(name) || '';
    }

    function isChecked(id) {
        const node = document.getElementById(id);
        return !!(node && node.checked);
    }

    function valueOf(id) {
        const node = document.getElementById(id);
        return node ? node.value : '';
    }

    function setValue(id, value) {
        const node = document.getElementById(id);
        if (node) node.value = value == null ? '' : value;
    }

    function setChecked(id, checked) {
        const node = document.getElementById(id);
        if (node) node.checked = !!checked;
    }

    function setText(id, value) {
        const node = document.getElementById(id);
        if (node) node.textContent = value == null ? '' : String(value);
    }

    function setNotice(message, kind) {
        const node = document.getElementById('account_notice');
        if (!node) return;
        if (!message) {
            node.className = 'hidden';
            node.textContent = '';
            return;
        }

        const colorByKind = {
            error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200',
            success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200',
            info: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-200',
        };

        node.className = 'w-full rounded-2xl border px-4 py-3 text-sm ' + (colorByKind[kind] || colorByKind.info);
        node.textContent = message;
    }

    function clearFieldErrors() {
        document.querySelectorAll('[data-field-error]').forEach((node) => {
            node.textContent = '';
            node.classList.add('hidden');
        });
    }

    function setFieldError(fieldName, message) {
        const node = document.querySelector('[data-field-error="' + fieldName + '"]');
        if (!node) {
            setNotice(message, 'error');
            return;
        }
        node.textContent = message;
        node.classList.remove('hidden');
    }

    function fieldError(fieldName) {
        return '<p data-field-error="' + escapeHtml(fieldName) + '" class="hidden mt-2 text-xs text-red-600 dark:text-red-300"></p>';
    }

    function textInput(id, label, options) {
        const settings = options || {};
        const type = settings.type || 'text';
        const readonly = settings.readonly ? 'readonly' : '';
        const autocomplete = settings.autocomplete ? 'autocomplete="' + escapeHtml(settings.autocomplete) + '"' : '';
        const placeholder = settings.placeholder ? 'placeholder="' + escapeHtml(settings.placeholder) + '"' : '';
        const value = settings.value ? 'value="' + escapeHtml(settings.value) + '"' : '';
        return [
            '<label for="' + escapeHtml(id) + '" class="block text-sm font-medium text-slate-700 dark:text-slate-200">' + escapeHtml(label) + '</label>',
            '<input id="' + escapeHtml(id) + '" type="' + escapeHtml(type) + '" ' + readonly + ' ' + autocomplete + ' ' + placeholder + ' ' + value + ' class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/60 ' + (settings.extraClass || '') + '">',
            settings.description ? '<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">' + escapeHtml(settings.description) + '</p>' : '',
            fieldError(id)
        ].join('');
    }

    function textareaInput(id, label, options) {
        const settings = options || {};
        return [
            '<label for="' + escapeHtml(id) + '" class="block text-sm font-medium text-slate-700 dark:text-slate-200">' + escapeHtml(label) + '</label>',
            '<textarea id="' + escapeHtml(id) + '" rows="4" placeholder="' + escapeHtml(settings.placeholder || '') + '" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/60"></textarea>',
            fieldError(id)
        ].join('');
    }

    function selectInput(id, label, options, selectedValue) {
        const normalizedSelected = normalizeText(selectedValue);
        let hasSelected = !normalizedSelected;
        const items = ['<option value="">' + escapeHtml(t('select_placeholder')) + '</option>'];
        (options || []).forEach((item) => {
            const value = normalizeText(item.value);
            const selected = value === normalizedSelected ? 'selected' : '';
            if (selected) hasSelected = true;
            items.push('<option value="' + escapeHtml(value) + '" ' + selected + '>' + escapeHtml(item.label) + '</option>');
        });
        if (normalizedSelected && !hasSelected) {
            items.push('<option value="' + escapeHtml(normalizedSelected) + '" selected>' + escapeHtml(normalizedSelected) + '</option>');
        }
        return [
            '<label for="' + escapeHtml(id) + '" class="block text-sm font-medium text-slate-700 dark:text-slate-200">' + escapeHtml(label) + '</label>',
            '<select id="' + escapeHtml(id) + '" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-900/60">' + items.join('') + '</select>',
            fieldError(id)
        ].join('');
    }

    function checkboxInput(id, label, description) {
        return [
            '<label class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">',
            '  <input id="' + escapeHtml(id) + '" type="checkbox" class="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950">',
            '  <span class="min-w-0">',
            '      <span class="block text-sm font-medium text-slate-800 dark:text-slate-100">' + escapeHtml(label) + '</span>',
            description ? '      <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">' + escapeHtml(description) + '</span>' : '',
            '  </span>',
            '</label>'
        ].join('');
    }

    function primaryButton(id, label) {
        return '<button id="' + escapeHtml(id) + '" type="submit" class="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">' + escapeHtml(label) + '</button>';
    }

    function secondaryLink(href, label, extraClass) {
        return '<a href="' + escapeHtml(href) + '" class="text-sm font-medium text-sky-700 transition hover:underline dark:text-sky-300 ' + (extraClass || '') + '">' + escapeHtml(label) + '</a>';
    }

    function pageShell(title, description, bodyHtml, footerHtml) {
        return [
            '<section class="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">',
            '  <div class="rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:p-8">',
            '      <div class="mb-8">',
            '          <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">' + escapeHtml(title) + '</h1>',
            description ? '          <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">' + escapeHtml(description) + '</p>' : '',
            '      </div>',
            '      <div id="account_notice" class="hidden"></div>',
            bodyHtml,
            footerHtml ? '<div class="mt-8 border-t border-slate-200 pt-5 dark:border-slate-800">' + footerHtml + '</div>' : '',
            '  </div>',
            '</section>'
        ].join('');
    }

    function render(html) {
        const main = getMainElement();
        if (main) main.innerHTML = html;
    }

    function setButtonLoading(button, loadingLabel, isLoading) {
        if (!button) return;
        if (isLoading) {
            button.dataset.originalLabel = button.textContent;
            button.disabled = true;
            button.textContent = loadingLabel;
            return;
        }
        button.disabled = false;
        if (button.dataset.originalLabel) {
            button.textContent = button.dataset.originalLabel;
        }
    }

    function bindSubmit(formId, handler) {
        const form = document.getElementById(formId);
        if (!form) return;
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            handler(event);
        });
    }

    function genderOptions() {
        return [
            { value: 'Male', label: t('gender_male') },
            { value: 'Female', label: t('gender_female') },
            { value: 'Other', label: t('gender_other') },
            { value: 'Prefer not to say', label: t('gender_noanswer') },
        ];
    }

    function educationOptions() {
        return [
            { value: 'Bachelor', label: t('edu_bachelor') },
            { value: 'Master', label: t('edu_master') },
            { value: 'Doctor', label: t('edu_doctor') },
            { value: 'Other', label: t('edu_other') },
        ];
    }

    function readableBool(value) {
        if (value === 1 || value === '1' || value === true || String(value).toLowerCase() === 'true') {
            return lang === 'ko' ? '예' : 'Yes';
        }
        return lang === 'ko' ? '아니오' : 'No';
    }

    function handleRequestError(error) {
        console.error('[StatKISS account frontend]', error);
        if (error && error.message === 'NON_JSON_RESPONSE') {
            setNotice(t('endpoint_error') + ' [' + error.url + ']', 'error');
            return;
        }
        setNotice(t('generic_error'), 'error');
    }

    function redirect(url) {
        window.location.href = url;
    }

    window.StatKISSAccount = {
        bootstrap,
        pageKey,
        pageMode,
        pageMsg,
        lang,
        api,
        routes,
        t,
        render,
        pageShell,
        textInput,
        textareaInput,
        selectInput,
        checkboxInput,
        primaryButton,
        secondaryLink,
        setNotice,
        clearFieldErrors,
        setFieldError,
        createFormData,
        requestJSON,
        validateEmail,
        validatePassword,
        queryParam,
        valueOf,
        setValue,
        setChecked,
        setText,
        bindSubmit,
        genderOptions,
        educationOptions,
        readableBool,
        setButtonLoading,
        handleRequestError,
        redirect,
        escapeHtml,
        isChecked,
    };
})();
