import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './Methodology.css';

const steps = [
    {
        number: '01',
        title: 'Análisis Estratégico',
        description: 'Entendemos tu negocio, tu mercado y tus objetivos para trazar el camino más corto al éxito.',
    },
    {
        number: '02',
        title: 'Arquitectura UX',
        description: 'Estructuramos la información para garantizar una navegación fluida y una lógica de conversión impecable.',
    },
    {
        number: '03',
        title: 'Diseño UI Premium',
        description: 'Creamos una identidad visual impactante que transmite autoridad y modernidad.',
    },
    {
        number: '04',
        title: 'Desarrollo Optimizado',
        description: 'Código limpio, rápido y escalable. Sin fricciones, solo resultados.',
    },
    {
        number: '05',
        title: 'Lanzamiento e Iteración',
        description: 'Lanzamos, medimos y optimizamos. El crecimiento no se detiene.',
    },
];

const TimelineItem = ({ step, index }) => {
    const isLeft = index % 2 === 0;
    const ref = useScrollReveal({ threshold: 0.2, delay: index * 100 });

    return (
        <div
            className={`timeline-item ${isLeft ? 'left reveal-left' : 'right reveal-right'}`}
            ref={ref}
        >
            <div className="timeline-content glass">
                <span className="step-number-bg" aria-hidden="true">{step.number}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
            </div>
            <div className="timeline-dot" aria-hidden="true"></div>
        </div>
    );
};

const Methodology = () => {
    const headerRef = useScrollReveal({ threshold: 0.2 });

    return (
        <section id="process" className="methodology" aria-label="Metodología">
            <div className="container">
                <div className="section-header reveal-up" ref={headerRef}>
                    <span className="section-tag">Nuestra Metodología</span>
                    <h2 className="section-title">
                        Un Proceso Diseñado <br /> para el <span className="text-gradient">Crecimiento.</span>
                    </h2>
                </div>
                <div className="timeline" role="list">
                    <div className="timeline-line" aria-hidden="true"></div>
                    {steps.map((step, index) => (
                        <TimelineItem key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
