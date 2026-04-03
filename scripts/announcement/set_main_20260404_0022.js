const { useEffect, useMemo, useRef, useState } = React;
(function initStatkissAnnouncementShared() {
    if (window.StatKISS_AnnouncementShared)
        return;
    function getAnnouncementI18N() {
        return window.StatKISS_AnnouncementI18N || null;
    }
    function looksLikeScriptAssetPath(value) {
        const raw = String(value || "").trim();
        if (!raw)
            return false;
        return /\.js(?:[?#].*)?$/i.test(raw) || /^https?:\/\/[^\s]+\.js(?:[?#].*)?$/i.test(raw);
    }
    function deriveAnnouncementBasePath(value) {
        const pathname = String((window.location && window.location.pathname) || "");
        const match = pathname.match(/^(.*?\/announcement\/)/);
        const fallback = match && match[1] ? match[1] : "/announcement/";
        let base = String(value || "").trim();
        if (!base || looksLikeScriptAssetPath(base)) {
            return fallback;
        }
        if (/^https?:\/\//i.test(base)) {
            try {
                base = new URL(base, window.location.origin).pathname || "";
            }
            catch (_) {
                return fallback;
            }
        }
        if (!base || base.indexOf("/announcement/") === -1) {
            return fallback;
        }
        return base.endsWith("/") ? base : `${base}/`;
    }
    function getContext() {
        const ctx = window.ANNOUNCEMENT_CONTEXT || window.STATKISS_ANNOUNCEMENT_CONTEXT || {};
        return {
            url: ctx.url || window.url || "",
            mode: ctx.mode || "",
            uuid: ctx.uuid || window.uuid || "",
            currentLang: ctx.currentLang || document.documentElement.getAttribute("lang") || "en",
            basePath: deriveAnnouncementBasePath(ctx.announcementBasePath || ctx.basePath || ""),
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
            if (found)
                return found.label;
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
        return deriveAnnouncementBasePath(getContext().basePath || "/announcement/");
    }
    function buildPagePath(mode, id) {
        const ctx = getContext();
        let path = getAnnouncementBasePath();
        if (ctx.url)
            path += `${ctx.url}/`;
        if (mode)
            path += `${mode}/`;
        if (id)
            path += `${id}/`;
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
        if (typeof window.getCookie === "function")
            return window.getCookie(name);
        return parseCookie(name);
    }
    async function fetchHeaderUser() {
        try {
            const response = await fetch("/ajax_get_menu_header/", { credentials: "same-origin", cache: "no-store" });
            return await response.json();
        }
        catch (_) {
            return {};
        }
    }
    function canManageAnnouncements(payload) {
        if (!payload)
            return false;
        const username = String(payload.username || payload.gv_username || window.gv_username || "").trim();
        const authenticated = payload.is_authenticated === true || payload.authenticated === true || payload.logged_in === true || username !== "";
        if (!authenticated)
            return false;
        if (payload.is_superuser || payload.is_staff)
            return true;
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
        if (!Number.isFinite(value) || value <= 0)
            return "0 B";
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
            if (!map.has(key))
                map.set(key, file);
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
        if (!htmlText)
            return "";
        try {
            const container = document.createElement("div");
            container.innerHTML = htmlText;
            container.querySelectorAll("a[href]").forEach((anchor) => {
                anchor.setAttribute("target", "_blank");
                anchor.setAttribute("rel", "noopener noreferrer");
            });
            return container.innerHTML;
        }
        catch (_) {
            return htmlText;
        }
    }
    function isAnnouncementDarkTheme() {
        const root = document.documentElement;
        const body = document.body;
        if (!root)
            return false;
        const htmlTheme = String(root.getAttribute("data-theme") || "").toLowerCase();
        const bodyTheme = body ? String(body.getAttribute("data-theme") || "").toLowerCase() : "";
        return root.classList.contains("dark") || (!!body && body.classList.contains("dark")) || htmlTheme === "dark" || bodyTheme === "dark";
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
        if (!color)
            return 0;
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
        if (!root)
            return;
        root.querySelectorAll("a[href]").forEach((anchor) => {
            anchor.setAttribute("target", "_blank");
            anchor.setAttribute("rel", "noopener noreferrer");
        });
        const dark = isAnnouncementDarkTheme();
        const tableTags = new Set(["table", "thead", "tbody", "tfoot", "tr", "th", "td", "pre", "code", "blockquote"]);
        const skipTags = new Set(["img", "svg", "path", "video", "iframe", "canvas", "picture", "source"]);
        const nodes = [root, ...root.querySelectorAll("*")];
        nodes.forEach((node) => {
            if (!(node instanceof HTMLElement))
                return;
            const tag = String(node.tagName || "").toLowerCase();
            if (skipTags.has(tag))
                return;
            const isLink = tag === "a";
            const computed = window.getComputedStyle(node);
            const backgroundColor = parseCssColor(computed.backgroundColor);
            const borderColor = parseCssColor(computed.borderColor);
            if (dark) {
                node.style.setProperty("background-image", "none", "important");
                node.style.setProperty("box-shadow", "none", "important");
                node.style.setProperty("text-shadow", "none", "important");
                if (!isLink) {
                    node.style.setProperty("color", "#ffffff", "important");
                }
                if (node.hasAttribute("bgcolor")) {
                    node.removeAttribute("bgcolor");
                }
                if (tableTags.has(tag)) {
                    node.style.setProperty("background-color", "rgba(15, 23, 42, 0.72)", "important");
                }
                else if (backgroundColor && backgroundColor.a > 0.03) {
                    node.style.setProperty("background-color", "transparent", "important");
                }
                if (borderColor && borderColor.a > 0.03) {
                    node.style.setProperty("border-color", "#334155", "important");
                }
            }
            else {
                if (!isLink) {
                    node.style.setProperty("color", "#000000", "important");
                }
                if (!tableTags.has(tag) && backgroundColor && backgroundColor.a > 0.03 && colorLuminance(backgroundColor) < 0.18) {
                    node.style.setProperty("background-color", "transparent", "important");
                }
            }
        });
    }
    function injectAnnouncementThemeFallback() {
        if (document.getElementById("statkiss-announcement-theme-fallback"))
            return;
        const style = document.createElement("style");
        style.id = "statkiss-announcement-theme-fallback";
        style.textContent = `
      @keyframes statkiss-announcement-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .sk-ann-spinner { animation: statkiss-announcement-spin 0.9s linear infinite; }
      .sk-ann-original-btn { background: #fef3c7 !important; border-color: #f59e0b !important; color: #92400e !important; }
      .sk-ann-original-btn:hover { background: #fde68a !important; }
      .sk-ann-editor-shell { position: relative; min-height: 640px; }
      .sk-ann-editor-frame { display: block; width: 100%; border: 0; background: transparent; }
      .sk-ann-editor-fallback { display: block; width: 100%; resize: vertical; }
      .sk-ann-editor-overlay { z-index: 10; background: rgba(255, 255, 255, 0.72); }
      html.dark body,
      html.dark #div_main,
      html[data-theme="dark"] body,
      html[data-theme="dark"] #div_main,
      body.dark,
      body[data-theme="dark"] {
        background: #020617 !important;
        color: #ffffff !important;
      }
      html.dark .sk-ann-surface,
      html.dark .sk-ann-card,
      html.dark .sk-ann-soft,
      html.dark .sk-ann-input,
      html.dark .sk-ann-dropzone,
      html.dark .sk-ann-chip,
      html.dark .sk-ann-button--ghost,
      html.dark .toastui-editor-defaultUI,
      html.dark .toastui-editor-toolbar,
      html.dark .toastui-editor-popup,
      html.dark .toastui-editor-ww-container,
      html.dark .toastui-editor-md-container,
      html.dark .toastui-editor-mode-switch,
      html[data-theme="dark"] .sk-ann-surface,
      html[data-theme="dark"] .sk-ann-card,
      html[data-theme="dark"] .sk-ann-soft,
      html[data-theme="dark"] .sk-ann-input,
      html[data-theme="dark"] .sk-ann-dropzone,
      html[data-theme="dark"] .sk-ann-chip,
      html[data-theme="dark"] .sk-ann-button--ghost,
      html[data-theme="dark"] .toastui-editor-defaultUI,
      html[data-theme="dark"] .toastui-editor-toolbar,
      html[data-theme="dark"] .toastui-editor-popup,
      html[data-theme="dark"] .toastui-editor-ww-container,
      html[data-theme="dark"] .toastui-editor-md-container,
      html[data-theme="dark"] .toastui-editor-mode-switch {
        background: #0f172a !important;
        color: #ffffff !important;
        border-color: #334155 !important;
        box-shadow: none !important;
        background-image: none !important;
      }
      html.dark .sk-ann-card:hover,
      html.dark .sk-ann-button--ghost:hover,
      html[data-theme="dark"] .sk-ann-card:hover,
      html[data-theme="dark"] .sk-ann-button--ghost:hover {
        background: #111827 !important;
      }
      html.dark .text-slate-900,
      html.dark .text-slate-800,
      html.dark .text-slate-700,
      html.dark .text-slate-600,
      html.dark .text-slate-500,
      html.dark .text-slate-400,
      html[data-theme="dark"] .text-slate-900,
      html[data-theme="dark"] .text-slate-800,
      html[data-theme="dark"] .text-slate-700,
      html[data-theme="dark"] .text-slate-600,
      html[data-theme="dark"] .text-slate-500,
      html[data-theme="dark"] .text-slate-400 {
        color: #ffffff !important;
      }
      html.dark .bg-white,
      html.dark .bg-slate-50,
      html.dark .bg-slate-100,
      html.dark .bg-slate-200,
      html[data-theme="dark"] .bg-white,
      html[data-theme="dark"] .bg-slate-50,
      html[data-theme="dark"] .bg-slate-100,
      html[data-theme="dark"] .bg-slate-200 {
        background-image: none !important;
        box-shadow: none !important;
      }
      html.dark .bg-white,
      html[data-theme="dark"] .bg-white { background-color: #0f172a !important; }
      html.dark .bg-slate-50,
      html[data-theme="dark"] .bg-slate-50 { background-color: #0b1220 !important; }
      html.dark .bg-slate-100,
      html[data-theme="dark"] .bg-slate-100 { background-color: #111827 !important; }
      html.dark .bg-slate-200,
      html[data-theme="dark"] .bg-slate-200 { background-color: #1e293b !important; }
      html.dark .border-slate-100,
      html.dark .border-slate-200,
      html.dark .border-slate-300,
      html.dark .border-slate-400,
      html[data-theme="dark"] .border-slate-100,
      html[data-theme="dark"] .border-slate-200,
      html[data-theme="dark"] .border-slate-300,
      html[data-theme="dark"] .border-slate-400 {
        border-color: #334155 !important;
      }
      html.dark .sk-ann-content,
      html.dark .sk-ann-content *,
      html[data-theme="dark"] .sk-ann-content,
      html[data-theme="dark"] .sk-ann-content * {
        color: #ffffff !important;
        background-image: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      html.dark .sk-ann-content,
      html.dark .sk-ann-content *:not(table):not(thead):not(tbody):not(tfoot):not(tr):not(td):not(th):not(pre):not(code):not(blockquote),
      html[data-theme="dark"] .sk-ann-content,
      html[data-theme="dark"] .sk-ann-content *:not(table):not(thead):not(tbody):not(tfoot):not(tr):not(td):not(th):not(pre):not(code):not(blockquote) {
        background-color: transparent !important;
      }
      html.dark .sk-ann-content table,
      html.dark .sk-ann-content thead,
      html.dark .sk-ann-content tbody,
      html.dark .sk-ann-content tfoot,
      html.dark .sk-ann-content tr,
      html.dark .sk-ann-content td,
      html.dark .sk-ann-content th,
      html.dark .sk-ann-content pre,
      html.dark .sk-ann-content code,
      html.dark .sk-ann-content blockquote,
      html[data-theme="dark"] .sk-ann-content table,
      html[data-theme="dark"] .sk-ann-content thead,
      html[data-theme="dark"] .sk-ann-content tbody,
      html[data-theme="dark"] .sk-ann-content tfoot,
      html[data-theme="dark"] .sk-ann-content tr,
      html[data-theme="dark"] .sk-ann-content td,
      html[data-theme="dark"] .sk-ann-content th,
      html[data-theme="dark"] .sk-ann-content pre,
      html[data-theme="dark"] .sk-ann-content code,
      html[data-theme="dark"] .sk-ann-content blockquote {
        background: rgba(15, 23, 42, 0.72) !important;
        border-color: #334155 !important;
      }
      html.dark .sk-ann-content a,
      html[data-theme="dark"] .sk-ann-content a {
        color: #93c5fd !important;
      }
      html:not(.dark):not([data-theme="dark"]) .sk-ann-content,
      html:not(.dark):not([data-theme="dark"]) .sk-ann-content *:not(a):not(svg):not(path),
      html:not(.dark):not([data-theme="dark"]) .text-slate-900,
      html:not(.dark):not([data-theme="dark"]) .text-slate-800,
      html:not(.dark):not([data-theme="dark"]) .text-slate-700,
      html:not(.dark):not([data-theme="dark"]) .text-slate-600,
      html:not(.dark):not([data-theme="dark"]) .text-slate-500,
      html:not(.dark):not([data-theme="dark"]) .text-slate-400 {
        color: #000000 !important;
      }
      html.dark .toastui-editor-toolbar-icons,
      html.dark .toastui-editor-mode-switch .tab-item,
      html[data-theme="dark"] .toastui-editor-toolbar-icons,
      html[data-theme="dark"] .toastui-editor-mode-switch .tab-item {
        filter: invert(1) hue-rotate(180deg);
      }
      html.dark .sk-ann-editor-shell,
      html.dark .sk-ann-editor-fallback,
      html[data-theme="dark"] .sk-ann-editor-shell,
      html[data-theme="dark"] .sk-ann-editor-fallback {
        background: #0f172a !important;
        color: #ffffff !important;
        border-color: #334155 !important;
      }
      html.dark .sk-ann-editor-overlay,
      html[data-theme="dark"] .sk-ann-editor-overlay {
        background: rgba(2, 6, 23, 0.72) !important;
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
        isAnnouncementDarkTheme,
    };
})();
function set_main() {
    const S = window.StatKISS_AnnouncementShared;
    const { t, getContext, getCurrentLang, buildPagePath, fetchHeaderUser, canManageAnnouncements, postForm, setPageTitle, escapeHtml, getCategoryTitle, getCategoryDescription, injectAnnouncementThemeFallback, dedupeFiles, formatFileSize, formatAnnouncementDate, forceLinksToNewWindow, adaptRichContentForTheme, isAnnouncementDarkTheme, } = S;
    injectAnnouncementThemeFallback();
    const ctx = getContext();
    const PAGE_SIZE = 20;
    function Spinner({ size = "h-8 w-8", tone = "text-blue-600" }) {
        return (React.createElement("svg", { className: `sk-ann-spinner ${size} ${tone}`, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
            React.createElement("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "3", opacity: "0.25" }),
            React.createElement("path", { d: "M21 12a9 9 0 0 0-9-9", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" })));
    }
    function BusyCard({ lang, mode = "loading" }) {
        const title = mode === "translating" ? t("translating", lang) : t("loading", lang);
        const subtitle = mode === "translating" ? t("translatingBody", lang) : "";
        return (React.createElement("div", { className: "py-8 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6" },
            React.createElement("div", { className: "sk-ann-surface rounded-3xl border border-slate-200 bg-slate-50 px-6 py-12 text-center shadow-sm" },
                React.createElement("div", { className: "mx-auto flex max-w-md flex-col items-center gap-4" },
                    React.createElement(Spinner, null),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("div", { className: "text-lg font-semibold text-slate-900" }, title),
                        subtitle ? React.createElement("p", { className: "text-sm text-slate-500" }, subtitle) : null)))));
    }
    function ErrorCard({ lang, message }) {
        return (React.createElement("div", { className: "py-8 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6" },
            React.createElement("div", { className: "rounded-3xl border border-red-200 bg-red-50 px-6 py-8 text-center shadow-sm" },
                React.createElement("div", { className: "text-base font-semibold text-red-600" }, message || t("failedLoad", lang)))));
    }
    function AttachmentList({ items, lang }) {
        if (!items || items.length === 0) {
            return null;
        }
        return (React.createElement("section", { className: "mt-8 space-y-3" },
            React.createElement("div", { className: "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500" }, t("attachments", lang)),
            React.createElement("div", { className: "flex flex-col gap-2" }, items.map((item) => (React.createElement("a", { key: item.uuid, href: item.download_url, target: "_blank", rel: "noopener noreferrer", className: "sk-ann-card flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50" },
                React.createElement("span", { className: "truncate text-sm font-medium text-slate-900" }, item.file_name),
                React.createElement("span", { className: "shrink-0 text-xs text-slate-500" }, formatFileSize(item.file_size))))))));
    }
    function AttachmentDropzone({ lang, existingItems, setExistingItems, newFiles, setNewFiles }) {
        const inputRef = useRef(null);
        const [dragging, setDragging] = useState(false);
        function acceptFiles(fileList) {
            const items = Array.from(fileList || []);
            setNewFiles((current) => dedupeFiles(current, items));
            if (inputRef.current)
                inputRef.current.value = "";
        }
        function onDrop(event) {
            event.preventDefault();
            event.stopPropagation();
            setDragging(false);
            acceptFiles(event.dataTransfer ? event.dataTransfer.files : []);
        }
        return (React.createElement("section", { className: "space-y-4" },
            React.createElement("div", null,
                React.createElement("div", { className: "mb-2 text-sm font-semibold text-slate-700" }, t("uploadTitle", lang)),
                React.createElement("button", { type: "button", onClick: () => inputRef.current && inputRef.current.click(), onDragEnter: (event) => { event.preventDefault(); setDragging(true); }, onDragOver: (event) => { event.preventDefault(); setDragging(true); }, onDragLeave: (event) => { event.preventDefault(); setDragging(false); }, onDrop: onDrop, className: "sk-ann-dropzone flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed px-6 py-8 text-center transition " +
                        (dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white hover:bg-slate-50") },
                    React.createElement("svg", { className: "h-8 w-8 text-slate-400", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
                        React.createElement("path", { d: "M12 16V4m0 0-4 4m4-4 4 4M5 20h14", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })),
                    React.createElement("div", { className: "text-sm font-semibold text-slate-700" }, t("uploadHint", lang)),
                    React.createElement("div", { className: "text-xs text-slate-500" }, dragging ? t("dragActive", lang) : t("browse", lang))),
                React.createElement("input", { ref: inputRef, type: "file", multiple: true, hidden: true, onChange: (event) => acceptFiles(event.target.files) })),
            existingItems && existingItems.length > 0 ? (React.createElement("div", { className: "space-y-2" },
                React.createElement("div", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" }, t("existingFiles", lang)),
                React.createElement("div", { className: "flex flex-wrap gap-2" }, existingItems.map((item) => (React.createElement("div", { key: item.uuid, className: "sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700" },
                    React.createElement("span", { className: "max-w-[14rem] truncate" }, item.file_name),
                    React.createElement("span", { className: "text-slate-400" }, formatFileSize(item.file_size)),
                    React.createElement("button", { type: "button", onClick: () => setExistingItems((current) => current.filter((entry) => entry.uuid !== item.uuid)), className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-200" }, t("remove", lang)))))))) : null,
            newFiles && newFiles.length > 0 ? (React.createElement("div", { className: "space-y-2" },
                React.createElement("div", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" }, t("newFiles", lang)),
                React.createElement("div", { className: "flex flex-wrap gap-2" }, newFiles.map((file) => {
                    const key = `${file.name}::${file.size}::${file.lastModified}`;
                    return (React.createElement("div", { key: key, className: "sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700" },
                        React.createElement("span", { className: "max-w-[14rem] truncate" }, file.name),
                        React.createElement("span", { className: "text-slate-400" }, formatFileSize(file.size)),
                        React.createElement("button", { type: "button", onClick: () => setNewFiles((current) => current.filter((entry) => `${entry.name}::${entry.size}::${entry.lastModified}` !== key)), className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-200" }, t("remove", lang))));
                })))) : null));
    }
    function EmptyState({ lang }) {
        return (React.createElement("div", { className: "px-6 py-16 text-center text-slate-500" },
            React.createElement("div", { className: "text-sm font-medium" }, t("noPosts", lang))));
    }
    function SkeletonRows() {
        return (React.createElement("div", { className: "divide-y divide-slate-100" }, [0, 1, 2].map((key) => (React.createElement("div", { key: key, className: "px-4 py-4" },
            React.createElement("div", { className: "animate-pulse rounded-2xl border border-slate-200 bg-white px-4 py-5" },
                React.createElement("div", { className: "h-4 w-24 rounded bg-slate-200" }),
                React.createElement("div", { className: "mt-4 h-5 w-3/4 rounded bg-slate-200" }),
                React.createElement("div", { className: "mt-4 h-4 w-40 rounded bg-slate-200" })))))));
    }
    function ListApp() {
        const [lang, setLang] = useState(getCurrentLang());
        const [rows, setRows] = useState([]);
        const [loading, setLoading] = useState(true);
        const [loadingMore, setLoadingMore] = useState(false);
        const [hasMore, setHasMore] = useState(true);
        const [error, setError] = useState("");
        const [canManage, setCanManage] = useState(false);
        const sentinelRef = useRef(null);
        const offsetRef = useRef(0);
        const loadingRef = useRef(false);
        useEffect(() => {
            function handleLangEvent(event) {
                const nextLang = event && event.detail ? event.detail.lang : getCurrentLang();
                if (nextLang)
                    setLang(nextLang);
            }
            window.addEventListener("statkiss:lang", handleLangEvent);
            return () => window.removeEventListener("statkiss:lang", handleLangEvent);
        }, []);
        useEffect(() => {
            let alive = true;
            async function refreshPermission() {
                const user = await fetchHeaderUser();
                if (alive)
                    setCanManage(canManageAnnouncements(user));
            }
            refreshPermission();
            return () => { alive = false; };
        }, []);
        useEffect(() => {
            setPageTitle(`${getCategoryTitle(ctx.url, lang)} - StatKISS`);
        }, [lang]);
        async function loadChunk(initial) {
            if (loadingRef.current)
                return;
            loadingRef.current = true;
            setError("");
            if (initial) {
                setLoading(true);
                setRows([]);
                setHasMore(true);
                offsetRef.current = 0;
            }
            else {
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
            }
            catch (err) {
                setError(err && err.message ? err.message : t("failedLoad", lang));
                if (initial)
                    setRows([]);
                setHasMore(false);
            }
            finally {
                loadingRef.current = false;
                setLoading(false);
                setLoadingMore(false);
            }
        }
        useEffect(() => {
            loadChunk(true);
        }, [lang, ctx.url]);
        useEffect(() => {
            if (!sentinelRef.current)
                return undefined;
            const observer = new IntersectionObserver((entries) => {
                if (entries[0] && entries[0].isIntersecting && hasMore && !loadingRef.current) {
                    loadChunk(false);
                }
            }, { rootMargin: "240px" });
            observer.observe(sentinelRef.current);
            return () => observer.disconnect();
        }, [hasMore, rows.length, lang]);
        if (error && !loading && rows.length === 0)
            return React.createElement(ErrorCard, { lang: lang, message: error });
        return (React.createElement("div", { className: "py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6 space-y-8" },
            React.createElement("div", { className: "mx-auto max-w-screen-lg text-center space-y-3" },
                React.createElement("div", { className: "text-xs font-semibold uppercase tracking-[0.22em] text-slate-500" }, getCategoryTitle(ctx.url, lang)),
                React.createElement("h1", { className: "text-4xl font-extrabold tracking-tight text-slate-900" }, getCategoryTitle(ctx.url, lang)),
                getCategoryDescription(ctx.url, lang) ? React.createElement("p", { className: "mx-auto max-w-3xl text-sm md:text-base text-slate-500" }, getCategoryDescription(ctx.url, lang)) : null),
            React.createElement("section", { className: "space-y-4" },
                React.createElement("header", { className: "flex items-center justify-between gap-3 border-b border-slate-200 pb-4" },
                    React.createElement("div", { className: "text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500" }, getCategoryTitle(ctx.url, lang)),
                    canManage ? (React.createElement("button", { type: "button", onClick: () => { window.location.href = buildPagePath("write"); }, className: "inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700" }, t("write", lang))) : null),
                React.createElement("div", { className: "sk-ann-surface overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm" },
                    loading ? (React.createElement(SkeletonRows, null)) : rows.length === 0 ? (React.createElement(EmptyState, { lang: lang })) : (React.createElement("div", { className: "divide-y divide-slate-100" },
                        rows.map((row) => (React.createElement("div", { key: row.uuid, className: "px-4 py-3" },
                            React.createElement("a", { href: buildPagePath("read", row.uuid), className: "block" },
                                React.createElement("article", { className: "sk-ann-card group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all duration-150 hover:border-slate-300 hover:bg-slate-50" },
                                    React.createElement("div", { className: "flex flex-1 items-start gap-4" },
                                        React.createElement("div", { className: "mt-1 hidden sm:flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2" },
                                            React.createElement("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-slate-500" }, t("createdAt", lang)),
                                            React.createElement("span", { className: "mt-1 text-[11px] font-medium text-slate-700 text-center" }, formatAnnouncementDate(row.created_at_iso || row.created_at, lang))),
                                        React.createElement("div", { className: "flex-1 space-y-2" },
                                            React.createElement("div", { className: "flex flex-wrap items-center gap-2" },
                                                React.createElement("div", { className: "sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1" },
                                                    React.createElement("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-slate-400" }),
                                                    React.createElement("span", { className: "text-[11px] font-semibold text-slate-700 tracking-wide" }, getCategoryTitle(ctx.url, lang))),
                                                row.is_new ? React.createElement("span", { className: "inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-700" }, "NEW") : null,
                                                row.attachment_count > 0 ? (React.createElement("span", { className: "sk-ann-chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600" },
                                                    React.createElement("svg", { className: "h-3 w-3", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
                                                        React.createElement("path", { d: "M7 13.5 12 18.5 17 13.5M12 18.5V3.5M5 21H19", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })),
                                                    row.attachment_count)) : null),
                                            React.createElement("h2", { className: "text-base md:text-lg font-semibold text-slate-900 line-clamp-1" }, row.title),
                                            React.createElement("div", { className: "flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:hidden" },
                                                React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1" },
                                                    React.createElement("svg", { className: "h-3 w-3", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
                                                        React.createElement("path", { d: "M7 4V2.5M17 4V2.5M3 9H21M6 4H18C19.6569 4 21 5.34315 21 7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4Z", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })),
                                                    formatAnnouncementDate(row.created_at_iso || row.created_at, lang))))),
                                    React.createElement("div", { className: "flex items-center" },
                                        React.createElement("svg", { className: "h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
                                            React.createElement("path", { d: "M5 12H19", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }),
                                            React.createElement("path", { d: "M13 6L19 12L13 18", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })))))))),
                        loadingMore ? React.createElement(SkeletonRows, null) : null)),
                    !loading && !hasMore && rows.length > 0 ? React.createElement("div", { className: "px-6 py-4 text-center text-xs text-slate-400" }, t("allLoaded", lang)) : null,
                    React.createElement("div", { ref: sentinelRef, className: "h-2 w-full" })))));
    }
    function ReadApp() {
        const [requestedLang, setRequestedLang] = useState(getCurrentLang());
        const [payload, setPayload] = useState(null);
        const payloadRef = useRef(null);
        const [busyMode, setBusyMode] = useState("loading");
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");
        const [canManage, setCanManage] = useState(false);
        const [viewMode, setViewMode] = useState("current");
        const contentRef = useRef(null);
        useEffect(() => {
            payloadRef.current = payload;
        }, [payload]);
        useEffect(() => {
            let alive = true;
            async function refreshPermission() {
                const user = await fetchHeaderUser();
                if (alive)
                    setCanManage(canManageAnnouncements(user));
            }
            refreshPermission();
            return () => { alive = false; };
        }, []);
        useEffect(() => {
            function handleLangEvent(event) {
                const nextLang = event && event.detail ? event.detail.lang : getCurrentLang();
                if (nextLang)
                    setRequestedLang(nextLang);
            }
            window.addEventListener("statkiss:lang", handleLangEvent);
            return () => window.removeEventListener("statkiss:lang", handleLangEvent);
        }, []);
        useEffect(() => {
            let alive = true;
            async function loadArticle() {
                const previousPayload = payloadRef.current;
                const willTranslate = !!(previousPayload && previousPayload.source_article && requestedLang !== previousPayload.source_article.lang);
                setBusyMode(willTranslate ? "translating" : "loading");
                setLoading(true);
                setError("");
                try {
                    const formData = new FormData();
                    formData.append("uuid", ctx.uuid);
                    formData.append("lang", requestedLang);
                    const result = await postForm("ajax_get_article_read", formData);
                    if (!alive)
                        return;
                    setPayload(result);
                    setViewMode("current");
                    const articleTitle = (result.article && result.article.title) || t("untitled", requestedLang);
                    setPageTitle(`${articleTitle} - StatKISS`);
                }
                catch (err) {
                    if (!alive)
                        return;
                    setError(err && err.message ? err.message : t("failedLoad", requestedLang));
                }
                finally {
                    if (alive)
                        setLoading(false);
                }
            }
            if (ctx.uuid) {
                loadArticle();
            }
            else {
                setLoading(false);
                setError(t("failedLoad", requestedLang));
            }
            return () => { alive = false; };
        }, [requestedLang]);
        const currentArticle = payload && payload.article ? payload.article : null;
        const sourceArticle = payload && payload.source_article ? payload.source_article : null;
        const attachments = payload && Array.isArray(payload.attachments) ? payload.attachments : [];
        const displayedArticle = viewMode === "original" && sourceArticle ? sourceArticle : currentArticle;
        const canViewOriginal = !!(payload && payload.can_view_original);
        const localizedCreatedAt = displayedArticle ? formatAnnouncementDate(displayedArticle.created_at_iso || displayedArticle.created_at, requestedLang) : "";
        const renderedContent = useMemo(() => forceLinksToNewWindow(displayedArticle && displayedArticle.content ? displayedArticle.content : ""), [displayedArticle && displayedArticle.content]);
        useEffect(() => {
            if (!displayedArticle)
                return;
            setPageTitle(`${displayedArticle.title || t("untitled", requestedLang)} - StatKISS`);
        }, [viewMode, displayedArticle && displayedArticle.title]);
        useEffect(() => {
            if (!contentRef.current)
                return undefined;
            const applyThemeAdaptation = () => {
                try {
                    adaptRichContentForTheme(contentRef.current);
                }
                catch (_) { }
            };
            const rafId = window.requestAnimationFrame(applyThemeAdaptation);
            const observer = new MutationObserver(() => {
                window.requestAnimationFrame(applyThemeAdaptation);
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
            return () => {
                window.cancelAnimationFrame(rafId);
                observer.disconnect();
            };
        }, [renderedContent, viewMode]);
        async function handleDelete() {
            if (!window.confirm(t("confirmDelete", requestedLang)))
                return;
            try {
                const formData = new FormData();
                formData.append("uuid", ctx.uuid);
                await postForm("ajax_delete_article", formData);
                window.location.href = buildPagePath();
            }
            catch (err) {
                window.alert(err && err.message ? err.message : t("failedDelete", requestedLang));
            }
        }
        if (loading)
            return React.createElement(BusyCard, { lang: requestedLang, mode: busyMode });
        if (error)
            return React.createElement(ErrorCard, { lang: requestedLang, message: error });
        if (!displayedArticle)
            return React.createElement(ErrorCard, { lang: requestedLang, message: t("failedLoad", requestedLang) });
        return (React.createElement("div", { className: "py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6" },
            React.createElement("article", { className: "sk-ann-surface overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm" },
                React.createElement("header", { className: "border-b border-slate-200 bg-white px-6 py-6 md:px-8" },
                    React.createElement("div", { className: "flex flex-wrap items-start justify-between gap-4" },
                        React.createElement("div", { className: "space-y-4" },
                            React.createElement("div", { className: "flex flex-wrap items-center gap-2" },
                                React.createElement("span", { className: "sk-ann-chip inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700" },
                                    React.createElement("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-slate-400" }),
                                    getCategoryTitle(ctx.url, requestedLang)),
                                displayedArticle.is_new ? React.createElement("span", { className: "inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700" }, "NEW") : null,
                                canViewOriginal ? (React.createElement("button", { type: "button", onClick: () => setViewMode(viewMode === "current" ? "original" : "current"), className: "sk-ann-original-btn inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold" }, viewMode === "current" ? t("viewOriginal", requestedLang) : t("viewCurrent", requestedLang))) : null),
                            React.createElement("h1", { className: "text-2xl md:text-3xl font-bold tracking-tight text-slate-900" }, displayedArticle.title),
                            React.createElement("div", { className: "flex flex-wrap items-center gap-2 text-xs text-slate-500" },
                                localizedCreatedAt ? (React.createElement("span", { className: "sk-ann-chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1" },
                                    React.createElement("svg", { className: "h-3 w-3", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
                                        React.createElement("path", { d: "M7 4V2.5M17 4V2.5M3 9H21M6 4H18C19.6569 4 21 5.34315 21 7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V7C3 5.34315 4.34315 4 6 4Z", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })),
                                    localizedCreatedAt)) : null,
                                attachments.length > 0 ? (React.createElement("span", { className: "sk-ann-chip inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1" },
                                    React.createElement("svg", { className: "h-3 w-3", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
                                        React.createElement("path", { d: "M7 13.5 12 18.5 17 13.5M12 18.5V3.5M5 21H19", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })),
                                    attachments.length,
                                    " ",
                                    requestedLang === "ko" ? t("attachmentCount", requestedLang) : t("attachments", requestedLang))) : null)))),
                React.createElement("section", { className: "bg-white px-6 py-8 md:px-8" },
                    React.createElement("div", { ref: contentRef, className: "sk-ann-content toastui-editor-contents max-w-none text-slate-800", dangerouslySetInnerHTML: { __html: renderedContent } }),
                    React.createElement(AttachmentList, { items: attachments, lang: requestedLang })),
                React.createElement("footer", { className: "border-t border-slate-200 bg-slate-50 px-6 py-4 md:px-8" },
                    React.createElement("div", { className: "flex flex-wrap justify-end gap-2" },
                        canManage ? (React.createElement("button", { type: "button", onClick: () => { window.location.href = buildPagePath("write"); }, className: "inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700" }, t("write", requestedLang))) : null,
                        canManage ? (React.createElement("button", { type: "button", onClick: () => { window.location.href = buildPagePath("edit", ctx.uuid); }, className: "inline-flex items-center justify-center rounded-full bg-slate-800 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-slate-900" }, t("edit", requestedLang))) : null,
                        canManage ? (React.createElement("button", { type: "button", onClick: handleDelete, className: "inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-red-600" }, t("delete", requestedLang))) : null,
                        React.createElement("button", { type: "button", onClick: () => { window.location.href = buildPagePath(); }, className: "sk-ann-button--ghost inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs md:text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50" }, t("list", requestedLang)))))));
    }
    function injectSolidEditorEmbedStyles() {
        if (document.getElementById("statkiss-solid-editor-embed-style"))
            return;
        const style = document.createElement("style");
        style.id = "statkiss-solid-editor-embed-style";
        style.textContent = `
      .sk-ann-editor-shell {
        position: relative;
        overflow: visible !important;
      }
      .sk-ann-editor-host {
        display: block;
        min-height: 640px;
        padding: 18px;
      }
      .sk-ann-editor-textarea {
        display: none !important;
      }
      .sk-ann-editor-host .solid-embedded-editor-host {
        display: block;
        width: 100%;
      }
      .sk-ann-editor-host .lre-root {
        min-height: 0 !important;
        padding: 0 !important;
      }
      .sk-ann-editor-host .lre-app,
      .sk-ann-editor-host .lre-surface,
      .sk-ann-editor-host .lre-main-wrap,
      .sk-ann-editor-host .lre-editor-shell {
        background: transparent !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      .sk-ann-editor-host .lre-surface {
        padding: 0 !important;
      }
      .sk-ann-editor-host .lre-root.lre-embedded-content .lre-editor-page {
        width: 100% !important;
        max-width: none !important;
        min-height: 560px !important;
      }
      .sk-ann-editor-host .lre-dialog,
      .sk-ann-editor-host .lre-color-popover,
      .sk-ann-editor-host .table-picker-overlay,
      .sk-ann-editor-host .lre-slash-menu {
        z-index: 40;
      }
      @media (max-width: 980px) {
        .sk-ann-editor-host {
          min-height: 520px;
          padding: 12px;
        }
        .sk-ann-editor-host .lre-root.lre-embedded-content .lre-editor-page {
          min-height: 420px !important;
        }
      }
    `;
        document.head.appendChild(style);
    }
    function getSolidEditorMountApi() {
        return window.mountContentEditor || window.mountStatkissContentEditor || window.mountEmbeddedContentEditor || null;
    }
    function getSolidEditorInitApi() {
        return window.initContentEditor || window.initStatkissContentEditor || null;
    }
    function hasSolidEditorMountApi() {
        return typeof getSolidEditorInitApi() === "function" || typeof getSolidEditorMountApi() === "function";
    }
    function waitForSolidEditorApi(timeoutMs = 15000, interval = 50) {
        return new Promise((resolve, reject) => {
            const timeout = Number(timeoutMs) > 0 ? Number(timeoutMs) : 15000;
            const startedAt = Date.now();
            function finish() {
                const initApi = getSolidEditorInitApi();
                const mountApi = getSolidEditorMountApi();
                if (typeof initApi !== "function" && typeof mountApi !== "function")
                    return false;
                resolve(initApi || mountApi);
                return true;
            }
            if (finish())
                return;
            const timer = window.setInterval(() => {
                if (finish()) {
                    window.clearInterval(timer);
                    return;
                }
                if (Date.now() - startedAt > timeout) {
                    window.clearInterval(timer);
                    reject(new Error("Content editor API was not found. Load editor.js from HTML before calling set_main()."));
                }
            }, interval);
        });
    }
    function destroySolidEditorInstance(editor) {
        const instance = editor || null;
        if (typeof window.destroyLocalRichEditor === "function") {
            try {
                return !!window.destroyLocalRichEditor(instance || undefined);
            }
            catch (_) {
                return false;
            }
        }
        if (instance && instance.root && instance.root.parentNode) {
            instance.root.parentNode.removeChild(instance.root);
            return true;
        }
        return false;
    }
    async function mountSolidEditorHost(host, options) {
        if (!host)
            return null;
        const mergedOptions = Object.assign({
            restoreDraft: true,
            ribbonExpanded: false,
        }, options || {});
        host.innerHTML = "";
        const textarea = document.createElement("textarea");
        textarea.className = "sk-ann-editor-textarea";
        textarea.setAttribute("rows", "18");
        textarea.setAttribute("spellcheck", "true");
        if (mergedOptions && typeof mergedOptions.placeholder === "string") {
            textarea.setAttribute("placeholder", mergedOptions.placeholder);
        }
        if (mergedOptions && typeof mergedOptions.html === "string") {
            textarea.value = mergedOptions.html;
        }
        host.appendChild(textarea);
        await waitForSolidEditorApi();
        const initContentEditor = getSolidEditorInitApi();
        if (typeof initContentEditor === "function") {
            const booted = await initContentEditor(textarea, mergedOptions);
            if (booted)
                return booted;
        }
        const mountContentEditor = getSolidEditorMountApi();
        if (typeof mountContentEditor !== "function")
            return null;
        return mountContentEditor(textarea, mergedOptions);
    }
    function syncSolidEditorEnvironment(editor, options) {
        const api = editor || null;
        const dark = !!(options && options.dark);
        const nextLang = String((options && options.lang) || "en").trim() || "en";
        const nextTitle = String((options && options.title) || "").trim();
        const nextPlaceholder = String((options && options.placeholder) || "").trim();
        if (!api)
            return null;
        try {
            if (api.root) {
                api.root.setAttribute("lang", nextLang);
            }
            document.body.classList.toggle("lre-dark", dark);
            api.state = api.state || {};
            api.state.dark = dark;
            if (typeof api.setTitle === "function") {
                api.setTitle(nextTitle || "StatKISS Announcement");
            }
            else if (api.docTitle) {
                api.docTitle.value = nextTitle || "StatKISS Announcement";
            }
            if (api.editor && nextPlaceholder) {
                api.editor.setAttribute("data-placeholder", nextPlaceholder);
            }
            if (typeof api.updateToolbarActiveState === "function")
                api.updateToolbarActiveState();
            if (typeof api.renderAllCodeBlocks === "function")
                api.renderAllCodeBlocks();
            if (typeof api.updateOutline === "function")
                api.updateOutline();
            if (typeof api.updateSourceView === "function")
                api.updateSourceView();
            if (typeof api.updateStatus === "function")
                api.updateStatus();
            if (typeof api.updateLayout === "function")
                api.updateLayout();
        }
        catch (_) { }
        return api;
    }
    function setSolidEditorHtml(editor, html) {
        const api = editor || null;
        const value = String(html || "");
        if (!api || !api.editor)
            return false;
        try {
            if (typeof api.setHTML === "function") {
                api.setHTML(value);
            }
            else {
                api.editor.innerHTML = value;
                if (typeof api.normalizeAfterImport === "function") {
                    api.normalizeAfterImport();
                }
                else {
                    if (typeof api.updateOutline === "function")
                        api.updateOutline();
                    if (typeof api.updateSourceView === "function")
                        api.updateSourceView();
                    if (typeof api.updateStatus === "function")
                        api.updateStatus();
                }
            }
            return true;
        }
        catch (_) {
            return false;
        }
    }
    function readSolidEditorHtml(editor) {
        const api = editor || null;
        if (!api || !api.editor)
            return "";
        try {
            if (typeof api.getHTML === "function") {
                return String(api.getHTML() || "");
            }
            return String(api.editor.innerHTML || "");
        }
        catch (_) {
            return "";
        }
    }
    function EditorApp() {
        const isEditMode = ctx.mode === "edit";
        const [lang, setLang] = useState(getCurrentLang());
        const [loading, setLoading] = useState(true);
        const [saving, setSaving] = useState(false);
        const [title, setTitle] = useState("");
        const [existingItems, setExistingItems] = useState([]);
        const [newFiles, setNewFiles] = useState([]);
        const [editorReady, setEditorReady] = useState(false);
        const [editorFailed, setEditorFailed] = useState(false);
        const editorHostRef = useRef(null);
        const titleInputRef = useRef(null);
        const editorInstanceRef = useRef(null);
        const editorFallbackRef = useRef(null);
        const pendingHtmlRef = useRef("");
        const mountTokenRef = useRef(0);
        useEffect(() => {
            function handleLangEvent(event) {
                const nextLang = event && event.detail ? event.detail.lang : getCurrentLang();
                if (nextLang)
                    setLang(nextLang);
            }
            window.addEventListener("statkiss:lang", handleLangEvent);
            return () => window.removeEventListener("statkiss:lang", handleLangEvent);
        }, []);
        function syncEditorEnvironment() {
            syncSolidEditorEnvironment(editorInstanceRef.current, {
                dark: isAnnouncementDarkTheme(),
                lang,
                title: title || getCategoryTitle(ctx.url, lang),
                placeholder: t("contentRequired", lang),
            });
        }
        function writeEditorHtml(nextHtml) {
            const value = String(nextHtml || "");
            pendingHtmlRef.current = value;
            const applied = setSolidEditorHtml(editorInstanceRef.current, value);
            if (applied && editorInstanceRef.current && typeof editorInstanceRef.current.__hostMirrorNow === "function") {
                try {
                    editorInstanceRef.current.__hostMirrorNow(true);
                }
                catch (_) { }
            }
            if (!applied && editorFallbackRef.current) {
                editorFallbackRef.current.value = value;
            }
            return applied;
        }
        function readEditorValue() {
            const editor = editorInstanceRef.current;
            if (editor) {
                try {
                    return readSolidEditorHtml(editor);
                }
                catch (_) { }
            }
            if (editorFallbackRef.current) {
                return String(editorFallbackRef.current.value || "");
            }
            return String(pendingHtmlRef.current || "");
        }
        useEffect(() => {
            let cancelled = false;
            async function mountEditor() {
                const host = editorHostRef.current;
                if (!host) {
                    setEditorFailed(true);
                    return;
                }
                const token = Date.now();
                mountTokenRef.current = token;
                setEditorReady(false);
                setEditorFailed(false);
                try {
                    injectSolidEditorEmbedStyles();
                    await waitForSolidEditorApi();
                    if (cancelled || mountTokenRef.current !== token)
                        return;
                    destroySolidEditorInstance(editorInstanceRef.current);
                    editorInstanceRef.current = null;
                    host.innerHTML = "";
                    if (window.localRichEditor && window.localRichEditor.root && !host.contains(window.localRichEditor.root)) {
                        destroySolidEditorInstance(window.localRichEditor);
                    }
                    const instance = await mountSolidEditorHost(host, {
                        title: title || getCategoryTitle(ctx.url, lang),
                        titleField: titleInputRef.current,
                        html: pendingHtmlRef.current,
                        lang,
                        dark: isAnnouncementDarkTheme(),
                        placeholder: t("contentRequired", lang),
                        restoreDraft: !isEditMode,
                        storageKey: `statkiss:announcement:${ctx.url || "announcement"}:${isEditMode ? (ctx.uuid || "edit") : "write"}:${lang}`,
                        ribbonExpanded: false,
                    });
                    if (!instance || !instance.editor) {
                        throw new Error("Solid editor did not initialize.");
                    }
                    editorInstanceRef.current = instance;
                    syncEditorEnvironment();
                    writeEditorHtml(pendingHtmlRef.current);
                    setEditorReady(true);
                    setEditorFailed(false);
                }
                catch (error) {
                    try {
                        console.error("[StatKISS] solid editor mount failed", error);
                    }
                    catch (_) { }
                    if (cancelled || mountTokenRef.current !== token)
                        return;
                    destroySolidEditorInstance(editorInstanceRef.current);
                    destroySolidEditorInstance(window.localRichEditor);
                    editorInstanceRef.current = null;
                    setEditorFailed(true);
                    if (editorFallbackRef.current) {
                        editorFallbackRef.current.value = String(pendingHtmlRef.current || "");
                    }
                }
            }
            mountEditor();
            return () => {
                cancelled = true;
                mountTokenRef.current += 1;
                destroySolidEditorInstance(editorInstanceRef.current);
                editorInstanceRef.current = null;
                if (editorHostRef.current)
                    editorHostRef.current.innerHTML = "";
                document.body.classList.remove("lre-dark");
            };
        }, []);
        useEffect(() => {
            let cancelled = false;
            async function boot() {
                try {
                    const user = await fetchHeaderUser();
                    if (!canManageAnnouncements(user)) {
                        window.alert(t("writeDenied", lang));
                        window.location.href = buildPagePath();
                        return;
                    }
                    let nextTitle = "";
                    let nextHtml = "";
                    let nextAttachments = [];
                    if (isEditMode) {
                        const formData = new FormData();
                        formData.append("uuid", ctx.uuid);
                        formData.append("lang", lang);
                        formData.append("force_original", "1");
                        const payload = await postForm("ajax_get_article_read", formData);
                        nextTitle = (payload.source_article && payload.source_article.title) || "";
                        nextHtml = (payload.source_article && payload.source_article.content) || "";
                        nextAttachments = Array.isArray(payload.attachments) ? payload.attachments : [];
                    }
                    if (cancelled)
                        return;
                    setTitle(nextTitle);
                    setExistingItems(nextAttachments);
                    writeEditorHtml(nextHtml);
                    setLoading(false);
                }
                catch (err) {
                    window.alert(err && err.message ? err.message : t("failedLoad", lang));
                    window.location.href = buildPagePath();
                }
            }
            boot();
            return () => { cancelled = true; };
        }, []);
        useEffect(() => {
            syncEditorEnvironment();
        }, [lang, title, editorReady]);
        useEffect(() => {
            const observer = new MutationObserver(() => syncEditorEnvironment());
            const options = { attributes: true, attributeFilter: ["class", "data-theme"] };
            observer.observe(document.documentElement, options);
            if (document.body)
                observer.observe(document.body, options);
            window.addEventListener("resize", syncEditorEnvironment);
            return () => {
                observer.disconnect();
                window.removeEventListener("resize", syncEditorEnvironment);
            };
        }, [lang, title, editorReady]);
        useEffect(() => {
            if (editorFailed && editorFallbackRef.current) {
                editorFallbackRef.current.value = String(pendingHtmlRef.current || "");
            }
        }, [editorFailed]);
        useEffect(() => {
            const categoryTitle = getCategoryTitle(ctx.url, lang);
            const pageTitle = isEditMode ? t("edit", lang) : t("write", lang);
            setPageTitle(`${pageTitle} · ${categoryTitle} - StatKISS`);
        }, [lang]);
        async function handleSubmit() {
            if (loading || saving)
                return;
            if (!editorReady && !editorFailed)
                return;
            const content = readEditorValue();
            const trimmedTitle = String(title || "").trim();
            if (!trimmedTitle) {
                window.alert(t("titlePlaceholder", lang));
                return;
            }
            if (!content || !String(content).replace(/<[^>]+>/g, "").trim()) {
                window.alert(t("contentRequired", lang));
                return;
            }
            setSaving(true);
            try {
                const formData = new FormData();
                formData.append("url", ctx.url);
                formData.append("txt_title", trimmedTitle);
                formData.append("txt_content", content);
                if (isEditMode) {
                    formData.append("uuid_article", ctx.uuid);
                }
                existingItems.forEach((item) => formData.append("keep_attachment_uuids", item.uuid));
                newFiles.forEach((file) => formData.append("new_files", file));
                const result = await postForm(isEditMode ? "ajax_update_article" : "ajax_insert_article", formData);
                window.location.href = buildPagePath("read", result.uuid || ctx.uuid);
            }
            catch (err) {
                window.alert(err && err.message ? err.message : t("failedSave", lang));
            }
            finally {
                setSaving(false);
            }
        }
        return (React.createElement("div", { className: "py-6 px-4 mx-auto max-w-screen-xl sm:py-10 lg:px-6" },
            React.createElement("div", { className: "sk-ann-surface space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("div", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" }, getCategoryTitle(ctx.url, lang)),
                    React.createElement("input", { ref: titleInputRef, type: "text", value: title, onChange: (event) => setTitle(event.target.value), placeholder: t("titlePlaceholder", lang), className: "sk-ann-input h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300" })),
                React.createElement("div", { className: "sk-ann-editor-shell rounded-3xl border border-slate-200 bg-white" },
                    editorFailed ? (React.createElement("div", { className: "p-4 md:p-6" },
                        React.createElement("textarea", { ref: editorFallbackRef, className: "sk-ann-editor-fallback min-h-[560px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300", placeholder: t("contentRequired", lang), spellCheck: "true" }))) : (React.createElement("div", { ref: editorHostRef, className: "sk-ann-editor-host" })),
                    loading || (!editorReady && !editorFailed) ? (React.createElement("div", { className: "sk-ann-editor-overlay absolute inset-0 flex items-center justify-center backdrop-blur-sm" },
                        React.createElement("div", { className: "flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm" },
                            React.createElement(Spinner, { size: "h-5 w-5", tone: "text-blue-600" }),
                            React.createElement("span", null, t("loading", lang))))) : null),
                React.createElement(AttachmentDropzone, { lang: lang, existingItems: existingItems, setExistingItems: setExistingItems, newFiles: newFiles, setNewFiles: setNewFiles }),
                React.createElement("div", { className: "flex flex-wrap justify-end gap-2" },
                    React.createElement("button", { type: "button", onClick: handleSubmit, disabled: saving || loading || (!editorReady && !editorFailed), className: "inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70" }, saving ? t("saving", lang) : t("submit", lang)),
                    React.createElement("button", { type: "button", onClick: () => { window.location.href = buildPagePath(); }, className: "sk-ann-button--ghost inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50" }, t("list", lang))))));
    }
    if (ctx.mode === "read") {
        ReactDOM.render(React.createElement(ReadApp, null), document.getElementById("div_main"));
        return;
    }
    if (ctx.mode === "write" || ctx.mode === "edit") {
        ReactDOM.render(React.createElement(EditorApp, null), document.getElementById("div_main"));
        return;
    }
    ReactDOM.render(React.createElement(ListApp, null), document.getElementById("div_main"));
}
