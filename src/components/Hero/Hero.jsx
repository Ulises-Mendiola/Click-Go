import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (parallaxRef.current) {
                const shape1 = parallaxRef.current.querySelector('.shape-1');
                const shape2 = parallaxRef.current.querySelector('.shape-2');
                if (shape1) shape1.style.transform = `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`;
                if (shape2) shape2.style.transform = `translateY(${scrollY * -0.2}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        const timer = setTimeout(() => {
            document.querySelector('.hero-content')?.classList.add('visible');
        }, 100);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section id="home" className="hero" ref={parallaxRef} aria-label="Sección principal">
            <div className="hero-background" aria-hidden="true">
                <div className="hero-shape shape-1"></div>
                <div className="hero-shape shape-2"></div>
                <div className="hero-grid"></div>
                <div className="hero-orb orb-1"></div>
                <div className="hero-orb orb-2"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-tag" aria-label="Categoría">Landing Pages & Sistemas de Conversión</div>

                <h1 className="hero-title">
                    Tu negocio merece un <br />
                    <span className="text-gradient">sitio que venda,</span> <br />
                    no solo que exista.
                </h1>

                <p className="hero-subtitle">
                    Diseñamos y desarrollamos landing pages de alta conversión y sistemas de gestión
                    personalizados en menos de 30 días — con resultados medibles desde el primer mes.
                </p>

                {/* CTA Hierarchy: Primary > Secondary */}
                <div className="hero-ctas">
                    <a href="#contact" className="btn-primary" id="hero-cta-primary">
                        Quiero resultados ahora <span className="btn-arrow" aria-hidden="true">→</span>
                    </a>
                    <a href="#services" className="btn-outline glass" id="hero-cta-secondary">
                        Ver cómo lo hacemos
                    </a>
                </div>

                {/* Trust Badge */}
                <div className="hero-trust">
                    <span className="trust-icon" aria-hidden="true">✓</span>
                    <span>Sin contratos largos</span>
                    <span className="trust-sep" aria-hidden="true">·</span>
                    <span className="trust-icon" aria-hidden="true">✓</span>
                    <span>Entrega en 30 días</span>
                    <span className="trust-sep" aria-hidden="true">·</span>
                    <span className="trust-icon" aria-hidden="true">✓</span>
                    <span>Soporte continuo incluido</span>
                </div>

                {/* Metrics */}
                <div className="hero-metrics" role="list" aria-label="Estadísticas clave">
                    <div className="metric" role="listitem">
                        <span className="metric-value">+40%</span>
                        <span className="metric-label">Conversión promedio</span>
                    </div>
                    <div className="metric-divider" aria-hidden="true"></div>
                    <div className="metric" role="listitem">
                        <span className="metric-value">30d</span>
                        <span className="metric-label">Tiempo de entrega</span>
                    </div>
                    <div className="metric-divider" aria-hidden="true"></div>
                    <div className="metric" role="listitem">
                        <span className="metric-value">100%</span>
                        <span className="metric-label">A medida & escalable</span>
                    </div>
                </div>
            </div>

            <a href="#services" className="hero-scroll-indicator" aria-label="Ir a servicios">
                <span aria-hidden="true">↓</span>
            </a>
        </section>
    );
};

export default Hero;
