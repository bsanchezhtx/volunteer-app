import NavBar from "../components/NavBar";
import { useNotifications } from "../context/NotificationsContext";
export default function Dashboard() {
  const { notifications } = useNotifications();
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
      <section style={{ padding: "1rem" }}>
        <h3>Upcoming Shifts</h3>
        <p>None yet.</p>
        <h3>Notifications</h3>
        {notifications.length === 0
          ? <p>No new notifications.</p>
          : <ul>{notifications.map(n => <li key={n.id}>{n.text}</li>)}</ul>}
      </section>
    </>
  );
}


