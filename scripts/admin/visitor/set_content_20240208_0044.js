function set_content() {
	function Div_content(props) {
		return (
			<div class="flex flex-col w-full space-y-8">
				<div id="div_counter" class="w-full"></div>
				<div id="div_graph" class="w-full">
					<div class="flex flex-row justify-start items-center space-x-8 py-2 mb-4 border-b border-gray-900">
						<span class="hover:underline cursor-pointer" onClick={() => get_counter_graph("monthly")}>Monthly</span>
						<span class="hover:underline cursor-pointer" onClick={() => get_counter_graph("yearly")}>Yearly</span>
					</div>
					<div class="w-full" id="graph_monthly"></div>
					<div class="hidden" id="graph_yearly"></div>
				</div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_content />, document.getElementById("div_content"))

	get_counter_list()
	get_counter_graph("monthly")
}