(function() {
    'use strict';

    const LANG_KEY = (window.StatKISS_I18N && window.StatKISS_I18N.LANG_KEY) || 'statkiss_lang';
    const languages = (
        window.StatKISS_I18N &&
        Array.isArray(window.StatKISS_I18N.languages) &&
        window.StatKISS_I18N.languages.length
    ) ? window.StatKISS_I18N.languages : [
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

    const UI_KEYS = [
  "awards.title.career",
  "awards.desc.career",
  "awards.title.student",
  "awards.desc.student",
  "awards.manage.add_awardee",
  "awards.form.year",
  "awards.form.year_placeholder",
  "awards.form.name",
  "awards.form.name_placeholder",
  "awards.form.affiliation",
  "awards.form.affiliation_placeholder",
  "awards.action.submit",
  "awards.action.submitting",
  "awards.list.year_awardees",
  "awards.alert.enter_year",
  "awards.alert.enter_name",
  "awards.alert.enter_affiliation",
  "awards.alert.add_failed",
  "awards.alert.delete_confirm",
  "awards.alert.delete_failed",
  "awards.alert.load_failed"
];

    const dict = {
  "en": {
    "awards.title.career": "KISS Career Development Award",
    "awards.desc.career": "The KISS Career Development Awards recognize statisticians in the early stages of their careers who have demonstrated outstanding productivity and the potential to make significant contributions to the field of statistics. The awards are presented at the KISS Career Development Workshop during the JSM meeting each year.",
    "awards.title.student": "KISS Outstanding Student Paper Award",
    "awards.desc.student": "The KISS Outstanding Student Paper Awards support students traveling to JSM to present their papers. The awards are presented at the KISS Annual Meeting during JSM every other year.",
    "awards.manage.add_awardee": "Add Awardee",
    "awards.form.year": "Award Year",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Name",
    "awards.form.name_placeholder": "Awardee Name",
    "awards.form.affiliation": "Affiliation",
    "awards.form.affiliation_placeholder": "Affiliation",
    "awards.action.submit": "Submit",
    "awards.action.submitting": "Submitting...",
    "awards.list.year_awardees": "{year} Awardees",
    "awards.alert.enter_year": "Please enter the award year.",
    "awards.alert.enter_name": "Please enter the awardee's name.",
    "awards.alert.enter_affiliation": "Please enter the awardee's affiliation.",
    "awards.alert.add_failed": "Failed to add the awardee.",
    "awards.alert.delete_confirm": "Are you sure you want to delete this awardee?",
    "awards.alert.delete_failed": "Failed to delete the awardee.",
    "awards.alert.load_failed": "Failed to load the awardees list."
  },
  "ko": {
    "awards.title.career": "KISS 커리어 개발상",
    "awards.desc.career": "KISS 커리어 개발상은 경력 초기 단계에 있으면서 뛰어난 연구 생산성과 통계학 분야에 크게 기여할 잠재력을 보여 준 통계학자를 기리기 위한 상입니다. 이 상은 매년 JSM 기간 중 열리는 KISS Career Development Workshop에서 수여됩니다.",
    "awards.title.student": "KISS 우수 학생 논문상",
    "awards.desc.student": "KISS 우수 학생 논문상은 학생들이 JSM에 참가하여 논문을 발표할 수 있도록 지원하기 위한 상입니다. 이 상은 격년으로 JSM 기간 중 열리는 KISS Annual Meeting에서 수여됩니다.",
    "awards.manage.add_awardee": "수상자 추가",
    "awards.form.year": "수상 연도",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "이름",
    "awards.form.name_placeholder": "수상자 이름",
    "awards.form.affiliation": "소속",
    "awards.form.affiliation_placeholder": "소속",
    "awards.action.submit": "등록",
    "awards.action.submitting": "등록 중...",
    "awards.list.year_awardees": "{year}년 수상자",
    "awards.alert.enter_year": "수상 연도를 입력해 주세요.",
    "awards.alert.enter_name": "수상자 이름을 입력해 주세요.",
    "awards.alert.enter_affiliation": "수상자 소속을 입력해 주세요.",
    "awards.alert.add_failed": "수상자 추가에 실패했습니다.",
    "awards.alert.delete_confirm": "이 수상자를 삭제하시겠습니까?",
    "awards.alert.delete_failed": "수상자 삭제에 실패했습니다.",
    "awards.alert.load_failed": "수상자 목록을 불러오지 못했습니다."
  },
  "ja": {
    "awards.title.career": "KISS キャリア開発賞",
    "awards.desc.career": "KISS キャリア開発賞は、キャリア初期にありながら優れた研究成果を示し、統計学分野に大きく貢献する可能性を持つ統計学者を顕彰する賞です。この賞は毎年 JSM 期間中に開催される KISS Career Development Workshop で授与されます。",
    "awards.title.student": "KISS 優秀学生論文賞",
    "awards.desc.student": "KISS 優秀学生論文賞は、学生が JSM に参加して論文発表を行えるよう支援するための賞です。この賞は隔年で JSM 期間中の KISS Annual Meeting にて授与されます。",
    "awards.manage.add_awardee": "受賞者を追加",
    "awards.form.year": "受賞年",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "氏名",
    "awards.form.name_placeholder": "受賞者名",
    "awards.form.affiliation": "所属",
    "awards.form.affiliation_placeholder": "所属",
    "awards.action.submit": "登録",
    "awards.action.submitting": "登録中...",
    "awards.list.year_awardees": "{year}年 受賞者",
    "awards.alert.enter_year": "受賞年を入力してください。",
    "awards.alert.enter_name": "受賞者の氏名を入力してください。",
    "awards.alert.enter_affiliation": "受賞者の所属を入力してください。",
    "awards.alert.add_failed": "受賞者の追加に失敗しました。",
    "awards.alert.delete_confirm": "この受賞者を削除してもよろしいですか？",
    "awards.alert.delete_failed": "受賞者の削除に失敗しました。",
    "awards.alert.load_failed": "受賞者一覧の読み込みに失敗しました。"
  },
  "zh-Hans": {
    "awards.title.career": "KISS 职业发展奖",
    "awards.desc.career": "KISS 职业发展奖旨在表彰处于职业生涯早期、已展现出卓越学术产出，并有潜力为统计学领域作出重大贡献的统计学家。该奖项每年在 JSM 期间举行的 KISS Career Development Workshop 上颁发。",
    "awards.title.student": "KISS 优秀学生论文奖",
    "awards.desc.student": "KISS 优秀学生论文奖旨在支持学生前往 JSM 展示其论文。该奖项每隔一年在 JSM 期间举行的 KISS Annual Meeting 上颁发。",
    "awards.manage.add_awardee": "添加获奖者",
    "awards.form.year": "获奖年份",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "姓名",
    "awards.form.name_placeholder": "获奖者姓名",
    "awards.form.affiliation": "单位",
    "awards.form.affiliation_placeholder": "单位",
    "awards.action.submit": "提交",
    "awards.action.submitting": "提交中...",
    "awards.list.year_awardees": "{year} 年获奖者",
    "awards.alert.enter_year": "请输入获奖年份。",
    "awards.alert.enter_name": "请输入获奖者姓名。",
    "awards.alert.enter_affiliation": "请输入获奖者单位。",
    "awards.alert.add_failed": "添加获奖者失败。",
    "awards.alert.delete_confirm": "确定要删除这位获奖者吗？",
    "awards.alert.delete_failed": "删除获奖者失败。",
    "awards.alert.load_failed": "加载获奖者列表失败。"
  },
  "zh-Hant": {
    "awards.title.career": "KISS 職涯發展獎",
    "awards.desc.career": "KISS 職涯發展獎旨在表彰處於職涯初期、已展現優秀研究產出，且有潛力為統計學領域作出重大貢獻的統計學者。此獎項每年於 JSM 期間舉行的 KISS Career Development Workshop 頒發。",
    "awards.title.student": "KISS 優秀學生論文獎",
    "awards.desc.student": "KISS 優秀學生論文獎旨在支持學生前往 JSM 發表論文。此獎項每隔一年於 JSM 期間舉行的 KISS Annual Meeting 頒發。",
    "awards.manage.add_awardee": "新增得獎者",
    "awards.form.year": "得獎年份",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "姓名",
    "awards.form.name_placeholder": "得獎者姓名",
    "awards.form.affiliation": "所屬單位",
    "awards.form.affiliation_placeholder": "所屬單位",
    "awards.action.submit": "送出",
    "awards.action.submitting": "送出中...",
    "awards.list.year_awardees": "{year} 年得獎者",
    "awards.alert.enter_year": "請輸入得獎年份。",
    "awards.alert.enter_name": "請輸入得獎者姓名。",
    "awards.alert.enter_affiliation": "請輸入得獎者所屬單位。",
    "awards.alert.add_failed": "新增得獎者失敗。",
    "awards.alert.delete_confirm": "確定要刪除這位得獎者嗎？",
    "awards.alert.delete_failed": "刪除得獎者失敗。",
    "awards.alert.load_failed": "載入得獎者清單失敗。"
  },
  "es": {
    "awards.title.career": "Premio KISS al Desarrollo Profesional",
    "awards.desc.career": "Los Premios KISS al Desarrollo Profesional reconocen a estadísticos en las primeras etapas de su carrera que han demostrado una productividad sobresaliente y el potencial de realizar contribuciones significativas al campo de la estadística. Los premios se entregan cada año en el KISS Career Development Workshop durante la reunión de JSM.",
    "awards.title.student": "Premio KISS al Mejor Artículo Estudiantil",
    "awards.desc.student": "Los Premios KISS al Mejor Artículo Estudiantil apoyan a estudiantes que viajan a JSM para presentar sus trabajos. Los premios se entregan cada dos años en la KISS Annual Meeting durante JSM.",
    "awards.manage.add_awardee": "Agregar galardonado",
    "awards.form.year": "Año del premio",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Nombre",
    "awards.form.name_placeholder": "Nombre del galardonado",
    "awards.form.affiliation": "Afiliación",
    "awards.form.affiliation_placeholder": "Afiliación",
    "awards.action.submit": "Enviar",
    "awards.action.submitting": "Enviando...",
    "awards.list.year_awardees": "Galardonados de {year}",
    "awards.alert.enter_year": "Ingrese el año del premio.",
    "awards.alert.enter_name": "Ingrese el nombre del galardonado.",
    "awards.alert.enter_affiliation": "Ingrese la afiliación del galardonado.",
    "awards.alert.add_failed": "No se pudo agregar al galardonado.",
    "awards.alert.delete_confirm": "¿Está seguro de que desea eliminar a este galardonado?",
    "awards.alert.delete_failed": "No se pudo eliminar al galardonado.",
    "awards.alert.load_failed": "No se pudo cargar la lista de galardonados."
  },
  "fr": {
    "awards.title.career": "Prix KISS de développement de carrière",
    "awards.desc.career": "Les Prix KISS de développement de carrière récompensent des statisticiens en début de carrière ayant démontré une productivité remarquable et le potentiel d’apporter des contributions majeures au domaine de la statistique. Les prix sont remis chaque année lors du KISS Career Development Workshop pendant la réunion JSM.",
    "awards.title.student": "Prix KISS du meilleur article étudiant",
    "awards.desc.student": "Les Prix KISS du meilleur article étudiant soutiennent les étudiants se rendant au JSM pour présenter leurs travaux. Les prix sont remis tous les deux ans lors de la KISS Annual Meeting pendant le JSM.",
    "awards.manage.add_awardee": "Ajouter un lauréat",
    "awards.form.year": "Année du prix",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Nom",
    "awards.form.name_placeholder": "Nom du lauréat",
    "awards.form.affiliation": "Affiliation",
    "awards.form.affiliation_placeholder": "Affiliation",
    "awards.action.submit": "Envoyer",
    "awards.action.submitting": "Envoi en cours...",
    "awards.list.year_awardees": "Lauréats {year}",
    "awards.alert.enter_year": "Veuillez saisir l’année du prix.",
    "awards.alert.enter_name": "Veuillez saisir le nom du lauréat.",
    "awards.alert.enter_affiliation": "Veuillez saisir l’affiliation du lauréat.",
    "awards.alert.add_failed": "Échec de l’ajout du lauréat.",
    "awards.alert.delete_confirm": "Voulez-vous vraiment supprimer ce lauréat ?",
    "awards.alert.delete_failed": "Échec de la suppression du lauréat.",
    "awards.alert.load_failed": "Échec du chargement de la liste des lauréats."
  },
  "de": {
    "awards.title.career": "KISS-Preis für Karriereentwicklung",
    "awards.desc.career": "Die KISS-Preise für Karriereentwicklung würdigen Statistikerinnen und Statistiker in einer frühen Karrierephase, die eine herausragende Produktivität gezeigt haben und das Potenzial besitzen, bedeutende Beiträge zur Statistik zu leisten. Die Preise werden jedes Jahr beim KISS Career Development Workshop während der JSM-Tagung verliehen.",
    "awards.title.student": "KISS-Preis für hervorragende studentische Arbeiten",
    "awards.desc.student": "Die KISS-Preise für hervorragende studentische Arbeiten unterstützen Studierende bei der Reise zur JSM, um dort ihre Arbeiten vorzustellen. Die Preise werden alle zwei Jahre bei der KISS Annual Meeting während der JSM verliehen.",
    "awards.manage.add_awardee": "Preisträger hinzufügen",
    "awards.form.year": "Preisjahr",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Name",
    "awards.form.name_placeholder": "Name des Preisträgers",
    "awards.form.affiliation": "Institution",
    "awards.form.affiliation_placeholder": "Institution",
    "awards.action.submit": "Speichern",
    "awards.action.submitting": "Wird gespeichert...",
    "awards.list.year_awardees": "Preisträger {year}",
    "awards.alert.enter_year": "Bitte geben Sie das Preisjahr ein.",
    "awards.alert.enter_name": "Bitte geben Sie den Namen des Preisträgers ein.",
    "awards.alert.enter_affiliation": "Bitte geben Sie die Institution des Preisträgers ein.",
    "awards.alert.add_failed": "Der Preisträger konnte nicht hinzugefügt werden.",
    "awards.alert.delete_confirm": "Möchten Sie diesen Preisträger wirklich löschen?",
    "awards.alert.delete_failed": "Der Preisträger konnte nicht gelöscht werden.",
    "awards.alert.load_failed": "Die Liste der Preisträger konnte nicht geladen werden."
  },
  "pt-BR": {
    "awards.title.career": "Prêmio KISS de Desenvolvimento de Carreira",
    "awards.desc.career": "Os Prêmios KISS de Desenvolvimento de Carreira reconhecem estatísticos em início de carreira que demonstraram produtividade excepcional e potencial para fazer contribuições significativas à área de estatística. Os prêmios são entregues todos os anos no KISS Career Development Workshop durante a reunião da JSM.",
    "awards.title.student": "Prêmio KISS de Melhor Artigo Estudantil",
    "awards.desc.student": "Os Prêmios KISS de Melhor Artigo Estudantil apoiam estudantes que viajam para a JSM para apresentar seus trabalhos. Os prêmios são entregues a cada dois anos na KISS Annual Meeting durante a JSM.",
    "awards.manage.add_awardee": "Adicionar premiado",
    "awards.form.year": "Ano do prêmio",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Nome",
    "awards.form.name_placeholder": "Nome do premiado",
    "awards.form.affiliation": "Afiliação",
    "awards.form.affiliation_placeholder": "Afiliação",
    "awards.action.submit": "Enviar",
    "awards.action.submitting": "Enviando...",
    "awards.list.year_awardees": "Premiados de {year}",
    "awards.alert.enter_year": "Informe o ano do prêmio.",
    "awards.alert.enter_name": "Informe o nome do premiado.",
    "awards.alert.enter_affiliation": "Informe a afiliação do premiado.",
    "awards.alert.add_failed": "Não foi possível adicionar o premiado.",
    "awards.alert.delete_confirm": "Tem certeza de que deseja excluir este premiado?",
    "awards.alert.delete_failed": "Não foi possível excluir o premiado.",
    "awards.alert.load_failed": "Não foi possível carregar a lista de premiados."
  },
  "ru": {
    "awards.title.career": "Премия KISS за развитие карьеры",
    "awards.desc.career": "Премия KISS за развитие карьеры отмечает статистиков на раннем этапе профессионального пути, которые уже продемонстрировали выдающуюся продуктивность и потенциал внести значительный вклад в статистику. Премия вручается ежегодно на KISS Career Development Workshop во время встречи JSM.",
    "awards.title.student": "Премия KISS за лучшую студенческую работу",
    "awards.desc.student": "Премия KISS за лучшую студенческую работу поддерживает студентов, которые едут на JSM, чтобы представить свои доклады. Премия вручается раз в два года на KISS Annual Meeting во время JSM.",
    "awards.manage.add_awardee": "Добавить лауреата",
    "awards.form.year": "Год награждения",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Имя",
    "awards.form.name_placeholder": "Имя лауреата",
    "awards.form.affiliation": "Аффилиация",
    "awards.form.affiliation_placeholder": "Аффилиация",
    "awards.action.submit": "Отправить",
    "awards.action.submitting": "Отправка...",
    "awards.list.year_awardees": "Лауреаты {year} года",
    "awards.alert.enter_year": "Пожалуйста, укажите год награждения.",
    "awards.alert.enter_name": "Пожалуйста, укажите имя лауреата.",
    "awards.alert.enter_affiliation": "Пожалуйста, укажите аффилиацию лауреата.",
    "awards.alert.add_failed": "Не удалось добавить лауреата.",
    "awards.alert.delete_confirm": "Вы уверены, что хотите удалить этого лауреата?",
    "awards.alert.delete_failed": "Не удалось удалить лауреата.",
    "awards.alert.load_failed": "Не удалось загрузить список лауреатов."
  },
  "id": {
    "awards.title.career": "Penghargaan Pengembangan Karier KISS",
    "awards.desc.career": "Penghargaan Pengembangan Karier KISS memberikan pengakuan kepada statistisi pada tahap awal karier yang telah menunjukkan produktivitas luar biasa dan potensi untuk memberikan kontribusi besar bagi bidang statistika. Penghargaan ini diberikan setiap tahun pada KISS Career Development Workshop selama pertemuan JSM.",
    "awards.title.student": "Penghargaan Makalah Mahasiswa Unggulan KISS",
    "awards.desc.student": "Penghargaan Makalah Mahasiswa Unggulan KISS mendukung mahasiswa yang melakukan perjalanan ke JSM untuk mempresentasikan makalah mereka. Penghargaan ini diberikan setiap dua tahun pada KISS Annual Meeting selama JSM.",
    "awards.manage.add_awardee": "Tambah penerima penghargaan",
    "awards.form.year": "Tahun penghargaan",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Nama",
    "awards.form.name_placeholder": "Nama penerima",
    "awards.form.affiliation": "Afiliasi",
    "awards.form.affiliation_placeholder": "Afiliasi",
    "awards.action.submit": "Kirim",
    "awards.action.submitting": "Mengirim...",
    "awards.list.year_awardees": "Penerima penghargaan {year}",
    "awards.alert.enter_year": "Silakan masukkan tahun penghargaan.",
    "awards.alert.enter_name": "Silakan masukkan nama penerima penghargaan.",
    "awards.alert.enter_affiliation": "Silakan masukkan afiliasi penerima penghargaan.",
    "awards.alert.add_failed": "Gagal menambahkan penerima penghargaan.",
    "awards.alert.delete_confirm": "Apakah Anda yakin ingin menghapus penerima penghargaan ini?",
    "awards.alert.delete_failed": "Gagal menghapus penerima penghargaan.",
    "awards.alert.load_failed": "Gagal memuat daftar penerima penghargaan."
  },
  "vi": {
    "awards.title.career": "Giải thưởng Phát triển Sự nghiệp KISS",
    "awards.desc.career": "Giải thưởng Phát triển Sự nghiệp KISS tôn vinh các nhà thống kê ở giai đoạn đầu sự nghiệp đã thể hiện năng suất nghiên cứu nổi bật và tiềm năng đóng góp đáng kể cho lĩnh vực thống kê. Giải thưởng được trao hằng năm tại KISS Career Development Workshop trong kỳ họp JSM.",
    "awards.title.student": "Giải thưởng Bài báo Sinh viên Xuất sắc KISS",
    "awards.desc.student": "Giải thưởng Bài báo Sinh viên Xuất sắc KISS hỗ trợ sinh viên đến JSM để trình bày bài báo của mình. Giải thưởng được trao hai năm một lần tại KISS Annual Meeting trong kỳ họp JSM.",
    "awards.manage.add_awardee": "Thêm người nhận giải",
    "awards.form.year": "Năm trao giải",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Tên",
    "awards.form.name_placeholder": "Tên người nhận giải",
    "awards.form.affiliation": "Đơn vị",
    "awards.form.affiliation_placeholder": "Đơn vị",
    "awards.action.submit": "Gửi",
    "awards.action.submitting": "Đang gửi...",
    "awards.list.year_awardees": "Người nhận giải năm {year}",
    "awards.alert.enter_year": "Vui lòng nhập năm trao giải.",
    "awards.alert.enter_name": "Vui lòng nhập tên người nhận giải.",
    "awards.alert.enter_affiliation": "Vui lòng nhập đơn vị của người nhận giải.",
    "awards.alert.add_failed": "Không thể thêm người nhận giải.",
    "awards.alert.delete_confirm": "Bạn có chắc muốn xóa người nhận giải này không?",
    "awards.alert.delete_failed": "Không thể xóa người nhận giải.",
    "awards.alert.load_failed": "Không thể tải danh sách người nhận giải."
  },
  "th": {
    "awards.title.career": "รางวัลการพัฒนาอาชีพ KISS",
    "awards.desc.career": "รางวัลการพัฒนาอาชีพ KISS มอบให้แก่นักสถิติในช่วงเริ่มต้นอาชีพที่แสดงให้เห็นถึงผลงานที่โดดเด่นและศักยภาพในการสร้างคุณูปการสำคัญต่อวงการสถิติ รางวัลนี้มอบทุกปีในงาน KISS Career Development Workshop ระหว่างการประชุม JSM",
    "awards.title.student": "รางวัลบทความนักศึกษาดีเด่น KISS",
    "awards.desc.student": "รางวัลบทความนักศึกษาดีเด่น KISS สนับสนุนนักศึกษาให้เดินทางไปยัง JSM เพื่อนำเสนอผลงานของตน รางวัลนี้มอบทุก ๆ สองปีในงาน KISS Annual Meeting ระหว่างการประชุม JSM",
    "awards.manage.add_awardee": "เพิ่มผู้ได้รับรางวัล",
    "awards.form.year": "ปีที่ได้รับรางวัล",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "ชื่อ",
    "awards.form.name_placeholder": "ชื่อผู้ได้รับรางวัล",
    "awards.form.affiliation": "สังกัด",
    "awards.form.affiliation_placeholder": "สังกัด",
    "awards.action.submit": "ส่ง",
    "awards.action.submitting": "กำลังส่ง...",
    "awards.list.year_awardees": "ผู้ได้รับรางวัลปี {year}",
    "awards.alert.enter_year": "กรุณากรอกปีที่ได้รับรางวัล",
    "awards.alert.enter_name": "กรุณากรอกชื่อผู้ได้รับรางวัล",
    "awards.alert.enter_affiliation": "กรุณากรอกสังกัดของผู้ได้รับรางวัล",
    "awards.alert.add_failed": "ไม่สามารถเพิ่มผู้ได้รับรางวัลได้",
    "awards.alert.delete_confirm": "คุณแน่ใจหรือไม่ว่าต้องการลบผู้ได้รับรางวัลนี้?",
    "awards.alert.delete_failed": "ไม่สามารถลบผู้ได้รับรางวัลได้",
    "awards.alert.load_failed": "ไม่สามารถโหลดรายชื่อผู้ได้รับรางวัลได้"
  },
  "ms": {
    "awards.title.career": "Anugerah Pembangunan Kerjaya KISS",
    "awards.desc.career": "Anugerah Pembangunan Kerjaya KISS mengiktiraf ahli statistik pada peringkat awal kerjaya yang telah menunjukkan produktiviti cemerlang dan potensi untuk memberi sumbangan besar kepada bidang statistik. Anugerah ini disampaikan setiap tahun dalam KISS Career Development Workshop semasa mesyuarat JSM.",
    "awards.title.student": "Anugerah Kertas Pelajar Cemerlang KISS",
    "awards.desc.student": "Anugerah Kertas Pelajar Cemerlang KISS menyokong pelajar yang pergi ke JSM untuk membentangkan kertas mereka. Anugerah ini disampaikan setiap dua tahun dalam KISS Annual Meeting semasa JSM.",
    "awards.manage.add_awardee": "Tambah penerima anugerah",
    "awards.form.year": "Tahun anugerah",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Nama",
    "awards.form.name_placeholder": "Nama penerima anugerah",
    "awards.form.affiliation": "Afiliasi",
    "awards.form.affiliation_placeholder": "Afiliasi",
    "awards.action.submit": "Hantar",
    "awards.action.submitting": "Sedang dihantar...",
    "awards.list.year_awardees": "Penerima anugerah {year}",
    "awards.alert.enter_year": "Sila masukkan tahun anugerah.",
    "awards.alert.enter_name": "Sila masukkan nama penerima anugerah.",
    "awards.alert.enter_affiliation": "Sila masukkan afiliasi penerima anugerah.",
    "awards.alert.add_failed": "Gagal menambah penerima anugerah.",
    "awards.alert.delete_confirm": "Adakah anda pasti mahu memadam penerima anugerah ini?",
    "awards.alert.delete_failed": "Gagal memadam penerima anugerah.",
    "awards.alert.load_failed": "Gagal memuatkan senarai penerima anugerah."
  },
  "fil": {
    "awards.title.career": "Gawad KISS para sa Pagpapaunlad ng Karera",
    "awards.desc.career": "Kinikilala ng Gawad KISS para sa Pagpapaunlad ng Karera ang mga estadistiko sa maagang yugto ng kanilang karera na nagpakita ng natatanging produktibidad at potensiyal na makapag-ambag nang malaki sa larangan ng estadistika. Iginagawad ito taun-taon sa KISS Career Development Workshop sa panahon ng pulong ng JSM.",
    "awards.title.student": "Gawad KISS para sa Natatanging Papel ng Estudyante",
    "awards.desc.student": "Sinusuportahan ng Gawad KISS para sa Natatanging Papel ng Estudyante ang mga estudyanteng bumibiyahe sa JSM upang ipresenta ang kanilang mga papel. Iginagawad ito tuwing ikalawang taon sa KISS Annual Meeting sa panahon ng JSM.",
    "awards.manage.add_awardee": "Magdagdag ng awardee",
    "awards.form.year": "Taon ng parangal",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Pangalan",
    "awards.form.name_placeholder": "Pangalan ng awardee",
    "awards.form.affiliation": "Afiliasyon",
    "awards.form.affiliation_placeholder": "Afiliasyon",
    "awards.action.submit": "Isumite",
    "awards.action.submitting": "Isinusumite...",
    "awards.list.year_awardees": "Mga awardee ng {year}",
    "awards.alert.enter_year": "Pakilagay ang taon ng parangal.",
    "awards.alert.enter_name": "Pakilagay ang pangalan ng awardee.",
    "awards.alert.enter_affiliation": "Pakilagay ang afiliasyon ng awardee.",
    "awards.alert.add_failed": "Hindi maidagdag ang awardee.",
    "awards.alert.delete_confirm": "Sigurado ka bang gusto mong tanggalin ang awardee na ito?",
    "awards.alert.delete_failed": "Hindi matanggal ang awardee.",
    "awards.alert.load_failed": "Hindi ma-load ang listahan ng mga awardee."
  },
  "hi": {
    "awards.title.career": "KISS करियर विकास पुरस्कार",
    "awards.desc.career": "KISS करियर विकास पुरस्कार उन सांख्यिकीविदों को सम्मानित करता है जो अपने करियर के प्रारंभिक चरण में हैं, जिन्होंने उत्कृष्ट उत्पादकता दिखाई है, और जिनमें सांख्यिकी के क्षेत्र में महत्वपूर्ण योगदान देने की क्षमता है। यह पुरस्कार हर वर्ष JSM बैठक के दौरान आयोजित KISS Career Development Workshop में प्रदान किया जाता है।",
    "awards.title.student": "KISS उत्कृष्ट छात्र शोधपत्र पुरस्कार",
    "awards.desc.student": "KISS उत्कृष्ट छात्र शोधपत्र पुरस्कार उन छात्रों को सहायता प्रदान करता है जो अपने शोधपत्र प्रस्तुत करने के लिए JSM की यात्रा करते हैं। यह पुरस्कार प्रत्येक दो वर्ष में JSM के दौरान आयोजित KISS Annual Meeting में प्रदान किया जाता है।",
    "awards.manage.add_awardee": "पुरस्कार प्राप्तकर्ता जोड़ें",
    "awards.form.year": "पुरस्कार वर्ष",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "नाम",
    "awards.form.name_placeholder": "पुरस्कार प्राप्तकर्ता का नाम",
    "awards.form.affiliation": "संस्थान",
    "awards.form.affiliation_placeholder": "संस्थान",
    "awards.action.submit": "जमा करें",
    "awards.action.submitting": "जमा किया जा रहा है...",
    "awards.list.year_awardees": "{year} के पुरस्कार प्राप्तकर्ता",
    "awards.alert.enter_year": "कृपया पुरस्कार वर्ष दर्ज करें।",
    "awards.alert.enter_name": "कृपया पुरस्कार प्राप्तकर्ता का नाम दर्ज करें।",
    "awards.alert.enter_affiliation": "कृपया पुरस्कार प्राप्तकर्ता का संस्थान दर्ज करें।",
    "awards.alert.add_failed": "पुरस्कार प्राप्तकर्ता को जोड़ा नहीं जा सका।",
    "awards.alert.delete_confirm": "क्या आप वाकई इस पुरस्कार प्राप्तकर्ता को हटाना चाहते हैं?",
    "awards.alert.delete_failed": "पुरस्कार प्राप्तकर्ता को हटाया नहीं जा सका।",
    "awards.alert.load_failed": "पुरस्कार प्राप्तकर्ताओं की सूची लोड नहीं हो सकी।"
  },
  "ar": {
    "awards.title.career": "جائزة KISS لتطوير المسار المهني",
    "awards.desc.career": "تكرّم جائزة KISS لتطوير المسار المهني الإحصائيين في المراحل المبكرة من مسيرتهم المهنية ممن أظهروا إنتاجية متميزة وقدرة على تقديم إسهامات مهمة في مجال الإحصاء. تُمنح الجائزة سنويًا في KISS Career Development Workshop خلال اجتماع JSM.",
    "awards.title.student": "جائزة KISS لأفضل ورقة طلابية",
    "awards.desc.student": "تدعم جائزة KISS لأفضل ورقة طلابية الطلاب المسافرين إلى JSM لتقديم أوراقهم البحثية. تُمنح الجائزة كل عامين في KISS Annual Meeting خلال JSM.",
    "awards.manage.add_awardee": "إضافة فائز",
    "awards.form.year": "سنة الجائزة",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "الاسم",
    "awards.form.name_placeholder": "اسم الفائز",
    "awards.form.affiliation": "الجهة",
    "awards.form.affiliation_placeholder": "الجهة",
    "awards.action.submit": "إرسال",
    "awards.action.submitting": "جارٍ الإرسال...",
    "awards.list.year_awardees": "الفائزون في {year}",
    "awards.alert.enter_year": "يرجى إدخال سنة الجائزة.",
    "awards.alert.enter_name": "يرجى إدخال اسم الفائز.",
    "awards.alert.enter_affiliation": "يرجى إدخال جهة الفائز.",
    "awards.alert.add_failed": "تعذر إضافة الفائز.",
    "awards.alert.delete_confirm": "هل أنت متأكد من رغبتك في حذف هذا الفائز؟",
    "awards.alert.delete_failed": "تعذر حذف الفائز.",
    "awards.alert.load_failed": "تعذر تحميل قائمة الفائزين."
  },
  "it": {
    "awards.title.career": "Premio KISS per lo sviluppo della carriera",
    "awards.desc.career": "Il Premio KISS per lo sviluppo della carriera riconosce statistici nelle prime fasi della loro carriera che hanno dimostrato una produttività eccezionale e il potenziale per offrire contributi significativi al campo della statistica. Il premio viene assegnato ogni anno al KISS Career Development Workshop durante l’incontro JSM.",
    "awards.title.student": "Premio KISS per il miglior articolo studentesco",
    "awards.desc.student": "Il Premio KISS per il miglior articolo studentesco sostiene gli studenti che si recano al JSM per presentare i loro lavori. Il premio viene assegnato ogni due anni al KISS Annual Meeting durante il JSM.",
    "awards.manage.add_awardee": "Aggiungi premiato",
    "awards.form.year": "Anno del premio",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Nome",
    "awards.form.name_placeholder": "Nome del premiato",
    "awards.form.affiliation": "Affiliazione",
    "awards.form.affiliation_placeholder": "Affiliazione",
    "awards.action.submit": "Invia",
    "awards.action.submitting": "Invio in corso...",
    "awards.list.year_awardees": "Premiati {year}",
    "awards.alert.enter_year": "Inserisci l’anno del premio.",
    "awards.alert.enter_name": "Inserisci il nome del premiato.",
    "awards.alert.enter_affiliation": "Inserisci l’affiliazione del premiato.",
    "awards.alert.add_failed": "Impossibile aggiungere il premiato.",
    "awards.alert.delete_confirm": "Sei sicuro di voler eliminare questo premiato?",
    "awards.alert.delete_failed": "Impossibile eliminare il premiato.",
    "awards.alert.load_failed": "Impossibile caricare l’elenco dei premiati."
  },
  "nl": {
    "awards.title.career": "KISS-prijs voor loopbaanontwikkeling",
    "awards.desc.career": "De KISS-prijs voor loopbaanontwikkeling erkent statistici in een vroege fase van hun loopbaan die uitstekende productiviteit hebben laten zien en het potentieel hebben om belangrijke bijdragen te leveren aan de statistiek. De prijs wordt jaarlijks uitgereikt tijdens de KISS Career Development Workshop op de JSM-bijeenkomst.",
    "awards.title.student": "KISS-prijs voor uitstekende studentenpaper",
    "awards.desc.student": "De KISS-prijs voor uitstekende studentenpaper ondersteunt studenten die naar JSM reizen om hun paper te presenteren. De prijs wordt om het jaar uitgereikt tijdens de KISS Annual Meeting op JSM.",
    "awards.manage.add_awardee": "Prijswinnaar toevoegen",
    "awards.form.year": "Prijsjaar",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Naam",
    "awards.form.name_placeholder": "Naam van de prijswinnaar",
    "awards.form.affiliation": "Affiliatie",
    "awards.form.affiliation_placeholder": "Affiliatie",
    "awards.action.submit": "Verzenden",
    "awards.action.submitting": "Bezig met verzenden...",
    "awards.list.year_awardees": "Prijswinnaars van {year}",
    "awards.alert.enter_year": "Voer het prijsjaar in.",
    "awards.alert.enter_name": "Voer de naam van de prijswinnaar in.",
    "awards.alert.enter_affiliation": "Voer de affiliatie van de prijswinnaar in.",
    "awards.alert.add_failed": "De prijswinnaar kon niet worden toegevoegd.",
    "awards.alert.delete_confirm": "Weet u zeker dat u deze prijswinnaar wilt verwijderen?",
    "awards.alert.delete_failed": "De prijswinnaar kon niet worden verwijderd.",
    "awards.alert.load_failed": "De lijst met prijswinnaars kon niet worden geladen."
  },
  "pl": {
    "awards.title.career": "Nagroda KISS za rozwój kariery",
    "awards.desc.career": "Nagroda KISS za rozwój kariery wyróżnia statystyków na wczesnym etapie kariery, którzy wykazali się wyjątkową produktywnością i potencjałem do wniesienia znaczącego wkładu w dziedzinę statystyki. Nagroda jest wręczana co roku podczas KISS Career Development Workshop w trakcie spotkania JSM.",
    "awards.title.student": "Nagroda KISS za wybitną pracę studencką",
    "awards.desc.student": "Nagroda KISS za wybitną pracę studencką wspiera studentów podróżujących na JSM, aby zaprezentować swoje prace. Nagroda jest wręczana co dwa lata podczas KISS Annual Meeting w trakcie JSM.",
    "awards.manage.add_awardee": "Dodaj laureata",
    "awards.form.year": "Rok nagrody",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Imię i nazwisko",
    "awards.form.name_placeholder": "Imię i nazwisko laureata",
    "awards.form.affiliation": "Afiliacja",
    "awards.form.affiliation_placeholder": "Afiliacja",
    "awards.action.submit": "Wyślij",
    "awards.action.submitting": "Wysyłanie...",
    "awards.list.year_awardees": "Laureaci {year}",
    "awards.alert.enter_year": "Wprowadź rok nagrody.",
    "awards.alert.enter_name": "Wprowadź imię i nazwisko laureata.",
    "awards.alert.enter_affiliation": "Wprowadź afiliację laureata.",
    "awards.alert.add_failed": "Nie udało się dodać laureata.",
    "awards.alert.delete_confirm": "Czy na pewno chcesz usunąć tego laureata?",
    "awards.alert.delete_failed": "Nie udało się usunąć laureata.",
    "awards.alert.load_failed": "Nie udało się załadować listy laureatów."
  },
  "sv": {
    "awards.title.career": "KISS pris för karriärutveckling",
    "awards.desc.career": "KISS pris för karriärutveckling uppmärksammar statistiker i början av sin karriär som har visat enastående produktivitet och potential att ge betydande bidrag till statistikområdet. Priset delas ut varje år vid KISS Career Development Workshop under JSM-mötet.",
    "awards.title.student": "KISS pris för framstående studentuppsats",
    "awards.desc.student": "KISS pris för framstående studentuppsats stödjer studenter som reser till JSM för att presentera sina arbeten. Priset delas ut vartannat år vid KISS Annual Meeting under JSM.",
    "awards.manage.add_awardee": "Lägg till pristagare",
    "awards.form.year": "Prisår",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Namn",
    "awards.form.name_placeholder": "Pristagarens namn",
    "awards.form.affiliation": "Affiliation",
    "awards.form.affiliation_placeholder": "Affiliation",
    "awards.action.submit": "Skicka",
    "awards.action.submitting": "Skickar...",
    "awards.list.year_awardees": "Pristagare {year}",
    "awards.alert.enter_year": "Ange prisåret.",
    "awards.alert.enter_name": "Ange pristagarens namn.",
    "awards.alert.enter_affiliation": "Ange pristagarens affiliation.",
    "awards.alert.add_failed": "Det gick inte att lägga till pristagaren.",
    "awards.alert.delete_confirm": "Är du säker på att du vill ta bort denna pristagare?",
    "awards.alert.delete_failed": "Det gick inte att ta bort pristagaren.",
    "awards.alert.load_failed": "Det gick inte att ladda listan över pristagare."
  },
  "tr": {
    "awards.title.career": "KISS Kariyer Gelişim Ödülü",
    "awards.desc.career": "KISS Kariyer Gelişim Ödülü, kariyerinin erken aşamalarında olan, üstün üretkenlik göstermiş ve istatistik alanına önemli katkılar sunma potansiyeline sahip istatistikçileri onurlandırır. Ödül her yıl JSM toplantısı sırasında düzenlenen KISS Career Development Workshop’ta verilir.",
    "awards.title.student": "KISS Üstün Öğrenci Makalesi Ödülü",
    "awards.desc.student": "KISS Üstün Öğrenci Makalesi Ödülü, makalelerini sunmak üzere JSM’ye seyahat eden öğrencileri destekler. Ödül iki yılda bir JSM sırasında düzenlenen KISS Annual Meeting’de verilir.",
    "awards.manage.add_awardee": "Ödül alanı ekle",
    "awards.form.year": "Ödül yılı",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Ad",
    "awards.form.name_placeholder": "Ödül alanın adı",
    "awards.form.affiliation": "Kurum",
    "awards.form.affiliation_placeholder": "Kurum",
    "awards.action.submit": "Gönder",
    "awards.action.submitting": "Gönderiliyor...",
    "awards.list.year_awardees": "{year} yılı ödül alanları",
    "awards.alert.enter_year": "Lütfen ödül yılını girin.",
    "awards.alert.enter_name": "Lütfen ödül alanın adını girin.",
    "awards.alert.enter_affiliation": "Lütfen ödül alanın kurumunu girin.",
    "awards.alert.add_failed": "Ödül alan eklenemedi.",
    "awards.alert.delete_confirm": "Bu ödül alanı silmek istediğinizden emin misiniz?",
    "awards.alert.delete_failed": "Ödül alan silinemedi.",
    "awards.alert.load_failed": "Ödül alanlar listesi yüklenemedi."
  },
  "uk": {
    "awards.title.career": "Премія KISS за розвиток кар’єри",
    "awards.desc.career": "Премія KISS за розвиток кар’єри відзначає статистиків на ранньому етапі професійного шляху, які вже продемонстрували видатну продуктивність і потенціал зробити вагомий внесок у статистику. Премія вручається щороку на KISS Career Development Workshop під час зустрічі JSM.",
    "awards.title.student": "Премія KISS за найкращу студентську роботу",
    "awards.desc.student": "Премія KISS за найкращу студентську роботу підтримує студентів, які їдуть на JSM, щоб представити свої роботи. Премія вручається раз на два роки на KISS Annual Meeting під час JSM.",
    "awards.manage.add_awardee": "Додати лауреата",
    "awards.form.year": "Рік нагородження",
    "awards.form.year_placeholder": "YYYY",
    "awards.form.name": "Ім’я",
    "awards.form.name_placeholder": "Ім’я лауреата",
    "awards.form.affiliation": "Афіліація",
    "awards.form.affiliation_placeholder": "Афіліація",
    "awards.action.submit": "Надіслати",
    "awards.action.submitting": "Надсилання...",
    "awards.list.year_awardees": "Лауреати {year} року",
    "awards.alert.enter_year": "Будь ласка, введіть рік нагородження.",
    "awards.alert.enter_name": "Будь ласка, введіть ім’я лауреата.",
    "awards.alert.enter_affiliation": "Будь ласка, введіть афіліацію лауреата.",
    "awards.alert.add_failed": "Не вдалося додати лауреата.",
    "awards.alert.delete_confirm": "Ви впевнені, що хочете видалити цього лауреата?",
    "awards.alert.delete_failed": "Не вдалося видалити лауреата.",
    "awards.alert.load_failed": "Не вдалося завантажити список лауреатів."
  }
};

    function resolveLangCode(code) {
        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.resolveLangCode === 'function') {
            return window.StatKISS_I18N.resolveLangCode(code);
        }

        if (!code) {
            return 'en';
        }

        const c = String(code).trim();

        if (c === 'zh' || c.toLowerCase().startsWith('zh-')) {
            const lower = c.toLowerCase();
            if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) {
                return 'zh-Hant';
            }

            return 'zh-Hans';
        }

        if (c === 'tl' || c.toLowerCase().startsWith('tl-') || c === 'fil' || c.toLowerCase().startsWith('fil-')) {
            return 'fil';
        }

        if (c === 'pt' || c.toLowerCase().startsWith('pt-')) {
            return 'pt-BR';
        }

        if (c.toLowerCase().startsWith('en-')) {
            return 'en';
        }

        if (c.toLowerCase().startsWith('ja-')) {
            return 'ja';
        }

        if (c.toLowerCase().startsWith('ko-')) {
            return 'ko';
        }

        return c;
    }

    function isRTL(lang) {
        return lang === 'ar';
    }

    function normalizeCoverage() {
        const en = dict.en || {};
        const ko = dict.ko || {};

        languages.forEach((language) => {
            if (!dict[language.code]) {
                dict[language.code] = {};
            }

            UI_KEYS.forEach((key) => {
                if (dict[language.code][key] == null || dict[language.code][key] === '') {
                    dict[language.code][key] = en[key] ?? ko[key] ?? key;
                }
            });
        });
    }

    function formatText(text, vars = {}) {
        return String(text).replace(/\{(\w+)\}/g, (match, key) => {
            if (Object.prototype.hasOwnProperty.call(vars, key) && vars[key] != null) {
                return vars[key];
            }

            return match;
        });
    }

    function getCurrentLang() {
        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.getInitialLang === 'function') {
            return window.StatKISS_I18N.getInitialLang();
        }

        const saved = localStorage.getItem(LANG_KEY);
        const browser = navigator.language || 'en';
        const initial = resolveLangCode(saved || browser);

        const best =
            languages.find((language) => language.code === initial) ||
            languages.find((language) => initial.startsWith(language.code)) ||
            languages.find((language) => language.code.startsWith(initial.split('-')[0])) ||
            languages[0];

        return best ? best.code : 'en';
    }

    function applyLangToDocument(lang) {
        if (window.StatKISS_I18N && typeof window.StatKISS_I18N.applyLangToDocument === 'function') {
            window.StatKISS_I18N.applyLangToDocument(lang);
            return;
        }

        const root = document.documentElement;
        root.setAttribute('lang', lang);
        root.setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');
    }

    function t(key, vars = {}, lang) {
        const langCode = resolveLangCode(lang || getCurrentLang());
        const selected = dict[langCode] || {};
        const en = dict.en || {};
        const ko = dict.ko || {};

        const raw =
            (selected[key] != null && selected[key] !== '') ? selected[key] :
            (en[key] != null && en[key] !== '') ? en[key] :
            (ko[key] != null && ko[key] !== '') ? ko[key] :
            key;

        return formatText(raw, vars);
    }

    function mergeIntoCore() {
        const core = window.StatKISS_I18N;

        if (!core || !core.dict) {
            return;
        }

        if (!Array.isArray(core.UI_KEYS)) {
            core.UI_KEYS = [];
        }

        languages.forEach((language) => {
            if (!core.dict[language.code]) {
                core.dict[language.code] = {};
            }

            UI_KEYS.forEach((key) => {
                if (dict[language.code] && dict[language.code][key] != null) {
                    core.dict[language.code][key] = dict[language.code][key];
                }

                if (!core.UI_KEYS.includes(key)) {
                    core.UI_KEYS.push(key);
                }
            });
        });

        if (typeof core.normalizeCoverage === 'function') {
            core.normalizeCoverage();
        }
    }

    function init() {
        normalizeCoverage();
        mergeIntoCore();

        const lang = getCurrentLang();
        applyLangToDocument(lang);
        return lang;
    }

    window.StatKISS_AWARDS_I18N = {
        LANG_KEY,
        languages,
        UI_KEYS,
        dict,
        resolveLangCode,
        isRTL,
        normalizeCoverage,
        formatText,
        getCurrentLang,
        applyLangToDocument,
        t,
        mergeIntoCore,
        init
    };

    init();
})();
