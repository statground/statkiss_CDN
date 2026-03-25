(function(){
'use strict';

function admin_path_lang_state() {
    const parts = String(window.location.pathname || '').split('/').filter(Boolean);
    const supported = (typeof admin_get_supported_lang_codes === 'function') ? admin_get_supported_lang_codes() : [];
    const resolver = (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.resolveLangCode === 'function')
        ? window.StatKISS_ADMIN_I18N.resolveLangCode
        : function(code) { return code; };

    if (!parts.length) {
        return { raw: '', normalized: '' };
    }

    const raw = String(parts[0] || '').trim();
    const normalized = resolver(raw);
    const matched = supported.find(function(code) {
        return String(code || '').toLowerCase() === String(normalized || '').toLowerCase();
    });

    if (!matched) {
        return { raw: '', normalized: '' };
    }

    return {
        raw: raw,
        normalized: matched
    };
}

function admin_get_path_lang() {
    return admin_path_lang_state().raw;
}

function admin_get_current_lang() {
    const pathState = admin_path_lang_state();
    if (pathState.normalized) {
        return pathState.normalized;
    }

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang && window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.resolveLangCode === 'function') {
        return window.StatKISS_ADMIN_I18N.resolveLangCode(htmlLang);
    }

    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.getLang === 'function') {
        return window.StatKISS_ADMIN_I18N.getLang();
    }

    return 'en';
}

function admin_get_locale_prefix() {
    const pathState = admin_path_lang_state();
    if (pathState.raw) {
        return '/' + pathState.raw;
    }

    const lang = admin_get_current_lang();
    return lang ? '/' + lang : '';
}

function admin_build_url(path) {
    const rawPath = String(path || '').trim();
    if (!rawPath) return rawPath;
    if (/^(https?:|mailto:|tel:|javascript:|#)/i.test(rawPath)) return rawPath;

    const normalizedPath = rawPath.startsWith('/') ? rawPath : '/' + rawPath;
    const supported = (typeof admin_get_supported_lang_codes === 'function') ? admin_get_supported_lang_codes() : [];
    const resolver = (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.resolveLangCode === 'function')
        ? window.StatKISS_ADMIN_I18N.resolveLangCode
        : function(code) { return code; };
    const parts = normalizedPath.split('/').filter(Boolean);

    if (parts.length) {
        const normalizedFirst = resolver(parts[0]);
        const hasLocalePrefix = supported.some(function(code) {
            return String(code || '').toLowerCase() === String(normalizedFirst || '').toLowerCase();
        });

        if (hasLocalePrefix) {
            return normalizedPath;
        }
    }

    return admin_get_locale_prefix() + normalizedPath;
}

window.admin_get_path_lang = admin_get_path_lang;
window.admin_get_current_lang = admin_get_current_lang;
window.admin_get_locale_prefix = admin_get_locale_prefix;
window.admin_build_url = admin_build_url;
})();
