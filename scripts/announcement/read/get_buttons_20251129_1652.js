// get_buttons_20240207_2223.js (리뉴얼 버전)
async function get_buttons() {
    const Div_buttons = (props) => {
        return (
            <div class="w-full px-4 py-4 md:px-8 md:py-5">
                <div class="flex flex-col sm:flex-row sm:justify-end gap-3">
                    <div class="flex flex-wrap justify-center sm:justify-end gap-2">
                        {props.admin && (
                            <button
                                type="button"
                                onClick={() =>
                                    (location.href = "/announcement/" + url + "/write/")
                                }
                                class="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2
                                       text-xs md:text-sm font-semibold text-white shadow-sm
                                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            >
                                Write
                            </button>
                        )}

                        {props.admin && (
                            <button
                                type="button"
                                onClick={() =>
                                    (location.href =
                                        "/announcement/" + url + "/edit/" + uuid + "/")
                                }
                                class="inline-flex items-center justify-center rounded-full bg-slate-800 px-4 py-2
                                       text-xs md:text-sm font-semibold text-white shadow-sm
                                       hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
                            >
                                Edit
                            </button>
                        )}

                        {props.admin && (
                            <button
                                type="button"
                                onClick={() => click_delete()}
                                class="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2
                                       text-xs md:text-sm font-semibold text-white shadow-sm
                                       hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                            >
                                Delete
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => (location.href = "/announcement/" + url + "/")}
                            class="inline-flex items-center justify-center rounded-full bg-white px-4 py-2
                                   text-xs md:text-sm font-semibold text-slate-700 border border-slate-200
                                   hover:bg-slate-50 hover:text-slate-900
                                   focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // 권한 정보 가져오기
    const data = await fetch("/ajax_get_menu_header/")
        .then((res) => res.json());

    gv_role = data["name"];

    const isAdmin =
        gv_username !== "" &&
        (data.role === "Administrator" ||
            data.role === "Developer" ||
            data.officer !== "Member");

    ReactDOM.render(
        <Div_buttons admin={isAdmin} />,
        document.getElementById("div_buttons")
    );
}