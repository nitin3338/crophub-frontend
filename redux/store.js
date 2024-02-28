// store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';
import chatReducer from './slices/messageSlice'; // Import chatSlice
import { combineReducers } from 'redux';
import photoReducer from '../redux/slices/pictureSlice';
import productReducer from '../redux/slices/cartSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    chat: chatReducer, // Include chatSlice
    photo: photoReducer, // Include pictureSlice
    products: productReducer, 
  },
});

export default store;
