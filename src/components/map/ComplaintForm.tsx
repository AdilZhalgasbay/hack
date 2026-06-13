"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Key, ShieldAlert, Clock, AlertTriangle, CheckCircle, Activity, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { classifyComplaint } from "@/lib/gemini";
import type { Complaint } from "@/types";

interface ComplaintFormProps {
  complaints: Complaint[];
  newMarker: { lat: number; lng: number } | null;
  onComplaintAdded: (complaint: Complaint) => void;
  onMarkerClear: () => void;
}

export default function ComplaintForm({ complaints, newMarker, onComplaintAdded, onMarkerClear }: ComplaintFormProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = {
    total: complaints.length,
    high: complaints.filter(c => c.priority === "Высокий").length,
    medium: complaints.filter(c => c.priority === "Средний").length,
    low: complaints.filter(c => c.priority === "Низкий").length,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarker || !text) return;

    setLoading(true);

    let mapAddress = "";
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newMarker.lat}&lon=${newMarker.lng}`
      );
      const data = await res.json();
      mapAddress = data.address?.road || data.address?.pedestrian || data.address?.suburb || "";
    } catch {
      // geocoding failed — will use AI address
    }

    const toastId = toast.loading("AI анализирует жалобу...", {
      icon: "🤖",
      style: { background: "#0F172A", color: "#F8FAFC", border: "1px solid rgba(30,41,59,0.8)", borderRadius: "12px" },
    });

    try {
      const classification = await classifyComplaint(text);
      const finalAddress = mapAddress || classification.address || "Локация не указана";

      const newComplaint: Complaint = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        lat: newMarker.lat,
        lng: newMarker.lng,
        category: classification.category,
        department: classification.department,
        priority: classification.priority,
        address: finalAddress,
        date: new Date().toISOString(),
      };

      await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComplaint),
      });

      onComplaintAdded(newComplaint);
      onMarkerClear();
      setText("");
      toast.dismiss(toastId);
      toast.success(`Жалоба отправлена! Категория: ${classification.category}`, { duration: 4000 });
    } catch {
      toast.dismiss(toastId);
      toast.error("Ошибка при отправке. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-96 bg-primary flex flex-col border-r border-secondary/50 shadow-2xl z-20 relative">
      {/* Header */}
      <div className="p-6 border-b border-secondary/50 bg-primary/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-accent" />
          ГородОК
        </h1>
        <p className="text-sm text-foreground/70 mt-1">AI-портал городских жалоб</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >


          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/90">Суть проблемы</label>
            <textarea
              required
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Опишите проблему подробнее..."
              rows={3}
              className="w-full bg-secondary/50 border border-secondary rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none placeholder:text-foreground/30"
            />
          </div>

          <AnimatePresence mode="wait">
            {newMarker ? (
              <motion.div
                key="has-marker"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 bg-accent/10 rounded-lg border border-accent/30 text-sm flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-accent">Место указано</p>
                  <p className="text-foreground/70 text-xs mt-0.5 font-mono">
                    {newMarker.lat.toFixed(4)}, {newMarker.lng.toFixed(4)}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="no-marker"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 bg-secondary/30 rounded-lg border border-secondary/50 text-sm flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-foreground/40 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Координаты</p>
                  <p className="text-foreground/50 text-xs mt-0.5">Кликните на карту, чтобы указать место</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={!newMarker || !text || loading}
            whileHover={{ scale: newMarker && text && !loading ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20 glow-accent-sm"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                AI анализирует...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Отправить жалобу
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Stats */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Статистика
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-secondary/40 p-3 rounded-lg border border-secondary/50 text-center"
            >
              <p className="text-2xl font-mono font-bold text-white">{stats.total}</p>
              <p className="text-xs text-foreground/70 mt-1 flex items-center justify-center gap-1">
                <Activity className="w-3 h-3" /> Всего заявок
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center"
            >
              <p className="text-2xl font-mono font-bold text-red-400">{stats.high}</p>
              <p className="text-xs text-foreground/70 mt-1 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3 text-red-400" /> Высокий
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20 text-center"
            >
              <p className="text-2xl font-mono font-bold text-yellow-400">{stats.medium}</p>
              <p className="text-xs text-foreground/70 mt-1">Средний</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="bg-accent/10 p-3 rounded-lg border border-accent/20 text-center"
            >
              <p className="text-2xl font-mono font-bold text-accent">{stats.low}</p>
              <p className="text-xs text-foreground/70 mt-1 flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3 text-accent" /> Низкий
              </p>
            </motion.div>
          </div>
        </div>

        {/* Recent complaints */}
        {complaints.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-3">
              Последние жалобы
            </h2>
            <div className="space-y-2">
              {complaints.slice(0, 4).map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 bg-secondary/30 rounded-lg border border-secondary/40 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{c.category}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      c.priority === "Высокий" ? "bg-red-500/20 text-red-400" :
                      c.priority === "Средний" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-accent/20 text-accent"
                    }`}>
                      {c.priority}
                    </span>
                  </div>
                  <p className="text-foreground/60 truncate">{c.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
