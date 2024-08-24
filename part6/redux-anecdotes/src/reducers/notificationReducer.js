import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    makeNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch(makeNotification(notification))
    setTimeout(() => dispatch(removeNotification()), seconds * 1000)
  }
}

export { setNotification }
export const { makeNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
