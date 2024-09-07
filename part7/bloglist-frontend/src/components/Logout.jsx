import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Logout = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.name);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <i>[{name} logged in] </i>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};

export default Logout;
