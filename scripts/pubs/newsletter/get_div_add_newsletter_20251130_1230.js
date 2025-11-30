// =============================================
//  Admin block render (role check)
// =============================================
async function get_div_add_newsletter() {
	const data = await fetch("/ajax_get_menu_header/")
		.then((res) => res.json())
		.then((res) => res);

	gv_role = data["name"];

	const isAdminNow =
		gv_username !== "" &&
		(data.role === "Administrator" ||
			data.role === "Developer" ||
			data.officer !== "Member");

	isAdmin = isAdminNow;

	const container = document.getElementById("div_add_newsletter");

	if (isAdminNow) {
		if (typeof Div_add_newsletter !== "undefined" && container) {
			ReactDOM.render(<Div_add_newsletter />, container);
		}
	} else if (container) {
		container.innerHTML = "";
	}

	if (newslettersLoaded && typeof renderNewsletterList === "function") {
		renderNewsletterList();
	}
}
