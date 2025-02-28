function Div_member_list_membership(props) {
	return (
		<div class="flex flex-wrap justify-center items-center w-full space-x-2">
			{
				props.current_role == "Lifetime Member" 
				?   <p id={"membership_lifetime_" + props.uuid_user} class={class_member_active + " bg-yellow-100"}>Lifetime Member</p>
				:   <p id={"membership_lifetime_" + props.uuid_user} class={class_member_deactive + " hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership(props.uuid_user, "Lifetime Member", props.current_role)}>Lifetime Member</p>
			}
			
			{
				props.current_role == "Regular Member" 
				?   <p id={"membership_regular_" + props.uuid_user} class={class_member_active + " bg-cyan-200"}>Regular Member</p>
				:   <p id={"membership_regular_" + props.uuid_user} class={class_member_deactive + " hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership(props.uuid_user, "Regular Member", props.current_role)}>Regular Member</p>
			}

			{
				props.current_role == "Spause Member" 
				?   <p id={"membership_spause_" + props.uuid_user} class={class_member_active + " bg-purple-200"}>Spause Member</p>
				:   <p id={"membership_spause_" + props.uuid_user} class={class_member_deactive + " hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership(props.uuid_user, "Spause Member", props.current_role)}>Spause Member</p>
			}

			{
				props.current_role == "Student Member" 
				?   <p id={"membership_student_" + props.uuid_user} class={class_member_active + " bg-green-200"}>Student Member</p>
				:   <p id={"membership_student_" + props.uuid_user} class={class_member_deactive + " hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership(props.uuid_user, "Student Member", props.current_role)}>Student Member</p>
			}
			
			{
				props.current_role == "Member" 
				?   <p id={"membership_member_" + props.uuid_user} class={class_member_active + " bg-blue-200"}>Member</p>
				:   <p id={"membership_member_" + props.uuid_user} class={class_member_deactive + " hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership(props.uuid_user, "Member", props.current_role)}>Member</p>
			}

			{
				props.current_role == "Administrator" 
				?   <p id={"membership_administrator_" + props.uuid_user} class={class_member_active + " bg-red-200"}>Administrator</p>
				:   <p id={"membership_administrator_" + props.uuid_user} class={class_member_deactive}>Administrator</p>
			}

			{
				props.current_role == "Developer" 
				?   <p id={"membership_developer_" + props.uuid_user} class={class_member_active + " bg-red-200"}>Developer</p>
				:   <p id={"membership_developer_" + props.uuid_user} class={class_member_deactive}>Developer</p>
			}
		</div>
	)
}