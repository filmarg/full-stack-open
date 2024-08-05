const logger = require('./logger')
const morgan = require('morgan')

morgan.token('data', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :data')

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
