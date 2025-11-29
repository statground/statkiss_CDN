function set_main() {
	function Div_main() {        
		return (
			<div>
				<section class="bg-gray-50 w-full" id="div_current_officers"></section>
	
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