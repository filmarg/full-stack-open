const loginRouter = require('express').Router()
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  // Check the credentials
  const user = await User.findOne({ username })
  const passwordCorrect = user !== null
        ? await bcrypt.compare(password, user.passwordHash)
        : false

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'username or password invalid' })
  }

  // Create the token
  const tokenUserInfo = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(tokenUserInfo, config.SECRET, { expiresIn: 3600 })

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
