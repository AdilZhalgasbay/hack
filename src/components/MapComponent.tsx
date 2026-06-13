"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import type { Complaint } from "@/types";

const iconFix = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

const createSvgIcon = (color: string, pulse = false) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
      ${pulse ? `<circle cx="14" cy="14" r="12" fill="${color}" opacity="0.2">
        <animate attributeName="r" from="10" to="18" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite"/>
      </circle>` : ''}
      <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 26 14 26s14-16.667 14-26C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white" opacity="0.9"/>
    </svg>
  `;
  return new L.DivIcon({
    html: svg,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -42],
    className: "custom-marker",
  });
};

const icons = {
  high: createSvgIcon("#EF4444"),
  medium: createSvgIcon("#EAB308"),
  low: createSvgIcon("#22C55E"),
  new: createSvgIcon("#3B82F6", true),
};

interface MapComponentProps {
  complaints: Complaint[];
  newMarker: { lat: number; lng: number } | null;
  setNewMarker: (marker: { lat: number; lng: number } | null) => void;
}

function MapClickHandler({ setNewMarker }: { setNewMarker: (m: { lat: number; lng: number } | null) => void }) {
  useMapEvents({
    click(e) {
      setNewMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function ClusteredMarkers({ complaints }: { complaints: Complaint[] }) {
  const map = useMap();
  const clusterRef = useRef<any>(null);

  useEffect(() => {
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }

    const cluster = (L as any).markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction(c: any) {
        const count = c.getChildCount();
        const cls = count < 5 ? "small" : count < 15 ? "medium" : "large";
        return L.divIcon({
          html: `<div><span>${count}</span></div>`,
          className: `marker-cluster marker-cluster-${cls}`,
          iconSize: [40, 40],
        });
      },
    });

    complaints.forEach(complaint => {
      let icon = icons.low;
      if (complaint.priority === "Высокий") icon = icons.high;
      else if (complaint.priority === "Средний") icon = icons.medium;

      const priorityColor = complaint.priority === "Высокий" ? "#EF4444" :
        complaint.priority === "Средний" ? "#EAB308" : "#22C55E";
      const priorityBg = complaint.priority === "Высокий" ? "rgba(239,68,68,0.15)" :
        complaint.priority === "Средний" ? "rgba(234,179,8,0.15)" : "rgba(34,197,94,0.15)";

      const marker = L.marker([complaint.lat, complaint.lng], { icon });

      const popupContent = `
        <div style="font-family: inherit; padding: 12px; min-width: 220px; max-width: 280px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid rgba(30,41,59,0.6);">
            <span style="width:10px; height:10px; border-radius:50%; background:${priorityColor}; flex-shrink:0; box-shadow:0 0 6px ${priorityColor};"></span>
            <strong style="color:#F8FAFC; font-size:14px;">${complaint.category}</strong>
            <span style="margin-left:auto; font-size:11px; font-weight:700; padding:2px 8px; border-radius:20px; background:${priorityBg}; color:${priorityColor}; border:1px solid ${priorityColor}40;">${complaint.priority}</span>
          </div>
          <p style="color:#94A3B8; font-size:12px; line-height:1.5; margin-bottom:10px;">${complaint.text}</p>
          <div style="background:rgba(30,41,59,0.5); border-radius:8px; padding:8px 10px; font-size:11px; color:#64748B;">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
              <span>📍</span>
              <span style="color:#94A3B8;">${complaint.address || "Адрес не указан"}</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px; padding-top:4px; border-top:1px solid rgba(30,41,59,0.4);">
              <span>🏛️</span>
              <span style="color:#22C55E; font-weight:600;">${complaint.department}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300, className: "dark-popup" });
      cluster.addLayer(marker);
    });

    clusterRef.current = cluster;
    map.addLayer(cluster);

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
      }
    };
  }, [complaints, map]);

  return null;
}

export default function MapComponent({ complaints, newMarker, setNewMarker }: MapComponentProps) {
  useEffect(() => {
    iconFix();
  }, []);

  return (
    <MapContainer
      center={[50.2839, 57.1670]}
      zoom={13}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <MapClickHandler setNewMarker={setNewMarker} />
      <ClusteredMarkers complaints={complaints} />

      {newMarker && (
        <Marker position={[newMarker.lat, newMarker.lng]} icon={icons.new}>
          <Popup>
            <div style={{ fontFamily: "inherit", padding: "10px", color: "#F8FAFC" }}>
              <strong style={{ color: "#3B82F6" }}>📌 Новая жалоба</strong>
              <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "4px" }}>
                {newMarker.lat.toFixed(5)}, {newMarker.lng.toFixed(5)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
