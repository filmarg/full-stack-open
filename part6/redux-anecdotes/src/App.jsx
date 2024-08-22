import { useSelector, useDispatch } from 'react-redux'
import { voteFor, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  const handleAnecdoteSubmit = e => {
    e.preventDefault()

    const newAnecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
       .toSorted((a, b) => b.votes - a.votes)
       .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteSubmit}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
