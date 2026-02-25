import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const usuarios = pgTable('usuarios', {
    id: varchar('id', { length: 255 }).primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    apellido: varchar('apellido', { length: 255 }).notNull(),
    rol: varchar('rol', { length: 50 }).default('Gestion').notNull(),
    password: text('password').notNull(),
    fecha: timestamp('fecha').defaultNow().notNull(),
});

const sql = neon(process.env.POSTGRES_URL);
const db = drizzle(sql);

async function main() {
    const admin = {
        id: 'u' + Date.now(),
        nombre: 'Ulises',
        apellido: 'Mendiola',
        rol: 'Admin',
        password: 'AdminClickGo2026', // Contraseña temporal
    };

    try {
        console.log("Conectando a Neon...");
        console.log("Inyectando admin:", admin.nombre, admin.apellido);

        const result = await db.insert(usuarios).values(admin);

        console.log("-----------------------------------------");
        console.log("¡USUARIO ADMINISTRADOR INYECTADO!");
        console.log("ID:", admin.id);
        console.log("Nombre:", admin.nombre);
        console.log("Password:", admin.password);
        console.log("-----------------------------------------");
        process.exit(0);
    } catch (error) {
        console.error("ERROR CRÍTICO:", error);
        process.exit(1);
    }
}

main();
