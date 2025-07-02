import { useForm, useFormState, type SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import "./Login.css";

interface FormInput {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    formState,
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    navigate(`/dashboard/${getValues("email")}`);
  };

  return (
    <>
      <div className="form-title">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="input-container">
          <div className="label-container">
            <label>Email Address</label>
          </div>
          <input
            {...register("email", {
              required: "Invalid Email Address",
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
                message: "Invalid Password",
              },
              validate: (value) => {
                return (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                    pattern.test(value)
                  ) || "Invalid Password"
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
            Don't have an account?{" "}
            <nav>
              <NavLink to="/signup">Sign Up</NavLink>
            </nav>
          </p>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
