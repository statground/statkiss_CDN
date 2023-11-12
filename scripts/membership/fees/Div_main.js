function Div_main() {
	function Div_li(props) {
		return (
			<li class="flex items-center space-x-3">
				<svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
				<span>
					{props.text}
				</span>
			</li>
		)
	}

	return (
		<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

			<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
				<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
					Fees
				</h2>
				<p class="mb-5 font-light text-gray-500 sm:text-xl">
					Descriptions
				</p>
			</div>

			<div class="grid grid-cols-2">
				
				<div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-3/4 h-full">
					<h3 class="mb-4 text-2xl font-semibold">Regular Member</h3>
					<p class="font-light text-gray-500 sm:text-lg">
						Description
					</p>
					<div class="flex justify-center items-baseline my-8">
						<span class="mr-2 text-5xl font-extrabold">$70</span>
						<span class="text-gray-500">/year</span>
					</div>
					
					<ul role="list" class="mb-8 space-y-4 text-left">
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
					</ul>
					<div class="flex w-full justify-center items-baseline my-4">
						<a href="https://www.paypal.com/donate?token=Vgt_NDbHtCK_Zs9eBsPcjNq8AvyMQfcQpr-HcNJWAKN1711reFEJOOwAUubaq_W-dkB2CCodRP6SOnAk"
						   target="_blank">
							<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" />
						</a>
					</div>
				</div>
				
				<div class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-3/4 h-full">
					<h3 class="mb-4 text-2xl font-semibold">Student Member</h3>
					<p class="font-light text-gray-500 sm:text-lg">
						Description
					</p>
					<div class="flex justify-center items-baseline my-8">
						<span class="mr-2 text-5xl font-extrabold">Free</span>
					</div>

					<ul role="list" class="mb-8 space-y-4 text-left">
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
						<Div_li text={"Description"} />
					</ul>
				</div>
			</div>
		</div>
	)
}