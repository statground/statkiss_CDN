function Div_member_search_filter() {
	const checkboxItem = (id, label) => (
		<div class="flex items-center ps-3">
			<input id={id} type="checkbox" value=""
				class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
			<label for={id} class="w-full py-3 ms-2 text-sm font-medium text-gray-900">{label}</label>
		</div>
	);

	const inputRow = (label, id) => (
		<div class="flex flex-row justify-center items-center px-4 w-full">
			<p class="w-1/4">{label}</p>
			<input type="text" id={id}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
						   focus:ring-blue-500 focus:border-blue-500 block w-3/4" />
		</div>
	);

	return (
		<div>
			<div class="flex flex-col w-full justify-end items-center space-x-4 px-8 py-4 bg-blue-100 border border-blue-300 shadow space-y-4 rounded-lg md:px-2">
				<div class="flex-row justify-start items-start w-full">
					<p class="font-bold">Search</p>
				</div>
	
				<div class="grid grid-cols-2 w-full gap-8 md:grid-cols-1 md:gap-4 md:grid-cols-1">

					{inputRow("Name", "txt_name")}
					{inputRow("E-mail", "txt_email")}
				</div>

				<div class="flex flex-col justify-center items-center w-full space-y-1">
					<p class="text-sm w-full text-start underline">Membership</p>

					<ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
						{checkboxItem("check_member_admin", "Admin, Developer")}
						{checkboxItem("check_member_lifetime", "Lifetime Member")}
						{checkboxItem("check_member_regular", "Regular Member")}
						{checkboxItem("check_member_spouse", "Spouse Member")}
						{checkboxItem("check_member_student", "Student Member")}
						{checkboxItem("check_member_member", "Non-member")}
					</ul>
				</div>

				<div class="flex flex-col justify-center items-center w-full space-y-1">
					<p class="text-sm w-full text-start underline">Membership Add-On</p>

					<ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
						{checkboxItem("check_member_addon_none", "None")}
						{checkboxItem("check_member_addon_kssjoint", "KSS Joint Member")}
					</ul>
				</div>

				<div class="flex flex-col justify-center items-center w-full space-y-1">
					<p class="text-sm w-full text-start underline">Pending Membership</p>

					<ul class="grid grid-cols-3 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
						{checkboxItem("check_member_pending_student", "Student Member")}
					</ul>
				</div>

				<div class="flex flex-row justify-end items-center w-full">
					<div class="flex flex-row justify-end items-center" id="div_btn_search">
						<Div_btn_search />
					</div>
				</div>
			</div>
			
		</div>
	)
}