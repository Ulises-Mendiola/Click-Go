import React, { createContext, useContext, useState, useEffect } from 'react';
import { sileo } from 'sileo';

const CRMContext = createContext(null);

/* Datos de muestra para que el CRM no aparezca vacío */
const SEED_PROSPECTOS = [
    {
        id: 'p1',
        nombre: 'Ana',
        apellido: 'García',
        correo: 'ana.garcia@ejemplo.com',
        whatsapp: '+52 1 55 1234 5678',
        interes: 'Landing page para mi negocio de repostería. Quiero vender en línea.',
        fecha: '2026-02-20T10:30:00',
        estado: 'nuevo',
    },
    {
        id: 'p2',
        nombre: 'Carlos',
        apellido: 'Mendoza',
        correo: 'cmendoza@empresa.mx',
        whatsapp: '+52 1 33 9876 5432',
        interes: 'CMS para gestionar mi catálogo de productos. Tengo una tienda fisica.',
        fecha: '2026-02-21T14:15:00',
        estado: 'contactado',
    },
    {
        id: 'p3',
        nombre: 'Laura',
        apellido: 'Torres',
        correo: 'laura@torres.design',
        whatsapp: '+52 1 81 5555 0123',
        interes: 'Diseño UX/UI premium para app móvil. Proyecto en etapa de financiamiento.',
        fecha: '2026-02-22T09:00:00',
        estado: 'en_seguimiento',
    },
];

const SEED_CLIENTES = [
    {
        id: 'c1',
        nombre: 'Marcos',
        apellido: 'Ruiz',
        correo: 'marcos@ruiztech.mx',
        whatsapp: '+52 1 55 7777 8888',
        proyectoId: 'proy1',
        empresa: 'RuizTech',
        inicio: '2026-01-10',
        estado: 'activo',
    },
];

const SEED_PROYECTOS = [
    {
        id: 'proy1',
        nombre: 'Landing Page + CRM',
        cliente: 'Marcos Ruiz',
        empresa: 'RuizTech',
        descripcion: 'Desarrollo de landing page corporativa con sistema de administración de prospectos.',
        enlace: 'https://ejemplo.com/ruiztech',
        imagenes: [],
        inicio: '2026-01-10',
        fin: '2026-02-15',
        estado: 'finalizado',
        tags: ['Landing Page', 'CRM'],
    },
];

export const CRMProvider = ({ children }) => {
    const [prospectos, setProspectos] = useState(() => {
        try {
            const stored = localStorage.getItem('crm_prospectos');
            return stored ? JSON.parse(stored) : SEED_PROSPECTOS;
        } catch { return SEED_PROSPECTOS; }
    });

    const [clientes, setClientes] = useState(() => {
        try {
            const stored = localStorage.getItem('crm_clientes');
            return stored ? JSON.parse(stored) : SEED_CLIENTES;
        } catch { return SEED_CLIENTES; }
    });

    const [proyectos, setProyectos] = useState(() => {
        try {
            const stored = localStorage.getItem('crm_proyectos');
            return stored ? JSON.parse(stored) : SEED_PROYECTOS;
        } catch { return SEED_PROYECTOS; }
    });

    // Sincronización de DATOS entre pestañas
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === 'crm_prospectos' && e.newValue) setProspectos(JSON.parse(e.newValue));
            if (e.key === 'crm_clientes' && e.newValue) setClientes(JSON.parse(e.newValue));
            if (e.key === 'crm_proyectos' && e.newValue) setProyectos(JSON.parse(e.newValue));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem('crm_prospectos', JSON.stringify(prospectos));
    }, [prospectos]);

    useEffect(() => {
        localStorage.setItem('crm_clientes', JSON.stringify(clientes));
    }, [clientes]);

    useEffect(() => {
        localStorage.setItem('crm_proyectos', JSON.stringify(proyectos));
    }, [proyectos]);

    // Notificaciones Cruzadas via BroadcastChannel (Más confiable que storage)
    useEffect(() => {
        const bc = new BroadcastChannel('crm_notifications');
        bc.onmessage = (event) => {
            console.log('Mensaje recibido por BroadcastChannel:', event.data);
            if (event.data.type === 'NEW_PROSPECT') {
                const { nuevo } = event.data;
                sileo.info({
                    title: 'Nuevo prospecto recibido',
                    description: `${nuevo.nombre} ${nuevo.apellido} está interesado.`,
                    duration: 5000
                });
            }
        };
        return () => bc.close();
    }, []);

    const addProspecto = (data, options = { manual: false }) => {
        const nuevo = {
            id: `p${Date.now()}`,
            ...data,
            fecha: new Date().toISOString(),
            estado: 'nuevo',
        };
        setProspectos(prev => [nuevo, ...prev]);

        // Emitir evento para otras pestañas
        const bc = new BroadcastChannel('crm_notifications');
        bc.postMessage({ type: 'NEW_PROSPECT', nuevo });
        bc.close();

        if (options.manual) {
            sileo.action({
                title: 'Prospecto registrado manualmente',
                description: `${nuevo.nombre} ${nuevo.apellido} ha sido añadido al CRM.`,
                action: { label: 'Revisar', onClick: () => console.log('Revisando prospecto manual...') }
            });
        } else {
            // Notificar llegada de prospecto en la pestaña actual (Landing)
            sileo.info({
                title: 'Nuevo prospecto recibido',
                description: `${nuevo.nombre} ${nuevo.apellido} está interesado.`,
                duration: 5000
            });
        }
    };

    const updateProspectoEstado = (id, estado) => {
        setProspectos(prev => prev.map(p => p.id === id ? { ...p, estado } : p));
    };

    const deleteProspecto = (id) => {
        setProspectos(prev => prev.filter(p => p.id !== id));
    };

    const convertirACliente = (prospecto, nombreProyecto) => {
        const promise = new Promise((resolve, reject) => {
            try {
                const clienteId = `c${Date.now()}`;
                const proyectoId = `proy${Date.now()}`;

                const nuevoProyecto = {
                    id: proyectoId,
                    nombre: nombreProyecto,
                    cliente: `${prospecto.nombre} ${prospecto.apellido}`,
                    empresa: '',
                    descripcion: prospecto.interes || '',
                    enlace: '',
                    imagenes: [],
                    inicio: new Date().toISOString().slice(0, 10),
                    fin: '',
                    estado: 'en proceso',
                    tags: ['Landing Page'],
                };

                const nuevoCliente = {
                    id: clienteId,
                    nombre: prospecto.nombre,
                    apellido: prospecto.apellido,
                    correo: prospecto.correo,
                    whatsapp: prospecto.whatsapp,
                    proyectoId: proyectoId,
                    empresa: '',
                    inicio: new Date().toISOString().slice(0, 10),
                    estado: 'activo',
                };

                setProyectos(prev => [nuevoProyecto, ...prev]);
                setClientes(prev => [nuevoCliente, ...prev]);
                deleteProspecto(prospecto.id);

                setTimeout(() => resolve({ clienteId }), 1000);
            } catch (err) {
                reject(err);
            }
        });

        sileo.promise(promise, {
            loading: {
                title: 'Confirmando conversión...',
                description: 'Preparando expediente del nuevo cliente.'
            },
            success: (data) => ({
                title: '¡Conversión Exitosa!',
                description: (
                    <div className="flight-toast-card-inner">
                        <div className="flight-toast-top-row">
                            <span className="flight-toast-brand">CLICK & GO</span>
                            <span className="flight-toast-pnr">ID {data.clienteId.slice(-6).toUpperCase()}</span>
                        </div>

                        <div className="flight-toast-project-row">
                            <div className="project-label">PROYECTO:</div>
                            <div className="project-name">{nombreProyecto}</div>
                        </div>

                        <div className="flight-toast-path-row">
                            <div className="flight-point">
                                <span className="flight-code">PROSP</span>
                                <div className="flight-icon-circle">↗</div>
                            </div>

                            <svg className="flight-svg-path" viewBox="0 0 120 40">
                                <path
                                    d="M 10 35 Q 60 0 110 35"
                                    className="path-arc"
                                />
                            </svg>

                            <div className="flight-point">
                                <span className="flight-code">CLIENT</span>
                                <div className="flight-icon-circle">↘</div>
                            </div>
                        </div>

                        <div className="flight-toast-conversion-text">
                            Traspaso de prospecto a cliente completado
                        </div>
                    </div>
                ),
                duration: 8000
            }),
            error: {
                title: 'Error en conversión',
                description: 'No se pudo completar el proceso.'
            }
        });
    };

    const updateCliente = (id, data) => {
        setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    };

    const deleteCliente = (id) => {
        setClientes(prev => prev.filter(c => c.id !== id));
    };

    const addProyecto = (data, options = { manual: true }) => {
        const nuevo = { id: `proy${Date.now()}`, ...data };
        setProyectos(prev => [nuevo, ...prev]);

        if (options.manual) {
            sileo.action({
                title: 'Nuevo proyecto creado',
                description: `Proyecto: ${nuevo.nombre}`,
                action: {
                    label: 'Ver detalle',
                    onClick: () => console.log('Navegando a detalle de proyecto...')
                }
            });
        }
    };

    const updateProyecto = (id, data) => {
        setProyectos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    };

    const deleteProyecto = (id) => {
        setProyectos(prev => prev.filter(p => p.id !== id));
    };

    return (
        <CRMContext.Provider value={{
            prospectos, clientes, proyectos,
            addProspecto, updateProspectoEstado, deleteProspecto,
            convertirACliente, updateCliente, deleteCliente,
            addProyecto, updateProyecto, deleteProyecto
        }}>
            {children}
        </CRMContext.Provider>
    );
};

export const useCRM = () => useContext(CRMContext);
