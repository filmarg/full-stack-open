import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/forms';

import { setNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

import { Button, Input } from './shared-styled';

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
          <label htmlFor="title-input">Title:</label>
          <Input id="title-input" {...title.attrs} />
        </div>
        <div>
          <label htmlFor="author-input">Author:</label>
          <Input id="author-input" {...author.attrs} />
        </div>
        <div>
          <label htmlFor="url-input">URL:</label>
          <Input id="url-input" {...url.attrs} />
        </div>
        <Button id="postButton" type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
