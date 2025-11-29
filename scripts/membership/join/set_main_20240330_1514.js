function set_main() {
	function Div_main() {
		let class_card = "flex flex-col p-4 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-full h-full hover:bg-blue-100"

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

		function Div_sub_title(props) {
			return (
				<div>
					<h3 class="mb-4 text-2xl font-semibold">{props.title}</h3>
					<div class="flex justify-center items-baseline my-8">
						<span class="mr-2 text-5xl font-extrabold text-blue-900">{props.price}</span>
						{
							props.price != "Free" && props.title != "Lifetime Member"
							?   <span class="text-xl text-gray-500">/year</span>
							:   ""
						}
					</div>
				</div>
			)
		}

		return (
			<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 space-y-4">
	
				<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
						Join
					</h2>
				</div>

				<Div_sub_donation_header text={"You can join to KISS membership through Paypal or via check."} />

				<div class="grid grid-cols-2 w-full text-gray-900 px-4 gap-4 md:grid-cols-1">
					<div class={class_card}>
						<Div_sub_title title={"Regular Member"} price={"$30"} />
						
						<div class="flex w-full justify-center items-baseline">
							<form action="https://www.paypal.com/donate" method="post">
								<input type="hidden" name="business" value="info@statkiss.org" />
								<input type="hidden" name="item_name" value="Regular Member" />
								<input type="hidden" name="amount" value="30" />
								<input type="hidden" name="currency_code" value="USD" />
								<button type="submit" class="bg-yellow-400 font-extrabold rounded-full text-sm px-5 py-1 me-2 mb-2 shadow
															 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300">
									Register
								</button>
								<img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />   
							</form>
						</div>
					</div>

					<div class={class_card}>
						<Div_sub_title title={"Lifetime Member"} price={"$300"} />
						
						<div class="flex w-full justify-center items-baseline">
							<form action="https://www.paypal.com/donate" method="post">
								<input type="hidden" name="business" value="info@statkiss.org" />
								<input type="hidden" name="item_name" value="Lifetime Member" />
								<input type="hidden" name="amount" value="300" />
								<input type="hidden" name="currency_code" value="USD" />
								<button type="submit" class="bg-yellow-400 font-extrabold rounded-full text-sm px-5 py-1 me-2 mb-2 shadow
															 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300">
									Register
								</button>
								<img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />   
							</form>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-3 w-full text-gray-900 px-4 gap-4 md:grid-cols-1">
					<div class={class_card}>
						<Div_sub_title title={"Spouse Member"} price={"$10"} />
						
						<div class="flex w-full justify-center items-baseline">
							<form action="https://www.paypal.com/donate" method="post">
								<input type="hidden" name="business" value="info@statkiss.org" />
								<input type="hidden" name="item_name" value="Spouse Member" />
								<input type="hidden" name="amount" value="10" />
								<input type="hidden" name="currency_code" value="USD" />
								<button type="submit" class="bg-yellow-400 font-extrabold rounded-full text-sm px-5 py-1 me-2 mb-2 shadow
															 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300">
									Register
								</button>
								<img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />   
							</form>
						</div>
					</div>

					<div class={class_card}>
						<Div_sub_title title={"KSS Joint Member"} price={"$10"} />
						
						<div class="flex w-full justify-center items-baseline">
							<form action="https://www.paypal.com/donate" method="post">
								<input type="hidden" name="business" value="info@statkiss.org" />
								<input type="hidden" name="item_name" value="KSS Joint Member" />
								<input type="hidden" name="amount" value="10" />
								<input type="hidden" name="currency_code" value="USD" />
								<button type="submit" class="bg-yellow-400 font-extrabold rounded-full text-sm px-5 py-1 me-2 mb-2 shadow
															 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300">
									Register
								</button>
								<img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />   
							</form>
						</div>
					</div>
					
					<div class={class_card}>
						<Div_sub_title title={"Student Member"} price={"Free"} />
					</div>
				</div>

			</div>
		)
	}

	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
}