import NavBar from '../components/NavBar';
import { useNotifications } from '../context/NotificationsContext';

export default function Dashboard() {
  const { notifications } = useNotifications();

  return (
    <>
      <NavBar />
      <h2>Volunteer Dashboard</h2>

      <section>
        <h3>My Upcoming Shifts</h3>
        <p>(none yet – shifts appear after matching)</p>
      </section>

      <section>
        <h3>Notifications</h3>
        {notifications.length===0
          ? <p>Nothing new.</p>
          : <ul>{notifications.map(n=>(
              <li key={n.id}>{n.text} {n.read?'✓':'(new)'}</li>
            ))}</ul>}
      </section>
    </>
  );
}

