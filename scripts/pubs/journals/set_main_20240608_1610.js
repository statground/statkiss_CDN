function set_main() {
	function Div_main() {
		function Div_header() {
			return (
				<div class="mb-6 max-w-screen-lg lg:mb-0">
					<h1 class="mb-4 text-4xl font-extrabold text-red-900 tracking-tight leading-none md:text-5xl lg:text-6xl">
						Communications
					</h1>
					<p class="mb-6 font-bold text-gray-900 lg:mb-8 md:text-lg lg:text-xl">
						for Statistical Applications and Methods
					</p>
	
					<p class="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm">
						<a href="http://csam.or.kr/" target="_blank" class="underline text-blue-600">
							Communications for Statistical Applications and Methods (CSAM)
						</a>
							is an official journal of the Korean Statistical Society and Korean International Statistical Society beginning in 2013.  It contains original articles dedicated to application research in various fields of statistics and probability, or contributing to applied statistics through innovative data analysis and interpretation. However, articles dealing with statistical education are also welcomed. The journal welcomes articles from all countries.
					</p>
					<p class="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm">
						The journal has been twice retitled from Communications of the Korean Statistical Society or formerly, Korean Communications in Statistics, which was one of the official journals of the Korean Statistical Society since 1994.
					</p>
					<br/>
					<p class="mb-6 font-light text-gray-900 lg:mb-8 md:text-md lg:text-sm">
						The journal accepts articles written in English and is published bi-monthly in January, March, May, July, September, and November. All of the manuscripts are peer-reviewed. CSAM welcomes only original research articles for the form of publication.
					</p>
				</div>                 
			)
		}
	
		function Div_sub_card(props) {
			return (
				<div>
					<h2 class="mb-1 text-md">{props.text}</h2>
					<h2 class="mb-1 text-sm">{props.sub_text}</h2>
					<a href={props.url} target="_blank"
					class="inline-flex items-center text-sm font-semibold text-primary-500 hover:underline text-blue-600">
						{props.url_name}
						<svg class="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd">
							</path>
						</svg>
					</a>
				</div>
			)
		}
	
		function Div_sub_card_img(props) {
			return (
				<div class="flex flex-col justify-center items-center space-y-4">
					<img class="h-24" src={props.img_url} />
					<h2 class="mb-1 text-sm">{props.text}</h2>
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
	
		return (
			<div class="flex flex-col">
				<div class="bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/header_blank.png')] bg-no-repeat bg-cover bg-center">
					<div class="relative py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-1">
						<Div_header />
	
						<div class="grid grid-cols-2 gap-8 pt-8 lg:pt-12 mt-8 lg:mt-12 border-t border-gray-600 sm:grid-cols-1 w-full">
							<Div_sub_card text={"The Contents of issues are available in the CSAM website."}
										  url={"http://www.csam.or.kr/main.html"} url_name={"Visit"} />
							<Div_sub_card text={"To submit your paper, please visit the link below."}
										  sub_text={"(effective from August 1, 2013)"}
										  url={"http://submit.csam.or.kr/submission/Login.html"} url_name={"Link"} />
						</div>
	
						<div class="flex flex-row justify-center items-center w-full space-x-8 mt-8">
							<Div_sub_card_img img_url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kss.png"}
											  text={"pISSN: 2287-7843"} />
							<Div_sub_card_img img_url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/journal/kiss.png"}
											  text={"eISSN: 2383-4757"} />
						</div>
					</div>
				</div>
	
				<div class="px-4 mx-auto max-w-screen-xl py-8">
					<h2 class="mb-8 text-2xl font-bold text-gray-900">Editorial Board:</h2>
					<div class="grid gap-12 md:grid-cols-2 grid-cols-5">
	
						<div class="max-w-xs">
							<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
								<p class="text-md leading-tight text-gray-700">Editor-in-Chief</p>
							</div>
	
							<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
								<Div_person_li name={"Seongjoo Song"} affiliation={"Korea University, Korea"} />
							</ul>    
						</div>
	
						<div class="max-w-xs">
							<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
								<p class="text-md leading-tight text-gray-700">Co-Editors</p>
							</div>
	
							<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
								<Div_person_li name={"Dongseok Choi"} affiliation={"Oregon Health and Science University, USA"} />
								<Div_person_li name={"Hyemi Choi"} affiliation={"Chonbuk National University, Korea"} />
							</ul>    
						</div>
	
						<div class="max-w-xs">
							<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
								<p class="text-md leading-tight text-gray-700">Honorary Editors</p>
							</div>
	
							<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
								<Div_person_li name={"Wayne Fuller"} affiliation={"Iowa State University, USA"} />
								<Div_person_li name={"Donald B. Rubin"} affiliation={"Harvard University, USA"} />
								<Div_person_li name={"Grace Wahba"} affiliation={"University of Wisconsin-Madison, USA"} />
							</ul>    
						</div>
	
						<div class="max-w-xs">
							<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
								<p class="text-md leading-tight text-gray-700">Managing Editor</p>
							</div>
	
							<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
								<Div_person_li name={"Sangbum Choi"} affiliation={"Korea University, Korea"} />
							</ul>    
						</div>
	
						<div class="max-w-xs">
							<div class="flex flex-col w-full h-[50px] justify-center items-center mb-2">
								<p class="text-md leading-tight text-gray-700">Editorial Assistant</p>
							</div>
	
							<ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside">
								<Div_person_li name={"Jae Rim Lee"} affiliation={"Korean Statistical Society, Korea"} />
							</ul>    
						</div>
					</div>
				</div>
			</div>
		)
	}

	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
}