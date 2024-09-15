// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import todoReducer from './todoSlice';
import calendarReducer from './calendarSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todoReducer,
    calendar: calendarReducer,
  },
});

export default store;
