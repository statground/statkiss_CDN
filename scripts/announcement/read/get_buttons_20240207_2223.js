async function get_buttons() {
	function Div_buttons(props){
		return (
			<div class="flex flex-row w-full justify-center items-center space-x-4">
				{
					props.admin
					?   <button type="button" onClick={() => location.href='/announcement/' + url + '/write/'} 
								class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center
									   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
							Write
						</button>
					:   ""
				}
				{
					props.admin
					?   <button type="button" onClick={() => location.href='/announcement/' + url + '/edit/' + uuid + '/'} 
								class="py-1.5 px-5 text-sm font-medium text-white bg-blue-500 rounded-lg border border-gray-200 
									   hover:bg-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
							Edit
						</button>
					:   ""
				}
				{
					props.admin
					?   <button type="button" onClick={() => click_delete()}
								class="py-1.5 px-5 text-sm font-medium text-white bg-red-500 rounded-lg border border-gray-200 
									   hover:bg-red-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
							Delete
						</button>
					:   ""
				}
				<button type="button" onClick={() => location.href='/announcement/' + url + '/'}
						class="py-1.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					List
				</button>
			</div>
		)
	}

	const data = await fetch("/ajax_get_menu_header/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	gv_role = data['name']
	

	// Menu
	if (gv_username != "" && (data.role == "Administrator" || data.role == "Developer" || data.officer != "Member")) {
		ReactDOM.render(<Div_buttons admin={true} />, document.getElementById("div_buttons")) 
	} else {
		ReactDOM.render(<Div_buttons admin={false} />, document.getElementById("div_buttons")) 
	}
}