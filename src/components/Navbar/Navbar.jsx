import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'services', 'projects', 'process', 'contact'];
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home', id: 'home' },
    { name: 'Servicios', href: '#services', id: 'services' },
    { name: 'Proyectos', href: '#projects', id: 'projects' },
    { name: 'Metodología', href: '#process', id: 'process' },
    { name: 'Contacto', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="container nav-container">
        <Link href="#home" className="nav-logo" aria-label="Click & Go — Inicio">
          Click <span className="text-gradient">& Go</span>
        </Link>

        <div className="nav-links-desktop">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="nav-cta glass" id="nav-cta-btn">
            Empezar <span aria-hidden="true">→</span>
          </a>
        </div>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileMenuOpen}
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} aria-hidden="true"></span>
        </button>
      </div>

      <div
        className={`nav-mobile-menu glass ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        {navLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            className={`nav-link-mobile ${activeSection === link.id ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a href="#contact" className="nav-cta-mobile" onClick={() => setMobileMenuOpen(false)}>
          Empezar
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
