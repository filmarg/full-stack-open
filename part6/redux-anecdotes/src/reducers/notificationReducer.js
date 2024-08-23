import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
