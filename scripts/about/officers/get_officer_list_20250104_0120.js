async function get_officer_list() {
	const data = await fetch("/about/ajax_get_officer_list/").then(res => res.json());
	
	const data_res = {
		current: Object.values(data).filter(it => it.role != "Board of Directors" && it.role != "Incoming Board Member"),
		board_of_directors: {},
		incoming_Board_Member: Object.values(data).filter(it => it.role == "Incoming Board Member")
	};
	
	const temp_board = Object.values(data).filter(it => it.role == "Board of Directors");
	const terms = [...new Set(temp_board.map(el => el.term))];
	terms.forEach(term => {
		data_res.board_of_directors[term] = temp_board.filter(it => it.term == term);
	});

	ReactDOM.render(<Div_current_officers term={data_res.current[0].term} data={data_res.current} />, 
		document.getElementById("div_current_officers"));
	ReactDOM.render(<Div_board_of_directors data={data_res.board_of_directors} />, 
		document.getElementById("div_board_of_directors"));
	
	if (data_res.incoming_Board_Member.length > 0) {
		ReactDOM.render(<Div_incoming_board_member 
			term={data_res.incoming_Board_Member[0].term} 
			data={data_res.incoming_Board_Member} />, 
			document.getElementById("div_incoming_board_member"));
	}
}