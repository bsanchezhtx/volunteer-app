export const score = (vol, evt) =>
  evt.requiredSkills.filter(s => vol.skills.includes(s)).length +
  (vol.availability.includes(evt.date) ? 1 : 0) +
  evt.urgency;

export const bestEventFor = (vol, evts) =>
  evts.map(e => ({ e, s: score(vol, e) })).sort((a, b) => b.s - a.s)[0]?.e;
