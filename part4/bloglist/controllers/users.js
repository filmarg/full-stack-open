const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const result = await User.find({})
  res.json(result)
})

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body
  
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
