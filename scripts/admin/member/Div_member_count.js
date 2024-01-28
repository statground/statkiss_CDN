function Div_member_count(props) {
	return (
		<div class="flex flex-row w-full justify-start items-center">
			Member Count: {props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
		</div>
	)
}