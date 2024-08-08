const Blog = require('../models/blog')
const User = require('../models/user')

const initBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }, {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }, {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }, {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
]

const blog = {
  title: 'Moon Dead At 29',
  author: 'The Onion',
  url: 'https://www.theonion.com/moon-dead-at-29-1849575577',
  likes: 100,
}

const blogWithoutLikes = {
  title: 'Moon Dead At 29',
  author: 'The Onion',
  url: 'https://www.theonion.com/moon-dead-at-29-1849575577',
}

const blogWithoutTitle = {
  author: 'The Onion',
  url: 'https://www.theonion.com/moon-dead-at-29-1849575577',
}

const blogWithoutUrl = {
  title: 'Moon Dead At 29',
  author: 'The Onion',
}

const user = {
  username: 'jcTheEmperor',
  password: 'venividivici',
  name: 'Julius Caesar',
}

const invalidId = 'xXx_$definitely_invalid$_xXx'

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  // 'toJSON' is necessary because here the request does not go
  // through the express.json() middleware.
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  // 'toJSON' is necessary because here the request does not go
  // through the express.json() middleware.
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const newBlog = new Blog(blog)
  await newBlog.save()
  await newBlog.deleteOne()
  return newBlog._id.toString()
}

module.exports = {
  initBlogs,
  blog,
  blogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl,
  user,
  invalidId,
  blogsInDb,
  usersInDb,
  nonExistingId,
}
