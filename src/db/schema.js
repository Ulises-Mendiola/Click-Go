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

export const usuarios = pgTable('usuarios', {
    id: varchar('id', { length: 255 }).primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    apellido: varchar('apellido', { length: 255 }).notNull(),
    rol: varchar('rol', { length: 50 }).default('Gestion').notNull(), // Admin, Gestion
    password: text('password').notNull(),
    fecha: timestamp('fecha').defaultNow().notNull(),
});

export const global_config = pgTable('global_config', {
    id: varchar('id', { length: 255 }).primaryKey(), // Normalmente 'singleton'
    logo_url: text('logo_url').default('').notNull(),
    whatsapp: varchar('whatsapp', { length: 50 }).default('').notNull(),
    redes: json('redes').default({
        facebook: { url: '', enabled: false },
        instagram: { url: '', enabled: false },
        linkedin: { url: '', enabled: false },
        github: { url: '', enabled: false }
    }).notNull(),
});
