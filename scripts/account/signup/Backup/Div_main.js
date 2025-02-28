function Div_main() {
	return (
		<div class="flex flex-col justify-start items-center w-[500px] p-[40px] space-y-[24px]
					sm:w-[380px] sm:p-[16px]">

			<div class="text-lg font-bold">
				Sign Up
			</div>

			<div class="flex flex-col justify-center items-center text-start w-full space-y-[12px]">
				<Div_text id="email" type="text" title="E-mail" />
				<Div_text id="password" type="password" title="Password" />
				<Div_text id="password_confirm" type="password" title="Confirm Password" />

				<div class="flex justify-center items-center w-full py-[20px] "></div>

				<Div_text id="name" type="text" title="Name" />
				<Div_text id="affiliation" type="text" title="Affiliation" />
				<Div_text id="title" type="text" title="Title" />

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

				<Div_text id="interest" type="text" title="Field of Interest" />

				<div class="flex justify-center items-center w-full py-[20px] "></div>

				<button type="button" 
						class="text-white bg-blue-500 font-medium rounded-xl text-sm w-full h-[48px]
							hover:bg-blue-400
							focus:border focus:border-[#FFFFFF]">
					Login
				</button>
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
	)
}