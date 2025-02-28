function Div_table(props) {        
	return (
		<div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500">
					<Div_thead title={props.title} description={props.description} />
					<tbody id="tbody"></tbody>
				</table>
			</div>
			<div class="w-full" id="div_table_pagination">
				<Div_pagination />
			</div>
		</div>

	)
}