// 프로필 사진 - 새 이미지 업로드
function check_file_upload() {
	var formData = new FormData();
	formData.append('file_input', $('#id_file_upload')[0].files[0]);
	formData.append('host', window.location.href.toString());
	formData.append('note', "KISS Newsletter");
	formData.append('active', 1);

	$.ajax({
		type: "POST",
		enctype: 'multipart/form-data',
		url: "/blank/ajax_file_upload/",
		data: formData,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function (data) {
			data_file = data
			document.getElementById("txt_filename").innerHTML = data_file.origin_file_name
			ReactDOM.render(<Div_btn_submit />, document.getElementById("div_btn_submit"))
		},
		error: function (e) {
			alert("File upload failed.");
		}
	});
}