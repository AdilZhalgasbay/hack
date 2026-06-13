"use client";

import Link from "next/link";
import { ShieldAlert, ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const id = toast.loading("Выполняем вход...");
    setTimeout(() => {
      setLoading(false);
      toast.dismiss(id);
      toast.success("Добро пожаловать, Азамат!");
      router.push("/dashboard");
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 group text-foreground/60 hover:text-white transition-colors text-sm"
      >
        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        На главную
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 shadow-2xl shadow-black/60">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center mb-4 glow-accent-sm"
            >
              <ShieldAlert className="w-8 h-8 text-accent" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Вход в ГородОК</h1>
            <p className="text-foreground/50 text-sm mt-2 text-center">
              Авторизуйтесь, чтобы отслеживать жалобы и общаться с соседями
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email или ИИН</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-foreground/40" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Введите логин"
                  className="w-full bg-secondary/40 border border-secondary/50 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-foreground/30"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-foreground/80">Пароль</label>
                <a href="#" className="text-xs text-accent hover:underline">Забыли пароль?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-foreground/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-secondary/40 border border-secondary/50 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-foreground/30"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !email || !password}
              whileHover={{ scale: !loading && email && password ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-primary font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-accent/20 flex justify-center items-center glow-accent-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                "Войти"
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-secondary/30">
            <motion.button
              onClick={handleLogin}
              type="button"
              whileHover={{ scale: 1.01 }}
              className="w-full bg-secondary/30 hover:bg-secondary/50 border border-secondary/50 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Войти через Google
            </motion.button>

            <p className="text-center text-sm text-foreground/50 mt-5">
              Нет аккаунта?{" "}
              <a href="#" className="text-accent hover:underline">Зарегистрироваться</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
