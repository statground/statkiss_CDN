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
				<div id="div_editor" class="w-full"></div>
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

		const { Editor } = toastui;
		const { colorSyntax } = Editor.plugin;
		const { tableMergedCell } = Editor.plugin;

		editor = new toastui.Editor({
			el: document.querySelector('#div_editor'),
			previewStyle: 'vertical',
			height: '500px',
			initialEditType: 'wysiwyg',
			plugins: [colorSyntax, tableMergedCell]
		  });
			
	} else {
		location.href="/announcement/" + url + "/"
		
	}
}