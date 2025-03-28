function set_main() {
	function Div_main() {
        let class_table_cell = "text-center border px-4 py-2"

        

		const Div_sub_donation_header = (props) => (
			<h3 class="font-semibold text-gray-500">
				{props.text}
			</h3>
		);
	
		const checkSvg = () => (
			<svg class="flex-shrink-0 w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
		);

		const Div_li = (props) => (
			<li class="flex items-center space-x-3">
				{checkSvg()}
				{props.text}
			</li>
		);

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
						<Div_sub_header text={"Sponsorship Information & Opportunities:"} />
					</div>
                    
                    <p class="flex items-center space-x-3">
                        We are seeking sponsorship from various entities, including corporations, non-profit organizations, and individuals, to support the Korean International Statistical Society. Contributed funds will help KISS’s operations including student paper/ career development award competitions, networking events, and the annual KISS meeting at the Joint Statistical Meetings (JSM). Your sponsorship will not only showcase your commitment to advancing statistical sciences and supporting the next generation of statisticians but also your dedication to fostering academic and professional excellence in the field. Contributions of any amount are greatly appreciated.
                    </p>
                </div>

                <div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl">
					<div class="max-w-screen-md mb-8">
						<Div_sub_header text={"Sponsorship Benefits:"} />
					</div>
                    
                    <table class="w-full text-left">
                        <thead>
                            <tr>
                                <th class="text-center px-4 py-2 text-gray-500">Benefits</th>
                                <th class="text-center text-purple-900 px-4 py-2 text-gray-500">Platinum<br/>$5,000 or more</th>
                                <th class="text-center text-yellow-600 px-4 py-2 text-gray-500">Gold<br/>$3,000</th>
                                <th class="text-center text-gray-700 px-4 py-2 text-gray-500">Silver<br/>$1,000</th>
                                <th class="text-center text-yellow-900 px-4 py-2 text-gray-500">Bronze<br/>$500<br/>(only available for individuals)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border px-4 py-2">Email Acknowledgment</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Recognition at applicable KISS sponsored sessions at JSM and KSS meeting<br/>(e.g. Sessions on Student Paper Award Winners)</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Acknowledgment on KISS website</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}></td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Organization logo posted on KISS website</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}></td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Organization logo posted on KISS booth at JSM</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}></td>
                                <td class={class_table_cell}></td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Recognition during the annual meeting's opening remarks</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}></td>
                                <td class={class_table_cell}></td>
                            </tr>
                            <tr>
                                <td class="border px-4 py-2">Exclusive networking opportunities during the Annual meeting and reception</td>
                                <td class={class_table_cell}>{checkSvg()}</td>
                                <td class={class_table_cell}></td>
                                <td class={class_table_cell}></td>
                                <td class={class_table_cell}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl">
					<div class="max-w-screen-md mb-8">
						<Div_sub_header text={"How to Sponsor:"} />
					</div>
                    
                    <p class="flex items-center space-x-3">
                        We invite you to support our mission by making a charitable contribution in a form that best suits you. We accept checks and online payments. A tax-deductible gift receipt will be provided for your contribution.
                    </p>
                </div>

				<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl">
					<div class="max-w-screen-md mb-8">
						<Div_sub_header text={"How to donate to KISS:"} />
					</div>
	
					<div class="grid grid-cols-2 items-start md:grid-cols-1 md:space-y-12">
						
						<div class="flex flex-col w-full text-gray-900 px-4 space-y-4">
							<Div_sub_donation_header text={"You can donate to KISS through Paypal or via check. To donate through PayPal, click the button below:"} />
	
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