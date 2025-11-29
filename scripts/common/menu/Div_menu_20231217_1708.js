function Div_menu() {
	// 햄버거 버튼 클릭
	function click_hamburger() {
		if (toggle_hamburger) {
			document.getElementById("div_menu_mobile").className = "hidden"
			toggle_hamburger = false
		} else {
			document.getElementById("div_menu_mobile").className = "hidden md:flex md:flex md:flex-col md:visible md:mt-[20px]"
			toggle_hamburger = true
		}
	}


	// 헤더
	function Div_sub_header() {
		return (
			<div onclick="menu_dropdown_initialization();"
				class="flex bg-blue-200 justify-center items-center w-full h-[35px]">
				{   gv_username == ""
					?   <div class="flex justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
							<a href="/account/" class="hover:underline">
								Login
							</a>
							<span>
								|
							</span>
							<a href="/account/signup/" class="hover:underline">
								Sign Up
							</a>
						</div>
					:   <div class="flex justify-end items-center text-end text-sm space-x-4 w-full h-full px-[35px]">
							<a href="/account/myinfo/" class="hover:underline">
								My Info.
							</a>
							<span>
								|
							</span>
							<a href="/account/logout/" class="hover:underline">
								Logout
							</a>
					</div>
				}
				
			</div>
		)
	}

	// 로고
	function Div_sub_logo() {
		return (
			<a href="/" class="flex items-center text-xl font-bold">
				<img class="object-scale-down h-12"
					src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/logo/logo.png" />
			</a>
		)
	}

	// 햄버거
	function Div_sub_hamburger() {
		return (
			<div class="flex items-center hidden md:flex md:visible" onClick={() => click_hamburger()}>
				<button type="button"
						class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg 
							hover:bg-gray-100 
							focus:outline-none focus:ring-2 focus:ring-gray-200">
					<span class="sr-only">Open main menu</span>
					<img src="https://cdn.jsdelivr.net/gh/statground/Statground_CDN/assets3/images/svg/menu_hamburger.svg" class="w-8 h-8" />
				</button>
			</div>
		)
	}

	// 메뉴 - Depth 1 - PC
	function Div_sub_menu_pc() {
		function Div_sub_menu_pc_sub(props) {
			return (
				<span class="flex flex-row justify-center items-center w-fit px-[24px] h-4/6 text-sm rounded-lg cursor-pointer
							hover:bg-blue-100"
					  onClick={props.function}>
					{props.name}
				</span>                        
			)
		}

		return (
			<div class="flex flex-row justify-cetner items-center visible md:hidden">
				<Div_sub_menu_pc_sub name={"About KISS"} function={() => click_dropdown("about")} />
				<Div_sub_menu_pc_sub name={"Announcement"}  function={() => click_dropdown("announcement")} />
				<Div_sub_menu_pc_sub name={"Publications"}  function={() => click_dropdown("publications")} />
				<Div_sub_menu_pc_sub name={"Awards"}  function={() => click_dropdown("awards")} />
				<Div_sub_menu_pc_sub name={"Forums"}  function={() => click_dropdown("forums")} />
				<Div_sub_menu_pc_sub name={"Membership"}  function={() => click_dropdown("membership")} />
			</div>
		)
	}

	function Div_sub_menu_pc_title(props) {
		return (
			<div>
				<div class="flex justify-center items-start text-center w-fit h-[150px] bg-blue-100 border-r-8 px-[20px] pt-[10px] min-w-[170px] max-w-[170px]">
					<h1 class="w-full justify-center items-center mb-4 text-lg font-extrabold">
						<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-900 from-sky-600">{props.title}</span>
					</h1>
				</div>
			</div>
		)
	}

	function Div_sub_menu_pc_li(props) {
		return (
			<li>
				<a href={props.url} target={props.target} class="px-4 py-2 hover:bg-blue-100">
					{props.title}
				</a>
			</li>
		)
	}

	function Div_sub_menu_pc_img(props) {
		return (
			<div class={"p-8 text-left bg-gray-300 bg-cover bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply h-[150px] "
						+ "bg-[url(" + props.url + ")]"}>
			</div>
		)
	}

	function Div_sub_menu_mobile_title(props) {
		return (
			<div class="flex flex-col justify-center items-start w-full h-[50px] px-[20px] cursor-pointer hover:bg-blue-200"
				 onClick={props.function}>
				<span class="flex flex-row justify-center items-center">
					<img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/menu_left.svg" class="w-4 h-4 mr-2" />
					{props.title}
				</span>
			</div>
		)
	}

	function Div_sub_menu_mobile_li(props) {
		return (
			<div class="flex justify-center items-start w-full h-[20px] cursor-pointer hover:bg-blue-100" onClick={() => location.href=props.url}>
				<span class="flex flex-row w-full">
					- {props.title}
				</span>
			</div>
		)
	}


	return (
		<div class="flex flex-col">

			<Div_sub_header />
		
			<nav class="flex flex-row justify-between bg-white border-gray-200 h-[50px] px-[200px] sm:px-[50px]">
				<Div_sub_logo />
				<Div_sub_hamburger />
				<Div_sub_menu_pc />
			</nav>
			<div id="div_megamenu_about" class="hidden"> 
				<div class="grid grid-cols-4 max-w-full px-[200px] py-5 mx-auto text-sm text-gray-600">
					<Div_sub_menu_pc_title title={"About KISS"} />
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"About Us"} url={"/about/"} target={"_self"} />
						<Div_sub_menu_pc_li title={"Officers/Board"} url={"/about/officers/"} target={"_self"} />
					</ul>
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Constitution"} url={"/about/constitution/"} target={"_self"} />
						<Div_sub_menu_pc_li title={"By Laws"} url={"/about/laws/"} target={"_self"} />
					</ul>
					<Div_sub_menu_pc_img url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/018.jpg"} />
				</div>
			</div>

			<div id="div_megamenu_announcement" class="hidden">
				<div class="grid grid-cols-4 max-w-full px-[200px] py-5 mx-auto text-sm text-gray-600">
					<Div_sub_menu_pc_title title={"Announcement"} />
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"KISS Event"} url={"/announcement/"} target={"_self"} />
						<Div_sub_menu_pc_li title={"Member News"} url={"/announcement/member/"} target={"_self"} />
					</ul>
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Advertisement"} url={"/announcement/ads/"} target={"_self"} />
						<Div_sub_menu_pc_li title={"Job Related Ads."} url={"/announcement/jobs/"} target={"_self"} />
					</ul>
					<Div_sub_menu_pc_img url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/024.jpg"} />
				</div>
			</div>

			<div id="div_megamenu_publications" class="hidden"> 
				<div class="grid grid-cols-4 max-w-full px-[200px] py-5 mx-auto text-sm text-gray-600">
					<Div_sub_menu_pc_title title={"Publications"} />
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Journals"} url={"/pubs/journals/"} target={"_self"} />
					</ul>
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Newsletter"} url={"/pubs/newsletter/"} target={"_self"} />
					</ul>
					<Div_sub_menu_pc_img url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/017.png"} />
				</div>
			</div>

			<div id="div_megamenu_awards" class="hidden">
				<div class="grid grid-cols-4 max-w-full px-[200px] py-5 mx-auto text-sm text-gray-600">
					<div>
						<Div_sub_menu_pc_title title={"Awards"} />
					</div>
					<ul class="col-span-2 my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Career Development Award"} url={"/awards/career/"} target={"_self"} />
						<Div_sub_menu_pc_li title={"Outstanding Student Paper Award"} url={"/awards/student/"} target={"_self"} />
					</ul>
					<Div_sub_menu_pc_img url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/021.jpg"} />
				</div>
			</div>

			<div id="div_megamenu_forums" class="hidden"> 
				<div class="grid grid-cols-4 max-w-full px-[200px] py-5 mx-auto text-sm text-gray-600">
					<Div_sub_menu_pc_title title={"Forums"} />
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Facebook Group"} url={"https://www.facebook.com/groups/190717430950968"} target={"_blank"} />
					</ul>
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Useful Links"} url={"/forums/links/"} target={"_self"} />
					</ul>
					<Div_sub_menu_pc_img url={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/020.jpg"} />
				</div>
			</div>

			<div id="div_megamenu_membership" class="hidden"> 
				<div class="grid grid-cols-4 max-w-full px-[200px] py-5 mx-auto text-sm text-gray-600">
					<Div_sub_menu_pc_title title={"Membership"} />
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Fees"} url={"/membership/"} target={"_self"} />
					</ul>
					<ul class="my-4 space-y-4">
						<Div_sub_menu_pc_li title={"Donations"} url={"/membership/donations/"} target={"_self"} />
					</ul>
					<div class=""></div>
				</div>
			</div>


			<div id="div_menu_mobile" class="hidden">
				<Div_sub_menu_mobile_title title={"About KISS"} function={() => click_dropdown("about")} />
				<div id="div_menu_mobile_about" class="hidden">
					<Div_sub_menu_mobile_li title={"About Us"} url={"/about/"} />
					<Div_sub_menu_mobile_li title={"Officers/Board"} url={"/about/officers/"} />
					<Div_sub_menu_mobile_li title={"Constitution"} url={"/about/constitution/"} />
					<Div_sub_menu_mobile_li title={"By Laws"} url={"/about/laws/"} />
				</div>

				<Div_sub_menu_mobile_title title={"Announcement"} function={() => click_dropdown("announcement")} />
				<div id="div_menu_mobile_announcement" class="hidden">
					<Div_sub_menu_mobile_li title={"KISS Event"} url={"/announcement/"} />
					<Div_sub_menu_mobile_li title={"Member News"} url={"/announcement/member/"} />
					<Div_sub_menu_mobile_li title={"Advertisement"} url={"/announcement/ads/"} />
					<Div_sub_menu_mobile_li title={"Job Related Ads."} url={"/announcement/jobs/"} />
				</div>

				<Div_sub_menu_mobile_title title={"Publications"} function={() => click_dropdown("publications")} />
				<div id="div_menu_mobile_publications" class="hidden">
					<Div_sub_menu_mobile_li title={"Journals"} url={"/pubs/journals/"} />
					<Div_sub_menu_mobile_li title={"Newsletter"} url={"/pubs/newsletter/"} />
				</div>

				<Div_sub_menu_mobile_title title={"Awards"} function={() => click_dropdown("awards")} />
				<div id="div_menu_mobile_awards" class="hidden">
					<Div_sub_menu_mobile_li title={"Career Development Award"} url={"/awards/career/"} />
					<Div_sub_menu_mobile_li title={"Outstanding Student Paper Award"} url={"/awards/student/"} />
				</div>

				<Div_sub_menu_mobile_title title={"Forums"} function={() => click_dropdown("forums")} />
				<div id="div_menu_mobile_forums" class="hidden">
					<div class="flex justify-center items-start w-full h-[20px] cursor-pointer hover:bg-blue-100"
						 onClick={() => window.open('https://www.facebook.com/groups/190717430950968')}>
						<span class="flex flex-row w-full">
							- Facebook Group
						</span>
					</div>
					<Div_sub_menu_mobile_li title={"Useful Links"} url={"/forums/links/"} />
				</div>

				<Div_sub_menu_mobile_title title={"Membership"} function={() => click_dropdown("membership")} />
				<div id="div_menu_mobile_membership" class="hidden">
					<Div_sub_menu_mobile_li title={"Fees"} url={"/membership/"} />
					<Div_sub_menu_mobile_li title={"Donations"} url={"/membership/donations/"} />
				</div>
			</div>
		</div>
	)
}