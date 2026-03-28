(function () {
    const membershipI18n = window.StatKISS_MembershipI18N
    if (membershipI18n && membershipI18n.dict) {
        membershipI18n.dict.en = membershipI18n.dict.en || {}
        membershipI18n.dict.ko = membershipI18n.dict.ko || {}
        Object.assign(membershipI18n.dict.en, {
            'alert.student_submit_pending': 'Your Student Member application has been submitted. Please wait for admin approval.',
            'alert.student_pending_exists': 'Your Student Member application is already pending approval.',
            'alert.student_already_member': 'You are already an active Student Member.',
            'alert.student_submit_failed': 'We could not submit the Student Member application.',
            'alert.student_signin_required': 'Please sign in before applying for Student Member.'
        })
        Object.assign(membershipI18n.dict.ko, {
            'alert.student_submit_pending': 'Student Member 신청이 접수되었습니다. 관리자 승인을 기다려주세요.',
            'alert.student_pending_exists': '이미 Student Member 신청이 접수되어 승인 대기 중입니다.',
            'alert.student_already_member': '이미 활성 Student Member입니다.',
            'alert.student_submit_failed': 'Student Member 신청을 처리하지 못했습니다.',
            'alert.student_signin_required': 'Student Member 신청 전에 먼저 로그인해주세요.'
        })
        if (typeof membershipI18n.normalizeCoverage === 'function') {
            membershipI18n.normalizeCoverage()
        }
    }

    function membershipPatchBuildPath(base, path) {
        const baseText = String(base || '/').replace(/\/+$/, '')
        const pathText = String(path || '').replace(/^\/+/, '')
        return (baseText === '' ? '/' : baseText + '/') + pathText
    }

    function membershipPatchResolveBasePath() {
        const pathname = window.location && window.location.pathname ? window.location.pathname : '/'
        const marker = '/membership/'
        const markerIndex = pathname.indexOf(marker)
        if (markerIndex !== -1) {
            return pathname.slice(0, markerIndex + marker.length)
        }

        const codes = membershipI18n && Array.isArray(membershipI18n.languages)
            ? membershipI18n.languages.map(item => item && item.code ? String(item.code) : '').filter(Boolean)
            : []
        const firstSegment = pathname.replace(/^\/+/, '').split('/')[0]
        const localePrefix = codes.indexOf(firstSegment) !== -1 ? '/' + firstSegment + '/' : '/'
        return membershipPatchBuildPath(localePrefix, 'membership/')
    }

    function membershipPatchBuildUrl(path) {
        return membershipPatchBuildPath(membershipPatchResolveBasePath(), path)
    }

    function membershipPatchT(key) {
        if (!membershipI18n || typeof membershipI18n.t !== 'function') {
            return key
        }
        const lang = typeof membershipI18n.getCurrentLang === 'function' ? membershipI18n.getCurrentLang() : 'en'
        return membershipI18n.t(lang, key)
    }

    window.click_btn_register_student = async function click_btn_register_student() {
        try {
            const response = await fetch(membershipPatchBuildUrl('ajax_add_student_membership/'), {
                method: 'GET',
                credentials: 'same-origin',
            })
            const data = await response.json()

            if (data && data.checker === 'UNAUTHORIZED') {
                alert(membershipPatchT('alert.student_signin_required'))
                return
            }
            if (data && data.checker === 'ALREADY_MEMBER') {
                alert(membershipPatchT('alert.student_already_member'))
                return
            }
            if (data && data.submitted) {
                alert(membershipPatchT('alert.student_submit_pending'))
                return
            }
            if (data && data.pending_role) {
                alert(membershipPatchT('alert.student_pending_exists'))
                return
            }

            alert(membershipPatchT('alert.student_submit_failed'))
        } catch (error) {
            console.error(error)
            alert(membershipPatchT('alert.student_submit_failed'))
        }
    }
})()
