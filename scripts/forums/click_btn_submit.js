async function click_btn_submit() {
	if (!toggle_btn_submit) {
		// 토글 ON
		toggle_btn_submit = true
		ReactDOM.render(<Div_btn_submit_loading />, document.getElementById("div_btn_submit")) 


		let txt_name = document.getElementById("txt_name").value.trim()
		let txt_url = document.getElementById("txt_url").value.trim()

		if (txt_name == null || txt_name == "") {
			alert("Please enter a name.")

		} else if (txt_url == null || txt_url == "") {
			alert("Please enter a URL.")

		} else {
			const inputData = new FormData();
			inputData.append('sel_category', document.getElementById("sel_category").value.trim());
			inputData.append('txt_name', txt_name);
			inputData.append('txt_url', txt_url);
	
			const data = await fetch("/forums/ajax_add_links/", {
								method: "post", 
								headers: {"X-CSRFToken": getCookie("csrftoken"),},
								body: inputData
							})
							.then(res=> { return res.json(); })
							.then(res=> { return res; });
	
			location.href='/forums/links/'
		}


		// 토글 OFF
		ReactDOM.render(<Div_btn_submit />, document.getElementById("div_btn_submit")) 
		toggle_btn_submit = false
	}

}