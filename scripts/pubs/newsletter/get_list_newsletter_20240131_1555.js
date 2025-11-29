async function get_list_newsletter() {
	function Div_newsletters(props) {
		const newsletter_list = Object.keys(props.data).map((btn_data) =>  
			<div class="flex flex-col bg-white rounded shadow h-fit">
				<div class="flex flex-col justify-start items-start p-6 hover:bg-yellow-100 cursor-pointer"
					onClick={() => window.open('/' + props.data[btn_data].url_file)}>
					<div class="flex justify-start items-center mb-4 size-10 rounded bg-primary-100 lg:size-12">
						<img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/file_download.svg" class="w-8 h-8" />
					</div>
					<h3 class="text-md font-bold w-full">
						{props.data[btn_data].publish_date}
					</h3>
					<p class="font-light text-gray-500 text-sm w-full">
						{
							props.data[btn_data].volume != null
							? "Volume " + props.data[btn_data].volume
							: ""
						}
						{
							props.data[btn_data].volume != null && props.data[btn_data].issue != null
							? ", "
							: ""
						}
						{
							props.data[btn_data].issue != null
							? "Issue " + props.data[btn_data].issue
							: ""
						}
					</p>
				</div>
				<div id={"btn_delete_" + props.data[btn_data].uuid} class="hidden" onClick={() => click_btn_delete(props.data[btn_data].uuid)}>
					<img class="object-scale-down h-6 m-2 hover:bg-red-100"
						 src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/trash.svg" />
				</div>
			</div>
		)

		return (
			<section class="bg-gray-50">
				<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
					<div class="grid grid-cols-6 lg:grid-cols-4 md:grid-cols-2 gap-8 md:space-y-0">
						{newsletter_list}
					</div>
				</div>
			</section>
		)
	}

	data_newsletter = await fetch("/pubs/ajax_get_newsletter")
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	ReactDOM.render(<Div_newsletters data={data_newsletter} />, document.getElementById("div_newsletters"))
}