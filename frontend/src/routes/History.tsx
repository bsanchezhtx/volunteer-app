import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/AuthProvider";
import api from "../api";
import { useEffect, useState } from "react";

type historyType = {
  id: number;
  status: string;
  date: string;
  eventName: string;
};

const history = [
  {
    id: "h1",
    name: "Food Drive",
    desc: "Collect cans",
    loc: "Main St",
    date: "2025-05-12",
    urgency: "Medium",
    skills: ["teamwork"],
    status: "Completed",
  },
  {
    id: "h2",
    name: "Beach Cleanup",
    desc: "Trash pickup",
    loc: "Coast",
    date: "2025-06-02",
    urgency: "Low",
    skills: ["leadership", "teamwork"],
    status: "Signed Up",
  },
];
export default function History() {
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: "center" }}>Participation History</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
            <th>Urgency</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.desc}</td>
              <td>{e.loc}</td>
              <td>{e.date}</td>
              <td>{e.urgency}</td>
              <td>{e.skills.join(", ")}</td>
              <td>{e.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
