import Blog from './Blog'
import PropTypes from 'prop-types'

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

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Blogs
