function Div_main() {
	function Div_person(props) {
		return (
			<li class="flex items-center">
				<img class="w-3.5 h-3.5 mr-2" src="https://cdn.jsdelivr.net/gh/statground/statKISS_CDN/images/svg/student2.svg" />
				<div class="flex flex-col">
					<p class="text-md">{props.name}</p>
					<p class="text-xs">{props.affiliation}</p>
				</div>
			</li>
		)
	}

	return (
		<div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
			<div class="mx-auto max-w-screen-lg text-center">
				<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">
					KISS Outstanding Student Paper Award
				</h2>
				<p class="mb-8 text-gray-500 lg:text-lg">
					The KISS Outstanding Student Paper Awards are to support students for traveling to JSM to present their papers. The Awards are given in the KISS Annual Meeting at JSM every other year.
				</p>
			</div>

			<ol class="relative border-l border-gray-200 space-y-4">

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2022 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"DongKyu Cho"} affiliation={"Yonsei University"} />
						<Div_person name={"Xi Fang"} affiliation={"Medical College of Wisconsin"} />
						<Div_person name={"Hyeongseon Jeon"} affiliation={"Iowa State University"} />
						<Div_person name={"Jenny Lee"} affiliation={"Harvard University"} />
						<Div_person name={"Yeseul Jeon"} affiliation={"Yonsei University"} />
					</ul>
				</li>

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2020 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"Seongoh Park"} affiliation={"Seoul National University"} />
						<Div_person name={"Minseok Shin"} affiliation={"Korea Advanced Institute of Science and Technology"} />
						<Div_person name={"Hoseung Song"} affiliation={"University of California, Davis"} />
						<Div_person name={"Yayun Xu"} affiliation={"Medical College of Wisconsin"} />
					</ul>
				</li>

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2018 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"Annie Lee"} affiliation={"Columbia University"} />
						<Div_person name={"Hyung G. Park"} affiliation={"Columbia University"} />
						<Div_person name={"Jaewoo Park"} affiliation={"Pennsylvania State University"} />
						<Div_person name={"HeeCheol Chung"} affiliation={"University of Georgia"} />
					</ul>
				</li>

			</ol>
		</div>
	)
}