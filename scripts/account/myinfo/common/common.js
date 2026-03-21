(function () {
    'use strict';

    function getApp() {
        return window.StatKISSAccount;
    }

    function getBootstrap() {
        return window.STATKISS_ACCOUNT_BOOTSTRAP || {};
    }

    function currentLocalePrefix() {
        const bootstrap = getBootstrap();
        const lang = (bootstrap.lang || '').trim();
        const path = window.location.pathname || '';
        if (lang && path.indexOf('/' + lang + '/') === 0) {
            return '/' + lang;
        }
        return '';
    }

    function withLocalePrefix(path) {
        if (!path || path.charAt(0) !== '/') {
            return path;
        }
        const prefix = currentLocalePrefix();
        if (!prefix || path.indexOf(prefix + '/') === 0) {
            return path;
        }
        return prefix + path;
    }

    function route(key, fallbackPath) {
        const routes = getBootstrap().routes || {};
        if (routes[key]) {
            return routes[key];
        }
        return withLocalePrefix(fallbackPath);
    }

    function api(key, fallbackPath) {
        const endpoints = getBootstrap().api || {};
        if (endpoints[key]) {
            return endpoints[key];
        }
        return withLocalePrefix(fallbackPath);
    }

    function myinfoRoute(mode) {
        if (!mode) {
            return route('myinfoOverview', route('myinfo', '/account/myinfo/'));
        }
        if (mode === 'email') {
            return route('myinfoEmail', '/account/myinfo/email/');
        }
        if (mode === 'password') {
            return route('myinfoPassword', '/account/myinfo/password/');
        }
        if (mode === 'profile') {
            return route('myinfoProfile', '/account/myinfo/profile/');
        }
        return route('myinfoOverview', route('myinfo', '/account/myinfo/'));
    }

    function changePasswordRoute() {
        return route('changePassword', '/account/change_password/');
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function valueOrEmpty(value) {
        const app = getApp();
        const text = String(value == null ? '' : value).trim();
        if (!text) {
            return '<span class="text-slate-400 dark:text-slate-500">' + escapeHtml(app.t('myinfo_value_empty')) + '</span>';
        }
        return escapeHtml(text).replace(/\n/g, '<br>');
    }

    function linkButton(href, label, outlined) {
        const classes = outlined
            ? 'inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
            : 'inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white';
        return '<a href="' + escapeHtml(href) + '" class="' + classes + '">' + escapeHtml(label) + '</a>';
    }

    function card(title, bodyHtml) {
        return [
            '<section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
            title ? '  <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">' + escapeHtml(title) + '</h2>' : '',
            '  <div class="' + (title ? 'mt-4' : '') + ' space-y-4 text-sm text-slate-600 dark:text-slate-300">' + bodyHtml + '</div>',
            '</section>',
        ].join('');
    }

    function submenu(currentMode) {
        const app = getApp();
        const items = [
            { mode: '', label: app.t('myinfo_nav_overview'), href: myinfoRoute('') },
            { mode: 'email', label: app.t('myinfo_nav_email'), href: myinfoRoute('email') },
            { mode: 'password', label: app.t('myinfo_nav_password'), href: myinfoRoute('password') },
            { mode: 'profile', label: app.t('myinfo_nav_profile'), href: myinfoRoute('profile') },
        ];

        return [
            '<aside class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">',
            '  <nav class="flex flex-col gap-1">',
            items.map(function (item) {
                const active = currentMode === item.mode;
                const classes = active
                    ? 'block rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900';
                return '<a href="' + escapeHtml(item.href) + '" class="' + classes + '">' + escapeHtml(item.label) + '</a>';
            }).join(''),
            '  </nav>',
            '</aside>',
        ].join('');
    }

    function layout(title, desc, bodyHtml, currentMode) {
        const app = getApp();
        const content = [
            '<div class="grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">',
            submenu(currentMode),
            '  <div class="space-y-6">',
            bodyHtml,
            '  </div>',
            '</div>',
        ].join('');
        return app.pageShell(title, desc, content, '');
    }

    function summaryGrid(userinfo) {
        const app = getApp();
        const fields = [
            { label: app.t('email'), value: userinfo.email },
            { label: app.t('name'), value: userinfo.name },
            { label: app.t('affiliation'), value: userinfo.affiliation },
            { label: app.t('title'), value: userinfo.title },
            { label: app.t('gender'), value: userinfo.gender },
            { label: app.t('education'), value: userinfo.education },
            { label: app.t('interest'), value: userinfo.interest },
        ];

        return [
            '<dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">',
            fields.map(function (field) {
                return [
                    '<div class="' + (field.label === app.t('interest') ? 'sm:col-span-2 ' : '') + 'rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">',
                    '  <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">' + escapeHtml(field.label) + '</dt>',
                    '  <dd class="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">' + valueOrEmpty(field.value) + '</dd>',
                    '</div>',
                ].join('');
            }).join(''),
            '</dl>',
        ].join('');
    }

    function loadingCard() {
        const app = getApp();
        return card('', '<div class="text-sm text-slate-500 dark:text-slate-400">' + escapeHtml(app.t('loading')) + '</div>');
    }

    function renderUnauthorized(title, desc, currentMode) {
        const app = getApp();
        const body = card(
            '',
            '<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + escapeHtml(app.t('unauthorized')) + '</div>' +
            '<div>' + app.outlineButtonLink(route('login', '/account/'), app.t('go_login')) + '</div>'
        );
        app.render(layout(title, desc, body, currentMode));
    }

    function renderLoadFailed(title, desc, currentMode) {
        const app = getApp();
        const body = card(
            '',
            '<div class="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">' + escapeHtml(app.t('load_failed')) + '</div>'
        );
        app.render(layout(title, desc, body, currentMode));
    }

    async function fetchUserinfo() {
        const app = getApp();
        return app.requestJSON(api('getUserinfo', '/account/ajax_get_userinfo/'), app.createFormData({}));
    }

    window.StatKISSAccountMyinfoCommon = {
        api: api,
        card: card,
        changePasswordRoute: changePasswordRoute,
        escapeHtml: escapeHtml,
        fetchUserinfo: fetchUserinfo,
        layout: layout,
        linkButton: linkButton,
        loadingCard: loadingCard,
        myinfoRoute: myinfoRoute,
        renderLoadFailed: renderLoadFailed,
        renderUnauthorized: renderUnauthorized,
        summaryGrid: summaryGrid,
        valueOrEmpty: valueOrEmpty,
    };
})();
