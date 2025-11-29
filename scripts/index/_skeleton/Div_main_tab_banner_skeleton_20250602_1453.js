function Div_main_tab_banner_skeleton() {
	function Div_banner(props) {
			return (
				<div class="flex flex-col justify-center items-center w-full min-w-[125px] border-4 border-blue-200 p-4 cursor-pointer hover:bg-yellow-100 rounded-lg"
					onClick={() => location.href=props.url}>
					<img src={props.url_icon} class="size-[35px]" />
					{props.name}
				</div>
			)
		}

	return (
		<div class="flex flex-col justify-center items-center w-fit ml-16 space-y-8 md:w-full md:ml-0">
			<div class="grid grid-cols-2 justify-center items-center w-full gap-4">
				<Div_banner url_icon={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/banner_journals.svg"}
							name={"Journal"} url={"/pubs/journals/"} />
				<Div_banner url_icon={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/banner_awards.svg"}
							name={"Awards"} url={"/awards/career/"} />
				<Div_banner url_icon={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/banner_newsletter.svg"}
							name={"Newsletter"} url={"/pubs/newsletter/"} />
				<Div_banner url_icon={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/banner_news.svg"} 
							name={"KISS News"} url={"/announcement/event/"} />
				<Div_banner url_icon={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/banner_membership.svg"} 
							name={"Membership"} url={"/membership/"} />
				<Div_banner url_icon={"https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/banner_donation.svg"}
							name={"Donation"} url={"/membership/donations/"} />
			</div>

			<div class="flex flex-row justify-center items-center w-full animate-pulse">
				<span class="bg-gray-200 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded w-1/3 h-2 mt-8"></span>
			</div>
		</div>
	)
}