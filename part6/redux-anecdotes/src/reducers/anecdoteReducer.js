import anecdoteService from '../services/anecdotes'

export const incrementVote = obj => {
  return async dispatch => {
    const newObj = { ...obj, votes: obj.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(newObj)
    dispatch({
      type: 'INCREMENT_VOTE',
      data: updatedAnecdote,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find(a => a.id === id)
      const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }
      return state.map(anecdote => (anecdote.id !== id ? anecdote : updatedAnecdote))

    case 'CREATE_ANECDOTE':
      const newAnecdote = action.data
      return [...state, newAnecdote]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export default reducer
