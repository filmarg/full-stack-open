import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Logout = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <i>[{name} logged in] </i>
      <button onClick={handleClick}>Log out</button>
    </>
  );
};

export default Logout;
