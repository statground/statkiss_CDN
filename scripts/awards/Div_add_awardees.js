function Div_add_awardees() {
	return (
		<div>
			<div class="flex flex-col w-full justify-end items-center space-x-4 mb-4 px-8 py-4 border border-blue-300 shadow space-y-4 rounded-lg md:px-2">
				<div class="flex-row justify-start items-start w-full">
					<p class="font-bold">Add Awardee</p>
				</div>
	
				<div class="flex flex-col w-full space-y-4">
					<div class="grid grid-cols-2 w-full gap-8 md:grid-cols-1 md:gap-4">
						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Donate Year</p>
							<input type="number" id="txt_year" placeholder="YYYY"
									class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg 
											focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4 w-full md:grid-cols-1">
						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Name</p>
							<input type="text" placeholder="Awardee Name" id="txt_name"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
						</div>

						<div class="flex flex-row justify-center items-center space-x-4 w-full">
							<p>Affiliation</p>
							<input type="text" placeholder="Affiliation" id="txt_affiliation"
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