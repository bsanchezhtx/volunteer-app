import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { StylesConfig } from "react-select";
import DatePicker from "react-datepicker";
import api from "../api";
import skills from "../data/skills";
import NavBar from "../components/NavBar";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";

type EventForm = {
  name: string;
  description: string;
  location: string;
  skills: { value: string; label: string }[];
  urgency: string;
  date: Date | null;
};

const urgencyOptions = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

type skillType = {
  label: string;
  value: string;
};

type IsMulti = true;

const selectStyle: StylesConfig<skillType, IsMulti> = {
  control: (provided, state) => {
    const { selectProps } = state;
    return {
      ...provided,
      backgroundColor: "#212529",
      borderColor: !state.isFocused ? "#495057" : "#0d6efd",
    };
  },
  multiValue: (provided, state) => {
    const { selectProps } = state;
    return {
      ...provided,
      backgroundColor: "#0d6efd",
    };
  },
  multiValueLabel: (provided, state) => {
    const { selectProps } = state;
    return {
      ...provided,
      color: "#dee2e6",
    };
  },
  menu: (provided, state) => {
    const { selectProps } = state;
    return {
      ...provided,
      backgroundColor: "#212529",
    };
  },
  option: (provided, state) => {
    const { selectProps } = state;
    return {
      ...provided,
      backgroundColor: state.isFocused ? "#0d6efd" : "#212529",
    };
  },
};

export default function EventManagement() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventForm>();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/events").then(({ data }) => setEvents(data));
  }, []);

  async function onSubmit(f: EventForm) {
    console.log(parseInt(f.urgency));
    await api
      .post("/events", {
        name: f.name,
        description: f.description,
        location: f.location,
        requiredSkills: f.skills,
        urgency: parseInt(f.urgency),
        date: f.date?.toISOString(),
      })
      .then((response) => {
        toast.success("Event Saved.");
      })
      .catch((error) => {
        toast.warning("Unable to save event, please try again.");
      });
    api.get("/events").then(({ data }) => setEvents(data));
  }

  return (
    <>
      <NavBar />
      <Container className="vw-25">
        <h1 className="fs-2 my-2 fw-bold">Create an event</h1>
        <Form
          className="my-2 gap-1"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group id="name">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Event Name"
              {...register("name", {
                required: { value: true, message: "This field is required" },
                maxLength: { value: 50, message: "Maximum of 50 characters" },
              })}
            ></Form.Control>
          </Form.Group>

          <Form.Group id="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("description", {
                required: { value: true, message: "This field is required" },
                maxLength: { value: 250, message: "Maximum of 250 characters" },
              })}
            ></Form.Control>
          </Form.Group>

          <Form.Group id="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              {...register("location", {
                required: { value: true, message: "This field is required" },
                maxLength: { value: 250, message: "Maximum of 250 characters" },
              })}
            ></Form.Control>
          </Form.Group>

          <Form.Group id="requiredSkills">
            <Form.Label>Required Skills</Form.Label>
            <Controller
              control={control}
              name="skills"
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={skills}
                  placeholder="Skills"
                  styles={selectStyle}
                />
              )}
            />
          </Form.Group>

          <Form.Group id="urgency">
            <Form.Label>Urgency</Form.Label>
            <Form.Select
              {...register("urgency", {
                required: { value: true, message: "This field is required" },
              })}
            >
              <option value="1">Low</option>
              <option value="2">Moderate</option>
              <option value="3">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group id="date" className="my-3">
            <Form.Label className="mx-2">Event Date</Form.Label>
            <Controller
              control={control}
              name="date"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  placeholderText="Event Date"
                />
              )}
            />
            {errors.date && <small>Required</small>}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mx-auto my-3 justify-content-center"
          >
            Create
          </Button>
        </Form>
      </Container>
      <Container>
        <h3>All events</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Skills</th>
              <th>Urgency</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td>{e.location}</td>
                <td>{e.skills}</td>
                <td>{["", "Low", "Medium", "High"][e.urgency]}</td>
                <td>{e.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {/*
        <h3 style={{ marginTop: "2rem" }}>All Events</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Urgency</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.date}</td>
                <td>{["", "Low", "Medium", "High"][e.urgency]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form> */}
    </>
  );
}
