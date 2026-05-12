import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.NEXT_NOENDB_URI;
if (!connectionString) throw new Error('NEXT_NOENDB_URI is not set');

const sql = neon(connectionString);

async function main() {
  console.log('Setting up Neon tables...');

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

  await sql`
    CREATE TABLE IF NOT EXISTS app_settings (
      id SERIAL PRIMARY KEY,
      key VARCHAR(100) NOT NULL UNIQUE,
      value TEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  console.log('Tables ready. Seeding...');

  const bankCount = await sql`SELECT COUNT(*) AS count FROM bank_details`;
  if (Number(bankCount[0].count) === 0) {
    await sql`
      INSERT INTO bank_details (label, value, sort_order) VALUES
        ('Account Name',   'SmartWhip UK Ltd', 1),
        ('Sort Code',      '20-45-67',         2),
        ('Account Number', '83921047',         3),
        ('Bank',           'Barclays Bank',    4)
    `;
    console.log('Seeded bank details.');
  }

  const defaults = [
    { key: 'checkout_mode',  value: 'bank' },
    { key: 'whatsapp_url',   value: 'https://wa.me/447476690829' },
    { key: 'telegram_url',   value: 'https://t.me/smartwhipsuk' },
  ];

  for (const { key, value } of defaults) {
    await sql`
      INSERT INTO app_settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO NOTHING
    `;
  }
  console.log('Seeded app settings.');
  console.log('Done.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
