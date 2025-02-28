async function get_menu_header() {
	function Div_sub_menu_header(props) {
		function Div_sub(props) {
			return (
				<a href={props.url} class="flex flex-row justify-center items-center hover:underline">
					{
						props.url_image != null
						?   <img src={props.url_image} class="size-4 mr-2" />
						:   ""
					}
					{props.name}
				</a>
			)
		}

		return (
			<div onclick="menu_dropdown_initialization();" id="div_menu_sub_header"
			class="flex bg-blue-200 justify-center items-center w-full h-[35px]">
			{   gv_username == ""
				?   <div class="flex flex-row justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
						<Div_sub url={"/account/"} name={"Login"} />
						<span>|</span>
						<Div_sub url={"/account/signup/"} name={"Sign Up"} />
					</div>
				:   ""
			}
			{   gv_username != ""
				?   <div class="flex flex-row justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
						<Div_sub url={"/account/myinfo/"} name={props.data.name} url_image={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/header_user.svg"} />
						<span>|</span>

						<a href="/membership/" class="flex flex-row justify-center items-center font-extrabold hover:underline">
							{props.data.role}
						</a>
						<span>|</span>

						{
							props.data.officer != "Member"
							?   <span class="flex flex-row justify-center items-center font-extrabold">
									{props.data.officer}
								</span>
							:   ""
						}
						{
							props.data.officer != "Member"
							?   <span>|</span>
							:   ""
						}

						{
							props.data.role_addon_kssjoint == 1
							?   <span class="flex flex-row justify-center items-center font-extrabold">
									KSS Joint Member
								</span>
							:   ""
						}
						{
							props.data.role_addon_kssjoint == 1
							?   <span>|</span>
							:   ""
						}
						
						{
							props.data.role == "Administrator" || props.data.role == "Developer" || props.data.officer != "Member"
							?   <Div_sub url={"/admin/"} name={"Admin Page"} />
							:    ""
						}
						{
							props.data.role == "Administrator" || props.data.role == "Developer" || props.data.officer != "Member"
							?   <span>|</span>
							:    ""
						}
						
						<Div_sub url={"/account/logout/"} name={"Logout"} />
					</div>
				:   ""
			}
		</div>

		)
	}

	const data = await fetch("/ajax_get_menu_header/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	gv_role = data['role']
	console.log("*** role: " + gv_role);

	// Menu
	ReactDOM.render(<Div_sub_menu_header data={data} />, document.getElementById("div_menu_sub_header")) 
}