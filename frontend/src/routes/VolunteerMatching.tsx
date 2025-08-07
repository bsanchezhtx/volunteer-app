import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { bestEventFor } from "../utils/match";
import { useNotifications } from "../context/NotificationsContext";
import api from "../api";

type volunteer = {
  id: number;
  fullName: string;
};

type suggestedEvent = {
  id: number;
  name: string;
  description: string;
  location: string;
  requiredSkills: string;
  urgency: number;
  date: string;
};

export default function VolunteerMatching() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [suggestion, setSuggestion] = useState<suggestedEvent | null>(null);
  const [v, setV] = useState<volunteer | null>(null);
  const [vid, setVid] = useState("");

  const { push } = useNotifications();

  // const suggestion = v ? bestEventFor(v, events) : undefined;

  useEffect(() => {
    api.get("/match/volunteers").then(({ data }) => setVolunteers(data));
    api.get("/events").then(({ data }) => setEvents(data));
  }, []);

  const findSuggestion = async (id: string) => {
    const volunteerId = parseInt(id);
    setV(volunteers.find((e) => e.id === volunteerId));
    try {
      await api({
        method: "post",
        url: "/match/suggest",
        data: { volunteerId },
      }).then((response) => {
        if (response) {
          setSuggestion(response.data);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const assignAndNotify = async (volunteerId: number, eventId: number) => {
    await api({
      method: "post",
      url: "/match/assign",
      data: { volunteerId, eventId },
    });

    alert("Assigned & notified ✓");
  };
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Volunteer Matching</h2>
      <section style={{ maxWidth: 400, margin: "1rem auto" }}>
        <select
          value={vid}
          onChange={(e) => findSuggestion(e.target.value)}
          style={{ width: "100%" }}
        >
          <option value="">Select Volunteer</option>
          {volunteers.map((v) => (
            <option key={v.id} value={v.id}>
              {v.fullName}
            </option>
          ))}
        </select>
        {v && suggestion && (
          <>
            <p>
              <b>{v.fullName}</b> best matches <b>{suggestion.name}</b> on{" "}
              {suggestion.date}
            </p>
            <button onClick={() => {}}>Assign & Notify</button>
          </>
        )}
      </section>
    </>
  );
}
