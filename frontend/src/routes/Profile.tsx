import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import states from "../data/usStates";
import skills from "../data/skills";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/AuthProvider";
import api from "../api";

type ProfileForm = {
  fullName: string;
  addr1: string;
  addr2?: string;
  city: string;
  state: { value: string; label: string } | null;
  zip: string;
  skills: { value: string; label: string }[];
  preferences?: string;
  availability: string;
  userId: number;
};

type ProfileContext = {
  fullName: string;
  addr1: string;
  addr2?: string;
  city: string;
  state: string;
  zip: string;
  skills: { value: string; label: string }[];
  preferences?: string;
  availability: string;
  userId: number;
};

export default function Profile() {
  const { user } = useAuthContext();
  const id = user?.id;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({ defaultValues: { state: null, skills: [] } });
  const [availability, setAvailability] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileContext | null>(null);

  const fetch = async () => {
    try {
      await api({
        method: "post",
        url: "/profile",
        data: { id },
      }).then((response) => {
        setProfile(response.data);
        setAvailability(
          response.data.availability.map((dateStr: string) => new Date(dateStr))
        );
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const updateProfile = async (form: ProfileForm) => {
    try {
      await api({
        method: "put",
        url: "/profile",
        data: {
          fullName: form.fullName,
          addr1: form.addr1,
          addr2: form.addr2,
          city: form.city,
          state: form.state?.value,
          zip: form.zip,
          skills: form.skills,
          preferences: form.preferences,
          availability: availability,
          userId: id,
        },
      }).then();
    } catch (error) {
      console.error(error);
    }
  };

  if (!loading) {
    return (
      <>
        <NavBar />
        <form
          onSubmit={handleSubmit(updateProfile)}
          style={{ maxWidth: 480, margin: "1rem auto" }}
        >
          <h2>Profile</h2>
          <input
            placeholder="Full Name"
            value={profile?.fullName}
            {...register("fullName", { required: true, maxLength: 50 })}
          />
          {errors.fullName && <small>Required</small>}

          <input
            placeholder="Address 1"
            value={profile?.addr1}
            {...register("addr1", { required: true, maxLength: 100 })}
          />
          {errors.addr1 && <small>Required</small>}

          <input
            placeholder="Address 2"
            value={profile?.addr2}
            {...register("addr2", { maxLength: 100 })}
          />
          <input
            placeholder="City"
            value={profile?.city}
            {...register("city", { required: true, maxLength: 100 })}
          />
          {errors.city && <small>Required</small>}

          <Controller
            control={control}
            name="state"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={states}
                defaultValue={states.find(
                  (state) => state.value == profile?.state
                )}
                placeholder="State"
              />
            )}
          />
          {errors.state && <small>Required</small>}

          <input
            placeholder="Zip"
            value={profile?.zip}
            {...register("zip", {
              required: true,
              pattern: /^\d{5}(\d{4})?$/,
            })}
          />
          {errors.zip && <small>5–9 digits</small>}

          <Controller
            control={control}
            name="skills"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={skills}
                placeholder="Skills"
              />
            )}
          />
          {errors.skills && <small>Required</small>}

          <textarea
            placeholder="Preferences"
            value={profile?.preferences}
            {...register("preferences")}
            rows={3}
          />
          <DatePicker
            selected={null}
            onChange={(d) => d && setAvailability((a) => [...a, d])}
            placeholderText="Add availability date"
          />
          <ul>
            {availability.map((d, i) => (
              <li key={i}>{d.toLocaleDateString()}</li>
            ))}
          </ul>
          {availability.length === 0 && (
            <small style={{ color: "#d33" }}>Pick ≥ 1 date</small>
          )}

          <button type="submit" disabled={availability.length === 0}>
            Save
          </button>
        </form>
      </>
    );
  }
}
