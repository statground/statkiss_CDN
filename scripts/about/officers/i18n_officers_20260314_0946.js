(function () {
  'use strict';

  const FALLBACK_LANGS = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '日本語' },
    { code: 'zh-Hans', label: '中文(简体)' },
    { code: 'zh-Hant', label: '中文(繁體)' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
    { code: 'ru', label: 'Русский' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'th', label: 'ไทย' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'fil', label: 'Filipino' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ar', label: 'العربية' },
    { code: 'it', label: 'Italiano' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'pl', label: 'Polski' },
    { code: 'sv', label: 'Svenska' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'uk', label: 'Українська' }
  ];

  function buildFallbackI18N() {
    const LANG_KEY = 'statkiss_lang';
    const dict = { en: {} };

    function resolveLangCode(code) {
      if (!code) return 'en';
      const c = String(code).trim();
      const lower = c.toLowerCase();
      if (c === 'zh' || lower.startsWith('zh-')) {
        if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) return 'zh-Hant';
        return 'zh-Hans';
      }
      if (c === 'tl' || lower.startsWith('tl-') || c === 'fil' || lower.startsWith('fil-')) return 'fil';
      if (c === 'pt' || lower.startsWith('pt-')) return 'pt-BR';
      if (lower.startsWith('en-')) return 'en';
      if (lower.startsWith('ja-')) return 'ja';
      if (lower.startsWith('ko-')) return 'ko';
      return c;
    }

    function isRTL(lang) {
      return lang === 'ar';
    }

    function applyLangToDocument(lang) {
      const root = document.documentElement;
      root.setAttribute('lang', lang);
      root.setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');
    }

    function t(lang, key) {
      const d = dict[lang] || {};
      const en = dict.en || {};
      return d[key] != null && d[key] !== '' ? d[key] : en[key] != null && en[key] !== '' ? en[key] : key;
    }

    function normalizeCoverage() {
      FALLBACK_LANGS.forEach((lang) => {
        if (!dict[lang.code]) dict[lang.code] = {};
        (window.StatKISS_I18N?.UI_KEYS || []).forEach((key) => {
          if (dict[lang.code][key] == null || dict[lang.code][key] === '') {
            dict[lang.code][key] = dict.en[key] != null && dict.en[key] !== '' ? dict.en[key] : key;
          }
        });
      });
    }

    function getInitialLang() {
      let saved = '';
      try {
        saved = localStorage.getItem(LANG_KEY) || '';
      } catch (_) {}
      const browser = navigator.language || 'en';
      const initial = resolveLangCode(saved || browser);
      const best = FALLBACK_LANGS.find((v) => v.code === initial)
        || FALLBACK_LANGS.find((v) => initial.startsWith(v.code))
        || FALLBACK_LANGS.find((v) => v.code.startsWith(initial.split('-')[0]))
        || FALLBACK_LANGS[0];
      return best ? best.code : 'en';
    }

    function init() {
      normalizeCoverage();
      const lang = getInitialLang();
      applyLangToDocument(lang);
      return lang;
    }

    return {
      LANG_KEY,
      languages: FALLBACK_LANGS,
      dict,
      UI_KEYS: [],
      t,
      resolveLangCode,
      normalizeCoverage,
      isRTL,
      getInitialLang,
      applyLangToDocument,
      init,
    };
  }

  if (!window.StatKISS_I18N) {
    window.StatKISS_I18N = buildFallbackI18N();
  }

  const I = window.StatKISS_I18N;
  if (!Array.isArray(I.languages) || I.languages.length === 0) {
    I.languages = FALLBACK_LANGS;
  }
  if (!I.dict) I.dict = { en: {} };
  if (!Array.isArray(I.UI_KEYS)) I.UI_KEYS = [];

  const OFFICER_KEYS = [
    'officers.title',
    'officers.subtitle',
    'officers.board_title',
    'officers.incoming_eyebrow',
    'officers.incoming_title',
    'officers.term_label',
    'officers.error',
    'officers.retry',
    'officers.empty',
  ];

  const OFFICER_DICT = {
    en: {
      'officers.title': 'Officers',
      'officers.subtitle': 'Korean International Statistical Society',
      'officers.board_title': 'Board of Directors',
      'officers.incoming_eyebrow': 'New Members',
      'officers.incoming_title': 'Incoming Board Members',
      'officers.term_label': 'Term',
      'officers.error': 'Unable to load the officers list. Please try again in a moment.',
      'officers.retry': 'Retry',
      'officers.empty': 'There are no officers to display yet.',
    },
    ko: {
      'officers.title': '임원진',
      'officers.subtitle': '한국국제통계학회',
      'officers.board_title': '이사회',
      'officers.incoming_eyebrow': '신규 이사',
      'officers.incoming_title': '차기 이사회',
      'officers.term_label': '임기',
      'officers.error': '임원진 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
      'officers.retry': '다시 시도',
      'officers.empty': '표시할 임원진 정보가 아직 없습니다.',
    },
    ja: {
      'officers.title': '役員',
      'officers.subtitle': '韓国国際統計学会',
      'officers.board_title': '理事会',
      'officers.incoming_eyebrow': '新任メンバー',
      'officers.incoming_title': '次期理事会',
      'officers.term_label': '任期',
      'officers.error': '役員一覧を読み込めませんでした。しばらくしてから再度お試しください。',
      'officers.retry': '再試行',
      'officers.empty': '表示できる役員情報はまだありません。',
    },
    'zh-Hans': {
      'officers.title': '理事与干部',
      'officers.subtitle': '韩国国际统计学会',
      'officers.board_title': '董事会',
      'officers.incoming_eyebrow': '新成员',
      'officers.incoming_title': '候任董事会成员',
      'officers.term_label': '任期',
      'officers.error': '无法加载干部名单，请稍后再试。',
      'officers.retry': '重试',
      'officers.empty': '当前没有可显示的干部信息。',
    },
    'zh-Hant': {
      'officers.title': '理事與幹部',
      'officers.subtitle': '韓國國際統計學會',
      'officers.board_title': '董事會',
      'officers.incoming_eyebrow': '新成員',
      'officers.incoming_title': '候任董事會成員',
      'officers.term_label': '任期',
      'officers.error': '無法載入幹部名單，請稍後再試。',
      'officers.retry': '重試',
      'officers.empty': '目前沒有可顯示的幹部資訊。',
    },
    es: {
      'officers.title': 'Directiva',
      'officers.subtitle': 'Sociedad Internacional Coreana de Estadística',
      'officers.board_title': 'Consejo Directivo',
      'officers.incoming_eyebrow': 'Nuevos miembros',
      'officers.incoming_title': 'Miembros entrantes del consejo',
      'officers.term_label': 'Periodo',
      'officers.error': 'No se pudo cargar la lista de directivos. Inténtalo de nuevo en un momento.',
      'officers.retry': 'Reintentar',
      'officers.empty': 'Aún no hay directivos para mostrar.',
    },
    fr: {
      'officers.title': 'Direction',
      'officers.subtitle': 'Société internationale coréenne de statistique',
      'officers.board_title': 'Conseil d’administration',
      'officers.incoming_eyebrow': 'Nouveaux membres',
      'officers.incoming_title': 'Nouveaux membres du conseil',
      'officers.term_label': 'Mandat',
      'officers.error': 'Impossible de charger la liste des responsables. Veuillez réessayer dans un instant.',
      'officers.retry': 'Réessayer',
      'officers.empty': 'Aucun responsable à afficher pour le moment.',
    },
    de: {
      'officers.title': 'Vorstand',
      'officers.subtitle': 'Koreanische Internationale Statistische Gesellschaft',
      'officers.board_title': 'Vorstandsgremium',
      'officers.incoming_eyebrow': 'Neue Mitglieder',
      'officers.incoming_title': 'Neue Vorstandsmitglieder',
      'officers.term_label': 'Amtszeit',
      'officers.error': 'Die Liste der Funktionsträger konnte nicht geladen werden. Bitte versuchen Sie es gleich noch einmal.',
      'officers.retry': 'Erneut versuchen',
      'officers.empty': 'Derzeit gibt es keine anzuzeigenden Funktionsträger.',
    },
    'pt-BR': {
      'officers.title': 'Diretoria',
      'officers.subtitle': 'Sociedade Internacional Coreana de Estatística',
      'officers.board_title': 'Conselho Diretor',
      'officers.incoming_eyebrow': 'Novos membros',
      'officers.incoming_title': 'Novos membros do conselho',
      'officers.term_label': 'Mandato',
      'officers.error': 'Não foi possível carregar a lista da diretoria. Tente novamente em instantes.',
      'officers.retry': 'Tentar novamente',
      'officers.empty': 'Ainda não há membros da diretoria para exibir.',
    },
    ru: {
      'officers.title': 'Руководство',
      'officers.subtitle': 'Корейское международное статистическое общество',
      'officers.board_title': 'Совет директоров',
      'officers.incoming_eyebrow': 'Новые участники',
      'officers.incoming_title': 'Новые члены совета',
      'officers.term_label': 'Срок',
      'officers.error': 'Не удалось загрузить список руководства. Повторите попытку чуть позже.',
      'officers.retry': 'Повторить',
      'officers.empty': 'Пока нет данных о руководстве для отображения.',
    },
    id: {
      'officers.title': 'Pengurus',
      'officers.subtitle': 'Korean International Statistical Society',
      'officers.board_title': 'Dewan Direksi',
      'officers.incoming_eyebrow': 'Anggota baru',
      'officers.incoming_title': 'Anggota dewan yang akan datang',
      'officers.term_label': 'Masa jabatan',
      'officers.error': 'Daftar pengurus tidak dapat dimuat. Silakan coba lagi sesaat lagi.',
      'officers.retry': 'Coba lagi',
      'officers.empty': 'Belum ada data pengurus yang dapat ditampilkan.',
    },
    vi: {
      'officers.title': 'Ban điều hành',
      'officers.subtitle': 'Hội Thống kê Quốc tế Hàn Quốc',
      'officers.board_title': 'Hội đồng quản trị',
      'officers.incoming_eyebrow': 'Thành viên mới',
      'officers.incoming_title': 'Thành viên hội đồng sắp tới',
      'officers.term_label': 'Nhiệm kỳ',
      'officers.error': 'Không thể tải danh sách ban điều hành. Vui lòng thử lại sau ít phút.',
      'officers.retry': 'Thử lại',
      'officers.empty': 'Chưa có thông tin ban điều hành để hiển thị.',
    },
    th: {
      'officers.title': 'คณะผู้บริหาร',
      'officers.subtitle': 'สมาคมสถิติระหว่างประเทศเกาหลี',
      'officers.board_title': 'คณะกรรมการบริหาร',
      'officers.incoming_eyebrow': 'สมาชิกใหม่',
      'officers.incoming_title': 'กรรมการชุดถัดไป',
      'officers.term_label': 'วาระ',
      'officers.error': 'ไม่สามารถโหลดรายชื่อผู้บริหารได้ กรุณาลองใหม่อีกครั้งในภายหลัง',
      'officers.retry': 'ลองอีกครั้ง',
      'officers.empty': 'ยังไม่มีข้อมูลผู้บริหารที่จะแสดง',
    },
    ms: {
      'officers.title': 'Pegawai',
      'officers.subtitle': 'Persatuan Statistik Antarabangsa Korea',
      'officers.board_title': 'Lembaga Pengarah',
      'officers.incoming_eyebrow': 'Ahli baharu',
      'officers.incoming_title': 'Ahli lembaga baharu',
      'officers.term_label': 'Tempoh',
      'officers.error': 'Senarai pegawai tidak dapat dimuatkan. Sila cuba sebentar lagi.',
      'officers.retry': 'Cuba lagi',
      'officers.empty': 'Belum ada maklumat pegawai untuk dipaparkan.',
    },
    fil: {
      'officers.title': 'Mga opisyal',
      'officers.subtitle': 'Korean International Statistical Society',
      'officers.board_title': 'Lupon ng mga direktor',
      'officers.incoming_eyebrow': 'Mga bagong miyembro',
      'officers.incoming_title': 'Mga papasok na miyembro ng lupon',
      'officers.term_label': 'Termino',
      'officers.error': 'Hindi ma-load ang listahan ng mga opisyal. Pakisubukang muli maya-maya.',
      'officers.retry': 'Subukan muli',
      'officers.empty': 'Wala pang maipapakitang impormasyon ng mga opisyal.',
    },
    hi: {
      'officers.title': 'पदाधिकारी',
      'officers.subtitle': 'कोरियन इंटरनेशनल स्टैटिस्टिकल सोसाइटी',
      'officers.board_title': 'निदेशक मंडल',
      'officers.incoming_eyebrow': 'नए सदस्य',
      'officers.incoming_title': 'आगामी बोर्ड सदस्य',
      'officers.term_label': 'कार्यकाल',
      'officers.error': 'पदाधिकारियों की सूची लोड नहीं हो सकी। कृपया थोड़ी देर बाद फिर प्रयास करें।',
      'officers.retry': 'फिर से प्रयास करें',
      'officers.empty': 'दिखाने के लिए अभी कोई पदाधिकारी जानकारी नहीं है।',
    },
    ar: {
      'officers.title': 'المسؤولون',
      'officers.subtitle': 'الجمعية الكورية الدولية للإحصاء',
      'officers.board_title': 'مجلس الإدارة',
      'officers.incoming_eyebrow': 'أعضاء جدد',
      'officers.incoming_title': 'أعضاء مجلس الإدارة القادمون',
      'officers.term_label': 'الفترة',
      'officers.error': 'تعذر تحميل قائمة المسؤولين. يُرجى المحاولة مرة أخرى بعد قليل.',
      'officers.retry': 'إعادة المحاولة',
      'officers.empty': 'لا توجد معلومات مسؤولين لعرضها حالياً.',
    },
    it: {
      'officers.title': 'Dirigenza',
      'officers.subtitle': 'Società Internazionale Coreana di Statistica',
      'officers.board_title': 'Consiglio direttivo',
      'officers.incoming_eyebrow': 'Nuovi membri',
      'officers.incoming_title': 'Nuovi membri del consiglio',
      'officers.term_label': 'Mandato',
      'officers.error': 'Impossibile caricare l’elenco dei dirigenti. Riprova tra poco.',
      'officers.retry': 'Riprova',
      'officers.empty': 'Non ci sono ancora dirigenti da mostrare.',
    },
    nl: {
      'officers.title': 'Bestuur',
      'officers.subtitle': 'Koreaanse Internationale Statistische Vereniging',
      'officers.board_title': 'Raad van bestuur',
      'officers.incoming_eyebrow': 'Nieuwe leden',
      'officers.incoming_title': 'Aankomende bestuursleden',
      'officers.term_label': 'Termijn',
      'officers.error': 'De lijst met bestuurders kon niet worden geladen. Probeer het zo opnieuw.',
      'officers.retry': 'Opnieuw proberen',
      'officers.empty': 'Er zijn nog geen bestuurders om weer te geven.',
    },
    pl: {
      'officers.title': 'Władze',
      'officers.subtitle': 'Koreańskie Międzynarodowe Towarzystwo Statystyczne',
      'officers.board_title': 'Rada dyrektorów',
      'officers.incoming_eyebrow': 'Nowi członkowie',
      'officers.incoming_title': 'Nowi członkowie rady',
      'officers.term_label': 'Kadencja',
      'officers.error': 'Nie udało się wczytać listy władz. Spróbuj ponownie za chwilę.',
      'officers.retry': 'Spróbuj ponownie',
      'officers.empty': 'Brak danych o władzach do wyświetlenia.',
    },
    sv: {
      'officers.title': 'Styrelse',
      'officers.subtitle': 'Koreanska internationella statistiska sällskapet',
      'officers.board_title': 'Styrelseledamöter',
      'officers.incoming_eyebrow': 'Nya medlemmar',
      'officers.incoming_title': 'Tillträdande styrelsemedlemmar',
      'officers.term_label': 'Mandatperiod',
      'officers.error': 'Det gick inte att läsa in listan över funktionärer. Försök igen om en stund.',
      'officers.retry': 'Försök igen',
      'officers.empty': 'Det finns ännu inga funktionärer att visa.',
    },
    tr: {
      'officers.title': 'Yöneticiler',
      'officers.subtitle': 'Kore Uluslararası İstatistik Derneği',
      'officers.board_title': 'Yönetim kurulu',
      'officers.incoming_eyebrow': 'Yeni üyeler',
      'officers.incoming_title': 'Yeni yönetim kurulu üyeleri',
      'officers.term_label': 'Dönem',
      'officers.error': 'Yönetici listesi yüklenemedi. Lütfen biraz sonra tekrar deneyin.',
      'officers.retry': 'Tekrar dene',
      'officers.empty': 'Gösterilecek yönetici bilgisi henüz yok.',
    },
    uk: {
      'officers.title': 'Керівництво',
      'officers.subtitle': 'Корейське міжнародне статистичне товариство',
      'officers.board_title': 'Рада директорів',
      'officers.incoming_eyebrow': 'Нові члени',
      'officers.incoming_title': 'Нові члени ради',
      'officers.term_label': 'Термін',
      'officers.error': 'Не вдалося завантажити список керівництва. Спробуйте ще раз трохи пізніше.',
      'officers.retry': 'Спробувати ще раз',
      'officers.empty': 'Поки немає інформації про керівництво для показу.',
    },
  };

  const ROLE_DICT = {
    ko: {
      'President': '회장',
      'President-elect': '차기 회장',
      'President-past': '직전 회장',
      'Executive Director': '사무총장',
      'General Director': '총무이사',
      'Financial Director': '재무이사',
      'Communications Director': '홍보이사',
      'co-Communications Director': '공동 홍보이사',
      'Membership Director': '회원이사',
      'Membership Co-Director': '공동 회원이사',
      'Student representative': '학생대표',
      'Board of Directors': '이사회',
      'Incoming Board Member': '차기 이사회 구성원',
    },
  };

  OFFICER_KEYS.forEach((key) => {
    if (!I.UI_KEYS.includes(key)) I.UI_KEYS.push(key);
  });

  Object.keys(OFFICER_DICT).forEach((lang) => {
    if (!I.dict[lang]) I.dict[lang] = {};
    Object.assign(I.dict[lang], OFFICER_DICT[lang]);
  });

  if (typeof I.normalizeCoverage === 'function') {
    I.normalizeCoverage();
  }

  window.StatKISS_Officers = Object.assign({}, window.StatKISS_Officers, {
    translateRole(lang, role) {
      const normalizedLang = typeof I.resolveLangCode === 'function' ? I.resolveLangCode(lang || 'en') : (lang || 'en');
      const dict = ROLE_DICT[normalizedLang] || ROLE_DICT.en || {};
      return dict[role] || role;
    },
    keys: OFFICER_KEYS.slice(),
  });
})();
