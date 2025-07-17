import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const { register, handleSubmit } = useForm<{ email: string; password: string; admin: boolean }>();
  return (
    <form onSubmit={handleSubmit(() => nav("/dashboard"))} style={{ maxWidth: 320, margin: "2rem auto" }}>
      <h2>Login</h2>
      <input placeholder="Email" {...register("email", { required: true })} />
      <input type="password" placeholder="Password" {...register("password", { required: true })} />
      <label><input type="checkbox" {...register("admin")} /> Login as admin</label>
      <button type="submit">Sign in</button>
      <p style={{ textAlign: "center" }}>No account? <a href="/signup">Register</a></p>
    </form>
  );
}
