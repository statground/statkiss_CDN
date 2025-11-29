function Div_main() {
	return (
		<div class="flex flex-col justify-start items-center w-[500px] p-[40px] space-y-[24px]
					sm:w-[380px] sm:p-[16px]">

			<div class="text-lg font-bold">
				Login
			</div>

			<div class="flex flex-col justify-center items-center text-start w-full space-y-[12px]">
				<Div_text id="email" type="text" title="E-mail" />
				<Div_text id="password" type="password" title="Password" />

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
			
	
			<div class="flex flex-row justify-center items-center space-x-[10px] w-full">
				<a href="/account/recover/" class="font-[500] text-[14px] cursor-pointer
												   hover:underline">
					Recover Password
				</a>
				<span class="font-[500] text-[14px]">
					|
				</span>
				<a href="/account/signup/" class="font-[500] text-[14px] cursor-pointer
												  hover:underline">
					Sign Up
				</a>
			</div>
		</div>
	)
}