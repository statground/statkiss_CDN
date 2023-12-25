async function click_delete() {
	if (confirm("Are you sure to delete?")) {
		const request_data = new FormData();
		request_data.append('uuid', uuid);
		
		const data = await fetch("/announcement/ajax_delete_article/", {
							method: "post", 
							headers: { "X-CSRFToken": getCookie("csrftoken"), },
							body: request_data
							})
							.then(res=> { return res.json(); })
							.then(res=> { return res; });
	
		location.href='/announcement/' + url + '/'
	}
}