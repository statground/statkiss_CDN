window.StatKISS_ADMIN_I18N.register('members_management_expiry_patch', {
    en: {
        'members.expiry.never': 'Lifetime — never expires',
        'members.expiry.dialog.title.role': 'Set membership expiry',
        'members.expiry.dialog.title.addon': 'Set add-on expiry',
        'members.expiry.dialog.title.pending_student': 'Approve Student Member',
        'members.expiry.dialog.description.role': 'Pick an expiry date from the calendar or type it manually.',
        'members.expiry.dialog.description.addon': 'Pick an add-on expiry date from the calendar or type it manually.',
        'members.expiry.dialog.description.pending_student': 'Choose the Student Member expiry date for this approval.',
        'members.expiry.dialog.input_calendar': 'Calendar',
        'members.expiry.dialog.input_text': 'Date text',
        'members.expiry.dialog.placeholder': 'YYYY-MM-DD',
        'members.expiry.dialog.default_hint': 'Default: one year from today',
        'members.expiry.dialog.confirm': 'Confirm',
        'members.expiry.dialog.cancel': 'Cancel',
        'members.expiry.dialog.invalid_date': 'Please enter a valid date in YYYY-MM-DD format.',
        'members.count.pending_student': '{count} pending Student Member request(s)',
        'members.pending.review': 'Review pending requests',
        'members.pending.review_hint': 'Pending Student Member requests are waiting for admin approval.',
        'members.confirm.reject_student': 'Do you want to reject this pending Student Member request?'
    },
    ko: {
        'members.expiry.never': '평생 만료되지 않음',
        'members.expiry.dialog.title.role': '멤버십 만료일 설정',
        'members.expiry.dialog.title.addon': '부가 멤버십 만료일 설정',
        'members.expiry.dialog.title.pending_student': '학생회원 승인',
        'members.expiry.dialog.description.role': '달력에서 만료일을 선택하거나 직접 날짜를 입력하세요.',
        'members.expiry.dialog.description.addon': '달력에서 부가 멤버십 만료일을 선택하거나 직접 날짜를 입력하세요.',
        'members.expiry.dialog.description.pending_student': '학생회원 승인에 사용할 만료일을 선택하세요.',
        'members.expiry.dialog.input_calendar': '달력',
        'members.expiry.dialog.input_text': '날짜 입력',
        'members.expiry.dialog.placeholder': 'YYYY-MM-DD',
        'members.expiry.dialog.default_hint': '기본값: 오늘 기준 1년 후',
        'members.expiry.dialog.confirm': '확인',
        'members.expiry.dialog.cancel': '취소',
        'members.expiry.dialog.invalid_date': 'YYYY-MM-DD 형식의 올바른 날짜를 입력하세요.',
        'members.count.pending_student': '대기 중인 Student Member 신청 {count}건',
        'members.pending.review': '대기 신청 검토',
        'members.pending.review_hint': '대기 중인 Student Member 신청이 관리자 승인을 기다리고 있습니다.',
        'members.confirm.reject_student': '이 Student Member 대기 신청을 반려하시겠습니까?'
    }
})

var member_pending_student_counter = typeof member_pending_student_counter === 'number' ? member_pending_student_counter : 0

function member_patch_pad_date_part(value) {
    return String(value).padStart(2, '0')
}

function member_patch_get_seoul_today_parts() {
    try {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        const partMap = {}
        formatter.formatToParts(new Date()).forEach(part => {
            if (part && part.type) {
                partMap[part.type] = part.value
            }
        })
        return {
            year: Number(partMap.year),
            month: Number(partMap.month),
            day: Number(partMap.day),
        }
    } catch (error) {
        const today = new Date()
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
        }
    }
}

function member_patch_default_expiry_date() {
    const today = member_patch_get_seoul_today_parts()
    const targetYear = today.year + 1
    const targetMonth = today.month
    const maxDay = new Date(targetYear, targetMonth, 0).getDate()
    const targetDay = Math.min(today.day, maxDay)
    return [targetYear, member_patch_pad_date_part(targetMonth), member_patch_pad_date_part(targetDay)].join('-')
}

function member_patch_normalize_expiry_date(value) {
    const text = String(value || '').trim().slice(0, 10)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
        return ''
    }

    const parts = text.split('-').map(Number)
    const year = parts[0]
    const month = parts[1]
    const day = parts[2]
    const parsed = new Date(year, month - 1, day)

    if (
        Number.isNaN(parsed.getTime()) ||
        parsed.getFullYear() !== year ||
        parsed.getMonth() !== month - 1 ||
        parsed.getDate() !== day
    ) {
        return ''
    }

    return text
}

function member_patch_is_never_expire(roleName, expiredAt) {
    const roleText = String(roleName || '').trim()
    const dateText = String(expiredAt || '').trim()
    return roleText === 'Lifetime Member' || dateText.indexOf('9999-12-31') === 0 || dateText.indexOf('2299-12-31') === 0
}

function member_patch_is_addon_active(currentRole) {
    const currentText = String(currentRole || '').trim()
    return currentText === '1' || currentText.toLowerCase() === 'true' || currentText === 'KSS Joint Member'
}

function member_patch_focus_pending_students() {
    const checkbox = document.getElementById('check_member_pending_student')
    if (checkbox) {
        checkbox.checked = true
    }
    const filterTarget = document.getElementById('div_member_search_filter')
    if (filterTarget && typeof filterTarget.scrollIntoView === 'function') {
        filterTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    get_member_list('search')
}

function member_patch_open_expiry_dialog(options) {
    const opts = options || {}
    const themeMode = member_patch_get_theme_mode()
    const palette = member_management_get_palette(themeMode)
    const defaultDate = member_patch_normalize_expiry_date(opts.defaultDate) || member_patch_default_expiry_date()

    return new Promise(resolve => {
        const overlay = document.createElement('div')
        overlay.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/70 p-4'

        const card = document.createElement('div')
        card.className = (palette.panel || '') + ' w-full max-w-lg space-y-5'

        const headerWrap = document.createElement('div')
        headerWrap.className = 'space-y-2'

        const title = document.createElement('h3')
        title.className = 'text-xl font-bold ' + (palette.heading || '')
        title.textContent = opts.title || admin_t('members.expiry.dialog.title.role')

        const description = document.createElement('p')
        description.className = 'text-sm ' + (palette.muted || '')
        description.textContent = opts.description || admin_t('members.expiry.dialog.description.role')

        headerWrap.appendChild(title)
        headerWrap.appendChild(description)

        const bodyWrap = document.createElement('div')
        bodyWrap.className = 'space-y-4'

        const calendarLabel = document.createElement('label')
        calendarLabel.className = 'flex flex-col gap-2'
        const calendarLabelText = document.createElement('span')
        calendarLabelText.className = 'text-sm font-medium ' + (palette.body || '')
        calendarLabelText.textContent = admin_t('members.expiry.dialog.input_calendar')
        const dateInput = document.createElement('input')
        dateInput.type = 'date'
        dateInput.value = defaultDate
        dateInput.className = palette.input || ''
        calendarLabel.appendChild(calendarLabelText)
        calendarLabel.appendChild(dateInput)

        const textLabel = document.createElement('label')
        textLabel.className = 'flex flex-col gap-2'
        const textLabelText = document.createElement('span')
        textLabelText.className = 'text-sm font-medium ' + (palette.body || '')
        textLabelText.textContent = admin_t('members.expiry.dialog.input_text')
        const textInput = document.createElement('input')
        textInput.type = 'text'
        textInput.value = defaultDate
        textInput.placeholder = admin_t('members.expiry.dialog.placeholder')
        textInput.className = palette.input || ''
        textLabel.appendChild(textLabelText)
        textLabel.appendChild(textInput)

        const hint = document.createElement('p')
        hint.className = 'text-xs ' + (palette.muted || '')
        hint.textContent = admin_t('members.expiry.dialog.default_hint') + ': ' + defaultDate

        bodyWrap.appendChild(calendarLabel)
        bodyWrap.appendChild(textLabel)
        bodyWrap.appendChild(hint)

        const actionWrap = document.createElement('div')
        actionWrap.className = 'flex flex-col gap-3 sm:flex-row sm:justify-end'

        const cancelBtn = document.createElement('button')
        cancelBtn.type = 'button'
        cancelBtn.className = palette.secondaryBtn || ''
        cancelBtn.textContent = admin_t('members.expiry.dialog.cancel')

        const confirmBtn = document.createElement('button')
        confirmBtn.type = 'button'
        confirmBtn.className = palette.primaryBtn || ''
        confirmBtn.textContent = admin_t('members.expiry.dialog.confirm')

        actionWrap.appendChild(cancelBtn)
        actionWrap.appendChild(confirmBtn)

        card.appendChild(headerWrap)
        card.appendChild(bodyWrap)
        card.appendChild(actionWrap)
        overlay.appendChild(card)
        document.body.appendChild(overlay)

        const cleanup = (result) => {
            document.removeEventListener('keydown', onKeyDown)
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay)
            }
            resolve(result)
        }

        const syncDateToText = () => {
            if (dateInput.value) {
                textInput.value = dateInput.value
            }
        }

        const syncTextToDate = () => {
            const normalized = member_patch_normalize_expiry_date(textInput.value)
            if (normalized) {
                dateInput.value = normalized
            }
        }

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                cleanup(null)
                return
            }
            if (event.key === 'Enter') {
                event.preventDefault()
                confirmBtn.click()
            }
        }

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                cleanup(null)
            }
        })
        dateInput.addEventListener('input', syncDateToText)
        textInput.addEventListener('input', syncTextToDate)
        cancelBtn.addEventListener('click', () => cleanup(null))
        confirmBtn.addEventListener('click', () => {
            const normalized = member_patch_normalize_expiry_date(textInput.value || dateInput.value)
            if (!normalized) {
                alert(admin_t('members.expiry.dialog.invalid_date'))
                textInput.focus()
                return
            }
            cleanup(normalized)
        })
        document.addEventListener('keydown', onKeyDown)

        window.setTimeout(() => {
            dateInput.focus()
            try {
                dateInput.showPicker && dateInput.showPicker()
            } catch (error) {
            }
        }, 0)
    })
}

function member_patch_request_role_expiry(roleName) {
    if (roleName === 'Lifetime Member') {
        return Promise.resolve('9999-12-31')
    }
    if (roleName === 'Non-member') {
        return Promise.resolve('')
    }
    return member_patch_open_expiry_dialog({
        title: admin_t('members.expiry.dialog.title.role'),
        description: admin_t('members.expiry.dialog.description.role'),
        defaultDate: member_patch_default_expiry_date(),
    })
}

function member_patch_request_addon_expiry() {
    return member_patch_open_expiry_dialog({
        title: admin_t('members.expiry.dialog.title.addon'),
        description: admin_t('members.expiry.dialog.description.addon'),
        defaultDate: member_patch_default_expiry_date(),
    })
}

function member_patch_request_pending_student_expiry() {
    return member_patch_open_expiry_dialog({
        title: admin_t('members.expiry.dialog.title.pending_student'),
        description: admin_t('members.expiry.dialog.description.pending_student'),
        defaultDate: member_patch_default_expiry_date(),
    })
}

async function click_btn_change_membership(uuid_user, sel_membership, current_role) {
    if (!uuid_user || !sel_membership || sel_membership === current_role) {
        return
    }
    if (current_role === 'Administrator' || current_role === 'Developer') {
        return
    }
    if (!confirm(admin_t('members.confirm.change_membership'))) {
        return
    }
    if (toggle_btn_change_membership) {
        return
    }

    const expiredAt = await member_patch_request_role_expiry(sel_membership)
    if (sel_membership !== 'Lifetime Member' && sel_membership !== 'Non-member' && !expiredAt) {
        return
    }

    toggle_btn_change_membership = true
    try {
        const request_data = new FormData()
        request_data.append('uuid_user', uuid_user)
        request_data.append('sel_membership', sel_membership)
        request_data.append('current_role', current_role)
        request_data.append('expired_at', expiredAt || '')

        await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data,
        })

        await get_member_summary()
        await get_member_list('search')
    } catch (error) {
        console.error(error)
        alert((error && error.message) ? error.message : admin_t('members.load_error'))
    } finally {
        toggle_btn_change_membership = false
    }
}

async function click_btn_change_membership_addon(uuid_user, sel_membership, current_role) {
    if (!uuid_user || !sel_membership) {
        return
    }
    if (!confirm(admin_t('members.confirm.change_membership_addon'))) {
        return
    }
    if (toggle_btn_change_membership) {
        return
    }

    let expiredAt = ''
    if (!member_patch_is_addon_active(current_role)) {
        expiredAt = await member_patch_request_addon_expiry()
        if (!expiredAt) {
            return
        }
    }

    toggle_btn_change_membership = true
    try {
        const request_data = new FormData()
        request_data.append('uuid_user', uuid_user)
        request_data.append('sel_membership', sel_membership)
        request_data.append('current_role', current_role)
        request_data.append('expired_at', expiredAt || '')

        await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership_addon/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data,
        })

        await get_member_summary()
        await get_member_list('search')
    } catch (error) {
        console.error(error)
        alert((error && error.message) ? error.message : admin_t('members.load_error'))
    } finally {
        toggle_btn_change_membership = false
    }
}

async function click_btn_pending_student(email) {
    if (!email) {
        return
    }

    let val_yesno = ''
    let expiredAt = ''

    if (confirm(admin_t('members.confirm.approve_student'))) {
        val_yesno = 'YES'
        expiredAt = await member_patch_request_pending_student_expiry()
        if (!expiredAt) {
            return
        }
    } else if (confirm(admin_t('members.confirm.reject_student'))) {
        val_yesno = 'NO'
    } else {
        return
    }

    try {
        const request_data = new FormData()
        request_data.append('email', email)
        request_data.append('val_yesno', val_yesno)
        request_data.append('expired_at', expiredAt || '')

        await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_pending_student/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data,
        })

        await get_member_summary()
        await get_member_list('search')
    } catch (error) {
        console.error(error)
        alert((error && error.message) ? error.message : admin_t('members.load_error'))
    }
}

async function get_member_list(mode) {
    toggle_page = true

    if (mode == 'init') {
        page_num = 1
        gv_member_list_pages = {}
        ReactDOM.render(<Div_member_list_skeleton />, document.getElementById('div_member_list'))
        ReactDOM.render(<Div_member_count_skeleton />, document.getElementById('div_member_count'))

        document.getElementById('check_member_admin').checked = true
        document.getElementById('check_member_lifetime').checked = true
        document.getElementById('check_member_regular').checked = true
        document.getElementById('check_member_spouse').checked = true
        document.getElementById('check_member_student').checked = true
        document.getElementById('check_member_member').checked = true
        document.getElementById('check_member_addon_none').checked = true
        document.getElementById('check_member_addon_kssjoint').checked = true
    } else if (mode == 'search') {
        page_num = 1
        gv_member_list_pages = {}
        ReactDOM.render(<Div_member_list_skeleton />, document.getElementById('div_member_list'))
        ReactDOM.render(<Div_member_count_skeleton />, document.getElementById('div_member_count'))
    } else {
        page_num += 1
        ReactDOM.render(<Div_member_list_skeleton />, document.getElementById('div_member_list_' + page_num.toString()))
    }

    try {
        txt_name = document.getElementById('txt_name').value.trim()
        txt_email = document.getElementById('txt_email').value.trim()

        check_member_admin = document.getElementById('check_member_admin').checked ? 'YES' : 'NO'
        check_member_lifetime = document.getElementById('check_member_lifetime').checked ? 'YES' : 'NO'
        check_member_regular = document.getElementById('check_member_regular').checked ? 'YES' : 'NO'
        check_member_spouse = document.getElementById('check_member_spouse').checked ? 'YES' : 'NO'
        check_member_student = document.getElementById('check_member_student').checked ? 'YES' : 'NO'
        check_member_member = document.getElementById('check_member_member').checked ? 'YES' : 'NO'
        check_member_addon_none = document.getElementById('check_member_addon_none').checked ? 'YES' : 'NO'
        check_member_addon_kssjoint = document.getElementById('check_member_addon_kssjoint').checked ? 'YES' : 'NO'
        check_member_pending_student = document.getElementById('check_member_pending_student').checked ? 'YES' : 'NO'

        const request_data = new FormData()
        request_data.append('page', page_num)
        request_data.append('txt_name', txt_name)
        request_data.append('txt_email', txt_email)
        request_data.append('check_member_admin', check_member_admin)
        request_data.append('check_member_lifetime', check_member_lifetime)
        request_data.append('check_member_regular', check_member_regular)
        request_data.append('check_member_spouse', check_member_spouse)
        request_data.append('check_member_student', check_member_student)
        request_data.append('check_member_member', check_member_member)
        request_data.append('check_member_addon_none', check_member_addon_none)
        request_data.append('check_member_addon_kssjoint', check_member_addon_kssjoint)
        request_data.append('check_member_pending_student', check_member_pending_student)

        const data = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_get_member_list/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data,
        })

        member_counter = member_patch_safe_number(data && data.count ? data.count.cnt : 0)
        member_pending_student_counter = member_patch_safe_number(data && data.count ? data.count.pending_student_cnt : 0)
        gv_member_list_pages[page_num] = Array.isArray(data && data.list) ? data.list : Object.values((data && data.list) || {})

        if (mode == 'init' || mode == 'search') {
            ReactDOM.render(<Div_member_list data={data['list']} />, document.getElementById('div_member_list'))
            ReactDOM.render(
                <Div_member_count count={member_counter} pendingStudentCount={member_pending_student_counter} />,
                document.getElementById('div_member_count')
            )
        } else {
            ReactDOM.render(<Div_member_list data={data['list']} />, document.getElementById('div_member_list_' + page_num.toString()))
        }
    } catch (error) {
        console.error(error)
        alert((error && error.message) ? error.message : admin_t('members.load_error'))
    } finally {
        toggle_page = false
    }
}

function Div_member_list_membership(props) {
    const themeMode = props.themeMode || member_patch_get_theme_mode()
    const isDark = themeMode === 'dark'
    const inactiveClass = isDark
        ? 'border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
    const lockedClass = isDark
        ? 'border border-slate-700 bg-slate-900 text-slate-500 cursor-default'
        : 'border border-slate-200 bg-white text-slate-400 cursor-default'
    const showNeverExpire = member_patch_is_never_expire(props.current_role, props.role_expired_at)

    const renderRole = (roleName) => {
        const isActive = props.current_role == roleName
        const isLocked = roleName === 'Administrator' || roleName === 'Developer'
        const className = isActive
            ? 'inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ' + member_management_role_tone(roleName, themeMode)
            : 'inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition ' + (isLocked ? lockedClass : inactiveClass)

        return (
            <button
                type="button"
                id={'membership_' + roleName.toLowerCase().replace(/[^a-z]/g, '_') + '_' + props.uuid_user}
                class={className}
                disabled={isLocked}
                onClick={() => {
                    if (!isActive && !isLocked) {
                        click_btn_change_membership(props.uuid_user, roleName, props.current_role)
                    }
                }}>
                {admin_role_label(roleName)}
            </button>
        )
    }

    return (
        <div class="w-full space-y-3">
            <div class="flex flex-wrap gap-2">
                {renderRole('Lifetime Member')}
                {renderRole('Regular Member')}
                {renderRole('Spouse Member')}
                {renderRole('Student Member')}
                {renderRole('Non-member')}
                {renderRole('Administrator')}
                {renderRole('Developer')}
            </div>

            {showNeverExpire ? (
                <p class="text-xs font-medium text-emerald-500">
                    {admin_t('members.expiry.never')}
                </p>
            ) : props.role_expired_at ? (
                <p class="text-xs font-medium text-rose-500">
                    {admin_t('admin.common.expired_on', { date: props.role_expired_at })}
                </p>
            ) : null}
        </div>
    )
}

function Div_member_list_membership_addon(props) {
    const themeMode = props.themeMode || member_patch_get_theme_mode()
    const isDark = themeMode === 'dark'
    const isActive = props.role_addon_kssjoint == 1 || props.role_addon_kssjoint == '1'
    const className = isActive
        ? 'inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ' + (isDark
            ? 'border-blue-400/35 bg-blue-500/15 text-blue-200'
            : 'border-blue-200 bg-blue-50 text-blue-700')
        : 'inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ' + (isDark
            ? 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300')

    return (
        <div class="w-full space-y-3">
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    id={'membership_addon_kssjoint_' + props.uuid_user}
                    class={className}
                    onClick={() => click_btn_change_membership_addon(props.uuid_user, 'KSS Joint Member', props.role_addon_kssjoint)}>
                    {admin_role_label('KSS Joint Member')}
                </button>
            </div>

            {props.role_addon_kssjoint_expired_at != null ? (
                <p class="text-xs font-medium text-rose-500">
                    {admin_t('admin.common.expired_on', { date: props.role_addon_kssjoint_expired_at })}
                </p>
            ) : null}
        </div>
    )
}

function Div_member_count(props) {
    const palette = member_management_get_palette(member_patch_get_theme_mode())
    const formattedCount = member_patch_format_number(props.count || 0)
    const pendingCount = member_patch_safe_number(props.pendingStudentCount || 0)
    const pendingWrapClass = member_patch_get_theme_mode() === 'dark'
        ? 'rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4'
        : 'rounded-2xl border border-amber-200 bg-amber-50 p-4'
    const pendingTextClass = member_patch_get_theme_mode() === 'dark' ? 'text-amber-100' : 'text-amber-800'
    const pendingMutedClass = member_patch_get_theme_mode() === 'dark' ? 'text-amber-200/80' : 'text-amber-700'

    return (
        <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
            <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div class="space-y-2">
                        <p class={'text-sm font-medium ' + palette.countLabel}>{admin_t('members.count', { count: formattedCount })}</p>
                        <p class={'text-4xl font-extrabold tracking-tight ' + palette.countNumber}>{formattedCount}</p>
                    </div>

                    <div>
                        <button type="button"
                                onClick={() => click_btn_download_list()}
                                class={palette.secondaryBtn}>
                            <img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/button_download.svg" class="w-4 h-4 mr-2" />
                            {admin_t('members.list_download')}
                        </button>
                    </div>
                </div>

                {pendingCount > 0 ? (
                    <div class={pendingWrapClass}>
                        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div class="space-y-1">
                                <p class={'text-sm font-semibold ' + pendingTextClass}>{admin_t('members.count.pending_student', { count: member_patch_format_number(pendingCount) })}</p>
                                <p class={'text-sm ' + pendingMutedClass}>{admin_t('members.pending.review_hint')}</p>
                            </div>
                            <div>
                                <button type="button"
                                        onClick={() => member_patch_focus_pending_students()}
                                        class={palette.primaryBtn}>
                                    {admin_t('members.pending.review')}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

function Div_member_search_filter() {
    const palette = member_management_get_palette(member_patch_get_theme_mode())

    const checkboxItem = (id, label) => (
        <label for={id} class={palette.checkboxItem}>
            <input id={id} type="checkbox" value="" class={palette.checkbox} />
            <span class={'text-sm font-medium ' + palette.body}>{label}</span>
        </label>
    )

    const inputRow = (label, id) => (
        <label class="flex flex-col gap-2">
            <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            <input type="text"
                   id={id}
                   placeholder={label}
                   onKeyDown={(event) => { if (event.key === 'Enter') { click_btn_search() } }}
                   class={palette.input} />
        </label>
    )

    return (
        <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
            <div class="flex flex-col gap-6">
                <div class="space-y-1">
                    <p class={'text-lg font-bold ' + palette.heading}>{admin_t('members.search.title')}</p>
                    <p class={'text-sm ' + palette.muted}>{admin_t('members.title')}</p>
                </div>

                <div class="grid grid-cols-1 gap-4">
                    {inputRow(admin_t('admin.common.name'), 'txt_name')}
                    {inputRow(admin_t('admin.common.email'), 'txt_email')}
                </div>

                <div class="space-y-3">
                    <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership')}</p>
                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {checkboxItem('check_member_admin', admin_t('admin.roles.admin') + ', ' + admin_role_label('Developer'))}
                        {checkboxItem('check_member_lifetime', admin_role_label('Lifetime Member'))}
                        {checkboxItem('check_member_regular', admin_role_label('Regular Member'))}
                        {checkboxItem('check_member_spouse', admin_role_label('Spouse Member'))}
                        {checkboxItem('check_member_student', admin_role_label('Student Member'))}
                        {checkboxItem('check_member_member', admin_role_label('Non-member'))}
                    </div>
                </div>

                <div class="space-y-3">
                    <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership_addon')}</p>
                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {checkboxItem('check_member_addon_none', admin_t('admin.common.none'))}
                        {checkboxItem('check_member_addon_kssjoint', admin_role_label('KSS Joint Member'))}
                    </div>
                </div>

                <div class="space-y-3">
                    <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.pending_membership')}</p>
                    <div class="grid grid-cols-1 gap-3">
                        {checkboxItem('check_member_pending_student', admin_t('members.search.pending_student'))}
                    </div>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <div id="div_btn_search">
                        <Div_btn_search />
                    </div>
                    <button type="button"
                            onClick={() => click_btn_reset_filters()}
                            class={palette.secondaryBtn}>
                        {admin_t('members.search.reset')}
                    </button>
                </div>
            </div>
        </div>
    )
}

function member_patch_rerender_management_from_cache() {
    const filterTarget = document.getElementById('div_member_search_filter')
    const countTarget = document.getElementById('div_member_count')
    const listTarget = document.getElementById('div_member_list')

    if (filterTarget) {
        ReactDOM.render(<Div_member_search_filter />, filterTarget)
    }

    if (countTarget) {
        if (member_counter > 0 || Object.keys(gv_member_list_pages).length > 0 || member_pending_student_counter > 0) {
            ReactDOM.render(<Div_member_count count={member_counter} pendingStudentCount={member_pending_student_counter} />, countTarget)
        } else {
            ReactDOM.render(<Div_member_count_skeleton />, countTarget)
        }
    }

    if (listTarget) {
        const rows = member_patch_get_cached_member_rows()
        if (rows.length > 0) {
            ReactDOM.render(<Div_member_list data={rows} />, listTarget)
        } else {
            ReactDOM.render(<Div_member_list_skeleton />, listTarget)
        }
    }
}
