// =============================================
//  Global state
// =============================================
let data_file = null;          // Result of file upload (/blank/ajax_file_upload/)
let data_newsletter = null;    // Raw fetch result

let newsletterItems = [];      // Normalized newsletter list
let newslettersLoaded = false; // Whether list finished loading
let activeRange = null;        // { from, to } or null
let searchQuery = "";          // Lower-cased search text
let isAdmin = false;           // Updated in get_div_add_newsletter
let toggle_btn_submit = false; // Prevent double submit