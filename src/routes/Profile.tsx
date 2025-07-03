import NavBar from "../components/NavBar";
import "./Profile.css";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Select from "react-select";

interface ProfileInput {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  skills: { value: string; label: string }[];
  preferences: string;
  availability: string;
}

const skillsOptions = [
  { value: "leadership", label: "Leadership" },
  { value: "communication", label: "Communication" },
  { value: "teamwork", label: "Teamwork" },
];

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileInput>();
  const onSubmit: SubmitHandler<ProfileInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="profile-container">
      <NavBar />
      <div className="grid-container">
        <h3>Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="parent">
            <div className="div1">
              <div className="input-container">
                <div className="label-container">
                  <label>Full Name</label>
                </div>
                <input
                  {...register("name", {
                    required: "This field is required",
                    maxLength: {
                      value: 50,
                      message: "Maximum of 50 characters",
                    },
                  })}
                  id=""
                  type="text"
                  placeholder=""
                />
                {errors.name && <p role="alert">{errors.name.message}</p>}
              </div>
            </div>
            <div className="div2">
              <div className="input-container">
                <div className="label-container">
                  <label>Address, line 1</label>
                </div>
                <input
                  {...register("address1", {
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
                {errors.address1 && (
                  <p role="alert">{errors.address1.message}</p>
                )}
              </div>
            </div>
            <div className="div3">
              <div className="input-container">
                <div className="label-container">
                  <label>Address, line 2 (optional)</label>
                </div>
                <input
                  {...register("address2", {
                    maxLength: {
                      value: 100,
                      message: "Maximum of 100 characters",
                    },
                  })}
                  id=""
                  type="text"
                  placeholder=""
                />
                {errors.address2 && (
                  <p role="alert">{errors.address2.message}</p>
                )}
              </div>
            </div>
            <div className="div4">
              <div className="input-container">
                <div className="label-container">
                  <label>City</label>
                </div>
                <input
                  {...register("city", {
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
                {errors.city && <p role="alert">{errors.city.message}</p>}
              </div>
            </div>
            <div className="div5">
              <div className="input-container">
                <div className="label-container">
                  <label>State</label>
                </div>
                <select
                  {...register("state", {
                    required: "This field is required",
                  })}
                >
                  <option disabled selected value="">
                    Select a state
                  </option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                {errors.state && <p role="alert">{errors.state.message}</p>}
              </div>
            </div>
            <div className="div6">
              <div className="input-container">
                <div className="label-container">
                  <label>Zip Code</label>
                </div>
                <input
                  {...register("zip", {
                    required: "This field is required",
                    minLength: {
                      value: 5,
                      message: "Minimum of 5 characters",
                    },
                    maxLength: {
                      value: 9,
                      message: "Maximum of 9 characters",
                    },
                  })}
                  id=""
                  type="text"
                  placeholder=""
                />
                {errors.zip && <p role="alert">{errors.zip.message}</p>}
              </div>
            </div>
            <div className="div7">
              <div className="input-container">
                <div className="label-container">
                  <label>Skills</label>
                </div>
                <Controller
                  control={control}
                  rules={{ required: "This field is required" }}
                  name="skills"
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

                {errors.skills && <p role="alert">{errors.skills.message}</p>}
              </div>
            </div>
            <div className="div8">
              <div className="input-container">
                <div className="label-container">
                  <label>Preferences</label>
                </div>
                <input
                  {...register("preferences", {
                    maxLength: {
                      value: 1000,
                      message: "Maximum of 1000 characters",
                    },
                  })}
                  id=""
                  type="text"
                  placeholder=""
                />
                {errors.preferences && (
                  <p role="alert">{errors.preferences.message}</p>
                )}
              </div>
            </div>
            <div className="div9">
              <div className="input-container">
                <div className="label-container">
                  <label>Availability</label>
                </div>
                <input
                  {...register("availability", {
                    required: "This field is required",
                  })}
                  id=""
                  type="date"
                  placeholder=""
                  className="date-picker"
                />
                {errors.preferences && (
                  <p role="alert">{errors.preferences.message}</p>
                )}
              </div>
            </div>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
