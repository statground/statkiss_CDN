async function get_div_add_donator() {
	const data = await fetch("/ajax_get_menu_header/")
	.then(res=> { return res.json(); })
	.then(res=> { return res; });

	gv_role = data['name']

	// Menu
	if (gv_username != "" && (data.role == "Administrator" || data.role == "Developer" || data.officer != "Member")) {
		ReactDOM.render(<Div_add_generous_donations />, document.getElementById("div_add_generous_donations"))
		for (var i = 0 ; i < Object.keys(data_donator).length ; i++) {
			document.getElementById("btn_delete_" + data_donator[Object.keys(data_donator)[i]].uuid).className = "flex flex-row justify-end items-end w-full"
		}
	}
}