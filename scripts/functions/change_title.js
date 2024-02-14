// Change Title
function change_title(inputTitle) {
	// 메타 태그 변경
	inputTitle += " / Korean International Statistical Society"
	document.title = inputTitle
	$("meta[property='og\\:title']").attr("content", inputTitle);
}