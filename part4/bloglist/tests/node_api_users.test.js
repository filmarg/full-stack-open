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

  test('adding user succeeds with free username', async () => {
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
})

after(async () => {
  await mongoose.connection.close()
})
