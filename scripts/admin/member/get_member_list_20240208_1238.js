async function get_member_list(mode) {
	// 토글 ON
	toggle_page = true


	if (mode == "init") { 
		page_num = 1 
		ReactDOM.render(<Div_member_list_skeleton />, document.getElementById("div_member_list"))
	} else {
		page_num += 1
		ReactDOM.render(<Div_member_list_skeleton />, document.getElementById("div_member_list_" + page_num.toString()))
	}

	const request_data = new FormData();
	request_data.append('page', page_num);      // 페이지

	const data = await fetch("/admin/ajax_get_member_list/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	if (mode == "init") {
		ReactDOM.render(<Div_member_list data={data["list"]} />, document.getElementById("div_member_list"))
		ReactDOM.render(<Div_member_count count={data["count"].cnt} />, document.getElementById("div_member_count"))

		document.getElementById("check_member_admin").checked = true
		document.getElementById("check_member_lifetime").checked = true
		document.getElementById("check_member_regular").checked = true
		document.getElementById("check_member_student").checked = true
		document.getElementById("check_member_member").checked = true

	} else {
		ReactDOM.render(<Div_member_list data={data["list"]} />, document.getElementById("div_member_list_" + page_num.toString()))
	}

	// 토글 OFF
	toggle_page = false
}