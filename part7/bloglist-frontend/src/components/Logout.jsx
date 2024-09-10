import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';

import styled from 'styled-components';
import { Button } from './shared-styled';

const Logout = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <UserInfo>
      <i>[{name} logged in] </i>
      <Button onClick={handleClick}>Log out</Button>
    </UserInfo>
  );
};

const UserInfo = styled.span`
  padding: 0.4em;
  color: #444;
`;

export default Logout;
