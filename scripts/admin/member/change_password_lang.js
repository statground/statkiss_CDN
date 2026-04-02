(function () {
  'use strict';

  const messages = {
    en: {
      language_label: 'Language',
      copy_button: 'Copy reset link',
      copying: 'Preparing link…',
      copied_title: 'The password reset link was copied to your clipboard.',
      copied_body: 'Send this link to the member who requested the password reset.',
      copied_warning: 'Do not open this link yourself. Opening it may verify the link and cause it to expire automatically.',
      copy_failed: 'Unable to copy the link automatically. Copy the text below and send it to the member instead.',
      member_not_found: 'No matching member account was found for this e-mail address.',
      generic_error: 'Unable to prepare the password reset link right now.',
    },
    ko: {
      language_label: '언어',
      copy_button: '링크 복사',
      copying: '링크 준비 중…',
      copied_title: '비밀번호 변경 링크를 클립보드에 복사했습니다.',
      copied_body: '이 링크는 비밀번호 재설정을 요청한 회원에게 전달하는 용도입니다.',
      copied_warning: '관리자가 이 링크를 직접 클릭하면 인증이 진행되어 자동으로 만료될 수 있으니 직접 클릭하지 마세요.',
      copy_failed: '자동 복사에 실패했습니다. 아래 텍스트를 직접 복사해서 회원에게 전달해 주세요.',
      member_not_found: '해당 이메일과 일치하는 회원 계정을 찾지 못했습니다.',
      generic_error: '지금은 비밀번호 변경 링크를 준비할 수 없습니다.',
    },
  };

  function getLang() {
    if (typeof admin_get_current_lang === 'function') {
      return admin_get_current_lang();
    }
    try {
      const htmlLang = document.documentElement.getAttribute('lang');
      if (htmlLang) return htmlLang;
    } catch (_) {}
    return 'en';
  }

  function t(key) {
    const lang = String(getLang() || 'en').trim();
    const dict = messages[lang] || messages.en;
    return dict[key] || messages.en[key] || key;
  }

  function getLanguageOptions() {
    try {
      const I = window.StatKISS_I18N;
      if (I && Array.isArray(I.languages) && I.languages.length) {
        return I.languages.map((item) => ({
          code: String(item.code || '').trim(),
          label: String(item.label || item.code || '').trim(),
        })).filter((item) => item.code);
      }
    } catch (_) {}
    return [{ code: 'en', label: 'English' }];
  }

  function makeId(email) {
    return String(email || '').replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function copyText(text) {
    const value = String(text || '');
    if (!value) return false;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch (_) {}

    try {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', 'readonly');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const copied = document.execCommand('copy');
      document.body.removeChild(textarea);
      return !!copied;
    } catch (_) {
      return false;
    }
  }

  function renderNotice(target, kind, url) {
    const noticeId = target.getAttribute('data-notice-id');
    const noticeNode = noticeId ? document.getElementById(noticeId) : null;
    if (!noticeNode) return;

    if (kind === 'success') {
      noticeNode.innerHTML = [
        '<div class="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7">',
        '  <p class="font-semibold text-emerald-700 underline">' + escapeHtml(t('copied_title')) + '</p>',
        '  <p class="mt-2 text-slate-700">' + escapeHtml(t('copied_body')) + '</p>',
        '  <p class="mt-2 text-rose-600">' + escapeHtml(t('copied_warning')) + '</p>',
        '</div>'
      ].join('');
      return;
    }

    if (kind === 'copy_failed') {
      noticeNode.innerHTML = [
        '<div class="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7">',
        '  <p class="font-semibold text-rose-700">' + escapeHtml(t('copy_failed')) + '</p>',
        '  <p class="mt-2 break-all text-slate-700">' + escapeHtml(url || '') + '</p>',
        '  <p class="mt-2 text-rose-600">' + escapeHtml(t('copied_warning')) + '</p>',
        '</div>'
      ].join('');
      return;
    }

    noticeNode.innerHTML = [
      '<div class="mt-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">',
      escapeHtml(url || t('generic_error')),
      '</div>'
    ].join('');
  }

  function renderSelector(target, email) {
    const currentLang = String(getLang() || 'en').trim() || 'en';
    const safeId = makeId(email);
    const selectId = 'member_password_lang_' + safeId;
    const buttonId = 'member_password_copy_' + safeId;
    const noticeId = 'member_password_notice_' + safeId;

    const optionsHtml = getLanguageOptions().map((item) => {
      const selected = item.code === currentLang ? ' selected' : '';
      return '<option value="' + escapeHtml(item.code) + '"' + selected + '>' + escapeHtml(item.label + ' (' + item.code + ')') + '</option>';
    }).join('');

    target.setAttribute('data-notice-id', noticeId);
    target.innerHTML = [
      '<div class="mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">',
      '  <label for="' + escapeHtml(selectId) + '" class="block text-sm font-medium text-slate-700">' + escapeHtml(t('language_label')) + '</label>',
      '  <div class="mt-2 flex flex-col gap-2 sm:flex-row">',
      '    <select id="' + escapeHtml(selectId) + '" class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none">' + optionsHtml + '</select>',
      '    <button id="' + escapeHtml(buttonId) + '" type="button" class="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700">' + escapeHtml(t('copy_button')) + '</button>',
      '  </div>',
      '  <div id="' + escapeHtml(noticeId) + '"></div>',
      '</div>'
    ].join('');

    const button = document.getElementById(buttonId);
    const select = document.getElementById(selectId);
    if (!button || !select) return;

    button.addEventListener('click', async function () {
      const previousLabel = button.textContent;
      button.disabled = true;
      button.textContent = t('copying');
      try {
        const requestData = new FormData();
        requestData.append('email', email);
        requestData.append('lang', select.value || currentLang);

        const response = await fetch(admin_build_url('/admin/ajax_get_change_password_link/'), {
          method: 'post',
          headers: { 'X-CSRFToken': getCookie('csrftoken') },
          body: requestData,
        }).then((res) => res.json());

        if (!response || response.exist === 'NOTEXIST') {
          renderNotice(target, 'error', t('member_not_found'));
          return;
        }
        if (!response.url) {
          renderNotice(target, 'error', t('generic_error'));
          return;
        }

        const copied = await copyText(response.url);
        renderNotice(target, copied ? 'success' : 'copy_failed', response.url);
      } catch (_) {
        renderNotice(target, 'error', t('generic_error'));
      } finally {
        button.disabled = false;
        button.textContent = previousLabel;
      }
    });
  }

  async function patchedChangePasswordButton(email) {
    const target = document.getElementById('div_member_list_btn_change_password_' + email);
    if (!target) return;
    renderSelector(target, email);
  }

  window.click_btn_like_change_password = patchedChangePasswordButton;
  try { click_btn_like_change_password = patchedChangePasswordButton; } catch (_) {}
})();
