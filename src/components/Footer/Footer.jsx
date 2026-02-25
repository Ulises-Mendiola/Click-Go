import React from 'react';
import Link from 'next/link';
import useScrollReveal from '../../hooks/useScrollReveal';
import { useCRM } from '../../context/CRMContext';
import './Footer.css';

/* ── SVG Icons ── */
const IconFacebook = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);
const IconInstagram = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);
const IconLinkedIn = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const IconGitHub = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);
const IconWhatsApp = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);
const IconMail = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const IconMapPin = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
);
const IconAdmin = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
    </svg>
);

const Footer = () => {
    const { config } = useCRM();
    const ctaRef = useScrollReveal({ threshold: 0.2 });
    const colsRef = useScrollReveal({ threshold: 0.1 });
    const bottomRef = useScrollReveal({ threshold: 0.3 });

    const socialIcons = {
        facebook: <IconFacebook />,
        instagram: <IconInstagram />,
        linkedin: <IconLinkedIn />,
        github: <IconGitHub />,
    };

    return (
        <footer className="footer" aria-label="Pie de página">
            <div className="container">
                <div className="footer-columns reveal-up stagger" ref={colsRef}>

                    {/* Col 1 — Brand */}
                    <div className="footer-col footer-brand-col">
                        <Link href="#home" className="footer-logo" aria-label="Click & Go – Inicio">
                            {config?.logo_url ? (
                                <img src={config.logo_url} alt="Logo" className="footer-logo-img" />
                            ) : (
                                <>Click <span className="text-gradient">&amp; Go</span></>
                            )}
                        </Link>
                        <p className="footer-tagline">
                            Estrategia, diseño y desarrollo<br />que convierten visitas en clientes.
                        </p>
                        <nav className="social-links" aria-label="Redes sociales">
                            {config?.redes && Object.keys(config.redes).map(red => (
                                config.redes[red].enabled && (
                                    <a key={red} href={config.redes[red].url} target="_blank" rel="noopener noreferrer" className="social-icon glass" aria-label={red}>
                                        {socialIcons[red]}
                                    </a>
                                )
                            ))}
                        </nav>
                    </div>

                    {/* Col 2 — Servicios */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Servicios</h4>
                        <ul className="footer-links" aria-label="Servicios">
                            <li><a href="#services">Landing Pages</a></li>
                            <li><a href="#services">CMS &amp; CRM</a></li>
                            <li><a href="#services">UX/UI Premium</a></li>
                            <li><a href="#services">Performance Web</a></li>
                            <li><a href="#services">Mobile-First Design</a></li>
                        </ul>
                    </div>

                    {/* Col 3 — Empresa */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Empresa</h4>
                        <ul className="footer-links" aria-label="Empresa">
                            <li><a href="#home">Inicio</a></li>
                            <li><a href="#services">Servicios</a></li>
                            <li><a href="#process">Metodología</a></li>
                            <li><a href="#contact">Contacto</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                        </ul>
                    </div>

                    {/* Col 4 — Contacto */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Contacto</h4>
                        <ul className="footer-contact-list" aria-label="Información de contacto">
                            <li>
                                <span className="contact-icon"><IconMail /></span>
                                <a href="mailto:hola@clickandgo.mx">hola@clickandgo.mx</a>
                            </li>
                            <li>
                                <span className="contact-icon"><IconWhatsApp /></span>
                                <a href={`https://wa.me/${config?.whatsapp || '521XXXXXXXXXX'}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                            </li>
                            <li>
                                <span className="contact-icon"><IconMapPin /></span>
                                <span>México · Remoto Internacional</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="footer-bottom reveal-up" ref={bottomRef}>
                    <p className="footer-copy">
                        © {new Date().getFullYear()} <strong>Click &amp; Go</strong>. Todos los derechos reservados.
                    </p>

                    <p className="footer-made">Hecho con 💖 en Mazatlán, Sinaloa, México</p>

                    <div className="footer-bottom-right">
                        <Link
                            href="/login"
                            className="admin-btn glass"
                            id="admin-panel-btn"
                            aria-label="Panel Administrativo"
                        >
                            <IconAdmin />
                            Panel Administrativo
                        </Link>
                        <p className="footer-credit">
                            DISEÑADO Y DESARROLLADO POR&nbsp;
                            <a href="#home" className="credit-brand">CLICK <span className="text-gradient">&amp;</span> GO</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
