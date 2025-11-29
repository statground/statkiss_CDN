// set_main_20240118_1025.js (리뉴얼 버전)
function set_main() {
    // 상단 제목 영역 스켈레톤
    const Div_title_skeleton = () => (
        <div class="w-full px-4 py-6 md:px-8 md:py-6">
            <div class="flex flex-col gap-3 animate-pulse">
                <div class="flex flex-wrap items-center gap-2">
                    <div class="h-5 w-24 rounded-full bg-slate-200"></div>
                    <div class="h-5 w-12 rounded-full bg-slate-200"></div>
                </div>
                <div class="h-7 w-3/4 rounded-lg bg-slate-200"></div>
                <div class="h-4 w-1/3 rounded-full bg-slate-200"></div>
                <div class="flex flex-wrap gap-2 mt-2">
                    <div class="h-4 w-32 rounded-full bg-slate-200"></div>
                    <div class="h-4 w-32 rounded-full bg-slate-200"></div>
                    <div class="h-4 w-32 rounded-full bg-slate-200"></div>
                </div>
            </div>
        </div>
    );

    // 본문 스켈레톤
    const Div_contents_skeleton = () => (
        <div class="w-full px-4 py-6 md:px-8 md:py-6">
            <div class="space-y-3 animate-pulse">
                <div class="h-4 w-4/5 rounded bg-slate-200"></div>
                <div class="h-4 w-2/3 rounded bg-slate-200"></div>
                <div class="h-4 w-full rounded bg-slate-200"></div>
                <div class="h-4 w-[90%] rounded bg-slate-200"></div>
                <div class="h-4 w-3/4 rounded bg-slate-200"></div>
                <div class="h-4 w-1/2 rounded bg-slate-200"></div>
            </div>
        </div>
    );

    // 전체 레이아웃: 목록 카드와 비슷한 느낌으로 감싸는 컨테이너
    const Div_main = () => (
        <div class="py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6">
            <article
                class="w-full bg-slate-50 rounded-3xl shadow-sm ring-1 ring-slate-200/70 overflow-hidden"
            >
                {/* 상단 제목/메타 영역 */}
                <header
                    id="div_title"
                    class="border-b border-slate-200"
                ></header>

                {/* 본문 내용 (toastui Viewer가 여기에 렌더) */}
                <section
                    id="div_contents"
                    class="bg-white px-4 md:px-8 py-6 md:py-8"   // ⬅ 여백 추가
                ></section>

                {/* 버튼 영역 */}
                <footer
                    id="div_buttons"
                    class="border-t border-slate-200 bg-slate-50"
                ></footer>
            </article>
        </div>
    );

    // 메인 레이아웃 + 스켈레톤 먼저 렌더
    ReactDOM.render(<Div_main />, document.getElementById("div_main"));
    ReactDOM.render(<Div_title_skeleton />, document.getElementById("div_title"));
    ReactDOM.render(
        <Div_contents_skeleton />,
        document.getElementById("div_contents")
    );

    // 실제 데이터 로딩
    get_article_read();
    get_buttons();
}