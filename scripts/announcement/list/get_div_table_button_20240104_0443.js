async function get_div_table_button() {
	function Div_table_buttons() {
		return (
			<div class="flex flex-row w-full justify-end items-center space-x-4 px-2 py-4">
				<button type="button" 
						onClick={() => location.href='/announcement/' + url + '/write/'}
						class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center
							   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
					Write
				</button>
			</div>
		)
	}

	const data = await fetch("/ajax_get_menu_header/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	gv_role = data['name']
	

	// Menu
	if (gv_username != "" && (gv_role == "Administrator" || gv_role == "Officer")) {
		ReactDOM.render(<Div_table_buttons />, document.getElementById("div_table_buttons")) 
	}
}