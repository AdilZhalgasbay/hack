"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Users, Hash, CheckCheck, Search, Phone, Video } from "lucide-react";
import type { ChatMessage, ChatRoom } from "@/types";

const ROOMS: ChatRoom[] = [
  { id: "1", name: "Микрорайон 11", lastMessage: "Когда починят яму на Алтынсарина?", unread: 3, members: 128 },
  { id: "2", name: "Жилгородок", lastMessage: "Вода дала, спасибо всем!", unread: 0, members: 89 },
  { id: "3", name: "Центр города", lastMessage: "Светофор на пересечении не работает", unread: 7, members: 214 },
  { id: "4", name: "Общий чат КСК", lastMessage: "Собрание в пятницу в 18:00", unread: 1, members: 45 },
];

const MESSAGES: Record<string, ChatMessage[]> = {
  "1": [
    { id: "1", author: "Бекзат Д.", avatar: "Б", text: "Добрый день! Когда наконец починят яму на углу Алтынсарина и Маресьева? Машины уже ломаются...", time: "09:14", room: "1" },
    { id: "2", author: "Сауле М.", avatar: "С", text: "Согласна! Я уже третью жалобу подала через ГородОК, говорят что принято в работу", time: "09:22", room: "1" },
    { id: "3", author: "Нурлан К.", avatar: "Н", text: "Видел сегодня машину из Управления дорог — замеряли глубину ям. Может скоро начнут?", time: "09:45", room: "1" },
    { id: "4", author: "Азамат", avatar: "А", text: "Отлично! Я тоже подал жалобу через ГородОК, приоритет автоматически поставили 'Высокий' — значит быстрее должны отреагировать", time: "10:02", room: "1", isOwn: true },
    { id: "5", author: "Администратор КСК", avatar: "КСК", text: "Коллеги, жалоба принята Управлением дорог, срок устранения — до 20 июня. Вы можете отслеживать статус через портал.", time: "10:30", room: "1" },
    { id: "6", author: "Бекзат Д.", avatar: "Б", text: "Отлично, наконец-то результат! Спасибо ГородОК 👍", time: "10:33", room: "1" },
    { id: "7", author: "Диана Р.", avatar: "Д", text: "Кстати, а там ещё фонарь рядом не горит неделю уже. Тоже надо подать жалобу", time: "11:05", room: "1" },
    { id: "8", author: "Азамат", avatar: "А", text: "Я подам прямо сейчас через приложение, секунду", time: "11:07", room: "1", isOwn: true },
  ],
  "2": [
    { id: "1", author: "Айгерим Б.", avatar: "А", text: "Воду дали наконец-то! Спасибо всем кто жаловался через ГородОК 🙏", time: "14:22", room: "2" },
    { id: "2", author: "Ержан Т.", avatar: "Е", text: "Да, AI сразу поставил 'Высокий' приоритет и направил в Водоканал — очень удобно!", time: "14:35", room: "2" },
  ],
  "3": [
    { id: "1", author: "Марат С.", avatar: "М", text: "Светофор на пересечении Ленина и Маяковского уже 3 дня не работает. Это опасно!", time: "08:00", room: "3" },
    { id: "2", author: "Полицейский патруль", avatar: "П", text: "Обращение принято, регулировщик уже направлен на место. Спасибо за оперативное сообщение.", time: "08:45", room: "3" },
  ],
  "4": [
    { id: "1", author: "Председатель КСК", avatar: "КСК", text: "Уважаемые жители! Напоминаю — общее собрание в пятницу 20 июня в 18:00 в актовом зале. Повестка: благоустройство двора и новый контракт на вывоз мусора.", time: "09:00", room: "4" },
  ],
};

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRoomData = ROOMS.find(r => r.id === activeRoom);
  const currentMessages = messages[activeRoom] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom, messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      author: "Азамат",
      avatar: "А",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      room: activeRoom,
    };

    setMessages(prev => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMsg],
    }));
    setInputValue("");
  };

  const filteredRooms = ROOMS.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full bg-background text-foreground overflow-hidden"
    >
      {/* Rooms sidebar */}
      <div className="w-72 border-r border-secondary/50 flex flex-col shrink-0 bg-primary/30">
        <div className="p-4 border-b border-secondary/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-accent" />
            Чат жителей
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-foreground/40" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск чата..."
              className="w-full bg-secondary/50 border border-secondary/50 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-foreground/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {filteredRooms.map(room => (
            <motion.button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              whileHover={{ x: 2 }}
              className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                activeRoom === room.id
                  ? "bg-accent/10 border-r-2 border-accent"
                  : "hover:bg-secondary/30"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/40 to-blue-500/40 flex items-center justify-center text-white text-sm font-bold shrink-0">
                <Hash className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium truncate ${activeRoom === room.id ? "text-white" : "text-foreground/80"}`}>
                    {room.name}
                  </span>
                  {room.unread > 0 && (
                    <span className="bg-accent text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {room.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground/40 truncate mt-0.5">{room.lastMessage}</p>
                <p className="text-[10px] text-foreground/30 mt-0.5 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {room.members} участников
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-secondary/50 bg-primary/20 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/40 to-blue-500/40 flex items-center justify-center">
              <Hash className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{activeRoomData?.name}</h3>
              <p className="text-xs text-foreground/50 flex items-center gap-1">
                <Users className="w-3 h-3" /> {activeRoomData?.members} участников
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-foreground/40 hover:text-white hover:bg-secondary/50 rounded-lg transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-foreground/40 hover:text-white hover:bg-secondary/50 rounded-lg transition-colors">
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <AnimatePresence>
            {currentMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-end gap-2 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`}
              >
                {!msg.isOwn && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center text-xs font-bold text-white shrink-0 mb-1">
                    {msg.avatar}
                  </div>
                )}
                <div className={`max-w-[70%] ${msg.isOwn ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {!msg.isOwn && (
                    <span className="text-xs text-foreground/50 ml-1">{msg.author}</span>
                  )}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isOwn
                      ? "bg-accent text-primary rounded-br-sm font-medium"
                      : "bg-secondary/50 text-foreground/90 rounded-bl-sm border border-secondary/40"
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] text-foreground/30 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                    <span>{msg.time}</span>
                    {msg.isOwn && <CheckCheck className="w-3 h-3 text-accent/60" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="px-6 py-4 border-t border-secondary/50 bg-primary/20 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 bg-secondary/40 border border-secondary/50 rounded-2xl px-4 py-2 focus-within:border-accent/40 transition-colors">
            <input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-foreground/30 focus:outline-none"
            />
            <motion.button
              type="submit"
              disabled={!inputValue.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-accent disabled:opacity-40 rounded-xl flex items-center justify-center text-primary transition-all"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
