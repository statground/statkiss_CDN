function Div_add_generous_donations() {
	return (
		<div>
			<div class="flex flex-col w-full justify-end items-center space-x-4 px-8 py-4 border border-blue-300 shadow space-y-4 rounded-lg md:px-2">
				<div class="flex-row justify-start items-start w-full">
					<p class="font-bold">Add Generous Donator</p>
				</div>
	
				<div class="flex flex-col w-full space-y-4">
					<div class="grid grid-cols-3 w-full gap-8 md:grid-cols-1 md:gap-4">
						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Donate Year</p>
							<input type="number" id="txt_year" placeholder="YYYY"
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg 
											focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>

						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Amount</p>
							<input type="number" id="txt_amount" placeholder="0000"
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg
											focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>

						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Category</p>
							<select id="sel_category"
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg
										   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option value="9d918d2d-b85e-4e0c-813f-0383b2e7b24f" selected>Personal</option>
								<option value="ab713c0f-bbb7-46c0-bda4-ae314d634fc9">Academic Society</option>
								<option value="90cc2fe2-bbed-4531-85da-3f34a884f7dd">Government Institutions</option>
								<option value="d44c8e2c-d168-4bec-9fc5-e94142863d9a">NGO</option>
								<option value="b71e2fdc-1b83-492b-b288-7278833df576">Financial Institutions</option>
								<option value="9708c0ae-2996-49dc-9f1b-7c7f023bc9f2">Educational Institutions</option>
								<option value="ad584c2a-f99c-4ce5-a993-1292c09df3bd">Healthcare Institutions</option>
								<option value="c0360f95-ccf1-48bc-82bb-39faabbe671f">Research Institutions</option>
								<option value="9c03ed19-3722-4a43-b90f-b03471a85e00">Cultural and Arts Institutions</option>
								<option value="d12d881f-5320-4fd2-80ab-d664f6e309a8">Private Company</option>
								<option value="d12d881f-5320-4fd2-80ab-d664f6e309a8">Business Corporation</option>
							</select>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-4 w-full">
						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Name</p>
							<input type="text" placeholder="Donator Name" id="txt_name"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>

						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Affiliation</p>
							<input type="text" placeholder="Affiliation" id="txt_affiliation"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>

						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Comment</p>
							<input type="text" placeholder="If the donor wants to special phrase, please fill it in here." id="txt_comment"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>
					</div>
				</div>
	
				<div class="flex flex-row justify-end items-center w-full">
					<div class="flex flex-row justify-end items-center" id="div_btn_submit">
						<Div_btn_submit />
					</div>
				</div>
			</div>
		</div>
	)
}