function Div_member_list(props) {
	let class_card = "flex flex-row justify-center items-center text-xs font-light bg-gray-100 px-2 py-1 rounded-lg"
	
	const memberList = Object.keys(props.data).map((article) =>
		<div class="flex flex-col justify-center items-start bg-white rounded-lg border border-gray-500 shadow-sm p-2 space-y-2 hover:bg-gray-100">
			<div class="flex flex-row justify-between items-center w-full">
				<div class="flex flex-row justify-start items-end">
					<p class="text-md font-bold tracking-tight text-gray-900 mr-4">{props.data[article].name}</p>
					<p class="text-sm text-gray-500 mr-4">{props.data[article].email}</p>
					{
						props.data[article].role_pending == "Student Member" && (
							<p class="text-xs bg-red-500 text-white font-bold px-4 rounded-lg cursor-pointer"
							   onClick={() => click_btn_pending_student(props.data[article].email)}>
								Applied for Student Membership
							</p>
						)
					}
				</div>

				<div class="flex flex-col justify-end items-end">
					<p class="text-sm bg-gray-500 text-white px-4 rounded-lg cursor-pointer"
					   onClick={() => click_btn_like_change_password(props.data[article].email)} alt="Link for Change Password ">
						Change Password
					</p>
					<p id={"div_member_list_btn_change_password_" + props.data[article].email} class="text-xs text-gray-500"></p>
				</div>

			</div>

			<div class="grid grid-cols-3 justify-center items-start w-full gap-2">
				<div class="col-span-2 flex flex-col justify-center items-center w-full space-y-1 border border-blue-200 rounded-lg p-2 hover:bg-white">
					<div class="flex flex-row justify-center items-center w-full space-x-2">
						<p class="block text-sm font-normal underline text-blue-700">Membership</p>
					</div>

					<div id={"div_member_list_btn_membership_" + props.data[article].uuid} class="w-full">
						<Div_member_list_membership uuid_user={props.data[article].uuid} 
													current_role={props.data[article].role} 
													role_expired_at={props.data[article].role_expired_at}/>
					</div>
				</div>

				<div class="flex flex-col justify-center items-center w-full space-y-1 border border-green-200 rounded-lg p-2 hover:bg-white">
					<div class="flex flex-row justify-center items-center w-full space-x-2">
						<p class="block text-sm font-normal underline text-blue-700">Membership Add-On</p>
					</div>

					<div id={"div_member_list_btn_membership_addon_" + props.data[article].uuid} class="w-full">
						<Div_member_list_membership_addon uuid_user={props.data[article].uuid}
														  role_addon_kssjoint={props.data[article].role_addon_kssjoint}
														  role_addon_kssjoint_expired_at={props.data[article].role_addon_kssjoint_expired_at} />
					</div>


				</div>
			</div>

			<div class="flex flex-wrap justify-start items-center space-x-2">
				<div></div>
				{
					props.data[article].officer !== "Member" && (
						<p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-red-100 py-1 rounded-lg">
							{props.data[article].officer}
						</p>
					)
				}

				<p class={class_card}>
					Joined at {props.data[article].created_at}
				</p>

				{ props.data[article].affiliation && ( <p class={class_card}>Affiliation: {props.data[article].affiliation}</p> ) }
				{ props.data[article].title && ( <p class={class_card}>Title: {props.data[article].title}</p> ) }
				{ props.data[article].education && ( <p class={class_card}>Education: {props.data[article].education}</p> ) }
				{ props.data[article].interest && ( <p class={class_card}>Interest: {props.data[article].interest}</p> ) }
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
