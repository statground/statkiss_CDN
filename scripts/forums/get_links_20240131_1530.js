async function get_links() {
	function Div_links(props) {
		const link_list = Object.keys(props.data).map((btn_data) =>  
			<div class="flex flex-col bg-white rounded-lg border-l-8 border-primary-600 shadow w-full h-fit">
				<a href={props.data[btn_data].url} target="_blank"
					class="flex justify-between items-center p-4 w-full hover:bg-gray-50">
						<div>
							<span class="block mb-1 text-xs font-medium text-gray-500 uppercase">
								{props.data[btn_data].category}
							</span>
							<span class="text-xl font-semibold text-primary-600">
								{props.data[btn_data].title}
							</span>
						</div>
					<svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				</a>
				<div id={"btn_delete_" + props.data[btn_data].uuid} class="hidden" onClick={() => click_btn_delete(props.data[btn_data].uuid)}>
					<img class="object-scale-down h-6 m-2 hover:bg-red-100"
						 src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/trash.svg" />
				</div>
			</div>
		)

		return (
			<div class="grid grid-cols-4 gap-4 mx-auto max-w-screen-xl md:grid-cols-2 sm:grid-cols-1">
				{link_list}
			</div>
		)
	}

	data_link = await fetch("/forums/ajax_get_links/")
					   .then(res=> { return res.json(); })
					   .then(res=> { return res; });

	ReactDOM.render(<Div_links data={data_link} />, document.getElementById("div_links"))
}