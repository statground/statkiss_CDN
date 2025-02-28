function Div_main_skeleton() {
	function Div_sub() {
		return (
			<a class="flex justify-between items-center p-4 mb-6 bg-gray-400 rounded-lg border-l-8 shadow hover:bg-gray-50 cursor-pointer">
				<div>
					<span class="block mb-1 text-xs font-medium text-gray-500 uppercase">　 　</span>
					<span class="text-xl font-semibold text-purple-600">　 　</span>
				</div>
			</a>
		)
	}

	return (
	
		<div class="mx-auto max-w-screen-xl sm:py-16 lg:px-6">
			<div id="div_buttons"></div>
			<div id="div_links">
				<div class="animate-pulse">
					<Div_sub /><Div_sub /><Div_sub /><Div_sub /><Div_sub />
				</div>
			</div>
		</div>
	)
}
