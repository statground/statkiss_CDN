async function click_btn_register_student() {
    const data = await fetch("/membership/ajax_add_student_membership/")
    .then(res=> { return res.json(); })
    .then(res=> { return res; });

    if (data.pending_role == null) {
        alert("Application completed. Please wait for the officer's approval.");
    } else {
        alert("Application already completed. Please wait for the officer's approval.");
    }
}
