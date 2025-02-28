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

			<div class="flex flex-row justify-start items-center w-full space-x-2">
					<label for={"sel_membership_" + props.data[article].uuid} 
						   class="block mb-2 text-sm font-medium text-gray-900">Membership</label>
					<select id={"sel_membership_" + props.data[article].uuid}
							class={
									props.data[article].role == "Member" 
									?   "bg-white-100 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2"
									:   "bg-yellow-100 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2"
								  }>

						{
							props.data[article].role == "Lifetime Member" 
							?   <option value="Lifetime Member" selected>Lifetime Member</option>
							:   <option value="Lifetime Member">Lifetime Member</option>
						}
						
						{
							props.data[article].role == "Regular Member" 
							?   <option value="Regular Member" selected>Regular Member</option>
							:   <option value="Regular Member">Regular Member</option>
						}

						{
							props.data[article].role == "Student Member" 
							?   <option value="Student Member" selected>Student Member</option>
							:   <option value="Student Member">Student Member</option>
						}
						
						{
							props.data[article].role == "Member" 
							?   <option value="Member" selected>Member</option>
							:   <option value="Member">Member</option>
						}

						{
							props.data[article].role == "Administrator" 
							?   <option value="Administrator" selected>Administrator</option>
							:   <option value="Administrator">Administrator</option>
						}

						{
							props.data[article].role == "Developer" 
							?   <option value="Developer" selected>Developer</option>
							:   <option value="Developer">Developer</option>
						}
						
					</select>

					<div id={"div_btn_change_" + props.data[article].uuid}>
						<Div_btn_change_membership uuid={props.data[article].uuid} />
					</div>

					{
						props.data[article].expired_at != null 
						?   <p class={class_card}>
								Expired on {props.data[article].expired_at}
							</p>
						:   ""
					}
			</div>

			<div class="flex flex-wrap justify-start items-center space-x-2">
				<div></div>
				{
					props.data[article].officer != "Member" 
					?   <p class="flex flex-row justify-center items-center text-xs font-light text-gray-500 bg-red-100 px-2 py-1 rounded-lg">
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