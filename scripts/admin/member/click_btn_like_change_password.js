async function click_btn_like_change_password(email) {
	const request_data = new FormData();
	request_data.append('email', email);      // 이메일

	const data = await fetch("/admin/ajax_get_change_password_link/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });
	//alert("URL for changing the password has been generated of " + email + ".\nPlease send the following URL:\n" + data['url'])
	document.getElementById("div_member_list_btn_change_password_" + email).innerHTML = data['url']
}