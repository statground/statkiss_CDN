// get_article_read_20240215_0232.js (리뉴얼 버전)
async function get_article_read() {
    // 상단 메타 + 타임존/NEW 뱃지
    const TimeBadge = ({ label, value }) => {
        if (!value) return null;
        return (
            <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                <svg
                    class="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 6V12L15 15"
                        stroke="#64748B"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <circle
                        cx="12"
                        cy="12"
                        r="8"
                        stroke="#64748B"
                        stroke-width="1.6"
                    />
                </svg>
                <span class="uppercase">{label}</span>
                <span class="text-[10px] text-slate-500">· {value}</span>
            </span>
        );
    };

    const Div_title = (props) => {
        const writer = props.writer || props.name || "";
        const isNew = String(props.is_new) === "1";

        return (
            <div class="w-full px-4 py-5 md:px-8 md:py-5 bg-white"> {/* 살짝 컴팩트하게 */}
                <div class="flex flex-col gap-3">   {/* gap-4 → gap-3 */}
                    {/* 카테고리 + NEW 뱃지 */}
                    <div class="flex flex-wrap items-center gap-2">
                        {props.category && (
                            <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                                <span class="inline-block h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                <span class="text-[11px] font-semibold text-slate-700 tracking-wide">
                                    {props.category}
                                </span>
                            </span>
                        )}

                        {isNew && (
                            <span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5">
                                <svg
                                    class="w-3 h-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 3L13.9021 8.0979L19 10L13.9021 11.9021L12 17L10.0979 11.9021L5 10L10.0979 8.0979L12 3Z"
                                        stroke="#D97706"
                                        stroke-width="1.4"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span class="text-[10px] font-semibold tracking-wide text-amber-700">
                                    NEW
                                </span>
                            </span>
                        )}
                    </div>

                    {/* 제목 */}
                    <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                        {props.title}
                    </h1>

                    {/* 기본 메타: 메인 날짜 + 작성자 */}
                    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {props.created_at && (
                            <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                                <svg
                                    class="w-3 h-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 4V2.5"
                                        stroke="#64748B"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                    <path
                                        d="M17 4V2.5"
                                        stroke="#64748B"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="17"
                                        rx="3"
                                        stroke="#64748B"
                                        stroke-width="1.5"
                                    ></rect>
                                    <path
                                        d="M3 9H21"
                                        stroke="#64748B"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                </svg>
                                <span>{props.created_at}</span>
                            </span>
                        )}

                        {writer && (
                            <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                                <svg
                                    class="w-3 h-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                                        stroke="#64748B"
                                        stroke-width="1.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M5 20C5 16.6863 7.68629 14 11 14H13C16.3137 14 19 16.6863 19 20"
                                        stroke="#64748B"
                                        stroke-width="1.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span>{writer}</span>
                            </span>
                        )}
                    </div>

                    {/* 타임존 메타: KST / ET / PT */}
                    <div class="mt-0.5 flex flex-wrap gap-1.5"> {/* mt-1 → mt-0.5, gap 줄임 */}
                        <TimeBadge label="KST" value={props.created_at_kst} />
                        <TimeBadge label="US Eastern (ET)" value={props.created_at_est} />
                        <TimeBadge label="US Pacific (PT)" value={props.created_at_pst} />
                    </div>
                </div>
            </div>
        );
    };


    // --- 데이터 요청 ---
    const request_data = new FormData();
    request_data.append("uuid", uuid);

    let data;
    try {
        data = await fetch("/announcement/ajax_get_article_read/", {
            method: "post",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            body: request_data,
        })
            .then((res) => res.json());
    } catch (e) {
        console.error("ajax_get_article_read error:", e);
        // 실패 시 간단한 에러 메시지 출력
        ReactDOM.render(
            <div class="w-full px-4 py-6 md:px-8 md:py-6">
                <p class="text-sm text-red-500">
                    Failed to load the post. Please try again later.
                </p>
            </div>,
            document.getElementById("div_title")
        );
        return;
    }

    // 상단 타이틀 + 메타 렌더
    ReactDOM.render(
        <Div_title
            title={data.title}
            category={data.category}
            writer={data.writer || data.name}
            is_new={data.is_new}
            created_at={data.created_at}
            created_at_kst={data.created_at_kst}
            created_at_est={data.created_at_est}
            created_at_pst={data.created_at_pst}
        />,
        document.getElementById("div_title")
    );

    // 브라우저 탭 타이틀
    if (typeof change_title === "function") {
        change_title(data.title + " - " + (data.created_at || ""));
    }

    // 본문 내용 viewer (toastui)
    toastui.Editor.factory({
        el: document.querySelector("#div_contents"),
        viewer: true,
        initialValue: data.content || "",
    });
}
