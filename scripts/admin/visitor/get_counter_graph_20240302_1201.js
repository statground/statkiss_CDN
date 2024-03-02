async function get_counter_graph(type) {    
	let div_graph_daily = document.getElementById("graph_daily");
	let div_graph_monthly = document.getElementById("graph_monthly");
	let div_graph_yearly = document.getElementById("graph_yearly");
	let class_div_graph = "p-4 rounded-lg bg-gray-50 w-full"

	let options = {
		series: {
			0: {targetAxisIndex: 0},
			1: {targetAxisIndex: 1}
		},
		width: '100%',
		legend: { position: 'none' },
		crosshair: {orientation: 'vertical', trigger: 'focus'},
		focusTarget: 'category',
		hAxis: { textStyle: { color: 'green' }, format: 'yy-MM-dd' },
		explorer: { actions: ['dragToZoom', 'rightClickToReset'], axis: 'horizontal' },
		bar: { groupWidth: "90%" } 
	};

	if (type == "daily") {
		div_graph_daily.className = class_div_graph
		div_graph_monthly.className = "hidden"
		div_graph_yearly.className = "hidden"
		ReactDOM.render(<Div_graph_skeleton />, document.getElementById("graph_daily"))
		options["title"] = "Daily Visitors (the last 60 days)"

		const data = await fetch("/admin/ajax_get_visitor_table/")
			.then(res=> { return res.json(); })
			.then(res=> { return res; });
	
		bar(data.daily, 'graph_daily', options);

	} else if (type == "monthly") {
		div_graph_daily.className = "hidden"
		div_graph_monthly.className = class_div_graph
		div_graph_yearly.className = "hidden"
		ReactDOM.render(<Div_graph_skeleton />, document.getElementById("graph_monthly"))
		options["title"] = "Monthly Visitors"

		const data = await fetch("/admin/ajax_get_visitor_table/")
			.then(res=> { return res.json(); })
			.then(res=> { return res; });
	
		bar(data.monthly, 'graph_monthly', options);

	} else if(type == "yearly") {
		div_graph_daily.className = "hidden"
		div_graph_monthly.className = "hidden"
		div_graph_yearly.className = class_div_graph
		ReactDOM.render(<Div_graph_skeleton />, document.getElementById("graph_yearly"))
		options["title"] = "Yearly Visitors"

		const data = await fetch("/admin/ajax_get_visitor_table/")
			.then(res=> { return res.json(); })
			.then(res=> { return res; });
	
		bar(data.yearly, 'graph_yearly', options);

	}
}