import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export { initializeBlogs, createBlog };
export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
