async function get_member_summary() {
	function Div_member_counter(props) {    
		return (
			<div class="flex flex-col justify-center items-center w-full space-y-4">
				<div class="flex flex-col justify-center items-center w-full border border-blue-200 shadow p-8 space-y-4">
					<h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-xl">
						<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
							Membership
						</span>
					</h1>

					<div class="grid grid-cols-4 md:grid-cols-1 gap-4 w-full md:grid-cols-2">
						<Div_card title={"Admin"} count={Object.values(props.data.membership).filter(it => it.role == 'Administrator')[0].cnt
													   + Object.values(props.data.membership).filter(it => it.role == 'Developer')[0].cnt} />
						<Div_card title={"Lifetime Member"} count={Object.values(props.data.membership).filter(it => it.role == 'Lifetime Member')[0].cnt} />
						<Div_card title={"Regular Member"} count={Object.values(props.data.membership).filter(it => it.role == 'Regular Member')[0].cnt} />
						<Div_card title={"Spause Member"} count={Object.values(props.data.membership).filter(it => it.role == 'Spause Member')[0].cnt} />
						<Div_card title={"Student Member"} count={Object.values(props.data.membership).filter(it => it.role == 'Student Member')[0].cnt} />
						<Div_card title={"Member"} count={Object.values(props.data.membership).filter(it => it.role == 'Member')[0].cnt} />
					</div>
				</div>

				<div class="flex flex-col justify-center items-center w-full border border-blue-200 shadow p-8 space-y-4">
					<h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-xl">
						<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
							Signed Up
						</span>
					</h1>

					<div class="grid grid-cols-4 md:grid-cols-1 gap-4 w-full md:grid-cols-2">
						<Div_card title={"Total"} count={props.data.member_joined.cnt_total} />
						<Div_card title={"Current Year"} count={props.data.member_joined.cnt_yearly} />
						<Div_card title={"Current Month"} count={props.data.member_joined.cnt_monthly} />
						<Div_card title={"Today"} count={props.data.member_joined.cnt_daily} />
					</div>
				</div>

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

	const data = await fetch("/admin/ajax_get_member_counter/")
		.then(res=> { return res.json(); })
		.then(res=> { return res; });

	ReactDOM.render(<Div_member_counter data={data} />, document.getElementById("div_member_summary"))

	get_counter_graph("monthly")
}