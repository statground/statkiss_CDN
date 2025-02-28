async function click_btn_download_list() {
	let url = "/admin/ajax_download_member_list/?txt_temp=blank"
	if (txt_name != null && txt_name != "") {url += "&txt_name=" + txt_name }
	if (txt_email != null && txt_email != "") {url += "&txt_email=" + txt_email }
	url += "&check_member_admin=" + check_member_admin
	url += "&check_member_lifetime=" + check_member_lifetime
	url += "&check_member_regular=" + check_member_regular
	url += "&check_member_student=" + check_member_student
	url += "&check_member_member=" + check_member_member

	window.open(url)
}