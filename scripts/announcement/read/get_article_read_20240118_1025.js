async function get_article_read() {
	function Div_title(props) {
		return (
			<div class="flex flex-col w-full">
				<h2 class="flex items-center mb-4 text-xl font-bold leading-none text-gray-900 md:text-2xl">
					{props.title}
				</h2>
				
				<dl class="flex items-center mb-4 space-x-4 md:mb-5">
					<div>
						<dd class="flex items-center text-gray-900">
							<span class="font-semibold">{props.created_at}</span>
						</dd>
					</div>
				</dl>
			</div>
		)
	}

	const request_data = new FormData();
	request_data.append('uuid', uuid);
	
	const data = await fetch("/announcement/ajax_get_article_read/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	ReactDOM.render(<Div_title title={data.title} created_at={data.created_at} />, document.getElementById("div_title"))

	const viewer = toastui.Editor.factory({
		el: document.querySelector('#div_contents'),
		viewer: true,
		initialValue: data.content
	  });	
}