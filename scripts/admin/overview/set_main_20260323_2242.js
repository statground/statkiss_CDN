function set_content() {
    function Div_overview_card(props) {
        return (
            <div class="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-500/50 dark:hover:bg-slate-800/95">
                <div class="space-y-3">
                    <h2 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                        {props.title}
                    </h2>
                    <p class="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {props.description}
                    </p>
                </div>

                <div class="pt-6">
                    <button
                        type="button"
                        onClick={() => location.href = props.href}
                        class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 dark:focus:ring-sky-500/30"
                    >
                        {admin_t('admin.common.open')}
                    </button>
                </div>
            </div>
        );
    }

    function Div_content() {
        return (
            <div class="w-full text-slate-900 dark:text-slate-100">
                <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                        <div class="space-y-3">
                            <h1 class="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
                                {admin_t('overview.title')}
                            </h1>
                            <p class="max-w-3xl text-sm leading-6 text-slate-600 md:text-base dark:text-slate-300">
                                {admin_t('overview.description')}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
                        <Div_overview_card
                            href={admin_section_href('active-users')}
                            title={admin_t('admin.menu.active_users')}
                            description={admin_t('overview.card.active_users.description')}
                        />
                        <Div_overview_card
                            href={admin_section_href('traffic')}
                            title={admin_t('admin.menu.traffic')}
                            description={admin_t('overview.card.traffic.description')}
                        />
                        <Div_overview_card
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
