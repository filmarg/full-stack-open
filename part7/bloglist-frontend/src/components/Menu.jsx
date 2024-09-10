import Logout from './Logout';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Menu = () => {
  return (
    <Navigation>
      <NavLink to="/">Blogs</NavLink>
      <NavLink to="/users">Users</NavLink>
      <Logout />
    </Navigation>
  );
};

const Navigation = styled.nav`
  padding: 0.4em 0.5em;
  background-color: #fa0;
`;

const NavLink = styled(Link)`
  padding: 0.4em;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #c70;
  }
`;

export default Menu;
