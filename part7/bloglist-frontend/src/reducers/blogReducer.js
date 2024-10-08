import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

import { appendUserBlog, removeUserBlog } from './usersReducer';

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
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog));
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    sortBlogs(state) {
      return sortByLikes(state);
    },
  },
});

const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    dispatch(sortBlogs());
  };
};

const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
    dispatch(appendUserBlog(newBlog));
  };
};

const likeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id;
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: undefined,
    };

    const updatedBlog = await blogService.update(id, likedBlog);
    dispatch(updateBlog({ ...updatedBlog, id }));
    dispatch(sortBlogs());
  };
};

const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog.id));
    dispatch(removeUserBlog(blog));
  };
};

const postComment = (blog, comment) => {
  return async (dispatch) => {
    const resComment = await blogService.comment(blog.id, comment);
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(resComment),
    };
    dispatch(updateBlog(updatedBlog));
  };
};

const sortByLikes = (arr) => arr.toSorted((a, b) => b.likes - a.likes);

export { initializeBlogs, createBlog, likeBlog, deleteBlog, postComment };
export const { setBlogs, appendBlog, updateBlog, removeBlog, sortBlogs } =
  blogSlice.actions;
export default blogSlice.reducer;
