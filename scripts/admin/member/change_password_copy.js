function member_password_link_normalize(url) {
    const raw = String(url || '').trim()
    if (!raw) {
        return ''
    }

    try {
        const parsed = new URL(raw, window.location.origin)
        const segments = parsed.pathname.split('/').filter(Boolean)
        if (!segments.length) {
            return raw
        }

        let offset = 0
        let langPrefix = ''
        if (segments[0] !== 'account') {
            langPrefix = '/' + segments[0]
            offset = 1
        }

        const expected = segments.slice(offset)
        if (expected.length >= 3 && expected[0] === 'account' && expected[1] === 'change_password' && expected[2] === 'auth') {
            parsed.pathname = langPrefix + '/account/change_password/'
            if (!parsed.searchParams.get('mode')) {
                parsed.searchParams.set('mode', 'auth')
            }
        }

        return parsed.toString()
    } catch (error) {
        return raw.replace('/account/change_password/auth/?', '/account/change_password/?mode=auth&')
    }
}

async function member_password_link_copy(url) {
    const value = String(url || '').trim()
    if (!value) {
        return false
    }

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(value)
            return true
        } catch (error) {
            // fall through
        }
    }

    try {
        const textarea = document.createElement('textarea')
        textarea.value = value
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.top = '-9999px'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        const copied = document.execCommand('copy')
        document.body.removeChild(textarea)
        return Boolean(copied)
    } catch (error) {
        return false
    }
}

function member_password_link_unavailable_notice(target) {
    if (!target) {
        return
    }

    const themeMode = member_patch_get_theme_mode()
    const isDark = themeMode === 'dark'

    target.className = 'mt-2 w-full'
    target.innerHTML = ''

    const wrap = document.createElement('div')
    wrap.className = isDark
        ? 'rounded-xl border border-rose-900/50 bg-rose-950/30 px-3 py-3 text-xs text-rose-200'
        : 'rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-xs text-rose-700'
    wrap.textContent = admin_t('members.password_link.unavailable')
    target.appendChild(wrap)
}

function member_password_link_notice(target, url, copied) {
    if (!target) {
        return
    }

    const themeMode = member_patch_get_theme_mode()
    const palette = member_management_get_palette(themeMode)
    const isDark = themeMode === 'dark'

    target.className = 'mt-2 w-full'
    target.innerHTML = ''

    const wrap = document.createElement('div')
    wrap.className = isDark
        ? 'rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3 text-xs'
        : 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs'

    const status = document.createElement('p')
    status.className = copied
        ? (isDark ? 'font-semibold text-emerald-300' : 'font-semibold text-emerald-700')
        : (isDark ? 'font-semibold text-amber-300' : 'font-semibold text-amber-700')
    status.textContent = copied
        ? admin_t('members.password_link.copied')
        : admin_t('members.password_link.copy_failed')
    wrap.appendChild(status)

    const deliver = document.createElement('p')
    deliver.className = 'mt-2 ' + palette.muted
    deliver.textContent = admin_t('members.password_link.deliver_to_member')
    wrap.appendChild(deliver)

    const warning = document.createElement('p')
    warning.className = 'mt-2 ' + palette.dangerText
    warning.textContent = admin_t('members.password_link.warning')
    wrap.appendChild(warning)

    if (!copied && url) {
        const code = document.createElement('code')
        code.className = isDark
            ? 'mt-3 block break-all rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-[11px] text-slate-200'
            : 'mt-3 block break-all rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700'
        code.textContent = url
        wrap.appendChild(code)
    }

    target.appendChild(wrap)
}

async function click_btn_like_change_password(email) {
    const request_data = new FormData()
    request_data.append('email', email)

    const target = document.getElementById('div_member_list_btn_change_password_' + email)
    if (target) {
        target.className = 'mt-2 w-full'
        target.innerHTML = ''
    }

    let data = null
    try {
        data = await fetch(admin_build_url('/admin/ajax_get_change_password_link/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data
        })
        .then((res) => res.json())
    } catch (error) {
        if (target) {
            member_password_link_unavailable_notice(target)
        }
        alert((error && error.message) ? error.message : admin_t('members.password_link.unavailable'))
        return
    }

    const normalizedUrl = member_password_link_normalize(data && data.url)
    if (!normalizedUrl) {
        if (target) {
            member_password_link_unavailable_notice(target)
        }
        alert(admin_t('members.password_link.unavailable'))
        return
    }

    const copied = await member_password_link_copy(normalizedUrl)
    if (target) {
        member_password_link_notice(target, normalizedUrl, copied)
    }

    const alertLines = [
        copied ? admin_t('members.password_link.copied') : admin_t('members.password_link.copy_failed'),
        admin_t('members.password_link.deliver_to_member'),
        admin_t('members.password_link.warning')
    ]
    alert(alertLines.join('\n\n'))
}
