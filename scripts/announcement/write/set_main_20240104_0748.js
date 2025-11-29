async function set_main() {
	function Div_main(props) {
		return (
			<div class="max-w-screen-xl px-6 py-8 mx-auto space-y-2 md">
				<div id="div_title" class="w-full">
					<input type="text" placeholder="Please enter a title." id="txt_title" name="txt_title"
						   class="w-full h-[48px] rounded-lg resize-none scroll-hide 
								  text-start text-[14px] font-[500] border-gray-500
								  focus:ring-gray-700 focus:border-gray-700" />
				</div>
				<div id="div_summernote" class="w-full h-1/2"></div>
				<div class="w-full" id="div_button_list">
					<Div_button />
				</div>
			</div>
		)
	}
	
	const data = await fetch("/ajax_get_menu_header/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	gv_role = data['name']


	// Menu
	if (gv_username != "" && (gv_role == "Administrator" || gv_role == "Officer")) {
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
			
	} else {
		location.href="/announcement/" + url + "/"
		
	}
}