import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
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
    try {
        console.log("Buscando usuarios con nombre 'Ulises'...");
        const result = await db.update(usuarios)
            .set({ rol: 'Admin' })
            .where(eq(usuarios.nombre, 'Ulises'));

        console.log("-----------------------------------------");
        console.log("¡USUARIO ACTUALIZADO A ADMIN!");
        console.log("Todos los usuarios llamados 'Ulises' ahora son Admin.");
        console.log("-----------------------------------------");
        process.exit(0);
    } catch (error) {
        console.error("ERROR AL ACTUALIZAR USUARIO:", error);
        process.exit(1);
    }
}

main();
