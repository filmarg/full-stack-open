import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
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
  
  return (
    <div style={blogStyle}>
      <div>
        <button onClick={handleToggle}>{visible ? 'View' : 'Hide'}</button>
        {blog.title}—{blog.author}
      </div>
      <div style={showOnVisible}>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>User: {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
