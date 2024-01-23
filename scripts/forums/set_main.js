function set_main() {
	// 스켈레톤
	ReactDOM.render(<Div_main_skeleton />, document.getElementById("div_main"))

	get_links()
	get_user_role()
}