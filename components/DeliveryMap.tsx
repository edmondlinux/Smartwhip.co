'use client';

import { useEffect, useState, useRef } from 'react';
import { Map, MapMarker, MarkerContent, MarkerLabel, MapRoute } from '@/components/ui/map';
import type { MapRef } from 'react-map-gl/mapbox';
import { Loader2 } from 'lucide-react';

const AGENT_KEY = 'sw_agent_loc_v1';

interface Coords { lat: number; lng: number }

/* ── Geocode address via Nominatim (already used elsewhere in app) ── */
async function geocodeAddress(address: string): Promise<Coords | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=gb`;
    const res = await fetch(url, { headers: { 'User-Agent': 'SmartWhip-App' } });
    const data = await res.json();
    if (!data?.[0]) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
}

/* ── Generate (or load) agent coords ~1.5-2.5 km from buyer ── */
function getAgentCoords(buyer: Coords): Coords {
  const raw = typeof window !== 'undefined' ? localStorage.getItem(AGENT_KEY) : null;
  if (raw) {
    try { return JSON.parse(raw); } catch { /* fall through */ }
  }
  const angle = Math.random() * 2 * Math.PI;
  const distDeg = 0.013 + Math.random() * 0.009;
  const agent: Coords = {
    lat: buyer.lat + distDeg * Math.sin(angle),
    lng: buyer.lng + (distDeg * Math.cos(angle)) / Math.cos((buyer.lat * Math.PI) / 180),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(AGENT_KEY, JSON.stringify(agent));
  }
  return agent;
}

/* ── Fetch driving route from OSRM (free, no API key) ── */
async function fetchOSRMRoute(from: Coords, to: Coords): Promise<[number, number][] | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();
    return data.routes?.[0]?.geometry?.coordinates ?? null;
  } catch {
    return null;
  }
}

/* ── Fit map bounds to show both markers ── */
function fitBounds(mapRef: MapRef, buyer: Coords, agent: Coords) {
  const minLng = Math.min(buyer.lng, agent.lng);
  const maxLng = Math.max(buyer.lng, agent.lng);
  const minLat = Math.min(buyer.lat, agent.lat);
  const maxLat = Math.max(buyer.lat, agent.lat);
  mapRef.fitBounds(
    [[minLng, minLat], [maxLng, maxLat]],
    { padding: 70, duration: 800 }
  );
}

interface Props { buyerAddress: string }

export default function DeliveryMap({ buyerAddress }: Props) {
  const [buyer, setBuyer] = useState<Coords | null>(null);
  const [agent, setAgent] = useState<Coords | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    (async () => {
      const buyerCoords = await geocodeAddress(buyerAddress);
      if (cancelled) return;
      if (!buyerCoords) { setError(true); setLoading(false); return; }

      const agentCoords = getAgentCoords(buyerCoords);
      setBuyer(buyerCoords);
      setAgent(agentCoords);

      const route = await fetchOSRMRoute(agentCoords, buyerCoords);
      if (!cancelled) {
        setRouteCoords(route);
        setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [buyerAddress]);

  const handleMapLoad = (ref: MapRef) => {
    mapRef.current = ref;
  };

  // Fit bounds once we have both buyer + agent coords (geocoding finishes after map load)
  useEffect(() => {
    if (buyer && agent && mapRef.current) {
      fitBounds(mapRef.current, buyer, agent);
    }
  }, [buyer, agent]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-2xl" style={{ background: 'var(--surface)' }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Could not locate address
        </p>
      </div>
    );
  }

  const center: [number, number] = buyer
    ? [buyer.lng, buyer.lat]
    : [-0.1278, 51.5074];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <Map center={center} zoom={13} onLoad={handleMapLoad}>

        {/* Driving route */}
        {routeCoords && (
          <MapRoute
            id="delivery-route"
            coordinates={routeCoords}
            color="#ff6200"
            width={5}
            opacity={0.9}
          />
        )}

        {/* Buyer marker */}
        {buyer && (
          <MapMarker longitude={buyer.lng} latitude={buyer.lat}>
            <MarkerContent>
              <div className="size-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
              <MarkerLabel position="top">You</MarkerLabel>
            </MarkerContent>
          </MapMarker>
        )}

        {/* Agent marker */}
        {agent && (
          <MapMarker longitude={agent.lng} latitude={agent.lat}>
            <MarkerContent>
              <div
                className="size-9 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-base"
                style={{ background: 'var(--orange, #ff6200)' }}
              >
                🛵
              </div>
              <MarkerLabel position="bottom">Agent</MarkerLabel>
            </MarkerContent>
          </MapMarker>
        )}
      </Map>

      {/* Loading overlay */}
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
        >
          <Loader2 className="size-6 animate-spin text-white" />
        </div>
      )}
    </div>
  );
}
