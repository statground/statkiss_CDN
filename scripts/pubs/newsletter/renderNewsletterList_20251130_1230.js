// =============================================
//  Render archive list (filters + search)
// =============================================
function renderNewsletterList() {
	const container = document.getElementById("archiveContainer");
	if (!container) return;

	let list = [...newsletterItems];

	// 5-year filter
	if (activeRange) {
		list = list.filter(
			(n) => n.year <= activeRange.from && n.year >= activeRange.to
		);
	}

	// Search (publish_date, volume, issue)
	if (searchQuery) {
		list = list.filter((n) => {
			const title = (n.publish_date || "").toLowerCase();
			const v = n.volume != null ? String(n.volume) : "";
			const i = n.issue != null ? String(n.issue) : "";
			return (
				title.includes(searchQuery) ||
				v.includes(searchQuery) ||
				i.includes(searchQuery)
			);
		});
	}

	// Group by year
	const byYear = {};
	list.forEach((n) => {
		(byYear[n.year] = byYear[n.year] || []).push(n);
	});
	const years = Object.keys(byYear)
		.map((y) => parseInt(y, 10))
		.sort((a, b) => b - a);

	container.innerHTML = "";

	if (years.length === 0) {
		const empty = document.createElement("p");
		empty.className = "py-16 text-center text-sm text-gray-500";
		empty.textContent =
			"No newsletters found for the selected filters.";
		container.appendChild(empty);
		return;
	}

	years.forEach((year) => {
		const section = document.createElement("section");
		section.className = "space-y-3";

		const header = document.createElement("div");
		header.className = "flex items-center justify-between gap-2";

		const title = document.createElement("h2");
		title.className = "text-sm font-semibold text-gray-800";
		title.textContent = year;

		const count = document.createElement("span");
		count.className =
			"rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600";
		count.textContent = `${byYear[year].length} issue(s)`;

		header.appendChild(title);
		header.appendChild(count);

		const grid = document.createElement("div");
		grid.className =
			"grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2";

		byYear[year].forEach((item) => {
			const card = document.createElement("article");
			card.className =
				"group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white/90 p-4 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md";

			const body = document.createElement("div");
			body.className = "space-y-1.5";

			const link = document.createElement("a");
			link.href = "/" + item.url_file;
			link.target = "_blank";
			link.className =
				"block text-[13px] font-semibold text-gray-900 group-hover:text-blue-600";
			link.textContent = item.publish_date;

			const meta = document.createElement("p");
			meta.className = "text-xs text-gray-500";

			const volText =
				item.volume != null ? `Volume ${item.volume}` : "";
			const issueText =
				item.issue != null ? `Issue ${item.issue}` : "";
			meta.textContent =
				volText && issueText
					? `${volText}, ${issueText}`
					: volText || issueText || "";

			body.appendChild(link);
			body.appendChild(meta);

			const footer = document.createElement("div");
			footer.className =
				"mt-4 flex items-center justify-between gap-3 text-xs";

			const left = document.createElement("div");
			left.className = "flex items-center gap-2 text-gray-400";
			left.innerHTML =
				'<span class="text-base">📄</span><span>PDF</span>';

			footer.appendChild(left);

			if (isAdmin && typeof click_btn_delete === "function") {
				const deleteBtn = document.createElement("button");
				deleteBtn.type = "button";
				deleteBtn.className =
					"inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-600 hover:bg-red-100";
				deleteBtn.innerHTML = "🗑 Delete";
				deleteBtn.addEventListener("click", () =>
					click_btn_delete(item.uuid)
				);
				footer.appendChild(deleteBtn);
			}

			card.appendChild(body);
			card.appendChild(footer);
			grid.appendChild(card);
		});

		section.appendChild(header);
		section.appendChild(grid);
		container.appendChild(section);
	});
}