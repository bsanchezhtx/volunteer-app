import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } =
    useForm<{ email: string; password: string }>();
  return (
    <form onSubmit={handleSubmit(() => nav("/login"))} style={{ maxWidth: 320, margin: "2rem auto" }}>
      <h2>Create Account</h2>

      <input placeholder="Email" {...register("email", {
        required: "Email required",
        pattern: { value: /^\S+@\S+$/, message: "Invalid email" }
      })}/>
      {errors.email && <small>{errors.email.message}</small>}

      <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} />
      {errors.password && <small>Min 6 chars</small>}

      <button type="submit">Register</button>
    </form>
  );
}
