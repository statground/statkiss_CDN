/**
 * StatKISS MAIN i18n - i18n_main.js
 * - Main(index) UI only.
 * - Uses same language list as header, English first.
 *
 * Global: window.StatKISS_I18N_MAIN
 */
(function () {
  'use strict';

  const LANG_KEY = 'statkiss_lang';

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
    'main.latest_news','main.more_latest','main.read_more','main.loading','main.no_posts','main.news_default_desc',
    'main.bulletin_title','main.bulletin_desc','main.quick_title','main.quick_desc',
    'main.total_members','main.total_members_desc',
    'main.tab.event','main.tab.ads','main.tab.member','main.tab.jobs',
    'main.qa.journal','main.qa.awards','main.qa.newsletter','main.qa.kiss_news','main.qa.membership','main.qa.donation',
    'main.qa.journal_desc','main.qa.awards_desc','main.qa.newsletter_desc','main.qa.kiss_news_desc','main.qa.membership_desc','main.qa.donation_desc',
    'main.sponsors','main.loading_banners','main.no_banners',
  ];

  const dict = {
    en: {
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
    ko: {
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

  window.StatKISS_I18N_MAIN = {
    LANG_KEY, languages, dict, UI_KEYS,
    t, resolveLangCode, normalizeCoverage, isRTL,
    getInitialLang, applyLangToDocument, init,
  };
})();
