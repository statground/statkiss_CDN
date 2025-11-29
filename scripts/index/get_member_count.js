async function get_member_count() {
	function Div_main_tab_banner(props) {
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

				<span class="mt-8">
					Total Members: {props.cnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</span>
			</div>
		)
	}

	const data = await fetch("/ajax_get_member_count/")
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	ReactDOM.render(<Div_main_tab_banner cnt={data.CNT} />, document.getElementById("div_main_tab_banner"))
}