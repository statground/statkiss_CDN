function input_checker() {
	// 메시지 초기화
	document.getElementById("desc_email_msg").className = "hidden"

	ReactDOM.render(<Div_btn_submit id={"btn_submit"} class={class_btn_disabled} function={null} text={"Login"} />, document.getElementById("btn_submit"))

	// 이메일을 입력하지 않음
	if (email_form_check("txt_email") == "NOT EXIST") {
		document.getElementById("desc_email_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Please enter your email."/>, document.getElementById("desc_email_msg"))

	// 이메일 형식이 올바르지 않음
	} else if(email_form_check("txt_email") == "FAILED") {
		document.getElementById("desc_email_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Email format is invalid."/>, document.getElementById("desc_email_msg"))

	} else {
		ReactDOM.render(<Div_btn_submit class={class_btn_enabled} function={() => click_btn_submit()} text={"Send Email"} />, document.getElementById("btn_submit"))
		
	}
}