'use server';

import { neonDb } from '@/lib/db/neon';
import { bankDetails } from '@/lib/db/neon-schema';
import { eq, asc } from 'drizzle-orm';

export interface BankDetailRow {
  label: string;
  value: string;
}

export async function getBankDetailsAction(): Promise<BankDetailRow[]> {
  try {
    const rows = await neonDb
      .select({ label: bankDetails.label, value: bankDetails.value })
      .from(bankDetails)
      .where(eq(bankDetails.isActive, true))
      .orderBy(asc(bankDetails.sortOrder));

    return rows;
  } catch (err) {
    console.error('Failed to fetch bank details from Neon:', err);
    return [];
  }
}
