const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const morgan = require('morgan')
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

//========== Middleware

morgan.token('data', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

//========== API

app.use(blogsRouter)

//========== Utilities

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'CastError') {
    // Invalid object ID for Mongo
    res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    // Schema constraint violation for Mongo
    const message = Object.values(err.errors)
      .reduce((acc, e) => acc.concat(e.message, ' | '), '')
    res.status(400).send({ error: message })
  } else {
    // The default Express error handler
    next(err)
  }
}

app.use(errorHandler)

module.exports = app
