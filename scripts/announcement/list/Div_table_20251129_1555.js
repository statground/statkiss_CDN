function Div_table(props) {
    return (
        <section class="w-full space-y-4">
            {/* 상단 보드 헤더 */}
            <header class="w-full pb-4 border-b border-slate-200">
                <div class="flex items-center justify-between gap-3">
                    {/* 현재 메뉴 이름 (Announcement / KISS Event / Member News 등) */}
                    <p class="text-[11px] font-semibold tracking-[0.25em] text-slate-500 uppercase">
                        {props.title}
                    </p>

                    {/* 글쓰기 버튼 자리 - 우측 정렬 */}
                    <div class="flex md:justify-end" id="div_table_write_button"></div>
                </div>
            </header>

            {/* 목록 카드 컨테이너 */}
            <div class="w-full bg-slate-50 rounded-3xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden">
                <div id="div_table_tbody" class="divide-y divide-slate-100">
                    {/* 초기 로딩용 skeleton 3개 */}
                    {[0, 1, 2].map((i) => (
                        <div key={i} class="px-4 py-4">
                            <article class="rounded-2xl border border-slate-100 bg-white px-4 py-4 animate-pulse">
                                <div class="flex flex-col md:flex-row gap-4 md:items-center">
                                    <div class="flex-1 space-y-3">
                                        <div class="h-5 w-28 bg-slate-200 rounded-full"></div>
                                        <div class="h-4 w-3/4 bg-slate-200 rounded-full"></div>
                                        <div class="flex flex-wrap gap-2">
                                            <div class="h-4 w-24 bg-slate-200 rounded-full"></div>
                                            <div class="h-4 w-20 bg-slate-200 rounded-full"></div>
                                            <div class="h-4 w-16 bg-slate-200 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div class="h-4 w-16 bg-slate-200 rounded-full"></div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                {/* 메시지 (영어) */}
                <div id="loading_indicator" class="py-4 text-center text-xs text-slate-400 hidden">
                    Loading more...
                </div>
                <div id="end_indicator" class="py-4 text-center text-xs text-slate-400 hidden">
                    All posts have been loaded.
                </div>
            </div>
        </section>
    );
}