function Div_btn_search() {
	return (
		<button type="button" 
				onClick={() => click_btn_search()}
				class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center
					hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
			Search
		</button>
	)
}