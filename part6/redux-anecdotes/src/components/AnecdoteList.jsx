import { useSelector, useDispatch } from 'react-redux'

import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    // console.log('vote', id)
    dispatch(voteFor(anecdote))
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {anecdotes
       .toSorted((a, b) => b.votes - a.votes)
       .map(anecdote =>
         <Anecdote
           key={anecdote.id}
           anecdote={anecdote}
           onClick={() => vote(anecdote)}
         />
       )}
    </div>
  )
}

export default AnecdoteList
