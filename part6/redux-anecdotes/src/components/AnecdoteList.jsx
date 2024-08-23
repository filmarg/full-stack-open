import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, onClick }) => (
  <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={onClick}>vote</button>
    </div>
  </div>
)

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  )

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(voteFor(id))
  }

  return (
    <div>
      {anecdotes
       .toSorted((a, b) => b.votes - a.votes)
       .map(anecdote =>
         <Anecdote
           key={anecdote.id}
           anecdote={anecdote}
           onClick={() => vote(anecdote.id)}
         />
       )}
    </div>
  )
}

export default AnecdoteList
