import { createSlice } from '@reduxjs/toolkit';

import userService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    appendUserBlog(state, action) {
      const blog = action.payload;
      const user = state.find((u) => u.id === blog.user.id);
      const userBlog = {
        ...blog,
        user: undefined,
        likes: undefined,
        comments: undefined,
      };
      user.blogs = user.blogs.concat(userBlog);
    },
    removeUserBlog(state, action) {
      const blog = action.payload;
      const user = state.find((u) => u.id === blog.user.id);
      user.blogs = user.blogs.filter((b) => b.id !== blog.id);
    },
  },
});

const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export { initializeUsers };
export const { setUsers, appendUserBlog, removeUserBlog } = usersSlice.actions;
export default usersSlice.reducer;
