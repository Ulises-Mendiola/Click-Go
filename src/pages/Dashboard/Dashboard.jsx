import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sileo';
// import { CRMProvider } from '../../context/CRMContext'; // Movido a App.jsx
import DashboardHome from './DashboardHome';
import ProspectosTab from './ProspectosTab';
import ClientesTab from './ClientesTab';
import ProyectosTab from './ProyectosTab';
import './Dashboard.css';

/* ── Icons ── */
const IcoHome = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);
const IcoManagement = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const IcoProjects = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
);
const IcoLogout = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeModule, setActiveModule] = useState('home'); // home, clientes, proyectos
    const [activeTab, setActiveTab] = useState('prospectos'); // dentro de gestión de clientes

    const getModuleTitle = () => {
        switch (activeModule) {
            case 'home': return 'Dashboard Principal';
            case 'clientes': return 'Gestión de Clientes';
            case 'proyectos': return 'Gestión de Proyectos';
            default: return 'Admin Panel';
        }
    }

    return (
        <div className="dashboard-container">
            {/* Background Orbs */}
            <div className="dashboard-bg">
                <div className="db-orb db-orb-1" aria-hidden="true" />
                <div className="db-orb db-orb-2" aria-hidden="true" />
            </div>

            <aside className="sidebar glass">
                <div className="sidebar-brand">
                    <a href="/" className="dashboard-logo">
                        Click <span className="text-gradient">&amp; Go</span>
                    </a>
                    <p className="sidebar-tagline">Admin Panel</p>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeModule === 'home' ? 'active' : ''}`}
                        onClick={() => setActiveModule('home')}
                    >
                        <IcoHome /> <span>Dashboard</span>
                    </button>

                    <button
                        className={`nav-item ${activeModule === 'clientes' ? 'active' : ''}`}
                        onClick={() => setActiveModule('clientes')}
                    >
                        <IcoManagement /> <span>Gestión de Clientes</span>
                    </button>

                    <button
                        className={`nav-item ${activeModule === 'proyectos' ? 'active' : ''}`}
                        onClick={() => setActiveModule('proyectos')}
                    >
                        <IcoProjects /> <span>Gestión de Proyectos</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={() => navigate('/login')}>
                        <IcoLogout /> <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="content-header">
                    <h1 className="module-title">
                        {getModuleTitle()}
                    </h1>

                    {activeModule === 'clientes' && (
                        <div className="sub-tabs">
                            <button
                                className={`sub-tab ${activeTab === 'prospectos' ? 'active' : ''}`}
                                onClick={() => setActiveTab('prospectos')}
                            >
                                Prospectos
                            </button>
                            <button
                                className={`sub-tab ${activeTab === 'clientes' ? 'active' : ''}`}
                                onClick={() => setActiveTab('clientes')}
                            >
                                Clientes
                            </button>
                        </div>
                    )}
                </header>

                <div className="module-content scrollable">
                    {activeModule === 'home' && <DashboardHome />}
                    {activeModule === 'clientes' && (
                        activeTab === 'prospectos' ? <ProspectosTab /> : <ClientesTab />
                    )}
                    {activeModule === 'proyectos' && <ProyectosTab />}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
