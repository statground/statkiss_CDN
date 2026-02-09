function set_main() {
    const Div_main = () => {

        // ✅ PayPal에서 새로 받은 것은 "NCP payment link" 타입
        // - 그래서 webscr(cmd=_s-xclick) POST 방식이 아니라
        // - https://paypal.com/ncp/links/<ID> 로 이동해야 정상 동작함
        const MEMBERSHIPS = [
            {
                key: "regular",
                title: "Regular Member Annual",
                price_label: "$30",
                price_suffix: "/year",
                description: "Annual membership for KISS.",
                // NCP 링크 ID
                ncp_link_id: "KPGQBVGSXDRZN",
            },
            {
                key: "lifetime",
                title: "Lifetime Member",
                price_label: "$500",
                price_suffix: "",
                description: "One-time lifetime membership.",
                // (네가 적어준 값이 EKR... 로 보였는데, PDF 링크상 FKR... 입니다)
                // 👉 혹시 실제 발급받은 ID가 EKR로 시작하면 그걸로 바꿔줘.
                ncp_link_id: "FKR34ARDG8VHC",
            },
            {
                key: "spouse",
                title: "Spouse Member Annual",
                price_label: "$10",
                price_suffix: "/year",
                description: "Annual spouse membership.",
                ncp_link_id: "QVTLS9Q4U6YKL",
            },
            {
                key: "joint",
                title: "KSS Joint Member Annual",
                price_label: "$10",
                price_suffix: "/year",
                description: "Annual joint membership with KSS.",
                ncp_link_id: "YWUXLGWN6C6DS",
            },
            {
                key: "student",
                title: "Student Member",
                price_label: "Free",
                price_suffix: "",
                description: "Free membership registration (no payment).",
                ncp_link_id: null,
            },
        ];

        const [selectedKey, setSelectedKey] = React.useState("regular");

        const selected = MEMBERSHIPS.find(m => m.key === selectedKey) || MEMBERSHIPS[0];

        const onChangeSelect = (e) => {
            setSelectedKey(e.target.value);
        };

        // ✅ 결제(유료 멤버십): 선택된 NCP 링크로 이동
        // ✅ Student(무료): 등록 핸들러 호출
        const onClickCheckout = () => {
        if (selected.key === "student") {
            if (typeof click_btn_register_student === "function") {
            click_btn_register_student();
            } else {
            alert("Student registration handler is not configured.");
            }
            return;
        }

        if (!selected.ncp_link_id) {
            alert("PayPal ID is missing.");
            return;
        }

        // ✅ 핵심 수정: links → payment
        const url = `https://www.paypal.com/ncp/payment/${selected.ncp_link_id}`;

        // 같은 탭 이동
        window.location.href = url;

        // 또는 새 탭으로 열고 싶으면:
        // window.open(url, "_blank", "noopener,noreferrer");
        };


        // Tailwind 기반 최소 스타일(이전 드랍다운 카드형 UI와 유사하게)
        const class_outer = "py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6";
        const class_header = "mx-auto max-w-screen-md text-center mb-8 lg:mb-12";
        const class_card = "mx-auto max-w-xl bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8";
        const class_title = "mb-2 text-4xl tracking-tight font-extrabold text-gray-900 text-center";
        const class_desc = "text-gray-600 text-center mb-8";
        const class_price_wrap = "flex justify-center items-baseline my-6";
        const class_price = "mr-2 text-6xl font-extrabold text-blue-900";
        const class_price_suffix = "text-xl text-gray-500";
        const class_label = "block mb-2 text-sm font-semibold text-gray-700";
        const class_select = "bg-white border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3";
        const class_note = "mt-3 text-sm text-gray-500";
        const class_btn = "mt-6 w-full inline-flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 font-bold rounded-lg text-base px-5 py-3";
        const class_btn_free = "mt-6 w-full inline-flex items-center justify-center gap-2 text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-200 font-bold rounded-lg text-base px-5 py-3";

        return (
            <div class={class_outer}>
                <div class={class_header}>
                    <h2 class={class_title}>Join</h2>
                    <p class={class_desc}>You can join to KISS membership through PayPal or via check.</p>
                </div>

                <div class={class_card}>
                    <div class="text-center">
                        <h3 class="text-2xl font-extrabold text-gray-900">{selected.title}</h3>

                        <div class={class_price_wrap}>
                            <span class={class_price}>{selected.price_label}</span>
                            {selected.price_suffix ? <span class={class_price_suffix}>{selected.price_suffix}</span> : ""}
                        </div>

                        <p class="text-gray-600">{selected.description}</p>
                    </div>

                    <div class="mt-8">
                        <label class={class_label}>Membership type</label>
                        <select class={class_select} value={selectedKey} onChange={onChangeSelect}>
                            {MEMBERSHIPS.map(m => (
                                <option value={m.key}>
                                    {m.title} {m.price_label !== "Free" ? `- ${m.price_label} USD` : "- Free"}
                                </option>
                            ))}
                        </select>

                        <p class={class_note}>
                            {selected.key === "student"
                                ? "Student Member is free. Click below to register."
                                : "You will complete the payment on the PayPal checkout page."}
                        </p>

                        {selected.key === "student" ? (
                            <button type="button" class={class_btn_free} onClick={onClickCheckout}>
                                Register
                            </button>
                        ) : (
                            <button type="button" class={class_btn} onClick={onClickCheckout}>
                                Checkout
                            </button>
                        )}

                        <div class="mt-3 text-center text-xs text-gray-400">
                            Powered by PayPal
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 로그인을 하지 않은 상태에서는 /account/로 넘어간다.
    if (gv_username == "") {
        location.href = "/account/";
    } else {
        ReactDOM.render(<Div_main />, document.getElementById("div_main"));
    }
}
