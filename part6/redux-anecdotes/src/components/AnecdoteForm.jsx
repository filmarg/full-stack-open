import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ displayNotification }) => {
  const dispatch = useDispatch()
  
  const handleAnecdoteSubmit = e => {
    e.preventDefault()

    const newAnecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    
    dispatch(createAnecdote(newAnecdote))
    displayNotification(`You created "${newAnecdote}"`)
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
