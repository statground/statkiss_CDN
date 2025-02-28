function Div_member_list_skeleton() {
	let class_skeleton = "flex flex-col bg-gray-300 rounded-lg w-full h-12 border border-gray-500 shadow-sm p-2"
	return (
		<div class="flex flex-col space-y-2 animate-pulse">
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
			<div class={class_skeleton}></div>
		</div>
	)
}