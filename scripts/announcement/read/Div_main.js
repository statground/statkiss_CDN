function Div_main() {
	return (
		<div class="max-w-2xl px-4 py-8 mx-auto">
			<h2 class="flex items-center mb-4 text-xl font-bold leading-none text-gray-900 md:text-2xl">
				The 4th Digital Transformation
			</h2>
			
			<dl class="flex items-center mb-4 space-x-4 md:mb-5">
				<div>
					<dt class="sr-only">Date</dt>
					<dd class="flex items-center text-gray-900">
						
						<span class="font-semibold">26th of November, 2022</span>
					</dd>
				</div>
			</dl>

			<dl class="mb-4 md:mb-5">
				<dt class="mb-2 font-medium leading-none text-gray-900">Details:</dt>
				<dd class="font-light text-gray-500 dark:text-gray-400">
					USA enterprises and governments have committed to a technology-driven future, making USA one of the fastest-growing markets for digital technologies. This has also increased the exposure to the risk of cyber-attacks as businesses continue to progress toward being more digital in areas such as the workplace, which requires more security measures.
				</dd>
			</dl>

			<div class="flex flex-row w-full items-center space-x-4">
				<button type="button" 
						class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					Write
				</button>
				<button type="button" 
						class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					Edit
				</button>
				<button type="button" 
						class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					Delete
				</button>
				<button type="button" onclick="location.href='/announcement/{{url}}'"
						class="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 
							   hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
					List
				</button>
			</div>
		</div>
	)
}