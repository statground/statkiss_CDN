let awards_lang_watcher_started = false;
let last_awards_lang = null;
let awards_dark_watcher_started = false;
let last_awards_dark_mode = null;
let awards_keyboard_watcher_started = false;
let awards_navigation_guard_started = false;

let awards_loaded = false;
let awards_rows_cache = [];
let awards_default_icon_url = "";
let awards_original_state = { years: [] };
let awards_draft_state = { years: [] };
let awards_history = [];
let awards_history_index = -1;
let awards_selected_year = null;
let awards_selected_year_input_value = "";
let awards_add_year_input_value = "";
let awards_temp_counter = 0;
let awards_is_saving = false;
let awards_skip_beforeunload_guard = false;

function parse_awards_json_safe(text, fallback) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return fallback;
    }
}

function get_awards_i18n() {
    return window.StatKISS_AWARDS_I18N || null;
}

function get_awards_lang() {
    const i18n = get_awards_i18n();

    if (i18n && typeof i18n.getCurrentLang === "function") {
        return i18n.getCurrentLang();
    }

    if (window.StatKISS_I18N && typeof window.StatKISS_I18N.getInitialLang === "function") {
        return window.StatKISS_I18N.getInitialLang();
    }

    return "en";
}

function awards_t(key, vars = {}) {
    const i18n = get_awards_i18n();

    if (i18n && typeof i18n.t === "function") {
        return i18n.t(key, vars, get_awards_lang());
    }

    if (window.StatKISS_I18N && typeof window.StatKISS_I18N.t === "function") {
        const raw = window.StatKISS_I18N.t(get_awards_lang(), key);
        return String(raw).replace(/\{(\w+)\}/g, (match, token) => (
            Object.prototype.hasOwnProperty.call(vars, token) && vars[token] != null
                ? vars[token]
                : match
        ));
    }

    return key;
}

function get_awards_supported_lang_codes() {
    const codes = [];
    const i18n = get_awards_i18n();

    if (i18n && Array.isArray(i18n.languages)) {
        i18n.languages.forEach((item) => {
            if (item && typeof item.code === "string") {
                codes.push(item.code);
            } else if (typeof item === "string") {
                codes.push(item);
            }
        });
    } else if (window.StatKISS_I18N && Array.isArray(window.StatKISS_I18N.languages)) {
        window.StatKISS_I18N.languages.forEach((item) => {
            if (item && typeof item.code === "string") {
                codes.push(item.code);
            } else if (typeof item === "string") {
                codes.push(item);
            }
        });
    }

    return Array.from(new Set(codes.filter(Boolean)));
}

function get_awards_lang_prefix_from_path() {
    try {
        const pathname = (window.location && window.location.pathname) ? window.location.pathname : "/";
        const segments = pathname.split("/").filter(Boolean);
        const firstSegment = segments.length ? decodeURIComponent(segments[0]) : "";

        if (!firstSegment) {
            return "";
        }

        const langCodes = get_awards_supported_lang_codes().map((code) => String(code).toLowerCase());
        return langCodes.includes(firstSegment.toLowerCase()) ? `/${firstSegment}` : "";
    } catch (error) {
        return "";
    }
}

function infer_awards_base_path() {
    const langPrefix = get_awards_lang_prefix_from_path();
    return `${langPrefix}/awards/`.replace(/\/+/g, "/");
}

function parse_awards_page_config() {
    const configNode = document.getElementById("statkiss-awards-page-config");
    return parse_awards_json_safe((configNode && configNode.textContent) || "{}", {});
}

function build_awards_page_config(rawConfig) {
    const awardTag = String((rawConfig && (rawConfig.award_tag || rawConfig.url)) || "").trim();
    const awardsBase = infer_awards_base_path();
    const publicUrl = rawConfig && rawConfig.awards_public_path
        ? rawConfig.awards_public_path
        : awardTag ? `${awardsBase}${awardTag}/` : awardsBase;
    const editUrl = rawConfig && rawConfig.awards_edit_path
        ? rawConfig.awards_edit_path
        : awardTag ? `${awardsBase}${awardTag}/edit/` : "";

    return {
        lang: (rawConfig && rawConfig.lang) || get_awards_lang(),
        mode: rawConfig && rawConfig.mode === "edit" ? "edit" : "view",
        award_tag: awardTag,
        can_manage_awards: Boolean(rawConfig && rawConfig.can_manage_awards),
        awards_public_path: publicUrl,
        awards_edit_path: editUrl,
        api_list_url: (rawConfig && rawConfig.api_list_url) || `${awardsBase}ajax_get_awardees_list/`,
        api_save_url: (rawConfig && rawConfig.api_save_url) || `${awardsBase}ajax_save_awardees_edit/`,
    };
}

const AWARDS_PAGE_CONFIG = build_awards_page_config(parse_awards_page_config());

function is_awards_edit_mode() {
    return Boolean(
        AWARDS_PAGE_CONFIG.mode === "edit" &&
        AWARDS_PAGE_CONFIG.can_manage_awards &&
        AWARDS_PAGE_CONFIG.award_tag
    );
}

function build_awards_request_url(baseUrl, params = {}) {
    const urlObject = new URL(baseUrl, window.location.origin);
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value != null && value !== "") {
            urlObject.searchParams.set(key, value);
        }
    });
    return urlObject.toString();
}

async function fetch_awards_json(urlValue, options = {}) {
    const response = await fetch(urlValue, options);
    const text = await response.text();

    let payload = {};
    if (text) {
        try {
            payload = JSON.parse(text);
        } catch (error) {
            payload = { raw: text };
        }
    }

    if (!response.ok) {
        const message = payload.error || payload.message || payload.detail || payload.raw || `HTTP ${response.status}`;
        const fetchError = new Error(message);
        fetchError.status = response.status;
        fetchError.url = urlValue;
        fetchError.payload = payload;
        throw fetchError;
    }

    return payload;
}

function ensure_awards_lang_applied() {
    const i18n = get_awards_i18n();

    if (i18n && typeof i18n.applyLangToDocument === "function") {
        i18n.applyLangToDocument(get_awards_lang());
    }
}

function is_awards_dark_mode() {
    try {
        if (window.StatKISSTheme && typeof window.StatKISSTheme.isDark === 'function') {
            return window.StatKISSTheme.isDark();
        }
    } catch (error) {}
    try {
        const doc = document.documentElement;
        const body = document.body;
        return !!(
            (doc && (doc.classList.contains("dark") || doc.getAttribute("data-theme") === "dark" || doc.getAttribute("data-bs-theme") === "dark" || doc.getAttribute("data-statkiss-theme") === "dark" || doc.getAttribute("data-mode") === "dark")) ||
            (body && (body.classList.contains("dark") || body.getAttribute("data-theme") === "dark" || body.getAttribute("data-bs-theme") === "dark" || body.getAttribute("data-statkiss-theme") === "dark" || body.getAttribute("data-mode") === "dark"))
        );
    } catch (error) {
        return false;
    }
}

function awards_text_class(lightClass, darkClass) {
    return is_awards_dark_mode() ? darkClass : lightClass;
}

function inject_awards_theme_css() {
    if (document.getElementById("statkiss-awards-theme-css")) {
        return;
    }

    const roots = [
        "html.dark",
        "body.dark",
        ".dark",
        'html[data-theme="dark"]',
        'body[data-theme="dark"]',
        'html[data-bs-theme="dark"]',
        'body[data-bs-theme="dark"]',
        ".sk-theme-dark",
        ".statkiss-account-theme-dark",
    ];

    function themed(selector) {
        return roots.map((root) => `${root} ${selector}`).join(",\n");
    }

    const style = document.createElement("style");
    style.id = "statkiss-awards-theme-css";
    style.textContent = `
      ${themed('.statkiss-awards-page')} {
        color: #e2e8f0 !important;
        color-scheme: dark;
      }

      ${themed('.statkiss-awards-page .bg-white')} {
        background-color: #0b1220 !important;
      }

      ${themed('.statkiss-awards-page .bg-slate-50')} {
        background-color: #101827 !important;
      }

      ${themed('.statkiss-awards-page .bg-slate-100')} {
        background-color: #162133 !important;
      }

      ${themed('.statkiss-awards-page .bg-slate-800')} {
        background-color: #1e293b !important;
      }

      ${themed('.statkiss-awards-page .bg-slate-900')} {
        background-color: #0b1220 !important;
      }

      ${themed('.statkiss-awards-page .bg-slate-950')} {
        background-color: #020617 !important;
      }

      ${themed('.statkiss-awards-page .bg-slate-900\/60')} {
        background-color: rgba(11, 18, 32, 0.78) !important;
      }

      ${themed('.statkiss-awards-page .bg-fuchsia-50')} {
        background-color: rgba(74, 4, 78, 0.28) !important;
      }

      ${themed('.statkiss-awards-page .bg-fuchsia-50\/80')} {
        background-color: rgba(74, 4, 78, 0.34) !important;
      }

      ${themed('.statkiss-awards-page .bg-blue-50')} {
        background-color: rgba(10, 37, 64, 0.62) !important;
      }

      ${themed('.statkiss-awards-page .bg-red-50')} {
        background-color: rgba(69, 10, 10, 0.58) !important;
      }

      ${themed('.statkiss-awards-page .border-slate-100')} {
        border-color: #162033 !important;
      }

      ${themed('.statkiss-awards-page .border-slate-200')} {
        border-color: #223047 !important;
      }

      ${themed('.statkiss-awards-page .border-slate-300')} {
        border-color: #334155 !important;
      }

      ${themed('.statkiss-awards-page .border-slate-700')} {
        border-color: #334155 !important;
      }

      ${themed('.statkiss-awards-page .border-slate-800')} {
        border-color: #223047 !important;
      }

      ${themed('.statkiss-awards-page .border-fuchsia-200')} {
        border-color: #86198f !important;
      }

      ${themed('.statkiss-awards-page .border-fuchsia-300')} {
        border-color: #a21caf !important;
      }

      ${themed('.statkiss-awards-page .border-fuchsia-600')} {
        border-color: #c026d3 !important;
      }

      ${themed('.statkiss-awards-page .border-fuchsia-900')} {
        border-color: #86198f !important;
      }

      ${themed('.statkiss-awards-page .border-blue-200')} {
        border-color: #1d4ed8 !important;
      }

      ${themed('.statkiss-awards-page .border-blue-900')} {
        border-color: #1d4ed8 !important;
      }

      ${themed('.statkiss-awards-page .border-red-200')} {
        border-color: #be123c !important;
      }

      ${themed('.statkiss-awards-page .border-red-900')} {
        border-color: #be123c !important;
      }

      ${themed('.statkiss-awards-page .text-slate-900')} {
        color: #f8fafc !important;
      }

      ${themed('.statkiss-awards-page .text-slate-800')} {
        color: #e2e8f0 !important;
      }

      ${themed('.statkiss-awards-page .text-slate-700')} {
        color: #e2e8f0 !important;
      }

      ${themed('.statkiss-awards-page .text-slate-600')} {
        color: #cbd5e1 !important;
      }

      ${themed('.statkiss-awards-page .text-slate-500')} {
        color: #94a3b8 !important;
      }

      ${themed('.statkiss-awards-page .text-slate-400')} {
        color: #64748b !important;
      }

      ${themed('.statkiss-awards-page .text-fuchsia-900')} {
        color: #f5d0fe !important;
      }

      ${themed('.statkiss-awards-page .text-fuchsia-800')} {
        color: #f0abfc !important;
      }

      ${themed('.statkiss-awards-page .text-fuchsia-700')} {
        color: #f0abfc !important;
      }

      ${themed('.statkiss-awards-page .text-fuchsia-200')} {
        color: #f5d0fe !important;
      }

      ${themed('.statkiss-awards-page .text-fuchsia-100')} {
        color: #fae8ff !important;
      }

      ${themed('.statkiss-awards-page .text-blue-700')} {
        color: #bfdbfe !important;
      }

      ${themed('.statkiss-awards-page .text-blue-200')} {
        color: #dbeafe !important;
      }

      ${themed('.statkiss-awards-page .text-red-700')} {
        color: #fecdd3 !important;
      }

      ${themed('.statkiss-awards-page .text-red-200')} {
        color: #ffe4e6 !important;
      }

      ${themed('.statkiss-awards-page .placeholder\:text-slate-400::placeholder')} {
        color: #64748b !important;
      }

      ${themed('.statkiss-awards-page .placeholder\:text-slate-500::placeholder')} {
        color: #475569 !important;
      }

      ${themed('.statkiss-awards-page .shadow-sm')} {
        box-shadow: 0 12px 28px rgba(2, 6, 23, 0.28) !important;
      }

      ${themed('.statkiss-awards-page .shadow-2xl')} {
        box-shadow: 0 24px 60px rgba(2, 6, 23, 0.56) !important;
      }

      ${themed('.statkiss-awards-page .awards-year-select-btn:hover')} {
        background-color: #111827 !important;
        border-color: #475569 !important;
      }

      ${themed('.statkiss-awards-page .awards-row-move-btn:hover:not(:disabled)')} {
        background-color: #162133 !important;
      }

      ${themed('.statkiss-awards-page .awards-row-delete-btn:hover')} {
        background-color: rgba(127, 29, 29, 0.32) !important;
      }

      ${themed('.statkiss-awards-page .hover\:bg-slate-50:hover')} {
        background-color: #111827 !important;
      }

      ${themed('.statkiss-awards-page .hover\:bg-slate-100:hover')} {
        background-color: #162133 !important;
      }

      ${themed('.statkiss-awards-page .hover\:bg-fuchsia-100:hover')} {
        background-color: rgba(112, 26, 117, 0.42) !important;
      }

      ${themed('.statkiss-awards-page .hover\:bg-blue-100:hover')} {
        background-color: rgba(29, 78, 216, 0.35) !important;
      }

      ${themed('.statkiss-awards-page .hover\:bg-red-100:hover')} {
        background-color: rgba(190, 24, 93, 0.28) !important;
      }

      ${themed('#statkiss-awards-cancel-btn')} {
        background-color: #0b1220 !important;
        border-color: #334155 !important;
        color: #e2e8f0 !important;
      }

      ${themed('#statkiss-awards-cancel-btn:hover')} {
        background-color: #111827 !important;
        border-color: #475569 !important;
      }
    `;
    document.head.appendChild(style);
}

function ensure_awards_dark_mode_watcher() {
    if (awards_dark_watcher_started) {
        return;
    }

    awards_dark_watcher_started = true;
    last_awards_dark_mode = is_awards_dark_mode();

    const rerenderIfDarkModeChanged = () => {
        const currentDarkMode = is_awards_dark_mode();

        if (currentDarkMode !== last_awards_dark_mode) {
            last_awards_dark_mode = currentDarkMode;
            set_main({ reuseData: true });
        }
    };

    window.setInterval(rerenderIfDarkModeChanged, 400);

    try {
        const observer = new MutationObserver(rerenderIfDarkModeChanged);

        if (document.documentElement) {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class", "data-theme", "style"],
            });
        }

        if (document.body) {
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ["class", "data-theme", "style"],
            });
        }
    } catch (error) {
        console.error(error);
    }
}

function ensure_awards_lang_watcher() {
    if (awards_lang_watcher_started) {
        return;
    }

    awards_lang_watcher_started = true;
    last_awards_lang = get_awards_lang();

    window.setInterval(() => {
        const currentLang = get_awards_lang();

        if (currentLang !== last_awards_lang) {
            last_awards_lang = currentLang;
            set_main({ reuseData: true });
        }
    }, 700);

    window.addEventListener("storage", (event) => {
        const i18n = get_awards_i18n();
        const langKey = (i18n && i18n.LANG_KEY) || "statkiss_lang";

        if (!event || event.key === langKey) {
            const currentLang = get_awards_lang();

            if (currentLang !== last_awards_lang) {
                last_awards_lang = currentLang;
                set_main({ reuseData: true });
            }
        }
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i += 1) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === `${name}=`) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function escape_html(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function deep_clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function create_awards_temp_id() {
    awards_temp_counter += 1;
    return `tmp_${Date.now()}_${awards_temp_counter}`;
}

function parse_year_value(value) {
    const parsed = Number.parseInt(String(value == null ? "" : value).trim(), 10);
    if (!Number.isFinite(parsed)) {
        return null;
    }
    if (parsed < 1900 || parsed > 3000) {
        return null;
    }
    return parsed;
}

function normalize_award_item(item, fallbackIndex = 0) {
    const uuidValue = String(item && item.uuid ? item.uuid : "").trim();
    const tempIdValue = String(item && item.temp_id ? item.temp_id : "").trim() || create_awards_temp_id();
    const sortOrder = Number.parseInt(item && item.sort_order != null ? item.sort_order : fallbackIndex + 1, 10);

    return {
        uuid: uuidValue,
        temp_id: tempIdValue,
        name: String(item && item.name ? item.name : ""),
        affiliation: String(item && item.affiliation ? item.affiliation : ""),
        award_url_icon: String(item && item.award_url_icon ? item.award_url_icon : awards_default_icon_url),
        sort_order: Number.isFinite(sortOrder) && sortOrder > 0 ? sortOrder : fallbackIndex + 1,
    };
}

function normalize_awards_state(inputState) {
    const sourceYears = Array.isArray(inputState && inputState.years) ? inputState.years : [];
    const yearBuckets = {};

    sourceYears.forEach((yearEntry) => {
        const yearValue = parse_year_value(yearEntry && yearEntry.year);
        if (yearValue == null) {
            return;
        }
        if (!yearBuckets[yearValue]) {
            yearBuckets[yearValue] = [];
        }
        const items = Array.isArray(yearEntry && yearEntry.items) ? yearEntry.items : [];
        items.forEach((item, index) => {
            yearBuckets[yearValue].push(normalize_award_item(item, index));
        });
    });

    const yearValues = Object.keys(yearBuckets).map((item) => Number.parseInt(item, 10)).filter((item) => Number.isFinite(item)).sort((a, b) => b - a);

    return {
        years: yearValues.map((yearValue) => {
            const items = yearBuckets[yearValue]
                .slice()
                .sort((a, b) => {
                    const sortGap = Number(a.sort_order || 0) - Number(b.sort_order || 0);
                    if (sortGap !== 0) {
                        return sortGap;
                    }
                    return String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base" });
                })
                .map((item, index) => ({
                    ...item,
                    award_url_icon: item.award_url_icon || awards_default_icon_url,
                    sort_order: index + 1,
                }));

            return {
                year: yearValue,
                items,
            };
        }),
    };
}

function get_awards_state_signature(stateValue) {
    return JSON.stringify(normalize_awards_state(stateValue));
}

function get_year_values_from_state(stateValue) {
    const state = normalize_awards_state(stateValue);
    return state.years.map((yearEntry) => yearEntry.year);
}

function get_selected_year_group(stateValue) {
    const state = normalize_awards_state(stateValue);
    return state.years.find((yearEntry) => Number(yearEntry.year) === Number(awards_selected_year)) || null;
}

function convert_rows_to_awards_state(rows) {
    const yearBuckets = {};
    (Array.isArray(rows) ? rows : []).forEach((row, index) => {
        const yearValue = parse_year_value(row && row.year);
        if (yearValue == null) {
            return;
        }
        if (!yearBuckets[yearValue]) {
            yearBuckets[yearValue] = [];
        }
        yearBuckets[yearValue].push({
            uuid: String(row && row.uuid ? row.uuid : "").trim(),
            temp_id: String(row && row.uuid ? row.uuid : create_awards_temp_id()),
            name: String(row && row.name ? row.name : ""),
            affiliation: String(row && row.affiliation ? row.affiliation : ""),
            award_url_icon: String(row && row.award_url_icon ? row.award_url_icon : awards_default_icon_url),
            sort_order: Number.parseInt(row && row.sort_order != null ? row.sort_order : index + 1, 10) || (index + 1),
        });
    });

    return normalize_awards_state({
        years: Object.keys(yearBuckets).map((yearKey) => ({
            year: Number.parseInt(yearKey, 10),
            items: yearBuckets[yearKey],
        })),
    });
}

function extract_awards_rows(payload) {
    if (!payload) {
        return [];
    }
    if (Array.isArray(payload.rows)) {
        return payload.rows;
    }
    if (Array.isArray(payload)) {
        return payload;
    }
    if (payload.rows && typeof payload.rows === "object") {
        return Object.values(payload.rows);
    }
    if (typeof payload === "object") {
        const values = Object.values(payload);
        if (values.length && typeof values[0] === "object") {
            return values;
        }
    }
    return [];
}

function reset_awards_editor_state_from_rows(rows) {
    awards_rows_cache = Array.isArray(rows) ? rows.slice() : [];
    awards_default_icon_url = awards_rows_cache.length && awards_rows_cache[0].award_url_icon
        ? String(awards_rows_cache[0].award_url_icon)
        : awards_default_icon_url;

    const normalizedState = convert_rows_to_awards_state(awards_rows_cache);
    awards_original_state = deep_clone(normalizedState);
    awards_draft_state = deep_clone(normalizedState);
    awards_history = [deep_clone(normalizedState)];
    awards_history_index = 0;

    const yearValues = get_year_values_from_state(normalizedState);
    awards_selected_year = yearValues.length ? yearValues[0] : null;
    awards_selected_year_input_value = awards_selected_year != null ? String(awards_selected_year) : "";
}

function sync_awards_selected_year(preferredYear = null) {
    const yearValues = get_year_values_from_state(awards_draft_state);
    const preferred = parse_year_value(preferredYear != null ? preferredYear : awards_selected_year);

    if (!yearValues.length) {
        awards_selected_year = null;
        awards_selected_year_input_value = "";
        return;
    }

    if (preferred != null && yearValues.includes(preferred)) {
        awards_selected_year = preferred;
    } else if (awards_selected_year != null && yearValues.includes(awards_selected_year)) {
        awards_selected_year = awards_selected_year;
    } else {
        awards_selected_year = yearValues[0];
    }

    awards_selected_year_input_value = awards_selected_year != null ? String(awards_selected_year) : "";
}

function is_awards_dirty() {
    return get_awards_state_signature(awards_original_state) !== get_awards_state_signature(awards_draft_state);
}

function can_awards_undo() {
    return is_awards_edit_mode() && awards_history_index > 0;
}

function can_awards_redo() {
    return is_awards_edit_mode() && awards_history_index >= 0 && awards_history_index < awards_history.length - 1;
}

function push_awards_history_snapshot(normalizedState) {
    const nextSignature = get_awards_state_signature(normalizedState);
    const currentSignature = awards_history_index >= 0 && awards_history_index < awards_history.length
        ? get_awards_state_signature(awards_history[awards_history_index])
        : null;

    if (nextSignature === currentSignature) {
        awards_draft_state = deep_clone(normalizedState);
        return false;
    }

    awards_history = awards_history.slice(0, awards_history_index + 1);
    awards_history.push(deep_clone(normalizedState));
    awards_history_index = awards_history.length - 1;
    awards_draft_state = deep_clone(normalizedState);
    return true;
}

function commit_awards_state(mutator, options = {}) {
    const rerender = options.rerender !== false;
    const preferredYear = options.preferredYear != null ? options.preferredYear : awards_selected_year;
    const nextState = deep_clone(awards_draft_state);
    mutator(nextState);
    const normalizedState = normalize_awards_state(nextState);
    const changed = push_awards_history_snapshot(normalizedState);

    if (!changed) {
        return false;
    }

    sync_awards_selected_year(preferredYear);

    if (rerender) {
        render_awards_editor_panel();
    } else {
        refresh_awards_editor_status();
    }
    render_awards_floating_buttons();
    return true;
}

function set_awards_selected_year(yearValue) {
    const parsedYear = parse_year_value(yearValue);
    if (parsedYear == null) {
        return;
    }
    awards_selected_year = parsedYear;
    awards_selected_year_input_value = String(parsedYear);
    render_awards_editor_panel();
}

function undo_awards_state() {
    if (!can_awards_undo()) {
        return false;
    }
    awards_history_index -= 1;
    awards_draft_state = deep_clone(awards_history[awards_history_index]);
    sync_awards_selected_year(awards_selected_year);
    render_awards_editor_panel();
    render_awards_floating_buttons();
    return true;
}

function redo_awards_state() {
    if (!can_awards_redo()) {
        return false;
    }
    awards_history_index += 1;
    awards_draft_state = deep_clone(awards_history[awards_history_index]);
    sync_awards_selected_year(awards_selected_year);
    render_awards_editor_panel();
    render_awards_floating_buttons();
    return true;
}

function get_award_page_content() {
    if (AWARDS_PAGE_CONFIG.award_tag === "career") {
        return {
            title: awards_t("awards.title.career"),
            description: awards_t("awards.desc.career"),
        };
    }

    if (AWARDS_PAGE_CONFIG.award_tag === "student") {
        return {
            title: awards_t("awards.title.student"),
            description: awards_t("awards.desc.student"),
        };
    }

    return {
        title: "KISS Awards",
        description: "",
    };
}

function render_awards_public_list() {
    const target = document.getElementById("statkiss-awards-content-root");
    if (!target) {
        return;
    }

    const state = normalize_awards_state(awards_original_state);
    const yearCards = state.years.map((yearEntry) => {
        const people = yearEntry.items.map((item) => `
            <li class="flex items-start gap-3">
                ${item.award_url_icon ? `<img class="mt-1 h-4 w-4 shrink-0" src="${escape_html(item.award_url_icon)}" alt="" />` : ""}
                <div class="min-w-0">
                    <p class="break-words text-base font-medium ${escape_html(awards_text_class("text-slate-900", "text-slate-100"))}">${escape_html(item.name)}</p>
                    <p class="break-words text-sm ${escape_html(awards_text_class("text-slate-500", "text-slate-300"))}">${escape_html(item.affiliation)}</p>
                </div>
            </li>
        `).join("");

        return `
            <section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 class="mb-4 text-2xl font-bold ${escape_html(awards_text_class("text-slate-900", "text-white"))}">${escape_html(awards_t("awards.list.year_awardees", { year: yearEntry.year }))}</h3>
                <ul class="space-y-4">${people}</ul>
            </section>
        `;
    }).join("");

    if (!state.years.length) {
        target.innerHTML = `
            <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                ${escape_html(awards_t("awards.list.empty"))}
            </div>
        `;
        return;
    }

    target.innerHTML = `
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
            ${yearCards}
        </div>
    `;
}

function get_year_count_badge_html(yearEntry) {
    const countValue = Array.isArray(yearEntry && yearEntry.items) ? yearEntry.items.length : 0;
    return `<span class="inline-flex min-w-[2rem] items-center justify-center rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">${escape_html(countValue)}</span>`;
}

function render_awards_editor_panel() {
    const target = document.getElementById("statkiss-awards-content-root");
    if (!target) {
        return;
    }

    const state = normalize_awards_state(awards_draft_state);
    const yearValues = state.years.map((yearEntry) => yearEntry.year);
    const selectedYearGroup = get_selected_year_group(state);

    const yearsHtml = state.years.map((yearEntry) => {
        const isSelected = Number(yearEntry.year) === Number(awards_selected_year);
        const buttonClass = isSelected
            ? "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-900 dark:border-fuchsia-600 dark:bg-fuchsia-950/50 dark:text-fuchsia-100"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800";
        return `
            <button type="button" data-awards-year="${escape_html(yearEntry.year)}" class="awards-year-select-btn flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${buttonClass}">
                <span>${escape_html(yearEntry.year)}</span>
                ${get_year_count_badge_html(yearEntry)}
            </button>
        `;
    }).join("");

    let detailHtml = `
        <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <p class="text-base font-semibold">${escape_html(awards_t("awards.manage.no_year_selected"))}</p>
        </div>
    `;

    if (selectedYearGroup) {
        const awardeeItemsHtml = selectedYearGroup.items.map((item, index) => {
            const itemKey = item.uuid ? `uuid:${item.uuid}` : `temp:${item.temp_id}`;
            const disableUp = index === 0 ? "disabled" : "";
            const disableDown = index === selectedYearGroup.items.length - 1 ? "disabled" : "";
            const disabledClassUp = index === 0 ? "cursor-not-allowed opacity-40" : "hover:bg-slate-100 dark:hover:bg-slate-800";
            const disabledClassDown = index === selectedYearGroup.items.length - 1 ? "cursor-not-allowed opacity-40" : "hover:bg-slate-100 dark:hover:bg-slate-800";

            return `
                <div class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div class="flex min-w-0 flex-1 gap-3">
                            ${item.award_url_icon ? `<img class="mt-1 h-4 w-4 shrink-0" src="${escape_html(item.award_url_icon)}" alt="" />` : ""}
                            <div class="grid min-w-0 flex-1 gap-3 md:grid-cols-2">
                                <div>
                                    <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">${escape_html(awards_t("awards.form.name"))}</label>
                                    <input
                                        type="text"
                                        value="${escape_html(item.name)}"
                                        data-awards-row-key="${escape_html(itemKey)}"
                                        class="awards-name-input block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-950"
                                        placeholder="${escape_html(awards_t("awards.form.name_placeholder"))}"
                                    />
                                </div>
                                <div>
                                    <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">${escape_html(awards_t("awards.form.affiliation"))}</label>
                                    <input
                                        type="text"
                                        value="${escape_html(item.affiliation)}"
                                        data-awards-row-key="${escape_html(itemKey)}"
                                        class="awards-affiliation-input block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-950"
                                        placeholder="${escape_html(awards_t("awards.form.affiliation_placeholder"))}"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="flex shrink-0 items-center gap-2 self-end lg:self-start">
                            <button type="button" data-awards-move="up" data-awards-row-key="${escape_html(itemKey)}" ${disableUp} class="awards-row-move-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition dark:border-slate-700 dark:text-slate-100 ${disabledClassUp}" title="${escape_html(awards_t("awards.action.move_up"))}" aria-label="${escape_html(awards_t("awards.action.move_up"))}">↑</button>
                            <button type="button" data-awards-move="down" data-awards-row-key="${escape_html(itemKey)}" ${disableDown} class="awards-row-move-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition dark:border-slate-700 dark:text-slate-100 ${disabledClassDown}" title="${escape_html(awards_t("awards.action.move_down"))}" aria-label="${escape_html(awards_t("awards.action.move_down"))}">↓</button>
                            <button type="button" data-awards-delete-row="${escape_html(itemKey)}" class="awards-row-delete-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40" title="${escape_html(awards_t("awards.action.delete"))}" aria-label="${escape_html(awards_t("awards.action.delete"))}">🗑</button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        detailHtml = `
            <div class="space-y-5">
                <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                        <div class="grid gap-3 sm:grid-cols-[minmax(0,220px)_auto_auto] sm:items-end">
                            <div>
                                <label class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">${escape_html(awards_t("awards.manage.selected_year"))}</label>
                                <input id="awards-selected-year-input" type="number" value="${escape_html(awards_selected_year_input_value)}" class="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-950" placeholder="${escape_html(awards_t("awards.form.year_placeholder"))}" />
                            </div>
                            <button id="awards-apply-year-btn" type="button" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/70">${escape_html(awards_t("awards.action.apply_year"))}</button>
                            <button id="awards-remove-year-btn" type="button" class="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-950/70">${escape_html(awards_t("awards.action.remove_year"))}</button>
                        </div>

                        <div class="flex flex-wrap items-center gap-2">
                            <button id="awards-undo-btn" type="button" class="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" ${can_awards_undo() ? "" : "disabled"}>${escape_html(awards_t("awards.action.undo"))}</button>
                            <button id="awards-redo-btn" type="button" class="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" ${can_awards_redo() ? "" : "disabled"}>${escape_html(awards_t("awards.action.redo"))}</button>
                            <span id="awards-history-status" class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">${escape_html(is_awards_dirty() ? awards_t("awards.manage.unsaved_changes") : awards_t("awards.manage.saved_state"))}</span>
                        </div>
                    </div>
                    <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">${escape_html(awards_t("awards.manage.history_hint"))}</p>
                </div>

                <div class="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div>
                        <h3 class="text-lg font-semibold ${escape_html(awards_text_class("text-slate-900", "text-white"))}">${escape_html(awards_t("awards.list.year_awardees", { year: selectedYearGroup.year }))}</h3>
                    </div>
                    <button id="awards-add-awardee-btn" type="button" class="inline-flex items-center rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-fuchsia-900 dark:bg-fuchsia-950/40 dark:text-fuchsia-200 dark:hover:bg-fuchsia-950/70">${escape_html(awards_t("awards.manage.add_awardee"))}</button>
                </div>

                ${selectedYearGroup.items.length ? awardeeItemsHtml : `
                    <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                        ${escape_html(awards_t("awards.list.empty"))}
                    </div>
                `}
            </div>
        `;
    }

    target.innerHTML = `
        <div class="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
            <section class="space-y-5">
                <div class="rounded-3xl border border-fuchsia-200 bg-fuchsia-50/80 p-5 shadow-sm dark:border-fuchsia-900 dark:bg-fuchsia-950/40">
                    <h3 class="text-lg font-semibold text-fuchsia-900 dark:text-fuchsia-100">${escape_html(awards_t("awards.manage.edit_mode_title"))}</h3>
                    <p class="mt-2 text-sm text-fuchsia-800 dark:text-fuchsia-200">${escape_html(awards_t("awards.manage.edit_mode_desc"))}</p>
                </div>

                <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div class="mb-4">
                        <h3 class="text-lg font-semibold ${escape_html(awards_text_class("text-slate-900", "text-white"))}">${escape_html(awards_t("awards.manage.years_title"))}</h3>
                        <p class="mt-2 text-sm ${escape_html(awards_text_class("text-slate-500", "text-slate-300"))}">${escape_html(awards_t("awards.manage.years_desc"))}</p>
                    </div>

                    <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <input id="awards-add-year-input" type="number" value="${escape_html(awards_add_year_input_value)}" class="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-950" placeholder="${escape_html(awards_t("awards.form.year_placeholder"))}" />
                        <button id="awards-add-year-btn" type="button" class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/70">${escape_html(awards_t("awards.action.add_year"))}</button>
                    </div>

                    <div class="mt-4 flex flex-col gap-3">
                        ${yearsHtml || `
                            <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                                ${escape_html(awards_t("awards.manage.no_year_selected"))}
                            </div>
                        `}
                    </div>
                </div>
            </section>

            <section>
                ${detailHtml}
            </section>
        </div>
    `;

    bind_awards_editor_listeners();
    refresh_awards_editor_status();
}

function refresh_awards_editor_status() {
    const historyStatus = document.getElementById("awards-history-status");
    if (historyStatus) {
        historyStatus.textContent = is_awards_dirty() ? awards_t("awards.manage.unsaved_changes") : awards_t("awards.manage.saved_state");
    }

    const undoBtn = document.getElementById("awards-undo-btn");
    if (undoBtn) {
        undoBtn.disabled = !can_awards_undo();
    }

    const redoBtn = document.getElementById("awards-redo-btn");
    if (redoBtn) {
        redoBtn.disabled = !can_awards_redo();
    }
}

function bind_awards_editor_listeners() {
    const addYearInput = document.getElementById("awards-add-year-input");
    if (addYearInput) {
        addYearInput.addEventListener("input", (event) => {
            awards_add_year_input_value = event && event.target ? event.target.value : "";
        });
        addYearInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                handle_awards_add_year();
            }
        });
    }

    const addYearBtn = document.getElementById("awards-add-year-btn");
    if (addYearBtn) {
        addYearBtn.addEventListener("click", handle_awards_add_year);
    }

    const yearButtons = document.querySelectorAll(".awards-year-select-btn");
    yearButtons.forEach((button) => {
        button.addEventListener("click", () => {
            set_awards_selected_year(button.getAttribute("data-awards-year"));
        });
    });

    const selectedYearInput = document.getElementById("awards-selected-year-input");
    if (selectedYearInput) {
        selectedYearInput.addEventListener("input", (event) => {
            awards_selected_year_input_value = event && event.target ? event.target.value : "";
        });
        selectedYearInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                handle_awards_apply_year();
            }
        });
    }

    const applyYearBtn = document.getElementById("awards-apply-year-btn");
    if (applyYearBtn) {
        applyYearBtn.addEventListener("click", handle_awards_apply_year);
    }

    const removeYearBtn = document.getElementById("awards-remove-year-btn");
    if (removeYearBtn) {
        removeYearBtn.addEventListener("click", handle_awards_remove_year);
    }

    const undoBtn = document.getElementById("awards-undo-btn");
    if (undoBtn) {
        undoBtn.addEventListener("click", () => {
            undo_awards_state();
        });
    }

    const redoBtn = document.getElementById("awards-redo-btn");
    if (redoBtn) {
        redoBtn.addEventListener("click", () => {
            redo_awards_state();
        });
    }

    const addAwardeeBtn = document.getElementById("awards-add-awardee-btn");
    if (addAwardeeBtn) {
        addAwardeeBtn.addEventListener("click", handle_awards_add_awardee);
    }

    document.querySelectorAll(".awards-name-input").forEach((input) => {
        input.addEventListener("input", (event) => {
            const rowKey = event && event.target ? event.target.getAttribute("data-awards-row-key") : "";
            update_awardee_field(rowKey, "name", event && event.target ? event.target.value : "");
        });
    });

    document.querySelectorAll(".awards-affiliation-input").forEach((input) => {
        input.addEventListener("input", (event) => {
            const rowKey = event && event.target ? event.target.getAttribute("data-awards-row-key") : "";
            update_awardee_field(rowKey, "affiliation", event && event.target ? event.target.value : "");
        });
    });

    document.querySelectorAll(".awards-row-delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
            handle_awards_delete_awardee(button.getAttribute("data-awards-delete-row"));
        });
    });

    document.querySelectorAll(".awards-row-move-btn").forEach((button) => {
        button.addEventListener("click", () => {
            handle_awards_move_awardee(button.getAttribute("data-awards-row-key"), button.getAttribute("data-awards-move"));
        });
    });
}

function get_awards_row_matcher(rowKey) {
    return function matchRow(item) {
        const itemKey = item.uuid ? `uuid:${item.uuid}` : `temp:${item.temp_id}`;
        return itemKey === rowKey;
    };
}

function handle_awards_add_year() {
    const parsedYear = parse_year_value(awards_add_year_input_value);
    if (parsedYear == null) {
        alert(awards_t("awards.alert.enter_valid_year"));
        return;
    }

    const existingYears = get_year_values_from_state(awards_draft_state);
    if (existingYears.includes(parsedYear)) {
        awards_add_year_input_value = "";
        awards_selected_year = parsedYear;
        awards_selected_year_input_value = String(parsedYear);
        render_awards_editor_panel();
        alert(awards_t("awards.alert.year_exists"));
        return;
    }

    awards_add_year_input_value = "";
    commit_awards_state((draftState) => {
        draftState.years.push({ year: parsedYear, items: [] });
    }, { preferredYear: parsedYear, rerender: true });
}

function handle_awards_apply_year() {
    if (awards_selected_year == null) {
        alert(awards_t("awards.alert.no_year_selected"));
        return;
    }

    const targetYear = parse_year_value(awards_selected_year_input_value);
    if (targetYear == null) {
        alert(awards_t("awards.alert.enter_valid_year"));
        return;
    }

    const currentYear = awards_selected_year;
    if (targetYear === currentYear) {
        awards_selected_year_input_value = String(currentYear);
        return;
    }

    commit_awards_state((draftState) => {
        const sourceIndex = draftState.years.findIndex((yearEntry) => Number(yearEntry.year) === Number(currentYear));
        if (sourceIndex < 0) {
            return;
        }
        const sourceEntry = draftState.years[sourceIndex];
        const targetIndex = draftState.years.findIndex((yearEntry) => Number(yearEntry.year) === Number(targetYear));

        if (targetIndex >= 0) {
            const targetEntry = draftState.years[targetIndex];
            targetEntry.items = targetEntry.items.concat(sourceEntry.items.map((item) => ({ ...item })));
            draftState.years.splice(sourceIndex, 1);
        } else {
            sourceEntry.year = targetYear;
        }
    }, { preferredYear: targetYear, rerender: true });
}

function handle_awards_remove_year() {
    if (awards_selected_year == null) {
        alert(awards_t("awards.alert.no_year_selected"));
        return;
    }

    if (!window.confirm(awards_t("awards.alert.delete_year_confirm"))) {
        return;
    }

    const removedYear = awards_selected_year;
    commit_awards_state((draftState) => {
        draftState.years = draftState.years.filter((yearEntry) => Number(yearEntry.year) !== Number(removedYear));
    }, { preferredYear: null, rerender: true });
}

function handle_awards_add_awardee() {
    if (awards_selected_year == null) {
        alert(awards_t("awards.alert.no_year_selected"));
        return;
    }

    commit_awards_state((draftState) => {
        const targetYear = draftState.years.find((yearEntry) => Number(yearEntry.year) === Number(awards_selected_year));
        if (!targetYear) {
            return;
        }
        targetYear.items.push({
            uuid: "",
            temp_id: create_awards_temp_id(),
            name: "",
            affiliation: "",
            award_url_icon: awards_default_icon_url,
            sort_order: targetYear.items.length + 1,
        });
    }, { preferredYear: awards_selected_year, rerender: true });
}

function update_awardee_field(rowKey, fieldName, value) {
    commit_awards_state((draftState) => {
        draftState.years.forEach((yearEntry) => {
            yearEntry.items.forEach((item) => {
                if (get_awards_row_matcher(rowKey)(item)) {
                    item[fieldName] = String(value == null ? "" : value);
                }
            });
        });
    }, { preferredYear: awards_selected_year, rerender: false });
}

function handle_awards_delete_awardee(rowKey) {
    if (!window.confirm(awards_t("awards.alert.delete_confirm"))) {
        return;
    }

    commit_awards_state((draftState) => {
        draftState.years.forEach((yearEntry) => {
            yearEntry.items = yearEntry.items.filter((item) => !get_awards_row_matcher(rowKey)(item));
        });
    }, { preferredYear: awards_selected_year, rerender: true });
}

function handle_awards_move_awardee(rowKey, direction) {
    commit_awards_state((draftState) => {
        const targetYear = draftState.years.find((yearEntry) => Number(yearEntry.year) === Number(awards_selected_year));
        if (!targetYear) {
            return;
        }

        const itemIndex = targetYear.items.findIndex((item) => get_awards_row_matcher(rowKey)(item));
        if (itemIndex < 0) {
            return;
        }

        if (direction === "up" && itemIndex > 0) {
            const currentItem = targetYear.items[itemIndex];
            targetYear.items[itemIndex] = targetYear.items[itemIndex - 1];
            targetYear.items[itemIndex - 1] = currentItem;
        }

        if (direction === "down" && itemIndex < targetYear.items.length - 1) {
            const currentItem = targetYear.items[itemIndex];
            targetYear.items[itemIndex] = targetYear.items[itemIndex + 1];
            targetYear.items[itemIndex + 1] = currentItem;
        }

        targetYear.items = targetYear.items.map((item, index) => ({
            ...item,
            sort_order: index + 1,
        }));
    }, { preferredYear: awards_selected_year, rerender: true });
}

function validate_awards_before_save() {
    const state = normalize_awards_state(awards_draft_state);

    for (let yearIndex = 0; yearIndex < state.years.length; yearIndex += 1) {
        const yearEntry = state.years[yearIndex];
        for (let itemIndex = 0; itemIndex < yearEntry.items.length; itemIndex += 1) {
            const item = yearEntry.items[itemIndex];
            if (!String(item.name || "").trim()) {
                alert(awards_t("awards.alert.invalid_awardee_name", { year: yearEntry.year, index: itemIndex + 1 }));
                return false;
            }
            if (!String(item.affiliation || "").trim()) {
                alert(awards_t("awards.alert.invalid_awardee_affiliation", { year: yearEntry.year, index: itemIndex + 1 }));
                return false;
            }
        }
    }

    return true;
}

function build_awards_save_payload() {
    const state = normalize_awards_state(awards_draft_state);
    const rows = [];

    state.years.forEach((yearEntry) => {
        yearEntry.items.forEach((item, index) => {
            rows.push({
                uuid: item.uuid || "",
                year: yearEntry.year,
                name: String(item.name || "").trim(),
                affiliation: String(item.affiliation || "").trim(),
                sort_order: index + 1,
            });
        });
    });

    return {
        award_tag: AWARDS_PAGE_CONFIG.award_tag,
        rows,
    };
}

async function save_awards_and_exit() {
    if (!is_awards_edit_mode()) {
        return;
    }

    if (awards_is_saving) {
        return;
    }

    if (!is_awards_dirty()) {
        window.location.href = AWARDS_PAGE_CONFIG.awards_public_path;
        return;
    }

    if (!validate_awards_before_save()) {
        return;
    }

    awards_is_saving = true;
    render_awards_floating_buttons();

    try {
        await fetch_awards_json(build_awards_request_url(AWARDS_PAGE_CONFIG.api_save_url), {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(build_awards_save_payload()),
        });

        const savedState = normalize_awards_state(awards_draft_state);
        awards_original_state = deep_clone(savedState);
        awards_draft_state = deep_clone(savedState);
        awards_history = [deep_clone(savedState)];
        awards_history_index = 0;
        mark_awards_navigation_safe();
        window.location.href = AWARDS_PAGE_CONFIG.awards_public_path;
    } catch (error) {
        console.error(error);
        if (error && error.status === 403) {
            alert(awards_t("awards.alert.forbidden"));
        } else {
            alert(awards_t("awards.alert.save_failed"));
        }
    } finally {
        awards_is_saving = false;
        render_awards_floating_buttons();
    }
}

function render_awards_floating_buttons() {
    const doneBtn = document.getElementById("statkiss-awards-done-btn");
    if (doneBtn) {
        doneBtn.disabled = Boolean(awards_is_saving);
        doneBtn.classList.toggle("opacity-70", Boolean(awards_is_saving));
        doneBtn.classList.toggle("cursor-not-allowed", Boolean(awards_is_saving));
    }
}

function mark_awards_navigation_safe() {
    awards_skip_beforeunload_guard = true;
    window.setTimeout(() => {
        awards_skip_beforeunload_guard = false;
    }, 2500);
}

function bind_awards_floating_buttons() {
    const doneBtn = document.getElementById("statkiss-awards-done-btn");
    if (doneBtn && !doneBtn.dataset.bound) {
        doneBtn.dataset.bound = "1";
        doneBtn.addEventListener("click", (event) => {
            event.preventDefault();
            save_awards_and_exit();
        });
    }

    const cancelBtn = document.getElementById("statkiss-awards-cancel-btn");
    if (cancelBtn && !cancelBtn.dataset.bound) {
        cancelBtn.dataset.bound = "1";
        cancelBtn.addEventListener("click", (event) => {
            if (is_awards_edit_mode() && is_awards_dirty()) {
                const confirmed = window.confirm(awards_t("awards.alert.discard_confirm"));
                if (!confirmed) {
                    event.preventDefault();
                    return;
                }
            }
            mark_awards_navigation_safe();
        });
    }
}

function ensure_awards_keyboard_shortcuts() {
    if (awards_keyboard_watcher_started) {
        return;
    }
    awards_keyboard_watcher_started = true;

    document.addEventListener("keydown", (event) => {
        if (!is_awards_edit_mode()) {
            return;
        }

        const isMeta = Boolean(event.ctrlKey || event.metaKey);
        if (!isMeta || event.altKey) {
            return;
        }

        const key = String(event.key || "").toLowerCase();

        if (key === "z" && event.shiftKey) {
            event.preventDefault();
            redo_awards_state();
            return;
        }

        if (key === "z") {
            event.preventDefault();
            undo_awards_state();
            return;
        }

        if (key === "y") {
            event.preventDefault();
            redo_awards_state();
        }
    });
}

function ensure_awards_navigation_guard() {
    if (awards_navigation_guard_started) {
        return;
    }
    awards_navigation_guard_started = true;

    window.addEventListener("beforeunload", (event) => {
        if (awards_skip_beforeunload_guard || !is_awards_edit_mode() || !is_awards_dirty()) {
            return;
        }
        const message = awards_t("awards.alert.unsaved_leave");
        event.preventDefault();
        event.returnValue = message;
        return message;
    });
}

async function get_awardees_list(forceReload = false) {
    if (!AWARDS_PAGE_CONFIG.award_tag) {
        awards_rows_cache = [];
        awards_loaded = true;
        reset_awards_editor_state_from_rows([]);
        return;
    }

    if (awards_loaded && !forceReload) {
        return;
    }

    try {
        const payload = await fetch_awards_json(
            build_awards_request_url(AWARDS_PAGE_CONFIG.api_list_url, { tag: AWARDS_PAGE_CONFIG.award_tag })
        );
        const rows = extract_awards_rows(payload);
        awards_loaded = true;
        reset_awards_editor_state_from_rows(rows);
    } catch (error) {
        console.error(error);
        alert(awards_t("awards.alert.load_failed"));
        awards_rows_cache = [];
        awards_loaded = false;
        reset_awards_editor_state_from_rows([]);
    }
}

function render_awards_skeleton() {
    const target = document.getElementById("statkiss-awards-content-root");
    if (!target) {
        return;
    }

    if (is_awards_edit_mode()) {
        target.innerHTML = `
            <div class="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] animate-pulse">
                <div class="space-y-5">
                    <div class="h-40 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
                    <div class="h-72 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
                </div>
                <div class="h-96 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
            </div>
        `;
        return;
    }

    target.innerHTML = `
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 animate-pulse">
            <div class="h-64 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
            <div class="h-64 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
            <div class="h-64 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
            <div class="h-64 rounded-3xl ${escape_html(awards_text_class("bg-slate-200", "bg-slate-800"))}"></div>
        </div>
    `;
}

function render_awards_page_shell() {
    const content = get_award_page_content();
    const target = document.getElementById("div_main");

    if (!target) {
        return;
    }

    target.innerHTML = `
        <div class="statkiss-awards-page mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-lg text-center">
                <h2 class="mb-2 text-4xl font-extrabold tracking-tight ${escape_html(awards_text_class("text-slate-900", "text-white"))}">${escape_html(content.title)}</h2>
                <p class="mb-8 lg:text-lg ${escape_html(awards_text_class("text-slate-500", "text-slate-100"))}">${escape_html(content.description)}</p>
            </div>
            <div id="statkiss-awards-content-root"></div>
        </div>
    `;

    render_awards_skeleton();
}

function render_awards_loaded_view() {
    if (is_awards_edit_mode()) {
        render_awards_editor_panel();
    } else {
        render_awards_public_list();
    }
    bind_awards_floating_buttons();
    render_awards_floating_buttons();
}

async function set_main(options = {}) {
    ensure_awards_lang_applied();
    inject_awards_theme_css();
    ensure_awards_lang_watcher();
    ensure_awards_dark_mode_watcher();
    ensure_awards_keyboard_shortcuts();
    ensure_awards_navigation_guard();

    render_awards_page_shell();

    if (!awards_loaded || !options.reuseData) {
        await get_awardees_list(!awards_loaded ? true : Boolean(options.forceReload));
    }

    render_awards_loaded_view();
}
