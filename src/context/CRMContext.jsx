"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { sileo } from 'sileo';
import {
    getProspectos, addProspectoAction, updateProspectoEstadoAction, deleteProspectoAction,
    getClientes, updateClienteAction, deleteClienteAction,
    getProyectos, addProyectoAction, updateProyectoAction, deleteProyectoAction,
    convertirAClienteAction,
    getGlobalConfig, updateGlobalConfigAction,
    getUsuarios, addUsuarioAction, updateUsuarioAction, ensureDefaultUser
} from '@/app/actions';

const CRMContext = createContext(null);

export const CRMProvider = ({ children }) => {
    const [prospectos, setProspectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [usuariosList, setUsuariosList] = useState([]);
    const [config, setConfig] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carga inicial desde la Base de Datos
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Asegurar usuario base (Ulises)
                await ensureDefaultUser();

                const [p, c, pr, conf, users] = await Promise.all([
                    getProspectos(),
                    getClientes(),
                    getProyectos(),
                    getGlobalConfig(),
                    getUsuarios()
                ]);
                setProspectos(p);
                setClientes(c);
                setProyectos(pr);
                setConfig(conf);
                setUsuariosList(users);

                // Mock login for 'Ulises' for now
                const ulises = users.find(u => u.nombre === 'Ulises') || users[0];
                setCurrentUser(ulises);
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
                getProspectos().then(setProspectos);
                getClientes().then(setClientes);
                getProyectos().then(setProyectos);
                getGlobalConfig().then(setConfig);
                getUsuarios().then(setUsuariosList);
            }
        };
        return () => bc.close();
    }, []);

    const notifySync = () => {
        const bc = new BroadcastChannel('crm_notifications');
        bc.postMessage({ type: 'REFRESH_DATA' });
        bc.close();
    };

    // --- PROSPECTOS ---
    const addProspecto = async (data) => {
        const result = await addProspectoAction(data);
        if (result.success) {
            getProspectos().then(setProspectos);
            notifySync();
            sileo.success({ title: 'Prospecto agregado', description: `${data.nombre} ha sido registrado.` });
        }
    };

    const updateProspectoEstado = async (id, nuevoEstado) => {
        const result = await updateProspectoEstadoAction(id, nuevoEstado);
        if (result.success) {
            getProspectos().then(setProspectos);
            notifySync();
        }
    };

    const deleteProspecto = async (id) => {
        const result = await deleteProspectoAction(id);
        if (result.success) {
            getProspectos().then(setProspectos);
            notifySync();
            sileo.info({ title: 'Prospecto eliminado' });
        }
    };

    const convertirACliente = async (prospectoId, datosCliente) => {
        const result = await convertirAClienteAction(prospectoId, datosCliente);
        if (result.success) {
            getProspectos().then(setProspectos);
            getClientes().then(setClientes);
            notifySync();
            sileo.success({ title: '¡Conversión exitosa!', description: 'El prospecto ahora es un cliente.' });
        }
    };

    // --- CLIENTES ---
    const updateCliente = async (id, data) => {
        const result = await updateClienteAction(id, data);
        if (result.success) {
            getClientes().then(setClientes);
            notifySync();
            sileo.success({ title: 'Cliente actualizado' });
        }
    };

    const deleteCliente = async (id) => {
        const result = await deleteClienteAction(id);
        if (result.success) {
            getClientes().then(setClientes);
            notifySync();
            sileo.info({ title: 'Cliente eliminado' });
        }
    };

    // --- PROYECTOS ---
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
            getProyectos().then(setProyectos);
            notifySync();
            sileo.success({ title: 'Proyecto actualizado' });
        }
    };

    const deleteProyecto = async (id) => {
        const result = await deleteProyectoAction(id);
        if (result.success) {
            getProyectos().then(setProyectos);
            notifySync();
            sileo.info({ title: 'Proyecto eliminado' });
        }
    };

    // --- CONFIGURACIÓN & USUARIOS ---
    const updateConfig = async (data) => {
        const result = await updateGlobalConfigAction(data);
        if (result.success) {
            setConfig(prev => ({ ...prev, ...data }));
            notifySync();
            sileo.success({ title: 'Configuración actualizada' });
        }
    };

    const addUsuario = async (data) => {
        const result = await addUsuarioAction(data);
        if (result.success) {
            getUsuarios().then(setUsuariosList);
            notifySync();
            sileo.success({ title: 'Usuario creado', description: `${data.nombre} ${data.apellido}` });
        }
    };

    const updateUsuario = async (id, data) => {
        const result = await updateUsuarioAction(id, data);
        if (result.success) {
            getUsuarios().then(setUsuariosList);
            if (currentUser && currentUser.id === id) {
                setCurrentUser(prev => ({ ...prev, ...data }));
            }
            notifySync();
            sileo.success({ title: 'Perfil actualizado' });
        }
    };

    return (
        <CRMContext.Provider value={{
            prospectos, clientes, proyectos, usuariosList, config, currentUser, loading,
            addProspecto, updateProspectoEstado, deleteProspecto,
            convertirACliente, updateCliente, deleteCliente,
            addProyecto, updateProyecto, deleteProyecto,
            updateConfig, addUsuario, updateUsuario
        }}>
            {children}
        </CRMContext.Provider>
    );
};

export const useCRM = () => useContext(CRMContext);
