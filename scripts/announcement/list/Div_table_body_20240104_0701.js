function Div_table_tbody(props) {
	console.log(props.index_list)
	const tr_list = Object.keys(props.index_list).map((btn_data) => 
		<div class="w-full border-b px-4 py-3 hover:bg-gray-100 cursor-pointer"
			 onClick={() => location.href='/announcement/' + url + '/read/' + data_list[props.index_list[btn_data]].uuid + '/'}>
			<div class="flex flex-col w-full space-y-2">
				<div class="flex flex-row justify-center items-center bg-blue-200 w-fit h-5 px-2 space-x-2 rounded-xl">
					<span class="text-xs text-gray-700">{data_list[props.index_list[btn_data]].category}</span>
				</div>
				<span class="text-lg font-bold text-gray-900 truncate ...">
					{data_list[props.index_list[btn_data]].title}
				</span>
				<div class="flex flex-row space-x-2">
					<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
						<svg class="w-3 h-3"
							viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="#1C274C" stroke-width="1.5"></path> <path opacity="0.5" d="M7 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M17 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M2.5 9H21.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path> </g>
						</svg>
						<span class="text-xs">{data_list[props.index_list[btn_data]].created_at}</span>
					</div>
					<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
						<svg class="w-3 h-3"
								viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
						</svg>
						<span class="text-xs">{data_list[props.index_list[btn_data]].writer}</span>
					</div>
				</div>
			</div>
		</div>
	)


	return (
		<div class="w-full">
			{tr_list}
			<div id="div_table_pagination" class="w-full"></div>
			<div id="div_table_buttons" class="w-full"></div>
		</div>
	)
}