'use server';

import { neonDb, neonSql } from '@/lib/db/neon';
import { bankDetails, appSettings } from '@/lib/db/neon-schema';
import { eq, asc } from 'drizzle-orm';

/* ─── PIN ─────────────────────────────────────────────────────────── */
export async function verifyAdminPin(pin: string): Promise<boolean> {
  const expected = process.env.ADMIN_PIN;
  if (!expected) return false;
  return pin === expected;
}

/* ─── Settings ────────────────────────────────────────────────────── */
export interface AppSettings {
  checkoutMode: 'bank' | 'social';
  whatsappUrl: string;
  telegramUrl: string;
}

export async function getAppSettings(): Promise<AppSettings> {
  try {
    const rows = await neonDb.select().from(appSettings);
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return {
      checkoutMode: (map['checkout_mode'] as 'bank' | 'social') ?? 'bank',
      whatsappUrl:  map['whatsapp_url']  ?? 'https://wa.me/447476690829',
      telegramUrl:  map['telegram_url']  ?? 'https://t.me/smartwhipsuk',
    };
  } catch {
    return { checkoutMode: 'bank', whatsappUrl: 'https://wa.me/447476690829', telegramUrl: 'https://t.me/smartwhipsuk' };
  }
}

export async function updateSetting(key: string, value: string): Promise<void> {
  await neonSql`
    INSERT INTO app_settings (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `;
}

/* ─── Bank Details ────────────────────────────────────────────────── */
export async function getAllBankDetails() {
  return neonDb
    .select()
    .from(bankDetails)
    .orderBy(asc(bankDetails.sortOrder));
}

export async function createBankDetail(label: string, value: string, sortOrder: number) {
  await neonDb.insert(bankDetails).values({ label, value, sortOrder, isActive: true });
}

export async function updateBankDetail(id: number, label: string, value: string, sortOrder: number, isActive: boolean) {
  await neonDb.update(bankDetails)
    .set({ label, value, sortOrder, isActive, updatedAt: new Date() })
    .where(eq(bankDetails.id, id));
}

export async function deleteBankDetail(id: number) {
  await neonDb.delete(bankDetails).where(eq(bankDetails.id, id));
}
