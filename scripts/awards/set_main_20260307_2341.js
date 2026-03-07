let toggle_btn_submit = false;
let data_awardee = {};

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
    const years = Array.from(new Set(Object.values(rows).map((item) => item.year)));

    for (let i = 0; i < years.length; i += 1) {
        grouped[years[i]] = Object.values(rows).filter((item) => item.year == years[i]);
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
            Submit
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
            Submit
        </button>
    );
}

function Div_add_awardees() {
    return (
        <div>
            <div className="flex flex-col w-full justify-end items-center space-x-4 mb-4 px-8 py-4 border border-blue-300 shadow space-y-4 rounded-lg md:px-2">
                <div className="flex-row justify-start items-start w-full">
                    <p className="font-bold">Add Awardee</p>
                </div>

                <div className="flex flex-col w-full space-y-4">
                    <div className="grid grid-cols-2 w-full gap-8 md:grid-cols-1 md:gap-4">
                        <div className="flex flex-row justify-center items-center space-x-4 w-full">
                            <p>Donate Year</p>
                            <input
                                type="number"
                                id="txt_year"
                                placeholder="YYYY"
                                className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:grid-cols-1">
                        <div className="flex flex-row justify-center items-center space-x-4 w-full">
                            <p>Name</p>
                            <input
                                type="text"
                                placeholder="Awardee Name"
                                id="txt_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>

                        <div className="flex flex-row justify-center items-center space-x-4 w-full">
                            <p>Affiliation</p>
                            <input
                                type="text"
                                placeholder="Affiliation"
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
            alert("Please enter the year.");
            return;
        }

        if (!txt_name) {
            alert("Please enter a awardee's name.");
            return;
        }

        if (!txt_affiliation) {
            alert("Please enter a awardee's affiliation.");
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
        alert("Failed to add the awardee.");
    } finally {
        render_submit_button(false);
        toggle_btn_submit = false;
    }
}

async function click_btn_delete(uuid) {
    if (!confirm("Are you sure you want to delete it?")) {
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
        alert("Failed to delete the awardee.");
    }
}

async function get_awardees_list() {
    function Div_person(props) {
        return (
            <li className="flex flex-row items-center">
                <img className="w-3.5 h-3.5 mr-2" src={props.award_url_icon} />
                <div className="flex flex-col">
                    <p className="text-md">{props.name}</p>
                    <p className="text-xs">{props.affiliation}</p>
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
        const awardeesList = Object.keys(props.data).map((key) => (
            <Div_person
                key={props.data[key].uuid}
                uuid={props.data[key].uuid}
                name={props.data[key].name}
                affiliation={props.data[key].affiliation}
                award_url_icon={props.data[key].award_url_icon}
            />
        ));

        return (
            <div className="w-full p-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                <h3 className="text-lg font-semibold text-gray-900">{props.year} Awardees</h3>

                <ul className="max-w-md space-y-2 text-gray-500 list-inside">
                    {awardeesList}
                </ul>
            </div>
        );
    }

    function Div_awardees_list(props) {
        const subList = Object.keys(props.data)
            .sort((a, b) => b - a)
            .map((yearKey) => <Div_sub key={yearKey} year={yearKey} data={props.data[yearKey]} />);

        return <ol className="grid grid-cols-4 border-l border-gray-200">{subList}</ol>;
    }

    try {
        data_awardee = await fetch_json(`/awards/ajax_get_awardees_list/?tag=${url}`);
        const data_res = group_awardees_by_year(data_awardee);

        ReactDOM.render(<Div_awardees_list data={data_res} />, document.getElementById("div_awardees_list"));
        await get_div_add_awardee();
    } catch (error) {
        console.error(error);
        alert("Failed to load awardees list.");
        ReactDOM.render(<ol className="grid grid-cols-4 border-l border-gray-200"></ol>, document.getElementById("div_awardees_list"));
    }
}

async function get_div_add_awardee() {
    try {
        const data = await fetch_json("/ajax_get_menu_header/");
        const hasUser = typeof gv_username !== "undefined" && gv_username !== "";
        const canManage = data.role === "Administrator" || data.role === "Developer" || data.officer !== "Member";

        if (hasUser && canManage) {
            ReactDOM.render(<Div_add_awardees />, document.getElementById("div_add_awardees"));

            for (let i = 0; i < Object.keys(data_awardee).length; i += 1) {
                const uuid = data_awardee[Object.keys(data_awardee)[i]].uuid;
                const deleteBtn = document.getElementById(`btn_delete_${uuid}`);

                if (deleteBtn) {
                    deleteBtn.className = "flex flex-row justify-end items-end";
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

function set_main() {
    let title = null;
    let description = null;

    if (url == "career") {
        title = "KISS Career Development Award";
        description = "The KISS Career Development Awards are to recognize statisticians who are in the early stages of their careers and who have demonstrated outstanding productivity and the potential to make significant contributions to the field of statistics. The Awards are given in the KISS Career Development Workshop at JSM meeting every year.";
    } else if (url == "student") {
        title = "KISS Outstanding Student Paper Award";
        description = "The KISS Outstanding Student Paper Awards are to support students for traveling to JSM to present their papers. The Awards are given in the KISS Annual Meeting at JSM every other year.";
    }

    function Div_skeleton_list() {
        return (
            <div className="max-w-xs">
                <ul className="flex flex-col w-full h-[50px] justify-center items-center mb-2 space-y-4">
                    <li className="flex items-center">
                        <div className="flex flex-col"><div className="h-2.5 bg-gray-300 rounded-full w-48"></div></div>
                    </li>
                    <li className="flex items-center">
                        <div className="flex flex-col"><div className="h-2.5 bg-gray-300 rounded-full w-48"></div></div>
                    </li>
                    <li className="flex items-center">
                        <div className="flex flex-col"><div className="h-2.5 bg-gray-300 rounded-full w-48"></div></div>
                    </li>
                </ul>
            </div>
        );
    }

    function Div_main(props) {
        return (
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-lg text-center">
                    <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900">{props.title}</h2>
                    <p className="mb-8 text-gray-500 lg:text-lg">{props.description}</p>
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

    ReactDOM.render(<Div_main title={title} description={description} />, document.getElementById("div_main"));
    get_awardees_list();
}
