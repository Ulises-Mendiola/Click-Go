import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import './ProyectosTab.css';

/* ── Icons ── */
const IcoCamera = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
);
const IcoSearch = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const IcoPlus = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);
const IcoTrash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
);
const IcoEdit = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const MOCK_IMAGE = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400";

const PROJECT_STATUSES = [
    { label: 'En proceso', value: 'en proceso', color: '#2563eb' },
    { label: 'En revisión', value: 'en revisión', color: '#d97706' },
    { label: 'Pausado', value: 'pausado', color: '#6b7280' },
    { label: 'Finalizado', value: 'finalizado', color: '#16a34a' },
];

const AVAILABLE_TAGS = ['CRM', 'CMS', 'LANDINGPAGE', 'SaaS', 'PWA'];

const ProyectosTab = () => {
    const { proyectos, addProyecto, updateProyecto, deleteProyecto } = useCRM();
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [formData, setFormData] = useState({
        nombre: '', cliente: '', empresa: '', descripcion: '', enlace: '',
        imagenes: [], inicio: '', fin: '', estado: 'en proceso', tags: []
    });

    const filtered = proyectos.filter(p => {
        const q = search.toLowerCase();
        const matchSearch =
            p.nombre.toLowerCase().includes(q) ||
            p.cliente.toLowerCase().includes(q) ||
            (p.empresa && p.empresa.toLowerCase().includes(q));
        const matchEstado = filterEstado === 'todos' || p.estado === filterEstado;
        return matchSearch && matchEstado;
    });

    const openCreate = () => {
        setFormData({
            nombre: '', cliente: '', empresa: '', descripcion: '', enlace: '',
            imagenes: [], inicio: new Date().toISOString().slice(0, 10), fin: '', estado: 'en proceso', tags: []
        });
        setIsEditing(null);
        setShowModal(true);
    };

    const openEdit = (p) => {
        setFormData({
            ...p,
            tags: p.tags || []
        });
        setIsEditing(p.id);
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateProyecto(isEditing, formData);
        } else {
            addProyecto(formData);
        }
        setShowModal(false);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imagenes: [...prev.imagenes, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const toggleTag = (tag) => {
        setFormData(prev => {
            const currentTags = prev.tags || [];
            return {
                ...prev,
                tags: currentTags.includes(tag)
                    ? currentTags.filter(t => t !== tag)
                    : [...currentTags, tag]
            };
        });
    };

    return (
        <div className="proy-tab">
            <div className="proy-toolbar">
                <div className="proy-search-wrap">
                    <IcoSearch />
                    <input
                        className="proy-search"
                        placeholder="Buscar proyectos, clientes o empresas…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="proy-filter-wrap">
                    <CustomSelect
                        options={[
                            { value: 'todos', label: 'Todos los estados', color: 'var(--text-dim)' },
                            ...PROJECT_STATUSES.map(s => ({ value: s.value, label: s.label, color: s.color }))
                        ]}
                        value={filterEstado}
                        onChange={setFilterEstado}
                    />
                </div>

                <button className="proy-add-btn" onClick={openCreate}>
                    <IcoPlus /> Crear Proyecto
                </button>
            </div>

            <div className="proy-grid">
                {filtered.length === 0 ? (
                    <div className="proy-empty">
                        {proyectos.length === 0
                            ? "No hay proyectos registrados. Crea uno nuevo para comenzar."
                            : "No se encontraron proyectos que coincidan con la búsqueda."}
                    </div>
                ) : (
                    filtered.map(p => {
                        const status = PROJECT_STATUSES.find(s => s.value === p.estado) || PROJECT_STATUSES[0];
                        return (
                            <div key={p.id} className="proy-card glass">
                                <div className="proy-card-cover" style={{ backgroundImage: `url(${p.imagenes?.[0] || MOCK_IMAGE})` }}>
                                    <span className="proy-status-badge" style={{ backgroundColor: status.color }}>
                                        {status.label}
                                    </span>
                                </div>
                                <div className="proy-card-body">
                                    <h3 className="proy-card-title">{p.nombre}</h3>
                                    <div className="proy-card-meta">
                                        <p><strong>Cliente:</strong> {p.cliente}</p>
                                        {p.empresa && <p><strong>Empresa:</strong> {p.empresa}</p>}
                                    </div>
                                    <p className="proy-desc">
                                        {p.descripcion ? (p.descripcion.length > 80 ? p.descripcion.slice(0, 80) + '...' : p.descripcion) : 'Sin descripción'}
                                    </p>
                                    <div className="proy-card-footer">
                                        <span className="proy-date">Inicio: {p.inicio}</span>
                                        <div className="proy-card-actions">
                                            <button className="proy-icon-btn edit" onClick={() => openEdit(p)} title="Editar"><IcoEdit /></button>
                                            <button className="proy-icon-btn delete" onClick={() => deleteProyecto(p.id)} title="Eliminar"><IcoTrash /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modal de CRUD */}
            {showModal && (
                <div className="crm-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="crm-modal cms-modal glass" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleSave} className="cms-form">
                            <h3 className="crm-modal-title">{isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>

                            <div className="cms-form-scroll scrollable">
                                <div className="form-group">
                                    <label className="crm-modal-label">Nombre del Proyecto *</label>
                                    <input className="crm-modal-input" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Rediseño Click & Go" />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="crm-modal-label">Primer Nombre del Cliente *</label>
                                        <input className="crm-modal-input" required value={formData.cliente} onChange={e => setFormData({ ...formData, cliente: e.target.value })} placeholder="Nombre" />
                                    </div>
                                    <div className="form-group">
                                        <label className="crm-modal-label">Empresa (Opcional)</label>
                                        <input className="crm-modal-input" value={formData.empresa} onChange={e => setFormData({ ...formData, empresa: e.target.value })} placeholder="Nombre de empresa" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="crm-modal-label">Descripción</label>
                                    <textarea className="crm-modal-input" rows={3} value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} placeholder="Detalles del proyecto..." />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="crm-modal-label">Enlace Final (URL)</label>
                                        <input className="crm-modal-input" value={formData.enlace} onChange={e => setFormData({ ...formData, enlace: e.target.value })} placeholder="https://..." />
                                    </div>
                                    <div className="form-group">
                                        <label className="crm-modal-label">Estado</label>
                                        <CustomSelect
                                            options={PROJECT_STATUSES.map(s => ({ value: s.value, label: s.label, color: s.color }))}
                                            value={formData.estado}
                                            onChange={val => setFormData({ ...formData, estado: val })}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="crm-modal-label">Fecha de Inicio</label>
                                        <input type="date" className="crm-modal-input" value={formData.inicio} onChange={e => setFormData({ ...formData, inicio: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label className="crm-modal-label">Fecha estimada fin</label>
                                        <input type="date" className="crm-modal-input" value={formData.fin} onChange={e => setFormData({ ...formData, fin: e.target.value })} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="crm-modal-label">Etiquetas del Proyecto (Selecciona las que apliquen)</label>
                                    <div className="tags-selector">
                                        {AVAILABLE_TAGS.map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                className={`tag-chip ${(formData.tags || []).includes(tag) ? 'active' : ''}`}
                                                onClick={() => toggleTag(tag)}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="crm-modal-label">Imágenes (Galería)</label>
                                    <div className="cms-upload-box">
                                        <input type="file" id="cms-file" hidden multiple onChange={handleFileChange} />
                                        <label htmlFor="cms-file" className="cms-upload-label">
                                            <IcoCamera /> <span>Añadir imágenes</span>
                                        </label>
                                    </div>
                                    <div className="cms-preview-list">
                                        {formData.imagenes.map((img, i) => (
                                            <div key={i} className="cms-preview-img" style={{ backgroundImage: `url(${img})` }}>
                                                <button type="button" onClick={() => setFormData({ ...formData, imagenes: formData.imagenes.filter((_, idx) => idx !== i) })}>&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="crm-modal-actions">
                                <button type="button" className="crm-modal-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="crm-modal-confirm">Sincronizar Proyecto</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProyectosTab;
