async function click_btn_submit() {
	if (!toggle_signup_btn_submit) {
		// 토글 ON
		toggle_signup_btn_submit = true

		// Spinner
		ReactDOM.render(<Div_btn_submit_spinner class={class_btn_enabled + " cursor-not-allowed"} function={null} text={"Confirm"} />, document.getElementById("btn_submit"))

		// 텍스트박스에 입력한 값
		const inputData = new FormData();
		inputData.append('uuid_user', uuid_user);
		inputData.append('txt_name', document.getElementById("txt_name").value.trim());
		inputData.append('sel_gender', document.getElementById("sel_gender").value.trim());
		inputData.append('txt_affiliation', document.getElementById("txt_affiliation").value.trim());
		inputData.append('txt_title', document.getElementById("txt_title").value.trim());
		inputData.append('sel_education', document.getElementById("sel_education").value.trim());
		inputData.append('txt_interest', document.getElementById("txt_interest").value.trim());
		inputData.append('uuid_role', uuid_role);

		const data = await fetch("/account/ajax_update_userinfo/", {
							method: "post", 
							headers: {
								"X-CSRFToken": getCookie("csrftoken"),
							},
							body: inputData
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });
		
		location.href="/"
		
		// 토글 ON
		toggle_signup_btn_submit = false
	}
	
}