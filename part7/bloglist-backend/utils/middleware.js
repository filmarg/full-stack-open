const config = require('./config');
const logger = require('./logger');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

morgan.token('data', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : '',
);
const morganLogger =
  process.env.NODE_ENV !== 'test'
    ? morgan(
        ':method :url :status :res[content-length] - :response-time ms :data',
      )
    : (req, res, next) => next();

const tokenExtractor = (req, res, next) => {
  // Get the token from the header
  const authorization = req.get('Authorization');
  if (authorization && authorization.startsWith('Bearer')) {
    req.token = authorization.replace('Bearer ', '');
  }
  next();
};

const userExtractor = async (req, res, next) => {
  // NOTE: Wrap everything besides 'next()' in 'if (req.token) {...}'
  // if you intend to use this middleware with 'app.use()'.  Except
  // then you'd lose some of the default 'jwt' errors and would have
  // to handle them here.  Better just use it selectively.

  // Decode the token
  const decodedToken = jwt.verify(req.token, config.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  req.user = await User.findById(decodedToken.id);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.name === 'CastError') {
    // Invalid object ID for Mongo
    res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    // Schema constraint violation for Mongo
    const message = Object.values(err.errors).reduce(
      (acc, e) => acc.concat(e.message, ' | '),
      '',
    );
    res.status(400).send({ error: message });
  } else if (
    err.name === 'MongoServerError' &&
    err.message.includes('E11000 duplicate key error')
  ) {
    // Uniqueness constraint violation
    res.status(400).send({ error: '`username` must be unique' });
  } else if (err.name === 'JsonWebTokenError') {
    // Token invalid or missing
    res.status(401).send({ error: err.message });
  } else if (err.name === 'TokenExpiredError') {
    res.status(401).send({ error: 'token expired' });
  } else {
    // The default Express error handler
    next(err);
  }
};

module.exports = {
  morganLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
