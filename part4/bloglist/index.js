require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// Connect to the DB

const mongoUrl = process.env.MONGODB_URI
console.log('Connecting to', mongoUrl)
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err.message)
  })

// Make a model

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// Alter the model for it to suit our needs
blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const app = express()

morgan.token('data', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.json())

//========== API

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//========== Error handling

const errorHandler = (err, req, res, next) => {
  console.error(err)

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

//========== Run server

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
