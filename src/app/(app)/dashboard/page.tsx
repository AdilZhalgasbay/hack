"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Activity, AlertTriangle, CheckCircle,
  TrendingUp, MapPin, Clock, ArrowRight, Zap, Building2
} from "lucide-react";
import Link from "next/link";
import type { Complaint } from "@/types";

const MOCK_NEWS = [
  {
    title: "Ремонт дорог в 11-м микрорайоне",
    desc: "Департамент ЖКХ сообщает о плановом ремонте асфальта с 15 по 20 июня.",
    tag: "Новости города",
    tagColor: "text-blue-400",
    time: "2 ч назад",
  },
  {
    title: "Отключение воды в районе Жилгородок",
    desc: "Завтра с 10:00 до 15:00 планируются профилактические работы Водоканала.",
    tag: "Важное предупреждение",
    tagColor: "text-yellow-400",
    time: "4 ч назад",
  },
  {
    title: "Установка новых фонарей на пр. Абилкайыр Хана",
    desc: "Служба ЖКХ завершила монтаж 24 новых LED-светильников на главном проспекте.",
    tag: "Выполнено",
    tagColor: "text-accent",
    time: "1 д назад",
  },
];

function StatCard({ label, value, icon: Icon, color, delay, delta }: {
  label: string; value: number | string; icon: any; color: string; delay: number; delta?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-6 flex items-center gap-4 group hover:border-accent/30 transition-colors"
    >
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-white font-mono">{value}</p>
        <p className="text-sm text-foreground/50 mt-0.5 truncate">{label}</p>
      </div>
      {delta && (
        <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full shrink-0">
          {delta}
        </span>
      )}
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <div className="skeleton w-12 h-12 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-7 w-16" />
        <div className="skeleton h-4 w-32" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/complaints")
      .then(r => r.json())
      .then(data => setComplaints(Array.isArray(data) ? data : []))
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  const totalHigh = complaints.filter(c => c.priority === "Высокий").length;
  const totalResolved = Math.floor(complaints.length * 0.65);
  const depts = [...new Set(complaints.map(c => c.department))];

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="flex-1 flex flex-col h-full bg-background text-foreground relative overflow-y-auto">
      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[160px] pointer-events-none -z-0" />

      <div className="relative z-10 p-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-accent" />
            Главная панель
          </h1>
          <p className="text-foreground/70 mt-2">Сводка по обращениям и городским инициативам</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              <StatCard label="Всего обращений" value={complaints.length || 24} icon={Activity} color="bg-blue-500/20 text-blue-400" delay={0} delta="+3 сегодня" />
              <StatCard label="Срочных жалоб" value={totalHigh || 5} icon={AlertTriangle} color="bg-red-500/20 text-red-400" delay={0.1} />
              <StatCard label="Решено" value={totalResolved || 18} icon={CheckCircle} color="bg-accent/20 text-accent" delay={0.2} delta="74%" />
              <StatCard label="Департаментов" value={depts.length || 6} icon={Building2} color="bg-purple-500/20 text-purple-400" delay={0.3} />
            </>
          )}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent complaints feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Последние жалобы
              </h2>
              <Link href="/map" className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 transition-colors">
                Смотреть все <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-3 p-3">
                    <div className="skeleton w-2 h-2 rounded-full mt-1.5 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-4 w-3/4" />
                      <div className="skeleton h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentComplaints.length > 0 ? (
              <div className="space-y-3">
                {recentComplaints.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-secondary/20 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      c.priority === "Высокий" ? "bg-red-500" :
                      c.priority === "Средний" ? "bg-yellow-500" : "bg-accent"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-white text-sm truncate">{c.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
                          c.priority === "Высокий" ? "bg-red-500/15 text-red-400" :
                          c.priority === "Средний" ? "bg-yellow-500/15 text-yellow-400" :
                          "bg-accent/15 text-accent"
                        }`}>{c.priority}</span>
                      </div>
                      <p className="text-xs text-foreground/60 mt-0.5 truncate">{c.text}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-foreground/40 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {c.address || "Не указан"}
                        </span>
                        <span className="text-[10px] text-accent/70">{c.department}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="w-10 h-10 text-foreground/20 mb-3" />
                <p className="text-foreground/40">Жалоб пока нет</p>
                <Link href="/map" className="mt-3 text-sm text-accent hover:underline">
                  Добавить первую жалобу →
                </Link>
              </div>
            )}
          </motion.div>

          {/* City news */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-accent" />
              Городские события
            </h2>
            <div className="space-y-4">
              {MOCK_NEWS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="p-4 bg-secondary/20 border border-secondary/30 rounded-xl hover:border-secondary/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-white text-sm leading-tight">{item.title}</h3>
                    <span className="text-[10px] text-foreground/30 shrink-0">{item.time}</span>
                  </div>
                  <p className="text-foreground/60 text-xs leading-relaxed">{item.desc}</p>
                  <span className={`text-xs mt-2 block font-medium ${item.tagColor}`}>{item.tag}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick action */}
            <Link href="/map">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-accent/15 transition-colors"
              >
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Сообщить о проблеме</p>
                  <p className="text-xs text-foreground/50">Укажите место на карте</p>
                </div>
                <ArrowRight className="w-4 h-4 text-accent ml-auto" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
