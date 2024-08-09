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
  await Blog.insertMany(helper.initBlogs)
})

describe('with some blogs in the DB', () => {
  test('blogs are returned as JSON and in correct amount', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Verify the number
    assert.strictEqual(res.body.length,
                       helper.initBlogs.length)
  })

  test('blogs are returned from DB with "id" property', async () => {
    const blogsFromDb = await helper.blogsInDb()

    assert(blogsFromDb[0].id)
  })

  describe('posting new blog', () => {
    test('succeeds with valid data', async () => {
      await api
        .post('/api/blogs')
        .send(helper.blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Verify the number
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length,
                         helper.initBlogs.length + 1)

      // Verify the contents
      const blogsContents = blogsAtEnd.map(b => b.title)
      assert(blogsContents.includes(helper.blog.title))
    })

    test('succeeds without "likes", which defaults to 0', async () => {
      const res = await api
            .post('/api/blogs')
            .send(helper.blogWithoutLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

      assert.strictEqual(res.body.likes,
                         0)
    })

    test('fails with status code 400 if "title" empty', async () => {
      await api
        .post('/api/blogs')
        .send(helper.blogWithoutTitle)
        .expect(400)

      // Verify the number
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length,
                         helper.initBlogs.length)
    })

    test('fails with status code 400 if "url" empty', async () => {
      await api
        .post('/api/blogs')
        .send(helper.blogWithoutUrl)
        .expect(400)

      // Verify the number
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length,
                         helper.initBlogs.length)
    })
  })

  describe('update of blog', () => {
    test('succeeds and is returned with new number of "likes" if valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        ...blogsAtStart[4],
        likes: 42,
      }

      const res = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // Verify the contents
      assert.deepStrictEqual(res.body,
                             blogToUpdate)
    })

    test('fails with status code 400 if "id" invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        ...blogsAtStart[4],
        likes: 42,
        id: helper.invalidId,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)

      // Verify the contents
      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtEnd[4],
                             blogsAtStart[4])
    })

    test('fails with status code 400 if "id" non-existing', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        ...blogsAtStart[4],
        likes: 42,
        id: helper.nonExistingId(),
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)

      // Verify the contents
      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtEnd[4],
                             blogsAtStart[4])
    })

    test('fails with status code 400 if "likes" invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        ...blogsAtStart[4],
        likes: 'many',
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)

      // Verify the contents
      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtEnd[4],
                             blogsAtStart[4])
    })
  })
  
  describe('deletion of blog', () => {
    test('succeeds with status code 204 if "id" valid', async () => {
      const blogToDelete = helper.initBlogs[3]
      
      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .expect(204)

      // Verify the number
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length,
                         helper.initBlogs.length - 1)

      // Verify the contents
      const blogsContents = blogsAtEnd.map(b => b.title)
      assert(!blogsContents.includes(blogToDelete.title))
    })

    test('fails with status code 400 if "id" invalid', async () => {
      await api
        .delete('/api/blogs/${helper.invalidId}')
        .expect(400)

      // Verify the number
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length,
                         helper.initBlogs.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
