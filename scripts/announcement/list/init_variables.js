let data_list = null
let data_index_list = []

const BOARD_LIMIT = 5;

// Infinite scroll global state
let gv_offset = 0;
let gv_is_loading = false;
let gv_all_loaded = false;

// All loaded rows are accumulated here
let gv_article_rows = [];

// Scroll handler 등록 여부
let gv_scroll_initialized = false;