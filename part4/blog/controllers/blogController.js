const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

blogRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'missing title/url' })
  }

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog.toJSON())
})

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('IN')
  if (!token || !decodedToken.id) {
    console.log('IN2')
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== decodedToken.id.toString()) {
    console.log('IN3')
    return response.status(400).status('Unauthorised access')
  }

  console.log('IN4')
  await Blog.findByIdAndDelete(request.params.id)
  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
  await user.save()

  console.log('I5')
  return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blogToUpdate = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {
    new: true,
  })
  console.log('Updated blog: ', updatedBlog)
  return response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
