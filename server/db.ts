import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// For development purposes, provide a fallback database URL
const dbUrl = process.env.DATABASE_URL || "postgres://dummyuser:dummypassword@localhost:5432/dummydb";

export const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle({ client: pool, schema });
