// =============================================
//  전역 변수 초기화
// =============================================
let data_file = null;          // 파일 업로드 결과
let data_newsletter = null;    // 원본 fetch 결과

let newsletterItems = [];      // 최종 배열 데이터
let newslettersLoaded = false; // 로딩 완료 여부
let activeRange = null;        // { from, to } 또는 null
let searchQuery = "";          // 검색어 (소문자)
let isAdmin = false;           // 권한 정보 (get_div_add_newsletter에서 갱신)