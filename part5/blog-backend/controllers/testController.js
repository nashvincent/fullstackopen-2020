const router = require('express').Router()
const User = require('../models/userModel')
const Blog = require('../models/blogModel')

router.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  return response.status(204).end()
})

module.exports = router
