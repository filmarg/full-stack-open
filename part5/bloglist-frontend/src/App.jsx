import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()

    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setUser(user)
    setUsername('')
    setPassword('')
    blogService.setToken(user.token)
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }
  
  const handlePost = async (e) => {
    e.preventDefault()
    
    const blog = { title, author, url }
    
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  const handleChange = (setter) =>
        (e) => setter(e.target.value)
  
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Login
          onSubmit={handleLogin}
          username={{val: username, onChange: handleChange(setUsername)}}
          password={{val: password, onChange: handleChange(setPassword)}}
        />
      </div>
    )
  }
  
  return (
    <div>
      <h2>Blogs</h2>
      <Logout name={user.name} onClick={handleLogout} />
      <h3>Post a blog</h3>
      <BlogForm
        onSubmit={handlePost}
        title={{val: title, onChange: handleChange(setTitle)}}
        author={{val: author, onChange: handleChange(setAuthor)}}
        url={{val: url, onChange: handleChange(setUrl)}}
      />
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App
