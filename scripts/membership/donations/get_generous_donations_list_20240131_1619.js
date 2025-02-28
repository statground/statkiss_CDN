async function get_generous_donations_list() {

	function Div_generous_donations(props) {
		function Div_sub(props) {
			function Div_year(props) {
				return (
					<div class="max-w-screen-md mx-auto text-center mb-4">
						<svg class="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
							<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
						</svg>
						<blockquote>
							<p class="text-2xl italic font-medium text-gray-900">
								{props.year}
							</p>
						</blockquote>
					</div>   
				)
			}

			function Div_donator(props) {
				return (
					<div class="text-center text-gray-500 mb-4">
						<img class="mx-auto mb-4 w-12 h-12 rounded-lg" src={props.url_icon} />
						
						<h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900">{props.name}</h5>
						<p class="font-light text-gray-500 text-xs mb-1">{props.affiliation}</p>
						<p class="font-light text-gray-500 text-md mb-1">${props.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
						{
							props.comment != null
							?   <p class="font-light text-gray-500 text-xs mb-1">{props.comment}</p>
							:   ""
						}

						<div id={"btn_delete_" + props.uuid} class="hidden" onClick={() => click_btn_delete(props.uuid)}>
							<img class="object-scale-down h-6 m-2 hover:bg-red-100 cursor-pointer"
								 src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/trash.svg" />
						</div>                            
					</div>
				)
			}

			const donatorList = Object.keys(props.data).map((btn_data) =>
				<Div_donator uuid={props.data[btn_data].uuid}
							 name={props.data[btn_data].name}
							 affiliation={props.data[btn_data].affiliation} 
							 amount={props.data[btn_data].amount} 
							 comment={props.data[btn_data].comment} 
							 url_icon={props.data[btn_data].url_icon} />
			)

			return (
				<div class="w-full p-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<Div_year year={props.year} />

					<div class="grid grid-cols-6 w-full sm:grid-cols-2 gap-4 md:grid-cols-4">
						{donatorList}
					</div>
				</div>
			)
		}

		const subList = Object.keys(props.data).sort(function (a,b) { return b-a}).map((btn_data) =>
			<Div_sub year={btn_data} data={props.data[btn_data]} />
		)
		
		return (
			<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl space-y-8">
				<div class="max-w-screen-md mb-2">
					<Div_sub_header text={"Our sincere appreciation for your generous donations to KISS!"} />
				</div>

				<div id="div_add_generous_donations"></div>

				{subList}
			</div>
		)
	}
	

	data_donator = await fetch("/membership/ajax_get_donation_list/")
					  .then(res=> { return res.json(); })
					  .then(res=> { return res; });
	
	
	let data_res = {}
	let data_keys = Array.from(new Set(Object.values(data_donator).map(function(element){ return element.year })))

	for (var i = 0 ; i < data_keys.length ; i++) {
		data_res[data_keys[i]] = Object.values(data_donator).filter(it => it.year == data_keys[i])
	}
	
	ReactDOM.render(<Div_generous_donations data={data_res} />, document.getElementById("div_generous_donations"))
	get_div_add_donator()
}
