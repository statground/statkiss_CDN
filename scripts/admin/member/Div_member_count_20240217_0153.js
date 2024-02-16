function Div_member_count(props) {
	return (
		<div class="flex flex-row w-full justify-between items-center">
			<p>
				Member Count: {props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
			</p>

			<div>
				<button type="button"
						onClick={() => click_btn_download_list()}
						class="flex flex-row text-gray-900 bg-white border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5
							   hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
					<img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/button_download.svg" class="w-4 h-4 mr-2" />
					List Download
				</button>
			</div>
		</div>
	)
}