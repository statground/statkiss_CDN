(function(){'use strict';
const base = window.StatKISS_I18N || {};
const LANG_KEY = base.LANG_KEY || 'statkiss_lang';
const languages = (Array.isArray(base.languages) && base.languages.length)
    ? base.languages
    : [
    {
        "code": "en",
        "label": "English"
    },
    {
        "code": "ko",
        "label": "한국어"
    },
    {
        "code": "ja",
        "label": "日本語"
    },
    {
        "code": "zh-Hans",
        "label": "中文(简体)"
    },
    {
        "code": "zh-Hant",
        "label": "中文(繁體)"
    },
    {
        "code": "es",
        "label": "Español"
    },
    {
        "code": "fr",
        "label": "Français"
    },
    {
        "code": "de",
        "label": "Deutsch"
    },
    {
        "code": "pt-BR",
        "label": "Português (Brasil)"
    },
    {
        "code": "ru",
        "label": "Русский"
    },
    {
        "code": "id",
        "label": "Bahasa Indonesia"
    },
    {
        "code": "vi",
        "label": "Tiếng Việt"
    },
    {
        "code": "th",
        "label": "ไทย"
    },
    {
        "code": "ms",
        "label": "Bahasa Melayu"
    },
    {
        "code": "fil",
        "label": "Filipino"
    },
    {
        "code": "hi",
        "label": "हिन्दी"
    },
    {
        "code": "ar",
        "label": "العربية"
    },
    {
        "code": "it",
        "label": "Italiano"
    },
    {
        "code": "nl",
        "label": "Nederlands"
    },
    {
        "code": "pl",
        "label": "Polski"
    },
    {
        "code": "sv",
        "label": "Svenska"
    },
    {
        "code": "tr",
        "label": "Türkçe"
    },
    {
        "code": "uk",
        "label": "Українська"
    }
];

const bundles = {};
const bundleOrder = [];

const commonDict = {
    "en": {
        "admin.menu.overview": "Overview",
        "admin.menu.active_users": "Active Users",
        "admin.menu.traffic": "Traffic Analytics",
        "admin.menu.members": "Members",
        "admin.common.checking_access": "Checking whether you have administrator access.",
        "admin.common.total": "Total",
        "admin.common.current_year": "Current Year",
        "admin.common.current_month": "Current Month",
        "admin.common.today": "Today",
        "admin.common.daily": "Daily",
        "admin.common.monthly": "Monthly",
        "admin.common.yearly": "Yearly",
        "admin.common.search": "Search",
        "admin.common.change": "Change",
        "admin.common.none": "None",
        "admin.common.open": "Open",
        "admin.common.membership": "Membership",
        "admin.common.membership_addon": "Membership Add-On",
        "admin.common.pending_membership": "Pending Membership",
        "admin.common.name": "Name",
        "admin.common.email": "E-mail",
        "admin.common.expired_on": "Expired on {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Lifetime Member",
        "admin.roles.regular_member": "Regular Member",
        "admin.roles.spouse_member": "Spouse Member",
        "admin.roles.student_member": "Student Member",
        "admin.roles.non_member": "Non-member",
        "admin.roles.administrator": "Administrator",
        "admin.roles.developer": "Developer",
        "admin.roles.kss_joint_member": "KSS Joint Member",
        "admin.roles.pending_student_application": "Applied for Student Membership"
    },
    "ko": {
        "admin.menu.overview": "개요",
        "admin.menu.active_users": "활성 사용자",
        "admin.menu.traffic": "트래픽 분석",
        "admin.menu.members": "회원 관리",
        "admin.common.checking_access": "관리자 접근 권한을 확인하고 있습니다.",
        "admin.common.total": "전체",
        "admin.common.current_year": "올해",
        "admin.common.current_month": "이번 달",
        "admin.common.today": "오늘",
        "admin.common.daily": "일별",
        "admin.common.monthly": "월별",
        "admin.common.yearly": "연도별",
        "admin.common.search": "검색",
        "admin.common.change": "변경",
        "admin.common.none": "없음",
        "admin.common.open": "열기",
        "admin.common.membership": "멤버십",
        "admin.common.membership_addon": "멤버십 부가항목",
        "admin.common.pending_membership": "대기 중 멤버십",
        "admin.common.name": "이름",
        "admin.common.email": "이메일",
        "admin.common.expired_on": "{date} 만료",
        "admin.roles.admin": "관리자",
        "admin.roles.lifetime_member": "평생회원",
        "admin.roles.regular_member": "정회원",
        "admin.roles.spouse_member": "배우자회원",
        "admin.roles.student_member": "학생회원",
        "admin.roles.non_member": "비회원",
        "admin.roles.administrator": "관리자",
        "admin.roles.developer": "개발자",
        "admin.roles.kss_joint_member": "KSS 공동회원",
        "admin.roles.pending_student_application": "학생회원 신청 중"
    },
    "ja": {
        "admin.menu.overview": "概要",
        "admin.menu.active_users": "アクティブユーザー",
        "admin.menu.traffic": "トラフィック分析",
        "admin.menu.members": "会員",
        "admin.common.checking_access": "管理者アクセス権を確認しています。",
        "admin.common.total": "合計",
        "admin.common.current_year": "今年",
        "admin.common.current_month": "今月",
        "admin.common.today": "今日",
        "admin.common.daily": "日別",
        "admin.common.monthly": "月別",
        "admin.common.yearly": "年別",
        "admin.common.search": "検索",
        "admin.common.change": "変更",
        "admin.common.none": "なし",
        "admin.common.open": "開く",
        "admin.common.membership": "会員区分",
        "admin.common.membership_addon": "会員追加項目",
        "admin.common.pending_membership": "保留中の会員申請",
        "admin.common.name": "氏名",
        "admin.common.email": "メールアドレス",
        "admin.common.expired_on": "{date}に期限切れ",
        "admin.roles.admin": "管理",
        "admin.roles.lifetime_member": "終身会員",
        "admin.roles.regular_member": "正会員",
        "admin.roles.spouse_member": "配偶者会員",
        "admin.roles.student_member": "学生会員",
        "admin.roles.non_member": "非会員",
        "admin.roles.administrator": "管理者",
        "admin.roles.developer": "開発者",
        "admin.roles.kss_joint_member": "KSS共同会員",
        "admin.roles.pending_student_application": "学生会員申請中"
    },
    "zh-Hans": {
        "admin.menu.overview": "概览",
        "admin.menu.active_users": "活跃用户",
        "admin.menu.traffic": "流量分析",
        "admin.menu.members": "会员",
        "admin.common.checking_access": "正在检查您是否具有管理员权限。",
        "admin.common.total": "总计",
        "admin.common.current_year": "本年",
        "admin.common.current_month": "本月",
        "admin.common.today": "今日",
        "admin.common.daily": "日度",
        "admin.common.monthly": "月度",
        "admin.common.yearly": "年度",
        "admin.common.search": "搜索",
        "admin.common.change": "更改",
        "admin.common.none": "无",
        "admin.common.open": "打开",
        "admin.common.membership": "会员资格",
        "admin.common.membership_addon": "会员附加项",
        "admin.common.pending_membership": "待处理会员申请",
        "admin.common.name": "姓名",
        "admin.common.email": "电子邮件",
        "admin.common.expired_on": "于{date}到期",
        "admin.roles.admin": "管理员",
        "admin.roles.lifetime_member": "终身会员",
        "admin.roles.regular_member": "普通会员",
        "admin.roles.spouse_member": "配偶会员",
        "admin.roles.student_member": "学生会员",
        "admin.roles.non_member": "非会员",
        "admin.roles.administrator": "管理员",
        "admin.roles.developer": "开发者",
        "admin.roles.kss_joint_member": "KSS联合会员",
        "admin.roles.pending_student_application": "已申请学生会员"
    },
    "zh-Hant": {
        "admin.menu.overview": "概覽",
        "admin.menu.active_users": "活躍使用者",
        "admin.menu.traffic": "流量分析",
        "admin.menu.members": "會員",
        "admin.common.checking_access": "正在檢查您是否具有管理員權限。",
        "admin.common.total": "總計",
        "admin.common.current_year": "本年",
        "admin.common.current_month": "本月",
        "admin.common.today": "今日",
        "admin.common.daily": "日度",
        "admin.common.monthly": "月度",
        "admin.common.yearly": "年度",
        "admin.common.search": "搜尋",
        "admin.common.change": "變更",
        "admin.common.none": "無",
        "admin.common.open": "開啟",
        "admin.common.membership": "會員資格",
        "admin.common.membership_addon": "會員附加項",
        "admin.common.pending_membership": "待處理會員申請",
        "admin.common.name": "姓名",
        "admin.common.email": "電子郵件",
        "admin.common.expired_on": "於{date}到期",
        "admin.roles.admin": "管理員",
        "admin.roles.lifetime_member": "終身會員",
        "admin.roles.regular_member": "一般會員",
        "admin.roles.spouse_member": "配偶會員",
        "admin.roles.student_member": "學生會員",
        "admin.roles.non_member": "非會員",
        "admin.roles.administrator": "管理員",
        "admin.roles.developer": "開發者",
        "admin.roles.kss_joint_member": "KSS聯合會員",
        "admin.roles.pending_student_application": "已申請學生會員"
    },
    "es": {
        "admin.menu.overview": "Resumen",
        "admin.menu.active_users": "Usuarios activos",
        "admin.menu.traffic": "Analítica de tráfico",
        "admin.menu.members": "Miembros",
        "admin.common.checking_access": "Comprobando si tiene acceso de administrador.",
        "admin.common.total": "Total",
        "admin.common.current_year": "Año actual",
        "admin.common.current_month": "Mes actual",
        "admin.common.today": "Hoy",
        "admin.common.daily": "Diario",
        "admin.common.monthly": "Mensual",
        "admin.common.yearly": "Anual",
        "admin.common.search": "Buscar",
        "admin.common.change": "Cambiar",
        "admin.common.none": "Ninguno",
        "admin.common.open": "Abrir",
        "admin.common.membership": "Membresía",
        "admin.common.membership_addon": "Complemento de membresía",
        "admin.common.pending_membership": "Membresía pendiente",
        "admin.common.name": "Nombre",
        "admin.common.email": "Correo electrónico",
        "admin.common.expired_on": "Vence el {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Miembro vitalicio",
        "admin.roles.regular_member": "Miembro regular",
        "admin.roles.spouse_member": "Miembro cónyuge",
        "admin.roles.student_member": "Miembro estudiante",
        "admin.roles.non_member": "No miembro",
        "admin.roles.administrator": "Administrador",
        "admin.roles.developer": "Desarrollador",
        "admin.roles.kss_joint_member": "Miembro conjunto de KSS",
        "admin.roles.pending_student_application": "Solicitud de membresía estudiantil enviada"
    },
    "fr": {
        "admin.menu.overview": "Vue d'ensemble",
        "admin.menu.active_users": "Utilisateurs actifs",
        "admin.menu.traffic": "Analyse du trafic",
        "admin.menu.members": "Membres",
        "admin.common.checking_access": "Vérification de votre accès administrateur.",
        "admin.common.total": "Total",
        "admin.common.current_year": "Année en cours",
        "admin.common.current_month": "Mois en cours",
        "admin.common.today": "Aujourd'hui",
        "admin.common.daily": "Quotidien",
        "admin.common.monthly": "Mensuel",
        "admin.common.yearly": "Annuel",
        "admin.common.search": "Rechercher",
        "admin.common.change": "Modifier",
        "admin.common.none": "Aucun",
        "admin.common.open": "Ouvrir",
        "admin.common.membership": "Adhésion",
        "admin.common.membership_addon": "Option d'adhésion",
        "admin.common.pending_membership": "Adhésion en attente",
        "admin.common.name": "Nom",
        "admin.common.email": "E-mail",
        "admin.common.expired_on": "Expire le {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Membre à vie",
        "admin.roles.regular_member": "Membre régulier",
        "admin.roles.spouse_member": "Conjoint membre",
        "admin.roles.student_member": "Membre étudiant",
        "admin.roles.non_member": "Non-membre",
        "admin.roles.administrator": "Administrateur",
        "admin.roles.developer": "Développeur",
        "admin.roles.kss_joint_member": "Membre conjoint KSS",
        "admin.roles.pending_student_application": "Demande d'adhésion étudiante envoyée"
    },
    "de": {
        "admin.menu.overview": "Übersicht",
        "admin.menu.active_users": "Aktive Nutzer",
        "admin.menu.traffic": "Traffic-Analyse",
        "admin.menu.members": "Mitglieder",
        "admin.common.checking_access": "Es wird geprüft, ob Sie Administratorzugriff haben.",
        "admin.common.total": "Gesamt",
        "admin.common.current_year": "Aktuelles Jahr",
        "admin.common.current_month": "Aktueller Monat",
        "admin.common.today": "Heute",
        "admin.common.daily": "Täglich",
        "admin.common.monthly": "Monatlich",
        "admin.common.yearly": "Jährlich",
        "admin.common.search": "Suchen",
        "admin.common.change": "Ändern",
        "admin.common.none": "Keine",
        "admin.common.open": "Öffnen",
        "admin.common.membership": "Mitgliedschaft",
        "admin.common.membership_addon": "Mitgliedschafts-Zusatz",
        "admin.common.pending_membership": "Ausstehende Mitgliedschaft",
        "admin.common.name": "Name",
        "admin.common.email": "E-Mail",
        "admin.common.expired_on": "Abgelaufen am {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Lebenslanges Mitglied",
        "admin.roles.regular_member": "Reguläres Mitglied",
        "admin.roles.spouse_member": "Ehepartner-Mitglied",
        "admin.roles.student_member": "Studentisches Mitglied",
        "admin.roles.non_member": "Nichtmitglied",
        "admin.roles.administrator": "Administrator",
        "admin.roles.developer": "Entwickler",
        "admin.roles.kss_joint_member": "KSS-Gemeinschaftsmitglied",
        "admin.roles.pending_student_application": "Studentische Mitgliedschaft beantragt"
    },
    "pt-BR": {
        "admin.menu.overview": "Visão geral",
        "admin.menu.active_users": "Usuários ativos",
        "admin.menu.traffic": "Análise de tráfego",
        "admin.menu.members": "Membros",
        "admin.common.checking_access": "Verificando se você tem acesso de administrador.",
        "admin.common.total": "Total",
        "admin.common.current_year": "Ano atual",
        "admin.common.current_month": "Mês atual",
        "admin.common.today": "Hoje",
        "admin.common.daily": "Diário",
        "admin.common.monthly": "Mensal",
        "admin.common.yearly": "Anual",
        "admin.common.search": "Buscar",
        "admin.common.change": "Alterar",
        "admin.common.none": "Nenhum",
        "admin.common.open": "Abrir",
        "admin.common.membership": "Associação",
        "admin.common.membership_addon": "Complemento de associação",
        "admin.common.pending_membership": "Associação pendente",
        "admin.common.name": "Nome",
        "admin.common.email": "E-mail",
        "admin.common.expired_on": "Expira em {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Membro vitalício",
        "admin.roles.regular_member": "Membro regular",
        "admin.roles.spouse_member": "Membro cônjuge",
        "admin.roles.student_member": "Membro estudante",
        "admin.roles.non_member": "Não membro",
        "admin.roles.administrator": "Administrador",
        "admin.roles.developer": "Desenvolvedor",
        "admin.roles.kss_joint_member": "Membro conjunto KSS",
        "admin.roles.pending_student_application": "Solicitação de associação estudantil enviada"
    },
    "ru": {
        "admin.menu.overview": "Обзор",
        "admin.menu.active_users": "Активные пользователи",
        "admin.menu.traffic": "Аналитика трафика",
        "admin.menu.members": "Участники",
        "admin.common.checking_access": "Проверяем, есть ли у вас права администратора.",
        "admin.common.total": "Итого",
        "admin.common.current_year": "Текущий год",
        "admin.common.current_month": "Текущий месяц",
        "admin.common.today": "Сегодня",
        "admin.common.daily": "Ежедневно",
        "admin.common.monthly": "Ежемесячно",
        "admin.common.yearly": "Ежегодно",
        "admin.common.search": "Поиск",
        "admin.common.change": "Изменить",
        "admin.common.none": "Нет",
        "admin.common.open": "Открыть",
        "admin.common.membership": "Членство",
        "admin.common.membership_addon": "Дополнение к членству",
        "admin.common.pending_membership": "Ожидающее членство",
        "admin.common.name": "Имя",
        "admin.common.email": "Эл. почта",
        "admin.common.expired_on": "Срок истёк {date}",
        "admin.roles.admin": "Админ",
        "admin.roles.lifetime_member": "Пожизненный участник",
        "admin.roles.regular_member": "Обычный участник",
        "admin.roles.spouse_member": "Супружеский участник",
        "admin.roles.student_member": "Студенческий участник",
        "admin.roles.non_member": "Не участник",
        "admin.roles.administrator": "Администратор",
        "admin.roles.developer": "Разработчик",
        "admin.roles.kss_joint_member": "Совместный участник KSS",
        "admin.roles.pending_student_application": "Подана заявка на студенческое членство"
    },
    "id": {
        "admin.menu.overview": "Ringkasan",
        "admin.menu.active_users": "Pengguna aktif",
        "admin.menu.traffic": "Analitik trafik",
        "admin.menu.members": "Anggota",
        "admin.common.checking_access": "Memeriksa apakah Anda memiliki akses administrator.",
        "admin.common.total": "Total",
        "admin.common.current_year": "Tahun ini",
        "admin.common.current_month": "Bulan ini",
        "admin.common.today": "Hari ini",
        "admin.common.daily": "Harian",
        "admin.common.monthly": "Bulanan",
        "admin.common.yearly": "Tahunan",
        "admin.common.search": "Cari",
        "admin.common.change": "Ubah",
        "admin.common.none": "Tidak ada",
        "admin.common.open": "Buka",
        "admin.common.membership": "Keanggotaan",
        "admin.common.membership_addon": "Add-on keanggotaan",
        "admin.common.pending_membership": "Keanggotaan tertunda",
        "admin.common.name": "Nama",
        "admin.common.email": "Email",
        "admin.common.expired_on": "Berakhir pada {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Anggota seumur hidup",
        "admin.roles.regular_member": "Anggota reguler",
        "admin.roles.spouse_member": "Anggota pasangan",
        "admin.roles.student_member": "Anggota mahasiswa",
        "admin.roles.non_member": "Bukan anggota",
        "admin.roles.administrator": "Administrator",
        "admin.roles.developer": "Pengembang",
        "admin.roles.kss_joint_member": "Anggota gabungan KSS",
        "admin.roles.pending_student_application": "Sudah mengajukan keanggotaan mahasiswa"
    },
    "vi": {
        "admin.menu.overview": "Tổng quan",
        "admin.menu.active_users": "Người dùng hoạt động",
        "admin.menu.traffic": "Phân tích lưu lượng",
        "admin.menu.members": "Hội viên",
        "admin.common.checking_access": "Đang kiểm tra quyền quản trị của bạn.",
        "admin.common.total": "Tổng",
        "admin.common.current_year": "Năm hiện tại",
        "admin.common.current_month": "Tháng hiện tại",
        "admin.common.today": "Hôm nay",
        "admin.common.daily": "Hàng ngày",
        "admin.common.monthly": "Hàng tháng",
        "admin.common.yearly": "Hàng năm",
        "admin.common.search": "Tìm kiếm",
        "admin.common.change": "Thay đổi",
        "admin.common.none": "Không có",
        "admin.common.open": "Mở",
        "admin.common.membership": "Hội viên",
        "admin.common.membership_addon": "Tiện ích bổ sung hội viên",
        "admin.common.pending_membership": "Hội viên đang chờ duyệt",
        "admin.common.name": "Tên",
        "admin.common.email": "Email",
        "admin.common.expired_on": "Hết hạn vào {date}",
        "admin.roles.admin": "Quản trị",
        "admin.roles.lifetime_member": "Hội viên trọn đời",
        "admin.roles.regular_member": "Hội viên thường",
        "admin.roles.spouse_member": "Hội viên vợ/chồng",
        "admin.roles.student_member": "Hội viên sinh viên",
        "admin.roles.non_member": "Không phải hội viên",
        "admin.roles.administrator": "Quản trị viên",
        "admin.roles.developer": "Nhà phát triển",
        "admin.roles.kss_joint_member": "Hội viên liên kết KSS",
        "admin.roles.pending_student_application": "Đã đăng ký hội viên sinh viên"
    },
    "th": {
        "admin.menu.overview": "ภาพรวม",
        "admin.menu.active_users": "ผู้ใช้ที่ใช้งานอยู่",
        "admin.menu.traffic": "การวิเคราะห์ทราฟฟิก",
        "admin.menu.members": "สมาชิก",
        "admin.common.checking_access": "กำลังตรวจสอบว่าคุณมีสิทธิ์ผู้ดูแลระบบหรือไม่",
        "admin.common.total": "รวม",
        "admin.common.current_year": "ปีปัจจุบัน",
        "admin.common.current_month": "เดือนปัจจุบัน",
        "admin.common.today": "วันนี้",
        "admin.common.daily": "รายวัน",
        "admin.common.monthly": "รายเดือน",
        "admin.common.yearly": "รายปี",
        "admin.common.search": "ค้นหา",
        "admin.common.change": "เปลี่ยน",
        "admin.common.none": "ไม่มี",
        "admin.common.open": "เปิด",
        "admin.common.membership": "สมาชิกภาพ",
        "admin.common.membership_addon": "ส่วนเสริมสมาชิกภาพ",
        "admin.common.pending_membership": "สมาชิกภาพที่รอดำเนินการ",
        "admin.common.name": "ชื่อ",
        "admin.common.email": "อีเมล",
        "admin.common.expired_on": "หมดอายุเมื่อ {date}",
        "admin.roles.admin": "แอดมิน",
        "admin.roles.lifetime_member": "สมาชิกตลอดชีพ",
        "admin.roles.regular_member": "สมาชิกสามัญ",
        "admin.roles.spouse_member": "สมาชิกคู่สมรส",
        "admin.roles.student_member": "สมาชิกนักศึกษา",
        "admin.roles.non_member": "ไม่ใช่สมาชิก",
        "admin.roles.administrator": "ผู้ดูแลระบบ",
        "admin.roles.developer": "นักพัฒนา",
        "admin.roles.kss_joint_member": "สมาชิกร่วม KSS",
        "admin.roles.pending_student_application": "อยู่ระหว่างสมัครสมาชิกนักศึกษา"
    },
    "ms": {
        "admin.menu.overview": "Gambaran keseluruhan",
        "admin.menu.active_users": "Pengguna aktif",
        "admin.menu.traffic": "Analitik trafik",
        "admin.menu.members": "Ahli",
        "admin.common.checking_access": "Sedang menyemak sama ada anda mempunyai akses pentadbir.",
        "admin.common.total": "Jumlah",
        "admin.common.current_year": "Tahun semasa",
        "admin.common.current_month": "Bulan semasa",
        "admin.common.today": "Hari ini",
        "admin.common.daily": "Harian",
        "admin.common.monthly": "Bulanan",
        "admin.common.yearly": "Tahunan",
        "admin.common.search": "Cari",
        "admin.common.change": "Ubah",
        "admin.common.none": "Tiada",
        "admin.common.open": "Buka",
        "admin.common.membership": "Keahlian",
        "admin.common.membership_addon": "Tambahan keahlian",
        "admin.common.pending_membership": "Keahlian tertunda",
        "admin.common.name": "Nama",
        "admin.common.email": "E-mel",
        "admin.common.expired_on": "Tamat pada {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Ahli seumur hidup",
        "admin.roles.regular_member": "Ahli biasa",
        "admin.roles.spouse_member": "Ahli pasangan",
        "admin.roles.student_member": "Ahli pelajar",
        "admin.roles.non_member": "Bukan ahli",
        "admin.roles.administrator": "Pentadbir",
        "admin.roles.developer": "Pembangun",
        "admin.roles.kss_joint_member": "Ahli bersama KSS",
        "admin.roles.pending_student_application": "Permohonan ahli pelajar dihantar"
    },
    "fil": {
        "admin.menu.overview": "Pangkalahatang-ideya",
        "admin.menu.active_users": "Mga aktibong user",
        "admin.menu.traffic": "Analytics ng trapiko",
        "admin.menu.members": "Mga miyembro",
        "admin.common.checking_access": "Sinusuri kung mayroon kang access bilang administrator.",
        "admin.common.total": "Kabuuan",
        "admin.common.current_year": "Kasalukuyang taon",
        "admin.common.current_month": "Kasalukuyang buwan",
        "admin.common.today": "Ngayon",
        "admin.common.daily": "Araw-araw",
        "admin.common.monthly": "Buwan-buwan",
        "admin.common.yearly": "Taun-taon",
        "admin.common.search": "Hanapin",
        "admin.common.change": "Palitan",
        "admin.common.none": "Wala",
        "admin.common.open": "Buksan",
        "admin.common.membership": "Membership",
        "admin.common.membership_addon": "Add-on sa membership",
        "admin.common.pending_membership": "Nakabinbing membership",
        "admin.common.name": "Pangalan",
        "admin.common.email": "Email",
        "admin.common.expired_on": "Nag-expire noong {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Panghabambuhay na miyembro",
        "admin.roles.regular_member": "Regular na miyembro",
        "admin.roles.spouse_member": "Miyembrong asawa",
        "admin.roles.student_member": "Miyembrong estudyante",
        "admin.roles.non_member": "Hindi miyembro",
        "admin.roles.administrator": "Administrator",
        "admin.roles.developer": "Developer",
        "admin.roles.kss_joint_member": "Pinagsamang miyembro ng KSS",
        "admin.roles.pending_student_application": "Nag-apply para sa student membership"
    },
    "hi": {
        "admin.menu.overview": "अवलोकन",
        "admin.menu.active_users": "सक्रिय उपयोगकर्ता",
        "admin.menu.traffic": "ट्रैफिक विश्लेषण",
        "admin.menu.members": "सदस्य",
        "admin.common.checking_access": "जाँचा जा रहा है कि आपके पास प्रशासक पहुँच है या नहीं।",
        "admin.common.total": "कुल",
        "admin.common.current_year": "चालू वर्ष",
        "admin.common.current_month": "चालू माह",
        "admin.common.today": "आज",
        "admin.common.daily": "दैनिक",
        "admin.common.monthly": "मासिक",
        "admin.common.yearly": "वार्षिक",
        "admin.common.search": "खोजें",
        "admin.common.change": "बदलें",
        "admin.common.none": "कोई नहीं",
        "admin.common.open": "खोलें",
        "admin.common.membership": "सदस्यता",
        "admin.common.membership_addon": "सदस्यता ऐड-ऑन",
        "admin.common.pending_membership": "लंबित सदस्यता",
        "admin.common.name": "नाम",
        "admin.common.email": "ईमेल",
        "admin.common.expired_on": "{date} को समाप्त",
        "admin.roles.admin": "एडमिन",
        "admin.roles.lifetime_member": "आजीवन सदस्य",
        "admin.roles.regular_member": "नियमित सदस्य",
        "admin.roles.spouse_member": "जीवनसाथी सदस्य",
        "admin.roles.student_member": "छात्र सदस्य",
        "admin.roles.non_member": "गैर-सदस्य",
        "admin.roles.administrator": "प्रशासक",
        "admin.roles.developer": "डेवलपर",
        "admin.roles.kss_joint_member": "KSS संयुक्त सदस्य",
        "admin.roles.pending_student_application": "छात्र सदस्यता के लिए आवेदन किया है"
    },
    "ar": {
        "admin.menu.overview": "نظرة عامة",
        "admin.menu.active_users": "المستخدمون النشطون",
        "admin.menu.traffic": "تحليلات الزيارات",
        "admin.menu.members": "الأعضاء",
        "admin.common.checking_access": "جارٍ التحقق من امتلاكك صلاحية المسؤول.",
        "admin.common.total": "الإجمالي",
        "admin.common.current_year": "السنة الحالية",
        "admin.common.current_month": "الشهر الحالي",
        "admin.common.today": "اليوم",
        "admin.common.daily": "يومي",
        "admin.common.monthly": "شهري",
        "admin.common.yearly": "سنوي",
        "admin.common.search": "بحث",
        "admin.common.change": "تغيير",
        "admin.common.none": "لا يوجد",
        "admin.common.open": "فتح",
        "admin.common.membership": "العضوية",
        "admin.common.membership_addon": "إضافة العضوية",
        "admin.common.pending_membership": "عضوية معلقة",
        "admin.common.name": "الاسم",
        "admin.common.email": "البريد الإلكتروني",
        "admin.common.expired_on": "انتهت في {date}",
        "admin.roles.admin": "مشرف",
        "admin.roles.lifetime_member": "عضو مدى الحياة",
        "admin.roles.regular_member": "عضو عادي",
        "admin.roles.spouse_member": "عضو الزوج/الزوجة",
        "admin.roles.student_member": "عضو طالب",
        "admin.roles.non_member": "غير عضو",
        "admin.roles.administrator": "مسؤول",
        "admin.roles.developer": "مطوّر",
        "admin.roles.kss_joint_member": "عضو مشترك في KSS",
        "admin.roles.pending_student_application": "تم التقدم لعضوية الطالب"
    },
    "it": {
        "admin.menu.overview": "Panoramica",
        "admin.menu.active_users": "Utenti attivi",
        "admin.menu.traffic": "Analisi del traffico",
        "admin.menu.members": "Membri",
        "admin.common.checking_access": "Verifica dei permessi di amministratore in corso.",
        "admin.common.total": "Totale",
        "admin.common.current_year": "Anno corrente",
        "admin.common.current_month": "Mese corrente",
        "admin.common.today": "Oggi",
        "admin.common.daily": "Giornaliero",
        "admin.common.monthly": "Mensile",
        "admin.common.yearly": "Annuale",
        "admin.common.search": "Cerca",
        "admin.common.change": "Cambia",
        "admin.common.none": "Nessuno",
        "admin.common.open": "Apri",
        "admin.common.membership": "Iscrizione",
        "admin.common.membership_addon": "Componente aggiuntivo iscrizione",
        "admin.common.pending_membership": "Iscrizione in attesa",
        "admin.common.name": "Nome",
        "admin.common.email": "E-mail",
        "admin.common.expired_on": "Scaduto il {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Membro a vita",
        "admin.roles.regular_member": "Membro regolare",
        "admin.roles.spouse_member": "Membro coniuge",
        "admin.roles.student_member": "Membro studente",
        "admin.roles.non_member": "Non membro",
        "admin.roles.administrator": "Amministratore",
        "admin.roles.developer": "Sviluppatore",
        "admin.roles.kss_joint_member": "Membro congiunto KSS",
        "admin.roles.pending_student_application": "Ha richiesto l'iscrizione studente"
    },
    "nl": {
        "admin.menu.overview": "Overzicht",
        "admin.menu.active_users": "Actieve gebruikers",
        "admin.menu.traffic": "Verkeersanalyse",
        "admin.menu.members": "Leden",
        "admin.common.checking_access": "Bezig met controleren of u beheerdersrechten heeft.",
        "admin.common.total": "Totaal",
        "admin.common.current_year": "Huidig jaar",
        "admin.common.current_month": "Huidige maand",
        "admin.common.today": "Vandaag",
        "admin.common.daily": "Dagelijks",
        "admin.common.monthly": "Maandelijks",
        "admin.common.yearly": "Jaarlijks",
        "admin.common.search": "Zoeken",
        "admin.common.change": "Wijzigen",
        "admin.common.none": "Geen",
        "admin.common.open": "Openen",
        "admin.common.membership": "Lidmaatschap",
        "admin.common.membership_addon": "Lidmaatschap-add-on",
        "admin.common.pending_membership": "Lidmaatschap in behandeling",
        "admin.common.name": "Naam",
        "admin.common.email": "E-mail",
        "admin.common.expired_on": "Verlopen op {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Levenslang lid",
        "admin.roles.regular_member": "Regulier lid",
        "admin.roles.spouse_member": "Partnerlid",
        "admin.roles.student_member": "Studentlid",
        "admin.roles.non_member": "Geen lid",
        "admin.roles.administrator": "Beheerder",
        "admin.roles.developer": "Ontwikkelaar",
        "admin.roles.kss_joint_member": "Gezamenlijk KSS-lid",
        "admin.roles.pending_student_application": "Studentlidmaatschap aangevraagd"
    },
    "pl": {
        "admin.menu.overview": "Przegląd",
        "admin.menu.active_users": "Aktywni użytkownicy",
        "admin.menu.traffic": "Analityka ruchu",
        "admin.menu.members": "Członkowie",
        "admin.common.checking_access": "Sprawdzanie, czy masz uprawnienia administratora.",
        "admin.common.total": "Łącznie",
        "admin.common.current_year": "Bieżący rok",
        "admin.common.current_month": "Bieżący miesiąc",
        "admin.common.today": "Dzisiaj",
        "admin.common.daily": "Dziennie",
        "admin.common.monthly": "Miesięcznie",
        "admin.common.yearly": "Rocznie",
        "admin.common.search": "Szukaj",
        "admin.common.change": "Zmień",
        "admin.common.none": "Brak",
        "admin.common.open": "Otwórz",
        "admin.common.membership": "Członkostwo",
        "admin.common.membership_addon": "Dodatek do członkostwa",
        "admin.common.pending_membership": "Oczekujące członkostwo",
        "admin.common.name": "Imię i nazwisko",
        "admin.common.email": "E-mail",
        "admin.common.expired_on": "Wygasło {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Członek dożywotni",
        "admin.roles.regular_member": "Członek zwyczajny",
        "admin.roles.spouse_member": "Członek małżonek",
        "admin.roles.student_member": "Członek student",
        "admin.roles.non_member": "Osoba niebędąca członkiem",
        "admin.roles.administrator": "Administrator",
        "admin.roles.developer": "Deweloper",
        "admin.roles.kss_joint_member": "Wspólny członek KSS",
        "admin.roles.pending_student_application": "Złożono wniosek o członkostwo studenckie"
    },
    "sv": {
        "admin.menu.overview": "Översikt",
        "admin.menu.active_users": "Aktiva användare",
        "admin.menu.traffic": "Trafikanalys",
        "admin.menu.members": "Medlemmar",
        "admin.common.checking_access": "Kontrollerar om du har administratörsåtkomst.",
        "admin.common.total": "Totalt",
        "admin.common.current_year": "Innevarande år",
        "admin.common.current_month": "Innevarande månad",
        "admin.common.today": "Idag",
        "admin.common.daily": "Daglig",
        "admin.common.monthly": "Månadsvis",
        "admin.common.yearly": "Årlig",
        "admin.common.search": "Sök",
        "admin.common.change": "Ändra",
        "admin.common.none": "Ingen",
        "admin.common.open": "Öppna",
        "admin.common.membership": "Medlemskap",
        "admin.common.membership_addon": "Tillägg till medlemskap",
        "admin.common.pending_membership": "Väntande medlemskap",
        "admin.common.name": "Namn",
        "admin.common.email": "E-post",
        "admin.common.expired_on": "Gick ut {date}",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Livstidsmedlem",
        "admin.roles.regular_member": "Ordinarie medlem",
        "admin.roles.spouse_member": "Partnermedlem",
        "admin.roles.student_member": "Studentmedlem",
        "admin.roles.non_member": "Icke-medlem",
        "admin.roles.administrator": "Administratör",
        "admin.roles.developer": "Utvecklare",
        "admin.roles.kss_joint_member": "Gemensam KSS-medlem",
        "admin.roles.pending_student_application": "Ansökt om studentmedlemskap"
    },
    "tr": {
        "admin.menu.overview": "Genel Bakış",
        "admin.menu.active_users": "Aktif Kullanıcılar",
        "admin.menu.traffic": "Trafik Analitiği",
        "admin.menu.members": "Üyeler",
        "admin.common.checking_access": "Yönetici erişiminizin olup olmadığı kontrol ediliyor.",
        "admin.common.total": "Toplam",
        "admin.common.current_year": "İçinde bulunulan yıl",
        "admin.common.current_month": "İçinde bulunulan ay",
        "admin.common.today": "Bugün",
        "admin.common.daily": "Günlük",
        "admin.common.monthly": "Aylık",
        "admin.common.yearly": "Yıllık",
        "admin.common.search": "Ara",
        "admin.common.change": "Değiştir",
        "admin.common.none": "Yok",
        "admin.common.open": "Aç",
        "admin.common.membership": "Üyelik",
        "admin.common.membership_addon": "Üyelik eklentisi",
        "admin.common.pending_membership": "Bekleyen üyelik",
        "admin.common.name": "Ad",
        "admin.common.email": "E-posta",
        "admin.common.expired_on": "{date} tarihinde sona erdi",
        "admin.roles.admin": "Admin",
        "admin.roles.lifetime_member": "Ömür boyu üye",
        "admin.roles.regular_member": "Düzenli üye",
        "admin.roles.spouse_member": "Eş üye",
        "admin.roles.student_member": "Öğrenci üye",
        "admin.roles.non_member": "Üye olmayan",
        "admin.roles.administrator": "Yönetici",
        "admin.roles.developer": "Geliştirici",
        "admin.roles.kss_joint_member": "KSS ortak üye",
        "admin.roles.pending_student_application": "Öğrenci üyeliğine başvurdu"
    },
    "uk": {
        "admin.menu.overview": "Огляд",
        "admin.menu.active_users": "Активні користувачі",
        "admin.menu.traffic": "Аналітика трафіку",
        "admin.menu.members": "Учасники",
        "admin.common.checking_access": "Перевіряємо, чи маєте ви права адміністратора.",
        "admin.common.total": "Усього",
        "admin.common.current_year": "Поточний рік",
        "admin.common.current_month": "Поточний місяць",
        "admin.common.today": "Сьогодні",
        "admin.common.daily": "Щодня",
        "admin.common.monthly": "Щомісяця",
        "admin.common.yearly": "Щороку",
        "admin.common.search": "Пошук",
        "admin.common.change": "Змінити",
        "admin.common.none": "Немає",
        "admin.common.open": "Відкрити",
        "admin.common.membership": "Членство",
        "admin.common.membership_addon": "Додаток до членства",
        "admin.common.pending_membership": "Членство в очікуванні",
        "admin.common.name": "Ім'я",
        "admin.common.email": "Е-пошта",
        "admin.common.expired_on": "Закінчилося {date}",
        "admin.roles.admin": "Адмін",
        "admin.roles.lifetime_member": "Довічний учасник",
        "admin.roles.regular_member": "Звичайний учасник",
        "admin.roles.spouse_member": "Учасник-подружжя",
        "admin.roles.student_member": "Студентський учасник",
        "admin.roles.non_member": "Не учасник",
        "admin.roles.administrator": "Адміністратор",
        "admin.roles.developer": "Розробник",
        "admin.roles.kss_joint_member": "Спільний учасник KSS",
        "admin.roles.pending_student_application": "Подано заявку на студентське членство"
    }
};

const roleKeyMap = {
    'Lifetime Member': 'admin.roles.lifetime_member',
    'Regular Member': 'admin.roles.regular_member',
    'Spouse Member': 'admin.roles.spouse_member',
    'Student Member': 'admin.roles.student_member',
    'Non-member': 'admin.roles.non_member',
    'Administrator': 'admin.roles.administrator',
    'Developer': 'admin.roles.developer',
    'KSS Joint Member': 'admin.roles.kss_joint_member'
};

function resolveLangCode(code){
    if (base.resolveLangCode) {
        return base.resolveLangCode(code);
    }
    if (!code) return 'en';
    const c = String(code).trim();
    const lower = c.toLowerCase();
    if (c === 'zh' || lower.startsWith('zh-')) {
        if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) {
            return 'zh-Hant';
        }
        return 'zh-Hans';
    }
    if (c === 'tl' || lower.startsWith('tl-') || c === 'fil' || lower.startsWith('fil-')) return 'fil';
    if (c === 'pt' || lower.startsWith('pt-')) return 'pt-BR';
    if (lower.startsWith('en-')) return 'en';
    if (lower.startsWith('ja-')) return 'ja';
    if (lower.startsWith('ko-')) return 'ko';
    return c;
}

function isRTL(lang){
    if (base.isRTL) {
        return base.isRTL(lang);
    }
    return lang === 'ar';
}

function applyLangToDocument(lang){
    if (base.applyLangToDocument) {
        base.applyLangToDocument(lang);
        return;
    }
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');
}

function getLang(){
    const saved = localStorage.getItem(LANG_KEY);
    const browser = navigator.language || 'en';
    const initial = resolveLangCode(saved || browser);
    const best = languages.find(l => l.code === initial)
        || languages.find(l => initial.startsWith(l.code))
        || languages.find(l => l.code.startsWith(initial.split('-')[0]))
        || languages[0];
    return best ? best.code : 'en';
}

function formatText(text, params){
    if (!params) return text;
    return String(text).replace(/\{(\w+)\}/g, function(match, key){
        return Object.prototype.hasOwnProperty.call(params, key) ? params[key] : match;
    });
}

function ensureCoverage(dict){
    const copied = Object.assign({}, dict || {});
    const en = copied.en || {};
    const ko = copied.ko || {};
    const referenceKeys = Array.from(new Set(Object.keys(en).concat(Object.keys(ko))));

    languages.forEach(function(language){
        if (!copied[language.code]) {
            copied[language.code] = {};
        }
        referenceKeys.forEach(function(key){
            if (copied[language.code][key] == null || copied[language.code][key] === '') {
                copied[language.code][key] = (en[key] != null && en[key] !== '')
                    ? en[key]
                    : ((ko[key] != null && ko[key] !== '') ? ko[key] : key);
            }
        });
    });

    return copied;
}

function register(name, dict){
    bundles[name] = ensureCoverage(dict);
    if (!bundleOrder.includes(name)) {
        bundleOrder.push(name);
    }
}

function lookup(key, lang){
    const currentLang = lang || getLang();
    const orderedBundles = ['common'].concat(bundleOrder.filter(name => name !== 'common'));

    for (let i = 0; i < orderedBundles.length; i += 1) {
        const bundle = bundles[orderedBundles[i]] || {};
        if (bundle[currentLang] && bundle[currentLang][key] != null && bundle[currentLang][key] !== '') {
            return bundle[currentLang][key];
        }
        if (bundle.en && bundle.en[key] != null && bundle.en[key] !== '') {
            return bundle.en[key];
        }
        if (bundle.ko && bundle.ko[key] != null && bundle.ko[key] !== '') {
            return bundle.ko[key];
        }
    }

    return key;
}

function t(key, params, lang){
    return formatText(lookup(key, lang), params);
}

function roleLabel(role, lang){
    const mapKey = roleKeyMap[role];
    if (!mapKey) {
        return role;
    }
    return t(mapKey, null, lang);
}

function init(){
    const lang = getLang();
    applyLangToDocument(lang);
    return lang;
}

register('common', commonDict);
init();

window.StatKISS_ADMIN_I18N = {
    LANG_KEY,
    languages,
    bundles,
    register,
    t,
    lookup,
    roleLabel,
    getLang,
    init,
    resolveLangCode,
    applyLangToDocument,
    isRTL
};
window.admin_t = function(key, params){ return window.StatKISS_ADMIN_I18N.t(key, params); };
window.admin_role_label = function(role){ return window.StatKISS_ADMIN_I18N.roleLabel(role); };
})();

// Integrated admin common shell/menu/components (20260323_1010)
function Div_card(props) {
    const value = (props && props.count != null) ? props.count : 0
    return (
        <div class="flex flex-col justify-center items-center w-full border border-gray-300 shadow p-4 bg-white rounded-lg">
            <p class="text-md font-[600]">{props.title}</p>
            <p class="text-sm font-[400]">{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
        </div>
    )
}

function Div_graph_skeleton() {
    return (
        <div class="w-full p-4 rounded animate-pulse md:p-6">
            <div class="flex items-baseline mt-4 space-x-6">
                <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
                <div class="w-full h-56 bg-gray-200 rounded-t-lg"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
                <div class="w-full h-64 bg-gray-200 rounded-t-lg"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-80"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-72"></div>
                <div class="w-full bg-gray-200 rounded-t-lg h-80"></div>
            </div>
        </div>
    )
}

function admin_get_supported_lang_codes() {
    const source = (window.StatKISS_I18N && Array.isArray(window.StatKISS_I18N.languages) && window.StatKISS_I18N.languages.length)
        ? window.StatKISS_I18N.languages
        : ((window.StatKISS_ADMIN_I18N && Array.isArray(window.StatKISS_ADMIN_I18N.languages) && window.StatKISS_ADMIN_I18N.languages.length)
            ? window.StatKISS_ADMIN_I18N.languages
            : []);
    return source.map(function(item){ return item.code; });
}

function admin_get_path_lang() {
    const supported = admin_get_supported_lang_codes();
    const parts = String(window.location.pathname || '').split('/').filter(Boolean);
    if (parts.length && supported.includes(parts[0])) {
        return parts[0];
    }
    return '';
}

function admin_get_current_lang() {
    const pathLang = admin_get_path_lang();
    if (pathLang) return pathLang;

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang) {
        return window.StatKISS_ADMIN_I18N.resolveLangCode(htmlLang);
    }

    return window.StatKISS_ADMIN_I18N.getLang();
}

function admin_get_locale_prefix() {
    const lang = admin_get_current_lang();
    return lang ? '/' + lang : '';
}

function admin_build_url(path) {
    const rawPath = String(path || '').trim();
    if (!rawPath) return rawPath;
    if (/^(https?:|mailto:|tel:|javascript:|#)/i.test(rawPath)) return rawPath;

    const normalizedPath = rawPath.startsWith('/') ? rawPath : '/' + rawPath;
    const supported = admin_get_supported_lang_codes();
    const parts = normalizedPath.split('/').filter(Boolean);

    if (parts.length && supported.includes(parts[0])) {
        return normalizedPath;
    }

    return admin_get_locale_prefix() + normalizedPath;
}

function admin_section_href(section) {
    const routeMap = {
        'overview': '/admin/overview/',
        'active-users': '/admin/active-users/',
        'traffic': '/admin/traffic/',
        'members': '/admin/members/'
    };
    return admin_build_url(routeMap[section] || '/admin/overview/');
}

window.admin_build_url = admin_build_url;
window.admin_section_href = admin_section_href;

function Div_admin_menu(props) {
    const activeSection = (props && props.activeSection) || window.gv_admin_section || 'overview';
    const items = [
        { key: 'overview', labelKey: 'admin.menu.overview' },
        { key: 'active-users', labelKey: 'admin.menu.active_users' },
        { key: 'traffic', labelKey: 'admin.menu.traffic' },
        { key: 'members', labelKey: 'admin.menu.members' }
    ];

    function Div_menu_button(buttonProps) {
        const item = buttonProps.item;
        const isActive = item.key === activeSection;
        const outerClass = isActive
            ? 'relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 shadow'
            : 'relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200';
        const innerClass = isActive
            ? 'relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent rounded-md'
            : 'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0';

        return (
            <button class={outerClass}
                    onClick={() => location.href = admin_section_href(item.key)}>
                <span class={innerClass}>
                    {admin_t(item.labelKey)}
                </span>
            </button>
        );
    }

    return (
        <div class="flex flex-wrap justify-center items-center w-full">
            {items.map(item => <Div_menu_button key={item.key} item={item} />)}
        </div>
    );
}

function Div_admin_loading() {
    return (
        <div class="flex flex-col w-full max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24 space-y-4">
            <div class="w-full" id="div_admin_menu"></div>
            <div class="flex flex-col justify-center items-center text-center" id="div_content">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <p class="mt-4 text-gray-700">
                    {admin_t('admin.common.checking_access')}
                </p>
            </div>
        </div>
    )
}

async function render_admin_shell(sectionKey, renderContent) {
    if (window.StatKISS_ADMIN_I18N) {
        window.StatKISS_ADMIN_I18N.init();
    }

    ReactDOM.render(<Div_admin_loading />, document.getElementById('div_main'))

    const data = await fetch('/ajax_get_menu_header/')
        .then(res => res.json())
        .then(res => res)

    window.gv_role = data && data.name ? data.name : ''

    const username = (typeof window.gv_username === 'string') ? window.gv_username : ''
    const isAllowed = !!(username !== '' && data && (data.role == 'Administrator' || data.role == 'Developer' || data.officer != 'Member'))

    if (isAllowed) {
        window.gv_admin_section = sectionKey
        ReactDOM.render(<Div_admin_menu activeSection={sectionKey} />, document.getElementById('div_admin_menu'))
        renderContent()
    } else {
        location.href = '/'
    }
}
