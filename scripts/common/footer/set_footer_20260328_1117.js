function Div_footer() {
  (function injectFooterDarkFallback() {
    if (document.getElementById('statkiss-footer-dark-fallback')) return;
    const style = document.createElement('style');
    style.id = 'statkiss-footer-dark-fallback';
    style.textContent = `
      html.dark footer#div_footer {
        background: #020617 !important;
        color: #cbd5e1 !important;
        border-top: 1px solid rgba(148,163,184,0.14) !important;
      }
      html.dark footer#div_footer .footer-muted { color: #94a3b8 !important; }
      html.dark footer#div_footer a { color: inherit !important; }
      html.dark footer#div_footer img { filter: invert(1); opacity: .9; }
    `;
    document.head.appendChild(style);
  })();

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl flex flex-col w-full justify-center items-center text-center space-y-2 py-6 px-4">
        <span className="text-sm footer-muted text-slate-600 dark:text-slate-400">
          Copyright © 2023 Korean International Statistical Society. All rights reserved.
        </span>

        <span className="text-xs footer-muted text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          statkiss.org is the official domain of the Korean International Statistical Society.
          Korean International Statistical Society (KISS) is a 501(c)(3) nonprofit organization.
          EIN: 45-1725264.
        </span>

        <div className="flex flex-row">
          <a href="https://www.facebook.com/groups/190717430950968" target="_blank" rel="noreferrer">
            <img
              src="https://cdn.jsdelivr.net/gh/statground/statkiss_CDN/images/svg/footer_facebook.svg"
              className="w-4 h-4 opacity-80 hover:opacity-100 transition"
              alt="Facebook"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

const footerMountNode = document.getElementById('div_footer_react') || document.getElementById('div_footer');
if (footerMountNode) {
  ReactDOM.render(<Div_footer />, footerMountNode);
}
