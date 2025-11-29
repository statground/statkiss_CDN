// 실제로 서버에서 데이터 가져오는 함수
async function fetch_article_chunk() {
    if (gv_is_loading || gv_all_loaded) return;

    gv_is_loading = true;

    const endIndicator = document.getElementById("end_indicator");
    if (endIndicator) endIndicator.classList.add("hidden");

    // 현재까지의 데이터 + skeleton 표시
    const tbody = document.getElementById("div_table_tbody");
    if (tbody) {
        ReactDOM.render(
            <Div_table_tbody rows={gv_article_rows} is_loading={true} />,
            tbody
        );
    }

    const request_data = new FormData();
    request_data.append("url", url);
    request_data.append("offset", gv_offset);
    request_data.append("limit", BOARD_LIMIT);

    try {
        const response = await fetch("/announcement/ajax_get_article_list/", {
            method: "post",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            body: request_data,
        });

        const chunk = await response.json();

        // dict → array (키 정렬 후 values)
        const keys = Object.keys(chunk).sort((a, b) => Number(a) - Number(b));
        const rows = keys.map((k) => chunk[k]);

        // 처음부터 데이터가 없는 경우
        if (rows.length === 0 && gv_article_rows.length === 0) {
            gv_article_rows = [];
            if (tbody) {
                ReactDOM.render(
                    <Div_table_tbody rows={gv_article_rows} is_loading={false} />,
                    tbody
                );
            }
            gv_all_loaded = true;
            if (endIndicator) endIndicator.classList.remove("hidden");
            return;
        }

        // 새 rows를 누적
        gv_article_rows = gv_article_rows.concat(rows);
        gv_offset += rows.length;

        if (tbody) {
            ReactDOM.render(
                <Div_table_tbody rows={gv_article_rows} is_loading={false} />,
                tbody
            );
        }

        // 마지막 페이지라면 플래그 설정
        if (rows.length < BOARD_LIMIT) {
            gv_all_loaded = true;
            if (endIndicator) endIndicator.classList.remove("hidden");
        }
    } catch (e) {
        console.error("ajax_get_article_list error:", e);
        // 에러가 나도 skeleton은 지우고 현재까지 데이터만 보여주기
        if (tbody) {
            ReactDOM.render(
                <Div_table_tbody rows={gv_article_rows} is_loading={false} />,
                tbody
            );
        }
    } finally {
        gv_is_loading = false;
    }
}
