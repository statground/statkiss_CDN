window.set_main = function () {
    const app = window.StatKISSAccount;

    const bodyHtml = [
        '<div class="space-y-5">',
        '  <div class="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">',
        '      <p class="text-sm leading-7 text-emerald-800 dark:text-emerald-200">' + app.t('welcome_body') + '</p>',
        '  </div>',
        '  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">',
        '      <a href="' + app.routes.login + '" class="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">' + app.t('go_login') + '</a>',
        '      <a href="' + app.routes.home + '" class="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">' + app.t('go_home') + '</a>',
        '  </div>',
        '</div>'
    ].join('');

    app.render(app.pageShell(app.t('welcome_title'), app.t('welcome_desc'), bodyHtml, ''));
};
