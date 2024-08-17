function Div_main() {
	return (
		<div class="flex flex-col justify-center items-center w-full">
			<div class="flex flex-col justify-start items-center w-[500px] p-[40px] space-y-[24px]
						sm:w-[380px] sm:p-[16px]">
	
				<div class="text-lg font-bold">
					Sign Up
				</div>
	
				<div class="flex flex-col justify-center items-center text-start w-full space-y-[12px]">
					<Div_textbox id="email" type="text" title="E-mail" function={() => input_checker()} />
					<Div_textbox id="password" type="password" title="Password" function={() => input_checker()} />
					<Div_textbox id="password_confirm" type="password" title="Confirm Password" function={() => input_checker()} />
	
					<div class="flex justify-center items-center w-full py-[20px]"></div>
	
					<Div_textbox id="name" type="text" title="Name" function={() => input_checker()} />
					<Div_textbox id="affiliation" type="text" title="Affiliation" function={() => input_checker()} />
					<Div_textbox id="title" type="text" title="Title" function={() => input_checker()} />
	
					<div class="w-full space-y-[8px]">
						<span class="font-[500] text-[14px] w-full text-start">
							Highest level of education completed
						</span>
		
						<select multiple id="sel_education"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
							<option value="BA" selected >BA / BS</option>
							<option value="MS">MS</option>
							<option value="PHD">PhD</option>
							<option value="Other">Other</option>
						</select>
		
						<div id="desc_education_msg" class="flex flex-row justify-start items-center w-full hidden">
							<span class="text-[#FA5252] text-[12px] font-[500]">테스트</span>
						</div>
					</div>
	
					<Div_textbox id="interest" type="text" title="Field of Interest" function={() => input_checker()} />
	
					<div class="flex justify-center items-center w-full py-[20px]"></div>
	
					<div id="btn_submit" class="w-full">
						<Div_btn_submit class={class_btn_disabled} function={null} text={"Sign Up"} />
					</div>
				</div>
	
				<div class="flex justify-center items-center w-full">
					<svg width="420" height="2" viewBox="0 0 420 2" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 1H420" stroke="#262626"/>
					</svg>
				</div>
				
				<div class="flex flex-row justify-center items-center space-x-[4px] w-full">
					<span class="font-[500] text-[14px]">
						Already have an account? Then please
					</span>
					<a href="/account/"
					class="font-[500] text-[14px] text-blue-700 cursor-pointer hover:underline">
						sign in.
					</a>
				</div>
			</div>
		</div>
	)
}