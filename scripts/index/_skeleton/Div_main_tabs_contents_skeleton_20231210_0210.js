function Div_main_tabs_contents_skeleton() {
	return (
		<div class="grid grid-cols-2 md:gap-8 md:space-y-0 border border-gray-300 p-8 w-full md:grid-cols-1">
			<div class="row-span-2 animate-pulse">
				<div class="flex justify-center items-center w-full h-10 rounded-full bg-primary-100">
					<span class="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded w-1/3 h-2"></span>
				</div>
				<h3 class="mb-2 text-xl font-bold">
					<div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
				</h3>
				<div class="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
				<div class="h-2 bg-gray-200 rounded-full max-w-[180px] mb-2.5"></div>
			</div>
			<Div_section_skeleton />
			<Div_section_skeleton />
		</div>
	)
}