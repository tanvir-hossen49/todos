import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer(state, action) {
      return action.payload;
    },
    closeDrawer() {
      return null; 
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
