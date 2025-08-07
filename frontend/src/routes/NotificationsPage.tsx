import NavBar from "../components/NavBar";
import { useNotifications } from "../context/NotificationsContext";
import { useAuthContext } from "../context/AuthProvider";
import api from "../api";
import { useEffect, useState } from "react";

type notifType = {
  id: number;
  text: string;
  read: boolean;
};

export default function NotificationsPage() {
  const { user } = useAuthContext();
  const id = user?.id;
  const { notifications, markRead } = useNotifications();
  const [notifs, setNotifs] = useState<notifType[] | null>(null);

  useEffect(() => {
    try {
      api({
        method: "post",
        url: "/notifications",
        data: { id },
      }).then((response) => {
        setNotifs(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Notifications</h2>
      {notifications.length === 0 ? (
        <p style={{ textAlign: "center" }}>No notifications.</p>
      ) : (
        <ul>
          {notifs?.map((n) => (
            <li key={n.id}>
              {n.text} {!n.read && <button>Mark read</button>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
