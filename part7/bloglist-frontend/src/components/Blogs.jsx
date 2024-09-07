import { useSelector } from 'react-redux';

import Blog from './Blog';
// import PropTypes from 'prop-types';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

// Blogs.propTypes = {};

export default Blogs;
