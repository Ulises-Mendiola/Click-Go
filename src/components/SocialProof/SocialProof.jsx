import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './SocialProof.css';

const metrics = [
    { value: '+40%', label: 'Aumento de conversión', sublabel: 'promedio en clientes activos' },
    { value: '30d', label: 'Tiempo de entrega', sublabel: 'desde brief hasta lanzamiento' },
    { value: '95+', label: 'Lighthouse Score', sublabel: 'performance y accesibilidad' },
    { value: '100%', label: 'Satisfacción', sublabel: 'en proyectos entregados' },
];

const testimonials = [
    {
        quote: 'Click & Go transformó nuestra forma de capturar leads. En dos semanas teníamos el doble de consultas.',
        author: 'Laura R.',
        role: 'CEO, Inmobiliaria Renova',
        initials: 'LR',
        color: '#9333ea',
    },
    {
        quote: 'El sistema de gestión que nos desarrollaron eliminó horas de trabajo manual. Ahora todo fluye solo.',
        author: 'Diego M.',
        role: 'Fundador, LogiExpress MX',
        initials: 'DM',
        color: '#c026d3',
    },
    {
        quote: 'Sabían exactamente lo que necesitábamos antes de que nosotros lo supiéramos. Trabajo de primer nivel.',
        author: 'Sofía V.',
        role: 'Directora de Marketing, BrandLab',
        initials: 'SV',
        color: '#7c3aed',
    },
];

/* 5-star icon row using pure SVG stars */
const StarRating = () => (
    <div className="testimonial-stars" aria-label="5 de 5 estrellas" role="img">
        {[...Array(5)].map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ))}
    </div>
);

const SocialProof = () => {
    const metricsRef = useScrollReveal({ threshold: 0.15 });
    const testimonialsRef = useScrollReveal({ threshold: 0.1 });
    const headerRef = useScrollReveal({ threshold: 0.2 });

    return (
        <section className="social-proof" aria-label="Resultados y testimonios">
            <div className="container">
                {/* Metrics */}
                <div className="sp-metrics reveal-up" ref={metricsRef} role="list" aria-label="Métricas de resultados">
                    {metrics.map((m, i) => (
                        <div className="sp-metric" key={i} role="listitem">
                            <span className="sp-metric-value text-gradient">{m.value}</span>
                            <span className="sp-metric-label">{m.label}</span>
                            <span className="sp-metric-sub">{m.sublabel}</span>
                        </div>
                    ))}
                </div>

                <div className="section-header reveal-up" ref={headerRef}>
                    <span className="section-tag">Casos de Éxito</span>
                    <h2 className="section-title">
                        Lo que dicen quienes <br />
                        <span className="text-gradient">ya confían en nosotros.</span>
                    </h2>
                </div>

                {/* Testimonials */}
                <div className="testimonials-grid reveal-up stagger" ref={testimonialsRef} role="list" aria-label="Testimonios">
                    {testimonials.map((t, i) => (
                        <figure className="testimonial-card glass" key={i} role="listitem">
                            <StarRating />
                            <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
                            <figcaption className="testimonial-author">
                                <div className="author-avatar" style={{ background: t.color }} aria-hidden="true">
                                    {t.initials}
                                </div>
                                <div>
                                    <strong className="author-name">{t.author}</strong>
                                    <span className="author-role">{t.role}</span>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
