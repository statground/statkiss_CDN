function set_main() {
	function Div_main() {
		return (
			<div class="flex flex-col w-full max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24 space-y-4">
				<div class="text-center" id="div_header">
					<h2 class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
						Newsletter
					</h2>
					<p></p>                        
				</div>
				<div id="div_add_newsletter"></div>
				<div id="div_newsletters">
					<section class="bg-gray-50 animate-pulse">
						<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
							<div class="grid grid-cols-6 lg:grid-cols-4 md:grid-cols-2 md:gap-8 xl:gap-8 md:space-y-0">
								<div class="flex justify-start items-center mb-4 size-10 rounded bg-gray-500 lg:size-12"></div>
								<div class="flex justify-start items-center mb-4 size-10 rounded bg-gray-500 lg:size-12"></div>
								<div class="flex justify-start items-center mb-4 size-10 rounded bg-gray-500 lg:size-12"></div>
								<div class="flex justify-start items-center mb-4 size-10 rounded bg-gray-500 lg:size-12"></div>
								<div class="flex justify-start items-center mb-4 size-10 rounded bg-gray-500 lg:size-12"></div>
								<div class="flex justify-start items-center mb-4 size-10 rounded bg-gray-500 lg:size-12"></div>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}

	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
	get_div_add_newsletter()
	get_list_newsletter()
}