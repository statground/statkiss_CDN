(function () {
    const langs = ['en','ko','ja','zh-Hans','zh-Hant','es','fr','de','pt-BR','ru','id','vi','th','ms','fil','hi','ar','it','nl','pl','sv','tr','uk']
    const base = {}
    langs.forEach((code) => {
        base[code] = {
            'members.password_link.copied': 'The password reset link was copied to your clipboard.',
            'members.password_link.deliver_to_member': 'Send this link to the member who requested the password reset.',
            'members.password_link.warning': 'Do not open this link yourself. Opening it may verify the link and cause it to expire automatically.',
            'members.password_link.copy_failed': 'The link could not be copied automatically. Please copy the text shown below manually.',
            'members.password_link.unavailable': 'Could not generate a password reset link for this member.'
        }
    })

    base.ko = {
        'members.password_link.copied': '비밀번호 변경 링크를 클립보드에 복사했습니다.',
        'members.password_link.deliver_to_member': '이 링크는 비밀번호 변경을 요청한 회원에게 전달하기 위한 링크입니다.',
        'members.password_link.warning': '관리자가 이 링크를 직접 클릭하면 인증이 진행되어 자동으로 만료될 수 있으니 직접 클릭하지 마세요.',
        'members.password_link.copy_failed': '클립보드 자동 복사에 실패했습니다. 아래에 표시된 링크를 직접 복사해 주세요.',
        'members.password_link.unavailable': '이 회원의 비밀번호 변경 링크를 생성하지 못했습니다.'
    }

    base.ja = {
        'members.password_link.copied': 'パスワード再設定リンクをクリップボードにコピーしました。',
        'members.password_link.deliver_to_member': 'このリンクは、パスワード再設定を依頼した会員本人に送ってください。',
        'members.password_link.warning': '管理者がこのリンクを直接開かないでください。リンクを開くと認証が進み、自動的に失効する場合があります。',
        'members.password_link.copy_failed': '自動コピーに失敗しました。下に表示されたリンクを手動でコピーしてください。',
        'members.password_link.unavailable': 'この会員のパスワード再設定リンクを生成できませんでした。'
    }

    base['zh-Hans'] = {
        'members.password_link.copied': '已将密码重置链接复制到剪贴板。',
        'members.password_link.deliver_to_member': '请将此链接发送给请求重置密码的会员本人。',
        'members.password_link.warning': '管理员不要亲自打开此链接。打开后可能会触发验证并导致链接自动失效。',
        'members.password_link.copy_failed': '无法自动复制。请手动复制下方显示的链接。',
        'members.password_link.unavailable': '无法为该会员生成密码重置链接。'
    }

    base['zh-Hant'] = {
        'members.password_link.copied': '已將密碼重設連結複製到剪貼簿。',
        'members.password_link.deliver_to_member': '請將此連結傳送給提出密碼重設要求的會員本人。',
        'members.password_link.warning': '管理員請勿自行開啟此連結。開啟後可能會觸發驗證並導致連結自動失效。',
        'members.password_link.copy_failed': '無法自動複製。請手動複製下方顯示的連結。',
        'members.password_link.unavailable': '無法為此會員產生密碼重設連結。'
    }

    window.StatKISS_ADMIN_I18N.register('members_password_link_20260403_0400', base)
})();

(function () {
    const langs = ['en','ko','ja','zh-Hans','zh-Hant','es','fr','de','pt-BR','ru','id','vi','th','ms','fil','hi','ar','it','nl','pl','sv','tr','uk']
    const base = {}
    langs.forEach((code) => {
        base[code] = {
            'members.bot.notice.title': 'Bot review handling',
            'members.bot.notice.body': 'Suspected bot accounts stay in AliSQL, but they are excluded from member/sign-up statistics, require email verification on login, and can be restored automatically by verified active actions or manually by an administrator.',
            'members.bot.filter.title': 'Bot review filters',
            'members.bot.filter.none': 'No bot review state',
            'members.bot.filter.suspected': 'Suspected bot',
            'members.bot.filter.review': 'Under review',
            'members.bot.filter.cleared': 'Cleared',
            'members.bot.filter.excluded_only': 'Statistics-excluded only',
            'members.bot.badge.suspected': 'Bot suspected',
            'members.bot.badge.review': 'Bot review',
            'members.bot.badge.cleared': 'Bot cleared',
            'members.bot.badge.excluded': 'Excluded from stats',
            'members.bot.badge.verify_required': 'Login verification required',
            'members.bot.meta.decision': 'Decision: {value}',
            'members.bot.meta.reason': 'Reason: {value}',
            'members.bot.meta.last_active': 'Last active signal: {value}',
            'members.bot.meta.last_verification': 'Verification email: {date} ({count})',
            'members.bot.meta.verification_count': 'Verification sent: {count}',
            'members.bot.section_label': 'Bot review controls',
            'members.bot.action.clear': 'Restore member',
            'members.bot.action.mark_review': 'Move to review',
            'members.bot.action.mark_suspected': 'Mark suspected',
            'members.bot.action.resend': 'Resend verification email',
            'members.bot.confirm.clear': 'Restore this account and clear the bot review state?',
            'members.bot.confirm.mark_review': 'Move this account to review state?',
            'members.bot.confirm.mark_suspected': 'Mark this account as a suspected bot account?',
            'members.bot.confirm.resend': 'Send another verification email to this account?',
            'members.bot.alert.updated': 'The bot review status has been updated.',
            'members.bot.alert.verification_sent': 'A verification email has been sent to the member.',
            'members.bot.alert.rate_limited': 'A verification email was sent recently. The existing email is still valid.',
            'members.bot.alert.skipped': 'This account is not currently waiting for bot verification.',
        }
    })

    base.ko = {
        'members.bot.notice.title': 'bot 계정 검토 관리',
        'members.bot.notice.body': 'bot 의심 계정은 AliSQL에 그대로 유지되지만 회원/가입 통계에서는 제외되며, 로그인 시 이메일 인증이 필요합니다. 인증된 active 액션이나 관리자 복구 작업이 발생하면 자동으로 해제됩니다.',
        'members.bot.filter.title': 'bot 검토 필터',
        'members.bot.filter.none': '검토 상태 없음',
        'members.bot.filter.suspected': 'bot 의심',
        'members.bot.filter.review': '검토 중',
        'members.bot.filter.cleared': '해제됨',
        'members.bot.filter.excluded_only': '통계 제외 대상만',
        'members.bot.badge.suspected': 'bot 의심',
        'members.bot.badge.review': 'bot 검토',
        'members.bot.badge.cleared': 'bot 해제',
        'members.bot.badge.excluded': '통계 제외',
        'members.bot.badge.verify_required': '로그인 인증 필요',
        'members.bot.meta.decision': '판정: {value}',
        'members.bot.meta.reason': '근거: {value}',
        'members.bot.meta.last_active': '마지막 active 신호: {value}',
        'members.bot.meta.last_verification': '인증 메일: {date} ({count})',
        'members.bot.meta.verification_count': '인증 메일 발송 횟수: {count}',
        'members.bot.section_label': 'bot 검토 관리',
        'members.bot.action.clear': '회원 복구',
        'members.bot.action.mark_review': '검토 상태로 변경',
        'members.bot.action.mark_suspected': 'bot 의심으로 지정',
        'members.bot.action.resend': '인증 메일 재전송',
        'members.bot.confirm.clear': '이 계정을 복구하고 bot 검토 상태를 해제하시겠습니까?',
        'members.bot.confirm.mark_review': '이 계정을 검토 상태로 전환하시겠습니까?',
        'members.bot.confirm.mark_suspected': '이 계정을 bot 의심 계정으로 표시하시겠습니까?',
        'members.bot.confirm.resend': '이 계정으로 인증 메일을 다시 보내시겠습니까?',
        'members.bot.alert.updated': 'bot 검토 상태를 업데이트했습니다.',
        'members.bot.alert.verification_sent': '회원에게 인증 메일을 발송했습니다.',
        'members.bot.alert.rate_limited': '최근에 인증 메일이 이미 발송되었습니다. 기존 메일을 계속 사용할 수 있습니다.',
        'members.bot.alert.skipped': '이 계정은 현재 bot 인증 대기 상태가 아닙니다.',
    }

    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.register === 'function') {
        window.StatKISS_ADMIN_I18N.register('members_bot_review_20260411', base)
    }
})();


(function () {
    if (!window.StatKISS_ADMIN_I18N || typeof window.StatKISS_ADMIN_I18N.register !== 'function') {
        return
    }

    const langs = ['en','ko','ja','zh-Hans','zh-Hant','es','fr','de','pt-BR','ru','id','vi','th','ms','fil','hi','ar','it','nl','pl','sv','tr','uk']
    const base = {}
    langs.forEach((code) => {
        base[code] = {
            'members.mode.bot_review': 'Bot Review',
            'members.bot.page_title': 'Bot Review',
            'members.bot.page_description': 'Review suspected bot accounts separately from regular member management. This page keeps bot-review filters and recovery actions isolated from the main member list.',
            'members.bot.count': 'Bot Review Count: {count}',
        }
    })

    base.ko = {
        'members.mode.bot_review': 'bot 검토',
        'members.bot.page_title': 'bot 검토',
        'members.bot.page_description': '일반 회원 관리와 분리해서 bot 의심 계정을 검토합니다. 이 화면에서는 bot 전용 필터와 복구/재분류 작업만 집중해서 처리할 수 있습니다.',
        'members.bot.count': 'bot 검토 대상 수: {count}',
    }

    window.StatKISS_ADMIN_I18N.register('members_mode_split_fix_20260411b', base)
})();


(function () {
    if (!window.StatKISS_ADMIN_I18N || typeof window.StatKISS_ADMIN_I18N.register !== 'function') {
        return
    }

    const langs = ['en','ko','ja','zh-Hans','zh-Hant','es','fr','de','pt-BR','ru','id','vi','th','ms','fil','hi','ar','it','nl','pl','sv','tr','uk']
    const base = {}
    langs.forEach((code) => {
        base[code] = {
            'members.card.bot_review': 'Bot Account Review',
            'members.card.hide_bot_review': 'Hide Bot Review',
            'members.mode.bot_review': 'Bot Review',
            'members.bot.page_title': 'Bot Review',
            'members.bot.page_description': 'Review suspected Bot accounts separately from regular member management. This page highlights the current Bot state, decision, and recovery actions first.',
            'members.bot.count': 'Bot Review Count: {count}',
            'members.bot.notice.title': 'Bot Account Review',
            'members.bot.notice.body': 'Suspected Bot accounts remain in AliSQL, are excluded from member/sign-up statistics when flagged for exclusion, and require email verification on login. Verified active actions or an admin recovery can clear the Bot review state automatically.',
            'members.bot.filter.title': 'Bot review filters',
            'members.bot.filter.suspected': 'Bot suspected',
            'members.bot.badge.suspected': 'Bot suspected',
            'members.bot.badge.review': 'Bot review',
            'members.bot.badge.cleared': 'Bot cleared',
            'members.bot.section_label': 'Bot review management',
            'members.bot.action.mark_suspected': 'Mark as Bot suspected',
            'members.bot.confirm.mark_suspected': 'Mark this account as a Bot suspected account?',
            'members.bot.alert.updated': 'The Bot review status has been updated.',
            'members.bot.current_status': 'Current Bot state',
            'members.bot.current_status.none': 'No Bot review state',
            'members.bot.reason_input': 'Reason',
            'members.bot.reason_placeholder.management': 'Write why this account should be marked as Bot suspected or under review.',
            'members.bot.reason_placeholder.review': 'Write the review note or admin reason for the next Bot action.',
            'members.bot.panel.subtitle.management': 'Select the next Bot review state and record the reason.',
            'members.bot.panel.subtitle.review': 'Review the current Bot state, decision, and recovery actions in one place.',
            'members.bot.summary.title': 'Bot review summary',
            'members.bot.summary.decision_empty': 'No decision recorded',
            'members.bot.summary.reason_empty': 'No reason recorded',
            'members.bot.summary.last_active_empty': 'No verified active signal yet',
            'members.bot.summary.verification_empty': 'No verification email sent yet',
            'members.bot.summary.help': 'The reason is stored with the Bot review action and helps later admin review.',
        }
    })

    base.ko = {
        'members.card.bot_review': 'Bot 계정 검토',
        'members.card.hide_bot_review': 'Bot 검토 닫기',
        'members.mode.bot_review': 'Bot 검토',
        'members.bot.page_title': 'Bot 검토',
        'members.bot.page_description': '일반 회원 관리와 분리해서 Bot 의심 계정을 검토합니다. 이 화면에서는 현재 Bot 상태, 판정, 복구/재분류 작업이 먼저 보이도록 정리합니다.',
        'members.bot.count': 'Bot 검토 대상 수: {count}',
        'members.bot.notice.title': 'Bot 계정 검토 관리',
        'members.bot.notice.body': 'Bot 의심 계정은 AliSQL에 그대로 유지되지만 회원/가입 통계에서는 제외될 수 있고, 로그인 시 이메일 인증이 필요합니다. 인증된 active 액션이나 관리자 복구 작업이 발생하면 Bot 검토 상태가 자동으로 해제됩니다.',
        'members.bot.filter.title': 'Bot 검토 필터',
        'members.bot.filter.suspected': 'Bot 의심',
        'members.bot.badge.suspected': 'Bot 의심',
        'members.bot.badge.review': 'Bot 검토',
        'members.bot.badge.cleared': 'Bot 해제',
        'members.bot.section_label': 'Bot 검토 관리',
        'members.bot.action.mark_suspected': 'Bot 의심으로 지정',
        'members.bot.confirm.mark_suspected': '이 계정을 Bot 의심 계정으로 표시하시겠습니까?',
        'members.bot.alert.updated': 'Bot 검토 상태를 업데이트했습니다.',
        'members.bot.current_status': '현재 Bot 상태',
        'members.bot.current_status.none': 'Bot 검토 상태 없음',
        'members.bot.reason_input': '근거',
        'members.bot.reason_placeholder.management': '이 회원을 Bot 의심 또는 검토 중으로 지정하는 근거를 기록하세요.',
        'members.bot.reason_placeholder.review': '다음 Bot 조치에 남길 검토 메모나 관리자 근거를 기록하세요.',
        'members.bot.panel.subtitle.management': '다음 Bot 검토 상태를 선택하고 근거를 함께 남깁니다.',
        'members.bot.panel.subtitle.review': '현재 Bot 상태, 판정, 복구/재분류 작업을 한 곳에서 검토합니다.',
        'members.bot.summary.title': 'Bot 검토 요약',
        'members.bot.summary.decision_empty': '기록된 판정이 없습니다.',
        'members.bot.summary.reason_empty': '기록된 근거가 없습니다.',
        'members.bot.summary.last_active_empty': '확인된 active 신호가 아직 없습니다.',
        'members.bot.summary.verification_empty': '아직 발송된 인증 메일이 없습니다.',
        'members.bot.summary.help': '여기에 적은 근거는 Bot 검토 조치와 함께 저장되어 이후 관리자 검토에 활용됩니다.',
    }

    window.StatKISS_ADMIN_I18N.register('members_bot_ui_polish_20260411e', base)

    // Overwrite previously-registered member Bot labels in-place because the
    // admin i18n lookup resolves earlier bundles first.
    try {
        const bundles = window.StatKISS_ADMIN_I18N.bundles || {}
        Object.keys(base).forEach((langCode) => {
            const langDict = base[langCode] || {}
            Object.keys(langDict).forEach((key) => {
                Object.keys(bundles).forEach((bundleName) => {
                    const bundle = bundles[bundleName] || {}
                    if (bundle[langCode] && Object.prototype.hasOwnProperty.call(bundle[langCode], key)) {
                        bundle[langCode][key] = langDict[key]
                    }
                })
            })
        })
    } catch (error) {
        console.warn('members_bot_ui_polish_20260411e override failed', error)
    }
})();


// ===== Final Bot/member UX cleanup patch 2026-04-12f =====
;(function () {
    if (!window.StatKISS_ADMIN_I18N || typeof window.StatKISS_ADMIN_I18N.register !== 'function') {
        return;
    }

    const override = {
        en: {
            'members.mode.bot_review': 'Bot review',
            'members.bot.notice.title': 'Bot review',
            'members.bot.notice.body': 'During the early StatKISS site, many accounts were created that were later suspected to be automated. When the site was rebuilt, those records were preserved first and have since been reviewed gradually. Use this page to continue that review history.',
            'members.bot.page_title': 'Bot review',
            'members.bot.page_description': 'During the early StatKISS site, many accounts were created that were later suspected to be automated. When the site was rebuilt, those records were preserved first and have since been reviewed gradually. Use this page to continue that review history.',
            'members.bot.filter.title': 'Search and Bot status',
            'members.bot.filter.review': 'Needs review',
            'members.bot.filter.suspected': 'Discarded',
            'members.bot.badge.review': 'Needs review',
            'members.bot.badge.suspected': 'Bot suspected',
            'members.bot.badge.discarded': 'Discarded',
            'members.bot.badge.decision_discarded': 'Decision: Discarded',
            'members.bot.badge.decision_review': 'Decision: Pending review',
            'members.bot.badge.decision_saved': 'Decision: Keep',
            'members.bot.toggle.open': 'Bot account review',
            'members.bot.toggle.close': 'Hide Bot review',
            'members.bot.form.panel_title': 'Bot review management',
            'members.bot.form.current_state': 'Current state',
            'members.bot.form.current_reason': 'Saved reason',
            'members.bot.form.next_status': 'Next review state',
            'members.bot.form.reason_label': 'Reason',
            'members.bot.form.reason_placeholder': 'Write the review basis or recovery note for this account.',
            'members.bot.form.apply': 'Apply',
            'members.bot.form.clear': 'Clear Bot review',
            'members.bot.form.search_hint': 'Search by member name or email, then narrow the list with Bot review states.',
            'members.bot.form.search_name': 'Name',
            'members.bot.form.search_email': 'Email',
            'members.bot.status.review_queue': 'Needs review',
            'members.bot.status.suspected': 'Bot suspected',
            'members.bot.status.discarded': 'Discarded',
            'members.bot.status.cleared': 'Cleared',
            'members.bot.summary.last_active': 'Last active signal',
            'members.bot.summary.last_verification': 'Verification mail',
            'members.bot.summary.no_reason': 'No saved reason yet.',
        },
        ko: {
            'members.mode.bot_review': 'Bot 검토',
            'members.bot.notice.title': 'Bot 검토',
            'members.bot.notice.body': '초창기 StatKISS 홈페이지에는 Bot으로 추정되는 계정이 다수 가입되어 있었습니다. 홈페이지를 개편하는 과정에서는 이 계정 정보를 우선 그대로 이관했고, 이후 운영 과정에서 하나씩 검토·정리하는 이력이 이어지고 있습니다. 이 화면은 그 후속 검토 작업을 위한 관리 화면입니다.',
            'members.bot.page_title': 'Bot 검토',
            'members.bot.page_description': '초창기 StatKISS 홈페이지에는 Bot으로 추정되는 계정이 다수 가입되어 있었습니다. 홈페이지를 개편하는 과정에서는 이 계정 정보를 우선 그대로 이관했고, 이후 운영 과정에서 하나씩 검토·정리하는 이력이 이어지고 있습니다. 이 화면은 그 후속 검토 작업을 위한 관리 화면입니다.',
            'members.bot.filter.title': '검색 및 Bot 상태',
            'members.bot.filter.review': '검토 대상',
            'members.bot.filter.suspected': '버림',
            'members.bot.badge.review': '검토 대상',
            'members.bot.badge.suspected': 'Bot 의심',
            'members.bot.badge.discarded': '버림',
            'members.bot.badge.decision_discarded': '판정: 버림',
            'members.bot.badge.decision_review': '판정: 보류',
            'members.bot.badge.decision_saved': '판정: 살림',
            'members.bot.toggle.open': 'Bot 계정 검토',
            'members.bot.toggle.close': 'Bot 검토 닫기',
            'members.bot.form.panel_title': 'Bot 검토 관리',
            'members.bot.form.current_state': '현재 상태',
            'members.bot.form.current_reason': '저장된 근거',
            'members.bot.form.next_status': '다음 검토 상태',
            'members.bot.form.reason_label': '근거',
            'members.bot.form.reason_placeholder': '이 계정을 Bot 의심 또는 검토 대상으로 두는 근거를 적어 주세요.',
            'members.bot.form.apply': '적용',
            'members.bot.form.clear': 'Bot 검토 해제',
            'members.bot.form.search_hint': '이름이나 이메일로 먼저 찾은 뒤, Bot 상태로 목록을 좁혀 보세요.',
            'members.bot.form.search_name': '이름',
            'members.bot.form.search_email': '이메일',
            'members.bot.status.review_queue': '검토 대상',
            'members.bot.status.suspected': 'Bot 의심',
            'members.bot.status.discarded': '버림',
            'members.bot.status.cleared': '해제',
            'members.bot.summary.last_active': '마지막 active 신호',
            'members.bot.summary.last_verification': '인증 메일',
            'members.bot.summary.no_reason': '저장된 근거가 아직 없습니다.',
        },
    };

    window.StatKISS_ADMIN_I18N.register('members_bot_review_final_cleanup_20260412f', override);

    try {
        const bundles = window.StatKISS_ADMIN_I18N.bundles || {};
        Object.keys(override).forEach((langCode) => {
            const langDict = override[langCode] || {};
            Object.keys(langDict).forEach((key) => {
                Object.keys(bundles).forEach((bundleName) => {
                    const bundle = bundles[bundleName] || {};
                    if (bundle[langCode] && Object.prototype.hasOwnProperty.call(bundle[langCode], key)) {
                        bundle[langCode][key] = langDict[key];
                    }
                });
            });
        });
    } catch (error) {
        console.warn('members_bot_review_final_cleanup_20260412f override failed', error);
    }
})();


// ===== Multilingual Bot/member copy refresh patch 2026-04-12h =====
;(function () {
    if (!window.StatKISS_ADMIN_I18N || typeof window.StatKISS_ADMIN_I18N.register !== 'function') {
        return;
    }

    const override = {
    "en": {
        "members.mode.bot_review": "Bot review",
        "members.bot.page_title": "Bot review",
        "members.bot.page_description": "Many accounts suspected to be automated were created on the early StatKISS site. During the rebuild, those records were preserved first and have been reviewed gradually since then. Use this page to continue that review work.",
        "members.bot.filter.title": "Search and Bot status",
        "members.bot.filter.review": "Needs review",
        "members.bot.filter.suspected": "Discarded",
        "members.bot.toggle.open": "Bot account review",
        "members.bot.toggle.close": "Hide Bot review",
        "members.bot.form.panel_title": "Bot review management",
        "members.bot.form.current_state": "Current state",
        "members.bot.form.reason_label": "Reason",
        "members.bot.form.apply": "Apply",
        "members.bot.form.clear": "Clear Bot review",
        "members.bot.form.search_hint": "Search by member name or email, then narrow the list with Bot states.",
        "members.bot.form.search_name": "Name",
        "members.bot.form.search_email": "Email",
        "members.bot.status.review_queue": "Needs review",
        "members.bot.status.discarded": "Discarded",
        "members.bot.summary.last_active": "Last active signal",
        "members.bot.summary.last_verification": "Verification email",
        "members.bot.badge.excluded": "Excluded from stats",
        "members.bot.badge.verify_required": "Login verification required"
    },
    "ko": {
        "members.mode.bot_review": "Bot 검토",
        "members.bot.page_title": "Bot 검토",
        "members.bot.page_description": "초창기 StatKISS 홈페이지에는 Bot으로 추정되는 계정이 다수 가입되어 있었습니다. 홈페이지를 개편하는 과정에서는 이 계정 정보를 우선 그대로 이관했고, 이후 운영 과정에서 하나씩 검토·정리하는 이력이 이어지고 있습니다. 이 화면은 그 후속 검토 작업을 위한 관리 화면입니다.",
        "members.bot.filter.title": "검색 및 Bot 상태",
        "members.bot.filter.review": "검토 대상",
        "members.bot.filter.suspected": "버림",
        "members.bot.toggle.open": "Bot 계정 검토",
        "members.bot.toggle.close": "Bot 검토 닫기",
        "members.bot.form.panel_title": "Bot 검토 관리",
        "members.bot.form.current_state": "현재 상태",
        "members.bot.form.reason_label": "근거",
        "members.bot.form.apply": "적용",
        "members.bot.form.clear": "Bot 검토 해제",
        "members.bot.form.search_hint": "이름이나 이메일로 먼저 찾은 뒤, Bot 상태로 목록을 좁혀 보세요.",
        "members.bot.form.search_name": "이름",
        "members.bot.form.search_email": "이메일",
        "members.bot.status.review_queue": "검토 대상",
        "members.bot.status.discarded": "버림",
        "members.bot.summary.last_active": "마지막 active 신호",
        "members.bot.summary.last_verification": "인증 메일",
        "members.bot.badge.excluded": "통계 제외",
        "members.bot.badge.verify_required": "로그인 인증 필요"
    },
    "ja": {
        "members.mode.bot_review": "Bot確認",
        "members.bot.page_title": "Bot確認",
        "members.bot.page_description": "初期のStatKISSサイトでは自動アカウントと疑われる登録が多数ありました。サイト再構築時にそれらの記録をまず保持し、その後段階的に見直してきました。この画面でその確認作業を続けます。",
        "members.bot.filter.title": "検索とBot状態",
        "members.bot.filter.review": "要確認",
        "members.bot.filter.suspected": "破棄",
        "members.bot.toggle.open": "Botアカウント確認",
        "members.bot.toggle.close": "Bot確認を閉じる",
        "members.bot.form.panel_title": "Bot確認管理",
        "members.bot.form.current_state": "現在の状態",
        "members.bot.form.reason_label": "根拠",
        "members.bot.form.apply": "適用",
        "members.bot.form.clear": "Bot確認を解除",
        "members.bot.form.search_hint": "会員名またはメールで検索し、Bot状態で絞り込んでください。",
        "members.bot.form.search_name": "名前",
        "members.bot.form.search_email": "メール",
        "members.bot.status.review_queue": "要確認",
        "members.bot.status.discarded": "破棄",
        "members.bot.summary.last_active": "最終アクティブ信号",
        "members.bot.summary.last_verification": "認証メール",
        "members.bot.badge.excluded": "統計から除外",
        "members.bot.badge.verify_required": "ログイン認証が必要"
    },
    "zh-Hans": {
        "members.mode.bot_review": "Bot审核",
        "members.bot.page_title": "Bot审核",
        "members.bot.page_description": "StatKISS 早期网站中曾注册了许多疑似自动生成的账户。网站重建时，这些记录先被完整保留，之后再逐步审核整理。本页面用于继续这项审核工作。",
        "members.bot.filter.title": "搜索与 Bot 状态",
        "members.bot.filter.review": "待审核",
        "members.bot.filter.suspected": "已舍弃",
        "members.bot.toggle.open": "Bot账户审核",
        "members.bot.toggle.close": "关闭 Bot 审核",
        "members.bot.form.panel_title": "Bot审核管理",
        "members.bot.form.current_state": "当前状态",
        "members.bot.form.reason_label": "依据",
        "members.bot.form.apply": "应用",
        "members.bot.form.clear": "解除 Bot 审核",
        "members.bot.form.search_hint": "先按会员姓名或邮箱搜索，再按 Bot 状态缩小范围。",
        "members.bot.form.search_name": "姓名",
        "members.bot.form.search_email": "邮箱",
        "members.bot.status.review_queue": "待审核",
        "members.bot.status.discarded": "已舍弃",
        "members.bot.summary.last_active": "最近活跃信号",
        "members.bot.summary.last_verification": "验证邮件",
        "members.bot.badge.excluded": "不计入统计",
        "members.bot.badge.verify_required": "需要登录验证"
    },
    "zh-Hant": {
        "members.mode.bot_review": "Bot審核",
        "members.bot.page_title": "Bot審核",
        "members.bot.page_description": "StatKISS 早期網站中曾註冊了許多疑似自動生成的帳號。網站重建時，這些紀錄先被完整保留，之後再逐步審核整理。本頁面用於繼續這項審核工作。",
        "members.bot.filter.title": "搜尋與 Bot 狀態",
        "members.bot.filter.review": "待審核",
        "members.bot.filter.suspected": "已捨棄",
        "members.bot.toggle.open": "Bot帳號審核",
        "members.bot.toggle.close": "關閉 Bot 審核",
        "members.bot.form.panel_title": "Bot審核管理",
        "members.bot.form.current_state": "目前狀態",
        "members.bot.form.reason_label": "依據",
        "members.bot.form.apply": "套用",
        "members.bot.form.clear": "解除 Bot 審核",
        "members.bot.form.search_hint": "先按會員姓名或電子郵件搜尋，再依 Bot 狀態縮小範圍。",
        "members.bot.form.search_name": "姓名",
        "members.bot.form.search_email": "電子郵件",
        "members.bot.status.review_queue": "待審核",
        "members.bot.status.discarded": "已捨棄",
        "members.bot.summary.last_active": "最近活躍訊號",
        "members.bot.summary.last_verification": "驗證郵件",
        "members.bot.badge.excluded": "不納入統計",
        "members.bot.badge.verify_required": "需要登入驗證"
    },
    "es": {
        "members.mode.bot_review": "Revisión de Bot",
        "members.bot.page_title": "Revisión de Bot",
        "members.bot.page_description": "En el sitio inicial de StatKISS se crearon muchas cuentas sospechosas de ser automáticas. Durante la reconstrucción del sitio, esos registros se conservaron primero y desde entonces se han revisado gradualmente. Usa esta página para continuar esa revisión.",
        "members.bot.filter.title": "Búsqueda y estado de Bot",
        "members.bot.filter.review": "Pendiente de revisión",
        "members.bot.filter.suspected": "Descartado",
        "members.bot.toggle.open": "Revisión de cuenta Bot",
        "members.bot.toggle.close": "Ocultar revisión de Bot",
        "members.bot.form.panel_title": "Gestión de revisión de Bot",
        "members.bot.form.current_state": "Estado actual",
        "members.bot.form.reason_label": "Motivo",
        "members.bot.form.apply": "Aplicar",
        "members.bot.form.clear": "Quitar revisión de Bot",
        "members.bot.form.search_hint": "Busca por nombre o correo del miembro y luego reduce la lista con los estados de Bot.",
        "members.bot.form.search_name": "Nombre",
        "members.bot.form.search_email": "Correo electrónico",
        "members.bot.status.review_queue": "Pendiente de revisión",
        "members.bot.status.discarded": "Descartado",
        "members.bot.summary.last_active": "Última señal de actividad",
        "members.bot.summary.last_verification": "Correo de verificación",
        "members.bot.badge.excluded": "Excluido de las estadísticas",
        "members.bot.badge.verify_required": "Se requiere verificación de inicio de sesión"
    },
    "fr": {
        "members.mode.bot_review": "Révision Bot",
        "members.bot.page_title": "Révision Bot",
        "members.bot.page_description": "De nombreux comptes soupçonnés d’être automatisés ont été créés sur le site StatKISS au début. Lors de la refonte du site, ces enregistrements ont d’abord été conservés, puis examinés progressivement. Utilisez cette page pour poursuivre ce travail de révision.",
        "members.bot.filter.title": "Recherche et état Bot",
        "members.bot.filter.review": "À examiner",
        "members.bot.filter.suspected": "Écarté",
        "members.bot.toggle.open": "Révision du compte Bot",
        "members.bot.toggle.close": "Masquer la révision Bot",
        "members.bot.form.panel_title": "Gestion de la révision Bot",
        "members.bot.form.current_state": "État actuel",
        "members.bot.form.reason_label": "Motif",
        "members.bot.form.apply": "Appliquer",
        "members.bot.form.clear": "Effacer la révision Bot",
        "members.bot.form.search_hint": "Recherchez par nom ou e-mail du membre, puis affinez la liste avec les états Bot.",
        "members.bot.form.search_name": "Nom",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "À examiner",
        "members.bot.status.discarded": "Écarté",
        "members.bot.summary.last_active": "Dernier signal actif",
        "members.bot.summary.last_verification": "E-mail de vérification",
        "members.bot.badge.excluded": "Exclu des statistiques",
        "members.bot.badge.verify_required": "Vérification de connexion requise"
    },
    "de": {
        "members.mode.bot_review": "Bot-Prüfung",
        "members.bot.page_title": "Bot-Prüfung",
        "members.bot.page_description": "Auf der frühen StatKISS-Website wurden viele Konten erstellt, die später als automatisiert verdächtigt wurden. Beim Neuaufbau der Website wurden diese Datensätze zunächst übernommen und seitdem schrittweise überprüft. Verwenden Sie diese Seite, um diese Überprüfung fortzusetzen.",
        "members.bot.filter.title": "Suche und Bot-Status",
        "members.bot.filter.review": "Zur Prüfung",
        "members.bot.filter.suspected": "Verworfen",
        "members.bot.toggle.open": "Bot-Konto prüfen",
        "members.bot.toggle.close": "Bot-Prüfung ausblenden",
        "members.bot.form.panel_title": "Bot-Prüfverwaltung",
        "members.bot.form.current_state": "Aktueller Status",
        "members.bot.form.reason_label": "Begründung",
        "members.bot.form.apply": "Anwenden",
        "members.bot.form.clear": "Bot-Prüfung aufheben",
        "members.bot.form.search_hint": "Suchen Sie nach Name oder E-Mail des Mitglieds und filtern Sie die Liste dann nach Bot-Status.",
        "members.bot.form.search_name": "Name",
        "members.bot.form.search_email": "E-Mail",
        "members.bot.status.review_queue": "Zur Prüfung",
        "members.bot.status.discarded": "Verworfen",
        "members.bot.summary.last_active": "Letztes aktives Signal",
        "members.bot.summary.last_verification": "Bestätigungs-E-Mail",
        "members.bot.badge.excluded": "Von Statistiken ausgeschlossen",
        "members.bot.badge.verify_required": "Login-Bestätigung erforderlich"
    },
    "pt-BR": {
        "members.mode.bot_review": "Revisão de Bot",
        "members.bot.page_title": "Revisão de Bot",
        "members.bot.page_description": "No site inicial do StatKISS, muitas contas depois passaram a ser suspeitas de automação. Durante a reformulação do site, esses registros foram preservados primeiro e vêm sendo revisados gradualmente desde então. Use esta página para continuar esse trabalho de revisão.",
        "members.bot.filter.title": "Busca e status de Bot",
        "members.bot.filter.review": "Em revisão",
        "members.bot.filter.suspected": "Descartado",
        "members.bot.toggle.open": "Revisão da conta Bot",
        "members.bot.toggle.close": "Ocultar revisão de Bot",
        "members.bot.form.panel_title": "Gerenciamento da revisão de Bot",
        "members.bot.form.current_state": "Estado atual",
        "members.bot.form.reason_label": "Motivo",
        "members.bot.form.apply": "Aplicar",
        "members.bot.form.clear": "Limpar revisão de Bot",
        "members.bot.form.search_hint": "Pesquise pelo nome ou e-mail do membro e depois refine a lista pelos estados de Bot.",
        "members.bot.form.search_name": "Nome",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "Em revisão",
        "members.bot.status.discarded": "Descartado",
        "members.bot.summary.last_active": "Último sinal ativo",
        "members.bot.summary.last_verification": "E-mail de verificação",
        "members.bot.badge.excluded": "Excluído das estatísticas",
        "members.bot.badge.verify_required": "Verificação de login necessária"
    },
    "ru": {
        "members.mode.bot_review": "Проверка Bot",
        "members.bot.page_title": "Проверка Bot",
        "members.bot.page_description": "На раннем сайте StatKISS было создано много учетных записей, которые позже стали считаться автоматическими. При обновлении сайта эти записи сначала были сохранены, а затем постепенно проверялись. Используйте эту страницу, чтобы продолжить эту проверку.",
        "members.bot.filter.title": "Поиск и статус Bot",
        "members.bot.filter.review": "Требует проверки",
        "members.bot.filter.suspected": "Отброшено",
        "members.bot.toggle.open": "Проверка аккаунта Bot",
        "members.bot.toggle.close": "Скрыть проверку Bot",
        "members.bot.form.panel_title": "Управление проверкой Bot",
        "members.bot.form.current_state": "Текущее состояние",
        "members.bot.form.reason_label": "Основание",
        "members.bot.form.apply": "Применить",
        "members.bot.form.clear": "Снять проверку Bot",
        "members.bot.form.search_hint": "Ищите по имени участника или e-mail, затем сужайте список по статусам Bot.",
        "members.bot.form.search_name": "Имя",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "Требует проверки",
        "members.bot.status.discarded": "Отброшено",
        "members.bot.summary.last_active": "Последний активный сигнал",
        "members.bot.summary.last_verification": "Письмо подтверждения",
        "members.bot.badge.excluded": "Исключено из статистики",
        "members.bot.badge.verify_required": "Требуется проверка входа"
    },
    "id": {
        "members.mode.bot_review": "Tinjauan Bot",
        "members.bot.page_title": "Tinjauan Bot",
        "members.bot.page_description": "Pada situs StatKISS awal, banyak akun dibuat dan kemudian diduga sebagai akun otomatis. Saat situs dibangun ulang, catatan tersebut terlebih dahulu dipertahankan dan sejak itu ditinjau secara bertahap. Gunakan halaman ini untuk melanjutkan peninjauan tersebut.",
        "members.bot.filter.title": "Pencarian dan status Bot",
        "members.bot.filter.review": "Perlu ditinjau",
        "members.bot.filter.suspected": "Dibuang",
        "members.bot.toggle.open": "Tinjau akun Bot",
        "members.bot.toggle.close": "Sembunyikan tinjauan Bot",
        "members.bot.form.panel_title": "Pengelolaan tinjauan Bot",
        "members.bot.form.current_state": "Status saat ini",
        "members.bot.form.reason_label": "Alasan",
        "members.bot.form.apply": "Terapkan",
        "members.bot.form.clear": "Hapus tinjauan Bot",
        "members.bot.form.search_hint": "Cari menurut nama atau email anggota, lalu persempit daftar dengan status Bot.",
        "members.bot.form.search_name": "Nama",
        "members.bot.form.search_email": "Email",
        "members.bot.status.review_queue": "Perlu ditinjau",
        "members.bot.status.discarded": "Dibuang",
        "members.bot.summary.last_active": "Sinyal aktif terakhir",
        "members.bot.summary.last_verification": "Email verifikasi",
        "members.bot.badge.excluded": "Dikecualikan dari statistik",
        "members.bot.badge.verify_required": "Verifikasi login diperlukan"
    },
    "vi": {
        "members.mode.bot_review": "Rà soát Bot",
        "members.bot.page_title": "Rà soát Bot",
        "members.bot.page_description": "Trên trang StatKISS giai đoạn đầu, nhiều tài khoản sau đó bị nghi là tự động đã được tạo. Khi trang được làm mới, các bản ghi đó được giữ lại trước và từ đó được rà soát dần. Hãy dùng trang này để tiếp tục công việc rà soát đó.",
        "members.bot.filter.title": "Tìm kiếm và trạng thái Bot",
        "members.bot.filter.review": "Cần rà soát",
        "members.bot.filter.suspected": "Loại bỏ",
        "members.bot.toggle.open": "Rà soát tài khoản Bot",
        "members.bot.toggle.close": "Ẩn rà soát Bot",
        "members.bot.form.panel_title": "Quản lý rà soát Bot",
        "members.bot.form.current_state": "Trạng thái hiện tại",
        "members.bot.form.reason_label": "Căn cứ",
        "members.bot.form.apply": "Áp dụng",
        "members.bot.form.clear": "Xóa rà soát Bot",
        "members.bot.form.search_hint": "Tìm theo tên hoặc email thành viên, rồi thu hẹp danh sách bằng trạng thái Bot.",
        "members.bot.form.search_name": "Tên",
        "members.bot.form.search_email": "Email",
        "members.bot.status.review_queue": "Cần rà soát",
        "members.bot.status.discarded": "Loại bỏ",
        "members.bot.summary.last_active": "Tín hiệu hoạt động gần nhất",
        "members.bot.summary.last_verification": "Email xác minh",
        "members.bot.badge.excluded": "Loại khỏi thống kê",
        "members.bot.badge.verify_required": "Cần xác minh khi đăng nhập"
    },
    "th": {
        "members.mode.bot_review": "ตรวจสอบ Bot",
        "members.bot.page_title": "ตรวจสอบ Bot",
        "members.bot.page_description": "ในช่วงแรกของเว็บไซต์ StatKISS มีการสร้างบัญชีจำนวนมากที่ภายหลังถูกสงสัยว่าเป็นบัญชีอัตโนมัติ ระหว่างการปรับปรุงเว็บไซต์ ข้อมูลเหล่านั้นถูกเก็บไว้ก่อน และหลังจากนั้นจึงค่อย ๆ ตรวจสอบต่อ ใช้หน้านี้เพื่อดำเนินงานตรวจสอบนั้นต่อไป",
        "members.bot.filter.title": "ค้นหาและสถานะ Bot",
        "members.bot.filter.review": "รอตรวจสอบ",
        "members.bot.filter.suspected": "ทิ้ง",
        "members.bot.toggle.open": "ตรวจสอบบัญชี Bot",
        "members.bot.toggle.close": "ซ่อนการตรวจสอบ Bot",
        "members.bot.form.panel_title": "จัดการการตรวจสอบ Bot",
        "members.bot.form.current_state": "สถานะปัจจุบัน",
        "members.bot.form.reason_label": "เหตุผล",
        "members.bot.form.apply": "นำไปใช้",
        "members.bot.form.clear": "ยกเลิกการตรวจสอบ Bot",
        "members.bot.form.search_hint": "ค้นหาด้วยชื่อสมาชิกหรืออีเมล แล้วค่อยกรองรายการด้วยสถานะ Bot",
        "members.bot.form.search_name": "ชื่อ",
        "members.bot.form.search_email": "อีเมล",
        "members.bot.status.review_queue": "รอตรวจสอบ",
        "members.bot.status.discarded": "ทิ้ง",
        "members.bot.summary.last_active": "สัญญาณใช้งานล่าสุด",
        "members.bot.summary.last_verification": "อีเมลยืนยัน",
        "members.bot.badge.excluded": "ไม่นับในสถิติ",
        "members.bot.badge.verify_required": "ต้องยืนยันก่อนเข้าสู่ระบบ"
    },
    "ms": {
        "members.mode.bot_review": "Semakan Bot",
        "members.bot.page_title": "Semakan Bot",
        "members.bot.page_description": "Pada laman StatKISS awal, banyak akaun diwujudkan dan kemudian disyaki sebagai akaun automatik. Semasa laman dibina semula, rekod tersebut disimpan dahulu dan sejak itu disemak secara berperingkat. Gunakan halaman ini untuk meneruskan semakan tersebut.",
        "members.bot.filter.title": "Carian dan status Bot",
        "members.bot.filter.review": "Perlu disemak",
        "members.bot.filter.suspected": "Dibuang",
        "members.bot.toggle.open": "Semak akaun Bot",
        "members.bot.toggle.close": "Sembunyikan semakan Bot",
        "members.bot.form.panel_title": "Pengurusan semakan Bot",
        "members.bot.form.current_state": "Status semasa",
        "members.bot.form.reason_label": "Sebab",
        "members.bot.form.apply": "Guna",
        "members.bot.form.clear": "Kosongkan semakan Bot",
        "members.bot.form.search_hint": "Cari mengikut nama atau e-mel ahli, kemudian sempitkan senarai dengan status Bot.",
        "members.bot.form.search_name": "Nama",
        "members.bot.form.search_email": "E-mel",
        "members.bot.status.review_queue": "Perlu disemak",
        "members.bot.status.discarded": "Dibuang",
        "members.bot.summary.last_active": "Isyarat aktif terakhir",
        "members.bot.summary.last_verification": "E-mel pengesahan",
        "members.bot.badge.excluded": "Dikecualikan daripada statistik",
        "members.bot.badge.verify_required": "Pengesahan log masuk diperlukan"
    },
    "fil": {
        "members.mode.bot_review": "Pagsusuri ng Bot",
        "members.bot.page_title": "Pagsusuri ng Bot",
        "members.bot.page_description": "Sa unang bersyon ng StatKISS site, maraming account ang nalikha at kalaunan ay pinaghinalaang awtomatiko. Nang i-rebuild ang site, unang iningatan ang mga rekord na iyon at unti-unting sinuri pagkatapos. Gamitin ang pahinang ito upang ipagpatuloy ang pagsusuring iyon.",
        "members.bot.filter.title": "Paghahanap at estado ng Bot",
        "members.bot.filter.review": "Kailangang suriin",
        "members.bot.filter.suspected": "Itinapon",
        "members.bot.toggle.open": "Suriin ang Bot account",
        "members.bot.toggle.close": "Itago ang pagsusuri ng Bot",
        "members.bot.form.panel_title": "Pamamahala ng pagsusuri ng Bot",
        "members.bot.form.current_state": "Kasalukuyang estado",
        "members.bot.form.reason_label": "Dahilan",
        "members.bot.form.apply": "Ilapat",
        "members.bot.form.clear": "Alisin ang pagsusuri ng Bot",
        "members.bot.form.search_hint": "Maghanap ayon sa pangalan o email ng miyembro, saka paliitin ang listahan gamit ang mga estado ng Bot.",
        "members.bot.form.search_name": "Pangalan",
        "members.bot.form.search_email": "Email",
        "members.bot.status.review_queue": "Kailangang suriin",
        "members.bot.status.discarded": "Itinapon",
        "members.bot.summary.last_active": "Huling active signal",
        "members.bot.summary.last_verification": "Email ng beripikasyon",
        "members.bot.badge.excluded": "Hindi kasama sa estadistika",
        "members.bot.badge.verify_required": "Kailangang beripikahin ang pag-login"
    },
    "hi": {
        "members.mode.bot_review": "Bot समीक्षा",
        "members.bot.page_title": "Bot समीक्षा",
        "members.bot.page_description": "StatKISS की शुरुआती वेबसाइट पर कई ऐसे खाते बनाए गए थे जिन्हें बाद में स्वचालित खाता माना गया। वेबसाइट के पुनर्निर्माण के दौरान उन अभिलेखों को पहले सुरक्षित रखा गया और उसके बाद धीरे-धीरे उनकी समीक्षा की गई। इस समीक्षा कार्य को जारी रखने के लिए इस पृष्ठ का उपयोग करें।",
        "members.bot.filter.title": "खोज और Bot स्थिति",
        "members.bot.filter.review": "समीक्षा आवश्यक",
        "members.bot.filter.suspected": "त्यागा गया",
        "members.bot.toggle.open": "Bot खाते की समीक्षा",
        "members.bot.toggle.close": "Bot समीक्षा छिपाएँ",
        "members.bot.form.panel_title": "Bot समीक्षा प्रबंधन",
        "members.bot.form.current_state": "वर्तमान स्थिति",
        "members.bot.form.reason_label": "कारण",
        "members.bot.form.apply": "लागू करें",
        "members.bot.form.clear": "Bot समीक्षा हटाएँ",
        "members.bot.form.search_hint": "सदस्य के नाम या ईमेल से खोजें, फिर Bot स्थिति से सूची को संकीर्ण करें।",
        "members.bot.form.search_name": "नाम",
        "members.bot.form.search_email": "ईमेल",
        "members.bot.status.review_queue": "समीक्षा आवश्यक",
        "members.bot.status.discarded": "त्यागा गया",
        "members.bot.summary.last_active": "अंतिम सक्रिय संकेत",
        "members.bot.summary.last_verification": "सत्यापन ईमेल",
        "members.bot.badge.excluded": "सांख्यिकी से बाहर",
        "members.bot.badge.verify_required": "लॉगिन सत्यापन आवश्यक"
    },
    "ar": {
        "members.mode.bot_review": "مراجعة Bot",
        "members.bot.page_title": "مراجعة Bot",
        "members.bot.page_description": "في الموقع المبكر لـ StatKISS تم إنشاء العديد من الحسابات التي اشتبه لاحقًا في أنها آلية. أثناء إعادة بناء الموقع، تم الاحتفاظ بهذه السجلات أولًا ثم جرت مراجعتها تدريجيًا. استخدم هذه الصفحة لمتابعة أعمال المراجعة هذه.",
        "members.bot.filter.title": "البحث وحالة Bot",
        "members.bot.filter.review": "بحاجة إلى مراجعة",
        "members.bot.filter.suspected": "مرفوض",
        "members.bot.toggle.open": "مراجعة حساب Bot",
        "members.bot.toggle.close": "إخفاء مراجعة Bot",
        "members.bot.form.panel_title": "إدارة مراجعة Bot",
        "members.bot.form.current_state": "الحالة الحالية",
        "members.bot.form.reason_label": "السبب",
        "members.bot.form.apply": "تطبيق",
        "members.bot.form.clear": "إزالة مراجعة Bot",
        "members.bot.form.search_hint": "ابحث باسم العضو أو بريده الإلكتروني، ثم ضيّق القائمة حسب حالات Bot.",
        "members.bot.form.search_name": "الاسم",
        "members.bot.form.search_email": "البريد الإلكتروني",
        "members.bot.status.review_queue": "بحاجة إلى مراجعة",
        "members.bot.status.discarded": "مرفوض",
        "members.bot.summary.last_active": "آخر إشارة نشاط",
        "members.bot.summary.last_verification": "رسالة التحقق",
        "members.bot.badge.excluded": "مستبعد من الإحصاءات",
        "members.bot.badge.verify_required": "مطلوب تحقق لتسجيل الدخول"
    },
    "it": {
        "members.mode.bot_review": "Revisione Bot",
        "members.bot.page_title": "Revisione Bot",
        "members.bot.page_description": "Nel sito iniziale di StatKISS sono stati creati molti account poi sospettati di essere automatici. Durante il rinnovo del sito, questi record sono stati prima conservati e poi esaminati gradualmente. Usa questa pagina per continuare tale revisione.",
        "members.bot.filter.title": "Ricerca e stato Bot",
        "members.bot.filter.review": "Da rivedere",
        "members.bot.filter.suspected": "Scartato",
        "members.bot.toggle.open": "Revisione account Bot",
        "members.bot.toggle.close": "Nascondi revisione Bot",
        "members.bot.form.panel_title": "Gestione revisione Bot",
        "members.bot.form.current_state": "Stato attuale",
        "members.bot.form.reason_label": "Motivo",
        "members.bot.form.apply": "Applica",
        "members.bot.form.clear": "Rimuovi revisione Bot",
        "members.bot.form.search_hint": "Cerca per nome o e-mail del membro, quindi restringi l’elenco con gli stati Bot.",
        "members.bot.form.search_name": "Nome",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "Da rivedere",
        "members.bot.status.discarded": "Scartato",
        "members.bot.summary.last_active": "Ultimo segnale attivo",
        "members.bot.summary.last_verification": "E-mail di verifica",
        "members.bot.badge.excluded": "Escluso dalle statistiche",
        "members.bot.badge.verify_required": "Verifica di accesso richiesta"
    },
    "nl": {
        "members.mode.bot_review": "Bot-beoordeling",
        "members.bot.page_title": "Bot-beoordeling",
        "members.bot.page_description": "Op de vroege StatKISS-site zijn veel accounts aangemaakt die later als geautomatiseerd werden verdacht. Tijdens de vernieuwing van de site zijn deze gegevens eerst behouden en daarna geleidelijk beoordeeld. Gebruik deze pagina om dat beoordelingswerk voort te zetten.",
        "members.bot.filter.title": "Zoeken en Bot-status",
        "members.bot.filter.review": "Te beoordelen",
        "members.bot.filter.suspected": "Verworpen",
        "members.bot.toggle.open": "Bot-account beoordelen",
        "members.bot.toggle.close": "Bot-beoordeling verbergen",
        "members.bot.form.panel_title": "Beheer van Bot-beoordeling",
        "members.bot.form.current_state": "Huidige status",
        "members.bot.form.reason_label": "Reden",
        "members.bot.form.apply": "Toepassen",
        "members.bot.form.clear": "Bot-beoordeling wissen",
        "members.bot.form.search_hint": "Zoek op naam of e-mail van het lid en beperk daarna de lijst met Bot-statussen.",
        "members.bot.form.search_name": "Naam",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "Te beoordelen",
        "members.bot.status.discarded": "Verworpen",
        "members.bot.summary.last_active": "Laatste actieve signaal",
        "members.bot.summary.last_verification": "Verificatie-e-mail",
        "members.bot.badge.excluded": "Uitgesloten van statistieken",
        "members.bot.badge.verify_required": "Inlogverificatie vereist"
    },
    "pl": {
        "members.mode.bot_review": "Przegląd Bot",
        "members.bot.page_title": "Przegląd Bot",
        "members.bot.page_description": "We wczesnej wersji strony StatKISS utworzono wiele kont, które później uznano za podejrzane o automatyczne działanie. Podczas przebudowy strony te rekordy najpierw zachowano, a następnie stopniowo je przeglądano. Użyj tej strony, aby kontynuować ten przegląd.",
        "members.bot.filter.title": "Wyszukiwanie i status Bot",
        "members.bot.filter.review": "Do przeglądu",
        "members.bot.filter.suspected": "Odrzucone",
        "members.bot.toggle.open": "Przegląd konta Bot",
        "members.bot.toggle.close": "Ukryj przegląd Bot",
        "members.bot.form.panel_title": "Zarządzanie przeglądem Bot",
        "members.bot.form.current_state": "Bieżący stan",
        "members.bot.form.reason_label": "Powód",
        "members.bot.form.apply": "Zastosuj",
        "members.bot.form.clear": "Wyczyść przegląd Bot",
        "members.bot.form.search_hint": "Szukaj po nazwie członka lub e-mailu, a następnie zawęź listę według statusów Bot.",
        "members.bot.form.search_name": "Nazwa",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "Do przeglądu",
        "members.bot.status.discarded": "Odrzucone",
        "members.bot.summary.last_active": "Ostatni sygnał aktywności",
        "members.bot.summary.last_verification": "E-mail weryfikacyjny",
        "members.bot.badge.excluded": "Wykluczone ze statystyk",
        "members.bot.badge.verify_required": "Wymagana weryfikacja logowania"
    },
    "sv": {
        "members.mode.bot_review": "Bot-granskning",
        "members.bot.page_title": "Bot-granskning",
        "members.bot.page_description": "På den tidiga StatKISS-sajten skapades många konton som senare misstänktes vara automatiserade. När sajten byggdes om bevarades dessa poster först och har sedan granskats stegvis. Använd denna sida för att fortsätta den granskningen.",
        "members.bot.filter.title": "Sökning och Bot-status",
        "members.bot.filter.review": "Behöver granskas",
        "members.bot.filter.suspected": "Kasserad",
        "members.bot.toggle.open": "Granska Bot-konto",
        "members.bot.toggle.close": "Dölj Bot-granskning",
        "members.bot.form.panel_title": "Hantering av Bot-granskning",
        "members.bot.form.current_state": "Aktuellt läge",
        "members.bot.form.reason_label": "Orsak",
        "members.bot.form.apply": "Använd",
        "members.bot.form.clear": "Rensa Bot-granskning",
        "members.bot.form.search_hint": "Sök efter medlemsnamn eller e-post och begränsa sedan listan med Bot-statusar.",
        "members.bot.form.search_name": "Namn",
        "members.bot.form.search_email": "E-post",
        "members.bot.status.review_queue": "Behöver granskas",
        "members.bot.status.discarded": "Kasserad",
        "members.bot.summary.last_active": "Senaste aktiva signal",
        "members.bot.summary.last_verification": "Verifieringsmejl",
        "members.bot.badge.excluded": "Utesluten från statistik",
        "members.bot.badge.verify_required": "Inloggningsverifiering krävs"
    },
    "tr": {
        "members.mode.bot_review": "Bot incelemesi",
        "members.bot.page_title": "Bot incelemesi",
        "members.bot.page_description": "StatKISS’in ilk sitesinde daha sonra otomatik olduğu düşünülen birçok hesap oluşturuldu. Site yenilenirken bu kayıtlar önce korundu ve ardından kademeli olarak incelendi. Bu inceleme çalışmasını sürdürmek için bu sayfayı kullanın.",
        "members.bot.filter.title": "Arama ve Bot durumu",
        "members.bot.filter.review": "İncelenecek",
        "members.bot.filter.suspected": "Atıldı",
        "members.bot.toggle.open": "Bot hesabını incele",
        "members.bot.toggle.close": "Bot incelemesini gizle",
        "members.bot.form.panel_title": "Bot inceleme yönetimi",
        "members.bot.form.current_state": "Geçerli durum",
        "members.bot.form.reason_label": "Gerekçe",
        "members.bot.form.apply": "Uygula",
        "members.bot.form.clear": "Bot incelemesini temizle",
        "members.bot.form.search_hint": "Üye adı veya e-posta ile arayın, ardından listeyi Bot durumlarıyla daraltın.",
        "members.bot.form.search_name": "Ad",
        "members.bot.form.search_email": "E-posta",
        "members.bot.status.review_queue": "İncelenecek",
        "members.bot.status.discarded": "Atıldı",
        "members.bot.summary.last_active": "Son aktif sinyal",
        "members.bot.summary.last_verification": "Doğrulama e-postası",
        "members.bot.badge.excluded": "İstatistiklerden hariç",
        "members.bot.badge.verify_required": "Giriş doğrulaması gerekli"
    },
    "uk": {
        "members.mode.bot_review": "Перевірка Bot",
        "members.bot.page_title": "Перевірка Bot",
        "members.bot.page_description": "На ранньому сайті StatKISS було створено багато облікових записів, які згодом стали підозрюватися як автоматичні. Під час оновлення сайту ці записи спочатку зберегли, а потім поступово перевіряли. Використовуйте цю сторінку, щоб продовжити цю перевірку.",
        "members.bot.filter.title": "Пошук і статус Bot",
        "members.bot.filter.review": "Потребує перевірки",
        "members.bot.filter.suspected": "Відкинуто",
        "members.bot.toggle.open": "Перевірити акаунт Bot",
        "members.bot.toggle.close": "Сховати перевірку Bot",
        "members.bot.form.panel_title": "Керування перевіркою Bot",
        "members.bot.form.current_state": "Поточний стан",
        "members.bot.form.reason_label": "Підстава",
        "members.bot.form.apply": "Застосувати",
        "members.bot.form.clear": "Очистити перевірку Bot",
        "members.bot.form.search_hint": "Шукайте за ім’ям учасника або e-mail, а потім звужуйте список за статусами Bot.",
        "members.bot.form.search_name": "Ім’я",
        "members.bot.form.search_email": "E-mail",
        "members.bot.status.review_queue": "Потребує перевірки",
        "members.bot.status.discarded": "Відкинуто",
        "members.bot.summary.last_active": "Останній активний сигнал",
        "members.bot.summary.last_verification": "Лист підтвердження",
        "members.bot.badge.excluded": "Виключено зі статистики",
        "members.bot.badge.verify_required": "Потрібна перевірка входу"
    }
};

    window.StatKISS_ADMIN_I18N.register('members_bot_multilang_refresh_20260412h', override);

    try {
        const bundles = window.StatKISS_ADMIN_I18N.bundles || {};
        Object.keys(override).forEach((langCode) => {
            const langDict = override[langCode] || {};
            Object.keys(langDict).forEach((key) => {
                Object.keys(bundles).forEach((bundleName) => {
                    const bundle = bundles[bundleName] || {};
                    if (bundle[langCode]) {
                        bundle[langCode][key] = langDict[key];
                    }
                });
            });
        });
    } catch (error) {
        console.warn('members_bot_multilang_refresh_20260412h override failed', error);
    }
})();


// ===== Bot quick-action / autosave copy refresh 2026-04-12j =====
;(function () {
    if (!window.StatKISS_ADMIN_I18N || typeof window.StatKISS_ADMIN_I18N.register !== 'function') {
        return;
    }

    const langs = ['en','ko','ja','zh-Hans','zh-Hant','es','fr','de','pt-BR','ru','id','vi','th','ms','fil','hi','ar','it','nl','pl','sv','tr','uk'];
    const override = {};
    langs.forEach((code) => {
        override[code] = {
            'members.bot.action.mark_review': 'Suspect as Bot',
            'members.bot.action.mark_suspected': 'Discard',
            'members.bot.form.clear': 'Clear Bot',
            'members.bot.confirm.mark_review': 'Mark this account as a suspected Bot account?',
            'members.bot.confirm.mark_suspected': 'Move this account to the discarded Bot state?',
            'members.bot.form.reason_saved': 'The content has been updated.',
        };
    });

    override.ko = {
        'members.bot.action.mark_review': 'Bot으로 의심',
        'members.bot.action.mark_suspected': '버림',
        'members.bot.form.clear': 'Bot 해제',
        'members.bot.confirm.mark_review': '이 계정을 Bot 의심 상태로 두시겠습니까?',
        'members.bot.confirm.mark_suspected': '이 계정을 버림 상태로 두시겠습니까?',
        'members.bot.form.reason_saved': '내용이 업데이트 되었습니다.',
    };

    window.StatKISS_ADMIN_I18N.register('members_bot_quick_action_20260412j', override);

    try {
        const bundles = window.StatKISS_ADMIN_I18N.bundles || {};
        Object.keys(override).forEach((langCode) => {
            const langDict = override[langCode] || {};
            Object.keys(langDict).forEach((key) => {
                Object.keys(bundles).forEach((bundleName) => {
                    const bundle = bundles[bundleName] || {};
                    if (bundle[langCode] && Object.prototype.hasOwnProperty.call(bundle[langCode], key)) {
                        bundle[langCode][key] = langDict[key];
                    }
                });
            });
        });
    } catch (error) {
        console.warn('members_bot_quick_action_20260412j override failed', error);
    }
})();
