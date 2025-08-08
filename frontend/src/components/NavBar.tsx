import { useAuthContext } from "../context/AuthProvider";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function NavBar() {
  const { logout, user } = useAuthContext();

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Navbar.Brand className="mx-2" href="/dashboard">
          Volunteer App
        </Navbar.Brand>
        <Nav className="me-auto ms-5">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/history">History</Nav.Link>
          <Nav.Link href="/notifications">Notifications</Nav.Link>
          {user?.role === "admin" ? (
            <>
              <Nav.Link href="/admin/events">Event Management</Nav.Link>
              <Nav.Link href="/admin/matching">Volunteer Matching</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/events">Events</Nav.Link>
            </>
          )}
        </Nav>
        <Button className="mx-2" variant="outline-light" onClick={logout}>
          Logout
        </Button>
      </Navbar>
    </>
  );
}
