import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const qc = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const newAnecdoteMut = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = qc.getQueryData(['anecdotes'])
      qc.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      dispatch({ type: 'SET', payload: `${err.response.data.error}` })
      setTimeout(() => dispatch({ type: 'REMOVE' }), 5000)
    },
  })
  
  const onCreate = (e) => {
    e.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMut.mutate({ content, votes: 0 }, {
      onSuccess: () => {
        dispatch({ type: 'SET', payload: `Created "${content}"` })
        setTimeout(() => dispatch({ type: 'REMOVE' }), 5000)
      }
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
