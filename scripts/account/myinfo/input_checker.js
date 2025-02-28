function input_checker() {
	let class_desc_msg = "flex flex-row justify-start items-center w-full"
	
	// 메시지 초기화
	document.getElementById("desc_name_msg").className = "hidden"
	document.getElementById("desc_affiliation_msg").className = "hidden"
	document.getElementById("desc_title_msg").className = "hidden"
	document.getElementById("desc_interest_msg").className = "hidden"
	ReactDOM.render(<Div_btn_submit id={"btn_submit"} class={class_btn_disabled} function={null} text={"Confirm"} />, document.getElementById("btn_submit"))

	// 이름이 입력되지 않음
	if(document.getElementById("txt_name").value.trim().length <= 0) {
		document.getElementById("desc_name_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Please enter your name."/>, document.getElementById("desc_name_msg"))

	// 소속이 입력되지 않음
	} else if(document.getElementById("txt_affiliation").value.trim().length <= 0) {
		document.getElementById("desc_affiliation_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Please enter your affiliation."/>, document.getElementById("desc_affiliation_msg"))

	// 직위가 입력되지 않음
	} else if(document.getElementById("txt_title").value.trim().length <= 0) {
		document.getElementById("desc_title_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Please enter your title."/>, document.getElementById("desc_title_msg"))

	// 관심 분야가 입력되지 않음
	} else if(document.getElementById("txt_interest").value.trim().length <= 0) {
		document.getElementById("desc_interest_msg").className = class_desc_msg
		ReactDOM.render(<Div_desc_err_msg text="Please enter your field of interest."/>, document.getElementById("desc_interest_msg"))

	} else {
		ReactDOM.render(<Div_btn_submit class={class_btn_enabled} function={() => click_btn_submit()} text={"Confirm"} />, document.getElementById("btn_submit"))
		
	}
}