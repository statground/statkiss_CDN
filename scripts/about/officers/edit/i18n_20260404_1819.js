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
  if (!Array.isArray(I.languages) || I.languages.length === 0) I.languages = FALLBACK_LANGS;
  if (!I.dict) I.dict = { en: {} };
  if (!Array.isArray(I.UI_KEYS)) I.UI_KEYS = [];

  const KEYS = [
    'officersEdit.title',
    'officersEdit.subtitle',
    'officersEdit.back',
    'officersEdit.reload',
    'officersEdit.save',
    'officersEdit.saving',
    'officersEdit.restoring',
    'officersEdit.undo',
    'officersEdit.redo',
    'officersEdit.keyboardHint',
    'officersEdit.addTerm',
    'officersEdit.addRole',
    'officersEdit.addOfficer',
    'officersEdit.termList',
    'officersEdit.noTerms',
    'officersEdit.createFirstTerm',
    'officersEdit.termSettings',
    'officersEdit.termName',
    'officersEdit.termVisible',
    'officersEdit.termOnDuty',
    'officersEdit.deleteTerm',
    'officersEdit.roleList',
    'officersEdit.noRoles',
    'officersEdit.roleName',
    'officersEdit.roleOrder',
    'officersEdit.deleteRole',
    'officersEdit.deleteOfficer',
    'officersEdit.officerList',
    'officersEdit.noOfficers',
    'officersEdit.selectOfficer',
    'officersEdit.selectedOfficer',
    'officersEdit.selectedTerm',
    'officersEdit.selectedRole',
    'officersEdit.linkedAccount',
    'officersEdit.linkedAccountFound',
    'officersEdit.linkedAccountMissing',
    'officersEdit.unlinkUser',
    'officersEdit.searchUser',
    'officersEdit.searchPlaceholder',
    'officersEdit.searchHelp',
    'officersEdit.searchMinimum',
    'officersEdit.searchLoading',
    'officersEdit.searchNoResult',
    'officersEdit.searchErrorPrefix',
    'officersEdit.manualBackup',
    'officersEdit.fallbackName',
    'officersEdit.fallbackEmail',
    'officersEdit.fallbackAffiliation',
    'officersEdit.previewTitle',
    'officersEdit.previewName',
    'officersEdit.previewEmail',
    'officersEdit.previewAffiliation',
    'officersEdit.noOfficerSelected',
    'officersEdit.noOfficerSelectedDetail',
    'officersEdit.noteTitle',
    'officersEdit.noteFlow',
    'officersEdit.noteLinked',
    'officersEdit.noteHistory',
    'officersEdit.versionTitle',
    'officersEdit.versionEmpty',
    'officersEdit.versionUnavailable',
    'officersEdit.restore',
    'officersEdit.restoreConfirm',
    'officersEdit.actionSave',
    'officersEdit.actionRestore',
    'officersEdit.actionBaseline',
    'officersEdit.savedBy',
    'officersEdit.badgeOnDuty',
    'officersEdit.badgeVisible',
    'officersEdit.badgeHidden',
    'officersEdit.loadErrorPrefix',
    'officersEdit.saveErrorPrefix',
    'officersEdit.restoreErrorPrefix',
    'officersEdit.saveSuccess',
    'officersEdit.restoreSuccess',
    'officersEdit.confirmDeleteTerm',
    'officersEdit.confirmDeleteRole',
    'officersEdit.confirmDeleteOfficer'
  ];

  const dict = {
    en: {
      'officersEdit.title': 'Officers Editor',
      'officersEdit.subtitle': 'Choose a term, manage its roles, then edit the selected officer without opening a long single-page form.',
      'officersEdit.back': 'Back to officers',
      'officersEdit.reload': 'Reload',
      'officersEdit.save': 'Save',
      'officersEdit.saving': 'Saving…',
      'officersEdit.restoring': 'Restoring…',
      'officersEdit.undo': 'Undo',
      'officersEdit.redo': 'Redo',
      'officersEdit.keyboardHint': 'Ctrl/⌘ + Z / Y',
      'officersEdit.addTerm': 'Add term',
      'officersEdit.addRole': 'Add role',
      'officersEdit.addOfficer': 'Add officer',
      'officersEdit.termList': 'Terms',
      'officersEdit.noTerms': 'There are no officer terms yet.',
      'officersEdit.createFirstTerm': 'Create the first term',
      'officersEdit.termSettings': 'Term settings',
      'officersEdit.termName': 'Term name',
      'officersEdit.termVisible': 'Show this term on the public page',
      'officersEdit.termOnDuty': 'Current term',
      'officersEdit.deleteTerm': 'Delete term',
      'officersEdit.roleList': 'Roles in this term',
      'officersEdit.noRoles': 'There are no roles in this term yet.',
      'officersEdit.roleName': 'Role name',
      'officersEdit.roleOrder': 'Display order',
      'officersEdit.deleteRole': 'Delete role',
      'officersEdit.deleteOfficer': 'Delete officer',
      'officersEdit.officerList': 'Assigned officers',
      'officersEdit.noOfficers': 'There are no officers in this role yet.',
      'officersEdit.selectOfficer': 'Select an officer to edit',
      'officersEdit.selectedOfficer': 'Selected officer',
      'officersEdit.selectedTerm': 'Term',
      'officersEdit.selectedRole': 'Role',
      'officersEdit.linkedAccount': 'Linked user account',
      'officersEdit.linkedAccountFound': 'The public page will use the current user profile first and only fall back to the values below when a field is empty.',
      'officersEdit.linkedAccountMissing': 'This linked user could not be loaded right now. Search again or switch to manual information only.',
      'officersEdit.unlinkUser': 'Use manual information only',
      'officersEdit.searchUser': 'Search users',
      'officersEdit.searchPlaceholder': 'Search by name or email',
      'officersEdit.searchHelp': 'Link this officer to an existing site user when possible.',
      'officersEdit.searchMinimum': 'Type at least 2 characters to search.',
      'officersEdit.searchLoading': 'Searching…',
      'officersEdit.searchNoResult': 'No matching users were found.',
      'officersEdit.searchErrorPrefix': 'Search failed:',
      'officersEdit.manualBackup': 'Manual backup information',
      'officersEdit.fallbackName': 'Name',
      'officersEdit.fallbackEmail': 'Email',
      'officersEdit.fallbackAffiliation': 'Affiliation',
      'officersEdit.previewTitle': 'Public display preview',
      'officersEdit.previewName': 'Displayed name',
      'officersEdit.previewEmail': 'Displayed email',
      'officersEdit.previewAffiliation': 'Displayed affiliation',
      'officersEdit.noOfficerSelected': 'Choose an officer',
      'officersEdit.noOfficerSelectedDetail': 'Select an existing officer in the middle column, or add a new officer to the selected role.',
      'officersEdit.noteTitle': 'Editing guide',
      'officersEdit.noteFlow': 'Pick a term first, then manage roles and officers inside that term.',
      'officersEdit.noteLinked': 'When a user account is linked, the public page prefers the current account profile and uses the typed values only as backup.',
      'officersEdit.noteHistory': 'Undo/Redo works in the current session, and every save can also be restored from version history.',
      'officersEdit.versionTitle': 'Saved versions',
      'officersEdit.versionEmpty': 'There are no saved versions yet.',
      'officersEdit.versionUnavailable': 'Version history is not available on this server yet.',
      'officersEdit.restore': 'Restore',
      'officersEdit.restoreConfirm': 'Restore this saved version? Your current unsaved edits will be replaced.',
      'officersEdit.actionSave': 'Saved',
      'officersEdit.actionRestore': 'Restored',
      'officersEdit.actionBaseline': 'Initial snapshot',
      'officersEdit.savedBy': 'Saved by',
      'officersEdit.badgeOnDuty': 'Current',
      'officersEdit.badgeVisible': 'Visible',
      'officersEdit.badgeHidden': 'Hidden',
      'officersEdit.loadErrorPrefix': 'Load failed:',
      'officersEdit.saveErrorPrefix': 'Save failed:',
      'officersEdit.restoreErrorPrefix': 'Restore failed:',
      'officersEdit.saveSuccess': 'Officer data has been saved.',
      'officersEdit.restoreSuccess': 'The saved version has been restored.',
      'officersEdit.confirmDeleteTerm': 'Delete this term and everything inside it?',
      'officersEdit.confirmDeleteRole': 'Delete this role and its officers?',
      'officersEdit.confirmDeleteOfficer': 'Delete this officer entry?'
    },
    ko: {
      'officersEdit.title': '임원진 편집',
      'officersEdit.subtitle': '임기를 먼저 고르고, 그 임기 안에서 역할과 임원을 관리한 뒤, 선택한 임원만 집중해서 수정할 수 있도록 구성했습니다.',
      'officersEdit.back': '임원진으로 돌아가기',
      'officersEdit.reload': '다시 불러오기',
      'officersEdit.save': '저장',
      'officersEdit.saving': '저장 중…',
      'officersEdit.restoring': '복원 중…',
      'officersEdit.undo': '되돌리기',
      'officersEdit.redo': '다시 적용',
      'officersEdit.keyboardHint': 'Ctrl/⌘ + Z / Y',
      'officersEdit.addTerm': '임기 추가',
      'officersEdit.addRole': '역할 추가',
      'officersEdit.addOfficer': '임원 추가',
      'officersEdit.termList': '임기 목록',
      'officersEdit.noTerms': '등록된 임기 정보가 아직 없습니다.',
      'officersEdit.createFirstTerm': '첫 임기 만들기',
      'officersEdit.termSettings': '임기 설정',
      'officersEdit.termName': '임기명',
      'officersEdit.termVisible': '공개 페이지에 이 임기 표시',
      'officersEdit.termOnDuty': '현재 임기',
      'officersEdit.deleteTerm': '임기 삭제',
      'officersEdit.roleList': '이 임기의 역할',
      'officersEdit.noRoles': '이 임기에는 아직 역할이 없습니다.',
      'officersEdit.roleName': '역할명',
      'officersEdit.roleOrder': '표시 순서',
      'officersEdit.deleteRole': '역할 삭제',
      'officersEdit.deleteOfficer': '임원 삭제',
      'officersEdit.officerList': '배정된 임원',
      'officersEdit.noOfficers': '이 역할에는 아직 임원이 없습니다.',
      'officersEdit.selectOfficer': '수정할 임원을 선택하세요',
      'officersEdit.selectedOfficer': '선택한 임원',
      'officersEdit.selectedTerm': '임기',
      'officersEdit.selectedRole': '역할',
      'officersEdit.linkedAccount': '연결된 이용자 계정',
      'officersEdit.linkedAccountFound': '공개 페이지에서는 현재 이용자 프로필을 먼저 쓰고, 비어 있는 항목만 아래 입력값으로 보완합니다.',
      'officersEdit.linkedAccountMissing': '현재 이 연결 계정을 불러오지 못했습니다. 다시 검색하거나 수기 정보만 사용하세요.',
      'officersEdit.unlinkUser': '수기 정보만 사용',
      'officersEdit.searchUser': '이용자 검색',
      'officersEdit.searchPlaceholder': '이름 또는 이메일로 검색',
      'officersEdit.searchHelp': '가능하면 기존 사이트 이용자와 연결해 주세요.',
      'officersEdit.searchMinimum': '검색하려면 2자 이상 입력해 주세요.',
      'officersEdit.searchLoading': '검색 중…',
      'officersEdit.searchNoResult': '일치하는 이용자를 찾지 못했습니다.',
      'officersEdit.searchErrorPrefix': '검색 실패:',
      'officersEdit.manualBackup': '수기 백업 정보',
      'officersEdit.fallbackName': '이름',
      'officersEdit.fallbackEmail': '이메일',
      'officersEdit.fallbackAffiliation': '소속',
      'officersEdit.previewTitle': '공개 표시 미리보기',
      'officersEdit.previewName': '표시 이름',
      'officersEdit.previewEmail': '표시 이메일',
      'officersEdit.previewAffiliation': '표시 소속',
      'officersEdit.noOfficerSelected': '임원을 선택하세요',
      'officersEdit.noOfficerSelectedDetail': '가운데 열에서 기존 임원을 고르거나, 선택된 역할에 새 임원을 추가하세요.',
      'officersEdit.noteTitle': '편집 안내',
      'officersEdit.noteFlow': '먼저 임기를 고른 뒤, 그 임기 안에서 역할과 임원을 관리하세요.',
      'officersEdit.noteLinked': '이용자 계정을 연결하면 공개 페이지는 현재 계정 프로필을 우선 사용하고, 입력한 값은 백업으로만 사용합니다.',
      'officersEdit.noteHistory': '현재 편집 세션에서는 되돌리기/다시 적용이 가능하고, 저장된 내용은 버전 목록에서 복원할 수 있습니다.',
      'officersEdit.versionTitle': '저장된 버전',
      'officersEdit.versionEmpty': '저장된 버전이 아직 없습니다.',
      'officersEdit.versionUnavailable': '이 서버에서는 아직 버전 기록을 사용할 수 없습니다.',
      'officersEdit.restore': '복원',
      'officersEdit.restoreConfirm': '이 저장 버전으로 복원할까요? 현재 저장하지 않은 변경사항은 바뀝니다.',
      'officersEdit.actionSave': '저장됨',
      'officersEdit.actionRestore': '복원됨',
      'officersEdit.actionBaseline': '초기 스냅샷',
      'officersEdit.savedBy': '저장자',
      'officersEdit.badgeOnDuty': '현재',
      'officersEdit.badgeVisible': '공개',
      'officersEdit.badgeHidden': '비공개',
      'officersEdit.loadErrorPrefix': '불러오기 실패:',
      'officersEdit.saveErrorPrefix': '저장 실패:',
      'officersEdit.restoreErrorPrefix': '복원 실패:',
      'officersEdit.saveSuccess': '임원진 정보가 저장되었습니다.',
      'officersEdit.restoreSuccess': '저장된 버전으로 복원했습니다.',
      'officersEdit.confirmDeleteTerm': '이 임기와 하위 역할/임원까지 모두 삭제할까요?',
      'officersEdit.confirmDeleteRole': '이 역할과 하위 임원을 삭제할까요?',
      'officersEdit.confirmDeleteOfficer': '이 임원 항목을 삭제할까요?'
    },
    ja: {
      'officersEdit.title': '役員編集',
      'officersEdit.subtitle': 'まず任期を選び、その任期内の役職と役員を管理し、選択した役員だけを集中して編集できる構成です。',
      'officersEdit.back': '役員ページへ戻る',
      'officersEdit.reload': '再読み込み',
      'officersEdit.save': '保存',
      'officersEdit.saving': '保存中…',
      'officersEdit.restoring': '復元中…',
      'officersEdit.undo': '元に戻す',
      'officersEdit.redo': 'やり直す',
      'officersEdit.addTerm': '任期を追加',
      'officersEdit.addRole': '役職を追加',
      'officersEdit.addOfficer': '役員を追加',
      'officersEdit.termList': '任期一覧',
      'officersEdit.termSettings': '任期設定',
      'officersEdit.termName': '任期名',
      'officersEdit.termVisible': '公開ページに表示',
      'officersEdit.termOnDuty': '現在の任期',
      'officersEdit.deleteTerm': '任期を削除',
      'officersEdit.roleList': 'この任期の役職',
      'officersEdit.roleName': '役職名',
      'officersEdit.roleOrder': '表示順',
      'officersEdit.deleteRole': '役職を削除',
      'officersEdit.deleteOfficer': '役員を削除',
      'officersEdit.officerList': '配属済み役員',
      'officersEdit.selectOfficer': '編集する役員を選択',
      'officersEdit.linkedAccount': '連携ユーザー',
      'officersEdit.unlinkUser': '手入力のみ使用',
      'officersEdit.searchUser': 'ユーザー検索',
      'officersEdit.searchPlaceholder': '名前またはメールで検索',
      'officersEdit.manualBackup': '手入力バックアップ情報',
      'officersEdit.fallbackName': '氏名',
      'officersEdit.fallbackEmail': 'メール',
      'officersEdit.fallbackAffiliation': '所属',
      'officersEdit.previewTitle': '公開表示プレビュー',
      'officersEdit.versionTitle': '保存済みバージョン',
      'officersEdit.restore': '復元',
      'officersEdit.noteTitle': '編集ガイド',
      'officersEdit.saveSuccess': '役員情報を保存しました。',
      'officersEdit.restoreSuccess': '保存済みバージョンを復元しました。'
    },
    'zh-Hans': {
      'officersEdit.title': '干部编辑',
      'officersEdit.subtitle': '先选择任期，再管理该任期下的职务和干部，并集中编辑所选干部。',
      'officersEdit.back': '返回干部页面',
      'officersEdit.reload': '重新加载',
      'officersEdit.save': '保存',
      'officersEdit.saving': '保存中…',
      'officersEdit.restoring': '恢复中…',
      'officersEdit.undo': '撤销',
      'officersEdit.redo': '重做',
      'officersEdit.addTerm': '添加任期',
      'officersEdit.addRole': '添加职务',
      'officersEdit.addOfficer': '添加干部',
      'officersEdit.termList': '任期列表',
      'officersEdit.termSettings': '任期设置',
      'officersEdit.termName': '任期名称',
      'officersEdit.termVisible': '在公开页面显示',
      'officersEdit.termOnDuty': '当前任期',
      'officersEdit.deleteTerm': '删除任期',
      'officersEdit.roleList': '本任期职务',
      'officersEdit.roleName': '职务名称',
      'officersEdit.roleOrder': '显示顺序',
      'officersEdit.deleteRole': '删除职务',
      'officersEdit.deleteOfficer': '删除干部',
      'officersEdit.officerList': '已分配干部',
      'officersEdit.selectOfficer': '选择要编辑的干部',
      'officersEdit.linkedAccount': '关联用户账号',
      'officersEdit.unlinkUser': '仅使用手动信息',
      'officersEdit.searchUser': '搜索用户',
      'officersEdit.searchPlaceholder': '按姓名或邮箱搜索',
      'officersEdit.manualBackup': '手动备用信息',
      'officersEdit.fallbackName': '姓名',
      'officersEdit.fallbackEmail': '邮箱',
      'officersEdit.fallbackAffiliation': '单位',
      'officersEdit.previewTitle': '公开显示预览',
      'officersEdit.versionTitle': '已保存版本',
      'officersEdit.restore': '恢复',
      'officersEdit.noteTitle': '编辑说明',
      'officersEdit.saveSuccess': '干部信息已保存。',
      'officersEdit.restoreSuccess': '已恢复到已保存版本。'
    },
    'zh-Hant': {
      'officersEdit.title': '幹部編輯',
      'officersEdit.subtitle': '先選擇任期，再管理該任期下的職務與幹部，並集中編輯所選幹部。',
      'officersEdit.back': '返回幹部頁面',
      'officersEdit.reload': '重新載入',
      'officersEdit.save': '儲存',
      'officersEdit.saving': '儲存中…',
      'officersEdit.restoring': '還原中…',
      'officersEdit.undo': '復原',
      'officersEdit.redo': '重做',
      'officersEdit.addTerm': '新增任期',
      'officersEdit.addRole': '新增職務',
      'officersEdit.addOfficer': '新增幹部',
      'officersEdit.termList': '任期列表',
      'officersEdit.termSettings': '任期設定',
      'officersEdit.termName': '任期名稱',
      'officersEdit.termVisible': '在公開頁面顯示',
      'officersEdit.termOnDuty': '目前任期',
      'officersEdit.deleteTerm': '刪除任期',
      'officersEdit.roleList': '本任期職務',
      'officersEdit.roleName': '職務名稱',
      'officersEdit.roleOrder': '顯示順序',
      'officersEdit.deleteRole': '刪除職務',
      'officersEdit.deleteOfficer': '刪除幹部',
      'officersEdit.officerList': '已指派幹部',
      'officersEdit.selectOfficer': '選擇要編輯的幹部',
      'officersEdit.linkedAccount': '連結使用者帳號',
      'officersEdit.unlinkUser': '只使用手動資訊',
      'officersEdit.searchUser': '搜尋使用者',
      'officersEdit.searchPlaceholder': '用姓名或電子郵件搜尋',
      'officersEdit.manualBackup': '手動備援資訊',
      'officersEdit.fallbackName': '姓名',
      'officersEdit.fallbackEmail': '電子郵件',
      'officersEdit.fallbackAffiliation': '所屬單位',
      'officersEdit.previewTitle': '公開顯示預覽',
      'officersEdit.versionTitle': '已儲存版本',
      'officersEdit.restore': '還原',
      'officersEdit.noteTitle': '編輯說明',
      'officersEdit.saveSuccess': '幹部資訊已儲存。',
      'officersEdit.restoreSuccess': '已還原到已儲存版本。'
    }
  };

  function resolveLang(code) {
    return I && typeof I.resolveLangCode === 'function' ? I.resolveLangCode(code) : (code || 'en');
  }

  function normalizeCoverage() {
    FALLBACK_LANGS.forEach((lang) => {
      if (!dict[lang.code]) dict[lang.code] = {};
      KEYS.forEach((key) => {
        if (dict[lang.code][key] == null || dict[lang.code][key] === '') {
          dict[lang.code][key] = (dict.en && dict.en[key]) || key;
        }
      });
    });
  }

  function t(lang, key) {
    const l = resolveLang(lang);
    const d = dict[l] || {};
    const en = dict.en || {};
    const ko = dict.ko || {};
    const v = d[key];
    if (v != null && v !== '') return v;
    if (en[key] != null && en[key] !== '') return en[key];
    if (ko[key] != null && ko[key] !== '') return ko[key];
    return key;
  }

  normalizeCoverage();

  Object.keys(dict).forEach((code) => {
    if (!I.dict[code]) I.dict[code] = {};
    KEYS.forEach((key) => {
      if (I.dict[code][key] == null || I.dict[code][key] === '') {
        I.dict[code][key] = dict[code][key];
      }
    });
  });
  I.UI_KEYS = Array.from(new Set([...(I.UI_KEYS || []), ...KEYS]));
  if (typeof I.normalizeCoverage === 'function') I.normalizeCoverage();

  window.StatKISS_I18N_OFFICERS_EDIT = {
    KEYS,
    dict,
    t,
    resolveLang,
    normalizeCoverage,
  };
})();
