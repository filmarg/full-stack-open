import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export { initializeAnecdotes }
export const { voteFor, createAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer
