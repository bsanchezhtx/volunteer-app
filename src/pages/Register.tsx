import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Form = { email: string; password: string };

export default function Register() {
  const { register, handleSubmit, formState:{ errors } } = useForm<Form>();
  const nav = useNavigate();

  function onSubmit(data: Form) {
    console.log('register', data);
    alert('Verification email sent (demo)');
    nav('/login');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth:320, margin:'0 auto' }}>
      <h2>Create Account</h2>

      <label>Email</label>
      <input {...register('email', {
        required:'Email required',
        pattern:{ value:/^\S+@\S+\.\S+$/, message:'Invalid email' }
      })}/>
      {errors.email && <small>{errors.email.message}</small>}

      <label>Password</label>
      <input type="password" {...register('password', {
        required:'Password required', minLength:6
      })}/>
      {errors.password && <small>Min 6 chars</small>}

      <button type="submit">Register</button>
    </form>
  );
}
