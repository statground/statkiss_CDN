async function click_btn_change_membership_addon(uuid_user, sel_membership, current_role) {
	// 개발자나 관리자는 변경 불가
	if (confirm("Are you sure you want to change this member's membership addon?")) {
		if (!toggle_btn_change_membership) {
			// 토글 ON
			toggle_btn_change_membership = true
	
			const request_data = new FormData();
			request_data.append('uuid_user', uuid_user);      // 멤버 UUID
			request_data.append('sel_membership', sel_membership);      // 선택한 멤버십 이름
			request_data.append('current_role', current_role);      // 선택한 멤버십 이름
			
			const data = await fetch("/admin/ajax_change_membership_addon/", {
								method: "post", 
								headers: { "X-CSRFToken": getCookie("csrftoken"), },
								body: request_data
								})
								.then(res=> { alert("Membership Changed");})
								.then(res=> { return res; });

			get_member_summary()   // summary
			
			if (current_role == '0') { current_role = '1'} else { current_role = '0' }
			// 토글 OFF/
			toggle_btn_change_membership = false;
			ReactDOM.render(<Div_member_list_membership_addon uuid_user={uuid_user} role_addon_kssjoint={current_role} />, document.getElementById("div_member_list_btn_membership_addon_" + uuid_user)) 
		}
	}
}