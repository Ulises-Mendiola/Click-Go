import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './LoginPage.css';

const VALID_USER = 'Ulises';
const VALID_PASS = '123456';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (username === VALID_USER && password === VALID_PASS) {
                router.push('/dashboard');
            } else {
                setError('Usuario o contraseña incorrectos.');
                setLoading(false);
            }
        }, 700);
    };

    return (
        <div className="login-page">
            {/* Fondo con orbes igual que el hero */}
            <div className="login-bg">
                <div className="login-orb login-orb-1" aria-hidden="true" />
                <div className="login-orb login-orb-2" aria-hidden="true" />
                <div className="login-orb login-orb-3" aria-hidden="true" />
                <div className="login-grid" aria-hidden="true" />
            </div>

            <div className="login-card glass">
                {/* Logo */}
                <Link href="/" className="login-logo" aria-label="Click & Go — Inicio">
                    Click <span className="text-gradient">&amp; Go</span>
                </Link>
                <p className="login-subtitle">Panel Administrativo</p>

                {/* Formulario */}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className="login-field">
                        <label htmlFor="login-user" className="login-label">Usuario</label>
                        <input
                            id="login-user"
                            type="text"
                            className="login-input"
                            placeholder="Tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="login-pass" className="login-label">Contraseña</label>
                        <input
                            id="login-pass"
                            type="password"
                            className="login-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error" role="alert">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`login-btn ${loading ? 'login-btn--loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="login-spinner" aria-hidden="true" />
                                Verificando...
                            </>
                        ) : (
                            <>
                                Ingresar <span aria-hidden="true">→</span>
                            </>
                        )}
                    </button>
                </form>

                <Link href="/" className="login-back">
                    ← Volver a la landing
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
