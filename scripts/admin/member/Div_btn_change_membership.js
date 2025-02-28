function Div_btn_change_membership(props) {
	return (
		<button type="button" 
				onClick={() => click_btn_change_membership(props.uuid)}
				class="py-1.5 px-5 text-white bg-red-400 font-medium rounded-lg text-xs w-full md:w-auto text-center
					   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
			Change
		</button>
	)
}