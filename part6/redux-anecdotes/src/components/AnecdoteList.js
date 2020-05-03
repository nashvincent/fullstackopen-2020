import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatcher = useDispatch()

  let sortedAnecdotes = [...anecdotes]
  sortedAnecdotes.sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = sortedAnecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const vote = anecdote => {
    dispatcher(incrementVote(anecdote))

    dispatcher(createNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
