function set_main() {
	const Div_skeleton_current_officer = () => (
		<div class="flex flex-col justify-cetner items-center text-center p-6 bg-white rounded shadow w-1/6 md:w-full space-y-4">
			<div class="h-2.5 bg-gray-300 rounded-full w-48"></div>
			<div class="h-2 bg-gray-300 rounded-full w-full max-w-[360px]"></div>
		</div>
	);

	const Div_skeleton_person_list = () => (
		<div class="max-w-xs">
			<ul class="flex flex-col w-full h-[50px] justify-center items-center mb-2 space-y-4">
				{[...Array(3)].map((_, i) => (
					<li key={i} class="flex items-center">
						<div class="flex flex-col">
							<div class="h-2.5 bg-gray-300 rounded-full w-48"></div>
						</div>
					</li>
				))}
			</ul>    
		</div>
	);

	const Div_main = () => (
		<div>
			<section class="bg-gray-50 w-full" id="div_current_officers">
				<div class="py-8 px-4 mx-auto w-full">
					<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
						<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Officers</h2>
						<p class="font-light text-gray-500 sm:text-xl">Korean International Statistical Society</p>
					</div>
					<div class="flex flex-wrap space-x-8 space-y-2 animate-pulse">
						<div></div>
						{[...Array(5)].map((_, i) => <Div_skeleton_current_officer key={i} />)}
					</div>
				</div>
			</section>

			<div class="px-4 mx-auto max-w-screen-xl py-8">
				<h2 class="mb-8 text-2xl font-bold text-gray-900">Board of Directors</h2>
				<div class="flex flex-col w-full space-y-8">
					<div id="div_board_of_directors" class="w-full">
						<Div_skeleton_person_list />
					</div>
				</div>
			</div>

			<div id="div_incoming_board_member"></div>
		</div>
	);

	ReactDOM.render(<Div_main />, document.getElementById("div_main"));
	get_officer_list();
}