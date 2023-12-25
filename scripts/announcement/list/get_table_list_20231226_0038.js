async function get_table_list() {
	function Div_table_tbody(props) {
		const tr_list = Object.keys(props.data).map((btn_data) =>  
			<div class="w-full border-b px-4 py-3 hover:bg-gray-100 cursor-pointer"
				 onClick={() => location.href='/announcement/' + url + '/read/' + props.data[btn_data].uuid + '/'}>
				<div class="flex flex-col w-full space-y-2">
					<div class="flex flex-row justify-center items-center bg-blue-200 w-fit h-5 px-2 space-x-2 rounded-xl">
						<span class="text-xs text-gray-700">{props.data[btn_data].category}</span>
					</div>
					<span class="text-lg font-bold text-gray-900">
						{props.data[btn_data].title}
					</span>
					<div class="flex flex-row space-x-2">
						<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
							<svg class="w-3 h-3"
								viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="#1C274C" stroke-width="1.5"></path> <path opacity="0.5" d="M7 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M17 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M2.5 9H21.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path> </g>
							</svg>
							<span class="text-xs">{props.data[btn_data].created_at}</span>
						</div>
						<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
							<svg class="w-3 h-3"
									viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
							</svg>
							<span class="text-xs">{props.data[btn_data].writer}</span>
						</div>
					</div>
				</div>
			</div>
		)


		return (
			<div class="w-full">
				{tr_list}
			</div>
		)
	}
	

	function Div_pagination(props) {
		let class_page_active = "flex items-center bg-gray-100 justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-gray-200 hover:text-gray-700"
		let class_page_inactive = "flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
		let class_prev_next = "flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"

		function Div_prev_next(props) {
			return (
				<a href="#" class={class_prev_next}>
					{
						props.type == "prev"
						?   <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
						:   <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
							</svg>
					}
					
				</a>                        
			)
		}

		return (                
			<div class="flex flex-between md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
				<div class="flex flex-row justify-start items-center space-x-1">
					<span class="text-sm font-normal text-gray-500">Showing</span>
					<span class="font-semibold text-gray-900">{props.start}-{props.end}</span>
					<span class="text-sm font-normal text-gray-500">of</span>
					<span class="font-semibold text-gray-900">{props.cnt_max}</span>
				</div>
				<ul class="inline-flex items-stretch -space-x-px">
					<li>
						<Div_prev_next type={"prev"} />
					</li>
					<li>
						<a href="#" class={class_page_active}>1</a>
					</li>
					<li>
						<a href="#" class={class_page_inactive}>2</a>
					</li>
					<li>
						<a href="#" class={class_page_inactive}>3</a>
					</li>
					<li>
						<a href="#" class={class_page_inactive}>...</a>
					</li>
					<li>
						<a href="#" class={class_page_inactive}>{props.cnt_pages}</a>
					</li>
					<li>
						<Div_prev_next type={"next"} />
					</li>
				</ul>
			</div>
		)
	}

	const request_data = new FormData();
	request_data.append('url', url);
	
	const data = await fetch("/announcement/ajax_get_article_list/", {
						method: "post", 
						headers: { "X-CSRFToken": getCookie("csrftoken"), },
						body: request_data
						})
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	ReactDOM.render(<Div_table_tbody data={data} />, document.getElementById("div_table_tbody"))
}