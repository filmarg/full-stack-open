import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog, postComment } from '../reducers/blogReducer';

import { useParams, useNavigate } from 'react-router-dom';

import { Button, Input } from './shared-styled';

const BlogView = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.user);

  if (!blog) {
    return null;
  }

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
        navigate('/');
      } catch (ex) {
        dispatch(
          setNotification('error', `Failed: ${ex.response.data.error}`, 8),
        );
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const comment = e.target.comment.value;
      e.target.comment.value = '';

      await dispatch(postComment(blog, comment));

      dispatch(setNotification('confirmation', `Comment added: ${comment}`, 3));
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  return (
    <div id="blogDetails">
      <h3>
        {blog.title}—{blog.author}
      </h3>
      <div>
        URL: <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        Likes: {blog.likes}
        <Button id="likeButton" onClick={handleLike}>
          Like
        </Button>
      </div>
      <div>User: {blog.user.name}</div>
      <div>
        {blog.user.username === user.username && (
          <Button onClick={handleDelete}>Delete</Button>
        )}
      </div>
      <h4>Comments</h4>
      <div>
        <form onSubmit={handleComment}>
          <Input name="comment" type="text" placeholder="Comment" />
          <Button type="submit">Post comment</Button>
        </form>
      </div>
      <div>
        {blog.comments.length ? (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment._id}>{comment.content}</li>
            ))}
          </ul>
        ) : (
          <i>No comments yet</i>
        )}
      </div>
    </div>
  );
};

export default BlogView;
