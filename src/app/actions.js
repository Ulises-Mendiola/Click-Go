"use server";

import { db } from "@/lib/db";
import { prospectos, clientes, proyectos } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
        await db.insert(proyectos).values(data);
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
