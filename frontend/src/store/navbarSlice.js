import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeRoute: 'home',
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
  },
});

export const { setActiveRoute } = navbarSlice.actions;

export default navbarSlice.reducer;
