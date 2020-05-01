const config = require('./utils/config')
const express = require('express')
require('express-async-errors')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogController')
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')
const middleware = require('./utils/middleware')

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('Failed to connect to MongoDB', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testController')
  app.use('/api/testing', testRouter)
}

app.use(middleware.errorHandler)

module.exports = app
