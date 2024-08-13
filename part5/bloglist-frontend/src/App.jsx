import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [info, setInfo] = useState({ message: null })
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
    const loggedUserJson = window.localStorage.getItem('bloglistLoggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistLoggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')

      displayNotification('confirmation', `${user.name} logged in`, 3000)
    } catch (ex) {
      displayNotification('error', `Failed: ${ex.response.data.error}`, 8000)
    }
  }
  
  const handleLogout = () => {
    // Delete the token (and more) from everywhere
    window.localStorage.removeItem('bloglistLoggedUser')
    setUser(null)
    blogService.setToken(null)
  }
  
  const handlePost = async (e) => {
    e.preventDefault()
    
    const blog = { title, author, url }
    
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

      displayNotification('confirmation', `Blog added: ${newBlog.title}`, 5000)
    } catch (ex) {
      displayNotification('error', `Failed: ${ex.response.data.error}`, 8000)
    }
  }
  
  const handleChange = (setter) =>
        (e) => setter(e.target.value)
  
  const displayNotification = (type, message, delay) => {
    setInfo({ message, type })
    setTimeout(() => setInfo({ message: null }), delay)
  }
  
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={info} />
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
      <Notification info={info} />
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
