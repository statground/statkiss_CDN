function Div_main() {
	function Div_person(props) {
		return (
			<li class="flex items-center">
				<img class="w-3.5 h-3.5 mr-2" src="https://cdn.jsdelivr.net/gh/statground/statKISS_CDN/images/svg/medal.svg" />
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
				<h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">KISS Career Development Award</h2>
				<p class="mb-8 text-gray-500 lg:text-lg">
					The KISS Career Development Awards are to recognize statisticians who are in the early stages of their careers and who have demonstrated outstanding productivity and the potential to make significant contributions to the field of statistics. The Awards are given in the KISS Career Development Workshop at JSM meeting every year.
				</p>
			</div>

			<ol class="relative border-l border-gray-200 space-y-4">

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2019 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"Won Chang"} affiliation={"University of Cincinnati"} />
						<Div_person name={"Hwanhee Hong"} affiliation={"Duke University"} />
						<Div_person name={"Jaehong Jeong"} affiliation={"University of Maine"} />
						<Div_person name={"Yeonhee Park"} affiliation={"Medical University of South Carolina"} />
					</ul>
				</li>

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2017 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"Ick Hoon Jin"} affiliation={"University of Notre Dame"} />
						<Div_person name={"James Long"} affiliation={"Texas A&M University"} />
					</ul>
				</li>

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2016 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"Youngdeok Hwang"} affiliation={"IBM Thomas J. Watson Research Center"} />
						<Div_person name={"Sungkyu Jung"} affiliation={"University of Pittsburgh"} />
					</ul>
				</li>

				<li class="ml-4">
					<div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
					<h3 class="text-lg font-semibold text-gray-900">2015 Awardees</h3>

					<ul class="max-w-md space-y-2 text-gray-500 list-inside">
						<Div_person name={"Jaeun Choi"} affiliation={"Albert Einstein College of Medicine"} />
						<Div_person name={"Sangbum Choi"} affiliation={"University of Texas at Houston"} />
						<Div_person name={"Dongjun Chung"} affiliation={"Medical University of South Carolina"} />
						<Div_person name={"Hangjoon Kim"} affiliation={"University of Cincinnati"} />
						<Div_person name={"Seonjin Kim"} affiliation={"Miami University"} />
						<Div_person name={"Hyokyoung Hong"} affiliation={"Michigan State University"} />
					</ul>
				</li>
			</ol>
		</div>
	)
}