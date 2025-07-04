import NavBar from "../components/NavBar";
import { useNotifications } from "../context/NotificationsContext";
export default function NotificationsPage() {
  const { notifications, markRead } = useNotifications();
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Notifications</h2>
      {notifications.length === 0
        ? <p style={{ textAlign: "center" }}>No notifications.</p>
        : <ul>{notifications.map(n => (
            <li key={n.id}>
              {n.text} {!n.read && <button onClick={() => markRead(n.id)}>Mark read</button>}
            </li>
          ))}</ul>}
    </>
  );
}
