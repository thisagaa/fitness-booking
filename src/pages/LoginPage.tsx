import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const signIn = useAuthStore((state) => state.signIn)
  const navigate = useNavigate()

  return (
    <main>
      <h1>Log in</h1>
      <form onSubmit={(event) => { event.preventDefault() 
        if (username.trim() !== 'user' || password !== 'user123'){
          setLoginError('Incorrect username or password.')
          return
        }

        setLoginError('')
        signIn() //sets the token to demo-session and everywhere {token} becomes a truth value and allows operations
        navigate('/classes', {replace: true})
      }}
      
      >
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input 
          type="password"
          id="login-password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {loginError && <ErrorMessage message={loginError} />}
        <button type="submit">Log in</button>

      </form>
    </main>
  )
}

export default LoginPage