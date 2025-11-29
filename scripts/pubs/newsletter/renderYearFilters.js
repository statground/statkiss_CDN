// =============================================
//  5년 단위 필터 버튼 렌더
// =============================================
function renderYearFilters() {
    const box = document.getElementById("yearFilters");
    if (!box) return;

    const ranges = get5YearRanges(newsletterItems);
    box.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.type = "button";
    allBtn.textContent = "All";
    allBtn.className =
        "px-3 py-1 rounded-full border text-[11px] font-medium " +
        (activeRange === null
            ? "bg-blue-600 text-white border-blue-600"
            : "border-gray-300 text-gray-700 bg-white");
    allBtn.addEventListener("click", () => {
        activeRange = null;
        renderYearFilters();
        renderNewsletterList();
    });
    box.appendChild(allBtn);

    ranges.forEach((r) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = `${r.from}–${r.to}`;
        const isActive =
            activeRange && activeRange.from === r.from && activeRange.to === r.to;

        btn.className =
            "px-3 py-1 rounded-full border text-[11px] font-medium " +
            (isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700 bg-white");
        btn.addEventListener("click", () => {
            activeRange = r;
            renderYearFilters();
            renderNewsletterList();
        });
        box.appendChild(btn);
    });
}
