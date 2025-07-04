import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import skills from "../data/skills";
import NavBar from "../components/NavBar";

type Form = {
  name: string;
  description: string;
  location: string;
  skills: { value: string; label: string }[];
  urgency: "Low" | "Medium" | "High";
  date: Date | null;
};
export default function EventManagement() {
  const { register, control, handleSubmit, formState: { errors } } =
    useForm<Form>({ defaultValues: { skills: [], urgency: "Low", date: null } });
  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit(() => alert("Event saved ✓"))} style={{ maxWidth: 500, margin: "1rem auto" }}>
        <h2>Create Event</h2>
        <input placeholder="Event Name" {...register("name", { required: true, maxLength: 100 })}/>
        {errors.name && <small>Required</small>}
        <textarea placeholder="Description" {...register("description", { required: true })} rows={3}/>
        {errors.description && <small>Required</small>}
        <textarea placeholder="Location" {...register("location", { required: true })} rows={2}/>
        {errors.location && <small>Required</small>}
        <Controller control={control} name="skills" rules={{ required: true }}
          render={({ field }) => <Select {...field} isMulti options={skills} placeholder="Required Skills"/>}/>
        {errors.skills && <small>Required</small>}
        <select {...register("urgency")}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <Controller control={control} name="date" rules={{ required: true }}
          render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange} placeholderText="Event Date"/>}/>
        {errors.date && <small>Required</small>}
        <button type="submit">Save</button>
      </form>
    </>
  );
}
