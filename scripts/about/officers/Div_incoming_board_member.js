function Div_incoming_board_member(props) {
	function Div_person(props) {
		return (
			<li class="flex items-center">
				<svg class="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
				</svg>
				<div class="flex flex-col">
					<span class="text-md text-gray-900">{props.name}</span>
					<span class="text-xs text-gray-500">({props.affiliation})</span>
				</div>
			</li>
		)
	}

	const officerList = Object.keys(props.data).map((btn_data) =>
		<Div_person name={props.data[btn_data].name} affiliation={props.data[btn_data].affiliation} />
	)

	return (
		<div class="max-w-xs">
			<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
				<p class="text-md leading-tight text-gray-700">{props.term}</p>
			</div>

			<ul class="max-w-md space-y-1 text-gray-500 list-inside bg-blue-100 p-4 rounded-lg">
				{officerList}
			</ul>    
		</div>
	)
}