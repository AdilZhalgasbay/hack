export interface Complaint {
  id: string;
  text: string;
  lat: number;
  lng: number;
  category: string;
  department: string;
  priority: "Высокий" | "Средний" | "Низкий";
  address: string;
  date: string;
  created_at?: string;
}

export interface GeminiClassification {
  category: string;
  department: string;
  priority: "Высокий" | "Средний" | "Низкий";
  address: string;
}

export interface ChatMessage {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  isOwn?: boolean;
  room: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
  members: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  trustScore: number;
  joinDate: string;
  district: string;
  totalComplaints: number;
  resolvedComplaints: number;
  inProgressComplaints: number;
}

export interface StatWidget {
  label: string;
  value: number;
  delta?: string;
  color: string;
  icon: string;
}
