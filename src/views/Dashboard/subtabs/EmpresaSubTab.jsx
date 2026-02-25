import React, { useState } from 'react';
import { useCRM } from '../../../context/CRMContext';
import { uploadImageAction } from '@/app/actions';

const IcoCamera = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
);

const EmpresaSubTab = () => {
    const { config, updateConfig } = useCRM();
    const [formData, setFormData] = useState(config || {
        logo_url: '',
        whatsapp: '',
        redes: {
            facebook: { url: '', enabled: false },
            instagram: { url: '', enabled: false },
            linkedin: { url: '', enabled: false },
            github: { url: '', enabled: false }
        }
    });

    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('file', file);
        const res = await uploadImageAction(data);
        if (res.success) {
            setFormData(prev => ({ ...prev, logo_url: res.url }));
        }
    };

    const toggleRed = (red) => {
        setFormData(prev => ({
            ...prev,
            redes: {
                ...prev.redes,
                [red]: { ...prev.redes[red], enabled: !prev.redes[red].enabled }
            }
        }));
    };

    const handleRedLocal = (red, url) => {
        setFormData(prev => ({
            ...prev,
            redes: {
                ...prev.redes,
                [red]: { ...prev.redes[red], url }
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateConfig(formData);
    };

    return (
        <div className="conf-subtab fade-in">
            <form onSubmit={handleSubmit} className="conf-form-full">
                <div className="conf-grid">
                    {/* Identidad */}
                    <div className="conf-card glass">
                        <div className="conf-card-header">
                            <h3>Identidad Visual</h3>
                            <p>Controla cómo se ve tu marca en la landing y el favicon.</p>
                        </div>

                        <div className="logo-upload-section">
                            <div className="logo-preview-big" style={{ backgroundImage: `url(${formData.logo_url})` }}>
                                {!formData.logo_url && <span>Sin Logo</span>}
                            </div>
                            <div className="logo-upload-controls">
                                <input type="file" id="logo-input" hidden onChange={handleLogoChange} accept="image/*" />
                                <label htmlFor="logo-input" className="proy-add-btn small">
                                    <IcoCamera /> Cambiar Logo
                                </label>
                                <p className="input-hint">Se recomienda PNG transparente 512x512px.</p>
                            </div>
                        </div>

                        <div className="form-group mt-20">
                            <label>WhatsApp de la Empresa</label>
                            <input
                                type="text"
                                className="crm-modal-input"
                                placeholder="Ej: 521XXXXXXXXXX"
                                value={formData.whatsapp}
                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                            />
                            <span className="input-hint">Usa el formato internacional sin símbolos.</span>
                        </div>
                    </div>

                    {/* Redes Sociales */}
                    <div className="conf-card glass">
                        <div className="conf-card-header">
                            <h3>Redes Sociales</h3>
                            <p>Habilita las redes que quieres mostrar en el footer.</p>
                        </div>

                        <div className="redes-list">
                            {Object.keys(formData.redes).map(red => (
                                <div key={red} className="red-item">
                                    <div className="red-header">
                                        <span className="red-name">{red.charAt(0).toUpperCase() + red.slice(1)}</span>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={formData.redes[red].enabled}
                                                onChange={() => toggleRed(red)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        className={`crm-modal-input ${!formData.redes[red].enabled ? 'disabled' : ''}`}
                                        placeholder={`URL de ${red}`}
                                        disabled={!formData.redes[red].enabled}
                                        value={formData.redes[red].url}
                                        onChange={e => handleRedLocal(red, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="conf-sticky-footer">
                    <button type="submit" className="proy-add-btn large">Publicar Cambios Globales</button>
                </div>
            </form>
        </div>
    );
};

export default EmpresaSubTab;
