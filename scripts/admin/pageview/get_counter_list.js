async function get_counter_list() {
	function Div_counter(props) {
		function Div_card(props) {
			return (
				<div class="flex flex-col justify-center items-center w-full border border-gray-300 shadow p-4">
					<p class="text-md font-[600]">{props.title}</p>
					<p class="text-sm font-[400]">{props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
				</div>
			)
		}

		return (
			<div class="flex flex-col justify-center items-center w-full space-y-4">
				<div class="flex flex-col justify-center items-center w-full border border-blue-200 shadow p-8 space-y-4">
					<h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
						<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
							Page View
						</span>
					</h1>

					<div class="grid grid-cols-4 md:grid-cols-1 gap-4 w-full">
						<Div_card title={"Total"} count={props.data.pageview.cnt_total} />
						<Div_card title={"Current Year"} count={props.data.pageview.cnt_yearly} />
						<Div_card title={"Current Month"} count={props.data.pageview.cnt_monthly} />
						<Div_card title={"Today"} count={props.data.pageview.cnt_daily} />
					</div>
				</div>

				<div class="flex flex-col justify-center items-center w-full border border-blue-200 shadow p-8 space-y-4">
					<h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
						<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
							Visitor
						</span>
					</h1>

					<div class="grid grid-cols-4 md:grid-cols-1 gap-4 w-full">
						<Div_card title={"Total"} count={props.data.visitor.cnt_total} />
						<Div_card title={"Current Year"} count={props.data.visitor.cnt_yearly} />
						<Div_card title={"Current Month"} count={props.data.visitor.cnt_monthly} />
						<Div_card title={"Today"} count={props.data.visitor.cnt_daily} />
					</div>
				</div>
			</div>
		)
	}

	const data = await fetch("/admin/ajax_get_counter_list/")
		.then(res=> { return res.json(); })
		.then(res=> { return res; });

	ReactDOM.render(<Div_counter data={data} />, document.getElementById("div_counter"))
}