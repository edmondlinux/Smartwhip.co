import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.NEXT_NOENDB_URI;
if (!connectionString) throw new Error('NEXT_NOENDB_URI is not set');

const sql = neon(connectionString);

async function main() {
  console.log('Creating bank_details table in Neon...');

  await sql`
    CREATE TABLE IF NOT EXISTS bank_details (
      id SERIAL PRIMARY KEY,
      label VARCHAR(100) NOT NULL,
      value VARCHAR(255) NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  console.log('Table created. Checking for existing rows...');

  const existing = await sql`SELECT COUNT(*) AS count FROM bank_details`;
  const count = Number(existing[0].count);

  if (count === 0) {
    console.log('Seeding bank details...');
    await sql`
      INSERT INTO bank_details (label, value, sort_order) VALUES
        ('Account Name',   'SmartWhip UK Ltd', 1),
        ('Sort Code',      '20-45-67',         2),
        ('Account Number', '83921047',         3),
        ('Bank',           'Barclays Bank',    4)
    `;
    console.log('Seeded 4 bank detail rows.');
  } else {
    console.log(`Skipped seeding — ${count} row(s) already exist.`);
  }

  console.log('Done.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
