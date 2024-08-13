const Login = ({ onSubmit, username, password }) => (
  <form onSubmit={onSubmit}>
    <div>
      Username:
      <input
        type="text"
        value={username.val}
        onChange={username.onChange}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={password.val}
        onChange={password.onChange}
      />
    </div>
    <button type="submit">Log in</button>
  </form>
)

export default Login
