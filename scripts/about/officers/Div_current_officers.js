function Div_current_officers(props) {
	function Div_person(props) {
		return (
			<div class="flex flex-col justify-cetner items-center text-center p-6 bg-white rounded shadow w-1/6 md:w-full">
				<p class="text-lg font-bold">{props.role}</p>
				<p class="font-light text-gray-500 text-md">{props.name}</p>
				{
					props.affiliation != null
					?   <p class="font-light text-gray-500 text-sm">{props.affiliation}</p>
					:   ""
				}
			</div>
		)
	}

	const officerList = Object.keys(props.data).map((btn_data) =>
		<Div_person name={props.data[btn_data].name} 
					role={props.data[btn_data].role} 
					affiliation={props.data[btn_data].affiliation} />
	)

	return (
		<div class="flex flex-wrap space-x-8 space-y-2">
			<div></div>
			{officerList}
		</div>
	)
}