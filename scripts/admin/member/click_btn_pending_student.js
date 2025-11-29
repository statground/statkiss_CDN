async function click_btn_pending_student(email) {
	let val_yesno = "YES"

	if (confirm("Do you want to approve the Student membership application?")) {} else { val_yesno = "NO"; }

	const request_data = new FormData();
	request_data.append('email', email);
	request_data.append('val_yesno', val_yesno);

	const data = await fetch("/admin/ajax_change_pending_student/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	get_member_list("search")
}
