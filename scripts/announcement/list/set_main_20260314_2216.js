const { useEffect, useMemo, useRef, useState } = React;

(function initStatkissAnnouncementShared() {
  if (window.StatKISS_AnnouncementShared) return;

  function getAnnouncementI18N() {
    return window.StatKISS_AnnouncementI18N || null;
  }

  function getContext() {
    const ctx = window.STATKISS_ANNOUNCEMENT_CONTEXT || {};
    return {
      url: ctx.url || window.url || "",
      mode: ctx.mode || "",
      uuid: ctx.uuid || window.uuid || "",
      currentLang: ctx.currentLang || document.documentElement.getAttribute("lang") || "en",
      basePath: ctx.basePath || "/announcement/",
    };
  }

  function getI18N() {
    return window.StatKISS_I18N || null;
  }

  function normalizeLang(lang) {
    const A = getAnnouncementI18N();
    if (A && typeof A.normalizeLang === "function") {
      return A.normalizeLang(lang || "en");
    }
    const I = getI18N();
    if (I && typeof I.resolveLangCode === "function") {
      return I.resolveLangCode(lang || "en");
    }
    return (lang || "en").trim() || "en";
  }

  function getCurrentLang() {
    return normalizeLang(getContext().currentLang || document.documentElement.getAttribute("lang") || "en");
  }

  function getLangLabel(code) {
    const I = getI18N();
    const normalized = normalizeLang(code);
    if (I && Array.isArray(I.languages)) {
      const found = I.languages.find((item) => item.code === normalized);
      if (found) return found.label;
    }
    return normalized;
  }

  function t(key, lang) {
    const current = normalizeLang(lang || getCurrentLang());
    const A = getAnnouncementI18N();
    if (A && typeof A.t === "function") {
      return A.t(key, current);
    }
    return key;
  }

  function getAnnouncementBasePath() {
    let base = getContext().basePath || "/announcement/";
    if (!base.endsWith("/")) base += "/";
    return base;
  }

  function buildPagePath(mode, id) {
    const ctx = getContext();
    let path = getAnnouncementBasePath();
    if (ctx.url) path += `${ctx.url}/`;
    if (mode) path += `${mode}/`;
    if (id) path += `${id}/`;
    return path;
  }

  function buildAjaxPath(endpoint) {
    return `${getAnnouncementBasePath()}${endpoint}/`;
  }

  function parseCookie(name) {
    const prefix = `${name}=`;
    const items = (document.cookie || "").split(";");
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i].trim();
      if (item.startsWith(prefix)) {
        return decodeURIComponent(item.substring(prefix.length));
      }
    }
    return "";
  }

  function getCookie(name) {
    if (typeof window.getCookie === "function") return window.getCookie(name);
    return parseCookie(name);
  }

  async function fetchHeaderUser() {
    try {
      const response = await fetch("/ajax_get_menu_header/", { credentials: "same-origin", cache: "no-store" });
      return await response.json();
    } catch (_) {
      return {};
    }
  }

  function canManageAnnouncements(payload) {
    if (!payload) return false;
    const username = String(payload.username || payload.gv_username || window.gv_username || "").trim();
    const authenticated = payload.is_authenticated === true || payload.authenticated === true || payload.logged_in === true || username !== "";
    if (!authenticated) return false;

    if (payload.is_superuser || payload.is_staff) return true;

    const role = String(payload.role || payload.gv_role || "").trim();
    const officer = String(payload.officer || "").trim();
    return role === "Administrator" || role === "Developer" || (officer && officer !== "Member");
  }

  async function postForm(endpoint, formData) {
    const response = await fetch(buildAjaxPath(endpoint), {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: formData,
    });
    const payload = await response.json().catch(() => ({ ok: false, message: "Invalid JSON response." }));
    if (!response.ok || payload.ok === false) {
      const message = payload && payload.message ? payload.message : `Request failed (${response.status})`;
      throw new Error(message);
    }
    return payload;
  }

  function setPageTitle(title) {
    const finalTitle = title && String(title).trim() ? String(title).trim() : t("untitled");
    if (typeof window.change_title === "function") {
      window.change_title(finalTitle);
      return;
    }
    document.title = finalTitle;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatFileSize(size) {
    const value = Number(size || 0);
    if (!Number.isFinite(value) || value <= 0) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let unitIndex = 0;
    let next = value;
    while (next >= 1024 && unitIndex < units.length - 1) {
      next /= 1024;
      unitIndex += 1;
    }
    return `${next.toFixed(next >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
  }

  function dedupeFiles(currentFiles, incomingFiles) {
    const map = new Map();
    (currentFiles || []).forEach((file) => {
      const key = `${file.name}::${file.size}::${file.lastModified}`;
      map.set(key, file);
    });
    (incomingFiles || []).forEach((file) => {
      const key = `${file.name}::${file.size}::${file.lastModified}`;
      if (!map.has(key)) map.set(key, file);
    });
    return Array.from(map.values());
  }

  function getCategoryTitle(url, lang) {
    const currentLang = normalizeLang(lang || getCurrentLang());
    const A = getAnnouncementI18N();
    if (A && typeof A.getCategoryTitle === "function") {
      return A.getCategoryTitle(url, currentLang);
    }
    return "Announcement";
  }

  function getCategoryDescription(url, lang) {
    const currentLang = normalizeLang(lang || getCurrentLang());
    const A = getAnnouncementI18N();
    if (A && typeof A.getCategoryDescription === "function") {
      return A.getCategoryDescription(url, currentLang);
    }
    return "";
  }

  function formatAnnouncementDate(value, lang) {
    const currentLang = normalizeLang(lang || getCurrentLang());
    const A = getAnnouncementI18N();
    if (A && typeof A.formatDate === "function") {
      return A.formatDate(value, currentLang);
    }
    return String(value || "");
  }

  function forceLinksToNewWindow(sourceHtml) {
    const htmlText = String(sourceHtml || "");
    if (!htmlText) return "";
    try {
      const container = document.createElement("div");
      container.innerHTML = htmlText;
      container.querySelectorAll("a[href]").forEach((anchor) => {
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      });
      return container.innerHTML;
    } catch (_) {
      return htmlText;
    }
  }

  function isAnnouncementDarkTheme() {
    const root = document.documentElement;
    if (!root) return false;
    if (root.classList.contains("dark")) return true;
    const theme = String(root.getAttribute("data-theme") || "").toLowerCase();
    if (theme === "dark") return true;
    return false;
  }

  function parseCssColor(value) {
    const raw = String(value || "").trim().toLowerCase();
    if (!raw || raw === "transparent" || raw === "inherit" || raw === "initial" || raw === "unset") {
      return null;
    }

    let match = raw.match(/^rgba?\(([^)]+)\)$/i);
    if (match) {
      const parts = match[1].split(",").map((item) => item.trim());
      if (parts.length >= 3) {
        return {
          r: Math.max(0, Math.min(255, Number(parts[0]) || 0)),
          g: Math.max(0, Math.min(255, Number(parts[1]) || 0)),
          b: Math.max(0, Math.min(255, Number(parts[2]) || 0)),
          a: parts.length >= 4 ? Math.max(0, Math.min(1, Number(parts[3]) || 0)) : 1,
        };
      }
    }

    match = raw.match(/^#([0-9a-f]{3,8})$/i);
    if (match) {
      const hex = match[1];
      if (hex.length === 3 || hex.length === 4) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
        return { r, g, b, a };
      }
      if (hex.length === 6 || hex.length === 8) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
        return { r, g, b, a };
      }
    }

    return null;
  }

  function colorLuminance(color) {
    if (!color) return 0;
    const transform = (channel) => {
      const value = (Number(channel || 0) / 255);
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    const r = transform(color.r);
    const g = transform(color.g);
    const b = transform(color.b);
    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  }

  function isVeryLightColor(color) {
    return !!(color && color.a > 0.08 && colorLuminance(color) >= 0.82);
  }

  function isVeryDarkColor(color) {
    return !!(color && color.a > 0.08 && colorLuminance(color) <= 0.24);
  }

  function adaptRichContentForTheme(root) {
    if (!root) return;

    root.querySelectorAll("a[href]").forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });

    if (!isAnnouncementDarkTheme()) return;

    const tableTags = new Set(["table", "thead", "tbody", "tfoot", "tr", "th", "td", "pre", "code", "blockquote"]);
    const skipTags = new Set(["img", "svg", "path", "video", "iframe", "canvas", "picture", "source"]);
    const nodes = [root, ...root.querySelectorAll("*")];

    nodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const tag = String(node.tagName || "").toLowerCase();
      if (skipTags.has(tag)) return;

      const computed = window.getComputedStyle(node);
      const backgroundColor = parseCssColor(computed.backgroundColor);
      const textColor = parseCssColor(computed.color);
      const borderColor = parseCssColor(computed.borderColor);

      if (isVeryLightColor(backgroundColor)) {
        if (tableTags.has(tag)) {
          node.style.setProperty("background-color", "rgba(148, 163, 184, 0.14)", "important");
        } else {
          node.style.setProperty("background-color", "transparent", "important");
        }
        node.style.setProperty("background-image", "none", "important");
      }

      if (isVeryDarkColor(textColor)) {
        node.style.setProperty("color", "#f8fafc", "important");
      }

      if (isVeryLightColor(borderColor)) {
        node.style.setProperty("border-color", "#334155", "important");
      }

      if (node.hasAttribute("bgcolor") && !tableTags.has(tag)) {
        node.style.setProperty("background-color", "transparent", "important");
        node.removeAttribute("bgcolor");
      }
    });
  }

  function injectAnnouncementThemeFallback() {
    if (document.getElementById("statkiss-announcement-theme-fallback")) return;
    const style = document.createElement("style");
    style.id = "statkiss-announcement-theme-fallback";
    style.textContent = `
      html.dark body,
      html.dark #div_main {
        background: #020617 !important;
        color: #f8fafc !important;
      }
      html.dark .sk-ann-surface,
      html.dark .sk-ann-soft,
      html.dark .sk-ann-card,
      html.dark .sk-ann-input,
      html.dark .sk-ann-dropzone,
      html.dark .sk-ann-chip,
      html.dark .sk-ann-button--ghost,
      html.dark .toastui-editor-defaultUI,
      html.dark .toastui-editor-toolbar,
      html.dark .toastui-editor-popup,
      html.dark .toastui-editor-ww-container,
      html.dark .toastui-editor-md-container,
      html.dark .toastui-editor-mode-switch {
        background: #0f172a !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
      }
      html.dark .sk-ann-card:hover,
      html.dark .sk-ann-button--ghost:hover {
        background: #111827 !important;
      }
      html.dark .sk-ann-muted,
      html.dark .text-slate-500,
      html.dark .text-slate-400 {
        color: #cbd5e1 !important;
      }
      html.dark .text-slate-900,
      html.dark .text-slate-800,
      html.dark .text-slate-700,
      html.dark .text-slate-600 {
        color: #f8fafc !important;
      }
      html.dark .bg-white {
        background-color: #0f172a !important;
      }
      html.dark .bg-slate-50 {
        background-color: #0b1220 !important;
      }
      html.dark .bg-slate-100 {
        background-color: #111827 !important;
      }
      html.dark .bg-slate-200 {
        background-color: #1e293b !important;
      }
      html.dark .border-slate-100,
      html.dark .border-slate-200,
      html.dark .border-slate-300,
      html.dark .border-slate-400 {
        border-color: #334155 !important;
      }
      html.dark .divide-slate-100 > :not([hidden]) ~ :not([hidden]),
      html.dark .divide-slate-200 > :not([hidden]) ~ :not([hidden]) {
        border-color: #1e293b !important;
      }
      html.dark .placeholder\:text-slate-400::placeholder,
      html.dark input::placeholder,
      html.dark textarea::placeholder {
        color: #94a3b8 !important;
      }
      html.dark .bg-amber-100 {
        background-color: rgba(251, 191, 36, 0.16) !important;
      }
      html.dark .text-amber-700 {
        color: #fbbf24 !important;
      }
      html.dark .bg-red-50 {
        background-color: rgba(127, 29, 29, 0.2) !important;
      }
      html.dark .border-red-200 {
        border-color: rgba(248, 113, 113, 0.45) !important;
      }
      html.dark .text-red-600 {
        color: #fecaca !important;
      }
      html.dark .sk-ann-content,
      html.dark .sk-ann-content * {
        color: #f8fafc !important;
      }
      html.dark .sk-ann-content a {
        color: #93c5fd !important;
      }
      html.dark .sk-ann-content [style*="background"],
      html.dark .sk-ann-content [bgcolor] {
        background-image: none !important;
      }
      html.dark .sk-ann-content blockquote,
      html.dark .sk-ann-content table,
      html.dark .sk-ann-content td,
      html.dark .sk-ann-content th,
      html.dark .sk-ann-content pre,
      html.dark .sk-ann-content code {
        border-color: #334155 !important;
      }
      html.dark .toastui-editor-toolbar-icons,
      html.dark .toastui-editor-mode-switch .tab-item {
        filter: invert(1) hue-rotate(180deg);
      }
    `;
    document.head.appendChild(style);
  }

  function classNames() {
    return Array.from(arguments).filter(Boolean).join(" ");
  }

  window.StatKISS_AnnouncementShared = {
    t,
    getContext,
    getCurrentLang,
    getLangLabel,
    getAnnouncementBasePath,
    buildPagePath,
    buildAjaxPath,
    fetchHeaderUser,
    canManageAnnouncements,
    postForm,
    setPageTitle,
    escapeHtml,
    formatFileSize,
    dedupeFiles,
    getCategoryTitle,
    getCategoryDescription,
    formatAnnouncementDate,
    forceLinksToNewWindow,
    adaptRichContentForTheme,
    injectAnnouncementThemeFallback,
    classNames,
  };
})();
function set_main() {
  const S = window.StatKISS_AnnouncementShared;
  const {
    t,
    getContext,
    getCurrentLang,
    buildPagePath,
    fetchHeaderUser,
    canManageAnnouncements,
    postForm,
    setPageTitle,
    getCategoryTitle,
    getCategoryDescription,
    formatAnnouncementDate,
    injectAnnouncementThemeFallback,
    classNames,
  } = S;

  injectAnnouncementThemeFallback();

  const ctx = getContext();
  const PAGE_SIZE = 10;

  function EmptyState({ lang }) {
    return (
      <div className="px-6 py-12 text-center text-sm text-slate-500 sk-ann-muted">
        {t("noPosts", lang)}
      </div>
    );
  }

  function SkeletonRows() {
    return (
      <div className="divide-y divide-slate-100">
        {[0, 1, 2].map((index) => (
          <div key={index} className="px-4 py-4">
            <div className="animate-pulse rounded-2xl border border-slate-100 bg-white px-4 py-4">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded-full bg-slate-200"></div>
                <div className="h-5 w-3/4 rounded-full bg-slate-200"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-4 w-28 rounded-full bg-slate-200"></div>
                  <div className="h-4 w-16 rounded-full bg-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ListApp() {
    const [lang, setLang] = useState(getCurrentLang());
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [canManage, setCanManage] = useState(false);
    const sentinelRef = useRef(null);
    const offsetRef = useRef(0);
    const loadingRef = useRef(false);

    useEffect(() => {
      function handleLangEvent(event) {
        const nextLang = event && event.detail ? event.detail.lang : getCurrentLang();
        if (nextLang) setLang(nextLang);
      }
      window.addEventListener("statkiss:lang", handleLangEvent);
      return () => window.removeEventListener("statkiss:lang", handleLangEvent);
    }, []);

    useEffect(() => {
      let alive = true;
      async function refreshPermission() {
        const user = await fetchHeaderUser();
        if (alive) setCanManage(canManageAnnouncements(user));
      }
      refreshPermission();
      return () => {
        alive = false;
      };
    }, []);

    useEffect(() => {
      setPageTitle(`${getCategoryTitle(ctx.url, lang)} - StatKISS`);
    }, [lang]);

    async function loadChunk(initial) {
      if (loadingRef.current) return;
      loadingRef.current = true;
      if (initial) {
        setLoading(true);
        setRows([]);
        setHasMore(true);
        offsetRef.current = 0;
      } else {
        setLoadingMore(true);
      }

      try {
        const formData = new FormData();
        formData.append("url", ctx.url);
        formData.append("lang", lang);
        formData.append("offset", String(offsetRef.current));
        formData.append("limit", String(PAGE_SIZE));

        const payload = await postForm("ajax_get_article_list", formData);
        const nextRows = Array.isArray(payload.rows) ? payload.rows : [];

        setRows((current) => (initial ? nextRows : current.concat(nextRows)));
        offsetRef.current += nextRows.length;
        setHasMore(Boolean(payload.has_more) && nextRows.length > 0);
      } catch (err) {
        if (initial) setRows([]);
        setHasMore(false);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    }

    useEffect(() => {
      loadChunk(true);
    }, [lang, ctx.url]);

    useEffect(() => {
      if (!sentinelRef.current) return undefined;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting && hasMore && !loadingRef.current) {
            loadChunk(false);
          }
        },
        { rootMargin: "240px" }
      );
      observer.observe(sentinelRef.current);
      return () => observer.disconnect();
    }, [hasMore, rows.length, lang]);

    return (
      <div className="py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6 space-y-8">
        <div className="mx-auto max-w-screen-lg text-center space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {getCategoryTitle(ctx.url, lang)}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            {getCategoryTitle(ctx.url, lang)}
          </h1>
          {getCategoryDescription(ctx.url, lang) ? (
            <p className="mx-auto max-w-3xl text-sm md:text-base text-slate-500">
              {getCategoryDescription(ctx.url, lang)}
            </p>
          ) : null}
        </div>

        <section className="space-y-4">
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              {getCategoryTitle(ctx.url, lang)}
            </div>
            {canManage ? (
              <button
                type="button"
                onClick={() => { window.location.href = buildPagePath("write"); }}
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                {t("write", lang)}
              </button>
            ) : null}
          </header>

          <div className="sk-ann-surface overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
            {loading ? (
              <SkeletonRows />
            ) : rows.length === 0 ? (
              <EmptyState lang={lang} />
            ) : (
              <div className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <div key={row.uuid} className="px-4 py-3">
                    <a href={buildPagePath("read", row.uuid)} target="_blank" rel="noopener noreferrer" className="block">
                      <article className="sk-ann-card group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm">
                        <div className="flex flex-1 items-start gap-4">
                          <div className="mt-1 hidden sm:flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{t("createdAt", lang)}</span>
                            <span className="mt-1 text-[11px] font-medium text-slate-700 text-center">{formatAnnouncementDate(row.created_at_iso || row.created_at, lang)}</span>
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                <span className="text-[11px] font-semibold text-slate-700 tracking-wide">
                                  {getCategoryTitle(ctx.url, lang)}
                                </span>
                              </div>

                              {row.is_new ? (
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-700">
                                  NEW
                                </span>
                              ) : null}

                              {row.attachment_count > 0 ? (
                                <span className="sk-ann-chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M7 13.5 12 18.5 17 13.5M12 18.5V3.5M5 21H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  {row.attachment_count}
                                </span>
                              ) : null}
                            </div>

                            <h2 className="text-base md:text-lg font-semibold text-slate-900 line-clamp-1">
                              {row.title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 sm:hidden">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path d="M7 4V2.5M17 4V2.5M3 9H21M6 4H18C19.6569 4 21 5.34315 21 7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {formatAnnouncementDate(row.created_at_iso || row.created_at, lang)}
                              </span>

                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </article>
                    </a>
                  </div>
                ))}

                {loadingMore ? <SkeletonRows /> : null}
              </div>
            )}

            {!loading && !hasMore && rows.length > 0 ? (
              <div className="px-6 py-4 text-center text-xs text-slate-400">{t("allLoaded", lang)}</div>
            ) : null}

            <div ref={sentinelRef} className="h-2 w-full"></div>
          </div>
        </section>
      </div>
    );
  }

  ReactDOM.render(<ListApp />, document.getElementById("div_main"));
}
