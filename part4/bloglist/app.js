const config = require('./utils/config')
const logger = require('./utils/logger')
require('express-async-errors')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const midware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')

//========== DB connection

mongoose.set('strictQuery', false)

logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(err => {
    logger.error('Error connecting to MongoDB:', err.message)
  })

//========== Middleware and routers

app.use(cors())
app.use(express.json())
app.use(midware.morganLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(midware.unknownEndpoint)
app.use(midware.errorHandler)

module.exports = app
