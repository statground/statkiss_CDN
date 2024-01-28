function Div_admin_menu() {
	return (
		<div class="flex flex-row justify-center items-center">
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 
						group-hover:from-purple-600 group-hover:to-blue-500 
						hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
						onClick={() => location.href="/admin/summary/"}>
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
					Summary
				</span>
			</button>
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
						group-hover:from-pink-500 group-hover:to-orange-400 
						hover:text-white focus:outline-none focus:ring-pink-200">
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
					Page View
				</span>
			</button>
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
						group-hover:from-pink-500 group-hover:to-orange-400 
						hover:text-white focus:outline-none focus:ring-pink-200">
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
					Member
				</span>
			</button>
		</div>
	)
}