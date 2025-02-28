function set_content() {
	function Div_content(props) {
		return (
			<div class="flex flex-col w-full space-y-8">
				<div id="div_member_summary"></div>
				<div id="div_member_search_filter"></div>
				<div id="div_member_count"></div>
				<div id="div_member_list"></div>
			</div>
		)
	}

	// 스켈레톤
	ReactDOM.render(<Div_content />, document.getElementById("div_content"))
	ReactDOM.render(<Div_member_search_filter />, document.getElementById("div_member_search_filter"))

	//
	get_member_list("init")   // 멤버 목록
	get_member_summary()   // summary


	window.addEventListener("scroll", () => {
		// 100을 더하면 스크롤을 끝까지 내리기 100px 전에 데이터를 받아올 수 있다.
		const isScrollEnded = window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight;
	  
		if (isScrollEnded && !toggle_page) {
			get_member_list("next")
		}
	});
}