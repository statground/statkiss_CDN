function Div_main() {
	function Div_sub_header(props) {
		return (
			<h2 class="mb-2 text-xl tracking-tight font-extrabold text-gray-900">
				{props.text}
			</h2>
		)
	}

	function Div_sub_donation_header(props) {
		return (
			<h3 class="font-semibold text-gray-500">
				{props.text}
			</h3>
		)
	}

	function Div_li(props) {
		return (
			<li class="flex items-center space-x-3">
				<svg class="flex-shrink-0 w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
				{props.text}
			</li>
		)
	}

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
		let class_icon = "mx-auto mb-4 w-12 h-12 rounded-lg"

		return (
			<div class="text-center text-gray-500">
				{
					props.type == "personal"
					? <svg class={class_icon} fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M10.31,9.12H5.5A4.52,4.52,0,0,0,1,13.62,2.34,2.34,0,0,0,1,14H14.78a2.34,2.34,0,0,0,0-.38A4.51,4.51,0,0,0,10.31,9.12ZM8,7.88A3.94,3.94,0,1,0,4.06,3.94,3.94,3.94,0,0,0,8,7.88Z"></path> </g> </g></svg>
					: ""
				}
				{
					props.type == "company"
					? <svg class={class_icon} fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11,3a1,1,0,0,0-1-1H3A1,1,0,0,0,2,3V22h9ZM9,18H4V16H9Zm0-4H4V12H9Zm0-4H4V8H9ZM9,6H4V4H9ZM21,8H14a1,1,0,0,0-1,1V22h9V9A1,1,0,0,0,21,8ZM17,20H15V18h2Zm0-4H15V14h2Zm0-4H15V10h2Zm3,8H18V18h2Zm0-4H18V14h2Zm0-4H18V10h2Z"></path></g></svg>
					: ""
				}
				{
					props.type == "government"
					? <svg class={class_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M20 6h3v2h-1v11h1v2H1v-2h1V8H1V6h3V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2zm0 2H4v11h3v-7h2v7h2v-7h2v7h2v-7h2v7h3V8zM6 5v1h12V5H6z"></path> </g> </g></svg>
					: ""
				}
				
				<h5 class="mb-1 text-xl font-bold tracking-tight text-gray-900">
					{props.name}
				</h5>
				<p class="font-light text-gray-500 text-xs mb-1">
					{props.affiliation}
				</p>
				<p class="font-light text-gray-500 text-md mb-1">
					{props.amount}
				</p>
				<p class="font-light text-gray-500 text-xs mb-1">
					{props.comment}
				</p>
			</div>
		)
	}

	return (
		<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
			<div class="mx-auto max-w-screen-lg text-center">
				<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">
					Donations
				</h2>
				<p class="mb-8 text-gray-500 lg:text-lg">
					Your donation will help the Society continue in our mission, allow us to make improvements, and fund awards for students and young researchers.
				</p>
			</div>

			<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl">
				<div class="max-w-screen-md mb-8">
					<Div_sub_header text={"How to donate to KISS:"} />
				</div>

				<div class="grid grid-cols-2 items-start md:grid-cols-1 md:space-y-12">
					
					<div class="flex flex-col w-full text-gray-900 px-4 space-y-4">
						<Div_sub_donation_header text={"You can denote to KISS through Paypal or via check. To donate through PayPal, click the button below:"} />

						<div class="flex w-full justify-center items-baseline my-4">
							<a href="https://www.paypal.com/donate?token=Vgt_NDbHtCK_Zs9eBsPcjNq8AvyMQfcQpr-HcNJWAKN1711reFEJOOwAUubaq_W-dkB2CCodRP6SOnAk"
							   target="_blank">
								<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" />
							</a>
						</div>
					</div>
					
					<div class="flex flex-col w-full text-gray-900 px-4">
						<Div_sub_donation_header text={"To donate through a physical check, please follow the procedure below:"} />
						
						<ul role="list" class="my-8 space-y-4 text-left">
							<Div_li text={"Please Inform the president (or the finance director) that you are willing to make a donation. Please see below for the contact information."} />
							<Div_li text={"The president (or the finance director) will inform you where a check can be sent to."} />
							<Div_li text={"After receiving the donation, the president will send you an acknowledgement letter with the tax information so that the contribution can be tax deductible."} />
						</ul>
					</div>
				</div>
			</div>


			<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl">
				<div class="max-w-screen-md mb-2">
					<Div_sub_header text={"Whom to contact:"} />
				</div>

				<div class="flex flex-row w-full justify-center items-center space-x-12 md:space-x-0 md:flex-col">
					<Div_person name={"Jae-Kwang Kim"}
								role={"President"}
								affiliation={"Iowa State University"}
								email={"jkim@iastate.edu"} />
					<Div_person name={"Hang J. Kim"}
								role={"Finance Director"}
								affiliation={"University of Cincinnati"}
								email={"kim3h4@ucmail.uc.edu"} />
				</div>
			</div>


			<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl space-y-8">
				<div class="max-w-screen-md mb-2">
					<Div_sub_header text={"Our sincere appreciation for your generous donations to KISS!"} />
				</div>

				<div class="flex flex-col w-full justify-center items-center">
					<Div_year year={"2023"} />

					<div class="grid grid-cols-6 w-full sm:grid-cols-2 md:grid-cols-4">
						<Div_donator name={"Dr. Ji-Hyun Lee"} type="personal" amount={"$500"} affiliation={"University of Florida"} />
						<Div_donator name={"Dr. Jae Kwang Kim"} type="personal" amount={"$600"} affiliation={"Iowa State University"} />
						<Div_donator name={"Statistical Ground Corp."} type="company" amount={"$1,000"} />
						<Div_donator name={"Statistics Korea"} type="government" amount={"$3,000"} />
					</div>
				</div>

				<div class="flex flex-col w-full justify-center items-center">
					<Div_year year={"2022"} />

					<div class="grid grid-cols-6 w-full sm:grid-cols-2 md:grid-cols-4">
						<Div_donator name={"Statistics Korea"} type="government" amount={"$3,000"} />
						<Div_donator name={"Dr. Ji-Hyun Lee"} type="personal" amount={"$500"} affiliation={"University of Florida"}
									 comment={"In memory of my parents who taught their daughters the value of education and helping others"} />
					</div>
				</div>

				<div class="flex flex-col w-full justify-center items-center">
					<Div_year year={"2021"} />

					<div class="grid grid-cols-6 w-full sm:grid-cols-2 md:grid-cols-4">
						<Div_donator name={"Dr. Jae Kwang Kim"} type="personal" amount={"$1,000"} affiliation={"Iowa State University"} />
					</div>
				</div>

				<div class="flex flex-col w-full justify-center items-center">
					<Div_year year={"2019"} />

					<div class="grid grid-cols-6 w-full sm:grid-cols-2 md:grid-cols-4">
						<Div_donator name={"Statistics Korea"} type="government" amount={"$3,000"} />
						<Div_donator name={"Dr. Eun Suk Park"} type="personal" amount={"$1,000"} affiliation={"Texas A&M Transportation Institute"} />
					</div>  
				</div>
			</div>
		</div>
	)
}