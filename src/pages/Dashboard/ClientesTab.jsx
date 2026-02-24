import React, { useState, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import './ClientesTab.css';

/* ── Icons ── */
const IcoUser = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);
const IcoWA = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);
const IcoTrash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);
const IcoSearch = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
);
const IcoBriefcase = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
);
const IcoInfo = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);
const IcoEdit = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const IcoGrid = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
);
const IcoList = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const ESTADOS_CLIENTE = {
    activo: { label: 'Activo', color: '#16a34a' },
    pausado: { label: 'Pausado', color: '#d97706' },
    completado: { label: 'Completado', color: '#9333ea' },
};

const formatWA = (num) => num.replace(/[\s\-()]/g, '');

/* ── Client Detail Modal ── */
const ClientDetailModal = ({ c, project, onClose }) => {
    const est = ESTADOS_CLIENTE[c.estado] || ESTADOS_CLIENTE.activo;
    return (
        <div className="crm-modal-overlay" onClick={onClose}>
            <div className="crm-modal detail-modal glass" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="cli-avatar"><IcoUser /></div>
                    <div>
                        <h3 className="crm-modal-title">{c.nombre} {c.apellido}</h3>
                        <span className="cli-badge" style={{ '--badge-color': est.color }}>{est.label}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="detail-group">
                        <label>Información de Contacto</label>
                        <p>{c.correo}</p>
                        <p>{c.whatsapp}</p>
                    </div>
                    {c.empresa && (
                        <div className="detail-group">
                            <label>Empresa</label>
                            <p>{c.empresa}</p>
                        </div>
                    )}
                    <div className="detail-group">
                        <label>Proyecto Actual</label>
                        <p className="detail-project-name">
                            <IcoBriefcase /> {project ? project.nombre : 'Sin proyecto vinculado'}
                        </p>
                    </div>
                    <div className="detail-group">
                        <label>Fecha de Inicio</label>
                        <p>{c.inicio}</p>
                    </div>
                </div>

                <div className="crm-modal-actions">
                    <a href={`https://wa.me/${formatWA(c.whatsapp)}`} target="_blank" rel="noreferrer" className="cli-wa-btn">
                        <IcoWA /> WhatsApp
                    </a>
                    <button className="crm-modal-cancel" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

/* ── Edit Modal ── */
const ClientEditModal = ({ client, project, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: client.nombre,
        apellido: client.apellido,
        correo: client.correo,
        whatsapp: client.whatsapp,
        empresa: client.empresa || '',
        estado: client.estado,
        nombreProyecto: project ? project.nombre : ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="crm-modal-overlay" onClick={onClose}>
            <div className="crm-modal glass" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="cms-form">
                    <h3 className="crm-modal-title">Editar Cliente</h3>

                    <div className="cms-form-scroll scrollable">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="crm-modal-label">Nombre</label>
                                <input className="crm-modal-input" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="crm-modal-label">Apellido</label>
                                <input className="crm-modal-input" required value={formData.apellido} onChange={e => setFormData({ ...formData, apellido: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="crm-modal-label">Email</label>
                            <input className="crm-modal-input" type="email" required value={formData.correo} onChange={e => setFormData({ ...formData, correo: e.target.value })} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="crm-modal-label">WhatsApp</label>
                                <input className="crm-modal-input" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="crm-modal-label">Empresa</label>
                                <input className="crm-modal-input" value={formData.empresa} onChange={e => setFormData({ ...formData, empresa: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="crm-modal-label">Estado del Cliente</label>
                            <CustomSelect
                                options={Object.entries(ESTADOS_CLIENTE).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))}
                                value={formData.estado}
                                onChange={val => setFormData({ ...formData, estado: val })}
                            />
                        </div>

                        {project && (
                            <div className="form-group">
                                <label className="crm-modal-label">Nombre del Proyecto Vinculado</label>
                                <input className="crm-modal-input" value={formData.nombreProyecto} onChange={e => setFormData({ ...formData, nombreProyecto: e.target.value })} placeholder="Nombre del proyecto" />
                            </div>
                        )}
                    </div>

                    <div className="crm-modal-actions">
                        <button type="button" className="crm-modal-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="crm-modal-confirm">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ClienteCard = ({ c, onEdit, onDelete, onUpdate, project, est }) => (
    <div className="cli-card glass highlight-hover">
        <div className="cli-card-header">
            <div className="cli-avatar"><IcoUser /></div>
            <div className="cli-name-wrap">
                <span className="cli-fullname">{c.nombre} {c.apellido}</span>
                <span className="cli-sub">{c.correo}</span>
            </div>
        </div>
        <div className="cli-card-body">
            <div className="cli-card-info">
                <a
                    className="cli-wa-badge"
                    href={`https://wa.me/${formatWA(c.whatsapp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IcoWA /> {c.whatsapp}
                </a>
                <span className="cli-project-badge">
                    <IcoBriefcase /> {project ? project.nombre : 'Sin Proyecto'}
                </span>
            </div>
            <div className="cli-card-status">
                <label>Estado:</label>
                <CustomSelect
                    options={Object.entries(ESTADOS_CLIENTE).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))}
                    value={c.estado}
                    onChange={val => onUpdate(c.id, { estado: val })}
                />
            </div>
        </div>
        <div className="cli-card-actions">
            <button className="cli-icon-btn edit" onClick={() => onEdit(c)}><IcoEdit /></button>
            <button className="cli-icon-btn delete" onClick={() => onDelete(c.id)}><IcoTrash /></button>
        </div>
    </div>
);

const ClientesTab = () => {
    const { clientes, proyectos, updateCliente, updateProyecto, deleteCliente } = useCRM();
    const [search, setSearch] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [selectedClient, setSelectedClient] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // Default 'list' for clients
    const [editingClient, setEditingClient] = useState(null);

    const filtered = clientes.filter(c => {
        const q = search.toLowerCase();
        const project = proyectos.find(p => p.id === c.proyectoId);
        const matchSearch =
            c.nombre.toLowerCase().includes(q) ||
            c.apellido.toLowerCase().includes(q) ||
            c.correo.toLowerCase().includes(q) ||
            (project && project.nombre.toLowerCase().includes(q));
        const matchEstado = filterEstado === 'todos' || c.estado === filterEstado;
        return matchSearch && matchEstado;
    });

    const handleSaveEdit = (formData) => {
        const { nombreProyecto, ...clientData } = formData;

        // Finalizar edición de cliente
        updateCliente(editingClient.id, clientData);

        // Actualizar proyecto si existe
        if (editingClient.proyectoId && nombreProyecto) {
            updateProyecto(editingClient.proyectoId, {
                nombre: nombreProyecto,
                cliente: `${clientData.nombre} ${clientData.apellido}`,
                empresa: clientData.empresa
            });
        }

        setEditingClient(null);
    };

    return (
        <div className="cli-tab">
            <div className="cli-toolbar">
                <div className="cli-search-wrap">
                    <IcoSearch />
                    <input
                        className="cli-search"
                        placeholder="Buscar clientes o proyectos…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <CustomSelect
                    className="cli-filter"
                    options={[
                        { value: 'todos', label: 'Todos los estados' },
                        ...Object.entries(ESTADOS_CLIENTE).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))
                    ]}
                    value={filterEstado}
                    onChange={val => setFilterEstado(val)}
                />
                <div className="cli-count">
                    <span>{filtered.length}</span> clientes
                </div>

                <div className="view-toggle-btns glass">
                    <button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <IcoGrid />
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <IcoList />
                    </button>
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="cli-empty">
                    <p>No hay clientes aún. Convierte prospectos para empezar.</p>
                </div>
            ) : (
                viewMode === 'list' ? (
                    <div className="cli-table-wrap glass">
                        <table className="cli-table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>WhatsApp</th>
                                    <th>Proyecto</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(c => {
                                    const est = ESTADOS_CLIENTE[c.estado] || ESTADOS_CLIENTE.activo;
                                    const project = proyectos.find(p => p.id === c.proyectoId);
                                    return (
                                        <tr key={c.id} className="cli-row">
                                            <td>
                                                <div className="cli-user-cell">
                                                    <div className="cli-avatar"><IcoUser /></div>
                                                    <div className="cli-name-wrap">
                                                        <span className="cli-fullname">{c.nombre} {c.apellido}</span>
                                                        <span className="cli-sub">{c.correo}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                    className="cli-wa-btn"
                                                    href={`https://wa.me/${formatWA(c.whatsapp)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <IcoWA /> {c.whatsapp}
                                                </a>
                                            </td>
                                            <td>
                                                <span className="cli-proyecto">
                                                    <IcoBriefcase /> {project ? project.nombre : 'N/A'}
                                                </span>
                                            </td>
                                            <td>
                                                <CustomSelect
                                                    className="cli-status-select-container"
                                                    options={Object.entries(ESTADOS_CLIENTE).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))}
                                                    value={c.estado}
                                                    onChange={val => updateCliente(c.id, { estado: val })}
                                                />
                                            </td>
                                            <td>
                                                <div className="cli-actions-cell">
                                                    <button className="cli-icon-btn" onClick={() => setSelectedClient(c)} title="Ver detalles">
                                                        <IcoInfo />
                                                    </button>
                                                    <button className="cli-icon-btn edit" onClick={() => setEditingClient(c)} title="Editar">
                                                        <IcoEdit />
                                                    </button>
                                                    <button className="cli-delete-btn" onClick={() => deleteCliente(c.id)} title="Eliminar">
                                                        <IcoTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="cli-grid">
                        {filtered.map(c => (
                            <ClienteCard
                                key={c.id}
                                c={c}
                                onEdit={setEditingClient}
                                onDelete={deleteCliente}
                                onUpdate={updateCliente}
                                project={proyectos.find(p => p.id === c.proyectoId)}
                                est={ESTADOS_CLIENTE[c.estado]}
                            />
                        ))}
                    </div>
                )
            )}

            {selectedClient && (
                <ClientDetailModal
                    c={selectedClient}
                    project={proyectos.find(p => p.id === selectedClient.proyectoId)}
                    onClose={() => setSelectedClient(null)}
                />
            )}

            {editingClient && (
                <ClientEditModal
                    client={editingClient}
                    project={proyectos.find(p => p.id === editingClient.proyectoId)}
                    onSave={handleSaveEdit}
                    onClose={() => setEditingClient(null)}
                />
            )}
        </div>
    );
};

export default ClientesTab;
