// Incoming Board Member 섹션
function Div_incoming_board_member(props) {
  const list = props.data || [];
  if (list.length === 0) return null; // 데이터 없으면 섹션 자체가 안 나옴

  return (
    <section className="mt-10 bg-emerald-50/60 border-t border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-emerald-700 uppercase mb-1">
              New Members
            </p>
            <h2 className="text-xl font-semibold text-emerald-900">
              Incoming Board Members
            </h2>
            {props.term && (
              <p className="text-xs text-emerald-800 mt-1">
                Term: <span className="font-medium">{props.term}</span>
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-5">
          <ul className="space-y-1.5">
            {list.map((p, idx) => (
              <li key={idx + p.name} className="flex items-start">
                <svg
                  className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-900">{p.name}</span>
                  {p.affiliation && (
                    <span className="text-xs text-gray-500">{p.affiliation}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}