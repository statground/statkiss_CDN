function set_main() {
	function Div_main() {        
		return (
			<div>
				<section class="bg-gray-50">
					<div class="py-8 px-4 mx-auto w-full">
						<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
							<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Officers</h2>
							<p class="font-light text-gray-500 sm:text-xl">
								Korean International Statistical Society (Jan, 2023)
							</p>
						</div>

						<div id="div_current_officers" class="w-full"></div>
						
					</div>
				</section>
	
				<div class="px-4 mx-auto max-w-screen-xl py-8">
					<h2 class="mb-8 text-2xl font-bold text-gray-900">Board of Directors</h2>
					<div class="flex flex-col w-full space-y-8">
						<div id="div_board_of_directors" class="w-full"></div>
					</div>
				</div>

				<div class="px-4 mx-auto max-w-screen-xl py-8">
					<h2 class="mb-8 text-2xl font-bold text-gray-900">Incoming Board Member</h2>
					<div class="flex flex-col w-full space-y-8">
						<div id="div_incoming_board_member" class="w-full"></div>
					</div>
				</div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_main />, document.getElementById("div_main"))

	// 데이터 불러오기
	get_officer_list()
}