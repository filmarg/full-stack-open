import { useState, useEffect, useRef } from 'react';
import { useField } from './hooks/forms';

import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Logout from './components/Logout';

import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const [user, setUser] = useState(null);
  const username = useField('text');
  const password = useField('password');
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('bloglistLoggedUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username: username.attrs.value,
        password: password.attrs.value,
      });
      window.localStorage.setItem('bloglistLoggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      username.reset();
      password.reset();

      dispatch(setNotification('confirmation', `${user.name} logged in`, 3));
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  const handleLogout = () => {
    // Delete the token (and more) from everywhere
    window.localStorage.removeItem('bloglistLoggedUser');
    setUser(null);
    blogService.setToken(null);
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login onSubmit={handleLogin} username={username} password={password} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Logout name={user.name} onClick={handleLogout} />
      <Togglable label="Create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blogs user={user} />
    </div>
  );
};

export default App;
