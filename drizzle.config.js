import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.js",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    },
});
