async function click_btn_download_list() {
	txt_name = document.getElementById("txt_name").value.trim()
	txt_email = document.getElementById("txt_email").value.trim()

	check_member_admin = "NO"
	if (document.getElementById("check_member_admin").checked) {    check_member_admin = "YES"; }
	check_member_lifetime = "NO"
	if (document.getElementById("check_member_lifetime").checked) {    check_member_lifetime = "YES"; }
	check_member_regular = "NO"
	if (document.getElementById("check_member_regular").checked) {    check_member_regular = "YES"; }
	check_member_spouse = "NO"
	if (document.getElementById("check_member_spouse").checked) {    check_member_spouse = "YES"; }
	check_member_student = "NO"
	if (document.getElementById("check_member_student").checked) {    check_member_student = "YES"; }
	check_member_member = "NO"
	if (document.getElementById("check_member_member").checked) {    check_member_member = "YES"; }
	
	
	let url = "/admin/ajax_download_member_list/?txt_temp=blank"
	if (txt_name != null && txt_name != "") {url += "&txt_name=" + txt_name }
	if (txt_email != null && txt_email != "") {url += "&txt_email=" + txt_email }
	url += "&check_member_admin=" + check_member_admin
	url += "&check_member_lifetime=" + check_member_lifetime
	url += "&check_member_regular=" + check_member_regular
	url += "&check_member_spouse=" + check_member_spouse
	url += "&check_member_student=" + check_member_student
	url += "&check_member_member=" + check_member_member

	window.open(url)
}