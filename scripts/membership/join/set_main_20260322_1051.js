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
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function injectMembershipThemeFallback() {
        if (document.getElementById("statkiss-membership-theme-fallback")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "statkiss-membership-theme-fallback";
        style.textContent = `
            .sk-membership-root {
                color: #0f172a;
            }
            .sk-membership-hero-title {
                color: #0f172a;
                line-height: 1.15;
            }
            .sk-membership-hero-subtitle {
                color: #64748b;
                font-size: 1.0625rem;
                line-height: 1.75rem;
            }
            .sk-membership-card {
                border: 1px solid #e2e8f0;
                background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                box-shadow: 0 24px 72px rgba(15, 23, 42, 0.14);
            }
            .sk-membership-plan {
                border: 1px solid #e2e8f0;
                background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }
            .sk-membership-plan-title {
                color: #0f172a;
            }
            .sk-membership-price {
                color: #0b5d91;
                line-height: 1;
                letter-spacing: -0.05em;
            }
            .sk-membership-price-suffix {
                color: #64748b;
            }
            .sk-membership-description {
                color: #475569;
            }
            .sk-membership-label {
                color: #334155;
            }
            .sk-membership-select-wrap {
                position: relative;
            }
            .sk-membership-select {
                display: block;
                width: 100%;
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                color-scheme: light;
                border-radius: 1rem;
                border: 1px solid #cbd5e1;
                background: #ffffff;
                color: #0f172a;
                padding: 0.95rem 3.25rem 0.95rem 1rem;
                font-size: 1rem;
                line-height: 1.5rem;
                transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
            }
            .sk-membership-select:focus {
                outline: none;
                border-color: #0ea5e9;
                box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.14);
            }
            .sk-membership-select option {
                background: #ffffff;
                color: #0f172a;
            }
            .sk-membership-select-icon {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                pointer-events: none;
            }
            .sk-membership-root[dir="rtl"] .sk-membership-select {
                padding-right: 1rem;
                padding-left: 3.25rem;
            }
            .sk-membership-root[dir="rtl"] .sk-membership-select-icon {
                right: auto;
                left: 1rem;
            }
            .sk-membership-note {
                color: #64748b;
            }
            .sk-membership-button {
                margin-top: 1.5rem;
                display: inline-flex;
                width: 100%;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                border: 0;
                border-radius: 1rem;
                padding: 0.95rem 1.25rem;
                font-size: 1rem;
                font-weight: 800;
                cursor: pointer;
                transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
                box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
            }
            .sk-membership-button:hover {
                transform: translateY(-1px);
            }
            .sk-membership-button:focus {
                outline: none;
            }
            .sk-membership-button.is-paid {
                background: #0369a1;
                color: #ffffff;
            }
            .sk-membership-button.is-paid:hover {
                background: #075985;
            }
            .sk-membership-button.is-paid:focus {
                box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.18), 0 12px 24px rgba(15, 23, 42, 0.18);
            }
            .sk-membership-button.is-free {
                background: #fbbf24;
                color: #0f172a;
            }
            .sk-membership-button.is-free:hover {
                background: #f59e0b;
            }
            .sk-membership-button.is-free:focus {
                box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.18), 0 12px 24px rgba(15, 23, 42, 0.18);
            }
            .sk-membership-powered {
                color: #94a3b8;
            }

            html.dark .sk-membership-root,
            body.dark .sk-membership-root,
            html[data-theme="dark"] .sk-membership-root,
            body[data-theme="dark"] .sk-membership-root {
                color: #f8fafc !important;
            }
            html.dark .sk-membership-hero-title,
            body.dark .sk-membership-hero-title,
            html[data-theme="dark"] .sk-membership-hero-title,
            body[data-theme="dark"] .sk-membership-hero-title {
                color: #f8fafc !important;
                text-shadow: 0 6px 24px rgba(15, 23, 42, 0.35);
            }
            html.dark .sk-membership-hero-subtitle,
            body.dark .sk-membership-hero-subtitle,
            html[data-theme="dark"] .sk-membership-hero-subtitle,
            body[data-theme="dark"] .sk-membership-hero-subtitle {
                color: #cbd5e1 !important;
            }
            html.dark .sk-membership-card,
            body.dark .sk-membership-card,
            html[data-theme="dark"] .sk-membership-card,
            body[data-theme="dark"] .sk-membership-card {
                border-color: #334155 !important;
                background: linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(2, 6, 23, 0.98) 100%) !important;
                box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55) !important;
            }
            html.dark .sk-membership-plan,
            body.dark .sk-membership-plan,
            html[data-theme="dark"] .sk-membership-plan,
            body[data-theme="dark"] .sk-membership-plan {
                border-color: #334155 !important;
                background: linear-gradient(180deg, rgba(15, 23, 42, 0.92) 0%, rgba(17, 24, 39, 0.98) 100%) !important;
                box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.08) !important;
            }
            html.dark .sk-membership-plan-title,
            body.dark .sk-membership-plan-title,
            html[data-theme="dark"] .sk-membership-plan-title,
            body[data-theme="dark"] .sk-membership-plan-title {
                color: #f8fafc !important;
            }
            html.dark .sk-membership-price,
            body.dark .sk-membership-price,
            html[data-theme="dark"] .sk-membership-price,
            body[data-theme="dark"] .sk-membership-price {
                color: #67e8f9 !important;
            }
            html.dark .sk-membership-price-suffix,
            body.dark .sk-membership-price-suffix,
            html[data-theme="dark"] .sk-membership-price-suffix,
            body[data-theme="dark"] .sk-membership-price-suffix {
                color: #cbd5e1 !important;
            }
            html.dark .sk-membership-description,
            body.dark .sk-membership-description,
            html[data-theme="dark"] .sk-membership-description,
            body[data-theme="dark"] .sk-membership-description {
                color: #e2e8f0 !important;
            }
            html.dark .sk-membership-label,
            body.dark .sk-membership-label,
            html[data-theme="dark"] .sk-membership-label,
            body[data-theme="dark"] .sk-membership-label {
                color: #f1f5f9 !important;
            }
            html.dark .sk-membership-select,
            body.dark .sk-membership-select,
            html[data-theme="dark"] .sk-membership-select,
            body[data-theme="dark"] .sk-membership-select {
                color-scheme: dark;
                border-color: #475569 !important;
                background: #0f172a !important;
                color: #f8fafc !important;
                box-shadow: none !important;
            }
            html.dark .sk-membership-select:focus,
            body.dark .sk-membership-select:focus,
            html[data-theme="dark"] .sk-membership-select:focus,
            body[data-theme="dark"] .sk-membership-select:focus {
                border-color: #67e8f9 !important;
                box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.18) !important;
            }
            html.dark .sk-membership-select option,
            body.dark .sk-membership-select option,
            html[data-theme="dark"] .sk-membership-select option,
            body[data-theme="dark"] .sk-membership-select option {
                background: #0f172a !important;
                color: #f8fafc !important;
            }
            html.dark .sk-membership-select-icon,
            body.dark .sk-membership-select-icon,
            html[data-theme="dark"] .sk-membership-select-icon,
            body[data-theme="dark"] .sk-membership-select-icon {
                color: #cbd5e1 !important;
            }
            html.dark .sk-membership-note,
            body.dark .sk-membership-note,
            html[data-theme="dark"] .sk-membership-note,
            body[data-theme="dark"] .sk-membership-note {
                color: #cbd5e1 !important;
            }
            html.dark .sk-membership-button.is-paid,
            body.dark .sk-membership-button.is-paid,
            html[data-theme="dark"] .sk-membership-button.is-paid,
            body[data-theme="dark"] .sk-membership-button.is-paid {
                background: #22d3ee !important;
                color: #082f49 !important;
                box-shadow: 0 12px 28px rgba(6, 182, 212, 0.18) !important;
            }
            html.dark .sk-membership-button.is-paid:hover,
            body.dark .sk-membership-button.is-paid:hover,
            html[data-theme="dark"] .sk-membership-button.is-paid:hover,
            body[data-theme="dark"] .sk-membership-button.is-paid:hover {
                background: #67e8f9 !important;
            }
            html.dark .sk-membership-button.is-paid:focus,
            body.dark .sk-membership-button.is-paid:focus,
            html[data-theme="dark"] .sk-membership-button.is-paid:focus,
            body[data-theme="dark"] .sk-membership-button.is-paid:focus {
                box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.22), 0 12px 28px rgba(6, 182, 212, 0.2) !important;
            }
            html.dark .sk-membership-button.is-free,
            body.dark .sk-membership-button.is-free,
            html[data-theme="dark"] .sk-membership-button.is-free,
            body[data-theme="dark"] .sk-membership-button.is-free {
                background: #fbbf24 !important;
                color: #111827 !important;
                box-shadow: 0 12px 28px rgba(245, 158, 11, 0.18) !important;
            }
            html.dark .sk-membership-button.is-free:hover,
            body.dark .sk-membership-button.is-free:hover,
            html[data-theme="dark"] .sk-membership-button.is-free:hover,
            body[data-theme="dark"] .sk-membership-button.is-free:hover {
                background: #fcd34d !important;
            }
            html.dark .sk-membership-button.is-free:focus,
            body.dark .sk-membership-button.is-free:focus,
            html[data-theme="dark"] .sk-membership-button.is-free:focus,
            body[data-theme="dark"] .sk-membership-button.is-free:focus {
                box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.22), 0 12px 28px rgba(245, 158, 11, 0.18) !important;
            }
            html.dark .sk-membership-powered,
            body.dark .sk-membership-powered,
            html[data-theme="dark"] .sk-membership-powered,
            body[data-theme="dark"] .sk-membership-powered {
                color: #94a3b8 !important;
            }
        `;
        document.head.appendChild(style);
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
        const buttonTypeClass = selected.is_free ? "is-free" : "is-paid";
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
            <div class="sk-membership-root py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" dir="${rtl ? "rtl" : "ltr"}">
                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="sk-membership-hero-title mb-3 text-center text-4xl font-extrabold tracking-tight">${escapeHtml(t(lang, "page.join"))}</h2>
                    <p class="sk-membership-hero-subtitle mb-8 text-center">${escapeHtml(t(lang, "page.subtitle"))}</p>
                </div>

                <div class="sk-membership-card mx-auto max-w-2xl rounded-3xl p-6 md:p-8">
                    <div class="sk-membership-plan rounded-2xl p-6 text-center">
                        <h3 class="sk-membership-plan-title text-2xl font-extrabold">${escapeHtml(selected.title)}</h3>

                        <div class="my-6 flex items-baseline justify-center gap-2">
                            <span class="sk-membership-price text-6xl font-extrabold">${escapeHtml(selected.price_label)}</span>
                            ${selected.price_suffix ? `<span class="sk-membership-price-suffix text-xl">${escapeHtml(selected.price_suffix)}</span>` : ""}
                        </div>

                        <p class="sk-membership-description">${escapeHtml(selected.description)}</p>
                    </div>

                    <div class="mt-8">
                        <label for="membership_type" class="sk-membership-label mb-2 block text-sm font-semibold ${alignClass}">
                            ${escapeHtml(t(lang, "form.membership_type"))}
                        </label>

                        <div class="sk-membership-select-wrap">
                            <select id="membership_type" class="sk-membership-select">
                                ${optionsHtml}
                            </select>
                            <span class="sk-membership-select-icon" aria-hidden="true">
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </div>

                        <p class="sk-membership-note mt-3 text-sm ${alignClass}">
                            ${escapeHtml(noteText)}
                        </p>

                        <button type="button" id="membership_checkout_btn" class="sk-membership-button ${buttonTypeClass}">
                            ${escapeHtml(buttonLabel)}
                        </button>

                        <div class="sk-membership-powered mt-4 text-center text-xs">
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

    injectMembershipThemeFallback();

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
