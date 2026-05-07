export interface TownData {
  id: string;
  name: string;
  admin: string;
  isDynamic?: boolean;
}

export async function searchOSMTowns(query: string): Promise<TownData[]> {
  if (query.length < 3) return [];
  
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', UK')}&format=json&addressdetails=1&limit=5`, {
      headers: {
        'User-Agent': 'SmartWhip-App'
      }
    });

    const data = await response.json();

    if (data && Array.isArray(data)) {
      return data.map((result: any) => ({
        id: result.display_name.split(',')[0].toLowerCase().replace(/\s+/g, '-'),
        name: result.display_name.split(',')[0],
        admin: result.address.state || result.address.county || 'UK',
        isDynamic: true
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching towns from OSM:', error);
    return [];
  }
}

export async function fetchTownFromOSM(townName: string) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(townName + ', UK')}&format=json&addressdetails=1&limit=1`, {
      headers: {
        'User-Agent': 'SmartWhip-App'
      }
    });

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        city: result.display_name.split(',')[0],
        admin_name: result.address.state || result.address.county || 'United Kingdom',
        lat: result.lat,
        lng: result.lon,
        population: "15000",
        iso2: "GB"
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching town from OSM:', error);
    return null;
  }
}
