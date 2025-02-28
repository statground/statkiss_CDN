function Div_add_newsletter() {
	return (
		<div class="flex flex-col w-full justify-end items-center space-x-4 px-2 py-4 border border-blue-300 shadow space-y-4 rounded-lg">
			<div class="flex-row justify-start items-start w-full px-4">
				<p class="font-bold">Add Newsletter</p>
			</div>

			<div class="flex flex-col w-full space-x-8 space-y-4">
				<div class="flex flex-row w-full space-x-8 px-2 md:flex-col md:space-x-0 md:space-y-2 md:flex-col">
					<div class="flex flex-row justify-center items-center space-x-4 px-2 w-1/3 md:w-full">
						<p>Publish Date</p>
						<input type="text" placeholder="YYYY-MM-DD" id="txt_publish_date"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
									   focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" />
					</div>

					<div class="flex flex-row justify-center items-center space-x-4 px-2 w-1/3 md:w-full">
						<p>Volume</p>
						<input type="number" id="txt_volume"
								class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg 
										focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
					</div>

					<div class="flex flex-row justify-center items-center space-x-4 px-2 w-1/3 md:w-full">
						<p>Issue</p>
						<input type="number" id="txt_issue"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
									focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
					</div>
				</div>
			</div>

			<div class="flex flex-row justify-between items-center w-full px-5 space-x-4">
				<div class="flex flex-row justify-start items-center space-x-4">
					<button class="flex flex-row justify-center items-center py-1.5 px-5 text-white 
								bg-blue-700 font-medium rounded-lg text-center text-sm w-fit md:w-auto
								hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
							onClick={() => document.getElementById('id_file_upload').click()} >
						<img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/file_upload.svg" class="w-4 h-4 mr-2" />
						File Upload
					</button>
					<p id="txt_filename"></p>
					
				</div>
				<div class="flex flex-row justify-end items-center" id="div_btn_submit">
					<button class="flex flex-row justify-center items-center py-1.5 px-5 text-white 
									bg-gray-700 font-medium rounded-lg text-center text-sm w-fit cursor-not-allowed
									md:w-auto
									hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}