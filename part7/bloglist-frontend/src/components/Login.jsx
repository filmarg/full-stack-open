import { useField } from '../hooks/forms';

import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const Login = () => {
  const dispatch = useDispatch();
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        login({
          username: username.attrs.value,
          password: password.attrs.value,
        }),
      );

      const user = JSON.parse(
        window.localStorage.getItem('bloglistLoggedUser'),
      );
      dispatch(setNotification('confirmation', `${user.name} logged in`, 3));

      username.reset();
      password.reset();
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
};

export default Login;
