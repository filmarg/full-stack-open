import { useSelector } from 'react-redux';

import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ user, onLike, onDelete }) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blogs;
