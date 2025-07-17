import { useState } from "react";
import NavBar from "../components/NavBar";
import { volunteers, events } from "../data/mockData";
import { bestEventFor } from "../utils/match";
import { useNotifications } from "../context/NotificationsContext";

export default function VolunteerMatching() {
  const [vid, setVid] = useState("");
  const { push } = useNotifications();
  const v = volunteers.find(x => x.id === vid);
  const suggestion = v ? bestEventFor(v, events) : undefined;

  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Volunteer Matching</h2>
      <section style={{ maxWidth: 400, margin: "1rem auto" }}>
        <select value={vid} onChange={e => setVid(e.target.value)} style={{ width: "100%" }}>
          <option value="">Select Volunteer</option>
          {volunteers.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>
        {v && suggestion && (
          <>
            <p><b>{v.name}</b> best matches <b>{suggestion.name}</b> on {suggestion.date}</p>
            <button onClick={() => {
              push({ id: crypto.randomUUID(), text: `${v.name} assigned to ${suggestion.name}` });
              alert("Assigned & notified ✓");
            }}>Assign & Notify</button>
          </>
        )}
      </section>
    </>
  );
}
