function normalize_admin_nav_text(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function get_admin_shell_nav_labels() {
    const labels = [
        'overview',
        'active users',
        'traffic analytics',
        'members'
    ];

    try {
        labels.push(admin_t('admin.menu.overview'));
        labels.push(admin_t('admin.menu.active_users'));
        labels.push(admin_t('admin.menu.traffic'));
        labels.push(admin_t('admin.menu.members'));
    } catch (error) {
    }

    return Array.from(new Set(labels.map(normalize_admin_nav_text).filter(Boolean)));
}

function get_content_top() {
    const contentRoot = document.getElementById('div_content');
    if (!contentRoot) {
        return null;
    }

    return contentRoot.getBoundingClientRect().top;
}

function is_shell_nav_area(node) {
    const contentRoot = document.getElementById('div_content');
    if (!node || !contentRoot) {
        return false;
    }

    if (contentRoot.contains(node)) {
        return false;
    }

    const rect = node.getBoundingClientRect();
    const contentTop = get_content_top();
    if (contentTop === null) {
        return false;
    }

    return rect.width > 0 && rect.height > 0 && rect.bottom <= contentTop + 64;
}

function hide_element_permanently(node) {
    if (!node) {
        return;
    }

    node.style.setProperty('display', 'none', 'important');
    node.setAttribute('data-statkiss-hidden-admin-overview-nav', '1');
}

function hide_admin_shell_navigation() {
    const contentRoot = document.getElementById('div_content');
    if (!contentRoot) {
        return false;
    }

    const labels = get_admin_shell_nav_labels();
    const hrefMatchers = [
        /\/admin\/overview\/?$/i,
        /\/admin\/active-users\/?$/i,
        /\/admin\/traffic\/?$/i,
        /\/admin\/members\/?$/i
    ];

    const interactiveNodes = Array.from(document.querySelectorAll('a, button, [role="button"], li, span, div'));
    const matchedNodes = interactiveNodes.filter(node => {
        if (!is_shell_nav_area(node)) {
            return false;
        }

        const text = normalize_admin_nav_text(node.textContent);
        const href = normalize_admin_nav_text(node.getAttribute ? node.getAttribute('href') : '');

        if (labels.includes(text)) {
            return true;
        }

        return hrefMatchers.some(pattern => pattern.test(href));
    });

    if (!matchedNodes.length) {
        return false;
    }

    const uniqueNodes = Array.from(new Set(matchedNodes));
    let commonAncestor = uniqueNodes[0];
    const contentTop = get_content_top();

    while (commonAncestor && commonAncestor !== document.body) {
        const rect = commonAncestor.getBoundingClientRect();
        const containsAll = uniqueNodes.every(node => commonAncestor.contains(node));
        const isCompactRow = rect.height <= 180;
        const staysAboveContent = contentTop !== null && rect.bottom <= contentTop + 64;

        if (containsAll && isCompactRow && staysAboveContent) {
            hide_element_permanently(commonAncestor);
            return true;
        }

        commonAncestor = commonAncestor.parentElement;
    }

    uniqueNodes.forEach(node => {
        const target = node.closest('a, button, [role="button"], li, div') || node;
        if (is_shell_nav_area(target)) {
            hide_element_permanently(target);
        }
    });

    return true;
}

function mount_admin_overview_cleanup() {
    const runCleanup = () => hide_admin_shell_navigation();

    runCleanup();

    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCleanup);
    }

    window.setTimeout(runCleanup, 60);
    window.setTimeout(runCleanup, 180);
    window.setTimeout(runCleanup, 420);

    if (window.__statkiss_admin_overview_nav_observer) {
        window.__statkiss_admin_overview_nav_observer.disconnect();
    }

    const observer = new MutationObserver(runCleanup);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'href']
    });

    window.__statkiss_admin_overview_nav_observer = observer;
}

function parse_background_rgb(value) {
    if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') {
        return null;
    }

    const match = value.match(/rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!match) {
        return null;
    }

    return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function get_color_mode_from_background(value) {
    const rgb = parse_background_rgb(value);
    if (!rgb) {
        return null;
    }

    const brightness = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
    return brightness < 148 ? 'dark' : 'light';
}

function detect_mode_from_ancestors(node) {
    let current = node;

    while (current) {
        const mode = get_color_mode_from_background(window.getComputedStyle(current).backgroundColor);
        if (mode) {
            return mode;
        }
        current = current.parentElement;
    }

    return null;
}

function get_admin_theme_mode() {
    try {
        if (window.StatKISSTheme && typeof window.StatKISSTheme.get === 'function') {
            return window.StatKISSTheme.get() === 'dark' ? 'dark' : 'light';
        }
    } catch (_) {}

    const themeTargets = [
        document.documentElement,
        document.body,
        document.getElementById('div_content')
    ].filter(Boolean);

    for (const target of themeTargets) {
        const attrs = [
            target.getAttribute('data-theme'),
            target.getAttribute('data-color-mode'),
            target.getAttribute('data-bs-theme'),
            target.getAttribute('data-mode'),
            target.getAttribute('data-statkiss-theme'),
            target.getAttribute('theme')
        ].filter(Boolean).map(value => String(value).toLowerCase());

        if (attrs.includes('dark')) {
            return 'dark';
        }

        if (attrs.includes('light')) {
            return 'light';
        }

        const className = String(target.className || '');
        if (/\bdark\b|\btheme-dark\b|\bdark-mode\b/i.test(className)) {
            return 'dark';
        }
    }

    const contentRoot = document.getElementById('div_content');
    const backgroundMode = detect_mode_from_ancestors(contentRoot || document.body);
    if (backgroundMode) {
        return backgroundMode;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
}

function get_overview_palette(themeMode) {
    if (themeMode === 'dark') {
        return {
            shellText: '#e5edf7',
            heroBg: '#0f172a',
            heroBorder: '#243244',
            heroShadow: '0 18px 40px rgba(2, 6, 23, 0.42)',
            heroTitle: '#f8fafc',
            heroDescription: '#cbd5e1',
            cardBg: '#111827',
            cardBorder: '#243244',
            cardShadow: '0 16px 34px rgba(2, 6, 23, 0.34)',
            cardTitle: '#f8fafc',
            cardDescription: '#d1d5db',
            buttonBg: '#38bdf8',
            buttonText: '#082f49',
            buttonShadow: '0 10px 22px rgba(56, 189, 248, 0.24)',
            buttonFocusRing: 'focus:ring-sky-400/30'
        };
    }

    return {
        shellText: '#0f172a',
        heroBg: '#ffffff',
        heroBorder: '#dbe4ee',
        heroShadow: '0 12px 28px rgba(15, 23, 42, 0.07)',
        heroTitle: '#0f172a',
        heroDescription: '#475569',
        cardBg: '#f8fafc',
        cardBorder: '#dbe4ee',
        cardShadow: '0 12px 28px rgba(15, 23, 42, 0.07)',
        cardTitle: '#0f172a',
        cardDescription: '#475569',
        buttonBg: '#1d4ed8',
        buttonText: '#ffffff',
        buttonShadow: '0 10px 20px rgba(29, 78, 216, 0.18)',
        buttonFocusRing: 'focus:ring-blue-200'
    };
}

function set_content() {
    function Div_overview_card(props) {
        return (
            <div
                class="group flex h-full flex-col justify-between rounded-2xl border p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                    backgroundColor: props.palette.cardBg,
                    borderColor: props.palette.cardBorder,
                    boxShadow: props.palette.cardShadow
                }}
            >
                <div class="space-y-3 text-center">
                    <h2 class="text-2xl font-semibold tracking-tight" style={{ color: props.palette.cardTitle }}>
                        {props.title}
                    </h2>
                    <p class="text-base leading-8" style={{ color: props.palette.cardDescription }}>
                        {props.description}
                    </p>
                </div>

                <div class="pt-6 text-center">
                    <button
                        type="button"
                        onClick={() => location.href = props.href}
                        class={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition duration-200 hover:opacity-95 focus:outline-none focus:ring-4 ${props.palette.buttonFocusRing}`}
                        style={{
                            backgroundColor: props.palette.buttonBg,
                            color: props.palette.buttonText,
                            boxShadow: props.palette.buttonShadow
                        }}
                    >
                        {admin_t('admin.common.open')}
                    </button>
                </div>
            </div>
        );
    }

    function Div_content() {
        const [themeMode, setThemeMode] = React.useState(get_admin_theme_mode());
        const palette = get_overview_palette(themeMode);

        React.useEffect(() => {
            const refreshThemeMode = () => setThemeMode(get_admin_theme_mode());
            refreshThemeMode();

            const observer = new MutationObserver(refreshThemeMode);
            const observed = new Set();

            let current = document.getElementById('div_content');
            while (current) {
                if (!observed.has(current)) {
                    observed.add(current);
                    observer.observe(current, {
                        attributes: true,
                        attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'data-mode', 'data-statkiss-theme', 'theme']
                    });
                }
                current = current.parentElement;
            }

            [document.documentElement, document.body].filter(Boolean).forEach(target => {
                if (!observed.has(target)) {
                    observed.add(target);
                    observer.observe(target, {
                        attributes: true,
                        attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'data-mode', 'data-statkiss-theme', 'theme']
                    });
                }
            });

            const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
            if (media) {
                if (media.addEventListener) {
                    media.addEventListener('change', refreshThemeMode);
                } else if (media.addListener) {
                    media.addListener(refreshThemeMode);
                }
            }

            return () => {
                observer.disconnect();

                if (media) {
                    if (media.removeEventListener) {
                        media.removeEventListener('change', refreshThemeMode);
                    } else if (media.removeListener) {
                        media.removeListener(refreshThemeMode);
                    }
                }
            };
        }, []);

        return (
            <div class="w-full" style={{ color: palette.shellText }}>
                <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
                    <div
                        class="rounded-2xl border px-6 py-8"
                        style={{
                            backgroundColor: palette.heroBg,
                            borderColor: palette.heroBorder,
                            boxShadow: palette.heroShadow
                        }}
                    >
                        <div class="space-y-3 text-center">
                            <h1 class="text-3xl font-bold tracking-tight md:text-4xl" style={{ color: palette.heroTitle }}>
                                {admin_t('overview.title')}
                            </h1>
                            <p
                                class="mx-auto max-w-3xl text-sm leading-7 md:text-base"
                                style={{
                                    color: palette.heroDescription,
                                    textAlign: 'center'
                                }}
                            >
                                {admin_t('overview.description')}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <Div_overview_card
                            palette={palette}
                            href={admin_section_href('active-users')}
                            title={admin_t('admin.menu.active_users')}
                            description={admin_t('overview.card.active_users.description')}
                        />
                        <Div_overview_card
                            palette={palette}
                            href={admin_section_href('traffic')}
                            title={admin_t('admin.menu.traffic')}
                            description={admin_t('overview.card.traffic.description')}
                        />
                        <Div_overview_card
                            palette={palette}
                            href={admin_section_href('members')}
                            title={admin_t('admin.menu.members')}
                            description={admin_t('overview.card.members.description')}
                        />
                    </div>
                </div>
            </div>
        );
    }

    ReactDOM.render(<Div_content />, document.getElementById('div_content'));
}

window.set_main = function set_main() {
    render_admin_shell('overview', set_content);
};
