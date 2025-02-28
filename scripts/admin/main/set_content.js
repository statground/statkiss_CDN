function set_content() {
	function Div_content() {
		return (
			<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div class="mx-auto max-w-screen-sm text-center">
					<h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
						Admin Page
					</h1>
					<p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
						This is the screen for the administrator of the KISS homepage.
					</p>
				</div>   
			</div>
		)
	}

	ReactDOM.render(<Div_content />, document.getElementById("div_content"))
}