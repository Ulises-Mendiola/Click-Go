import React, { useState, useRef, useCallback } from 'react';
import { useCRM } from '../../context/CRMContext';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Projects.css';

/* ── Tag palette ── */
const tagColors = {
    'Landing Page': '#9333ea',
    'CRM': '#7c3aed',
    'CMS': '#c026d3',
    'E-commerce': '#0ea5e9',
    'Branding': '#f59e0b',
    'Dashboard': '#10b981',
    'LANDINGPAGE': '#9333ea',
    'SaaS': '#3b82f6',
    'PWA': '#f59e0b',
};

const IconExternal = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);
const IconChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
);
const IconChevronRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const IconLink = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

/* ── Detail Modal ── */
const ProjectDetailModal = ({ project, onClose }) => {
    return (
        <div className="project-detail-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="project-detail-modal glass" onClick={e => e.stopPropagation()}>
                <header className="modal-top">
                    <div className="modal-hero-wrap">
                        {project.imagenes?.[0] ? (
                            <div className="modal-hero-img" style={{ backgroundImage: `url(${project.imagenes[0]})` }} />
                        ) : (
                            <div className="modal-hero-bg" style={{ background: project.gradient || 'var(--primary-gradient)' }}>
                                <span className="modal-hero-emoji">{project.emoji || '🚀'}</span>
                            </div>
                        )}
                    </div>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">&times;</button>
                </header>

                <div className="modal-body-grid">
                    <section className="modal-main-content">
                        <div className="modal-header-info">
                            <h2 className="modal-title">{project.nombre || project.title}</h2>
                            <div className="modal-badges">
                                {(project.tags || ['Desarrollo Web']).map(t => (
                                    <span key={t} className="project-tag" style={{ '--tag-color': tagColors[t] || '#c084fc' }}>{t}</span>
                                ))}
                                <span className="status-pill">{project.estado || 'Finalizado'}</span>
                            </div>
                        </div>

                        <div className="modal-description-section">
                            <h3>Visión General</h3>
                            <p>{project.descripcion || project.description}</p>
                        </div>

                        {project.imagenes?.length > 0 && (
                            <div className="modal-gallery-section">
                                <h3>Galería del Proyecto</h3>
                                <div className="modal-gallery-grid">
                                    {project.imagenes.map((img, i) => (
                                        <div key={i} className="gallery-item glass">
                                            <img src={img} alt={`Vista previa ${i + 1}`} loading="lazy" />
                                        </div>
                                    ))}
                                    {/* Placeholder if only 1 image or none */}
                                    {project.imagenes.length < 2 && (
                                        <div className="gallery-item glass placeholder">
                                            <div className="placeholder-content">
                                                <span>Preview</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    <aside className="modal-sidebar">
                        <div className="sidebar-group">
                            <label>Cliente</label>
                            <div className="sidebar-val">{project.cliente || project.empresa || 'Click & Go User'}</div>
                        </div>

                        <div className="sidebar-group">
                            <label>Servicios</label>
                            <div className="sidebar-tags">
                                {(project.tags || []).map(t => <span key={t}>{t}</span>)}
                            </div>
                        </div>

                        <div className="sidebar-group">
                            <label>Año</label>
                            <div className="sidebar-val">{project.inicio?.split('-')[0] || '2026'}</div>
                        </div>

                        {project.enlace && (
                            <div className="sidebar-group">
                                <label>Sitio Web</label>
                                <a href={project.enlace} target="_blank" rel="noopener noreferrer" className="sidebar-link">
                                    Visitar sitio <IconLink />
                                </a>
                            </div>
                        )}

                        <div className="sidebar-footer-cta">
                            <p>¿Te gusta este resultado?</p>
                            <a href="#contact" className="modal-cta-btn" onClick={onClose}>
                                Iniciar mi proyecto
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const { proyectos } = useCRM();
    const [current, setCurrent] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const trackRef = useRef(null);
    const headerRef = useScrollReveal({ threshold: 0.2 });

    // Merging initial mock data with CRM data
    const staticProjects = [
        { id: 's1', title: 'Renova Inmobiliaria', tags: ['Landing Page', 'CRM'], emoji: '🏠', gradient: 'linear-gradient(135deg, #9333ea 0%, #c026d3 100%)', result: '+40% leads', description: 'Landing de alta conversión con sistema de gestión de prospectos integrado. Aumentó leads calificados en un 40% en el primer mes.', cliente: 'Renova S.A.' },
        { id: 's2', title: 'LogiExpress MX', tags: ['Dashboard', 'CMS'], emoji: '🚚', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)', result: '-60% tiempo manual', description: 'Panel de control logístico con seguimiento en tiempo real, gestión de rutas y reportes automáticos.', cliente: 'LogiExpress' },
    ];

    const displayProjects = [
        ...proyectos.map(p => ({
            ...p,
            title: p.nombre,
            emoji: '🚀',
            gradient: p.estado === 'finalizado' ? 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)' : 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
            result: p.estado.toUpperCase(),
            tags: (p.tags && p.tags.length > 0) ? p.tags : ['Desarrollo Web']
        })),
        ...staticProjects
    ];

    const total = displayProjects.length;
    const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
    const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

    const onDragEnd = (e) => {
        if (!dragging) return;
        setDragging(false);
        const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
        const diff = dragStartX - endX;
        if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
    };

    return (
        <section id="projects" className="projects" aria-label="Proyectos realizados">
            <div className="container">
                <div className="section-header reveal-up" ref={headerRef}>
                    <span className="section-tag">Portafolio</span>
                    <h2 className="section-title">
                        Proyectos que <span className="text-gradient">hablan por sí solos.</span>
                    </h2>
                    <p className="contact-intro">Explora nuestro trabajo más reciente gestionado dinámicamente.</p>
                </div>

                <div className="projects-carousel"
                    onMouseDown={e => { setDragging(true); setDragStartX(e.clientX) }}
                    onMouseUp={onDragEnd}
                    onMouseLeave={() => setDragging(false)}
                    onTouchStart={e => { setDragging(true); setDragStartX(e.touches[0].clientX) }}
                    onTouchEnd={onDragEnd}
                >
                    <div className="projects-track" style={{ transform: `translateX(calc(-${current * 100}% - ${current * 1.5}rem))` }}>
                        {displayProjects.map((p, i) => (
                            <article key={p.id} className={`project-card glass ${i === current ? 'active' : ''}`}>
                                <div className="project-card-header" style={{ background: p.imagenes?.[0] ? `url(${p.imagenes[0]}) center/cover no-repeat` : p.gradient }}>
                                    {!p.imagenes?.[0] && <span className="project-emoji">{p.emoji}</span>}
                                    <span className="project-result-badge">{p.result}</span>
                                </div>
                                <div className="project-card-body">
                                    <div className="project-tags">
                                        {(p.tags || []).map(tag => (
                                            <span key={tag} className="project-tag" style={{ '--tag-color': tagColors[tag] || '#c084fc' }}>{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="project-title">{p.title}</h3>
                                    <p className="project-description">{p.description || p.descripcion}</p>
                                    <button className="project-cta" onClick={() => setSelectedProject(p)}>
                                        Ver detalles <IconExternal />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="projects-controls">
                    <button className="carousel-btn glass" onClick={prev}><IconChevronLeft /></button>
                    <div className="carousel-dots">
                        {displayProjects.map((_, i) => (
                            <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
                        ))}
                    </div>
                    <button className="carousel-btn glass" onClick={next}><IconChevronRight /></button>
                </div>
            </div>

            {selectedProject && (
                <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
};

export default Projects;
