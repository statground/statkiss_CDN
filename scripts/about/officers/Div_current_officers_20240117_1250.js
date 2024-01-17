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
		<div class="py-8 px-4 mx-auto w-full">
			<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
				<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Officers</h2>
				<p class="font-light text-gray-500 sm:text-xl">
					Korean International Statistical Society ({props.term})
				</p>
			</div>

			<div class="flex flex-wrap space-x-8 space-y-2">
				<div></div>
				{officerList}
			</div>
		</div>
	)
}