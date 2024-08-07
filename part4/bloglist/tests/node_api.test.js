const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initBlogs) {
    const blogDoc = new Blog(blog)
    await blogDoc.save()
  }
})

describe('blogs', () => {
  test('are returned as JSON, in correct amount', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(
      res.body.length,
      helper.initBlogs.length
    )
  })

  test('are returned from DB with "id" property', async () => {
    const blogsFromDb = await helper.blogsInDb()

    assert(blogsFromDb[0].id)
  })
})

after(async () => {
  await mongoose.connection.close()
})
