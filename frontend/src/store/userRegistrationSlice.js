import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
};

export const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setUsername, setEmail, setPassword } =
  userRegistrationSlice.actions;

export default userRegistrationSlice.reducer;
