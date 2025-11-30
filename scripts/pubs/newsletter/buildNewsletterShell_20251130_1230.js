// =============================================
//  Shell for filters + archive
// =============================================
function buildNewsletterShell() {
	const root = document.getElementById("div_newsletters");
	if (!root) return;

	root.innerHTML = `
		<section class="bg-gray-50">
		<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6 space-y-4">
			<div class="flex flex-wrap items-center justify-between gap-3">
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-xs font-medium uppercase tracking-wide text-gray-500">
				FILTER BY 5-YEAR RANGE
				</span>
				<div id="yearFilters" class="flex flex-wrap gap-2"></div>
			</div>
			<div class="relative">
				<span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-gray-400">
				🔎
				</span>
				<input id="txt_newsletter_search"
					type="text"
					placeholder="Search by title, volume, issue..."
					class="w-64 rounded-full border border-gray-300 bg-white pl-8 pr-3 py-1.5 text-xs text-gray-900 outline-none ring-0 transition
							focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
			</div>
			</div>

			<div id="archiveContainer"
				class="space-y-6 bg-white p-4 rounded-2xl shadow-sm ring-1 ring-gray-200">
			</div>
		</div>
		</section>
	`;

	const searchInput = document.getElementById("txt_newsletter_search");
	if (searchInput) {
		searchInput.addEventListener("input", (e) => {
			searchQuery = e.target.value.trim().toLowerCase();
			renderNewsletterList();
		});
	}

	renderYearFilters();
}