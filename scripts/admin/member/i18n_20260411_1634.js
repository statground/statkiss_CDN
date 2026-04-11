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
