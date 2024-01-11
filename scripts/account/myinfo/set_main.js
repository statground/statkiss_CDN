function set_main() {
	function Div_main() {
		return (
			<div class="flex flex-col justify-center items-center w-full">
				<div class="flex flex-col justify-start items-center w-[500px] p-[40px] space-y-[24px]
							sm:w-[380px] sm:p-[16px]">
		
					<div class="text-lg font-bold">
						My Info.
					</div>
		
					<div class="flex flex-col justify-center items-center text-start w-full space-y-[12px]">
						<div class="w-full space-y-[8px]">
							<span class="font-[500] text-[14px] w-full text-start">
								E-mail
							</span>
							<input type="text" id="txt_email"
								   class="bg-gray-100 border border-gray-900 text-gray-900 text-sm rounded-xl w-full cursor-not-allowed
										  focus:ring-gray-200 focus:border-gray-200" placeholder="" disabled />
						</div>

						<Div_textbox id="name" type="text" title="Name" function={() => input_checker()} />

						<div class="w-full space-y-[8px]">
							<span class="font-[500] text-[14px] w-full text-start">
								Gender
							</span>
			
							<select id="sel_gender"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>

						<Div_textbox id="affiliation" type="text" title="Affiliation" function={() => input_checker()} />
						<Div_textbox id="title" type="text" title="Title" function={() => input_checker()} />
		
						<div class="w-full space-y-[8px]">
							<span class="font-[500] text-[14px] w-full text-start">
								Highest level of education completed
							</span>
			
							<select multiple id="sel_education"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
								<option value="BA" >BA / BS</option>
								<option value="MS">MA / MS</option>
								<option value="PHD">PhD</option>
								<option value="Other">Other</option>
							</select>
						</div>
		
						<Div_textbox id="interest" type="text" title="Field of Interest" function={() => input_checker()} />
		
						<div class="flex justify-center items-center w-full py-[20px]"></div>
		
						<div id="btn_submit" class="w-full">
							<Div_btn_submit class={class_btn_disabled} function={null} text={"Confirm"} />
						</div>
					</div>
		
					<div class="flex justify-center items-center w-full">
						<svg width="420" height="2" viewBox="0 0 420 2" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 1H420" stroke="#262626"/>
						</svg>
					</div>
					
					<div class="flex flex-row justify-center items-center space-x-[4px] w-full">
						<span class="font-[500] text-[14px]">
							Do you want to change password?
						</span>
						<a href="/account/recover/"
						class="font-[500] text-[14px] text-blue-700 cursor-pointer hover:underline">
							Recover Password
						</a>
					</div>
				</div>
			</div>
		)
	}

	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
	get_userinfo()
}