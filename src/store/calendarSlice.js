// calendarSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { startOfWeek, addWeeks, subWeeks, format } from 'date-fns';

const initialState = {
  currentDate: new Date(),
  startOfWeek: startOfWeek(new Date(), { weekStartsOn: 0 }),
  currentMonth: format(new Date(), 'MMMM'),
  currentYear: format(new Date(), 'yyyy')
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextWeek: (state) => {
      state.startOfWeek = addWeeks(state.startOfWeek, 1);
      state.currentMonth = format(state.startOfWeek, 'MMMM');
      state.currentYear = format(state.startOfWeek, 'yyyy');
    },
    prevWeek: (state) => {
      state.startOfWeek = subWeeks(state.startOfWeek, 1);
      state.currentMonth = format(state.startOfWeek, 'MMMM');
      state.currentYear = format(state.startOfWeek, 'yyyy');
    },
    goToToday: (state) => {
      state.currentDate = new Date();
      state.startOfWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
      state.currentMonth = format(new Date(), 'MMMM');
      state.currentYear = format(new Date(), 'yyyy');
    },
  }
});

export const { nextWeek, prevWeek, goToToday } = calendarSlice.actions;
export default calendarSlice.reducer;
