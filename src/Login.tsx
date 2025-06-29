import { useState } from 'react'
import './Login.css'

function App() {

  const [state, setState] = useState("Login")

  return (
    <>
    <div className="form-title"><h2>{state}</h2></div>
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
      {state == "Login" ? <p>Don't have an account? <a href="#" onClick={()=>(setState("Register"))}>Register</a></p> 
        : <p>Already have an account? <a href="#" onClick={()=>(setState("Login"))}>Login</a></p>}
      
      <button>{state}</button>
    </div>
    </>
  )
}

export default App
