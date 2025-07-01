import './global.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './routes/Login'
import SignUp from './routes/SignUp'
import Profile from './routes/Profile'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* For now, just use the login page as the default page, since we have no way of authenticating w/o backend */}
      <Route index path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='profile' element={<Profile />}></Route>
    </Routes>
  </BrowserRouter>
);
