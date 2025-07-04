import { createContext, useContext, useState, ReactNode } from 'react';

export type Notification = { id: string; text: string; read: boolean };

type Ctx = {
  notifications: Notification[];
  push: (n: Omit<Notification, 'read'>) => void;
  markRead: (id: string) => void;
};

const NotificationsContext = createContext<Ctx | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('NotificationsProvider missing');
  return ctx;
}

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, set] = useState<Notification[]>([]);

  const push = (n: Omit<Notification, 'read'>) =>
    set(prev => [...prev, { ...n, read: false }]);

  const markRead = (id: string) =>
    set(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));

  return (
    <NotificationsContext.Provider value={{ notifications, push, markRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}
