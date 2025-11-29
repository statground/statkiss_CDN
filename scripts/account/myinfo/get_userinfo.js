async function get_userinfo() {
	const data = await fetch("/account/ajax_get_userinfo/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	document.getElementById("txt_email").value = data.email
	document.getElementById("txt_name").value = data.name
	document.getElementById("sel_gender").value = data.gender
	document.getElementById("txt_affiliation").value = data.affiliation
	document.getElementById("txt_title").value = data.title
	document.getElementById("sel_education").value = data.education
	document.getElementById("txt_interest").value = data.interest

	input_checker()
}