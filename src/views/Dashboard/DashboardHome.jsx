import React from 'react';
import { useCRM } from '../../context/CRMContext';
import './Dashboard.css';

/* ── Icons ── */
const IcoUsers = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const IcoBriefcase = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);
const IcoTarget = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);
const IcoTrend = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
);
const IcoDollar = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);
const IcoClock = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);
const IcoThermometer = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
);

const RadialProgress = ({ value, label, color }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="radial-widget">
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle className="radial-bg" cx="50" cy="50" r={radius} />
                <circle
                    className="radial-progress"
                    cx="50" cy="50" r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    stroke={color}
                />
            </svg>
            <div className="radial-info">
                <span className="radial-val">{value}%</span>
                <span className="radial-label">{label}</span>
            </div>
        </div>
    );
};

const TemperatureGauge = ({ value }) => {
    const hue = 220 - (value * 1.8); // 220 (blue) to 40 (orange/red)
    return (
        <div className="temp-widget">
            <header className="temp-header">
                <IcoThermometer style={{ color: `hsl(${hue}, 80%, 60%)` }} />
                <span>Salud del Negocio</span>
            </header>
            <div className="temp-bar-bg">
                <div className="temp-bar-fill" style={{
                    width: `${value}%`,
                    background: `linear-gradient(to right, #3b82f6, hsl(${hue}, 80%, 60%))`,
                    boxShadow: `0 0 15px hsl(${hue}, 80%, 50%, 0.4)`
                }} />
            </div>
            <div className="temp-labels">
                <span>Calma</span>
                <span>Activo</span>
                <span>¡Fuego!</span>
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const { prospectos, clientes, proyectos, loading } = useCRM();

    if (loading) {
        return (
            <div className="db-home control-center loading-state">
                <div className="glass loading-card">
                    <div className="spinner"></div>
                    <p>Cargando datos estratégicos...</p>
                </div>
            </div>
        );
    }

    // Cálculos de negocio
    const conversionRate = prospectos.length > 0
        ? ((clientes.length / (prospectos.length + clientes.length)) * 100).toFixed(1)
        : 0;

    const proysEnProceso = proyectos.filter(p => p.estado === 'en proceso').length;
    const pipelineValue = proyectos.filter(p => p.estado !== 'finalizado' && p.estado !== 'pausado').length * 1500;

    // Tiempo promedio de desarrollo (Proyectos Finalizados)
    const finalizedProys = proyectos.filter(p => p.estado === 'finalizado' && p.inicio && p.fin);
    const avgDevTime = finalizedProys.length > 0
        ? Math.round(finalizedProys.reduce((acc, p) => {
            const days = (new Date(p.fin) - new Date(p.inicio)) / (1000 * 60 * 60 * 24);
            return acc + days;
        }, 0) / finalizedProys.length)
        : 0;

    // Metas y Temperatura
    const conversionGoal = 50; // Meta de 50% conversión
    const conversionProgress = Math.min(Math.round((parseFloat(conversionRate) / conversionGoal) * 100), 100);

    const businessTemp = Math.min(Math.round(((prospectos.length + proysEnProceso * 2) / 20) * 100), 100);

    const stats = [
        { label: 'Prospectos', value: prospectos.length, icon: <IcoTarget />, color: '#c084fc', trend: '+12%' },
        { label: 'Clientes Totales', value: clientes.length, icon: <IcoUsers />, color: '#10b981', trend: 'Base' },
        { label: 'Conversión', value: `${conversionRate}%`, icon: <IcoTrend />, color: '#16a34a', trend: 'Global' },
        { label: 'Proyectos Activos', value: proysEnProceso, icon: <IcoBriefcase />, color: '#3b82f6', trend: 'En curso' },
        { label: 'Tiempo Promedio', value: `${avgDevTime} días`, icon: <IcoClock />, color: '#f43f5e', trend: 'Eficiencia' },
        { label: 'Valor Pipeline', value: `$${pipelineValue}`, icon: <IcoDollar />, color: '#f59e0b', trend: 'Est.' },
    ];

    // Datos para gráfica de barras (Últimos 6 meses)
    const getMonthlyData = () => {
        const months = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthLabel = d.toLocaleString('es-MX', { month: 'short' });

            const countProspectos = prospectos.filter(p => {
                const pDate = new Date(p.fecha);
                return pDate.getMonth() === d.getMonth() && pDate.getFullYear() === d.getFullYear();
            }).length;

            const countClientes = clientes.filter(c => {
                const cDate = new Date(c.inicio);
                return cDate.getMonth() === d.getMonth() && cDate.getFullYear() === d.getFullYear();
            }).length;

            months.push({ label: monthLabel, prospectos: countProspectos, clientes: countClientes });
        }
        return months;
    };

    const monthlyData = getMonthlyData();
    const maxVal = Math.max(...monthlyData.map(m => Math.max(m.prospectos, m.clientes, 5)));

    // Datos para Donut
    const statusCounts = {
        finalizado: proyectos.filter(p => p.estado === 'finalizado').length,
        proceso: proyectos.filter(p => p.estado === 'en proceso').length,
        otros: proyectos.filter(p => p.estado !== 'finalizado' && p.estado !== 'en proceso').length,
    };
    const totalProy = proyectos.length || 1;
    const finalPct = (statusCounts.finalizado / totalProy) * 100;
    const procePct = (statusCounts.proceso / totalProy) * 100;

    const reciente = [
        ...prospectos.slice(0, 3).map(p => ({ type: 'prospecto', name: `${p.nombre} ${p.apellido}`, desc: 'Nuevo lead registrado', date: p.fecha })),
        ...clientes.slice(0, 2).map(c => ({ type: 'cliente', name: `${c.nombre} ${c.apellido}`, desc: 'Convertido a cliente', date: c.inicio })),
        ...proyectos.slice(0, 2).map(p => ({ type: 'proyecto', name: p.nombre, desc: `Estado: ${p.estado}`, date: p.inicio })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

    return (
        <div className="db-home control-center">
            {/* 1. Header KPIs */}
            <div className="db-stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="db-stat-card glass highlight-hover">
                        {/* Ghost Icon Background */}
                        <div className="db-stat-ghost-icon" style={{ color: s.color }}>
                            {s.icon}
                        </div>

                        <div className="db-stat-top">
                            <div className="db-stat-icon" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                {s.icon}
                            </div>
                            <span className="db-stat-trend" style={{ color: s.color === '#16a34a' ? '#16a34a' : 'var(--text-dim)' }}>
                                {s.trend}
                            </span>
                        </div>
                        <div className="db-stat-info">
                            <span className="db-stat-label">{s.label}</span>
                            <span className="db-stat-value">{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Main Layout (70/30) */}
            <div className="db-content-layout">
                {/* Left Side (Analytics) */}
                <div className="db-left-main">
                    {/* Gráfica de Barras */}
                    <div className="db-chart-section glass">
                        <header className="db-section-header">
                            <h3 className="db-section-title">Crecimiento Mensual</h3>
                            <div className="db-chart-legend">
                                <span className="leg-item"><span className="dot proce"></span> Prospectos</span>
                                <span className="leg-item"><span className="dot final"></span> Clientes</span>
                            </div>
                        </header>
                        <div className="db-bar-chart">
                            {monthlyData.map((m, i) => (
                                <div key={i} className="bar-group-wrap">
                                    <div className="bar-group">
                                        <div className="bar prospectos" style={{ height: `${(m.prospectos / maxVal) * 100}%` }}>
                                            <span className="bar-val">{m.prospectos}</span>
                                        </div>
                                        <div className="bar clientes" style={{ height: `${(m.clientes / maxVal) * 100}%` }}>
                                            <span className="bar-val">{m.clientes}</span>
                                        </div>
                                    </div>
                                    <span className="bar-label">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Analytics Row */}
                    <div className="db-visual-row">
                        <div className="db-visual-section glass perspective-card">
                            <header className="db-section-header">
                                <h3 className="db-section-title">Estados de Proyectos</h3>
                                <span className="db-section-sub">Distribución operativa</span>
                            </header>
                            <div className="db-donut-box">
                                <div className="db-donut" style={{
                                    background: `conic-gradient(#16a34a 0% ${finalPct}%, #3b82f6 ${finalPct}% ${finalPct + procePct}%, #6b7280 ${finalPct + procePct}% 100%)`
                                }}>
                                    <div className="db-donut-inner">
                                        <span className="donut-total">{proyectos.length}</span>
                                        <span className="donut-label">Total</span>
                                    </div>
                                </div>
                                <div className="db-donut-legend">
                                    <div className="leg-item"><span className="dot proce"></span> Proceso <b>{statusCounts.proceso}</b></div>
                                    <div className="leg-item"><span className="dot final"></span> Finalizado <b>{statusCounts.finalizado}</b></div>
                                    <div className="leg-item"><span className="dot other"></span> Otros <b>{statusCounts.otros}</b></div>
                                </div>
                            </div>
                        </div>

                        <div className="db-extra-widgets">
                            <div className="db-widget-card glass perspective-card">
                                <RadialProgress value={conversionProgress} label="Meta Conversión" color="#16a34a" />
                            </div>
                            <div className="db-widget-card glass perspective-card">
                                <TemperatureGauge value={businessTemp} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side (Activity Sidebar) */}
                <aside className="db-activity-sidebar glass">
                    <h3 className="db-section-title">Actividad Reciente</h3>
                    <div className="db-activity-list full-scroll">
                        {reciente.map((item, i) => (
                            <div key={i} className="db-activity-item">
                                <div className={`db-activity-icon-wrap ${item.type}`}>
                                    {item.type === 'prospecto' && <IcoTarget />}
                                    {item.type === 'cliente' && <IcoUsers />}
                                    {item.type === 'proyecto' && <IcoBriefcase />}
                                </div>
                                <div className="db-activity-info">
                                    <p className="db-activity-text">
                                        <strong>{item.name}</strong>
                                        <span className="db-activity-desc">{item.desc}</span>
                                    </p>
                                    <span className="db-activity-date">
                                        {new Date(item.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {reciente.length === 0 && <p className="no-activity">Sin actividad reciente</p>}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardHome;
