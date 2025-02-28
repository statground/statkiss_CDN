function Div_member_list(props) {
	let class_card = "flex flex-row justify-center items-center text-xs font-light bg-gray-100 px-2 py-1 rounded-lg"
	
	const memberList = Object.keys(props.data).map((article) =>
		<div class="flex flex-col bg-white rounded-lg border border-gray-500 shadow-sm p-2 space-y-2 hover:bg-gray-100">
			<div class="flex flex-row justify-start items-end">
				<p class="text-md font-bold tracking-tight text-gray-900 mr-4">{props.data[article].name}</p>
				<p class="text-sm text-gray-500">{props.data[article].email}</p>
			</div>

			<div class="grid grid-cols-3 justify-center items-start w-full gap-2">
				<div class="col-span-2 flex flex-col justify-center items-center w-full space-y-1 border border-blue-200 rounded-lg p-2 hover:bg-white">
					<div class="flex flex-row justify-center items-center w-full space-x-2">
						<p class="block text-sm font-normal underline text-blue-700">Membership</p>
					</div>

					<div id={"div_member_list_btn_membership_" + props.data[article].uuid} class="w-full">
						<Div_member_list_membership uuid_user={props.data[article].uuid} current_role={props.data[article].role} />
					</div>
					
					<div class="flex flex-row justify-center items-center w-full space-x-2">
						{
							props.data[article].expired_at != null 
							?   <p class="flex flex-row justify-center items-center text-xs font-light text-red-500 px-2 py-1">
									Expired on {props.data[article].expired_at}
								</p>
							:   ""
						}
					</div>
				</div>

				<div class="flex flex-col justify-center items-center w-full space-y-1 border border-green-200 rounded-lg p-2 hover:bg-white">
					<div class="flex flex-row justify-center items-center w-full space-x-2">
						<p class="block text-sm font-normal underline text-blue-700">Membership Add-On</p>
					</div>

					<div id={"div_member_list_btn_membership_addon_" + props.data[article].uuid} class="w-full">
						<Div_member_list_membership_addon uuid_user={props.data[article].uuid}
														  role_addon_kssjoint={props.data[article].role_addon_kssjoint} />
					</div>

					<div class="flex flex-row justify-center items-center w-full space-x-2">
						{
							props.data[article].role_addon_kssjoint_expired_at != null 
							?   <p class="flex flex-row justify-center items-center text-xs font-light text-red-500 px-2 py-1">
									Expired on {props.data[article].role_addon_kssjoint_expired_at}
								</p>
							:   ""
						}
					</div>
				</div>
			</div>

			<div class="flex flex-wrap justify-start items-center space-x-2">
				<div></div>
				{
					props.data[article].officer != "Member" 
					?   <p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-red-100 py-1 rounded-lg">
							{props.data[article].officer}
						</p>
					:   ""
				}

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