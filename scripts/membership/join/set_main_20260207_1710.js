function set_main() {
    const Div_main = () => {
        const class_card =
            "flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-300 shadow w-full h-full hover:bg-blue-100";

        const class_btn_register =
            "bg-yellow-400 font-extrabold rounded-lg text-sm px-6 h-11 shadow " +
            "hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300";

        // 검은색 Checkout 버튼 스타일 (기존 화면의 Checkout 버튼과 유사하게 디자인)
        const class_btn_checkout = 
            "w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-lg shadow hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2";

        // UI components
        const Div_sub_donation_header = (props) => (
            <h3 class="font-semibold text-gray-500">{props.text}</h3>
        );

        return (
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 space-y-4">
                <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Join</h2>
                </div>

                <Div_sub_donation_header text={"You can join to KISS membership through Paypal or via check."} />

                <div class="grid grid-cols-2 w-full text-gray-900 px-4 gap-4 md:grid-cols-1">
                    {/* =========================================================
                        Membership (HTML Form 방식 - 노란 버튼 제거됨)
                       ========================================================= */}
                    <div class={class_card}>
                        <h3 class="mb-4 text-2xl font-semibold">Membership</h3>

                        <div class="w-full max-w-md mx-auto text-left space-y-4">
                            {/* 안내 문구 추가 */}
                            <div class="text-center text-sm text-gray-600 mb-4">
                                Click below to pay via Credit/Debit Card or PayPal
                            </div>

                            {/* PDF 문서 [Step-3] HTML Form 방식 적용 [cite: 60-66]
                                - JS 오류가 발생하지 않음
                                - 노란색 버튼 없이 우리가 만든 버튼 사용 가능
                            */}
                            <form 
                                action="https://www.paypal.com/ncp/payment/G23G7R3AU8QKC" 
                                method="post" 
                                target="_blank"
                                class="w-full"
                            >
                                <button type="submit" class={class_btn_checkout}>
                                    {/* 카드 아이콘 (선택 사항) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    Checkout
                                </button>
                                
                                {/* 페이팔 보안 로고 (PDF 권장사항) - 작게 표시 */}
                                <div class="text-center mt-3">
                                    <img 
                                        src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" 
                                        alt="Powered by PayPal" 
                                        style={{ height: "0.875rem", display: "inline-block", opacity: 0.6 }} 
                                    />
                                </div>
                            </form>
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
                                    if(typeof click_btn_register_student === 'function') {
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

    if (typeof gv_username !== "undefined" && gv_username == "") {
        location.href = "/account/";
    } else {
        const rootElement = document.getElementById("div_main");
        if (rootElement) {
            ReactDOM.render(<Div_main />, rootElement);
        }
    }
}