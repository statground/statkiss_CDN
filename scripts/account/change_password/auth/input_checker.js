function input_checker() {
	let class_desc_msg = "flex flex-row justify-start items-center w-full"

	let txt_password = document.getElementById("txt_password").value
	let txt_password_confirm = document.getElementById("txt_password_confirm").value

	// 메시지 초기화
	document.getElementById("desc_password_msg").className = "hidden"
	ReactDOM.render(<Div_btn_submit id={"btn_submit"} class={class_btn_disabled} function={null} text={"Login"} />, document.getElementById("btn_submit"))

	// 유효성 체크
	if (txt_password.length < 8) {
		document.getElementById("desc_password_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Password must be at least 8 characters long."/>, document.getElementById("desc_password_msg"))

	} else if (txt_password_confirm.length < 8) {
		document.getElementById("desc_password_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Password Confirm must be at least 8 characters long."/>, document.getElementById("desc_password_msg"))

	} else if (txt_password != txt_password_confirm) {
		document.getElementById("desc_password_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Password and Password Confirm are different."/>, document.getElementById("desc_password_msg"))

	} else {
		ReactDOM.render(<Div_btn_submit class={class_btn_enabled} function={() => click_btn_submit()} text={"Password Change"} />, document.getElementById("btn_submit"))
		
	}
}