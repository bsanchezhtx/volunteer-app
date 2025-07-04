import { useState } from 'react';
import NavBar from '../components/NavBar';
import { volunteers, events } from '../data/mockData';
import { bestEventFor } from '../utils/match';
import { useNotifications } from '../context/NotificationsContext';

export default function VolunteerMatching() {
  const [selectedId, setSelectedId] = useState('');
  const { push } = useNotifications();

  const volunteer = volunteers.find(v => v.id===selectedId);
  const suggested = volunteer? bestEventFor(volunteer, events) : undefined;

  return (
    <>
      <NavBar />
      <h2>Match Volunteers to Events</h2>

      <label>Volunteer&nbsp;
        <select value={selectedId} onChange={e=>setSelectedId(e.target.value)}>
          <option value="">— choose —</option>
          {volunteers.map(v=>(
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </label>

      {volunteer && (
        <>
          <p><b>Skills:</b> {volunteer.skills.join(', ')}</p>
          {suggested? (
            <>
              <p><b>Matched Event:</b> {suggested.name} ({suggested.date})</p>
              <button onClick={()=>{
                push({
                  id: crypto.randomUUID(),
                  text:`${volunteer.name} assigned to ${suggested.name}`,
                });
                alert('Assignment saved (demo)');
              }}>
                Assign & Notify
              </button>
            </>
          ) : <p>No suitable event found.</p>}
        </>
      )}
    </>
  );
}

