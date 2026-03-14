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
    getLangLabel,
    buildPagePath,
    fetchHeaderUser,
    canManageAnnouncements,
    postForm,
    setPageTitle,
    getCategoryTitle,
    formatAnnouncementDate,
    forceLinksToNewWindow,
    adaptRichContentForTheme,
    injectAnnouncementThemeFallback,
    classNames,
    formatFileSize,
  } = S;

  injectAnnouncementThemeFallback();

  const ctx = getContext();

  function AttachmentList({ items }) {
    if (!items || items.length === 0) return null;
    return (
      <section className="mt-8">
        <div className="mb-3 text-sm font-semibold text-slate-700 sk-ann-muted">{t("attachments")}</div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <a
              key={item.uuid}
              href={item.download_url}
              target="_blank"
              rel="noopener noreferrer"
              className="sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="max-w-[16rem] truncate">{item.file_name}</span>
              <span className="text-slate-400">{formatFileSize(item.file_size)}</span>
            </a>
          ))}
        </div>
      </section>
    );
  }

  function LoadingCard() {
    return (
      <div className="py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6">
        <div className="sk-ann-surface overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="animate-pulse space-y-6 p-6 md:p-8">
            <div className="h-6 w-32 rounded-full bg-slate-200"></div>
            <div className="h-10 w-4/5 rounded-2xl bg-slate-200"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-28 rounded-full bg-slate-200"></div>
              <div className="h-8 w-40 rounded-full bg-slate-200"></div>
              <div className="h-8 w-36 rounded-full bg-slate-200"></div>
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full rounded bg-slate-200"></div>
              <div className="h-4 w-5/6 rounded bg-slate-200"></div>
              <div className="h-4 w-11/12 rounded bg-slate-200"></div>
              <div className="h-4 w-3/4 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ErrorCard({ message }) {
    return (
      <div className="py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6">
        <div className="sk-ann-surface rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-red-600 shadow-sm">
          {message}
        </div>
      </div>
    );
  }

  function ReadApp() {
    const [requestedLang, setRequestedLang] = useState(getCurrentLang());
    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [canManage, setCanManage] = useState(false);
    const [viewMode, setViewMode] = useState("current");
    const contentRef = useRef(null);

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
      function handleLangEvent(event) {
        const nextLang = event && event.detail ? event.detail.lang : getCurrentLang();
        if (nextLang) setRequestedLang(nextLang);
      }
      window.addEventListener("statkiss:lang", handleLangEvent);
      return () => window.removeEventListener("statkiss:lang", handleLangEvent);
    }, []);

    useEffect(() => {
      let alive = true;

      async function loadArticle() {
        setLoading(true);
        setError("");

        try {
          const formData = new FormData();
          formData.append("uuid", ctx.uuid);
          formData.append("lang", requestedLang);
          const result = await postForm("ajax_get_article_read", formData);
          if (!alive) return;
          setPayload(result);
          setViewMode("current");
          const articleTitle = (result.article && result.article.title) || t("untitled", requestedLang);
          setPageTitle(`${articleTitle} - StatKISS`);
        } catch (err) {
          if (!alive) return;
          setError(err && err.message ? err.message : t("failedLoad", requestedLang));
        } finally {
          if (alive) setLoading(false);
        }
      }

      if (ctx.uuid) {
        loadArticle();
      } else {
        setLoading(false);
        setError(t("failedLoad", requestedLang));
      }

      return () => {
        alive = false;
      };
    }, [requestedLang]);

    const currentArticle = payload && payload.article ? payload.article : null;
    const sourceArticle = payload && payload.source_article ? payload.source_article : null;
    const attachments = payload && Array.isArray(payload.attachments) ? payload.attachments : [];
    const displayedArticle = viewMode === "original" && sourceArticle ? sourceArticle : currentArticle;
    const canViewOriginal = !!((payload && payload.can_view_original) || (currentArticle && sourceArticle && currentArticle.lang !== sourceArticle.lang));
    const localizedCreatedAt = displayedArticle
      ? formatAnnouncementDate(displayedArticle.created_at_iso || displayedArticle.created_at, requestedLang)
      : "";
    const renderedContent = useMemo(
      () => forceLinksToNewWindow(displayedArticle && displayedArticle.content ? displayedArticle.content : ""),
      [displayedArticle && displayedArticle.content]
    );

    useEffect(() => {
      if (!displayedArticle) return;
      setPageTitle(`${displayedArticle.title || t("untitled", requestedLang)} - StatKISS`);
    }, [viewMode, displayedArticle && displayedArticle.title]);

    useEffect(() => {
      if (!contentRef.current) return undefined;

      const applyThemeAdaptation = () => {
        try {
          adaptRichContentForTheme(contentRef.current);
        } catch (_) {
          // no-op
        }
      };

      const rafId = window.requestAnimationFrame(applyThemeAdaptation);
      const observer = new MutationObserver(() => {
        window.requestAnimationFrame(applyThemeAdaptation);
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      return () => {
        window.cancelAnimationFrame(rafId);
        observer.disconnect();
      };
    }, [renderedContent, viewMode]);

    async function handleDelete() {
      if (!window.confirm(t("confirmDelete", requestedLang))) return;

      try {
        const formData = new FormData();
        formData.append("uuid", ctx.uuid);
        await postForm("ajax_delete_article", formData);
        window.location.href = buildPagePath();
      } catch (err) {
        window.alert(err && err.message ? err.message : t("failedDelete", requestedLang));
      }
    }

    if (loading) return <LoadingCard />;
    if (error) return <ErrorCard message={error} />;
    if (!displayedArticle) return <ErrorCard message={t("failedLoad", requestedLang)} />;

    return (
      <div className="py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6">
        <article className="sk-ann-surface overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <header className="border-b border-slate-200 bg-white px-6 py-6 md:px-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                    {getCategoryTitle(ctx.url, requestedLang)}
                  </span>

                  {displayedArticle.is_new ? (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      NEW
                    </span>
                  ) : null}

                  {canViewOriginal ? (
                    <button
                      type="button"
                      onClick={() => setViewMode(viewMode === "current" ? "original" : "current")}
                      className="sk-ann-button--ghost inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {viewMode === "current" ? t("viewOriginal", requestedLang) : t("viewCurrent", requestedLang)}
                    </button>
                  ) : null}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  {displayedArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {localizedCreatedAt ? (
                    <span className="sk-ann-chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 4V2.5M17 4V2.5M3 9H21M6 4H18C19.6569 4 21 5.34315 21 7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {localizedCreatedAt}
                    </span>
                  ) : null}


                  {attachments.length > 0 ? (
                    <span className="sk-ann-chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 13.5 12 18.5 17 13.5M12 18.5V3.5M5 21H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {attachments.length} {requestedLang === "ko" ? t("attachmentCount", requestedLang) : t("attachments", requestedLang)}
                    </span>
                  ) : null}
                </div>

              </div>
            </div>
          </header>

          <section className="bg-white px-6 py-8 md:px-8">
            <div
              ref={contentRef}
              className="sk-ann-content toastui-editor-contents max-w-none text-slate-800"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
            <AttachmentList items={attachments} />
          </section>

          <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4 md:px-8">
            <div className="flex flex-wrap justify-end gap-2">
              {canManage ? (
                <button
                  type="button"
                  onClick={() => { window.location.href = buildPagePath("write"); }}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  {t("write", requestedLang)}
                </button>
              ) : null}

              {canManage ? (
                <button
                  type="button"
                  onClick={() => { window.location.href = buildPagePath("edit", ctx.uuid); }}
                  className="inline-flex items-center justify-center rounded-full bg-slate-800 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-slate-900"
                >
                  {t("edit", requestedLang)}
                </button>
              ) : null}

              {canManage ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-red-600"
                >
                  {t("delete", requestedLang)}
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => { window.location.href = buildPagePath(); }}
                className="sk-ann-button--ghost inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs md:text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                {t("list", requestedLang)}
              </button>
            </div>
          </footer>
        </article>
      </div>
    );
  }

  ReactDOM.render(<ReadApp />, document.getElementById("div_main"));
}
