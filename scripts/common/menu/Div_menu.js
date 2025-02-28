function Div_menu() {
	// About
	function menu_dropdown_about() {
		document.getElementById("mega_menu_dropdown_news").className = "hidden"
		toggle_menu_dropdown_news = 0
		document.getElementById("mega_menu_dropdown_publications").className = "hidden"
		toggle_menu_dropdown_publications = 0
		document.getElementById("mega_menu_dropdown_awards").className = "hidden"
		toggle_menu_dropdown_awards = 0
		document.getElementById("mega_menu_dropdown_forums").className = "hidden"
		toggle_menu_dropdown_forums = 0
				
		if (toggle_menu_dropdown_about == 0) {
			document.getElementById("mega_menu_dropdown_about").className = "absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-2"
			toggle_menu_dropdown_about = 1
		} else {
			document.getElementById("mega_menu_dropdown_about").className = "hidden"
			toggle_menu_dropdown_about = 0
		}
	}

	// News
	function menu_dropdown_news() {
		document.getElementById("mega_menu_dropdown_about").className = "hidden"
		toggle_menu_dropdown_about = 0
		document.getElementById("mega_menu_dropdown_publications").className = "hidden"
		toggle_menu_dropdown_publications = 0
		document.getElementById("mega_menu_dropdown_awards").className = "hidden"
		toggle_menu_dropdown_awards = 0
		document.getElementById("mega_menu_dropdown_forums").className = "hidden"
		toggle_menu_dropdown_forums = 0

		if (toggle_menu_dropdown_news == 0) {
			document.getElementById("mega_menu_dropdown_news").className = "absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-2"
			toggle_menu_dropdown_news = 1
		} else {
			document.getElementById("mega_menu_dropdown_news").className = "hidden"
			toggle_menu_dropdown_news = 0
		}
	}

	// Publications
	function menu_dropdown_publications() {
		document.getElementById("mega_menu_dropdown_about").className = "hidden"
		toggle_menu_dropdown_about = 0
		document.getElementById("mega_menu_dropdown_news").className = "hidden"
		toggle_menu_dropdown_news = 0
		document.getElementById("mega_menu_dropdown_awards").className = "hidden"
		toggle_menu_dropdown_awards = 0
		document.getElementById("mega_menu_dropdown_forums").className = "hidden"
		toggle_menu_dropdown_forums = 0

		if (toggle_menu_dropdown_publications == 0) {
			document.getElementById("mega_menu_dropdown_publications").className = "absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-2"
			toggle_menu_dropdown_publications = 1
		} else {
			document.getElementById("mega_menu_dropdown_publications").className = "hidden"
			toggle_menu_dropdown_publications = 0
		}
	}

	// Awards
	function menu_dropdown_awards() {
		document.getElementById("mega_menu_dropdown_about").className = "hidden"
		toggle_menu_dropdown_about = 0
		document.getElementById("mega_menu_dropdown_news").className = "hidden"
		toggle_menu_dropdown_news = 0
		document.getElementById("mega_menu_dropdown_publications").className = "hidden"
		toggle_menu_dropdown_publications = 0
		document.getElementById("mega_menu_dropdown_forums").className = "hidden"
		toggle_menu_dropdown_forums = 0

		if (toggle_menu_dropdown_awards == 0) {
			document.getElementById("mega_menu_dropdown_awards").className = "absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-2"
			toggle_menu_dropdown_awards = 1
		} else {
			document.getElementById("mega_menu_dropdown_awards").className = "hidden"
			toggle_menu_dropdown_awards = 0
		}
	}

	// Forums
	function menu_dropdown_forums() {
		document.getElementById("mega_menu_dropdown_about").className = "hidden"
		toggle_menu_dropdown_about = 0
		document.getElementById("mega_menu_dropdown_news").className = "hidden"
		toggle_menu_dropdown_news = 0
		document.getElementById("mega_menu_dropdown_publications").className = "hidden"
		toggle_menu_dropdown_publications = 0
		document.getElementById("mega_menu_dropdown_awards").className = "hidden"
		toggle_menu_dropdown_awards = 0

		if (toggle_menu_dropdown_forums == 0) {
			document.getElementById("mega_menu_dropdown_forums").className = "absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md md:grid-cols-2"
			toggle_menu_dropdown_forums = 1
		} else {
			document.getElementById("mega_menu_dropdown_forums").className = "hidden"
			toggle_menu_dropdown_forums = 0
		}
	}


	function Div_logo() {
		return (
			<a href="/" class="flex items-center text-xl font-bold">
				<img class="object-scale-down h-12"
					 src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/logo/logo.png" />
			</a>
		)
	}

	function Div_hamburger() {
		return (
			<div class="flex items-center md:order-2">
				<button type="button" onClick = {() => menu_hamburger()}
						class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg 
							   md:hidden 
							   hover:bg-gray-100 
							   focus:outline-none focus:ring-2 focus:ring-gray-200">
					<span class="sr-only">Open main menu</span>
					<img src="https://cdn.jsdelivr.net/gh/statground/Statground_CDN/assets3/images/svg/menu_hamburger.svg" class="w-8 h-8" />
				</button>
			</div>
		)
	}

	function Div_menu_li_button_single(props) {
		return (
			<li class="hover:underline hover:decoration-gray-500">
				<button id={props.id} onClick={() => location.href=props.url}
						class="flex items-center justify-between w-fit py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-500 
							   hover:bg-gray-50
							   md:w-auto md:hover:bg-transparent md:border-0 md:md:p-0">
					{props.text}
					<svg aria-hidden="true" class="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
				</button>
			</li>                    
		)
	}

	function Div_menu_li_button_multiple(props) {
		return (
			<button id={props.id} onClick={props.func}
					class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 
						   hover:bg-gray-50 
						   md:w-auto md:hover:bg-transparent md:border-0 md:md:p-0">
				{props.text}
				<svg aria-hidden="true" class="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
				</svg>
			</button>
		)
	}

	function Div_menu_li_multiple_title(props) {
		return (
			<li>
				<a class="flex items-center font-bold text-gray-500 group border-b-4 border-sky-500">
					{props.text}
				</a>
			</li>
		)
	}

	function Div_menu_li_multiple_sub(props) {
		return (
			<li class="hover:underline hover:decoration-gray-500">
				<a href={props.url}
				   class="flex items-center text-gray-500 group">
				   {props.text}
				</a>
			</li>
		)
	}

	return (
		<nav class="bg-white border-gray-200 px-2 md:px-4 py-2.5">
			<div class="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
				<Div_logo />
				<Div_hamburger />

				<div id="mega_menu_icons" class="items-center justify-end hidden w-full md:flex md:w-auto md:order-1">
					<ul class="flex flex-col mt-4 m-4 text-sm font-medium md:flex-row md:space-x-8 md:mt-0">

						<li class="hover:border-b-2 hover:border-gray-500">
							<Div_menu_li_button_multiple id={"mega_menu_button_about"} text={"About KISS"} func={() => menu_dropdown_about()} />
							<div id="mega_menu_dropdown_about"
								 class="absolute z-10 grid hidden w-fit grid-cols-1 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
								 <div class="p-4 pb-0 text-gray-900 md:p-4">
									<ul class="space-y-2">
										<Div_menu_li_multiple_sub text={"About Us"} url={"/about/aboutus/"} />
										<Div_menu_li_multiple_sub text={"Constitution"} url={"/about/online/"} />
										<Div_menu_li_multiple_sub text={"By Laws"} url={"/about/bylaws/"} />
										<Div_menu_li_multiple_sub text={"Officers/Board"} url={"/about/officers/"} />
									</ul>
								</div>
							</div>
						</li>

						<li class="hover:border-b-2 hover:border-gray-500">
							<Div_menu_li_button_multiple id={"mega_menu_button_news"} text={"News"} func={() => menu_dropdown_news()} />
							<div id="mega_menu_dropdown_news"
								 class="absolute z-10 grid hidden w-fit grid-cols-1 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
								 <div class="p-4 pb-0 text-gray-900 md:p-4">
									<ul class="space-y-2">
										<Div_menu_li_multiple_sub text={"News & Current Events"} url={"/news/events/"} />
										<Div_menu_li_multiple_sub text={"Newsletters"} url={"/news/newsletters/"} />
										<Div_menu_li_multiple_sub text={"Meeting"} url={"/news/meeting/"} />
										<Div_menu_li_multiple_sub text={"Webinar"} url={"/news/webinar/"} />
									</ul>
								</div>
							</div>
						</li>

						<li class="hover:border-b-2 hover:border-gray-500">
							<Div_menu_li_button_multiple id={"mega_menu_button_Publications"} text={"Publicatons"} func={() => menu_dropdown_publications()} />
							<div id="mega_menu_dropdown_publications"
								 class="absolute z-10 grid hidden w-fit grid-cols-1 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
								 <div class="p-4 pb-0 text-gray-900 md:p-4">
									<ul class="space-y-2">
										<Div_menu_li_multiple_sub text={"Journals"} url={"/pub/journals/"} />
									</ul>
								</div>
							</div>
						</li>

						<li class="hover:border-b-2 hover:border-gray-500">
							<Div_menu_li_button_multiple id={"mega_menu_button_awards"} text={"Awards"} func={() => menu_dropdown_awards()} />
							<div id="mega_menu_dropdown_awards"
								 class="absolute z-10 grid hidden w-fit grid-cols-1 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
								 <div class="p-4 pb-0 text-gray-900 md:p-4">
									<ul class="space-y-2">
										<Div_menu_li_multiple_sub text={"Career Development Award"} url={"/awards/careeraward/"} />
										<Div_menu_li_multiple_sub text={"Outstanding Student Paper Award"} url={"/awards/studentaward/"} />
									</ul>
								</div>
							</div>
						</li>

						<li class="hover:border-b-2 hover:border-gray-500">
							<Div_menu_li_button_multiple id={"mega_menu_button_forums"} text={"Forums"} func={() => menu_dropdown_forums()} />
							<div id="mega_menu_dropdown_forums"
								 class="absolute z-10 grid hidden w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
								 <div class="p-4 pb-0 text-gray-900 md:p-4">
									<ul class="space-y-2 w-fit">
										<Div_menu_li_multiple_title text={"Forums"} />
										<Div_menu_li_multiple_sub text={"Forums"} url={"/forums/forums/"} />
									</ul>
								</div>
								<div class="p-4 pb-0 text-gray-900 md:pb-4">
									<ul class="space-y-2 w-fit">
										<Div_menu_li_multiple_title text={"Careers"} />
										<Div_menu_li_multiple_sub text={"Job Listings"} url={"/forums/listings/"} />
										<Div_menu_li_multiple_sub text={"Jobs"} url={"/forums/jobs/"} />
										<Div_menu_li_multiple_sub text={"Resumes"} url={"/forums/resumes/"} />
									</ul>
								</div>
							</div>
						</li>

					</ul>
				</div>
			</div>
		</nav>
	)
}