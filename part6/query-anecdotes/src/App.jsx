import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

const App = () => {
  const res = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })
  
  if (res.isPending) {
    return <div>Fetching anecdotes...</div>
  }
  if (res.isError) {
    return <div>Error: Anecdotes not available due to problems in server</div>
  }
  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
