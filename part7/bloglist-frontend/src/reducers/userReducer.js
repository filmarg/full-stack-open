import { createSlice } from '@reduxjs/toolkit';

import loginService from '../services/login';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    storeUser(state, action) {
      return action.payload;
    },
    logout() {
      // Delete the token (and more) from everywhere
      window.localStorage.removeItem('bloglistLoggedUser');
      blogService.setToken(null);
      return null;
    },
  },
});

const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('bloglistLoggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(storeUser(user));
  };
};

export { login };
export const { storeUser, logout } = userSlice.actions;
export default userSlice.reducer;
