function Div_main_tab() {
	let class_tab_active = "inline-block px-4 py-3 w-36 text-white bg-blue-400 rounded-l-lg active cursor-pointer md:rounded-t-lg md:px-0 md:w-18"
	let class_tab_inactive = "inline-block px-4 py-3 w-36 bg-gray-100 rounded-l-lg cursor-pointer hover:text-gray-900 hover:bg-gray-200 md:rounded-t-lg md:px-0 md:w-18"

	function click_tab(tab) {
		if (tab == "tab_kiss_event") {
			document.getElementById("tab_kiss_event").className = class_tab_active
			document.getElementById("tab_advertisement").className = class_tab_inactive
			document.getElementById("tab_member_news").className = class_tab_inactive
			document.getElementById("tab_job_related_news").className = class_tab_inactive

			document.getElementById("div_tab_kiss_event").className = "md:w-full"
			document.getElementById("div_tab_advertisement").className = "hidden"
			document.getElementById("div_tab_member_news").className = "hidden"
			document.getElementById("div_tab_job_related_news").className = "hidden"

		} else if (tab == "tab_advertisement") {
			document.getElementById("tab_kiss_event").className = class_tab_inactive
			document.getElementById("tab_advertisement").className = class_tab_active
			document.getElementById("tab_member_news").className = class_tab_inactive
			document.getElementById("tab_job_related_news").className = class_tab_inactive

			document.getElementById("div_tab_kiss_event").className = "hidden"
			document.getElementById("div_tab_advertisement").className = "md:w-full"
			document.getElementById("div_tab_member_news").className = "hidden"
			document.getElementById("div_tab_job_related_news").className = "hidden"

		} else if (tab == "tab_member_news") {
			document.getElementById("tab_kiss_event").className = class_tab_inactive
			document.getElementById("tab_advertisement").className = class_tab_inactive
			document.getElementById("tab_member_news").className = class_tab_active
			document.getElementById("tab_job_related_news").className = class_tab_inactive

			document.getElementById("div_tab_kiss_event").className = "hidden"
			document.getElementById("div_tab_advertisement").className = "hidden"
			document.getElementById("div_tab_member_news").className = "md:w-full"
			document.getElementById("div_tab_job_related_news").className = "hidden"

		} else if (tab == "tab_job_related_news") {
			document.getElementById("tab_kiss_event").className = class_tab_inactive
			document.getElementById("tab_advertisement").className = class_tab_inactive
			document.getElementById("tab_member_news").className = class_tab_inactive
			document.getElementById("tab_job_related_news").className = class_tab_active

			document.getElementById("div_tab_kiss_event").className = "hidden"
			document.getElementById("div_tab_advertisement").className = "hidden"
			document.getElementById("div_tab_member_news").className = "hidden"
			document.getElementById("div_tab_job_related_news").className = "md:w-full"

		}
	}

	return (
		<ul class="flex flex-col text-sm font-medium text-center text-gray-500 md:grid md:grid-cols-2">
			<li>
				<p class={class_tab_active} id="tab_kiss_event" onClick={() => click_tab("tab_kiss_event")}>
					KISS Event
				</p>
			</li>
			<li>
				<p class={class_tab_inactive} id="tab_advertisement" onClick={() => click_tab("tab_advertisement")}>
					Advertisement
				</p>
			</li>
			<li>
				<p class={class_tab_inactive} id="tab_member_news" onClick={() => click_tab("tab_member_news")}>
					Member News
				</p>
			</li>
			<li>
				<p class={class_tab_inactive} id="tab_job_related_news" onClick={() => click_tab("tab_job_related_news")}>
					Job Related Ads.
				</p>
			</li>
		</ul>
	)
}