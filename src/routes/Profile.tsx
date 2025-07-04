import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import states from "../data/usStates";
import skills from "../data/skills";
import NavBar from "../components/NavBar";

type Form = {
  fullName: string;
  addr1: string;
  addr2?: string;
  city: string;
  state: { value: string; label: string } | null;
  zip: string;
  skills: { value: string; label: string }[];
  preferences?: string;
};

export default function Profile() {
  const { register, control, handleSubmit, formState: { errors } } =
    useForm<Form>({ defaultValues: { state: null, skills: [] } });
  const [availability, setAvailability] = useState<Date[]>([]);

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit(() => alert("Saved ✓"))} style={{ maxWidth: 480, margin: "1rem auto" }}>
        <h2>Profile</h2>
        <input placeholder="Full Name" {...register("fullName", { required: true, maxLength: 50 })}/>
        {errors.fullName && <small>Required</small>}

        <input placeholder="Address 1" {...register("addr1", { required: true, maxLength: 100 })}/>
        {errors.addr1 && <small>Required</small>}

        <input placeholder="Address 2" {...register("addr2", { maxLength: 100 })}/>
        <input placeholder="City" {...register("city", { required: true, maxLength: 100 })}/>
        {errors.city && <small>Required</small>}

        <Controller
          control={control}
          name="state"
          rules={{ required: true }}
          render={({ field }) => <Select {...field} options={states} placeholder="State" />}
        />
        {errors.state && <small>Required</small>}

        <input placeholder="Zip" {...register("zip", {
          required: true,
          pattern: /^\d{5}(\d{4})?$/
        })}/>
        {errors.zip && <small>5–9 digits</small>}

        <Controller
          control={control}
          name="skills"
          rules={{ required: true }}
          render={({ field }) => <Select {...field} isMulti options={skills} placeholder="Skills" />}
        />
        {errors.skills && <small>Required</small>}

        <textarea placeholder="Preferences" {...register("preferences")} rows={3}/>
        <DatePicker selected={null} onChange={d => d && setAvailability(a => [...a, d])} placeholderText="Add availability date"/>
        <ul>{availability.map((d,i)=><li key={i}>{d.toLocaleDateString()}</li>)}</ul>
        {availability.length===0 && <small style={{color:"#d33"}}>Pick ≥ 1 date</small>}

        <button type="submit" disabled={availability.length===0}>Save</button>
      </form>
    </>
  );
}
