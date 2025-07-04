import { createContext, useContext, useState, ReactNode } from "react";
export type Notification = { id: string; text: string; read: boolean };
type Ctx = {
  notifications: Notification[];
  push: (n: Omit<Notification, "read">) => void;
  markRead: (id: string) => void;
};
const C = createContext<Ctx | null>(null);
export const useNotifications = () => {
  const ctx = useContext(C);
  if (!ctx) throw new Error("Provider missing");
  return ctx;
};
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, set] = useState<Notification[]>([]);
  const push = (n: Omit<Notification, "read">) =>
    set(p => [...p, { ...n, read: false }]);
  const markRead = (id: string) =>
    set(p => p.map(n => (n.id === id ? { ...n, read: true } : n)));
  return <C.Provider value={{ notifications, push, markRead }}>{children}</C.Provider>;
}
