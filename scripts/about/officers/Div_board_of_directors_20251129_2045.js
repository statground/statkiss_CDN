function Div_board_of_directors(props) {
  if (!props.data) return null;

  function GroupCard({ term, members }) {
    return (
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{term}</h3>
        <ul className="space-y-1.5">
          {members.map((m, idx) => (
            <li key={idx + m.name} className="flex items-start">
              <span className="mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0"></span>
              <div className="flex flex-col">
                <span className="text-sm text-gray-900">{m.name}</span>
                {m.affiliation ? (
                  <span className="text-xs text-gray-500">{m.affiliation}</span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  const terms = Object.keys(props.data).sort();
  if (terms.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {terms.map((term) => (
        <GroupCard key={term} term={term} members={props.data[term]} />
      ))}
    </div>
  );
}