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
    // eslint-disable-next-line no-unused-vars
    resetActiveRoute: (state, action) => {
      state.activeRoute = 'home';
    },
  },
});

export const { setActiveRoute, resetActiveRoute } = navbarSlice.actions;

export default navbarSlice.reducer;
