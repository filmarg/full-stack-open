const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body
  
  if (!password || password.length < 3) {
    return res.status(400).json({ error: '`password` length invalid' })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    passwordHash,
    name,
  })

  const result = await user.save()
  res.status(201).json(result)
})

module.exports = usersRouter
