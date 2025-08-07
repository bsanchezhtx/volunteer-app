import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import api from "../api";
import skills from "../data/skills";
import NavBar from "../components/NavBar";

type Form = {
  name: string;
  description: string;
  location: string;
  skills: { value: string; label: string }[];
  urgency: number;
  date: Date | null;
};

const urgencyOptions = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
];

export default function EventManagement() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ defaultValues: { skills: [], urgency: 1, date: null } });
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api.get("/events").then(({ data }) => setEvents(data));
  }, []);

  async function onSubmit(f: Form) {
    await api.post("/events", {
      name: f.name,
      description: f.description,
      location: f.location,
      requiredSkills: f.skills.map((s) => s.value),
      urgency: f.urgency.value,
      date: f.date?.toISOString().split("T")[0],
    });
    alert("Event saved ✓");
  }

  return (
    <>
      <NavBar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 500, margin: "1rem auto" }}
      >
        <h2>Create Event</h2>
        <input
          placeholder="Event Name"
          {...register("name", { required: true, maxLength: 100 })}
        />
        {errors.name && <small>Required</small>}

        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          rows={3}
        />
        {errors.description && <small>Required</small>}

        <textarea
          placeholder="Location"
          {...register("location", { required: true })}
          rows={2}
        />
        {errors.location && <small>Required</small>}

        <Controller
          control={control}
          name="skills"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={skills}
              placeholder="Required Skills"
            />
          )}
        />
        {errors.skills && <small>Required</small>}

        <Controller
          control={control}
          name="urgency"
          render={({ field }) => (
            <Select {...field} options={urgencyOptions} placeholder="Urgency" />
          )}
        />

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

        <button type="submit">Save</button>

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
      </form>
    </>
  );
}
