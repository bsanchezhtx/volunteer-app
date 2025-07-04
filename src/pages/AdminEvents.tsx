import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import skillOptions from '../data/skills';

type Form = {
  name: string;
  description: string;
  location: string;
  skills: { value:string; label:string }[];
  urgency: 'Low'|'Medium'|'High';
  date: Date | null;
};

export default function AdminEvents() {
  const { register, control, handleSubmit, formState:{ errors } } =
    useForm<Form>({ defaultValues:{ skills:[], urgency:'Low', date:null } });

  function onSubmit(f: Form) {
    console.log('event', f);
    alert('Event saved (demo)');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth:480 }}>
      <h2>Create / Manage Event</h2>

      <label>Event Name</label>
      <input {...register('name', { required:true, maxLength:100 })}/>
      {errors.name && <small>Required</small>}

      <label>Description</label>
      <textarea {...register('description', { required:true })} rows={3}/>
      {errors.description && <small>Required</small>}

      <label>Location</label>
      <textarea {...register('location', { required:true })} rows={2}/>
      {errors.location && <small>Required</small>}

      <label>Required Skills</label>
      <Controller
        control={control}
        name="skills"
        rules={{ required:true }}
        render={({ field }) => <Select {...field} isMulti options={skillOptions}/>}
      />
      {errors.skills && <small>Pick at least one</small>}

      <label>Urgency</label>
      <select {...register('urgency', { required:true })}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>

      <label>Event Date</label>
      <Controller
        control={control}
        name="date"
        rules={{ required:true }}
        render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange}/>}
      />
      {errors.date && <small>Required</small>}

      <button type="submit">Save Event</button>
    </form>
  );
}
