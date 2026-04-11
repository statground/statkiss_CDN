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
