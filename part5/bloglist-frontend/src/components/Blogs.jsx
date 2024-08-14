import Blog from './Blog'

const Blogs = ({ blogs, onLike }) => (
  <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} onLike={onLike} />
    )}
  </div>
)

export default Blogs
