import { Volunteer, Event } from '../types';

export function score(vol: Volunteer, evt: Event) {
  const skillMatch = evt.requiredSkills.filter(s => vol.skills.includes(s)).length;
  const dateMatch  = vol.availability.includes(evt.date) ? 1 : 0;
  return skillMatch + dateMatch + evt.urgency;
}

export function bestEventFor(vol: Volunteer, events: Event[]) {
  return events
    .map(evt => ({ evt, s: score(vol, evt) }))
    .sort((a, b) => b.s - a.s)[0]?.evt;
}
