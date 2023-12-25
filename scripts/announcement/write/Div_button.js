function Div_button() {
	return (
		<div class="flex flex-row w-full justify-center items-center space-x-4">
			<button type="button" onClick={() => click_submit()}
					class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center
						hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
				Submit
			</button>
			<button type="button" onClick={() => location.href=props.url}
					class="py-1.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-500 
						hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
				List
			</button>
		</div>
	)
}
