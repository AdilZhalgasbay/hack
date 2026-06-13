"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, MessageSquare, User, ShieldAlert, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Главная", href: "/dashboard", icon: LayoutDashboard },
  { name: "Карта жалоб", href: "/map", icon: MapPin },
  { name: "Чат жителей", href: "/chat", icon: MessageSquare, badge: 3 },
  { name: "Профиль", href: "/profile", icon: User },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-primary border-r border-secondary/50 flex flex-col h-full shrink-0 shadow-xl z-30 relative"
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-accent/3 blur-[60px] pointer-events-none" />

      {/* Brand */}
      <div className="p-6 border-b border-secondary/50 flex items-center gap-3 relative">
        <div className="w-9 h-9 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-xl font-bold font-mono tracking-tight text-white">ГородОК</span>
          <p className="text-[10px] text-foreground/40 leading-none mt-0.5">City Safety Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium relative ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-foreground/60 hover:bg-secondary/40 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-accent/10 rounded-xl border border-accent/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? "text-accent" : "text-foreground/40"}`} />
                <span className="truncate relative z-10">{item.name}</span>
                {item.badge && !isActive && (
                  <span className="ml-auto bg-accent text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full relative z-10">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-secondary/50">
        <div className="bg-secondary/20 border border-secondary/50 rounded-xl p-3 flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent to-blue-500 flex items-center justify-center text-primary font-bold text-sm shrink-0">
            А
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Азамат</p>
            <p className="text-xs text-foreground/40 truncate">azamat@mail.kz</p>
          </div>
          <div className="w-2 h-2 bg-accent rounded-full shrink-0" title="Онлайн" />
        </div>
        <Link href="/">
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs text-foreground/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Выйти
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
