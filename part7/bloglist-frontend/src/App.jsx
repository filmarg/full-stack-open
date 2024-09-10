import { useInitialData, useLoggedUser } from './hooks/init';

import { useSelector } from 'react-redux';

import Notification from './components/Notification';
import Login from './components/Login';
import Menu from './components/Menu';
import BlogsView from './components/BlogsView';
import UsersView from './components/UsersView';
import UserView from './components/UserView';
import BlogView from './components/BlogView';

import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components';

const App = () => {
  const user = useSelector((state) => state.user);

  useInitialData();
  useLoggedUser();

  if (!user) {
    return (
      <Page>
        <Header>
          <h2>Log in to application</h2>
        </Header>
        <Main>
          <Notification />
          <Login />
        </Main>
      </Page>
    );
  }

  return (
    <Page>
      <Menu />
      <Header>
        <h2>Blog App</h2>
      </Header>
      <Main>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogsView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Main>
    </Page>
  );
};

const Page = styled.div`
  width: 90%;
  margin: auto;
  background-color: #f6f6f6;
  font-family: sans-serif;
`;

const Header = styled.header`
  padding: 0.1em 0 0 1em;
`;

const Main = styled.main`
  padding: 0 1em 1em 1em;
`;

export default App;
