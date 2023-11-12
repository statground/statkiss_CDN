function Div_main() {
	function Div_person(props) {
		return (
			<div class="flex flex-col justify-cetner items-center text-center p-6 bg-white rounded shadow w-1/6 md:w-full">
				<p class="text-lg font-bold">{props.role}</p>
				<p class="font-light text-gray-500 text-md">{props.name}</p>
				<p class="font-light text-gray-500 text-sm">{props.affiliation}</p>
			</div>
		)
	}

	function Div_person_li(props) {
		return (
			<li class="flex items-center">
				<svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"></path> </g></svg>
				<div class="flex flex-col">
					<span class="text-md text-gray-900">{props.name}</span>
					<span class="text-xs text-gray-500">({props.affiliation})</span>
				</div>
			</li>
		)
	}

	function Div_person_incoming(props) {
		return (
			<li class="flex items-center">
				<svg class="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
				</svg>
				<div class="flex flex-col">
					<span class="text-md text-gray-900">{props.name}</span>
					<span class="text-xs text-gray-500">({props.affiliation})</span>
				</div>
			</li>
		)
	}

	return (
		<div>
			<section class="bg-gray-50">
				<div class="py-8 px-4 mx-auto w-full">
					<div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
						<h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Officers</h2>
						<p class="font-light text-gray-500 sm:text-xl">
							Korean International Statistical Society (Jan, 2023)
						</p>

					</div>
					<div class="flex flex-wrap space-x-8 space-y-2">
						<div></div>
						<Div_person name={"Jae-Kwang Kim"} role={"President"} />
						<Div_person name={"Mi-Ok Kim"} role={"President-elect"} />
						<Div_person name={"MoonJung Cho"} role={"President-past"} affiliation={"U.S. Bureau of Labor Statistics"} />
						<Div_person name={"Summer Han"} role={"Executive Director"} />
						<Div_person name={"Jong-Min Kim"} role={"General Director"} />
						<Div_person name={"Hang J. Kim"} role={"Financial Director"} />
						<Div_person name={"Soyoung Kim"} role={"Communications Director"} />
						<Div_person name={"Won Chang"} role={"Membership Director"} />
						<Div_person name={"Jeong Hoon Jang"} role={"Membership Co-Director"} />
						<Div_person name={"Heekyung Ahn"} role={"Student representative"} />
					</div>
				</div>
			</section>

			<div class="px-4 mx-auto max-w-screen-xl py-8">
				<h2 class="mb-8 text-2xl font-bold text-gray-900">Board of Directors</h2>
				<div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

					<div class="max-w-xs">
						<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
							<p class="text-md leading-tight text-gray-700">2019-2020</p>
						</div>

						<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
							<Div_person_li name={"Dongseok Choi"} affiliation={"Oregon Health and Science University"} />
							<Div_person_li name={"Jae-Kwang Kim"} affiliation={"Iowa State University"} />
							<Div_person_li name={"Hokwon Cho"} affiliation={"University of Nevada at Las Vegas"} />
							<Div_person_li name={"Chul Ahn"} affiliation={"University of Texas Southwestern Medical Center"} />
							<Div_person_li name={"Chul H. Ahn"} affiliation={"Food and Drug Administration"} />
						</ul>    
					</div>

					<div class="max-w-xs">
						<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
							<p class="text-md leading-tight text-gray-700">2019–2022</p>
						</div>

						<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
							<Div_person_li name={"Kyunghee Song"} affiliation={"Food and Drug Administration"} />
							<Div_person_li name={"Jong-Hyeon Jung"} affiliation={"University of Pittsburgh"} />
							<Div_person_li name={"Sunhee Kwon"} affiliation={"ONYX Pharmaceuticals"} />
							<Div_person_li name={"Ji-Hyun Lee"} affiliation={"University of Florida"} />
							<Div_person_li name={"Mi-Ok Kim"} affiliation={"University of California, San Francisco"} />
						</ul>    
					</div>

					<div class="max-w-xs">
						<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
							<p class="text-md leading-tight text-gray-700">2019–2024</p>
						</div>

						<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
							<Div_person_li name={"Eun Sug Park"} affiliation={"Texas A&M Transportation Institute"} />
							<Div_person_li name={"Hang J. Kim"} affiliation={"University of Cincinnati"} />
							<Div_person_li name={"Sunghee Lee"} affiliation={"University of Michigan"} />
							<Div_person_li name={"Frank Yoon"} affiliation={"IBM"} />
							<Div_person_li name={"Hee-Choon Shin"} affiliation={"National Center for Health Statistics"} />
						</ul>    
					</div>

					<div class="max-w-xs">
						<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
							<p class="text-md leading-tight text-gray-700">2019–2026</p>
						</div>

						<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
							<Div_person_li name={"Mikyung Jun"} affiliation={"University of Houston"} />
							<Div_person_li name={"Dongyun Kim"} affiliation={"National Institute of Health"} />
							<Div_person_li name={"Mimi Kim"} affiliation={"Albert Einstein College of Medicine"} />
							<Div_person_li name={"Ryung Kim"} affiliation={"Albert Einstein College of Medicine"} />
							<Div_person_li name={"Kiseop Lee"} affiliation={"Purdue University"} />
						</ul>    
					</div>

					<div class="max-w-xs">
						<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
							<p class="text-lg font-bold leading-tight text-gray-900">Incoming Board Member</p>
							<p class="text-md leading-tight text-gray-700">(2023-2028)</p>
						</div>

						<ul class="max-w-md space-y-1 text-gray-500 list-inside bg-blue-100 p-4 rounded-lg">
							<Div_person_incoming name={"Youngdeok Hwang"} affiliation={"City University of New York"} />
							<Div_person_incoming name={"Zhezhen Jin"} affiliation={"Columbia University"} />
							<Div_person_incoming name={"Jong-Min Kim"} affiliation={"University of Minnesota Morris"} />
							<Div_person_incoming name={"Yoonkyung Lee"} affiliation={"Ohio State University"} />
							<Div_person_incoming name={"Jong-Min Kim"} affiliation={"University of Minnesota Morris"} />
							<Div_person_incoming name={"Eun-Young (E.Y.) Mun"} affiliation={"University of North Texas Health Science Center"} />
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}