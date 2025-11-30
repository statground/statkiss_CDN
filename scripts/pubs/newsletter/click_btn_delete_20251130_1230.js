// =============================================
//  Delete handler
// =============================================
async function click_btn_delete(uuid) {
	if (!confirm("Are you sure you want to delete it?")) {
		return;
	}

	const inputData = new FormData();
	inputData.append("uuid", uuid);

	await fetch("/pubs/ajax_delete_newsletter/", {
		method: "POST",
		headers: { "X-CSRFToken": getCookie("csrftoken") },
		body: inputData,
	}).then(() => {
		location.href = "/pubs/newsletter/";
	});
}
