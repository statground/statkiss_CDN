function Div_skeleton_whom_to_contact() {
	return (
		<div class="flex flex-col justify-center items-start py-8 px-4 mx-auto max-w-screen-xl animate-pulse">
			<div class="max-w-screen-md mb-2">
				<Div_sub_header text={"Whom to contact:"} />
			</div>
		
			<div class="flex flex-row w-full justify-center items-center space-x-12 md:space-x-0 md:flex-col">
				<div class="flex flex-col justify-cetner items-center text-center p-6 bg-white rounded shadow w-1/3 md:w-full space-y-4">
					<div class="h-2.5 bg-gray-300 rounded-full w-48"></div>
					<div class="h-2 bg-gray-300 rounded-full w-full max-w-[360px]"></div>
					<div class="h-2 bg-gray-300 rounded-full w-full max-w-[320px]"></div>
					<div class="h-2 bg-gray-300 rounded-full w-full max-w-[320px]"></div>
				</div>

				<div class="flex flex-col justify-cetner items-center text-center p-6 bg-white rounded shadow w-1/3 md:w-full space-y-4">
					<div class="h-2.5 bg-gray-300 rounded-full w-48"></div>
					<div class="h-2 bg-gray-300 rounded-full w-full max-w-[360px]"></div>
					<div class="h-2 bg-gray-300 rounded-full w-full max-w-[320px]"></div>
					<div class="h-2 bg-gray-300 rounded-full w-full max-w-[320px]"></div>
				</div>
			</div>
		</div>
	)
}