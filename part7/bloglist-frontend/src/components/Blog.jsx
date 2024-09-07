import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 6,
    paddingBottom: 2,
    paddingLeft: 4,
    borderBottom: 'solid',
    borderWidth: 0.5,
    marginBottom: 5,
  };
  const showOnVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog));
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id));
      } catch (ex) {
        dispatch(
          setNotification('error', `Failed: ${ex.response.data.error}`, 8),
        );
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <button id="viewButton" onClick={handleToggle}>
          {visible ? 'Hide' : 'View'}
        </button>
        {blog.title}—{blog.author}
      </div>
      <div id="blogDetails" style={showOnVisible}>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button id="likeButton" onClick={handleLike}>
            Like
          </button>
        </div>
        <div>User: {blog.user.name}</div>
        <div>
          {blog.user.username === user.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
