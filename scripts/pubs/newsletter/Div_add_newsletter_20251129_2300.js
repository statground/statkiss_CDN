// =============================================
//  커스텀 Add Newsletter 폼 (달력 포함)
//  - CDN에서 가져오는 Div_add_newsletter를 이 버전으로 덮어씀
// =============================================
function Div_add_newsletter() {
    return (
        <section className="w-full">
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Add Newsletter
                </h3>

                <div className="flex flex-wrap items-end gap-4">
                    {/* Publish Date (달력) */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="id_publish_date"
                            className="text-sm font-medium text-gray-800"
                        >
                            Publish<br />Date
                        </label>
                        <input
                            id="id_publish_date"
                            name="publish_date"
                            type="date"
                            className="h-11 w-56 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 outline-none
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Volume */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="id_volume"
                            className="text-sm font-medium text-gray-800"
                        >
                            Volume
                        </label>
                        <input
                            id="id_volume"
                            name="volume"
                            type="number"
                            min="1"
                            className="h-11 w-56 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 outline-none
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Issue */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="id_issue"
                            className="text-sm font-medium text-gray-800"
                        >
                            Issue
                        </label>
                        <input
                            id="id_issue"
                            name="issue"
                            type="number"
                            min="1"
                            className="h-11 w-56 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 outline-none
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* 오른쪽 버튼 영역 */}
                    <div className="ml-auto flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => document.getElementById("id_file_upload").click()}
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white
                                       shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <span className="mr-1.5 text-base">📤</span>
                            File Upload
                        </button>

                        <button
                            type="button"
                            onClick={click_btn_submit}
                            className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white
                                       shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}