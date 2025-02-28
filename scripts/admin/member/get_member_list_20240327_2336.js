async function get_member_list(mode) {
	// 토글 ON
	toggle_page = true


	if (mode == "init") { 
		page_num = 1 
		ReactDOM.render(<Div_member_list_skeleton />, document.getElementById("div_member_list"))
		ReactDOM.render(<Div_member_count_skeleton />, document.getElementById("div_member_count"))

		document.getElementById("check_member_admin").checked = true
		document.getElementById("check_member_lifetime").checked = true
		document.getElementById("check_member_regular").checked = true
		document.getElementById("check_member_spouse").checked = true
		document.getElementById("check_member_student").checked = true
		document.getElementById("check_member_member").checked = true
	} else if (mode == "search") { 
		page_num = 1 
		ReactDOM.render(<Div_member_list_skeleton />, document.getElementById("div_member_list"))
		ReactDOM.render(<Div_member_count_skeleton />, document.getElementById("div_member_count"))
	} else {
		page_num += 1
		ReactDOM.render(<Div_member_list_skeleton />, document.getElementById("div_member_list_" + page_num.toString()))
	}


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

	const request_data = new FormData();
	request_data.append('page', page_num);      // 페이지
	request_data.append('txt_name', txt_name);
	request_data.append('txt_email', txt_email);
	request_data.append('check_member_admin', check_member_admin);
	request_data.append('check_member_lifetime', check_member_lifetime);
	request_data.append('check_member_regular', check_member_regular);
	request_data.append('check_member_spouse', check_member_spouse);
	request_data.append('check_member_student', check_member_student);
	request_data.append('check_member_member', check_member_member);

	const data = await fetch("/admin/ajax_get_member_list/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	member_counter = data["count"].cnt

	if (mode == "init" || mode == "search") {
		ReactDOM.render(<Div_member_list data={data["list"]} />, document.getElementById("div_member_list"))
		ReactDOM.render(<Div_member_count count={member_counter} />, document.getElementById("div_member_count"))

	} else {
		ReactDOM.render(<Div_member_list data={data["list"]} />, document.getElementById("div_member_list_" + page_num.toString()))
	}

	// 토글 OFF
	toggle_page = false
}