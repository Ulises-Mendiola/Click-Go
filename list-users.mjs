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
    try {
        console.log("Consultando tabla de usuarios...");
        const list = await db.select().from(usuarios);
        console.log("-----------------------------------------");
        console.log(`TOTAL USUARIOS: ${list.length}`);
        list.forEach(u => {
            console.log(`- [${u.id}] ${u.nombre} ${u.apellido} (Rol: ${u.rol})`);
        });
        console.log("-----------------------------------------");
        process.exit(0);
    } catch (error) {
        console.error("ERROR AL CONSULTAR USUARIOS:", error);
        process.exit(1);
    }
}

main();
