import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 6,
    paddingBottom: 2,
    paddingLeft: 4,
    borderBottom: 'solid',
    borderWidth: 0.5,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}—{blog.author}
      </Link>
    </div>
  );
};

export default Blog;
