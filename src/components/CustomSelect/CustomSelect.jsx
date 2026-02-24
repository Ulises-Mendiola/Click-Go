import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder = 'Seleccionar...', className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || (value === 'todos' ? { label: 'Todos los estados' } : null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select-container ${className} ${isOpen ? 'is-open' : ''}`} ref={containerRef}>
            <button
                type="button"
                className="custom-select-trigger glass"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="current-value">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="select-arrow">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <ul className="custom-select-options glass" role="listbox">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            className={`custom-select-option ${value === opt.value ? 'is-selected' : ''}`}
                            onClick={() => handleSelect(opt.value)}
                            role="option"
                            aria-selected={value === opt.value}
                        >
                            {opt.color && (
                                <span className="option-dot" style={{ backgroundColor: opt.color }}></span>
                            )}
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
