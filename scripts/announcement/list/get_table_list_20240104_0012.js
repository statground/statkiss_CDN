async function get_table_list() {            
	const request_data = new FormData();
	request_data.append('url', url);
	
	data_list = await fetch("/announcement/ajax_get_article_list/", {
					  method: "post", 
					  headers: { "X-CSRFToken": getCookie("csrftoken"), },
					  body: request_data
					  })
					  .then(res=> { return res.json(); })
					  .then(res=> { return res; });

	for(var i = 0 ; i < Object.keys(data_list).length ; i += 5) {
		data_index_list.push(Object.keys(data_list).slice(i, i + 5));
	}

	ReactDOM.render(<Div_table_tbody index_list={data_index_list[0]}/>, document.getElementById("div_table_tbody"))
	ReactDOM.render(<Div_pagination pageNo={1} />, document.getElementById("div_table_pagination"))
}