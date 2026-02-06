function set_main() {
    const Div_main = () => {
        const class_card =
            "flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-full h-full hover:bg-blue-100";

        // =========================================================
        // PayPal Hosted Button
        // =========================================================
        const PAYPAL_HOSTED_BUTTON_ID = "G23G7R3AU8QKC";
        const PAYPAL_CONTAINER_ID = `paypal-container-${PAYPAL_HOSTED_BUTTON_ID}`;

        // =========================================================
        // UI components
        // =========================================================
        const Div_sub_donation_header = (props) => (
            <h3 class="font-semibold text-gray-500">{props.text}</h3>
        );

        // ✅ Student 카드: 네모 Register 버튼
        const class_btn_register =
            "bg-yellow-400 font-extrabold rounded-lg text-sm px-6 h-11 shadow " +
            "hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300";

        // =========================================================
        // PayPal render (card inside)
        // =========================================================
        React.useEffect(() => {
            if (typeof paypal === "undefined" || !paypal.HostedButtons) return;

            const el = document.getElementById(PAYPAL_CONTAINER_ID);
            if (!el) return;

            // 중복 렌더 방지
            if (el.getAttribute("data-rendered") === "1") return;

            try {
                paypal.HostedButtons({
                    hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
                }).render(`#${PAYPAL_CONTAINER_ID}`);

                el.setAttribute("data-rendered", "1");
            } catch (e) {
                console.error(e);
            }
        }, []);

        return (
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 space-y-4">
                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Join</h2>
                </div>

                <Div_sub_donation_header text={"You can join to KISS membership through Paypal or via check."} />

                <div class="grid grid-cols-2 w-full text-gray-900 px-4 gap-4 md:grid-cols-1">
                    {/* =========================================================
                        Membership (PayPal widget)
                        - click_dropdown 영향 최소화: 버블링 차단만 수행
                        - ⚠️ window.open 후킹(about:blank killer) 제거:
                          PayPal이 팝업을 여는 흐름을 망가뜨려 popup blocked로 오인될 수 있음
                       ========================================================= */}
                    <div class={class_card}>
                        <h3 class="mb-4 text-2xl font-semibold">Membership</h3>

                        <div
                            class="w-full max-w-md mx-auto text-left"
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div
                                id={PAYPAL_CONTAINER_ID}
                                class="w-full"
                                style={{
                                    minWidth: "320px",
                                }}
                            ></div>
                        </div>

                        <div class="flex-1"></div>
                    </div>

                    {/* =========================================================
                        Student Member (separate)
                       ========================================================= */}
                    <div class={class_card}>
                        <h3 class="mb-4 text-2xl font-semibold">Student Member</h3>

                        <div class="flex-1 flex items-center justify-center my-10">
                            <div class="flex justify-center items-baseline">
                                <span class="text-5xl font-extrabold text-blue-900">Free</span>
                            </div>
                        </div>

                        <div class="flex w-full justify-center">
                            <button
                                class={class_btn_register}
                                onClick={() => click_btn_register_student()}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (gv_username == "") {
        location.href = "/account/";
    } else {
        ReactDOM.render(<Div_main />, document.getElementById("div_main"));
    }
}