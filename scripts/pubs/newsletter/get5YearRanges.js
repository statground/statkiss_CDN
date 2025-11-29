// =============================================
//  5년 단위 필터 범위 생성
// =============================================
function get5YearRanges(list) {
    if (!list || list.length === 0) return [];

    const years = [...new Set(list.map((n) => n.year))]
        .filter(Boolean)
        .sort((a, b) => b - a);

    if (years.length === 0) return [];

    const minYear = years[years.length - 1];
    const maxYear = years[0];

    const ranges = [];
    for (let y = maxYear; y >= minYear; y -= 5) {
        ranges.push({ from: y, to: y - 4 });
    }
    return ranges;
}
