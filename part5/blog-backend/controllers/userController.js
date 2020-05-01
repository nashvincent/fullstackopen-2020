const userRouter = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
  const userCreds = request.body
  // TODO 4.16
  if (!userCreds.password.length || userCreds.password.length < 3) {
    return response.status(400).json({ error: 'bad password' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(userCreds.password, saltRounds)

  const user = new User({
    name: userCreds.name,
    username: userCreds.username,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    return response.json(savedUser.toJSON())
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

userRouter.get('/', async (request, response) => {
  const userList = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    likes: 1,
    author: 1,
  })
  return response.json(userList.map(user => user.toJSON()))
})

module.exports = userRouter
