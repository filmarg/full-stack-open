import { useState } from 'react';

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleChange = (setter) => (e) => setter(e.target.value);

  return (
    <div>
      <h3>Post a blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange(setTitle)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={handleChange(setAuthor)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={handleChange(setUrl)}
          />
        </div>
        <button id="postButton" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
