let toggle_btn_submit = false;
let data_awardee = {};
let awardees_loaded = false;
let awards_lang_watcher_started = false;
let last_awards_lang = null;

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

function ensure_awards_lang_applied() {
    const i18n = get_awards_i18n();

    if (i18n && typeof i18n.applyLangToDocument === "function") {
        i18n.applyLangToDocument(get_awards_lang());
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

async function fetch_json(urlValue, options = {}) {
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
        throw new Error(message);
    }

    return payload;
}

function group_awardees_by_year(rows) {
    const grouped = {};
    const values = Object.values(rows || {});
    const years = Array.from(new Set(values.map((item) => item.year)));

    for (let i = 0; i < years.length; i += 1) {
        grouped[years[i]] = values.filter((item) => item.year == years[i]);
    }

    return grouped;
}

function Div_btn_submit() {
    return (
        <button
            type="button"
            onClick={() => click_btn_submit()}
            className="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
            {awards_t("awards.action.submit")}
        </button>
    );
}

function Div_btn_submit_loading() {
    return (
        <button
            type="button"
            className="py-1.5 px-5 text-white bg-blue-700 font-medium rounded-lg text-sm w-full md:w-auto text-center cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            {awards_t("awards.action.submitting")}
        </button>
    );
}

function render_submit_button(isLoading = false) {
    const target = document.getElementById("div_btn_submit");

    if (!target) {
        return;
    }

    if (isLoading) {
        ReactDOM.render(<Div_btn_submit_loading />, target);
        return;
    }

    ReactDOM.render(<Div_btn_submit />, target);
}

function Div_add_awardees() {
    return (
        <div>
            <div className="flex flex-col w-full justify-end items-center space-x-4 mb-4 px-8 py-4 border border-blue-300 shadow space-y-4 rounded-lg md:px-2">
                <div className="flex-row justify-start items-start w-full">
                    <p className="font-bold">{awards_t("awards.manage.add_awardee")}</p>
                </div>

                <div className="flex flex-col w-full space-y-4">
                    <div className="grid grid-cols-2 w-full gap-8 md:grid-cols-1 md:gap-4">
                        <div className="flex flex-row justify-center items-center space-x-4 w-full">
                            <p>{awards_t("awards.form.year")}</p>
                            <input
                                type="number"
                                id="txt_year"
                                placeholder={awards_t("awards.form.year_placeholder")}
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:grid-cols-1">
                        <div className="flex flex-row justify-center items-center space-x-4 w-full">
                            <p>{awards_t("awards.form.name")}</p>
                            <input
                                type="text"
                                placeholder={awards_t("awards.form.name_placeholder")}
                                id="txt_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div className="flex flex-row justify-center items-center space-x-4 w-full">
                            <p>{awards_t("awards.form.affiliation")}</p>
                            <input
                                type="text"
                                placeholder={awards_t("awards.form.affiliation_placeholder")}
                                id="txt_affiliation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-end items-center w-full">
                    <div className="flex flex-row justify-end items-center" id="div_btn_submit">
                        <Div_btn_submit />
                    </div>
                </div>
            </div>
        </div>
    );
}

async function click_btn_submit() {
    if (toggle_btn_submit) {
        return;
    }

    toggle_btn_submit = true;
    render_submit_button(true);

    try {
        const txt_year = (document.getElementById("txt_year")?.value || "").trim();
        const txt_name = (document.getElementById("txt_name")?.value || "").trim();
        const txt_affiliation = (document.getElementById("txt_affiliation")?.value || "").trim();

        if (!txt_year) {
            alert(awards_t("awards.alert.enter_year"));
            return;
        }

        if (!txt_name) {
            alert(awards_t("awards.alert.enter_name"));
            return;
        }

        if (!txt_affiliation) {
            alert(awards_t("awards.alert.enter_affiliation"));
            return;
        }

        const inputData = new FormData();
        inputData.append("txt_year", txt_year);
        inputData.append("txt_name", txt_name);
        inputData.append("txt_affiliation", txt_affiliation);
        inputData.append("url", url);

        await fetch_json("/awards/ajax_add_awardee/", {
            method: "post",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            body: inputData,
        });

        window.location.href = `/awards/${url}/`;
    } catch (error) {
        console.error(error);
        alert(awards_t("awards.alert.add_failed"));
    } finally {
        render_submit_button(false);
        toggle_btn_submit = false;
    }
}

async function click_btn_delete(uuid) {
    if (!confirm(awards_t("awards.alert.delete_confirm"))) {
        return;
    }

    try {
        const inputData = new FormData();
        inputData.append("uuid", uuid);

        await fetch_json("/awards/ajax_delete_awardee/", {
            method: "post",
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            body: inputData,
        });

        window.location.href = `/awards/${url}/`;
    } catch (error) {
        console.error(error);
        alert(awards_t("awards.alert.delete_failed"));
    }
}

function render_awardees_list(groupedData = {}) {
    function Div_person(props) {
        return (
            <li className="flex flex-row items-center">
                <img className="w-3.5 h-3.5 mr-2" src={props.award_url_icon} />
                <div className="flex flex-col">
                    <p className="text-md text-gray-900 dark:text-white">{props.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">{props.affiliation}</p>
                </div>
                <div id={`btn_delete_${props.uuid}`} className="hidden" onClick={() => click_btn_delete(props.uuid)}>
                    <img
                        className="object-scale-down h-4 m-2 hover:bg-red-100 cursor-pointer"
                        src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/trash.svg"
                    />
                </div>
            </li>
        );
    }

    function Div_sub(props) {
        const awardeesList = props.items.map((item) => (
            <Div_person
                key={item.uuid}
                uuid={item.uuid}
                name={item.name}
                affiliation={item.affiliation}
                award_url_icon={item.award_url_icon}
            />
        ));

        return (
            <div className="w-full p-4">
                <div className="absolute w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-800"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {awards_t("awards.list.year_awardees", { year: props.year })}
                </h3>

                <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-300">
                    {awardeesList}
                </ul>
            </div>
        );
    }

    function Div_awardees_list(props) {
        const subList = Object.keys(props.data)
            .sort((a, b) => Number(b) - Number(a))
            .map((yearKey) => (
                <Div_sub key={yearKey} year={yearKey} items={props.data[yearKey]} />
            ));

        return <ol className="grid grid-cols-4 border-l border-gray-200 dark:border-gray-700">{subList}</ol>;
    }

    ReactDOM.render(
        <Div_awardees_list data={groupedData} />,
        document.getElementById("div_awardees_list")
    );
}

async function get_awardees_list(forceReload = false) {
    if (awardees_loaded && !forceReload) {
        render_awardees_list(group_awardees_by_year(data_awardee));
        await get_div_add_awardee();
        return;
    }

    try {
        data_awardee = await fetch_json(`/awards/ajax_get_awardees_list/?tag=${encodeURIComponent(url)}`);
        awardees_loaded = true;

        render_awardees_list(group_awardees_by_year(data_awardee));
        await get_div_add_awardee();
    } catch (error) {
        console.error(error);
        alert(awards_t("awards.alert.load_failed"));

        data_awardee = {};
        awardees_loaded = false;
        render_awardees_list({});
    }
}

async function get_div_add_awardee() {
    const target = document.getElementById("div_add_awardees");

    if (!target) {
        return;
    }

    try {
        const data = await fetch_json("/ajax_get_menu_header/");
        const hasUser = typeof gv_username !== "undefined" && gv_username !== "";
        const canManage = data.role === "Administrator" || data.role === "Developer" || data.officer !== "Member";

        if (hasUser && canManage) {
            ReactDOM.render(<Div_add_awardees />, target);

            Object.values(data_awardee).forEach((item) => {
                const deleteBtn = document.getElementById(`btn_delete_${item.uuid}`);

                if (deleteBtn) {
                    deleteBtn.className = "flex flex-row justify-end items-end";
                }
            });
            return;
        }

        ReactDOM.render(null, target);
    } catch (error) {
        console.error(error);
        ReactDOM.render(null, target);
    }
}

function get_award_page_content() {
    if (url === "career") {
        return {
            title: awards_t("awards.title.career"),
            description: awards_t("awards.desc.career"),
        };
    }

    if (url === "student") {
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

function set_main(options = {}) {
    ensure_awards_lang_applied();
    ensure_awards_lang_watcher();

    const content = get_award_page_content();

    function Div_skeleton_list() {
        return (
            <div className="max-w-xs">
                <ul className="flex flex-col w-full h-[50px] justify-center items-center mb-2 space-y-4">
                    <li className="flex items-center">
                        <div className="flex flex-col"><div className="h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full w-48"></div></div>
                    </li>
                    <li className="flex items-center">
                        <div className="flex flex-col"><div className="h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full w-48"></div></div>
                    </li>
                    <li className="flex items-center">
                        <div className="flex flex-col"><div className="h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full w-48"></div></div>
                    </li>
                </ul>
            </div>
        );
    }

    function Div_main(props) {
        return (
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-lg text-center">
                    <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{props.title}</h2>
                    <p className="mb-8 text-gray-500 lg:text-lg dark:text-gray-300">{props.description}</p>
                </div>

                <div className="w-full" id="div_add_awardees"></div>

                <div className="w-full" id="div_awardees_list">
                    <ol className="grid grid-cols-4 border-l border-gray-200 animate-pulse">
                        <Div_skeleton_list />
                        <Div_skeleton_list />
                        <Div_skeleton_list />
                        <Div_skeleton_list />
                    </ol>
                </div>
            </div>
        );
    }

    ReactDOM.render(
        <Div_main title={content.title} description={content.description} />,
        document.getElementById("div_main")
    );

    if (awardees_loaded) {
        render_awardees_list(group_awardees_by_year(data_awardee));
        get_div_add_awardee();
        return;
    }

    get_awardees_list(true);
}
