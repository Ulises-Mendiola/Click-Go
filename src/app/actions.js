"use server";

import { db } from "@/lib/db";
import { prospectos, clientes, proyectos } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

// --- IMAGES (Vercel Blob) ---
export async function uploadImageAction(formData) {
    try {
        const file = formData.get("file");
        if (!file) throw new Error("No file profile");

        const blob = await put(file.name, file, {
            access: "public",
        });

        return { success: true, url: blob.url };
    } catch (error) {
        console.error("Error uploading to Blob:", error);
        return { success: false, error: error.message };
    }
}

// --- PROSPECTOS ---
export async function getProspectos() {
    try {
        return await db.select().from(prospectos).orderBy(desc(prospectos.fecha));
    } catch (error) {
        console.error("Error fetching prospectos:", error);
        return [];
    }
}

export async function addProspectoAction(data) {
    try {
        const nuevo = {
            id: `p${Date.now()}`,
            ...data,
            fecha: new Date(),
            estado: 'nuevo',
        };
        await db.insert(prospectos).values(nuevo);
        revalidatePath("/");
        return { success: true, nuevo };
    } catch (error) {
        console.error("Error adding prospecto:", error);
        return { success: false, error: error.message };
    }
}

export async function updateProspectoEstadoAction(id, estado) {
    try {
        await db.update(prospectos).set({ estado }).where(eq(prospectos.id, id));
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteProspectoAction(id) {
    try {
        await db.delete(prospectos).where(eq(prospectos.id, id));
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// --- CLIENTES ---
export async function getClientes() {
    try {
        return await db.select().from(clientes);
    } catch (error) {
        return [];
    }
}

export async function addClienteAction(data) {
    try {
        await db.insert(clientes).values(data);
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getProyectos() {
    try {
        return await db.select().from(proyectos).orderBy(desc(proyectos.inicio));
    } catch (error) {
        return [];
    }
}

export async function addProyectoAction(data) {
    try {
        if (!data.id) data.id = `proy${Date.now()}`;
        // Ensure images is always an array
        const finalData = {
            ...data,
            imagenes: Array.isArray(data.imagenes) ? data.imagenes : []
        };
        await db.insert(proyectos).values(finalData);
        revalidatePath("/");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function updateProyectoAction(id, data) {
    try {
        await db.update(proyectos).set(data).where(eq(proyectos.id, id));
        revalidatePath("/");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteProyectoAction(id) {
    try {
        await db.delete(proyectos).where(eq(proyectos.id, id));
        revalidatePath("/");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// --- CLIENTES ---
export async function updateClienteAction(id, data) {
    try {
        await db.update(clientes).set(data).where(eq(clientes.id, id));
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function deleteClienteAction(id) {
    try {
        await db.delete(clientes).where(eq(clientes.id, id));
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// --- CONVERSIÓN ---
export async function convertirAClienteAction(prospectoId, nombreProyecto) {
    try {
        const prospecto = (await db.select().from(prospectos).where(eq(prospectos.id, prospectoId)))[0];
        if (!prospecto) throw new Error("Prospecto no encontrado");

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

        await db.transaction(async (tx) => {
            await tx.insert(proyectos).values(nuevoProyecto);
            await tx.insert(clientes).values(nuevoCliente);
            await tx.delete(prospectos).where(eq(prospectos.id, prospectoId));
        });

        revalidatePath("/dashboard");
        return { success: true, clienteId };
    } catch (error) {
        console.error("Error en conversión:", error);
        return { success: false, error: error.message };
    }
}

// --- CONFIGURACIÓN GLOBAL ---
export async function getGlobalConfig() {
    try {
        const config = await db.select().from(global_config).where(eq(global_config.id, 'singleton'));
        if (config.length === 0) {
            // Inicializar si no existe
            const initial = {
                id: 'singleton',
                logo_url: '/logo.png',
                whatsapp: '521XXXXXXXXXX',
                redes: {
                    facebook: { url: '', enabled: false },
                    instagram: { url: '', enabled: false },
                    linkedin: { url: '', enabled: false },
                    github: { url: '', enabled: false }
                }
            };
            await db.insert(global_config).values(initial);
            return initial;
        }
        return config[0];
    } catch (error) {
        console.error("Error fetching config:", error);
        return null;
    }
}

export async function updateGlobalConfigAction(data) {
    try {
        await db.update(global_config).set(data).where(eq(global_config.id, 'singleton'));
        revalidatePath("/");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// --- USUARIOS ---
export async function getUsuarios() {
    try {
        return await db.select().from(usuarios).orderBy(desc(usuarios.fecha));
    } catch (error) {
        return [];
    }
}

export async function addUsuarioAction(data) {
    try {
        const id = `u${Date.now()}`;
        await db.insert(usuarios).values({ id, ...data });
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function updateUsuarioAction(id, data) {
    try {
        // Sanitización básica: si viene el password, se actualiza, si no, se mantiene el actual
        const updateData = { ...data };
        if (updateData.password === '') delete updateData.password;

        await db.update(usuarios).set(updateData).where(eq(usuarios.id, id));
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Inicialización de usuario por defecto
export async function ensureDefaultUser() {
    try {
        const existing = await db.select().from(usuarios).where(eq(usuarios.nombre, 'Ulises'));
        if (existing.length === 0) {
            await db.insert(usuarios).values({
                id: 'u-default',
                nombre: 'Ulises',
                apellido: 'Mendiola',
                rol: 'Admin',
                password: '123456'
            });
        }
    } catch (e) {
        console.error(e);
    }
}
