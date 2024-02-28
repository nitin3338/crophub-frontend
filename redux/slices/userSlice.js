// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user.user.image = action.payload.image;
      }
    },
  },
});

export const { setUser, updateProfileImage } = userSlice.actions;
export const selectUser = (state) => state.user.user || {};

export default userSlice.reducer;
