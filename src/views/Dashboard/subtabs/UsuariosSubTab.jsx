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
        <div className="conf-subtab fade-in">
            <div className="conf-card glass">
                <div className="conf-card-header-flex">
                    <div>
                        <h3>Gestión de Usuarios</h3>
                        <p>Lista de personas con acceso al panel administrativo.</p>
                    </div>
                    {isAdmin && (
                        <button className="proy-add-btn small" onClick={() => setShowCreateModal(true)}>
                            + Nuevo Usuario
                        </button>
                    )}
                </div>

                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Rol</th>
                                <th>Contraseña</th>
                                <th>Fecha de Alta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosList.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar">{u.nombre[0]}{u.apellido[0]}</div>
                                            <span>{u.nombre} {u.apellido}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`rol-badge ${u.rol.toLowerCase()}`}>{u.rol}</span>
                                    </td>
                                    <td>
                                        <div className="pass-cell">
                                            <span className="pass-text">
                                                {showPassMap[u.id] ? u.password : '••••••••'}
                                            </span>
                                            <button className="pass-toggle" onClick={() => togglePass(u.id)}>
                                                {showPassMap[u.id] ? <IcoEyeOff /> : <IcoEye />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="date-cell">
                                        {new Date(u.fecha).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal para Crear Usuario */}
            {showCreateModal && (
                <div className="crm-modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="crm-modal glass" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleCreate}>
                            <h3 className="crm-modal-title">Registrar Nuevo Usuario</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className="crm-modal-input"
                                        required
                                        value={newUser.nombre}
                                        onChange={e => setNewUser({ ...newUser, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <input
                                        type="text"
                                        className="crm-modal-input"
                                        required
                                        value={newUser.apellido}
                                        onChange={e => setNewUser({ ...newUser, apellido: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Rol de Acceso</label>
                                <select
                                    className="crm-modal-input"
                                    value={newUser.rol}
                                    onChange={e => setNewUser({ ...newUser, rol: e.target.value })}
                                >
                                    <option value="Gestion">Gestión (Limitado)</option>
                                    <option value="Admin">Administrador (Total)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Contraseña Inicial</label>
                                <input
                                    type="password"
                                    className="crm-modal-input"
                                    required
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </div>

                            <div className="crm-modal-actions">
                                <button type="button" className="crm-modal-cancel" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                                <button type="submit" className="crm-modal-confirm">Crear Usuario</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsuariosSubTab;
