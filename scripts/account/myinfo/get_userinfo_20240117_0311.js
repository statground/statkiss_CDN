async function get_userinfo() {
	const data = await fetch("/account/ajax_get_userinfo/")
					.then(res=> { return res.json(); })
					.then(res=> { return res; });

	document.getElementById("txt_email").value = data.email
	let txt_membership = data.role
	if (txt_membership == "Regular Member" || txt_membership == "Student Member") { txt_membership += " (Expired on " + data.expired_at + ")"}
	document.getElementById("txt_membership").value = txt_membership
	document.getElementById("txt_name").value = data.name
	document.getElementById("sel_gender").value = data.gender
	document.getElementById("txt_affiliation").value = data.affiliation
	document.getElementById("txt_title").value = data.title
	document.getElementById("sel_education").value = data.education_value
	document.getElementById("txt_interest").value = data.interest

	uuid_user = data.uuid
	uuid_role = data.uuid_role

	input_checker()
}