function Div_member_list_membership_addon(props) {
	return (
		<div class="flex flex-row justify-center items-center w-full space-x-2">
			{
				props.role_addon_kssjoint == 1 || props.role_addon_kssjoint == '1'
				?   <p id={"membership_addon_kssjoint_" + props.uuid_user} class={class_member_active + " bg-blue-200 hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership_addon(props.uuid_user, "KSS Joint Member", props.role_addon_kssjoint)}>
						KSS Joint Member
					</p>
				:   <p id={"membership_addon_kssjoint_" + props.uuid_user} class={class_member_deactive + " hover:bg-gray-100 hover:text-gray-900 hover:shadow cursor-pointer"}
					   onClick={() => click_btn_change_membership_addon(props.uuid_user, "KSS Joint Member", props.role_addon_kssjoint)}>
						KSS Joint Member
					</p>
			}
		</div>
	)
}