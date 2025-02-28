function set_main() {
	function Div_title_skeleton() {
		return (
			<div class="flex flex-col w-full animate-pulse">
				<div class="h-2.5 bg-gray-200 rounded-full w-1/2 mb-4"></div>
				<div class="h-2 bg-gray-200 rounded-full max-w-[100px] mb-2.5"></div>
			</div>
		)
	}

	function Div_contents_skeleton() {
		return (
			<div class="flex flex-col w-full animate-pulse">
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
				<div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
			</div>
		)
	}

	function Div_main() {
		return (
			<div class="flex flex-col max-w-screen-xl px-6 py-8 space-y-8 mx-auto">
				<div class="w-full" id="div_title"></div>
				<div class="w-full" id="div_contents"></div>
				<div class="w-full" id="div_buttons"></div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
	ReactDOM.render(<Div_title_skeleton />, document.getElementById("div_title"))
	ReactDOM.render(<Div_contents_skeleton />, document.getElementById("div_contents"))

	get_article_read()
	get_buttons()
}