async function get_links() {
	function Div_links(props) {
		const link_list = Object.keys(props.data).map((btn_data) =>  
			<a href={props.data[btn_data].url} target="_blank"
			   class="flex justify-between items-center p-4 mb-6 bg-white rounded-lg border-l-8 border-primary-600 shadow hover:bg-gray-50">
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
		)

		return (
			<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
				{link_list}
			</div>
		)
	}

	const data = await fetch("/forums/ajax_get_links/")
					   .then(res=> { return res.json(); })
					   .then(res=> { return res; });

	ReactDOM.render(<Div_links data={data} />, document.getElementById("div_links"))
}