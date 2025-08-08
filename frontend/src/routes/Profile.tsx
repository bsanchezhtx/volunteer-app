import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import skills from "../data/skills";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../context/AuthProvider";
import api from "../api";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { StylesConfig } from "react-select";

type ProfileContext = {
  fullName: string;
  addr1: string;
  addr2?: string;
  city: string;
  state: string;
  zip: string;
  skills: { value: string; label: string }[];
  preferences?: string;
  availability: string[];
};

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

export default function Profile() {
  const { user } = useAuthContext();
  const id = user?.id;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileContext>();
  const [availability, setAvailability] = useState<Date[]>([]);

  const fetch = async () => {
    await api<ProfileContext>({
      method: "post",
      url: "/profile",
      data: { id },
    })
      .then((response) => {
        setValue("fullName", response.data.fullName);
        setValue("addr1", response.data.addr1);
        setValue("addr2", response.data.addr2);
        setValue("city", response.data.city);
        setValue("state", response.data.state);
        setValue("zip", response.data.zip);
        setValue("skills", response.data.skills);
        setValue("preferences", response.data.preferences);
        setAvailability(
          response.data.availability.length > 0
            ? response.data.availability.map((date) => new Date(date))
            : []
        );
      })
      .catch((error) => {
        if (error.status == 201) {
          toast.warning("Unable to retrieve profile");
        } else if (error.status == 400) {
          toast.warning("Server Error. Please try again");
        }
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  const updateProfile = async (form: ProfileContext) => {
    await api({
      method: "put",
      url: "/profile",
      data: {
        fullName: form.fullName,
        addr1: form.addr1,
        addr2: form.addr2,
        city: form.city,
        state: form.state,
        zip: form.zip,
        skills: form.skills,
        preferences: form.preferences,
        availability: availability,
        userId: id,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Profile Saved!");
        }
      })
      .catch((error) => {
        if (error.status == 400) {
          toast.warning("Unable to update profile. Please try again.");
        }
      });
  };

  return (
    <>
      <NavBar />
      <Container className="vw-25">
        <h1 className="fs-2 my-2 fw-bold">{user?.email}</h1>
        <Form
          className="my-2 gap-1"
          noValidate
          onSubmit={handleSubmit(updateProfile)}
        >
          <Form.Group id="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              {...register("fullName", {
                required: { value: true, message: "This field is required" },
                maxLength: { value: 50, message: "Maximum of 50 characters" },
              })}
            ></Form.Control>
            {errors.fullName && (
              <Form.Text className="text-danger">
                {errors.fullName.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group id="addr1">
            <Form.Label>Address Line 1</Form.Label>

            <Form.Control
              type="text"
              placeholder="Address line 1"
              {...register("addr1", {
                required: { value: true, message: "This field is required" },
                maxLength: { value: 100, message: "Maximum of 100 characters" },
              })}
            ></Form.Control>
            {errors.addr1 && (
              <Form.Text className="text-danger">
                {errors.addr1.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group id="addr2">
            <Form.Label>Address Line 2</Form.Label>

            <Form.Control
              type="text"
              placeholder="Address line 2"
              {...register("addr2", {
                maxLength: { value: 100, message: "Maximum of 100 characters" },
              })}
            ></Form.Control>
            {errors.addr2 && (
              <Form.Text className="text-danger">
                {errors.addr2.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group id="city">
            <Form.Label>City</Form.Label>

            <Form.Control
              type="text"
              placeholder="City"
              {...register("city", {
                required: { value: true, message: "This field is required" },
                maxLength: { value: 100, message: "Maximum of 100 characters" },
              })}
            ></Form.Control>
            {errors.city && (
              <Form.Text className="text-danger">
                {errors.city.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group id="state">
            <Form.Label>State</Form.Label>
            <Form.Select
              {...register("state", {
                required: { value: true, message: "This field is required" },
                maxLength: 2,
              })}
            >
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
            </Form.Select>
          </Form.Group>
          <Form.Group id="zip">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your zip code"
              {...register("zip", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 5, message: "Minimum of 5 characters" },
                maxLength: { value: 9, message: "Maximum of 9 characters" },
              })}
            ></Form.Control>
            {errors.zip && (
              <Form.Text className="text-danger">
                {errors.zip.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group id="skills">
            <Form.Label>Skills & Proficiencies</Form.Label>
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
          <Form.Group id="preferences">
            <Form.Label>Preferences</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("preferences", {
                maxLength: { value: 250, message: "Maximum of 250 characters" },
              })}
            ></Form.Control>
          </Form.Group>
          <Form.Group id="availability" className="my-3">
            <Form.Label className="mx-3">Availability:</Form.Label>
            <Controller
              control={control}
              name="availability"
              render={({ field }) => (
                <DatePicker
                  selected={null}
                  onChange={(d) => d && setAvailability((a) => [...a, d])}
                  placeholderText="Add availability date"
                />
              )}
            ></Controller>
            <p>Selected Dates:</p>
            <ul>
              {availability.map((d, i) => (
                <li key={i}>{d.toLocaleDateString()}</li>
              ))}
            </ul>
            {availability.length === 0 && (
              <small style={{ color: "#d33" }}>Pick ≥ 1 date</small>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mx-auto my-3 justify-content-center"
          >
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
}
