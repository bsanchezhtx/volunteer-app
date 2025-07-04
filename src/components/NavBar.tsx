import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav style={{ background: "#f6f6f6", padding: ".5rem 1rem" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem", margin: 0 }}>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/admin/events">Events</NavLink></li>
        <li><NavLink to="/admin/matching">Matching</NavLink></li>
        <li><NavLink to="/history">History</NavLink></li>
        <li><NavLink to="/notifications">Notifications</NavLink></li>
        <li><NavLink to="/login">Logout</NavLink></li>
      </ul>
    </nav>
  );
}


