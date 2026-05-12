import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as neonSchema from './neon-schema';

const connectionString = process.env.NEXT_NOENDB_URI;

if (!connectionString) {
  throw new Error('NEXT_NOENDB_URI environment variable is not set');
}

const sql = neon(connectionString);
export const neonDb = drizzle(sql, { schema: neonSchema });
export { sql as neonSql };
