function Div_card(props) {
	return (
		<div class="flex flex-col justify-center items-center w-full border border-gray-300 shadow p-4">
			<p class="text-md font-[600]">{props.title}</p>
			<p class="text-sm font-[400]">{props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
		</div>
	)
}