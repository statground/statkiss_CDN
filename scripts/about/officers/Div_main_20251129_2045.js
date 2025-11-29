function Div_main() {
  const [state, setState] = React.useState({
    loading: true,
    data: null,
    error: null,
  });

  React.useEffect(() => {
    let mounted = true;

    get_officer_list()
      .then((data) => {
        if (mounted) {
          setState({ loading: false, data, error: null });
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) {
          setState({ loading: false, data: null, error: err });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // ----------------- Skeleton -----------------
  function SkeletonOfficerCard() {
    return (
      <div className="flex flex-col justify-center items-start p-5 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse space-y-3">
        <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-40 bg-gray-200 rounded-full"></div>
        <div className="h-3 w-32 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  function SkeletonBoardCard() {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse space-y-3">
        <div className="h-3 w-24 bg-gray-200 rounded-full mb-2"></div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
            <div className="h-3 w-36 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="py-8 px-4 mx-auto w-full">
        {/* 상단 타이틀 스켈레톤 */}
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
          <div className="h-9 w-40 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 w-72 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Officers 카드 스켈레톤 */}
        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonOfficerCard key={idx} />
            ))}
          </div>
        </section>

        {/* Board of Directors 스켈레톤 */}
        <section className="mt-2">
          <div className="h-6 w-48 bg-gray-200 rounded-full mb-6 animate-pulse"></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <SkeletonBoardCard key={idx} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="py-8 px-4 mx-auto w-full">
        <p className="text-sm text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  const { current, boardOfDirectors, incoming } = state.data || {};
  const term = current && current.length > 0 ? current[0].term : "";

  return (
    <div className="py-8 px-4 mx-auto w-full">
      {/* 상단 타이틀: 기존 디자인 그대로 */}
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Officers
        </h2>
        <p className="font-light text-gray-500 sm:text-xl">
          Korean International Statistical Society
          {term ? ` (${term})` : ""}
        </p>
      </div>

      {/* Officers 카드 */}
      {current && current.length > 0 && (
        <section className="mb-12">
          <Div_current_officers data={current} />
        </section>
      )}

      {/* Board of Directors */}
      <section className="mt-2">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">Board of Directors</h2>
        <Div_board_of_directors data={boardOfDirectors} />
      </section>

      {/* Incoming Board Members: 데이터가 있을 때만 노출 */}
      {incoming && incoming.length > 0 && (
        <Div_incoming_board_member term={incoming[0].term} data={incoming} />
      )}
    </div>
  );
}
