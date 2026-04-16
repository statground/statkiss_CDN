(function () {
    if (!window.StatKISS_ADMIN_I18N || typeof window.StatKISS_ADMIN_I18N.register !== 'function') {
        return;
    }

    window.StatKISS_ADMIN_I18N.register('members_core_20260403_1205', {
        en: {
            'members.title': 'Member Management',
            'members.description': 'Search members, review signups, adjust memberships, and export filtered results.',
            'members.summary.membership': 'Membership',
            'members.summary.signed_up': 'Signed Up',
            'members.count': 'Member Count: {count}',
            'members.count.pending_student': 'Pending student applications: {count}',
            'members.list_download': 'Download List',
            'members.list_download_preparing': 'Preparing file…',
            'members.search.title': 'Search Filters',
            'members.search.clear_all': 'Clear all',
            'members.search.select_all': 'Select all',
            'members.search.reset': 'Reset Filters',
            'members.search.pending_student': 'Applied for Student Membership',
            'members.search.officer': 'Officer',
            'members.search.officer_yes': 'Officer only',
            'members.search.officer_no': 'Non-officer only',
            'members.card.change_password': 'Change Password',
            'members.card.joined_at': 'Joined at {date}',
            'members.card.affiliation': 'Affiliation: {value}',
            'members.card.title_label': 'Title: {value}',
            'members.card.education': 'Education: {value}',
            'members.card.interest': 'Interest: {value}',
            'members.chart.membership_title': 'Membership Trend by Role',
            'members.chart.addon_title': 'Membership Add-on Trend',
            'members.chart.signup_title': 'Sign-up Trend',
            'members.chart.signups': 'Sign-ups',
            'members.chart.cumulative_signups': 'Cumulative Sign-ups',
            "members.confirm.change_membership": "Are you sure you want to change this member's membership?",
            "members.confirm.change_membership_addon": "Are you sure you want to change this member's membership add-on?",
            'members.confirm.approve_student': 'Do you want to approve the Student membership application?',
            'members.confirm.reject_student': 'Do you want to reject the Student membership application?',
            'members.loading': 'Loading member dashboard…',
            'members.load_error': 'Unable to load the member dashboard.',
            'members.no_data': 'No data available.',
            'members.empty_list': 'No members matched the current filters.',
            'members.pending.review': 'Review pending student applications',
            'members.pending.review_hint': 'Focus on student membership requests that still need action.',
            'members.mode.analytics': 'Analytics',
            'members.expiry.never': 'No expiry date',
            'members.expiry.dialog.title.role': 'Change membership expiry',
            'members.expiry.dialog.title.addon': 'Change add-on expiry',
            'members.expiry.dialog.title.pending_student': 'Set student membership expiry',
            'members.expiry.dialog.description.role': 'Choose the new expiry date for this membership.',
            'members.expiry.dialog.description.addon': 'Choose the new expiry date for this add-on membership.',
            'members.expiry.dialog.description.pending_student': 'Choose the expiry date to apply when approving this student membership.',
            'members.expiry.dialog.input_calendar': 'Expiry date',
            'members.expiry.dialog.invalid_date': 'Please choose a valid expiry date.',
            'members.expiry.dialog.default_hint': 'Leave the field empty if the membership should not expire.',
            'members.expiry.dialog.confirm': 'Save',
            'members.expiry.dialog.cancel': 'Cancel',
            'members.expiry.inline.title.role': 'Edit membership expiry',
            'members.expiry.inline.title.addon': 'Edit add-on expiry',
            'members.expiry.inline.description.role': 'Pick the new expiry date for this membership.',
            'members.expiry.inline.description.addon': 'Pick the new expiry date for this add-on membership.',
            'members.password_link.copied': 'The password reset link was copied to your clipboard.',
            'members.password_link.copy_failed': 'Automatic copy failed. Please copy the link below manually.',
            'members.password_link.send_notice': 'Send this link to the member who requested the password reset.',
            'members.password_link.warning': 'Do not open this link yourself. Opening it may verify the link and cause it to expire automatically.',
            'members.password_link.manual_copy': 'Password reset link',
        },
        ko: {
            'members.title': '회원 관리',
            'members.description': '회원 검색, 가입 현황 확인, 멤버십 조정, 조건별 목록 다운로드를 처리합니다.',
            'members.summary.membership': '멤버십 현황',
            'members.summary.signed_up': '가입 현황',
            'members.count': '회원 수: {count}',
            'members.count.pending_student': '대기 중인 학생회원 신청: {count}',
            'members.list_download': '목록 다운로드',
            'members.list_download_preparing': '파일 준비 중…',
            'members.search.title': '검색 필터',
            'members.search.clear_all': '전체 해제',
            'members.search.select_all': '전체 선택',
            'members.search.reset': '필터 초기화',
            'members.search.pending_student': '학생회원 신청',
            'members.search.officer': '임원',
            'members.search.officer_yes': '임원만',
            'members.search.officer_no': '비임원만',
            'members.card.change_password': '비밀번호 변경',
            'members.card.joined_at': '{date} 가입',
            'members.card.affiliation': '소속: {value}',
            'members.card.title_label': '직함: {value}',
            'members.card.education': '학력: {value}',
            'members.card.interest': '관심분야: {value}',
            'members.chart.membership_title': '멤버십 역할별 추이',
            'members.chart.addon_title': '멤버십 부가항목 추이',
            'members.chart.signup_title': '가입 추이',
            'members.chart.signups': '가입 수',
            'members.chart.cumulative_signups': '누적 가입 수',
            'members.confirm.change_membership': '이 회원의 멤버십을 변경하시겠습니까?',
            'members.confirm.change_membership_addon': '이 회원의 멤버십 부가항목을 변경하시겠습니까?',
            'members.confirm.approve_student': '학생회원 신청을 승인하시겠습니까?',
            'members.confirm.reject_student': '학생회원 신청을 반려하시겠습니까?',
            'members.loading': '회원 대시보드를 불러오는 중입니다…',
            'members.load_error': '회원 대시보드를 불러오지 못했습니다.',
            'members.no_data': '표시할 데이터가 없습니다.',
            'members.empty_list': '현재 필터 조건에 맞는 회원이 없습니다.',
            'members.pending.review': '대기 중인 학생회원 신청 검토',
            'members.pending.review_hint': '아직 처리되지 않은 학생회원 신청에 집중합니다.',
            'members.mode.analytics': '통계',
            'members.expiry.never': '만료일 없음',
            'members.expiry.dialog.title.role': '멤버십 만료일 변경',
            'members.expiry.dialog.title.addon': '부가 멤버십 만료일 변경',
            'members.expiry.dialog.title.pending_student': '학생회원 만료일 설정',
            'members.expiry.dialog.description.role': '이 멤버십에 적용할 새 만료일을 선택하세요.',
            'members.expiry.dialog.description.addon': '이 부가 멤버십에 적용할 새 만료일을 선택하세요.',
            'members.expiry.dialog.description.pending_student': '학생회원 신청을 승인할 때 적용할 만료일을 선택하세요.',
            'members.expiry.dialog.input_calendar': '만료일',
            'members.expiry.dialog.invalid_date': '올바른 만료일을 선택하세요.',
            'members.expiry.dialog.default_hint': '만료되지 않아야 하면 비워 두세요.',
            'members.expiry.dialog.confirm': '저장',
            'members.expiry.dialog.cancel': '취소',
            'members.expiry.inline.title.role': '멤버십 만료일 수정',
            'members.expiry.inline.title.addon': '부가 멤버십 만료일 수정',
            'members.expiry.inline.description.role': '이 멤버십의 새 만료일을 선택하세요.',
            'members.expiry.inline.description.addon': '이 부가 멤버십의 새 만료일을 선택하세요.',
            'members.password_link.copied': '비밀번호 재설정 링크를 클립보드에 복사했습니다.',
            'members.password_link.copy_failed': '자동 복사에 실패했습니다. 아래 링크를 수동으로 복사해 주세요.',
            'members.password_link.send_notice': '이 링크는 비밀번호 재설정을 요청한 회원에게 전달하는 용도입니다.',
            'members.password_link.warning': '관리자가 이 링크를 직접 열지 마세요. 링크를 열면 검증이 진행되어 자동으로 만료될 수 있습니다.',
            'members.password_link.manual_copy': '비밀번호 재설정 링크',
        }
    });
})();

let page_num = 1
let member_counter = 0
let toggle_page = false
let toggle_btn_change_membership = false
let toggle_btn_download_list = false

let txt_name = null
let txt_email = null

let check_member_admin = "NO"
let check_member_lifetime = "NO"
let check_member_regular = "NO"
let check_member_spouse = "NO"
let check_member_student = "NO"
let check_member_member = "NO"
let check_member_addon_none = "NO"
let check_member_addon_kssjoint = "NO"
let check_member_pending_student = "NO"

let class_member_active = "flex flex-row justify-center items-center text-xs font-light text-gray-700 w-fit px-2 py-1 rounded-lg border border-gray-700"
let class_member_deactive = "flex flex-row justify-center items-center text-xs font-light text-gray-300 w-fit px-2 py-1 rounded-lg border border-gray-300 bg-white"

function Div_member_list_skeleton_legacy() {
	let class_skeleton = "flex flex-col bg-gray-300 rounded-lg w-full h-12 border border-gray-500 shadow-sm p-2"
	return (
		<div class="flex flex-col space-y-2 animate-pulse">
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
		</div>
	)
}

function Div_member_count_skeleton_legacy(props) {
	return (
		<div class="flex flex-row w-full justify-between items-center">
			<p>
				<div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
			</p>

			<div>
				<div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
			</div>
		</div>
	)
}

function Div_btn_search_legacy() {
    return (
        <button type="button"
                onClick={() => click_btn_search()}
                class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            {admin_t('admin.common.search')}
        </button>
    )
}

function Div_btn_search_loading_legacy() {
    return (
        <button type="button"
                class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            {admin_t('admin.common.search')}
        </button>
    )
}

function Div_btn_change_membership(props) {
    return (
        <button type="button"
                onClick={() => click_btn_change_membership(props.uuid)}
                class="py-1.5 px-5 text-white bg-red-400 font-medium rounded-lg text-xs w-full md:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            {admin_t('admin.common.change')}
        </button>
    )
}

function Div_btn_change_membership_loading(props) {
    return (
        <button type="button"
                class="py-1.5 px-5 text-white bg-red-400 font-medium rounded-lg text-xs w-full md:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-not-allowed">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            {admin_t('admin.common.change')}
        </button>
    )
}

function Div_member_list_membership_legacy(props) {
    const renderRole = (roleName, bgClass) => {
        const isActive = props.current_role == roleName
        const className = isActive
            ? class_member_active + ' ' + bgClass
            : class_member_deactive + ((roleName != 'Administrator' && roleName != 'Developer') ? ' hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer' : '')

        return (
            <p id={'membership_' + roleName.toLowerCase().replace(/[^a-z]/g, '_') + '_' + props.uuid_user}
               class={className}
               onClick={() => {
                    if (!isActive && roleName != 'Administrator' && roleName != 'Developer') {
                        click_btn_change_membership(props.uuid_user, roleName, props.current_role)
                    }
                }}>
                {admin_role_label(roleName)}
            </p>
        )
    }

    return (
        <div class="w-full">
            <div class="flex flex-wrap justify-center items-center w-full space-x-2 space-y-1">
                {renderRole('Lifetime Member', 'bg-yellow-100')}
                {renderRole('Regular Member', 'bg-cyan-200')}
                {renderRole('Spouse Member', 'bg-purple-200')}
                {renderRole('Student Member', 'bg-green-200')}
                {renderRole('Non-member', 'bg-blue-200')}
                {renderRole('Administrator', 'bg-red-200')}
                {renderRole('Developer', 'bg-red-200')}
            </div>

            <div class="flex flex-row justify-center items-center w-full space-x-2">
                {
                    props.role_expired_at && (
                        <p class="flex flex-row justify-center items-center text-xs font-light text-red-500 px-2 py-1">
                            {admin_t('admin.common.expired_on', { date: props.role_expired_at })}
                        </p>
                    )
                }
            </div>
        </div>
    )
}

function Div_member_list_membership_addon_legacy(props) {
    return (
        <div class="w-full">
            <div class="flex flex-row justify-center items-center w-full space-x-2">
                {
                    props.role_addon_kssjoint == 1 || props.role_addon_kssjoint == '1'
                    ?   <p id={'membership_addon_kssjoint_' + props.uuid_user} class={class_member_active + ' bg-blue-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer'}
                            onClick={() => click_btn_change_membership_addon(props.uuid_user, 'KSS Joint Member', props.role_addon_kssjoint)}>
                            {admin_role_label('KSS Joint Member')}
                        </p>
                    :   <p id={'membership_addon_kssjoint_' + props.uuid_user} class={class_member_deactive + ' hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer'}
                            onClick={() => click_btn_change_membership_addon(props.uuid_user, 'KSS Joint Member', props.role_addon_kssjoint)}>
                            {admin_role_label('KSS Joint Member')}
                        </p>
                }
            </div>

            <div class="flex flex-row justify-center items-center w-full space-x-2">
                {
                    props.role_addon_kssjoint_expired_at != null
                    ?   <p class="flex flex-row justify-center items-center text-xs font-light text-red-500 px-2 py-1">
                            {admin_t('admin.common.expired_on', { date: props.role_addon_kssjoint_expired_at })}
                        </p>
                    :   ''
                }
            </div>
        </div>
    )
}

function Div_member_list_legacy(props) {
    let classCard = 'flex flex-row justify-center items-center text-xs font-light bg-gray-100 px-2 py-1 rounded-lg'

    const memberList = Object.keys(props.data).map((article) =>
        <div class="flex flex-col justify-center items-start bg-white rounded-lg border border-gray-500 shadow-sm p-2 space-y-2 hover:bg-gray-100">
            <div class="flex flex-row justify-between items-center w-full md:flex-col md:items-start md:space-y-2">
                <div class="flex flex-row justify-start items-end md:flex-col md:items-start md:space-y-1">
                    <p class="text-md font-bold tracking-tight text-gray-900 mr-4 md:mr-0">{props.data[article].name}</p>
                    <p class="text-sm text-gray-500 mr-4 md:mr-0">{props.data[article].email}</p>
                    {
                        props.data[article].role_pending == 'Student Member' && (
                            <p class="text-xs bg-red-500 text-white font-bold px-4 rounded-lg cursor-pointer"
                               onClick={() => click_btn_pending_student(props.data[article].email)}>
                                {admin_t('admin.roles.pending_student_application')}
                            </p>
                        )
                    }
                </div>

                <div class="flex flex-col justify-end items-end md:items-start">
                    <p class="text-sm bg-gray-500 text-white px-4 rounded-lg cursor-pointer"
                       onClick={() => click_btn_like_change_password(props.data[article].email)} alt={admin_t('members.card.change_password')}>
                        {admin_t('members.card.change_password')}
                    </p>
                    <p id={'div_member_list_btn_change_password_' + props.data[article].email} class="text-xs text-gray-500"></p>
                </div>
            </div>

            <div class="grid grid-cols-3 justify-center items-start w-full gap-2 md:grid-cols-1">
                <div class="col-span-2 flex flex-col justify-center items-center w-full space-y-1 border border-blue-200 rounded-lg p-2 hover:bg-white md:col-span-1">
                    <div class="flex flex-row justify-center items-center w-full space-x-2">
                        <p class="block text-sm font-normal underline text-blue-700">{admin_t('admin.common.membership')}</p>
                    </div>

                    <div id={'div_member_list_btn_membership_' + props.data[article].uuid} class="w-full">
                        <Div_member_list_membership uuid_user={props.data[article].uuid}
                                                    current_role={props.data[article].role}
                                                    role_expired_at={props.data[article].role_expired_at} />
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center w-full space-y-1 border border-green-200 rounded-lg p-2 hover:bg-white">
                    <div class="flex flex-row justify-center items-center w-full space-x-2">
                        <p class="block text-sm font-normal underline text-blue-700">{admin_t('admin.common.membership_addon')}</p>
                    </div>

                    <div id={'div_member_list_btn_membership_addon_' + props.data[article].uuid} class="w-full">
                        <Div_member_list_membership_addon uuid_user={props.data[article].uuid}
                                                          role_addon_kssjoint={props.data[article].role_addon_kssjoint}
                                                          role_addon_kssjoint_expired_at={props.data[article].role_addon_kssjoint_expired_at} />
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap justify-start items-center space-x-2">
                <div></div>
                {
                    props.data[article].officer !== 'Member' && (
                        <p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-red-100 py-1 rounded-lg px-2">
                            {props.data[article].officer}
                        </p>
                    )
                }

                <p class={classCard}>
                    {admin_t('members.card.joined_at', { date: props.data[article].created_at })}
                </p>

                { props.data[article].affiliation && ( <p class={classCard}>{admin_t('members.card.affiliation', { value: props.data[article].affiliation })}</p> ) }
                { props.data[article].title && ( <p class={classCard}>{admin_t('members.card.title_label', { value: props.data[article].title })}</p> ) }
                { props.data[article].education && ( <p class={classCard}>{admin_t('members.card.education', { value: props.data[article].education })}</p> ) }
                { props.data[article].interest && ( <p class={classCard}>{admin_t('members.card.interest', { value: props.data[article].interest })}</p> ) }
            </div>
        </div>
    )

    return (
        <div class="flex flex-col w-full space-y-2">
            {memberList}
            <div id={'div_member_list_' + (page_num + 1).toString()}></div>
        </div>
    )
}

function Div_member_count_legacy(props) {
    const formattedCount = props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return (
        <div class="flex flex-row w-full justify-between items-center md:flex-col md:items-start md:space-y-4">
            <p>
                {admin_t('members.count', { count: formattedCount })}
            </p>

            <div>
                <button type="button"
                        onClick={() => click_btn_download_list()}
                        class="flex flex-row text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                    <img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/button_download.svg" class="w-4 h-4 mr-2" />
                    {admin_t('members.list_download')}
                </button>
            </div>
        </div>
    )
}

async function click_btn_search_legacy() {
	get_member_list("search")
}

async function click_btn_change_membership(uuid_user, sel_membership, current_role) {
    if (current_role != 'Administrator' && current_role != 'Developer') {
        if (confirm(admin_t('members.confirm.change_membership'))) {
            if (!toggle_btn_change_membership) {
                toggle_btn_change_membership = true

                const request_data = new FormData()
                request_data.append('uuid_user', uuid_user)
                request_data.append('sel_membership', sel_membership)
                request_data.append('current_role', current_role)

                const data = await fetch(admin_build_url('/admin/ajax_change_membership/'), {
                    method: 'post',
                    headers: { 'X-CSRFToken': getCookie('csrftoken') },
                    body: request_data
                })
                .then(res => res.json())
                .then(res => res)

                get_member_summary()

                toggle_btn_change_membership = false
                ReactDOM.render(<Div_member_list_membership uuid_user={uuid_user}
                                                            current_role={sel_membership}
                                                            role_expired_at={data.data.role_expired_at} />, document.getElementById('div_member_list_btn_membership_' + uuid_user))
            }
        }
    }
}

async function click_btn_change_membership_addon(uuid_user, sel_membership, current_role) {
    if (confirm(admin_t('members.confirm.change_membership_addon'))) {
        if (!toggle_btn_change_membership) {
            toggle_btn_change_membership = true

            const request_data = new FormData()
            request_data.append('uuid_user', uuid_user)
            request_data.append('sel_membership', sel_membership)
            request_data.append('current_role', current_role)

            const data = await fetch(admin_build_url('/admin/ajax_change_membership_addon/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: request_data
            })
            .then(res => res.json())
            .then(res => res)

            get_member_summary()

            if (current_role == '0') { current_role = '1' } else { current_role = '0' }
            toggle_btn_change_membership = false
            ReactDOM.render(<Div_member_list_membership_addon uuid_user={uuid_user}
                                                                 role_addon_kssjoint={current_role}
                                                                 role_addon_kssjoint_expired_at={data.data.role_addon_kssjoint_expired_at} />, document.getElementById('div_member_list_btn_membership_addon_' + uuid_user))
        }
    }
}

async function click_btn_like_change_password_legacy(email) {
	const request_data = new FormData();
	request_data.append('email', email);      // 이메일

	const data = await fetch(admin_build_url("/admin/ajax_get_change_password_link/"), {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });
	//alert("URL for changing the password has been generated of " + email + ".\nPlease send the following URL:\n" + data['url'])
	document.getElementById("div_member_list_btn_change_password_" + email).innerHTML = data['url']
}

// ===== Member dashboard patch: traffic-style layout + ECharts + daily/monthly/yearly =====
window.StatKISS_ADMIN_I18N.register('members_dashboard_patch', {
    en: {
        'members.chart.membership_title': 'Membership Trend by Role',
        'members.chart.addon_title': 'Membership Add-on Trend',
        'members.chart.signup_title': 'Sign-up Trend',
        'members.chart.signups': 'Sign-ups',
        'members.chart.cumulative_signups': 'Cumulative Sign-ups',
        'members.loading': 'Loading member dashboard…',
        'members.load_error': 'Unable to load the member dashboard.',
        'members.no_data': 'No data available.',
        'members.search.pending_student': 'Student Member',
        'members.empty_list': 'No members matched the current filters.'
    },
    ko: {
        'members.chart.membership_title': '멤버십별 추이',
        'members.chart.addon_title': '멤버십 부가항목 추이',
        'members.chart.signup_title': '회원 가입 추이',
        'members.chart.signups': '가입 수',
        'members.chart.cumulative_signups': '누적 가입자 수',
        'members.loading': '회원 대시보드를 불러오는 중입니다…',
        'members.load_error': '회원 대시보드를 불러오지 못했습니다.',
        'members.no_data': '표시할 데이터가 없습니다.',
        'members.search.pending_student': '학생회원',
        'members.empty_list': '현재 필터에 일치하는 회원이 없습니다.'
    }
})

let gv_member_dashboard_cache = null
let gv_member_membership_chart = null
let gv_member_addon_chart = null
let gv_member_signup_chart = null
let gv_member_period = 'monthly'
let gv_member_scroll_handler = null
let gv_member_list_pages = {}
let gv_member_theme_observer_installed = false
let gv_member_last_theme_mode = null

function member_patch_safe_number(value) {
    const num = Number(value)
    return Number.isFinite(num) ? num : 0
}

function member_patch_format_number(value) {
    return member_patch_safe_number(value).toLocaleString()
}

function member_patch_build_url(path) {
    if (typeof admin_build_url === 'function') {
        return admin_build_url(path)
    }
    return path
}

function member_patch_fetch_json(url, options) {
    return fetch(url, options).then(async res => {
        const text = await res.text()
        let data = {}

        try {
            data = text ? JSON.parse(text) : {}
        } catch (error) {
            if (!res.ok) {
                throw new Error('HTTP ' + res.status)
            }
            throw new Error('Invalid JSON response')
        }

        if (!res.ok) {
            throw new Error((data && data.error) ? data.error : ('HTTP ' + res.status))
        }

        return data
    })
}

function member_patch_is_rtl() {
    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.isRTL === 'function') {
        const lang = typeof admin_get_current_lang === 'function'
            ? admin_get_current_lang()
            : window.StatKISS_ADMIN_I18N.getLang()
        return window.StatKISS_ADMIN_I18N.isRTL(lang)
    }
    return false
}

function member_patch_get_theme_mode() {
    try {
        if (window.StatKISSTheme && typeof window.StatKISSTheme.get === 'function') {
            return window.StatKISSTheme.get() === 'dark' ? 'dark' : 'light'
        }
    } catch (_) {}

    if (typeof detect_admin_shell_theme_mode === 'function') {
        const detected = detect_admin_shell_theme_mode()
        if (detected === 'dark' || detected === 'light') {
            return detected
        }
    }

    const candidates = [
        document.documentElement,
        document.body,
        document.getElementById('div_main'),
        document.getElementById('div_admin_menu'),
        document.getElementById('div_content')
    ].filter(Boolean)

    for (const node of candidates) {
        const classNames = typeof node.className === 'string'
            ? node.className.toLowerCase()
            : (node.classList ? Array.from(node.classList).join(' ').toLowerCase() : '')

        if (/(^|\s)(dark|dark-mode|theme-dark)(\s|$)/.test(classNames) || classNames.includes('dark:')) {
            return 'dark'
        }

        const attrValues = [
            node.getAttribute && node.getAttribute('data-theme'),
            node.getAttribute && node.getAttribute('data-color-mode'),
            node.getAttribute && node.getAttribute('data-bs-theme'),
            node.getAttribute && node.getAttribute('data-mode'),
            node.getAttribute && node.getAttribute('data-statkiss-theme'),
            node.getAttribute && node.getAttribute('theme'),
            node.dataset && node.dataset.theme,
            node.dataset && node.dataset.colorMode,
            node.dataset && node.dataset.bsTheme,
        ].filter(Boolean).map(v => String(v).toLowerCase())

        if (attrValues.some(v => v === 'dark' || v === 'theme-dark')) {
            return 'dark'
        }
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    }

    return 'light'
}

function useMemberPatchThemeMode() {
    const [themeMode, setThemeMode] = React.useState(member_patch_get_theme_mode())

    React.useEffect(() => {
        const refreshThemeMode = () => {
            const nextMode = member_patch_get_theme_mode()
            setThemeMode(prevMode => prevMode === nextMode ? prevMode : nextMode)
        }

        refreshThemeMode()

        const observer = new MutationObserver(refreshThemeMode)
        ;[
            document.documentElement,
            document.body,
            document.getElementById('div_main'),
            document.getElementById('div_admin_menu'),
            document.getElementById('div_content')
        ].filter(Boolean).forEach(target => {
            observer.observe(target, {
                attributes: true,
                attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'data-mode', 'data-statkiss-theme', 'theme']
            })
        })

        const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
        if (media) {
            if (media.addEventListener) {
                media.addEventListener('change', refreshThemeMode)
            } else if (media.addListener) {
                media.addListener(refreshThemeMode)
            }
        }

        return () => {
            observer.disconnect()
            if (media) {
                if (media.removeEventListener) {
                    media.removeEventListener('change', refreshThemeMode)
                } else if (media.removeListener) {
                    media.removeListener(refreshThemeMode)
                }
            }
        }
    }, [])

    return themeMode
}

function member_patch_get_palette(themeMode) {
    if (themeMode === 'dark') {
        return {
            wrapperBg: 'bg-transparent',
            cardBg: 'bg-slate-900/70',
            cardBorder: 'border-slate-700',
            cardShadow: 'shadow-[0_14px_34px_rgba(2,6,23,0.42)]',
            cardTitle: 'text-blue-400',
            textStrong: 'text-slate-50',
            textBase: 'text-slate-200',
            textMuted: 'text-slate-400',
            divider: 'border-slate-700',
            tabActive: 'bg-slate-800 text-blue-300 shadow-sm border border-slate-700',
            tabInactive: 'text-slate-300 hover:bg-slate-800/70 hover:text-blue-300 border border-transparent',
            loadingCard: 'border-slate-700 bg-slate-900/70',
            errorWrap: 'border-red-500/40 bg-red-950/40 text-red-200',
            chart: {
                title: '#f8fafc',
                legend: '#cbd5e1',
                axis: '#cbd5e1',
                axisLine: '#475569',
                splitLine: '#334155',
                tooltipBg: '#020617',
                tooltipText: '#e2e8f0',
                toolbox: '#94a3b8',
                noData: '#94a3b8',
                sliderBorder: '#334155',
                sliderBg: '#0f172a',
                sliderFill: 'rgba(96, 165, 250, 0.16)',
                sliderHandle: '#60a5fa',
                sliderDataLine: '#64748b',
                sliderDataArea: 'rgba(100, 116, 139, 0.18)'
            }
        }
    }

    return {
        wrapperBg: 'bg-transparent',
        cardBg: 'bg-white',
        cardBorder: 'border-gray-200',
        cardShadow: 'shadow-sm',
        cardTitle: 'text-blue-600',
        textStrong: 'text-slate-900',
        textBase: 'text-slate-600',
        textMuted: 'text-slate-500',
        divider: 'border-slate-200',
        tabActive: 'bg-slate-100 text-blue-600 shadow-sm border border-slate-200',
        tabInactive: 'text-slate-600 hover:bg-slate-100 hover:text-blue-600 border border-transparent',
        loadingCard: 'border-gray-200 bg-gray-50',
        errorWrap: 'border-red-200 bg-red-50 text-red-600',
        chart: {
            title: '#1f2937',
            legend: '#64748b',
            axis: '#64748b',
            axisLine: '#cbd5e1',
            splitLine: '#e5e7eb',
            tooltipBg: '#111827',
            tooltipText: '#f8fafc',
            toolbox: '#94a3b8',
            noData: '#64748b',
            sliderBorder: '#dbeafe',
            sliderBg: '#eff6ff',
            sliderFill: 'rgba(79, 107, 220, 0.12)',
            sliderHandle: '#93c5fd',
            sliderDataLine: '#94a3b8',
            sliderDataArea: 'rgba(148, 163, 184, 0.18)'
        }
    }
}

function member_patch_role_group(role) {
    if (role === 'Administrator' || role === 'Developer') {
        return 'Admin'
    }
    return role
}

function member_patch_role_order() {
    return ['Admin', 'Lifetime Member', 'Regular Member', 'Spouse Member', 'Student Member', 'Non-member']
}

function member_patch_role_label(role) {
    if (role === 'Admin') {
        return admin_t('admin.roles.admin')
    }
    return admin_role_label(role)
}

function member_patch_find_role_count(list, role) {
    const rows = Array.isArray(list) ? list : Object.values(list || {})
    for (let idx = 0; idx < rows.length; idx += 1) {
        if ((rows[idx] || {}).role === role) {
            return member_patch_safe_number(rows[idx].cnt)
        }
    }
    return 0
}

function member_patch_build_membership_summary(counterPayload) {
    const membership = (counterPayload && counterPayload.membership) ? counterPayload.membership : []
    return {
        title: admin_t('members.summary.membership'),
        items: [
            { label: admin_t('admin.roles.admin'), value: member_patch_find_role_count(membership, 'Administrator') + member_patch_find_role_count(membership, 'Developer') },
            { label: admin_role_label('Lifetime Member'), value: member_patch_find_role_count(membership, 'Lifetime Member') },
            { label: admin_role_label('Regular Member'), value: member_patch_find_role_count(membership, 'Regular Member') },
            { label: admin_role_label('Spouse Member'), value: member_patch_find_role_count(membership, 'Spouse Member') },
            { label: admin_role_label('Student Member'), value: member_patch_find_role_count(membership, 'Student Member') },
            { label: admin_role_label('Non-member'), value: member_patch_find_role_count(membership, 'Non-member') }
        ]
    }
}

function member_patch_build_signup_summary(counterPayload) {
    const joined = (counterPayload && counterPayload.member_joined) ? counterPayload.member_joined : {}
    return {
        title: admin_t('members.summary.signed_up'),
        items: [
            { label: admin_t('admin.common.total'), value: member_patch_safe_number(joined.cnt_total) },
            { label: admin_t('admin.common.current_year'), value: member_patch_safe_number(joined.cnt_yearly) },
            { label: admin_t('admin.common.current_month'), value: member_patch_safe_number(joined.cnt_monthly) },
            { label: admin_t('admin.common.today'), value: member_patch_safe_number(joined.cnt_daily) }
        ]
    }
}

function member_patch_format_period_label(rawLabel, period) {
    const label = String(rawLabel || '')
    if (period === 'yearly') {
        return label.slice(0, 4)
    }
    if (period === 'monthly') {
        return label.slice(0, 7)
    }
    return label.slice(0, 10)
}


function member_patch_extract_sorted_unique_dates(rows) {
    return Array.from(new Set((rows || []).map(row => String((row || {}).date || '')).filter(Boolean))).sort()
}

function member_patch_parse_date_parts(dateString) {
    const value = String(dateString || '')
    const parts = value.split('-').map(part => Number(part))
    return {
        year: Number.isFinite(parts[0]) ? parts[0] : 1970,
        month: Number.isFinite(parts[1]) ? parts[1] : 1,
        day: Number.isFinite(parts[2]) ? parts[2] : 1,
    }
}

function member_patch_to_iso_date(year, month, day) {
    return [String(year).padStart(4, '0'), String(month).padStart(2, '0'), String(day).padStart(2, '0')].join('-')
}

function member_patch_shift_period(dateString, period) {
    const parts = member_patch_parse_date_parts(dateString)
    const next = new Date(Date.UTC(parts.year, Math.max(parts.month, 1) - 1, Math.max(parts.day, 1)))

    if (period === 'yearly') {
        next.setUTCFullYear(next.getUTCFullYear() + 1)
    } else if (period === 'monthly') {
        next.setUTCMonth(next.getUTCMonth() + 1)
    } else {
        next.setUTCDate(next.getUTCDate() + 1)
    }

    return member_patch_to_iso_date(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate())
}

function member_patch_build_period_timeline(startDate, endDate, period) {
    if (!startDate || !endDate || startDate > endDate) {
        return []
    }

    const result = []
    let current = String(startDate)
    let guard = 0

    while (current <= endDate && guard < 50000) {
        result.push(current)
        const nextValue = member_patch_shift_period(current, period)
        if (nextValue === current) {
            break
        }
        current = nextValue
        guard += 1
    }

    return result
}

function member_patch_get_common_period_range(dashboard, period) {
    const membershipRows = ((((dashboard || {}).table || {}).membership || {})[period]) || []
    const signupRows = ((((dashboard || {}).table || {}).signup || {})[period]) || []
    const membershipDates = member_patch_extract_sorted_unique_dates(membershipRows)
    const signupDates = member_patch_extract_sorted_unique_dates(signupRows)

    const membershipStart = membershipDates.length ? membershipDates[0] : ''
    const membershipEnd = membershipDates.length ? membershipDates[membershipDates.length - 1] : ''
    const signupStart = signupDates.length ? signupDates[0] : ''
    const signupEnd = signupDates.length ? signupDates[signupDates.length - 1] : ''

    const commonStart = membershipStart && signupStart
        ? [membershipStart, signupStart].sort().slice(-1)[0]
        : (membershipStart || signupStart)
    const commonEnd = [membershipEnd, signupEnd].filter(Boolean).sort().slice(-1)[0] || ''

    if (!commonStart || !commonEnd || commonStart > commonEnd) {
        return {
            start: commonStart,
            end: commonEnd,
            dates: membershipDates.length ? membershipDates : signupDates,
        }
    }

    return {
        start: commonStart,
        end: commonEnd,
        dates: member_patch_build_period_timeline(commonStart, commonEnd, period),
    }
}

function member_patch_get_addon_role_order(rows) {
    const roles = Array.from(new Set((rows || []).map(row => String((row || {}).role || '')).filter(Boolean)))
    const preferred = ['KSS Joint Member']
    const ordered = []

    preferred.forEach(role => {
        if (roles.includes(role)) {
            ordered.push(role)
        }
    })

    roles
        .filter(role => !preferred.includes(role))
        .sort((a, b) => a.localeCompare(b))
        .forEach(role => ordered.push(role))

    return ordered
}

function member_patch_prepare_membership_chart_data(dashboard, period) {
    const rows = ((((dashboard || {}).table || {}).membership || {})[period]) || []
    const timeline = member_patch_get_common_period_range(dashboard, period).dates || []
    const labelsRaw = timeline.length ? timeline : member_patch_extract_sorted_unique_dates(rows)
    const visibleDates = new Set(labelsRaw)
    const grouped = {}

    rows.forEach(row => {
        const date = String((row || {}).date || '')
        if (!date || !visibleDates.has(date)) {
            return
        }
        const role = member_patch_role_group(String((row || {}).role || ''))
        if (!grouped[date]) {
            grouped[date] = {}
        }
        grouped[date][role] = member_patch_safe_number(grouped[date][role]) + member_patch_safe_number((row || {}).cnt)
    })

    const labels = labelsRaw.map(label => member_patch_format_period_label(label, period))
    const series = member_patch_role_order().map(role => ({
        name: member_patch_role_label(role),
        data: labelsRaw.map(label => member_patch_safe_number(((grouped[label] || {})[role])))
    }))

    return { labels, series }
}

function member_patch_prepare_addon_chart_data(dashboard, period) {
    const rows = ((((dashboard || {}).table || {}).addon || {})[period]) || []
    const timeline = member_patch_get_common_period_range(dashboard, period).dates || []
    const labelsRaw = timeline.length ? timeline : member_patch_extract_sorted_unique_dates(rows)
    const visibleDates = new Set(labelsRaw)
    const grouped = {}

    rows.forEach(row => {
        const date = String((row || {}).date || '')
        const role = String((row || {}).role || '')
        if (!date || !role || !visibleDates.has(date)) {
            return
        }
        if (!grouped[date]) {
            grouped[date] = {}
        }
        grouped[date][role] = member_patch_safe_number(grouped[date][role]) + member_patch_safe_number((row || {}).cnt)
    })

    const roleOrder = member_patch_get_addon_role_order(rows)
    return {
        labels: labelsRaw.map(label => member_patch_format_period_label(label, period)),
        series: roleOrder.map(role => ({
            name: admin_role_label(role),
            data: labelsRaw.map(label => member_patch_safe_number(((grouped[label] || {})[role])))
        }))
    }
}

function member_patch_prepare_signup_chart_data(dashboard, period) {
    const rows = ((((dashboard || {}).table || {}).signup || {})[period]) || []
    const sorted = rows.slice().sort((a, b) => String((a || {}).date || '').localeCompare(String((b || {}).date || '')))
    const timeline = member_patch_get_common_period_range(dashboard, period).dates || []
    const labelsRaw = timeline.length ? timeline : sorted.map(row => String((row || {}).date || ''))
    const rowMap = {}
    let initialCumulative = 0

    sorted.forEach(row => {
        const date = String((row || {}).date || '')
        if (!date) {
            return
        }
        rowMap[date] = row
    })

    if (labelsRaw.length > 0) {
        const startDate = labelsRaw[0]
        sorted.forEach(row => {
            const rowDate = String((row || {}).date || '')
            if (rowDate && rowDate < startDate) {
                initialCumulative = member_patch_safe_number((row || {}).cumulative_signup_count)
            }
        })
    }

    const signups = []
    const cumulative = []
    let runningCumulative = initialCumulative

    labelsRaw.forEach(date => {
        const row = rowMap[date]
        if (row) {
            const signupCount = member_patch_safe_number((row || {}).signup_count)
            const cumulativeCount = member_patch_safe_number((row || {}).cumulative_signup_count)
            signups.push(signupCount)
            runningCumulative = cumulativeCount || (runningCumulative + signupCount)
        } else {
            signups.push(0)
        }
        cumulative.push(runningCumulative)
    })

    return {
        labels: labelsRaw.map(label => member_patch_format_period_label(label, period)),
        signups,
        cumulative
    }
}

function member_patch_build_role_chart_option(config) {
    const palette = member_patch_get_palette(config.themeMode)
    const chartData = config.chartData || { labels: [], series: [] }
    const noDataGraphic = chartData.labels.length === 0 || chartData.series.length === 0
        ? [{
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
                text: admin_t('members.no_data'),
                fill: palette.chart.noData,
                fontSize: 16,
                fontWeight: 600
            }
        }]
        : []

    return {
        backgroundColor: 'transparent',
        color: ['#4f6bdc', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#64748b', '#0ea5e9', '#14b8a6', '#f97316', '#a855f7'],
        animationDuration: 300,
        title: {
            text: config.title,
            left: 'center',
            top: 18,
            textStyle: {
                color: palette.chart.title,
                fontSize: 18,
                fontWeight: 700
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: palette.chart.tooltipBg,
            borderWidth: 0,
            textStyle: { color: palette.chart.tooltipText },
            formatter: function(params) {
                const title = params && params.length ? params[0].axisValue : ''
                const rows = [title]
                params.forEach(param => {
                    rows.push(param.marker + ' ' + param.seriesName + ': ' + member_patch_format_number(param.value))
                })
                return rows.join('<br/>')
            }
        },
        legend: {
            top: 52,
            left: 'center',
            itemWidth: 18,
            itemHeight: 10,
            textStyle: { color: palette.chart.legend },
            data: chartData.series.map(item => item.name)
        },
        toolbox: {
            top: 14,
            right: 12,
            itemSize: 16,
            iconStyle: { borderColor: palette.chart.toolbox },
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'Zoom', back: 'Reset Zoom' }
                },
                restore: { title: 'Restore' },
                saveAsImage: {
                    title: 'Download',
                    name: config.exportName
                }
            }
        },
        grid: {
            left: 70,
            right: 40,
            top: 110,
            bottom: 88
        },
        xAxis: {
            type: 'category',
            data: chartData.labels,
            axisTick: { alignWithLabel: true },
            axisLine: { lineStyle: { color: palette.chart.axisLine } },
            axisLabel: { color: palette.chart.axis, hideOverlap: true }
        },
        yAxis: {
            type: 'value',
            min: 0,
            axisLabel: {
                color: palette.chart.axis,
                formatter: function(value) { return member_patch_format_number(value) }
            },
            splitLine: { lineStyle: { color: palette.chart.splitLine } }
        },
        dataZoom: [
            { type: 'inside', xAxisIndex: 0, filterMode: 'none' },
            {
                type: 'slider',
                xAxisIndex: 0,
                bottom: 18,
                height: 24,
                borderColor: palette.chart.sliderBorder,
                backgroundColor: palette.chart.sliderBg,
                fillerColor: palette.chart.sliderFill,
                handleStyle: { color: palette.chart.sliderHandle },
                moveHandleStyle: { color: palette.chart.sliderHandle },
                dataBackground: {
                    lineStyle: { color: palette.chart.sliderDataLine },
                    areaStyle: { color: palette.chart.sliderDataArea }
                }
            }
        ],
        series: chartData.series.map(series => ({
            name: series.name,
            type: 'bar',
            stack: config.stackName,
            barMaxWidth: 28,
            data: series.data,
            itemStyle: { borderRadius: [4, 4, 0, 0] },
            emphasis: { focus: 'series' }
        })),
        graphic: noDataGraphic
    }
}

function member_patch_build_membership_chart_option(dashboard, period, themeMode) {
    const option = member_patch_build_role_chart_option({
        title: admin_t('members.chart.membership_title'),
        exportName: 'statkiss_membership_' + period,
        chartData: member_patch_prepare_membership_chart_data(dashboard, period),
        themeMode,
        stackName: 'membership'
    })

    const hiddenLegendName = member_patch_role_label('Non-member')
    option.legend = option.legend || {}
    option.legend.selected = Object.assign({}, option.legend.selected || {}, {
        [hiddenLegendName]: false
    })

    return option
}

function member_patch_build_addon_chart_option(dashboard, period, themeMode) {
    return member_patch_build_role_chart_option({
        title: admin_t('members.chart.addon_title'),
        exportName: 'statkiss_membership_addon_' + period,
        chartData: member_patch_prepare_addon_chart_data(dashboard, period),
        themeMode,
        stackName: 'membership_addon'
    })
}

function member_patch_build_signup_chart_option(dashboard, period, themeMode) {
    const palette = member_patch_get_palette(themeMode)
    const chartData = member_patch_prepare_signup_chart_data(dashboard, period)
    const noDataGraphic = chartData.labels.length === 0
        ? [{
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
                text: admin_t('members.no_data'),
                fill: palette.chart.noData,
                fontSize: 16,
                fontWeight: 600
            }
        }]
        : []

    return {
        backgroundColor: 'transparent',
        color: ['#4f6bdc', '#10b981'],
        animationDuration: 300,
        title: {
            text: admin_t('members.chart.signup_title'),
            left: 'center',
            top: 18,
            textStyle: {
                color: palette.chart.title,
                fontSize: 18,
                fontWeight: 700
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            backgroundColor: palette.chart.tooltipBg,
            borderWidth: 0,
            textStyle: { color: palette.chart.tooltipText },
            formatter: function(params) {
                const title = params && params.length ? params[0].axisValue : ''
                const rows = [title]
                params.forEach(param => {
                    rows.push(param.marker + ' ' + param.seriesName + ': ' + member_patch_format_number(param.value))
                })
                return rows.join('<br/>')
            }
        },
        legend: {
            top: 52,
            left: 'center',
            itemWidth: 18,
            itemHeight: 10,
            textStyle: { color: palette.chart.legend },
            data: [admin_t('members.chart.signups'), admin_t('members.chart.cumulative_signups')]
        },
        toolbox: {
            top: 14,
            right: 12,
            itemSize: 16,
            iconStyle: { borderColor: palette.chart.toolbox },
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: { zoom: 'Zoom', back: 'Reset Zoom' }
                },
                restore: { title: 'Restore' },
                saveAsImage: {
                    title: 'Download',
                    name: 'statkiss_signup_' + period
                }
            }
        },
        grid: {
            left: 70,
            right: 72,
            top: 110,
            bottom: 88
        },
        xAxis: {
            type: 'category',
            data: chartData.labels,
            axisTick: { alignWithLabel: true },
            axisLine: { lineStyle: { color: palette.chart.axisLine } },
            axisLabel: { color: palette.chart.axis, hideOverlap: true }
        },
        yAxis: [
            {
                type: 'value',
                min: 0,
                name: admin_t('members.chart.signups'),
                nameLocation: 'end',
                nameGap: 16,
                nameTextStyle: { color: palette.chart.axis },
                axisLabel: {
                    color: palette.chart.axis,
                    formatter: function(value) { return member_patch_format_number(value) }
                },
                splitLine: { lineStyle: { color: palette.chart.splitLine } }
            },
            {
                type: 'value',
                min: 0,
                name: admin_t('members.chart.cumulative_signups'),
                nameLocation: 'end',
                nameGap: 16,
                nameTextStyle: { color: palette.chart.axis },
                axisLabel: {
                    color: palette.chart.axis,
                    formatter: function(value) { return member_patch_format_number(value) }
                },
                splitLine: { show: false }
            }
        ],
        dataZoom: [
            { type: 'inside', xAxisIndex: 0, filterMode: 'none' },
            {
                type: 'slider',
                xAxisIndex: 0,
                bottom: 18,
                height: 24,
                borderColor: palette.chart.sliderBorder,
                backgroundColor: palette.chart.sliderBg,
                fillerColor: palette.chart.sliderFill,
                handleStyle: { color: palette.chart.sliderHandle },
                moveHandleStyle: { color: palette.chart.sliderHandle },
                dataBackground: {
                    lineStyle: { color: palette.chart.sliderDataLine },
                    areaStyle: { color: palette.chart.sliderDataArea }
                }
            }
        ],
        series: [
            {
                name: admin_t('members.chart.signups'),
                type: 'bar',
                yAxisIndex: 0,
                data: chartData.signups,
                barMaxWidth: 28,
                itemStyle: { borderRadius: [4, 4, 0, 0] },
                emphasis: { focus: 'series' }
            },
            {
                name: admin_t('members.chart.cumulative_signups'),
                type: 'line',
                yAxisIndex: 1,
                smooth: false,
                showSymbol: false,
                data: chartData.cumulative,
                emphasis: { focus: 'series' }
            }
        ],
        graphic: noDataGraphic
    }
}

function member_patch_render_membership_chart(dashboard, period, themeMode) {
    const target = document.getElementById('member_membership_chart')
    if (!target || typeof echarts === 'undefined') {
        return
    }

    let chart = echarts.getInstanceByDom(target)
    if (!chart) {
        chart = echarts.init(target)
    }

    chart.setOption(member_patch_build_membership_chart_option(dashboard, period, themeMode), true)
    chart.resize()
    gv_member_membership_chart = chart
}

function member_patch_render_addon_chart(dashboard, period, themeMode) {
    const target = document.getElementById('member_addon_chart')
    if (!target || typeof echarts === 'undefined') {
        return
    }

    let chart = echarts.getInstanceByDom(target)
    if (!chart) {
        chart = echarts.init(target)
    }

    chart.setOption(member_patch_build_addon_chart_option(dashboard, period, themeMode), true)
    chart.resize()
    gv_member_addon_chart = chart
}

function member_patch_render_signup_chart(dashboard, period, themeMode) {
    const target = document.getElementById('member_signup_chart')
    if (!target || typeof echarts === 'undefined') {
        return
    }

    let chart = echarts.getInstanceByDom(target)
    if (!chart) {
        chart = echarts.init(target)
    }

    chart.setOption(member_patch_build_signup_chart_option(dashboard, period, themeMode), true)
    chart.resize()
    gv_member_signup_chart = chart
}

function member_patch_dispose_charts() {
    if (gv_member_membership_chart != null) {
        gv_member_membership_chart.dispose()
        gv_member_membership_chart = null
    }

    if (gv_member_addon_chart != null) {
        gv_member_addon_chart.dispose()
        gv_member_addon_chart = null
    }

    if (gv_member_signup_chart != null) {
        gv_member_signup_chart.dispose()
        gv_member_signup_chart = null
    }
}

async function member_patch_get_dashboard(forceRefresh) {
    if (forceRefresh === true) {
        gv_member_dashboard_cache = null
    }

    if (gv_member_dashboard_cache != null) {
        return gv_member_dashboard_cache
    }

    const [counter, table] = await Promise.all([
        member_patch_fetch_json(member_patch_build_url('/admin/ajax_get_member_counter/')),
        member_patch_fetch_json(member_patch_build_url('/admin/ajax_get_member_table/'))
    ])

    gv_member_dashboard_cache = {
        counter: counter || {},
        table: table || {}
    }
    return gv_member_dashboard_cache
}

function Div_member_dashboard_summary_item(props) {
    const palette = member_patch_get_palette(props.themeMode)
    return (
        <div class="flex flex-col justify-start items-center text-center px-3 py-2 min-h-[120px]">
            <p class={'text-3xl md:text-4xl font-extrabold tracking-tight ' + palette.textStrong}>{member_patch_format_number(props.value)}</p>
            <p class={'mt-1 text-base ' + palette.textBase}>{props.label}</p>
        </div>
    )
}

function Div_member_dashboard_summary_card(props) {
    const palette = member_patch_get_palette(props.themeMode)
    const gridClass = props.items.length >= 6
        ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
        : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'

    return (
        <div class={'w-full rounded-xl border px-6 py-8 ' + palette.cardBg + ' ' + palette.cardBorder + ' ' + palette.cardShadow}>
            <h2 class={'text-center text-3xl sm:text-4xl font-extrabold mb-8 ' + palette.cardTitle}>{props.title}</h2>
            <div class={gridClass}>
                {props.items.map((item, idx) => (
                    <Div_member_dashboard_summary_item key={idx} themeMode={props.themeMode} value={item.value} label={item.label} />
                ))}
            </div>
        </div>
    )
}

function Div_member_dashboard_tab_button(props) {
    const palette = member_patch_get_palette(props.themeMode)
    const isActive = props.active === props.period
    const buttonClass = isActive
        ? 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ' + palette.tabActive
        : 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ' + palette.tabInactive

    return (
        <button type="button" class={buttonClass} onClick={() => props.onChange(props.period)}>
            {admin_t('admin.common.' + props.period)}
        </button>
    )
}

function Div_member_dashboard_loading(props) {
    const palette = member_patch_get_palette(props.themeMode)
    return (
        <div class="flex flex-col w-full space-y-6 animate-pulse">
            <div class={'w-full rounded-xl border h-56 ' + palette.loadingCard}></div>
            <div class={'w-full rounded-xl border h-48 ' + palette.loadingCard}></div>
            <div class={'w-full rounded-xl border h-[1360px] ' + palette.loadingCard}></div>
            <p class={'text-center text-sm ' + palette.textMuted}>{admin_t('members.loading')}</p>
        </div>
    )
}

function Div_member_dashboard_error(props) {
    const palette = member_patch_get_palette(props.themeMode)
    return (
        <div class={'w-full rounded-xl border px-6 py-10 text-center font-semibold ' + palette.errorWrap}>
            <p>{admin_t('members.load_error')}</p>
            {props.message ? <p class="mt-2 text-sm font-normal opacity-80">{props.message}</p> : null}
        </div>
    )
}

function Div_member_dashboard() {
    const [dashboard, setDashboard] = React.useState(null)
    const [period, setPeriod] = React.useState(gv_member_period || 'monthly')
    const [errorMessage, setErrorMessage] = React.useState('')
    const themeMode = useMemberPatchThemeMode()
    const palette = member_patch_get_palette(themeMode)

    React.useEffect(() => {
        let mounted = true
        member_patch_get_dashboard(false)
            .then(data => {
                if (!mounted) {
                    return
                }
                setDashboard(data)
                setErrorMessage('')
            })
            .catch(error => {
                if (!mounted) {
                    return
                }
                setErrorMessage(error && error.message ? error.message : '')
            })

        return () => {
            mounted = false
            member_patch_dispose_charts()
        }
    }, [])

    React.useEffect(() => {
        gv_member_period = period
    }, [period])

    React.useEffect(() => {
        const handleResize = () => {
            if (gv_member_membership_chart != null) {
                gv_member_membership_chart.resize()
            }
            if (gv_member_addon_chart != null) {
                gv_member_addon_chart.resize()
            }
            if (gv_member_signup_chart != null) {
                gv_member_signup_chart.resize()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    React.useEffect(() => {
        if (dashboard == null) {
            return
        }
        const timer = window.setTimeout(() => {
            member_patch_render_membership_chart(dashboard, period, themeMode)
            member_patch_render_addon_chart(dashboard, period, themeMode)
            member_patch_render_signup_chart(dashboard, period, themeMode)
        }, 0)
        return () => window.clearTimeout(timer)
    }, [dashboard, period, themeMode])

    if (errorMessage !== '') {
        return <Div_member_dashboard_error themeMode={themeMode} message={errorMessage} />
    }

    if (dashboard == null) {
        return <Div_member_dashboard_loading themeMode={themeMode} />
    }

    const membershipSummary = member_patch_build_membership_summary(dashboard.counter)
    const signupSummary = member_patch_build_signup_summary(dashboard.counter)

    return (
        <div class={'flex flex-col w-full space-y-6 ' + palette.wrapperBg} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
            <Div_member_dashboard_summary_card themeMode={themeMode} title={membershipSummary.title} items={membershipSummary.items} />
            <Div_member_dashboard_summary_card themeMode={themeMode} title={signupSummary.title} items={signupSummary.items} />
            <div class={'w-full rounded-xl border px-6 py-6 ' + palette.cardBg + ' ' + palette.cardBorder + ' ' + palette.cardShadow}>
                <div class={'flex items-center gap-2 pb-4 mb-6 overflow-x-auto border-b ' + palette.divider}>
                    <Div_member_dashboard_tab_button themeMode={themeMode} active={period} period="daily" onChange={setPeriod} />
                    <Div_member_dashboard_tab_button themeMode={themeMode} active={period} period="monthly" onChange={setPeriod} />
                    <Div_member_dashboard_tab_button themeMode={themeMode} active={period} period="yearly" onChange={setPeriod} />
                </div>
                <div class="space-y-10">
                    <div id="member_membership_chart" class="w-full" style={{ height: '420px' }}></div>
                    <div class={'pt-8 border-t ' + palette.divider}>
                        <div id="member_addon_chart" class="w-full" style={{ height: '360px' }}></div>
                    </div>
                    <div class={'pt-8 border-t ' + palette.divider}>
                        <div id="member_signup_chart" class="w-full" style={{ height: '420px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function render_member_dashboard(forceRefresh) {
    if (forceRefresh === true) {
        gv_member_dashboard_cache = null
        member_patch_dispose_charts()
    }

    const target = document.getElementById('div_member_dashboard')
    if (!target) {
        return
    }

    ReactDOM.render(<Div_member_dashboard />, target)
}

function get_member_summary() {
    render_member_dashboard(true)
}

function get_counter_graph(type) {
    if (type === 'daily' || type === 'monthly' || type === 'yearly') {
        gv_member_period = type
        render_member_dashboard(false)
    }
}

function Div_member_search_filter_legacy() {
    const checkboxItem = (id, label) => (
        <div class="flex items-center ps-3">
            <input id={id} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label for={id} class="w-full py-3 ms-2 text-sm font-medium text-gray-900">{label}</label>
        </div>
    )

    const inputRow = (label, id) => (
        <div class="flex flex-row justify-center items-center px-4 w-full md:flex-col md:items-start md:space-y-2">
            <p class="w-1/4 md:w-full">{label}</p>
            <input type="text"
                   id={id}
                   onKeyDown={(event) => { if (event.key === 'Enter') { click_btn_search() } }}
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 md:w-full" />
        </div>
    )

    return (
        <div class="w-full rounded-xl border border-gray-200 bg-white shadow-sm px-6 py-6 space-y-5">
            <div class="flex-row justify-start items-start w-full">
                <p class="font-bold text-gray-900">{admin_t('members.search.title')}</p>
            </div>
            <div class="grid grid-cols-2 w-full gap-8 md:grid-cols-1 md:gap-4">
                {inputRow(admin_t('admin.common.name'), 'txt_name')}
                {inputRow(admin_t('admin.common.email'), 'txt_email')}
            </div>
            <div class="flex flex-col justify-center items-center w-full space-y-1">
                <p class="text-sm w-full text-start underline">{admin_t('admin.common.membership')}</p>
                <ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:grid-cols-2">
                    {checkboxItem('check_member_admin', admin_t('admin.roles.admin') + ', ' + admin_role_label('Developer'))}
                    {checkboxItem('check_member_lifetime', admin_role_label('Lifetime Member'))}
                    {checkboxItem('check_member_regular', admin_role_label('Regular Member'))}
                    {checkboxItem('check_member_spouse', admin_role_label('Spouse Member'))}
                    {checkboxItem('check_member_student', admin_role_label('Student Member'))}
                    {checkboxItem('check_member_member', admin_role_label('Non-member'))}
                </ul>
            </div>
            <div class="flex flex-col justify-center items-center w-full space-y-1">
                <p class="text-sm w-full text-start underline">{admin_t('admin.common.membership_addon')}</p>
                <ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:grid-cols-2">
                    {checkboxItem('check_member_addon_none', admin_t('admin.common.none'))}
                    {checkboxItem('check_member_addon_kssjoint', admin_role_label('KSS Joint Member'))}
                </ul>
            </div>
            <div class="flex flex-col justify-center items-center w-full space-y-1">
                <p class="text-sm w-full text-start underline">{admin_t('admin.common.pending_membership')}</p>
                <ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:grid-cols-2">
                    {checkboxItem('check_member_pending_student', admin_t('members.search.pending_student'))}
                </ul>
            </div>
            <div class="flex flex-row justify-end items-center w-full">
                <div class="flex flex-row justify-end items-center" id="div_btn_search">
                    <Div_btn_search />
                </div>
            </div>
        </div>
    )
}

async function click_btn_download_list() {
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

    const params = new URLSearchParams()
    if (txt_name) { params.set('txt_name', txt_name) }
    if (txt_email) { params.set('txt_email', txt_email) }
    params.set('check_member_admin', check_member_admin)
    params.set('check_member_lifetime', check_member_lifetime)
    params.set('check_member_regular', check_member_regular)
    params.set('check_member_spouse', check_member_spouse)
    params.set('check_member_student', check_member_student)
    params.set('check_member_member', check_member_member)
    params.set('check_member_addon_none', check_member_addon_none)
    params.set('check_member_addon_kssjoint', check_member_addon_kssjoint)
    params.set('check_member_pending_student', check_member_pending_student)

    window.open(member_patch_build_url('/admin/ajax_download_member_list/') + '?' + params.toString())
}

async function click_btn_pending_student(email) {
    let val_yesno = 'YES'
    if (!confirm(admin_t('members.confirm.approve_student'))) {
        val_yesno = 'NO'
    }

    const request_data = new FormData()
    request_data.append('email', email)
    request_data.append('val_yesno', val_yesno)

    await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_pending_student/'), {
        method: 'post',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
        body: request_data
    })

    get_member_summary()
    get_member_list('search')
}

function set_content_legacy() {
    function Div_content() {
        return (
            <div class="flex flex-col w-full space-y-8">
                <div class="flex flex-col justify-center items-center w-full border border-blue-200 shadow p-8 space-y-4 text-center bg-white rounded-lg">
                    <h1 class="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            {admin_t('members.title')}
                        </span>
                    </h1>
                    <p class="max-w-3xl text-gray-600">{admin_t('members.description')}</p>
                </div>
                <div id="div_member_dashboard"></div>
                <div id="div_member_search_filter"></div>
                <div id="div_member_count"></div>
                <div id="div_member_list"></div>
            </div>
        )
    }

    ReactDOM.render(<Div_content />, document.getElementById('div_content'))
    ReactDOM.render(<Div_member_search_filter />, document.getElementById('div_member_search_filter'))

    get_member_list('init')
    get_member_summary()

    if (gv_member_scroll_handler != null) {
        window.removeEventListener('scroll', gv_member_scroll_handler)
    }

    gv_member_scroll_handler = () => {
        const isScrollEnded = window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight
        if (isScrollEnded && !toggle_page && ((page_num * 30) < member_counter)) {
            get_member_list('next')
        }
    }

    window.addEventListener('scroll', gv_member_scroll_handler)
}

function set_main_legacy() {
    render_admin_shell('members', set_content)
}


// ===== Members mode split + redesigned Member Management (analytics / management) =====
window.StatKISS_ADMIN_I18N.register('members_mode_patch_20260327_1705', {
    en: {
        'members.mode.analytics': 'Member Analytics',
        'members.search.reset': 'Reset Filters'
    },
    ko: {
        'members.mode.analytics': '회원 분석',
        'members.search.reset': '필터 초기화'
    },
    ja: {
        'members.mode.analytics': '会員分析',
        'members.search.reset': 'フィルターをリセット'
    },
    'zh-Hans': {
        'members.mode.analytics': '会员分析',
        'members.search.reset': '重置筛选'
    },
    'zh-Hant': {
        'members.mode.analytics': '會員分析',
        'members.search.reset': '重設篩選'
    },
    es: {
        'members.mode.analytics': 'Analítica de miembros',
        'members.search.reset': 'Restablecer filtros'
    },
    fr: {
        'members.mode.analytics': 'Analyse des membres',
        'members.search.reset': 'Réinitialiser les filtres'
    },
    de: {
        'members.mode.analytics': 'Mitgliederanalyse',
        'members.search.reset': 'Filter zurücksetzen'
    },
    'pt-BR': {
        'members.mode.analytics': 'Análise de membros',
        'members.search.reset': 'Redefinir filtros'
    },
    ru: {
        'members.mode.analytics': 'Аналитика участников',
        'members.search.reset': 'Сбросить фильтры'
    },
    id: {
        'members.mode.analytics': 'Analitik anggota',
        'members.search.reset': 'Setel ulang filter'
    },
    vi: {
        'members.mode.analytics': 'Phân tích hội viên',
        'members.search.reset': 'Đặt lại bộ lọc'
    },
    th: {
        'members.mode.analytics': 'การวิเคราะห์สมาชิก',
        'members.search.reset': 'รีเซ็ตตัวกรอง'
    },
    ms: {
        'members.mode.analytics': 'Analitik ahli',
        'members.search.reset': 'Tetapkan semula penapis'
    },
    fil: {
        'members.mode.analytics': 'Analytics ng mga miyembro',
        'members.search.reset': 'I-reset ang mga filter'
    },
    hi: {
        'members.mode.analytics': 'सदस्य विश्लेषण',
        'members.search.reset': 'फ़िल्टर रीसेट करें'
    },
    ar: {
        'members.mode.analytics': 'تحليلات الأعضاء',
        'members.search.reset': 'إعادة تعيين عوامل التصفية'
    },
    it: {
        'members.mode.analytics': 'Analisi membri',
        'members.search.reset': 'Reimposta filtri'
    },
    nl: {
        'members.mode.analytics': 'Ledenanalyse',
        'members.search.reset': 'Filters resetten'
    },
    pl: {
        'members.mode.analytics': 'Analityka członków',
        'members.search.reset': 'Resetuj filtry'
    },
    sv: {
        'members.mode.analytics': 'Medlemsanalys',
        'members.search.reset': 'Återställ filter'
    },
    tr: {
        'members.mode.analytics': 'Üye analitiği',
        'members.search.reset': 'Filtreleri sıfırla'
    },
    uk: {
        'members.mode.analytics': 'Аналітика учасників',
        'members.search.reset': 'Скинути фільтри'
    }
});

function member_patch_get_active_mode() {
    const parts = String(window.location.pathname || '').split('/').filter(Boolean)
    const adminIndex = parts.indexOf('admin')
    if (adminIndex === -1) {
        return 'analytics'
    }

    if (parts[adminIndex + 1] !== 'members') {
        return 'analytics'
    }

    const rawMode = String(parts[adminIndex + 2] || '').trim().toLowerCase()
    if (rawMode === 'management') {
        return 'management'
    }

    return 'analytics'
}

function member_patch_build_mode_href(mode) {
    if (mode === 'management') {
        return admin_build_url('/admin/members/management/')
    }

    return admin_build_url('/admin/members/')
}

function member_management_get_palette(themeMode) {
    if (themeMode === 'dark') {
        return {
            page: 'bg-transparent',
            navWrap: 'rounded-2xl border border-slate-700 bg-slate-900/70 shadow-sm p-2',
            navActive: 'bg-blue-500/15 border border-blue-400/40 text-blue-200',
            navInactive: 'bg-transparent border border-transparent text-slate-300 hover:bg-slate-800 hover:border-slate-700',
            panel: 'rounded-2xl border border-slate-700 bg-slate-900/70 shadow-sm p-6',
            panelSoft: 'rounded-2xl border border-slate-700 bg-slate-950/50 p-4',
            heading: 'text-slate-50',
            body: 'text-slate-200',
            muted: 'text-slate-400',
            input: 'w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20',
            checkboxItem: 'flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 transition hover:border-slate-600',
            checkbox: 'h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500',
            primaryBtn: 'inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30',
            secondaryBtn: 'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-400/20',
            tertiaryBtn: 'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400/20',
            countNumber: 'text-slate-50',
            countLabel: 'text-slate-300',
            memberCard: 'rounded-2xl border border-slate-700 bg-slate-900/70 shadow-sm p-5',
            sectionCard: 'rounded-2xl border border-slate-700 bg-slate-950/50 p-4',
            sectionLabel: 'text-sm font-semibold text-slate-200',
            name: 'text-lg font-semibold text-slate-50',
            email: 'text-sm text-slate-400',
            pendingBadge: 'inline-flex items-center rounded-full border border-rose-400/30 bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-200',
            officerBadge: 'inline-flex items-center rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-100',
            metaChip: 'inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200',
            emptyWrap: 'rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-12 text-center text-slate-300',
            emptyMuted: 'text-slate-500',
            link: 'text-xs break-all text-blue-300 underline underline-offset-2',
            dangerText: 'text-rose-300',
            loadingCard: 'rounded-2xl border border-slate-700 bg-slate-900/70',
            spinnerTrack: '#334155',
            spinnerFill: 'currentColor',
            skeletonBase: 'bg-slate-800',
            skeletonSoft: 'bg-slate-800/70',
            skeletonStrong: 'bg-slate-700'
        }
    }

    return {
        page: 'bg-transparent',
        navWrap: 'rounded-2xl border border-slate-200 bg-white shadow-sm p-2',
        navActive: 'bg-blue-50 border border-blue-200 text-blue-700',
        navInactive: 'bg-transparent border border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200',
        panel: 'rounded-2xl border border-slate-200 bg-white shadow-sm p-6',
        panelSoft: 'rounded-2xl border border-slate-200 bg-slate-50 p-4',
        heading: 'text-slate-900',
        body: 'text-slate-700',
        muted: 'text-slate-500',
        input: 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        checkboxItem: 'flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50',
        checkbox: 'h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500',
        primaryBtn: 'inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200',
        secondaryBtn: 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200',
        tertiaryBtn: 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200',
        countNumber: 'text-slate-900',
        countLabel: 'text-slate-600',
        memberCard: 'rounded-2xl border border-slate-200 bg-white shadow-sm p-5',
        sectionCard: 'rounded-2xl border border-slate-200 bg-slate-50 p-4',
        sectionLabel: 'text-sm font-semibold text-slate-700',
        name: 'text-lg font-semibold text-slate-900',
        email: 'text-sm text-slate-500',
        pendingBadge: 'inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600',
        officerBadge: 'inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700',
        metaChip: 'inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700',
        emptyWrap: 'rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-slate-700',
        emptyMuted: 'text-slate-500',
        link: 'text-xs break-all text-blue-600 underline underline-offset-2',
        dangerText: 'text-rose-600',
        loadingCard: 'rounded-2xl border border-slate-200 bg-slate-50',
        spinnerTrack: '#E5E7EB',
        spinnerFill: 'currentColor',
        skeletonBase: 'bg-slate-200',
        skeletonSoft: 'bg-slate-200/70',
        skeletonStrong: 'bg-slate-400/80'
    }
}

function member_management_role_tone(roleName, themeMode) {
    const isDark = themeMode === 'dark'

    const activeMap = {
        'Lifetime Member': isDark ? 'border-amber-400/35 bg-amber-500/15 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-700',
        'Regular Member': isDark ? 'border-sky-400/35 bg-sky-500/15 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-700',
        'Spouse Member': isDark ? 'border-violet-400/35 bg-violet-500/15 text-violet-200' : 'border-violet-200 bg-violet-50 text-violet-700',
        'Student Member': isDark ? 'border-emerald-400/35 bg-emerald-500/15 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700',
        'Non-member': isDark ? 'border-slate-500/35 bg-slate-700/40 text-slate-200' : 'border-slate-300 bg-slate-100 text-slate-700',
        'Administrator': isDark ? 'border-rose-400/35 bg-rose-500/15 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-700',
        'Developer': isDark ? 'border-rose-400/35 bg-rose-500/15 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-700'
    }

    return activeMap[roleName] || (isDark
        ? 'border-blue-400/35 bg-blue-500/15 text-blue-200'
        : 'border-blue-200 bg-blue-50 text-blue-700')
}

function Div_member_mode_tabs(props) {
    const themeMode = member_patch_get_theme_mode()
    const palette = member_management_get_palette(themeMode)
    const activeMode = props.activeMode || member_patch_get_active_mode()
    const items = [
        { key: 'analytics', label: admin_t('members.mode.analytics') },
        { key: 'management', label: admin_t('members.title') }
    ]

    return (
        <div class="w-full" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
            <div class={palette.navWrap}>
                <div class="flex flex-col gap-2 sm:flex-row">
                    {items.map(item => {
                        const isActive = item.key === activeMode
                        const className = isActive
                            ? 'flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ' + palette.navActive
                            : 'flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ' + palette.navInactive

                        return (
                            <button
                                key={item.key}
                                type="button"
                                aria-current={isActive ? 'page' : undefined}
                                class={className}
                                onClick={() => location.href = member_patch_build_mode_href(item.key)}>
                                {item.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function Div_member_list_skeleton() {
    const palette = member_management_get_palette(member_patch_get_theme_mode())
    return (
        <div class="flex flex-col space-y-4">
            {[0, 1, 2, 3].map(idx => (
                <div key={idx} class={palette.loadingCard + ' p-5 animate-pulse'}>
                    <div class="flex flex-col gap-4">
                        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div class="space-y-2">
                                <div class={'h-4 w-40 rounded-full ' + palette.skeletonStrong}></div>
                                <div class={'h-3 w-56 rounded-full ' + palette.skeletonBase}></div>
                            </div>
                            <div class={'h-10 w-40 rounded-xl ' + palette.skeletonBase}></div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 xl:grid-cols-5">
                            <div class={'xl:col-span-3 rounded-2xl p-4 ' + palette.skeletonSoft}>
                                <div class={'h-4 w-32 rounded-full mb-4 ' + palette.skeletonStrong}></div>
                                <div class="grid grid-cols-2 gap-2 lg:grid-cols-3">
                                    {[0, 1, 2, 3, 4, 5].map(chip => <div key={chip} class={'h-9 rounded-full ' + palette.skeletonStrong}></div>)}
                                </div>
                            </div>
                            <div class={'xl:col-span-2 rounded-2xl p-4 ' + palette.skeletonSoft}>
                                <div class={'h-4 w-32 rounded-full mb-4 ' + palette.skeletonStrong}></div>
                                <div class={'h-9 w-40 rounded-full ' + palette.skeletonStrong}></div>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            {[0, 1, 2].map(meta => <div key={meta} class={'h-8 w-32 rounded-full ' + palette.skeletonBase}></div>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function Div_member_count_skeleton() {
    const palette = member_management_get_palette(member_patch_get_theme_mode())
    return (
        <div class={palette.panel + ' animate-pulse'}>
            <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div class="space-y-3">
                    <div class={'h-3 w-36 rounded-full ' + palette.skeletonBase}></div>
                    <div class={'h-10 w-28 rounded-full ' + palette.skeletonStrong}></div>
                    <div class={'h-3 w-64 rounded-full ' + palette.skeletonBase}></div>
                </div>
                <div class={'h-12 w-44 rounded-xl ' + palette.skeletonBase}></div>
            </div>
        </div>
    )
}

function Div_btn_search() {
    const palette = member_management_get_palette(member_patch_get_theme_mode())
    return (
        <button type="button"
                onClick={() => click_btn_search()}
                class={palette.primaryBtn}>
            {admin_t('admin.common.search')}
        </button>
    )
}

function Div_btn_search_loading() {
    const palette = member_management_get_palette(member_patch_get_theme_mode())
    return (
        <button type="button"
                class={palette.primaryBtn + ' cursor-not-allowed opacity-90'}>
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill={palette.spinnerTrack}/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill={palette.spinnerFill}/>
            </svg>
            {admin_t('admin.common.search')}
        </button>
    )
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

            {props.role_expired_at ? (
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

function Div_member_list(props) {
    const themeMode = member_patch_get_theme_mode()
    const palette = member_management_get_palette(themeMode)
    const rows = Array.isArray(props.data) ? props.data : Object.values(props.data || {})

    if (!rows.length) {
        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class={palette.emptyWrap}>
                    <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                </div>
                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        )
    }

    return (
        <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
            {rows.map((member, idx) => (
                <div key={member.uuid || member.email || idx} class={palette.memberCard}>
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                            <div class="flex flex-col gap-3">
                                <div class="flex flex-wrap items-center gap-2">
                                    <p class={palette.name}>{member.name}</p>
                                    {member.role_pending == 'Student Member' ? (
                                        <button
                                            type="button"
                                            class={palette.pendingBadge}
                                            onClick={() => click_btn_pending_student(member.email)}>
                                            {admin_t('admin.roles.pending_student_application')}
                                        </button>
                                    ) : null}
                                    {member.officer !== 'Member' ? (
                                        <p class={palette.officerBadge}>{member.officer}</p>
                                    ) : null}
                                </div>
                                <p class={palette.email}>{member.email}</p>
                            </div>

                            <div class="flex flex-col items-start gap-2 xl:items-end">
                                <button
                                    type="button"
                                    onClick={() => click_btn_like_change_password(member.email)}
                                    class={palette.tertiaryBtn}>
                                    {admin_t('members.card.change_password')}
                                </button>
                                <div id={'div_member_list_btn_change_password_' + member.email} class={palette.link}></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-4 xl:grid-cols-5">
                            <div class="xl:col-span-3">
                                <div class={palette.sectionCard}>
                                    <div class="mb-4 flex items-center justify-between gap-3">
                                        <p class={palette.sectionLabel}>{admin_t('admin.common.membership')}</p>
                                    </div>

                                    <div id={'div_member_list_btn_membership_' + member.uuid} class="w-full">
                                        <Div_member_list_membership
                                            uuid_user={member.uuid}
                                            current_role={member.role}
                                            role_expired_at={member.role_expired_at}
                                            themeMode={themeMode} />
                                    </div>
                                </div>
                            </div>

                            <div class="xl:col-span-2">
                                <div class={palette.sectionCard}>
                                    <div class="mb-4 flex items-center justify-between gap-3">
                                        <p class={palette.sectionLabel}>{admin_t('admin.common.membership_addon')}</p>
                                    </div>

                                    <div id={'div_member_list_btn_membership_addon_' + member.uuid} class="w-full">
                                        <Div_member_list_membership_addon
                                            uuid_user={member.uuid}
                                            role_addon_kssjoint={member.role_addon_kssjoint}
                                            role_addon_kssjoint_expired_at={member.role_addon_kssjoint_expired_at}
                                            themeMode={themeMode} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <p class={palette.metaChip}>
                                {admin_t('members.card.joined_at', { date: member.created_at })}
                            </p>

                            {member.affiliation ? <p class={palette.metaChip}>{admin_t('members.card.affiliation', { value: member.affiliation })}</p> : null}
                            {member.title ? <p class={palette.metaChip}>{admin_t('members.card.title_label', { value: member.title })}</p> : null}
                            {member.education ? <p class={palette.metaChip}>{admin_t('members.card.education', { value: member.education })}</p> : null}
                            {member.interest ? <p class={palette.metaChip}>{admin_t('members.card.interest', { value: member.interest })}</p> : null}
                        </div>
                    </div>
                </div>
            ))}

            <div id={'div_member_list_' + (page_num + 1).toString()}></div>
        </div>
    )
}

function Div_member_count(props) {
    const palette = member_management_get_palette(member_patch_get_theme_mode())
    const formattedCount = member_patch_format_number(props.count || 0)

    return (
        <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
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

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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

function member_patch_escape_html(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

async function member_patch_copy_to_clipboard(text) {
    const value = String(text || '')
    if (!value) {
        return false
    }

    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(value)
            return true
        } catch (error) {}
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
        textarea.setSelectionRange(0, textarea.value.length)
        const copied = document.execCommand('copy')
        document.body.removeChild(textarea)
        return !!copied
    } catch (error) {
        return false
    }
}

async function click_btn_like_change_password(email) {
    const target = document.getElementById('div_member_list_btn_change_password_' + email)
    if (!target) {
        return
    }

    const alreadyOpen = String(target.getAttribute('data-open') || '').trim() === '1' || String(target.innerHTML || '').trim() !== ''
    if (alreadyOpen) {
        target.innerHTML = ''
        target.setAttribute('data-open', '0')
        return
    }

    target.setAttribute('data-open', '0')
    target.innerHTML = '<div class="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"><span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></span></div>'

    try {
        const request_data = new FormData()
        request_data.append('email', email)

        const data = await fetch(admin_build_url('/admin/ajax_get_change_password_link/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data,
        })
        .then(res => res.json())
        .then(res => res)

        if (!data || data.exist !== 'EXIST' || !data.url) {
            const message = (data && (data.message || data.error || data.exist)) || admin_t('members.load_error')
            target.setAttribute('data-open', '1')
            target.innerHTML = '<div class="mt-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">' + member_patch_escape_html(message) + '</div>'
            return
        }

        const copied = await member_patch_copy_to_clipboard(data.url)
        const topMessage = copied ? admin_t('members.password_link.copied') : admin_t('members.password_link.copy_failed')

        const segments = [
            '<div class="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">',
            '<p class="font-semibold text-emerald-700">' + member_patch_escape_html(topMessage) + '</p>',
            '<p class="mt-2 text-slate-600">' + member_patch_escape_html(admin_t('members.password_link.send_notice')) + '</p>',
            '<p class="mt-2 text-red-600">' + member_patch_escape_html(admin_t('members.password_link.warning')) + '</p>'
        ]

        if (!copied) {
            segments.push(
                '<div class="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-3">' +
                '<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">' + member_patch_escape_html(admin_t('members.password_link.manual_copy')) + '</p>' +
                '<div class="break-all text-sm text-slate-700">' + member_patch_escape_html(data.url) + '</div>' +
                '</div>'
            )
        }

        segments.push('</div>')
        target.setAttribute('data-open', '1')
        target.innerHTML = segments.join('')
    } catch (error) {
        target.setAttribute('data-open', '1')
        target.innerHTML = '<div class="mt-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">' + member_patch_escape_html((error && error.message) ? error.message : admin_t('members.load_error')) + '</div>'
    }
}


function member_patch_capture_filter_state() {
    const ids = [
        'txt_name',
        'txt_email',
        'check_member_officer_yes',
        'check_member_officer_no',
        'check_member_admin',
        'check_member_lifetime',
        'check_member_regular',
        'check_member_spouse',
        'check_member_student',
        'check_member_member',
        'check_member_addon_none',
        'check_member_addon_kssjoint',
        'check_member_pending_student'
    ]

    const state = {}
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (!el) {
            return
        }
        state[id] = el.type === 'checkbox' ? !!el.checked : el.value
    })
    return state
}

function member_patch_restore_filter_state(state) {
    if (!state) {
        return
    }
    Object.keys(state).forEach(id => {
        const el = document.getElementById(id)
        if (!el) {
            return
        }
        if (el.type === 'checkbox') {
            el.checked = !!state[id]
        } else {
            el.value = state[id] || ''
        }
    })
}

function member_patch_get_cached_member_rows() {
    return Object.keys(gv_member_list_pages)
        .map(key => Number(key))
        .sort((a, b) => a - b)
        .reduce((acc, key) => {
            const rows = gv_member_list_pages[key]
            if (Array.isArray(rows)) {
                return acc.concat(rows)
            }
            return acc.concat(Object.values(rows || {}))
        }, [])
}

function member_patch_refresh_theme_ui() {
    const activeMode = member_patch_get_active_mode()
    const filterState = member_patch_capture_filter_state()

    set_content()

    if (activeMode === 'management') {
        member_patch_restore_filter_state(filterState)
        member_patch_rerender_management_from_cache()
        return
    }

    render_member_dashboard(false)
}

function member_patch_install_theme_listener() {
    if (gv_member_theme_observer_installed) {
        return
    }

    gv_member_theme_observer_installed = true
    gv_member_last_theme_mode = member_patch_get_theme_mode()

    const refreshThemeMode = () => {
        const nextMode = member_patch_get_theme_mode()
        if (nextMode === gv_member_last_theme_mode) {
            return
        }
        gv_member_last_theme_mode = nextMode
        member_patch_refresh_theme_ui()
    }

    const observer = new MutationObserver(refreshThemeMode)
    ;[
        document.documentElement,
        document.body,
        document.getElementById('div_main'),
        document.getElementById('div_admin_menu'),
        document.getElementById('div_content')
    ].filter(Boolean).forEach(target => {
        observer.observe(target, {
            attributes: true,
            attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'data-mode', 'data-statkiss-theme', 'theme']
        })
    })

    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
    if (media) {
        if (media.addEventListener) {
            media.addEventListener('change', refreshThemeMode)
        } else if (media.addListener) {
            media.addListener(refreshThemeMode)
        }
    }
}

function set_main() {
    render_admin_shell('members', set_content)
}


// ===== Member management performance patch 2026-03-28 =====
let gv_member_next_cursor_joined_at = ''
let gv_member_next_cursor_uuid = ''
let gv_member_has_next = false
let gv_member_fetch_controller = null
let gv_member_request_serial = 0
let gv_member_active_request_id = 0
let gv_member_intersection_observer = null
let gv_member_filter_state = null

function member_patch_clear_member_list_observer() {
    if (gv_member_intersection_observer != null) {
        gv_member_intersection_observer.disconnect()
        gv_member_intersection_observer = null
    }
}

function member_patch_clear_scroll_handler() {
    member_patch_clear_member_list_observer()
    if (gv_member_scroll_handler != null) {
        window.removeEventListener('scroll', gv_member_scroll_handler)
        gv_member_scroll_handler = null
    }
}

function member_patch_abort_member_fetch() {
    if (gv_member_fetch_controller != null) {
        try { gv_member_fetch_controller.abort() } catch (error) {}
        gv_member_fetch_controller = null
    }
}

function member_patch_apply_default_member_filters() {
    ;['check_member_admin','check_member_lifetime','check_member_regular','check_member_spouse','check_member_student','check_member_member','check_member_addon_none','check_member_addon_kssjoint','check_member_officer_yes','check_member_officer_no'].forEach(id => {
        const target = document.getElementById(id)
        if (target) { target.checked = true }
    })
    const pendingTarget = document.getElementById('check_member_pending_student')
    if (pendingTarget) { pendingTarget.checked = false }
}

function member_patch_read_member_filter_state_from_dom() {
    return {
        txt_name: document.getElementById('txt_name') ? document.getElementById('txt_name').value.trim() : '',
        txt_email: document.getElementById('txt_email') ? document.getElementById('txt_email').value.trim() : '',
        check_member_admin: !!(document.getElementById('check_member_admin') && document.getElementById('check_member_admin').checked),
        check_member_lifetime: !!(document.getElementById('check_member_lifetime') && document.getElementById('check_member_lifetime').checked),
        check_member_regular: !!(document.getElementById('check_member_regular') && document.getElementById('check_member_regular').checked),
        check_member_spouse: !!(document.getElementById('check_member_spouse') && document.getElementById('check_member_spouse').checked),
        check_member_student: !!(document.getElementById('check_member_student') && document.getElementById('check_member_student').checked),
        check_member_member: !!(document.getElementById('check_member_member') && document.getElementById('check_member_member').checked),
        check_member_addon_none: !!(document.getElementById('check_member_addon_none') && document.getElementById('check_member_addon_none').checked),
        check_member_addon_kssjoint: !!(document.getElementById('check_member_addon_kssjoint') && document.getElementById('check_member_addon_kssjoint').checked),
        check_member_pending_student: !!(document.getElementById('check_member_pending_student') && document.getElementById('check_member_pending_student').checked),
    }
}

function member_patch_clone_filter_state(state) {
    return {
        txt_name: state && state.txt_name ? String(state.txt_name) : '',
        txt_email: state && state.txt_email ? String(state.txt_email) : '',
        check_member_admin: !!(state && state.check_member_admin),
        check_member_lifetime: !!(state && state.check_member_lifetime),
        check_member_regular: !!(state && state.check_member_regular),
        check_member_spouse: !!(state && state.check_member_spouse),
        check_member_student: !!(state && state.check_member_student),
        check_member_member: !!(state && state.check_member_member),
        check_member_addon_none: !!(state && state.check_member_addon_none),
        check_member_addon_kssjoint: !!(state && state.check_member_addon_kssjoint),
        check_member_pending_student: !!(state && state.check_member_pending_student),
    }
}

function member_patch_apply_filter_state_to_form_data(formData, filterState) {
    const state = member_patch_clone_filter_state(filterState)
    formData.append('txt_name', state.txt_name)
    formData.append('txt_email', state.txt_email)
    formData.append('check_member_admin', state.check_member_admin ? 'YES' : 'NO')
    formData.append('check_member_lifetime', state.check_member_lifetime ? 'YES' : 'NO')
    formData.append('check_member_regular', state.check_member_regular ? 'YES' : 'NO')
    formData.append('check_member_spouse', state.check_member_spouse ? 'YES' : 'NO')
    formData.append('check_member_student', state.check_member_student ? 'YES' : 'NO')
    formData.append('check_member_member', state.check_member_member ? 'YES' : 'NO')
    formData.append('check_member_addon_none', state.check_member_addon_none ? 'YES' : 'NO')
    formData.append('check_member_addon_kssjoint', state.check_member_addon_kssjoint ? 'YES' : 'NO')
    formData.append('check_member_pending_student', state.check_member_pending_student ? 'YES' : 'NO')
}

function member_patch_attach_member_list_observer() {
    member_patch_clear_member_list_observer()
    if (!gv_member_has_next || typeof IntersectionObserver === 'undefined') { return }
    const sentinel = document.getElementById('div_member_list_' + (page_num + 1).toString())
    if (!sentinel) { return }
    gv_member_intersection_observer = new IntersectionObserver(entries => {
        const entry = entries && entries[0] ? entries[0] : null
        if (!entry || !entry.isIntersecting) { return }
        if (toggle_page || !gv_member_has_next) { return }
        get_member_list('next')
    }, { root: null, rootMargin: '700px 0px', threshold: 0 })
    gv_member_intersection_observer.observe(sentinel)
}

async function get_member_list(mode) {
    const isInitialMode = mode === 'init' || mode === 'search'
    if (!isInitialMode && (toggle_page || !gv_member_has_next)) { return }

    if (mode === 'init') {
        page_num = 1
        member_counter = 0
        gv_member_list_pages = {}
        gv_member_next_cursor_joined_at = ''
        gv_member_next_cursor_uuid = ''
        gv_member_has_next = false
        member_patch_apply_default_member_filters()
        gv_member_filter_state = member_patch_read_member_filter_state_from_dom()
        ReactDOM.render(<Div_member_list_skeleton />, document.getElementById('div_member_list'))
        ReactDOM.render(<Div_member_count_skeleton />, document.getElementById('div_member_count'))
    } else if (mode === 'search') {
        page_num = 1
        member_counter = 0
        gv_member_list_pages = {}
        gv_member_next_cursor_joined_at = ''
        gv_member_next_cursor_uuid = ''
        gv_member_has_next = false
        gv_member_filter_state = member_patch_read_member_filter_state_from_dom()
        ReactDOM.render(<Div_member_list_skeleton />, document.getElementById('div_member_list'))
        ReactDOM.render(<Div_member_count_skeleton />, document.getElementById('div_member_count'))
    } else {
        if (!gv_member_filter_state) { gv_member_filter_state = member_patch_read_member_filter_state_from_dom() }
        page_num += 1
        const nextTarget = document.getElementById('div_member_list_' + page_num.toString())
        if (nextTarget) { ReactDOM.render(<Div_member_list_skeleton />, nextTarget) }
    }

    const filterState = member_patch_clone_filter_state(gv_member_filter_state || member_patch_read_member_filter_state_from_dom())
    gv_member_filter_state = filterState

    member_patch_abort_member_fetch()
    member_patch_clear_member_list_observer()

    toggle_page = true
    const controller = new AbortController()
    gv_member_fetch_controller = controller
    const requestId = ++gv_member_request_serial
    gv_member_active_request_id = requestId

    const request_data = new FormData()
    request_data.append('page', page_num)
    request_data.append('include_count', isInitialMode ? 'YES' : 'NO')
    member_patch_apply_filter_state_to_form_data(request_data, filterState)
    if (!isInitialMode) {
        request_data.append('cursor_joined_at', gv_member_next_cursor_joined_at || '')
        request_data.append('cursor_uuid', gv_member_next_cursor_uuid || '')
    }

    try {
        const data = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_get_member_list/'), {
            method: 'post',
            headers: { 'X-CSRFToken': getCookie('csrftoken') },
            body: request_data,
            signal: controller.signal,
        })
        if (requestId !== gv_member_active_request_id) { return }

        const rows = Array.isArray(data.list) ? data.list : Object.values(data.list || {})
        gv_member_has_next = !!data.has_next
        gv_member_next_cursor_joined_at = data.next_cursor_joined_at || ''
        gv_member_next_cursor_uuid = data.next_cursor_uuid || ''

        if (isInitialMode) {
            gv_member_list_pages = {}
            gv_member_list_pages[1] = rows
            if (data.count && typeof data.count.cnt !== 'undefined' && data.count.cnt !== null) {
                member_counter = member_patch_safe_number(data.count.cnt)
            }
            ReactDOM.render(<Div_member_list data={rows} />, document.getElementById('div_member_list'))
            ReactDOM.render(<Div_member_count count={member_counter} />, document.getElementById('div_member_count'))
        } else {
            const target = document.getElementById('div_member_list_' + page_num.toString())
            if (!rows.length) {
                if (target) { target.innerHTML = '' }
                page_num = Math.max(1, page_num - 1)
                gv_member_has_next = false
                gv_member_next_cursor_joined_at = ''
                gv_member_next_cursor_uuid = ''
            } else {
                gv_member_list_pages[page_num] = rows
                if (target) { ReactDOM.render(<Div_member_list data={rows} />, target) }
            }
        }

        member_patch_attach_member_list_observer()
    } catch (error) {
        if (error && error.name === 'AbortError') { return }
        console.error('get_member_list failed', error)
        if (isInitialMode) {
            ReactDOM.render(<Div_member_list data={[]} />, document.getElementById('div_member_list'))
            ReactDOM.render(<Div_member_count count={member_counter} />, document.getElementById('div_member_count'))
        }
    } finally {
        if (requestId === gv_member_active_request_id) {
            toggle_page = false
            gv_member_fetch_controller = null
        }
    }
}

async function click_btn_search() {
    const target = document.getElementById('div_btn_search')
    if (target) { ReactDOM.render(<Div_btn_search_loading />, target) }
    try { await get_member_list('search') } finally { if (target) { ReactDOM.render(<Div_btn_search />, target) } }
}

function click_btn_reset_filters() {
    member_patch_abort_member_fetch()
    if (document.getElementById('txt_name')) { document.getElementById('txt_name').value = '' }
    if (document.getElementById('txt_email')) { document.getElementById('txt_email').value = '' }
    member_patch_apply_default_member_filters()
    click_btn_search()
}

function member_patch_rerender_management_from_cache() {
    const filterTarget = document.getElementById('div_member_search_filter')
    const countTarget = document.getElementById('div_member_count')
    const listTarget = document.getElementById('div_member_list')
    page_num = Math.max(1, Object.keys(gv_member_list_pages).length || 1)
    if (filterTarget) {
        ReactDOM.render(<Div_member_search_filter />, filterTarget)
        if (gv_member_filter_state) { member_patch_restore_filter_state(gv_member_filter_state) }
    }
    if (countTarget) {
        if (member_counter > 0 || Object.keys(gv_member_list_pages).length > 0) {
            ReactDOM.render(<Div_member_count count={member_counter} />, countTarget)
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
    member_patch_attach_member_list_observer()
}

function set_content() {
    member_patch_install_theme_listener()
    const activeMode = member_patch_get_active_mode()
    member_patch_clear_scroll_handler()
    member_patch_dispose_charts()

    function Div_member_analytics_page() {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        return (
            <div class={'flex flex-col w-full space-y-6 ' + palette.page} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <Div_member_mode_tabs activeMode="analytics" />
                <div id="div_member_dashboard"></div>
            </div>
        )
    }

    function Div_member_management_page() {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        return (
            <div class={'flex flex-col w-full space-y-6 ' + palette.page} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <Div_member_mode_tabs activeMode="management" />
                <div class="space-y-4">
                    <div id="div_member_search_filter"></div>
                    <div id="div_member_count"></div>
                    <div id="div_member_list"></div>
                </div>
            </div>
        )
    }

    if (activeMode === 'management') {
        ReactDOM.render(<Div_member_management_page />, document.getElementById('div_content'))
        ReactDOM.render(<Div_member_search_filter />, document.getElementById('div_member_search_filter'))

        if (gv_member_filter_state && Object.keys(gv_member_list_pages).length > 0) {
            member_patch_restore_filter_state(gv_member_filter_state)
            member_patch_rerender_management_from_cache()
        } else {
            get_member_list('init')
        }

        if (typeof IntersectionObserver === 'undefined') {
            gv_member_scroll_handler = () => {
                const isScrollEnded = window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight
                if (isScrollEnded && !toggle_page && gv_member_has_next) { get_member_list('next') }
            }
            window.addEventListener('scroll', gv_member_scroll_handler)
        }
        return
    }

    ReactDOM.render(<Div_member_analytics_page />, document.getElementById('div_content'))
    get_member_summary()
}


// ===== Integrated member management patch 2026-03-29 =====
(function () {
    const MEMBER_PATCH_LOCALES = [
        'en','ko','ja','zh-Hans','zh-Hant','es','fr','de','pt-BR','ru','id','vi','th','ms','fil','hi','ar','it','nl','pl','sv','tr','uk'
    ]

    const EXPIRY_EN = {
        'members.expiry.never': 'Lifetime — never expires',
        'members.expiry.dialog.title.role': 'Set membership expiry',
        'members.expiry.dialog.title.addon': 'Set add-on expiry',
        'members.expiry.dialog.title.pending_student': 'Approve Student Member',
        'members.expiry.dialog.description.role': 'Pick an expiry date from the calendar.',
        'members.expiry.dialog.description.addon': 'Pick an add-on expiry date from the calendar.',
        'members.expiry.dialog.description.pending_student': 'Choose the Student Member expiry date for this approval.',
        'members.expiry.dialog.input_calendar': 'Calendar',
        'members.expiry.dialog.input_text': 'Date text',
        'members.expiry.dialog.placeholder': 'YYYY-MM-DD',
        'members.expiry.dialog.default_hint': 'Default: one year from today',
        'members.expiry.dialog.confirm': 'Confirm',
        'members.expiry.dialog.cancel': 'Cancel',
        'members.expiry.dialog.invalid_date': 'Please enter a valid date in YYYY-MM-DD format.',
        'members.count.pending_student': '{count} Student Member request(s) pending',
        'members.pending.review': 'Review pending requests',
        'members.pending.review_hint': 'There are Student Member requests waiting for admin approval.',
        'members.confirm.reject_student': 'Do you want to reject this pending Student Member request?'
    }
    const EXPIRY_KO = {
        'members.expiry.never': '평생 만료되지 않음',
        'members.expiry.dialog.title.role': '멤버십 만료일 설정',
        'members.expiry.dialog.title.addon': '부가 멤버십 만료일 설정',
        'members.expiry.dialog.title.pending_student': '학생회원 승인',
        'members.expiry.dialog.description.role': '달력에서 만료일을 선택하세요.',
        'members.expiry.dialog.description.addon': '달력에서 부가 멤버십 만료일을 선택하세요.',
        'members.expiry.dialog.description.pending_student': '학생회원 승인에 사용할 만료일을 선택하세요.',
        'members.expiry.dialog.input_calendar': '달력',
        'members.expiry.dialog.input_text': '날짜 입력',
        'members.expiry.dialog.placeholder': 'YYYY-MM-DD',
        'members.expiry.dialog.default_hint': '기본값: 오늘 기준 1년 후',
        'members.expiry.dialog.confirm': '확인',
        'members.expiry.dialog.cancel': '취소',
        'members.expiry.dialog.invalid_date': 'YYYY-MM-DD 형식의 올바른 날짜를 입력하세요.',
        'members.count.pending_student': '학생회원 승인 대기 {count}건',
        'members.pending.review': '대기 신청 검토',
        'members.pending.review_hint': '학생회원 승인 대기중인 멤버가 있습니다.',
        'members.confirm.reject_student': '이 Student Member 대기 신청을 반려하시겠습니까?'
    }
    const patchLocales = {}
    MEMBER_PATCH_LOCALES.forEach(code => {
        patchLocales[code] = code === 'ko' ? EXPIRY_KO : EXPIRY_EN
    })
    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.register === 'function') {
        window.StatKISS_ADMIN_I18N.register('members_management_integrated_patch_20260329', patchLocales)
    }

    window.member_pending_student_counter = typeof window.member_pending_student_counter === 'number' ? window.member_pending_student_counter : 0

    function member_patch_pad_date_part(value) {
        return String(value).padStart(2, '0')
    }
    function member_patch_get_seoul_today_parts() {
        try {
            const formatter = new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
            })
            const partMap = {}
            formatter.formatToParts(new Date()).forEach(part => {
                if (part && part.type) partMap[part.type] = part.value
            })
            return { year: Number(partMap.year), month: Number(partMap.month), day: Number(partMap.day) }
        } catch (error) {
            const today = new Date()
            return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
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
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return ''
        const parts = text.split('-').map(Number)
        const year = parts[0], month = parts[1], day = parts[2]
        const parsed = new Date(year, month - 1, day)
        if (Number.isNaN(parsed.getTime()) || parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return ''
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
        if (checkbox) checkbox.checked = true
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
            const hint = document.createElement('p')
            hint.className = 'text-xs ' + (palette.muted || '')
            hint.textContent = admin_t('members.expiry.dialog.default_hint') + ': ' + defaultDate
            bodyWrap.appendChild(calendarLabel)
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
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay)
                resolve(result)
            }
            const onKeyDown = (event) => {
                if (event.key === 'Escape') return cleanup(null)
                if (event.key === 'Enter') { event.preventDefault(); confirmBtn.click() }
            }
            overlay.addEventListener('click', (event) => { if (event.target === overlay) cleanup(null) })
            cancelBtn.addEventListener('click', () => cleanup(null))
            confirmBtn.addEventListener('click', () => {
                const normalized = member_patch_normalize_expiry_date(dateInput.value)
                if (!normalized) {
                    alert(admin_t('members.expiry.dialog.invalid_date'))
                    dateInput.focus()
                    return
                }
                cleanup(normalized)
            })
            document.addEventListener('keydown', onKeyDown)
            window.setTimeout(() => {
                dateInput.focus()
                try { if (dateInput.showPicker) dateInput.showPicker() } catch (error) {}
            }, 0)
        })
    }
    function member_patch_request_role_expiry(roleName) {
        if (roleName === 'Lifetime Member') return Promise.resolve('9999-12-31')
        if (roleName === 'Non-member') return Promise.resolve('')
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

    window.member_patch_default_expiry_date = member_patch_default_expiry_date
    window.member_patch_normalize_expiry_date = member_patch_normalize_expiry_date
    window.member_patch_is_never_expire = member_patch_is_never_expire
    window.member_patch_is_addon_active = member_patch_is_addon_active
    window.member_patch_focus_pending_students = member_patch_focus_pending_students
    window.member_patch_open_expiry_dialog = member_patch_open_expiry_dialog
    window.member_patch_request_role_expiry = member_patch_request_role_expiry
    window.member_patch_request_addon_expiry = member_patch_request_addon_expiry
    window.member_patch_request_pending_student_expiry = member_patch_request_pending_student_expiry

    click_btn_change_membership = async function (uuid_user, sel_membership, current_role) {
        if (!uuid_user || !sel_membership || sel_membership === current_role) return
        if (current_role === 'Administrator' || current_role === 'Developer') return
        if (!confirm(admin_t('members.confirm.change_membership'))) return
        if (toggle_btn_change_membership) return
        const expiredAt = await member_patch_request_role_expiry(sel_membership)
        if (sel_membership !== 'Lifetime Member' && sel_membership !== 'Non-member' && !expiredAt) return
        toggle_btn_change_membership = true
        try {
            const request_data = new FormData()
            request_data.append('uuid_user', uuid_user)
            request_data.append('sel_membership', sel_membership)
            request_data.append('current_role', current_role)
            request_data.append('expired_at', expiredAt || '')
            await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership/'), {
                method: 'post', headers: { 'X-CSRFToken': getCookie('csrftoken') }, body: request_data,
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

    click_btn_change_membership_addon = async function (uuid_user, sel_membership, current_role) {
        if (!uuid_user || !sel_membership) return
        if (!confirm(admin_t('members.confirm.change_membership_addon'))) return
        if (toggle_btn_change_membership) return
        let expiredAt = ''
        if (!member_patch_is_addon_active(current_role)) {
            expiredAt = await member_patch_request_addon_expiry()
            if (!expiredAt) return
        }
        toggle_btn_change_membership = true
        try {
            const request_data = new FormData()
            request_data.append('uuid_user', uuid_user)
            request_data.append('sel_membership', sel_membership)
            request_data.append('current_role', current_role)
            request_data.append('expired_at', expiredAt || '')
            await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership_addon/'), {
                method: 'post', headers: { 'X-CSRFToken': getCookie('csrftoken') }, body: request_data,
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

    click_btn_pending_student = async function (email) {
        if (!email) return
        let val_yesno = ''
        let expiredAt = ''
        if (confirm(admin_t('members.confirm.approve_student'))) {
            val_yesno = 'YES'
            expiredAt = await member_patch_request_pending_student_expiry()
            if (!expiredAt) return
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
                method: 'post', headers: { 'X-CSRFToken': getCookie('csrftoken') }, body: request_data,
            })
            await get_member_summary()
            await get_member_list('search')
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        }
    }

    Div_member_list_membership = function (props) {
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
                        if (!isActive && !isLocked) click_btn_change_membership(props.uuid_user, roleName, props.current_role)
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
                    <p class="text-xs font-medium text-emerald-500">{admin_t('members.expiry.never')}</p>
                ) : props.role_expired_at ? (
                    <p class="text-xs font-medium text-rose-500">{admin_t('admin.common.expired_on', { date: props.role_expired_at })}</p>
                ) : null}
            </div>
        )
    }

    Div_member_list_membership_addon = function (props) {
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
                    <p class="text-xs font-medium text-rose-500">{admin_t('admin.common.expired_on', { date: props.role_addon_kssjoint_expired_at })}</p>
                ) : null}
            </div>
        )
    }

    Div_member_count = function (props) {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const formattedCount = member_patch_format_number(props.count || 0)
        const pendingCount = member_patch_safe_number(props.pendingStudentCount || 0)
        const isDark = member_patch_get_theme_mode() === 'dark'
        const pendingWrapClass = isDark ? 'rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4' : 'rounded-2xl border border-amber-200 bg-amber-50 p-4'
        const pendingTextClass = isDark ? 'text-amber-100' : 'text-amber-800'
        const pendingMutedClass = isDark ? 'text-amber-200/80' : 'text-amber-700'
        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div class="space-y-2">
                            <p class={'text-sm font-medium ' + palette.countLabel}>{admin_t('members.count', { count: formattedCount })}</p>
                            <p class={'text-4xl font-extrabold tracking-tight ' + palette.countNumber}>{formattedCount}</p>
                        </div>
                        <div>
                            <button type="button" onClick={() => click_btn_download_list()} class={palette.secondaryBtn}>
                                <img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/button_download.svg" class="w-4 h-4 mr-2" />
                                {admin_t('members.list_download')}
                            </button>
                        </div>
                    </div>
                    {pendingCount > 0 ? (
                        <div class={pendingWrapClass}>
                            <div class="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
                                <div class="min-w-0 flex-1 space-y-1" style={{ textAlign: member_patch_is_rtl() ? 'right' : 'left' }}>
                                    <p class={'block text-sm font-semibold ' + pendingTextClass}>{admin_t('members.count.pending_student', { count: member_patch_format_number(pendingCount) })}</p>
                                    <p class={'block text-sm ' + pendingMutedClass}>{admin_t('members.pending.review_hint')}</p>
                                </div>
                                <div class="shrink-0">
                                    <button type="button" onClick={() => member_patch_focus_pending_students()} class={palette.primaryBtn}>
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

    Div_member_search_filter = function () {
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
                <input type="text" id={id} placeholder={label} onKeyDown={(event) => { if (event.key === 'Enter') click_btn_search() }} class={palette.input} />
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
                        <div id="div_btn_search"><Div_btn_search /></div>
                        <button type="button" onClick={() => click_btn_reset_filters()} class={palette.secondaryBtn}>{admin_t('members.search.reset')}</button>
                    </div>
                </div>
            </div>
        )
    }

    function member_patch_render_member_list_single_root(rows, useSkeleton) {
        const listTarget = document.getElementById('div_member_list')
        if (!listTarget) return
        try { ReactDOM.unmountComponentAtNode(listTarget) } catch (error) {}
        listTarget.innerHTML = ''
        if (useSkeleton) {
            ReactDOM.render(<Div_member_list_skeleton />, listTarget)
            return
        }
        ReactDOM.render(<Div_member_list data={Array.isArray(rows) ? rows : []} />, listTarget)
    }

    get_member_list = async function (mode) {
        const isInitialMode = mode === 'init' || mode === 'search'
        if (!isInitialMode && (toggle_page || !gv_member_has_next)) return
        if (mode === 'init') {
            page_num = 1; member_counter = 0; gv_member_list_pages = {}
            gv_member_next_cursor_joined_at = ''; gv_member_next_cursor_uuid = ''; gv_member_has_next = false
            member_patch_apply_default_member_filters()
            gv_member_filter_state = member_patch_read_member_filter_state_from_dom()
            member_patch_render_member_list_single_root([], true)
            ReactDOM.render(<Div_member_count_skeleton />, document.getElementById('div_member_count'))
        } else if (mode === 'search') {
            page_num = 1; member_counter = 0; gv_member_list_pages = {}
            gv_member_next_cursor_joined_at = ''; gv_member_next_cursor_uuid = ''; gv_member_has_next = false
            gv_member_filter_state = member_patch_read_member_filter_state_from_dom()
            member_patch_render_member_list_single_root([], true)
            ReactDOM.render(<Div_member_count_skeleton />, document.getElementById('div_member_count'))
        } else {
            if (!gv_member_filter_state) gv_member_filter_state = member_patch_read_member_filter_state_from_dom()
            page_num += 1
        }
        const filterState = member_patch_clone_filter_state(gv_member_filter_state || member_patch_read_member_filter_state_from_dom())
        gv_member_filter_state = filterState
        member_patch_abort_member_fetch()
        member_patch_clear_member_list_observer()
        toggle_page = true
        const controller = new AbortController()
        gv_member_fetch_controller = controller
        const requestId = ++gv_member_request_serial
        gv_member_active_request_id = requestId
        const request_data = new FormData()
        request_data.append('page', page_num)
        request_data.append('include_count', isInitialMode ? 'YES' : 'NO')
        member_patch_apply_filter_state_to_form_data(request_data, filterState)
        if (!isInitialMode) {
            request_data.append('cursor_joined_at', gv_member_next_cursor_joined_at || '')
            request_data.append('cursor_uuid', gv_member_next_cursor_uuid || '')
        }
        try {
            const data = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_get_member_list/'), {
                method: 'post', headers: { 'X-CSRFToken': getCookie('csrftoken') }, body: request_data, signal: controller.signal,
            })
            if (requestId !== gv_member_active_request_id) return
            const rows = Array.isArray(data.list) ? data.list : Object.values(data.list || {})
            gv_member_has_next = !!data.has_next
            gv_member_next_cursor_joined_at = data.next_cursor_joined_at || ''
            gv_member_next_cursor_uuid = data.next_cursor_uuid || ''
            if (isInitialMode) {
                gv_member_list_pages = {}
                gv_member_list_pages[1] = rows
                if (data.count && typeof data.count.cnt !== 'undefined' && data.count.cnt !== null) member_counter = member_patch_safe_number(data.count.cnt)
                window.member_pending_student_counter = member_patch_safe_number(data && data.count ? data.count.pending_student_cnt : 0)
                if (typeof member_patch_render_filter_panel === 'function') member_patch_render_filter_panel()
                member_patch_render_member_list_single_root(rows, false)
                ReactDOM.render(<Div_member_count count={member_counter} pendingStudentCount={window.member_pending_student_counter} />, document.getElementById('div_member_count'))
            } else {
                if (!rows.length) {
                    page_num = Math.max(1, page_num - 1)
                    gv_member_has_next = false
                    gv_member_next_cursor_joined_at = ''
                    gv_member_next_cursor_uuid = ''
                } else {
                    gv_member_list_pages[page_num] = rows
                }
                member_patch_render_member_list_single_root(member_patch_get_cached_member_rows(), false)
            }
            member_patch_attach_member_list_observer()
        } catch (error) {
            if (error && error.name === 'AbortError') return
            console.error('get_member_list failed', error)
            if (isInitialMode) {
                member_patch_render_member_list_single_root([], false)
                ReactDOM.render(<Div_member_count count={member_counter} pendingStudentCount={window.member_pending_student_counter} />, document.getElementById('div_member_count'))
            }
        } finally {
            if (requestId === gv_member_active_request_id) {
                toggle_page = false
                gv_member_fetch_controller = null
            }
        }
    }

    member_patch_rerender_management_from_cache = function () {
        const filterTarget = document.getElementById('div_member_search_filter')
        const countTarget = document.getElementById('div_member_count')
        page_num = Math.max(1, Object.keys(gv_member_list_pages).length || 1)
        if (filterTarget) {
            ReactDOM.render(<Div_member_search_filter />, filterTarget)
            if (gv_member_filter_state) member_patch_restore_filter_state(gv_member_filter_state)
        }
        if (countTarget) {
            if (member_counter > 0 || Object.keys(gv_member_list_pages).length > 0 || window.member_pending_student_counter > 0) {
                ReactDOM.render(<Div_member_count count={member_counter} pendingStudentCount={window.member_pending_student_counter} />, countTarget)
            } else {
                ReactDOM.render(<Div_member_count_skeleton />, countTarget)
            }
        }
        const rows = member_patch_get_cached_member_rows()
        if (rows.length > 0) member_patch_render_member_list_single_root(rows, false)
        else member_patch_render_member_list_single_root([], true)
        member_patch_attach_member_list_observer()
    }
})();

;(() => {
    if (window.__statkiss_membership_admin_20260329_fix_applied) return
    window.__statkiss_membership_admin_20260329_fix_applied = true

    const member_patch_request_role_expiry = window.member_patch_request_role_expiry
    const member_patch_request_addon_expiry = window.member_patch_request_addon_expiry
    const member_patch_is_addon_active = window.member_patch_is_addon_active

    function member_patch_fix_safe_text(value) {
        if (value === null || value === undefined) return ''
        try { return String(value) } catch (error) { return '' }
    }

    function member_patch_fix_safe_date_text(value) {
        const text = member_patch_fix_safe_text(value).trim()
        if (!text) return null
        return text.slice(0, 10)
    }

    function member_patch_fix_build_officer_text(payload, fallbackOfficer) {
        const isCurrentOfficer = Number((payload && payload.is_current_officer) || 0) === 1
        const officerRoles = member_patch_fix_safe_text(payload && payload.current_officer_roles).trim()
        const officerTerms = member_patch_fix_safe_text(payload && payload.current_officer_term_names).trim()
        if (isCurrentOfficer && officerRoles && officerTerms) return officerRoles + ' · ' + officerTerms
        if (isCurrentOfficer && officerRoles) return officerRoles
        if (isCurrentOfficer) return 'Current Officer'
        return member_patch_fix_safe_text(fallbackOfficer).trim() || 'Member'
    }

    function member_patch_fix_build_list_row(payload, existingRow) {
        const current = existingRow && typeof existingRow === 'object' ? existingRow : {}
        const roleAddonName = member_patch_fix_safe_text(payload && payload.role_addon_kssjoint).trim()
        const nextRow = Object.assign({}, current)
        nextRow.uuid = member_patch_fix_safe_text(payload && payload.uuid).trim() || member_patch_fix_safe_text(current.uuid).trim()
        nextRow.email = member_patch_fix_safe_text(payload && payload.email).trim().toLowerCase() || member_patch_fix_safe_text(current.email).trim().toLowerCase()
        nextRow.name = member_patch_fix_safe_text(payload && payload.name).trim() || member_patch_fix_safe_text(current.name).trim()
        nextRow.affiliation = member_patch_fix_safe_text(payload && payload.affiliation).trim()
        nextRow.title = member_patch_fix_safe_text(payload && payload.title).trim()
        nextRow.role = member_patch_fix_safe_text(payload && payload.role).trim() || 'Non-member'
        nextRow.role_expired_at = member_patch_fix_safe_date_text(payload && payload.role_expired_at)
        nextRow.role_addon_kssjoint = roleAddonName === 'KSS Joint Member' ? 1 : 0
        nextRow.role_addon_kssjoint_expired_at = member_patch_fix_safe_date_text(payload && payload.role_addon_kssjoint_expired_at)
        nextRow.gender = member_patch_fix_safe_text(payload && payload.gender).trim()
        nextRow.education = member_patch_fix_safe_text(payload && payload.education).trim()
        nextRow.interest = member_patch_fix_safe_text(payload && payload.interest).trim()
        nextRow.created_at = member_patch_fix_safe_date_text(payload && payload.date_joined) || member_patch_fix_safe_date_text(current.created_at) || ''
        nextRow.email_subscription = Number((payload && payload.email_subscription) || 0) === 1 ? 1 : 0
        nextRow.officer = member_patch_fix_build_officer_text(payload, current.officer)
        nextRow.officer_term = member_patch_fix_safe_text(payload && payload.current_officer_term_names).trim() || member_patch_fix_safe_text(current.officer_term).trim()
        const payloadHasRolePending = payload && Object.prototype.hasOwnProperty.call(payload, 'role_pending')
        nextRow.role_pending = payloadHasRolePending
            ? member_patch_fix_safe_text(payload && payload.role_pending).trim()
            : member_patch_fix_safe_text(current.role_pending).trim()

        const hasBotStatus = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_review_status')
        const hasBotExcluded = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_excluded_from_stats')
        const hasBotVerify = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_login_requires_verification')
        const hasBotDecision = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_decision')
        const hasBotReason = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_decision_reason')
        const hasBotActiveAt = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_last_active_signal_at')
        const hasBotActiveType = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_last_active_signal_type')
        const hasBotVerifyAt = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_last_verification_sent_at')
        const hasBotVerifyCnt = payload && Object.prototype.hasOwnProperty.call(payload, 'bot_verification_sent_count')

        if (hasBotStatus) nextRow.bot_review_status = member_patch_fix_safe_text(payload && payload.bot_review_status).trim().toLowerCase()
        if (hasBotExcluded) nextRow.bot_excluded_from_stats = Number((payload && payload.bot_excluded_from_stats) || 0) === 1 ? 1 : 0
        if (hasBotVerify) nextRow.bot_login_requires_verification = Number((payload && payload.bot_login_requires_verification) || 0) === 1 ? 1 : 0
        if (hasBotDecision) nextRow.bot_decision = member_patch_fix_safe_text(payload && payload.bot_decision).trim()
        if (hasBotReason) nextRow.bot_decision_reason = member_patch_fix_safe_text(payload && payload.bot_decision_reason).trim()
        if (hasBotActiveAt) nextRow.bot_last_active_signal_at = member_patch_fix_safe_text(payload && payload.bot_last_active_signal_at).trim()
        if (hasBotActiveType) nextRow.bot_last_active_signal_type = member_patch_fix_safe_text(payload && payload.bot_last_active_signal_type).trim()
        if (hasBotVerifyAt) nextRow.bot_last_verification_sent_at = member_patch_fix_safe_text(payload && payload.bot_last_verification_sent_at).trim()
        if (hasBotVerifyCnt) nextRow.bot_verification_sent_count = Number((payload && payload.bot_verification_sent_count) || 0) || 0
        return nextRow
    }

    function member_patch_fix_get_filter_state() {
        let state = null
        if (typeof member_patch_clone_filter_state === 'function') {
            if (typeof gv_member_filter_state !== 'undefined' && gv_member_filter_state) {
                state = member_patch_clone_filter_state(gv_member_filter_state)
            } else if (typeof member_patch_read_member_filter_state_from_dom === 'function') {
                state = member_patch_clone_filter_state(member_patch_read_member_filter_state_from_dom())
            }
        }
        if (!state) return null

        const activeMode = (typeof member_patch_get_active_mode === 'function') ? member_patch_get_active_mode() : 'analytics'
        const hasBotCheckboxes = !!(
            document.getElementById('check_member_bot_none')
            || document.getElementById('check_member_bot_suspected')
            || document.getElementById('check_member_bot_review')
            || document.getElementById('check_member_bot_cleared')
        )

        if (activeMode === 'management' && !hasBotCheckboxes) {
            state.check_member_bot_none = true
            state.check_member_bot_suspected = false
            state.check_member_bot_review = true
            state.check_member_bot_cleared = true
            state.check_member_bot_excluded = !!state.check_member_bot_excluded
        } else if (activeMode === 'bot-review') {
            state.check_member_bot_none = false
            state.check_member_bot_suspected = true
            state.check_member_bot_review = true
            state.check_member_bot_cleared = false
            state.check_member_bot_excluded = !!state.check_member_bot_excluded
        }
        return state
    }

    function member_patch_fix_normalize_bot_status(value) {
        const text = member_patch_fix_safe_text(value).trim().toLowerCase()
        if (text === 'review' || text === 'suspected' || text === 'cleared') return text
        return ''
    }

    function member_patch_fix_row_matches_filter(row, filterState) {
        if (!filterState) return true

        const nameText = member_patch_fix_safe_text(row && row.name).trim().toLowerCase()
        const emailText = member_patch_fix_safe_text(row && row.email).trim().toLowerCase()
        const roleText = member_patch_fix_safe_text(row && row.role).trim()
        const pendingRoleText = member_patch_fix_safe_text(row && row.role_pending).trim()
        const addonActive = Number((row && row.role_addon_kssjoint) || 0) === 1

        const filterName = member_patch_fix_safe_text(filterState.txt_name).trim().toLowerCase()
        const filterEmail = member_patch_fix_safe_text(filterState.txt_email).trim().toLowerCase()
        if (filterName && !nameText.includes(filterName)) return false
        if (filterEmail && !emailText.includes(filterEmail)) return false

        const selectedRoles = []
        if (filterState.check_member_admin) selectedRoles.push('Administrator', 'Developer')
        if (filterState.check_member_lifetime) selectedRoles.push('Lifetime Member')
        if (filterState.check_member_regular) selectedRoles.push('Regular Member')
        if (filterState.check_member_spouse) selectedRoles.push('Spouse Member')
        if (filterState.check_member_student) selectedRoles.push('Student Member')
        if (filterState.check_member_member) selectedRoles.push('Non-member')
        if (!selectedRoles.length || selectedRoles.indexOf(roleText) === -1) return false

        const allowAddonNone = !!filterState.check_member_addon_none
        const allowAddonYes = !!filterState.check_member_addon_kssjoint
        if (!allowAddonNone && !allowAddonYes) return false
        if (allowAddonYes && !allowAddonNone && !addonActive) return false
        if (allowAddonNone && !allowAddonYes && addonActive) return false

        const isOfficer = member_patch_fix_safe_text(row && row.officer).trim() !== '' && member_patch_fix_safe_text(row && row.officer).trim() !== 'Member'
        const allowOfficerYes = !!filterState.check_member_officer_yes
        const allowOfficerNo = !!filterState.check_member_officer_no
        if (!allowOfficerYes && !allowOfficerNo) return false
        if (allowOfficerYes && !allowOfficerNo && !isOfficer) return false
        if (allowOfficerNo && !allowOfficerYes && isOfficer) return false

        if (filterState.check_member_pending_student && pendingRoleText !== 'Student Member') return false

        const botStatus = member_patch_fix_normalize_bot_status(row && row.bot_review_status)
        const allowBotNone = !!filterState.check_member_bot_none
        const allowBotSuspected = !!filterState.check_member_bot_suspected
        const allowBotReview = !!filterState.check_member_bot_review
        const allowBotCleared = !!filterState.check_member_bot_cleared
        const botFiltersUsed = Object.prototype.hasOwnProperty.call(filterState, 'check_member_bot_none')
            || Object.prototype.hasOwnProperty.call(filterState, 'check_member_bot_suspected')
            || Object.prototype.hasOwnProperty.call(filterState, 'check_member_bot_review')
            || Object.prototype.hasOwnProperty.call(filterState, 'check_member_bot_cleared')

        if (botFiltersUsed) {
            const allowedBotStates = []
            if (allowBotNone) allowedBotStates.push('')
            if (allowBotSuspected) allowedBotStates.push('suspected')
            if (allowBotReview) allowedBotStates.push('review')
            if (allowBotCleared) allowedBotStates.push('cleared')
            if (!allowedBotStates.length || allowedBotStates.indexOf(botStatus) === -1) return false
        }

        if (filterState.check_member_bot_excluded && Number((row && row.bot_excluded_from_stats) || 0) !== 1) return false
        return true
    }

    function member_patch_fix_apply_cached_row(uuidUser, payload) {
        const normalizedUuid = member_patch_fix_safe_text(uuidUser).trim()
        if (!normalizedUuid || !payload || typeof gv_member_list_pages === 'undefined') return false

        const filterState = member_patch_fix_get_filter_state()
        let updated = false
        let removed = false

        Object.keys(gv_member_list_pages || {}).forEach(pageKey => {
            const currentRows = Array.isArray(gv_member_list_pages[pageKey])
                ? gv_member_list_pages[pageKey].slice()
                : Object.values(gv_member_list_pages[pageKey] || {})

            for (let idx = 0; idx < currentRows.length; idx += 1) {
                const row = currentRows[idx] || {}
                if (member_patch_fix_safe_text(row.uuid).trim() !== normalizedUuid) continue

                const nextRow = member_patch_fix_build_list_row(payload, row)
                if (member_patch_fix_row_matches_filter(nextRow, filterState)) {
                    currentRows[idx] = nextRow
                } else {
                    currentRows.splice(idx, 1)
                    removed = true
                    if (typeof member_counter === 'number' && member_counter > 0) {
                        member_counter -= 1
                    }
                }
                gv_member_list_pages[pageKey] = currentRows
                updated = true
                break
            }
        })

        if (updated && typeof member_patch_rerender_management_from_cache === 'function') {
            member_patch_rerender_management_from_cache()
        }
        return updated || removed
    }

    window.member_patch_fix_apply_cached_row = member_patch_fix_apply_cached_row


    click_btn_change_membership = async function (uuid_user, sel_membership, current_role) {
        if (!uuid_user || !sel_membership || sel_membership === current_role) return
        if (current_role === 'Administrator' || current_role === 'Developer') return
        if (!confirm(admin_t('members.confirm.change_membership'))) return
        if (toggle_btn_change_membership) return

        const expiredAt = await member_patch_request_role_expiry(sel_membership)
        if (sel_membership !== 'Lifetime Member' && sel_membership !== 'Non-member' && !expiredAt) return

        toggle_btn_change_membership = true
        try {
            const request_data = new FormData()
            request_data.append('uuid_user', uuid_user)
            request_data.append('sel_membership', sel_membership)
            request_data.append('current_role', current_role)
            request_data.append('expired_at', expiredAt || '')

            const response = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: request_data,
            })

            member_patch_fix_apply_cached_row(uuid_user, response && response.data ? response.data : null)
            await get_member_summary()
            await get_member_list('search')
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        } finally {
            toggle_btn_change_membership = false
        }
    }

    click_btn_change_membership_addon = async function (uuid_user, sel_membership, current_role) {
        if (!uuid_user || !sel_membership) return
        if (!confirm(admin_t('members.confirm.change_membership_addon'))) return
        if (toggle_btn_change_membership) return

        let expiredAt = ''
        if (!member_patch_is_addon_active(current_role)) {
            expiredAt = await member_patch_request_addon_expiry()
            if (!expiredAt) return
        }

        toggle_btn_change_membership = true
        try {
            const request_data = new FormData()
            request_data.append('uuid_user', uuid_user)
            request_data.append('sel_membership', sel_membership)
            request_data.append('current_role', current_role)
            request_data.append('expired_at', expiredAt || '')

            const response = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership_addon/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: request_data,
            })

            member_patch_fix_apply_cached_row(uuid_user, response && response.data ? response.data : null)
            await get_member_summary()
            await get_member_list('search')
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        } finally {
            toggle_btn_change_membership = false
        }
    }
})()

;(function () {
    const memberPatchLangs = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk']
    const memberPatchTranslations = {}
    memberPatchLangs.forEach((code) => {
        memberPatchTranslations[code] = {
            'members.list_download_preparing': 'Preparing file…',
            'members.search.officer': 'Officer',
            'members.expiry.inline.title.role': 'Edit membership expiry',
            'members.expiry.inline.title.addon': 'Edit add-on expiry',
            'members.expiry.inline.description.role': 'Pick the new expiry date for this membership.',
            'members.expiry.inline.description.addon': 'Pick the new expiry date for this add-on membership.',
        }
    })
    memberPatchTranslations.ko = {
        'members.list_download_preparing': '파일 준비 중…',
        'members.search.officer': '임원',
        'members.expiry.inline.title.role': '멤버십 만료일 수정',
        'members.expiry.inline.title.addon': '부가 멤버십 만료일 수정',
        'members.expiry.inline.description.role': '이 멤버십의 새 만료일을 선택하세요.',
        'members.expiry.inline.description.addon': '이 부가 멤버십의 새 만료일을 선택하세요.',
    }
    window.StatKISS_ADMIN_I18N.register('members_download_officer_expiry_patch_20260329', memberPatchTranslations)

    const member_patch_default_expiry_date = window.member_patch_default_expiry_date
    const member_patch_normalize_expiry_date = window.member_patch_normalize_expiry_date
    const member_patch_is_never_expire = window.member_patch_is_never_expire
    const member_patch_focus_pending_students = window.member_patch_focus_pending_students
    const member_patch_fix_apply_cached_row = window.member_patch_fix_apply_cached_row

    function member_patch_render_count_panel() {
        const target = document.getElementById('div_member_count')
        if (!target || typeof ReactDOM === 'undefined') return
        const pendingCount = typeof member_pending_student_counter === 'number' ? member_pending_student_counter : 0
        ReactDOM.render(<Div_member_count count={member_counter || 0} pendingStudentCount={pendingCount} />, target)
    }

    window.member_patch_render_filter_panel = function () {
        const target = document.getElementById('div_member_search_filter')
        if (!target || typeof ReactDOM === 'undefined') return
        const snapshot = typeof member_patch_read_member_filter_state_from_dom === 'function'
            ? member_patch_read_member_filter_state_from_dom()
            : null
        ReactDOM.render(<Div_member_search_filter />, target)
        if (snapshot && typeof member_patch_restore_filter_state === 'function') {
            member_patch_restore_filter_state(snapshot)
        }
    }

    function member_patch_get_active_lang_code() {
        if (typeof admin_get_current_lang === 'function') {
            return String(admin_get_current_lang() || 'en')
        }
        if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.getLang === 'function') {
            return String(window.StatKISS_ADMIN_I18N.getLang() || 'en')
        }
        return String(document.documentElement.getAttribute('lang') || 'en')
    }

    function member_patch_format_pending_student_filter_label(count) {
        const baseLabel = admin_t('members.search.pending_student')
        const safeCount = member_patch_safe_number(count)
        if (safeCount <= 0) return baseLabel
        const formattedCount = member_patch_format_number(safeCount)
        const langCode = member_patch_get_active_lang_code().toLowerCase()
        if (langCode === 'ko' || langCode.indexOf('ko-') === 0) {
            return baseLabel + '(' + formattedCount + '명)'
        }
        return baseLabel + ' (' + formattedCount + ')'
    }

    function member_patch_membership_toggle_icon(kind) {
        if (kind === 'clear') {
            return (
                <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 9L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M15 9L9 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            )
        }

        return (
            <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }

    function member_patch_extract_download_filename(dispositionValue) {
        const text = String(dispositionValue || '')
        if (!text) return 'statkiss_member_list.xlsx'
        const utf8Match = text.match(/filename\*=UTF-8''([^;]+)/i)
        if (utf8Match && utf8Match[1]) {
            try { return decodeURIComponent(utf8Match[1]) } catch (error) {}
        }
        const quotedMatch = text.match(/filename="([^"]+)"/i)
        if (quotedMatch && quotedMatch[1]) return quotedMatch[1]
        const plainMatch = text.match(/filename=([^;]+)/i)
        if (plainMatch && plainMatch[1]) return plainMatch[1].trim()
        return 'statkiss_member_list.xlsx'
    }

    function member_patch_trigger_blob_download(blob, filename) {
        const blobUrl = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = blobUrl
        anchor.download = filename || 'statkiss_member_list.xlsx'
        document.body.appendChild(anchor)
        anchor.click()
        if (anchor.parentNode) anchor.parentNode.removeChild(anchor)
        window.setTimeout(() => {
            try { window.URL.revokeObjectURL(blobUrl) } catch (error) {}
        }, 1000)
    }

    member_patch_capture_filter_state = function () {
        const ids = [
            'txt_name',
            'txt_email',
            'check_member_officer_yes',
            'check_member_officer_no',
            'check_member_admin',
            'check_member_lifetime',
            'check_member_regular',
            'check_member_spouse',
            'check_member_student',
            'check_member_member',
            'check_member_addon_none',
            'check_member_addon_kssjoint',
            'check_member_pending_student',
        ]
        const state = {}
        ids.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            state[id] = el.type === 'checkbox' ? !!el.checked : el.value
        })
        return state
    }

    member_patch_restore_filter_state = function (state) {
        if (!state) return
        Object.keys(state).forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            if (el.type === 'checkbox') el.checked = !!state[id]
            else el.value = state[id] || ''
        })
    }

    member_patch_read_member_filter_state_from_dom = function () {
        return {
            txt_name: document.getElementById('txt_name') ? document.getElementById('txt_name').value.trim() : '',
            txt_email: document.getElementById('txt_email') ? document.getElementById('txt_email').value.trim() : '',
            check_member_officer_yes: !!(document.getElementById('check_member_officer_yes') && document.getElementById('check_member_officer_yes').checked),
            check_member_officer_no: !!(document.getElementById('check_member_officer_no') && document.getElementById('check_member_officer_no').checked),
            check_member_admin: !!(document.getElementById('check_member_admin') && document.getElementById('check_member_admin').checked),
            check_member_lifetime: !!(document.getElementById('check_member_lifetime') && document.getElementById('check_member_lifetime').checked),
            check_member_regular: !!(document.getElementById('check_member_regular') && document.getElementById('check_member_regular').checked),
            check_member_spouse: !!(document.getElementById('check_member_spouse') && document.getElementById('check_member_spouse').checked),
            check_member_student: !!(document.getElementById('check_member_student') && document.getElementById('check_member_student').checked),
            check_member_member: !!(document.getElementById('check_member_member') && document.getElementById('check_member_member').checked),
            check_member_addon_none: !!(document.getElementById('check_member_addon_none') && document.getElementById('check_member_addon_none').checked),
            check_member_addon_kssjoint: !!(document.getElementById('check_member_addon_kssjoint') && document.getElementById('check_member_addon_kssjoint').checked),
            check_member_pending_student: !!(document.getElementById('check_member_pending_student') && document.getElementById('check_member_pending_student').checked),
        }
    }

    member_patch_clone_filter_state = function (state) {
        return {
            txt_name: state && state.txt_name ? String(state.txt_name) : '',
            txt_email: state && state.txt_email ? String(state.txt_email) : '',
            check_member_officer_yes: !!(state && state.check_member_officer_yes),
            check_member_officer_no: !!(state && state.check_member_officer_no),
            check_member_admin: !!(state && state.check_member_admin),
            check_member_lifetime: !!(state && state.check_member_lifetime),
            check_member_regular: !!(state && state.check_member_regular),
            check_member_spouse: !!(state && state.check_member_spouse),
            check_member_student: !!(state && state.check_member_student),
            check_member_member: !!(state && state.check_member_member),
            check_member_addon_none: !!(state && state.check_member_addon_none),
            check_member_addon_kssjoint: !!(state && state.check_member_addon_kssjoint),
            check_member_pending_student: !!(state && state.check_member_pending_student),
        }
    }

    member_patch_apply_filter_state_to_form_data = function (formData, filterState) {
        const state = member_patch_clone_filter_state(filterState)
        formData.append('txt_name', state.txt_name)
        formData.append('txt_email', state.txt_email)
        formData.append('check_member_officer_yes', state.check_member_officer_yes ? 'YES' : 'NO')
        formData.append('check_member_officer_no', state.check_member_officer_no ? 'YES' : 'NO')
        formData.append('check_member_admin', state.check_member_admin ? 'YES' : 'NO')
        formData.append('check_member_lifetime', state.check_member_lifetime ? 'YES' : 'NO')
        formData.append('check_member_regular', state.check_member_regular ? 'YES' : 'NO')
        formData.append('check_member_spouse', state.check_member_spouse ? 'YES' : 'NO')
        formData.append('check_member_student', state.check_member_student ? 'YES' : 'NO')
        formData.append('check_member_member', state.check_member_member ? 'YES' : 'NO')
        formData.append('check_member_addon_none', state.check_member_addon_none ? 'YES' : 'NO')
        formData.append('check_member_addon_kssjoint', state.check_member_addon_kssjoint ? 'YES' : 'NO')
        formData.append('check_member_pending_student', state.check_member_pending_student ? 'YES' : 'NO')
    }

    click_btn_reset_filters = function () {
        if (typeof member_patch_abort_member_fetch === 'function') member_patch_abort_member_fetch()
        ;['txt_name', 'txt_email'].forEach((id) => {
            const target = document.getElementById(id)
            if (target) target.value = ''
        })
        if (typeof member_patch_apply_default_member_filters === 'function') member_patch_apply_default_member_filters()
        click_btn_search()
    }

    click_btn_download_list = async function () {
        if (toggle_btn_download_list) return
        toggle_btn_download_list = true
        member_patch_render_count_panel()
        try {
            const requestData = new FormData()
            const filterState = typeof member_patch_read_member_filter_state_from_dom === 'function'
                ? member_patch_read_member_filter_state_from_dom()
                : {}
            if (typeof member_patch_apply_filter_state_to_form_data === 'function') {
                member_patch_apply_filter_state_to_form_data(requestData, filterState)
            }
            const response = await fetch(member_patch_build_url('/admin/ajax_download_member_list/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: requestData,
            })
            const contentType = String(response.headers.get('content-type') || '').toLowerCase()
            if (!response.ok || contentType.indexOf('application/json') >= 0) {
                const errorText = await response.text()
                let message = admin_t('members.load_error')
                try {
                    const parsed = JSON.parse(errorText || '{}')
                    message = (parsed && parsed.error) ? parsed.error : message
                } catch (error) {
                    if (errorText) message = errorText
                }
                throw new Error(message)
            }
            const blob = await response.blob()
            const filename = member_patch_extract_download_filename(response.headers.get('content-disposition'))
            member_patch_trigger_blob_download(blob, filename)
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        } finally {
            toggle_btn_download_list = false
            member_patch_render_count_panel()
        }
    }

    function member_patch_open_inline_expiry_picker(anchorEl, options) {
        const opts = options || {}
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const defaultDate = member_patch_normalize_expiry_date(opts.defaultDate) || member_patch_default_expiry_date()

        return new Promise((resolve) => {
            const backdrop = document.createElement('div')
            backdrop.className = 'fixed inset-0 z-[10020] bg-transparent'

            const popover = document.createElement('div')
            popover.className = (palette.panel || '') + ' fixed z-[10021] w-[min(92vw,360px)] space-y-4 p-4'
            popover.setAttribute('dir', member_patch_is_rtl() ? 'rtl' : 'ltr')

            const title = document.createElement('h3')
            title.className = 'text-base font-bold ' + (palette.heading || '')
            title.textContent = opts.title || admin_t('members.expiry.inline.title.role')

            const description = document.createElement('p')
            description.className = 'text-sm ' + (palette.muted || '')
            description.textContent = opts.description || admin_t('members.expiry.inline.description.role')

            const dateInput = document.createElement('input')
            dateInput.type = 'date'
            dateInput.value = defaultDate
            dateInput.className = palette.input || ''

            const actionWrap = document.createElement('div')
            actionWrap.className = 'flex items-center justify-end gap-2'

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
            popover.appendChild(title)
            popover.appendChild(description)
            popover.appendChild(dateInput)
            popover.appendChild(actionWrap)
            document.body.appendChild(backdrop)
            document.body.appendChild(popover)

            const positionPopover = () => {
                const rect = anchorEl && typeof anchorEl.getBoundingClientRect === 'function'
                    ? anchorEl.getBoundingClientRect()
                    : { left: window.innerWidth / 2 - 180, right: window.innerWidth / 2 + 180, bottom: window.innerHeight / 2 }
                const width = Math.min(360, window.innerWidth - 24)
                let left = rect.left
                if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12
                if (left < 12) left = 12
                let top = rect.bottom + 8
                if (top + 220 > window.innerHeight - 12) top = Math.max(12, rect.top - 228)
                popover.style.left = left + 'px'
                popover.style.top = top + 'px'
            }
            positionPopover()

            const cleanup = (result) => {
                document.removeEventListener('keydown', onKeyDown)
                window.removeEventListener('resize', positionPopover)
                window.removeEventListener('scroll', positionPopover, true)
                if (popover.parentNode) popover.parentNode.removeChild(popover)
                if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop)
                resolve(result)
            }

            const onKeyDown = (event) => {
                if (event.key === 'Escape') cleanup(null)
                if (event.key === 'Enter') {
                    event.preventDefault()
                    confirmBtn.click()
                }
            }

            backdrop.addEventListener('click', () => cleanup(null))
            cancelBtn.addEventListener('click', () => cleanup(null))
            confirmBtn.addEventListener('click', () => {
                const normalized = member_patch_normalize_expiry_date(dateInput.value)
                if (!normalized) {
                    alert(admin_t('members.expiry.dialog.invalid_date'))
                    dateInput.focus()
                    return
                }
                cleanup(normalized)
            })
            document.addEventListener('keydown', onKeyDown)
            window.addEventListener('resize', positionPopover)
            window.addEventListener('scroll', positionPopover, true)
            window.setTimeout(() => {
                dateInput.focus()
                try { if (dateInput.showPicker) dateInput.showPicker() } catch (error) {}
            }, 0)
        })
    }

    async function member_patch_update_role_expiry(anchorEl, uuidUser, currentRole, currentExpiredAt) {
        if (!uuidUser || !currentRole || member_patch_is_never_expire(currentRole, currentExpiredAt)) return
        const nextDate = await member_patch_open_inline_expiry_picker(anchorEl, {
            title: admin_t('members.expiry.inline.title.role'),
            description: admin_t('members.expiry.inline.description.role'),
            defaultDate: currentExpiredAt || member_patch_default_expiry_date(),
        })
        if (!nextDate || nextDate === String(currentExpiredAt || '').slice(0, 10)) return
        if (toggle_btn_change_membership) return

        toggle_btn_change_membership = true
        try {
            const requestData = new FormData()
            requestData.append('uuid_user', uuidUser)
            requestData.append('sel_membership', currentRole)
            requestData.append('current_role', currentRole)
            requestData.append('expired_at', nextDate)
            const response = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: requestData,
            })
            const applied = member_patch_fix_apply_cached_row(uuidUser, response && response.data ? response.data : null)
            await get_member_summary()
            if (!applied) await get_member_list('search')
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        } finally {
            toggle_btn_change_membership = false
        }
    }

    async function member_patch_update_addon_expiry(anchorEl, uuidUser, currentExpiredAt) {
        if (!uuidUser) return
        const nextDate = await member_patch_open_inline_expiry_picker(anchorEl, {
            title: admin_t('members.expiry.inline.title.addon'),
            description: admin_t('members.expiry.inline.description.addon'),
            defaultDate: currentExpiredAt || member_patch_default_expiry_date(),
        })
        if (!nextDate || nextDate === String(currentExpiredAt || '').slice(0, 10)) return
        if (toggle_btn_change_membership) return

        toggle_btn_change_membership = true
        try {
            const requestData = new FormData()
            requestData.append('uuid_user', uuidUser)
            requestData.append('sel_membership', 'KSS Joint Member')
            requestData.append('current_role', '0')
            requestData.append('expired_at', nextDate)
            const response = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_membership_addon/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: requestData,
            })
            const applied = member_patch_fix_apply_cached_row(uuidUser, response && response.data ? response.data : null)
            await get_member_summary()
            if (!applied) await get_member_list('search')
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        } finally {
            toggle_btn_change_membership = false
        }
    }

    Div_member_count = function (props) {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const formattedCount = member_patch_format_number(props.count || 0)
        const pendingCount = member_patch_safe_number(props.pendingStudentCount || 0)
        const isDark = member_patch_get_theme_mode() === 'dark'
        const pendingWrapClass = isDark ? 'rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4' : 'rounded-2xl border border-amber-200 bg-amber-50 p-4'
        const pendingTextClass = isDark ? 'text-amber-100' : 'text-amber-800'
        const pendingMutedClass = isDark ? 'text-amber-200/80' : 'text-amber-700'
        const buttonClass = palette.secondaryBtn + (toggle_btn_download_list ? ' cursor-not-allowed opacity-90' : '')
        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div class="space-y-2">
                            <p class={'text-sm font-medium ' + palette.countLabel}>{admin_t('members.count', { count: formattedCount })}</p>
                            <p class={'text-4xl font-extrabold tracking-tight ' + palette.countNumber}>{formattedCount}</p>
                        </div>
                        <div>
                            <button type="button" onClick={() => click_btn_download_list()} class={buttonClass} disabled={toggle_btn_download_list}>
                                {toggle_btn_download_list ? (
                                    <>
                                        <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-2 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" opacity="0.25"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                        </svg>
                                        {admin_t('members.list_download_preparing')}
                                    </>
                                ) : (
                                    <>
                                        <img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/button_download.svg" class="w-4 h-4 mr-2" />
                                        {admin_t('members.list_download')}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    {pendingCount > 0 ? (
                        <div class={pendingWrapClass}>
                            <div class="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between">
                                <div class="min-w-0 flex-1 space-y-1" style={{ textAlign: member_patch_is_rtl() ? 'right' : 'left' }}>
                                    <p class={'block text-sm font-semibold ' + pendingTextClass}>{admin_t('members.count.pending_student', { count: member_patch_format_number(pendingCount) })}</p>
                                    <p class={'block text-sm ' + pendingMutedClass}>{admin_t('members.pending.review_hint')}</p>
                                </div>
                                <div class="shrink-0">
                                    <button type="button" onClick={() => member_patch_focus_pending_students()} class={palette.primaryBtn}>
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

    Div_member_search_filter = function () {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const pendingCount = typeof member_pending_student_counter === 'number' ? member_pending_student_counter : 0
        const pendingStudentLabel = member_patch_format_pending_student_filter_label(pendingCount)
        const selectAllLabel = admin_t('members.search.select_all')
        const clearAllLabel = admin_t('members.search.clear_all')
        const iconButtonClass = palette.secondaryBtn + ' h-11 w-full px-0'
        const checkboxItem = (id, label) => (
            <label for={id} class={palette.checkboxItem}>
                <input id={id} type="checkbox" value="" class={palette.checkbox} />
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            </label>
        )
        const inputRow = (label, id) => (
            <label class="flex flex-col gap-2">
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
                <input type="text" id={id} placeholder={label} onKeyDown={(event) => { if (event.key === 'Enter') click_btn_search() }} class={palette.input} />
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
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership')}</p>
                            <div class="grid grid-cols-2 gap-2 sm:w-[6.5rem]">
                                <button type="button" class={iconButtonClass} onClick={() => member_patch_toggle_membership_filters(true)} aria-label={selectAllLabel} title={selectAllLabel}>
                                    {member_patch_membership_toggle_icon('select')}
                                    <span class="sr-only">{selectAllLabel}</span>
                                </button>
                                <button type="button" class={iconButtonClass} onClick={() => member_patch_toggle_membership_filters(false)} aria-label={clearAllLabel} title={clearAllLabel}>
                                    {member_patch_membership_toggle_icon('clear')}
                                    <span class="sr-only">{clearAllLabel}</span>
                                </button>
                            </div>
                        </div>
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
                        <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('members.search.officer')}</p>
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {checkboxItem('check_member_officer_yes', admin_t('members.search.officer_yes'))}
                            {checkboxItem('check_member_officer_no', admin_t('members.search.officer_no'))}
                        </div>
                    </div>
                    <div class="space-y-3">
                        <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.pending_membership')}</p>
                        <div class="grid grid-cols-1 gap-3">
                            {checkboxItem('check_member_pending_student', pendingStudentLabel)}
                        </div>
                    </div>
                    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <div id="div_btn_search">
                            <Div_btn_search />
                        </div>
                        <button type="button" onClick={() => click_btn_reset_filters()} class={palette.secondaryBtn}>
                            {admin_t('members.search.reset')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    Div_member_list_membership = function (props) {
        const themeMode = props.themeMode || member_patch_get_theme_mode()
        const isDark = themeMode === 'dark'
        const inactiveClass = isDark
            ? 'border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
        const lockedClass = isDark
            ? 'border border-slate-700 bg-slate-900 text-slate-500 cursor-default'
            : 'border border-slate-200 bg-white text-slate-400 cursor-default'
        const showNeverExpire = member_patch_is_never_expire(props.current_role, props.role_expired_at)
        const canEditExpiry = !showNeverExpire && !!props.role_expired_at && props.current_role !== 'Administrator' && props.current_role !== 'Developer'

        const renderRole = (roleName) => {
            const isActive = props.current_role == roleName
            const isLocked = roleName === 'Administrator' || roleName === 'Developer'
            const className = isActive
                ? 'inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ' + member_management_role_tone(roleName, themeMode)
                : 'inline-flex items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition ' + (isLocked ? lockedClass : inactiveClass)
            return (
                <button type="button" id={'membership_' + roleName.toLowerCase().replace(/[^a-z]/g, '_') + '_' + props.uuid_user} class={className} disabled={isLocked} onClick={() => {
                    if (!isActive && !isLocked) click_btn_change_membership(props.uuid_user, roleName, props.current_role)
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
                    <p class="text-xs font-medium text-emerald-500">{admin_t('members.expiry.never')}</p>
                ) : canEditExpiry ? (
                    <button type="button" class="text-xs font-medium text-rose-500 underline decoration-dotted underline-offset-4 hover:opacity-80" onClick={(event) => member_patch_update_role_expiry(event.currentTarget, props.uuid_user, props.current_role, props.role_expired_at)}>
                        {admin_t('admin.common.expired_on', { date: props.role_expired_at })}
                    </button>
                ) : props.role_expired_at ? (
                    <p class="text-xs font-medium text-rose-500">{admin_t('admin.common.expired_on', { date: props.role_expired_at })}</p>
                ) : null}
            </div>
        )
    }

    Div_member_list_membership_addon = function (props) {
        const themeMode = props.themeMode || member_patch_get_theme_mode()
        const isDark = themeMode === 'dark'
        const isActive = props.role_addon_kssjoint == 1 || props.role_addon_kssjoint == '1'
        const className = isActive
            ? 'inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ' + (isDark ? 'border-blue-400/35 bg-blue-500/15 text-blue-200' : 'border-blue-200 bg-blue-50 text-blue-700')
            : 'inline-flex items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold transition ' + (isDark ? 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-600' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300')
        const canEditExpiry = isActive && !!props.role_addon_kssjoint_expired_at
        return (
            <div class="w-full space-y-3">
                <div class="flex flex-wrap gap-2">
                    <button type="button" id={'membership_addon_kssjoint_' + props.uuid_user} class={className} onClick={() => click_btn_change_membership_addon(props.uuid_user, 'KSS Joint Member', props.role_addon_kssjoint)}>
                        {admin_role_label('KSS Joint Member')}
                    </button>
                </div>
                {canEditExpiry ? (
                    <button type="button" class="text-xs font-medium text-rose-500 underline decoration-dotted underline-offset-4 hover:opacity-80" onClick={(event) => member_patch_update_addon_expiry(event.currentTarget, props.uuid_user, props.role_addon_kssjoint_expired_at)}>
                        {admin_t('admin.common.expired_on', { date: props.role_addon_kssjoint_expired_at })}
                    </button>
                ) : props.role_addon_kssjoint_expired_at != null ? (
                    <p class="text-xs font-medium text-rose-500">{admin_t('admin.common.expired_on', { date: props.role_addon_kssjoint_expired_at })}</p>
                ) : null}
            </div>
        )
    }
})()


;(function () {
    window.member_patch_toggle_membership_filters = function (selectAll) {
        ['check_member_admin','check_member_lifetime','check_member_regular','check_member_spouse','check_member_student','check_member_member'].forEach((id) => {
            const el = document.getElementById(id)
            if (el) el.checked = !!selectAll
        })
    }
})();


// ===== Member management layout + role toggle patch 2026-03-30 =====
;(function () {
    const memberPatchLangs = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'fr', 'de', 'pt-BR', 'ru', 'id', 'vi', 'th', 'ms', 'fil', 'hi', 'ar', 'it', 'nl', 'pl', 'sv', 'tr', 'uk']
    const memberPatchTranslations = {}
    memberPatchLangs.forEach((code) => {
        memberPatchTranslations[code] = {
            'members.card.change_role': 'Change Role',
            'members.card.hide_role': 'Hide Role',
        }
    })
    memberPatchTranslations.ko = {
        'members.card.change_role': '권한 변경',
        'members.card.hide_role': '권한 숨기기',
    }
    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.register === 'function') {
        window.StatKISS_ADMIN_I18N.register('members_role_toggle_layout_patch_20260330', memberPatchTranslations)
    }

    window.member_patch_role_editor_state = window.member_patch_role_editor_state || {}

    function member_patch_v2_get_pending_student_label(count) {
        const baseLabel = admin_t('admin.roles.pending_student_application')
        const safeCount = member_patch_safe_number(count)
        if (safeCount <= 0) return baseLabel
        const formattedCount = member_patch_format_number(safeCount)
        const langCode = String(document.documentElement.getAttribute('lang') || 'en').toLowerCase()
        if (langCode === 'ko' || langCode.indexOf('ko-') === 0) {
            return baseLabel + '(' + formattedCount + '명)'
        }
        return baseLabel + ' (' + formattedCount + ')'
    }

    function member_patch_v2_toggle_icon(kind) {
        if (kind === 'clear') {
            return (
                <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3.25" stroke="currentColor" strokeWidth="2.1" />
                    <path d="M8.5 8.5L15.5 15.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                    <path d="M15.5 8.5L8.5 15.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                </svg>
            )
        }

        return (
            <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="3.5" width="17" height="17" rx="3.25" stroke="currentColor" strokeWidth="2.1" />
                <path d="M7.75 12L10.5 14.75L16.25 9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }

    function member_patch_v2_is_addon_active(value) {
        const text = String(value == null ? '' : value).trim()
        return value === 1 || value === '1' || value === true || text === 'KSS Joint Member'
    }

    function member_patch_v2_role_chip_class(roleName, themeMode) {
        if (!roleName) return member_management_get_palette(themeMode).metaChip
        return 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ' + member_management_role_tone(roleName, themeMode)
    }

    function member_patch_v2_addon_chip_class(themeMode, isActive) {
        if (!isActive) return member_management_get_palette(themeMode).metaChip
        if (themeMode === 'dark') {
            return 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-blue-400/35 bg-blue-500/15 text-blue-200'
        }
        return 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-blue-200 bg-blue-50 text-blue-700'
    }

    function member_patch_v2_is_role_editor_open(uuidUser) {
        const key = String(uuidUser || '')
        return !!(window.member_patch_role_editor_state && window.member_patch_role_editor_state[key])
    }

    window.member_patch_toggle_role_editor = function (uuidUser) {
        const key = String(uuidUser || '')
        if (!key) return false
        const next = !member_patch_v2_is_role_editor_open(key)
        window.member_patch_role_editor_state[key] = next

        const editor = document.getElementById('div_member_role_editor_' + key)
        if (editor) {
            editor.classList.toggle('hidden', !next)
        }

        const button = document.getElementById('btn_member_toggle_role_editor_' + key)
        if (button) {
            button.textContent = admin_t(next ? 'members.card.hide_role' : 'members.card.change_role')
            button.setAttribute('aria-expanded', next ? 'true' : 'false')
        }

        return next
    }

    Div_member_search_filter = function () {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const pendingCount = typeof member_pending_student_counter === 'number' ? member_pending_student_counter : 0
        const pendingStudentLabel = member_patch_v2_get_pending_student_label(pendingCount)
        const selectAllLabel = admin_t('members.search.select_all')
        const clearAllLabel = admin_t('members.search.clear_all')
        const iconButtonClass = palette.secondaryBtn + ' h-12 w-14 px-0 text-base'
        const groupWrapClass = palette.sectionCard + ' h-full'

        const checkboxItem = (id, label) => (
            <label for={id} class={palette.checkboxItem}>
                <input id={id} type="checkbox" value="" class={palette.checkbox} />
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            </label>
        )

        const inputRow = (label, id, extraClass) => (
            <label class={'flex flex-col gap-2 ' + (extraClass || '')}>
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
                <input type="text" id={id} placeholder={label} onKeyDown={(event) => { if (event.key === 'Enter') click_btn_search() }} class={palette.input} />
            </label>
        )

        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-6">
                    <div class="space-y-1 text-center">
                        <p class={'text-lg font-bold ' + palette.heading}>{admin_t('members.search.title')}</p>
                        <p class={'text-sm ' + palette.muted}>{admin_t('members.title')}</p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                        {inputRow(admin_t('admin.common.name'), 'txt_name', 'md:col-span-1 xl:col-span-3')}
                        {inputRow(admin_t('admin.common.email'), 'txt_email', 'md:col-span-1 xl:col-span-3')}
                    </div>

                    <div class="space-y-3">
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership')}</p>
                            <div class="flex items-center gap-2 self-end sm:self-auto">
                                <button type="button" class={iconButtonClass} onClick={() => member_patch_toggle_membership_filters(true)} aria-label={selectAllLabel} title={selectAllLabel}>
                                    {member_patch_v2_toggle_icon('select')}
                                    <span class="sr-only">{selectAllLabel}</span>
                                </button>
                                <button type="button" class={iconButtonClass} onClick={() => member_patch_toggle_membership_filters(false)} aria-label={clearAllLabel} title={clearAllLabel}>
                                    {member_patch_v2_toggle_icon('clear')}
                                    <span class="sr-only">{clearAllLabel}</span>
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {checkboxItem('check_member_admin', admin_t('admin.roles.admin') + ', ' + admin_role_label('Developer'))}
                            {checkboxItem('check_member_lifetime', admin_role_label('Lifetime Member'))}
                            {checkboxItem('check_member_regular', admin_role_label('Regular Member'))}
                            {checkboxItem('check_member_spouse', admin_role_label('Spouse Member'))}
                            {checkboxItem('check_member_student', admin_role_label('Student Member'))}
                            {checkboxItem('check_member_member', admin_role_label('Non-member'))}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <div class={groupWrapClass}>
                            <div class="space-y-3">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership_addon')}</p>
                                <div class="grid grid-cols-1 gap-3">
                                    {checkboxItem('check_member_addon_none', admin_t('admin.common.none'))}
                                    {checkboxItem('check_member_addon_kssjoint', admin_role_label('KSS Joint Member'))}
                                </div>
                            </div>
                        </div>

                        <div class={groupWrapClass}>
                            <div class="space-y-3">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('members.search.officer')}</p>
                                <div class="grid grid-cols-1 gap-3">
                                    {checkboxItem('check_member_officer_yes', admin_t('members.search.officer_yes'))}
                                    {checkboxItem('check_member_officer_no', admin_t('members.search.officer_no'))}
                                </div>
                            </div>
                        </div>

                        <div class={groupWrapClass}>
                            <div class="space-y-3">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.pending_membership')}</p>
                                <div class="grid grid-cols-1 gap-3">
                                    {checkboxItem('check_member_pending_student', pendingStudentLabel)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <div id="div_btn_search">
                            <Div_btn_search />
                        </div>
                        <button type="button" onClick={() => click_btn_reset_filters()} class={palette.secondaryBtn}>
                            {admin_t('members.search.reset')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    Div_member_list = function (props) {
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const rows = Array.isArray(props.data) ? props.data : Object.values(props.data || {})

        if (!rows.length) {
            return (
                <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class={palette.emptyWrap}>
                        <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                    </div>
                    <div id={'div_member_list_' + (page_num + 1).toString()}></div>
                </div>
            )
        }

        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                {rows.map((member, idx) => {
                    const addonActive = member_patch_v2_is_addon_active(member.role_addon_kssjoint)
                    const showRoleEditor = member_patch_v2_is_role_editor_open(member.uuid)
                    const roleNeverExpire = !!(window.member_patch_is_never_expire && window.member_patch_is_never_expire(member.role, member.role_expired_at))
                    const roleExpiryText = roleNeverExpire
                        ? admin_t('members.expiry.never')
                        : (member.role_expired_at ? admin_t('admin.common.expired_on', { date: member.role_expired_at }) : '')
                    const addonExpiryText = addonActive && member.role_addon_kssjoint_expired_at
                        ? admin_t('admin.common.expired_on', { date: member.role_addon_kssjoint_expired_at })
                        : ''
                    const roleChipClass = member_patch_v2_role_chip_class(member.role, themeMode)
                    const addonChipClass = member_patch_v2_addon_chip_class(themeMode, addonActive)
                    const addonChipText = admin_t('admin.common.membership_addon') + ': ' + (addonActive ? admin_role_label('KSS Joint Member') : admin_t('admin.common.none'))

                    return (
                        <div key={member.uuid || member.email || idx} class={palette.memberCard}>
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                    <div class="flex min-w-0 flex-col gap-3">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <p class={palette.name}>{member.name}</p>
                                            <p class={roleChipClass}>{admin_role_label(member.role)}</p>
                                            {roleExpiryText ? <p class={palette.metaChip}>{roleExpiryText}</p> : null}
                                            <p class={addonChipClass}>{addonChipText}</p>
                                            {addonExpiryText ? <p class={palette.metaChip}>{addonExpiryText}</p> : null}
                                            {member.role_pending == 'Student Member' ? (
                                                <button type="button" class={palette.pendingBadge} onClick={() => click_btn_pending_student(member.email)}>
                                                    {admin_t('admin.roles.pending_student_application')}
                                                </button>
                                            ) : null}
                                            {member.officer !== 'Member' ? (
                                                <p class={palette.officerBadge}>{member.officer}</p>
                                            ) : null}
                                        </div>
                                        <p class={palette.email}>{member.email}</p>
                                    </div>

                                    <div class="flex flex-col items-start gap-2 xl:items-end">
                                        <div class="flex flex-wrap items-center gap-2 xl:justify-end">
                                            <button
                                                id={'btn_member_toggle_role_editor_' + member.uuid}
                                                type="button"
                                                aria-expanded={showRoleEditor ? 'true' : 'false'}
                                                onClick={() => member_patch_toggle_role_editor(member.uuid)}
                                                class={palette.secondaryBtn}>
                                                {admin_t(showRoleEditor ? 'members.card.hide_role' : 'members.card.change_role')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => click_btn_like_change_password(member.email)}
                                                class={palette.tertiaryBtn}>
                                                {admin_t('members.card.change_password')}
                                            </button>
                                        </div>
                                        <div id={'div_member_list_btn_change_password_' + member.email} class={palette.link}></div>
                                    </div>
                                </div>

                                <div id={'div_member_role_editor_' + member.uuid} class={(showRoleEditor ? '' : 'hidden ') + 'grid grid-cols-1 gap-4 xl:grid-cols-5'}>
                                    <div class="xl:col-span-3">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('admin.common.membership')}</p>
                                            </div>

                                            <div id={'div_member_list_btn_membership_' + member.uuid} class="w-full">
                                                <Div_member_list_membership
                                                    uuid_user={member.uuid}
                                                    current_role={member.role}
                                                    role_expired_at={member.role_expired_at}
                                                    themeMode={themeMode} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="xl:col-span-2">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('admin.common.membership_addon')}</p>
                                            </div>

                                            <div id={'div_member_list_btn_membership_addon_' + member.uuid} class="w-full">
                                                <Div_member_list_membership_addon
                                                    uuid_user={member.uuid}
                                                    role_addon_kssjoint={member.role_addon_kssjoint}
                                                    role_addon_kssjoint_expired_at={member.role_addon_kssjoint_expired_at}
                                                    themeMode={themeMode} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <p class={palette.metaChip}>
                                        {admin_t('members.card.joined_at', { date: member.created_at })}
                                    </p>
                                    {member.affiliation ? <p class={palette.metaChip}>{admin_t('members.card.affiliation', { value: member.affiliation })}</p> : null}
                                    {member.title ? <p class={palette.metaChip}>{admin_t('members.card.title_label', { value: member.title })}</p> : null}
                                    {member.education ? <p class={palette.metaChip}>{admin_t('members.card.education', { value: member.education })}</p> : null}
                                    {member.interest ? <p class={palette.metaChip}>{admin_t('members.card.interest', { value: member.interest })}</p> : null}
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        )
    }
})()

// ===== Member bot-review management patch 2026-04-11 =====
;(function () {
    const PREV_MEMBER_SEARCH_FILTER = typeof Div_member_search_filter === 'function' ? Div_member_search_filter : null
    const PREV_APPLY_DEFAULT_FILTERS = typeof member_patch_apply_default_member_filters === 'function' ? member_patch_apply_default_member_filters : null
    const BASE_FILTER_IDS = [
        'txt_name',
        'txt_email',
        'check_member_officer_yes',
        'check_member_officer_no',
        'check_member_admin',
        'check_member_lifetime',
        'check_member_regular',
        'check_member_spouse',
        'check_member_student',
        'check_member_member',
        'check_member_addon_none',
        'check_member_addon_kssjoint',
        'check_member_pending_student',
    ]
    const BOT_FILTER_IDS = [
        'check_member_bot_none',
        'check_member_bot_suspected',
        'check_member_bot_review',
        'check_member_bot_cleared',
        'check_member_bot_excluded',
    ]

    function member_patch_bot_normalize_status(value) {
        const text = String(value == null ? '' : value).trim().toLowerCase()
        if (text === 'suspected' || text === 'review' || text === 'cleared') return text
        return ''
    }

    function member_patch_bot_status_label(status) {
        const normalized = member_patch_bot_normalize_status(status)
        if (normalized === 'suspected') return admin_t('members.bot.badge.suspected')
        if (normalized === 'review') return admin_t('members.bot.badge.review')
        if (normalized === 'cleared') return admin_t('members.bot.badge.cleared')
        return ''
    }

    function member_patch_bot_badge_class(status, themeMode) {
        const normalized = member_patch_bot_normalize_status(status)
        if (normalized === 'suspected') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-rose-400/35 bg-rose-500/15 text-rose-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-rose-200 bg-rose-50 text-rose-700'
        }
        if (normalized === 'review') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-amber-400/35 bg-amber-500/15 text-amber-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-amber-200 bg-amber-50 text-amber-700'
        }
        if (normalized === 'cleared') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-400/35 bg-emerald-500/15 text-emerald-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-200 bg-emerald-50 text-emerald-700'
        }
        return member_management_get_palette(themeMode).metaChip
    }

    function member_patch_bot_info_chip_class(themeMode, tone) {
        if (tone === 'danger') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-rose-400/30 bg-rose-500/10 text-rose-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-rose-200 bg-rose-50 text-rose-700'
        }
        if (tone === 'info') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-blue-400/30 bg-blue-500/10 text-blue-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-blue-200 bg-blue-50 text-blue-700'
        }
        return member_management_get_palette(themeMode).metaChip
    }

    function member_patch_bot_action_button_class(themeMode, tone) {
        if (tone === 'danger') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-rose-400/35 bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:bg-rose-500/25'
                : 'inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100'
        }
        if (tone === 'success') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/25'
                : 'inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100'
        }
        if (tone === 'warning') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-amber-400/35 bg-amber-500/15 px-3 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-500/25'
                : 'inline-flex items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100'
        }
        return themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700'
            : 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50'
    }

    function member_patch_bot_notice_class(themeMode) {
        return themeMode === 'dark'
            ? 'rounded-2xl border border-purple-400/25 bg-purple-500/10 p-5'
            : 'rounded-2xl border border-purple-200 bg-purple-50 p-5'
    }

    function member_patch_bot_checkbox_item(id, label, palette) {
        return (
            <label for={id} class={palette.checkboxItem}>
                <input id={id} type="checkbox" value="" class={palette.checkbox} />
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            </label>
        )
    }

    window.member_patch_toggle_bot_filters = function (selectAll) {
        ['check_member_bot_none', 'check_member_bot_suspected', 'check_member_bot_review', 'check_member_bot_cleared'].forEach((id) => {
            const el = document.getElementById(id)
            if (el) el.checked = !!selectAll
        })
    }

    member_patch_apply_default_member_filters = function () {
        if (typeof PREV_APPLY_DEFAULT_FILTERS === 'function') PREV_APPLY_DEFAULT_FILTERS()
        const defaults = {
            check_member_bot_none: true,
            check_member_bot_suspected: false,
            check_member_bot_review: true,
            check_member_bot_cleared: true,
            check_member_bot_excluded: false,
        }
        Object.keys(defaults).forEach((id) => {
            const el = document.getElementById(id)
            if (el) el.checked = !!defaults[id]
        })
    }

    member_patch_capture_filter_state = function () {
        const ids = BASE_FILTER_IDS.concat(BOT_FILTER_IDS)
        const state = {}
        ids.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            state[id] = el.type === 'checkbox' ? !!el.checked : el.value
        })
        return state
    }

    member_patch_restore_filter_state = function (state) {
        if (!state) return
        BASE_FILTER_IDS.concat(BOT_FILTER_IDS).forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            if (el.type === 'checkbox') el.checked = !!state[id]
            else el.value = state[id] || ''
        })
    }

    member_patch_read_member_filter_state_from_dom = function () {
        const state = {
            txt_name: document.getElementById('txt_name') ? document.getElementById('txt_name').value.trim() : '',
            txt_email: document.getElementById('txt_email') ? document.getElementById('txt_email').value.trim() : '',
            check_member_officer_yes: !!(document.getElementById('check_member_officer_yes') && document.getElementById('check_member_officer_yes').checked),
            check_member_officer_no: !!(document.getElementById('check_member_officer_no') && document.getElementById('check_member_officer_no').checked),
            check_member_admin: !!(document.getElementById('check_member_admin') && document.getElementById('check_member_admin').checked),
            check_member_lifetime: !!(document.getElementById('check_member_lifetime') && document.getElementById('check_member_lifetime').checked),
            check_member_regular: !!(document.getElementById('check_member_regular') && document.getElementById('check_member_regular').checked),
            check_member_spouse: !!(document.getElementById('check_member_spouse') && document.getElementById('check_member_spouse').checked),
            check_member_student: !!(document.getElementById('check_member_student') && document.getElementById('check_member_student').checked),
            check_member_member: !!(document.getElementById('check_member_member') && document.getElementById('check_member_member').checked),
            check_member_addon_none: !!(document.getElementById('check_member_addon_none') && document.getElementById('check_member_addon_none').checked),
            check_member_addon_kssjoint: !!(document.getElementById('check_member_addon_kssjoint') && document.getElementById('check_member_addon_kssjoint').checked),
            check_member_pending_student: !!(document.getElementById('check_member_pending_student') && document.getElementById('check_member_pending_student').checked),
            check_member_bot_none: !!(document.getElementById('check_member_bot_none') && document.getElementById('check_member_bot_none').checked),
            check_member_bot_suspected: !!(document.getElementById('check_member_bot_suspected') && document.getElementById('check_member_bot_suspected').checked),
            check_member_bot_review: !!(document.getElementById('check_member_bot_review') && document.getElementById('check_member_bot_review').checked),
            check_member_bot_cleared: !!(document.getElementById('check_member_bot_cleared') && document.getElementById('check_member_bot_cleared').checked),
            check_member_bot_excluded: !!(document.getElementById('check_member_bot_excluded') && document.getElementById('check_member_bot_excluded').checked),
        }
        return state
    }

    member_patch_clone_filter_state = function (state) {
        const cloned = {
            txt_name: state && state.txt_name ? String(state.txt_name) : '',
            txt_email: state && state.txt_email ? String(state.txt_email) : '',
        }
        ;[
            'check_member_officer_yes',
            'check_member_officer_no',
            'check_member_admin',
            'check_member_lifetime',
            'check_member_regular',
            'check_member_spouse',
            'check_member_student',
            'check_member_member',
            'check_member_addon_none',
            'check_member_addon_kssjoint',
            'check_member_pending_student',
            'check_member_bot_none',
            'check_member_bot_suspected',
            'check_member_bot_review',
            'check_member_bot_cleared',
            'check_member_bot_excluded',
        ].forEach((key) => {
            cloned[key] = !!(state && state[key])
        })
        return cloned
    }

    member_patch_apply_filter_state_to_form_data = function (formData, filterState) {
        const state = member_patch_clone_filter_state(filterState)
        formData.append('txt_name', state.txt_name)
        formData.append('txt_email', state.txt_email)
        formData.append('check_member_officer_yes', state.check_member_officer_yes ? 'YES' : 'NO')
        formData.append('check_member_officer_no', state.check_member_officer_no ? 'YES' : 'NO')
        formData.append('check_member_admin', state.check_member_admin ? 'YES' : 'NO')
        formData.append('check_member_lifetime', state.check_member_lifetime ? 'YES' : 'NO')
        formData.append('check_member_regular', state.check_member_regular ? 'YES' : 'NO')
        formData.append('check_member_spouse', state.check_member_spouse ? 'YES' : 'NO')
        formData.append('check_member_student', state.check_member_student ? 'YES' : 'NO')
        formData.append('check_member_member', state.check_member_member ? 'YES' : 'NO')
        formData.append('check_member_addon_none', state.check_member_addon_none ? 'YES' : 'NO')
        formData.append('check_member_addon_kssjoint', state.check_member_addon_kssjoint ? 'YES' : 'NO')
        formData.append('check_member_pending_student', state.check_member_pending_student ? 'YES' : 'NO')
        formData.append('check_member_bot_none', state.check_member_bot_none ? 'YES' : 'NO')
        formData.append('check_member_bot_suspected', state.check_member_bot_suspected ? 'YES' : 'NO')
        formData.append('check_member_bot_review', state.check_member_bot_review ? 'YES' : 'NO')
        formData.append('check_member_bot_cleared', state.check_member_bot_cleared ? 'YES' : 'NO')
        formData.append('check_member_bot_excluded', state.check_member_bot_excluded ? 'YES' : 'NO')
    }

    let member_patch_bot_action_loading = false

    async function click_btn_change_member_bot_status(uuid_user, action, email) {
        if (!uuid_user || !action) return
        const confirmKeyMap = {
            clear: 'members.bot.confirm.clear',
            mark_review: 'members.bot.confirm.mark_review',
            mark_suspected: 'members.bot.confirm.mark_suspected',
            resend_verification: 'members.bot.confirm.resend',
        }
        const confirmKey = confirmKeyMap[action] || ''
        if (confirmKey && !confirm(admin_t(confirmKey))) return
        if (member_patch_bot_action_loading) return

        member_patch_bot_action_loading = true
        try {
            const requestData = new FormData()
            requestData.append('uuid_user', uuid_user)
            requestData.append('action', action)
            requestData.append('email', email || '')
            const response = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_member_bot_status/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: requestData,
            })
            if (typeof member_patch_fix_apply_cached_row === 'function') {
                member_patch_fix_apply_cached_row(uuid_user, response && response.data ? response.data : null)
            }
            if (action === 'resend_verification') {
                const checker = String(response && response.checker ? response.checker : '').toUpperCase()
                if (checker === 'RATE_LIMITED') alert(admin_t('members.bot.alert.rate_limited'))
                else if (checker === 'SKIPPED') alert(admin_t('members.bot.alert.skipped'))
                else alert(admin_t('members.bot.alert.verification_sent'))
            } else {
                alert(admin_t('members.bot.alert.updated'))
            }
            if (typeof get_member_summary === 'function') await get_member_summary()
            if (typeof get_member_list === 'function') await get_member_list('search')
        } catch (error) {
            console.error(error)
            alert((error && error.message) ? error.message : admin_t('members.load_error'))
        } finally {
            member_patch_bot_action_loading = false
        }
    }

    window.click_btn_change_member_bot_status = click_btn_change_member_bot_status
    window.member_patch_bot_status_label = member_patch_bot_status_label

    Div_member_search_filter = function () {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const themeMode = member_patch_get_theme_mode()
        const isDark = themeMode === 'dark'
        const selectAllLabel = admin_t('members.search.select_all')
        const clearAllLabel = admin_t('members.search.clear_all')
        const noticeClass = member_patch_bot_notice_class(themeMode)
        const noticeTitleClass = isDark ? 'text-base font-semibold text-purple-100' : 'text-base font-semibold text-purple-800'
        const noticeBodyClass = isDark ? 'text-sm text-purple-100/80' : 'text-sm text-purple-700'

        return (
            <div class="flex flex-col gap-4">
                <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class="flex flex-col gap-5">
                        <div class={noticeClass}>
                            <div class="space-y-2">
                                <p class={noticeTitleClass}>{admin_t('members.bot.notice.title')}</p>
                                <p class={noticeBodyClass}>{admin_t('members.bot.notice.body')}</p>
                            </div>
                        </div>
                        <div class={palette.sectionCard}>
                            <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p class={palette.sectionLabel}>{admin_t('members.bot.filter.title')}</p>
                                <div class="flex flex-wrap gap-2">
                                    <button type="button" onClick={() => member_patch_toggle_bot_filters(true)} class={palette.secondaryBtn}>{selectAllLabel}</button>
                                    <button type="button" onClick={() => member_patch_toggle_bot_filters(false)} class={palette.secondaryBtn}>{clearAllLabel}</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                                {member_patch_bot_checkbox_item('check_member_bot_none', admin_t('members.bot.filter.none'), palette)}
                                {member_patch_bot_checkbox_item('check_member_bot_suspected', admin_t('members.bot.filter.suspected'), palette)}
                                {member_patch_bot_checkbox_item('check_member_bot_review', admin_t('members.bot.filter.review'), palette)}
                                {member_patch_bot_checkbox_item('check_member_bot_cleared', admin_t('members.bot.filter.cleared'), palette)}
                                {member_patch_bot_checkbox_item('check_member_bot_excluded', admin_t('members.bot.filter.excluded_only'), palette)}
                            </div>
                        </div>
                    </div>
                </div>
                {PREV_MEMBER_SEARCH_FILTER ? <PrevMemberSearchFilterBridge /> : null}
            </div>
        )
    }

    function PrevMemberSearchFilterBridge() {
        return <PREV_MEMBER_SEARCH_FILTER />
    }

    Div_member_list = function (props) {
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const rows = Array.isArray(props.data) ? props.data : Object.values(props.data || {})

        if (!rows.length) {
            return (
                <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class={palette.emptyWrap}>
                        <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                    </div>
                    <div id={'div_member_list_' + (page_num + 1).toString()}></div>
                </div>
            )
        }

        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                {rows.map((member, idx) => {
                    const addonActive = member_patch_v2_is_addon_active(member.role_addon_kssjoint)
                    const showRoleEditor = member_patch_v2_is_role_editor_open(member.uuid)
                    const roleNeverExpire = !!(window.member_patch_is_never_expire && window.member_patch_is_never_expire(member.role, member.role_expired_at))
                    const roleExpiryText = roleNeverExpire
                        ? admin_t('members.expiry.never')
                        : (member.role_expired_at ? admin_t('admin.common.expired_on', { date: member.role_expired_at }) : '')
                    const addonExpiryText = addonActive && member.role_addon_kssjoint_expired_at
                        ? admin_t('admin.common.expired_on', { date: member.role_addon_kssjoint_expired_at })
                        : ''
                    const roleChipClass = member_patch_v2_role_chip_class(member.role, themeMode)
                    const addonChipClass = member_patch_v2_addon_chip_class(themeMode, addonActive)
                    const addonChipText = admin_t('admin.common.membership_addon') + ': ' + (addonActive ? admin_role_label('KSS Joint Member') : admin_t('admin.common.none'))
                    const botStatus = memberPatchBotNormalizeStatus(member.bot_review_status)
                    const hasBotStatus = !!botStatus
                    const botStatusText = memberPatchBotStatusLabel(botStatus)
                    const botDecisionText = member.bot_decision ? admin_t('members.bot.meta.decision', { value: member.bot_decision }) : ''
                    const botReasonText = member.bot_decision_reason ? admin_t('members.bot.meta.reason', { value: member.bot_decision_reason }) : ''
                    const botActiveText = member.bot_last_active_signal_at ? admin_t('members.bot.meta.last_active', { value: member.bot_last_active_signal_at }) : ''
                    const botVerificationText = member.bot_last_verification_sent_at
                        ? admin_t('members.bot.meta.last_verification', { date: member.bot_last_verification_sent_at, count: member_patch_format_number(member.bot_verification_sent_count || 0) })
                        : ((member.bot_verification_sent_count || 0) > 0 ? admin_t('members.bot.meta.verification_count', { count: member_patch_format_number(member.bot_verification_sent_count || 0) }) : '')
                    const showBotResend = botStatus === 'suspected'

                    return (
                        <div key={member.uuid || member.email || idx} class={palette.memberCard}>
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                    <div class="flex min-w-0 flex-col gap-3">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <p class={palette.name}>{member.name}</p>
                                            <p class={roleChipClass}>{admin_role_label(member.role)}</p>
                                            {roleExpiryText ? <p class={palette.metaChip}>{roleExpiryText}</p> : null}
                                            <p class={addonChipClass}>{addonChipText}</p>
                                            {addonExpiryText ? <p class={palette.metaChip}>{addonExpiryText}</p> : null}
                                            {hasBotStatus ? <p class={memberPatchBotBadgeClass(botStatus, themeMode)}>{botStatusText}</p> : null}
                                            {member.bot_excluded_from_stats == 1 ? <p class={memberPatchBotInfoChipClass(themeMode, 'danger')}>{admin_t('members.bot.badge.excluded')}</p> : null}
                                            {member.bot_login_requires_verification == 1 ? <p class={memberPatchBotInfoChipClass(themeMode, 'info')}>{admin_t('members.bot.badge.verify_required')}</p> : null}
                                            {member.role_pending == 'Student Member' ? (
                                                <button type="button" class={palette.pendingBadge} onClick={() => click_btn_pending_student(member.email)}>
                                                    {admin_t('admin.roles.pending_student_application')}
                                                </button>
                                            ) : null}
                                            {member.officer !== 'Member' ? (
                                                <p class={palette.officerBadge}>{member.officer}</p>
                                            ) : null}
                                        </div>
                                        <p class={palette.email}>{member.email}</p>
                                    </div>

                                    <div class="flex flex-col items-start gap-2 xl:items-end">
                                        <div class="flex flex-wrap items-center gap-2 xl:justify-end">
                                            <button
                                                id={'btn_member_toggle_role_editor_' + member.uuid}
                                                type="button"
                                                aria-expanded={showRoleEditor ? 'true' : 'false'}
                                                onClick={() => member_patch_toggle_role_editor(member.uuid)}
                                                class={palette.secondaryBtn}>
                                                {admin_t(showRoleEditor ? 'members.card.hide_role' : 'members.card.change_role')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => click_btn_like_change_password(member.email)}
                                                class={palette.tertiaryBtn}>
                                                {admin_t('members.card.change_password')}
                                            </button>
                                        </div>
                                        <div id={'div_member_list_btn_change_password_' + member.email} class={palette.link}></div>
                                    </div>
                                </div>

                                <div id={'div_member_role_editor_' + member.uuid} class={(showRoleEditor ? '' : 'hidden ') + 'grid grid-cols-1 gap-4 xl:grid-cols-5'}>
                                    <div class="xl:col-span-3">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('admin.common.membership')}</p>
                                            </div>

                                            <div id={'div_member_list_btn_membership_' + member.uuid} class="w-full">
                                                <Div_member_list_membership
                                                    uuid_user={member.uuid}
                                                    current_role={member.role}
                                                    role_expired_at={member.role_expired_at}
                                                    themeMode={themeMode} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="xl:col-span-2">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('admin.common.membership_addon')}</p>
                                            </div>

                                            <div id={'div_member_list_btn_membership_addon_' + member.uuid} class="w-full">
                                                <Div_member_list_membership_addon
                                                    uuid_user={member.uuid}
                                                    role_addon_kssjoint={member.role_addon_kssjoint}
                                                    role_addon_kssjoint_expired_at={member.role_addon_kssjoint_expired_at}
                                                    themeMode={themeMode} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="xl:col-span-5">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('members.bot.section_label')}</p>
                                            </div>
                                            <div class="flex flex-wrap gap-2">
                                                <button type="button" class={member_patch_bot_action_button_class(themeMode, 'success')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'clear', member.email)}>
                                                    {admin_t('members.bot.action.clear')}
                                                </button>
                                                <button type="button" class={member_patch_bot_action_button_class(themeMode, 'warning')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'mark_review', member.email)}>
                                                    {admin_t('members.bot.action.mark_review')}
                                                </button>
                                                <button type="button" class={member_patch_bot_action_button_class(themeMode, 'danger')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'mark_suspected', member.email)}>
                                                    {admin_t('members.bot.action.mark_suspected')}
                                                </button>
                                                {showBotResend ? (
                                                    <button type="button" class={member_patch_bot_action_button_class(themeMode, 'neutral')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'resend_verification', member.email)}>
                                                        {admin_t('members.bot.action.resend')}
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <p class={palette.metaChip}>
                                        {admin_t('members.card.joined_at', { date: member.created_at })}
                                    </p>
                                    {member.affiliation ? <p class={palette.metaChip}>{admin_t('members.card.affiliation', { value: member.affiliation })}</p> : null}
                                    {member.title ? <p class={palette.metaChip}>{admin_t('members.card.title_label', { value: member.title })}</p> : null}
                                    {member.education ? <p class={palette.metaChip}>{admin_t('members.card.education', { value: member.education })}</p> : null}
                                    {member.interest ? <p class={palette.metaChip}>{admin_t('members.card.interest', { value: member.interest })}</p> : null}
                                    {botDecisionText ? <p class={palette.metaChip}>{botDecisionText}</p> : null}
                                    {botReasonText ? <p class={palette.metaChip}>{botReasonText}</p> : null}
                                    {botActiveText ? <p class={palette.metaChip}>{botActiveText}</p> : null}
                                    {botVerificationText ? <p class={palette.metaChip}>{botVerificationText}</p> : null}
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        )
    }
})()


// ===== Member mode split fix patch 2026-04-11b =====
;(function () {
    const BOT_REVIEW_SEARCH_FILTER = typeof Div_member_search_filter === 'function' ? Div_member_search_filter : null
    const BOT_REVIEW_MEMBER_LIST = typeof Div_member_list === 'function' ? Div_member_list : null
    const DEFAULT_MEMBER_COUNT = typeof Div_member_count === 'function' ? Div_member_count : null
    const PREV_SET_CONTENT = typeof set_content === 'function' ? set_content : null

    function member_patch_is_management_like_mode() {
        const mode = member_patch_get_active_mode()
        return mode === 'management' || mode === 'bot-review'
    }

    member_patch_get_active_mode = function () {
        const parts = String(window.location.pathname || '').split('/').filter(Boolean)
        const adminIndex = parts.indexOf('admin')
        if (adminIndex === -1) return 'analytics'
        if (parts[adminIndex + 1] !== 'members') return 'analytics'

        const rawMode = String(parts[adminIndex + 2] || '').trim().toLowerCase()
        if (rawMode === 'management') return 'management'
        if (rawMode === 'bot-review' || rawMode === 'bot_review' || rawMode === 'botreview') return 'bot-review'
        return 'analytics'
    }

    member_patch_build_mode_href = function (mode) {
        if (mode === 'management') return admin_build_url('/admin/members/management/')
        if (mode === 'bot-review') return admin_build_url('/admin/members/bot-review/')
        return admin_build_url('/admin/members/')
    }

    Div_member_mode_tabs = function (props) {
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const activeMode = props.activeMode || member_patch_get_active_mode()
        const items = [
            { key: 'analytics', label: admin_t('members.mode.analytics') },
            { key: 'management', label: admin_t('members.title') },
            { key: 'bot-review', label: admin_t('members.mode.bot_review') },
        ]

        return (
            <div class="w-full" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class={palette.navWrap}>
                    <div class="flex flex-col gap-2 sm:flex-row">
                        {items.map(item => {
                            const isActive = item.key === activeMode
                            const className = isActive
                                ? 'flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ' + palette.navActive
                                : 'flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ' + palette.navInactive

                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    aria-current={isActive ? 'page' : undefined}
                                    class={className}
                                    onClick={() => location.href = member_patch_build_mode_href(item.key)}>
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    member_patch_apply_default_member_filters = function () {
        ;['check_member_admin','check_member_lifetime','check_member_regular','check_member_spouse','check_member_student','check_member_member','check_member_addon_none','check_member_addon_kssjoint','check_member_officer_yes','check_member_officer_no'].forEach(id => {
            const target = document.getElementById(id)
            if (target) target.checked = true
        })
        const pendingTarget = document.getElementById('check_member_pending_student')
        if (pendingTarget) pendingTarget.checked = false

        const mode = member_patch_get_active_mode()
        const botDefaults = mode === 'bot-review'
            ? {
                check_member_bot_none: false,
                check_member_bot_suspected: true,
                check_member_bot_review: true,
                check_member_bot_cleared: false,
                check_member_bot_excluded: false,
            }
            : {
                check_member_bot_none: true,
                check_member_bot_suspected: false,
                check_member_bot_review: true,
                check_member_bot_cleared: true,
                check_member_bot_excluded: false,
            }

        Object.keys(botDefaults).forEach((id) => {
            const el = document.getElementById(id)
            if (el) el.checked = !!botDefaults[id]
        })
    }

    member_patch_apply_filter_state_to_form_data = function (formData, filterState) {
        const state = typeof member_patch_clone_filter_state === 'function'
            ? member_patch_clone_filter_state(filterState)
            : (filterState || {})
        const mode = member_patch_get_active_mode()

        formData.append('txt_name', state.txt_name || '')
        formData.append('txt_email', state.txt_email || '')
        formData.append('check_member_admin', state.check_member_admin ? 'YES' : 'NO')
        formData.append('check_member_lifetime', state.check_member_lifetime ? 'YES' : 'NO')
        formData.append('check_member_regular', state.check_member_regular ? 'YES' : 'NO')
        formData.append('check_member_spouse', state.check_member_spouse ? 'YES' : 'NO')
        formData.append('check_member_student', state.check_member_student ? 'YES' : 'NO')
        formData.append('check_member_member', state.check_member_member ? 'YES' : 'NO')
        formData.append('check_member_addon_none', state.check_member_addon_none ? 'YES' : 'NO')
        formData.append('check_member_addon_kssjoint', state.check_member_addon_kssjoint ? 'YES' : 'NO')
        formData.append('check_member_officer_yes', state.check_member_officer_yes ? 'YES' : 'NO')
        formData.append('check_member_officer_no', state.check_member_officer_no ? 'YES' : 'NO')
        formData.append('check_member_pending_student', state.check_member_pending_student ? 'YES' : 'NO')
        formData.append('member_mode', mode === 'bot-review' ? 'bot-review' : (mode === 'management' ? 'management' : 'analytics'))

        if (mode === 'bot-review') {
            formData.append('check_member_bot_none', state.check_member_bot_none ? 'YES' : 'NO')
            formData.append('check_member_bot_suspected', state.check_member_bot_suspected ? 'YES' : 'NO')
            formData.append('check_member_bot_review', state.check_member_bot_review ? 'YES' : 'NO')
            formData.append('check_member_bot_cleared', state.check_member_bot_cleared ? 'YES' : 'NO')
            formData.append('check_member_bot_excluded', state.check_member_bot_excluded ? 'YES' : 'NO')
        }
    }

    function Div_member_management_search_filter() {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const pendingCount = typeof member_pending_student_counter === 'number' ? member_pending_student_counter : 0
        const pendingStudentLabel = member_patch_v2_get_pending_student_label(pendingCount)
        const selectAllLabel = admin_t('members.search.select_all')
        const clearAllLabel = admin_t('members.search.clear_all')
        const iconButtonClass = palette.secondaryBtn + ' h-12 w-14 px-0 text-base'
        const groupWrapClass = palette.sectionCard + ' h-full'

        const checkboxItem = (id, label) => (
            <label for={id} class={palette.checkboxItem}>
                <input id={id} type="checkbox" value="" class={palette.checkbox} />
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            </label>
        )

        const inputRow = (label, id, extraClass) => (
            <label class={'flex flex-col gap-2 ' + (extraClass || '')}>
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
                <input type="text" id={id} placeholder={label} onKeyDown={(event) => { if (event.key === 'Enter') click_btn_search() }} class={palette.input} />
            </label>
        )

        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-6">
                    <div class="space-y-1 text-center">
                        <p class={'text-lg font-bold ' + palette.heading}>{admin_t('members.search.title')}</p>
                        <p class={'text-sm ' + palette.muted}>{admin_t('members.title')}</p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                        {inputRow(admin_t('admin.common.name'), 'txt_name', 'md:col-span-1 xl:col-span-3')}
                        {inputRow(admin_t('admin.common.email'), 'txt_email', 'md:col-span-1 xl:col-span-3')}
                    </div>

                    <div class="space-y-3">
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership')}</p>
                            <div class="flex items-center gap-2 self-end sm:self-auto">
                                <button type="button" class={iconButtonClass} onClick={() => member_patch_toggle_membership_filters(true)} aria-label={selectAllLabel} title={selectAllLabel}>
                                    {member_patch_v2_toggle_icon('select')}
                                    <span class="sr-only">{selectAllLabel}</span>
                                </button>
                                <button type="button" class={iconButtonClass} onClick={() => member_patch_toggle_membership_filters(false)} aria-label={clearAllLabel} title={clearAllLabel}>
                                    {member_patch_v2_toggle_icon('clear')}
                                    <span class="sr-only">{clearAllLabel}</span>
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {checkboxItem('check_member_admin', admin_t('admin.roles.admin') + ', ' + admin_role_label('Developer'))}
                            {checkboxItem('check_member_lifetime', admin_role_label('Lifetime Member'))}
                            {checkboxItem('check_member_regular', admin_role_label('Regular Member'))}
                            {checkboxItem('check_member_spouse', admin_role_label('Spouse Member'))}
                            {checkboxItem('check_member_student', admin_role_label('Student Member'))}
                            {checkboxItem('check_member_member', admin_role_label('Non-member'))}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
                        <div class={groupWrapClass}>
                            <div class="space-y-3">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.membership_addon')}</p>
                                <div class="grid grid-cols-1 gap-3">
                                    {checkboxItem('check_member_addon_none', admin_t('admin.common.none'))}
                                    {checkboxItem('check_member_addon_kssjoint', admin_role_label('KSS Joint Member'))}
                                </div>
                            </div>
                        </div>

                        <div class={groupWrapClass}>
                            <div class="space-y-3">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('members.search.officer')}</p>
                                <div class="grid grid-cols-1 gap-3">
                                    {checkboxItem('check_member_officer_yes', admin_t('members.search.officer_yes'))}
                                    {checkboxItem('check_member_officer_no', admin_t('members.search.officer_no'))}
                                </div>
                            </div>
                        </div>

                        <div class={groupWrapClass}>
                            <div class="space-y-3">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('admin.common.pending_membership')}</p>
                                <div class="grid grid-cols-1 gap-3">
                                    {checkboxItem('check_member_pending_student', pendingStudentLabel)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <div id="div_btn_search">
                            <Div_btn_search />
                        </div>
                        <button type="button" onClick={() => click_btn_reset_filters()} class={palette.secondaryBtn}>
                            {admin_t('members.search.reset')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    function Div_member_management_list(props) {
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const rows = Array.isArray(props.data) ? props.data : Object.values(props.data || {})

        if (!rows.length) {
            return (
                <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class={palette.emptyWrap}>
                        <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                    </div>
                    <div id={'div_member_list_' + (page_num + 1).toString()}></div>
                </div>
            )
        }

        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                {rows.map((member, idx) => {
                    const addonActive = member_patch_v2_is_addon_active(member.role_addon_kssjoint)
                    const showRoleEditor = member_patch_v2_is_role_editor_open(member.uuid)
                    const roleNeverExpire = !!(window.member_patch_is_never_expire && window.member_patch_is_never_expire(member.role, member.role_expired_at))
                    const roleExpiryText = roleNeverExpire
                        ? admin_t('members.expiry.never')
                        : (member.role_expired_at ? admin_t('admin.common.expired_on', { date: member.role_expired_at }) : '')
                    const addonExpiryText = addonActive && member.role_addon_kssjoint_expired_at
                        ? admin_t('admin.common.expired_on', { date: member.role_addon_kssjoint_expired_at })
                        : ''
                    const roleChipClass = member_patch_v2_role_chip_class(member.role, themeMode)
                    const addonChipClass = member_patch_v2_addon_chip_class(themeMode, addonActive)
                    const addonChipText = admin_t('admin.common.membership_addon') + ': ' + (addonActive ? admin_role_label('KSS Joint Member') : admin_t('admin.common.none'))

                    return (
                        <div key={member.uuid || member.email || idx} class={palette.memberCard}>
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                    <div class="flex min-w-0 flex-col gap-3">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <p class={palette.name}>{member.name}</p>
                                            <p class={roleChipClass}>{admin_role_label(member.role)}</p>
                                            {roleExpiryText ? <p class={palette.metaChip}>{roleExpiryText}</p> : null}
                                            <p class={addonChipClass}>{addonChipText}</p>
                                            {addonExpiryText ? <p class={palette.metaChip}>{addonExpiryText}</p> : null}
                                            {member.role_pending == 'Student Member' ? (
                                                <button type="button" class={palette.pendingBadge} onClick={() => click_btn_pending_student(member.email)}>
                                                    {admin_t('admin.roles.pending_student_application')}
                                                </button>
                                            ) : null}
                                            {member.officer !== 'Member' ? (
                                                <p class={palette.officerBadge}>{member.officer}</p>
                                            ) : null}
                                        </div>
                                        <p class={palette.email}>{member.email}</p>
                                    </div>

                                    <div class="flex flex-col items-start gap-2 xl:items-end">
                                        <div class="flex flex-wrap items-center gap-2 xl:justify-end">
                                            <button
                                                id={'btn_member_toggle_role_editor_' + member.uuid}
                                                type="button"
                                                aria-expanded={showRoleEditor ? 'true' : 'false'}
                                                onClick={() => member_patch_toggle_role_editor(member.uuid)}
                                                class={palette.secondaryBtn}>
                                                {admin_t(showRoleEditor ? 'members.card.hide_role' : 'members.card.change_role')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => click_btn_like_change_password(member.email)}
                                                class={palette.tertiaryBtn}>
                                                {admin_t('members.card.change_password')}
                                            </button>
                                        </div>
                                        <div id={'div_member_list_btn_change_password_' + member.email} class={palette.link}></div>
                                    </div>
                                </div>

                                <div id={'div_member_role_editor_' + member.uuid} class={(showRoleEditor ? '' : 'hidden ') + 'grid grid-cols-1 gap-4 xl:grid-cols-5'}>
                                    <div class="xl:col-span-3">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('admin.common.membership')}</p>
                                            </div>

                                            <div id={'div_member_list_btn_membership_' + member.uuid} class="w-full">
                                                <Div_member_list_membership
                                                    uuid_user={member.uuid}
                                                    current_role={member.role}
                                                    role_expired_at={member.role_expired_at}
                                                    themeMode={themeMode} />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="xl:col-span-2">
                                        <div class={palette.sectionCard}>
                                            <div class="mb-4 flex items-center justify-between gap-3">
                                                <p class={palette.sectionLabel}>{admin_t('admin.common.membership_addon')}</p>
                                            </div>

                                            <div id={'div_member_list_btn_membership_addon_' + member.uuid} class="w-full">
                                                <Div_member_list_membership_addon
                                                    uuid_user={member.uuid}
                                                    role_addon_kssjoint={member.role_addon_kssjoint}
                                                    role_addon_kssjoint_expired_at={member.role_addon_kssjoint_expired_at}
                                                    themeMode={themeMode} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <p class={palette.metaChip}>
                                        {admin_t('members.card.joined_at', { date: member.created_at })}
                                    </p>
                                    {member.affiliation ? <p class={palette.metaChip}>{admin_t('members.card.affiliation', { value: member.affiliation })}</p> : null}
                                    {member.title ? <p class={palette.metaChip}>{admin_t('members.card.title_label', { value: member.title })}</p> : null}
                                    {member.education ? <p class={palette.metaChip}>{admin_t('members.card.education', { value: member.education })}</p> : null}
                                    {member.interest ? <p class={palette.metaChip}>{admin_t('members.card.interest', { value: member.interest })}</p> : null}
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        )
    }

    function Div_member_bot_review_count(props) {
        const palette = member_management_get_palette(member_patch_get_theme_mode())
        const formattedCount = member_patch_format_number(props.count || 0)
        const buttonClass = palette.secondaryBtn + (toggle_btn_download_list ? ' cursor-not-allowed opacity-90' : '')
        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div class="space-y-2">
                        <p class={'text-sm font-medium ' + palette.countLabel}>{admin_t('members.bot.count', { count: formattedCount })}</p>
                        <p class={'text-4xl font-extrabold tracking-tight ' + palette.countNumber}>{formattedCount}</p>
                    </div>
                    <div>
                        <button type="button" onClick={() => click_btn_download_list()} class={buttonClass} disabled={toggle_btn_download_list}>
                            {toggle_btn_download_list ? (
                                <>
                                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-2 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" opacity="0.25"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    {admin_t('members.list_download_preparing')}
                                </>
                            ) : (
                                <>
                                    <img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/button_download.svg" class="w-4 h-4 mr-2" />
                                    {admin_t('members.list_download')}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    Div_member_search_filter = function (props) {
        if (member_patch_get_active_mode() === 'bot-review' && BOT_REVIEW_SEARCH_FILTER) {
            return <BOT_REVIEW_SEARCH_FILTER {...props} />
        }
        return <Div_member_management_search_filter {...props} />
    }

    Div_member_list = function (props) {
        if (member_patch_get_active_mode() === 'bot-review' && BOT_REVIEW_MEMBER_LIST) {
            return <BOT_REVIEW_MEMBER_LIST {...props} />
        }
        return <Div_member_management_list {...props} />
    }

    Div_member_count = function (props) {
        if (member_patch_get_active_mode() === 'bot-review') {
            return <Div_member_bot_review_count {...props} />
        }
        if (DEFAULT_MEMBER_COUNT) {
            return <DEFAULT_MEMBER_COUNT {...props} />
        }
        return null
    }

    set_content = function () {
        if (member_patch_get_active_mode() !== 'bot-review') {
            if (typeof PREV_SET_CONTENT === 'function') {
                return PREV_SET_CONTENT()
            }
            return
        }

        member_patch_install_theme_listener()
        member_patch_clear_scroll_handler()
        member_patch_dispose_charts()

        function Div_member_bot_review_page() {
            const palette = member_management_get_palette(member_patch_get_theme_mode())
            return (
                <div class={'flex flex-col w-full space-y-6 ' + palette.page} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <Div_member_mode_tabs activeMode="bot-review" />
                    <div class="space-y-4">
                        <div class={palette.panelSoft}>
                            <p class={'text-lg font-bold ' + palette.heading}>{admin_t('members.bot.page_title')}</p>
                            <p class={'mt-2 text-sm ' + palette.muted}>{admin_t('members.bot.page_description')}</p>
                        </div>
                        <div id="div_member_search_filter"></div>
                        <div id="div_member_count"></div>
                        <div id="div_member_list"></div>
                    </div>
                </div>
            )
        }

        ReactDOM.render(<Div_member_bot_review_page />, document.getElementById('div_content'))
        ReactDOM.render(<Div_member_search_filter />, document.getElementById('div_member_search_filter'))

        if (gv_member_filter_state && Object.keys(gv_member_list_pages).length > 0) {
            if (typeof member_patch_restore_filter_state === 'function') {
                member_patch_restore_filter_state(gv_member_filter_state)
            }
            if (typeof member_patch_rerender_management_from_cache === 'function') {
                member_patch_rerender_management_from_cache()
            }
        } else {
            get_member_list('init')
        }

        if (typeof IntersectionObserver === 'undefined') {
            gv_member_scroll_handler = () => {
                const isScrollEnded = window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight
                if (isScrollEnded && !toggle_page && gv_member_has_next) { get_member_list('next') }
            }
            window.addEventListener('scroll', gv_member_scroll_handler)
        }
    }

    member_patch_refresh_theme_ui = function () {
        const activeMode = member_patch_get_active_mode()
        const filterState = typeof member_patch_capture_filter_state === 'function' ? member_patch_capture_filter_state() : null

        set_content()

        if (member_patch_is_management_like_mode()) {
            if (filterState && typeof member_patch_restore_filter_state === 'function') {
                member_patch_restore_filter_state(filterState)
            }
            if (typeof member_patch_rerender_management_from_cache === 'function') {
                member_patch_rerender_management_from_cache()
            }
            return
        }

        render_member_dashboard(false)
    }
})()


// ===== Final member management + bot-review fix patch 2026-04-11c =====
;(() => {
    if (window.__statkiss_member_management_bot_review_final_fix_20260411c) return
    window.__statkiss_member_management_bot_review_final_fix_20260411c = true

    const CURRENT_MEMBER_SEARCH_FILTER = typeof Div_member_search_filter === 'function' ? Div_member_search_filter : null
    const CURRENT_APPLY_FILTER_STATE = typeof member_patch_apply_filter_state_to_form_data === 'function' ? member_patch_apply_filter_state_to_form_data : null

    const ROLE_FILTER_IDS = [
        'check_member_admin',
        'check_member_lifetime',
        'check_member_regular',
        'check_member_spouse',
        'check_member_student',
        'check_member_member',
    ]
    const ADDON_FILTER_IDS = ['check_member_addon_none', 'check_member_addon_kssjoint']
    const OFFICER_FILTER_IDS = ['check_member_officer_yes', 'check_member_officer_no']
    const BOT_STATUS_IDS = ['check_member_bot_none', 'check_member_bot_suspected', 'check_member_bot_review', 'check_member_bot_cleared']

    const memberPatchFinalPendingLabel = function (count) {
        const baseLabel = admin_t('admin.roles.pending_student_application')
        const safeCount = member_patch_safe_number(count)
        if (safeCount <= 0) return baseLabel
        const formattedCount = member_patch_format_number(safeCount)
        const langCode = String(document.documentElement.getAttribute('lang') || 'en').toLowerCase()
        if (langCode === 'ko' || langCode.indexOf('ko-') === 0) {
            return baseLabel + '(' + formattedCount + '명)'
        }
        return baseLabel + ' (' + formattedCount + ')'
    }

    const memberPatchFinalToggleIcon = function (kind) {
        if (kind === 'clear') {
            return (
                <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3.25" stroke="currentColor" strokeWidth="2.1" />
                    <path d="M8.5 8.5L15.5 15.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                    <path d="M15.5 8.5L8.5 15.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                </svg>
            )
        }
        return (
            <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.5" y="3.5" width="17" height="17" rx="3.25" stroke="currentColor" strokeWidth="2.1" />
                <path d="M7.75 12L10.5 14.75L16.25 9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }

    const memberPatchFinalIsAddonActive = function (value) {
        const text = String(value == null ? '' : value).trim()
        return value === 1 || value === '1' || value === true || text === 'KSS Joint Member'
    }

    const memberPatchFinalRoleChipClass = function (roleName, themeMode) {
        if (!roleName) return member_management_get_palette(themeMode).metaChip
        return 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ' + member_management_role_tone(roleName, themeMode)
    }

    const memberPatchFinalAddonChipClass = function (themeMode, isActive) {
        if (!isActive) return member_management_get_palette(themeMode).metaChip
        if (themeMode === 'dark') {
            return 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-blue-400/35 bg-blue-500/15 text-blue-200'
        }
        return 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-blue-200 bg-blue-50 text-blue-700'
    }

    const memberPatchFinalIsRoleEditorOpen = function (uuidUser) {
        const key = String(uuidUser || '')
        return !!(window.member_patch_role_editor_state && window.member_patch_role_editor_state[key])
    }

    // expose helpers as real globals because older patch closures reference these names directly
    window.member_patch_v2_get_pending_student_label = memberPatchFinalPendingLabel
    window.member_patch_v2_toggle_icon = memberPatchFinalToggleIcon
    window.member_patch_v2_is_addon_active = memberPatchFinalIsAddonActive
    window.member_patch_v2_role_chip_class = memberPatchFinalRoleChipClass
    window.member_patch_v2_addon_chip_class = memberPatchFinalAddonChipClass
    window.member_patch_v2_is_role_editor_open = memberPatchFinalIsRoleEditorOpen
    try { member_patch_v2_get_pending_student_label = memberPatchFinalPendingLabel } catch (e) {}
    try { member_patch_v2_toggle_icon = memberPatchFinalToggleIcon } catch (e) {}
    try { member_patch_v2_is_addon_active = memberPatchFinalIsAddonActive } catch (e) {}
    try { member_patch_v2_role_chip_class = memberPatchFinalRoleChipClass } catch (e) {}
    try { member_patch_v2_addon_chip_class = memberPatchFinalAddonChipClass } catch (e) {}
    try { member_patch_v2_is_role_editor_open = memberPatchFinalIsRoleEditorOpen } catch (e) {}

    const finalBotCheckboxItem = function (id, label, palette) {
        return (
            <label for={id} class={palette.checkboxItem}>
                <input id={id} type="checkbox" value="" class={palette.checkbox} />
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            </label>
        )
    }

    function Div_member_bot_review_filter_final() {
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const isDark = themeMode === 'dark'
        const noticeClass = themeMode === 'dark'
            ? 'rounded-2xl border border-purple-400/20 bg-purple-500/10 p-5'
            : 'rounded-2xl border border-purple-200 bg-purple-50 p-5'
        const noticeTitleClass = isDark ? 'text-base font-semibold text-purple-100' : 'text-base font-semibold text-purple-800'
        const noticeBodyClass = isDark ? 'text-sm text-purple-100/80' : 'text-sm text-purple-700'
        const selectAllLabel = admin_t('members.search.select_all')
        const clearAllLabel = admin_t('members.search.clear_all')

        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-5">
                    <div class={noticeClass}>
                        <div class="space-y-2">
                            <p class={noticeTitleClass}>{admin_t('members.bot.notice.title')}</p>
                            <p class={noticeBodyClass}>{admin_t('members.bot.notice.body')}</p>
                        </div>
                    </div>

                    <div class={palette.sectionCard}>
                        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p class={palette.sectionLabel}>{admin_t('members.bot.filter.title')}</p>
                            <div class="flex items-center gap-2 self-end sm:self-auto">
                                <button type="button" class={palette.secondaryBtn + ' h-12 w-14 px-0 text-base'} onClick={() => member_patch_toggle_bot_filters(true)} aria-label={selectAllLabel} title={selectAllLabel}>
                                    {memberPatchFinalToggleIcon('select')}
                                    <span class="sr-only">{selectAllLabel}</span>
                                </button>
                                <button type="button" class={palette.secondaryBtn + ' h-12 w-14 px-0 text-base'} onClick={() => member_patch_toggle_bot_filters(false)} aria-label={clearAllLabel} title={clearAllLabel}>
                                    {memberPatchFinalToggleIcon('clear')}
                                    <span class="sr-only">{clearAllLabel}</span>
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                            {finalBotCheckboxItem('check_member_bot_none', admin_t('members.bot.filter.none'), palette)}
                            {finalBotCheckboxItem('check_member_bot_suspected', admin_t('members.bot.filter.suspected'), palette)}
                            {finalBotCheckboxItem('check_member_bot_review', admin_t('members.bot.filter.review'), palette)}
                            {finalBotCheckboxItem('check_member_bot_cleared', admin_t('members.bot.filter.cleared'), palette)}
                            {finalBotCheckboxItem('check_member_bot_excluded', admin_t('members.bot.filter.excluded_only'), palette)}
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <div id="div_btn_search">
                            <Div_btn_search />
                        </div>
                        <button type="button" onClick={() => click_btn_reset_filters()} class={palette.secondaryBtn}>
                            {admin_t('members.search.reset')}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    Div_member_search_filter = function (props) {
        if (typeof member_patch_get_active_mode === 'function' && member_patch_get_active_mode() === 'bot-review') {
            return <Div_member_bot_review_filter_final {...props} />
        }
        return CURRENT_MEMBER_SEARCH_FILTER ? <CURRENT_MEMBER_SEARCH_FILTER {...props} /> : null
    }

    member_patch_apply_filter_state_to_form_data = function (formData, filterState) {
        const mode = typeof member_patch_get_active_mode === 'function' ? member_patch_get_active_mode() : 'analytics'
        const state = typeof member_patch_clone_filter_state === 'function'
            ? member_patch_clone_filter_state(filterState)
            : (filterState || {})

        if (mode !== 'bot-review') {
            if (typeof CURRENT_APPLY_FILTER_STATE === 'function') {
                return CURRENT_APPLY_FILTER_STATE(formData, state)
            }
            return
        }

        formData.append('txt_name', state.txt_name || '')
        formData.append('txt_email', state.txt_email || '')
        ROLE_FILTER_IDS.forEach((id) => formData.append(id, 'YES'))
        ADDON_FILTER_IDS.forEach((id) => formData.append(id, 'YES'))
        OFFICER_FILTER_IDS.forEach((id) => formData.append(id, 'YES'))
        formData.append('check_member_pending_student', 'NO')
        formData.append('member_mode', 'bot-review')
        BOT_STATUS_IDS.forEach((id) => formData.append(id, state[id] ? 'YES' : 'NO'))
        formData.append('check_member_bot_excluded', state.check_member_bot_excluded ? 'YES' : 'NO')
    }
})()


// ===== Member management + Bot review UI polish patch 2026-04-11e =====
;(function () {
    if (window.__statkiss_member_management_bot_review_ui_polish_20260411e) return
    window.__statkiss_member_management_bot_review_ui_polish_20260411e = true

    window.member_patch_bot_editor_state = window.member_patch_bot_editor_state || {}
    let member_patch_bot_action_loading_v2 = false

    function memberPatchUiMode() {
        return (typeof member_patch_get_active_mode === 'function') ? member_patch_get_active_mode() : 'analytics'
    }

    function memberPatchIsBotReviewMode() {
        return memberPatchUiMode() === 'bot-review'
    }

    function memberPatchIsManagementMode() {
        return memberPatchUiMode() === 'management'
    }

    function memberPatchBotReasonInputId(uuidUser) {
        return 'txt_member_bot_reason_' + String(uuidUser || '')
    }

    function memberPatchIsBotEditorOpen(uuidUser) {
        if (memberPatchIsBotReviewMode()) return true
        const key = String(uuidUser || '')
        return !!(window.member_patch_bot_editor_state && window.member_patch_bot_editor_state[key])
    }

    function memberPatchReadBotReason(uuidUser) {
        const target = document.getElementById(memberPatchBotReasonInputId(uuidUser))
        return target ? String(target.value || '').trim() : ''
    }

    window.member_patch_toggle_bot_editor = function (uuidUser) {
        const key = String(uuidUser || '')
        if (!key || memberPatchIsBotReviewMode()) return true

        const next = !memberPatchIsBotEditorOpen(key)
        window.member_patch_bot_editor_state[key] = next

        const panel = document.getElementById('div_member_bot_editor_' + key)
        if (panel) panel.classList.toggle('hidden', !next)

        const button = document.getElementById('btn_member_toggle_bot_editor_' + key)
        if (button) {
            button.textContent = admin_t(next ? 'members.card.hide_bot_review' : 'members.card.bot_review')
            button.setAttribute('aria-expanded', next ? 'true' : 'false')
        }

        return next
    }

    function memberPatchInlineEmailClass(themeMode) {
        return themeMode === 'dark'
            ? 'inline-flex max-w-full items-center rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-300 break-all'
            : 'inline-flex max-w-full items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 break-all'
    }

    function memberPatchAddonBadgeClass(themeMode) {
        return themeMode === 'dark'
            ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-fuchsia-400/35 bg-fuchsia-500/15 text-fuchsia-100'
            : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700'
    }

    function memberPatchBotNormalizeStatus(value) {
        const text = String(value == null ? '' : value).trim().toLowerCase()
        if (text === 'suspected' || text === 'review' || text === 'cleared') return text
        return ''
    }

    function memberPatchBotStatusLabel(status) {
        const normalized = memberPatchBotNormalizeStatus(status)
        if (normalized === 'suspected') return admin_t('members.bot.badge.suspected')
        if (normalized === 'review') return admin_t('members.bot.badge.review')
        if (normalized === 'cleared') return admin_t('members.bot.badge.cleared')
        return ''
    }

    function memberPatchBotBadgeClass(status, themeMode) {
        const normalized = memberPatchBotNormalizeStatus(status)
        if (normalized === 'suspected') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-rose-400/35 bg-rose-500/15 text-rose-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-rose-200 bg-rose-50 text-rose-700'
        }
        if (normalized === 'review') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-amber-400/35 bg-amber-500/15 text-amber-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-amber-200 bg-amber-50 text-amber-700'
        }
        if (normalized === 'cleared') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-400/35 bg-emerald-500/15 text-emerald-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-200 bg-emerald-50 text-emerald-700'
        }
        return member_management_get_palette(themeMode).metaChip
    }

    function memberPatchBotInfoChipClass(themeMode, tone) {
        if (tone === 'danger') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-rose-400/30 bg-rose-500/10 text-rose-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-rose-200 bg-rose-50 text-rose-700'
        }
        if (tone === 'info') {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-blue-400/30 bg-blue-500/10 text-blue-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs border-blue-200 bg-blue-50 text-blue-700'
        }
        return member_management_get_palette(themeMode).metaChip
    }

    window.memberPatchBotNormalizeStatus = memberPatchBotNormalizeStatus
    window.memberPatchBotStatusLabel = memberPatchBotStatusLabel
    window.memberPatchBotBadgeClass = memberPatchBotBadgeClass
    window.memberPatchBotInfoChipClass = memberPatchBotInfoChipClass
    try { memberPatchBotNormalizeStatus = window.memberPatchBotNormalizeStatus } catch (e) {}
    try { memberPatchBotStatusLabel = window.memberPatchBotStatusLabel } catch (e) {}
    try { memberPatchBotBadgeClass = window.memberPatchBotBadgeClass } catch (e) {}
    try { memberPatchBotInfoChipClass = window.memberPatchBotInfoChipClass } catch (e) {}

    function memberPatchBotDecisionBadgeClass(decision, themeMode) {
        const text = String(decision || '').trim()
        if (!text) return member_management_get_palette(themeMode).metaChip
        const isReject = text.indexOf('버림') >= 0 || text.toLowerCase().indexOf('suspect') >= 0
        const isReview = text.indexOf('보류') >= 0 || text.toLowerCase().indexOf('review') >= 0
        const isClear = text.indexOf('살림') >= 0 || text.toLowerCase().indexOf('clear') >= 0 || text.indexOf('복구') >= 0
        if (isReject) {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-rose-400/35 bg-rose-500/15 text-rose-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-rose-200 bg-rose-50 text-rose-700'
        }
        if (isReview) {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-amber-400/35 bg-amber-500/15 text-amber-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-amber-200 bg-amber-50 text-amber-700'
        }
        if (isClear) {
            return themeMode === 'dark'
                ? 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-400/35 bg-emerald-500/15 text-emerald-100'
                : 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-200 bg-emerald-50 text-emerald-700'
        }
        return member_management_get_palette(themeMode).metaChip
    }

    function memberPatchBotActionButtonClassV2(themeMode, tone) {
        if (tone === 'danger') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-rose-400/25 bg-slate-950 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/10'
                : 'inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50'
        }
        if (tone === 'warning') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-amber-400/25 bg-slate-950 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/10'
                : 'inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-50'
        }
        if (tone === 'success') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-emerald-400/25 bg-slate-950 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/10'
                : 'inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50'
        }
        return themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-800'
            : 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50'
    }

    window.memberPatchBotActionButtonClassV2 = memberPatchBotActionButtonClassV2

    function memberPatchBotSummaryCardClass(themeMode) {
        return themeMode === 'dark'
            ? 'rounded-2xl border border-slate-700 bg-slate-950/60 p-4'
            : 'rounded-2xl border border-slate-200 bg-white p-4'
    }

    function memberPatchBotReasonNoticeClass(themeMode) {
        return themeMode === 'dark'
            ? 'rounded-2xl border border-violet-400/25 bg-violet-500/10 p-4'
            : 'rounded-2xl border border-violet-200 bg-violet-50 p-4'
    }

    function memberPatchBotReasonNoticeTextClass(themeMode) {
        return themeMode === 'dark' ? 'text-sm text-violet-100/90' : 'text-sm text-violet-800'
    }

    async function click_btn_change_member_bot_status_v2(uuid_user, action, email, reason, options) {
        if (!uuid_user || !action) return
        const opts = options && typeof options === 'object' ? options : {}
        const silent = !!opts.silent
        const skipConfirm = !!opts.skipConfirm
        const normalizedReason = String(reason || '').trim()
        const reasonRequired = action === 'mark_review' || action === 'mark_suspected'
        if (reasonRequired && !normalizedReason) {
            const message = admin_t('members.bot.alert.reason_required')
            if (!silent) alert(message)
            throw new Error(message)
        }

        const confirmKeyMap = {
            clear: 'members.bot.confirm.clear',
            mark_review: 'members.bot.confirm.mark_review',
            mark_suspected: 'members.bot.confirm.mark_suspected',
            resend_verification: 'members.bot.confirm.resend',
        }
        const confirmKey = confirmKeyMap[action] || ''
        if (confirmKey && !skipConfirm && !confirm(admin_t(confirmKey))) return
        if (member_patch_bot_action_loading_v2) return

        member_patch_bot_action_loading_v2 = true
        try {
            const requestData = new FormData()
            requestData.append('uuid_user', uuid_user)
            requestData.append('action', action)
            requestData.append('email', email || '')
            requestData.append('reason', normalizedReason)
            const response = await member_patch_fetch_json(member_patch_build_url('/admin/ajax_change_member_bot_status/'), {
                method: 'post',
                headers: { 'X-CSRFToken': getCookie('csrftoken') },
                body: requestData,
            })
            const checker = String(response && response.checker ? response.checker : '').toUpperCase() || 'SUCCESS'
            if (action !== 'resend_verification' && checker !== 'SUCCESS') {
                throw new Error((response && response.error) ? response.error : admin_t('members.load_error'))
            }
            if (typeof member_patch_fix_apply_cached_row === 'function') {
                member_patch_fix_apply_cached_row(uuid_user, response && response.data ? response.data : null)
            }
            if (typeof opts.afterSuccess === 'function') {
                try { opts.afterSuccess(response || {}) } catch (callbackError) { console.error(callbackError) }
            }
            if (!silent) {
                if (action === 'resend_verification') {
                    if (checker === 'RATE_LIMITED') alert(admin_t('members.bot.alert.rate_limited'))
                    else if (checker === 'SKIPPED') alert(admin_t('members.bot.alert.skipped'))
                    else alert(admin_t('members.bot.alert.verification_sent'))
                } else {
                    alert(admin_t('members.bot.alert.updated'))
                }
            }
            if (action !== 'save_reason') {
                const statsVisibilityChanged = !!(response && response.meta && response.meta.stats_visibility_changed)
                if (statsVisibilityChanged && typeof get_member_summary === 'function') {
                    setTimeout(() => {
                        try { get_member_summary() } catch (summaryError) { console.error(summaryError) }
                    }, 0)
                }
            }
            return response || {}
        } catch (error) {
            console.error(error)
            if (!silent) {
                alert((error && error.message) ? error.message : admin_t('members.load_error'))
            }
            throw error
        } finally {
            member_patch_bot_action_loading_v2 = false
        }
    }


    window.click_btn_change_member_bot_status = click_btn_change_member_bot_status_v2
    try { click_btn_change_member_bot_status = click_btn_change_member_bot_status_v2 } catch (e) {}

    function Div_member_bot_review_panel(props) {
        const member = props.member || {}
        const themeMode = props.themeMode || member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const isReviewMode = memberPatchIsBotReviewMode()
        const botStatus = memberPatchBotNormalizeStatus(member.bot_review_status)
        const currentStatusText = memberPatchBotStatusLabel(botStatus) || admin_t('members.bot.current_status.none')
        const decisionText = member.bot_decision || admin_t('members.bot.summary.decision_empty')
        const reasonText = member.bot_decision_reason || admin_t('members.bot.summary.reason_empty')
        const lastActiveText = member.bot_last_active_signal_at || admin_t('members.bot.summary.last_active_empty')
        const verificationText = member.bot_last_verification_sent_at
            ? admin_t('members.bot.meta.last_verification', { date: member.bot_last_verification_sent_at, count: member_patch_format_number(member.bot_verification_sent_count || 0) })
            : ((member.bot_verification_sent_count || 0) > 0
                ? admin_t('members.bot.meta.verification_count', { count: member_patch_format_number(member.bot_verification_sent_count || 0) })
                : admin_t('members.bot.summary.verification_empty'))
        const showPanel = props.forceOpen || memberPatchIsBotEditorOpen(member.uuid)
        const showResend = isReviewMode && botStatus === 'suspected'
        const showClear = isReviewMode || !!botStatus
        const reasonId = memberPatchBotReasonInputId(member.uuid)
        const summaryCardClass = memberPatchBotSummaryCardClass(themeMode)
        const summaryKeyClass = 'text-xs font-semibold uppercase tracking-wide ' + palette.muted
        const summaryValueClass = 'mt-1 text-sm ' + palette.body
        const textareaClass = themeMode === 'dark'
            ? 'min-h-[140px] w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
            : 'min-h-[140px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'

        if (!showPanel) return null

        return (
            <div id={'div_member_bot_editor_' + member.uuid} class={palette.sectionCard}>
                <div class="flex flex-col gap-4">
                    <div class="space-y-1">
                        <div class="flex flex-wrap items-center gap-2">
                            <p class={palette.sectionLabel}>{admin_t('members.bot.section_label')}</p>
                            <p class={memberPatchBotBadgeClass(botStatus, themeMode)}>{currentStatusText}</p>
                            {member.bot_decision ? <p class={memberPatchBotDecisionBadgeClass(member.bot_decision, themeMode)}>{admin_t('members.bot.meta.decision', { value: member.bot_decision })}</p> : null}
                            {member.bot_excluded_from_stats == 1 ? <p class={memberPatchBotInfoChipClass(themeMode, 'danger')}>{admin_t('members.bot.badge.excluded')}</p> : null}
                            {member.bot_login_requires_verification == 1 ? <p class={memberPatchBotInfoChipClass(themeMode, 'info')}>{admin_t('members.bot.badge.verify_required')}</p> : null}
                        </div>
                        <p class={'text-sm ' + palette.muted}>{admin_t(isReviewMode ? 'members.bot.panel.subtitle.review' : 'members.bot.panel.subtitle.management')}</p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <div class={summaryCardClass}>
                            <div class="space-y-4">
                                <p class={'text-sm font-semibold ' + palette.heading}>{admin_t('members.bot.summary.title')}</p>
                                <div>
                                    <p class={summaryKeyClass}>{admin_t('members.bot.current_status')}</p>
                                    <p class={summaryValueClass}>{currentStatusText}</p>
                                </div>
                                <div>
                                    <p class={summaryKeyClass}>{admin_t('members.bot.meta.decision', { value: '' }).replace(': ', '').replace(':', '')}</p>
                                    <p class={summaryValueClass}>{decisionText}</p>
                                </div>
                                <div>
                                    <p class={summaryKeyClass}>{admin_t('members.bot.meta.reason', { value: '' }).replace(': ', '').replace(':', '')}</p>
                                    <p class={summaryValueClass}>{reasonText}</p>
                                </div>
                                <div>
                                    <p class={summaryKeyClass}>{admin_t('members.bot.meta.last_active', { value: '' }).replace(': ', '').replace(':', '')}</p>
                                    <p class={summaryValueClass}>{lastActiveText}</p>
                                </div>
                                <div>
                                    <p class={summaryKeyClass}>{admin_t('members.bot.badge.verify_required')}</p>
                                    <p class={summaryValueClass}>{verificationText}</p>
                                </div>
                            </div>
                        </div>

                        <div class={summaryCardClass}>
                            <div class="space-y-3">
                                <label class="flex flex-col gap-2" for={reasonId}>
                                    <span class={'text-sm font-semibold ' + palette.heading}>{admin_t('members.bot.reason_input')}</span>
                                    <textarea
                                        id={reasonId}
                                        defaultValue={member.bot_decision_reason || ''}
                                        placeholder={admin_t(isReviewMode ? 'members.bot.reason_placeholder.review' : 'members.bot.reason_placeholder.management')}
                                        class={textareaClass}></textarea>
                                </label>
                                <p class={'text-xs ' + palette.muted}>{admin_t('members.bot.summary.help')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        {showClear ? (
                            <button type="button" class={memberPatchBotActionButtonClassV2(themeMode, 'success')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'clear', member.email, memberPatchReadBotReason(member.uuid))}>
                                {admin_t('members.bot.action.clear')}
                            </button>
                        ) : null}
                        <button type="button" class={memberPatchBotActionButtonClassV2(themeMode, 'warning')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'mark_review', member.email, memberPatchReadBotReason(member.uuid))}>
                            {admin_t('members.bot.action.mark_review')}
                        </button>
                        <button type="button" class={memberPatchBotActionButtonClassV2(themeMode, 'danger')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'mark_suspected', member.email, memberPatchReadBotReason(member.uuid))}>
                            {admin_t('members.bot.action.mark_suspected')}
                        </button>
                        {showResend ? (
                            <button type="button" class={memberPatchBotActionButtonClassV2(themeMode, 'neutral')} onClick={() => click_btn_change_member_bot_status(member.uuid, 'resend_verification', member.email, memberPatchReadBotReason(member.uuid))}>
                                {admin_t('members.bot.action.resend')}
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }

    function Div_member_card_polished(props) {
        const member = props.member || {}
        const idx = props.idx || 0
        const themeMode = props.themeMode || member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const mode = memberPatchUiMode()
        const addonActive = member_patch_v2_is_addon_active(member.role_addon_kssjoint)
        const showRoleEditor = member_patch_v2_is_role_editor_open(member.uuid)
        const showBotEditor = memberPatchIsBotEditorOpen(member.uuid)
        const roleNeverExpire = !!(window.member_patch_is_never_expire && window.member_patch_is_never_expire(member.role, member.role_expired_at))
        const roleExpiryText = roleNeverExpire
            ? admin_t('members.expiry.never')
            : (member.role_expired_at ? admin_t('admin.common.expired_on', { date: member.role_expired_at }) : '')
        const addonExpiryText = addonActive && member.role_addon_kssjoint_expired_at
            ? admin_t('admin.common.expired_on', { date: member.role_addon_kssjoint_expired_at })
            : ''
        const roleChipClass = member_patch_v2_role_chip_class(member.role, themeMode)
        const addonChipText = admin_t('admin.common.membership_addon') + ': ' + admin_role_label('KSS Joint Member')
        const botStatus = memberPatchBotNormalizeStatus(member.bot_review_status)
        const hasBotStatus = !!botStatus
        const botStatusText = memberPatchBotStatusLabel(botStatus)
        const decisionBadgeText = member.bot_decision ? admin_t('members.bot.meta.decision', { value: member.bot_decision }) : ''
        const noteText = member.bot_decision_reason || ''
        const generalMeta = [
            admin_t('members.card.joined_at', { date: member.created_at }),
            member.affiliation ? admin_t('members.card.affiliation', { value: member.affiliation }) : '',
            member.title ? admin_t('members.card.title_label', { value: member.title }) : '',
            member.education ? admin_t('members.card.education', { value: member.education }) : '',
            member.interest ? admin_t('members.card.interest', { value: member.interest }) : '',
        ].filter(Boolean)

        return (
            <div key={member.uuid || member.email || idx} class={palette.memberCard}>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div class="flex min-w-0 flex-col gap-3">
                            <div class="flex flex-wrap items-center gap-2">
                                <p class={palette.name}>{member.name}</p>
                                {member.email ? <p class={memberPatchInlineEmailClass(themeMode)}>{member.email}</p> : null}
                            </div>
                            <div class="flex flex-wrap items-center gap-2">
                                <p class={roleChipClass}>{admin_role_label(member.role)}</p>
                                {roleExpiryText ? <p class={palette.metaChip}>{roleExpiryText}</p> : null}
                                {addonActive ? <p class={memberPatchAddonBadgeClass(themeMode)}>{addonChipText}</p> : null}
                                {addonExpiryText ? <p class={palette.metaChip}>{addonExpiryText}</p> : null}
                                {hasBotStatus ? <p class={memberPatchBotBadgeClass(botStatus, themeMode)}>{botStatusText}</p> : null}
                                {decisionBadgeText ? <p class={memberPatchBotDecisionBadgeClass(member.bot_decision, themeMode)}>{decisionBadgeText}</p> : null}
                                {member.bot_excluded_from_stats == 1 ? <p class={memberPatchBotInfoChipClass(themeMode, 'danger')}>{admin_t('members.bot.badge.excluded')}</p> : null}
                                {member.bot_login_requires_verification == 1 ? <p class={memberPatchBotInfoChipClass(themeMode, 'info')}>{admin_t('members.bot.badge.verify_required')}</p> : null}
                                {member.role_pending == 'Student Member' ? (
                                    <button type="button" class={palette.pendingBadge} onClick={() => click_btn_pending_student(member.email)}>
                                        {admin_t('admin.roles.pending_student_application')}
                                    </button>
                                ) : null}
                                {member.officer !== 'Member' ? <p class={palette.officerBadge}>{member.officer}</p> : null}
                            </div>
                        </div>

                        <div class="flex flex-col items-start gap-2 xl:items-end">
                            <div class="flex flex-wrap items-center gap-2 xl:justify-end">
                                <button
                                    id={'btn_member_toggle_role_editor_' + member.uuid}
                                    type="button"
                                    aria-expanded={showRoleEditor ? 'true' : 'false'}
                                    onClick={() => member_patch_toggle_role_editor(member.uuid)}
                                    class={palette.secondaryBtn}>
                                    {admin_t(showRoleEditor ? 'members.card.hide_role' : 'members.card.change_role')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => click_btn_like_change_password(member.email)}
                                    class={palette.tertiaryBtn}>
                                    {admin_t('members.card.change_password')}
                                </button>
                                {mode === 'management' ? (
                                    <button
                                        id={'btn_member_toggle_bot_editor_' + member.uuid}
                                        type="button"
                                        aria-expanded={showBotEditor ? 'true' : 'false'}
                                        onClick={() => member_patch_toggle_bot_editor(member.uuid)}
                                        class={palette.secondaryBtn}>
                                        {admin_t(showBotEditor ? 'members.card.hide_bot_review' : 'members.card.bot_review')}
                                    </button>
                                ) : null}
                            </div>
                            <div id={'div_member_list_btn_change_password_' + member.email} class={palette.link}></div>
                        </div>
                    </div>

                    {noteText && mode === 'management' ? (
                        <div class={memberPatchBotReasonNoticeClass(themeMode)}>
                            <p class={memberPatchBotReasonNoticeTextClass(themeMode)}>{admin_t('members.bot.meta.reason', { value: noteText })}</p>
                        </div>
                    ) : null}

                    <Div_member_bot_review_panel member={member} themeMode={themeMode} forceOpen={mode === 'bot-review'} />

                    <div id={'div_member_role_editor_' + member.uuid} class={(showRoleEditor ? '' : 'hidden ') + 'grid grid-cols-1 gap-4 xl:grid-cols-5'}>
                        <div class="xl:col-span-3">
                            <div class={palette.sectionCard}>
                                <div class="mb-4 flex items-center justify-between gap-3">
                                    <p class={palette.sectionLabel}>{admin_t('admin.common.membership')}</p>
                                </div>

                                <div id={'div_member_list_btn_membership_' + member.uuid} class="w-full">
                                    <Div_member_list_membership
                                        uuid_user={member.uuid}
                                        current_role={member.role}
                                        role_expired_at={member.role_expired_at}
                                        themeMode={themeMode} />
                                </div>
                            </div>
                        </div>

                        <div class="xl:col-span-2">
                            <div class={palette.sectionCard}>
                                <div class="mb-4 flex items-center justify-between gap-3">
                                    <p class={palette.sectionLabel}>{admin_t('admin.common.membership_addon')}</p>
                                </div>

                                <div id={'div_member_list_btn_membership_addon_' + member.uuid} class="w-full">
                                    <Div_member_list_membership_addon
                                        uuid_user={member.uuid}
                                        role_addon_kssjoint={member.role_addon_kssjoint}
                                        role_addon_kssjoint_expired_at={member.role_addon_kssjoint_expired_at}
                                        themeMode={themeMode} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-2">
                        {generalMeta.map((value, metaIdx) => <p key={member.uuid + '_meta_' + metaIdx} class={palette.metaChip}>{value}</p>)}
                    </div>
                </div>
            </div>
        )
    }

    Div_member_list = function (props) {
        const themeMode = member_patch_get_theme_mode()
        const palette = member_management_get_palette(themeMode)
        const rows = Array.isArray(props.data) ? props.data : Object.values(props.data || {})

        if (!rows.length) {
            return (
                <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class={palette.emptyWrap}>
                        <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                    </div>
                    <div id={'div_member_list_' + (page_num + 1).toString()}></div>
                </div>
            )
        }

        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                {rows.map((member, idx) => <Div_member_card_polished key={member.uuid || member.email || idx} member={member} idx={idx} themeMode={themeMode} />)}
                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        )
    }

    try { Div_member_management_list = function (props) { return <Div_member_list {...props} /> } } catch (e) {}
})();


// ===== Final Bot/member UX cleanup patch 2026-04-12f =====
;(function () {
    if (window.__statkiss_member_bot_cleanup_20260412f) return;
    window.__statkiss_member_bot_cleanup_20260412f = true;

    const PREV_SEARCH_FILTER = typeof Div_member_search_filter === 'function' ? Div_member_search_filter : null;
    const PREV_DIV_MEMBER_LIST = typeof Div_member_list === 'function' ? Div_member_list : null;
    const PREV_DIV_MEMBER_COUNT = typeof Div_member_count === 'function' ? Div_member_count : null;
    const PREV_APPLY_DEFAULT_FILTERS = typeof member_patch_apply_default_member_filters === 'function' ? member_patch_apply_default_member_filters : null;
    const BOT_EDITOR_STATE = window.member_patch_bot_editor_state_final || {};
    window.member_patch_bot_editor_state_final = BOT_EDITOR_STATE;
    const BOT_PENDING_ACTION_STATE = window.member_patch_bot_pending_action_state_final || {};
    window.member_patch_bot_pending_action_state_final = BOT_PENDING_ACTION_STATE;
    const BOT_REASON_DRAFT_STATE = window.member_patch_bot_reason_draft_state_final || {};
    window.member_patch_bot_reason_draft_state_final = BOT_REASON_DRAFT_STATE;
    const BOT_REASON_VERSION_STATE = window.member_patch_bot_reason_version_state_final || {};
    window.member_patch_bot_reason_version_state_final = BOT_REASON_VERSION_STATE;
    const BOT_APPLY_LOADING_STATE = window.member_patch_bot_apply_loading_state_final || {};
    window.member_patch_bot_apply_loading_state_final = BOT_APPLY_LOADING_STATE;

    function botCleanupSafeText(value) {
        return value == null ? '' : String(value);
    }

    function botCleanupSafeInt(value) {
        const num = Number(value);
        return Number.isFinite(num) ? num : 0;
    }

    function botCleanupNormalizeStatus(value) {
        const text = botCleanupSafeText(value).trim().toLowerCase();
        if (text === 'suspected' || text === 'review' || text === 'cleared') return text;
        return '';
    }

    function botCleanupDecisionText(member) {
        return botCleanupSafeText(member && member.bot_decision).trim();
    }

    function botCleanupIsAddonActive(value) {
        const text = botCleanupSafeText(value).trim();
        return value === 1 || value === '1' || value === true || text === 'KSS Joint Member';
    }

    function botCleanupStatusBucket(member) {
        const status = botCleanupNormalizeStatus(member && member.bot_review_status);
        if (status === 'cleared') return 'cleared';
        if (status === 'review') return 'review';
        if (status === 'suspected') return 'discarded';
        return '';
    }

    function botCleanupStatusLabel(member) {
        const bucket = botCleanupStatusBucket(member);
        if (bucket === 'discarded' || bucket === 'suspected') return admin_t('members.bot.status.discarded');
        if (bucket === 'review') return admin_t('members.bot.status.review_queue');
        if (bucket === 'cleared') return admin_t('members.bot.status.cleared');
        return '';
    }

    function botCleanupDecisionBadgeText(member) {
        const decision = botCleanupDecisionText(member);
        if (!decision) return '';
        if (/버림|discard/i.test(decision)) return admin_t('members.bot.badge.decision_discarded');
        if (/보류|review/i.test(decision)) return admin_t('members.bot.badge.decision_review');
        if (/살림|clear|keep/i.test(decision)) return admin_t('members.bot.badge.decision_saved');
        return admin_t('members.bot.meta.decision', { value: decision });
    }

    function botCleanupThemeBadgeClass(themeMode, tone) {
        const isDark = themeMode === 'dark';
        if (tone === 'danger') {
            return isDark
                ? 'inline-flex items-center rounded-full border border-rose-400/35 bg-rose-500/12 px-3 py-1 text-xs font-semibold text-rose-100'
                : 'inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700';
        }
        if (tone === 'warning') {
            return isDark
                ? 'inline-flex items-center rounded-full border border-amber-400/35 bg-amber-500/12 px-3 py-1 text-xs font-semibold text-amber-100'
                : 'inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700';
        }
        if (tone === 'success') {
            return isDark
                ? 'inline-flex items-center rounded-full border border-emerald-400/35 bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-100'
                : 'inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700';
        }
        if (tone === 'primary') {
            return isDark
                ? 'inline-flex items-center rounded-full border border-blue-400/35 bg-blue-500/12 px-3 py-1 text-xs font-semibold text-blue-100'
                : 'inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700';
        }
        if (tone === 'addon') {
            return isDark
                ? 'inline-flex items-center rounded-full border border-fuchsia-400/35 bg-fuchsia-500/15 px-3 py-1 text-xs font-semibold text-fuchsia-100'
                : 'inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-xs font-semibold text-fuchsia-700';
        }
        return member_management_get_palette(themeMode).metaChip;
    }

    function botCleanupStatusBadgeClass(member, themeMode) {
        const bucket = botCleanupStatusBucket(member);
        if (bucket === 'discarded' || bucket === 'suspected') return botCleanupThemeBadgeClass(themeMode, 'danger');
        if (bucket === 'review') return botCleanupThemeBadgeClass(themeMode, 'warning');
        if (bucket === 'cleared') return botCleanupThemeBadgeClass(themeMode, 'success');
        return member_management_get_palette(themeMode).metaChip;
    }

    function botCleanupDecisionBadgeClass(member, themeMode) {
        const decision = botCleanupDecisionText(member);
        if (/버림|discard/i.test(decision)) return botCleanupThemeBadgeClass(themeMode, 'danger');
        if (/보류|review/i.test(decision)) return botCleanupThemeBadgeClass(themeMode, 'warning');
        if (/살림|clear|keep/i.test(decision)) return botCleanupThemeBadgeClass(themeMode, 'success');
        return member_management_get_palette(themeMode).metaChip;
    }

    function botCleanupGhostButtonClass(themeMode) {
        return themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800'
            : 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50';
    }

    function botCleanupBotToggleButtonClass(themeMode, isOpen) {
        if (themeMode === 'dark') {
            return isOpen
                ? 'inline-flex items-center justify-center rounded-xl border border-violet-400/45 bg-violet-500/18 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/28'
                : 'inline-flex items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/20';
        }
        return isOpen
            ? 'inline-flex items-center justify-center rounded-xl border border-violet-300 bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-200'
            : 'inline-flex items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100';
    }

    function botCleanupPrimaryButtonClass(themeMode) {
        return themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30'
            : 'inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200';
    }

    function botCleanupSmallPrimaryButtonClass(themeMode) {
        return themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-400/30'
            : 'inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200';
    }


    function botCleanupActionButtonClass(themeMode, tone) {
        if (typeof window.memberPatchBotActionButtonClassV2 === 'function') {
            return window.memberPatchBotActionButtonClassV2(themeMode, tone);
        }
        if (tone === 'danger') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-rose-400/25 bg-slate-950 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/10'
                : 'inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50';
        }
        if (tone === 'warning') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-amber-400/25 bg-slate-950 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-500/10'
                : 'inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-50';
        }
        if (tone === 'success') {
            return themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-xl border border-emerald-400/25 bg-slate-950 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/10'
                : 'inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50';
        }
        return themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-800'
            : 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50';
    }

    function botCleanupRadioCardClass(themeMode) {
        return themeMode === 'dark'
            ? 'peer-checked:border-blue-400 peer-checked:bg-blue-500/12 peer-checked:text-blue-100 flex min-h-[56px] items-center justify-center rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-600'
            : 'peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 flex min-h-[56px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50';
    }

    function botCleanupOpenState(uuidUser) {
        return !!BOT_EDITOR_STATE[botCleanupSafeText(uuidUser)];
    }

    function botCleanupReasonInputId(uuidUser) {
        return 'txt_member_bot_reason_' + botCleanupSafeText(uuidUser).trim();
    }

    function botCleanupReadReason(uuidUser) {
        const target = document.getElementById(botCleanupReasonInputId(uuidUser));
        return target ? String(target.value || '').trim() : '';
    }

    function botCleanupPendingAction(uuidUser) {
        return botCleanupSafeText(BOT_PENDING_ACTION_STATE[botCleanupSafeText(uuidUser).trim()]).trim().toLowerCase();
    }

    function botCleanupCurrentAction(status) {
        const normalized = botCleanupNormalizeStatus(status);
        if (normalized === 'review') return 'mark_review';
        if (normalized === 'suspected') return 'mark_suspected';
        if (normalized === 'cleared') return 'clear';
        return '';
    }

    function botCleanupReasonVersion(uuidUser) {
        const key = botCleanupSafeText(uuidUser).trim();
        return Number(BOT_REASON_VERSION_STATE[key] || 0) || 0;
    }

    function botCleanupBumpReasonVersion(uuidUser) {
        const key = botCleanupSafeText(uuidUser).trim();
        BOT_REASON_VERSION_STATE[key] = botCleanupReasonVersion(key) + 1;
        return BOT_REASON_VERSION_STATE[key];
    }

    function botCleanupDraftReason(uuidUser, fallbackReason, mode) {
        const key = botCleanupSafeText(uuidUser).trim();
        if (!key) return '';
        if (!Object.prototype.hasOwnProperty.call(BOT_REASON_DRAFT_STATE, key)) {
            BOT_REASON_DRAFT_STATE[key] = mode === 'management' ? '' : botCleanupSafeText(fallbackReason);
        }
        return botCleanupSafeText(BOT_REASON_DRAFT_STATE[key]);
    }

    function botCleanupSetDraftReason(uuidUser, reason) {
        const key = botCleanupSafeText(uuidUser).trim();
        if (!key) return;
        BOT_REASON_DRAFT_STATE[key] = botCleanupSafeText(reason);
    }

    function botCleanupLoading(uuidUser) {
        return !!BOT_APPLY_LOADING_STATE[botCleanupSafeText(uuidUser).trim()];
    }

    function botCleanupSetLoading(uuidUser, flag) {
        const key = botCleanupSafeText(uuidUser).trim();
        if (!key) return;
        if (flag) BOT_APPLY_LOADING_STATE[key] = true;
        else delete BOT_APPLY_LOADING_STATE[key];
    }

    function botCleanupCanUseClearAction(mode, status) {
        const normalized = botCleanupNormalizeStatus(status);
        if (mode === 'management') return normalized === 'review';
        if (mode === 'bot-review') return normalized === 'review' || normalized === 'suspected';
        return normalized === 'review' || normalized === 'suspected';
    }

    function botCleanupIsActionAllowed(mode, status, action) {
        if (action === 'mark_review') return true;
        if (action === 'mark_suspected') return true;
        if (action === 'clear') return botCleanupCanUseClearAction(mode, status);
        return false;
    }

    function botCleanupSelectionTone(action) {
        if (action === 'mark_review') return 'warning';
        if (action === 'mark_suspected') return 'danger';
        if (action === 'clear') return 'success';
        return 'neutral';
    }

    function botCleanupSelectionButtonClass(themeMode, action, options) {
        const opts = options || {};
        const selected = !!opts.selected;
        const disabled = !!opts.disabled;
        const tone = botCleanupSelectionTone(action);

        let selectedClass = '';
        if (tone === 'danger') {
            selectedClass = themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-full border border-rose-400/35 bg-rose-500/12 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20'
                : 'inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100';
        } else if (tone === 'warning') {
            selectedClass = themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-full border border-amber-400/35 bg-amber-500/12 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/20'
                : 'inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100';
        } else if (tone === 'success') {
            selectedClass = themeMode === 'dark'
                ? 'inline-flex items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-500/12 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20'
                : 'inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100';
        }
        if (selectedClass && selected) {
            return disabled ? selectedClass + ' cursor-not-allowed opacity-90' : selectedClass;
        }

        const neutralClass = themeMode === 'dark'
            ? 'inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-900'
            : 'inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50';
        return disabled ? neutralClass + ' cursor-not-allowed opacity-50 hover:bg-transparent' : neutralClass;
    }

    function botCleanupApplyButtonClass(themeMode, loading) {
        const base = botCleanupPrimaryButtonClass(themeMode);
        return loading ? base + ' cursor-wait opacity-85' : base;
    }

    function botCleanupApplySpinner() {
        return (
            <svg aria-hidden="true" role="status" class="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" opacity="0.25"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
            </svg>
        );
    }

    function botCleanupCurrentMode(mode) {
        const currentMode = botCleanupSafeText(mode).trim();
        if (currentMode) return currentMode;
        return typeof member_patch_get_active_mode === 'function' ? member_patch_get_active_mode() : 'analytics';
    }

    function botCleanupRerenderList() {
        if (typeof member_patch_rerender_management_from_cache === 'function') {
            try { member_patch_rerender_management_from_cache(); } catch (error) { console.error(error); }
        }
    }

    window.member_patch_toggle_bot_review_editor = function (uuidUser, initialReason, mode) {
        const key = botCleanupSafeText(uuidUser).trim();
        if (!key) return false;
        const currentMode = botCleanupCurrentMode(mode);
        const next = !botCleanupOpenState(key);
        BOT_EDITOR_STATE[key] = next;
        if (next) {
            botCleanupDraftReason(key, initialReason || '', currentMode);
        } else {
            delete BOT_PENDING_ACTION_STATE[key];
            delete BOT_APPLY_LOADING_STATE[key];
            if (currentMode === 'management') {
                delete BOT_REASON_DRAFT_STATE[key];
                botCleanupBumpReasonVersion(key);
            }
        }
        botCleanupRerenderList();
        return next;
    };

    window.member_patch_select_bot_review_action = function (uuidUser, action, currentStatus, mode) {
        const key = botCleanupSafeText(uuidUser).trim();
        const nextAction = action === 'mark_review' || action === 'mark_suspected' || action === 'clear' ? action : '';
        const currentMode = botCleanupCurrentMode(mode);
        const committedStatus = botCleanupNormalizeStatus(currentStatus);
        if (!key || !nextAction || botCleanupLoading(key)) return false;
        if (!botCleanupIsActionAllowed(currentMode, committedStatus, nextAction)) return false;

        BOT_EDITOR_STATE[key] = true;
        const currentAction = botCleanupCurrentAction(committedStatus);
        const pendingAction = botCleanupPendingAction(key);
        if (pendingAction === nextAction) {
            delete BOT_PENDING_ACTION_STATE[key];
        } else if (nextAction === currentAction) {
            delete BOT_PENDING_ACTION_STATE[key];
        } else {
            BOT_PENDING_ACTION_STATE[key] = nextAction;
        }
        botCleanupRerenderList();
        return true;
    };

    window.member_patch_run_bot_review_action = function (uuidUser, email, action, options) {
        const key = botCleanupSafeText(uuidUser).trim();
        if (!key || typeof window.click_btn_change_member_bot_status !== 'function') {
            alert(admin_t('members.load_error'));
            return false;
        }

        const opts = options && typeof options === 'object' ? options : {};
        const currentMode = botCleanupCurrentMode(opts.mode);
        const reason = action === 'clear' ? '' : botCleanupReadReason(key);
        const reasonRequired = action === 'mark_review' || action === 'mark_suspected';
        if (reasonRequired && !reason) {
            alert(admin_t('members.bot.alert.reason_required'));
            return false;
        }

        botCleanupSetLoading(key, true);
        botCleanupRerenderList();
        const request = window.click_btn_change_member_bot_status(key, action, email || '', reason, {
            silent: !!opts.silent,
            skipConfirm: !!opts.skipConfirm,
            afterSuccess: (response) => {
                if (action !== 'save_reason') delete BOT_PENDING_ACTION_STATE[key];
                if (currentMode === 'management') {
                    delete BOT_REASON_DRAFT_STATE[key];
                    botCleanupBumpReasonVersion(key);
                } else {
                    const nextReason = botCleanupSafeText(response && response.data && response.data.bot_decision_reason);
                    botCleanupSetDraftReason(key, nextReason);
                    botCleanupBumpReasonVersion(key);
                }
                if (typeof opts.afterSuccess === 'function') {
                    try { opts.afterSuccess(response || {}); } catch (callbackError) { console.error(callbackError); }
                }
            },
        });

        return Promise.resolve(request)
            .then((response) => {
                botCleanupSetLoading(key, false);
                botCleanupRerenderList();
                return response;
            })
            .catch((error) => {
                botCleanupSetLoading(key, false);
                botCleanupRerenderList();
                throw error;
            });
    };

    window.member_patch_apply_bot_review_action = function (uuidUser, email, action, currentStatus, mode) {
        const key = botCleanupSafeText(uuidUser).trim();
        const currentMode = botCleanupCurrentMode(mode);
        const committedStatus = botCleanupNormalizeStatus(currentStatus);
        const nextAction = action || botCleanupPendingAction(key);
        if (botCleanupLoading(key)) return false;

        if (currentMode === 'bot-review' && !nextAction) {
            return window.member_patch_save_bot_reason(key, email, currentMode);
        }
        if (!nextAction) return false;
        if (!botCleanupIsActionAllowed(currentMode, committedStatus, nextAction)) return false;
        return window.member_patch_run_bot_review_action(key, email, nextAction, { skipConfirm: true, mode: currentMode });
    };

    window.member_patch_clear_bot_review_action = function (uuidUser, email, currentStatus, mode) {
        return window.member_patch_select_bot_review_action(uuidUser, 'clear', currentStatus, mode);
    };

    window.member_patch_save_bot_reason = function (uuidUser, email, mode) {
        const key = botCleanupSafeText(uuidUser).trim();
        if (!key || typeof window.click_btn_change_member_bot_status !== 'function') {
            alert(admin_t('members.load_error'));
            return false;
        }

        botCleanupSetLoading(key, true);
        botCleanupRerenderList();
        const request = window.click_btn_change_member_bot_status(key, 'save_reason', email || '', botCleanupReadReason(key), {
            skipConfirm: true,
            afterSuccess: (response) => {
                const nextReason = botCleanupSafeText(response && response.data && response.data.bot_decision_reason);
                botCleanupSetDraftReason(key, nextReason);
                botCleanupBumpReasonVersion(key);
            },
        });

        return Promise.resolve(request)
            .then((response) => {
                botCleanupSetLoading(key, false);
                botCleanupRerenderList();
                return response;
            })
            .catch((error) => {
                botCleanupSetLoading(key, false);
                botCleanupRerenderList();
                throw error;
            });
    };


    window.member_patch_toggle_bot_filters = function (selectAll) {
        ['check_member_bot_review', 'check_member_bot_suspected'].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.checked = !!selectAll;
        });
    };

    member_patch_apply_default_member_filters = function () {
        if (typeof PREV_APPLY_DEFAULT_FILTERS === 'function') PREV_APPLY_DEFAULT_FILTERS();
        if ((typeof member_patch_get_active_mode === 'function' ? member_patch_get_active_mode() : 'analytics') === 'bot-review') {
            const defaults = {
                check_member_bot_none: false,
                check_member_bot_suspected: true,
                check_member_bot_review: true,
                check_member_bot_cleared: false,
                check_member_bot_excluded: false,
            };
            Object.keys(defaults).forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.checked = !!defaults[id];
            });
        }
    };

    function Div_member_bot_review_filter_cleanup() {
        const themeMode = member_patch_get_theme_mode();
        const palette = member_management_get_palette(themeMode);
        const selectAllLabel = admin_t('members.search.select_all');
        const clearAllLabel = admin_t('members.search.clear_all');
        const iconButtonClass = palette.secondaryBtn + ' h-12 w-14 px-0 text-base';

        const checkboxItem = (id, label) => (
            <label for={id} class={palette.checkboxItem}>
                <input id={id} type="checkbox" value="" class={palette.checkbox} />
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
            </label>
        );

        const inputRow = (label, id, extraClass) => (
            <label class={'flex flex-col gap-2 ' + (extraClass || '')}>
                <span class={'text-sm font-medium ' + palette.body}>{label}</span>
                <input type="text" id={id} placeholder={label} onKeyDown={(event) => { if (event.key === 'Enter') click_btn_search(); }} class={palette.input} />
            </label>
        );

        return (
            <div class={palette.panel} dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                <div class="flex flex-col gap-6">
                    <div class="space-y-1 text-center">
                        <p class={'text-lg font-bold ' + palette.heading}>{admin_t('members.bot.filter.title')}</p>
                        <p class={'text-sm ' + palette.muted}>{admin_t('members.bot.form.search_hint')}</p>
                    </div>

                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
                        {inputRow(admin_t('members.bot.form.search_name'), 'txt_name', 'md:col-span-1 xl:col-span-3')}
                        {inputRow(admin_t('members.bot.form.search_email'), 'txt_email', 'md:col-span-1 xl:col-span-3')}
                    </div>

                    <div class={palette.sectionCard}>
                        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p class={palette.sectionLabel}>{admin_t('members.bot.filter.title')}</p>
                            <div class="flex items-center gap-2 self-end sm:self-auto">
                                <button type="button" class={iconButtonClass} onClick={() => window.member_patch_toggle_bot_filters(true)} aria-label={selectAllLabel} title={selectAllLabel}>
                                    {typeof member_patch_v2_toggle_icon === 'function' ? member_patch_v2_toggle_icon('select') : '✓'}
                                    <span class="sr-only">{selectAllLabel}</span>
                                </button>
                                <button type="button" class={iconButtonClass} onClick={() => window.member_patch_toggle_bot_filters(false)} aria-label={clearAllLabel} title={clearAllLabel}>
                                    {typeof member_patch_v2_toggle_icon === 'function' ? member_patch_v2_toggle_icon('clear') : '✕'}
                                    <span class="sr-only">{clearAllLabel}</span>
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-2">
                            {checkboxItem('check_member_bot_review', admin_t('members.bot.filter.review'))}
                            {checkboxItem('check_member_bot_suspected', admin_t('members.bot.filter.suspected'))}
                        </div>
                    </div>

                    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <div id="div_btn_search">
                            <Div_btn_search />
                        </div>
                        <button type="button" onClick={() => click_btn_reset_filters()} class={palette.secondaryBtn}>
                            {admin_t('members.search.reset')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    Div_member_search_filter = function (props) {
        if ((typeof member_patch_get_active_mode === 'function' ? member_patch_get_active_mode() : 'analytics') === 'bot-review') {
            return <Div_member_bot_review_filter_cleanup {...props} />;
        }
        return PREV_SEARCH_FILTER ? <PREV_SEARCH_FILTER {...props} /> : null;
    };

    function botCleanupRenderIdentity(member, themeMode, palette, options) {
        const optionMap = options || {};
        const addonActive = botCleanupIsAddonActive(member && member.role_addon_kssjoint);
        const roleNeverExpire = !!(window.member_patch_is_never_expire && window.member_patch_is_never_expire(member.role, member.role_expired_at));
        const roleExpiryText = roleNeverExpire
            ? admin_t('members.expiry.never')
            : (member.role_expired_at ? admin_t('admin.common.expired_on', { date: member.role_expired_at }) : '');
        const addonExpiryText = addonActive && member.role_addon_kssjoint_expired_at
            ? admin_t('admin.common.expired_on', { date: member.role_addon_kssjoint_expired_at })
            : '';
        const statusLabel = botCleanupStatusLabel(member);
        const statusBucket = botCleanupStatusBucket(member);
        const showStatusLabel = statusBucket === 'review' || statusBucket === 'discarded';
        const roleChipClass = typeof member_patch_v2_role_chip_class === 'function'
            ? member_patch_v2_role_chip_class(member.role, themeMode)
            : member_management_get_palette(themeMode).metaChip;

        return (
            <div class="flex min-w-0 flex-col gap-3">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p class={palette.name}>{member.name || member.email || member.uuid}</p>
                    <p class={themeMode === 'dark' ? 'text-sm text-slate-400 break-all' : 'text-sm text-slate-500 break-all'}>{member.email}</p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <p class={roleChipClass}>{admin_role_label(member.role)}</p>
                    {roleExpiryText ? <p class={palette.metaChip}>{roleExpiryText}</p> : null}
                    {addonActive ? <p class={botCleanupThemeBadgeClass(themeMode, 'addon')}>{admin_role_label('KSS Joint Member')}</p> : null}
                    {addonActive && addonExpiryText ? <p class={palette.metaChip}>{addonExpiryText}</p> : null}
                    {member.role_pending === 'Student Member' ? (
                        <button type="button" class={palette.pendingBadge} onClick={() => click_btn_pending_student(member.email)}>
                            {admin_t('admin.roles.pending_student_application')}
                        </button>
                    ) : null}
                    {member.officer && member.officer !== 'Member' ? <p class={palette.officerBadge}>{member.officer}</p> : null}
                    {showStatusLabel && statusLabel ? <p class={botCleanupStatusBadgeClass(member, themeMode)}>{statusLabel}</p> : null}
                    {botCleanupSafeInt(member.bot_excluded_from_stats) === 1 ? <p class={botCleanupThemeBadgeClass(themeMode, 'danger')}>{admin_t('members.bot.badge.excluded')}</p> : null}
                    {botCleanupSafeInt(member.bot_login_requires_verification) === 1 ? <p class={botCleanupThemeBadgeClass(themeMode, 'primary')}>{admin_t('members.bot.badge.verify_required')}</p> : null}
                    {optionMap.showJoinedAt ? <p class={palette.metaChip}>{admin_t('members.card.joined_at', { date: member.created_at })}</p> : null}
                </div>
            </div>
        );
    }

    function botCleanupRenderMeta(member, palette) {
        return (
            <div class="flex flex-wrap gap-2">
                <p class={palette.metaChip}>{admin_t('members.card.joined_at', { date: member.created_at })}</p>
                {member.affiliation ? <p class={palette.metaChip}>{admin_t('members.card.affiliation', { value: member.affiliation })}</p> : null}
                {member.title ? <p class={palette.metaChip}>{admin_t('members.card.title_label', { value: member.title })}</p> : null}
                {member.education ? <p class={palette.metaChip}>{admin_t('members.card.education', { value: member.education })}</p> : null}
                {member.interest ? <p class={palette.metaChip}>{admin_t('members.card.interest', { value: member.interest })}</p> : null}
            </div>
        );
    }

    function botCleanupRenderRoleEditor(member, themeMode, palette) {
        const showRoleEditor = typeof member_patch_v2_is_role_editor_open === 'function'
            ? member_patch_v2_is_role_editor_open(member.uuid)
            : false;
        return (
            <div id={'div_member_role_editor_' + member.uuid} class={(showRoleEditor ? '' : 'hidden ') + 'grid grid-cols-1 gap-4 xl:grid-cols-5'}>
                <div class="xl:col-span-3">
                    <div class={palette.sectionCard}>
                        <div class="mb-4 flex items-center justify-between gap-3">
                            <p class={palette.sectionLabel}>{admin_t('admin.common.membership')}</p>
                        </div>
                        <div id={'div_member_list_btn_membership_' + member.uuid} class="w-full">
                            <Div_member_list_membership
                                uuid_user={member.uuid}
                                current_role={member.role}
                                role_expired_at={member.role_expired_at}
                                themeMode={themeMode} />
                        </div>
                    </div>
                </div>
                <div class="xl:col-span-2">
                    <div class={palette.sectionCard}>
                        <div class="mb-4 flex items-center justify-between gap-3">
                            <p class={palette.sectionLabel}>{admin_t('admin.common.membership_addon')}</p>
                        </div>
                        <div id={'div_member_list_btn_membership_addon_' + member.uuid} class="w-full">
                            <Div_member_list_membership_addon
                                uuid_user={member.uuid}
                                role_addon_kssjoint={member.role_addon_kssjoint}
                                role_addon_kssjoint_expired_at={member.role_addon_kssjoint_expired_at}
                                themeMode={themeMode} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function botCleanupRenderEditor(member, themeMode, palette, mode) {
        const key = botCleanupSafeText(member.uuid).trim();
        const open = botCleanupOpenState(key);
        const committedStatus = botCleanupNormalizeStatus(member.bot_review_status);
        const currentStateText = botCleanupStatusLabel(member) || admin_t('members.bot.current_status.none');
        const isManagementMode = mode === 'management';
        const pendingAction = botCleanupPendingAction(key);
        const committedAction = botCleanupCurrentAction(committedStatus);
        const selectedAction = pendingAction || committedAction;
        const draftReason = botCleanupDraftReason(key, member.bot_decision_reason, mode);
        const reasonVersion = botCleanupReasonVersion(key);
        const loading = botCleanupLoading(key);
        const showReasonInput = isManagementMode
            ? pendingAction === 'mark_review' || pendingAction === 'mark_suspected'
            : true;
        const showApply = !isManagementMode || !!pendingAction;
        const reasonPlaceholder = isManagementMode
            ? admin_t('members.bot.reason_placeholder.management')
            : admin_t('members.bot.reason_placeholder.review');

        if (!open) return null;

        const renderActionButton = (action, label) => {
            const isAllowed = botCleanupIsActionAllowed(mode, committedStatus, action);
            const isSelected = selectedAction === action;
            const disabled = loading || !isAllowed || (!pendingAction && committedAction === action);
            return (
                <button
                    type="button"
                    disabled={disabled}
                    class={botCleanupSelectionButtonClass(themeMode, action, { selected: isSelected, disabled: disabled })}
                    onClick={() => window.member_patch_select_bot_review_action(key, action, committedStatus, mode)}>
                    {label}
                </button>
            );
        };

        return (
            <div id={'div_member_bot_editor_' + key} class="space-y-4">
                <div class={palette.sectionCard}>
                    <div class="flex flex-col gap-4">
                        {!isManagementMode ? (
                            <div class="space-y-2">
                                <div class="flex flex-wrap items-center gap-2">
                                    <p class={palette.sectionLabel}>{admin_t('members.bot.form.current_state')}</p>
                                    <p class={botCleanupStatusBadgeClass(member, themeMode)}>{currentStateText}</p>
                                </div>
                            </div>
                        ) : null}

                        <div class="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                            {renderActionButton('mark_review', admin_t('members.bot.action.mark_review'))}
                            {renderActionButton('clear', admin_t('members.bot.action.clear'))}
                            {renderActionButton('mark_suspected', admin_t('members.bot.action.mark_suspected'))}
                        </div>

                        {showReasonInput ? (
                            <div class="space-y-2">
                                <p class={palette.sectionLabel}>{admin_t('members.bot.form.reason_label')}</p>
                                <textarea
                                    key={'bot_reason_' + key + '_' + mode + '_' + reasonVersion}
                                    id={botCleanupReasonInputId(key)}
                                    rows="4"
                                    defaultValue={draftReason}
                                    placeholder={reasonPlaceholder}
                                    onInput={(event) => botCleanupSetDraftReason(key, event && event.target ? event.target.value : '')}
                                    class={palette.input + ' min-h-[112px] resize-y'}></textarea>
                            </div>
                        ) : null}

                        {showApply ? (
                            <div class="flex justify-end">
                                <button
                                    type="button"
                                    disabled={loading}
                                    class={botCleanupApplyButtonClass(themeMode, loading)}
                                    onClick={() => window.member_patch_apply_bot_review_action(key, member.email, pendingAction, committedStatus, mode)}>
                                    {loading ? botCleanupApplySpinner() : null}
                                    {admin_t('members.bot.form.apply')}
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }


    function botCleanupRenderCard(member, themeMode, mode) {
        const palette = member_management_get_palette(themeMode);
        const showRoleEditor = typeof member_patch_v2_is_role_editor_open === 'function'
            ? member_patch_v2_is_role_editor_open(member.uuid)
            : false;
        const showBotEditor = botCleanupOpenState(member.uuid);
        const isManagementMode = mode === 'management';
        const ghostButtonClass = botCleanupGhostButtonClass(themeMode);
        const botToggleClass = isManagementMode ? ghostButtonClass : botCleanupBotToggleButtonClass(themeMode, showBotEditor);
        const roleToggleButton = (
            <button
                key={'role_' + member.uuid}
                id={'btn_member_toggle_role_editor_' + member.uuid}
                type="button"
                aria-expanded={showRoleEditor ? 'true' : 'false'}
                onClick={() => member_patch_toggle_role_editor(member.uuid)}
                class={ghostButtonClass}>
                {admin_t(showRoleEditor ? 'members.card.hide_role' : 'members.card.change_role')}
            </button>
        );
        const passwordToggleButton = (
            <button key={'password_' + member.uuid} type="button" onClick={() => click_btn_like_change_password(member.email)} class={ghostButtonClass}>
                {admin_t('members.card.change_password')}
            </button>
        );
        const botToggleButton = (
            <button
                key={'bot_' + member.uuid}
                id={'btn_member_toggle_bot_editor_' + member.uuid}
                type="button"
                aria-expanded={showBotEditor ? 'true' : 'false'}
                onClick={() => window.member_patch_toggle_bot_review_editor(member.uuid, member.bot_decision_reason, mode)}
                class={botToggleClass}>
                {admin_t(showBotEditor ? 'members.bot.toggle.close' : 'members.bot.toggle.open')}
            </button>
        );
        const actionButtons = isManagementMode
            ? [roleToggleButton, passwordToggleButton, botToggleButton]
            : [botToggleButton, roleToggleButton, passwordToggleButton];
        return (
            <div class={palette.memberCard}>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        {botCleanupRenderIdentity(member, themeMode, palette, { showJoinedAt: false })}

                        <div class="flex flex-col items-start gap-2 xl:items-end">
                            <div class="flex flex-wrap items-center gap-2 xl:justify-end">
                                {actionButtons}
                            </div>
                            <div id={'div_member_list_btn_change_password_' + member.email} class={palette.link}></div>
                        </div>
                    </div>

                    {botCleanupRenderRoleEditor(member, themeMode, palette)}
                    {botCleanupRenderEditor(member, themeMode, palette, mode)}
                    {botCleanupRenderMeta(member, palette)}
                </div>
            </div>
        );
    }

    function Div_member_management_list_cleanup(props) {
        const themeMode = member_patch_get_theme_mode();
        const palette = member_management_get_palette(themeMode);
        const rows = Array.isArray(props.data) ? props.data : Object.values(props.data || {});

        if (!rows.length) {
            return (
                <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class={palette.emptyWrap}>
                        <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                    </div>
                    <div id={'div_member_list_' + (page_num + 1).toString()}></div>
                </div>
            );
        }

        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                {rows.map((member, idx) => <div key={member.uuid || member.email || idx}>{botCleanupRenderCard(member, themeMode, 'management')}</div>)}
                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        );
    }

    function Div_member_bot_review_list_cleanup(props) {
        const themeMode = member_patch_get_theme_mode();
        const palette = member_management_get_palette(themeMode);
        const sourceRows = Array.isArray(props.data) ? props.data : Object.values(props.data || {});
        const rows = sourceRows.filter((member) => {
            const normalized = botCleanupNormalizeStatus(member && member.bot_review_status);
            return normalized === 'review' || normalized === 'suspected';
        });

        if (!rows.length) {
            return (
                <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                    <div class={palette.emptyWrap}>
                        <p class={'text-base font-semibold ' + palette.body}>{admin_t('members.empty_list')}</p>
                    </div>
                    <div id={'div_member_list_' + (page_num + 1).toString()}></div>
                </div>
            );
        }

        return (
            <div class="flex flex-col w-full space-y-4" dir={member_patch_is_rtl() ? 'rtl' : 'ltr'}>
                {rows.map((member, idx) => <div key={member.uuid || member.email || idx}>{botCleanupRenderCard(member, themeMode, 'bot-review')}</div>)}
                <div id={'div_member_list_' + (page_num + 1).toString()}></div>
            </div>
        );
    }

    Div_member_list = function (props) {
        const mode = typeof member_patch_get_active_mode === 'function' ? member_patch_get_active_mode() : 'analytics';
        if (mode === 'management') return <Div_member_management_list_cleanup {...props} />;
        if (mode === 'bot-review') return <Div_member_bot_review_list_cleanup {...props} />;
        return PREV_DIV_MEMBER_LIST ? <PREV_DIV_MEMBER_LIST {...props} /> : null;
    };

    Div_member_count = function (props) {
        return PREV_DIV_MEMBER_COUNT ? <PREV_DIV_MEMBER_COUNT {...props} /> : null;
    };
})();
