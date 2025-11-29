// window 스크롤 이벤트 핸들러
function handle_board_scroll() {
    if (gv_all_loaded || gv_is_loading) return;

    const doc = document.documentElement;
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = doc.scrollHeight - 200;

    if (scrollPosition >= threshold) {
        fetch_article_chunk();
    }
}
