const Login = ({ onSubmit, username, password }) => (
  <form onSubmit={onSubmit}>
    <div>
      Username:
      <input value={username.val}
             type="text"
             onChange={username.onChange} />
    </div>
    <div>
      Password:
      <input value={password.val}
             type="text"
             onChange={password.onChange} />
    </div>
    <button type="submit">Log in</button>
  </form>
)

export default Login
