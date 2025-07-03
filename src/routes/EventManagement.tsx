import NavBar from "../components/NavBar";
import "./EventManagement.css";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Select from "react-select";

interface EventInput {
  eventName: string;
  description: string;
  location: string;
  reqSkills: { value: string; label: string }[];
  urgency: { value: number; label: string };
  date: string;
}

const urgencyOptions = [
  { value: 1, label: "Low" },
  { value: 2, label: "Moderate" },
  { value: 3, label: "High" },
  { value: 4, label: "Critical" },
];

const skillsOptions = [
  { value: "leadership", label: "Leadership" },
  { value: "communication", label: "Communication" },
  { value: "teamwork", label: "Teamwork" },
];

function EventManagement() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EventInput>({ mode: "onChange" });
  const onSubmit: SubmitHandler<EventInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="management-container">
      <NavBar />
      <div className="grid-container">
        <h3>Create an Event</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="div1">
            <div className="input-container">
              <div className="label-container">
                <label>Event Name</label>
              </div>
              <input
                {...register("eventName", {
                  required: "This field is required",
                  maxLength: {
                    value: 50,
                    message: "Maximum of 100 characters",
                  },
                })}
                id=""
                type="text"
                placeholder=""
              />
              {errors.eventName && (
                <p role="alert">{errors.eventName.message}</p>
              )}
            </div>
            <div className="div2">
              <div className="input-container">
                <div className="label-container">
                  <label>Event Description</label>
                </div>
                <input
                  {...register("description", {
                    required: "This field is required",
                    maxLength: {
                      value: 1000,
                      message: "Maximum of 1000 characters",
                    },
                  })}
                  id=""
                  type="text"
                  placeholder=""
                />
                {errors.description && (
                  <p role="alert">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="div3">
              <div className="input-container">
                <div className="label-container">
                  <label>Location</label>
                </div>
                <input
                  {...register("location", {
                    required: "This field is required",
                    maxLength: {
                      value: 100,
                      message: "Maximum of 100 characters",
                    },
                  })}
                  id=""
                  type="text"
                  placeholder=""
                />
                {errors.location && (
                  <p role="alert">{errors.location.message}</p>
                )}
              </div>
            </div>
            <div className="div4">
              <div className="input-container">
                <div className="label-container">
                  <label>Required Skills</label>
                </div>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="reqSkills"
                  render={({ field: { onChange } }) => (
                    <Select
                      options={skillsOptions}
                      isMulti
                      onChange={onChange}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "#535bf2" : "#646464",
                          borderRadius: "0.25rem",
                          borderWidth: "1px",
                          backgroundColor: "#242424",
                        }),
                        multiValue: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#303030",
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "white",
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#242424",
                          borderWidth: "1px",
                          borderColor: "#535bf2",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          color: state.isFocused ? "#535bf2" : "",
                          backgroundColor: state.isFocused ? "#303030" : "",
                          borderWidth: "1px",
                          borderColor: "#535bf2",
                        }),
                      }}
                    />
                  )}
                />

                {errors.reqSkills && (
                  <p role="alert">{errors.reqSkills.message}</p>
                )}
              </div>
            </div>
            <div className="div5">
              <div className="input-container">
                <div className="label-container">
                  <label>Urgency</label>
                </div>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="urgency"
                  render={({ field: { onChange } }) => (
                    <Select
                      options={urgencyOptions}
                      onChange={onChange}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? "#535bf2" : "#646464",
                          borderRadius: "0.25rem",
                          borderWidth: "1px",
                          backgroundColor: "#242424",
                        }),
                        singleValue: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "#535bf2",
                        }),
                        multiValueLabel: (baseStyles, state) => ({
                          ...baseStyles,
                          color: "white",
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: "#242424",
                          borderWidth: "1px",
                          borderColor: "#535bf2",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          color: state.isFocused ? "#535bf2" : "",
                          backgroundColor: state.isFocused ? "#303030" : "",
                          borderWidth: "1px",
                          borderColor: "#535bf2",
                        }),
                      }}
                    />
                  )}
                />

                {errors.reqSkills && (
                  <p role="alert">{errors.reqSkills.message}</p>
                )}
              </div>
            </div>
            <div className="div6">
              <div className="input-container">
                <div className="label-container">
                  <label>Event Date</label>
                </div>
                <input
                  {...register("date", {
                    required: "This field is required",
                  })}
                  id=""
                  type="date"
                  placeholder=""
                  className="date-picker"
                />
                {errors.date && <p role="alert">{errors.date.message}</p>}
              </div>
            </div>
          </div>
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default EventManagement;
