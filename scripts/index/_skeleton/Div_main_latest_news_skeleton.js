function Div_main_latest_news_skeleton() {
	return (
		<div class="flex flex-col py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
			<div class="max-w-screen-md">
				<h2 class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900">
					Latest News
				</h2>
			</div>
			<div class="grid grid-cols-3 md:grid-cols-1 md:gap-12 md:space-y-0">
				<Div_section_skeleton />
				<Div_section_skeleton />
				<Div_section_skeleton />
			</div>
		</div>
	)
}