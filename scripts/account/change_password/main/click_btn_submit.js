async function click_btn_submit() {
	if (!toggle_click_btn_submit) {
		// 토글 ON
		toggle_click_btn_submit = true
		ReactDOM.render(<Div_btn_submit_spinner id={"btn_submit"} class={class_btn_disabled} function={null} text={"Send Email"} />, document.getElementById("btn_submit"))


		const data = await fetch("/account/ajax_send_auth_email/?email=" + document.getElementById("txt_email").value.trim())
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

		if (data.exist == "EXIST") {
			document.getElementById("desc_email_msg").className = class_desc_msg
			ReactDOM.render(<Div_desc_err_msg text="Please check the inbox of your email."/>, document.getElementById("desc_email_msg"))
			document.getElementById('txt_email').disabled = true;
			ReactDOM.render(<Div_btn_submit class={class_btn_disabled} function={null} text={"Send Email"} />, document.getElementById("btn_submit"))
		} else {
			document.getElementById("desc_email_msg").className = class_desc_msg
			ReactDOM.render(<Div_desc_err_msg text="The email you entered does not exist."/>, document.getElementById("desc_email_msg"))
			ReactDOM.render(<Div_btn_submit class={class_btn_enabled} function={() => click_btn_submit()} text={"Send Email"} />, document.getElementById("btn_submit"))
		}


		// 토글 OFF
		toggle_click_btn_submit = false
		
	}
}