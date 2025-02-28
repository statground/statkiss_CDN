function Div_table(props) { 
	function Div_thead(props) {
		return (
			<div class="w-full text-xs text-gray-700 uppercase">
				<div class="px-4 py-3">
					<div class="w-full mx-auto text-center">
						<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">{props.title}</h2>
						<p class="mb-8 text-gray-500 lg:text-lg">{props.description}</p>
					</div>
				</div>
			</div>
		)
	}
	
	function Div_tr_skeleton(props) {
		return (
			<div class="flex flex-col border-b px-4 py-3 animate-pulse">
				<div class="flex items-center justify-between">
					<div>
						<div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
						<div class="w-32 h-2 bg-gray-200 rounded-full"></div>
					</div>
					<div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
				</div>
			</div>
		)
	}

	return (
		<div class="w-full">
			<div class="w-full bg-white relative shadow-md sm:rounded-lg overflow-hidden">
				<Div_thead title={props.title} description={props.description} />
				<div id="div_table_tbody">
					<Div_tr_skeleton />
					<Div_tr_skeleton />
					<Div_tr_skeleton />
				</div>
			</div>
			<div class="w-full" id="div_table_pagination"></div>
		</div>

	)
}