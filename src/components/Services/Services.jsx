import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Services.css';

/* ── SVG icon set — one per service ── */
const IconRocket = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.5-1 4 0 5s3.5 1 5 0l6-6m-11-6 6-6c1.5-1.5 4-1 5 0s1.5 3.5 0 5l-6 6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);
const IconGear = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.701-1.112L12.7 2h-1.4l-.864 2.371-2.7 1.112L6 4 4 6l1.47 1.745-1.098 2.65L2 11.3v1.4l2.381.857 1.098 2.651L4 18l2 2 1.735-1.483 2.7 1.112.871 2.371h1.4l.871-2.371 2.7-1.112L18 20l2-2-1.47-1.745 1.097-2.651L22 12.7v-1.4l-2.378-.905Z" />
    </svg>
);
const IconTrend = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
);
const IconZap = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
const IconLayout = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
);
const IconMobile = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
);

const services = [
    {
        Icon: IconRocket,
        title: 'Landing Pages de Alta Conversión',
        description: 'Diseñamos experiencias que guían al usuario hacia la acción, maximizando tu ROI desde el primer clic.',
        detail: 'UX Strategy · A/B Testing · Analytics',
        size: 'large',
    },
    {
        Icon: IconGear,
        title: 'CMS & CRM Personalizados',
        description: 'Sistemas a medida que simplifican tu gestión y escalan con tu negocio.',
        detail: 'Sin suscripciones externas. Tuyo 100%.',
        size: 'medium',
    },
    {
        Icon: IconTrend,
        title: 'Estrategia de Conversión',
        description: 'Optimizamos cada punto de contacto para convertir más sin aumentar tu presupuesto.',
        detail: 'Auditoría · Implementación · Seguimiento',
        size: 'small',
    },
    {
        Icon: IconZap,
        title: 'Performance & Velocidad',
        description: 'Carga ultrarrápida — 95+ en Core Web Vitals garantizado.',
        detail: '+40% retención con carga menor a 2s',
        size: 'small',
    },
    {
        Icon: IconLayout,
        title: 'UX/UI de Nivel Premium',
        description: 'Interfaces intuitivas que generan confianza y autoridad de marca.',
        detail: 'Design system completo incluido',
        size: 'medium',
    },
    {
        Icon: IconMobile,
        title: 'Mobile-First Design',
        description: 'Experiencia impecable en cualquier dispositivo, desde el primer pixel.',
        detail: 'Más del 60% del tráfico es móvil.',
        size: 'medium',
    },
];

const ServiceCard = ({ Icon, title, description, detail, size, index }) => {
    const ref = useScrollReveal({ threshold: 0.1, delay: index * 80 });
    return (
        <article className={`service-card glass reveal-scale ${size}`} ref={ref}>
            <div className="service-icon-wrap">
                <Icon />
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-description">{description}</p>
            <p className="service-detail">{detail}</p>
        </article>
    );
};

const Services = () => {
    const headerRef = useScrollReveal({ threshold: 0.2 });
    return (
        <section id="services" className="services" aria-label="Servicios">
            <div className="container">
                <div className="section-header reveal-up" ref={headerRef}>
                    <span className="section-tag">Nuestros Servicios</span>
                    <h2 className="section-title">
                        Soluciones que <br />
                        <span className="text-gradient">generan resultados reales.</span>
                    </h2>
                </div>
                <div className="services-grid stagger">
                    {services.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
                </div>
            </div>
        </section>
    );
};

export default Services;
