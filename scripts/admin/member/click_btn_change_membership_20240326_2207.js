async function click_btn_change_membership(uuid_user, sel_membership, current_role) {
	// 개발자나 관리자는 변경 불가
	if (current_role != "Administrator" && current_role != "Developer") {
		if (confirm("Are you sure you want to change this member's membership?")) {
			if (!toggle_btn_change_membership) {
				// 토글 ON
				toggle_btn_change_membership = true
		
				const request_data = new FormData();
				request_data.append('uuid_user', uuid_user);      // 멤버 UUID
				request_data.append('sel_membership', sel_membership);      // 선택한 멤버십 이름
				request_data.append('current_role', current_role);      // 선택한 멤버십 이름
				
				const data = await fetch("/admin/ajax_change_membership/", {
									method: "post", 
									headers: { "X-CSRFToken": getCookie("csrftoken"), },
									body: request_data
									})
									.then(res=> { alert("Membership Changed");})
									.then(res=> { return res; });

				get_member_summary()   // summary
					
				// 토글 OFF
				toggle_btn_change_membership = false;
				ReactDOM.render(<Div_member_list_membership uuid_user={uuid_user} current_role={sel_membership} />, document.getElementById("div_member_list_btn_membership_" + uuid_user)) 
			}
		}
	}
}