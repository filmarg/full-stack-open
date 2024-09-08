import { useInitialData, useLoggedUser } from './hooks/init';

import { useSelector } from 'react-redux';

import Notification from './components/Notification';
import Login from './components/Login';
import Logout from './components/Logout';
import BlogsView from './components/BlogsView';
import UsersView from './components/UsersView';
import UserView from './components/UserView';
import BlogView from './components/BlogView';

import { Routes, Route } from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.user);

  useInitialData();
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
      <Routes>
        <Route path="/" element={<BlogsView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  );
};

export default App;
