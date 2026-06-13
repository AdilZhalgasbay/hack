"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, MapPin, Zap, BrainCircuit, ChevronRight, ArrowDown, Users, CheckCircle, TrendingUp } from "lucide-react";

const STATS = [
  { value: "2,400+", label: "Жалоб обработано", icon: MapPin },
  { value: "89%", label: "Решено успешно", icon: CheckCircle },
  { value: "12", label: "Городских департаментов", icon: TrendingUp },
  { value: "5,000+", label: "Активных жителей", icon: Users },
];

const FEATURES = [
  {
    icon: MapPin,
    step: "01",
    title: "Укажите место",
    desc: "Кликните на интерактивную карту — мы автоматически определим улицу и адрес с точностью до метра.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "Опишите проблему",
    desc: "ИИ сам поймет, кому отправить жалобу: в Управление дорог, Службу ЖКХ или Водоканал.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Мгновенная реакция",
    desc: "Проблема мгновенно появляется на дашборде города с цветовым приоритетом срочности.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden">
      {/* Ambient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-accent/4 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/4 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-6 flex justify-between items-center z-50 sticky top-0 bg-background/60 backdrop-blur-xl border-b border-secondary/20"
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-accent" />
          <span className="text-2xl font-bold font-mono tracking-tight text-white">ГородОК</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-white transition-colors hidden sm:block">
            Как работает
          </a>
          <Link
            href="/login"
            className="text-sm font-medium text-foreground/80 hover:text-white transition-colors"
          >
            Войти
          </Link>
          <Link
            href="/map"
            className="text-sm font-medium bg-accent text-primary hover:bg-accent/90 px-4 py-2 rounded-full transition-all font-semibold hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            Открыть карту
          </Link>
        </div>
      </motion.header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center relative">
        <section className="flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-8"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Powered by Google Gemini AI · Track 3: City Safety</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-4xl"
          >
            Сделаем город лучше{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-300 to-blue-400 text-glow-accent">
              вместе с ИИ
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed mt-6"
          >
            Вы просто описываете проблему — умный алгоритм на базе Gemini сам определяет
            департамент, приоритет и точный адрес. Жалобы больше не теряются!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link href="/map">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center justify-center gap-2 bg-accent text-primary font-bold text-lg px-8 py-4 rounded-full overflow-hidden transition-all shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_-5px_rgba(34,197,94,0.7)]"
              >
                <MapPin className="w-5 h-5" />
                <span>Открыть Карту Жалоб</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            <a href="#how-it-works">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center justify-center gap-2 text-foreground/80 font-medium text-lg px-8 py-4 rounded-full border border-secondary/60 hover:bg-secondary/30 hover:text-white transition-all"
              >
                <ArrowDown className="w-4 h-4" />
                Как это работает?
              </motion.div>
            </a>
          </motion.div>
        </section>

        {/* Stats bar */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mx-auto px-6 mb-20"
        >
          <div className="glass-card p-6 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-secondary/30">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <stat.icon className="w-5 h-5 text-accent mb-2" />
                <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
                <span className="text-xs text-foreground/50 mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How it works */}
        <section id="how-it-works" className="w-full max-w-5xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Как это работает?</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Три простых шага — и ваша жалоба уже у ответственного департамента
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-7 relative overflow-hidden group hover:border-accent/30 transition-colors"
              >
                {/* Step number watermark */}
                <span className="absolute top-3 right-4 text-6xl font-black text-white/3 font-mono leading-none">
                  {feature.step}
                </span>

                <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:border-accent/40 transition-colors">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  <span className="text-accent/60 font-mono text-sm mr-2">{feature.step}</span>
                  {feature.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14 text-center"
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-white border border-secondary/40 hover:border-accent/40 px-6 py-3 rounded-full text-sm transition-all hover:bg-accent/5"
              >
                Посмотреть дашборд города <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-secondary/20 text-center text-sm text-foreground/30">
        ГородОК · SmartScape Hackathon 2025 · Track 3: City Safety & Social Services
      </footer>
    </div>
  );
}
