import NavBar from "../components/NavBar";
import api from "../api";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect, useState } from "react";

type notifType = {
  id: number;
  text: string;
  read: boolean;
};

type historyType = {
  status: string;
  eventName: string;
  date: Date;
};

export default function Dashboard() {
  const { user } = useAuthContext();
  const id = user?.id;
  const [notifs, setNotifs] = useState<notifType[] | null>(null);
  const [upcoming, setUpcoming] = useState<historyType[] | null>(null);

  // useEffect(() => {
  //   try {
  //     api({
  //       method: "post",
  //       url: "/notifications",
  //       data: { id },
  //     }).then((response) => {
  //       setNotifs(response.data);
  //     });

  //     api({
  //       method: "post",
  //       url: "/history/upcoming",
  //       data: { id },
  //     }).then((response) => {
  //       setUpcoming(response.data);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
      <section style={{ padding: "1rem" }}>
        <h3>Upcoming Shifts</h3>
        {upcoming?.length === 0 ? (
          <p>No upcoming shifts.</p>
        ) : (
          <ul>
            {upcoming?.map((n) => (
              <li>{n.eventName}</li>
            ))}
          </ul>
        )}
        <h3>Notifications</h3>
        {!notifs ? (
          <p>No new notifications.</p>
        ) : (
          <ul>
            {notifs.map((n) => (
              <li key={n.id}>{n.text}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
