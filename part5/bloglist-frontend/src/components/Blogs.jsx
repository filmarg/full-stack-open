import Blog from './Blog'

const Blogs = ({ blogs, user, onLike, onDelete }) => (
  <div>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        onLike={onLike}
        onDelete={onDelete}
      />
    )}
  </div>
)

export default Blogs
