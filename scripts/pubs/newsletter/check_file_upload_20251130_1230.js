// =============================================
//  File upload handler
// =============================================
function check_file_upload() {
	const input = document.getElementById("id_file_upload");
	if (!input || !input.files || !input.files[0]) {
		alert("Please choose a file to upload.");
		return;
	}

	const formData = new FormData();
	formData.append("file_input", input.files[0]);
	formData.append("host", window.location.href.toString());
	formData.append("note", "KISS Newsletter");
	formData.append("active", 1);

	$.ajax({
		type: "POST",
		enctype: "multipart/form-data",
		url: "/blank/ajax_file_upload/",
		data: formData,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		dataType: "json",   // ✅ 응답을 JSON 으로 강제 파싱
		success: function (data) {
			// data = { uuid, file_name, origin_file_name }
			data_file = data;

			const label = document.getElementById("txt_filename");
			if (label && data_file.origin_file_name) {
				label.textContent = data_file.origin_file_name;
			}
		},
		error: function () {
			alert("File upload failed.");
		},
	});
}
