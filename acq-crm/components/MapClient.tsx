"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Company } from "@/lib/companies";

// Leaflet's default marker icons reference image files that don't resolve
// correctly under bundlers — rebuild the icon manually with CDN URLs.
const goldIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 26 38">
        <path d="M13 0C5.8 0 0 5.8 0 13c0 9.75 13 25 13 25s13-15.25 13-25C26 5.8 20.2 0 13 0z" fill="#C9A34E" stroke="#0B1F3D" stroke-width="1.5"/>
        <circle cx="13" cy="13" r="5" fill="#0B1F3D"/>
      </svg>`
    ),
  iconSize: [26, 38],
  iconAnchor: [13, 38],
  popupAnchor: [0, -34],
});

export default function MapClient({ companies }: { companies: Company[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const router = useRouter();

  // Initialize the map once.
  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [39.5, -98.35],
      zoom: 4,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);

    leafletMap.current = map;

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  // Sync markers whenever the (filtered) company list changes.
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    for (const m of markersRef.current) m.remove();
    markersRef.current = [];

    for (const c of companies) {
      const marker = L.marker([c.lat, c.lng], { icon: goldIcon }).addTo(map);
      marker.bindTooltip(`${c.name}<br/>${c.address.city}, ${c.address.state}`, {
        direction: "top",
        offset: [0, -30],
      });
      marker.on("click", () => router.push(`/companies/${c.id}`));
      markersRef.current.push(marker);
    }

    if (companies.length === 1) {
      map.setView([companies[0].lat, companies[0].lng], 9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies]);

  return <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" />;
}
