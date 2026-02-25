import { pgTable, text, timestamp, varchar, json } from 'drizzle-orm/pg-core';

export const prospectos = pgTable('prospectos', {
    id: varchar('id', { length: 255 }).primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    apellido: varchar('apellido', { length: 255 }).notNull(),
    correo: varchar('correo', { length: 255 }).notNull(),
    whatsapp: varchar('whatsapp', { length: 50 }).notNull(),
    interes: text('interes'),
    fecha: timestamp('fecha').defaultNow().notNull(),
    estado: varchar('estado', { length: 50 }).default('nuevo').notNull(),
});

export const clientes = pgTable('clientes', {
    id: varchar('id', { length: 255 }).primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    apellido: varchar('apellido', { length: 255 }).notNull(),
    correo: varchar('correo', { length: 255 }).notNull(),
    whatsapp: varchar('whatsapp', { length: 50 }).notNull(),
    proyectoId: varchar('proyecto_id', { length: 255 }),
    empresa: varchar('empresa', { length: 255 }),
    inicio: varchar('inicio', { length: 50 }), // YYYY-MM-DD
    estado: varchar('estado', { length: 50 }).default('activo').notNull(),
});

export const proyectos = pgTable('proyectos', {
    id: varchar('id', { length: 255 }).primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    cliente: varchar('cliente', { length: 255 }).notNull(),
    empresa: varchar('empresa', { length: 255 }),
    descripcion: text('descripcion'),
    enlace: varchar('enlace', { length: 255 }),
    imagenes: json('imagenes').default([]).notNull(), // Almacenamos el array de URLs
    inicio: varchar('inicio', { length: 50 }),
    fin: varchar('fin', { length: 50 }),
    estado: varchar('estado', { length: 50 }).default('en proceso').notNull(),
    tags: json('tags').default([]).notNull(), // Almacenamos el array de tags
});
