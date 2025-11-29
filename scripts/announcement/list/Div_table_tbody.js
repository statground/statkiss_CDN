function Div_table_tbody(props) {

    const rows = props.rows || [];
    const is_loading = !!props.is_loading;

    // 아무 글도 없고, 로딩도 아닐 때
    if (rows.length === 0 && !is_loading) {
        return (
            <div class="px-6 py-10 text-center text-sm text-slate-500">
                No posts have been registered yet.
            </div>
        );
    }

    return (
        <div class="w-full">
            {/* 실제 카드들 */}
            {rows.map((row) => (
                <div
                    key={row.uuid}
                    class="px-4 py-3"
                >
                    <a
                        class="block"
                        href={'/announcement/' + url + '/read/' + row.uuid + '/'}
                    >
                        <article
                            class="group flex items-center justify-between gap-4
                                rounded-2xl border border-slate-200 bg-white px-4 py-4
                                hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm transition-all duration-150"
                        >
                            {/* 왼쪽: 카테고리 + 제목 + 메타 정보 */}
                            <div class="flex flex-1 items-start gap-4">
                                {/* 날짜 배지 (데스크톱) */}
                                <div class="mt-1 hidden sm:flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                                    <span class="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                        Date
                                    </span>
                                    <span class="mt-1 text-[11px] font-medium text-slate-700 text-center">
                                        {row.created_at}
                                    </span>
                                </div>

                                <div class="flex-1 space-y-2">
                                    {/* 카테고리 뱃지 (단색) */}
                                    <div class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                                        <span class="inline-block h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                        <span class="text-[11px] font-semibold text-slate-700 tracking-wide">
                                            {row.category}
                                        </span>
                                    </div>

                                    {/* 제목 */}
                                    <h2 class="text-base md:text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-slate-900">
                                        {row.title}
                                    </h2>

                                    {/* 메타 정보 */}
                                    <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                        {/* 날짜 (모바일) */}
                                        <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 sm:hidden">
                                            <svg
                                                class="w-3 h-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M7 4V2.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"></path>
                                                <path d="M17 4V2.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"></path>
                                                <rect x="3" y="4" width="18" height="17" rx="3" stroke="#64748B" stroke-width="1.5"></rect>
                                                <path d="M3 9H21" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"></path>
                                            </svg>
                                            <span>{row.created_at}</span>
                                        </span>

                                        {/* 작성자 (닉네임만) */}
                                        <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
                                            <svg
                                                class="w-3 h-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                                                    stroke="#64748B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5 20C5 16.6863 7.68629 14 11 14H13C16.3137 14 19 16.6863 19 20"
                                                    stroke="#64748B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span>{row.writer}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽: 화살표 아이콘 (카드 오른쪽 정렬) */}
                            <div class="flex items-center">
                                <svg
                                    class="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                                    <path d="M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </article>
                    </a>
                </div>
            ))}

            {/* 추가 로딩 중일 때 skeleton 카드 3개 표시 */}
            {is_loading && (
                [0, 1, 2].map((i) => (
                    <div key={"sk-" + i} class="px-4 py-3">
                        <article class="rounded-2xl border border-slate-100 bg-white px-4 py-4 animate-pulse">
                            <div class="flex items-center gap-4">
                                <div class="flex-1 space-y-3">
                                    <div class="h-4 w-24 bg-slate-200 rounded-full"></div>
                                    <div class="h-5 w-3/4 bg-slate-200 rounded-full"></div>
                                    <div class="flex flex-wrap gap-2">
                                        <div class="h-4 w-28 bg-slate-200 rounded-full"></div>
                                        <div class="h-4 w-20 bg-slate-200 rounded-full"></div>
                                    </div>
                                </div>
                                <div class="h-4 w-4 bg-slate-200 rounded-full"></div>
                            </div>
                        </article>
                    </div>
                ))
            )}
        </div>
    );
}