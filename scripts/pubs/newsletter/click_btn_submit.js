async function click_btn_submit() {
	if (!toggle_btn_submit) {
		// 토글 ON
		toggle_btn_submit = true
		ReactDOM.render(<Div_btn_submit_loading />, document.getElementById("div_btn_submit")) 

		let txt_publish_date = document.getElementById("txt_publish_date").value.trim()
		let txt_volume = document.getElementById("txt_volume").value.trim()
		let txt_issue = document.getElementById("txt_issue").value.trim()

		const inputData = new FormData();
		inputData.append('txt_publish_date', txt_publish_date);
		inputData.append('txt_volume', txt_volume);
		inputData.append('txt_issue', txt_issue);
		inputData.append('uuid_file', data_file.uuid);

		const data = await fetch("/pubs/ajax_add_newsletter/", {
							method: "post", 
							headers: {"X-CSRFToken": getCookie("csrftoken"),},
							body: inputData
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

		location.href='/pubs/newsletter/'


		// 토글 OFF
		ReactDOM.render(<Div_btn_submit />, document.getElementById("div_btn_submit")) 
		toggle_btn_submit = false
	}
}