function Div_btn_submit() {
	return (
		<button class="flex flex-row justify-center items-center py-1.5 px-5 text-white 
					   bg-red-700 font-medium rounded-lg text-center text-sm w-fit
					   md:w-auto
					   hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
					   onClick={() => click_btn_submit()}>
			Submit
		</button>
	)
}