import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ProblemSolution.css';

const problems = [
    'Sitios lentos que espantan a tus clientes.',
    'Baja conversión y ROI negativo en publicidad.',
    'Sistemas genéricos que no escalan con tu negocio.',
    'Falta de autoridad visual y profesionalismo digital.',
];

const solutions = [
    'Carga ultrarrápida para retención inmediata.',
    'UX estratégico diseñado para convertir visitas en ventas.',
    'Software a medida, escalable y ajustado a tu operación.',
    'Diseño premium que posiciona tu marca como líder.',
];

const ProblemSolution = () => {
    const leftRef = useScrollReveal({ threshold: 0.15 });
    const rightRef = useScrollReveal({ threshold: 0.15, delay: 150 });
    const divRef = useScrollReveal({ threshold: 0.3, delay: 75 });

    return (
        <section className="problem-solution" aria-label="Problema y solución">
            <div className="container">
                <div className="ps-grid">
                    <div className="ps-side problem-side reveal-left" ref={leftRef}>
                        <h2 className="ps-title">El problema de<br /><span style={{ color: '#6b7280' }}>lo genérico</span></h2>
                        <ul className="ps-list" aria-label="Lista de problemas">
                            {problems.map((text, i) => (
                                <li key={i} className="ps-item" style={{ transitionDelay: `${0.05 * i}s` }}>
                                    <span className="ps-icon-x" aria-hidden="true">✗</span>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ps-divider reveal-scale" ref={divRef} aria-hidden="true">
                        <div className="ps-divider-line"></div>
                        <div className="ps-divider-circle glass">VS</div>
                        <div className="ps-divider-line"></div>
                    </div>

                    <div className="ps-side solution-side reveal-right" ref={rightRef}>
                        <h2 className="ps-title">La solución<br /><span className="text-gradient">Click & Go</span></h2>
                        <ul className="ps-list" aria-label="Lista de soluciones">
                            {solutions.map((text, i) => (
                                <li key={i} className="ps-item" style={{ transitionDelay: `${0.05 * i + 0.15}s` }}>
                                    <span className="ps-icon-check" aria-hidden="true">✓</span>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolution;
