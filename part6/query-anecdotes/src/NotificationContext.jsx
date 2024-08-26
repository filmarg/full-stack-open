import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'REMOVE':
    return ''
  default:
    return state
  }
}

const NotificationContext = createContext()

const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider> 
  )
}

const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

export {
  NotificationContextProvider,
  useNotificationValue,
  useNotificationDispatch,
}
export default NotificationContext
