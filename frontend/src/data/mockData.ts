import { Volunteer, Event } from "../types";
export const volunteers: Volunteer[] = [
  { id: "v1", name: "Alice Smith", skills: ["leadership", "communication"], availability: ["2025-07-10"] },
  { id: "v2", name: "Bob Jones", skills: ["teamwork", "communication"], availability: ["2025-07-11"] },
  { id: "v3", name: "Carlos Diaz", skills: ["leadership", "teamwork"], availability: ["2025-07-10"] }
];
export const events: Event[] = [
  { id: "e1", name: "Food Drive", requiredSkills: ["teamwork"], date: "2025-07-10", urgency: 2 },
  { id: "e2", name: "Gala", requiredSkills: ["communication"], date: "2025-07-11", urgency: 3 },
  { id: "e3", name: "Beach Cleanup", requiredSkills: ["leadership","teamwork"], date: "2025-07-10", urgency: 1 }
];
