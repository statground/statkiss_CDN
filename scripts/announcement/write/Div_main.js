function Div_main(props) {
	return (
		<div class="max-w-2xl px-4 py-8 mx-auto space-y-2">
			<div id="div_title" class="w-full">
				<input type="text" placeholder="Please enter a title." id="txt_title" name="txt_title"
					   class="w-full h-[48px] rounded-lg resize-none scroll-hide 
							  text-start text-[14px] font-[500] border-gray-500
							  focus:ring-gray-700 focus:border-gray-700" />
			</div>
			<div id="div_summernote" class="w-full h-1/2"></div>
			<div class="flex flex-row w-full justify-center items-center space-x-4">
				<button type="button" 
						class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					Submit
				</button>
				<button type="button" onClick={() => location.href=props.url}
						class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					List
				</button>
			</div>
		</div>
	)
}