import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    const val = event.target.create.value
    dispatch(createAnecdote(val))

    dispatch(createNotification(`you added '${val}'`, 5))
    event.target.create.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="create" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
