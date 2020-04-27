const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 17,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
  },
]

const newBlog = {
  title: 'THIS IS NEW',
  author: 'Mario',
  url: 'http://www.mario.org/its-a-me',
  likes: 1500,
}

const testUser = {
  name: 'Test User',
  username: 'user1',
  password: 'password',
}

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const newUser = await api.post('/api/users').send(testUser)

  const creds = {
    username: testUser.username,
    password: testUser.password,
  }

  const login = await api.post('/api/login').send(creds)
  token = login.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(initialBlogs[0])
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(initialBlogs[1])
})

test('GET returns all blogs in correct format', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(res.body.length).toBe(2)
})

test('the returned objects have an unique id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
  expect(res.body[1].id).toBeDefined()
})

test('new blog posts are being sucessfully created and stored in the db', async () => {
  const oldBlogs = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const newBlogs = await api.get('/api/blogs')

  expect(newBlogs.body.length).toBe(oldBlogs.body.length + 1)
  expect(newBlogs.body[2].title).toContain('THIS IS NEW')
})

test('likes property of objects are 0 if not specified', async () => {
  const newBlog = {
    name: 'TESTPERSON',
    url: 'https://reactpatterns.com/',
    title: 'HELLO WORLD',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await api.get('/api/blogs')
  expect(updatedBlogs.body[2].likes).toBe(0)
})

test('if url and title are missing then 400 is returned', async () => {
  const newBlog = {
    name: 'TESTPERSON',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

// Not implementing tests for DELETE and PUT

afterAll(() => {
  mongoose.connection.close()
})
