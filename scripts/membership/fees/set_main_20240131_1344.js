function set_main() {
	function Div_main() {
		let class_card = "flex flex-col p-4 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-full h-full hover:bg-yellow-100"

		function Div_sub_title(props) {
			return (
				<div>
					<h3 class="mb-4 text-2xl font-semibold">{props.title}</h3>
					<div class="flex justify-center items-baseline my-8">
						<span class="mr-2 text-5xl font-extrabold text-blue-900">{props.price}</span>
						{
							props.price != "Free"
							?   <span class="text-xl text-gray-500">/year</span>
							:   ""
						}
					</div>
				</div>
			)
		}

		return (
			<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
	
				<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
						Fees
					</h2>
				</div>
	
				<div class="grid grid-cols-3 gap-4 md:grid-cols-1">
					
					<div class={class_card}>
						<Div_sub_title title={"Regular Membership"} price={"$30"} />
						
						<div class="flex w-full justify-center items-baseline">
							<form action="https://www.paypal.com/donate" method="post">
								<input type="hidden" name="business" value="info@statkiss.org" />
								<input type="hidden" name="item_name" value="Regular Membership" />
								<input type="hidden" name="amount" value="30" />
								<input type="hidden" name="currency_code" value="USD" />
								<input type="image" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate" />
								<img alt="" width="1" height="1" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />   
							</form>
						</div>
					</div>

					<div class={class_card}>
						<Div_sub_title title={"Lifetime membership"} price={"$300"} />
						
						<div class="flex w-full justify-center items-baseline">
							<form action="https://www.paypal.com/donate" method="post">
								<input type="hidden" name="business" value="info@statkiss.org" />
								<input type="hidden" name="item_name" value="Lifetime Membership Member" />
								<input type="hidden" name="amount" value="300" />
								<input type="hidden" name="currency_code" value="USD" />
								<input type="image" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" alt="Donate" />
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