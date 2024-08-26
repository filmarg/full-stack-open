import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdote = ({ anecdote, onClick }) => {
  return (
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
}

const AnecdoteList = ({ anecdotes }) => {
  const qc = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const updateAnecdoteMut = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = qc.getQueryData(['anecdotes'])
      qc.setQueryData(['anecdotes'], anecdotes.map(a =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote)
      )
    },
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMut.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET', payload: `Voted for "${anecdote.content}"` })
    setTimeout(() => dispatch({ type: 'REMOVE' }), 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => handleVote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList
