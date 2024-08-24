import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = ({ displayNotification }) => {
  const dispatch = useDispatch()
  
  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
    displayNotification(`You created "${newAnecdote.content}"`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
