// set_main_20240104_0745.js
function set_main() {

    // 0) URL 값(event, ads, member, jobs)에 따라 문구 결정
    const MENU_BY_URL = {
        "event": {
            title: "KISS Event",
            desc: "Stay informed about KISS conferences, sessions, and academic events."
        },
        "ads": {
            title: "Advertisement",
            desc: "Calls for sessions, abstracts, conferences, and other professional opportunities related to KISS and the broader statistics community."
        },
        "member": {
            title: "KISS Member News",
            desc: "Updates, achievements, and activities shared by KISS members worldwide."
        },
        "jobs": {
            title: "KISS Job Board",
            desc: "Explore job opportunities and career-related announcements from the KISS community."
        }
    };

    // url 값이 존재하지 않으면 fallback
    const menu_info = MENU_BY_URL[url] || {
        title: "KISS Announcement",
        desc: ""
    };

    // 1) 메인 전체 영역 렌더
    ReactDOM.render(
        (
            <div class="py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6 space-y-10">

                {/* ---------- 상단 소개 타이틀 영역 ---------- */}
                <div class="mx-auto max-w-screen-lg text-center">
                    <h2 class="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">
                        {menu_info.title}
                    </h2>

                    {menu_info.desc && (
                        <p class="mb-8 text-gray-500 lg:text-lg">
                            {menu_info.desc}
                        </p>
                    )}
                </div>

                {/* ---------- 게시판 본문 ---------- */}
                <div class="w-full" id="div_table"></div>
            </div>
        ),
        document.getElementById("div_main")
    );

    // 2) 테이블 본체 렌더
    ReactDOM.render(
        <Div_table title={menu_info.title} description={menu_info.desc} />,
        document.getElementById("div_table")
    );

    // 3) 상단 글쓰기 버튼 렌더
    async function render_write_button() {
        const data = await fetch("/ajax_get_menu_header/").then((res) => res.json());

        gv_role = data["name"];

        const has_write_permission =
            gv_username !== "" &&
            (data.role === "Administrator" ||
            data.role === "Developer" ||
            data.officer !== "Member");

        if (!has_write_permission) return;

        const target = document.getElementById("div_table_write_button");
        if (!target) return;

        ReactDOM.render(
            (
                <button
                    type="button"
                    onClick={() => (location.href = "/announcement/" + url + "/write/")}
                    class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5
                        text-xs md:text-sm font-semibold text-white shadow-sm
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    글쓰기
                </button>
            ),
            target
        );
    }

    render_write_button();

    // 4) 무한 스크롤 게시물 로딩
    get_table_list();
}
