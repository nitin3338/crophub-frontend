// photoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photo: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const { setPhoto } = photoSlice.actions;
export const selectPhoto = (state) => state.photo.photo;

export default photoSlice.reducer;
