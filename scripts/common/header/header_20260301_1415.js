/**
 * StatKISS header.js (single bundle)
 * - Replaces:
 *   init_variables_20231030_0026.js
 *   Div_menu_20240330_1520.js
 *   Div_sub_header.js
 *   menu_dropdown_initialization_20231030_0026.js
 *   click_dropdown_20231030_0027.js
 *   get_menu_header_20240330_2005.js
 *
 * Requirements (already in meta.html):
 * - React 18 UMD, ReactDOM 18 UMD
 * - Tailwind CDN
 * - Babel standalone (because we keep JSX / text/babel)
 * - Optional: jQuery (not used)
 *
 * Global exports:
 * - window.Div_menu (React component)
 * - window.click_dropdown()  // compatibility (closes dropdowns)
 * - window.get_menu_header() // compatibility (no-op; fetch is inside Header)
 *
 * Notes:
 * - Language is driven by window.StatKISS_I18N (from i18n.js).
 * - Theme is stored in localStorage('statkiss_theme'), toggles html.dark.
 */

const { useEffect, useMemo, useRef, useState } = React;

(function () {
  'use strict';

  // -----------------------------
  // Small helpers
  // -----------------------------
  function cx() {
    return Array.from(arguments).filter(Boolean).join(' ');
  }

  function safeGet(obj, path, fallback) {
    try {
      const parts = String(path).split('.');
      let cur = obj;
      for (const p of parts) {
        if (cur == null) return fallback;
        cur = cur[p];
      }
      return (cur == null ? fallback : cur);
    } catch (_) {
      return fallback;
    }
  }

  function useOutsideClose(ref, onClose) {
    useEffect(() => {
      function handler(e) {
        if (!ref.current) return;
        if (ref.current.contains(e.target)) return;
        onClose && onClose();
      }
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler, { passive: true });
      return () => {
        document.removeEventListener('mousedown', handler);
        document.removeEventListener('touchstart', handler);
      };
    }, [ref, onClose]);
  }

  function ensureTheme(theme) {
    try {
      localStorage.setItem('statkiss_theme', theme);
    } catch (_) {}
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem('statkiss_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return 'light';
  }

  function ensureLang(lang) {
    const I = window.StatKISS_I18N;
    if (!I) return;
    const normalized = I.resolveLangCode(lang);
    try {
      localStorage.setItem(I.LANG_KEY, normalized);
    } catch (_) {}
    I.applyLangToDocument(normalized);
  }

  function getInitialLang() {
    const I = window.StatKISS_I18N;
    if (!I) return 'en';
    return I.init();
  }

  // -----------------------------
  // Icons (inline svg for zero deps)
  // -----------------------------
  function SunIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }

  function MoonIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    );
  }

  function GlobeIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2c3 2.7 5 6.2 5 10s-2 7.3-5 10c-3-2.7-5-6.2-5-10s2-7.3 5-10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    );
  }

  function MenuIcon({ className }) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }

  // -----------------------------
  // Menu definition (URLs are same spirit as existing structure; adjust later if needed)
  // -----------------------------
  function buildMenu(t) {
    return [
      {
        key: 'about',
        title: t('header.about'),
        leftBg: 'from-sky-600 to-emerald-900',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/018.jpg',
        cols: [
          [
            { label: 'About Us', href: '/about/' },
            { label: 'Officers/Board', href: '/about/officers/' },
          ],
          [
            { label: 'Constitution', href: '/about/constitution/' },
            { label: 'By Laws', href: '/about/laws/' },
          ],
        ],
      },
      {
        key: 'announcement',
        title: t('header.announcement'),
        leftBg: 'from-indigo-600 to-cyan-700',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/024.jpg',
        cols: [
          [
            { label: 'KISS Event', href: '/announcement/event/' },
            { label: 'Member News', href: '/announcement/member/' },
          ],
          [
            { label: 'Advertisement', href: '/announcement/ads/' },
            { label: 'Job Related Ads.', href: '/announcement/jobs/' },
          ],
        ],
      },
      {
        key: 'publications',
        title: t('header.publications'),
        leftBg: 'from-violet-600 to-fuchsia-700',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/017.png',
        cols: [
          [
            { label: 'Journals', href: '/pubs/journals/' },
          ],
          [
            { label: 'Newsletter', href: '/pubs/newsletter/' },
          ],
        ],
      },
      {
        key: 'awards',
        title: t('header.awards'),
        leftBg: 'from-amber-600 to-rose-700',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/021.jpg',
        cols: [
          [
            { label: 'Career Development Award', href: '/awards/career/' },
            { label: 'Outstanding Student Paper Award', href: '/awards/student/' },
          ],
        ],
      },
      {
        key: 'forums',
        title: t('header.forums'),
        leftBg: 'from-emerald-700 to-teal-800',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/020.jpg',
        cols: [
          [
            { label: 'Facebook Group', href: 'https://www.facebook.com/groups/190717430950968', target: '_blank' },
          ],
          [
            { label: 'Useful Links', href: '/forums/links/' },
          ],
        ],
      },
      {
        key: 'membership',
        title: t('header.membership'),
        leftBg: 'from-slate-700 to-slate-900',
        image: null,
        cols: [
          [
            { label: 'Join / Renew', href: '/membership/' },
          ],
          [
            { label: 'Donation', href: '/membership/donations/' },
          ],
        ],
      },
    ];
  }

  // -----------------------------
  // Header React component
  // -----------------------------
  function Header() {
    const I = window.StatKISS_I18N;
    const lang0 = getInitialLang();
    const [lang, setLang] = useState(lang0);
    const [theme, setTheme] = useState(getInitialTheme());

    const t = useMemo(() => {
      if (!I) return (k) => k;
      return (key) => I.t(lang, key);
    }, [I, lang]);

    const menu = useMemo(() => buildMenu(t), [t]);

    const [user, setUser] = useState({
      loaded: false,
      username: '',
      name: '',
      role: '',
      officer: 'Member',
      role_addon_kssjoint: 0,
    });

    const [openDesktop, setOpenDesktop] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMobileSection, setOpenMobileSection] = useState(null);

    const megaRef = useRef(null);
    useOutsideClose(megaRef, () => setOpenDesktop(null));

    useEffect(() => {
      ensureTheme(theme);
    }, [theme]);

    useEffect(() => {
      ensureLang(lang);
      setLang(lang); // keep state
      // Inform other UI if needed
      window.dispatchEvent(new CustomEvent('statkiss:lang', { detail: { lang } }));
    }, [lang]);

    useEffect(() => {
      // Fetch login/user state (same spirit as old get_menu_header)
      fetch('/ajax_get_menu_header/')
        .then(r => (r.ok ? r.json() : Promise.reject(new Error('no endpoint'))))
        .then(data => {
          setUser({
            loaded: true,
            username: data?.username || data?.gv_username || '',
            name: data?.name || '',
            role: data?.role || '',
            officer: data?.officer || 'Member',
            role_addon_kssjoint: data?.role_addon_kssjoint || 0,
          });
        })
        .catch(() => setUser(u => ({ ...u, loaded: true, username: '' })));
    }, []);

    function isAdminLike() {
      const r = user.role;
      const officer = user.officer;
      return (r === 'Administrator' || r === 'Developer' || (officer && officer !== 'Member'));
    }

    function TopRight() {
      return (
        <div className="flex items-center gap-2">
          {/* Language button (opens modal-like panel) */}
          <LangDropdown lang={lang} setLang={setLang} />

          {/* Theme icon toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            aria-label={t('theme.toggle')}
            title={t('theme.toggle')}
          >
            {theme === 'dark'
              ? <MoonIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              : <SunIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            }
          </button>

          {/* Auth */}
          {user.loaded && !user.username && (
            <div className="flex items-center gap-2 text-xs">
              <a className="rounded-full px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" href="/account/">
                {t('auth.login')}
              </a>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <a className="rounded-full px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" href="/account/signup/">
                {t('auth.signup')}
              </a>
            </div>
          )}

          {user.loaded && user.username && (
            <div className="flex items-center gap-2 text-xs">
              <a className="flex items-center gap-2 rounded-full px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" href="/account/myinfo/">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-[11px] font-extrabold dark:bg-white dark:text-slate-900">
                  {(user.name || user.username || 'U').slice(0, 1).toUpperCase()}
                </span>
                <span>{user.name || user.username}</span>
              </a>

              <span className="text-slate-300 dark:text-slate-600">|</span>
              <a className="rounded-full px-3 py-2 font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800" href="/membership/">
                {user.role || t('auth.membership')}
              </a>

              {user.officer && user.officer !== 'Member' && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="rounded-full px-3 py-2 font-extrabold">{user.officer}</span>
                </>
              )}

              {user.role_addon_kssjoint === 1 && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="rounded-full px-3 py-2 font-extrabold">KSS Joint Member</span>
                </>
              )}

              {isAdminLike() && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <a className="rounded-full px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" href="/admin/">
                    {t('auth.admin')}
                  </a>
                </>
              )}

              <span className="text-slate-300 dark:text-slate-600">|</span>
              <a className="rounded-full px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" href="/account/logout/">
                {t('auth.logout')}
              </a>
            </div>
          )}
        </div>
      );
    }

    function DesktopMenu() {
      return (
        <div className="hidden lg:flex items-center gap-1">
          {menu.map(item => (
            <button
              key={item.key}
              type="button"
              onClick={() => setOpenDesktop(openDesktop === item.key ? null : item.key)}
              className={cx(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                openDesktop === item.key
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      );
    }

    function MegaPanel() {
      if (!openDesktop) return null;
      const item = menu.find(x => x.key === openDesktop);
      if (!item) return null;

      return (
        <div className="absolute left-0 right-0 top-full z-50">
          <div className="mx-auto max-w-6xl px-4">
            <div
              ref={megaRef}
              className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid grid-cols-12 gap-0">
                {/* left title */}
                <div className="col-span-12 md:col-span-3">
                  <div className="h-full p-6">
                    <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-950">
                      <div className={cx('text-lg font-extrabold bg-gradient-to-r bg-clip-text text-transparent', item.leftBg)}>
                        {item.title}
                      </div>
                      <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        {t('header.nav_caption')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* links */}
                <div className="col-span-12 md:col-span-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                    {item.cols.map((col, idx) => (
                      <div key={idx} className="space-y-2">
                        {col.map((link, j) => (
                          <a
                            key={j}
                            href={link.href}
                            target={link.target || '_self'}
                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* image */}
                <div className="col-span-12 md:col-span-3">
                  <div className="p-6">
                    {item.image ? (
                      <div className="h-40 w-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                    ) : (
                      <div className="h-40 w-full rounded-2xl border border-dashed border-slate-300 dark:border-slate-700" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end border-t border-slate-200 px-6 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <button
                  className="rounded-full px-3 py-1 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => setOpenDesktop(null)}
                  type="button"
                >
                  {t('header.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    function MobileMenu() {
      return (
        <div className={cx('lg:hidden', mobileOpen ? 'block' : 'hidden')}>
          <div className="mx-auto max-w-6xl px-4">
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="p-3">
                {menu.map(item => (
                  <div key={item.key} className="border-b border-slate-100 last:border-b-0 dark:border-slate-800">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                      onClick={() => setOpenMobileSection(openMobileSection === item.key ? null : item.key)}
                    >
                      <span>{item.title}</span>
                      <span className="text-slate-400">{openMobileSection === item.key ? '–' : '+'}</span>
                    </button>

                    {openMobileSection === item.key && (
                      <div className="pb-3 pl-3 pr-2">
                        {item.cols.flat().map((link, idx) => (
                          <a
                            key={idx}
                            href={link.href}
                            target={link.target || '_self'}
                            className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            - {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <header className="sticky top-0 z-40">
        {/* top utility bar */}
        <div className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-2">
            <TopRight />
          </div>
        </div>

        {/* main nav */}
        <div className="bg-white dark:bg-slate-950">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            {/* logo only (no text as requested) */}
            <a href="/" className="flex items-center">
              <img
                src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/logo/logo.png"
                className="h-10 w-auto"
                alt="StatKISS"
              />
            </a>

            <DesktopMenu />

            {/* mobile hamburger */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              onClick={() => { setMobileOpen(!mobileOpen); setOpenMobileSection(null); }}
              aria-label={t('header.menu')}
              title={t('header.menu')}
            >
              <MenuIcon className="h-5 w-5" />
              {t('header.menu')}
            </button>
          </div>
        </div>

        {/* mega dropdown */}
        <MegaPanel />

        {/* mobile dropdown */}
        <MobileMenu />
      </header>
    );
  }

  function LangDropdown({ lang, setLang }) {
    const I = window.StatKISS_I18N;
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useOutsideClose(ref, () => setOpen(false));

    const langs = (I && I.languages) ? I.languages : [{ code: 'en', label: 'English' }];

    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          aria-label={(I ? I.t(lang, 'lang.open') : 'Language')}
          title={(I ? I.t(lang, 'lang.open') : 'Language')}
        >
          <GlobeIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{lang}</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="px-4 py-3 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              {(I ? I.t(lang, 'lang.title') : 'Language')}
            </div>
            <div className="max-h-72 overflow-auto">
              {langs.map(l => {
                const active = l.code === lang;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    className={cx(
                      'w-full px-4 py-3 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800',
                      active ? 'bg-slate-50 dark:bg-slate-800/60' : ''
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{l.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{l.code}</div>
                      </div>
                      <div className={cx('text-slate-900 dark:text-slate-100', active ? '' : 'opacity-0')}>✓</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // -----------------------------
  // Compatibility functions (called by existing templates)
  // -----------------------------
  window.click_dropdown = function () {
    // This is called on main/footer click in index.html. We use it as a global "close dropdown" signal.
    window.dispatchEvent(new CustomEvent('statkiss:close-dropdown'));
  };

  window.get_menu_header = function () {
    // Old code called get_menu_header() after rendering menu/footer.
    // New header fetches user state internally; so keep as no-op for compatibility.
    return;
  };

  // -----------------------------
  // Div_menu export (compat with ReactDOM.render(<Div_menu />))
  // -----------------------------
  function Div_menu() {
    const [closeSignal, setCloseSignal] = useState(0);

    useEffect(() => {
      function handler() { setCloseSignal(x => x + 1); }
      window.addEventListener('statkiss:close-dropdown', handler);
      return () => window.removeEventListener('statkiss:close-dropdown', handler);
    }, []);

    // Re-mount Header on close signal to force dropdown close state? (not needed; Header uses outside click)
    // We'll just render Header; dropdowns close via outside click anyway.
    return <Header key={closeSignal} />;
  }

  window.Div_menu = Div_menu;

  // Optional auto-mount safeguard (in case template forgets ReactDOM.render)
  function autoMountIfNeeded() {
    const el = document.getElementById('div_menu');
    if (!el) return;
    // If the page did not explicitly call ReactDOM.render(<Div_menu />),
    // we mount once. If it did, React will warn if we double-mount, so we guard.
    if (el.getAttribute('data-statkiss-mounted') === '1') return;
    el.setAttribute('data-statkiss-mounted', '1');
    try {
      ReactDOM.render(<Div_menu />, el);
    } catch (_) {
      // ignore; template likely mounted already
    }
  }

  // Only attempt auto-mount after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountIfNeeded);
  } else {
    autoMountIfNeeded();
  }
})();
