import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthProvider";

type RegisterFormInput = {
  email: string;
  password: string;
};

export default function Register() {
  const { registerUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  const handleRegister = async (form: RegisterFormInput) => {
    registerUser(form.email, form.password);
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      style={{ maxWidth: 320, margin: "2rem auto" }}
    >
      <h2>Create Account</h2>

      <input
        placeholder="Email"
        {...register("email", {
          required: "Email required",
          pattern: { value: /^\S+@\S+$/, message: "Invalid email" },
        })}
      />
      {errors.email && <small>{errors.email.message}</small>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password && <small>Min 6 chars</small>}

      <button type="submit">Register</button>
    </form>
  );
}
