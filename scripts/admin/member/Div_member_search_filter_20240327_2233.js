function Div_member_search_filter() {
	return (
		<div>
			<div class="flex flex-col w-full justify-end items-center space-x-4 px-8 py-4 bg-blue-100 border border-blue-300 shadow space-y-4 rounded-lg md:px-2">
				<div class="flex-row justify-start items-start w-full">
					<p class="font-bold">Search</p>
				</div>
	
				<div class="grid grid-cols-2 w-full gap-8 md:grid-cols-1 md:gap-4 md:grid-cols-1">

					<div class="flex flex-row justify-center items-center px-4 w-full">
						<p class="w-1/4">Name</p>
						<input type="text" id="txt_name"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
									   focus:ring-blue-500 focus:border-blue-500 block w-3/4" />
					</div>
					<div class="flex flex-row justify-center items-center px-4 w-full">
						<p class="w-1/4">E-mail</p>
						<input type="text" id="txt_email"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
									   focus:ring-blue-500 focus:border-blue-500 block w-3/4" />
					</div>
				</div>

				<ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
					<div class="flex items-center ps-3">
						<input id="check_member_admin" type="checkbox" value=""
							   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
						<label for="check_member_admin" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Admin, Developer</label>
					</div>
					<div class="flex items-center ps-3">
						<input id="check_member_lifetime" type="checkbox" value=""
							   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
						<label for="check_member_lifetime" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Lifetime Member</label>
					</div>
					<div class="flex items-center ps-3">
						<input id="check_member_regular" type="checkbox" value="" 
							   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
						<label for="check_member_regular" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Regular Member</label>
					</div>
					<div class="flex items-center ps-3">
						<input id="check_member_spause" type="checkbox" value="" 
							   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
						<label for="check_member_spause" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Spause Member</label>
					</div>
					<div class="flex items-center ps-3">
						<input id="check_member_student" type="checkbox" value=""
							   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
						<label for="check_member_student" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Student Member</label>
					</div>
					<div class="flex items-center ps-3">
						<input id="check_member_member" type="checkbox" value=""
							   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
						<label for="check_member_member" class="w-full py-3 ms-2 text-sm font-medium text-gray-900">Member</label>
					</div>
				</ul>

				<div class="flex flex-row justify-end items-center w-full">
					<div class="flex flex-row justify-end items-center" id="div_btn_search">
						<Div_btn_search />
					</div>
				</div>
			</div>
			
		</div>
	)
}