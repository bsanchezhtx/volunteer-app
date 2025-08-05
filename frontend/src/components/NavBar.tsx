import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
export default function NavBar() {
  const { logout, user } = useAuthContext();

  return (
    <nav style={{ background: "#f6f6f6", padding: ".5rem 1rem" }}>
      <ul
        style={{ listStyle: "none", display: "flex", gap: "1rem", margin: 0 }}
      >
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/history">History</NavLink>
        </li>
        <li>
          <NavLink to="/notifications">Notifications</NavLink>
        </li>
        {user?.role === "admin" ? (
          <>
            <li>
              <NavLink to="/admin/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/admin/matching">Matching</NavLink>
            </li>
          </>
        ) : (
          <></>
        )}
        <li>
          <a onClick={logout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
}
