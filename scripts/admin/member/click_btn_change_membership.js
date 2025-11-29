async function click_btn_change_membership(uuid) {
	if (!toggle_btn_change_membership) {
		// 토글 ON
		toggle_btn_change_membership = true
		ReactDOM.render(<Div_btn_change_membership_loading  />, document.getElementById("div_btn_change_" + uuid))


		const request_data = new FormData();
		request_data.append('uuid_member', uuid);      // 페이지
		request_data.append('sel_membership', document.getElementById("sel_membership_" + uuid).value);      // 페이지
		
		const data = await fetch("/admin/ajax_change_membership/", {
							method: "post", 
							headers: { "X-CSRFToken": getCookie("csrftoken"), },
							body: request_data
							})
							.then(res=> { return res.json(); })
							.then(res=> { return res; });
		

		alert("Membership Changed");
		get_member_summary()   // summary

		// 토글 OFF
		toggle_btn_change_membership = false;
		ReactDOM.render(<Div_btn_change_membership  />, document.getElementById("div_btn_change_" + uuid))
	}

}