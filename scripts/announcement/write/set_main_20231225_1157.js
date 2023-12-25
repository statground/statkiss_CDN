function set_main() {
	ReactDOM.render(<Div_main url={"/announcement/" + url + "/"} />, document.getElementById("div_main"))
	
	$('#div_summernote').summernote({
		tabsize: 2,
		height: 300,                 // set editor height
		minHeight: null,             // set minimum height of editor
		maxHeight: null,             // set maximum height of editor
		toolbar: [
		[ 'style', [ 'style' ] ],
		[ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
		[ 'fontname', [ 'fontname' ] ],
		[ 'fontsize', [ 'fontsize' ] ],
		[ 'color', [ 'color' ] ],
		[ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
		[ 'table', [ 'table' ] ],
		[ 'insert', [ 'link'] ],
		[ 'view', [ 'undo', 'redo', 'codeview' ] ]
		]
	});
}
