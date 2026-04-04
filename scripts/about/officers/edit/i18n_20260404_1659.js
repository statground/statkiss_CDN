(function () {
  'use strict';

  const KEY_PREFIX = 'officers_edit.';

  const TEXT = {
    en: {
      title: 'Officers Editor',
      subtitle: 'Edit officer terms, roles, and assignments in AliSQL.',
      back: 'Back to Officers',
      save: 'Save changes',
      saving: 'Saving…',
      reload: 'Reload',
      add_term: 'Add term',
      add_role: 'Add role',
      add_officer: 'Add person',
      term_name: 'Term name',
      term_visible: 'Visible on public page',
      term_on_duty: 'Current term (on duty)',
      delete_term: 'Delete term',
      role_name: 'Role name',
      role_order: 'Display order',
      delete_role: 'Delete role',
      linked_user_uuid: 'Linked user UUID (optional)',
      fallback_name: 'Fallback name',
      fallback_email: 'Fallback email',
      fallback_affiliation: 'Fallback affiliation',
      delete_officer: 'Delete person',
      display_preview: 'Display preview',
      linked_user_active: 'Linked user found. Public display prefers userinfo fields and falls back to officer values only when a field is empty.',
      linked_user_pending: 'If you enter a user UUID, save once to validate and refresh the linked user preview.',
      no_terms: 'No officer terms yet. Add the first term to begin editing.',
      no_roles: 'No roles in this term yet.',
      no_officers: 'No people assigned to this role yet.',
      load_error: 'Unable to load the officers editor data.',
      save_success: 'Officer data has been saved.',
      note_title: 'How this editor works',
      note_roles: 'Roles named “Board of Directors” and “Incoming Board Member” are rendered in their special public sections. Other role names appear in the current officers section.',
      note_linked: 'When uuid_user is connected to statkiss_user.v_d1_userinfo, name / email / affiliation are displayed from userinfo first, and fall back to the officer row only if the linked field is empty.',
      note_delete: 'Delete actions here are saved as active=0 on the AliSQL officer tables.',
      confirm_delete_term: 'Delete this term and all nested roles and officers?',
      confirm_delete_role: 'Delete this role and all nested officers?',
      confirm_delete_officer: 'Delete this officer entry?',
      preview_empty: 'Nothing to display yet.',
      uuid_hint: 'Use a uuid from statkiss_user.v_d1_userinfo when you want this officer linked to a user.',
      save_error_prefix: 'Save failed:',
      load_error_prefix: 'Load failed:',
    },
    ko: {
      title: '임원진 편집',
      subtitle: 'AliSQL의 임기, 역할, 임원 배정을 수정합니다.',
      back: '임원진 페이지로',
      save: '저장',
      saving: '저장 중…',
      reload: '다시 불러오기',
      add_term: '임기 추가',
      add_role: '역할 추가',
      add_officer: '인원 추가',
      term_name: '임기명',
      term_visible: '공개 페이지에 표시',
      term_on_duty: '현재 임기(on duty)',
      delete_term: '임기 삭제',
      role_name: '역할명',
      role_order: '표시 순서',
      delete_role: '역할 삭제',
      linked_user_uuid: '연결된 사용자 UUID (선택)',
      fallback_name: '대체 이름',
      fallback_email: '대체 이메일',
      fallback_affiliation: '대체 소속',
      delete_officer: '인원 삭제',
      display_preview: '표시 미리보기',
      linked_user_active: '연결된 사용자를 찾았습니다. 공개 표시는 userinfo 값을 우선 사용하고, 해당 필드가 비어 있을 때만 officer 값을 사용합니다.',
      linked_user_pending: '사용자 UUID를 입력했다면 한 번 저장해서 연결 여부와 미리보기를 갱신하세요.',
      no_terms: '아직 임기 정보가 없습니다. 첫 임기를 추가해 주세요.',
      no_roles: '이 임기에 아직 역할이 없습니다.',
      no_officers: '이 역할에 아직 배정된 인원이 없습니다.',
      load_error: '임원진 편집 데이터를 불러오지 못했습니다.',
      save_success: '임원진 정보가 저장되었습니다.',
      note_title: '편집 규칙',
      note_roles: '역할명이 “Board of Directors” 또는 “Incoming Board Member”이면 공개 페이지에서 해당 전용 섹션으로 렌더링됩니다. 그 외 역할은 current officers 섹션에 표시됩니다.',
      note_linked: 'uuid_user가 statkiss_user.v_d1_userinfo와 연결되면 name / email / affiliation은 userinfo 값을 우선 사용하고, 해당 필드가 비어 있을 때만 officer 행의 값을 사용합니다.',
      note_delete: '여기서의 삭제는 AliSQL officer 계열 테이블에서 active=0으로 저장됩니다.',
      confirm_delete_term: '이 임기와 하위 역할/임원 정보를 삭제할까요?',
      confirm_delete_role: '이 역할과 하위 임원 정보를 삭제할까요?',
      confirm_delete_officer: '이 임원 정보를 삭제할까요?',
      preview_empty: '아직 표시할 값이 없습니다.',
      uuid_hint: '사용자와 연결하려면 statkiss_user.v_d1_userinfo의 uuid를 넣으세요.',
      save_error_prefix: '저장 실패:',
      load_error_prefix: '불러오기 실패:',
    },
  };

  function resolveLangCode(code) {
    if (!code) return 'en';
    const raw = String(code).trim();
    if (!raw) return 'en';

    const lower = raw.toLowerCase();
    if (raw === 'zh' || lower.startsWith('zh-')) {
      if (lower.includes('tw') || lower.includes('hk') || lower.includes('mo') || lower.includes('hant')) {
        return 'zh-Hant';
      }
      return 'zh-Hans';
    }
    if (raw === 'tl' || lower.startsWith('tl-') || raw === 'fil' || lower.startsWith('fil-')) return 'fil';
    if (raw === 'pt' || lower.startsWith('pt-')) return 'pt-BR';
    if (lower.startsWith('en-')) return 'en';
    if (lower.startsWith('ja-')) return 'ja';
    if (lower.startsWith('ko-')) return 'ko';
    return raw;
  }

  function getCurrentLang(preferred) {
    if (preferred) return resolveLangCode(preferred);

    const pathname = window.location.pathname || '/';
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length >= 2 && parts[1] === 'about') {
      return resolveLangCode(parts[0]);
    }

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang) return resolveLangCode(htmlLang);

    try {
      const I = window.StatKISS_I18N || null;
      if (I && I.LANG_KEY) {
        const saved = localStorage.getItem(I.LANG_KEY);
        if (saved) return resolveLangCode(saved);
      }
    } catch (_) {}

    return resolveLangCode(navigator.language || 'en');
  }

  function translate(lang, key) {
    const resolvedLang = getCurrentLang(lang);
    const rawKey = String(key || '');
    const shortKey = rawKey.startsWith(KEY_PREFIX) ? rawKey.slice(KEY_PREFIX.length) : rawKey;
    const exact = TEXT[resolvedLang] || null;
    const base = TEXT[(resolvedLang || '').split('-')[0]] || null;
    const dict = exact || base || TEXT.en;

    if (dict && Object.prototype.hasOwnProperty.call(dict, shortKey)) {
      return dict[shortKey];
    }
    if (Object.prototype.hasOwnProperty.call(TEXT.en, shortKey)) {
      return TEXT.en[shortKey];
    }
    return shortKey || rawKey;
  }

  try {
    const I = window.StatKISS_I18N || null;
    if (I && I.dict) {
      Object.entries(TEXT).forEach(([lang, entries]) => {
        if (!I.dict[lang]) I.dict[lang] = {};
        Object.entries(entries).forEach(([key, value]) => {
          I.dict[lang][`${KEY_PREFIX}${key}`] = value;
        });
      });
      if (Array.isArray(I.UI_KEYS)) {
        Object.keys(TEXT.en).forEach((key) => {
          const fullKey = `${KEY_PREFIX}${key}`;
          if (!I.UI_KEYS.includes(fullKey)) I.UI_KEYS.push(fullKey);
        });
      }
      if (typeof I.normalizeCoverage === 'function') {
        try {
          I.normalizeCoverage();
        } catch (_) {}
      }
    }
  } catch (_) {}

  window.StatKISS_OfficersEditor = Object.assign({}, window.StatKISS_OfficersEditor, {
    KEY_PREFIX,
    TEXT,
    resolveLangCode,
    getCurrentLang,
    t: translate,
  });
})();
