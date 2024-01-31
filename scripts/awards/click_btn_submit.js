async function click_btn_submit() {
	if (!toggle_btn_submit) {
		// 토글 ON
		toggle_btn_submit = true
		ReactDOM.render(<Div_btn_submit_loading />, document.getElementById("div_btn_submit")) 


		let txt_year = document.getElementById("txt_year").value.trim()
		let txt_name = document.getElementById("txt_name").value.trim()
		let txt_affiliation = document.getElementById("txt_affiliation").value.trim()

		if (txt_year == null || txt_year == "") {
			alert("Please enter the year.")

		} else if (txt_name == null || txt_name == "") {
			alert("Please enter a awardee's name.")

		} else if (txt_affiliation == null || txt_affiliation == "") {
			alert("Please enter a awardee's affiliation.")

		} else {
			const inputData = new FormData();
			inputData.append('txt_year', txt_year);
			inputData.append('txt_name', txt_name);
			inputData.append('txt_affiliation', txt_affiliation);
			inputData.append('url', url);

	
			const data = await fetch("/awards/ajax_add_awardee/", {
								method: "post", 
								headers: {"X-CSRFToken": getCookie("csrftoken"),},
								body: inputData
							})
							.then(res=> { return res.json(); })
							.then(res=> { return res; });
	
			location.href='/awards/' + url + '/'
		}


		// 토글 OFF
		ReactDOM.render(<Div_btn_submit />, document.getElementById("div_btn_submit")) 
		toggle_btn_submit = false
	}
}