import React, { useState, useEffect } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { useCRM } from '../../context/CRMContext';
import './ContactForm.css';

const initialState = { nombre: '', apellido: '', correo: '', whatsapp: '', interes: '' };

/* ── Inline SVG Icons ── */
const IconCheck = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const IconZap = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);
const IconTarget = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);
const IconMessage = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const IconLock = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);
const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const ContactForm = () => {
    const { addProspecto } = useCRM();
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState('idle'); // idle, sending, success
    const [isExiting, setIsExiting] = useState(false);
    const [errors, setErrors] = useState({});

    const headerRef = useScrollReveal({ threshold: 0.2 });
    const formRef = useScrollReveal({ threshold: 0.1 });
    const infoRef = useScrollReveal({ threshold: 0.15 });

    const stripEmojis = (val) => val.replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');

    const toTitleCase = (str) => {
        return str.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    };

    const formatWhatsApp = (val) => {
        const digits = val.replace(/\D/g, '').slice(0, 10);
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    };

    const validate = () => {
        const e = {};
        if (!form.nombre.trim()) e.nombre = 'El nombre es requerido.';
        if (!form.apellido.trim()) e.apellido = 'El apellido es requerido.';

        // Strict email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!form.correo.trim() || !emailRegex.test(form.correo))
            e.correo = 'Ingresa un correo válido.';

        const rawWhatsApp = form.whatsapp.replace(/\D/g, '');
        if (rawWhatsApp.length !== 10)
            e.whatsapp = 'Ingresa los 10 dígitos de tu número.';

        if (!form.interes.trim()) e.interes = 'Cuéntanos qué te interesa.';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = stripEmojis(value);

        if (name === 'nombre' || name === 'apellido') {
            // Only letters and spaces, max 50
            sanitizedValue = sanitizedValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '').slice(0, 50);
            sanitizedValue = toTitleCase(sanitizedValue);
        } else if (name === 'whatsapp') {
            sanitizedValue = formatWhatsApp(sanitizedValue);
        } else if (name === 'interes') {
            sanitizedValue = sanitizedValue.slice(0, 300);
        }

        setForm(prev => ({ ...prev, [name]: sanitizedValue }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleCloseSuccess = () => {
        setIsExiting(true);
        setTimeout(() => {
            setStatus('idle');
            setIsExiting(false);
        }, 1200); // Increased time for anticipation + launch
    };

    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                handleCloseSuccess();
            }, 4000); // 4 seconds persistence
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

        setStatus('sending');

        // Simular envío con pequeño delay para el loader
        setTimeout(() => {
            try {
                addProspecto({
                    nombre: form.nombre,
                    apellido: form.apellido,
                    correo: form.correo,
                    whatsapp: form.whatsapp,
                    interes: form.interes
                });
                setStatus('success');
                setIsExiting(false);
                setForm(initialState);
            } catch (err) {
                console.error("Error al guardar prospecto:", err);
                setStatus('idle');
                alert("Hubo un error al enviar tu mensaje. Por favor inténtalo de nuevo.");
            }
        }, 1500);
    };

    return (
        <section id="contact" className="contact-section" aria-label="Sección de contacto">
            <div className="container">
                {status === 'success' && (
                    <div className={`contact-success-overlay ${isExiting ? 'is-exiting' : ''}`}>
                        <div className="contact-success-wrap glass">
                            <div className="success-lottie-mock">
                                <div className="success-circle">
                                    <IconCheck />
                                </div>
                                <div className="success-particles"></div>
                            </div>
                            <h3 className="text-gradient">¡Mensaje Recibido!</h3>
                            <p>Gracias por contactarnos. Nuestro equipo revisará tu propuesta y te contactaremos por WhatsApp lo mas prontoposible</p>
                        </div>
                    </div>
                )}

                <div className="section-header reveal-up" ref={headerRef} style={{ marginBottom: '4rem' }}>
                    <span className="section-tag">Contacto</span>
                    <h2 className="section-title">
                        Hablemos de <span className="text-gradient">tu proyecto.</span>
                    </h2>
                    <p className="contact-intro">
                        Completa el formulario y te respondemos con una propuesta concreta —
                        sin tecnicismos, sin rodeos.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Left — WhatsApp CTA Card */}
                    <div className="contact-info reveal-left" ref={infoRef}>
                        <div className="contact-wa-card glass">
                            <span className="wa-badge">
                                <span className="wa-badge-dot" aria-hidden="true"></span>
                                Atención personalizada
                            </span>

                            <div className="contact-wa-body">
                                <h3 className="contact-wa-title">
                                    ¿Prefieres hablar<br />
                                    <span className="text-gradient">directamente con nosotros?</span>
                                </h3>
                                <p className="contact-wa-sub">
                                    Sin formularios. Sin esperas. Cuéntanos tu idea y te damos una respuesta concreta hoy mismo.
                                </p>
                            </div>

                            <ul className="wa-benefits" aria-label="Beneficios de contactar por WhatsApp">
                                <li className="wa-benefit-item">
                                    <span className="wa-benefit-icon" aria-hidden="true"><IconZap /></span>
                                    <span>Diagnóstico gratuito de tu proyecto</span>
                                </li>
                                <li className="wa-benefit-item">
                                    <span className="wa-benefit-icon" aria-hidden="true"><IconTarget /></span>
                                    <span>Propuesta a medida sin compromiso</span>
                                </li>
                                <li className="wa-benefit-item">
                                    <span className="wa-benefit-icon" aria-hidden="true"><IconMessage /></span>
                                    <span>Asesoría directa con el equipo</span>
                                </li>
                            </ul>

                            <div className="wa-stat-row">
                                <div className="wa-stat">
                                    <span className="wa-stat-value">+40</span>
                                    <span className="wa-stat-label">Proyectos</span>
                                </div>
                                <div className="wa-stat-divider" aria-hidden="true"></div>
                                <div className="wa-stat">
                                    <span className="wa-stat-value">100%</span>
                                    <span className="wa-stat-label">Satisfacción</span>
                                </div>
                                <div className="wa-stat-divider" aria-hidden="true"></div>
                                <div className="wa-stat">
                                    <span className="wa-stat-value">&lt;30d</span>
                                    <span className="wa-stat-label">Entrega</span>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/521XXXXXXXXXX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                                id="contact-wa-btn"
                            >
                                <WhatsAppIcon />
                                Hablemos por WhatsApp
                                <span className="wa-arrow" aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <form
                        className="contact-form glass reveal-right"
                        onSubmit={handleSubmit}
                        ref={formRef}
                        noValidate
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="nombre" className="form-label">Nombre *</label>
                                <input id="nombre" name="nombre" type="text" className={`form-input ${errors.nombre ? 'error' : ''}`}
                                    placeholder="Tu nombre" value={form.nombre} onChange={handleChange} autoComplete="given-name" maxLength={50} />
                                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido" className="form-label">Apellido *</label>
                                <input id="apellido" name="apellido" type="text" className={`form-input ${errors.apellido ? 'error' : ''}`}
                                    placeholder="Tu apellido" value={form.apellido} onChange={handleChange} autoComplete="family-name" maxLength={50} />
                                {errors.apellido && <span className="form-error">{errors.apellido}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="correo" className="form-label">Email *</label>
                                <input id="correo" name="correo" type="email" className={`form-input ${errors.correo ? 'error' : ''}`}
                                    placeholder="tu@correo.com" value={form.correo} onChange={handleChange} autoComplete="email" />
                                {errors.correo && <span className="form-error">{errors.correo}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="whatsapp" className="form-label">WhatsApp *</label>
                                <input id="whatsapp" name="whatsapp" type="tel" className={`form-input ${errors.whatsapp ? 'error' : ''}`}
                                    placeholder="+52 1 123 456 7890" value={form.whatsapp} onChange={handleChange} autoComplete="tel" />
                                {errors.whatsapp && <span className="form-error">{errors.whatsapp}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="interes" className="form-label">¿Qué te interesa? *</label>
                            <textarea id="interes" name="interes"
                                className={`form-input form-textarea ${errors.interes ? 'error' : ''}`}
                                placeholder="Describe tu proyecto o dudas…"
                                rows={4} value={form.interes} onChange={handleChange} maxLength={300} />
                            {errors.interes && <span className="form-error">{errors.interes}</span>}
                        </div>

                        <button
                            type="submit"
                            className={`btn-primary form-submit ${status === 'sending' ? 'loading' : ''}`}
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? (
                                <><span className="spinner"></span> Enviando…</>
                            ) : (
                                <>Enviar mensaje <span className="btn-arrow">→</span></>
                            )}
                        </button>

                        <p className="form-disclaimer">
                            <IconLock /> Tu información es privada y segura.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
