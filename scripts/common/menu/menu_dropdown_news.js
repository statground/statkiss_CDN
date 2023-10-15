// News
function menu_dropdown_news() {
	document.getElementById("mega_menu_dropdown_about").className = "hidden"
	toggle_menu_dropdown_about = 0
	document.getElementById("mega_menu_dropdown_publications").className = "hidden"
	toggle_menu_dropdown_publications = 0
	document.getElementById("mega_menu_dropdown_awards").className = "hidden"
	toggle_menu_dropdown_awards = 0
	document.getElementById("mega_menu_dropdown_forums").className = "hidden"
	toggle_menu_dropdown_forums = 0

	if (toggle_menu_dropdown_news == 0) {
		document.getElementById("mega_menu_dropdown_news").className = "absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-2"
		toggle_menu_dropdown_news = 1
	} else {
		document.getElementById("mega_menu_dropdown_news").className = "hidden"
		toggle_menu_dropdown_news = 0
	}
}