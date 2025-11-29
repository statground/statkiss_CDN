async function get_whom_to_contact_list() {

	function Div_whom_to_contact(props) {
		function Div_person(props) {
			return (
				<div class="flex flex-col justify-cetner items-center text-center p-6 bg-white rounded shadow w-1/3 md:w-full">
					<p class="text-lg font-bold">{props.role}</p>
					<p class="font-light text-gray-500 text-md">{props.name}</p>
					<p class="font-light text-gray-500 text-sm">{props.affiliation}</p>
					<p class="font-light text-blue-500 text-sm">{props.email}</p>
				</div>
			)
		}

		const personList = Object.keys(props.data).map((btn_data) =>
			<Div_person name={props.data[btn_data].name}
						role={props.data[btn_data].role}
						affiliation={props.data[btn_data].affiliation}
						email={props.data[btn_data].email} />
		)

		
		return (
			<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl">
				<div class="max-w-screen-md mb-2">
					<Div_sub_header text={"Whom to contact:"} />
				</div>
			
				<div class="flex flex-row w-full justify-center items-center space-x-12 md:space-x-0 md:flex-col">
					{personList}
				</div>
			</div>
		)
	}
	

	const data = await fetch("/membership/ajax_get_whom_to_contact/")
					  .then(res=> { return res.json(); })
					  .then(res=> { return res; });        
	
	ReactDOM.render(<Div_whom_to_contact data={data} />, document.getElementById("div_whom_to_contact"))
}