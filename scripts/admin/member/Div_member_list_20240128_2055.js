function Div_member_list(props) {
	let class_card = "flex flex-row justify-center items-center text-sm font-light text-gray-500 bg-gray-100 p-2 rounded-lg"

	const memberList = Object.keys(props.data).map((article) =>
		<div class="flex flex-col bg-white rounded-lg border border-gray-500 shadow-sm p-2 space-y-2 hover:bg-gray-100">
			<div class="flex flex-row justify-start items-end">
				<p class="text-md font-bold tracking-tight text-gray-900 mr-4">
					{props.data[article].name}
				</p>

				<p class="text-sm text-gray-500">
					{props.data[article].email}
				</p>
			</div>

			<div class="flex flex-wrap justify-start items-center space-x-2">
				<div></div>
				<p class={class_card}>
					{props.data[article].created_at}
				</p>

				<p class={class_card}>
					{props.data[article].role}
				</p>

				<p class={class_card}>
					{props.data[article].affiliation}
				</p>

				<p class={class_card}>
					{props.data[article].title}
				</p>

				<p class={class_card}>
					{props.data[article].education}
				</p>

				<p class={class_card}>
					{props.data[article].interest}
				</p>
			</div>
		</div>
	)

	return (
		<div class="flex flex-col w-full space-y-2">
			{memberList}
			<div id={"div_member_list_" + (page_num + 1).toString()}></div>
		</div>
	)
}