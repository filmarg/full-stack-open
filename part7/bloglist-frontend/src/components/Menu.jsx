import Logout from './Logout';

import { Link } from 'react-router-dom';

const Menu = () => {
  const bar = {
    padding: 10,
    backgroundColor: 'lightgray',
  };
  const padding = {
    paddingRight: 5,
  };

  return (
    <div style={bar}>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      <Logout />
    </div>
  );
};

export default Menu;
