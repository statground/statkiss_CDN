async function get_menu_header() {
	function Div_sub_menu_header() {
		return (
			<div onclick="menu_dropdown_initialization();" id="div_menu_sub_header"
			class="flex bg-blue-200 justify-center items-center w-full h-[35px]">
			{   gv_username == ""
				?   <div class="flex justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
						<a href="/account/" class="hover:underline">
							Login
						</a>
						<span>
							|
						</span>
						<a href="/account/signup/" class="hover:underline">
							Sign Up
						</a>
					</div>
				:   ""
			}
			{   gv_username != "" && gv_role == "Administrator"
				?   <div class="flex justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
						<a href="/admin/" class="hover:underline">
							Admin Page
						</a>
						<span>
							|
						</span>
						<a href="/account/myinfo/" class="hover:underline">
							My Info.
						</a>
						<span>
							|
						</span>
						<a href="/account/logout/" class="hover:underline">
							Logout
						</a>
					</div>
				:   ""
			}
			{   gv_username != "" && gv_role != "Administrator"
				?   <div class="flex justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
						<a href="/account/myinfo/" class="hover:underline">
							My Info.
						</a>
						<span>
							|
						</span>
						<a href="/account/logout/" class="hover:underline">
							Logout
						</a>
					</div>
				:   ""
			}
		</div>

		)
	}

	const data = await fetch("/ajax_get_menu_header/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	gv_role = data['name']
	console.log("*** role: " + gv_role);

	// Menu
	ReactDOM.render(<Div_sub_menu_header />, document.getElementById("div_menu_sub_header")) 
}