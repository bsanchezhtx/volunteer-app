import './Login.css'
import { NavLink } from 'react-router';

function Login() {

  return (
    <>
    <div className="form-title"><h2>Login</h2></div>
    <form action="" className="form-container">
        <div className="input">
          <p>Email Address</p>
          <input type="email" className="input-field" name="" id="" required />
        </div>
        <div className="input">
          <p>Password</p>
          <input type="password" className="input-field" name="" id="" required />
        </div>
    </form>
    <div className="submit-container">
      <p>Don't have an account? <nav><NavLink to='/signup'>Sign Up</NavLink></nav></p>
      <nav><NavLink to='/dashboard'><button>Login</button></NavLink></nav>
    </div>
    </>
  )
}

export default Login;
