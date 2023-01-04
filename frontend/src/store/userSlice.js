import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  name: "",
  avatar: "",
  memberSince: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, username, name, avatar, memberSince } = action.payload.user;
      state._id = _id;
      state.username = username;
      state.avatar = avatar;
      state.name = name;
      state.memberSince = memberSince;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
