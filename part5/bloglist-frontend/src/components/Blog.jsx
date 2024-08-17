import { useState } from 'react'

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 6,
    paddingBottom: 2,
    paddingLeft: 4,
    borderBottom: 'solid',
    borderWidth: 0.5,
    marginBottom: 5,
  }
  const showOnVisible = { display: visible ? '' : 'none' }

  const handleToggle = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    onLike({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
      id: undefined,
    }, blog.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      onDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <button onClick={handleToggle}>{visible ? 'Hide' : 'View'}</button>
        {blog.title}—{blog.author}
      </div>
      <div style={showOnVisible}>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>User: {blog.user.name}</div>
        <div>
          {blog.user.username === user.username
           && <button onClick={handleDelete}>Delete</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog
