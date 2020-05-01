import React from 'react'

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <form onSubmit={e => handleLogin(e)}>
      <h1>log in to application</h1>
      <div>
        username{' '}
        <input
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        password{' '}
        <input
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button id="login-button">login</button>
    </form>
  )
}

export default Login
