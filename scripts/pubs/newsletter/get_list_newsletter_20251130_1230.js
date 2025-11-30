// =============================================
//  Fetch list + normalize
// =============================================
async function get_list_newsletter() {
	data_newsletter = await fetch("/pubs/ajax_get_newsletter")
		.then((res) => res.json())
		.then((res) => res);

	let rawList = [];

	if (Array.isArray(data_newsletter)) {
		rawList = data_newsletter;
	} else if (data_newsletter && Array.isArray(data_newsletter.list)) {
		rawList = data_newsletter.list;
	} else if (data_newsletter && Array.isArray(data_newsletter.all)) {
		rawList = data_newsletter.all;
	} else if (data_newsletter && typeof data_newsletter === "object") {
		rawList = Object.values(data_newsletter);
	}

	newsletterItems = rawList
		.map((item) => {
			let year = null;

			if (item.publish_date) {
				const m = String(item.publish_date).match(/(19|20)\d{2}/);
				if (m) year = parseInt(m[0], 10);
			}

			return {
				uuid: item.uuid,
				publish_date: item.publish_date,
				volume: item.volume,
				issue: item.issue,
				url_file: item.url_file,
				year: year,
			};
		})
		.filter((x) => x.year !== null);

	newslettersLoaded = true;

	buildNewsletterShell();
	renderNewsletterList();
}