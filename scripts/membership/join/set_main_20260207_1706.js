function set_main() {
    const Div_main = () => {
        // 기존 스타일 유지
        const class_card =
            "flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-full h-full hover:bg-blue-100";

        const class_btn_register =
            "bg-yellow-400 font-extrabold rounded-lg text-sm px-6 h-11 shadow " +
            "hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300";

        // =========================================================
        // PayPal Hosted Button Setup
        // =========================================================
        const PAYPAL_HOSTED_BUTTON_ID = "G23G7R3AU8QKC";
        const PAYPAL_CONTAINER_ID = "paypal-container-" + PAYPAL_HOSTED_BUTTON_ID;

        // UI components
        const Div_sub_donation_header = (props) => (
            <h3 class="font-semibold text-gray-500">{props.text}</h3>
        );

        // =========================================================
        // PayPal SDK wait helper
        // =========================================================
        const waitForPaypalSDK = async (timeoutMs = 8000, intervalMs = 100) => {
            const started = Date.now();
            while (Date.now() - started < timeoutMs) {
                try {
                    if (window.paypal && window.paypal.HostedButtons) return true;
                } catch (e) {
                    // 어떤 보안 스크립트(SES 등) 영향으로 window 접근이 깨지는 경우 대비
                }
                await new Promise((r) => setTimeout(r, intervalMs));
            }
            return false;
        };

        // =========================================================
        // PayPal Render Effect
        // =========================================================
        React.useEffect(() => {
            let cancelled = false;

            const render = async () => {
                const container = document.getElementById(PAYPAL_CONTAINER_ID);
                if (!container) return;

                // 이미 렌더링된 경우 중복 실행 방지
                if (container.innerHTML && container.innerHTML.trim() !== "") return;

                // 로딩 상태 표시 (사용자에게 빈 공간처럼 보이지 않게)
                container.innerHTML =
                    "<div class='text-sm text-gray-500 py-2'>Loading PayPal...</div>";

                // PayPal SDK 로딩 대기 (async/지연 로딩 대비)
                const ok = await waitForPaypalSDK(8000, 100);
                if (cancelled) return;

                if (!ok) {
                    console.warn("PayPal SDK is not loaded (timeout).");
                    container.innerHTML =
                        "<div class='text-sm text-red-600 py-2'>PayPal 로딩에 실패했습니다. 새로고침 후 다시 시도해주세요.</div>";
                    return;
                }

                // 다시 한 번: 렌더 대상 컨테이너가 존재하는지 확인
                const container2 = document.getElementById(PAYPAL_CONTAINER_ID);
                if (!container2) return;

                // 혹시 그 사이 다른 렌더가 들어갔으면 종료
                if (container2.innerHTML && container2.innerHTML.trim() !== "" &&
                    container2.innerHTML.indexOf("Loading PayPal") === -1 &&
                    container2.innerHTML.indexOf("PayPal 로딩에 실패") === -1
                ) {
                    return;
                }

                // 실제 렌더 시도
                try {
                    // PayPal Hosted Buttons 렌더
                    window.paypal.HostedButtons({
                        hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
                    }).render("#" + PAYPAL_CONTAINER_ID);
                } catch (e) {
                    console.error("PayPal Render Error:", e);
                    container2.innerHTML =
                        "<div class='text-sm text-red-600 py-2'>PayPal 결제 버튼을 표시할 수 없습니다. 잠시 후 다시 시도해주세요.</div>";
                }
            };

            render();

            return () => {
                cancelled = true;
            };
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
                       ========================================================= */}
                    <div class={class_card}>
                        <h3 class="mb-4 text-2xl font-semibold">Membership</h3>

                        <div
                            class="w-full max-w-md mx-auto text-left"
                            // 클릭 이벤트 버블링 방지
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            {/* 페이팔 버튼이 들어갈 컨테이너 */}
                            <div
                                id={PAYPAL_CONTAINER_ID}
                                class="w-full"
                                style={{
                                    minWidth: "200px",
                                    minHeight: "150px"
                                }}
                            ></div>
                        </div>

                        <div class="flex-1"></div>
                    </div>

                    {/* =========================================================
                        Student Member
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
                                onClick={() => {
                                    if (typeof click_btn_register_student === 'function') {
                                        click_btn_register_student();
                                    }
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 전역 변수 체크 강화
    if (typeof gv_username !== "undefined" && gv_username == "") {
        location.href = "/account/";
    } else {
        const rootElement = document.getElementById("div_main");
        if (rootElement) {
            ReactDOM.render(<Div_main />, rootElement);
        }
    }
}
