const logger = require('./logger')
const morgan = require('morgan')

morgan.token('data', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
const morganLogger = process.env.NODE_ENV !== 'test'
      ? morgan(':method :url :status :res[content-length] - :response-time ms :data')
      : (req, res, next) => next()

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

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
  } else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    // Uniqueness constraint violation
    res.status(400).send({ error: '`username` must be unique' })
  } else {
    // The default Express error handler
    next(err)
  }
}

module.exports = {
  morganLogger,
  unknownEndpoint,
  errorHandler,
}
