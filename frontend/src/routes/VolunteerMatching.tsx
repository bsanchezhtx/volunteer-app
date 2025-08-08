import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import NavBar from "../components/NavBar";
import api from "../api";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

type volunteer = {
  id: number;
  fullName: string;
  skills: { value: string; label: string }[];
  availability: string[];
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

type FormType = {
  id: number;
};

export default function VolunteerMatching() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [suggestion, setSuggestion] = useState<suggestedEvent | null>(null);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [selectedVolunteer, setSelectedVolunteer] = useState<volunteer | null>(
    null
  );
  const [volunteerId, setVolunteerId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();

  useEffect(() => {
    api.get("/match/volunteers").then(({ data }) => {
      setVolunteers(data);
      console.log(volunteers);
    });
    api.get("/events").then(({ data }) => setEvents(data));
  }, []);

  const findSuggestion = async (id: string) => {
    const vid = parseInt(id);
    await api({
      method: "post",
      url: "/match/suggest",
      data: { vid },
    })
      .then((response) => {
        setSuggestion(response.data);
      })
      .catch((error) => {
        toast.warning("Unable to find an ideal match for this volunteer");
      });
  };

  const assignAndNotify = async (f: FormType) => {
    const eventId = f.id;
    const vid = selectedVolunteer?.id;
    await api({
      method: "post",
      url: "/match/assign",
      data: { vid, eventId },
    })
      .then((response) => {
        toast.success("Assigned & notified!");
      })
      .catch((error) => {
        toast.warning("Unable to assign volunteer.");
      });
  };

  return (
    <>
      <NavBar />
      <Container className="vw-40">
        {volunteers.length > 0 ? (
          <>
            <h1 className="fs-2 my-2 fw-bold">
              1. Select a volunteer to match
            </h1>
            <Form.Select
              onChange={(e) => {
                setSelectedVolunteer(
                  volunteers.find((v) => v.id === parseInt(e.target.value))
                );
                findSuggestion(e.target.value);
              }}
            >
              {volunteers.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.fullName}
                </option>
              ))}
            </Form.Select>
          </>
        ) : (
          <></>
        )}

        {selectedVolunteer ? (
          <>
            <Card className="my-3">
              <Card.Body>
                <Card.Title className="fw-bold">
                  {selectedVolunteer.fullName}
                </Card.Title>
                <Card.Text className="px-3 fw-bolder">
                  <p>Skills</p>
                  {selectedVolunteer.skills.map((s) => (
                    <li className="fw-normal text-capitalize">{s.value}</li>
                  ))}
                </Card.Text>
                <Card.Text className="px-3 fw-bolder">
                  <p>Availability</p>
                  {selectedVolunteer.availability.map((a) => (
                    <li className="fw-normal">{a.split("T")[0]}</li>
                  ))}
                </Card.Text>
                <Card.Text className="px-3 fw-bolder">
                  <p>Best Match</p>
                  <li>
                    {suggestion?.name}, {suggestion?.date}
                  </li>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        ) : (
          <></>
        )}
        <h1 className="fs-2 my-2 fw-bold">
          2. Select an event to assign to {selectedVolunteer?.fullName}
          <Form noValidate onSubmit={handleSubmit(assignAndNotify)}>
            <Form.Select
              className="my-2"
              {...register("id")}
              onChange={(e) => {
                setSelectedEvent(parseInt(e.target.value));
              }}
            >
              {events.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </Form.Select>
            <Button type="submit" variant="primary">
              Assign
            </Button>
          </Form>
        </h1>
      </Container>
      {/* <h2 style={{ textAlign: "center" }}>Volunteer Matching</h2>
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
      </section> */}
    </>
  );
}
