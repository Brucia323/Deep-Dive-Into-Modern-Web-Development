import anecdoteService from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'vote':
      state = state.map(anecdote =>
        anecdote.id === action.data
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
      break
    case 'createAnecdote':
      state = state.concat(action.data)
      break
    case 'INIT_ANECDOTES':
      state = action.data
      break
    default:
      break
  }
  return state
}

export const voteOf = id => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: 'vote',
      data: id,
    })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'createAnecdote',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdote,
    })
  }
}

export default anecdoteReducer
