async function get_article_read() {
	const request_data = new FormData();
	request_data.append('uuid', uuid);
	
	const data = await fetch("/announcement/ajax_get_article_read/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	change_title(data.title + " - " + data.created_at)
	document.getElementById("txt_title").value = data.title
	editor.setHTML(data.content)
	
}