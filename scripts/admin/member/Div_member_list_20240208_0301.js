function Div_member_list(props) {
	let class_card = "flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-gray-100 px-2 py-1 rounded-lg"

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
				{
					props.data[article].role != "Member" 
					?   <p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-yellow-100 px-2 py-1 rounded-lg">
							Membership: {props.data[article].role}
						</p>
					:   <p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-blue-100 px-2 py-1 rounded-lg">
							Membership: {props.data[article].role}
						</p>
				}

				{
					props.data[article].officer != "Member" 
					?   <p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-red-100 px-2 py-1 rounded-lg">
							{props.data[article].officer}
						</p>
					:   ""
				}
				
			</div>

			<div class="flex flex-wrap justify-start items-center space-x-2">
				<div></div>
				<p class={class_card}>
					Joined at {props.data[article].created_at}
				</p>

				{
					props.data[article].affiliation != null && props.data[article].affiliation != "" 
					?   <p class={class_card}>Affiliation: {props.data[article].affiliation}</p>
					:   ""
				}

				{
					props.data[article].title != null && props.data[article].title != "" 
					?   <p class={class_card}>Title: {props.data[article].title}</p>
					:   ""
				}

				{
					props.data[article].education != null && props.data[article].education != "" 
					?   <p class={class_card}>Education: {props.data[article].education}</p>
					:   ""
				}

				{
					props.data[article].interest != null && props.data[article].interest != "" 
					?   <p class={class_card}>Interest: {props.data[article].interest}</p>
					:   ""
				}
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