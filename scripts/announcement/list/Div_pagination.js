function Div_pagination(props) {
	let class_page_active = "flex items-center bg-gray-100 justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
	let class_page_inactive = "flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"

	function Div_pageIndex(props) {
		let targetPageNo = props.targetPageNo
		let currentPageNo = props.currentPageNo

		return (
			<li>
				<span class={
								targetPageNo == currentPageNo
								?   class_page_active
								:   class_page_inactive
							} 
					  onClick={() => click_page_no(targetPageNo)}>{targetPageNo}</span>
			</li>
		)
	}

	return (
		<div class="flex flex-between md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
			<div class="flex flex-row justify-start items-center space-x-1">
				<span class="text-sm font-normal text-gray-500">Showing</span>
				<span class="font-semibold text-gray-900">
					{parseInt(data_index_list[props.pageNo-1][0]) + 1}
					-
					{parseInt(data_index_list[props.pageNo-1][data_index_list[props.pageNo-1].length - 1]) + 1}</span>
				<span class="text-sm font-normal text-gray-500">of</span>
				<span class="font-semibold text-gray-900">{Object.keys(data_list).length}</span>
			</div>
			<ul class="inline-flex items-stretch -space-x-px">

				<li>
					<span class="flex items-center justify-center h-full py-1.5 px-2 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 
								 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
						  onClick={
									props.pageNo != 1
									?   () => click_page_no(1)
									:   null
								  }>
						<svg class="w-5 h-5" fill="#000000" viewBox="-9.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>angle-double-left</title> <path d="M7.28 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.84 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM12.040 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.88 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.12 0.16-0.36 0.24-0.56 0.24z"></path> </g></svg>
					</span>
				</li>

				<li>
					<span class="flex items-center justify-center h-full py-1.5 px-2 ml-0 text-gray-500 bg-white border border-gray-300 
								 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
						  onClick={
									props.pageNo != 1
									?   () => click_page_no(props.pageNo-1)
									:   null
								  }>
						<svg class="w-5 h-5" fill="#000000" viewBox="-12 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>angle-left</title> <path d="M7.28 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.8 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.44 0.24-0.64 0.24z"></path> </g></svg>
					</span>
				</li>

				{
					(props.pageNo - 2) > 0
					?   <Div_pageIndex targetPageNo={props.pageNo - 2} currentPageNo={props.pageNo} />
					:   ""
				}

				{
					(props.pageNo - 1) > 0
					?   <Div_pageIndex targetPageNo={props.pageNo - 1} currentPageNo={props.pageNo} />
					:   ""
				}

				<Div_pageIndex targetPageNo={props.pageNo} currentPageNo={props.pageNo} />

				{
					(props.pageNo + 1) <= data_index_list.length
					?   <Div_pageIndex targetPageNo={props.pageNo + 1} currentPageNo={props.pageNo} />
					:   ""
				}

				{
					(props.pageNo + 2) <= data_index_list.length
					?   <Div_pageIndex targetPageNo={props.pageNo + 2} currentPageNo={props.pageNo} />
					:   ""
				}

				<li>
					<span class="flex items-center justify-center h-full py-1.5 px-2 ml-0 text-gray-500 bg-white border border-gray-300 
								 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
						  onClick={
									props.pageNo != data_index_list.length
									?   () => click_page_no(props.pageNo+1)
									:   null
								  }>
						<svg class="w-5 h-5" fill="#000000" viewBox="-12 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>angle-right</title> <path d="M0.88 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.76-5.84-5.8-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.4 6.44c-0.2 0.16-0.4 0.24-0.6 0.24z"></path> </g></svg>
					</span>
				</li>

				<li>
					<span class="flex items-center justify-center h-full py-1.5 px-2 ml-0 text-gray-500 bg-white rounded-r-lg border border-gray-300 
								 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
						  onClick={
									props.pageNo != data_index_list.length
									?   () => click_page_no(data_index_list.length)
									:   null
								  }>
						<svg class="w-5 h-5" fill="#000000" viewBox="-9.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>angle-double-right</title> <path d="M5.6 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.84-5.84-5.84-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24zM0.84 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.84-5.84-5.84-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24z"></path> </g></svg>
					</span>
				</li>
			</ul>
		</div>
	)
}