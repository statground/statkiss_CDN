(function () {
	'use strict';

	function getI18N() {
		return window.StatKISS_I18N || null;
	}

	function readFooterPolicyI18N() {
		const node = document.getElementById('statkiss-footer-policy-i18n');
		if (!node) return {};
		try {
			return JSON.parse(node.textContent || '{}');
		} catch (_) {
			return {};
		}
	}

	const footerPolicyI18N = readFooterPolicyI18N();

	function resolveLang(lang) {
		const I = getI18N();
		if (I && typeof I.resolveLangCode === 'function') {
			return I.resolveLangCode(lang || 'en');
		}
		return String(lang || 'en').trim() || 'en';
	}

	function getPathLang() {
		const supported = (() => {
			const I = getI18N();
			return I && Array.isArray(I.languages) ? I.languages.map((value) => value.code) : ['en'];
		})();
		const parts = String(window.location.pathname || '').split('/').filter(Boolean);
		if (parts.length && supported.includes(parts[0])) {
			return resolveLang(parts[0]);
		}
		return '';
	}

	function getCurrentLang() {
		const candidates = [
			getPathLang(),
			document.documentElement.getAttribute('lang'),
			(function () {
				const I = getI18N();
				if (!I || !I.LANG_KEY) return '';
				try {
					return localStorage.getItem(I.LANG_KEY) || '';
				} catch (_) {
					return '';
				}
			})(),
			typeof navigator !== 'undefined' ? navigator.language : '',
			'en'
		];

		for (const candidate of candidates) {
			const resolved = resolveLang(candidate);
			if (resolved) return resolved;
		}
		return 'en';
	}

	function getPolicyLabel(policyKey, lang) {
		const langCode = resolveLang(lang);
		const localized = footerPolicyI18N[langCode] || footerPolicyI18N.en || {};
		return localized[policyKey] || (footerPolicyI18N.en || {})[policyKey] || '';
	}

	function getPolicyPath(policyKey, lang) {
		return '/' + resolveLang(lang) + '/' + policyKey + '/';
	}

	function apply(lang) {
		const root = document.getElementById('div_footer');
		if (!root) return;

		const langCode = resolveLang(lang || getCurrentLang());
		const I = getI18N();
		const isRTL = !!(I && typeof I.isRTL === 'function' ? I.isRTL(langCode) : langCode === 'ar');
		const nav = root.querySelector('[data-footer-policy-nav]');
		if (nav) {
			nav.setAttribute('lang', langCode);
			nav.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
		}

		root.querySelectorAll('[data-footer-policy-link]').forEach(function (anchor) {
			const policyKey = String(anchor.getAttribute('data-policy-key') || '').trim();
			if (!policyKey) return;
			const nextLabel = getPolicyLabel(policyKey, langCode);
			if (nextLabel) anchor.textContent = nextLabel;
			anchor.setAttribute('href', getPolicyPath(policyKey, langCode));
			anchor.setAttribute('hreflang', langCode);
			anchor.setAttribute('lang', langCode);
			if (isRTL) {
				anchor.setAttribute('dir', 'rtl');
			} else {
				anchor.removeAttribute('dir');
			}
		});
	}

	window.StatKISS_FooterPolicy = {
		apply: apply,
		getCurrentLang: getCurrentLang,
		getPolicyPath: getPolicyPath,
		getPolicyLabel: getPolicyLabel,
	};

	function bind() {
		apply(getCurrentLang());

		window.addEventListener('statkiss:lang', function (event) {
			const nextLang = event && event.detail ? (event.detail.lang || event.detail.language || event.detail.code || event.detail.value) : getCurrentLang();
			apply(nextLang);
		});

		window.addEventListener('storage', function (event) {
			if (!event) return;
			const I = getI18N();
			const langKey = I && I.LANG_KEY ? I.LANG_KEY : 'statkiss_lang';
			if (event.key === langKey || event.key === 'statkiss_lang') {
				apply(event.newValue || getCurrentLang());
			}
		});

		window.addEventListener('popstate', function () {
			apply(getCurrentLang());
		});

		const observer = new MutationObserver(function () {
			apply(getCurrentLang());
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bind, { once: true });
	} else {
		bind();
	}
})();