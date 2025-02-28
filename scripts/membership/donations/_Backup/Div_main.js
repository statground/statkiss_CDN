function Div_main() {
	function Div_sub_header(props) {
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
					<h2 class="mb-2 text-xl tracking-tight font-extrabold text-gray-900">
						How to donate to KISS:
					</h2>
				</div>

				<div class="grid grid-cols-2 items-start md:grid-cols-1 md:space-y-12">
					
					<div class="flex flex-col w-full text-gray-900 px-4 space-y-4">
						<Div_sub_header text={"You can denote to KISS through Paypal or via check. To donate through PayPal, click the button below:"} />

						<div class="flex w-full justify-center items-baseline my-4">
							<a href="https://www.paypal.com/donate?token=Vgt_NDbHtCK_Zs9eBsPcjNq8AvyMQfcQpr-HcNJWAKN1711reFEJOOwAUubaq_W-dkB2CCodRP6SOnAk"
							   target="_blank">
								<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" />
							</a>
						</div>
					</div>
					
					<div class="flex flex-col w-full text-gray-900 px-4">
						<Div_sub_header text={"To donate through a physical check, please follow the procedure below:"} />
						
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
					<h2 class="mb-2 text-xl tracking-tight font-extrabold text-gray-900">
						Whom to contact:
					</h2>
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
		</div>
	)
}