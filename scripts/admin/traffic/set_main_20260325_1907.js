let gv_traffic_dashboard_cache = null
let gv_traffic_echart = null

function traffic_get_lang() {
    const lang = (typeof admin_get_current_lang === 'function') ? admin_get_current_lang() : 'ko'
    return String(lang || 'ko').toLowerCase()
}

function traffic_is_korean() {
    return traffic_get_lang().indexOf('ko') === 0
}

function traffic_t(key) {
    const ko = {
        section_visitor: '방문자 수',
        section_pageview: '페이지 뷰',
        total_visitor: '총 방문자 수',
        year_visitor: '올해 방문자 수',
        month_visitor: '이번 달 방문자 수',
        day_visitor: '오늘 방문자 수',
        total_pageview: '총 페이지 뷰',
        year_pageview: '올해 페이지 뷰',
        month_pageview: '이번 달 페이지 뷰',
        day_pageview: '오늘 페이지 뷰',
        last_year: '작년',
        last_month: '지난 달',
        yesterday: '어제',
        chart_title: '방문 추이 그래프',
        chart_visitor: '방문자 수',
        chart_pageview: '페이지 뷰',
        axis_visitor: '방문자 수',
        axis_pageview: '페이지 뷰',
        tab_daily: '일',
        tab_monthly: '월',
        tab_yearly: '년',
        no_data: '표시할 데이터가 없습니다.',
        loading: '트래픽 데이터를 불러오는 중입니다.',
        load_error: '트래픽 데이터를 불러오지 못했습니다.',
        zoom: '확대',
        zoom_reset: '확대 초기화',
        restore: '초기화',
        download: '이미지 저장'
    }

    const en = {
        section_visitor: 'Visitors',
        section_pageview: 'Page Views',
        total_visitor: 'Total Visitors',
        year_visitor: 'Visitors This Year',
        month_visitor: 'Visitors This Month',
        day_visitor: 'Visitors Today',
        total_pageview: 'Total Page Views',
        year_pageview: 'Page Views This Year',
        month_pageview: 'Page Views This Month',
        day_pageview: 'Page Views Today',
        last_year: 'Last year',
        last_month: 'Last month',
        yesterday: 'Yesterday',
        chart_title: 'Traffic Trend',
        chart_visitor: 'Visitors',
        chart_pageview: 'Page Views',
        axis_visitor: 'Visitors',
        axis_pageview: 'Page Views',
        tab_daily: 'Day',
        tab_monthly: 'Month',
        tab_yearly: 'Year',
        no_data: 'No data available.',
        loading: 'Loading traffic analytics...',
        load_error: 'Failed to load traffic analytics.',
        zoom: 'Zoom',
        zoom_reset: 'Reset zoom',
        restore: 'Restore',
        download: 'Save image'
    }

    const dictionary = traffic_is_korean() ? ko : en
    return dictionary[key] || en[key] || key
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

function traffic_previous_count(table, period) {
    const rows = traffic_parse_series(table, period)
    if (rows.length <= 1) {
        return null
    }
    return rows[rows.length - 2].count
}

function traffic_summary(payload, metric) {
    const block = payload && payload[metric] ? payload[metric] : {}
    const counter = block.counter || {}
    const table = block.table || {}

    return {
        metric: metric,
        total: traffic_safe_number(counter.cnt_total),
        currentYear: traffic_safe_number(counter.cnt_yearly),
        previousYear: traffic_previous_count(table.yearly, 'yearly'),
        currentMonth: traffic_safe_number(counter.cnt_monthly),
        previousMonth: traffic_previous_count(table.monthly, 'monthly'),
        currentDay: traffic_safe_number(counter.cnt_daily),
        previousDay: traffic_previous_count(table.daily, 'daily')
    }
}

function traffic_metric_label(metric, slot) {
    const map = {
        visitor: {
            total: traffic_t('total_visitor'),
            currentYear: traffic_t('year_visitor'),
            currentMonth: traffic_t('month_visitor'),
            currentDay: traffic_t('day_visitor')
        },
        pageview: {
            total: traffic_t('total_pageview'),
            currentYear: traffic_t('year_pageview'),
            currentMonth: traffic_t('month_pageview'),
            currentDay: traffic_t('day_pageview')
        }
    }

    return map[metric] && map[metric][slot] ? map[metric][slot] : ''
}

function traffic_fetch_json(url) {
    return fetch(url).then(res => {
        if (!res.ok) {
            throw new Error('HTTP ' + res.status)
        }
        return res.json()
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
    const labelSet = {}

    visitorRows.forEach(row => {
        visitorMap[row.label] = row.count
        labelSet[row.label] = true
    })

    pageviewRows.forEach(row => {
        pageviewMap[row.label] = row.count
        labelSet[row.label] = true
    })

    const labels = Object.keys(labelSet).sort()

    return {
        labels: labels,
        visitors: labels.map(label => visitorMap[label] || 0),
        pageviews: labels.map(label => pageviewMap[label] || 0)
    }
}

function traffic_build_chart_option(payload, period) {
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
                text: traffic_t('no_data'),
                fill: '#64748b',
                fontSize: 16,
                fontWeight: 600
            }
        }]
        : []

    return {
        color: ['#4f6bdc', '#b4d334'],
        animationDuration: 300,
        title: {
            text: traffic_t('chart_title'),
            left: 'center',
            top: 18,
            textStyle: {
                color: '#1f2937',
                fontSize: 18,
                fontWeight: 700
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: '#111827',
            borderWidth: 0,
            textStyle: {
                color: '#f8fafc'
            },
            formatter: function(params) {
                const title = params && params.length ? params[0].axisValue : ''
                const rows = [title]

                params.forEach(param => {
                    const metric = param.seriesName === traffic_t('chart_visitor') ? 'visitor' : 'pageview'
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
                color: '#64748b'
            },
            data: [traffic_t('chart_visitor'), traffic_t('chart_pageview')]
        },
        toolbox: {
            top: 14,
            right: 12,
            itemSize: 16,
            iconStyle: {
                borderColor: '#94a3b8'
            },
            feature: {
                dataZoom: {
                    yAxisIndex: 'none',
                    title: {
                        zoom: traffic_t('zoom'),
                        back: traffic_t('zoom_reset')
                    }
                },
                restore: {
                    title: traffic_t('restore')
                },
                saveAsImage: {
                    title: traffic_t('download'),
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
                    color: '#cbd5e1'
                }
            },
            axisLabel: {
                color: '#64748b',
                hideOverlap: true
            }
        },
        yAxis: [
            {
                type: 'value',
                min: 0,
                name: traffic_t('axis_visitor'),
                nameLocation: 'end',
                nameGap: 16,
                nameTextStyle: {
                    color: '#64748b'
                },
                axisLabel: {
                    color: '#64748b',
                    formatter: function(value) {
                        return traffic_format_number(value)
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#e5e7eb'
                    }
                }
            },
            {
                type: 'value',
                min: 0,
                name: traffic_t('axis_pageview'),
                nameLocation: 'end',
                nameGap: 16,
                nameTextStyle: {
                    color: '#64748b'
                },
                axisLabel: {
                    color: '#64748b',
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
                borderColor: '#dbeafe',
                backgroundColor: '#eff6ff',
                fillerColor: 'rgba(79, 107, 220, 0.12)',
                handleStyle: {
                    color: '#93c5fd'
                },
                moveHandleStyle: {
                    color: '#93c5fd'
                },
                dataBackground: {
                    lineStyle: {
                        color: '#94a3b8'
                    },
                    areaStyle: {
                        color: 'rgba(148, 163, 184, 0.18)'
                    }
                }
            }
        ],
        series: [
            {
                name: traffic_t('chart_visitor'),
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
                name: traffic_t('chart_pageview'),
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

function render_traffic_chart(payload, period) {
    const target = document.getElementById('traffic_chart')
    if (!target || typeof echarts === 'undefined') {
        return
    }

    let chart = echarts.getInstanceByDom(target)
    if (!chart) {
        chart = echarts.init(target)
    }

    chart.setOption(traffic_build_chart_option(payload, period), true)
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
    return (
        <div class="flex flex-col justify-start items-center text-center px-3 py-2 min-h-[120px]">
            <p class="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{traffic_format_metric_value(props.metric, props.value)}</p>
            <p class="mt-1 text-base text-slate-600">{props.label}</p>
            {
                props.compareLabel != null && props.compareValue != null
                    ? <p class="mt-1 text-base text-slate-500">({props.compareLabel}: {traffic_format_metric_value(props.metric, props.compareValue)})</p>
                    : null
            }
        </div>
    )
}

function Div_traffic_summary_card(props) {
    const summary = props.summary
    const title = summary.metric === 'visitor' ? traffic_t('section_visitor') : traffic_t('section_pageview')

    return (
        <div class="w-full rounded-xl border border-gray-200 bg-gray-50 shadow-sm px-6 py-8">
            <h2 class="text-center text-3xl sm:text-4xl font-extrabold text-blue-600 mb-8">{title}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Div_traffic_summary_item
                    metric={summary.metric}
                    value={summary.total}
                    label={traffic_metric_label(summary.metric, 'total')}
                />
                <Div_traffic_summary_item
                    metric={summary.metric}
                    value={summary.currentYear}
                    label={traffic_metric_label(summary.metric, 'currentYear')}
                    compareLabel={traffic_t('last_year')}
                    compareValue={summary.previousYear}
                />
                <Div_traffic_summary_item
                    metric={summary.metric}
                    value={summary.currentMonth}
                    label={traffic_metric_label(summary.metric, 'currentMonth')}
                    compareLabel={traffic_t('last_month')}
                    compareValue={summary.previousMonth}
                />
                <Div_traffic_summary_item
                    metric={summary.metric}
                    value={summary.currentDay}
                    label={traffic_metric_label(summary.metric, 'currentDay')}
                    compareLabel={traffic_t('yesterday')}
                    compareValue={summary.previousDay}
                />
            </div>
        </div>
    )
}

function Div_traffic_tab_button(props) {
    const isActive = props.active === props.period
    const buttonClass = isActive
        ? 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold bg-slate-100 text-blue-600 shadow-sm'
        : 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition'

    return (
        <button type="button" class={buttonClass} onClick={() => props.onChange(props.period)}>
            {traffic_t('tab_' + props.period)}
        </button>
    )
}

function Div_traffic_loading() {
    return (
        <div class="flex flex-col w-full space-y-6 animate-pulse">
            <div class="w-full rounded-xl border border-gray-200 bg-gray-50 h-48"></div>
            <div class="w-full rounded-xl border border-gray-200 bg-gray-50 h-48"></div>
            <div class="w-full rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div class="w-48 h-10 rounded-lg bg-gray-200 mb-6"></div>
                <div class="w-full h-[420px] rounded-lg bg-gray-200"></div>
            </div>
        </div>
    )
}

function Div_traffic_error(props) {
    return (
        <div class="w-full rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-600 font-semibold">
            <p>{traffic_t('load_error')}</p>
            {
                props.message
                    ? <p class="mt-2 text-sm font-normal text-red-500">{props.message}</p>
                    : null
            }
        </div>
    )
}

function Div_content() {
    const [dashboard, setDashboard] = React.useState(null)
    const [period, setPeriod] = React.useState('monthly')
    const [errorMessage, setErrorMessage] = React.useState('')

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

        const timer = window.setTimeout(() => render_traffic_chart(dashboard, period), 0)
        return () => window.clearTimeout(timer)
    }, [dashboard, period])

    if (errorMessage !== '') {
        return <Div_traffic_error message={errorMessage} />
    }

    if (dashboard == null) {
        return <Div_traffic_loading />
    }

    const visitorSummary = traffic_summary(dashboard, 'visitor')
    const pageviewSummary = traffic_summary(dashboard, 'pageview')

    return (
        <div class="flex flex-col w-full space-y-6">
            <Div_traffic_summary_card summary={visitorSummary} />
            <Div_traffic_summary_card summary={pageviewSummary} />
            <div class="w-full rounded-xl border border-gray-200 bg-gray-50 shadow-sm px-6 py-6">
                <div class="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6 overflow-x-auto">
                    <Div_traffic_tab_button active={period} period="daily" onChange={setPeriod} />
                    <Div_traffic_tab_button active={period} period="monthly" onChange={setPeriod} />
                    <Div_traffic_tab_button active={period} period="yearly" onChange={setPeriod} />
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
