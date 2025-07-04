import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import states from '../data/usStates';
import skillOptions from '../data/skills';

type Profile = {
  fullName: string;
  addr1: string;
  addr2?: string;
  city: string;
  state: { value:string; label:string } | null;
  zip: string;
  skills: { value:string; label:string }[];
  preferences?: string;
  availability: Date[];
};

export default function ProfileWizard() {
  const { register, control, handleSubmit, formState:{ errors } } =
    useForm<Profile>({ defaultValues:{ state:null, skills:[], availability:[] } });
  const [avail, setAvail] = useState<Date[]>([]);

  function onSubmit(data: Profile) {
    console.log('profile', { ...data, availability: avail });
    alert('Profile saved!');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth:450 }}>
      <h2>Complete Profile</h2>

      <label>Full Name</label>
      <input {...register('fullName', { required:true, maxLength:50 })}/>
      {errors.fullName && <small>Required (≤50 chars)</small>}

      <label>Address 1</label>
      <input {...register('addr1', { required:true, maxLength:100 })}/>
      {errors.addr1 && <small>Required</small>}

      <label>Address 2</label>
      <input {...register('addr2', { maxLength:100 })}/>

      <label>City</label>
      <input {...register('city', { required:true, maxLength:100 })}/>
      {errors.city && <small>Required</small>}

      <label>State</label>
      <Controller
        control={control}
        name="state"
        rules={{ required:true }}
        render={({ field }) => <Select {...field} options={states} placeholder="Select…"/>}
      />
      {errors.state && <small>Required</small>}

      <label>Zip Code</label>
      <input {...register('zip', {
        required:true,
        pattern:/^\d{5}(\d{4})?$/
      })}/>
      {errors.zip && <small>5–9 digits</small>}

      <label>Skills</label>
      <Controller
        control={control}
        name="skills"
        rules={{ required:true }}
        render={({ field }) => <Select {...field} isMulti options={skillOptions}/>}
      />
      {errors.skills && <small>Pick at least one</small>}

      <label>Preferences</label>
      <textarea {...register('preferences')} rows={3}/>

      <label>Availability (dates)</label>
      <DatePicker
        selected={null}
        onChange={d => d && setAvail(prev=>[...prev, d])}
        placeholderText="Pick a date then click again to add more"
      />
      <ul>{avail.map((d,i)=><li key={i}>{d.toLocaleDateString()}</li>)}</ul>
      {avail.length===0 && <small style={{color:'red'}}>Pick at least one date</small>}

      <button type="submit" disabled={avail.length===0}>Save</button>
    </form>
  );
}
