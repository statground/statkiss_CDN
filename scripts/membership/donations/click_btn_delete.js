async function click_btn_delete(uuid) {
	if(confirm("Are you sure you want to delete it?")){
		// 인증 코드
		const inputData = new FormData();
		inputData.append('uuid', uuid);

		data_user = await fetch("/membership/ajax_delete_donator/", {
								method: "post", 
								headers: {"X-CSRFToken": getCookie("csrftoken"),},
								body: inputData
							})
							.then(res=> { location.href="/membership/donations/" })
							.then(res=> { location.href="/membership/donations/" });
	}
}