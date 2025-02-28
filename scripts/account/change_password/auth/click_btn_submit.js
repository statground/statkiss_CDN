async function click_btn_submit() {
	if (!toggle_click_btn_submit) {
		// 토글 ON
		toggle_click_btn_submit = true
		ReactDOM.render(<Div_btn_submit_spinner class={class_btn_enabled + " cursor-not-allowed"} function={null} text={"Confirm"} />, document.getElementById("btn_submit"))


		// 인증 코드
		const inputData = new FormData();
		inputData.append('email', data_user.email_receiver);
		inputData.append('password', document.getElementById("txt_password").value.trim());
	
		let data = await fetch("/account/ajax_password_change/", {
								method: "post", 
								headers: {"X-CSRFToken": getCookie("csrftoken"),},
								body: inputData
							})
							.then(res=> { return res.json(); })
							.then(res=> { return res; });
	
		if (data.checker == "SUCCESS") {
			alert("Your password has been changed.")
			location.href="/account/"
		} else {
			alert("Failed.")
		}


		// 토글 ON
		toggle_click_btn_submit = false
		ReactDOM.render(<Div_btn_submit class={class_btn_enabled} function={() => click_btn_submit()} text={"Password Change"} />, document.getElementById("btn_submit"))
	}
}