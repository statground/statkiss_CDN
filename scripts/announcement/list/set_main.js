function set_main() {
	function Div_main(props) {
		return (
			<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 space-y-2">
				<div class="w-full" id="div_table"></div>

				<div class="w-full" id="div_table_buttons"></div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
	
	// Table
	ReactDOM.render(<Div_table title={title} url={url} />, document.getElementById("div_table"))
}