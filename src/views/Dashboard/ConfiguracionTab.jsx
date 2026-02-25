import React, { useState } from 'react';
import PerfilSubTab from './subtabs/PerfilSubTab';
import EmpresaSubTab from './subtabs/EmpresaSubTab';
import UsuariosSubTab from './subtabs/UsuariosSubTab';

const ConfiguracionTab = ({ activeSubTab }) => {
    return (
        <div className="config-container">
            <div className="config-viewport">
                {activeSubTab === 'perfil' && <PerfilSubTab />}
                {activeSubTab === 'empresa' && <EmpresaSubTab />}
                {activeSubTab === 'usuarios' && <UsuariosSubTab />}
            </div>
        </div>
    );
};

export default ConfiguracionTab;
