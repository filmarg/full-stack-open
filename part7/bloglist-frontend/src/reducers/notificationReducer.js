import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    makeNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return { message: null };
    },
  },
});

const setNotification = (type, message, seconds) => {
  return (dispatch) => {
    dispatch(makeNotification({ type, message }));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export { setNotification };
export const { makeNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
