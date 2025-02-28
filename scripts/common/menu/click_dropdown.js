function click_dropdown(id) {
	let class_div_sub_menu_pc = "mt-1 bg-white border-gray-200 shadow-sm border-y block md:hidden"
	let class_div_sub_menu_mobile = "flex flex-col w-full justify-center items-start px-[30px] pt-[10px] pb-[20px] space-y-4 border-b-4"

	if (id == "about" && !toggle_menu_about) {
		document.getElementById("div_megamenu_about").className = class_div_sub_menu_pc
		document.getElementById("div_menu_mobile_about").className = class_div_sub_menu_mobile
		toggle_menu_about = true
	} else {
		document.getElementById("div_megamenu_about").className = "hidden"
		document.getElementById("div_menu_mobile_about").className = "hidden"
		toggle_menu_about = false
	}

	if (id == "news" && !toggle_menu_news) {
		document.getElementById("div_megamenu_news").className = class_div_sub_menu_pc
		document.getElementById("div_menu_mobile_news").className = class_div_sub_menu_mobile
		toggle_menu_news = true
	} else {
		document.getElementById("div_megamenu_news").className = "hidden"
		document.getElementById("div_menu_mobile_news").className = "hidden"
		toggle_menu_news = false
	}

	if (id == "publications" && !toggle_menu_publications) {
		document.getElementById("div_megamenu_publications").className = class_div_sub_menu_pc
		document.getElementById("div_menu_mobile_publications").className = class_div_sub_menu_mobile
		toggle_menu_publications = true
	} else {
		document.getElementById("div_megamenu_publications").className = "hidden"
		document.getElementById("div_menu_mobile_publications").className = "hidden"
		toggle_menu_publications = false
	}

	if (id == "awards" && !toggle_menu_awards) {
		document.getElementById("div_megamenu_awards").className = class_div_sub_menu_pc
		document.getElementById("div_menu_mobile_awards").className = class_div_sub_menu_mobile
		toggle_menu_awards = true
	} else {
		document.getElementById("div_megamenu_awards").className = "hidden"
		document.getElementById("div_menu_mobile_awards").className = "hidden"
		toggle_menu_awards = false
	}

	if (id == "forums" && !toggle_menu_forums) {
		document.getElementById("div_megamenu_forums").className = class_div_sub_menu_pc
		document.getElementById("div_menu_mobile_forums").className = class_div_sub_menu_mobile
		toggle_menu_forums = true
	} else {
		document.getElementById("div_megamenu_forums").className = "hidden"
		document.getElementById("div_menu_mobile_forums").className = "hidden"
		toggle_menu_forums = false
	}

	if (id == "donations" && !toggle_menu_donations) {
		document.getElementById("div_megamenu_donations").className = class_div_sub_menu_pc
		document.getElementById("div_menu_mobile_donations").className = class_div_sub_menu_mobile
		toggle_menu_donations = true
	} else {
		document.getElementById("div_megamenu_donations").className = "hidden"
		document.getElementById("div_menu_mobile_donations").className = "hidden"
		toggle_menu_donations = false
	}
}
