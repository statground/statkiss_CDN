// =============================================
//  Main layout
// =============================================
function set_main() {
	function Div_main() {
		return (
			<div className="flex flex-col w-full max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24 space-y-6">
				{/* Header */}
				<div className="text-center" id="div_header">
					<h2 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
						Newsletter
					</h2>
					<p></p>
				</div>

				{/* Admin form area */}
				<div id="div_add_newsletter" className="w-full"></div>

				{/* List area (initial skeleton) */}
				<div id="div_newsletters">
					<section className="bg-gray-50 animate-pulse">
						<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
							<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
								{Array.from({ length: 8 }).map((_, idx) => (
									<div
										key={idx}
										className="flex flex-col bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 space-y-3"
									>
										<div className="h-8 w-8 rounded bg-gray-200" />
										<div className="h-4 w-3/4 rounded bg-gray-200" />
										<div className="h-3 w-1/2 rounded bg-gray-200" />
									</div>
								))}
							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}

	ReactDOM.render(<Div_main />, document.getElementById("div_main"));

	// Admin area + list
	get_div_add_newsletter();
	get_list_newsletter();
}