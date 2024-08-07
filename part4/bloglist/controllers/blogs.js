const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const result = await blog.save()
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
