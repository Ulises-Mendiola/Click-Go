import React, { useState } from 'react';
import PerfilSubTab from './subtabs/PerfilSubTab';
import EmpresaSubTab from './subtabs/EmpresaSubTab';
import UsuariosSubTab from './subtabs/UsuariosSubTab';

const ConfiguracionTab = () => {
    const [activeSubTab, setActiveSubTab] = useState('perfil'); // perfil, empresa, usuarios

    return (
        <div className="config-container">
            <div className="config-nav glass">
                <button
                    className={`conf-nav-item ${activeSubTab === 'perfil' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('perfil')}
                >
                    Mi Perfil
                </button>
                <button
                    className={`conf-nav-item ${activeSubTab === 'empresa' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('empresa')}
                >
                    Datos Empresa
                </button>
                <button
                    className={`conf-nav-item ${activeSubTab === 'usuarios' ? 'active' : ''}`}
                    onClick={() => setActiveSubTab('usuarios')}
                >
                    Usuarios
                </button>
            </div>

            <div className="config-viewport">
                {activeSubTab === 'perfil' && <PerfilSubTab />}
                {activeSubTab === 'empresa' && <EmpresaSubTab />}
                {activeSubTab === 'usuarios' && <UsuariosSubTab />}
            </div>
        </div>
    );
};

export default ConfiguracionTab;
