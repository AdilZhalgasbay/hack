"use client";

import { motion } from "framer-motion";
import { User, Activity, MapPin, CheckCircle, Clock, Award, TrendingUp, Star, ShieldCheck } from "lucide-react";

const HISTORY = [
  { title: "Яма на ул. Кунаева, 45", category: "Дороги", status: "Решено", date: "Вчера", dept: "Управление дорог", priority: "Высокий" },
  { title: "Не работает светофор на Ленина", category: "Безопасность", status: "В процессе", date: "3 дня назад", dept: "Полиция", priority: "Высокий" },
  { title: "Мусор во дворе дома №12", category: "Мусор", status: "Решено", date: "Неделю назад", dept: "Служба санитарии", priority: "Низкий" },
  { title: "Протечка трубы в подвале", category: "Водоснабжение", status: "Решено", date: "2 недели назад", dept: "Водоканал", priority: "Средний" },
  { title: "Не горит фонарь на аллее", category: "Освещение", status: "Отклонено", date: "3 недели назад", dept: "Служба ЖКХ", priority: "Низкий" },
];

const ACHIEVEMENTS = [
  { icon: Star, label: "Первая жалоба", desc: "Подана первая жалоба", earned: true },
  { icon: TrendingUp, label: "Активный гражданин", desc: "10+ жалоб подано", earned: true },
  { icon: ShieldCheck, label: "Доверенный источник", desc: "Рейтинг выше 80", earned: true },
  { icon: Award, label: "Решатель проблем", desc: "8 жалоб решено", earned: false },
];

const STATUS_CONFIG = {
  "Решено": { color: "text-accent", bg: "bg-accent/15 border-accent/30" },
  "В процессе": { color: "text-yellow-400", bg: "bg-yellow-400/15 border-yellow-400/30" },
  "Отклонено": { color: "text-red-400", bg: "bg-red-400/15 border-red-400/30" },
};

const PRIORITY_COLOR = {
  "Высокий": "text-red-400",
  "Средний": "text-yellow-400",
  "Низкий": "text-accent",
};

export default function ProfilePage() {
  const resolved = HISTORY.filter(h => h.status === "Решено").length;
  const inProgress = HISTORY.filter(h => h.status === "В процессе").length;
  const resolvedPct = Math.round((resolved / HISTORY.length) * 100);

  return (
    <div className="flex-1 flex flex-col h-full bg-background text-foreground overflow-y-auto relative">
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none -z-0" />

      <div className="relative z-10 p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <User className="w-8 h-8 text-accent" />
            Мой профиль
          </h1>
          <p className="text-foreground/70 mt-2">Управление аккаунтом и история ваших обращений</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent to-blue-500 flex items-center justify-center text-primary font-bold text-3xl shadow-lg glow-accent-sm">
                  А
                </div>
                <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">Азамат Нурмагамбетов</h2>
              <p className="text-foreground/50 text-sm mt-1">azamat@mail.kz</p>
              <p className="text-xs text-foreground/40 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Актобе, Микрорайон 11
              </p>

              {/* Trust score */}
              <div className="w-full mt-6 bg-secondary/40 p-4 rounded-xl border border-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Рейтинг доверия</p>
                  <span className="text-accent font-mono font-bold text-lg">85</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-accent to-emerald-300 rounded-full"
                  />
                </div>
                <p className="text-xs text-foreground/40 mt-2">Выше, чем у 92% жителей</p>
              </div>

              {/* Member since */}
              <div className="w-full mt-3 p-3 bg-secondary/20 rounded-xl border border-secondary/30 text-xs text-foreground/50 flex items-center justify-center gap-2">
                <Clock className="w-3 h-3" />
                Участник с марта 2025
              </div>
            </div>
          </motion.div>

          {/* Stats + history */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Activity, label: "Всего заявок", value: HISTORY.length, color: "text-blue-400", bg: "bg-blue-400/10" },
                { icon: CheckCircle, label: "Решено", value: resolved, color: "text-accent", bg: "bg-accent/10" },
                { icon: MapPin, label: "В процессе", value: inProgress, color: "text-yellow-400", bg: "bg-yellow-400/10" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="glass-card p-4 flex flex-col items-center text-center"
                >
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-2`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-2xl font-mono font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-foreground/50 mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Resolution rate */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Процент решённых жалоб</span>
                <span className="text-accent font-mono font-bold">{resolvedPct}%</span>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${resolvedPct}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-accent to-emerald-400 rounded-full"
                />
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5"
            >
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" /> Достижения
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex items-center gap-3 ${
                      a.earned
                        ? "bg-accent/10 border-accent/30"
                        : "bg-secondary/20 border-secondary/30 opacity-50"
                    }`}
                  >
                    <a.icon className={`w-5 h-5 shrink-0 ${a.earned ? "text-accent" : "text-foreground/30"}`} />
                    <div>
                      <p className="text-xs font-semibold text-white">{a.label}</p>
                      <p className="text-[10px] text-foreground/50">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* History */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-5"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                История обращений
              </h3>
              <div className="space-y-3">
                {HISTORY.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.06 }}
                    className="flex items-center justify-between p-4 bg-secondary/20 border border-secondary/30 rounded-xl hover:border-secondary/60 transition-colors"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <h4 className="font-medium text-white text-sm truncate">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-medium ${PRIORITY_COLOR[item.priority as keyof typeof PRIORITY_COLOR]}`}>
                          {item.priority}
                        </span>
                        <span className="text-[10px] text-foreground/40">{item.dept}</span>
                        <span className="text-[10px] text-foreground/30">{item.date}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${
                      STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]?.bg || ""
                    } ${STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]?.color || ""}`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
