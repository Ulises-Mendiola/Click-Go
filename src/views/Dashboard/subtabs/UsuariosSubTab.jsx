import React, { useState } from 'react';
import { useCRM } from '../../../context/CRMContext';

const IcoEye = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

const IcoEyeOff = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const UsuariosSubTab = () => {
    const { usuariosList, currentUser, addUsuario } = useCRM();
    const [showPassMap, setShowPassMap] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({
        nombre: '', apellido: '', rol: 'Gestion', password: ''
    });

    const isAdmin = currentUser?.rol === 'Admin';

    const togglePass = (id) => {
        setShowPassMap(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        addUsuario(newUser);
        setNewUser({ nombre: '', apellido: '', rol: 'Gestion', password: '' });
        setShowCreateModal(false);
    };

    return (
        <div className="config-container">
            <div className="conf-card glass">
                <div className="conf-card-header-flex">
                    <div className="conf-card-header">
                        <h3>Gestión de Usuarios</h3>
                        <p>Control de acceso interno para tu equipo administrativo.</p>
                    </div>
                    {isAdmin && (
                        <button className="proy-add-btn small shadow-glow" onClick={() => setShowCreateModal(true)}>
                            + Nuevo Usuario
                        </button>
                    )}
                </div>

                <div className="users-table-container-premium">
                    <table className="users-table-premium">
                        <thead>
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Rol de Acceso</th>
                                <th>Acceso (Password)</th>
                                <th>Fecha Registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosList.map(u => (
                                <tr key={u.id} className="user-row-premium">
                                    <td>
                                        <div className="user-info-premium">
                                            <div className="user-avatar-premium">
                                                {u.nombre[0]}{u.apellido[0]}
                                            </div>
                                            <div className="user-name-stack">
                                                <span className="user-full-name">{u.nombre} {u.apellido}</span>
                                                <span className="user-id-hint">ID: {u.id.slice(-4)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`rol-badge-premium ${u.rol.toLowerCase()}`}>
                                            <span className="badge-dot"></span>
                                            {u.rol}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="pass-cell-premium">
                                            <code className="pass-code">
                                                {showPassMap[u.id] ? u.password : '••••••••'}
                                            </code>
                                            <button className="pass-toggle-premium" onClick={() => togglePass(u.id)}>
                                                {showPassMap[u.id] ? <IcoEyeOff /> : <IcoEye />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="date-cell">
                                        <span className="date-text">
                                            {new Date(u.fecha).toLocaleDateString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal para Crear Usuario Refined */}
            {showCreateModal && (
                <div className="crm-modal-overlay premium-blur" onClick={() => setShowCreateModal(false)}>
                    <div className="crm-modal-premium glass" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleCreate}>
                            <div className="modal-header-premium">
                                <h3 className="crm-modal-title">Registrar Usuario</h3>
                                <p className="crm-modal-subtitle">Asigna credenciales para un nuevo colaborador.</p>
                            </div>

                            <div className="form-row-premium">
                                <div className="crm-group">
                                    <label className="crm-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="crm-input-premium"
                                        required
                                        value={newUser.nombre}
                                        onChange={e => setNewUser({ ...newUser, nombre: e.target.value })}
                                        placeholder="Ej: Ulises"
                                    />
                                </div>
                                <div className="crm-group">
                                    <label className="crm-label">Apellido</label>
                                    <input
                                        type="text"
                                        className="crm-input-premium"
                                        required
                                        value={newUser.apellido}
                                        onChange={e => setNewUser({ ...newUser, apellido: e.target.value })}
                                        placeholder="Ej: Mendiola"
                                    />
                                </div>
                            </div>

                            <div className="crm-group">
                                <label className="crm-label">Rol de Acceso</label>
                                <select
                                    className="crm-input-premium"
                                    value={newUser.rol}
                                    onChange={e => setNewUser({ ...newUser, rol: e.target.value })}
                                >
                                    <option value="Gestion">Gestión (Lectura/Escritura limitada)</option>
                                    <option value="Admin">Administrador (Control total)</option>
                                </select>
                            </div>

                            <div className="crm-group">
                                <label className="crm-label">Contraseña Inicial</label>
                                <input
                                    type="password"
                                    className="crm-input-premium"
                                    required
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>

                            <div className="crm-modal-actions-premium">
                                <button type="button" className="btn-cancel-premium" onClick={() => setShowCreateModal(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-confirm-premium">
                                    Crear Cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsuariosSubTab;
