const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (req, res) => {
  Blog.deleteMany({})
  User.deleteMany({})

  res.status(204).end()
})

module.exports = testingRouter
