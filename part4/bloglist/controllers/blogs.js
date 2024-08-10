const blogsRouter = require('express').Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  // Decode the token
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
  // Decode the token
  const decodedToken = jwt.verify(req.token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  // Verify the user
  const blog = await Blog.findById(req.params.id)
  const user = await User.findById(decodedToken.id)
  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'no permission: invalid user' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const opts = { new: true }
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, opts)

  res.json(result)
})

module.exports = blogsRouter
