async function get_div_add_newsletter() {
	const data = await fetch("/ajax_get_menu_header/")
	.then(res=> { return res.json(); })
	.then(res=> { return res; });

	gv_role = data['name']

	// Menu
	if (gv_username != "" && (gv_role == "Administrator" || gv_role == "Officer")) {
		ReactDOM.render(<Div_add_newsletter />, document.getElementById("div_add_newsletter"))
	}
}