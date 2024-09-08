import { useRef } from 'react';

import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Blogs from './Blogs';

const BlogsView = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable label="Create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default BlogsView;
