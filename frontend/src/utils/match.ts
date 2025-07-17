import { Volunteer, Event } from "../types";
export const score = (vol: Volunteer, evt: Event) =>
  evt.requiredSkills.filter(s => vol.skills.includes(s)).length +
  (vol.availability.includes(evt.date) ? 1 : 0) +
  evt.urgency;
export const bestEventFor = (v: Volunteer, es: Event[]) =>
  es.map(e => ({ e, s: score(v, e) })).sort((a, b) => b.s - a.s)[0]?.e;

