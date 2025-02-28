async function get_article_list() {
	function Div_section(props) {
		return (
			<div class="w-full p-2 cursor-pointer rounded-lg hover:bg-blue-100 hover:border hover:border-blue-300 hover:shadow"
				 onClick={() => location.href='/announcement/' + props.url + '/read/' + props.uuid + '/'}>
				<div class="flex justify-center items-center w-full h-10 rounded-full bg-primary-100">
					<span class="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
						{props.tag}
					</span>
				</div>
				<h3 class="mb-2 text-lg font-bold">{props.title}</h3>
				<div class="flex flex-row w-full justify-end items-center text-end">
					<span class="text-sm">{props.date}</span>
				</div>
			</div>              
		)
	}

	function Div_main_latest_news(props) {
		return (
			<div class="flex flex-col justiy-center items-center bg-blue-100 w-full py-4">
				<div class="flex flex-row justify-start items-start w-full max-w-screen-xl px-4 lg:px-6">
					<h2 class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900">
						Latest News
					</h2>
				</div>
				<div class="grid grid-cols-3 md:grid-cols-1 md:gap-12 md:space-y-0">
					{
						Object.keys(props.data).length > 0
						?   <Div_section uuid={props.data[0].uuid}
										 url={props.data[0].url}
										 title={props.data[0].title}
										 tag={props.data[0].category}
										 date={props.data[0].created_at} />
						:   ""
					}
					{
						Object.keys(props.data).length > 1
						?   <Div_section uuid={props.data[1].uuid}
										 url={props.data[1].url}
										 title={props.data[1].title}
										 tag={props.data[1].category}
										 date={props.data[1].created_at} />
						:   ""
					}
					{
						Object.keys(props.data).length > 2
						?   <Div_section uuid={props.data[2].uuid}
										 url={props.data[2].url}
										 title={props.data[2].title}
										 tag={props.data[2].category}
										 date={props.data[2].created_at} />
						:   ""
					}
				</div>
			</div>
		)
	}

	function Div_main_tabs_contents(props) {
		return (
			<div class="grid grid-cols-2 md:gap-8 md:space-y-0 border border-gray-300 p-8 w-full md:grid-cols-1">
				{
					Object.keys(props.data).length > 0
					?   <Div_section uuid={props.data[0].uuid}
									 url={props.data[0].url}
									 title={props.data[0].title}
									 tag={props.data[0].category}
									 date={props.data[0].created_at} />
					:   ""
				}
				{
					Object.keys(props.data).length > 1
					?   <Div_section uuid={props.data[1].uuid}
									 url={props.data[1].url}
									 title={props.data[1].title}
									 tag={props.data[1].category}
									 date={props.data[1].created_at} />
					:   ""
				}
				{
					Object.keys(props.data).length > 2
					?   <Div_section uuid={props.data[2].uuid}
									 url={props.data[2].url}
									 title={props.data[2].title}
									 tag={props.data[2].category}
									 date={props.data[2].created_at} />
					:   ""
				}
				{
					Object.keys(props.data).length > 3
					?   <Div_section uuid={props.data[3].uuid}
									 url={props.data[3].url}
									 title={props.data[3].title}
									 tag={props.data[3].category}
									 date={props.data[3].created_at} />
					:   ""
				}
				{
					Object.keys(props.data).length > 4
					?   <Div_section uuid={props.data[4].uuid}
									 url={props.data[4].url}
									 title={props.data[4].title}
									 tag={props.data[4].category}
									 date={props.data[4].created_at} />
					:   ""
				}
				{
					Object.keys(props.data).length > 5
					?   <Div_section uuid={props.data[5].uuid}
									 url={props.data[5].url}
									 title={props.data[5].title}
									 tag={props.data[5].category}
									 date={props.data[5].created_at} />
					:   ""
				}
			</div>
		)
	}

	const data = await fetch("/ajax_get_article_list/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	ReactDOM.render(<Div_main_latest_news data={data.all} />, document.getElementById("div_main_latest_news"))
	ReactDOM.render(<Div_main_tabs_contents data={data.event} />, document.getElementById("div_tab_kiss_event"))
	ReactDOM.render(<Div_main_tabs_contents data={data.ads} />, document.getElementById("div_tab_advertisement"))
	ReactDOM.render(<Div_main_tabs_contents data={data.member} />, document.getElementById("div_tab_member_news"))
	ReactDOM.render(<Div_main_tabs_contents data={data.jobs} />, document.getElementById("div_tab_job_related_news"))
}

