"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { sileo } from 'sileo';
import {
    getProspectos, addProspectoAction, updateProspectoEstadoAction, deleteProspectoAction,
    getClientes, updateClienteAction, deleteClienteAction,
    getProyectos, addProyectoAction, updateProyectoAction, deleteProyectoAction,
    convertirAClienteAction
} from '@/app/actions';

const CRMContext = createContext(null);

export const CRMProvider = ({ children }) => {
    const [prospectos, setProspectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Carga inicial desde la Base de Datos
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [p, c, pr] = await Promise.all([
                    getProspectos(),
                    getClientes(),
                    getProyectos()
                ]);
                setProspectos(p);
                setClientes(c);
                setProyectos(pr);
            } catch (error) {
                console.error("Error al cargar datos del CRM:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    // Sincronización entre pestañas via BroadcastChannel
    useEffect(() => {
        const bc = new BroadcastChannel('crm_notifications');
        bc.onmessage = (event) => {
            if (event.data.type === 'REFRESH_DATA') {
                // Si otra pestaña hizo un cambio, recargamos
                getProspectos().then(setProspectos);
                getClientes().then(setClientes);
                getProyectos().then(setProyectos);
            }

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

    const notifySync = () => {
        const bc = new BroadcastChannel('crm_notifications');
        bc.postMessage({ type: 'REFRESH_DATA' });
        bc.close();
    };

    const addProspecto = async (data, options = { manual: false }) => {
        const result = await addProspectoAction(data);
        if (result.success) {
            setProspectos(prev => [result.nuevo, ...prev]);

            const bc = new BroadcastChannel('crm_notifications');
            bc.postMessage({ type: 'NEW_PROSPECT', nuevo: result.nuevo });
            bc.close();
            notifySync();

            if (options.manual) {
                sileo.action({
                    title: 'Prospecto registrado manualmente',
                    description: `${result.nuevo.nombre} ${result.nuevo.apellido} ha sido añadido al CRM.`,
                    action: { label: 'Revisar', onClick: () => console.log('Revisando prospecto manual...') }
                });
            } else {
                sileo.info({
                    title: 'Nuevo prospecto recibido',
                    description: `${result.nuevo.nombre} ${result.nuevo.apellido} está interesado.`,
                    duration: 5000
                });
            }
        } else {
            sileo.error({ title: 'Error', description: 'No se pudo guardar el prospecto.' });
        }
    };

    const updateProspectoEstado = async (id, estado) => {
        const result = await updateProspectoEstadoAction(id, estado);
        if (result.success) {
            setProspectos(prev => prev.map(p => p.id === id ? { ...p, estado } : p));
            notifySync();
        }
    };

    const deleteProspecto = async (id) => {
        const result = await deleteProspectoAction(id);
        if (result.success) {
            setProspectos(prev => prev.filter(p => p.id !== id));
            notifySync();
        }
    };

    const convertirACliente = async (prospecto, nombreProyecto) => {
        const promise = convertirAClienteAction(prospecto.id, nombreProyecto);

        sileo.promise(promise, {
            loading: {
                title: 'Confirmando conversión...',
                description: 'Preparando expediente del nuevo cliente.'
            },
            success: (res) => {
                // Actualizar estado local
                getProspectos().then(setProspectos);
                getClientes().then(setClientes);
                getProyectos().then(setProyectos);
                notifySync();

                return {
                    title: '¡Conversión Exitosa!',
                    description: (
                        <div className="flight-toast-card-inner">
                            <div className="flight-toast-top-row">
                                <span className="flight-toast-brand">CLICK & GO</span>
                                <span className="flight-toast-pnr">ID {res.clienteId.slice(-6).toUpperCase()}</span>
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
                };
            },
            error: {
                title: 'Error en conversión',
                description: 'No se pudo completar el proceso.'
            }
        });
    };

    const updateCliente = async (id, data) => {
        const result = await updateClienteAction(id, data);
        if (result.success) {
            setClientes(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
            notifySync();
        }
    };

    const deleteCliente = async (id) => {
        const result = await deleteClienteAction(id);
        if (result.success) {
            setClientes(prev => prev.filter(c => c.id !== id));
            notifySync();
        }
    };

    const addProyecto = async (data) => {
        const result = await addProyectoAction(data);
        if (result.success) {
            getProyectos().then(setProyectos);
            notifySync();
            sileo.success({ title: 'Proyecto creado', description: data.nombre });
        }
    };

    const updateProyecto = async (id, data) => {
        const result = await updateProyectoAction(id, data);
        if (result.success) {
            setProyectos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
            notifySync();
        }
    };

    const deleteProyecto = async (id) => {
        const result = await deleteProyectoAction(id);
        if (result.success) {
            setProyectos(prev => prev.filter(p => p.id !== id));
            notifySync();
        }
    };

    return (
        <CRMContext.Provider value={{
            prospectos, clientes, proyectos, loading,
            addProspecto, updateProspectoEstado, deleteProspecto,
            convertirACliente, updateCliente, deleteCliente,
            addProyecto, updateProyecto, deleteProyecto
        }}>
            {children}
        </CRMContext.Provider>
    );
};

export const useCRM = () => useContext(CRMContext);
