import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

const UserView = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>User: {user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
