const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  const initialUsers = [
    {
      name: 'Test One',
      username: 'user1',
      passwordHash: await bcrypt.hash('password1', 10),
    },
    {
      name: 'Test Two',
      username: 'user2',
      passwordHash: await bcrypt.hash('password2', 10),
    },
  ]
  await User.deleteMany({})

  const userArray = initialUsers.map(user => new User(user))
  const promiseArray = userArray.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('GET /api/users', () => {
  test('all of the users', async () => {
    const blogs = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //console.log(blogs.body)
    expect(blogs.body.length).toBe(2)
  })
})

describe('Whether users will be rejected with improper credentials', () => {
  test('sending invalid password', async () => {
    const testUser = {
      name: 'Test Subject',
      username: 'user4',
      password: 'ps',
    }

    const userObj = await api.post('/api/users').send(testUser).expect(400)
    //console.log(userObj.body)
  })

  test('sending invalid username', async () => {
    const testUser = {
      name: 'Test',
      username: 'u4',
      password: 'password',
    }

    const userObj = await api.post('/api/users').send(testUser).expect(400)
  })
})
afterAll(() => mongoose.connection.close())
