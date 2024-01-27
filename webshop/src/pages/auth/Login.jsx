import React from 'react'
import { useAuth } from '../../store/AuthContext';

function Login() {
  const { login } = useAuth();

  return (
    <div>
      <label>E-mail</label> <br />
      <input type="text" /> <br />
      <label>Password</label> <br />
      <input type="text" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div>
  )
}

export default Login