const BlogForm = ({ onSubmit, title, author, url }) => (
  <form onSubmit={onSubmit}>
    <div>
      Title:
      <input
        type="text"
        value={title.val}
        onChange={title.onChange}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        value={author.val}
        onChange={author.onChange}
      />
    </div>
    <div>
      URL:
      <input
        type="text"
        value={url.val}
        onChange={url.onChange}
      />
    </div>
    <button type="submit">Post</button>
  </form>
)

export default BlogForm