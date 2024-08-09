const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const users = await User.find({})
  const user = users[0]

  const blog = new Blog({
    ...req.body,
    user: user._id,
  })
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const result = await Blog.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const opts = { new: true }
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, opts)

  res.json(result)
})

module.exports = blogsRouter
