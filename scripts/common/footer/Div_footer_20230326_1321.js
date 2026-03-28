function Div_footer() {
	return (
		<div class="w-full">
			<div class="flex flex-col w-full justify-center items-center text-center space-y-2">
				<span class="text-sm">
					Copyright © 2023 Korean International Statistical Society. All rights reserved.
				</span>

				<span class="text-xs max-w-3xl">
					statkiss.org is the official domain of the Korean International Statistical Society. Korean International Statistical Society (KISS) is a 501(c)(3) nonprofit organization. EIN: 45-1725264.
				</span>

				<div class="flex flex-row">
					<a href="https://www.facebook.com/groups/190717430950968" target="_blank" rel="noreferrer">
						<img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/footer_facebook.svg" class="w-4 h-4" alt="Facebook" />
					</a>
				</div>
			</div>
		</div>
	)
}

const footerMountNode = document.getElementById("div_footer_react") || document.getElementById("div_footer")
if (footerMountNode) {
	ReactDOM.render(<Div_footer />, footerMountNode)
}
