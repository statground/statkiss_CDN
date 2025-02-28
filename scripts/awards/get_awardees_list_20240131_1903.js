async function get_awardees_list() {

	function Div_awardees_list(props) {
		function Div_sub(props) {
			function Div_person(props) {
				return (
					<li class="flex flex-row items-center">
						<img class="w-3.5 h-3.5 mr-2" src={props.award_url_icon} />
						<div class="flex flex-col">
							<p class="text-md">{props.name}</p>
							<p class="text-xs">{props.affiliation}</p>
						</div>
						<div id={"btn_delete_" + props.uuid} class="hidden" onClick={() => click_btn_delete(props.uuid)}>
							<img class="object-scale-down h-4 m-2 hover:bg-red-100 cursor-pointer"
								 src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/trash.svg" />
						</div>
					</li>
				)
			}

			const awardeesList = Object.keys(props.data).map((btn_data) =>
				<Div_person uuid={props.data[btn_data].uuid}
							name={props.data[btn_data].name}
							affiliation={props.data[btn_data].affiliation} 
							award_url_icon={props.data[btn_data].award_url_icon} />
			)

			return (
				<div class="w-full p-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">{props.year} Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						{awardeesList}
					</ul>
				</div>
			)
		}

		const subList = Object.keys(props.data).sort(function (a,b) { return b-a}).map((btn_data) =>
			<Div_sub year={btn_data} data={props.data[btn_data]} />
		)
		
		return (
			<ol class="grid grid-cols-4 border-l border-gray-200">
				{subList}
			</ol>
		)
	}
	

	data_awardee = await fetch("/awards/ajax_get_awardees_list/?tag=" + url)
					  .then(res=> { return res.json(); })
					  .then(res=> { return res; });
	
	
	
	let data_res = {}
	let data_keys = Array.from(new Set(Object.values(data_awardee).map(function(element){ return element.year })))

	for (var i = 0 ; i < data_keys.length ; i++) {
		data_res[data_keys[i]] = Object.values(data_awardee).filter(it => it.year == data_keys[i])
	}
	
	ReactDOM.render(<Div_awardees_list data={data_res} />, document.getElementById("div_awardees_list"))
	get_div_add_awardee()
}
