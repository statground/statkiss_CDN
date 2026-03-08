(function () {
    'use strict';

    const languages = [{"code": "en", "label": "English"}, {"code": "ko", "label": "한국어"}, {"code": "ja", "label": "日本語"}, {"code": "zh-Hans", "label": "中文(简体)"}, {"code": "zh-Hant", "label": "中文(繁體)"}, {"code": "es", "label": "Español"}, {"code": "fr", "label": "Français"}, {"code": "de", "label": "Deutsch"}, {"code": "pt-BR", "label": "Português (Brasil)"}, {"code": "ru", "label": "Русский"}, {"code": "id", "label": "Bahasa Indonesia"}, {"code": "vi", "label": "Tiếng Việt"}, {"code": "th", "label": "ไทย"}, {"code": "ms", "label": "Bahasa Melayu"}, {"code": "fil", "label": "Filipino"}, {"code": "hi", "label": "हिन्दी"}, {"code": "ar", "label": "العربية"}, {"code": "it", "label": "Italiano"}, {"code": "nl", "label": "Nederlands"}, {"code": "pl", "label": "Polski"}, {"code": "sv", "label": "Svenska"}, {"code": "tr", "label": "Türkçe"}, {"code": "uk", "label": "Українська"}];
    const UI_KEYS = ["newsletter.title", "newsletter.badge", "newsletter.description", "newsletter.manage_title", "newsletter.manage_body", "newsletter.filter_label", "newsletter.all", "newsletter.search_placeholder", "newsletter.empty_title", "newsletter.empty_body", "newsletter.issue_singular", "newsletter.issue_plural", "newsletter.pdf", "newsletter.open_pdf", "newsletter.delete", "newsletter.delete_confirm", "newsletter.publish_date", "newsletter.volume", "newsletter.issue", "newsletter.file_upload", "newsletter.submit", "newsletter.submitting", "newsletter.selected_file", "newsletter.no_file_selected", "newsletter.uploading", "newsletter.file_ready", "newsletter.upload_first", "newsletter.upload_failed", "newsletter.save_failed", "newsletter.delete_failed", "newsletter.load_error"];
    const dict = {
    "en": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Publication Archive",
        "newsletter.description": "This page provides the KISS newsletter archive in PDF format, organized by publication date, volume, and issue.",
        "newsletter.manage_title": "Newsletter Management",
        "newsletter.manage_body": "Administrators can upload the newsletter PDF, register the publication date, volume, and issue number, and keep the archive up to date.",
        "newsletter.filter_label": "Filter by 5-year range",
        "newsletter.all": "All",
        "newsletter.search_placeholder": "Search by date, volume, or issue...",
        "newsletter.empty_title": "No newsletters matched your current filters.",
        "newsletter.empty_body": "Try another search or range, or check back later after a new newsletter is added.",
        "newsletter.issue_singular": "issue",
        "newsletter.issue_plural": "issues",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Open PDF",
        "newsletter.delete": "Delete",
        "newsletter.delete_confirm": "Are you sure you want to delete this newsletter?",
        "newsletter.publish_date": "Publish Date",
        "newsletter.volume": "Volume",
        "newsletter.issue": "Issue",
        "newsletter.file_upload": "Upload PDF",
        "newsletter.submit": "Publish",
        "newsletter.submitting": "Publishing...",
        "newsletter.selected_file": "Selected File",
        "newsletter.no_file_selected": "No file selected",
        "newsletter.uploading": "Uploading...",
        "newsletter.file_ready": "File ready",
        "newsletter.upload_first": "Please upload the PDF file first.",
        "newsletter.upload_failed": "File upload failed.",
        "newsletter.save_failed": "Failed to save the newsletter.",
        "newsletter.delete_failed": "Failed to delete the newsletter.",
        "newsletter.load_error": "We could not load the newsletter archive right now."
    },
    "ko": {
        "newsletter.title": "뉴스레터",
        "newsletter.badge": "뉴스레터 아카이브",
        "newsletter.description": "이 페이지는 KISS 뉴스레터 아카이브를 발행일, 권, 호 기준으로 정리하여 PDF로 제공합니다.",
        "newsletter.manage_title": "뉴스레터 관리",
        "newsletter.manage_body": "관리자와 임원은 뉴스레터 PDF를 업로드하고 발행일, 권, 호 정보를 등록하여 아카이브를 최신 상태로 유지할 수 있습니다.",
        "newsletter.filter_label": "5년 단위로 보기",
        "newsletter.all": "전체",
        "newsletter.search_placeholder": "날짜, 권, 호로 검색...",
        "newsletter.empty_title": "현재 조건에 맞는 뉴스레터가 없습니다.",
        "newsletter.empty_body": "다른 검색어나 기간을 선택하거나, 새 뉴스레터가 추가된 뒤 다시 확인해주세요.",
        "newsletter.issue_singular": "호",
        "newsletter.issue_plural": "호",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "PDF 열기",
        "newsletter.delete": "삭제",
        "newsletter.delete_confirm": "이 뉴스레터를 삭제하시겠습니까?",
        "newsletter.publish_date": "발행일",
        "newsletter.volume": "권",
        "newsletter.issue": "호",
        "newsletter.file_upload": "PDF 업로드",
        "newsletter.submit": "등록",
        "newsletter.submitting": "등록 중...",
        "newsletter.selected_file": "선택한 파일",
        "newsletter.no_file_selected": "선택된 파일 없음",
        "newsletter.uploading": "업로드 중...",
        "newsletter.file_ready": "업로드 완료",
        "newsletter.upload_first": "먼저 PDF 파일을 업로드해주세요.",
        "newsletter.upload_failed": "파일 업로드에 실패했습니다.",
        "newsletter.save_failed": "뉴스레터 저장에 실패했습니다.",
        "newsletter.delete_failed": "뉴스레터 삭제에 실패했습니다.",
        "newsletter.load_error": "뉴스레터 아카이브를 불러오지 못했습니다."
    },
    "ja": {
        "newsletter.title": "ニュースレター",
        "newsletter.badge": "ニュースレターアーカイブ",
        "newsletter.description": "このページでは、KISSニュースレターのアーカイブを発行日・巻・号ごとに整理し、PDFで提供しています。",
        "newsletter.manage_title": "ニュースレター管理",
        "newsletter.manage_body": "管理者はニュースレターPDFをアップロードし、発行日・巻・号の情報を登録して、アーカイブを最新の状態に保つことができます。",
        "newsletter.filter_label": "5年単位で絞り込む",
        "newsletter.all": "すべて",
        "newsletter.search_placeholder": "日付、巻、号で検索...",
        "newsletter.empty_title": "現在の条件に一致するニュースレターはありません。",
        "newsletter.empty_body": "別の検索語や期間を試すか、新しいニュースレターが追加された後にもう一度ご確認ください。",
        "newsletter.issue_singular": "号",
        "newsletter.issue_plural": "号",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "PDFを開く",
        "newsletter.delete": "削除",
        "newsletter.delete_confirm": "このニュースレターを削除してもよろしいですか？",
        "newsletter.publish_date": "発行日",
        "newsletter.volume": "巻",
        "newsletter.issue": "号",
        "newsletter.file_upload": "PDFをアップロード",
        "newsletter.submit": "登録",
        "newsletter.submitting": "登録中...",
        "newsletter.selected_file": "選択したファイル",
        "newsletter.no_file_selected": "ファイルが選択されていません",
        "newsletter.uploading": "アップロード中...",
        "newsletter.file_ready": "アップロード完了",
        "newsletter.upload_first": "先にPDFファイルをアップロードしてください。",
        "newsletter.upload_failed": "ファイルのアップロードに失敗しました。",
        "newsletter.save_failed": "ニュースレターの保存に失敗しました。",
        "newsletter.delete_failed": "ニュースレターの削除に失敗しました。",
        "newsletter.load_error": "ニュースレターアーカイブを読み込めませんでした。"
    },
    "zh-Hans": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "新闻简报档案",
        "newsletter.description": "本页面按发布日期、卷次和期次整理KISS新闻简报档案，并以PDF形式提供。",
        "newsletter.manage_title": "新闻简报管理",
        "newsletter.manage_body": "管理员可以上传新闻简报PDF，登记发布日期、卷次和期次，并持续维护档案内容。",
        "newsletter.filter_label": "按5年区间筛选",
        "newsletter.all": "全部",
        "newsletter.search_placeholder": "按日期、卷次或期次搜索...",
        "newsletter.empty_title": "当前筛选条件下没有新闻简报。",
        "newsletter.empty_body": "请尝试其他搜索词或时间区间，或在新增新闻简报后稍后再来查看。",
        "newsletter.issue_singular": "期",
        "newsletter.issue_plural": "期",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "打开PDF",
        "newsletter.delete": "删除",
        "newsletter.delete_confirm": "确定要删除这份新闻简报吗？",
        "newsletter.publish_date": "发布日期",
        "newsletter.volume": "卷",
        "newsletter.issue": "期",
        "newsletter.file_upload": "上传PDF",
        "newsletter.submit": "发布",
        "newsletter.submitting": "发布中...",
        "newsletter.selected_file": "已选文件",
        "newsletter.no_file_selected": "未选择文件",
        "newsletter.uploading": "上传中...",
        "newsletter.file_ready": "文件已就绪",
        "newsletter.upload_first": "请先上传PDF文件。",
        "newsletter.upload_failed": "文件上传失败。",
        "newsletter.save_failed": "保存新闻简报失败。",
        "newsletter.delete_failed": "删除新闻简报失败。",
        "newsletter.load_error": "目前无法加载新闻简报档案。"
    },
    "zh-Hant": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "電子報檔案",
        "newsletter.description": "本頁面依發佈日期、卷次與期次整理KISS電子報檔案，並以PDF形式提供。",
        "newsletter.manage_title": "電子報管理",
        "newsletter.manage_body": "管理員可上傳電子報PDF，登錄發佈日期、卷次與期次，並持續維護檔案內容。",
        "newsletter.filter_label": "依5年區間篩選",
        "newsletter.all": "全部",
        "newsletter.search_placeholder": "依日期、卷次或期次搜尋...",
        "newsletter.empty_title": "目前的篩選條件下沒有電子報。",
        "newsletter.empty_body": "請嘗試其他搜尋字詞或年份區間，或在新增電子報後稍後再來查看。",
        "newsletter.issue_singular": "期",
        "newsletter.issue_plural": "期",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "開啟PDF",
        "newsletter.delete": "刪除",
        "newsletter.delete_confirm": "確定要刪除此電子報嗎？",
        "newsletter.publish_date": "發佈日期",
        "newsletter.volume": "卷",
        "newsletter.issue": "期",
        "newsletter.file_upload": "上傳PDF",
        "newsletter.submit": "發佈",
        "newsletter.submitting": "發佈中...",
        "newsletter.selected_file": "已選檔案",
        "newsletter.no_file_selected": "尚未選擇檔案",
        "newsletter.uploading": "上傳中...",
        "newsletter.file_ready": "檔案已就緒",
        "newsletter.upload_first": "請先上傳PDF檔案。",
        "newsletter.upload_failed": "檔案上傳失敗。",
        "newsletter.save_failed": "儲存電子報失敗。",
        "newsletter.delete_failed": "刪除電子報失敗。",
        "newsletter.load_error": "目前無法載入電子報檔案。"
    },
    "es": {
        "newsletter.title": "Boletín",
        "newsletter.badge": "Archivo de boletines",
        "newsletter.description": "Esta página ofrece el archivo del boletín de KISS en formato PDF, organizado por fecha de publicación, volumen y número.",
        "newsletter.manage_title": "Gestión del boletín",
        "newsletter.manage_body": "Los administradores pueden subir el PDF del boletín, registrar la fecha de publicación, el volumen y el número, y mantener el archivo actualizado.",
        "newsletter.filter_label": "Filtrar por rango de 5 años",
        "newsletter.all": "Todo",
        "newsletter.search_placeholder": "Buscar por fecha, volumen o número...",
        "newsletter.empty_title": "Ningún boletín coincide con los filtros actuales.",
        "newsletter.empty_body": "Prueba otra búsqueda o rango, o vuelve más tarde cuando se haya agregado un nuevo boletín.",
        "newsletter.issue_singular": "número",
        "newsletter.issue_plural": "números",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Abrir PDF",
        "newsletter.delete": "Eliminar",
        "newsletter.delete_confirm": "¿Seguro que quieres eliminar este boletín?",
        "newsletter.publish_date": "Fecha de publicación",
        "newsletter.volume": "Volumen",
        "newsletter.issue": "Número",
        "newsletter.file_upload": "Subir PDF",
        "newsletter.submit": "Publicar",
        "newsletter.submitting": "Publicando...",
        "newsletter.selected_file": "Archivo seleccionado",
        "newsletter.no_file_selected": "Ningún archivo seleccionado",
        "newsletter.uploading": "Subiendo...",
        "newsletter.file_ready": "Archivo listo",
        "newsletter.upload_first": "Primero sube el archivo PDF.",
        "newsletter.upload_failed": "La carga del archivo falló.",
        "newsletter.save_failed": "No se pudo guardar el boletín.",
        "newsletter.delete_failed": "No se pudo eliminar el boletín.",
        "newsletter.load_error": "No pudimos cargar el archivo del boletín en este momento."
    },
    "fr": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Archive des newsletters",
        "newsletter.description": "Cette page propose les archives de la newsletter KISS au format PDF, organisées par date de publication, volume et numéro.",
        "newsletter.manage_title": "Gestion de la newsletter",
        "newsletter.manage_body": "Les administrateurs peuvent téléverser le PDF de la newsletter, renseigner la date de publication, le volume et le numéro, et maintenir l’archive à jour.",
        "newsletter.filter_label": "Filtrer par période de 5 ans",
        "newsletter.all": "Tout",
        "newsletter.search_placeholder": "Rechercher par date, volume ou numéro...",
        "newsletter.empty_title": "Aucune newsletter ne correspond aux filtres actuels.",
        "newsletter.empty_body": "Essayez une autre recherche ou une autre période, ou revenez plus tard après l’ajout d’une nouvelle newsletter.",
        "newsletter.issue_singular": "numéro",
        "newsletter.issue_plural": "numéros",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Ouvrir le PDF",
        "newsletter.delete": "Supprimer",
        "newsletter.delete_confirm": "Voulez-vous vraiment supprimer cette newsletter ?",
        "newsletter.publish_date": "Date de publication",
        "newsletter.volume": "Volume",
        "newsletter.issue": "Numéro",
        "newsletter.file_upload": "Téléverser le PDF",
        "newsletter.submit": "Publier",
        "newsletter.submitting": "Publication en cours...",
        "newsletter.selected_file": "Fichier sélectionné",
        "newsletter.no_file_selected": "Aucun fichier sélectionné",
        "newsletter.uploading": "Téléversement...",
        "newsletter.file_ready": "Fichier prêt",
        "newsletter.upload_first": "Veuillez d’abord téléverser le fichier PDF.",
        "newsletter.upload_failed": "Le téléversement du fichier a échoué.",
        "newsletter.save_failed": "Impossible d’enregistrer la newsletter.",
        "newsletter.delete_failed": "Impossible de supprimer la newsletter.",
        "newsletter.load_error": "Nous n’avons pas pu charger l’archive de la newsletter pour le moment."
    },
    "de": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Newsletter-Archiv",
        "newsletter.description": "Diese Seite stellt das KISS-Newsletter-Archiv im PDF-Format bereit, geordnet nach Veröffentlichungsdatum, Band und Heft.",
        "newsletter.manage_title": "Newsletter-Verwaltung",
        "newsletter.manage_body": "Administratoren können das Newsletter-PDF hochladen, Veröffentlichungsdatum, Band und Ausgabe erfassen und das Archiv aktuell halten.",
        "newsletter.filter_label": "Nach 5-Jahres-Bereich filtern",
        "newsletter.all": "Alle",
        "newsletter.search_placeholder": "Nach Datum, Band oder Ausgabe suchen...",
        "newsletter.empty_title": "Keine Newsletter entsprechen den aktuellen Filtern.",
        "newsletter.empty_body": "Versuchen Sie eine andere Suche oder einen anderen Zeitraum oder schauen Sie später noch einmal vorbei, wenn ein neuer Newsletter hinzugefügt wurde.",
        "newsletter.issue_singular": "Ausgabe",
        "newsletter.issue_plural": "Ausgaben",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "PDF öffnen",
        "newsletter.delete": "Löschen",
        "newsletter.delete_confirm": "Möchten Sie diesen Newsletter wirklich löschen?",
        "newsletter.publish_date": "Veröffentlichungsdatum",
        "newsletter.volume": "Band",
        "newsletter.issue": "Ausgabe",
        "newsletter.file_upload": "PDF hochladen",
        "newsletter.submit": "Veröffentlichen",
        "newsletter.submitting": "Wird veröffentlicht...",
        "newsletter.selected_file": "Ausgewählte Datei",
        "newsletter.no_file_selected": "Keine Datei ausgewählt",
        "newsletter.uploading": "Wird hochgeladen...",
        "newsletter.file_ready": "Datei bereit",
        "newsletter.upload_first": "Bitte laden Sie zuerst die PDF-Datei hoch.",
        "newsletter.upload_failed": "Datei-Upload fehlgeschlagen.",
        "newsletter.save_failed": "Der Newsletter konnte nicht gespeichert werden.",
        "newsletter.delete_failed": "Der Newsletter konnte nicht gelöscht werden.",
        "newsletter.load_error": "Das Newsletter-Archiv konnte derzeit nicht geladen werden."
    },
    "pt-BR": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Arquivo de newsletters",
        "newsletter.description": "Esta página oferece o arquivo da newsletter da KISS em formato PDF, organizado por data de publicação, volume e número.",
        "newsletter.manage_title": "Gerenciamento da newsletter",
        "newsletter.manage_body": "Administradores podem enviar o PDF da newsletter, registrar a data de publicação, o volume e o número e manter o arquivo atualizado.",
        "newsletter.filter_label": "Filtrar por intervalo de 5 anos",
        "newsletter.all": "Todos",
        "newsletter.search_placeholder": "Pesquisar por data, volume ou número...",
        "newsletter.empty_title": "Nenhuma newsletter corresponde aos filtros atuais.",
        "newsletter.empty_body": "Tente outra busca ou intervalo, ou volte mais tarde quando uma nova newsletter for adicionada.",
        "newsletter.issue_singular": "edição",
        "newsletter.issue_plural": "edições",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Abrir PDF",
        "newsletter.delete": "Excluir",
        "newsletter.delete_confirm": "Tem certeza de que deseja excluir esta newsletter?",
        "newsletter.publish_date": "Data de publicação",
        "newsletter.volume": "Volume",
        "newsletter.issue": "Número",
        "newsletter.file_upload": "Enviar PDF",
        "newsletter.submit": "Publicar",
        "newsletter.submitting": "Publicando...",
        "newsletter.selected_file": "Arquivo selecionado",
        "newsletter.no_file_selected": "Nenhum arquivo selecionado",
        "newsletter.uploading": "Enviando...",
        "newsletter.file_ready": "Arquivo pronto",
        "newsletter.upload_first": "Envie primeiro o arquivo PDF.",
        "newsletter.upload_failed": "Falha no envio do arquivo.",
        "newsletter.save_failed": "Não foi possível salvar a newsletter.",
        "newsletter.delete_failed": "Não foi possível excluir a newsletter.",
        "newsletter.load_error": "Não foi possível carregar o arquivo de newsletters agora."
    },
    "ru": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Архив рассылки",
        "newsletter.description": "На этой странице архив рассылки KISS представлен в формате PDF и упорядочен по дате публикации, тому и выпуску.",
        "newsletter.manage_title": "Управление рассылкой",
        "newsletter.manage_body": "Администраторы могут загружать PDF рассылки, указывать дату публикации, том и выпуск и поддерживать архив в актуальном состоянии.",
        "newsletter.filter_label": "Фильтр по 5-летнему диапазону",
        "newsletter.all": "Все",
        "newsletter.search_placeholder": "Поиск по дате, тому или выпуску...",
        "newsletter.empty_title": "По текущим фильтрам рассылки не найдены.",
        "newsletter.empty_body": "Попробуйте другой поиск или диапазон, либо зайдите позже, когда будет добавлена новая рассылка.",
        "newsletter.issue_singular": "выпуск",
        "newsletter.issue_plural": "выпусков",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Открыть PDF",
        "newsletter.delete": "Удалить",
        "newsletter.delete_confirm": "Вы уверены, что хотите удалить эту рассылку?",
        "newsletter.publish_date": "Дата публикации",
        "newsletter.volume": "Том",
        "newsletter.issue": "Выпуск",
        "newsletter.file_upload": "Загрузить PDF",
        "newsletter.submit": "Опубликовать",
        "newsletter.submitting": "Публикация...",
        "newsletter.selected_file": "Выбранный файл",
        "newsletter.no_file_selected": "Файл не выбран",
        "newsletter.uploading": "Загрузка...",
        "newsletter.file_ready": "Файл готов",
        "newsletter.upload_first": "Сначала загрузите PDF-файл.",
        "newsletter.upload_failed": "Не удалось загрузить файл.",
        "newsletter.save_failed": "Не удалось сохранить рассылку.",
        "newsletter.delete_failed": "Не удалось удалить рассылку.",
        "newsletter.load_error": "Сейчас не удалось загрузить архив рассылки."
    },
    "id": {
        "newsletter.title": "Buletin",
        "newsletter.badge": "Arsip buletin",
        "newsletter.description": "Halaman ini menyediakan arsip newsletter KISS dalam format PDF yang disusun berdasarkan tanggal terbit, volume, dan edisi.",
        "newsletter.manage_title": "Pengelolaan buletin",
        "newsletter.manage_body": "Administrator dapat mengunggah PDF buletin, mencatat tanggal terbit, volume, dan nomor, serta menjaga arsip tetap mutakhir.",
        "newsletter.filter_label": "Filter berdasarkan rentang 5 tahun",
        "newsletter.all": "Semua",
        "newsletter.search_placeholder": "Cari berdasarkan tanggal, volume, atau nomor...",
        "newsletter.empty_title": "Tidak ada buletin yang cocok dengan filter saat ini.",
        "newsletter.empty_body": "Coba pencarian atau rentang lain, atau periksa kembali nanti setelah buletin baru ditambahkan.",
        "newsletter.issue_singular": "edisi",
        "newsletter.issue_plural": "edisi",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Buka PDF",
        "newsletter.delete": "Hapus",
        "newsletter.delete_confirm": "Apakah Anda yakin ingin menghapus buletin ini?",
        "newsletter.publish_date": "Tanggal terbit",
        "newsletter.volume": "Volume",
        "newsletter.issue": "Nomor",
        "newsletter.file_upload": "Unggah PDF",
        "newsletter.submit": "Terbitkan",
        "newsletter.submitting": "Menerbitkan...",
        "newsletter.selected_file": "File terpilih",
        "newsletter.no_file_selected": "Belum ada file yang dipilih",
        "newsletter.uploading": "Mengunggah...",
        "newsletter.file_ready": "File siap",
        "newsletter.upload_first": "Silakan unggah file PDF terlebih dahulu.",
        "newsletter.upload_failed": "Unggah file gagal.",
        "newsletter.save_failed": "Gagal menyimpan buletin.",
        "newsletter.delete_failed": "Gagal menghapus buletin.",
        "newsletter.load_error": "Kami tidak dapat memuat arsip buletin saat ini."
    },
    "vi": {
        "newsletter.title": "Bản tin",
        "newsletter.badge": "Kho lưu trữ bản tin",
        "newsletter.description": "Trang này cung cấp kho lưu trữ bản tin KISS ở định dạng PDF, được sắp xếp theo ngày phát hành, tập và số.",
        "newsletter.manage_title": "Quản lý bản tin",
        "newsletter.manage_body": "Quản trị viên có thể tải lên PDF bản tin, đăng ký ngày phát hành, tập và số, đồng thời giữ cho kho lưu trữ luôn được cập nhật.",
        "newsletter.filter_label": "Lọc theo khoảng 5 năm",
        "newsletter.all": "Tất cả",
        "newsletter.search_placeholder": "Tìm theo ngày, tập hoặc số...",
        "newsletter.empty_title": "Không có bản tin nào khớp với bộ lọc hiện tại.",
        "newsletter.empty_body": "Hãy thử từ khóa hoặc khoảng thời gian khác, hoặc quay lại sau khi có bản tin mới được thêm.",
        "newsletter.issue_singular": "số",
        "newsletter.issue_plural": "số",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Mở PDF",
        "newsletter.delete": "Xóa",
        "newsletter.delete_confirm": "Bạn có chắc muốn xóa bản tin này không?",
        "newsletter.publish_date": "Ngày phát hành",
        "newsletter.volume": "Tập",
        "newsletter.issue": "Số",
        "newsletter.file_upload": "Tải lên PDF",
        "newsletter.submit": "Đăng",
        "newsletter.submitting": "Đang đăng...",
        "newsletter.selected_file": "Tệp đã chọn",
        "newsletter.no_file_selected": "Chưa chọn tệp",
        "newsletter.uploading": "Đang tải lên...",
        "newsletter.file_ready": "Tệp đã sẵn sàng",
        "newsletter.upload_first": "Vui lòng tải tệp PDF lên trước.",
        "newsletter.upload_failed": "Tải tệp lên thất bại.",
        "newsletter.save_failed": "Không thể lưu bản tin.",
        "newsletter.delete_failed": "Không thể xóa bản tin.",
        "newsletter.load_error": "Hiện không thể tải kho lưu trữ bản tin."
    },
    "th": {
        "newsletter.title": "จดหมายข่าว",
        "newsletter.badge": "คลังจดหมายข่าว",
        "newsletter.description": "หน้านี้รวบรวมจดหมายข่าว KISS ในรูปแบบ PDF โดยจัดเรียงตามวันเผยแพร่ เล่ม และฉบับ",
        "newsletter.manage_title": "จัดการจดหมายข่าว",
        "newsletter.manage_body": "ผู้ดูแลระบบสามารถอัปโหลด PDF ของจดหมายข่าว ระบุวันที่เผยแพร่ เล่ม และฉบับ และดูแลให้คลังข้อมูลเป็นปัจจุบันอยู่เสมอ",
        "newsletter.filter_label": "กรองตามช่วงเวลา 5 ปี",
        "newsletter.all": "ทั้งหมด",
        "newsletter.search_placeholder": "ค้นหาตามวันที่ เล่ม หรือฉบับ...",
        "newsletter.empty_title": "ไม่มีจดหมายข่าวที่ตรงกับตัวกรองปัจจุบัน",
        "newsletter.empty_body": "ลองค้นหาหรือเลือกช่วงเวลาอื่น หรือกลับมาตรวจสอบอีกครั้งเมื่อมีการเพิ่มจดหมายข่าวใหม่",
        "newsletter.issue_singular": "ฉบับ",
        "newsletter.issue_plural": "ฉบับ",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "เปิด PDF",
        "newsletter.delete": "ลบ",
        "newsletter.delete_confirm": "คุณแน่ใจหรือไม่ว่าต้องการลบจดหมายข่าวนี้?",
        "newsletter.publish_date": "วันที่เผยแพร่",
        "newsletter.volume": "เล่ม",
        "newsletter.issue": "ฉบับ",
        "newsletter.file_upload": "อัปโหลด PDF",
        "newsletter.submit": "เผยแพร่",
        "newsletter.submitting": "กำลังเผยแพร่...",
        "newsletter.selected_file": "ไฟล์ที่เลือก",
        "newsletter.no_file_selected": "ยังไม่ได้เลือกไฟล์",
        "newsletter.uploading": "กำลังอัปโหลด...",
        "newsletter.file_ready": "ไฟล์พร้อมแล้ว",
        "newsletter.upload_first": "กรุณาอัปโหลดไฟล์ PDF ก่อน",
        "newsletter.upload_failed": "อัปโหลดไฟล์ไม่สำเร็จ",
        "newsletter.save_failed": "บันทึกจดหมายข่าวไม่สำเร็จ",
        "newsletter.delete_failed": "ลบจดหมายข่าวไม่สำเร็จ",
        "newsletter.load_error": "ไม่สามารถโหลดคลังจดหมายข่าวได้ในขณะนี้"
    },
    "ms": {
        "newsletter.title": "Surat berita",
        "newsletter.badge": "Arkib surat berita",
        "newsletter.description": "Halaman ini menyediakan arkib surat berita KISS dalam format PDF yang disusun mengikut tarikh penerbitan, jilid dan isu.",
        "newsletter.manage_title": "Pengurusan surat berita",
        "newsletter.manage_body": "Pentadbir boleh memuat naik PDF surat berita, mendaftarkan tarikh penerbitan, jilid dan isu, serta memastikan arkib sentiasa dikemas kini.",
        "newsletter.filter_label": "Tapis mengikut julat 5 tahun",
        "newsletter.all": "Semua",
        "newsletter.search_placeholder": "Cari mengikut tarikh, jilid atau isu...",
        "newsletter.empty_title": "Tiada surat berita yang sepadan dengan penapis semasa.",
        "newsletter.empty_body": "Cuba carian atau julat lain, atau semak semula kemudian selepas surat berita baharu ditambah.",
        "newsletter.issue_singular": "isu",
        "newsletter.issue_plural": "isu",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Buka PDF",
        "newsletter.delete": "Padam",
        "newsletter.delete_confirm": "Adakah anda pasti mahu memadam surat berita ini?",
        "newsletter.publish_date": "Tarikh penerbitan",
        "newsletter.volume": "Jilid",
        "newsletter.issue": "Isu",
        "newsletter.file_upload": "Muat naik PDF",
        "newsletter.submit": "Terbitkan",
        "newsletter.submitting": "Sedang diterbitkan...",
        "newsletter.selected_file": "Fail dipilih",
        "newsletter.no_file_selected": "Tiada fail dipilih",
        "newsletter.uploading": "Sedang memuat naik...",
        "newsletter.file_ready": "Fail sedia",
        "newsletter.upload_first": "Sila muat naik fail PDF terlebih dahulu.",
        "newsletter.upload_failed": "Muat naik fail gagal.",
        "newsletter.save_failed": "Gagal menyimpan surat berita.",
        "newsletter.delete_failed": "Gagal memadam surat berita.",
        "newsletter.load_error": "Kami tidak dapat memuatkan arkib surat berita sekarang."
    },
    "fil": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Arkibo ng newsletter",
        "newsletter.description": "Ibinibigay ng pahinang ito ang archive ng newsletter ng KISS sa PDF format, na nakaayos ayon sa petsa ng publikasyon, bolyum, at isyu.",
        "newsletter.manage_title": "Pamamahala ng newsletter",
        "newsletter.manage_body": "Maaaring mag-upload ang mga administrator ng PDF ng newsletter, ilagay ang petsa ng publikasyon, bolyum, at isyu, at panatilihing napapanahon ang arkibo.",
        "newsletter.filter_label": "I-filter ayon sa 5-taong saklaw",
        "newsletter.all": "Lahat",
        "newsletter.search_placeholder": "Maghanap ayon sa petsa, bolyum, o isyu...",
        "newsletter.empty_title": "Walang newsletter na tumutugma sa kasalukuyang mga filter.",
        "newsletter.empty_body": "Subukan ang ibang paghahanap o saklaw, o bumalik muli kapag may bagong newsletter na naidagdag.",
        "newsletter.issue_singular": "isyu",
        "newsletter.issue_plural": "isyu",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Buksan ang PDF",
        "newsletter.delete": "Tanggalin",
        "newsletter.delete_confirm": "Sigurado ka bang gusto mong tanggalin ang newsletter na ito?",
        "newsletter.publish_date": "Petsa ng publikasyon",
        "newsletter.volume": "Bolyum",
        "newsletter.issue": "Isyu",
        "newsletter.file_upload": "Mag-upload ng PDF",
        "newsletter.submit": "I-publish",
        "newsletter.submitting": "Ipinapaskil...",
        "newsletter.selected_file": "Napiling file",
        "newsletter.no_file_selected": "Walang napiling file",
        "newsletter.uploading": "Ina-upload...",
        "newsletter.file_ready": "Handa na ang file",
        "newsletter.upload_first": "Pakiupload muna ang PDF file.",
        "newsletter.upload_failed": "Nabigo ang pag-upload ng file.",
        "newsletter.save_failed": "Hindi naisave ang newsletter.",
        "newsletter.delete_failed": "Hindi matanggal ang newsletter.",
        "newsletter.load_error": "Hindi namin ma-load ang arkibo ng newsletter sa ngayon."
    },
    "hi": {
        "newsletter.title": "न्यूज़लेटर",
        "newsletter.badge": "न्यूज़लेटर अभिलेखागार",
        "newsletter.description": "यह पृष्ठ KISS न्यूज़लेटर अभिलेख को PDF रूप में उपलब्ध कराता है, जिसे प्रकाशन तिथि, खंड और अंक के आधार पर व्यवस्थित किया गया है।",
        "newsletter.manage_title": "न्यूज़लेटर प्रबंधन",
        "newsletter.manage_body": "प्रशासक न्यूज़लेटर PDF अपलोड कर सकते हैं, प्रकाशन तिथि, वॉल्यूम और अंक दर्ज कर सकते हैं, और अभिलेखागार को अद्यतन रख सकते हैं।",
        "newsletter.filter_label": "5-वर्षीय सीमा के अनुसार फ़िल्टर करें",
        "newsletter.all": "सभी",
        "newsletter.search_placeholder": "तिथि, वॉल्यूम या अंक से खोजें...",
        "newsletter.empty_title": "वर्तमान फ़िल्टर से कोई न्यूज़लेटर नहीं मिला।",
        "newsletter.empty_body": "कोई अन्य खोज या सीमा आज़माएँ, या नया न्यूज़लेटर जुड़ने के बाद बाद में फिर देखें।",
        "newsletter.issue_singular": "अंक",
        "newsletter.issue_plural": "अंक",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "PDF खोलें",
        "newsletter.delete": "हटाएँ",
        "newsletter.delete_confirm": "क्या आप वाकई इस न्यूज़लेटर को हटाना चाहते हैं?",
        "newsletter.publish_date": "प्रकाशन तिथि",
        "newsletter.volume": "वॉल्यूम",
        "newsletter.issue": "अंक",
        "newsletter.file_upload": "PDF अपलोड करें",
        "newsletter.submit": "प्रकाशित करें",
        "newsletter.submitting": "प्रकाशित किया जा रहा है...",
        "newsletter.selected_file": "चयनित फ़ाइल",
        "newsletter.no_file_selected": "कोई फ़ाइल चयनित नहीं है",
        "newsletter.uploading": "अपलोड हो रहा है...",
        "newsletter.file_ready": "फ़ाइल तैयार है",
        "newsletter.upload_first": "कृपया पहले PDF फ़ाइल अपलोड करें।",
        "newsletter.upload_failed": "फ़ाइल अपलोड विफल रहा।",
        "newsletter.save_failed": "न्यूज़लेटर सहेजा नहीं जा सका।",
        "newsletter.delete_failed": "न्यूज़लेटर हटाया नहीं जा सका।",
        "newsletter.load_error": "अभी न्यूज़लेटर अभिलेखागार लोड नहीं किया जा सका।"
    },
    "ar": {
        "newsletter.title": "النشرة الإخبارية",
        "newsletter.badge": "أرشيف النشرة الإخبارية",
        "newsletter.description": "توفّر هذه الصفحة أرشيف النشرة الإخبارية لـ KISS بصيغة PDF، منظّمًا حسب تاريخ النشر والمجلد والعدد.",
        "newsletter.manage_title": "إدارة النشرة الإخبارية",
        "newsletter.manage_body": "يمكن للمسؤولين رفع ملف PDF للنشرة الإخبارية وتسجيل تاريخ النشر والمجلد والعدد والحفاظ على الأرشيف محدثًا.",
        "newsletter.filter_label": "تصفية حسب نطاق 5 سنوات",
        "newsletter.all": "الكل",
        "newsletter.search_placeholder": "ابحث حسب التاريخ أو المجلد أو العدد...",
        "newsletter.empty_title": "لا توجد نشرات إخبارية تطابق المرشحات الحالية.",
        "newsletter.empty_body": "جرّب بحثًا أو نطاقًا مختلفًا، أو عُد لاحقًا بعد إضافة نشرة إخبارية جديدة.",
        "newsletter.issue_singular": "عدد",
        "newsletter.issue_plural": "أعداد",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "فتح PDF",
        "newsletter.delete": "حذف",
        "newsletter.delete_confirm": "هل أنت متأكد من رغبتك في حذف هذه النشرة الإخبارية؟",
        "newsletter.publish_date": "تاريخ النشر",
        "newsletter.volume": "المجلد",
        "newsletter.issue": "العدد",
        "newsletter.file_upload": "رفع PDF",
        "newsletter.submit": "نشر",
        "newsletter.submitting": "جارٍ النشر...",
        "newsletter.selected_file": "الملف المحدد",
        "newsletter.no_file_selected": "لم يتم تحديد ملف",
        "newsletter.uploading": "جارٍ الرفع...",
        "newsletter.file_ready": "الملف جاهز",
        "newsletter.upload_first": "يرجى رفع ملف PDF أولًا.",
        "newsletter.upload_failed": "فشل رفع الملف.",
        "newsletter.save_failed": "تعذر حفظ النشرة الإخبارية.",
        "newsletter.delete_failed": "تعذر حذف النشرة الإخبارية.",
        "newsletter.load_error": "تعذر تحميل أرشيف النشرة الإخبارية حاليًا."
    },
    "it": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Archivio newsletter",
        "newsletter.description": "Questa pagina presenta l’archivio della newsletter KISS in formato PDF, organizzato per data di pubblicazione, volume e numero.",
        "newsletter.manage_title": "Gestione della newsletter",
        "newsletter.manage_body": "Gli amministratori possono caricare il PDF della newsletter, registrare data di pubblicazione, volume e numero e mantenere aggiornato l’archivio.",
        "newsletter.filter_label": "Filtra per intervallo di 5 anni",
        "newsletter.all": "Tutti",
        "newsletter.search_placeholder": "Cerca per data, volume o numero...",
        "newsletter.empty_title": "Nessuna newsletter corrisponde ai filtri attuali.",
        "newsletter.empty_body": "Prova un’altra ricerca o un altro intervallo, oppure torna più tardi dopo l’aggiunta di una nuova newsletter.",
        "newsletter.issue_singular": "numero",
        "newsletter.issue_plural": "numeri",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Apri PDF",
        "newsletter.delete": "Elimina",
        "newsletter.delete_confirm": "Sei sicuro di voler eliminare questa newsletter?",
        "newsletter.publish_date": "Data di pubblicazione",
        "newsletter.volume": "Volume",
        "newsletter.issue": "Numero",
        "newsletter.file_upload": "Carica PDF",
        "newsletter.submit": "Pubblica",
        "newsletter.submitting": "Pubblicazione in corso...",
        "newsletter.selected_file": "File selezionato",
        "newsletter.no_file_selected": "Nessun file selezionato",
        "newsletter.uploading": "Caricamento...",
        "newsletter.file_ready": "File pronto",
        "newsletter.upload_first": "Carica prima il file PDF.",
        "newsletter.upload_failed": "Caricamento del file non riuscito.",
        "newsletter.save_failed": "Impossibile salvare la newsletter.",
        "newsletter.delete_failed": "Impossibile eliminare la newsletter.",
        "newsletter.load_error": "Impossibile caricare l’archivio delle newsletter in questo momento."
    },
    "nl": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Newsletter-archief",
        "newsletter.description": "Deze pagina biedt het KISS-nieuwsbriefarchief in PDF-formaat, geordend op publicatiedatum, volume en nummer.",
        "newsletter.manage_title": "Beheer van de nieuwsbrief",
        "newsletter.manage_body": "Beheerders kunnen de PDF van de nieuwsbrief uploaden, de publicatiedatum, het volume en het nummer registreren en het archief actueel houden.",
        "newsletter.filter_label": "Filter op periode van 5 jaar",
        "newsletter.all": "Alles",
        "newsletter.search_placeholder": "Zoek op datum, volume of nummer...",
        "newsletter.empty_title": "Geen nieuwsbrieven komen overeen met de huidige filters.",
        "newsletter.empty_body": "Probeer een andere zoekopdracht of periode, of kom later terug nadat een nieuwe nieuwsbrief is toegevoegd.",
        "newsletter.issue_singular": "nummer",
        "newsletter.issue_plural": "nummers",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "PDF openen",
        "newsletter.delete": "Verwijderen",
        "newsletter.delete_confirm": "Weet u zeker dat u deze nieuwsbrief wilt verwijderen?",
        "newsletter.publish_date": "Publicatiedatum",
        "newsletter.volume": "Volume",
        "newsletter.issue": "Nummer",
        "newsletter.file_upload": "PDF uploaden",
        "newsletter.submit": "Publiceren",
        "newsletter.submitting": "Bezig met publiceren...",
        "newsletter.selected_file": "Geselecteerd bestand",
        "newsletter.no_file_selected": "Geen bestand geselecteerd",
        "newsletter.uploading": "Uploaden...",
        "newsletter.file_ready": "Bestand gereed",
        "newsletter.upload_first": "Upload eerst het PDF-bestand.",
        "newsletter.upload_failed": "Uploaden van bestand mislukt.",
        "newsletter.save_failed": "De nieuwsbrief kon niet worden opgeslagen.",
        "newsletter.delete_failed": "De nieuwsbrief kon niet worden verwijderd.",
        "newsletter.load_error": "We konden het nieuwsbriefarchief nu niet laden."
    },
    "pl": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Archiwum newslettera",
        "newsletter.description": "Ta strona udostępnia archiwum newslettera KISS w formacie PDF, uporządkowane według daty publikacji, tomu i numeru.",
        "newsletter.manage_title": "Zarządzanie newsletterem",
        "newsletter.manage_body": "Administratorzy mogą przesyłać plik PDF newslettera, rejestrować datę publikacji, tom i numer oraz utrzymywać archiwum na bieżąco.",
        "newsletter.filter_label": "Filtruj według zakresu 5 lat",
        "newsletter.all": "Wszystkie",
        "newsletter.search_placeholder": "Szukaj według daty, tomu lub numeru...",
        "newsletter.empty_title": "Żaden newsletter nie pasuje do bieżących filtrów.",
        "newsletter.empty_body": "Wypróbuj inne wyszukiwanie lub zakres albo wróć później po dodaniu nowego newslettera.",
        "newsletter.issue_singular": "numer",
        "newsletter.issue_plural": "numery",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Otwórz PDF",
        "newsletter.delete": "Usuń",
        "newsletter.delete_confirm": "Czy na pewno chcesz usunąć ten newsletter?",
        "newsletter.publish_date": "Data publikacji",
        "newsletter.volume": "Tom",
        "newsletter.issue": "Numer",
        "newsletter.file_upload": "Prześlij PDF",
        "newsletter.submit": "Publikuj",
        "newsletter.submitting": "Publikowanie...",
        "newsletter.selected_file": "Wybrany plik",
        "newsletter.no_file_selected": "Nie wybrano pliku",
        "newsletter.uploading": "Przesyłanie...",
        "newsletter.file_ready": "Plik gotowy",
        "newsletter.upload_first": "Najpierw prześlij plik PDF.",
        "newsletter.upload_failed": "Przesyłanie pliku nie powiodło się.",
        "newsletter.save_failed": "Nie udało się zapisać newslettera.",
        "newsletter.delete_failed": "Nie udało się usunąć newslettera.",
        "newsletter.load_error": "Nie udało się teraz załadować archiwum newslettera."
    },
    "sv": {
        "newsletter.title": "Nyhetsbrev",
        "newsletter.badge": "Nyhetsbrevsarkiv",
        "newsletter.description": "Den här sidan erbjuder KISS-nyhetsbrevsarkivet i PDF-format, ordnat efter publiceringsdatum, volym och nummer.",
        "newsletter.manage_title": "Hantering av nyhetsbrev",
        "newsletter.manage_body": "Administratörer kan ladda upp nyhetsbrevets PDF, registrera publiceringsdatum, volym och nummer och hålla arkivet uppdaterat.",
        "newsletter.filter_label": "Filtrera efter 5-årsintervall",
        "newsletter.all": "Alla",
        "newsletter.search_placeholder": "Sök efter datum, volym eller nummer...",
        "newsletter.empty_title": "Inga nyhetsbrev matchar de aktuella filtren.",
        "newsletter.empty_body": "Prova en annan sökning eller ett annat intervall, eller kom tillbaka senare när ett nytt nyhetsbrev har lagts till.",
        "newsletter.issue_singular": "nummer",
        "newsletter.issue_plural": "nummer",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Öppna PDF",
        "newsletter.delete": "Ta bort",
        "newsletter.delete_confirm": "Är du säker på att du vill ta bort det här nyhetsbrevet?",
        "newsletter.publish_date": "Publiceringsdatum",
        "newsletter.volume": "Volym",
        "newsletter.issue": "Nummer",
        "newsletter.file_upload": "Ladda upp PDF",
        "newsletter.submit": "Publicera",
        "newsletter.submitting": "Publicerar...",
        "newsletter.selected_file": "Vald fil",
        "newsletter.no_file_selected": "Ingen fil vald",
        "newsletter.uploading": "Laddar upp...",
        "newsletter.file_ready": "Filen är klar",
        "newsletter.upload_first": "Ladda upp PDF-filen först.",
        "newsletter.upload_failed": "Filuppladdningen misslyckades.",
        "newsletter.save_failed": "Det gick inte att spara nyhetsbrevet.",
        "newsletter.delete_failed": "Det gick inte att ta bort nyhetsbrevet.",
        "newsletter.load_error": "Vi kunde inte ladda nyhetsbrevsarkivet just nu."
    },
    "tr": {
        "newsletter.title": "Bülten",
        "newsletter.badge": "Bülten arşivi",
        "newsletter.description": "Bu sayfa, KISS bülten arşivini PDF formatında; yayın tarihi, cilt ve sayı bilgilerine göre düzenlenmiş olarak sunar.",
        "newsletter.manage_title": "Bülten yönetimi",
        "newsletter.manage_body": "Yöneticiler bülten PDF dosyasını yükleyebilir, yayın tarihi, cilt ve sayı bilgisini kaydedebilir ve arşivi güncel tutabilir.",
        "newsletter.filter_label": "5 yıllık aralığa göre filtrele",
        "newsletter.all": "Tümü",
        "newsletter.search_placeholder": "Tarih, cilt veya sayıya göre ara...",
        "newsletter.empty_title": "Geçerli filtrelerle eşleşen bülten bulunamadı.",
        "newsletter.empty_body": "Başka bir arama veya aralık deneyin ya da yeni bir bülten eklendikten sonra daha sonra tekrar kontrol edin.",
        "newsletter.issue_singular": "sayı",
        "newsletter.issue_plural": "sayı",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "PDF aç",
        "newsletter.delete": "Sil",
        "newsletter.delete_confirm": "Bu bülteni silmek istediğinizden emin misiniz?",
        "newsletter.publish_date": "Yayın tarihi",
        "newsletter.volume": "Cilt",
        "newsletter.issue": "Sayı",
        "newsletter.file_upload": "PDF yükle",
        "newsletter.submit": "Yayınla",
        "newsletter.submitting": "Yayınlanıyor...",
        "newsletter.selected_file": "Seçilen dosya",
        "newsletter.no_file_selected": "Dosya seçilmedi",
        "newsletter.uploading": "Yükleniyor...",
        "newsletter.file_ready": "Dosya hazır",
        "newsletter.upload_first": "Lütfen önce PDF dosyasını yükleyin.",
        "newsletter.upload_failed": "Dosya yükleme başarısız oldu.",
        "newsletter.save_failed": "Bülten kaydedilemedi.",
        "newsletter.delete_failed": "Bülten silinemedi.",
        "newsletter.load_error": "Bülten arşivi şu anda yüklenemedi."
    },
    "uk": {
        "newsletter.title": "Newsletter",
        "newsletter.badge": "Архів розсилки",
        "newsletter.description": "На цій сторінці архів бюлетеня KISS подано у форматі PDF та впорядковано за датою публікації, томом і випуском.",
        "newsletter.manage_title": "Керування розсилкою",
        "newsletter.manage_body": "Адміністратори можуть завантажувати PDF розсилки, вказувати дату публікації, том і випуск та підтримувати архів в актуальному стані.",
        "newsletter.filter_label": "Фільтр за 5-річним діапазоном",
        "newsletter.all": "Усі",
        "newsletter.search_placeholder": "Пошук за датою, томом або випуском...",
        "newsletter.empty_title": "За поточними фільтрами розсилок не знайдено.",
        "newsletter.empty_body": "Спробуйте інший пошук або діапазон, або поверніться пізніше, коли буде додано нову розсилку.",
        "newsletter.issue_singular": "випуск",
        "newsletter.issue_plural": "випуски",
        "newsletter.pdf": "PDF",
        "newsletter.open_pdf": "Відкрити PDF",
        "newsletter.delete": "Видалити",
        "newsletter.delete_confirm": "Ви впевнені, що хочете видалити цю розсилку?",
        "newsletter.publish_date": "Дата публікації",
        "newsletter.volume": "Том",
        "newsletter.issue": "Випуск",
        "newsletter.file_upload": "Завантажити PDF",
        "newsletter.submit": "Опублікувати",
        "newsletter.submitting": "Публікація...",
        "newsletter.selected_file": "Вибраний файл",
        "newsletter.no_file_selected": "Файл не вибрано",
        "newsletter.uploading": "Завантаження...",
        "newsletter.file_ready": "Файл готовий",
        "newsletter.upload_first": "Спочатку завантажте PDF-файл.",
        "newsletter.upload_failed": "Не вдалося завантажити файл.",
        "newsletter.save_failed": "Не вдалося зберегти розсилку.",
        "newsletter.delete_failed": "Не вдалося видалити розсилку.",
        "newsletter.load_error": "Зараз не вдалося завантажити архів розсилки."
    }
};

    function t(lang, key) {
        const selected = dict[lang] || {};
        const en = dict.en || {};
        const ko = dict.ko || {};

        if (selected[key] != null && selected[key] !== '') {
            return selected[key];
        }
        if (en[key] != null && en[key] !== '') {
            return en[key];
        }
        if (ko[key] != null && ko[key] !== '') {
            return ko[key];
        }
        return key;
    }

    function isRTL(lang) {
        return String(lang || '') === 'ar';
    }

    function resolveLangCode(code) {
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

    function normalizeCoverage() {
        const en = dict.en || {};
        const ko = dict.ko || {};

        languages.forEach(function (language) {
            if (!dict[language.code]) {
                dict[language.code] = {};
            }

            UI_KEYS.forEach(function (key) {
                if (dict[language.code][key] == null || dict[language.code][key] === '') {
                    if (en[key] != null) {
                        dict[language.code][key] = en[key];
                    } else if (ko[key] != null) {
                        dict[language.code][key] = ko[key];
                    } else {
                        dict[language.code][key] = key;
                    }
                }
            });
        });
    }

    function getInitialLang() {
        const saved = localStorage.getItem('statkiss_lang');
        const browser = navigator.language || 'en';
        const initial = resolveLangCode(saved || browser);
        const best = languages.find(function (l) { return l.code === initial; }) ||
                     languages.find(function (l) { return initial.indexOf(l.code) === 0; }) ||
                     languages.find(function (l) { return l.code.indexOf(initial.split('-')[0]) === 0; }) ||
                     languages[0];
        return best ? best.code : 'en';
    }


    const EN_MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

    function getLocale(lang) {
        const normalized = resolveLangCode(lang);
        const map = {
            'en': 'en-US',
            'ko': 'ko-KR',
            'ja': 'ja-JP',
            'zh-Hans': 'zh-CN',
            'zh-Hant': 'zh-TW',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'de': 'de-DE',
            'pt-BR': 'pt-BR',
            'ru': 'ru-RU',
            'id': 'id-ID',
            'vi': 'vi-VN',
            'th': 'th-TH-u-ca-gregory',
            'ms': 'ms-MY',
            'fil': 'fil-PH',
            'hi': 'hi-IN',
            'ar': 'ar',
            'it': 'it-IT',
            'nl': 'nl-NL',
            'pl': 'pl-PL',
            'sv': 'sv-SE',
            'tr': 'tr-TR',
            'uk': 'uk-UA'
        };
        return map[normalized] || normalized || 'en-US';
    }

    function formatNumber(lang, value) {
        const numeric = Number(value);
        if (!isFinite(numeric)) {
            return String(value == null ? '' : value);
        }

        try {
            return new Intl.NumberFormat(getLocale(lang), { useGrouping: false }).format(numeric);
        } catch (error) {
            return String(numeric);
        }
    }

    function parseIsoDate(value) {
        const raw = String(value || '').trim();
        const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
            return null;
        }

        return {
            year: parseInt(match[1], 10),
            month: parseInt(match[2], 10),
            day: parseInt(match[3], 10)
        };
    }

    function getMonthShort(lang, monthIndexZeroBased) {
        const normalized = resolveLangCode(lang);

        if (normalized === 'en') {
            return EN_MONTHS[monthIndexZeroBased] || '';
        }

        try {
            return new Intl.DateTimeFormat(getLocale(normalized), {
                month: 'short',
                timeZone: 'UTC'
            }).format(new Date(Date.UTC(2025, monthIndexZeroBased, 1)));
        } catch (error) {
            return EN_MONTHS[monthIndexZeroBased] || '';
        }
    }

    function formatYearMonth(lang, publishDate) {
        const parsed = parseIsoDate(publishDate);
        if (!parsed) {
            return String(publishDate || '');
        }

        const normalized = resolveLangCode(lang);
        const month = getMonthShort(normalized, parsed.month - 1);
        const year = formatNumber(normalized, parsed.year);

        switch (normalized) {
            case 'ko':
                return year + '년 ' + month;
            case 'ja':
                return year + '年' + month;
            case 'zh-Hans':
            case 'zh-Hant':
                return year + '年' + month;
            default:
                return month + ' ' + year;
        }
    }

    function formatIssueLabel(lang, issue) {
        const raw = String(issue == null ? '' : issue).trim();
        if (!raw) {
            return '';
        }

        const normalized = resolveLangCode(lang);
        const value = formatNumber(normalized, raw);

        switch (normalized) {
            case 'ko':
                return value + '호';
            case 'ja':
                return '第' + value + '号';
            case 'zh-Hans':
                return '第' + value + '期';
            case 'zh-Hant':
                return '第' + value + '期';
            case 'fr':
                return 'n° ' + value;
            case 'es':
                return 'n.º ' + value;
            case 'de':
                return 'Heft ' + value;
            case 'pt-BR':
                return 'nº ' + value;
            case 'ru':
                return 'вып. ' + value;
            case 'id':
                return 'Edisi ' + value;
            case 'vi':
                return 'Số ' + value;
            case 'th':
                return 'ฉบับที่ ' + value;
            case 'ms':
                return 'Isu ' + value;
            case 'fil':
                return 'Isyu ' + value;
            case 'hi':
                return 'अंक ' + value;
            case 'ar':
                return 'العدد ' + value;
            case 'it':
                return 'N. ' + value;
            case 'nl':
                return 'Nr. ' + value;
            case 'pl':
                return 'Nr ' + value;
            case 'sv':
                return 'Nr ' + value;
            case 'tr':
                return 'Sayı ' + value;
            case 'uk':
                return 'вип. ' + value;
            default:
                return t(normalized, 'newsletter.issue') + ' ' + value;
        }
    }

    function formatVolumeLabel(lang, volume) {
        const raw = String(volume == null ? '' : volume).trim();
        if (!raw) {
            return '';
        }

        const normalized = resolveLangCode(lang);
        const value = formatNumber(normalized, raw);

        switch (normalized) {
            case 'ko':
                return value + '권';
            case 'ja':
                return '第' + value + '巻';
            case 'zh-Hans':
            case 'zh-Hant':
                return '第' + value + '卷';
            default:
                return 'Vol. ' + value;
        }
    }

    function formatVolumeLine(lang, volume, issue) {
        const normalized = resolveLangCode(lang);
        const volumeLabel = formatVolumeLabel(normalized, volume);
        const issueLabel = formatIssueLabel(normalized, issue);

        if (!volumeLabel) {
            return issueLabel;
        }
        if (!issueLabel) {
            return volumeLabel;
        }

        switch (normalized) {
            case 'ko':
            case 'ja':
            case 'zh-Hans':
            case 'zh-Hant':
                return volumeLabel + ' ' + issueLabel;
            default:
                return volumeLabel + ', ' + issueLabel;
        }
    }

    function formatNewsletterHeading(lang, publishDate, volume, issue) {
        const yearMonth = formatYearMonth(lang, publishDate);
        const volumeLine = formatVolumeLine(lang, volume, issue);

        if (!yearMonth) {
            return volumeLine;
        }
        if (!volumeLine) {
            return yearMonth;
        }

        const normalized = resolveLangCode(lang);
        switch (normalized) {
            case 'ko':
            case 'ja':
            case 'zh-Hans':
            case 'zh-Hant':
                return yearMonth + ' ' + volumeLine;
            default:
                return yearMonth + ' · ' + volumeLine;
        }
    }

    function formatIssueCount(lang, count) {
        const normalized = resolveLangCode(lang);
        const value = formatNumber(normalized, count);

        switch (normalized) {
            case 'ko':
                return value + '호';
            case 'ja':
                return value + '号';
            case 'zh-Hans':
            case 'zh-Hant':
                return value + '期';
            default:
                return value + ' ' + (count === 1 ? t(normalized, 'newsletter.issue_singular') : t(normalized, 'newsletter.issue_plural'));
        }
    }

    normalizeCoverage();

    window.StatKISS_I18N_NEWSLETTER = {
        languages: languages,
        UI_KEYS: UI_KEYS,
        dict: dict,
        t: t,
        isRTL: isRTL,
        resolveLangCode: resolveLangCode,
        getInitialLang: getInitialLang,
        normalizeCoverage: normalizeCoverage,
        getLocale: getLocale,
        formatNumber: formatNumber,
        formatYearMonth: formatYearMonth,
        formatIssueLabel: formatIssueLabel,
        formatVolumeLabel: formatVolumeLabel,
        formatNewsletterHeading: formatNewsletterHeading,
        formatVolumeLine: formatVolumeLine,
        formatIssueCount: formatIssueCount
    };

    window.StatKISS_I18N_PUBS_NEWSLETTER = window.StatKISS_I18N_NEWSLETTER;
})();
