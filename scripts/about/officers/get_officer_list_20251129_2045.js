// 데이터를 가져와서 한 번에 정리해 주는 헬퍼 함수
async function get_officer_list() {
  const res = await fetch("/about/ajax_get_officer_list/");
  const data = await res.json();
  const values = Object.values(data);

  const current = values.filter(
    (it) => it.role !== "Board of Directors" && it.role !== "Incoming Board Member"
  );

  const incoming = values.filter((it) => it.role === "Incoming Board Member");

  const boardRaw = values.filter((it) => it.role === "Board of Directors");
  const boardOfDirectors = {};
  boardRaw.forEach((item) => {
    if (!boardOfDirectors[item.term]) {
      boardOfDirectors[item.term] = [];
    }
    boardOfDirectors[item.term].push(item);
  });

  return {
    current,
    boardOfDirectors,
    incoming,
  };
}