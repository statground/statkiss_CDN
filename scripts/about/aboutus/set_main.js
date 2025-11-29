function set_main() {
	function Div_main() {
		function Div_header(props) {
			return (
				<h1 class="max-w-2xl text-2xl font-extrabold tracking-tight leading-none">
					{props.text}
				</h1>                    
			)
		}
	
		function Div_li_start(props) {
			return (
				<li class="flex items-start">
					<svg class="w-3.5 h-3.5 mt-1 mr-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
					</svg>
					{props.text}
				</li>                    
			)
		}
	
		return (
			<div class="flex flex-col justify-center items-center w-full pt-12 pb-12 justify-center space-y-12">
				<div class="flex w-full h-[500px] md:h-[250px]
							bg-[url('https://cdn.jsdelivr.net/gh/statground/statKISS_CDN/images/photos/025.jpg')] bg-center bg-cover">
				</div>
	
				<div class="flex flex-col place-self-start space-y-6 w-full max-w-screen-xl px-4 mx-auto">
					<div class="place-self-center col-span-7 space-y-6 mx-2">
						<Div_header text={"About KISS"} />
	
						<p class="font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
							The Korean International Statistical Society (KISS) is a non-profit corporation that is organized and operated for educational, charitable, and scientific purposes only. Its observes are:
						</p>
	
						<ul class="text-gray-500 list-inside space-y-2">
							<Div_li_start text={"to promote the theory and applications of statistical disciplines through scholarly activities, including publication of journals in statistics and probability, scientific meetings, and other educational programs"} />
							<Div_li_start text={"to broaden applications of statistical techniques in all areas of society, including industry and government"} />
							<Div_li_start text={"to promote better understanding and interest by the general public in statistical methodology and related applications"} />
							<Div_li_start text={"to promote better communication through the development of standards and common terminology"} />
							<Div_li_start text={"to foster cooperative efforts among educational, research, industrial, and governmental personnel in statistical activities,"} />
							<Div_li_start text={"to cooperate with Korean and other international organizations in the advancement of statistics."} />
						</ul>
	
						<p class="text-gray-500">
							The objectives are pursued without regard to race, creed, color, sex or nationality.
						</p>
					</div>
				</div>
	
	
				<div class="flex flex-col place-self-start space-y-6 w-full max-w-screen-xl px-4 mx-auto">
					<Div_header text={"Why join KISS?"} />
					
					<ol class="space-y-3 text-gray-500 list-decimal list-inside">
						<li>
							<span class="font-semibold text-gray-900">
								Affiliations with professional statistical societies have many advantages:
							</span>
							<ul class="pl-5 mt-2 space-y-1 list-disc list-inside">
								<li>Networking</li>
								<li>Staying abreast of current research trends </li>
								<li>Practical career skills and knowledge, mentoring, and advice from more experienced statistics professionals in the organization</li>
								<li>Diverse experiences helpful for career development</li>
								<li>Source of information: job openings, events, etc.  </li>
							</ul>
	
							<br/>
						</li>
	
						<li>
							<span class="font-semibold text-gray-900">
								Joining KISS has special benefits:
							</span>
	
							<ul class="pl-5 mt-2 space-y-1 list-disc list-inside">
								<li>Easier to network, share experiences, and learn from others with a smaller organization</li>
								<li>More opportunities for developing leadership, communication, and interpersonal skills</li>
								<li>Greater impact of individual efforts</li>
							</ul>
	
							<br/>
						</li>
						
						<li>
							<span class="font-semibold text-gray-900">
								Many long-term rewards:
							</span>
	
							<ul class="pl-5 mt-2 space-y-1 list-disc list-inside">
								<li>Gaining research and professional skills and knowledge that are important for starting and building careers </li>
								<li>Resume building through membership and service to KISS </li>
								<li>Relationship building: developing friendships; identifying collaborators, mentors, sponsors </li>
								<li>Exposure to problem-solving in the real world. We are all life-long learners and being engaged with KISS will provide valuable opportunities for continuous personal and professional growth.</li>
							</ul>
	
							<br/>
						</li>
					</ol>
				</div>
			</div>
		)
	}

	ReactDOM.render(<Div_main />, document.getElementById("div_main"))
}