(function initStatkissAnnouncementI18N() {
  if (window.StatKISS_AnnouncementI18N) return;

  const TEXT = {
    en: {
      write: "Write",
      edit: "Edit",
      delete: "Delete",
      list: "List",
      submit: "Submit",
      saving: "Saving…",
      titlePlaceholder: "Please enter a title.",
      contentRequired: "Please enter the content.",
      uploadTitle: "Attach files",
      uploadHint: "Drag and drop multiple files here, or click to browse.",
      existingFiles: "Existing files",
      newFiles: "New files",
      attachments: "Attachments",
      remove: "Remove",
      viewOriginal: "View original",
      viewCurrent: "View current language",
      noPosts: "No posts have been registered yet.",
      loading: "Loading…",
      allLoaded: "All posts have been loaded.",
      failedLoad: "Failed to load. Please try again.",
      failedSave: "Failed to save. Please try again.",
      failedDelete: "Failed to delete. Please try again.",
      confirmDelete: "Are you sure you want to delete this post?",
      original: "Original",
      untitled: "Untitled",
      attachmentCount: "attachments",
      noAttachments: "No attachments",
      writeDenied: "You do not have permission to manage announcements.",
      browse: "Browse files",
      dragActive: "Drop files here",
      readMore: "Read more",
      modifiedAt: "Updated",
      createdAt: "Created",
      writer: "Writer",
      category: "Category",
    },
    ko: {
      write: "글쓰기",
      edit: "수정",
      delete: "삭제",
      list: "목록",
      submit: "등록",
      saving: "저장 중…",
      titlePlaceholder: "제목을 입력하세요.",
      contentRequired: "내용을 입력하세요.",
      uploadTitle: "파일 첨부",
      uploadHint: "여러 파일을 드래그해서 넣거나 클릭하여 선택하세요.",
      existingFiles: "기존 파일",
      newFiles: "새 파일",
      attachments: "첨부파일",
      remove: "제거",
      viewOriginal: "원문 보기",
      viewCurrent: "현재 언어로 보기",
      noPosts: "등록된 글이 없습니다.",
      loading: "불러오는 중…",
      allLoaded: "모든 글을 불러왔습니다.",
      failedLoad: "불러오기에 실패했습니다. 잠시 후 다시 시도해주세요.",
      failedSave: "저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
      failedDelete: "삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
      confirmDelete: "이 글을 삭제하시겠습니까?",
      original: "원문",
      untitled: "제목 없음",
      attachmentCount: "개 첨부",
      noAttachments: "첨부파일 없음",
      writeDenied: "공지사항을 관리할 권한이 없습니다.",
      browse: "파일 선택",
      dragActive: "여기에 파일을 놓으세요",
      readMore: "더 보기",
      modifiedAt: "수정일",
      createdAt: "작성일",
      writer: "작성자",
      category: "분류",
    },
  };

  const DESC = {
    en: {
      event: "Stay informed about KISS conferences, sessions, and academic events.",
      member: "Updates, achievements, and activities shared by KISS members worldwide.",
      ads: "Calls for sessions, abstracts, conferences, and related opportunities.",
      jobs: "Explore job opportunities and career-related announcements from the KISS community.",
    },
    ko: {
      event: "학회 행사, 세션, 학술 이벤트 소식을 확인하세요.",
      member: "회원들의 소식과 성과, 활동을 공유합니다.",
      ads: "세션 공모, 학회 공지, 다양한 대외 공고를 모아봅니다.",
      jobs: "KISS 커뮤니티의 채용 및 커리어 관련 공고를 확인하세요.",
    }
  };

  function normalizeLang(code) {
    const I = window.StatKISS_I18N || null;
    if (I && typeof I.resolveLangCode === 'function') {
      return I.resolveLangCode(code || 'en');
    }
    const value = String(code || 'en').trim();
    return value || 'en';
  }

  function getTextBundle(lang) {
    const normalized = normalizeLang(lang);
    return TEXT[normalized] || TEXT.en;
  }

  function t(key, lang) {
    const bundle = getTextBundle(lang);
    return bundle[key] || TEXT.en[key] || key;
  }

  function getCategoryTitle(url, lang) {
    const normalized = normalizeLang(lang);
    const I = window.StatKISS_I18N || null;
    const keyMap = {
      event: 'nav.kiss_event',
      member: 'nav.member_news',
      ads: 'nav.advertisement',
      jobs: 'nav.job_ads',
    };

    if (I && keyMap[url] && typeof I.t === 'function') {
      return I.t(normalized, keyMap[url]);
    }

    const fallback = {
      event: 'KISS Event',
      member: 'KISS Member News',
      ads: 'Advertisement',
      jobs: 'KISS Job Board',
    };
    return fallback[url] || 'Announcement';
  }

  function getCategoryDescription(url, lang) {
    const normalized = normalizeLang(lang);
    const bundle = DESC[normalized] || DESC.en;
    return bundle[url] || '';
  }

  window.StatKISS_AnnouncementI18N = {
    TEXT,
    DESC,
    normalizeLang,
    getTextBundle,
    t,
    getCategoryTitle,
    getCategoryDescription,
  };
})();
