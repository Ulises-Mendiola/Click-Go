import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import './ProspectosTab.css';

/* ── Icons ── */
const IcoWA = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);
const IcoUser = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);
const IcoMail = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const IcoTrash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);
const IcoCamera = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
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
const IcoSearch = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
);
const IcoInfo = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);
const IcoEye = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
);
const IcoConvert = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
);

const ESTADOS = {
    nuevo: { label: 'Nuevo', color: '#9333ea' },
    contactado: { label: 'Contactado', color: '#2563eb' },
    en_seguimiento: { label: 'En seguimiento', color: '#d97706' },
    descartado: { label: 'Descartado', color: '#6b7280' },
};

const formatWA = (num) => num.replace(/[\s\-()]/g, '');

const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const getWAMessage = (p) => {
    const text = `Hola ${p.nombre}, te contacto de Click-Go para dar seguimiento a tu solicitud sobre: ${p.interes}. ¿Cómo puedo ayudarte?`;
    return encodeURIComponent(text);
};

/* ── Details Modal ── */
const ProspectoDetailModal = ({ p, onClose }) => {
    const est = ESTADOS[p.estado] || ESTADOS.nuevo;
    return (
        <div className="crm-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="crm-modal detail-modal glass" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="prosp-avatar"><IcoUser /></div>
                    <div>
                        <h3 className="crm-modal-title">{p.nombre} {p.apellido}</h3>
                        <span className="prosp-badge" style={{ '--badge-color': est.color }}>{est.label}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="detail-group">
                        <label>Email</label>
                        <p>{p.correo}</p>
                    </div>
                    <div className="detail-group">
                        <label>WhatsApp</label>
                        <p>{p.whatsapp}</p>
                    </div>
                    <div className="detail-group">
                        <label>Interés / Mensaje</label>
                        <p className="detail-interes">{p.interes}</p>
                    </div>
                    <div className="detail-group">
                        <label>Fecha de Registro</label>
                        <p>{formatDate(p.fecha)}</p>
                    </div>
                </div>

                <div className="crm-modal-actions">
                    <a href={`https://wa.me/${formatWA(p.whatsapp)}?text=${getWAMessage(p)}`} target="_blank" rel="noreferrer" className="prosp-btn prosp-btn-wa">
                        <IcoWA /> Contactar
                    </a>
                    <button className="crm-modal-cancel" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

/* ── Convert Modal ── */
const ConvertModal = ({ prospecto, onConfirm, onClose }) => {
    const [proyecto, setProyecto] = useState('');
    return (
        <div className="crm-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="crm-modal glass" onClick={e => e.stopPropagation()}>
                <h3 className="crm-modal-title">Convertir a Cliente</h3>
                <p className="crm-modal-sub">
                    Se creará un nuevo cliente y un proyecto para <strong>{prospecto.nombre} {prospecto.apellido}</strong>.
                </p>
                <div className="form-group">
                    <label className="crm-modal-label">Nombre del proyecto *</label>
                    <input
                        className="crm-modal-input"
                        placeholder="Ej: Rediseño Industrial S.A."
                        value={proyecto}
                        onChange={e => setProyecto(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="crm-modal-actions">
                    <button className="crm-modal-cancel" onClick={onClose}>Cancelar</button>
                    <button
                        className="crm-modal-confirm"
                        disabled={!proyecto.trim()}
                        onClick={() => onConfirm(proyecto.trim())}
                    >
                        Confirmar Conversión
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Add Prospecto Modal ── */
const AddProspectoModal = ({ onConfirm, onClose }) => {
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        whatsapp: '',
        interes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(form);
        onClose();
    };

    return (
        <div className="crm-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="crm-modal glass" onClick={e => e.stopPropagation()}>
                <h3 className="crm-modal-title">Registrar Nuevo Prospecto</h3>
                <p className="crm-modal-sub">Ingresa los datos del prospecto recibido manualmente.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="crm-modal-label">Nombre *</label>
                            <input
                                className="crm-modal-input"
                                required
                                value={form.nombre}
                                onChange={e => setForm({ ...form, nombre: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="crm-modal-label">Apellido *</label>
                            <input
                                className="crm-modal-input"
                                required
                                value={form.apellido}
                                onChange={e => setForm({ ...form, apellido: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="crm-modal-label">Correo Electrónico *</label>
                        <input
                            type="email"
                            className="crm-modal-input"
                            required
                            value={form.correo}
                            onChange={e => setForm({ ...form, correo: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="crm-modal-label">WhatsApp *</label>
                        <input
                            type="tel"
                            className="crm-modal-input"
                            placeholder="+52 1..."
                            required
                            value={form.whatsapp}
                            onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="crm-modal-label">Interés o Notas</label>
                        <textarea
                            className="crm-modal-input"
                            style={{ minHeight: '80px', resize: 'vertical' }}
                            value={form.interes}
                            onChange={e => setForm({ ...form, interes: e.target.value })}
                        />
                    </div>
                    <div className="crm-modal-actions">
                        <button type="button" className="crm-modal-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="crm-modal-confirm">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/* ── Prospecto Card ── */
const ProspectoCard = ({ p, onDelete, onConvert, onEstado, onDetail }) => {
    const [showConvert, setShowConvert] = useState(false);
    const waUrl = `https://wa.me/${formatWA(p.whatsapp)}?text=${getWAMessage(p)}`;
    const est = ESTADOS[p.estado] || ESTADOS.nuevo;

    return (
        <>
            <div className="prosp-card glass">
                <div className="prosp-card-header">
                    <div className="prosp-avatar" aria-hidden="true"><IcoUser /></div>
                    <div className="prosp-info">
                        <h3 className="prosp-name">{p.nombre} {p.apellido}</h3>
                        <a className="prosp-email" href={`mailto:${p.correo}`}><IcoMail /> {p.correo}</a>
                    </div>
                    <span className="prosp-badge" style={{ '--badge-color': est.color }}>{est.label}</span>
                </div>

                <p className="prosp-interes">
                    {p.interes ? (p.interes.length > 90 ? p.interes.slice(0, 90) + '…' : p.interes) : 'Sin mensaje'}
                </p>

                <div className="prosp-meta">
                    <span className="prosp-date">{formatDate(p.fecha).split(',')[0]}</span>
                    <span className="prosp-phone">{p.whatsapp}</span>
                </div>

                <div className="prosp-controls">
                    <CustomSelect
                        className="prosp-status-select-container"
                        options={Object.entries(ESTADOS).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))}
                        value={p.estado}
                        onChange={val => onEstado(p.id, val)}
                    />
                </div>

                <div className="prosp-actions">
                    <button className="prosp-btn prosp-btn-info" onClick={() => onDetail(p)} title="Ver detalles">
                        <IcoInfo />
                    </button>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="prosp-btn prosp-btn-wa">
                        <IcoWA /> WhatsApp
                    </a>
                    <button className="prosp-btn prosp-btn-convert" onClick={() => setShowConvert(true)} title="Convertir a cliente">
                        <IcoConvert />
                    </button>
                    <button className="prosp-btn prosp-btn-delete" onClick={() => onDelete(p.id)} title="Eliminar">
                        <IcoTrash />
                    </button>
                </div>
            </div>

            {showConvert && (
                <ConvertModal
                    prospecto={p}
                    onClose={() => setShowConvert(false)}
                    onConfirm={(proy) => {
                        onConvert(p, proy);
                        setShowConvert(false);
                    }}
                />
            )}
        </>
    );
};

/* ── Main Tab ── */
const ProspectosTab = () => {
    const { prospectos, addProspecto, deleteProspecto, updateProspectoEstado, convertirACliente } = useCRM();
    const [search, setSearch] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [showAdd, setShowAdd] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
    const [selectedProspecto, setSelectedProspecto] = useState(null);

    const filtered = prospectos.filter(p => {
        const q = search.toLowerCase();
        const matchSearch =
            p.nombre.toLowerCase().includes(q) ||
            p.apellido.toLowerCase().includes(q) ||
            p.correo.toLowerCase().includes(q) ||
            p.whatsapp.includes(q);
        const matchEstado = filterEstado === 'todos' || p.estado === filterEstado;
        return matchSearch && matchEstado;
    });

    return (
        <div className="prosp-tab">
            <div className="prosp-toolbar">
                <div className="prosp-search-wrap">
                    <IcoSearch />
                    <input
                        className="prosp-search"
                        placeholder="Buscar prospectos…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <CustomSelect
                    className="prosp-filter"
                    options={[
                        { value: 'todos', label: 'Todos los estados' },
                        ...Object.entries(ESTADOS).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))
                    ]}
                    value={filterEstado}
                    onChange={val => setFilterEstado(val)}
                />
                <div className="prosp-count">
                    <span>{filtered.length}</span> prospectos
                </div>

                <div className="view-toggle-btns glass">
                    <button
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Vista Cuadrícula"
                    >
                        <IcoGrid />
                    </button>
                    <button
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="Vista Lista"
                    >
                        <IcoList />
                    </button>
                </div>
                <button className="prosp-btn-add glass" onClick={() => setShowAdd(true)}>
                    + Nuevo Prospecto
                </button>
            </div>

            {showAdd && (
                <AddProspectoModal
                    onClose={() => setShowAdd(false)}
                    onConfirm={(data) => addProspecto(data, { manual: true })}
                />
            )}

            {selectedProspecto && <ProspectoDetailModal p={selectedProspecto} onClose={() => setSelectedProspecto(null)} />}

            {filtered.length === 0 ? (
                <div className="prosp-empty">
                    <p>No se encontraron prospectos.</p>
                </div>
            ) : (
                viewMode === 'grid' ? (
                    <div className="prosp-grid">
                        {filtered.map(p => (
                            <ProspectoCard
                                key={p.id}
                                p={p}
                                onDelete={deleteProspecto}
                                onConvert={convertirACliente}
                                onEstado={updateProspectoEstado}
                                onDetail={setSelectedProspecto}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="prosp-list-view glass">
                        <div className="prosp-table-wrap">
                            <table className="prosp-table">
                                <thead>
                                    <tr>
                                        <th>Prospecto</th>
                                        <th>Interés</th>
                                        <th>Fecha</th>
                                        <th style={{ width: '180px' }}>Estado</th>
                                        <th style={{ textAlign: 'right' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(p => (
                                        <tr key={p.id} className="prosp-row">
                                            <td>
                                                <div className="prosp-list-user">
                                                    <div className="prosp-list-avatar">
                                                        {p.nombre[0]}{p.apellido ? p.apellido[0] : ''}
                                                    </div>
                                                    <div className="prosp-list-name-wrap">
                                                        <strong>{p.nombre} {p.apellido}</strong>
                                                        <span>{p.correo}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="prosp-list-interes-box" title={p.interes || ''}>
                                                    {p.interes || 'Sin mensaje'}
                                                </div>
                                            </td>
                                            <td><span className="prosp-list-date">{new Date(p.fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}</span></td>
                                            <td style={{ width: '180px' }}>
                                                <CustomSelect
                                                    options={Object.entries(ESTADOS).map(([k, v]) => ({ value: k, label: v.label, color: v.color }))}
                                                    value={p.estado}
                                                    onChange={val => updateProspectoEstado(p.id, val)}
                                                />
                                            </td>
                                            <td>
                                                <div className="prosp-list-actions">
                                                    <button className="prosp-list-btn" onClick={() => setSelectedProspecto(p)} title="Ver detalles"><IcoEye /></button>
                                                    <button className="prosp-list-btn delete" onClick={() => deleteProspecto(p.id)} title="Eliminar"><IcoTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default ProspectosTab;
