/**
 * StatKISS i18n.js (no-build, CDN-friendly)
 * - Provides language list and translation dictionary for StatKISS header
 * - Fallback: missing keys are filled from English, then Korean, then key name
 *
 * Global:
 *   window.StatKISS_I18N = { LANG_KEY, languages, dict, t(), resolveLangCode(), normalizeCoverage(), isRTL() }
 *
 * Note:
 * - Language list is aligned with Statground i18n set (sg_init_i18n) and expanded for StatKISS.
 */
(function () {
  'use strict';

  const LANG_KEY = 'statkiss_lang';

  // Supported languages (same set as the provided Statground i18n file)
  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
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

  // Keys used by StatKISS header
  const UI_KEYS = [
    'header.about',
    'header.announcement',
    'header.publications',
    'header.awards',
    'header.forums',
    'header.membership',
    'header.close',
    'header.menu',
    'header.nav_caption',
    'auth.login',
    'auth.signup',
    'auth.logout',
    'auth.admin',
    'auth.membership',
    'lang.title',
    'lang.open',
    'theme.toggle',
  ];

  // Minimal StatKISS translations: ko/en are native; others will fallback to en.
  const dict = {
    ko: {
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
    },
    en: {
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

  function isRTL(lang) {
    // Keeping it minimal: Arabic RTL.
    return lang === 'ar';
  }

  function resolveLangCode(code) {
    if (!code) return 'en';
    const c = String(code).trim();

    // Chinese normalization
    if (c === 'zh' || c.toLowerCase().startsWith('zh-')) {
      const lower = c.toLowerCase();
      if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) return 'zh-Hant';
      return 'zh-Hans';
    }

    // Filipino normalization
    if (c === 'tl' || c.toLowerCase().startsWith('tl-') || c === 'fil' || c.toLowerCase().startsWith('fil-')) return 'fil';

    // Portuguese normalization
    if (c === 'pt' || c.toLowerCase().startsWith('pt-')) return 'pt-BR';

    // Base language normalization
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

  // Init once (safe to call multiple times)
  function init() {
    normalizeCoverage();
    const lang = getInitialLang();
    applyLangToDocument(lang);
    return lang;
  }

  // Expose globally
  window.StatKISS_I18N = {
    LANG_KEY,
    languages,
    dict,
    UI_KEYS,
    t,
    resolveLangCode,
    normalizeCoverage,
    isRTL,
    getInitialLang,
    applyLangToDocument,
    init,
  };
})();
