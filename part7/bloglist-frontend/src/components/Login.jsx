const Login = ({ onSubmit, username, password }) => (
  <form onSubmit={onSubmit}>
    <div>
      Username:
      <input {...username.attrs} />
    </div>
    <div>
      Password:
      <input {...password.attrs} />
    </div>
    <button type="submit">Log in</button>
  </form>
);

export default Login;
