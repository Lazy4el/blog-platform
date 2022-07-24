import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'features/user/userSlice';
import articleSlice from 'features/article/articleSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    article: articleSlice,
  },
});

export default store;
