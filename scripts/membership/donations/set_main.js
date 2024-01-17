function set_main() {
	function Div_main() {
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
								<form action="https://www.paypal.com/donate" method="post" target="_top">
									<input name="hosted_button_id" type="hidden" value="WSLH4UUGTM8ZL" />
									<input alt="Donate with PayPal button" border="0" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" title="PayPal - The safer, easier way to pay online!" type="image" /> 
									<img alt="" border="0" height="1" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" />
								</form>
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
	
	
				<div class="w-full" id="div_whom_to_contact">
					<Div_skeleton_whom_to_contact />
				</div>

				<div class="w-full" id="div_generous_donations">
					<Div_skeleton_generous_donations />
				</div>

			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_main />, document.getElementById("div_main"))

	get_whom_to_contact_list()
	get_generous_donations_list()
}