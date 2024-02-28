// chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      // Serialize the message before storing it
      const serializedMessage = JSON.parse(JSON.stringify(action.payload));
      state.messages.push(serializedMessage);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;

export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
