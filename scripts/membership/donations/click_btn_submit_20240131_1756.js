async function click_btn_submit() {
	if (!toggle_btn_submit) {
		// 토글 ON
		toggle_btn_submit = true
		ReactDOM.render(<Div_btn_submit_loading />, document.getElementById("div_btn_submit")) 


		let txt_year = document.getElementById("txt_year").value.trim()
		let txt_amount = document.getElementById("txt_amount").value.trim()
		let txt_name = document.getElementById("txt_name").value.trim()
		let txt_affiliation = document.getElementById("txt_affiliation").value.trim()
		let txt_comment = document.getElementById("txt_comment").value.trim()

		if (txt_year == null || txt_year == "") {
			alert("Please enter the year.")

		} else if (txt_amount == null || txt_amount == "") {
			alert("Please enter the amount.")

		} else if (txt_name == null || txt_name == "") {
			alert("Please enter a donator's name.")
			

		} else {
			const inputData = new FormData();
			inputData.append('txt_year', txt_year);
			inputData.append('txt_amount', txt_amount);
			inputData.append('txt_name', txt_name);
			inputData.append('txt_affiliation', txt_affiliation);
			inputData.append('txt_comment', txt_comment);
			inputData.append('sel_category', document.getElementById("sel_category").value.trim());
	
			const data = await fetch("/membership/ajax_add_donator/", {
								method: "post", 
								headers: {"X-CSRFToken": getCookie("csrftoken"),},
								body: inputData
							})
							.then(res=> { return res.json(); })
							.then(res=> { return res; });
	
			location.href='/membership/donations/'
		}


		// 토글 OFF
		ReactDOM.render(<Div_btn_submit />, document.getElementById("div_btn_submit")) 
		toggle_btn_submit = false
	}
}