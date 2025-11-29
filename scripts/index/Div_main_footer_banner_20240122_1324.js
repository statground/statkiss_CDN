function Div_main_footer_banner() {
	return (
		<div class="flex flex-nowrap justify-start items-center w-full space-x-8 px-32 overflow-x-scroll scroll-smooth scroll-hide">
			<div class="w-[200px] h-[75px] cursor-pointer 
						bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/banner_footer/statisticskorea.jpg')] bg-cover bg-full"
				 onClick={() => window.open('https://kostat.go.kr/')}>
			</div>

			<div class="w-[200px] h-[75px] cursor-pointer 
						bg-[url('https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/banner_footer/kss.jpg')] bg-cover bg-full"
				 onClick={() => window.open('https://kss.or.kr/')}>
			</div>
		</div>
	)
}