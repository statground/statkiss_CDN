// 모바일 - 햄버거 메뉴 클릭 이벤트
function menu_hamburger() {
	if (toggle_menu_hamburger == 0) {
		document.getElementById("mega_menu_icons").className = "items-center justify-between w-full md:flex md:w-auto md:order-1"
		toggle_menu_hamburger = 1
	} else {
		document.getElementById("mega_menu_icons").className = "hidden"
		toggle_menu_hamburger = 0
	}
}