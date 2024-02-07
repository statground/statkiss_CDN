async function get_div_add_awardee() {
	const data = await fetch("/ajax_get_menu_header/")
	.then(res=> { return res.json(); })
	.then(res=> { return res; });

	gv_role = data['name']

	// Menu
	if (gv_username != "" && (data.role == "Administrator" || data.role == "Developer" || data.officer != "Member")) {
		ReactDOM.render(<Div_add_awardees />, document.getElementById("div_add_awardees"))
		for (var i = 0 ; i < Object.keys(data_awardee).length ; i++) {
			document.getElementById("btn_delete_" + data_awardee[Object.keys(data_awardee)[i]].uuid).className = "flex flex-row justify-end items-end"
		}
	}
}