import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Bin } from '@shared/schema';

interface BinMapProps {
  bins: Bin[];
  className?: string;
}

export function BinMap({ bins, className = "" }: BinMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([40.7128, -74.0060], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
    }

    const markers = bins.map(bin => {
      const marker = L.marker([Number(bin.latitude), Number(bin.longitude)])
        .addTo(mapRef.current!)
        .bindPopup(bin.name)
        .on('click', () => setLocation(`/bin/${bin.id}`));
      return marker;
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [bins]);

  return <div id="map" className={`h-[600px] ${className}`} />;
}
