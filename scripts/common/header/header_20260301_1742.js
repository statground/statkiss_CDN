/**
 * StatKISS header.js (single bundle)
 * - Responsive is determined by window.innerWidth to avoid matchMedia quirks
 * - Dark mode works even when Tailwind CDN is configured with darkMode:'media' (adds scoped CSS fallbacks)
 *
 * Global exports:
 * - window.Div_menu (React component)
 * - window.click_dropdown()  // compatibility
 * - window.get_menu_header() // compatibility
 */

const { useEffect, useMemo, useRef, useState } = React;

(function () {
  // Dark header visibility fallback (force white text/icons in dark mode)
  (function injectHeaderDarkFallback(){
    if (document.getElementById('statkiss-header-dark-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-header-dark-fallback';
    style.textContent = `
      html.dark header.statkiss-header,
      html.dark header.statkiss-header * { color: inherit; }
      html.dark header.statkiss-header .statkiss-navbtn,
      html.dark header.statkiss-header .statkiss-toplink,
      html.dark header.statkiss-header .statkiss-iconbtn { color: #ffffff !important; }
      html.dark header.statkiss-header .statkiss-navbtn:hover { background: rgba(255,255,255,0.10) !important; }
      html.dark header.statkiss-header .statkiss-iconbtn { border-color: rgba(148,163,184,0.28) !important; background: rgba(2,6,23,0.35) !important; }
      html.dark header.statkiss-header .statkiss-iconbtn:hover { background: rgba(255,255,255,0.10) !important; }
      /* Fix: dark mode hover on Login/Sign Up (background can turn white; keep text readable) */
      html.dark header.statkiss-header .statkiss-toplink:hover,
      html.dark header.statkiss-header .statkiss-toplink:focus-visible {
        background: rgba(255,255,255,0.92) !important;
        color: #0f172a !important; /* slate-900 */
      }
      html.dark header.statkiss-header .statkiss-divider { color: rgba(148,163,184,0.65) !important; }

      /* Fix: make logo visible in dark mode with shape-following white shadow */
            html.dark header.statkiss-header img.statkiss-logo {
        /* crisper, cleaner outline (alpha-following) */
        filter:
          drop-shadow(0 0 2px rgba(255,255,255,0.70))
          drop-shadow(0 0 6px rgba(255,255,255,0.28))
          brightness(1.12)
          contrast(1.10);
      }
    `;
    document.head.appendChild(style);
  })();

  'use strict';

  const DESKTOP_BP = 1024; // px

  function cx() { return Array.from(arguments).filter(Boolean).join(' '); }

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

  function useViewportWidth() {
    const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0));
    useEffect(() => {
      let raf = 0;
      const onResize = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => setW(window.innerWidth));
      };
      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('orientationchange', onResize, { passive: true });
      onResize();
      return () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onResize);
      };
    }, []);
    return w;
  }

  // Dark mode: we keep toggling html.dark, AND add a scoped CSS fallback
  function injectDarkFallbackCSS() {
    if (document.getElementById('statkiss-dark-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-dark-fallback';
    style.textContent = `
      /* Scoped fallback for dark mode (works even if Tailwind dark variants are not enabled) */
      html.dark body { background-color:#020617; color:#e2e8f0; }
      html.dark .statkiss-header__top { border-color:#1f2937; background: rgba(2,6,23,.72); }
      html.dark .statkiss-header__main { background:#020617; }
      html.dark .statkiss-card { background:#0b1220; border-color:#1f2937; color:#e2e8f0; }
      html.dark .statkiss-muted { color:#94a3b8; }
      html.dark .statkiss-hover:hover { background:#111827; }
      html.dark .statkiss-divider { color:#334155; }
      html.dark .statkiss-btn { background:#0b1220; border-color:#1f2937; }
      html.dark .statkiss-btn:hover { background:#111827; }
      html.dark .statkiss-mega { background:#0b1220; border-color:#1f2937; }
      html.dark .statkiss-mega a:hover { background:#111827; }
    `;
    document.head.appendChild(style);
  }

  function ensureTheme(theme) {
    injectDarkFallbackCSS();
    try { localStorage.setItem('statkiss_theme', theme); } catch (_) {}
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    // also help browser UI
    try { document.documentElement.style.colorScheme = theme; } catch (_) {}
    window.dispatchEvent(new CustomEvent('statkiss:theme', { detail: { theme } }));
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
    try { localStorage.setItem(I.LANG_KEY, normalized); } catch (_) {}
    I.applyLangToDocument(normalized);
    window.dispatchEvent(new CustomEvent('statkiss:lang', { detail: { lang: normalized } }));
  }

  function getInitialLang() {
    const I = window.StatKISS_I18N;
    if (!I) return 'en';
    return I.init();
  }

  // Icons
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

  // Menu (fully i18n)
  function buildMenu(t) {
    return [
      {
        key: 'about',
        title: t('header.about'),
        leftBg: 'from-sky-600 to-emerald-900',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/018.jpg',
        cols: [
          [
            { label: t('nav.about_us'), href: '/about/' },
            { label: t('nav.officers'), href: '/about/officers/' },
          ],
          [
            { label: t('nav.constitution'), href: '/about/constitution/' },
            { label: t('nav.bylaws'), href: '/about/laws/' },
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
            { label: t('nav.kiss_event'), href: '/announcement/event/' },
            { label: t('nav.member_news'), href: '/announcement/member/' },
          ],
          [
            { label: t('nav.advertisement'), href: '/announcement/ads/' },
            { label: t('nav.job_ads'), href: '/announcement/jobs/' },
          ],
        ],
      },
      {
        key: 'publications',
        title: t('header.publications'),
        leftBg: 'from-violet-600 to-fuchsia-700',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/017.png',
        cols: [
          [{ label: t('nav.journals'), href: '/pubs/journals/' }],
          [{ label: t('nav.newsletter'), href: '/pubs/newsletter/' }],
        ],
      },
      {
        key: 'awards',
        title: t('header.awards'),
        leftBg: 'from-amber-600 to-rose-700',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/021.jpg',
        cols: [
          [
            { label: t('nav.career_award'), href: '/awards/career/' },
            { label: t('nav.student_award'), href: '/awards/student/' },
          ],
        ],
      },
      {
        key: 'forums',
        title: t('header.forums'),
        leftBg: 'from-emerald-700 to-teal-800',
        image: 'https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/photos/020.jpg',
        cols: [
          [{ label: t('nav.facebook_group'), href: 'https://www.facebook.com/groups/190717430950968', target: '_blank' }],
          [{ label: t('nav.useful_links'), href: '/forums/links/' }],
        ],
      },
      {
        key: 'membership',
        title: t('header.membership'),
        leftBg: 'from-slate-700 to-slate-900',
        image: null,
        cols: [
          [{ label: t('nav.join_renew'), href: '/membership/' }],
          [{ label: t('nav.donation'), href: '/membership/donations/' }],
        ],
      },
    ];
  }

  function Header() {
    const I = window.StatKISS_I18N;
    const [lang, setLang] = useState(getInitialLang());
    const [theme, setTheme] = useState(getInitialTheme());

    const vw = useViewportWidth();
    const isDesktop = vw >= DESKTOP_BP;

    const t = useMemo(() => (!I ? (k) => k : (key) => I.t(lang, key)), [I, lang]);
    const menu = useMemo(() => buildMenu(t), [t]);

    const [user, setUser] = useState({ loaded:false, username:'', name:'', role:'', officer:'Member', role_addon_kssjoint:0 });

    const [openDesktop, setOpenDesktop] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMobileSection, setOpenMobileSection] = useState(null);

    const megaRef = useRef(null);
    useOutsideClose(megaRef, () => setOpenDesktop(null));

    useEffect(() => { ensureTheme(theme); }, [theme]);
    useEffect(() => { ensureLang(lang); }, [lang]);

    useEffect(() => {
      // When breakpoint changes, close the other mode
      if (isDesktop) {
        setMobileOpen(false);
        setOpenMobileSection(null);
      } else {
        setOpenDesktop(null);
      }
    }, [isDesktop]);

    useEffect(() => {
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
        .catch(() => setUser(u => ({ ...u, loaded:true, username:'' })));
    }, []);

    function isAdminLike() {
      const r = user.role;
      const officer = user.officer;
      return (r === 'Administrator' || r === 'Developer' || (officer && officer !== 'Member'));
    }

    function LangDropdown() {
      const [open, setOpen] = useState(false);
      const ref = useRef(null);
      useOutsideClose(ref, () => setOpen(false));
      const langs = (I && I.languages) ? I.languages : [{ code: 'en', label: 'English' }];

      return (
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="statkiss-iconbtn statkiss-btn inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900/40 px-3 py-2 text-xs font-semibold shadow-sm hover:bg-slate-50 text-slate-700 dark:text-white"
            aria-label={t('lang.open')}
            title={t('lang.open')}
          >
            <GlobeIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{lang}</span>
          </button>

          {open && (
            <div className="statkiss-card absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900/40 shadow-lg">
              <div className="px-4 py-3 text-xs font-extrabold text-slate-700 dark:text-slate-200">{t('lang.title')}</div>
              <div className="max-h-72 overflow-auto">
                {langs.map(l => {
                  const active = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setOpen(false); }}
                      className={cx('statkiss-hover w-full px-4 py-3 text-left text-sm hover:bg-slate-50', active ? 'bg-slate-50' : '')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{l.label}</div>
                          <div className="statkiss-muted text-xs mt-0.5 text-slate-500">{l.code}</div>
                        </div>
                        <div className={cx(active ? '' : 'opacity-0')}>✓</div>
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

    function ThemeButton() {
      return (
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="statkiss-iconbtn statkiss-btn inline-flex items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900/40 p-2 shadow-sm hover:bg-slate-50 text-slate-700 dark:text-white"
          aria-label={t('theme.toggle')}
          title={t('theme.toggle')}
        >
          {theme === 'dark' ? <MoonIcon className="h-5 w-5 text-slate-700" /> : <SunIcon className="h-5 w-5 text-slate-700" />}
        </button>
      );
    }

    function TopRight() {
      return (
        <div className="flex items-center gap-2">
          <LangDropdown />
          <ThemeButton />

          {user.loaded && !user.username && (
            <div className="flex items-center gap-2 text-xs">
              <a className="statkiss-toplink rounded-full px-3 py-2 font-semibold hover:bg-slate-100 text-slate-700 dark:text-white dark:hover:bg-white/10" href="/account/">{t('auth.login')}</a>
              <span className="statkiss-divider text-slate-300">|</span>
              <a className="statkiss-toplink rounded-full px-3 py-2 font-semibold hover:bg-slate-100 text-slate-700 dark:text-white dark:hover:bg-white/10" href="/account/signup/">{t('auth.signup')}</a>
            </div>
          )}

          {user.loaded && user.username && (
            <div className="flex items-center gap-2 text-xs">
              <a className="flex items-center gap-2 statkiss-toplink rounded-full px-3 py-2 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800" href="/account/myinfo/">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-extrabold">{(user.name || user.username || 'U').slice(0,1).toUpperCase()}</span>
                <span>{user.name || user.username}</span>
              </a>

              <span className="statkiss-divider text-slate-300">|</span>
              <a className="rounded-full px-3 py-2 font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800" href="/membership/">{user.role || t('auth.membership')}</a>

              {user.officer && user.officer !== 'Member' && (
                <>
                  <span className="statkiss-divider text-slate-300">|</span>
                  <span className="rounded-full px-3 py-2 font-extrabold">{user.officer}</span>
                </>
              )}

              {user.role_addon_kssjoint === 1 && (
                <>
                  <span className="statkiss-divider text-slate-300">|</span>
                  <span className="rounded-full px-3 py-2 font-extrabold">KSS Joint Member</span>
                </>
              )}

              {isAdminLike() && (
                <>
                  <span className="statkiss-divider text-slate-300">|</span>
                  <a className="statkiss-toplink rounded-full px-3 py-2 font-semibold hover:bg-slate-100 text-slate-700 dark:text-white dark:hover:bg-white/10" href="/admin/">{t('auth.admin')}</a>
                </>
              )}

              <span className="statkiss-divider text-slate-300">|</span>
              <a className="statkiss-toplink rounded-full px-3 py-2 font-semibold hover:bg-slate-100 text-slate-700 dark:text-white dark:hover:bg-white/10" href="/account/logout/">{t('auth.logout')}</a>
            </div>
          )}
        </div>
      );
    }

    function DesktopMenu() {
      return (
        <nav className="flex items-center gap-1">
          {menu.map(item => (
            <button
              key={item.key}
              type="button"
              onClick={() => setOpenDesktop(openDesktop === item.key ? null : item.key)}
              className={cx(
                'statkiss-navbtn rounded-full px-4 py-2 text-sm font-semibold transition',
                openDesktop === item.key ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      );
    }

    function MegaPanel() {
      if (!openDesktop) return null;
      const item = menu.find(x => x.key === openDesktop);
      if (!item) return null;

      return (
        <div className="absolute left-0 right-0 top-full z-50">
          <div className="mx-auto max-w-6xl px-4">
            <div ref={megaRef} className="statkiss-mega mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900/40 shadow-lg">
              <div className="grid grid-cols-12 gap-0">
                <div className="col-span-12 md:col-span-3">
                  <div className="h-full p-6">
                    <div className="statkiss-card rounded-2xl bg-slate-50 p-6 border border-slate-100">
                      <div className={'text-lg font-extrabold text-slate-900 dark:text-white'}>{item.title}</div>
                      <div className="statkiss-muted mt-2 text-xs text-slate-600">{t('header.nav_caption')}</div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                    {item.cols.map((col, idx) => (
                      <div key={idx} className="space-y-2">
                        {col.map((link, j) => (
                          <a key={j} href={link.href} target={link.target || '_self'} className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10">
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {item.image ? (
                <div className="col-span-12 md:col-span-3">
                  <div className="p-6">

                    {item.image ? (
                      <div className="h-40 w-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                    ) : null}
                  
                  </div>
                </div>
              ) : null}
              </div>

              <div className="flex items-center justify-end border-t border-slate-200 px-6 py-3 text-xs text-slate-500">
                <button className="rounded-full px-3 py-1 font-semibold hover:bg-slate-100" onClick={() => setOpenDesktop(null)} type="button">
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
        <div className="mx-auto max-w-6xl px-4">
          <div className="statkiss-card mt-3 rounded-2xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900/40 shadow-sm">
            <div className="p-3">
              {menu.map(item => (
                <div key={item.key} className="border-b border-slate-100 last:border-b-0">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold hover:bg-slate-50"
                    onClick={() => setOpenMobileSection(openMobileSection === item.key ? null : item.key)}
                  >
                    <span>{item.title}</span>
                    <span className="text-slate-400">{openMobileSection === item.key ? '–' : '+'}</span>
                  </button>

                  {openMobileSection === item.key && (
                    <div className="pb-3 pl-3 pr-2">
                      {item.cols.flat().map((link, idx) => (
                        <a key={idx} href={link.href} target={link.target || '_self'} className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
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
      );
    }

    return (
      <header className="sticky top-0 z-40 statkiss-header">
        <div className="statkiss-header__top border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-2">
            <TopRight />
          </div>
        </div>

        <div className="statkiss-header__main bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/" className="flex items-center">
              <img src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/logo/logo_transparent.png" className="statkiss-logo h-12 md:h-14 w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.10)] dark:drop-shadow-[0_2px_24px_rgba(255,255,255,0.35)] dark:brightness-110 dark:contrast-110" alt="StatKISS" />
            </a>

            {isDesktop ? (
              <DesktopMenu />
            ) : (
              <button
                type="button"
                className="statkiss-iconbtn statkiss-btn inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900/40 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
                onClick={() => { setMobileOpen(!mobileOpen); setOpenMobileSection(null); }}
                aria-label={t('header.menu')}
                title={t('header.menu')}
              >
                <MenuIcon className="h-5 w-5" />
                {t('header.menu')}
              </button>
            )}
          </div>
        </div>

        {isDesktop && <MegaPanel />}
        {!isDesktop && mobileOpen && <MobileMenu />}
      </header>
    );
  }

  // Compatibility
  window.click_dropdown = function () { window.dispatchEvent(new CustomEvent('statkiss:close-dropdown')); };
  window.get_menu_header = function () { return; };

  function Div_menu() { return <Header />; }
  window.Div_menu = Div_menu;

  // Auto-mount
  function autoMountIfNeeded() {
    const el = document.getElementById('div_menu');
    if (!el) return;
    if (el.getAttribute('data-statkiss-mounted') === '1') return;
    el.setAttribute('data-statkiss-mounted', '1');
    try { ReactDOM.render(<Div_menu />, el); } catch (_) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoMountIfNeeded);
  else autoMountIfNeeded();
})();



// ===== Solid 5px White Outline via SVG Morphology (No Blur) =====
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("kiss-outline-svg")) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("id", "kiss-outline-svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.visibility = "hidden";

    const defs = document.createElementNS(svgNS, "defs");
    const filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", "kiss-outline");

    const morphology = document.createElementNS(svgNS, "feMorphology");
    morphology.setAttribute("in", "SourceAlpha");
    morphology.setAttribute("operator", "dilate");
    morphology.setAttribute("radius", "5");

    const flood = document.createElementNS(svgNS, "feFlood");
    flood.setAttribute("flood-color", "#ffffff");
    flood.setAttribute("result", "whiteFill");

    const composite = document.createElementNS(svgNS, "feComposite");
    composite.setAttribute("in", "whiteFill");
    composite.setAttribute("in2", "morphology");
    composite.setAttribute("operator", "in");
    composite.setAttribute("result", "outline");

    const merge = document.createElementNS(svgNS, "feMerge");
    const mergeNode1 = document.createElementNS(svgNS, "feMergeNode");
    mergeNode1.setAttribute("in", "outline");
    const mergeNode2 = document.createElementNS(svgNS, "feMergeNode");
    mergeNode2.setAttribute("in", "SourceGraphic");

    merge.appendChild(mergeNode1);
    merge.appendChild(mergeNode2);

    filter.appendChild(morphology);
    filter.appendChild(flood);
    filter.appendChild(composite);
    filter.appendChild(merge);

    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);
  }
});
