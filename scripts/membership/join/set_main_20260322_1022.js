function set_main() {
    const MembershipI18N = window.StatKISS_MembershipI18N || null;
    const FALLBACK_MENU_EN = {
    "page.join": "Join",
    "page.subtitle": "You can join KISS membership through PayPal or via check.",
    "form.membership_type": "Membership type",
    "form.note_student": "Student Member is free. Click below to register.",
    "form.note_paid": "You will complete the payment on the PayPal checkout page.",
    "form.button_register": "Register",
    "form.button_checkout": "Checkout",
    "form.powered_by_paypal": "Powered by PayPal",
    "alert.student_handler_missing": "Student registration handler is not configured.",
    "alert.paypal_id_missing": "PayPal ID is missing.",
    "membership.free": "Free",
    "membership.regular.title": "Regular Member Annual",
    "membership.regular.description": "Annual membership for KISS.",
    "membership.regular.price_suffix": "/year",
    "membership.lifetime.title": "Lifetime Member",
    "membership.lifetime.description": "One-time lifetime membership.",
    "membership.lifetime.price_suffix": "",
    "membership.spouse.title": "Spouse Member Annual",
    "membership.spouse.description": "Annual spouse membership.",
    "membership.spouse.price_suffix": "/year",
    "membership.joint.title": "KSS Joint Member Annual",
    "membership.joint.description": "Annual joint membership with KSS.",
    "membership.joint.price_suffix": "/year",
    "membership.student.title": "Student Member",
    "membership.student.description": "Free membership registration (no payment).",
    "membership.student.price_suffix": ""
};

    function t(lang, key) {
        if (MembershipI18N && typeof MembershipI18N.t === "function") {
            return MembershipI18N.t(lang, key);
        }

        if (FALLBACK_MENU_EN[key] != null && FALLBACK_MENU_EN[key] !== "") {
            return FALLBACK_MENU_EN[key];
        }

        return key;
    }

    function isRTL(lang) {
        if (MembershipI18N && typeof MembershipI18N.isRTL === "function") {
            return MembershipI18N.isRTL(lang);
        }

        return String(lang || "").toLowerCase() === "ar";
    }

    function getInitialLang() {
        if (MembershipI18N && typeof MembershipI18N.init === "function") {
            return MembershipI18N.init();
        }

        const docLang = document.documentElement.getAttribute("lang");
        const browser = navigator.language || "en";
        return docLang || browser || "en";
    }

    function subscribeLang(callback) {
        if (MembershipI18N && typeof MembershipI18N.subscribe === "function") {
            return MembershipI18N.subscribe(callback);
        }

        return function unsubscribeNoop() {};
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function getMemberships(lang) {
        return [
            {
                key: "regular",
                title: t(lang, "membership.regular.title"),
                price_label: "$30",
                price_suffix: t(lang, "membership.regular.price_suffix"),
                description: t(lang, "membership.regular.description"),
                ncp_link_id: "KPGQBVGSXDRZN",
                is_free: false,
            },
            {
                key: "lifetime",
                title: t(lang, "membership.lifetime.title"),
                price_label: "$500",
                price_suffix: t(lang, "membership.lifetime.price_suffix"),
                description: t(lang, "membership.lifetime.description"),
                ncp_link_id: "FKR34ARDG8VHC",
                is_free: false,
            },
            {
                key: "spouse",
                title: t(lang, "membership.spouse.title"),
                price_label: "$10",
                price_suffix: t(lang, "membership.spouse.price_suffix"),
                description: t(lang, "membership.spouse.description"),
                ncp_link_id: "QVTLS9Q4U6YKL",
                is_free: false,
            },
            {
                key: "joint",
                title: t(lang, "membership.joint.title"),
                price_label: "$10",
                price_suffix: t(lang, "membership.joint.price_suffix"),
                description: t(lang, "membership.joint.description"),
                ncp_link_id: "YWUXLGWN6C6DS",
                is_free: false,
            },
            {
                key: "student",
                title: t(lang, "membership.student.title"),
                price_label: t(lang, "membership.free"),
                price_suffix: t(lang, "membership.student.price_suffix"),
                description: t(lang, "membership.student.description"),
                ncp_link_id: null,
                is_free: true,
            },
        ];
    }

    function getSelectedMembership(memberships, selectedKey) {
        return memberships.find((item) => item.key === selectedKey) || memberships[0];
    }

    function render(target, state) {
        const lang = state.lang;
        const memberships = getMemberships(lang);
        const selected = getSelectedMembership(memberships, state.selectedKey);
        const rtl = isRTL(lang);
        const alignClass = rtl ? "text-right" : "text-left";
        const buttonClass = selected.is_free
            ? "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-base font-bold text-slate-950 transition-colors duration-200 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-200 dark:bg-amber-300 dark:text-slate-950 dark:hover:bg-amber-200 dark:focus:ring-amber-950"
            : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 dark:focus:ring-cyan-950";
        const buttonLabel = selected.is_free
            ? t(lang, "form.button_register")
            : t(lang, "form.button_checkout");
        const noteText = selected.is_free
            ? t(lang, "form.note_student")
            : t(lang, "form.note_paid");
        const optionsHtml = memberships.map((item) => {
            const label = item.is_free
                ? `${item.title} - ${t(lang, "membership.free")}`
                : `${item.title} - ${item.price_label}${item.price_suffix ? ` ${item.price_suffix}` : ""}`;

            return `<option value="${escapeHtml(item.key)}"${item.key === selected.key ? " selected" : ""}>${escapeHtml(label)}</option>`;
        }).join("");

        target.innerHTML = `
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-slate-900 dark:text-slate-100" dir="${rtl ? "rtl" : "ltr"}">
                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="mb-2 text-center text-4xl font-extrabold tracking-tight text-slate-900 transition-colors duration-200 dark:text-slate-50">${escapeHtml(t(lang, "page.join"))}</h2>
                    <p class="mb-8 text-center text-slate-600 transition-colors duration-200 dark:text-slate-400">${escapeHtml(t(lang, "page.subtitle"))}</p>
                </div>

                <div class="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-2xl shadow-slate-200/50 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40">
                    <div class="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
                        <h3 class="text-2xl font-extrabold text-slate-900 transition-colors duration-200 dark:text-slate-50">${escapeHtml(selected.title)}</h3>

                        <div class="my-6 flex items-baseline justify-center gap-2">
                            <span class="text-6xl font-extrabold text-sky-800 transition-colors duration-200 dark:text-cyan-300">${escapeHtml(selected.price_label)}</span>
                            ${selected.price_suffix ? `<span class="text-xl text-slate-500 transition-colors duration-200 dark:text-slate-400">${escapeHtml(selected.price_suffix)}</span>` : ""}
                        </div>

                        <p class="text-slate-600 transition-colors duration-200 dark:text-slate-300">${escapeHtml(selected.description)}</p>
                    </div>

                    <div class="mt-8">
                        <label for="membership_type" class="mb-2 block text-sm font-semibold text-slate-700 transition-colors duration-200 dark:text-slate-200 ${alignClass}">
                            ${escapeHtml(t(lang, "form.membership_type"))}
                        </label>

                        <select
                            id="membership_type"
                            class="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition-colors duration-200 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
                        >
                            ${optionsHtml}
                        </select>

                        <p class="mt-3 text-sm text-slate-500 transition-colors duration-200 dark:text-slate-400 ${alignClass}">
                            ${escapeHtml(noteText)}
                        </p>

                        <button type="button" id="membership_checkout_btn" class="${buttonClass}">
                            ${escapeHtml(buttonLabel)}
                        </button>

                        <div class="mt-4 text-center text-xs text-slate-400 transition-colors duration-200 dark:text-slate-500">
                            ${escapeHtml(t(lang, "form.powered_by_paypal"))}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const select = target.querySelector("#membership_type");
        const button = target.querySelector("#membership_checkout_btn");

        if (select) {
            select.addEventListener("change", (event) => {
                state.selectedKey = event.target.value;
                render(target, state);
            });
        }

        if (button) {
            button.addEventListener("click", () => {
                const currentMemberships = getMemberships(state.lang);
                const currentSelected = getSelectedMembership(currentMemberships, state.selectedKey);

                if (currentSelected.is_free) {
                    if (typeof click_btn_register_student === "function") {
                        click_btn_register_student();
                    } else {
                        alert(t(state.lang, "alert.student_handler_missing"));
                    }
                    return;
                }

                if (!currentSelected.ncp_link_id) {
                    alert(t(state.lang, "alert.paypal_id_missing"));
                    return;
                }

                window.location.href = `https://www.paypal.com/ncp/payment/${currentSelected.ncp_link_id}`;
            });
        }
    }

    if (typeof gv_username === "undefined" || gv_username == null || gv_username === "") {
        window.location.href = "/account/";
        return;
    }

    const target = document.getElementById("div_main");
    if (!target) {
        return;
    }

    if (typeof target.__statkissMembershipCleanup === "function") {
        target.__statkissMembershipCleanup();
    }

    const state = {
        lang: getInitialLang(),
        selectedKey: "regular",
    };

    render(target, state);

    target.__statkissMembershipCleanup = subscribeLang((nextLang) => {
        if (!nextLang || nextLang === state.lang) {
            return;
        }

        state.lang = nextLang;
        render(target, state);
    });
}
