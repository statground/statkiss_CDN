async function get_footer_banner_list() {
	function Div_main_footer_banner(props) {
		const banner_list = Object.keys(props.data).map((btn_data) =>  
			<div class="flex flex-row justify-center items-center w-full">
				<div class={"w-[200px] h-[75px] cursor-pointer bg-[url(" + props.data[btn_data].url_banner + ")] bg-cover bg-full md:w-[125px] md:h-[47.875px]"}
					  onClick={() => window.open(props.data[btn_data].url)}>
				</div>
			</div>
		)

		return (
			<div class="grid grid-cols-6 justify-start items-center w-full gap-x-8 px-32 overflow-x-scroll scroll-smooth scroll-hide 
						md:grid-cols-3 md:px-4">
				{banner_list}
			</div>
		)
	}

	const data = await fetch("/ajax_get_footer_banner_list/")
						.then(res=> { return res.json(); })
						.then(res=> { return res; });

	console.log(data)

	ReactDOM.render(<Div_main_footer_banner data={data} />, document.getElementById("div_main_footer_banner"))
}