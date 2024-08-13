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

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()

    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setUser(user)
    setUsername('')
    setPassword('')
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
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
      <p>
        <i>[{user.name} logged in] </i>
        <button onClick={handleLogout}>Log out</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
