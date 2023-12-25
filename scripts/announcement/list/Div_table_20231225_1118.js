function Div_table(props) { 
	function Div_thead(props) {
		return (
			<thead class="text-xs text-gray-700 uppercase">
				<tr>
					<th scope="col" class="px-4 py-3">
						<div class="mx-auto max-w-screen-lg text-center">
							<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">{props.title}</h2>
							<p class="mb-8 text-gray-500 lg:text-lg">{props.description}</p>
						</div>
					</th>
				</tr>
			</thead>
		)
	}
	
	function Div_tr_skeleton(props) {
		return (
			<tr class="border-b animate-pulse">
				<td class="px-4 py-3">
					<div class="flex items-center justify-between">
						<div>
							<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
							<div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
						</div>
						<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
					</div>
				</td>
			</tr>
		)
	}

	return (
		<div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500">
					<Div_thead title={props.title} description={props.description} />
					<tbody id="div_table_tbody">
						<Div_tr_skeleton />
						<Div_tr_skeleton />
						<Div_tr_skeleton />
					</tbody>
				</table>
			</div>
			<div class="w-full" id="div_table_pagination"></div>
		</div>

	)
}
