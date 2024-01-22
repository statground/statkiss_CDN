function set_main() {
	function Div_main() {
		return (
			<div class="flex flex-col justify-center items-center w-full pt-12 pb-12 justify-center space-y-16">
				<div id="div_main_latest_news" class="w-full"></div>
				
				<div class="grid grid-cols-4 w-full px-32 md:grid-cols-1 md:px-0 md:space-y-4">
	
					<div class="col-span-3 flex flex-row justify-start items-start md:flex-col">
						<div id="div_main_tab" class="flex flex-row w-fit md:justify-center md:items-center md:w-full">
							<Div_main_tab />
						</div>
	
						<div id="div_main_tab_contents" class="md:w-full">
							<div id="div_tab_kiss_event" class="md:w-full">
								<div class="grid grid-cols-2 md:gap-8 md:space-y-0 border border-gray-300 p-8 w-full md:grid-cols-1"></div>
							</div>
							<div id="div_tab_advertisement" class="hidden">
								<div class="grid grid-cols-2 md:gap-8 md:space-y-0 border border-gray-300 p-8 w-full md:grid-cols-1"></div>
							</div>
							<div id="div_tab_member_news" class="hidden">
								<div class="grid grid-cols-2 md:gap-8 md:space-y-0 border border-gray-300 p-8 w-full md:grid-cols-1"></div>
							</div>
							<div id="div_tab_job_related_news" class="hidden">
								<div class="grid grid-cols-2 md:gap-8 md:space-y-0 border border-gray-300 p-8 w-full md:grid-cols-1"></div>
							</div>
						</div>
					</div>
	
					<div id="div_main_tab_banner"></div>
				</div>
	
				<div id="div_main_footer_banner" class="w-full"></div>
				
			</div>
		)
	}

	// Form 설정
	ReactDOM.render(<Div_main />, document.getElementById("div_main"))

	// 스켈레톤
	ReactDOM.render(<Div_main_latest_news_skeleton />, document.getElementById("div_main_latest_news"))
	ReactDOM.render(<Div_main_tabs_contents_skeleton />, document.getElementById("div_tab_kiss_event"))
	ReactDOM.render(<Div_main_tabs_contents_skeleton />, document.getElementById("div_tab_advertisement"))
	ReactDOM.render(<Div_main_tabs_contents_skeleton />, document.getElementById("div_tab_member_news"))
	ReactDOM.render(<Div_main_tabs_contents_skeleton />, document.getElementById("div_tab_job_related_news"))
	ReactDOM.render(<Div_main_tab_banner_skeleton />, document.getElementById("div_main_tab_banner"))
	ReactDOM.render(<Div_main_footer_banner_skeleton />, document.getElementById("div_main_footer_banner"))

	// 데이터 채우기
	get_article_list()
	get_member_count()
	get_footer_banner_list()
}