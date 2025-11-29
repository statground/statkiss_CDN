async function get_div_add_newsletter() {
	const data = await fetch("/ajax_get_menu_header/")
	.then(res=> { return res.json(); })
	.then(res=> { return res; });

	gv_role = data['name']

	// Menu
	if (gv_username != "" && (data.role == "Administrator" || data.role == "Developer" || data.officer != "Member")) {
		ReactDOM.render(<Div_add_newsletter />, document.getElementById("div_add_newsletter"))
		for (var i = 0 ; i < Object.keys(data_newsletter).length ; i++) {
			document.getElementById("btn_copy_clipboard_" + data_newsletter[Object.keys(data_newsletter)[i]].uuid).className = "flex flex-row justify-center items-end w-full"
			document.getElementById("btn_delete_" + data_newsletter[Object.keys(data_newsletter)[i]].uuid).className = "flex flex-row justify-end items-end w-full"
		}
	}
}