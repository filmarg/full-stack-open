import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()

    const user = await loginService.login({ username, password })
    setUser(user)
    setUsername('')
    setPassword('')
  }
  
  const handleChange = (setter) =>
        (e) => setter(e.target.value)
  
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Login onSubmit={handleLogin}
               username={{val: username, onChange: handleChange(setUsername)}}
               password={{val: password, onChange: handleChange(setPassword)}} />
      </div>
    )
  }
  
  return (
    <div>
      <h2>Blogs</h2>
      <p><i>[{user.name} logged in]</i></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
