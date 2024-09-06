import { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

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
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortByLikes(blogs)));
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
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('bloglistLoggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      setUsername('');
      setPassword('');

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

  const handlePost = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));

      blogFormRef.current.handleToggle();
      dispatch(
        setNotification('confirmation', `Blog added: ${newBlog.title}`, 5),
      );
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  const handleLike = async (blog, id) => {
    try {
      const newBlog = await blogService.update(id, blog);
      setBlogs(
        sortByLikes(blogs.map((b) => (b.id !== newBlog.id ? b : newBlog))),
      );
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  const sortByLikes = (arr) => arr.toSorted((a, b) => b.likes - a.likes);

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login
          onSubmit={handleLogin}
          username={{ val: username, onChange: handleChange(setUsername) }}
          password={{ val: password, onChange: handleChange(setPassword) }}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Logout name={user.name} onClick={handleLogout} />
      <Togglable label="Create new blog" ref={blogFormRef}>
        <BlogForm onSubmit={handlePost} />
      </Togglable>
      <Blogs
        blogs={blogs}
        user={user}
        onLike={handleLike}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
