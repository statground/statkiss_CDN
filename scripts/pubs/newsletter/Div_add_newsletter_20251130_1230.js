// =============================================
//  Admin "Add Newsletter" form (with calendar)
// =============================================
function Div_add_newsletter() {
	return (
		<section className="w-full">
			<div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					Add Newsletter
				</h3>

				<div className="flex flex-col gap-4">
					{/* First row: inputs + buttons */}
					<div className="flex flex-wrap items-end gap-4">
						{/* Publish Date */}
						<div className="flex flex-col gap-1">
							<label
								htmlFor="id_publish_date"
								className="text-sm font-medium text-gray-800"
							>
								Publish
								<br />
								Date
							</label>
							<input
								id="id_publish_date"
								name="publish_date"
								type="date"
								className="h-11 w-56 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							/>
						</div>

						{/* Volume */}
						<div className="flex flex-col gap-1">
							<label
								htmlFor="id_volume"
								className="text-sm font-medium text-gray-800"
							>
								Volume
							</label>
							<input
								id="id_volume"
								name="volume"
								type="number"
								min="1"
								className="h-11 w-56 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							/>
						</div>

						{/* Issue */}
						<div className="flex flex-col gap-1">
							<label
								htmlFor="id_issue"
								className="text-sm font-medium text-gray-800"
							>
								Issue
							</label>
							<input
								id="id_issue"
								name="issue"
								type="number"
								min="1"
								className="h-11 w-56 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							/>
						</div>

						{/* Buttons */}
						<div className="ml-auto flex flex-col gap-3">
							<button
								type="button"
								onClick={() =>
									document
										.getElementById("id_file_upload")
										.click()
								}
								className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
							>
								<span className="mr-1.5 text-base">📤</span>
								File Upload
							</button>

							<button
								id="btn_submit_newsletter"
								type="button"
								onClick={click_btn_submit}
								className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
							>
								<span id="btn_submit_label">Submit</span>
								<svg
									id="btn_submit_spinner"
									className="ml-2 h-4 w-4 animate-spin hidden"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
										fill="#E5E7EB"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Selected file row */}
					<div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
						<span className="font-medium text-gray-800">
							Selected File
						</span>
						<span
							id="txt_filename"
							className="max-w-md truncate text-gray-500"
						>
							No file selected
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}