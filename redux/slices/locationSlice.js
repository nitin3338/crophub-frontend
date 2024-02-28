// locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define initial state for location data
const initialState = {
  latitude: null,
  longitude: null,
};

// Create locationSlice using createSlice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setLocationError: (state) => {
      // Handle error state if needed
    },
  },
});

// Export actions from locationSlice
export const { setLocation, setLocationError } = locationSlice.actions;

// Define selector function to select location data from state
export const selectLocation = (state) => state.location;

// Export locationSlice reducer
export default locationSlice.reducer;
