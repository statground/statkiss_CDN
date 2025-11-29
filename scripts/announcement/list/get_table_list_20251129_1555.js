// 최초 호출되는 함수
async function get_table_list() {
    // 상태 초기화
    gv_offset = 0;
    gv_is_loading = false;
    gv_all_loaded = false;
    gv_article_rows = [];

    // 첫 번째 chunk 로딩
    await fetch_article_chunk();

    // 스크롤 이벤트는 한 번만 등록
    if (!gv_scroll_initialized) {
        window.addEventListener("scroll", handle_board_scroll);
        gv_scroll_initialized = true;
    }

    // 첫 5개를 로드해도 페이지 높이가 화면보다 작으면
    // 자동으로 한 번 더 로딩해서 최소한 스크롤할 거리 확보
    const doc = document.documentElement;
    if (!gv_all_loaded && doc.scrollHeight <= window.innerHeight + 50) {
        await fetch_article_chunk();
    }
}
