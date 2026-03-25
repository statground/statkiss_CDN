let gv_traffic_dashboard_cache = null
let gv_traffic_echart = null

function traffic_resolve_lang() {
    if (typeof admin_get_current_lang === 'function') {
        return admin_get_current_lang()
    }

    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.getLang === 'function') {
        return window.StatKISS_ADMIN_I18N.getLang()
    }

    return 'en'
}

function traffic_lang_key() {
    return String(traffic_resolve_lang() || 'en').toLowerCase()
}

function traffic_is_korean() {
    return traffic_lang_key().indexOf('ko') === 0
}

function traffic_is_english() {
    return traffic_lang_key().indexOf('en') === 0
}

function traffic_is_rtl() {
    if (window.StatKISS_ADMIN_I18N && typeof window.StatKISS_ADMIN_I18N.isRTL === 'function') {
        return window.StatKISS_ADMIN_I18N.isRTL(traffic_resolve_lang())
    }
    return false
}

function traffic_t(key, params) {
    if (typeof admin_t === 'function') {
        return admin_t(key, params)
    }
    return key
}

function traffic_get_theme_mode() {
    if (typeof detect_admin_shell_theme_mode === 'function') {
        return detect_admin_shell_theme_mode()
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    }

    return 'light'
}

function useTrafficThemeMode() {
    const [themeMode, setThemeMode] = React.useState(traffic_get_theme_mode())

    React.useEffect(() => {
        const refreshThemeMode = () => {
            const nextMode = traffic_get_theme_mode()
            setThemeMode(prevMode => prevMode === nextMode ? prevMode : nextMode)
        }

        refreshThemeMode()

        const observer = new MutationObserver(refreshThemeMode)
        ;[
            document.documentElement,
            document.body,
            document.getElementById('div_main'),
            document.getElementById('div_admin_menu'),
            document.getElementById('div_content')
        ].filter(Boolean).forEach(target => {
            observer.observe(target, {
                attributes: true,
                attributeFilter: ['class', 'style', 'data-theme', 'data-color-mode', 'data-bs-theme', 'theme']
            })
        })

        const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
        if (media) {
            if (media.addEventListener) {
                media.addEventListener('change', refreshThemeMode)
            } else if (media.addListener) {
                media.addListener(refreshThemeMode)
            }
        }

        return () => {
            observer.disconnect()

            if (media) {
                if (media.removeEventListener) {
                    media.removeEventListener('change', refreshThemeMode)
                } else if (media.removeListener) {
                    media.removeListener(refreshThemeMode)
                }
            }
        }
    }, [])

    return themeMode
}

function traffic_get_palette(themeMode) {
    if (themeMode === 'dark') {
        return {
            wrapperBg: 'bg-transparent',
            cardBg: 'bg-slate-900/70',
            cardBorder: 'border-slate-700',
            cardShadow: 'shadow-[0_14px_34px_rgba(2,6,23,0.42)]',
            cardTitle: 'text-blue-400',
            textStrong: 'text-slate-50',
            textBase: 'text-slate-200',
            textMuted: 'text-slate-400',
            divider: 'border-slate-700',
            tabActive: 'bg-slate-800 text-blue-300 shadow-sm border border-slate-700',
            tabInactive: 'text-slate-300 hover:bg-slate-800/70 hover:text-blue-300 border border-transparent',
            loadingCard: 'border-slate-700 bg-slate-900/70',
            errorWrap: 'border-red-500/40 bg-red-950/40 text-red-200',
            chart: {
                title: '#f8fafc',
                legend: '#cbd5e1',
                axis: '#cbd5e1',
                axisLine: '#475569',
                splitLine: '#334155',
                tooltipBg: '#020617',
                tooltipText: '#e2e8f0',
                toolbox: '#94a3b8',
                noData: '#94a3b8',
                sliderBorder: '#334155',
                sliderBg: '#0f172a',
                sliderFill: 'rgba(96, 165, 250, 0.16)',
                sliderHandle: '#60a5fa',
                sliderDataLine: '#64748b',
                sliderDataArea: 'rgba(100, 116, 139, 0.18)'
            }
        }
    }

    return {
        wrapperBg: 'bg-transparent',
        cardBg: 'bg-white',
        cardBorder: 'border-gray-200',
        cardShadow: 'shadow-sm',
        cardTitle: 'text-blue-600',
        textStrong: 'text-slate-900',
        textBase: 'text-slate-600',
        textMuted: 'text-slate-500',
        divider: 'border-slate-200',
        tabActive: 'bg-slate-100 text-blue-600 shadow-sm border border-slate-200',
        tabInactive: 'text-slate-600 hover:bg-slate-100 hover:text-blue-600 border border-transparent',
        loadingCard: 'border-gray-200 bg-gray-50',
        errorWrap: 'border-red-200 bg-red-50 text-red-600',
        chart: {
            title: '#1f2937',
            legend: '#64748b',
            axis: '#64748b',
            axisLine: '#cbd5e1',
            splitLine: '#e5e7eb',
            tooltipBg: '#111827',
            tooltipText: '#f8fafc',
            toolbox: '#94a3b8',
            noData: '#64748b',
            sliderBorder: '#dbeafe',
            sliderBg: '#eff6ff',
            sliderFill: 'rgba(79, 107, 220, 0.12)',
            sliderHandle: '#93c5fd',
            sliderDataLine: '#94a3b8',
            sliderDataArea: 'rgba(148, 163, 184, 0.18)'
        }
    }
}

function traffic_safe_number(value) {
    const num = Number(value)
    return Number.isFinite(num) ? num : 0
}

function traffic_format_number(value) {
    return traffic_safe_number(value).toLocaleString()
}

function traffic_metric_unit(metric) {
    if (!traffic_is_korean()) {
        return ''
    }
    return metric === 'visitor' ? '명' : '건'
}

function traffic_format_metric_value(metric, value) {
    const formatted = traffic_format_number(value)
    const unit = traffic_metric_unit(metric)
    return unit ? formatted + unit : formatted
}

function traffic_metric_title(metric) {
    if (traffic_is_korean()) {
        return metric === 'visitor' ? '방문자 수' : '페이지 뷰'
    }

    return metric === 'visitor'
        ? traffic_t('traffic.visitor.title')
        : traffic_t('traffic.pageview.title')
}

function traffic_metric_label(metric, slot) {
    if (traffic_is_korean()) {
        const koMap = {
            visitor: {
                total: '총 방문자 수',
                currentYear: '올해 방문자 수',
                currentMonth: '이번 달 방문자 수',
                currentDay: '오늘 방문자 수'
            },
            pageview: {
                total: '총 페이지 뷰',
                currentYear: '올해 페이지 뷰',
                currentMonth: '이번 달 페이지 뷰',
                currentDay: '오늘 페이지 뷰'
            }
        }

        return koMap[metric] && koMap[metric][slot] ? koMap[metric][slot] : ''
    }

    if (traffic_is_english()) {
        const enMap = {
            visitor: {
                total: 'Total Visitors',
                currentYear: 'Visitors This Year',
                currentMonth: 'Visitors This Month',
                currentDay: 'Visitors Today'
            },
            pageview: {
                total: 'Total Page Views',
                currentYear: 'Page Views This Year',
                currentMonth: 'Page Views This Month',
                currentDay: 'Page Views Today'
            }
        }

        return enMap[metric] && enMap[metric][slot] ? enMap[metric][slot] : ''
    }

    const prefixMap = {
        total: traffic_t('admin.common.total'),
        currentYear: traffic_t('admin.common.current_year'),
        currentMonth: traffic_t('admin.common.current_month'),
        currentDay: traffic_t('admin.common.today')
    }

    const prefix = prefixMap[slot] || ''
    const metricTitle = traffic_metric_title(metric)
    return [prefix, metricTitle].filter(Boolean).join(' ')
}

function traffic_compare_label(slot) {
    const keyMap = {
        previousYear: 'traffic.compare.last_year',
        previousMonth: 'traffic.compare.last_month',
        previousDay: 'traffic.compare.yesterday'
    }
    return traffic_t(keyMap[slot] || '')
}

function traffic_tab_label(period) {
    const keyMap = {
        daily: 'traffic.tab.daily',
        monthly: 'traffic.tab.monthly',
        yearly: 'traffic.tab.yearly'
    }
    const label = traffic_t(keyMap[period] || '')
    if (label && label !== keyMap[period]) {
        return label
    }

    const fallbackMap = {
        daily: traffic_t('admin.common.daily'),
        monthly: traffic_t('admin.common.monthly'),
        yearly: traffic_t('admin.common.yearly')
    }
    return fallbackMap[period] || period
}

function traffic_chart_title() {
    const value = traffic_t('traffic.chart_title')
    if (value && value !== 'traffic.chart_title') {
        return value
    }
    return traffic_t('traffic.title')
}

function traffic_chart_label(metric) {
    return traffic_metric_title(metric)
}

function traffic_normalize_label(rawValue, period) {
    const value = String(rawValue || '')

    if (period === 'yearly') {
        return value.slice(0, 4)
    }

    if (period === 'monthly') {
        return value.slice(0, 7)
    }

    return value.length >= 10 ? value.slice(0, 10) : value
}

function traffic_parse_series(table, period) {
    if (!Array.isArray(table) || table.length <= 1) {
        return []
    }

    return table.slice(1).map(row => ({
        label: traffic_normalize_label(row[0], period),
        count: traffic_safe_number(row[1])
    }))
}

function traffic_compare_labels(left, right) {
    return String(left || '').localeCompare(String(right || ''))
}

function traffic_max_label(left, right) {
    if (!left) return right
    if (!right) return left
    return traffic_compare_labels(left, right) >= 0 ? left : right
}

function traffic_get_today_parts() {
    try {
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        const parts = {}
        formatter.formatToParts(new Date()).forEach(part => {
            if (part.type !== 'literal') {
                parts[part.type] = part.value
            }
        })

        return {
            year: String(parts.year || ''),
            month: String(parts.month || '').padStart(2, '0'),
            day: String(parts.day || '').padStart(2, '0')
        }
    } catch (error) {
        const now = new Date()
        return {
            year: String(now.getFullYear()),
            month: String(now.getMonth() + 1).padStart(2, '0'),
            day: String(now.getDate()).padStart(2, '0')
        }
    }
}

function traffic_current_period_label(period) {
    const today = traffic_get_today_parts()

    if (period === 'yearly') {
        return today.year
    }

    if (period === 'monthly') {
        return today.year + '-' + today.month
    }

    return today.year + '-' + today.month + '-' + today.day
}

function traffic_increment_label(label, period) {
    const value = String(label || '')

    if (period === 'yearly') {
        const year = Number(value)
        if (!Number.isFinite(year)) {
            return null
        }
        return String(year + 1)
    }

    if (period === 'monthly') {
        const parts = value.split('-')
        if (parts.length < 2) {
            return null
        }

        let year = Number(parts[0])
        let month = Number(parts[1])
        if (!Number.isFinite(year) || !Number.isFinite(month)) {
            return null
        }

        month += 1
        if (month > 12) {
            year += 1
            month = 1
        }

        return String(year).padStart(4, '0') + '-' + String(month).padStart(2, '0')
    }

    const parts = value.split('-')
    if (parts.length < 3) {
        return null
    }

    const year = Number(parts[0])
    const month = Number(parts[1])
    const day = Number(parts[2])
    if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
        return null
    }

    const next = new Date(Date.UTC(year, month - 1, day) + 86400000)
    return [
        String(next.getUTCFullYear()).padStart(4, '0'),
        String(next.getUTCMonth() + 1).padStart(2, '0'),
        String(next.getUTCDate()).padStart(2, '0')
    ].join('-')
}

function traffic_generate_period_labels(startLabel, endLabel, period) {
    if (!startLabel || !endLabel || traffic_compare_labels(startLabel, endLabel) > 0) {
        return []
    }

    const labels = []
    let current = startLabel
    let guard = 0

    while (current && traffic_compare_labels(current, endLabel) <= 0 && guard < 20000) {
        labels.push(current)
        const next = traffic_increment_label(current, period)
        if (!next || next === current) {
            break
        }
        current = next
        guard += 1
    }

    return labels
}

function traffic_build_dense_series(rows, period, endLabelOverride) {
    if (!Array.isArray(rows) || rows.length === 0) {
        return []
    }

    const countMap = {}
    const labels = []

    rows.forEach(row => {
        const label = String(row.label || '')
        if (!label) {
            return
        }
        if (!(label in countMap)) {
            labels.push(label)
        }
        countMap[label] = traffic_safe_number(row.count)
    })

    labels.sort(traffic_compare_labels)

    const startLabel = labels[0]
    const lastDataLabel = labels[labels.length - 1]
    const targetEndLabel = traffic_max_label(lastDataLabel, endLabelOverride || traffic_current_period_label(period))
    const denseLabels = traffic_generate_period_labels(startLabel, targetEndLabel, period)

    return denseLabels.map(label => ({
        label: label,
        count: Object.prototype.hasOwnProperty.call(countMap, label) ? countMap[label] : 0
    }))
}

function traffic_get_dense_series_from_table(table, period) {
    return traffic_build_dense_series(traffic_parse_series(table, period), period)
}

function traffic_previous_count(table, period) {
    const rows = traffic_get_dense_series_from_table(table, period)
    if (rows.length <= 1) {
        return null
    }
    return rows[rows.length - 2].count
}

function traffic_current_count(table, period, fallbackValue) {
    const rows = traffic_get_dense_series_from_table(table, period)
    if (rows.length === 0) {
        return traffic_safe_number(fallbackValue)
    }
    return rows[rows.length - 1].count
}

function traffic_summary(payload, metric) {
    const block = payload && payload[metric] ? payload[metric] : {}
    const counter = block.counter || {}
    const table = block.table || {}

    return {
        metric: metric,
        total: traffic_safe_number(counter.cnt_total),
        currentYear: traffic_current_count(table.yearly, 'yearly', counter.cnt_yearly),
        previousYear: traffic_previous_count(table.yearly, 'yearly'),
        currentMonth: traffic_current_count(table.monthly, 'monthly', counter.cnt_monthly),
        previousMonth: traffic_previous_count(table.monthly, 'monthly'),
        currentDay: traffic_current_count(table.daily, 'daily', counter.cnt_daily),
        previousDay: traffic_previous_count(table.daily, 'daily')
    }
}

function traffic_parse_json_response(text) {
    if (text == null || text === '') {
        return {}
    }
    return JSON.parse(text)
}

function traffic_fetch_json(url) {
    return fetch(url).then(async res => {
        const text = await res.text()
        let data = {}

        try {
            data = traffic_parse_json_response(text)
        } catch (error) {
            if (!res.ok) {
                throw new Error('HTTP ' + res.status)
            }
            throw new Error('Invalid JSON response')
        }

        if (!res.ok) {
            throw new Error((data && data.error) ? data.error : ('HTTP ' + res.status))
        }

        return data
    })
}

async function get_traffic_dashboard() {
    if (gv_traffic_dashboard_cache != null) {
        return gv_traffic_dashboard_cache
    }

    const urls = {
        visitorCounter: admin_build_url('/admin/ajax_get_visitor_counter/'),
        visitorTable: admin_build_url('/admin/ajax_get_visitor_table/'),
        pageviewCounter: admin_build_url('/admin/ajax_get_pageview_counter/'),
        pageviewTable: admin_build_url('/admin/ajax_get_pageview_table/')
    }

    const [visitorCounter, visitorTable, pageviewCounter, pageviewTable] = await Promise.all([
        traffic_fetch_json(urls.visitorCounter),
        traffic_fetch_json(urls.visitorTable),
        traffic_fetch_json(urls.pageviewCounter),
        traffic_fetch_json(urls.pageviewTable)
    ])

    gv_traffic_dashboard_cache = {
        visitor: {
            counter: visitorCounter,
            table: visitorTable
        },
        pageview: {
            counter: pageviewCounter,
            table: pageviewTable
        }
    }

    return gv_traffic_dashboard_cache
}

function traffic_merge_series(visitorTable, pageviewTable, period) {
    const visitorRows = traffic_parse_series(visitorTable, period)
    const pageviewRows = traffic_parse_series(pageviewTable, period)
    const visitorMap = {}
    const pageviewMap = {}
    const allLabels = []

    visitorRows.forEach(row => {
        visitorMap[row.label] = row.count
        allLabels.push(row.label)
    })

    pageviewRows.forEach(row => {
        pageviewMap[row.label] = row.count
        allLabels.push(row.label)
    })

    const uniqueLabels = Array.from(new Set(allLabels)).sort(traffic_compare_labels)
    if (uniqueLabels.length === 0) {
        return {
            labels: [],
            visitors: [],
            pageviews: []
        }
    }

    const startLabel = uniqueLabels[0]
    const endLabel = traffic_max_label(uniqueLabels[uniqueLabels.length - 1], traffic_current_period_label(period))
    const denseLabels = traffic_generate_period_labels(startLabel, endLabel, period)

    return {
        labels: denseLabels,
        visitors: denseLabels.map(label => Object.prototype.hasOwnProperty.call(visitorMap, label) ? visitorMap[label] : 0),
        pageviews: denseLabels.map(label => Object.prototype.hasOwnProperty.call(pageviewMap, label) ? pageviewMap[label] : 0)
    }
}

function traffic_build_chart_option(payload, period, themeMode) {
    const palette = traffic_get_palette(themeMode)
    const series = traffic_merge_series(
        payload.visitor && payload.visitor.table ? payload.visitor.table[period] : null,
        payload.pageview && payload.pageview.table ? payload.pageview.table[period] : null,
        period
    )

    const noDataGraphic = series.labels.length === 0
        ? [{
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
                text: traffic_t('traffic.no_data'),
                fill: palette.chart.noData,
                fontSize: 16,
                fontWeight: 600
            }
        }]
        : []

    return {
        backgroundColor: 'transparent',
        color: ['#4f6bdc', '#b4d334'],
        animationDuration: 300,
        title: {
            text: traffic_chart_title(),
            left: 'center',
            top: 18,
            textStyle: {
                color: palette.chart.title,
                fontSize: 18,
                fontWeight: 700
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: palette.chart.tooltipBg,
            borderWidth: 0,
            textStyle: {
                color: palette.chart.tooltipText
            },
            formatter: function(params) {
                const title = params && params.length ? params[0].axisValue : ''
                const rows = [title]

                params.forEach(param => {
                    const metric = param.seriesName === traffic_chart_label('visitor') ? 'visitor' : 'pageview'
                    rows.push(param.marker + ' ' + param.seriesName + ': ' + traffic_format_metric_value(metric, param.value))
                })

                return rows.join('<br/>')
            }
        },
        legend: {
            top: 52,
            left: 'center',
            itemWidth: 18,
            itemHeight: 10,
            textStyle: {
                color: palette.chart.legend
            },
            data: [traffic_chart_label('visitor'), traffic_chart_label('pageview')]
        },
        toolbox: {
            top: 14,
            right: 12,
            itemSize: 16,
            iconStyle: {
                borderColor: palette.chart.toolbox
            },
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: {
                        zoom: traffic_t('traffic.toolbox.zoom'),
                        back: traffic_t('traffic.toolbox.zoom_reset')
                    }
                },
                restore: {
                    title: traffic_t('traffic.toolbox.restore')
                },
                saveAsImage: {
                    title: traffic_t('traffic.toolbox.download'),
                    name: 'statkiss_traffic_' + period
                }
            }
        },
        grid: {
            left: 70,
            right: 72,
            top: 110,
            bottom: 88
        },
        xAxis: {
            type: 'category',
            data: series.labels,
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: palette.chart.axisLine
                }
            },
            axisLabel: {
                color: palette.chart.axis,
                hideOverlap: true
            }
        },
        yAxis: [
            {
                type: 'value',
                min: 0,
                name: traffic_chart_label('visitor'),
                nameLocation: 'end',
                nameGap: 16,
                nameTextStyle: {
                    color: palette.chart.axis
                },
                axisLabel: {
                    color: palette.chart.axis,
                    formatter: function(value) {
                        return traffic_format_number(value)
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: palette.chart.splitLine
                    }
                }
            },
            {
                type: 'value',
                min: 0,
                name: traffic_chart_label('pageview'),
                nameLocation: 'end',
                nameGap: 16,
                nameTextStyle: {
                    color: palette.chart.axis
                },
                axisLabel: {
                    color: palette.chart.axis,
                    formatter: function(value) {
                        return traffic_format_number(value)
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'slider',
                xAxisIndex: 0,
                bottom: 18,
                height: 24,
                borderColor: palette.chart.sliderBorder,
                backgroundColor: palette.chart.sliderBg,
                fillerColor: palette.chart.sliderFill,
                handleStyle: {
                    color: palette.chart.sliderHandle
                },
                moveHandleStyle: {
                    color: palette.chart.sliderHandle
                },
                dataBackground: {
                    lineStyle: {
                        color: palette.chart.sliderDataLine
                    },
                    areaStyle: {
                        color: palette.chart.sliderDataArea
                    }
                }
            }
        ],
        series: [
            {
                name: traffic_chart_label('visitor'),
                type: 'bar',
                yAxisIndex: 0,
                data: series.visitors,
                barMaxWidth: 28,
                itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                },
                emphasis: {
                    focus: 'series'
                }
            },
            {
                name: traffic_chart_label('pageview'),
                type: 'bar',
                yAxisIndex: 1,
                data: series.pageviews,
                barMaxWidth: 28,
                itemStyle: {
                    borderRadius: [4, 4, 0, 0]
                },
                emphasis: {
                    focus: 'series'
                }
            }
        ],
        graphic: noDataGraphic
    }
}

function render_traffic_chart(payload, period, themeMode) {
    const target = document.getElementById('traffic_chart')
    if (!target || typeof echarts === 'undefined') {
        return
    }

    let chart = echarts.getInstanceByDom(target)
    if (!chart) {
        chart = echarts.init(target)
    }

    chart.setOption(traffic_build_chart_option(payload, period, themeMode), true)
    chart.resize()
    gv_traffic_echart = chart
}

function dispose_traffic_chart() {
    if (gv_traffic_echart != null) {
        gv_traffic_echart.dispose()
        gv_traffic_echart = null
    }
}

function Div_traffic_summary_item(props) {
    const palette = traffic_get_palette(props.themeMode)

    return (
        <div class="flex flex-col justify-start items-center text-center px-3 py-2 min-h-[120px]">
            <p class={'text-3xl md:text-4xl font-extrabold tracking-tight ' + palette.textStrong}>{traffic_format_metric_value(props.metric, props.value)}</p>
            <p class={'mt-1 text-base ' + palette.textBase}>{props.label}</p>
            {
                props.compareLabel != null && props.compareValue != null
                    ? <p class={'mt-1 text-base ' + palette.textMuted}>({props.compareLabel}: {traffic_format_metric_value(props.metric, props.compareValue)})</p>
                    : null
            }
        </div>
    )
}

function Div_traffic_summary_card(props) {
    const palette = traffic_get_palette(props.themeMode)
    const summary = props.summary
    const title = traffic_metric_title(summary.metric)

    return (
        <div class={'w-full rounded-xl border px-6 py-8 ' + palette.cardBg + ' ' + palette.cardBorder + ' ' + palette.cardShadow}>
            <h2 class={'text-center text-3xl sm:text-4xl font-extrabold mb-8 ' + palette.cardTitle}>{title}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Div_traffic_summary_item
                    themeMode={props.themeMode}
                    metric={summary.metric}
                    value={summary.total}
                    label={traffic_metric_label(summary.metric, 'total')}
                />
                <Div_traffic_summary_item
                    themeMode={props.themeMode}
                    metric={summary.metric}
                    value={summary.currentYear}
                    label={traffic_metric_label(summary.metric, 'currentYear')}
                    compareLabel={traffic_compare_label('previousYear')}
                    compareValue={summary.previousYear}
                />
                <Div_traffic_summary_item
                    themeMode={props.themeMode}
                    metric={summary.metric}
                    value={summary.currentMonth}
                    label={traffic_metric_label(summary.metric, 'currentMonth')}
                    compareLabel={traffic_compare_label('previousMonth')}
                    compareValue={summary.previousMonth}
                />
                <Div_traffic_summary_item
                    themeMode={props.themeMode}
                    metric={summary.metric}
                    value={summary.currentDay}
                    label={traffic_metric_label(summary.metric, 'currentDay')}
                    compareLabel={traffic_compare_label('previousDay')}
                    compareValue={summary.previousDay}
                />
            </div>
        </div>
    )
}

function Div_traffic_tab_button(props) {
    const palette = traffic_get_palette(props.themeMode)
    const isActive = props.active === props.period
    const buttonClass = isActive
        ? 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ' + palette.tabActive
        : 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition ' + palette.tabInactive

    return (
        <button type="button" class={buttonClass} onClick={() => props.onChange(props.period)}>
            {traffic_tab_label(props.period)}
        </button>
    )
}

function Div_traffic_loading(props) {
    const palette = traffic_get_palette(props.themeMode)

    return (
        <div class="flex flex-col w-full space-y-6 animate-pulse">
            <div class={'w-full rounded-xl border h-48 ' + palette.loadingCard}></div>
            <div class={'w-full rounded-xl border h-48 ' + palette.loadingCard}></div>
            <div class={'w-full rounded-xl border p-6 ' + palette.loadingCard}>
                <div class={'w-48 h-10 rounded-lg mb-6 ' + (props.themeMode === 'dark' ? 'bg-slate-800' : 'bg-gray-200')}></div>
                <div class={'w-full h-[420px] rounded-lg ' + (props.themeMode === 'dark' ? 'bg-slate-800' : 'bg-gray-200')}></div>
            </div>
            <p class={'text-center text-sm ' + palette.textMuted}>{traffic_t('traffic.loading')}</p>
        </div>
    )
}

function Div_traffic_error(props) {
    const palette = traffic_get_palette(props.themeMode)

    return (
        <div class={'w-full rounded-xl border px-6 py-10 text-center font-semibold ' + palette.errorWrap}>
            <p>{traffic_t('traffic.load_error')}</p>
            {
                props.message
                    ? <p class="mt-2 text-sm font-normal opacity-80">{props.message}</p>
                    : null
            }
        </div>
    )
}

function Div_content() {
    const [dashboard, setDashboard] = React.useState(null)
    const [period, setPeriod] = React.useState('monthly')
    const [errorMessage, setErrorMessage] = React.useState('')
    const themeMode = useTrafficThemeMode()
    const palette = traffic_get_palette(themeMode)

    React.useEffect(() => {
        let isMounted = true

        get_traffic_dashboard()
            .then(data => {
                if (!isMounted) {
                    return
                }
                setDashboard(data)
                setErrorMessage('')
            })
            .catch(error => {
                if (!isMounted) {
                    return
                }
                setErrorMessage(error && error.message ? error.message : '')
            })

        return () => {
            isMounted = false
            dispose_traffic_chart()
        }
    }, [])

    React.useEffect(() => {
        const handleResize = () => {
            if (gv_traffic_echart != null) {
                gv_traffic_echart.resize()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    React.useEffect(() => {
        if (dashboard == null) {
            return
        }

        const timer = window.setTimeout(() => render_traffic_chart(dashboard, period, themeMode), 0)
        return () => window.clearTimeout(timer)
    }, [dashboard, period, themeMode])

    if (errorMessage !== '') {
        return <Div_traffic_error themeMode={themeMode} message={errorMessage} />
    }

    if (dashboard == null) {
        return <Div_traffic_loading themeMode={themeMode} />
    }

    const visitorSummary = traffic_summary(dashboard, 'visitor')
    const pageviewSummary = traffic_summary(dashboard, 'pageview')

    return (
        <div class={'flex flex-col w-full space-y-6 ' + palette.wrapperBg} dir={traffic_is_rtl() ? 'rtl' : 'ltr'}>
            <Div_traffic_summary_card themeMode={themeMode} summary={visitorSummary} />
            <Div_traffic_summary_card themeMode={themeMode} summary={pageviewSummary} />
            <div class={'w-full rounded-xl border px-6 py-6 ' + palette.cardBg + ' ' + palette.cardBorder + ' ' + palette.cardShadow}>
                <div class={'flex items-center gap-2 pb-4 mb-6 overflow-x-auto border-b ' + palette.divider}>
                    <Div_traffic_tab_button themeMode={themeMode} active={period} period="daily" onChange={setPeriod} />
                    <Div_traffic_tab_button themeMode={themeMode} active={period} period="monthly" onChange={setPeriod} />
                    <Div_traffic_tab_button themeMode={themeMode} active={period} period="yearly" onChange={setPeriod} />
                </div>
                <div id="traffic_chart" class="w-full" style={{ height: '420px' }}></div>
            </div>
        </div>
    )
}

function set_content() {
    gv_traffic_dashboard_cache = null
    dispose_traffic_chart()
    ReactDOM.render(<Div_content />, document.getElementById('div_content'))
}

function set_main() {
    render_admin_shell('traffic', set_content)
}
