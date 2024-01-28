function Div_member_list(props) {
	const memberList = Object.keys(props.data).map((article) =>
		<div class="flex flex-col bg-white rounded-lg border border-gray-500 shadow-sm p-2 hover:bg-gray-100">
			<div class="flex flex-row justify-start items-end">
				<p class="text-md font-bold tracking-tight text-gray-900 mr-4">
					{props.data[article].name}
				</p>

				<p class="text-sm text-gray-500">
					{props.data[article].email}
				</p>
			</div>

			<p class="text-sm font-light text-gray-500">
				{props.data[article].role}
			</p>
		</div>
	)

	return (
		<div class="flex flex-col w-full space-y-2">
			{memberList}
			<div id={"div_member_list_" + (page_num + 1).toString()}></div>
		</div>
	)
}