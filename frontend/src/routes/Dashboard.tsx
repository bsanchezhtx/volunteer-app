import NavBar from "../components/NavBar";
import api from "../api";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { toast } from "react-toastify";

type notifType = {
  id: number;
  text: string;
  read: boolean;
};

type historyType = {
  status: string;
  event: { name: string; desc: string; date: string };
  date: Date;
};

export default function Dashboard() {
  const { user } = useAuthContext();
  const id = user?.id;
  const [notifs, setNotifs] = useState<notifType[] | null>(null);
  const [upcoming, setUpcoming] = useState<historyType[] | null>(null);
  const [history, setHistory] = useState<historyType[] | null>(null);

  useEffect(() => {
    //notifications
    api({
      method: "post",
      url: "/notifications",
      data: { id },
    })
      .then((response) => {
        setNotifs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error in retrieving notifications.");
      });

    // upcoming events
    api({
      method: "post",
      url: "/history/upcoming",
      data: { id },
    })
      .then((response) => {
        setUpcoming(response.data);
        console.error(response.data);
      })
      .catch((error) => {
        toast.warning("Unable to retrieve upcoming volunteer events.");
      });

    // previous events
    api({
      method: "post",
      url: "/history/completed",
      data: { id },
    })
      .then((response) => {
        setHistory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.warning("Unable to retrieve completed volunteer events.");
      });
  }, []);

  return (
    <>
      <NavBar />

      <h1 className="text-center fs-2 my-3 fw-bold">Dashboard</h1>
      <Container className="vw-100">
        <h2 className="fs-2 my-3 fw-bold text-start">Notifications</h2>
        {notifs ? (
          <>
            <ListGroup as="ul">
              {notifs.map((s) => (
                <ListGroup.Item as="li" className="fw-normal text-capitalize">
                  <Badge className="mx-3" bg="primary" pill>
                    {" "}
                  </Badge>
                  "{s.text}"
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <>
            <ListGroup as="ul">
              <ListGroup.Item as="li" className="fw-bolder text-capitalize">
                No notifications to display
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
        <h2 className="fs-2 my-3 fw-bold">Upcoming Events</h2>
        {upcoming ? (
          <>
            <ListGroup as="ul">
              {upcoming.map((s) => (
                <ListGroup.Item as="li" className="fw-bolder text-capitalize">
                  <Badge className="mx-3" bg="primary" pill>
                    {" "}
                  </Badge>
                  {s.event.name}, {s.event.date}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <>
            <ListGroup as="ul">
              <ListGroup.Item as="li" className="fw-bolder text-capitalize">
                No upcoming events
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
        <h2 className="fs-2 my-3 fw-bold">History</h2>
        {history ? (
          <>
            <ListGroup as="ul">
              {history.map((s) => (
                <ListGroup.Item as="li" className="fw-bolder text-capitalize">
                  <Badge className="mx-3" bg="primary" pill>
                    {" "}
                  </Badge>
                  {s.event.name}, {s.event.date}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <>
            <ListGroup as="ul">
              <ListGroup.Item as="li" className="fw-bolder text-capitalize">
                No completed events
              </ListGroup.Item>
            </ListGroup>
          </>
        )}
      </Container>
    </>
  );
}
