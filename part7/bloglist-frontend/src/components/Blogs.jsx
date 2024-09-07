import { useSelector } from 'react-redux';

import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  // const blogs = useSelector(({ blogs }) =>
  //   sortByLikes(blogs.map((b) => (b.id !== newBlog.id ? b : newBlog)))
  // );
  //
  // const sortByLikes = (arr) => arr.toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Blogs;
