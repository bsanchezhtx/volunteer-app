import { NavLink } from "react-router";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav">
      <h2 className="site-title">Volunteer App</h2>
      <ul>
        <li>
          <NavLink to="/events">Event Management</NavLink>
        </li>
        <li>
          <NavLink to="/volunteers">Volunteer Matching</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
