import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/forms';

import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // For info on how 'await' works with 'dispatch()' see
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#control_flow_effects_of_await
      await dispatch(
        createBlog({
          title: title.attrs.value,
          author: author.attrs.value,
          url: url.attrs.value,
        }),
      );

      blogFormRef.current.handleToggle();
      dispatch(
        setNotification('confirmation', `Blog added: ${title.attrs.value}`, 5),
      );

      title.reset();
      author.reset();
      url.reset();
    } catch (ex) {
      dispatch(
        setNotification('error', `Failed: ${ex.response.data.error}`, 8),
      );
    }
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  return (
    <div>
      <h3>Post a blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input placeholder="Title" {...title.attrs} />
        </div>
        <div>
          Author:
          <input placeholder="Author" {...author.attrs} />
        </div>
        <div>
          URL:
          <input placeholder="URL" {...url.attrs} />
        </div>
        <button id="postButton" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
