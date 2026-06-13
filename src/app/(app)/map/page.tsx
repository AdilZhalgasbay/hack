"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ComplaintForm from "@/components/map/ComplaintForm";
import type { Complaint } from "@/types";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-accent/30 rounded-full" />
        <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" />
      </div>
      <p className="text-foreground/50 text-sm animate-pulse">Загрузка карты...</p>
    </div>
  ),
});

export default function MapPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newMarker, setNewMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetch("/api/complaints")
      .then(r => r.json())
      .then(data => setComplaints(Array.isArray(data) ? data : []))
      .catch(() => setComplaints([]))
      .finally(() => setInitialLoading(false));
  }, []);

  const handleComplaintAdded = (complaint: Complaint) => {
    setComplaints(prev => [complaint, ...prev]);
  };

  return (
    <motion.div
      className="flex h-screen bg-background text-foreground overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {initialLoading ? (
        <div className="w-full md:w-96 bg-primary border-r border-secondary/50 flex flex-col">
          <div className="p-6 border-b border-secondary/50">
            <div className="skeleton h-7 w-32 mb-2" />
            <div className="skeleton h-4 w-48" />
          </div>
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-10 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <ComplaintForm
          complaints={complaints}
          newMarker={newMarker}
          onComplaintAdded={handleComplaintAdded}
          onMarkerClear={() => setNewMarker(null)}
        />
      )}

      <div className="flex-1 relative z-10">
        <MapComponent
          complaints={complaints}
          newMarker={newMarker}
          setNewMarker={setNewMarker}
        />
      </div>
    </motion.div>
  );
}
