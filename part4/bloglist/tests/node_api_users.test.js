const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially 1 user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
      username: 'root',
      passwordHash,
      name: 'Root, the',
    })

    await user.save()
  })

  describe('adding user', () => {
    test('succeeds with free username', async () => {
      const usersAtStart = await helper.usersInDb()
      
      await api
        .post('/api/users')
        .send(helper.user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(
        usersAtEnd.length,
        usersAtStart.length + 1,
      )

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(helper.user.username))
    })

    test('fails with correct status code if username missing', async () => {
      const usersAtStart = await helper.usersInDb()

      await api
        .post('/api/users')
        .send(helper.userWithoutUsername)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(
        usersAtStart.length,
        usersAtEnd.length,
      )
    })

    test('fails with correct status code if username too short', async () => {
      const usersAtStart = await helper.usersInDb()

      await api
        .post('/api/users')
        .send(helper.userWithShortUsername)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(
        usersAtStart.length,
        usersAtEnd.length,
      )
    })

    test('fails with correct status code and message if username taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const res = await api
            .post('/api/users')
            .send(helper.userWithTakenUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(
        usersAtStart.length,
        usersAtEnd.length
      )

      assert.strictEqual(
        res.body.error,
        '`username` must be unique'
      )
    })

    test('fails with correct status code and message if password length invalid', async () => {
      const usersAtStart = await helper.usersInDb()

      const res = await api
            .post('/api/users')
            .send(helper.userWithWeakPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(
        usersAtStart.length,
        usersAtEnd.length
      )

      assert.strictEqual(
        res.body.error,
        '`password` length invalid'
      )
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
