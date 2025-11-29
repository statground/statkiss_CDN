function Div_board_of_directors(props) {
	function Div_sub(props) {
		function Div_person(props) {
			return (
				<li class="flex items-center">
					<svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"></path> </g></svg>
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
	
				<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
					{officerList}
				</ul>    
			</div>
		)

	}

	const subList = Object.keys(props.data).map((btn_data) =>
		<Div_sub term={btn_data} data={props.data[btn_data]} />
	)

	return (
		<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
			{subList}
		</div>
	)
}