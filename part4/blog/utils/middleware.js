const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${request.method}\t${request.path}\t${JSON.stringify(request.body)}\n`)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
}

const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = { requestLogger, errorHandler, getTokenFrom }
