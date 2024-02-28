// actions.js
export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
  });
  
  export const setMessages = (messages) => ({
    type: 'SET_MESSAGES',
    payload: messages,
  });