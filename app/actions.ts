'use server';

import { searchOSMTowns } from '@/lib/osm';

export async function searchTownsAction(query: string) {
  return await searchOSMTowns(query);
}
