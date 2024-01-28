function set_content() {
	function Div_content(props) {
		return (
			<div class="flex flex-col w-full space-y-8">
				<div id="div_counter" class="w-full"></div>
				<div id="div_graph" class="w-full"></div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_content />, document.getElementById("div_content"))

	get_counter_list()
}