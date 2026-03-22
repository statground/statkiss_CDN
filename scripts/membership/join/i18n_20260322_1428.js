(function () {
    const DEFAULT_LANGUAGES = [{"code": "en", "label": "English"}, {"code": "ko", "label": "한국어"}, {"code": "ja", "label": "日本語"}, {"code": "zh-Hans", "label": "中文(简体)"}, {"code": "zh-Hant", "label": "中文(繁體)"}, {"code": "es", "label": "Español"}, {"code": "fr", "label": "Français"}, {"code": "de", "label": "Deutsch"}, {"code": "pt-BR", "label": "Português (Brasil)"}, {"code": "ru", "label": "Русский"}, {"code": "id", "label": "Bahasa Indonesia"}, {"code": "vi", "label": "Tiếng Việt"}, {"code": "th", "label": "ไทย"}, {"code": "ms", "label": "Bahasa Melayu"}, {"code": "fil", "label": "Filipino"}, {"code": "hi", "label": "हिन्दी"}, {"code": "ar", "label": "العربية"}, {"code": "it", "label": "Italiano"}, {"code": "nl", "label": "Nederlands"}, {"code": "pl", "label": "Polski"}, {"code": "sv", "label": "Svenska"}, {"code": "tr", "label": "Türkçe"}, {"code": "uk", "label": "Українська"}];
    const UI_KEYS = ["page.join", "page.subtitle", "form.membership_type", "form.note_student", "form.note_paid", "form.button_register", "form.button_checkout", "form.powered_by_paypal", "alert.student_handler_missing", "alert.paypal_id_missing", "membership.free", "membership.regular.title", "membership.regular.description", "membership.regular.price_suffix", "membership.lifetime.title", "membership.lifetime.description", "membership.lifetime.price_suffix", "membership.spouse.title", "membership.spouse.description", "membership.spouse.price_suffix", "membership.joint.title", "membership.joint.description", "membership.joint.price_suffix", "membership.student.title", "membership.student.description", "membership.student.price_suffix"];
    const dict = {"en": {"page.join": "Join", "page.subtitle": "You can join KISS membership through PayPal or via check.", "form.membership_type": "Membership type", "form.note_student": "Student Member is free. Click below to register.", "form.note_paid": "You will complete the payment on the PayPal checkout page.", "form.button_register": "Register", "form.button_checkout": "Checkout", "form.powered_by_paypal": "Powered by PayPal", "alert.student_handler_missing": "Student registration handler is not configured.", "alert.paypal_id_missing": "PayPal ID is missing.", "membership.free": "Free", "membership.regular.title": "Regular Member Annual", "membership.regular.description": "Annual membership for KISS.", "membership.regular.price_suffix": "/year", "membership.lifetime.title": "Lifetime Member", "membership.lifetime.description": "One-time lifetime membership.", "membership.lifetime.price_suffix": "lifetime", "membership.spouse.title": "Spouse Member Annual", "membership.spouse.description": "Annual spouse membership.", "membership.spouse.price_suffix": "/year", "membership.joint.title": "KSS Joint Member Annual", "membership.joint.description": "Annual joint membership with KSS.", "membership.joint.price_suffix": "/year", "membership.student.title": "Student Member", "membership.student.description": "Free membership registration (no payment).", "membership.student.price_suffix": "/year"}, "ko": {"page.join": "가입", "page.subtitle": "PayPal 또는 수표를 통해 KISS 멤버십에 가입할 수 있습니다.", "form.membership_type": "멤버십 유형", "form.note_student": "학생회원은 무료입니다. 아래 버튼을 눌러 등록하세요.", "form.note_paid": "PayPal 결제 페이지에서 결제를 완료하게 됩니다.", "form.button_register": "등록", "form.button_checkout": "결제하기", "form.powered_by_paypal": "PayPal 제공", "alert.student_handler_missing": "학생회원 등록 핸들러가 설정되어 있지 않습니다.", "alert.paypal_id_missing": "PayPal ID가 없습니다.", "membership.free": "무료", "membership.regular.title": "정회원(연간)", "membership.regular.description": "KISS 연간 정회원 멤버십입니다.", "membership.regular.price_suffix": "/년", "membership.lifetime.title": "평생회원", "membership.lifetime.description": "1회 결제로 평생 유지되는 멤버십입니다.", "membership.lifetime.price_suffix": "평생", "membership.spouse.title": "배우자회원(연간)", "membership.spouse.description": "배우자용 연간 멤버십입니다.", "membership.spouse.price_suffix": "/년", "membership.joint.title": "KSS 공동회원(연간)", "membership.joint.description": "KSS와 연계된 연간 공동 멤버십입니다.", "membership.joint.price_suffix": "/년", "membership.student.title": "학생회원", "membership.student.description": "무료 멤버십 등록입니다(결제 없음).", "membership.student.price_suffix": "/년"}, "ja": {"page.join": "入会", "page.subtitle": "PayPal または小切手で KISS 会員に入会できます。", "form.membership_type": "会員種別", "form.note_student": "学生会員は無料です。下のボタンから登録してください。", "form.note_paid": "PayPal の決済ページで支払いを完了します。", "form.button_register": "登録する", "form.button_checkout": "決済へ進む", "form.powered_by_paypal": "PayPal 提供", "alert.student_handler_missing": "学生会員登録ハンドラーが設定されていません。", "alert.paypal_id_missing": "PayPal ID がありません。", "membership.free": "無料", "membership.regular.title": "一般会員（年額）", "membership.regular.description": "KISS の年次会員プランです。", "membership.regular.price_suffix": "/年", "membership.lifetime.title": "終身会員", "membership.lifetime.description": "一度のお支払いで有効な終身会員です。", "membership.lifetime.price_suffix": "終身", "membership.spouse.title": "配偶者会員（年額）", "membership.spouse.description": "配偶者向けの年次会員プランです。", "membership.spouse.price_suffix": "/年", "membership.joint.title": "KSS 共同会員（年額）", "membership.joint.description": "KSS との共同年次会員プランです。", "membership.joint.price_suffix": "/年", "membership.student.title": "学生会員", "membership.student.description": "無料の会員登録です（支払い不要）。", "membership.student.price_suffix": "/年"}, "zh-Hans": {"page.join": "加入", "page.subtitle": "您可以通过 PayPal 或支票加入 KISS 会员。", "form.membership_type": "会员类型", "form.note_student": "学生会员免费。请点击下方按钮注册。", "form.note_paid": "您将在 PayPal 结账页面完成付款。", "form.button_register": "注册", "form.button_checkout": "去结账", "form.powered_by_paypal": "由 PayPal 提供支持", "alert.student_handler_missing": "学生会员注册处理程序尚未配置。", "alert.paypal_id_missing": "缺少 PayPal ID。", "membership.free": "免费", "membership.regular.title": "普通会员（年费）", "membership.regular.description": "KISS 普通年费会员。", "membership.regular.price_suffix": "/年", "membership.lifetime.title": "终身会员", "membership.lifetime.description": "一次性付款的终身会员。", "membership.lifetime.price_suffix": "终身", "membership.spouse.title": "配偶会员（年费）", "membership.spouse.description": "配偶年费会员。", "membership.spouse.price_suffix": "/年", "membership.joint.title": "KSS 联合会员（年费）", "membership.joint.description": "与 KSS 的联合年费会员。", "membership.joint.price_suffix": "/年", "membership.student.title": "学生会员", "membership.student.description": "免费会员注册（无需付款）。", "membership.student.price_suffix": "/年"}, "zh-Hant": {"page.join": "加入", "page.subtitle": "您可以透過 PayPal 或支票加入 KISS 會員。", "form.membership_type": "會員類型", "form.note_student": "學生會員免費。請點擊下方按鈕註冊。", "form.note_paid": "您將在 PayPal 結帳頁面完成付款。", "form.button_register": "註冊", "form.button_checkout": "前往結帳", "form.powered_by_paypal": "由 PayPal 提供支援", "alert.student_handler_missing": "學生會員註冊處理程式尚未設定。", "alert.paypal_id_missing": "缺少 PayPal ID。", "membership.free": "免費", "membership.regular.title": "普通會員（年費）", "membership.regular.description": "KISS 普通年費會員。", "membership.regular.price_suffix": "/年", "membership.lifetime.title": "終身會員", "membership.lifetime.description": "一次付費的終身會員。", "membership.lifetime.price_suffix": "終身", "membership.spouse.title": "配偶會員（年費）", "membership.spouse.description": "配偶年費會員。", "membership.spouse.price_suffix": "/年", "membership.joint.title": "KSS 聯合會員（年費）", "membership.joint.description": "與 KSS 的聯合年費會員。", "membership.joint.price_suffix": "/年", "membership.student.title": "學生會員", "membership.student.description": "免費會員註冊（無需付款）。", "membership.student.price_suffix": "/年"}, "es": {"page.join": "Unirse", "page.subtitle": "Puede unirse a la membresía de KISS mediante PayPal o cheque.", "form.membership_type": "Tipo de membresía", "form.note_student": "La membresía de estudiante es gratuita. Haga clic abajo para registrarse.", "form.note_paid": "Completará el pago en la página de pago de PayPal.", "form.button_register": "Registrarse", "form.button_checkout": "Pagar", "form.powered_by_paypal": "Procesado por PayPal", "alert.student_handler_missing": "El controlador de registro de estudiantes no está configurado.", "alert.paypal_id_missing": "Falta el ID de PayPal.", "membership.free": "Gratis", "membership.regular.title": "Miembro regular anual", "membership.regular.description": "Membresía anual de KISS.", "membership.regular.price_suffix": "/año", "membership.lifetime.title": "Miembro vitalicio", "membership.lifetime.description": "Membresía vitalicia con pago único.", "membership.lifetime.price_suffix": "de por vida", "membership.spouse.title": "Miembro cónyuge anual", "membership.spouse.description": "Membresía anual para cónyuges.", "membership.spouse.price_suffix": "/año", "membership.joint.title": "Miembro conjunto con KSS anual", "membership.joint.description": "Membresía anual conjunta con KSS.", "membership.joint.price_suffix": "/año", "membership.student.title": "Miembro estudiante", "membership.student.description": "Registro de membresía gratuito (sin pago).", "membership.student.price_suffix": "/año"}, "fr": {"page.join": "Adhérer", "page.subtitle": "Vous pouvez adhérer à KISS via PayPal ou par chèque.", "form.membership_type": "Type d'adhésion", "form.note_student": "L'adhésion étudiante est gratuite. Cliquez ci-dessous pour vous inscrire.", "form.note_paid": "Vous finaliserez le paiement sur la page de paiement PayPal.", "form.button_register": "S'inscrire", "form.button_checkout": "Passer au paiement", "form.powered_by_paypal": "Propulsé par PayPal", "alert.student_handler_missing": "Le gestionnaire d'inscription étudiant n'est pas configuré.", "alert.paypal_id_missing": "L'identifiant PayPal est manquant.", "membership.free": "Gratuit", "membership.regular.title": "Membre régulier annuel", "membership.regular.description": "Adhésion annuelle à KISS.", "membership.regular.price_suffix": "/an", "membership.lifetime.title": "Membre à vie", "membership.lifetime.description": "Adhésion à vie avec paiement unique.", "membership.lifetime.price_suffix": "à vie", "membership.spouse.title": "Membre conjoint annuel", "membership.spouse.description": "Adhésion annuelle pour conjoint.", "membership.spouse.price_suffix": "/an", "membership.joint.title": "Membre conjoint KSS annuel", "membership.joint.description": "Adhésion annuelle conjointe avec la KSS.", "membership.joint.price_suffix": "/an", "membership.student.title": "Membre étudiant", "membership.student.description": "Inscription gratuite à l'adhésion (sans paiement).", "membership.student.price_suffix": "/an"}, "de": {"page.join": "Beitreten", "page.subtitle": "Sie können der KISS-Mitgliedschaft über PayPal oder per Scheck beitreten.", "form.membership_type": "Mitgliedschaftstyp", "form.note_student": "Die studentische Mitgliedschaft ist kostenlos. Klicken Sie unten, um sich zu registrieren.", "form.note_paid": "Sie schließen die Zahlung auf der PayPal-Checkout-Seite ab.", "form.button_register": "Registrieren", "form.button_checkout": "Zur Kasse", "form.powered_by_paypal": "Bereitgestellt von PayPal", "alert.student_handler_missing": "Der Registrierungs-Handler für Studierende ist nicht konfiguriert.", "alert.paypal_id_missing": "PayPal-ID fehlt.", "membership.free": "Kostenlos", "membership.regular.title": "Reguläres Mitglied (jährlich)", "membership.regular.description": "Jährliche KISS-Mitgliedschaft.", "membership.regular.price_suffix": "/Jahr", "membership.lifetime.title": "Lebenslanges Mitglied", "membership.lifetime.description": "Einmalige lebenslange Mitgliedschaft.", "membership.lifetime.price_suffix": "lebenslang", "membership.spouse.title": "Ehepartner-Mitglied (jährlich)", "membership.spouse.description": "Jährliche Mitgliedschaft für Ehepartner.", "membership.spouse.price_suffix": "/Jahr", "membership.joint.title": "Gemeinsames KSS-Mitglied (jährlich)", "membership.joint.description": "Jährliche gemeinsame Mitgliedschaft mit KSS.", "membership.joint.price_suffix": "/Jahr", "membership.student.title": "Studentisches Mitglied", "membership.student.description": "Kostenlose Mitgliedschaftsregistrierung (keine Zahlung).", "membership.student.price_suffix": "/Jahr"}, "pt-BR": {"page.join": "Associar-se", "page.subtitle": "Você pode aderir à associação da KISS via PayPal ou cheque.", "form.membership_type": "Tipo de associação", "form.note_student": "A associação estudantil é gratuita. Clique abaixo para se registrar.", "form.note_paid": "Você concluirá o pagamento na página de checkout do PayPal.", "form.button_register": "Cadastrar-se", "form.button_checkout": "Ir para pagamento", "form.powered_by_paypal": "Processado via PayPal", "alert.student_handler_missing": "Falta configurar o manipulador de registro de estudantes.", "alert.paypal_id_missing": "O ID do PayPal está ausente.", "membership.free": "Grátis", "membership.regular.title": "Membro regular anual", "membership.regular.description": "Associação anual da KISS.", "membership.regular.price_suffix": "/ano", "membership.lifetime.title": "Membro vitalício", "membership.lifetime.description": "Associação vitalícia com pagamento único.", "membership.lifetime.price_suffix": "vitalício", "membership.spouse.title": "Membro cônjuge anual", "membership.spouse.description": "Associação anual para cônjuges.", "membership.spouse.price_suffix": "/ano", "membership.joint.title": "Membro conjunto KSS anual", "membership.joint.description": "Associação anual conjunta com a KSS.", "membership.joint.price_suffix": "/ano", "membership.student.title": "Membro estudante", "membership.student.description": "Registro gratuito de associação (sem pagamento).", "membership.student.price_suffix": "/ano"}, "ru": {"page.join": "Вступить", "page.subtitle": "Вы можете оформить членство KISS через PayPal или чеком.", "form.membership_type": "Тип членства", "form.note_student": "Студенческое членство бесплатное. Нажмите ниже, чтобы зарегистрироваться.", "form.note_paid": "Вы завершите оплату на странице оформления PayPal.", "form.button_register": "Зарегистрироваться", "form.button_checkout": "Оплатить", "form.powered_by_paypal": "При поддержке PayPal", "alert.student_handler_missing": "Обработчик регистрации студентов не настроен.", "alert.paypal_id_missing": "Отсутствует ID PayPal.", "membership.free": "Бесплатно", "membership.regular.title": "Ежегодное регулярное членство", "membership.regular.description": "Ежегодное членство KISS.", "membership.regular.price_suffix": "/год", "membership.lifetime.title": "Пожизненный член", "membership.lifetime.description": "Пожизненное членство с разовой оплатой.", "membership.lifetime.price_suffix": "пожизненно", "membership.spouse.title": "Ежегодное членство для супругов", "membership.spouse.description": "Ежегодное членство для супругов.", "membership.spouse.price_suffix": "/год", "membership.joint.title": "Совместное ежегодное членство KSS", "membership.joint.description": "Ежегодное совместное членство с KSS.", "membership.joint.price_suffix": "/год", "membership.student.title": "Студенческое членство", "membership.student.description": "Бесплатная регистрация членства (без оплаты).", "membership.student.price_suffix": "/год"}, "id": {"page.join": "Bergabung", "page.subtitle": "Anda dapat bergabung dengan keanggotaan KISS melalui PayPal atau cek.", "form.membership_type": "Jenis keanggotaan", "form.note_student": "Keanggotaan mahasiswa gratis. Klik di bawah untuk mendaftar.", "form.note_paid": "Anda akan menyelesaikan pembayaran di halaman checkout PayPal.", "form.button_register": "Daftar", "form.button_checkout": "Bayar", "form.powered_by_paypal": "Didukung oleh PayPal", "alert.student_handler_missing": "Handler pendaftaran mahasiswa belum dikonfigurasi.", "alert.paypal_id_missing": "ID PayPal tidak ada.", "membership.free": "Gratis", "membership.regular.title": "Anggota reguler tahunan", "membership.regular.description": "Keanggotaan tahunan untuk KISS.", "membership.regular.price_suffix": "/tahun", "membership.lifetime.title": "Anggota seumur hidup", "membership.lifetime.description": "Keanggotaan seumur hidup dengan sekali pembayaran.", "membership.lifetime.price_suffix": "seumur hidup", "membership.spouse.title": "Anggota pasangan tahunan", "membership.spouse.description": "Keanggotaan tahunan untuk pasangan.", "membership.spouse.price_suffix": "/tahun", "membership.joint.title": "Anggota gabungan KSS tahunan", "membership.joint.description": "Keanggotaan tahunan gabungan dengan KSS.", "membership.joint.price_suffix": "/tahun", "membership.student.title": "Anggota mahasiswa", "membership.student.description": "Pendaftaran keanggotaan gratis (tanpa pembayaran).", "membership.student.price_suffix": "/tahun"}, "vi": {"page.join": "Tham gia", "page.subtitle": "Bạn có thể tham gia hội viên KISS qua PayPal hoặc séc.", "form.membership_type": "Loại hội viên", "form.note_student": "Hội viên sinh viên là miễn phí. Nhấn nút bên dưới để đăng ký.", "form.note_paid": "Bạn sẽ hoàn tất thanh toán trên trang thanh toán PayPal.", "form.button_register": "Đăng ký", "form.button_checkout": "Thanh toán", "form.powered_by_paypal": "Được hỗ trợ bởi PayPal", "alert.student_handler_missing": "Trình xử lý đăng ký hội viên sinh viên chưa được cấu hình.", "alert.paypal_id_missing": "Thiếu ID PayPal.", "membership.free": "Miễn phí", "membership.regular.title": "Hội viên thường niên", "membership.regular.description": "Hội viên thường niên của KISS.", "membership.regular.price_suffix": "/năm", "membership.lifetime.title": "Hội viên trọn đời", "membership.lifetime.description": "Hội viên trọn đời, thanh toán một lần.", "membership.lifetime.price_suffix": "trọn đời", "membership.spouse.title": "Hội viên vợ/chồng thường niên", "membership.spouse.description": "Hội viên thường niên dành cho vợ/chồng.", "membership.spouse.price_suffix": "/năm", "membership.joint.title": "Hội viên liên kết KSS thường niên", "membership.joint.description": "Hội viên thường niên liên kết với KSS.", "membership.joint.price_suffix": "/năm", "membership.student.title": "Hội viên sinh viên", "membership.student.description": "Đăng ký hội viên miễn phí (không thanh toán).", "membership.student.price_suffix": "/năm"}, "th": {"page.join": "เข้าร่วม", "page.subtitle": "คุณสามารถสมัครสมาชิก KISS ผ่าน PayPal หรือเช็คได้", "form.membership_type": "ประเภทสมาชิก", "form.note_student": "สมาชิกนักศึกษาฟรี คลิกปุ่มด้านล่างเพื่อลงทะเบียน", "form.note_paid": "คุณจะชำระเงินให้เสร็จสิ้นที่หน้า PayPal checkout", "form.button_register": "ลงทะเบียน", "form.button_checkout": "ชำระเงิน", "form.powered_by_paypal": "ขับเคลื่อนโดย PayPal", "alert.student_handler_missing": "ยังไม่ได้ตั้งค่าตัวจัดการการลงทะเบียนสมาชิกนักศึกษา", "alert.paypal_id_missing": "ไม่มี PayPal ID", "membership.free": "ฟรี", "membership.regular.title": "สมาชิกสามัญรายปี", "membership.regular.description": "สมาชิก KISS แบบรายปี", "membership.regular.price_suffix": "/ปี", "membership.lifetime.title": "สมาชิกตลอดชีพ", "membership.lifetime.description": "สมาชิกตลอดชีพแบบชำระครั้งเดียว", "membership.lifetime.price_suffix": "ตลอดชีพ", "membership.spouse.title": "สมาชิกคู่สมรสรายปี", "membership.spouse.description": "สมาชิกคู่สมรสแบบรายปี", "membership.spouse.price_suffix": "/ปี", "membership.joint.title": "สมาชิกสมทบ KSS รายปี", "membership.joint.description": "สมาชิกสมทบร่วมกับ KSS แบบรายปี", "membership.joint.price_suffix": "/ปี", "membership.student.title": "สมาชิกนักศึกษา", "membership.student.description": "ลงทะเบียนสมาชิกฟรี (ไม่ต้องชำระเงิน)", "membership.student.price_suffix": "/ปี"}, "ms": {"page.join": "Sertai", "page.subtitle": "Anda boleh menyertai keahlian KISS melalui PayPal atau cek.", "form.membership_type": "Jenis keahlian", "form.note_student": "Keahlian pelajar adalah percuma. Klik di bawah untuk mendaftar.", "form.note_paid": "Anda akan melengkapkan bayaran di halaman checkout PayPal.", "form.button_register": "Daftar", "form.button_checkout": "Bayar", "form.powered_by_paypal": "Dikuasakan oleh PayPal", "alert.student_handler_missing": "Pengendali pendaftaran pelajar belum dikonfigurasikan.", "alert.paypal_id_missing": "ID PayPal tiada.", "membership.free": "Percuma", "membership.regular.title": "Ahli biasa tahunan", "membership.regular.description": "Keahlian tahunan KISS.", "membership.regular.price_suffix": "/tahun", "membership.lifetime.title": "Ahli seumur hidup", "membership.lifetime.description": "Keahlian seumur hidup dengan bayaran sekali.", "membership.lifetime.price_suffix": "seumur hidup", "membership.spouse.title": "Ahli pasangan tahunan", "membership.spouse.description": "Keahlian tahunan untuk pasangan.", "membership.spouse.price_suffix": "/tahun", "membership.joint.title": "Ahli bersama KSS tahunan", "membership.joint.description": "Keahlian tahunan bersama dengan KSS.", "membership.joint.price_suffix": "/tahun", "membership.student.title": "Ahli pelajar", "membership.student.description": "Pendaftaran keahlian percuma (tanpa bayaran).", "membership.student.price_suffix": "/tahun"}, "fil": {"page.join": "Sumali", "page.subtitle": "Maaari kang sumali sa membership ng KISS sa pamamagitan ng PayPal o tseke.", "form.membership_type": "Uri ng membership", "form.note_student": "Libre ang Student Member. I-click ang nasa ibaba para magparehistro.", "form.note_paid": "Makukumpleto mo ang bayad sa PayPal checkout page.", "form.button_register": "Magparehistro", "form.button_checkout": "Mag-checkout", "form.powered_by_paypal": "Pinapagana ng PayPal", "alert.student_handler_missing": "Hindi naka-configure ang handler para sa student registration.", "alert.paypal_id_missing": "Nawawala ang PayPal ID.", "membership.free": "Libre", "membership.regular.title": "Taunang regular na miyembro", "membership.regular.description": "Taunang membership para sa KISS.", "membership.regular.price_suffix": "/taon", "membership.lifetime.title": "Habambuhay na miyembro", "membership.lifetime.description": "Isang beses na bayad para sa habambuhay na membership.", "membership.lifetime.price_suffix": "habambuhay", "membership.spouse.title": "Taunang miyembrong asawa", "membership.spouse.description": "Taunang membership para sa asawa.", "membership.spouse.price_suffix": "/taon", "membership.joint.title": "Taunang pinagsamang miyembro ng KSS", "membership.joint.description": "Taunang pinagsamang membership kasama ang KSS.", "membership.joint.price_suffix": "/taon", "membership.student.title": "Miyembrong estudyante", "membership.student.description": "Libreng pagpaparehistro ng membership (walang bayad).", "membership.student.price_suffix": "/taon"}, "hi": {"page.join": "जुड़ें", "page.subtitle": "आप PayPal या चेक के माध्यम से KISS सदस्यता से जुड़ सकते हैं।", "form.membership_type": "सदस्यता प्रकार", "form.note_student": "छात्र सदस्यता निःशुल्क है। पंजीकरण करने के लिए नीचे क्लिक करें।", "form.note_paid": "आप PayPal checkout पेज पर भुगतान पूरा करेंगे।", "form.button_register": "पंजीकरण करें", "form.button_checkout": "भुगतान करें", "form.powered_by_paypal": "PayPal द्वारा संचालित", "alert.student_handler_missing": "छात्र पंजीकरण हैंडलर कॉन्फ़िगर नहीं है।", "alert.paypal_id_missing": "PayPal ID उपलब्ध नहीं है।", "membership.free": "निःशुल्क", "membership.regular.title": "वार्षिक नियमित सदस्य", "membership.regular.description": "KISS की वार्षिक सदस्यता।", "membership.regular.price_suffix": "/वर्ष", "membership.lifetime.title": "आजीवन सदस्य", "membership.lifetime.description": "एकमुश्त भुगतान वाली आजीवन सदस्यता।", "membership.lifetime.price_suffix": "आजीवन", "membership.spouse.title": "वार्षिक जीवनसाथी सदस्य", "membership.spouse.description": "जीवनसाथी के लिए वार्षिक सदस्यता।", "membership.spouse.price_suffix": "/वर्ष", "membership.joint.title": "वार्षिक KSS संयुक्त सदस्य", "membership.joint.description": "KSS के साथ संयुक्त वार्षिक सदस्यता।", "membership.joint.price_suffix": "/वर्ष", "membership.student.title": "छात्र सदस्य", "membership.student.description": "निःशुल्क सदस्यता पंजीकरण (कोई भुगतान नहीं)।", "membership.student.price_suffix": "/वर्ष"}, "ar": {"page.join": "انضم", "page.subtitle": "يمكنك الانضمام إلى عضوية KISS عبر PayPal أو الشيك.", "form.membership_type": "نوع العضوية", "form.note_student": "عضوية الطالب مجانية. اضغط أدناه للتسجيل.", "form.note_paid": "ستُكمل الدفع في صفحة الدفع الخاصة بـ PayPal.", "form.button_register": "تسجيل", "form.button_checkout": "إتمام الدفع", "form.powered_by_paypal": "مشغّل بواسطة PayPal", "alert.student_handler_missing": "لم يتم إعداد معالج تسجيل الطلاب.", "alert.paypal_id_missing": "معرّف PayPal مفقود.", "membership.free": "مجاني", "membership.regular.title": "عضو عادي سنوي", "membership.regular.description": "عضوية KISS سنوية.", "membership.regular.price_suffix": "/سنة", "membership.lifetime.title": "عضو مدى الحياة", "membership.lifetime.description": "عضوية مدى الحياة بدفعة واحدة.", "membership.lifetime.price_suffix": "مدى الحياة", "membership.spouse.title": "عضو زوج/زوجة سنوي", "membership.spouse.description": "عضوية سنوية للزوج أو الزوجة.", "membership.spouse.price_suffix": "/سنة", "membership.joint.title": "عضو مشترك مع KSS سنوي", "membership.joint.description": "عضوية سنوية مشتركة مع KSS.", "membership.joint.price_suffix": "/سنة", "membership.student.title": "عضو طالب", "membership.student.description": "تسجيل عضوية مجاني (بدون دفع).", "membership.student.price_suffix": "/سنة"}, "it": {"page.join": "Aderisci", "page.subtitle": "Puoi aderire all'iscrizione KISS tramite PayPal o assegno.", "form.membership_type": "Tipo di iscrizione", "form.note_student": "L'iscrizione studentesca è gratuita. Fai clic qui sotto per registrarti.", "form.note_paid": "Completerai il pagamento nella pagina di checkout PayPal.", "form.button_register": "Registrati", "form.button_checkout": "Vai al pagamento", "form.powered_by_paypal": "Con tecnologia PayPal", "alert.student_handler_missing": "Il gestore della registrazione studenti non è configurato.", "alert.paypal_id_missing": "Manca l'ID PayPal.", "membership.free": "Gratis", "membership.regular.title": "Membro ordinario annuale", "membership.regular.description": "Iscrizione annuale a KISS.", "membership.regular.price_suffix": "/anno", "membership.lifetime.title": "Membro a vita", "membership.lifetime.description": "Iscrizione a vita con pagamento unico.", "membership.lifetime.price_suffix": "a vita", "membership.spouse.title": "Membro coniuge annuale", "membership.spouse.description": "Iscrizione annuale per coniuge.", "membership.spouse.price_suffix": "/anno", "membership.joint.title": "Membro congiunto KSS annuale", "membership.joint.description": "Iscrizione annuale congiunta con KSS.", "membership.joint.price_suffix": "/anno", "membership.student.title": "Membro studente", "membership.student.description": "Registrazione gratuita all'iscrizione (senza pagamento).", "membership.student.price_suffix": "/anno"}, "nl": {"page.join": "Lid worden", "page.subtitle": "Je kunt lid worden van KISS via PayPal of per cheque.", "form.membership_type": "Type lidmaatschap", "form.note_student": "Het studentenlidmaatschap is gratis. Klik hieronder om je te registreren.", "form.note_paid": "Je voltooit de betaling op de PayPal-afrekenpagina.", "form.button_register": "Registreren", "form.button_checkout": "Afrekenen", "form.powered_by_paypal": "Mogelijk gemaakt door PayPal", "alert.student_handler_missing": "De registratiehandler voor studenten is niet geconfigureerd.", "alert.paypal_id_missing": "PayPal-ID ontbreekt.", "membership.free": "Gratis", "membership.regular.title": "Regulier lidmaatschap jaarlijks", "membership.regular.description": "Jaarlijks lidmaatschap voor KISS.", "membership.regular.price_suffix": "/jaar", "membership.lifetime.title": "Levenslang lid", "membership.lifetime.description": "Eenmalig levenslang lidmaatschap.", "membership.lifetime.price_suffix": "levenslang", "membership.spouse.title": "Echtgenoot-/partnerlidmaatschap jaarlijks", "membership.spouse.description": "Jaarlijks lidmaatschap voor echtgenoot/partner.", "membership.spouse.price_suffix": "/jaar", "membership.joint.title": "Gezamenlijk KSS-lidmaatschap jaarlijks", "membership.joint.description": "Jaarlijks gezamenlijk lidmaatschap met KSS.", "membership.joint.price_suffix": "/jaar", "membership.student.title": "Studentlid", "membership.student.description": "Gratis registratie van lidmaatschap (geen betaling).", "membership.student.price_suffix": "/jaar"}, "pl": {"page.join": "Dołącz", "page.subtitle": "Możesz dołączyć do członkostwa KISS przez PayPal lub czek.", "form.membership_type": "Rodzaj członkostwa", "form.note_student": "Członkostwo studenckie jest bezpłatne. Kliknij poniżej, aby się zarejestrować.", "form.note_paid": "Płatność zakończysz na stronie PayPal.", "form.button_register": "Zarejestruj się", "form.button_checkout": "Przejdź do płatności", "form.powered_by_paypal": "Obsługiwane przez PayPal", "alert.student_handler_missing": "Handler rejestracji studenckiej nie jest skonfigurowany.", "alert.paypal_id_missing": "Brakuje identyfikatora PayPal.", "membership.free": "Bezpłatnie", "membership.regular.title": "Roczne członkostwo regularne", "membership.regular.description": "Roczne członkostwo w KISS.", "membership.regular.price_suffix": "/rok", "membership.lifetime.title": "Członkostwo dożywotnie", "membership.lifetime.description": "Członkostwo dożywotnie z jednorazową opłatą.", "membership.lifetime.price_suffix": "dożywotnio", "membership.spouse.title": "Roczne członkostwo dla współmałżonka", "membership.spouse.description": "Roczne członkostwo dla współmałżonka.", "membership.spouse.price_suffix": "/rok", "membership.joint.title": "Roczne wspólne członkostwo KSS", "membership.joint.description": "Roczne wspólne członkostwo z KSS.", "membership.joint.price_suffix": "/rok", "membership.student.title": "Członkostwo studenckie", "membership.student.description": "Bezpłatna rejestracja członkostwa (bez płatności).", "membership.student.price_suffix": "/rok"}, "sv": {"page.join": "Gå med", "page.subtitle": "Du kan bli medlem i KISS via PayPal eller check.", "form.membership_type": "Typ av medlemskap", "form.note_student": "Studentmedlemskap är gratis. Klicka nedan för att registrera dig.", "form.note_paid": "Du slutför betalningen på PayPals kassasida.", "form.button_register": "Registrera dig", "form.button_checkout": "Till betalning", "form.powered_by_paypal": "Drivs av PayPal", "alert.student_handler_missing": "Registreringshanteraren för studenter är inte konfigurerad.", "alert.paypal_id_missing": "PayPal-ID saknas.", "membership.free": "Gratis", "membership.regular.title": "Ordinarie medlemskap per år", "membership.regular.description": "Årligt medlemskap i KISS.", "membership.regular.price_suffix": "/år", "membership.lifetime.title": "Livstidsmedlem", "membership.lifetime.description": "Livstidsmedlemskap med engångsbetalning.", "membership.lifetime.price_suffix": "livstid", "membership.spouse.title": "Medlemskap för make/maka per år", "membership.spouse.description": "Årligt medlemskap för make/maka.", "membership.spouse.price_suffix": "/år", "membership.joint.title": "Gemensamt KSS-medlemskap per år", "membership.joint.description": "Årligt gemensamt medlemskap med KSS.", "membership.joint.price_suffix": "/år", "membership.student.title": "Studentmedlem", "membership.student.description": "Gratis medlemsregistrering (ingen betalning).", "membership.student.price_suffix": "/år"}, "tr": {"page.join": "Katıl", "page.subtitle": "PayPal veya çek ile KISS üyeliğine katılabilirsiniz.", "form.membership_type": "Üyelik türü", "form.note_student": "Öğrenci üyeliği ücretsizdir. Kayıt olmak için aşağıya tıklayın.", "form.note_paid": "Ödemeyi PayPal ödeme sayfasında tamamlayacaksınız.", "form.button_register": "Kayıt Ol", "form.button_checkout": "Ödemeye Geç", "form.powered_by_paypal": "PayPal desteklidir", "alert.student_handler_missing": "Öğrenci kayıt işleyicisi yapılandırılmamış.", "alert.paypal_id_missing": "PayPal kimliği eksik.", "membership.free": "Ücretsiz", "membership.regular.title": "Yıllık düzenli üye", "membership.regular.description": "KISS için yıllık üyelik.", "membership.regular.price_suffix": "/yıl", "membership.lifetime.title": "Ömür boyu üye", "membership.lifetime.description": "Tek seferlik ödemeyle ömür boyu üyelik.", "membership.lifetime.price_suffix": "ömür boyu", "membership.spouse.title": "Yıllık eş üyeliği", "membership.spouse.description": "Eşler için yıllık üyelik.", "membership.spouse.price_suffix": "/yıl", "membership.joint.title": "Yıllık KSS ortak üyeliği", "membership.joint.description": "KSS ile yıllık ortak üyelik.", "membership.joint.price_suffix": "/yıl", "membership.student.title": "Öğrenci üye", "membership.student.description": "Ücretsiz üyelik kaydı (ödeme yok).", "membership.student.price_suffix": "/yıl"}, "uk": {"page.join": "Приєднатися", "page.subtitle": "Ви можете оформити членство KISS через PayPal або чеком.", "form.membership_type": "Тип членства", "form.note_student": "Студентське членство безкоштовне. Натисніть нижче, щоб зареєструватися.", "form.note_paid": "Ви завершите оплату на сторінці PayPal.", "form.button_register": "Зареєструватися", "form.button_checkout": "Оплатити", "form.powered_by_paypal": "За підтримки PayPal", "alert.student_handler_missing": "Обробник студентської реєстрації не налаштований.", "alert.paypal_id_missing": "Відсутній ID PayPal.", "membership.free": "Безкоштовно", "membership.regular.title": "Щорічне стандартне членство", "membership.regular.description": "Щорічне членство в KISS.", "membership.regular.price_suffix": "/рік", "membership.lifetime.title": "Довічне членство", "membership.lifetime.description": "Довічне членство з одноразовою оплатою.", "membership.lifetime.price_suffix": "довічно", "membership.spouse.title": "Щорічне членство для подружжя", "membership.spouse.description": "Щорічне членство для подружжя.", "membership.spouse.price_suffix": "/рік", "membership.joint.title": "Щорічне спільне членство KSS", "membership.joint.description": "Щорічне спільне членство з KSS.", "membership.joint.price_suffix": "/рік", "membership.student.title": "Студентське членство", "membership.student.description": "Безкоштовна реєстрація членства (без оплати).", "membership.student.price_suffix": "/рік"}};
    const BASE_I18N = window.StatKISS_I18N || null;
    const LANG_KEY = (BASE_I18N && BASE_I18N.LANG_KEY) ? BASE_I18N.LANG_KEY : "statkiss_lang";
    const languages = (BASE_I18N && Array.isArray(BASE_I18N.languages) && BASE_I18N.languages.length > 0)
        ? BASE_I18N.languages
        : DEFAULT_LANGUAGES;
    const CHANGE_EVENT = "statkiss:membership-lang-change";

    function resolveLangCode(code) {
        if (BASE_I18N && typeof BASE_I18N.resolveLangCode === "function") {
            return BASE_I18N.resolveLangCode(code);
        }

        if (!code) return "en";

        const c = String(code).trim();
        const lower = c.toLowerCase();

        if (c === "zh" || lower.indexOf("zh-") === 0) {
            if (
                lower.indexOf("tw") >= 0 ||
                lower.indexOf("hk") >= 0 ||
                lower.indexOf("mo") >= 0 ||
                lower.indexOf("hant") >= 0
            ) {
                return "zh-Hant";
            }
            return "zh-Hans";
        }

        if (c === "tl" || lower.indexOf("tl-") === 0 || c === "fil" || lower.indexOf("fil-") === 0) {
            return "fil";
        }

        if (c === "pt" || lower.indexOf("pt-") === 0) {
            return "pt-BR";
        }

        if (lower.indexOf("en-") === 0) return "en";
        if (lower.indexOf("ja-") === 0) return "ja";
        if (lower.indexOf("ko-") === 0) return "ko";

        return c;
    }

    function pickSupportedLang(code) {
        const resolved = resolveLangCode(code || "en");
        const shortCode = String(resolved).split("-")[0];

        const exact = languages.find((item) => item.code === resolved);
        if (exact) return exact.code;

        const startsWithResolved = languages.find((item) => item.code.indexOf(resolved) === 0);
        if (startsWithResolved) return startsWithResolved.code;

        const sameBase = languages.find((item) => item.code.split("-")[0] === shortCode);
        if (sameBase) return sameBase.code;

        return "en";
    }

    function normalizeCoverage() {
        const en = dict.en || {};
        const ko = dict.ko || {};

        languages.forEach((item) => {
            const code = item.code;

            if (!dict[code]) {
                dict[code] = {};
            }

            UI_KEYS.forEach((key) => {
                if (dict[code][key] == null || dict[code][key] === "") {
                    dict[code][key] = en[key] != null && en[key] !== ""
                        ? en[key]
                        : (ko[key] != null && ko[key] !== "" ? ko[key] : key);
                }
            });
        });
    }

    function t(lang, key) {
        const code = pickSupportedLang(lang);
        const current = dict[code] || {};
        const en = dict.en || {};
        const ko = dict.ko || {};

        if (current[key] != null && current[key] !== "") return current[key];
        if (en[key] != null && en[key] !== "") return en[key];
        if (ko[key] != null && ko[key] !== "") return ko[key];

        return key;
    }

    function isRTL(lang) {
        if (BASE_I18N && typeof BASE_I18N.isRTL === "function") {
            return BASE_I18N.isRTL(lang);
        }
        return pickSupportedLang(lang) === "ar";
    }

    function safeGetLocalStorageLang() {
        try {
            return window.localStorage.getItem(LANG_KEY);
        } catch (err) {
            return null;
        }
    }

    function getCurrentLang() {
        const saved = safeGetLocalStorageLang();
        const docLang = document.documentElement.getAttribute("lang");
        const browser = navigator.language || "en";
        return pickSupportedLang(saved || docLang || browser);
    }

    function applyLangToDocument(lang) {
        const code = pickSupportedLang(lang);
        const dir = isRTL(code) ? "rtl" : "ltr";
        const root = document.documentElement;

        if (BASE_I18N && typeof BASE_I18N.applyLangToDocument === "function") {
            BASE_I18N.applyLangToDocument(code);
            return code;
        }

        if (root.getAttribute("lang") !== code) {
            root.setAttribute("lang", code);
        }

        if (root.getAttribute("dir") !== dir) {
            root.setAttribute("dir", dir);
        }

        return code;
    }

    function dispatchChange(lang, source) {
        const code = pickSupportedLang(lang);

        try {
            window.dispatchEvent(new CustomEvent(CHANGE_EVENT, {
                detail: {
                    lang: code,
                    source: source || "membership",
                },
            }));
        } catch (err) {
        }

        return code;
    }

    function init() {
        normalizeCoverage();
        const lang = getCurrentLang();
        applyLangToDocument(lang);
        return lang;
    }

    function setLang(lang, options) {
        const code = pickSupportedLang(lang);
        const source = options && options.source ? options.source : "membership";

        try {
            window.localStorage.setItem(LANG_KEY, code);
        } catch (err) {
        }

        applyLangToDocument(code);
        dispatchChange(code, source);
        return code;
    }

    function subscribe(callback) {
        if (typeof callback !== "function") {
            return function unsubscribeNoop() {};
        }

        const notify = (lang, source) => {
            const code = pickSupportedLang(lang || getCurrentLang());
            callback(code, source || "membership");
        };

        const onStorage = (event) => {
            if (!event || event.key == null || event.key === LANG_KEY) {
                notify(null, "storage");
            }
        };

        const onCustomChange = (event) => {
            const detail = event && event.detail ? event.detail : {};
            notify(detail.lang, detail.source || "custom");
        };

        const onFocus = () => notify(null, "focus");
        const onVisibility = () => {
            if (!document.hidden) {
                notify(null, "visibilitychange");
            }
        };

        window.addEventListener("storage", onStorage);
        window.addEventListener(CHANGE_EVENT, onCustomChange);
        window.addEventListener("focus", onFocus);
        document.addEventListener("visibilitychange", onVisibility);

        let observer = null;
        if (typeof MutationObserver !== "undefined") {
            observer = new MutationObserver((mutations) => {
                for (let i = 0; i < mutations.length; i += 1) {
                    const name = mutations[i].attributeName;
                    if (name === "lang" || name === "dir") {
                        notify(document.documentElement.getAttribute("lang"), "document");
                        break;
                    }
                }
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["lang", "dir"],
            });
        }

        return function unsubscribe() {
            window.removeEventListener("storage", onStorage);
            window.removeEventListener(CHANGE_EVENT, onCustomChange);
            window.removeEventListener("focus", onFocus);
            document.removeEventListener("visibilitychange", onVisibility);

            if (observer) {
                observer.disconnect();
            }
        };
    }

    const api = {
        LANG_KEY,
        languages,
        UI_KEYS,
        dict,
        CHANGE_EVENT,
        resolveLangCode,
        pickSupportedLang,
        normalizeCoverage,
        t,
        isRTL,
        getCurrentLang,
        applyLangToDocument,
        init,
        setLang,
        subscribe,
    };

    window.StatKISS_MembershipI18N = api;

    if (window.StatKISS_I18N) {
        window.StatKISS_I18N.membership = api;
    }

    normalizeCoverage();
})();
