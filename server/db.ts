import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// Initialize database connection or provide dummy implementation for production without DB
let pool;
let db;

try {
  if (process.env.DATABASE_URL) {
    // Normal database initialization with valid URL
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
    console.log("Database connection initialized successfully");
  } else if (isProduction) {
    // In production without DATABASE_URL, use dummy implementation
    console.warn("No DATABASE_URL provided in production. Using dummy implementation.");
    pool = null;
    db = {
      query: async () => [],
      select: () => ({ from: () => ({ where: () => ({ execute: async () => [] }) }) }),
      insert: () => ({ values: () => ({ returning: () => ({ execute: async () => [] }) }) }),
      update: () => ({ set: () => ({ where: () => ({ returning: () => ({ execute: async () => [] }) }) }) }),
      delete: () => ({ where: () => ({ returning: () => ({ execute: async () => [] }) }) }),
    };
  } else {
    // Development fallback
    const devDbUrl = "postgres://dummyuser:dummypassword@localhost:5432/dummydb";
    pool = new Pool({ connectionString: devDbUrl });
    db = drizzle({ client: pool, schema });
    console.log("Using development dummy database URL");
  }
} catch (error) {
  console.error("Database initialization error:", error);
  // Provide dummy implementation as fallback
  pool = null;
  db = {
    query: async () => [],
    select: () => ({ from: () => ({ where: () => ({ execute: async () => [] }) }) }),
    insert: () => ({ values: () => ({ returning: () => ({ execute: async () => [] }) }) }),
    update: () => ({ set: () => ({ where: () => ({ returning: () => ({ execute: async () => [] }) }) }) }),
    delete: () => ({ where: () => ({ returning: () => ({ execute: async () => [] }) }) }),
  };
}

export { pool, db };
