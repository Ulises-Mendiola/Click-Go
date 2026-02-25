import React, { useState } from 'react';
import { useCRM } from '../../../context/CRMContext';
import { uploadImageAction } from '@/app/actions';

const PerfilSubTab = () => {
    const { currentUser, updateUsuario } = useCRM();
    const [formData, setFormData] = useState({
        nombre: currentUser?.nombre || '',
        apellido: currentUser?.apellido || '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUsuario(currentUser.id, formData);
        setFormData(prev => ({ ...prev, password: '' }));
    };

    return (
        <div className="config-container">
            <div className="conf-card glass">
                <div className="conf-card-header">
                    <h3>Información Personal</h3>
                    <p>Gestiona tu identidad y cómo te ven otros usuarios del panel.</p>
                </div>

                <form onSubmit={handleSubmit} className="conf-form-flex">
                    <div className="conf-grid">
                        <div className="crm-group">
                            <label className="crm-label">Nombre</label>
                            <input
                                type="text"
                                className="crm-input-premium"
                                value={formData.nombre}
                                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div className="crm-group">
                            <label className="crm-label">Apellido</label>
                            <input
                                type="text"
                                className="crm-input-premium"
                                value={formData.apellido}
                                onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                                placeholder="Tu apellido"
                            />
                        </div>
                    </div>

                    <div className="crm-group">
                        <label className="crm-label">Rol en el Sistema</label>
                        <div className="crm-role-display">
                            <span className={`rol-dot ${currentUser?.rol?.toLowerCase()}`}></span>
                            {currentUser?.rol || 'Gestion'}
                        </div>
                        <p className="input-hint mt-8">El rol solo puede ser cambiado por un Administrador en la pestaña de Usuarios.</p>
                    </div>

                    <div className="divider-glow"></div>

                    <div className="conf-card-header mt-20">
                        <h3>Seguridad</h3>
                        <p>Protege tu acceso actualizando tu contraseña periódicamente.</p>
                    </div>

                    <div className="crm-group">
                        <label className="crm-label">Nueva Contraseña</label>
                        <input
                            type="password"
                            className="crm-input-premium"
                            placeholder="Escribe para cambiarla (mín. 6 caracteres)"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="conf-actions mt-12">
                        <button type="submit" className="proy-add-btn large">
                            Guardar Cambios de Perfil
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PerfilSubTab;
