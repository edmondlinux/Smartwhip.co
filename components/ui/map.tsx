'use client';

import { useRef, useCallback, ReactNode } from 'react';
import MapGL, { Marker, Source, Layer } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

/* ─── Map ────────────────────────────────────────────────────────────── */
interface MapProps {
  center: [number, number]; // [lng, lat]
  zoom?: number;
  children?: ReactNode;
  onLoad?: (mapRef: MapRef) => void;
}

export function Map({ center, zoom = 12, children, onLoad }: MapProps) {
  const mapRef = useRef<MapRef>(null);

  const handleLoad = useCallback(() => {
    if (mapRef.current && onLoad) onLoad(mapRef.current);
  }, [onLoad]);

  return (
    <MapGL
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{ longitude: center[0], latitude: center[1], zoom }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      attributionControl={false}
      onLoad={handleLoad}
    >
      {children}
    </MapGL>
  );
}

/* ─── MapMarker ──────────────────────────────────────────────────────── */
interface MapMarkerProps {
  longitude: number;
  latitude: number;
  children?: ReactNode;
}

export function MapMarker({ longitude, latitude, children }: MapMarkerProps) {
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="center">
      {children}
    </Marker>
  );
}

/* ─── MarkerContent ──────────────────────────────────────────────────── */
export function MarkerContent({ children }: { children: ReactNode }) {
  return <div className="relative flex flex-col items-center">{children}</div>;
}

/* ─── MarkerLabel ────────────────────────────────────────────────────── */
interface MarkerLabelProps {
  children: ReactNode;
  position?: 'top' | 'bottom';
}

export function MarkerLabel({ children, position = 'bottom' }: MarkerLabelProps) {
  const posClass = position === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5';
  return (
    <div
      className={`absolute ${posClass} whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest text-white shadow`}
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      {children}
    </div>
  );
}

/* ─── MapRoute ───────────────────────────────────────────────────────── */
interface MapRouteProps {
  id?: string;
  coordinates: [number, number][]; // array of [lng, lat]
  color?: string;
  width?: number;
  opacity?: number;
  onClick?: () => void;
}

export function MapRoute({
  id = 'route',
  coordinates,
  color = '#ff6200',
  width = 5,
  opacity = 1,
  onClick,
}: MapRouteProps) {
  const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates },
  };

  return (
    <Source id={`${id}-source`} type="geojson" data={geojson}>
      <Layer
        id={id}
        type="line"
        layout={{ 'line-join': 'round', 'line-cap': 'round' }}
        paint={{ 'line-color': color, 'line-width': width, 'line-opacity': opacity }}
      />
    </Source>
  );
}
