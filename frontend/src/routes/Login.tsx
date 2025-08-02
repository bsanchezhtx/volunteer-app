import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

type LoginFormInput = {
  email: string;
  password: string;
  admin: boolean;
};

export default function Login() {
  const nav = useNavigate();
  const { loginUser } = useAuthContext();
  const { register, handleSubmit } = useForm<LoginFormInput>();

  const handleLogin = async (form: LoginFormInput) => {
    loginUser(form.email, form.password);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      style={{ maxWidth: 320, margin: "2rem auto" }}
    >
      <h2>Login</h2>
      <input placeholder="Email" {...register("email", { required: true })} />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <label>
        <input type="checkbox" {...register("admin")} /> Login as admin
      </label>
      <button type="submit">Sign in</button>
      <p style={{ textAlign: "center" }}>
        No account? <a href="/signup">Register</a>
      </p>
    </form>
  );
}
