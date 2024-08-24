import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const displayNotification = (notification) => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList displayNotification={displayNotification} />
      <AnecdoteForm displayNotification={displayNotification} />
    </div>
  )
}

export default App
