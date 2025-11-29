/**
 * KISS Main Page - Responsive Layout Fixed
 * [Layout Logic]
 * - Mobile / Tablet (< 1024px): Stacked Layout (1 Column) -> "위-아래" 배치
 * - Desktop (>= 1024px): Side-by-Side Layout (2 Columns) -> "좌-우" 배치
 * All breakpoints consistently use 'lg' (1024px) for clarity.
 */

function set_main() {
  const ROOT_ID = "div_main";

  // -----------------------------
  // 1. Data Fetching
  // -----------------------------
  async function fetchJson(url) {
	try {
	  const res = await fetch(url, { method: "GET" });
	  if (!res.ok) throw new Error("HTTP " + res.status);
	  return await res.json();
	} catch (e) {
	  console.warn("[KISS Main] Fetch failed:", url, e);
	  return null;
	}
  }

  // -----------------------------
  // 2. Date Formatting
  // -----------------------------
  function formatDate(value) {
	if (!value) return "";
	const timestamp = Number(value);
	if (!isNaN(timestamp) && timestamp > 0) {
	  const date = new Date(timestamp);
	  return date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric"
	  });
	}
	return value;
  }

  // HTML 태그 + 엔티티 제거 (&nbsp; 등)
  function stripHtml(str) {
	if (!str) return "";
	// 1) 엔티티 디코딩
	const txt = document.createElement("textarea");
	txt.innerHTML = str;
	const decoded = txt.value || "";
	// 2) 태그 제거 + 공백 정리
	return decoded.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  }

  // -----------------------------
  // 3. Data Processing
  // -----------------------------
  function normalizeList(maybeList) {
	if (!maybeList) return [];
	let list = [];
	if (Array.isArray(maybeList)) {
	  list = maybeList;
	} else {
	  list = Object.keys(maybeList).map((k) => maybeList[k]);
	}

	// Sort Descending
	return list
	  .filter((v) => v)
	  .sort((a, b) => {
		const dateA = new Date(a.created_at_kst || a.created_at);
		const dateB = new Date(b.created_at_kst || b.created_at);
		return dateB - dateA;
	  });
  }

  // -----------------------------
  // 4. Components
  // -----------------------------

  function articleHref(item) {
	if (!item || !item.url || !item.uuid) return "#";
	return `/announcement/${item.url}/read/${item.uuid}/`;
  }

  function HeroNewsItem({ item }) {
	return (
	  <a
		href={articleHref(item)}
		className="group flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 py-3 px-2 rounded-lg transition hover:bg-slate-50"
	  >
		<div className="space-y-1">
		  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-indigo-500">
			{item.category || item.type || "News"}
		  </div>
		  <div className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors">
			{item.title}
		  </div>
		</div>
		<div className="text-left sm:text-right text-[11px] text-slate-400 whitespace-nowrap mt-1 sm:mt-0.5">
		  {formatDate(item.created_at_kst || item.date)}
		</div>
	  </a>
	);
  }

  function MainSkeleton() {
	return (
	  <div className="mx-auto max-w-6xl px-6 pt-8 pb-6 space-y-6">
		<div className="h-96 w-full rounded-2xl bg-white shadow-xl shadow-slate-900/5 animate-pulse" />
		<div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1.1fr] gap-6">
		   <div className="h-64 rounded-2xl bg-white shadow-xl shadow-slate-900/5 animate-pulse" />
		   <div className="h-64 rounded-2xl bg-white shadow-xl shadow-slate-900/5 animate-pulse" />
		</div>
	  </div>
	);
  }

  /**
   * Hero Section (Latest News)
   */
  function HeroSection({ articleData, loading }) {
	const allList = normalizeList(articleData?.all);

	if (loading || allList.length === 0) return null;

	const mainArticle = allList[0];
	const sideArticles = allList.slice(1, 4);

	const heroTitle = mainArticle.title;
	const heroDate = formatDate(mainArticle.created_at_kst || mainArticle.created_at);
	const heroCategory = mainArticle.category || "News";
	const heroUrl = articleHref(mainArticle);
	const heroDescRaw = mainArticle.content || "";
	const heroDesc = heroDescRaw
	  ? stripHtml(heroDescRaw)
	  : "Stay up to date with the latest news and announcements from the Korean International Statistical Society.";

	return (
	  <section className="mx-auto max-w-6xl px-6 pt-8 pb-6">
		<div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 lg:p-10">
		  
		  <div className="grid grid-cols-[1.8fr_1fr] gap-10 lg:grid-cols-1 lg:gap-8">
			
			{/* Main Article */}
			<div className="flex flex-col justify-between border-slate-100 border-r pr-10 lg:border-r-0 lg:pr-0">
			  <div>
				<div className="mb-4 flex items-center gap-2">
				   <span className="relative flex h-2 w-2">
					  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
					  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
				   </span>
				   <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Latest News</span>
				</div>
				
				<a href={heroUrl} className="group block">
				  <div className="mb-3 inline-block rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600">
					{heroCategory}
				  </div>
				  <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 group-hover:text-indigo-700 lg:text-2xl">
					{heroTitle}
				  </h1>
				  <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-4">
					{heroDesc}
				  </p>
				</a>
			  </div>

			  <div className="flex items-center justify-between gap-4 text-xs font-medium">
				<span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
				  📅 {heroDate}
				</span>
				<a href={heroUrl} className="text-indigo-600 hover:text-indigo-800 hover:underline">
				  Read more &rarr;
				</a>
			  </div>
			</div>

			{/* Side List */}
			<div className="flex flex-col lg:border-t lg:border-slate-100 lg:pt-8">
			  <div className="mb-4 flex items-center justify-between pb-2">
				<span className="text-xs font-bold text-slate-900">More latest news</span>
			  </div>
			  
			  <div className="flex flex-col divide-y divide-slate-50">
				{sideArticles.map((item) => (
				  <HeroNewsItem key={item.uuid} item={item} />
				))}
			  </div>
			</div>

		  </div>
		</div>
	  </section>
	);
  }

  function BulletinItem({ item, sectionLabel }) {
	return (
	  <a
		href={articleHref(item)}
		className="group block rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5"
	  >
		<div className="mb-2 flex items-center justify-between">
		   <span className="rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600">
			{item.category || sectionLabel || "Notice"}
		  </span>
		  <span className="text-[10px] text-slate-400">
			{formatDate(item.created_at_kst || item.date)}
		  </span>
		</div>
		<div className="text-[13px] font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-700">
		  {item.title}
		</div>
		<div className="mt-1 text-[11px] text-slate-500 line-clamp-1">
		  {stripHtml(item.content || "")}
		</div>
		<div className="mt-2 flex justify-end">
		   <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest group-hover:text-indigo-400">
			 {sectionLabel || item.category || "Notice"}
		   </span>
		</div>
	  </a>
	);
  }

  function BulletinSection({ loading, articleData }) {
	const tabsConfig = [
	  { key: "event",  label: "KISS Event",        icon: "📅", get list() { return normalizeList(articleData.event); }},
	  { key: "ads",    label: "Advertisement",     icon: "📢", get list() { return normalizeList(articleData.ads); }},
	  { key: "member", label: "Member News",       icon: "👥", get list() { return normalizeList(articleData.member); }},
	  { key: "jobs",   label: "Job Related Ads.",  icon: "💼", get list() { return normalizeList(articleData.jobs); }}
	];

	const [activeKey, setActiveKey] = React.useState("event");
	const activeTab  = tabsConfig.find((t) => t.key === activeKey) || tabsConfig[0];
	const activeList = activeTab.list || [];

	return (
	  <section className="flex flex-col h-full rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5">
		<div className="mb-5 flex flex-wrap items-end justify-between gap-2">
		  <div>
			<h2 className="text-sm font-bold text-slate-900">KISS Bulletin</h2>
			<p className="mt-1 text-[11px] text-slate-500">Browse events, member news, and job opportunities.</p>
		  </div>
		</div>

		<div className="mb-4 flex flex-wrap gap-2">
		  {tabsConfig.map((tab) => {
			const isActive = tab.key === activeKey;
			return (
			  <button
				key={tab.key}
				type="button"
				onClick={() => setActiveKey(tab.key)}
				className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold transition-all ${
				  isActive 
					? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
					: "bg-slate-50 text-slate-600 hover:bg-slate-100"
				}`}
			  >
				<span>{tab.icon}</span>
				<span>{tab.label}</span>
			  </button>
			)
		  })}
		</div>

		<div className="flex-1 space-y-3 bg-slate-50/50 p-1 rounded-xl">
		   {loading ? (
			 <div className="p-4 text-center text-xs text-slate-400">Loading...</div>
		   ) : activeList.length === 0 ? (
			 <div className="p-8 text-center text-[11px] text-slate-400">No posts available.</div>
		   ) : (
			 activeList.slice(0, 5).map((item) => (
			   <BulletinItem key={item.uuid} item={item} sectionLabel={activeTab.label} />
			 ))
		   )}
		</div>
	  </section>
	);
  }

  function QuickAccessSection({ memberCount, loadingMember }) {
	const items = [
	  { icon: "📘", label: "Journal",    desc: "Access KISS journal articles.",   url: "/pubs/journals/" },
	  { icon: "🏆", label: "Awards",     desc: "Learn about KISS awards.",        url: "/awards/career/" },
	  { icon: "📨", label: "Newsletter", desc: "View recent newsletters.",        url: "/pubs/newsletter/" },
	  { icon: "📣", label: "KISS News",  desc: "Browse all announcements.",       url: "/announcement/event/" },
	  { icon: "👤", label: "Membership", desc: "Join or renew membership.",       url: "/membership/" },
	  { icon: "💝", label: "Donation",   desc: "Support KISS activities.",        url: "/membership/donations/" }
	];

	return (
	  <section className="flex flex-col h-full gap-6">
		 {/* Quick access */}
		 <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 flex-1">
			<div className="mb-4">
			  <h2 className="text-sm font-bold text-slate-900">Quick access</h2>
			  <p className="mt-1 text-[11px] text-slate-500">Frequently used sections</p>
			</div>
			<div className="grid grid-cols-1 gap-3">
			  {items.map((item) => (
				<button
				  key={item.label}
				  type="button"
				  onClick={() => item.url && (location.href = item.url)}
				  className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50 hover:shadow-sm"
				>
				  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg group-hover:bg-white">
					{item.icon}
				  </div>
				  <div>
					<div className="text-[12px] font-bold text-slate-800 group-hover:text-indigo-700">
					  {item.label}
					</div>
					<div className="text-[10px] text-slate-500 line-clamp-1">
					  {item.desc}
					</div>
				  </div>
				</button>
			  ))}
			</div>
		 </div>

		 {/* Total Members - 디자인 변경 */}
		 <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-500/30">
			 <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>
			 <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>

			 <div className="relative z-10 flex items-center gap-3 mb-4">
				<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">
				  👥
				</div>
				<div className="flex flex-col">
				  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">
					Total Members
				  </span>
				  <span className="text-[11px] text-indigo-100/80">
					KISS community worldwide
				  </span>
				</div>
			 </div>
			 
			 <div className="relative z-10 text-4xl font-extrabold tracking-tight">
				{loadingMember
				  ? "..."
				  : memberCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
			 </div>
		 </div>
	  </section>
	);
  }

  function SponsorsSection({ banners, loadingBanners }) {
	return (
	  <section className="mx-auto max-w-6xl px-6 pb-12">
		<div className="rounded-3xl bg-slate-900 p-8 shadow-2xl shadow-slate-900/20">
		  <div className="mb-4 flex items-center gap-4">
			 <div className="h-px w-8 bg-indigo-500"></div>
			 <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
			   Partners &amp; Sponsors
			 </div>
			 <div className="h-px flex-1 bg-slate-800"></div>
		  </div>

		  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
			{loadingBanners ? (
			  <div className="text-[11px] text-slate-500">Loading banners...</div>
			) : banners.length === 0 ? (
			  <div className="text-[11px] text-slate-500">No banners.</div>
			) : (
			  banners.map((b, idx) => (
				<button
				  key={idx}
				  type="button"
				  onClick={() => window.open(b.url, "_blank")}
				  className="h-16 w-48 flex-none rounded-lg bg-slate-800 bg-cover bg-center shadow-lg transition-all hover:scale-105 hover:opacity-100 opacity-80 border border-slate-700"
				  style={{ backgroundImage: `url(${b.url_banner})` }}
				/>
			  ))
			)}
		  </div>
		</div>
	  </section>
	);
  }

  // -----------------------------
  // Main Layout
  // -----------------------------

  function KissMainLayout() {
	const [loadingArticles, setLoadingArticles] = React.useState(true);
	const [loadingMember, setLoadingMember] = React.useState(true);
	const [loadingBanners, setLoadingBanners] = React.useState(true);

	const [articleData, setArticleData] = React.useState({});
	const [memberCount, setMemberCount] = React.useState(0);
	const [banners, setBanners] = React.useState([]);

	React.useEffect(() => {
	  let isMounted = true;
	  async function loadAll() {
		const [art, mem, ban] = await Promise.all([
		   fetchJson("/ajax_get_article_list/"),
		   fetchJson("/ajax_get_member_count/"),
		   fetchJson("/ajax_get_footer_banner_list/")
		]);
		
		if (!isMounted) return;

		if (art) { setArticleData(art); setLoadingArticles(false); }
		if (mem && typeof mem.CNT === "number") { setMemberCount(mem.CNT); setLoadingMember(false); }
		if (ban) {
		  const list = Array.isArray(ban) ? ban : Object.values(ban);
		  setBanners(list.map(x => ({ url: x.url, url_banner: x.url_banner })));
		  setLoadingBanners(false);
		}
	  }
	  loadAll();
	  return () => { isMounted = false; };
	}, []);

	if (loadingArticles) return <div className="bg-slate-50 min-h-screen"><MainSkeleton /></div>;

	return (
	  <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-10">
		
		{/* 1. Hero Section */}
		<HeroSection articleData={articleData} loading={loadingArticles} />

		{/* 2. Main Grid Layout */}
		<section className="mx-auto grid max-w-6xl grid-cols-[2.2fr_1.1fr] gap-6 px-6 pb-8 lg:grid-cols-1">
		  <BulletinSection
			articleData={articleData || {}}
			loading={loadingArticles}
		  />
		  <QuickAccessSection
			memberCount={memberCount}
			loadingMember={loadingMember}
		  />
		</section>

		{/* 3. Footer Sponsors */}
		<SponsorsSection
		  banners={banners}
		  loadingBanners={loadingBanners}
		/>

		<div className="text-center text-[10px] text-slate-400 pb-8">
		   StatKISS &copy; 2025. All rights reserved.
		</div>
	  </div>
	);
  }

  // -----------------------------
  // Mount
  // -----------------------------
  const rootEl = document.getElementById(ROOT_ID);
  if (rootEl) {
	if (window.ReactDOM && ReactDOM.createRoot) {
	  ReactDOM.createRoot(rootEl).render(<KissMainLayout />);
	} else if (window.ReactDOM && ReactDOM.render) {
	  ReactDOM.render(<KissMainLayout />, rootEl);
	}
  }
}