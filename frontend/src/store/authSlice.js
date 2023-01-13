import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { auth } = action.payload;
      state.isAuth = auth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
