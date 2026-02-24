import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Confidence.css';

const IconShield = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4Z" />
    </svg>
);
const IconTarget = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);
const IconAward = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
);
const IconTelescope = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="2" y1="12" x2="22" y2="12" /><path d="M7 12l2-8 6 8-6 8-2-8Z" />
        <line x1="16" y1="12" x2="22" y2="6" />
    </svg>
);

const values = [
    { Icon: IconShield, title: 'Compromiso Total', description: 'No somos proveedores, somos socios estratégicos en tu crecimiento.' },
    { Icon: IconTarget, title: 'Enfoque en Resultados', description: 'Cada decisión de diseño orientada a generar impacto real en tu negocio.' },
    { Icon: IconAward, title: 'Excelencia Técnica', description: 'Dominamos tecnologías de vanguardia para ofrecerte lo mejor del mercado.' },
    { Icon: IconTelescope, title: 'Visión a Largo Plazo', description: 'Construimos bases digitales sólidas que escalan con tus ambiciones.' },
];

const ValueCard = ({ Icon, title, description, index }) => {
    const ref = useScrollReveal({ threshold: 0.15, delay: index * 100 });
    return (
        <div className="value-card glass reveal-up" ref={ref}>
            <div className="value-icon-wrap" aria-hidden="true"><Icon /></div>
            <h3 className="value-title">{title}</h3>
            <p className="value-description">{description}</p>
        </div>
    );
};

const Confidence = () => {
    const headerRef = useScrollReveal({ threshold: 0.2 });
    const quoteRef = useScrollReveal({ threshold: 0.3, delay: 100 });

    return (
        <section className="confidence" aria-label="Por qué confiar en Click & Go">
            <div className="container">
                <div className="section-header reveal-up" ref={headerRef}>
                    <span className="section-tag">Nuestra Filosofía</span>
                    <h2 className="section-title">
                        Por qué Confiar en <br /><span className="text-gradient">Click & Go</span>
                    </h2>
                </div>
                <div className="confidence-grid stagger">
                    {values.map((v, i) => <ValueCard key={i} {...v} index={i} />)}
                </div>
                <figure className="confidence-quote glass reveal-up" ref={quoteRef}>
                    <blockquote>
                        "En Click &amp; Go, no solo construimos sitios web; construimos activos digitales
                        que trabajan por ti las 24 horas del día."
                    </blockquote>
                    <figcaption>— Ulises, Founder de Click &amp; Go</figcaption>
                </figure>
            </div>
        </section>
    );
};

export default Confidence;
