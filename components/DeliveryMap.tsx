'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const AGENT_KEY = 'sw_agent_loc_v1';
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

function getOffsetCoords(lat: number, lng: number): { lat: number; lng: number } {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(AGENT_KEY) : null;
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fallthrough */ }
  }
  const angle = Math.random() * 2 * Math.PI;
  const distDeg = 0.013 + Math.random() * 0.009;
  const agentLat = lat + distDeg * Math.sin(angle);
  const agentLng = lng + distDeg * Math.cos(angle) / Math.cos((lat * Math.PI) / 180);
  const result = { lat: agentLat, lng: agentLng };
  if (typeof window !== 'undefined') {
    localStorage.setItem(AGENT_KEY, JSON.stringify(result));
  }
  return result;
}

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!MAPBOX_TOKEN) return null;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?country=GB&limit=1&access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  const feature = data.features?.[0];
  if (!feature) return null;
  return { lng: feature.center[0], lat: feature.center[1] };
}

async function fetchRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): Promise<GeoJSON.Geometry | null> {
  if (!MAPBOX_TOKEN) return null;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.routes?.[0]?.geometry ?? null;
}

interface Props {
  buyerAddress: string;
}

export default function DeliveryMap({ buyerAddress }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 13,
      center: [-0.1278, 51.5074],
      attributionControl: false,
    });
    mapRef.current = map;

    map.on('load', async () => {
      const buyerCoords = await geocodeAddress(buyerAddress);
      if (!buyerCoords) return;

      const agentCoords = getOffsetCoords(buyerCoords.lat, buyerCoords.lng);

      map.setCenter([buyerCoords.lng, buyerCoords.lat]);

      const buyerEl = document.createElement('div');
      buyerEl.className = 'buyer-marker';
      buyerEl.style.cssText = 'width:16px;height:16px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 0 0 3px rgba(59,130,246,0.4);';
      new mapboxgl.Marker({ element: buyerEl, anchor: 'center' })
        .setLngLat([buyerCoords.lng, buyerCoords.lat])
        .setPopup(new mapboxgl.Popup({ offset: 20, closeButton: false }).setHTML('<div style="font-size:11px;font-weight:700;color:#111;">Your location</div>'))
        .addTo(map);

      const agentEl = document.createElement('div');
      agentEl.style.cssText = 'width:36px;height:36px;border-radius:50%;background:var(--orange,#ff6200);border:3px solid white;box-shadow:0 4px 12px rgba(255,98,0,0.5);display:flex;align-items:center;justify-content:center;font-size:16px;';
      agentEl.innerText = '🛵';
      new mapboxgl.Marker({ element: agentEl, anchor: 'center' })
        .setLngLat([agentCoords.lng, agentCoords.lat])
        .setPopup(new mapboxgl.Popup({ offset: 24, closeButton: false }).setHTML('<div style="font-size:11px;font-weight:700;color:#111;">Your delivery agent</div>'))
        .addTo(map);

      const routeGeom = await fetchRoute(agentCoords, buyerCoords);
      if (routeGeom) {
        map.addSource('route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: routeGeom } });
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#ff6200', 'line-width': 4, 'line-opacity': 0.85 },
        });

        const coords = (routeGeom as GeoJSON.LineString).coordinates;
        const bounds = coords.reduce(
          (b, c) => b.extend(c as [number, number]),
          new mapboxgl.LngLatBounds(coords[0] as [number, number], coords[0] as [number, number])
        );
        map.fitBounds(bounds, { padding: 60 });
      } else {
        const bounds = new mapboxgl.LngLatBounds(
          [agentCoords.lng, agentCoords.lat],
          [buyerCoords.lng, buyerCoords.lat]
        );
        map.fitBounds(bounds, { padding: 60 });
      }
    });

    return () => { map.remove(); };
  }, [buyerAddress]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-2xl" style={{ background: 'var(--surface)' }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          Map unavailable
        </p>
      </div>
    );
  }

  return <div ref={mapContainerRef} className="w-full h-full rounded-2xl overflow-hidden" />;
}
