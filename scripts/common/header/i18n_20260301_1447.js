/**
 * StatKISS i18n.js (no-build, CDN-friendly)
 * - Provides language list and translation dictionary for StatKISS UI (header + main)
 * - Fallback: missing keys are filled from English, then Korean, then key name
 *
 * Global:
 *   window.StatKISS_I18N = { LANG_KEY, languages, dict, t(), resolveLangCode(), normalizeCoverage(), isRTL() }
 */
(function () {
  'use strict';

  const LANG_KEY = 'statkiss_lang';

  // Supported languages (English first as requested)
  const languages = [
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
    { code: 'uk', label: 'Українська' },
  ];

  const UI_KEYS = [
    // header
    'header.about','header.announcement','header.publications','header.awards','header.forums','header.membership',
    'header.close','header.menu','header.nav_caption',
    'auth.login','auth.signup','auth.logout','auth.admin','auth.membership',
    'lang.title','lang.open','theme.toggle',
    'nav.about_us','nav.officers','nav.constitution','nav.bylaws',
    'nav.kiss_event','nav.member_news','nav.advertisement','nav.job_ads',
    'nav.journals','nav.newsletter','nav.career_award','nav.student_award',
    'nav.facebook_group','nav.useful_links','nav.join_renew','nav.donation',

    // main
    'main.latest_news','main.more_latest','main.read_more','main.loading','main.no_posts','main.news_default_desc',
    'main.bulletin_title','main.bulletin_desc',
    'main.quick_title','main.quick_desc',
    'main.total_members','main.total_members_desc',
    'main.tab.event','main.tab.ads','main.tab.member','main.tab.jobs',
    'main.qa.journal','main.qa.awards','main.qa.newsletter','main.qa.kiss_news','main.qa.membership','main.qa.donation',
    'main.qa.journal_desc','main.qa.awards_desc','main.qa.newsletter_desc','main.qa.kiss_news_desc','main.qa.membership_desc','main.qa.donation_desc',
    'main.sponsors','main.loading_banners','main.no_banners',
  ];

  const dict = {
    ko: {
      // header
      'header.about': '학회소개',
      'header.announcement': '공지사항',
      'header.publications': '출판물',
      'header.awards': '시상',
      'header.forums': '포럼',
      'header.membership': '멤버십',
      'header.close': '닫기',
      'header.menu': '메뉴',
      'header.nav_caption': 'StatKISS navigation',
      'auth.login': '로그인',
      'auth.signup': '회원가입',
      'auth.logout': '로그아웃',
      'auth.admin': '관리자',
      'auth.membership': '멤버십',
      'lang.title': '언어 선택',
      'lang.open': '언어',
      'theme.toggle': '테마 전환',
      'nav.about_us': '학회 안내',
      'nav.officers': '임원진/이사회',
      'nav.constitution': '정관',
      'nav.bylaws': '세칙',
      'nav.kiss_event': '학회 행사',
      'nav.member_news': '회원 소식',
      'nav.advertisement': '광고',
      'nav.job_ads': '채용 공고',
      'nav.journals': '저널',
      'nav.newsletter': '뉴스레터',
      'nav.career_award': '커리어 개발상',
      'nav.student_award': '우수 학생 논문상',
      'nav.facebook_group': '페이스북 그룹',
      'nav.useful_links': '유용한 링크',
      'nav.join_renew': '가입/갱신',
      'nav.donation': '후원',

      // main
      'main.latest_news': '최신 소식',
      'main.more_latest': '더 많은 최신 소식',
      'main.read_more': '자세히 보기 →',
      'main.loading': '불러오는 중...',
      'main.no_posts': '게시물이 없습니다.',
      'main.news_default_desc': 'KISS의 최신 소식과 공지를 확인하세요.',
      'main.bulletin_title': 'KISS Bulletin',
      'main.bulletin_desc': '행사, 회원 소식, 채용 공고를 확인하세요.',
      'main.quick_title': '바로가기',
      'main.quick_desc': '자주 사용하는 섹션',
      'main.total_members': '전체 회원',
      'main.total_members_desc': '전 세계 KISS 커뮤니티',
      'main.tab.event': '학회 행사',
      'main.tab.ads': '광고',
      'main.tab.member': '회원 소식',
      'main.tab.jobs': '채용 공고',
      'main.qa.journal': '저널',
      'main.qa.awards': '시상',
      'main.qa.newsletter': '뉴스레터',
      'main.qa.kiss_news': 'KISS 소식',
      'main.qa.membership': '멤버십',
      'main.qa.donation': '후원',
      'main.qa.journal_desc': '저널 아티클 보기',
      'main.qa.awards_desc': '시상 정보 확인',
      'main.qa.newsletter_desc': '최근 뉴스레터 보기',
      'main.qa.kiss_news_desc': '공지/소식 전체 보기',
      'main.qa.membership_desc': '가입/갱신하기',
      'main.qa.donation_desc': '학회 활동 후원',
      'main.sponsors': '파트너 & 후원',
      'main.loading_banners': '배너 불러오는 중...',
      'main.no_banners': '배너가 없습니다.',
    },

    en: {
      // header
      'header.about': 'About KISS',
      'header.announcement': 'Announcement',
      'header.publications': 'Publications',
      'header.awards': 'Awards',
      'header.forums': 'Forums',
      'header.membership': 'Membership',
      'header.close': 'Close',
      'header.menu': 'Menu',
      'header.nav_caption': 'StatKISS navigation',
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.logout': 'Logout',
      'auth.admin': 'Admin Page',
      'auth.membership': 'Membership',
      'lang.title': 'Language',
      'lang.open': 'Language',
      'theme.toggle': 'Toggle theme',
      'nav.about_us': 'About Us',
      'nav.officers': 'Officers/Board',
      'nav.constitution': 'Constitution',
      'nav.bylaws': 'By Laws',
      'nav.kiss_event': 'KISS Event',
      'nav.member_news': 'Member News',
      'nav.advertisement': 'Advertisement',
      'nav.job_ads': 'Job Related Ads.',
      'nav.journals': 'Journals',
      'nav.newsletter': 'Newsletter',
      'nav.career_award': 'Career Development Award',
      'nav.student_award': 'Outstanding Student Paper Award',
      'nav.facebook_group': 'Facebook Group',
      'nav.useful_links': 'Useful Links',
      'nav.join_renew': 'Join / Renew',
      'nav.donation': 'Donation',

      // main
      'main.latest_news': 'Latest News',
      'main.more_latest': 'More latest news',
      'main.read_more': 'Read more →',
      'main.loading': 'Loading...',
      'main.no_posts': 'No posts available.',
      'main.news_default_desc': 'Stay up to date with the latest news and announcements from KISS.',
      'main.bulletin_title': 'KISS Bulletin',
      'main.bulletin_desc': 'Browse events, member news, and job opportunities.',
      'main.quick_title': 'Quick access',
      'main.quick_desc': 'Frequently used sections',
      'main.total_members': 'Total Members',
      'main.total_members_desc': 'KISS community worldwide',
      'main.tab.event': 'KISS Event',
      'main.tab.ads': 'Advertisement',
      'main.tab.member': 'Member News',
      'main.tab.jobs': 'Job Related Ads.',
      'main.qa.journal': 'Journal',
      'main.qa.awards': 'Awards',
      'main.qa.newsletter': 'Newsletter',
      'main.qa.kiss_news': 'KISS News',
      'main.qa.membership': 'Membership',
      'main.qa.donation': 'Donation',
      'main.qa.journal_desc': 'Access KISS journal articles.',
      'main.qa.awards_desc': 'Learn about KISS awards.',
      'main.qa.newsletter_desc': 'View recent newsletters.',
      'main.qa.kiss_news_desc': 'Browse all announcements.',
      'main.qa.membership_desc': 'Join or renew membership.',
      'main.qa.donation_desc': 'Support KISS activities.',
      'main.sponsors': 'Partners & Sponsors',
      'main.loading_banners': 'Loading banners...',
      'main.no_banners': 'No banners.',
    },
  };

  function t(lang, key) {
    const d = dict[lang] || {};
    const en = dict.en || {};
    const ko = dict.ko || {};
    return (d[key] != null && d[key] !== '') ? d[key]
      : (en[key] != null && en[key] !== '') ? en[key]
      : (ko[key] != null && ko[key] !== '') ? ko[key]
      : key;
  }

  function isRTL(lang) { return lang === 'ar'; }

  function resolveLangCode(code) {
    if (!code) return 'en';
    const c = String(code).trim();
    if (c === 'zh' || c.toLowerCase().startsWith('zh-')) {
      const lower = c.toLowerCase();
      if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) return 'zh-Hant';
      return 'zh-Hans';
    }
    if (c === 'tl' || c.toLowerCase().startsWith('tl-') || c === 'fil' || c.toLowerCase().startsWith('fil-')) return 'fil';
    if (c === 'pt' || c.toLowerCase().startsWith('pt-')) return 'pt-BR';
    if (c.toLowerCase().startsWith('en-')) return 'en';
    if (c.toLowerCase().startsWith('ja-')) return 'ja';
    if (c.toLowerCase().startsWith('ko-')) return 'ko';
    return c;
  }

  function normalizeCoverage() {
    const en = dict.en || {};
    const ko = dict.ko || {};
    languages.forEach(l => {
      if (!dict[l.code]) dict[l.code] = {};
      UI_KEYS.forEach(k => {
        if (dict[l.code][k] == null || dict[l.code][k] === '') {
          dict[l.code][k] = en[k] ?? ko[k] ?? k;
        }
      });
    });
  }

  function getInitialLang() {
    const saved = localStorage.getItem(LANG_KEY);
    const browser = (navigator.language || 'en');
    const initial = resolveLangCode(saved || browser);
    const best =
      languages.find(l => l.code === initial) ||
      languages.find(l => initial.startsWith(l.code)) ||
      languages.find(l => l.code.startsWith(initial.split('-')[0])) ||
      languages[0];
    return best ? best.code : 'en';
  }

  function applyLangToDocument(lang) {
    const rootEl = document.documentElement;
    rootEl.setAttribute('lang', lang);
    rootEl.setAttribute('dir', isRTL(lang) ? 'rtl' : 'ltr');
  }

  function init() {
    normalizeCoverage();
    const lang = getInitialLang();
    applyLangToDocument(lang);
    return lang;
  }

  window.StatKISS_I18N = {
    LANG_KEY, languages, dict, UI_KEYS,
    t, resolveLangCode, normalizeCoverage, isRTL,
    getInitialLang, applyLangToDocument, init,
  };
})();
