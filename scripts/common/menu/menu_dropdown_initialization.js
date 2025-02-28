// 메뉴 하위메뉴 모두 닫기
function menu_dropdown_initialization() {
	document.getElementById("mega_menu_dropdown_about").className = "hidden"
	toggle_menu_dropdown_about = 0
	document.getElementById("mega_menu_dropdown_news").className = "hidden"
	toggle_menu_dropdown_news = 0
	document.getElementById("mega_menu_dropdown_publications").className = "hidden"
	toggle_menu_dropdown_publications = 0
	document.getElementById("mega_menu_dropdown_awards").className = "hidden"
	toggle_menu_dropdown_awards = 0
	document.getElementById("mega_menu_dropdown_forums").className = "hidden"
	toggle_menu_dropdown_forums = 0
}