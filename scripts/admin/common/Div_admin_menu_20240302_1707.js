function Div_admin_menu() {
	return (
		<div class="flex flex-row justify-center items-center">
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 
						   group-hover:from-cyan-500 group-hover:to-blue-500 
						   hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
						onClick={() => location.href="/admin/"}>
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
					Admin Home
				</span>
			</button>

			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
						  group-hover:from-pink-500 group-hover:to-orange-400 
						  hover:text-white focus:outline-none focus:ring-pink-200"
					onClick={() => location.href="/admin/pageview/"}>
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
					Page View
				</span>
			</button>
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
						   group-hover:from-pink-500 group-hover:to-orange-400 
						   hover:text-white focus:outline-none focus:ring-pink-200"
					onClick={() => location.href="/admin/visitor/"}>
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
					Visitor
				</span>
			</button>
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
						   group-hover:from-pink-500 group-hover:to-orange-400 
						   hover:text-white focus:outline-none focus:ring-pink-200"
						onClick={() => location.href="/admin/member/"}>
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
					Member
				</span>
			</button>
			<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 
						   group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200
						   hover:text-gray-900 focus:outline-none focus:ring-green-200"
						onClick={() => location.href="/admin/mail/"}>
				<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
					Group Mail
				</span>
			</button>
		</div>
	)
}