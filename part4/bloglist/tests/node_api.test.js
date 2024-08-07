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
  test('are returned as JSON and in correct amount', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Verify the number
    assert.strictEqual(
      res.body.length,
      helper.initBlogs.length
    )
  })

  test('are returned from DB with "id" property', async () => {
    const blogsFromDb = await helper.blogsInDb()

    assert(blogsFromDb[0].id)
  })

  describe('posting new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Moon Dead At 29',
        author: 'The Onion',
        url: 'https://www.theonion.com/moon-dead-at-29-1849575577',
        likes: 100,
      }
      
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Verify the number
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(
        blogsAtEnd.length,
        helper.initBlogs.length + 1
      )

      // Verify the contents
      const blogsContents = blogsAtEnd.map(b => b.title)
      assert(blogsContents.includes('Moon Dead At 29'))
    })

    test('succeeds without "likes", which defaults to 0', async () => {
      const newBlog = {
        title: 'Moon Dead At 29',
        author: 'The Onion',
        url: 'https://www.theonion.com/moon-dead-at-29-1849575577',
      }

      const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

      assert.strictEqual(
        res.body.likes,
        0
      )
    })
  })  
})

after(async () => {
  await mongoose.connection.close()
})
