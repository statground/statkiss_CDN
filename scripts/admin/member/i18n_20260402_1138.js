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
