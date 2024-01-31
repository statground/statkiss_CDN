async function get_add_link() {
	function Div_button() {
		return (
			<div class="flex flex-col w-full justify-end items-center space-x-4 px-2 py-4 mb-8 border border-blue-300 shadow space-y-4 rounded-lg">
				<div class="flex-row justify-start items-start w-full px-4">
					<p class="font-bold">Add Link</p>
				</div>

				<div class="flex flex-col w-full space-y-2">

					<div class="flex flex-row w-full space-x-8 px-2 md:flex-col md:space-x-0 md:space-y-2">
						<div class="flex flex-row justify-center items-center space-x-4 w-1/2 md:w-full">
							<p>Category</p>
							<select id="sel_category" 
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg
										   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="ab713c0f-bbb7-46c0-bda4-ae314d634fc9" selected>Academic Society</option>
								<option value="aba960b9-023a-4a2c-b9c4-ccd1df7ff82f">Government Institutions</option>
								<option value="d44c8e2c-d168-4bec-9fc5-e94142863d9a">NGO</option>
								<option value="b71e2fdc-1b83-492b-b288-7278833df576">Financial Institutions</option>
								<option value="9708c0ae-2996-49dc-9f1b-7c7f023bc9f2">Educational Institutions</option>
								<option value="ad584c2a-f99c-4ce5-a993-1292c09df3bd">Healthcare Institutions</option>
								<option value="c0360f95-ccf1-48bc-82bb-39faabbe671f">Research Institutions</option>
								<option value="9c03ed19-3722-4a43-b90f-b03471a85e00">Cultural and Arts Institutions</option>
								<option value="a35f3605-663c-421f-b1eb-c0ce8c473ea7">Private Company</option>
								<option value="acaa79ed-a659-44fe-a564-4774c2255267">Business Corporation</option>
							</select>
						</div>

						<div class="flex flex-row justify-center items-center space-x-4 w-1/2 md:w-full">
							<p>Name</p>
							<input type="text" id="txt_name" 
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg 
										   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" required />
						</div>
					</div>

					<div class="flex flex-row w-full space-x-8 px-2">
						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>URL</p>
							<input type="text" id="txt_url" 
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://www.statkiss.org" required />
						</div>
					</div>
					

					<div class="flex flex-row justify-center items-center w-full" id="div_btn_submit">
						<Div_btn_submit />
					</div>
				</div>

			</div>
		)
	}

	const data = await fetch("/ajax_get_menu_header/")
	.then(res=> { return res.json(); })
	.then(res=> { return res; });

	gv_role = data['name']


	// Menu
	if (gv_username != "" && (gv_role == "Administrator" || gv_role == "Officer")) {
		ReactDOM.render(<Div_button />, document.getElementById("div_buttons")) 

		for (var i = 0 ; i < Object.keys(data_link).length ; i++) {
			document.getElementById("btn_delete_" + data_link[Object.keys(data_link)[i]].uuid).className = "flex flex-row justify-end items-end w-full cursor-pointer"
		}
	}
}