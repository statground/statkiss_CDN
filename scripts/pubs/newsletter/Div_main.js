function Div_main() {
	function Div_tr() {
		return (
			<tr class="border-b">
				<td class="px-4 py-3">
					<div class="flex flex-col w-full space-y-2">
						<span class="text-lg font-bold text-gray-900">
							Title
						</span>
						<div class="flex flex-row space-x-2">
							<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
								<svg class="w-3 h-3"
									viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="#1C274C" stroke-width="1.5"></path> <path opacity="0.5" d="M7 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M17 4V2.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M2.5 9H21.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#1C274C"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#1C274C"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#1C274C"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#1C274C"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#1C274C"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#1C274C"></path> </g>
								</svg>
								<span class="text-xs">YYYY-MM-DD</span>
							</div>
							<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
								<svg class="w-3 h-3"
									 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z" stroke="#1C274D" stroke-width="1.5"></path> <path d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235" stroke="#1C274D" stroke-width="1.5"></path> <path opacity="0.5" d="M8 7H16" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M8 10.5H13" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> <path opacity="0.5" d="M19.5 19H8" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> </g>
								</svg>
								<span class="text-xs">Volume 00</span>
							</div>
							<div class="flex flex-row justify-center items-center bg-gray-200 w-fit h-5 px-2 space-x-1 rounded-xl">
								<svg class="w-3 h-3"
									 viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M3,1 C3,0.44772 3.44772,0 4,0 L6,0 C6.55228,0 7,0.44772 7,1 L7,2 C7,2.55228 6.55228,3 6,3 L4,3 C3.44772,3 3,2.55228 3,2 L3,1 Z M2,1 L0,1 L0,14 L10,14 L10,1 L8,1 L8,2.4 L8.6,2.4 L8.6,12.6 L1.4,12.6 L1.4,2.4 L2,2.4 L2,1 Z M4.57808,10.0212 L7.9899,6.6094 L6.99996,5.61945 L4.57808,8.04132 L3.36715,6.83038 L2.3772,7.82033 L4.57808,10.0212 Z" transform="translate(3 1)"></path> </g>
								</svg>
								<span class="text-xs">Issue 00</span>
							</div>
						</div>
					</div>
				</td>
			</tr>
		)
	}

	return (
		<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
			<div class="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full text-sm text-left text-gray-500">
						<thead class="text-xs text-gray-700 uppercase">
							<tr>
								<th scope="col" class="px-4 py-3">
									<div class="mx-auto max-w-screen-lg text-center">
										<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">
											Newsletter
										</h2>
										<p class="mb-8 text-gray-500 lg:text-lg">
											
										</p>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<Div_tr />
							<Div_tr />
							<Div_tr />
						</tbody>
					</table>
				</div>
				<nav class="flex flex-between md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
					<div class="flex flex-row justify-start items-center space-x-1">
						<span class="text-sm font-normal text-gray-500">Showing</span>
						<span class="font-semibold text-gray-900">1-10</span>
						<span class="text-sm font-normal text-gray-500">of</span>
						<span class="font-semibold text-gray-900">1000</span>
					</div>
					<ul class="inline-flex items-stretch -space-x-px">
						<li>
							<a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
								<span class="sr-only">Previous</span>
								<svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							</a>
						</li>
						<li>
							<a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
						</li>
						<li>
							<a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
						</li>
						<li>
							<a href="#" aria-current="page" class="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700">3</a>
						</li>
						<li>
							<a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</a>
						</li>
						<li>
							<a href="#" class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">100</a>
						</li>
						<li>
							<a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
								<span class="sr-only">Next</span>
								<svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
								</svg>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}