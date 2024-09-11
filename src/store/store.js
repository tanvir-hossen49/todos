// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import todoReducer from './todoSlice';
import drawerReducer from './drawerSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todoReducer,
    drawer: drawerReducer,
  },
});

export default store;
