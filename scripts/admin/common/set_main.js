function set_main() {
	function Div_main() {
		return (
			<div class="flex flex-col w-full max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24 space-y-4">
				<div class="w-full" id="div_admin_menu"></div>
				<div class="flex flex-col justify-center items-center" id="div_content"></div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_main />, document.getElementById("div_main"))

	// 화면
	ReactDOM.render(<Div_admin_menu />, document.getElementById("div_admin_menu"))
	set_content()
}