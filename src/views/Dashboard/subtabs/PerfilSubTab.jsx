import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
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
        <div className="conf-subtab fade-in">
            <div className="conf-card glass">
                <div className="conf-card-header">
                    <h3>Mi Perfil</h3>
                    <p>Gestiona tu información personal y credenciales.</p>
                </div>

                <form onSubmit={handleSubmit} className="conf-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                className="crm-modal-input"
                                value={formData.nombre}
                                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input
                                type="text"
                                className="crm-modal-input"
                                value={formData.apellido}
                                onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Rol de Sistema</label>
                        <input
                            type="text"
                            className="crm-modal-input disabled"
                            value={currentUser?.rol}
                            disabled
                        />
                        <span className="input-hint">El rol solo puede ser cambiado por un Administrador en la pestaña de Usuarios.</span>
                    </div>

                    <div className="form-group">
                        <label>Nueva Contraseña</label>
                        <input
                            type="password"
                            className="crm-modal-input"
                            placeholder="Dejar en blanco para no cambiar"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="conf-actions">
                        <button type="submit" className="proy-add-btn">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PerfilSubTab;
