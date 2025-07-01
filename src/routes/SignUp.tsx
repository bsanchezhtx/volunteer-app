import './SignUp.css'
import { NavLink } from 'react-router';

function SignUp() {

  return (
    <>
    <div className="form-title"><h2>Sign Up</h2></div>
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
      <p>Already have an account? <nav><NavLink to='/login'>Login</NavLink></nav></p>
      <nav><NavLink to='/profile'><button>Register</button></NavLink></nav>
    </div>
    </>
  )
}

export default SignUp;
