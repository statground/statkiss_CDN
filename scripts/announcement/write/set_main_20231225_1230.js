async function set_main() {
	function Div_main(props) {
		return (
			<div class="max-w-2xl px-4 py-8 mx-auto space-y-2">
				<div id="div_title" class="w-full">
					<input type="text" placeholder="Please enter a title." id="txt_title" name="txt_title"
						   class="w-full h-[48px] rounded-lg resize-none scroll-hide 
								  text-start text-[14px] font-[500] border-gray-500
								  focus:ring-gray-700 focus:border-gray-700" />
				</div>
				<div id="div_summernote" class="w-full h-1/2"></div>
				<div class="flex flex-row w-full justify-center items-center space-x-4">
					<button type="button" onClick={() => click_submit()}
							class="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center
								   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
						Submit
					</button>
					<button type="button" onClick={() => location.href=props.url}
							class="py-1.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-500 
								   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
						List
					</button>
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