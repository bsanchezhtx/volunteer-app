import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { bestEventFor } from "../utils/match";
import { useNotifications } from "../context/NotificationsContext";
import api from "../api";

type volunteer = {
  id: number;
  fullName: string;
};

export default function VolunteerMatching() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [vid, setVid] = useState("");
  const { push } = useNotifications();

  const v = volunteers.find((x) => x.id === vid);
  const suggestion = v ? bestEventFor(v, events) : undefined;

  useEffect(() => {
    api.get("/match/volunteers").then(({ data }) => setVolunteers(data));
    api.get("/events").then(({ data }) => setEvents(data));
  }, []);

  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Volunteer Matching</h2>
      <section style={{ maxWidth: 400, margin: "1rem auto" }}>
        <select
          value={vid}
          onChange={(e) => setVid(e.target.value)}
          style={{ width: "100%" }}
        >
          <option value="">Select Volunteer</option>
          {volunteers.map((v) => (
            <option key={v.id} value={v.fullName}>
              {v.fullName}
            </option>
          ))}
        </select>
        {v && suggestion && (
          <>
            <p>
              <b>{v.name}</b> best matches <b>{suggestion.name}</b> on{" "}
              {suggestion.date}
            </p>
            <button
              onClick={() => {
                push({
                  id: crypto.randomUUID(),
                  text: `${v.name} assigned to ${suggestion.name}`,
                });
                alert("Assigned & notified ✓");
              }}
            >
              Assign & Notify
            </button>
          </>
        )}
      </section>
    </>
  );
}
