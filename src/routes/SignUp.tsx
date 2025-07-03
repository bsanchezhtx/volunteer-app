import "./SignUp.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";

interface FormInput {
  email: string;
  password: string;
}

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>({ mode: "onChange" });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    navigate("/profile/");
  };

  return (
    <div className="signup-container">
      <div className="form-title">
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="input-container">
          <div className="label-container">
            <label>Email Address</label>
          </div>
          <input
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            id=""
            type="email"
            placeholder=""
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>
        <div className="input-container">
          <div className="label-container">
            <label>Password</label>
          </div>
          <input
            {...register("password", {
              required: "Required",
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
              validate: (value) => {
                return (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                    pattern.test(value)
                  ) ||
                  "Must include at least one lowercase letter, uppercase letter, number, and special character"
                );
              },
            })}
            id=""
            type="password"
            placeholder=""
          />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        <div className="submit-container">
          <p>
            Already have an account?{" "}
            <nav>
              <NavLink to="/login">Login</NavLink>
            </nav>
          </p>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
