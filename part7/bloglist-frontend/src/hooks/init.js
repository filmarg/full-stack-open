import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';
import { initializeUsers } from '../reducers/usersReducer';
import { storeUser } from '../reducers/userReducer';

import blogService from '../services/blogs';

const useInitialData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);
};

const useLoggedUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('bloglistLoggedUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(storeUser(user));
      blogService.setToken(user.token);
    }
  }, []);
};

export { useInitialData, useLoggedUser };
