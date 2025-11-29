async function get_officer_list() {
	const data = await fetch("/about/ajax_get_officer_list/")
					  .then(res=> { return res.json(); })
					  .then(res=> { return res; });
	
	let data_res = {}
	data_res["current"] = Object.values(data).filter(it => it.term == "Current")
	data_res["board_of_directors"] = {}
	
	let temp_board_of_directors = Object.values(data).filter(it => it.role == "Board of Directors")
	let temp_board_of_directors_keys = Array.from(new Set(Object.values(temp_board_of_directors).map(function(element){ return element.term })))

	for (var i = 0 ; i < temp_board_of_directors_keys.length ; i++) {
		data_res["board_of_directors"][temp_board_of_directors_keys[i]] = Object.values(temp_board_of_directors).filter(it => it.term == temp_board_of_directors_keys[i])
	}

	data_res["incoming_Board_Member"] = Object.values(data).filter(it => it.role == "Incoming Board Member")
	
	ReactDOM.render(<Div_current_officers data={data_res["current"]} />, document.getElementById("div_current_officers"))
	ReactDOM.render(<Div_board_of_directors data={data_res["board_of_directors"]} />, document.getElementById("div_board_of_directors"))
	ReactDOM.render(<Div_incoming_board_member term={data_res["incoming_Board_Member"][0].term} data={data_res["incoming_Board_Member"]} />, document.getElementById("div_incoming_board_member"))        
}