// =============================================
//  Submit handler (create newsletter)
// =============================================
async function click_btn_submit() {
	// 이미 처리 중이면 무시
	if (toggle_btn_submit) return;

	// ✅ 파일이 업로드되어 uuid 를 받은 상태인지 체크
	if (!data_file || !data_file.uuid) {
		alert("Please upload the file first.");
		return;
	}

	const publishDate =
		document.getElementById("id_publish_date")?.value || "";
	const volume = document.getElementById("id_volume")?.value || "";
	const issue = document.getElementById("id_issue")?.value || "";

	const btn = document.getElementById("btn_submit_newsletter");
	const spinner = document.getElementById("btn_submit_spinner");
	const label = document.getElementById("btn_submit_label");

	toggle_btn_submit = true;
	if (btn) btn.disabled = true;
	if (spinner) spinner.classList.remove("hidden");
	if (label) label.textContent = "Saving...";

	try {
		const inputData = new FormData();
		inputData.append("txt_publish_date", publishDate);
		inputData.append("txt_volume", volume);
		inputData.append("txt_issue", issue);

		// ✅ 여기에서 log.file 의 uuid 를 그대로 uuid_file 로 보냄
		inputData.append("uuid_file", data_file.uuid);

		await fetch("/pubs/ajax_add_newsletter/", {
			method: "POST",
			headers: { "X-CSRFToken": getCookie("csrftoken") },
			body: inputData,
		});

		// 성공 시 새로고침
		location.href = "/pubs/newsletter/";
	} catch (e) {
		console.error(e);
		alert("Failed to save newsletter.");
	} finally {
		toggle_btn_submit = false;
		if (btn) btn.disabled = false;
		if (spinner) spinner.classList.add("hidden");
		if (label) label.textContent = "Submit";
	}
}
