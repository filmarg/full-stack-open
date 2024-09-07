import { useRef } from 'react';
import { useInitialBlogs, useLoggedUser } from './hooks/init';

import { useSelector } from 'react-redux';

import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useInitialBlogs();
  useLoggedUser();

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Logout />
      <Togglable label="Create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
