import { createSlice } from '@reduxjs/toolkit';
import { startOfWeek, addWeeks, subWeeks, format } from 'date-fns';

const initialState = {
  currentDate: new Date().toISOString(),  // Store Date as an ISO string
  startOfWeek: startOfWeek(new Date(), { weekStartsOn: 0 }).toISOString(),  // Store Date as an ISO string
  currentMonth: format(new Date(), 'MMMM'),
  currentYear: format(new Date(), 'yyyy')
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextWeek: (state) => {
      const newStartOfWeek = addWeeks(new Date(state.startOfWeek), 1);  // Convert ISO string back to Date
      state.startOfWeek = newStartOfWeek.toISOString();  // Store as ISO string
      state.currentMonth = format(newStartOfWeek, 'MMMM');
      state.currentYear = format(newStartOfWeek, 'yyyy');
    },
    prevWeek: (state) => {
      const newStartOfWeek = subWeeks(new Date(state.startOfWeek), 1);  // Convert ISO string back to Date
      state.startOfWeek = newStartOfWeek.toISOString();  // Store as ISO string
      state.currentMonth = format(newStartOfWeek, 'MMMM');
      state.currentYear = format(newStartOfWeek, 'yyyy');
    },
    goToToday: (state) => {
      const today = new Date();
      state.currentDate = today.toISOString();  // Store as ISO string
      const newStartOfWeek = startOfWeek(today, { weekStartsOn: 0 });
      state.startOfWeek = newStartOfWeek.toISOString();  // Store as ISO string
      state.currentMonth = format(today, 'MMMM');
      state.currentYear = format(today, 'yyyy');
    },
  }
});

export const { nextWeek, prevWeek, goToToday } = calendarSlice.actions;
export default calendarSlice.reducer;
