function set_main() {
	let title = null
	let description = null

	if (url == "career") {
		title = "KISS Career Development Award"
		description = "The KISS Career Development Awards are to recognize statisticians who are in the early stages of their careers and who have demonstrated outstanding productivity and the potential to make significant contributions to the field of statistics. The Awards are given in the KISS Career Development Workshop at JSM meeting every year."

	} else if (url == "student") {

		title = "KISS Outstanding Student Paper Award"
		description = "The KISS Outstanding Student Paper Awards are to support students for traveling to JSM to present their papers. The Awards are given in the KISS Annual Meeting at JSM every other year."
	}


	function Div_main(props) {
		
		return (
			<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
				<div class="mx-auto max-w-screen-lg text-center">
					<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">{props.title}</h2>
					<p class="mb-8 text-gray-500 lg:text-lg">
						{props.description}
					</p>
				</div>
	
				<div class="w-full" id="div_awardees_list"></div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_main title={title} description={description} />, document.getElementById("div_main"))

	get_awardees_list()
}