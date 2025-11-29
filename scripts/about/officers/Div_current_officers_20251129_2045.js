function Div_current_officers(props) {
  function OfficerCard({ role, name, affiliation }) {
    const isHighlight =
      role === "President" || role === "President-elect" || role === "President-past";

    return (
      <article
        className={
          "relative flex flex-col items-start p-5 bg-white rounded-2xl shadow-sm border w-full " +
          (isHighlight
            ? "border-sky-300 shadow-md"
            : "border-gray-100 hover:border-sky-200 hover:shadow-md transition")
        }
      >
        <span
          className={
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-3 " +
            (isHighlight ? "bg-sky-50 text-sky-700" : "bg-gray-100 text-gray-600")
          }
        >
          {role}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        {affiliation ? (
          <p className="text-sm text-gray-500 leading-snug">{affiliation}</p>
        ) : null}
      </article>
    );
  }

  if (!props.data || props.data.length === 0) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {props.data.map((p, idx) => (
        <OfficerCard
          key={idx + p.name}
          role={p.role}
          name={p.name}
          affiliation={p.affiliation}
        />
      ))}
    </div>
  );
}
