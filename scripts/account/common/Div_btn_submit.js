function Div_btn_submit(props) {
	return (
		<button id={props.id} type="button" onClick={props.function}
				class={props.class}>
		{props.text}
	</button>
	)
}