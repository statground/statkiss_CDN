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
            shellText: '#e2e8f0',
            heroBg: '#0f172a',
            heroBorder: '#334155',
            heroShadow: '0 18px 40px rgba(2, 6, 23, 0.35)',
            heroTitle: '#f8fafc',
            heroDescription: '#cbd5e1',
            cardBg: '#1e293b',
            cardBorder: '#334155',
            cardShadow: '0 16px 34px rgba(2, 6, 23, 0.28)',
            cardTitle: '#f8fafc',
            cardDescription: '#cbd5e1',
            buttonBg: '#38bdf8',
            buttonText: '#082f49',
            buttonShadow: '0 8px 20px rgba(56, 189, 248, 0.25)',
            buttonFocusRing: 'focus:ring-sky-400/30'
        };
    }

    return {
        shellText: '#0f172a',
        heroBg: '#f8fafc',
        heroBorder: '#dbe4ee',
        heroShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
        heroTitle: '#0f172a',
        heroDescription: '#475569',
        cardBg: '#ffffff',
        cardBorder: '#dbe4ee',
        cardShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
        cardTitle: '#0f172a',
        cardDescription: '#475569',
        buttonBg: '#2563eb',
        buttonText: '#ffffff',
        buttonShadow: '0 8px 18px rgba(37, 99, 235, 0.2)',
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
                        attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'theme']
                    });
                }
                current = current.parentElement;
            }

            [document.documentElement, document.body].filter(Boolean).forEach(target => {
                if (!observed.has(target)) {
                    observed.add(target);
                    observer.observe(target, {
                        attributes: true,
                        attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'theme']
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
